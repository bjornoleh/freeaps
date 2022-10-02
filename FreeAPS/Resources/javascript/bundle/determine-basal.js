var freeaps_determineBasal;(()=>{var e={5546:(e,r,t)=>{var o=t(6880);function i(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function n(e,a){return"mmol/L"===a.out_units?i(.0555*e,1):Math.round(e)}var s="",l="",m="",u="",d="",c="",g="",h="",f="";function p(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,i=r[0],n=t[0],s=r[o],l=t[o],m=1,u=1,d=1,c=i;if(i>e)m=(u=n)+((l=t[1])-u)/((s=r[1])-(d=i))*(e-d);else if(s<e)m=(u=n=t[o-1])+(l-u)/(s-(d=i=r[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(n=t[g],(i=r[g])==e){m=n;break}if(i>e){m=u+(n-u)/(i-(d=c))*(e-d);break}u=n,c=i}return m*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}function b(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limited by minimum value "+t),t;var o=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+o),o;var n=t+(o-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+i(n,2)),n}e.exports=function(e,r,t,v,B,_,M,y,x,S,D,C,w,F,I){var T=0,G="",U="",R="",O="",A="",P=0,j=(F=0,0),q=0,k=0,W=0;const E=I.weightedAverage,L=v.weightPercentage,z=I.average_total_data;function N(e,a){var r=e.getTime();return new Date(r+36e5*a)}function Z(e){var a=v.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?i(Math.floor(r)*a,5):0}function $(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function H(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function J(e,a){var r=0,t=a,o=(e-a)/36e5,i=0,n=o,s=0;do{if(o>0){var l=$(t),m=w[0].rate;for(let e=0;e<w.length;e++){var u=w[e].start;if(l==u){if(e+1<w.length){o>=(s=H(w[e+1].start,w[e].start))?i=s:o<s&&(i=o)}else if(e+1==w.length){let a=w[0].start;o>=(s=24-H(w[e].start,a))?i=s:o<s&&(i=o)}r+=Z((m=w[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+Z(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=N(t,i)}else if(l>u)if(e+1<w.length){var d=w[e+1].start;l<d&&(o>=(s=H(d,l))?i=s:o<s&&(i=o),r+=Z((m=w[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+Z(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=N(t,i))}else if(e==w.length-1){o>=(s=H("23:59:59",l))?i=s:o<s&&(i=o),r+=Z((m=w[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+Z(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=N(t,i)}}}}while(o>0&&o<n);return r}if(D.length){let e=D.length-1;var K=new Date(D[e].timestamp),Q=new Date(D[0].timestamp);if("TempBasalDuration"==D[0]._type&&(Q=new Date),(T=(Q-K)/36e5)>21&&T<24)k=J(K,(V=24-T,X=K.getTime(),new Date(X-36e5*V))),O="24 hours of data is required for an accurate tdd calculation. Currently only "+T.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+k.toPrecision(5)+" U. ";else O=""}else console.log("Pumphistory is empty!"),se=!1,enableDynamicCR=!1;var V,X;for(let e=0;e<D.length;e++)"Bolus"==D[e]._type&&(q+=D[e].amount);for(let e=1;e<D.length;e++)if("TempBasal"==D[e]._type&&D[e].rate>0){P=e,W=D[e].rate;var Y=D[e-1]["duration (min)"]/60,ee=Y,ae=new Date(D[e-1].timestamp),re=ae;do{if(e--,0==e){re=new Date;break}if("TempBasal"==D[e]._type||"PumpSuspend"==D[e]._type){re=new Date(D[e].timestamp);break}}while(e>0);var te=(re-ae)/36e5;te<ee&&(Y=te),j+=Z(W*Y),e=P}for(let e=0;e<D.length;e++)if(0,0==D[e]["duration (min)"]||"PumpResume"==D[e]._type){let a=new Date(D[e].timestamp),r=a,t=e;do{if(t>0&&(--t,"TempBasal"==D[t]._type)){r=new Date(D[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(k+=J(r,a))}for(let e=D.length-1;e>0;e--)if("TempBasalDuration"==D[e]._type){let a=D[e]["duration (min)"]/60,r=new Date(D[e].timestamp);var oe=r;let t=e;do{if(--t,t>=0&&("TempBasal"==D[t]._type||"PumpSuspend"==D[t]._type)){oe=new Date(D[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==D[0]._type&&(oe=new Date,a=D[e]["duration (min)"]/60),(oe-r)/36e5-a>0){k+=J(oe,N(r,a))}}var ie=F=q+j+k;T>21?(U=". Bolus insulin: "+q.toPrecision(5)+" U",R=". Temporary basal insulin: "+j.toPrecision(5)+" U",G=". Insulin with scheduled basal rate: "+k.toPrecision(5)+" U",A=O+(" TDD past 24h is: "+F.toPrecision(5)+" U")+U+R+G,tddReason=E>0&&z>0?", TDD: "+i(F,1)+" U, Weighted avg: "+i(E,1)+" U, Total data avg: "+i(z,1)+" U":", TDD: "+i(F,2)):tddReason=", TDD: Not enough pumpData (< 21h)";const ne=e.glucose;var se=C.enableChris,le=C.enableDynamicCR;const me=v.autosens_min,ue=v.autosens_max,de=v.minCRratio,ce=v.maxCRratio,ge=C.adjustmentFactor,he=v.min_bg;var fe=!1,pe="",be=1,ve=v.crScaleFactor,Be="",_e="";z>0&&(be=E/z),be>1?(be=i(be=Math.min(be,v.autosens_max),2),console.log("Basal adjustment with a 24 hour to 7 day average TDD ratio (limited by Autosens max setting). Basal Ratio: "+be+". Upper limit = Autosens max ("+v.autosens_max+")")):be<1?(be=i(be=Math.max(be,v.autosens_min),2),console.log("Basal adjustment with a 24 hour to 7 day average TDD ratio (limited by Autosens min setting). Basal Ratio: "+be+". Lower limit = Autosens min ("+v.autosens_min+")")):console.log("Basal adjusted with a 24 hour to 7 day average TDD ratio: "+be);var Me=", Basal ratio: "+be;1!=v.high_temptarget_raises_sensitivity&&1!=v.exercise_mode||(fe=!0),se&&(v.use_autoisf=!1,console.log("autoISF is off. dynISF is on")),he>=118&&1==fe&&(v.use_autoisf=!1,se=!1,pe="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+he);var ye=", Dynamic ratios log: ",xe=", AF: "+ge,Se="BG: "+ne+" mg/dl ("+(.0555*ne).toPrecision(2)+" mmol/l)",De="",Ce="";const we=C.curve,Fe=C.insulinPeakTime,Ie=C.useCustomPeakTime;var Te=55,Ge=65;switch(we){case"rapid-acting":Ge=65;break;case"ultra-rapid":Ge=50}if(Ie?(Te=120-Fe,console.log("Custom insulinpeakTime set to :"+Fe+", insulinFactor: "+Te)):(Te=120-Ge,console.log("insulinFactor set to : "+Te)),ie=F,L<1&&E>0&&(F=E,console.log("Using weighted TDD average: "+i(F,2)+" U, instead of past 24 h ("+i(ie,2)+" U), weight: "+L),Ce=", Weighted TDD: "+i(F,2)+" U"),C.useNewFormula){var Ue=v.sens*ge*F*Math.log(ne/Te+1)/1800;De=", Logarithmic formula"}else{Ue=v.sens*ge*F*ne/277700;De=", Original formula"}var Re=v.carb_ratio,Oe="",Ae="";if(1==se&&F>0){Oe=", Dynamic ISF/CR: On/",Ue>ue?(pe=", Dynamic ISF limited by autosens_max setting: "+ue+" ("+i(Ue,2)+"), ",Ae=", Autosens/Dynamic Limit: "+ue+" ("+i(Ue,2)+")",Ue=ue):Ue<me&&(pe=", Dynamic ISF limjted by autosens_min setting: "+me+" ("+i(Ue,2)+"). ",Ae=", Autosens/Dynamic Limit: "+me+" ("+i(Ue,2)+")",Ue=me);var Pe=(tdd24h_7d_Ratio-1)*ve+1;Pe>ce?(_e=". TDD adjusted CR hit limit by maxCRratio setting: "+ce+" ("+Pe.toPrecision(4)+"), CR: "+(v.carb_ratio/ce).toPrecision(3)+" g/U ",Pe=ce):Pe<de&&(_e=". TDD adjusted CR hit limit by minCRratio setting: "+de+" ("+Pe.toPrecision(4)+"), CR: "+(v.carb_ratio/de).toPrecision(3)+" g/U ",Pe=de);Re=v.carb_ratio;1==le?(Oe+="On",Re=i(Re/Pe,1),v.carb_ratio=Re,Be=" TDD-corrected CR is on, crRatio = "+Pe.toPrecision(4)+", CR scale factor: "+ve+", TDD-corrected CR: "+Re.toPrecision(3)+" g/U"):(Oe+="Off",Be=" TDD-corrected CR is off, CR = "+Re.toPrecision(3)+" g/U. ");var je=v.sens/Ue;pe+=", Dynamic autosens.ratio set to "+i(Ue,2)+" with ISF: "+je.toPrecision(3)+" mg/dl/U ("+(.0555*je).toPrecision(3)+" mmol/l/U)"+Oe,B.ratio=Ue,A+=ye+Se+xe+De+pe+Be+_e+Ce}else A+=0==se&&1==le?ye+Se+xe+De+"Dynamic ISF is off."+Be+_e+Ce:ye+"Dynamic ISF is off. Dynamic CR is off.";console.log(A),tddReason+=0==se&&0==le?"":Me+Oe+De+Ae;var qe={},ke=new Date;if(S&&(ke=S),void 0===v||void 0===v.current_basal)return qe.error="Error: could not get current basal rate",qe;var We=o(v.current_basal,v),Ee=We,Le=new Date;S&&(Le=S);var ze,Ne=new Date(e.date),Ze=i((Le-Ne)/60/1e3,1),$e=e.glucose,He=e.noise;ze=e.delta>-.5?"+"+i(e.delta,0):i(e.delta,0);var Je=Math.min(e.delta,e.short_avgdelta),Ke=Math.min(e.short_avgdelta,e.long_avgdelta),Qe=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);($e<=10||38===$e||He>=3)&&(qe.reason="CGM is calibrating, in ??? state, or noise is high");if($e>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n($e,v)+"+"+n(e.delta,v)+") for 5m w/ "+n(e.short_avgdelta,v)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),Ze>12||Ze<-5?qe.reason="If current system time "+Le+" is correct, then BG data is too old. The last BG data was read "+Ze+"m ago at "+Ne:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?qe.reason="CGM was just calibrated":qe.reason="CGM data is unchanged ("+n($e,v)+"+"+n(e.delta,v)+") for 5m w/ "+n(e.short_avgdelta,v)+" mg/dL ~15m change & "+n(e.long_avgdelta,v)+" mg/dL ~45m change"),$e<=10||38===$e||He>=3||Ze>12||Ze<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return r.rate>=Ee?(qe.reason+=". Canceling high temp basal of "+r.rate,qe.deliverAt=ke,qe.temp="absolute",qe.duration=0,qe.rate=0,qe):0===r.rate&&r.duration>30?(qe.reason+=". Shortening "+r.duration+"m long zero temp to 30m. ",qe.deliverAt=ke,qe.temp="absolute",qe.duration=30,qe.rate=0,qe):(qe.reason+=". Temp "+r.rate+" <= current basal "+Ee+"U/hr; doing nothing. ",qe);var Ve,Xe,Ye,ea=v.max_iob;if(void 0!==v.min_bg&&(Xe=v.min_bg),void 0!==v.max_bg&&(Ye=v.max_bg),void 0===v.min_bg||void 0===v.max_bg)return qe.error="Error: could not determine target_bg. ",qe;Ve=(v.min_bg+v.max_bg)/2;var aa=v.exercise_mode||v.high_temptarget_raises_sensitivity,ra=100,ta=160;if(v.half_basal_exercise_target&&(ta=v.half_basal_exercise_target),aa&&v.temptargetSet&&Ve>ra||v.low_temptarget_lowers_sensitivity&&v.temptargetSet&&Ve<ra){var oa=ta-ra;oa+Ve-ra>0?(sensitivityRatio=oa/(oa+Ve-ra),sensitivityRatio=Math.min(sensitivityRatio,v.autosens_max),sensitivityRatio=i(sensitivityRatio,2)):sensitivityRatio=v.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+Ve+"; ")}else void 0!==B&&B&&(sensitivityRatio=B.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&0==v.enableChris?(Ee=v.current_basal*sensitivityRatio,Ee=o(Ee,v)):1==v.enableChris&&1==v.tddAdjBasal&&(Ee=v.current_basal*be,Ee=o(Ee,v),process.stderr.write("TDD-adjustment of basals activated, using tdd24h_14d_Ratio "+i(be,2)+", TDD 24h = "+i(ie,2)+"U, Weighted average TDD = "+i(E,2)+"U, (Weight percentage = "+L+"), 7-day average TDD = "+i(z,2)+"U. "),Ee!==We?process.stderr.write("Adjusting basal from "+We+" to "+Ee+"; "):process.stderr.write("Basal unchanged: "+Ee+"; ")),v.temptargetSet);else if(void 0!==B&&B&&(v.sensitivity_raises_target&&B.ratio<1||v.resistance_lowers_target&&B.ratio>1)){Xe=i((Xe-60)/B.ratio)+60,Ye=i((Ye-60)/B.ratio)+60;var ia=i((Ve-60)/B.ratio)+60;Ve===(ia=Math.max(80,ia))?process.stderr.write("target_bg unchanged: "+ia+"; "):process.stderr.write("target_bg from "+Ve+" to "+ia+"; "),Ve=ia}var na=200,sa=200,la=200;if(e.noise>=2){var ma=Math.max(1.1,v.noisyCGMTargetMultiplier);Math.min(250,v.maxRaw);na=i(Math.min(200,Xe*ma)),sa=i(Math.min(200,Ve*ma)),la=i(Math.min(200,Ye*ma)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+Ve+" to "+sa+"; "),Xe=na,Ve=sa,Ye=la}var ua=Xe-.5*(Xe-40),da=i(v.sens,1),ca=v.sens;if(void 0!==B&&B&&((ca=i(ca=v.sens/sensitivityRatio,1))!==da?process.stderr.write("ISF from "+n(da,v)+" to "+n(ca,v)):process.stderr.write("ISF unchanged: "+n(ca,v)),s+="Autosens ratio: "+i(sensitivityRatio,2)+", ISF: "+n(da,v)+"→"+n(ca,v)),console.error("CR:"+v.carb_ratio),ca=function(e,a,r,t,o,v,B,_){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var M=t.dura_p,y=t.delta_pl,x=t.delta_pn,S=t.r_squ,D=t.bg_acceleration,C=t.parabola_fit_a0,w=t.parabola_fit_a1,F=t.parabola_fit_a2,I=t.autoISF_duration,T=t.autoISF_average,G=r.autoisf_max,U=!1,R=1,O=1,A=1,P=a+10-T;if(!(o.mealCOB>0)||r.enableautoisf_with_COB){var j=t.pp_debug;if(c+="BG-accel: "+i(D,3)+", PF-minutes: "+M+", PF-corr: "+i(S,4)+", PF-nextDelta: "+n(x,r)+", PF-lastDelta: "+n(y,r)+", regular Delta: "+n(t.delta,r),console.error(j+c+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),r.enable_BG_acceleration){var q=D;if(0!=t.parabola_fit_a2){var k=-w/2/F*5,W=i(C-k*k/25*F,1);(k=i(k,1))<0&&q<0?(f="saw max of "+n(W,r)+", about "+-k+" min ago",console.error("Parabolic fit "+f)):k<0&&q>0?(f="saw min of "+n(W,r)+", about "+-k+" min ago",console.error("Parabolic fit "+f)):k>0&&q<0?(f="predicts max of "+n(W,r)+", in about "+k+"min",console.error("Parabolic fit "+f)):k>0&&q>0&&(f="predicts min of "+n(W,r)+", in about "+k+" min",console.error("Parabolic fit "+f))}var E=S;if(E<=.9)f="acce_ISF by-passed, as correlation, "+i(E,3)+", is too low",console.error("Parabolic fit "+f),g+=", Parabolic Fit, "+f;else{g+=", Parabolic Fit, "+f+", lastΔ: "+n(y,r)+", nextΔ: "+n(x,r)+", Corr "+i(S,3)+", BG-Accel: "+i(q,2);var L=10*(E-.9),z=1;t.glucose<r.target_bg&&q>1&&(z=.5),A=1+q*z*(q<0?r.bgBrake_ISF_weight:r.bgAccel_ISF_weight)*L,console.error("Original result for acce_ISF: "+i(A,2)),1!=A&&(U=!0,g+=", acce-ISF Ratio: "+i(A,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var N=b(r,t.glucose,a);s+=", SMB Delivery Ratio:, "+i(N,2)+g+", autoISF";var Z=1+p(100-P,r);console.error("bg_ISF adaptation is "+i(Z,2)),Z<1&&A>1&&(h="bg-ISF adaptation lifted to "+i(Z*=A,2)+", as BG accelerates already",l="(lifted by "+i(A,2)+")",console.error(h));var $=1;if(Z<1)return($=Math.min(Z,A))<r.autoisf_min&&(h="final ISF factor "+i($,2)+" limited by autoisf_min "+r.autoisf_min,console.error(h),$=r.autoisf_min),l=" (lmtd.)",earlysens=Math.min(720,i(r.sens/Math.min(_,$),1)),console.error("early Return autoISF:  "+n(earlysens,r)),s+=", bg-ISF Ratio: "+i(Z,2)+l+", ISF: "+n(earlysens,r),earlysens;Z>1&&(U=!0,s+=", bg-ISF Ratio: "+i(Z,2));var H=t.delta;P>0?console.error("delta_ISF adaptation by-passed as average glucose < "+n(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(v-o.lastCarbTime)/1e3/3600?(R=1+Math.max(0,H*r.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+i(R,2)),u=", pp-ISF Ratio: "+i(R,2),1!=R&&(U=!0)):(O=p(H,r),P>-20&&(O*=.5),O=1+O,console.error("delta_ISF adaptation is "+i(O,2)),d=", Δ-ISF Ratio: "+i(O,2),1!=O&&(U=!0));var J=1,K=r.autoisf_hourlychange;return o.mealCOB>0&&!r.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+i(o.mealCOB,1)):I<10?console.error("dura_ISF by-passed; BG is only "+I+"m at level "+T):T<=a?console.error("dura_ISF by-passed; avg. glucose "+T+" below target "+n(a,r)):(J+=I/60*(K/a)*(T-a),U=!0,m=", Duration: "+I+", Avg: "+n(T,r)+", dura-ISF Ratio: "+i(J,2),console.error("dura_ISF  adaptation is "+i(J,2)+" because ISF "+e+" did not do it for "+i(I,1)+"m")),$=1,U?($=Math.max(J,Z,O,A,R),console.error("autoISF adaption ratios:"),console.error("  dura "+i(J,2)),console.error("  bg "+i(Z,2)),console.error("  delta "+i(O,2)),console.error("  pp "+i(R,2)),console.error("  accel "+i(A,2)),A<1&&(console.error("strongest ISF factor "+i($,2)+" weakened to "+i($*A,2)+" as bg decelerates already"),$*=A),$<r.autoisf_min?(console.error("final ISF factor "+i($,2)+" limited by autoisf_min "+r.autoisf_min),$=r.autoisf_min):$>G&&(console.error("final ISF factor "+i($,2)+" limited by autoisf_max "+G),$=G),$>=1&&(e=i(r.sens/Math.max($,_),1)),$<1&&(e=i(r.sens/Math.min($,_),1))):$=_,s+=u+d+m+", Ratio: "+i($,2)+", ISF: "+n(e,r),console.error("Inside autoISF: Ratio "+i($,2)+" resulting in "+n(e,r)),e}console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+i(o.mealCOB,1))}(ca,Ve,v,e,_,S,0,sensitivityRatio),void 0===t)return qe.error="Error: iob_data undefined. ",qe;var ga,ha=t;if(t.length,t.length>1&&(t=ha[0]),void 0===t.activity||void 0===t.iob)return qe.error="Error: iob_data missing some property. ",qe;var fa=((ga=void 0!==t.lastTemp?i((new Date(Le).getTime()-t.lastTemp.date)/6e4):0)+r.duration)%30;if(console.error("currenttemp:"+r.rate+" lastTempAge:"+ga+"m, tempModulus:"+fa+"m"),qe.temp="absolute",qe.deliverAt=ke,y&&r&&t.lastTemp&&r.rate!==t.lastTemp.rate&&ga>10&&r.duration)return qe.reason="Warning: currenttemp rate "+r.rate+" != lastTemp rate "+t.lastTemp.rate+" from pumphistory; canceling temp",M.setTempBasal(0,0,v,qe,r);if(r&&t.lastTemp&&r.duration>0){var pa=ga-t.lastTemp.duration;if(pa>5&&ga>10)return qe.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+pa+"m ago; canceling temp",M.setTempBasal(0,0,v,qe,r)}var ba=i(-t.activity*ca*5,2),va=i(6*(Je-ba));va<0&&(va=i(6*(Ke-ba)))<0&&(va=i(6*(e.long_avgdelta-ba)));var Ba=$e,_a=(Ba=t.iob>0?i($e-t.iob*ca):i($e-t.iob*Math.min(ca,v.sens)))+va;if(void 0===_a||isNaN(_a))return qe.error="Error: could not calculate eventualBG. Sensitivity: "+ca+" Deviation: "+va,qe;var Ma=function(e,a,r){return i(r+(e-a)/24,1)}(Ve,_a,ba);qe={temp:"absolute",bg:$e,tick:ze,eventualBG:_a,insulinReq:0,reservoir:x,deliverAt:ke,sensitivityRatio,TDD:ie};var ya=[],xa=[],Sa=[],Da=[];ya.push($e),xa.push($e),Da.push($e),Sa.push($e);var Ca=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of "+t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(v,y,_,Ve),wa=v.enableUAM,Fa=0,Ia=0;Fa=i(Je-ba,1);var Ta=i(Je-ba,1);csf=ca/v.carb_ratio,console.error("profile.sens:"+n(v.sens,v)+", sens:"+n(ca,v)+", CSF:"+i(csf,1));var Ga=i(30*csf*5/60,1);Fa>Ga&&(console.error("Limiting carb impact from "+Fa+" to "+Ga+"mg/dL/5m (30g/h)"),Fa=Ga);var Ua=3;sensitivityRatio&&(Ua/=sensitivityRatio);var Ra=Ua;if(_.carbs){Ua=Math.max(Ua,_.mealCOB/20);var Oa=i((new Date(Le).getTime()-_.lastCarbTime)/6e4),Aa=(_.carbs-_.mealCOB)/_.carbs;Ra=i(Ra=Ua+1.5*Oa/60,1),console.error("Last carbs "+Oa+" minutes ago; remainingCATime:"+Ra+"hours; "+i(100*Aa,1)+"% carbs absorbed")}var Pa=Math.max(0,Fa/5*60*Ra/2)/csf,ja=90,qa=1;v.remainingCarbsCap&&(ja=Math.min(90,v.remainingCarbsCap)),v.remainingCarbsFraction&&(qa=Math.min(1,v.remainingCarbsFraction));var ka=1-qa,Wa=Math.max(0,_.mealCOB-Pa-_.carbs*ka),Ea=(Wa=Math.min(ja,Wa))*csf*5/60/(Ra/2),La=i(_.slopeFromMaxDeviation,2),za=i(_.slopeFromMinDeviation,2),Na=Math.min(La,-za/3),Za=0;0===Fa?Ia=0:!0===v.floating_carbs?(Ia=Math.min(60*Ra/5/2,Math.max(0,_.carbs*csf/Fa)),Za=Math.min(60*Ra/5/2,Math.max(0,_.mealCOB*csf/Fa)),_.carbs>0&&(s+=", Floating Carbs:, CID: "+i(Ia,1)+", MealCarbs: "+i(_.carbs,1)+", Not Floating:, CID: "+i(Za,1)+", MealCOB: "+i(_.mealCOB,1),console.error("Floating Carbs CID: "+i(Ia,1)+" / MealCarbs: "+i(_.carbs,1)+" vs. Not Floating:"+i(Za,1)+" / MealCOB:"+i(_.mealCOB,1)))):Ia=Math.min(60*Ra/5/2,Math.max(0,_.mealCOB*csf/Fa)),console.error("Carb Impact:"+Fa+"mg/dL per 5m; CI Duration:"+i(5*Ia/60*2,1)+"hours; remaining CI ("+Ra/2+"h peak):"+i(Ea,1)+"mg/dL per 5m");var $a,Ha,Ja,Ka,Qa,Va=999,Xa=999,Ya=999,er=$e,ar=999,rr=999,tr=999,or=999,ir=_a,nr=$e,sr=$e,lr=0,mr=[],ur=[];try{ha.forEach((function(e){var a=i(-e.activity*ca*5,2),r=i(-e.iobWithZeroTemp.activity*ca*5,2),t=Fa*(1-Math.min(1,xa.length/12));if(!0==(1==se&&1==C.useNewFormula)){ir=xa[xa.length-1]+i(-e.activity*(1800/(F*ge*Math.log(Math.max(xa[xa.length-1],39)/Te+1)))*5,2)+t;var o=Da[Da.length-1]+i(-e.iobWithZeroTemp.activity*(1800/(F*ge*Math.log(Math.max(Da[Da.length-1],39)/Te+1)))*5,2);console.log("Dynamic ISF (Logarithmic Formula) )adjusted predictions for IOB and ZT: IOBpredBG: "+i(ir,2)+" , ZTpredBG: "+i(o,2))}else{ir=xa[xa.length-1]+a+t;o=Da[Da.length-1]+r}var n=Math.max(0,Math.max(0,Fa)*(1-ya.length/Math.max(2*Ia,1))),s=Math.min(ya.length,12*Ra-ya.length),l=Math.max(0,s/(Ra/2*12)*Ea);n+l,mr.push(i(l,0)),ur.push(i(n,0)),COBpredBG=ya[ya.length-1]+a+Math.min(0,t)+n+l;var m=Math.max(0,Ta+Sa.length*Na),u=Math.max(0,Ta*(1-Sa.length/Math.max(36,1))),d=Math.min(m,u);if(d>0&&(lr=i(5*(Sa.length+1)/60,1)),!0==(1==se&&1==C.useNewFormula))UAMpredBG=Sa[Sa.length-1]+i(-e.activity*(1800/(F*ge*Math.log(Math.max(Sa[Sa.length-1],39)/Te+1)))*5,2)+Math.min(0,t)+d,console.log("Dynamic ISF (Logarithmic Formula) adjusted prediction for UAM: UAMpredBG: "+i(UAMpredBG,2));else UAMpredBG=Sa[Sa.length-1]+a+Math.min(0,t)+d;xa.length<48&&xa.push(ir),ya.length<48&&ya.push(COBpredBG),Sa.length<48&&Sa.push(UAMpredBG),Da.length<48&&Da.push(o),COBpredBG<ar&&(ar=i(COBpredBG)),UAMpredBG<rr&&(rr=i(UAMpredBG)),ir<tr&&(tr=i(ir)),o<or&&(or=i(o));xa.length>18&&ir<Va&&(Va=i(ir)),ir>nr&&(nr=ir),(Ia||Ea>0)&&ya.length>18&&COBpredBG<Xa&&(Xa=i(COBpredBG)),(Ia||Ea>0)&&COBpredBG>nr&&(sr=COBpredBG),wa&&Sa.length>12&&UAMpredBG<Ya&&(Ya=i(UAMpredBG)),wa&&UAMpredBG>nr&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+ur.join(" ")),console.error("remainingCIs:      "+mr.join(" "))),qe.predBGs={},xa.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))}));for(var dr=xa.length-1;dr>12&&xa[dr-1]===xa[dr];dr--)xa.pop();for(qe.predBGs.IOB=xa,Ja=i(xa[xa.length-1]),Da.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),dr=Da.length-1;dr>6&&!(Da[dr-1]>=Da[dr]||Da[dr]<=Ve);dr--)Da.pop();if(qe.predBGs.ZT=Da,i(Da[Da.length-1]),_.mealCOB>0&&(Fa>0||Ea>0)){for(ya.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),dr=ya.length-1;dr>12&&ya[dr-1]===ya[dr];dr--)ya.pop();qe.predBGs.COB=ya,Ka=i(ya[ya.length-1]),_a=Math.max(_a,i(ya[ya.length-1]))}if(Fa>0||Ea>0){if(wa){for(Sa.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),dr=Sa.length-1;dr>12&&Sa[dr-1]===Sa[dr];dr--)Sa.pop();qe.predBGs.UAM=Sa,Qa=i(Sa[Sa.length-1]),Sa[Sa.length-1]&&(_a=Math.max(_a,i(Sa[Sa.length-1])))}qe.eventualBG=_a}console.error("UAM Impact:"+Ta+"mg/dL per 5m; UAM Duration:"+lr+"hours"),Va=Math.max(39,Va),Xa=Math.max(39,Xa),Ya=Math.max(39,Ya),$a=i(Va);var cr=_.mealCOB/_.carbs;Ha=i(Ya<999&&Xa<999?(1-cr)*UAMpredBG+cr*COBpredBG:Xa<999?(ir+COBpredBG)/2:Ya<999?(ir+UAMpredBG)/2:ir),or>Ha&&(Ha=or),er=i(er=Ia||Ea>0?wa?cr*ar+(1-cr)*rr:ar:wa?rr:tr);var gr=Ya;if(or<ua)gr=(Ya+or)/2;else if(or<Ve){var hr=(or-ua)/(Ve-ua);gr=(Ya+(Ya*hr+or*(1-hr)))/2}else or>Ya&&(gr=(Ya+or)/2);if(gr=i(gr),_.carbs)if(!wa&&Xa<999)$a=i(Math.max(Va,Xa));else if(Xa<999){var fr=cr*Xa+(1-cr)*gr;$a=i(Math.max(Va,Xa,fr))}else $a=wa?gr:er;else wa&&($a=i(Math.max(Va,gr)));$a=Math.min($a,Ha),process.stderr.write("minPredBG: "+$a+" minIOBPredBG: "+Va+" minZTGuardBG: "+or),Xa<999&&process.stderr.write(" minCOBPredBG: "+Xa),Ya<999&&process.stderr.write(" minUAMPredBG: "+Ya),console.error(" avgPredBG:"+Ha+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),sr>$e&&($a=Math.min($a,sr)),qe.COB=_.mealCOB,qe.IOB=t.iob,qe.BGI=n(ba,v),qe.deviation=n(va,v),qe.ISF=n(ca,v),qe.CR=i(v.carb_ratio,2),qe.target_bg=n(Ve,v),qe.TDD=i(ie,2),qe.reason=s+", COB: "+qe.COB+", Dev: "+qe.deviation+", BGI: "+qe.BGI+", CR: "+qe.CR+", Target: "+qe.target_bg+", minPredBG "+n($a,v)+", minGuardBG "+n(er,v)+", IOBpredBG "+n(Ja,v),Ka>0&&(qe.reason+=", COBpredBG "+n(Ka,v)),Qa>0&&(qe.reason+=", UAMpredBG "+n(Qa,v)),qe.reason+=tddReason,qe.reason+="; ";var pr=Ba;pr<40&&(pr=Math.min(er,pr));var br,vr=ua-pr,Br=240,_r=240;if(_.mealCOB>0&&(Fa>0||Ea>0)){for(dr=0;dr<ya.length;dr++)if(ya[dr]<Xe){Br=5*dr;break}for(dr=0;dr<ya.length;dr++)if(ya[dr]<ua){_r=5*dr;break}}else{for(dr=0;dr<xa.length;dr++)if(xa[dr]<Xe){Br=5*dr;break}for(dr=0;dr<xa.length;dr++)if(xa[dr]<ua){_r=5*dr;break}}Ca&&er<ua&&(console.error("minGuardBG "+n(er,v)+" projected below "+n(ua,v)+" - disabling SMB"),Ca=!1),void 0===v.maxDelta_bg_threshold&&(br=.2),void 0!==v.maxDelta_bg_threshold&&(br=Math.min(v.maxDelta_bg_threshold,.4)),Qe>br*$e&&(console.error("maxDelta "+n(Qe,v)+" > "+100*br+"% of BG "+n($e,v)+" - disabling SMB"),qe.reason+="maxDelta "+n(Qe,v)+" > "+100*br+"% of BG "+n($e,v)+" - SMB disabled!, ",Ca=!1),console.error("BG projected to remain above "+n(Xe,v)+" for "+Br+"minutes"),(_r<240||Br<60)&&console.error("BG projected to remain above "+n(ua,v)+" for "+_r+"minutes");var Mr=_r,yr=v.current_basal*ca*Mr/60,xr=Math.max(0,_.mealCOB-.25*_.carbs),Sr=(vr-yr)/csf-xr;yr=i(yr),Sr=i(Sr),console.error("naive_eventualBG:"+Ba+" bgUndershoot:"+vr+" zeroTempDuration:"+Mr+" zeroTempEffect:"+yr+" carbsReq:"+Sr),Sr>=v.carbsReqThreshold&&_r<=45&&(qe.carbsReq=Sr,qe.reason+=Sr+" add'l carbs req w/in "+_r+"m; ");var Dr=0;if($e<ua&&t.iob<20*-v.current_basal/60&&Je>0&&Je>Ma)qe.reason+="IOB "+t.iob+" < "+i(20*-v.current_basal/60,2),qe.reason+=" and minDelta "+n(Je,v)+" > expectedDelta "+n(Ma,v)+"; ";else if($e<ua||er<ua)return qe.reason+="minGuardBG "+n(er,v)+"<"+n(ua,v),Dr=i(60*((vr=Ve-er)/ca)/v.current_basal),Dr=30*i(Dr/30),Dr=Math.min(120,Math.max(30,Dr)),M.setTempBasal(0,Dr,v,qe,r);if(v.skip_neutral_temps&&qe.deliverAt.getMinutes()>=55)return qe.reason+="; Canceling temp at "+qe.deliverAt.getMinutes()+"m past the hour. ",M.setTempBasal(0,0,v,qe,r);var Cr=0,wr=Ee;if(_a<Xe){if(qe.reason+="Eventual BG "+n(_a,v)+" < "+n(Xe,v),Je>Ma&&Je>0&&!Sr)return Ba<40?(qe.reason+=", naive_eventualBG < 40. ",M.setTempBasal(0,30,v,qe,r)):(e.delta>Je?qe.reason+=", but Delta "+n(ze,v)+" > expectedDelta "+n(Ma,v):qe.reason+=", but Min. Delta "+Je.toFixed(2)+" > Exp. Delta "+n(Ma,v),r.duration>15&&o(Ee,v)===o(r.rate,v)?(qe.reason+=", temp "+r.rate+" ~ req "+Ee+"U/hr. ",qe):(qe.reason+="; setting current basal of "+Ee+" as temp. ",M.setTempBasal(Ee,30,v,qe,r)));Cr=i(Cr=2*Math.min(0,(_a-Ve)/ca),2);var Fr=Math.min(0,(Ba-Ve)/ca);if(Fr=i(Fr,2),Je<0&&Je>Ma)Cr=i(Cr*(Je/Ma),2);if(wr=o(wr=Ee+2*Cr,v),r.duration*(r.rate-Ee)/60<Math.min(Cr,Fr)-.3*Ee)return qe.reason+=", "+r.duration+"m@"+r.rate.toFixed(2)+" is a lot less than needed. ",M.setTempBasal(wr,30,v,qe,r);if(void 0!==r.rate&&r.duration>5&&wr>=.8*r.rate)return qe.reason+=", temp "+r.rate+" ~< req "+wr+"U/hr. ",qe;if(wr<=0){if((Dr=i(60*((vr=Ve-Ba)/ca)/v.current_basal))<0?Dr=0:(Dr=30*i(Dr/30),Dr=Math.min(120,Math.max(0,Dr))),Dr>0)return qe.reason+=", setting "+Dr+"m zero temp. ",M.setTempBasal(wr,Dr,v,qe,r)}else qe.reason+=", setting "+wr+"U/hr. ";return M.setTempBasal(wr,30,v,qe,r)}if(Je<Ma&&(!y||!Ca))return e.delta<Je?qe.reason+="Eventual BG "+n(_a,v)+" > "+n(Xe,v)+" but Delta "+n(ze,v)+" < Exp. Delta "+n(Ma,v):qe.reason+="Eventual BG "+n(_a,v)+" > "+n(Xe,v)+" but Min. Delta "+Je.toFixed(2)+" < Exp. Delta "+n(Ma,v),r.duration>15&&o(Ee,v)===o(r.rate,v)?(qe.reason+=", temp "+r.rate+" ~ req "+Ee+"U/hr. ",qe):(qe.reason+="; setting current basal of "+Ee+" as temp. ",M.setTempBasal(Ee,30,v,qe,r));if(Math.min(_a,$a)<Ye&&(!y||!Ca))return qe.reason+=n(_a,v)+"-"+n($a,v)+" in range: no temp required",r.duration>15&&o(Ee,v)===o(r.rate,v)?(qe.reason+=", temp "+r.rate+" ~ req "+Ee+"U/hr. ",qe):(qe.reason+="; setting current basal of "+Ee+" as temp. ",M.setTempBasal(Ee,30,v,qe,r));if(_a>=Ye&&(qe.reason+="Eventual BG "+n(_a,v)+" >= "+n(Ye,v)+", "),t.iob>ea)return qe.reason+="IOB "+i(t.iob,2)+" > max_iob "+ea,r.duration>15&&o(Ee,v)===o(r.rate,v)?(qe.reason+=", temp "+r.rate+" ~ req "+Ee+"U/hr. ",qe):(qe.reason+="; setting current basal of "+Ee+" as temp. ",M.setTempBasal(Ee,30,v,qe,r));(Cr=i((Math.min($a,_a)-Ve)/ca,2))>ea-t.iob?(console.error("SMB limited by maxIOB: "+ea-t.iob+" (. insulinReq: "+Cr+" U)"),qe.reason+="max_iob "+ea+", ",Cr=ea-t.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+Cr+" U)."),wr=o(wr=Ee+2*Cr,v),Cr=i(Cr,3),qe.insulinReq=Cr;var Ir=i((new Date(Le).getTime()-t.lastBolusTime)/6e4,1);if(y&&Ca&&$e>ua){var Tr=i(_.mealCOB/v.carb_ratio,3);if(v.use_autoisf)Gr=v.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var Gr=1}Gr>1&&console.error("SMB max range extended from default by factor "+Gr);var Ur=0;void 0===v.maxSMBBasalMinutes?(Ur=i(Gr*v.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m"),Cr>Ur&&(console.error("SMB limited by maxBolus: "+Ur+" ( "+Cr+" U)"),a)):t.iob>Tr&&t.iob>0?(console.error("IOB"+t.iob+"> COB"+_.mealCOB+"; mealInsulinReq ="+Tr),v.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes: "+v.maxUAMSMBBasalMinutes+", profile.current_basal: "+v.current_basal),Ur=i(Gr*v.current_basal*v.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Ur=i(30*v.current_basal/60,1)),Cr>Ur?console.error("SMB limited by maxUAMSMBBasalMinutes: "+v.maxUAMSMBBasalMinutes+" ( "+Cr+" )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. (insulinReq: "+Cr+" U)")):(console.error("profile.maxSMBBasalMinutes: "+v.maxSMBBasalMinutes+", profile.current_basal: "+v.current_basal),Cr>(Ur=i(Gr*v.current_basal*v.maxSMBBasalMinutes/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+v.maxSMBBasalMinutes+" ( insulinReq: "+Cr+" U)"):console.error("SMB is not limited by maxSMBBasalMinutes. (insulinReq: "+Cr+" U)"));var Rr=v.bolus_increment,Or=1/Rr,Ar=b(v,$e,Ve);Ar>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+i(Ar,2));var Pr=Math.min(Cr*Ar,Ur);Pr=Math.floor(Pr*Or)/Or,Dr=i(60*((Ve-(Ba+Va)/2)/ca)/v.current_basal),Cr>0&&Pr<Rr&&(Dr=0);var jr=0;Dr<=0?Dr=0:Dr>=30?(Dr=30*i(Dr/30),Dr=Math.min(60,Math.max(0,Dr))):(jr=i(Ee*Dr/30,2),Dr=30),qe.reason+=" insulinReq "+Cr,Pr>=Ur&&(qe.reason+="; maxBolus "+Ur),Dr>0&&(qe.reason+="; setting "+Dr+"m low temp of "+jr+"U/h"),qe.reason+=". ";var qr=3;v.SMBInterval&&(qr=Math.min(10,Math.max(1,v.SMBInterval)));var kr=i(qr-Ir,0),Wr=i(60*(qr-Ir),0)%60;if(console.error("naive_eventualBG "+Ba+","+Dr+"m "+jr+"U/h temp needed; last bolus "+Ir+"m ago; maxBolus: "+Ur),Ir>qr?Pr>0&&(qe.units=Pr,qe.reason+="Microbolusing "+Pr+"U. "):qe.reason+="Waiting "+kr+"m "+Wr+"s to microbolus again. ",Dr>0)return qe.rate=jr,qe.duration=Dr,qe}var Er=M.getMaxSafeBasal(v);return wr>Er&&(qe.reason+="adj. req. rate: "+wr+" to maxSafeBasal: "+i(Er,2)+", ",wr=o(Er,v)),r.duration*(r.rate-Ee)/60>=2*Cr?(qe.reason+=r.duration+"m@"+r.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+wr+"U/hr. ",M.setTempBasal(wr,30,v,qe,r)):void 0===r.duration||0===r.duration?(qe.reason+="no temp, setting "+wr+"U/hr. ",M.setTempBasal(wr,30,v,qe,r)):r.duration>5&&o(wr,v)<=o(r.rate,v)?(qe.reason+="temp "+r.rate+" >~ req "+wr+"U/hr. ",qe):(qe.reason+="temp "+r.rate+"<"+wr+"U/hr. ",M.setTempBasal(wr,30,v,qe,r))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),i=r(2333),n=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),i=r(1469),n=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(i(a))return o(a,e)+"";if(n(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,i=o.hasOwnProperty,n=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=i.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=n.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=t||o||Function("return this")();e.exports=i},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),i=r(554),n=r(9833);e.exports=function(e,a,r){e=n(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(i(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),i=r(3448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?m(e.slice(2),r?2:8):n.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},r={};function t(a){var o=r[a];if(void 0!==o)return o.exports;var i=r[a]={exports:{}};return e[a](i,i.exports,t),i.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var o=t(5546);freeaps_determineBasal=o})();