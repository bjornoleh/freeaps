import SwiftUI
import Swinject

extension AutotuneConfig {
    struct RootView: BaseView {
        let resolver: Resolver
        @StateObject var state = StateModel()

        private var isfFormatter: NumberFormatter {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 2
            return formatter
        }

        private var rateFormatter: NumberFormatter {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 2
            return formatter
        }

        private var dateFormatter: DateFormatter {
            let formatter = DateFormatter()
            formatter.dateStyle = .medium
            formatter.timeStyle = .short
            return formatter
        }

        var body: some View {
            Form {
                Section {
                    Toggle("Use Autotune", isOn: $state.useAutotune)
                }

                Section {
                    HStack {
                        Text("Last run")
                        Spacer()
                        Text(dateFormatter.string(from: state.publishedDate))
                    }
                    Button { state.run() }
                    label: { Text("Run now") }
                }

                if let autotune = state.autotune {
                    Section {
                        HStack {
                            Text("Carb ratio")
                            Spacer()
                            Text(isfFormatter.string(from: autotune.carbRatio as NSNumber) ?? "0")
                            Text("g/U").foregroundColor(.secondary)
                        }
                        HStack {
                            Text("Sensitivity")
                            Spacer()
                            if state.units == .mmolL {
                                Text(isfFormatter.string(from: autotune.sensitivity.asMmolL as NSNumber) ?? "0")
                            } else {
                                Text(isfFormatter.string(from: autotune.sensitivity as NSNumber) ?? "0")
                            }
                            Text(state.units.rawValue + "/U").foregroundColor(.secondary)
                        }
                    }

                    Section(header: Text("Basal profile")) {
                        ForEach(0 ..< autotune.basalProfile.count, id: \.self) { index in
                            HStack {
                                Text(autotune.basalProfile[index].start).foregroundColor(.secondary)
                                Spacer()
                                Text(rateFormatter.string(from: autotune.basalProfile[index].rate as NSNumber) ?? "0")
                                Text("U/hr").foregroundColor(.secondary)
                            }
                        }
                        HStack {
                            Text("Total")
                                .bold()
                                .foregroundColor(.primary)
                            Spacer()
                            Text(rateFormatter.string(from: autotune.basalProfile.reduce(0) { $0 + $1.rate } as NSNumber) ?? "0")
                                .foregroundColor(.primary) +
                                Text(" U/day")
                                .foregroundColor(.secondary)
                        }
                    }

                    Section {
                        Button { state.delete() }
                        label: { Text("Delete autotune data") }
                            .foregroundColor(.red)
                    }

                    Section {
                        Button { state.copyBasal() }
                        label: { Text("Copy basal rates to pump") }
                            .foregroundColor(.red)
                    }
                }
            }
            .onAppear(perform: configureView)
            .navigationTitle("Autotune")
            .navigationBarTitleDisplayMode(.automatic)
        }
    }
}
