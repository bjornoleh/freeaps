import Foundation

enum CGMType: String, JSON, CaseIterable, Identifiable {
    var id: String { rawValue }

    case dexcomG6
    case dexcomG5
    case glucoseDirect
    case enlite
    case libreTransmitter
    case xdripLeft
    case xdripRight
    case nightscout
    case simulator

    var displayName: String {
        switch self {
        case .nightscout:
            return "Nightscout"
        case .xdripLeft:
            return "xDrip venstre"
        case .xdripRight:
            return "xDrip høyre"
        case .glucoseDirect:
            return "Glucose Direct"
        case .dexcomG6:
            return "Dexcom G6"
        case .dexcomG5:
            return "Dexcom G5"
        case .simulator:
            return NSLocalizedString("Glucose Simulator", comment: "Glucose Simulator CGM type")
        case .libreTransmitter:
            return NSLocalizedString("Libre Transmitter", comment: "Libre Transmitter type")
        case .enlite:
            return "Medtronic Enlite"
        }
    }

    var appURL: URL? {
        switch self {
        case .enlite,
             .nightscout:
            return nil
        case .xdripLeft:
            return URL(string: "xdripswiftLeft://")!
        case .xdripRight:
            return URL(string: "xdripswiftRight://")!
        case .glucoseDirect:
            return URL(string: "libredirect://")!
        case .dexcomG6:
            return URL(string: "dexcomg6://")!
        case .dexcomG5:
            return URL(string: "dexcomgcgm://")!
        case .simulator:
            return nil
        case .libreTransmitter:
            return URL(string: "freeaps-x://libre-transmitter")!
        }
    }

    var externalLink: URL? {
        switch self {
        case .xdripLeft:
            return URL(string: "https://github.com/JohanDegraeve/xdripswift")!
        case .xdripRight:
            return URL(string: "https://github.com/JohanDegraeve/xdripswift")!
        case .glucoseDirect:
            return URL(string: "https://github.com/creepymonster/GlucoseDirectApp")!
        default: return nil
        }
    }

    var subtitle: String {
        switch self {
        case .nightscout:
            return NSLocalizedString("Online or internal server", comment: "Online or internal server")
        case .xdripLeft:
            return NSLocalizedString(
                "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors",
                comment: "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors"
            )
        case .xdripRight:
            return NSLocalizedString(
                "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors",
                comment: "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors"
            )
        case .dexcomG6:
            return NSLocalizedString("Native G6 app", comment: "Native G6 app")
        case .dexcomG5:
            return NSLocalizedString("Native G5 app", comment: "Native G5 app")
        case .simulator:
            return NSLocalizedString("Simple simulator", comment: "Simple simulator")
        case .libreTransmitter:
            return NSLocalizedString(
                "Direct connection with Libre 1 transmitters or European Libre 2 sensors",
                comment: "Direct connection with Libre 1 transmitters or European Libre 2 sensors"
            )
        case .glucoseDirect:
            return NSLocalizedString(
                "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors",
                comment: "Shared app group for direct connection with Libre 1 transmitters or European Libre 2 sensors"
            )
        case .enlite:
            return NSLocalizedString("Minilink transmitter", comment: "Minilink transmitter")
        }
    }
}
