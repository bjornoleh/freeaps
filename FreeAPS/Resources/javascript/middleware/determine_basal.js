function middleware(iob, currenttemp, glucose, profile, autosens, meal, reservoir, clock, pumphistory, preferences, basalProfile) {
     
    // This middleware will work with my "dyn_ISF_and_CR branch" and my "bdb" branch.
    const BG = glucose[0].glucose;
    var chrisFormula = preferences.enableChris;
    var useDynamicCR = preferences.enableDynamicCR;
    const minLimitChris = profile.autosens_min;
    const maxLimitChris = profile.autosens_max;
    const adjustmentFactor = preferences.adjustmentFactor;
    const currentMinTarget = profile.min_bg;
    var exerciseSetting = false;
    var enoughData = false;
    var pumpData = 0;
    var log = "";
    var logTDD = "";
    var logBasal = "";
    var logBolus = "";
    var logTempBasal = "";
    var current = 0;
    // If you have not set this to 0.05 in FAX settings (Omnipod), this will be set to 0.1 in code.
    var minimalDose = profile.bolus_increment;
    var TDD = 0;
    var insulin = 0;
    var tempInsulin = 0;
    var bolusInsulin = 0;
    var scheduledBasalInsulin = 0;
    var incrementsRaw = 0;
    var incrementsRounded = 0;
    var quota = 0;
    
    function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    
    function addTimeToDate(objDate, _hours) {
        var ms = objDate.getTime();
        var add_ms = _hours * 36e5;
        var newDateObj = new Date(ms + add_ms);
        return newDateObj;
    }
      
    function subtractTimeFromDate(date, hours_) {
        var ms_ = date.getTime();
        var add_ms_ = hours_ * 36e5;
        var new_date = new Date(ms_ - add_ms_);
        return new_date;
    }
    
    function accountForIncrements(insulin) {
        // If you have not set this to 0.05 in FAX settings (Omnipod), this will be set to 0.1 (Medtronic) in code.
        var minimalDose = profile.bolus_increment;
        if (minimalDose != 0.05) {
            minimalDose = 0.1;
        }
        var incrementsRaw = insulin / minimalDose;
        if (incrementsRaw >= 1) {
            var incrementsRounded = Math.floor(incrementsRaw);
            return round(incrementsRounded * minimalDose, 5);
        } else { return 0; }
    }

    function makeBaseString(base_timeStamp) {
        function addZero(i) {
            if (i < 10) {i = "0" + i}
            return i;
        }
        let hour = addZero(base_timeStamp.getHours());
        let minutes = addZero(base_timeStamp.getMinutes());
        let seconds = "00";
        let string = hour + ":" + minutes + ":" + seconds;
        return string;
    }
       
    function timeDifferenceOfString(string1, string2) {
        //Base time strings are in "00:00:00" format
        var time1 = new Date("1/1/1999 " + string1);
        var time2 = new Date("1/1/1999 " + string2);
        var ms1 = time1.getTime();
        var ms2 = time2.getTime();
        var difference = (ms1 - ms2) / 36e5;
        return difference;
    }

    function calcScheduledBasalInsulin(lastRealTempTime, addedLastTempTime) {
        var totalInsulin = 0;
        var old = addedLastTempTime;
        var totalDuration = (lastRealTempTime - addedLastTempTime) / 36e5;
        var basDuration = 0;
        var totalDurationCheck = totalDuration;
        var durationCurrentSchedule = 0;
        
        do {

            if (totalDuration > 0) {
                
                var baseTime_ = makeBaseString(old);
                
                //Default basalrate in case none is found...
                var basalScheduledRate_ = basalProfile[0].start;
                for (let m = 0; m < basalProfile.length; m++) {
                    
                    var timeToTest = basalProfile[m].start;
                    
                    if (baseTime_ == timeToTest) {
                        
                        if (m + 1 < basalProfile.length) {
                            let end = basalProfile[m+1].start;
                            let start = basalProfile[m].start;
                                                        
                            durationCurrentSchedule = timeDifferenceOfString(end, start);
                            
                            if (totalDuration >= durationCurrentSchedule) {
                                basDuration = durationCurrentSchedule;
                            } else if (totalDuration < durationCurrentSchedule) {
                                basDuration = totalDuration;
                            }
                            
                        }
                        else if (m + 1 == basalProfile.length) {
                            let end = basalProfile[0].start;
                            let start = basalProfile[m].start;
                            // First schedule is 00:00:00. Changed places of start and end here.
                            durationCurrentSchedule = 24 - (timeDifferenceOfString(start, end));
                            
                            if (totalDuration >= durationCurrentSchedule) {
                                basDuration = durationCurrentSchedule;
                            } else if (totalDuration < durationCurrentSchedule) {
                                basDuration = totalDuration;
                            }
                        
                        }
                        basalScheduledRate_ = basalProfile[m].rate;
                        totalInsulin += accountForIncrements(basalScheduledRate_ * basDuration);
                        totalDuration -= basDuration;
                        console.log("Dynamic ratios log: scheduled insulin added: " + accountForIncrements(basalScheduledRate_ * basDuration) + " U. Bas duration: " + basDuration.toPrecision(3) + " h. Base Rate: " + basalScheduledRate_ + " U/h" + ". Time :" + baseTime_);
                        // Move clock to new date
                        old = addTimeToDate(old, basDuration);
                    }
                    
                    else if (baseTime_ > timeToTest) {

                        if (m + 1 < basalProfile.length) {
                            var timeToTest2 = basalProfile[m+1].start
                         
                            if (baseTime_ < timeToTest2) {
                                
                               //  durationCurrentSchedule = timeDifferenceOfString(end, start);
                               durationCurrentSchedule = timeDifferenceOfString(timeToTest2, baseTime_);
                            
                                if (totalDuration >= durationCurrentSchedule) {
                                    basDuration = durationCurrentSchedule;
                                } else if (totalDuration < durationCurrentSchedule) {
                                    basDuration = totalDuration;
                                }
                                 
                                basalScheduledRate_ = basalProfile[m].rate;
                                totalInsulin += accountForIncrements(basalScheduledRate_ * basDuration);
                                totalDuration -= basDuration;
                                console.log("Dynamic ratios log: scheduled insulin added: " + accountForIncrements(basalScheduledRate_ * basDuration) + " U. Bas duration: " + basDuration.toPrecision(3) + " h. Base Rate: " + basalScheduledRate_ + " U/h" + ". Time :" + baseTime_);
                                // Move clock to new date
                                old = addTimeToDate(old, basDuration);
                            }
                        }
                    
                        else if (m == basalProfile.length - 1) {
                            // let start = basalProfile[m].start;
                            let start = baseTime_;
                            // First schedule is 00:00:00. Changed places of start and end here.
                            durationCurrentSchedule = timeDifferenceOfString("23:59:59", start);
                            
                            if (totalDuration >= durationCurrentSchedule) {
                                basDuration = durationCurrentSchedule;
                            } else if (totalDuration < durationCurrentSchedule) {
                                basDuration = totalDuration;
                            }
                            
                            basalScheduledRate_ = basalProfile[m].rate;
                            totalInsulin += accountForIncrements(basalScheduledRate_ * basDuration);
                            totalDuration -= basDuration;
                            console.log("Dynamic ratios log: scheduled insulin added: " + accountForIncrements(basalScheduledRate_ * basDuration) + " U. Bas duration: " + basDuration.toPrecision(3) + " h. Base Rate: " + basalScheduledRate_ + " U/h" + ". Time :" + baseTime_);
                            // Move clock to new date
                            old = addTimeToDate(old, basDuration);
                        }
                    }
                }
            }
            //totalDurationCheck to avoid infinite loop
        } while (totalDuration > 0 && totalDuration < totalDurationCheck);
        
        // amount of insulin according to pump basal rate schedules
        return totalInsulin;
    }
    //------------- End of added functions ----------------------------------------------------
    
    if (profile.high_temptarget_raises_sensitivity == true || profile.exercise_mode == true) {
        exerciseSetting = true;
    }
    
    // Turn off Chris' formula (and AutoISF) when using a temp target >= 118 (6.5 mol/l) and if an exercise setting is enabled.
    // If using AutoISF uncomment the profile.use_autoisf = false
    if (currentMinTarget >= 118 && exerciseSetting == true) {
        // profile.use_autoisf = false;
        chrisFormula = false;
        log = "Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: " + currentMinTarget;
    }
    
    // Check that there is enough pump history data (>23 hours) for TDD calculation, else end this middleware.
    if (chrisFormula == true) {
        let ph_length = pumphistory.length;
        let endDate = new Date(pumphistory[ph_length-1].timestamp);
        let startDate = new Date(pumphistory[0].timestamp);
        // If latest pump event is a temp basal
        if (pumphistory[0]._type == "TempBasalDuration") {
            startDate = new Date();
        }
        // > 23 hours
        pumpData = (startDate - endDate) / 36e5;
        if (pumpData >= 23) {
            enoughData = true;
        } else {
                chrisFormula = false;
                return "Dynamic ISF is temporarily off. 24 hours of data is required for a correct TDD calculation. Currently only " + pumpData.toPrecision(3) + " hours of pump history data available.";
        }
    }
    
    // Calculate TDD --------------------------------------
    //Bolus:
    for (let i = 0; i < pumphistory.length; i++) {
        if (pumphistory[i]._type == "Bolus") {
            bolusInsulin += pumphistory[i].amount;
        }
    }
    
    // Temp basals:
    if (minimalDose != 0.05) {
        minimalDose = 0.1;
    }
    for (let j = 1; j < pumphistory.length; j++) {
        if (pumphistory[j]._type == "TempBasal" && pumphistory[j].rate > 0) {
            current = j;
            quota = pumphistory[j].rate;
            var duration = pumphistory[j-1]['duration (min)'] / 60;
            var origDur = duration;
            var pastTime = new Date(pumphistory[j-1].timestamp);
            // If temp basal hasn't yet ended, use now as end date for calculation
            do {
                j--;
                if (j <= 0) {
                    morePresentTime =  new Date();
                    break;
                } else if (pumphistory[j]._type == "TempBasal" || pumphistory[j]._type == "PumpSuspend") {
                        morePresentTime = new Date(pumphistory[j].timestamp);
                        break;
                  }
            }
            while (j >= 0);
            
            var diff = (morePresentTime - pastTime) / 36e5;
            if (diff < origDur) {
                duration = diff;
            }
            
            insulin = quota * duration;
                
            // Account for smallest possible pump dosage
            incrementsRaw = insulin / minimalDose;
            if (incrementsRaw >= 1) {
                incrementsRounded = Math.floor(incrementsRaw);
                insulin = incrementsRounded * minimalDose;
                tempInsulin += insulin;
            } else { insulin = 0}
            j = current;
        }
    }
    //  Check and count for when basals are delivered with a scheduled basal rate or an Autotuned basal rate.
    //  1. Check for 0 temp basals with 0 min duration. This is for when ending a manual temp basal and (perhaps) continuing in open loop for a while.
    //  2. Check for temp basals that completes. This is for when disconnected from link/iphone, or when in open loop.
    //  3. Account for a punp suspension. This is for when pod screams or when MDT or pod is manually suspended.
    //  4. Account for a pump resume (in case pump/cgm is disconnected before next loop).
    //  To do: are there more circumstances when scheduled basal rates are used?
    //
    for (let k = 0; k < pumphistory.length; k++) {
        // Check for 0 temp basals with 0 min duration.
        insulin = 0;
        if (pumphistory[k]['duration (min)'] == 0 || pumphistory[k]._type == "PumpResume") {
            let time1 = new Date(pumphistory[k].timestamp);
            let time2 = time1;
            let l = k;
            do {
                --l;
                if (pumphistory[l]._type == "TempBasal" && l >= 0) {
                    time2 = new Date(pumphistory[l].timestamp);
                    break;
                }
            } while (l > 0);
            // duration of current scheduled basal in h
            let basDuration = (time2 - time1) / 36e5;
            if (basDuration > 0) {
                let hour = time1.getHours();
                let minutes = time1.getMinutes();
                let seconds = "00";
                let string = "" + hour + ":" + minutes + ":" + seconds;
                let baseTime = new Date(string);
                let basalScheduledRate = profile.basalprofile[0].start;
                for (let m = 0; m < profile.basalprofile.length; m++) {
                    if (profile.basalprofile[m].start == baseTime) {
                        basalScheduledRate = profile.basalprofile[m].rate;
                        insulin = basalScheduledRate * basDuration;
                        break;
                    }
                    else if (m + 1 < profile.basalprofile.length) {
                        if (profile.basalprofile[m].start < baseTime && profile.basalprofile[m+1].start > baseTime) {
                            basalScheduledRate = profile.basalprofile[m].rate;
                            insulin = basalScheduledRate * basDuration;
                            break;
                        }
                    }
                    else if (m == profile.basalprofile.length - 1) {
                        basalScheduledRate = profile.basalprofile[m].rate;
                        insulin = basalScheduledRate * basDuration;
                        break;
                    }
                }
                // Account for smallest possible pump dosage
                incrementsRaw = insulin / minimalDose;
                if (incrementsRaw >= 1) {
                    incrementsRounded = Math.floor(incrementsRaw);
                    insulin = incrementsRounded * minimalDose;
                    scheduledBasalInsulin += insulin;
                } else { insulin = 0;
                    
                }
            }
        }
    }
    
    // Check for temp basals that completes
    for (let n = pumphistory.length -1; n > 0; n--) {
        if (pumphistory[n]._type == "TempBasalDuration") {
            // duration in hours
            let oldBasalDuration = pumphistory[n]['duration (min)'] / 60;
            // time of old temp basal
            let oldTime = new Date(pumphistory[n].timestamp);
                        
            let newTime = oldTime;
            let o = n;
            do {
                --o;
                if (o >= 0) {
                    if (pumphistory[o]._type == "TempBasal" || pumphistory[o]._type == "PumpSuspend") {
                        // time of next (new) temp basal or a pump suspension
                        newTime = new Date(pumphistory[o].timestamp);
                        break;
                    }
                }
            } while (o > 0);
            
            // When latest temp basal is index 0 in pump history
            if (n == 0 && pumphistory[0]._type == "TempBasalDuration") {
                newTime = new Date();
                oldBasalDuration = pumphistory[n]['duration (min)'] / 60;
            }
            
            // Time difference in hours, new - old
            let tempBasalTimeDifference = (newTime - oldTime) / 36e5;
            
            let timeOfbasal = tempBasalTimeDifference - oldBasalDuration;
            
            // if duration of scheduled basal is more than 0
            if (timeOfbasal > 0) {
                
                // Timestamp after completed temp basal
                let timeOfScheduledBasal = new Date(oldTime.getTime() + oldBasalDuration*36e5);
                
                let hour = timeOfScheduledBasal.getHours();
                let minutes = timeOfScheduledBasal.getMinutes();
                let seconds = "00";
                // "hour:minutes:00"
                let baseTime = "" + hour + ":" + minutes + ":" + seconds;
                                
                // Default if correct basal schedule rate not found
                let basalScheduledRate = profile.basalprofile[0].rate;
    
                for (let p = 0; p < profile.basalprofile.length; ++p) {
                    let basalRateTime = new Date(profile.basalprofile[p].start);
                    if (basalRateTime == baseTime) {
                        basalScheduledRate = profile.basalprofile[p].rate;
                        break;
                    }
                    else if (p+1 < profile.basalprofile.length) {
                        let nextBasalRateTime = new Date(profile.basalprofile[p+1].start);
                        if (basalRateTime < baseTime && nextBasalRateTime > baseTime) {
                            basalScheduledRate = profile.basalprofile[p].rate;
                            break;
                        }
                    }
                    else if (p == (profile.basalprofile.length - 1)) {
                        basalScheduledRate = profile.basalprofile[p].rate;
                        break;
                    }
                }
                
                insulin = basalScheduledRate * timeOfbasal;
                // Account for smallest possible pump dosage
                incrementsRaw = insulin / minimalDose;
                if (incrementsRaw >= 1) {
                    incrementsRounded = Math.floor(incrementsRaw);
                    scheduledBasalInsulin += incrementsRounded * minimalDose;
                } else { insulin = 0}
            }
        }
    }
    
    // ----------------------------------------------------

    TDD = bolusInsulin + tempInsulin + scheduledBasalInsulin;
    logBolus = ". Bolus insulin: " + bolusInsulin.toPrecision(5) + " U";
    logTempBasal = ". Temporary basal insulin: " + tempInsulin.toPrecision(5) + " U";
    logBasal = ". Insulin with scheduled basal rate: " + scheduledBasalInsulin.toPrecision(5) + " U";
    logTDD = ". TDD past 24h is: " + TDD.toPrecision(5) + " U";
    
    var startLog = "Dynamic ratios log: ";
    var afLog = "AF: " + adjustmentFactor + ". ";
    var bgLog = "BG: " + BG + " mg/dl (" + (BG * 0.0555).toPrecision(2) + " mmol/l). ";
    var formula = "";

    // Insulin curve
    const curve = preferences.curve;
    const ipt = preferences.insulinPeakTime;
    const ucpk = preferences.useCustomPeakTime;
    var insulinFactor = 55;
    switch (curve) {
        case "rapid-acting":
            insulinFactor = 55;
            break;
        case "ultra-rapid":
            if (ipt < 75 && ucpk == true) {
                insulinFactor = 120 - ipt;
            } else { insulinFactor = 70; }
            break;
    }

    // Modified Chris Wilson's' formula with added adjustmentFactor for tuning and use instead of autosens:
    // var newRatio = profile.sens * adjustmentFactor * TDD * BG / 277700;
    //
    // New logarithmic formula : var newRatio = profile.sens * adjustmentFactor * TDD * ln(( BG/insulinFactor) + 1 )) / 1800
    //
    if (preferences.useNewFormula == true) {
        var newRatio = profile.sens * adjustmentFactor * TDD * Math.log(BG/insulinFactor+1) / 1800;
        formula = "Logarithmic formula. InsulinFactor: " + insulinFactor + ". ";

    }
    else {
        var newRatio = profile.sens * adjustmentFactor * TDD * BG / 277700;
        formula = "Original formula. ";
    }
            
    var isf = profile.sens / newRatio;

    // Dynamic CR (Test)
    var cr = profile.carb_ratio;
    if (useDynamicCR == true) {
        cr = round(profile.carb_ratio/newRatio, 2);
        profile.carb_ratio = cr;
    }
    
    if (chrisFormula == true && TDD > 0) {
       
        log = "Dynamic autosens.ratio set to " + newRatio.toPrecision(3) + " with ISF: " + isf.toPrecision(3) + " mg/dl/U (" + (isf * 0.0555).toPrecision(3) + " mmol/l/U) and CR: " + cr + " g/U";

        // Respect autosens.max and autosens.min limits
        if (newRatio > maxLimitChris) {
            log = "Dynamic ISF hit limit by autosens_max setting: " + maxLimitChris + " (" +  newRatio.toPrecision(3) + ")" + ". ISF: " + (profile.sens / maxLimitChris).toPrecision(3) + " mg/dl/U (" + ((profile.sens / maxLimitChris) * 0.0555).toPrecision(3) + " mmol/l/U) and CR: " + cr + " g/U";
            newRatio = maxLimitChris;
        } else if (newRatio < minLimitChris) {
            log = "Dynamic ISF hit limit by autosens_min setting: " + minLimitChris + " (" +  newRatio.toPrecision(3) + ")" + ". ISF: " + (profile.sens / minLimitChris).toPrecision(3) + " mg/dl/U (" + ((profile.sens / minLimitChris) * 0.0555).toPrecision(3) + " mmol/l/U) and CR: " + cr + " g/U";
            newRatio = minLimitChris;
        }
        
        function round(value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
        
        // Set the new ratio
        autosens.ratio = round(newRatio, 2);
        
        logOutPut = startLog + dataLog + bgLog + afLog + formula + log + logTDD + logBolus + logTempBasal + logBasal;
    } else if (chrisFormula == false && useDynamicCR == true) {
        logOutPut = startLog + bgLog + afLog + formula + "Dynamic ISF is off. Dynamic CR: " + cr + " g/U.";
    } else {
        logOutPut = startLog + "Dynamic ISF is off. Dynamic CR is off." ;
    }

    return logOutPut;

}