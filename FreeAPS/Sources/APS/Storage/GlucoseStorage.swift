import AVFAudio
import Foundation
import SwiftDate
import SwiftUI
import Swinject

protocol GlucoseStorage {
    func storeGlucose(_ glucose: [BloodGlucose])
    func removeGlucose(ids: [String])
    func recent() -> [BloodGlucose]
    func syncDate() -> Date
    func filterTooFrequentGlucose(_ glucose: [BloodGlucose], at: Date) -> [BloodGlucose]
    func lastGlucoseDate() -> Date
    func isGlucoseFresh() -> Bool
    func isGlucoseNotFlat() -> Bool
    func nightscoutGlucoseNotUploaded() -> [BloodGlucose]
    func nightscoutCGMStateNotUploaded() -> [NigtscoutTreatment]
    var alarm: GlucoseAlarm? { get }
}

final class BaseGlucoseStorage: GlucoseStorage, Injectable {
    private let processQueue = DispatchQueue(label: "BaseGlucoseStorage.processQueue")
    @Injected() private var storage: FileStorage!
    @Injected() private var broadcaster: Broadcaster!
    @Injected() private var settingsManager: SettingsManager!

    private enum Config {
        static let filterTime: TimeInterval = 1 * 60
    }

    init(resolver: Resolver) {
        injectServices(resolver)
    }

    func storeGlucose(_ glucose: [BloodGlucose]) {
        processQueue.sync {
            let file = OpenAPS.Monitor.glucose
            self.storage.transaction { storage in
                storage.append(glucose, to: file, uniqBy: \.dateString)
                let uniqEvents = storage.retrieve(file, as: [BloodGlucose].self)?
                    .filter { $0.dateString.addingTimeInterval(24.hours.timeInterval) > Date() }
                    .sorted { $0.dateString > $1.dateString } ?? []
                let glucose = Array(uniqEvents)
                storage.save(glucose, as: file)

                DispatchQueue.main.async {
                    self.broadcaster.notify(GlucoseObserver.self, on: .main) {
                        $0.glucoseDidUpdate(glucose.reversed())
                    }
                }

                // Save to glucoseForStats also.
                var bg_ = 0
                var bgDate = Date()

                if glucose.isNotEmpty {
                    bg_ = glucose[0].glucose ?? 0
                    bgDate = glucose[0].dateString
                }
                if bg_ != 0 {
                    let dataForStats = GlucoseDataForStats(date: bgDate, glucose: bg_)
                    storage.append(dataForStats, to: OpenAPS.Monitor.glucose_data, uniqBy: \.date)
                    let uniqEvents_1 = storage.retrieve(OpenAPS.Monitor.glucose_data, as: [GlucoseDataForStats].self)?
                        .filter { $0.date.addingTimeInterval(90.days.timeInterval) > Date() }
                        .sorted { $0.date > $1.date } ?? []
                    let dataForStats_ = Array(uniqEvents_1)
                    storage.save(dataForStats_, as: OpenAPS.Monitor.glucose_data)
                }
            }

            self.storage.transaction { storage in
                let file = OpenAPS.Monitor.cgmState
                var treatments = storage.retrieve(file, as: [NigtscoutTreatment].self) ?? []
                var updated = false
                for x in glucose {
                    NSLog("storeGlucose \(x)")
                    guard let sessionStartDate = x.sessionStartDate else {
                        continue
                    }
                    if let lastTreatment = treatments.last,
                       let createdAt = lastTreatment.createdAt,
                       // When a new Dexcom sensor is started, it produces multiple consequetive
                       // startDates. Disambiguate them by only allowing a session start per minute.
                       abs(createdAt.timeIntervalSince(sessionStartDate)) < TimeInterval(60)
                    {
                        continue
                    }
                    var notes = ""
                    if let t = x.transmitterID {
                        notes = t
                    }
                    if let a = x.activationDate {
                        notes = "\(notes) activated on \(a)"
                    }
                    let treatment = NigtscoutTreatment(
                        duration: nil,
                        rawDuration: nil,
                        rawRate: nil,
                        absolute: nil,
                        rate: nil,
                        eventType: .nsSensorChange,
                        createdAt: sessionStartDate,
                        enteredBy: NigtscoutTreatment.local,
                        bolus: nil,
                        insulin: nil,
                        notes: notes,
                        carbs: nil,
                        targetTop: nil,
                        targetBottom: nil
                    )
                    NSLog("CGM sensor change \(treatment)")
                    treatments.append(treatment)
                    updated = true
                }
                if updated {
                    // We have to keep quite a bit of history as sensors start only every 10 days.
                    storage.save(
                        treatments.filter
                            { $0.createdAt != nil && $0.createdAt!.addingTimeInterval(30.days.timeInterval) > Date() },
                        as: file
                    )
                }
            }
        }
    }

    func removeGlucose(ids: [String]) {
        processQueue.sync {
            let file = OpenAPS.Monitor.glucose
            self.storage.transaction { storage in
                let bgInStorage = storage.retrieve(file, as: [BloodGlucose].self)
                let filteredBG = bgInStorage?.filter { !ids.contains($0.id) } ?? []
                guard bgInStorage != filteredBG else { return }
                storage.save(filteredBG, as: file)

                DispatchQueue.main.async {
                    self.broadcaster.notify(GlucoseObserver.self, on: .main) {
                        $0.glucoseDidUpdate(filteredBG.reversed())
                    }
                }
            }
        }
    }

    func syncDate() -> Date {
        guard let events = storage.retrieve(OpenAPS.Monitor.glucose, as: [BloodGlucose].self),
              let recent = events.first
        else {
            return Date().addingTimeInterval(-1.days.timeInterval)
        }
        return recent.dateString
    }

    func recent() -> [BloodGlucose] {
        storage.retrieve(OpenAPS.Monitor.glucose, as: [BloodGlucose].self)?.reversed() ?? []
    }

    func lastGlucoseDate() -> Date {
        recent().last?.dateString ?? .distantPast
    }

    func isGlucoseFresh() -> Bool {
        Date().timeIntervalSince(lastGlucoseDate()) <= Config.filterTime
    }

    func filterTooFrequentGlucose(_ glucose: [BloodGlucose], at date: Date) -> [BloodGlucose] {
        var lastDate = date
        var filtered: [BloodGlucose] = []
        let sorted = glucose.sorted { $0.date < $1.date }

        for entry in sorted {
            guard entry.dateString.addingTimeInterval(-Config.filterTime) > lastDate else {
                continue
            }
            filtered.append(entry)
            lastDate = entry.dateString
        }

        return filtered
    }

    func isGlucoseNotFlat() -> Bool {
        return true // To completely avoid more "To Flat" errors (I don't understand Why I still get them?
        let count = 3 // check last 3 readings
        let lastReadings = Array(recent().suffix(count))
        let filtered = lastReadings.compactMap(\.filtered).filter { $0 != 0 }
        guard lastReadings.count == count, filtered.count == count else { return true }
        return Array(filtered.uniqued()).count != 1
    }

    func nightscoutGlucoseNotUploaded() -> [BloodGlucose] {
        let uploaded = storage.retrieve(OpenAPS.Nightscout.uploadedGlucose, as: [BloodGlucose].self) ?? []
        let recentGlucose = recent()

        return Array(Set(recentGlucose).subtracting(Set(uploaded)))
    }

    func nightscoutCGMStateNotUploaded() -> [NigtscoutTreatment] {
        let uploaded = storage.retrieve(OpenAPS.Nightscout.uploadedCGMState, as: [NigtscoutTreatment].self) ?? []
        let recent = storage.retrieve(OpenAPS.Monitor.cgmState, as: [NigtscoutTreatment].self) ?? []

        return Array(Set(recent).subtracting(Set(uploaded)))
    }

    var alarm: GlucoseAlarm? {
        guard let glucose = recent().last, glucose.dateString.addingTimeInterval(20.minutes.timeInterval) > Date(),
              let glucoseValue = glucose.glucose else { return nil }

        if Decimal(glucoseValue) <= settingsManager.settings.lowGlucose {
            return .low
        }

        if Decimal(glucoseValue) >= settingsManager.settings.highGlucose {
            return .high
        }

        return nil
    }
}

protocol GlucoseObserver {
    func glucoseDidUpdate(_ glucose: [BloodGlucose])
}

enum GlucoseAlarm {
    case high
    case low

    var displayName: String {
        switch self {
        case .high:
            return NSLocalizedString("LOWALERT!", comment: "LOWALERT!")
        case .low:
            return NSLocalizedString("HIGHALERT!", comment: "HIGHALERT!")
        }
    }
}
