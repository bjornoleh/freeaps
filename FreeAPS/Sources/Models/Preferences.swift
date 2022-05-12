import Foundation

struct Preferences: JSON {
    var maxIOB: Decimal = 4
    var maxDailySafetyMultiplier: Decimal = 3
    var currentBasalSafetyMultiplier: Decimal = 4
    var autosensMax: Decimal = 1.2
    var autosensMin: Decimal = 0.7
    var autoisf: Bool = false
    var autoISFhourlyChange: Decimal = 0.25
    var autoISFmax: Decimal = 1.3
    var autoISFmin: Decimal = 1
    var smbDeliveryRatio: Decimal = 0.5
    var smbMaxRangeExtension: Decimal = 1
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
    var floatingcarbs: Bool = false
    var smbDeliveryRatioBGrange: Decimal = 0
    var smbDeliveryRatioMin: Decimal = 0.5
    var smbDeliveryRatioMax: Decimal = 0.75
    var enableautoISFwithCOB: Bool = false
    var higherISFrangeWeight: Decimal = 0
    var lowerISFrangeWeight: Decimal = 0
    var deltaISFrangeWeight: Decimal = 0
    var postMealISFweight: Decimal = 0
    var postMealISFduration: Decimal = 3
    var postMealISFalways: Bool = false
    var bgAccelISFweight: Decimal = 0
    var bgBrakeISFweight: Decimal = 0
    var enableBGacceleration: Bool = false
    var enableChris: Bool = true
    var adjustmentFactor: Decimal = 1
    var enableDynamicCR: Bool = false
    var useNewFormula: Bool = false
    var use_Static_COB_decay: Bool = false
    var cobDecayAdjust: Decimal = 1
    var crSensRefBG: Decimal = 100
    var minCRratio: Decimal = 1
    var maxCRratio: Decimal = 1
}

extension Preferences {
    private enum CodingKeys: String, CodingKey {
        case maxIOB = "max_iob"
        case maxDailySafetyMultiplier = "max_daily_safety_multiplier"
        case currentBasalSafetyMultiplier = "current_basal_safety_multiplier"
        case autosensMax = "autosens_max"
        case autosensMin = "autosens_min"
        case autoisf = "use_autoisf"
        case autoISFhourlyChange = "autoisf_hourlychange"
        case autoISFmax = "autoisf_max"
        case autoISFmin = "autoisf_min"
        case smbDeliveryRatio = "smb_delivery_ratio"
        case smbMaxRangeExtension = "smb_max_range_extension"
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
        case floatingcarbs = "floating_carbs"
        case smbDeliveryRatioBGrange = "smb_delivery_ratio_bg_range"
        case smbDeliveryRatioMin = "smb_delivery_ratio_min"
        case smbDeliveryRatioMax = "smb_delivery_ratio_max"
        case enableautoISFwithCOB = "enableautoisf_with_COB"
        case higherISFrangeWeight = "higher_ISFrange_weight"
        case lowerISFrangeWeight = "lower_ISFrange_weight"
        case deltaISFrangeWeight = "delta_ISFrange_weight"
        case postMealISFweight = "postmeal_ISF_weight"
        case postMealISFduration = "postmeal_ISF_duration"
        case postMealISFalways = "enableppisf_always"
        case bgAccelISFweight = "bgAccel_ISF_weight"
        case bgBrakeISFweight = "bgBrake_ISF_weight"
        case enableBGacceleration = "enable_BG_acceleration"
        case adjustmentFactor
        case enableChris
        case enableDynamicCR
        case useNewFormula
        case use_Static_COB_decay
        case cobDecayAdjust
        case crSensRefBG
        case minCRratio
        case maxCRratio
    }
}

enum InsulinCurve: String, JSON, Identifiable, CaseIterable {
    case rapidActing = "rapid-acting"
    case ultraRapid = "ultra-rapid"
    case bilinear

    var id: InsulinCurve { self }
}
