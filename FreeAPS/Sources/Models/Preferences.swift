import Foundation

struct Preferences: JSON {
    var maxIOB: Decimal = 4
    var maxDailySafetyMultiplier: Decimal = 3
    var currentBasalSafetyMultiplier: Decimal = 4
    var autosensMax: Decimal = 1.2
    var autosensMin: Decimal = 0.7
    var smbDeliveryRatio: Decimal = 0.5
    var rewindResetsAutosens: Bool = false
    var highTemptargetRaisesSensitivity: Bool = true
    var lowTemptargetLowersSensitivity: Bool = true
    var sensitivityRaisesTarget: Bool = false
    var resistanceLowersTarget: Bool = false
    var advTargetAdjustments: Bool = false
    var exerciseMode: Bool = false
    var halfBasalExerciseTarget: Decimal = 160
    var maxCOB: Decimal = 120
    var wideBGTargetRange: Bool = false
    var skipNeutralTemps: Bool = false
    var unsuspendIfNoTemp: Bool = false
    var bolusSnoozeDIADivisor: Decimal = 2
    var min5mCarbimpact: Decimal = 8
    var autotuneISFAdjustmentFraction: Decimal = 1.0
    var remainingCarbsFraction: Decimal = 1.0
    var remainingCarbsCap: Decimal = 90
    var enableUAM: Bool = true
    var a52RiskEnable: Bool = false
    var enableSMBWithCOB: Bool = true
    var enableSMBWithTemptarget: Bool = true
    var enableSMBAlways: Bool = true
    var enableSMBAfterCarbs: Bool = true
    var allowSMBWithHighTemptarget: Bool = false
    var maxSMBBasalMinutes: Decimal = 90
    var maxUAMSMBBasalMinutes: Decimal = 60
    var smbInterval: Decimal = 3
    var bolusIncrement: Decimal = 0.05
    var curve: InsulinCurve = .ultraRapid
    var useCustomPeakTime: Bool = false
    var insulinPeakTime: Decimal = 75
    var carbsReqThreshold: Decimal = 1.0
    var noisyCGMTargetMultiplier: Decimal = 1.3
    var suspendZerosIOB: Bool = true
    var timestamp: Date?
    var maxDeltaBGthreshold: Decimal = 0.2
    var adjustmentFactor: Decimal = 1.0
    var sigmoid: Bool = false
    var enableDynamicCR: Bool = false
    var useNewFormula: Bool = false
    var useWeightedAverage: Bool = false
    var weightPercentage: Decimal = 0.65
    var crScaleFactor: Decimal = 1
    var minCRratio: Decimal = 1
    var maxCRratio: Decimal = 1
    var tddAdjBasal: Bool = false
    var threshold_setting: Decimal = 65
}

extension Preferences {
    private enum CodingKeys: String, CodingKey {
        case maxIOB = "max_iob"
        case maxDailySafetyMultiplier = "max_daily_safety_multiplier"
        case currentBasalSafetyMultiplier = "current_basal_safety_multiplier"
        case autosensMax = "autosens_max"
        case autosensMin = "autosens_min"
        case smbDeliveryRatio = "smb_delivery_ratio"
        case rewindResetsAutosens = "rewind_resets_autosens"
        case highTemptargetRaisesSensitivity = "high_temptarget_raises_sensitivity"
        case lowTemptargetLowersSensitivity = "low_temptarget_lowers_sensitivity"
        case sensitivityRaisesTarget = "sensitivity_raises_target"
        case resistanceLowersTarget
        case advTargetAdjustments = "adv_target_adjustments"
        case exerciseMode = "exercise_mode"
        case halfBasalExerciseTarget = "half_basal_exercise_target"
        case maxCOB
        case wideBGTargetRange = "wide_bg_target_range"
        case skipNeutralTemps = "skip_neutral_temps"
        case unsuspendIfNoTemp = "unsuspend_if_no_temp"
        case bolusSnoozeDIADivisor = "bolussnooze_dia_divisor"
        case min5mCarbimpact = "min_5m_carbimpact"
        case autotuneISFAdjustmentFraction = "autotune_isf_adjustmentFraction"
        case remainingCarbsFraction
        case remainingCarbsCap
        case enableUAM
        case a52RiskEnable = "A52_risk_enable"
        case enableSMBWithCOB = "enableSMB_with_COB"
        case enableSMBWithTemptarget = "enableSMB_with_temptarget"
        case enableSMBAlways = "enableSMB_always"
        case enableSMBAfterCarbs = "enableSMB_after_carbs"
        case allowSMBWithHighTemptarget = "allowSMB_with_high_temptarget"
        case maxSMBBasalMinutes
        case maxUAMSMBBasalMinutes
        case smbInterval = "SMBInterval"
        case bolusIncrement = "bolus_increment"
        case curve
        case useCustomPeakTime
        case insulinPeakTime
        case carbsReqThreshold
        case noisyCGMTargetMultiplier
        case suspendZerosIOB = "suspend_zeros_iob"
        case maxDeltaBGthreshold = "maxDelta_bg_threshold"
        case adjustmentFactor
        case sigmoid
        case enableDynamicCR
        case useNewFormula
        case useWeightedAverage
        case weightPercentage
        case crScaleFactor
        case minCRratio
        case maxCRratio
        case tddAdjBasal
        case threshold_setting
    }
}

enum InsulinCurve: String, JSON, Identifiable, CaseIterable {
    case rapidActing = "rapid-acting"
    case ultraRapid = "ultra-rapid"
    case bilinear

    var id: InsulinCurve { self }
}
