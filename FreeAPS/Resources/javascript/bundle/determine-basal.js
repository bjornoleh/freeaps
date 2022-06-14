var freeaps_determineBasal;(()=>{var e={5546:(e,r,t)=>{var o=t(6880);function i(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function n(e,a){return"mmol/L"===a.out_units?i(.0555*e,1):Math.round(e)}var s="",l="",m="",u="",d="",c="",g="",f="",h="";function p(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,i=r[0],n=t[0],s=r[o],l=t[o],m=1,u=1,d=1,c=i;if(i>e)m=(u=n)+((l=t[1])-u)/((s=r[1])-(d=i))*(e-d);else if(s<e)m=(u=n=t[o-1])+(l-u)/(s-(d=i=r[o-1]))*(e-d);else for(var g=0;g<=o;g++){if(n=t[g],(i=r[g])==e){m=n;break}if(i>e){m=u+(n-u)/(i-(d=c))*(e-d);break}u=n,c=i}return m*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}function b(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limited by minimum value "+t),t;var o=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+o),o;var n=t+(o-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+i(n,2)),n}e.exports=function(e,r,t,v,B,_,M,y,x,S,w,C,D,I,F){var G,T,O,U=0,R="",A="",P=0,j=(I=0,0),q=0,k=0,W=0;function E(e,a){var r=e.getTime();return new Date(r+36e5*a)}function L(e){var a=v.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?i(Math.floor(r)*a,5):0}function z(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function N(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function Z(e,a){var r=0,t=a,o=(e-a)/36e5,i=0,n=o,s=0;do{if(o>0){var l=z(t),m=D[0].start;for(let e=0;e<D.length;e++){var u=D[e].start;if(l==u){if(e+1<D.length){o>=(s=N(D[e+1].start,D[e].start))?i=s:o<s&&(i=o)}else if(e+1==D.length){let a=D[0].start;o>=(s=24-N(D[e].start,a))?i=s:o<s&&(i=o)}r+=L((m=D[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+L(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=E(t,i)}else if(l>u)if(e+1<D.length){var d=D[e+1].start;l<d&&(o>=(s=N(d,l))?i=s:o<s&&(i=o),r+=L((m=D[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+L(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=E(t,i))}else if(e==D.length-1){o>=(s=N("23:59:59",l))?i=s:o<s&&(i=o),r+=L((m=D[e].rate)*i),o-=i,console.log("Dynamic ratios log: scheduled insulin added: "+L(m*i)+" U. Bas duration: "+i.toPrecision(3)+" h. Base Rate: "+m+" U/h. Time :"+l),t=E(t,i)}}}}while(o>0&&o<n);return r}let $=w.length-1;if($>=0)var H=new Date(w[$].timestamp);else H=new Date;var J,K,Q=new Date(w[0].timestamp);("TempBasalDuration"==w[0]._type&&(Q=new Date),(U=(Q-H)/36e5)<23.5)?(k=Z(H,(J=24-U,K=H.getTime(),new Date(K-36e5*J))),R="24 hours of data is required for an accurate tdd calculation. Currently only "+U.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+k.toPrecision(5)+" U. "):R="";for(let e=0;e<w.length;e++)"Bolus"==w[e]._type&&(q+=w[e].amount);for(let e=1;e<w.length;e++)if("TempBasal"==w[e]._type&&w[e].rate>0){P=e,W=w[e].rate;var V=w[e-1]["duration (min)"]/60,X=V,Y=new Date(w[e-1].timestamp),ee=Y;do{if(e--,0==e){ee=new Date;break}if("TempBasal"==w[e]._type||"PumpSuspend"==w[e]._type){ee=new Date(w[e].timestamp);break}}while(e>0);var ae=(ee-Y)/36e5;ae<X&&(V=ae),j+=L(W*V),e=P}for(let e=0;e<w.length;e++)if(0,0==w[e]["duration (min)"]||"PumpResume"==w[e]._type){let a=new Date(w[e].timestamp),r=a,t=e;do{if(t>0&&(--t,"TempBasal"==w[t]._type)){r=new Date(w[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(k+=Z(r,a))}for(let e=w.length-1;e>0;e--)if("TempBasalDuration"==w[e]._type){let a=w[e]["duration (min)"]/60,r=new Date(w[e].timestamp);var re=r;let t=e;do{if(--t,t>=0&&("TempBasal"==w[t]._type||"PumpSuspend"==w[t]._type)){re=new Date(w[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==w[0]._type&&(re=new Date,a=w[e]["duration (min)"]/60),(re-r)/36e5-a>0){k+=Z(re,E(r,a))}}var te=I=q+j+k;T=". Bolus insulin: "+q.toPrecision(5)+" U",O=". Temporary basal insulin: "+j.toPrecision(5)+" U",G=". Insulin with scheduled basal rate: "+k.toPrecision(5)+" U",A=R+(". tdd past 24h is: "+I.toPrecision(5)+" U")+T+O+G;const oe=e.glucose;var ie=C.enableChris,ne=C.enableDynamicCR;const se=v.autosens_min,le=v.autosens_max,me=C.adjustmentFactor,ue=v.min_bg;var de=!1,ce="";const ge=F.weightedAverage,fe=v.weightPercentage,he=F.average_7days;var pe=1;he>0&&(pe=ge/he),tddReason=", TDD: 24h "+i(I,1)+"U / W.avg "+i(ge,1)+"U / 7day "+i(he,1)+"U",pe>1?(pe=i(pe=Math.min(pe,v.autosens_max),2),console.log("24 hour to 7 day average TDD ratio : "+pe+" Upper limit = Autosens max ("+v.autosens_max+"); ")):pe<1?(pe=i(pe=Math.max(pe,v.autosens_min),2),console.log("24 hour to 7 day average TDD ratio : "+pe+" Lower limit = Autosens min ("+v.autosens_min+"); ")):console.log("24 hour to 7 day average TDD ratio : "+pe),1!=v.high_temptarget_raises_sensitivity&&1!=v.exercise_mode||(de=!0),1==v.use_autoisf&&1==ie&&(v.use_autoisf=!1),ue>=118&&1==de&&(v.use_autoisf=!1,ie=!1,ce="Dynamic ISF temporarily off due to a high temp target/exercising. Current min target: "+ue);var be=", Dynamic ratios log: ",ve=", AF: "+me,Be="BG: "+oe+" mg/dl ("+(.0555*oe).toPrecision(2)+" mmol/l). ",_e="",Me="";const ye=C.curve,xe=C.insulinPeakTime,Se=C.useCustomPeakTime;var we=55;switch(ye){case"rapid-acting":we=55;break;case"ultra-rapid":we=xe<75&&1==Se?120-xe:70}if(te=I,fe<1&&ge>0&&(I=ge,console.log("Using weighted TDD average: "+i(I,2)+" U, instead of past 24 h ("+i(te,2)+" U), weight: "+fe),Me=", Weighted TDD: "+i(I,2)+" U"),1==C.useNewFormula){var Ce=v.sens*me*I*Math.log(oe/we+1)/1800;_e=", Logarithmic formula"}else{Ce=v.sens*me*I*oe/277700;_e=", Original formula"}var De=v.carb_ratio,Ie="",Fe="";if(1==ie&&I>0){if(Ie=", Dynamic ISF/CR: On/",Ce>le?(ce=", Dynamic ISF limited by autosens_max setting: "+le+" ("+i(Ce,2)+"), ",Fe=", Autosens/Dynamic Limit: "+le+" ("+i(Ce,2)+")",Ce=le):Ce<se&&(ce=", Dynamic ISF limjted by autosens_min setting: "+se+" ("+i(Ce,2)+"). ",Fe=", Autosens/Dynamic Limit: "+se+" ("+i(Ce,2)+")",Ce=se),1==ne){Ie+="On";var Ge=" CR: "+(De=i(De/Ce,2))+" g/U";v.carb_ratio=De}else Ge=" CR: "+De+" g/U",Ie+="Off";var Te=v.sens/Ce;ce+="Dynamic autosens.ratio set to "+i(Ce,2)+" with ISF: "+Te.toPrecision(3)+" mg/dl/U ("+(.0555*Te).toPrecision(3)+" mmol/l/U). "+Ie,B.ratio=Ce,A+=be+Be+ve+_e+ce+Ge+Me}else A+=0==ie&&1==ne?be+Be+ve+_e+"Dynamic ISF is off."+Ge+Me:be+"Dynamic ISF is off. Dynamic CR is off.";console.log(A),tddReason+=0==ie&&0==ne?"":Ie+_e+Fe;var Oe={},Ue=new Date;if(S&&(Ue=S),void 0===v||void 0===v.current_basal)return Oe.error="Error: could not get current basal rate",Oe;var Re=o(v.current_basal,v),Ae=Re,Pe=new Date;S&&(Pe=S);var je,qe=new Date(e.date),ke=i((Pe-qe)/60/1e3,1),We=e.glucose,Ee=e.noise;je=e.delta>-.5?"+"+i(e.delta,0):i(e.delta,0);var Le=Math.min(e.delta,e.short_avgdelta),ze=Math.min(e.short_avgdelta,e.long_avgdelta),Ne=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(We<=10||38===We||Ee>=3)&&(Oe.reason="CGM is calibrating, in ??? state, or noise is high");if(We>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+n(We,v)+"+"+n(e.delta,v)+") for 5m w/ "+n(e.short_avgdelta,v)+" mg/dL ~15m change & "+n(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),ke>12||ke<-5?Oe.reason="If current system time "+Pe+" is correct, then BG data is too old. The last BG data was read "+ke+"m ago at "+qe:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?Oe.reason="CGM was just calibrated":Oe.reason="CGM data is unchanged ("+n(We,v)+"+"+n(e.delta,v)+") for 5m w/ "+n(e.short_avgdelta,v)+" mg/dL ~15m change & "+n(e.long_avgdelta,v)+" mg/dL ~45m change"),We<=10||38===We||Ee>=3||ke>12||ke<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return r.rate>=Ae?(Oe.reason+=". Canceling high temp basal of "+r.rate,Oe.deliverAt=Ue,Oe.temp="absolute",Oe.duration=0,Oe.rate=0,Oe):0===r.rate&&r.duration>30?(Oe.reason+=". Shortening "+r.duration+"m long zero temp to 30m. ",Oe.deliverAt=Ue,Oe.temp="absolute",Oe.duration=30,Oe.rate=0,Oe):(Oe.reason+=". Temp "+r.rate+" <= current basal "+Ae+"U/hr; doing nothing. ",Oe);var Ze,$e,He,Je=v.max_iob;if(void 0!==v.min_bg&&($e=v.min_bg),void 0!==v.max_bg&&(He=v.max_bg),void 0===v.min_bg||void 0===v.max_bg)return Oe.error="Error: could not determine target_bg. ",Oe;Ze=(v.min_bg+v.max_bg)/2;var Ke=v.exercise_mode||v.high_temptarget_raises_sensitivity,Qe=100,Ve=160;if(v.half_basal_exercise_target&&(Ve=v.half_basal_exercise_target),Ke&&v.temptargetSet&&Ze>Qe||v.low_temptarget_lowers_sensitivity&&v.temptargetSet&&Ze<Qe){var Xe=Ve-Qe;Xe+Ze-Qe>0?(sensitivityRatio=Xe/(Xe+Ze-Qe),sensitivityRatio=Math.min(sensitivityRatio,v.autosens_max),sensitivityRatio=i(sensitivityRatio,2)):sensitivityRatio=v.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+Ze+"; ")}else void 0!==B&&B&&(sensitivityRatio=B.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&0==v.enableChris?(Ae=v.current_basal*sensitivityRatio,Ae=o(Ae,v)):1==v.enableChris&&1==v.tddAdjBasal&&(Ae=v.current_basal*pe,Ae=o(Ae,v),process.stderr.write("TDD-adjustment of basals activated, using tdd24h_7d_Ratio "+i(pe,2)+", TDD 24h = "+i(te,2)+"U, Weighted average TDD = "+i(ge,2)+"U, (Weight percentage = "+fe+"), 7-day average TDD = "+i(he,2)+"U. "),Ae!==Re?process.stderr.write("Adjusting basal from "+Re+" to "+Ae+"; "):process.stderr.write("Basal unchanged: "+Ae+"; ")),v.temptargetSet);else if(void 0!==B&&B&&(v.sensitivity_raises_target&&B.ratio<1||v.resistance_lowers_target&&B.ratio>1)){$e=i(($e-60)/B.ratio)+60,He=i((He-60)/B.ratio)+60;var Ye=i((Ze-60)/B.ratio)+60;Ze===(Ye=Math.max(80,Ye))?process.stderr.write("target_bg unchanged: "+Ye+"; "):process.stderr.write("target_bg from "+Ze+" to "+Ye+"; "),Ze=Ye}var ea=200,aa=200,ra=200;if(e.noise>=2){var ta=Math.max(1.1,v.noisyCGMTargetMultiplier);Math.min(250,v.maxRaw);ea=i(Math.min(200,$e*ta)),aa=i(Math.min(200,Ze*ta)),ra=i(Math.min(200,He*ta)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+Ze+" to "+aa+"; "),$e=ea,Ze=aa,He=ra}var oa=$e-.5*($e-40),ia=i(v.sens,1),na=v.sens;if(void 0!==B&&B&&((na=i(na=v.sens/sensitivityRatio,1))!==ia?process.stderr.write("ISF from "+n(ia,v)+" to "+n(na,v)):process.stderr.write("ISF unchanged: "+n(na,v)),s+="Autosens ratio: "+i(sensitivityRatio,2)+", ISF: "+n(ia,v)+"→"+n(na,v)),console.error("CR:"+v.carb_ratio),na=function(e,a,r,t,o,v,B,_){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var M=t.dura_p,y=t.delta_pl,x=t.delta_pn,S=t.r_squ,w=t.bg_acceleration,C=t.parabola_fit_a0,D=t.parabola_fit_a1,I=t.parabola_fit_a2,F=t.autoISF_duration,G=t.autoISF_average,T=r.autoisf_max,O=!1,U=1,R=1,A=1,P=a+10-G;if(!(o.mealCOB>0)||r.enableautoisf_with_COB){var j=t.pp_debug;if(c+="BG-accel: "+i(w,3)+", PF-minutes: "+M+", PF-corr: "+i(S,4)+", PF-nextDelta: "+n(x,r)+", PF-lastDelta: "+n(y,r)+", regular Delta: "+n(t.delta,r),console.error(j+c+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),r.enable_BG_acceleration){var q=w;if(0!=t.parabola_fit_a2){var k=-D/2/I*5,W=i(C-k*k/25*I,1);(k=i(k,1))<0&&q<0?(h="saw max of "+n(W,r)+", about "+-k+" min ago",console.error("Parabolic fit "+h)):k<0&&q>0?(h="saw min of "+n(W,r)+", about "+-k+" min ago",console.error("Parabolic fit "+h)):k>0&&q<0?(h="predicts max of "+n(W,r)+", in about "+k+"min",console.error("Parabolic fit "+h)):k>0&&q>0&&(h="predicts min of "+n(W,r)+", in about "+k+" min",console.error("Parabolic fit "+h))}var E=S;if(E<=.9)h="acce_ISF by-passed, as correlation, "+i(E,3)+", is too low",console.error("Parabolic fit "+h),g+=", Parabolic Fit, "+h;else{g+=", Parabolic Fit, "+h+", lastΔ: "+n(y,r)+", nextΔ: "+n(x,r)+", Corr "+i(S,3)+", BG-Accel: "+i(q,2);var L=10*(E-.9),z=1;t.glucose<r.target_bg&&q>1&&(z=.5),A=1+q*z*(q<0?r.bgBrake_ISF_weight:r.bgAccel_ISF_weight)*L,console.error("Original result for acce_ISF: "+i(A,2)),1!=A&&(O=!0,g+=", acce-ISF Ratio: "+i(A,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");var N=b(r,t.glucose,a);s+=", SMB Delivery Ratio:, "+i(N,2)+g+", autoISF";var Z=1+p(100-P,r);console.error("bg_ISF adaptation is "+i(Z,2)),Z<1&&A>1&&(f="bg-ISF adaptation lifted to "+i(Z*=A,2)+", as BG accelerates already",l="(lifted by "+i(A,2)+")",console.error(f));var $=1;if(Z<1)return($=Math.min(Z,A))<r.autoisf_min&&(f="final ISF factor "+i($,2)+" limited by autoisf_min "+r.autoisf_min,console.error(f),$=r.autoisf_min),l=" (lmtd.)",earlysens=Math.min(720,i(r.sens/Math.min(_,$),1)),console.error("early Return autoISF:  "+n(earlysens,r)),s+=", bg-ISF Ratio: "+i(Z,2)+l+", ISF: "+n(earlysens,r),earlysens;Z>1&&(O=!0,s+=", bg-ISF Ratio: "+i(Z,2));var H=t.delta;P>0?console.error("delta_ISF adaptation by-passed as average glucose < "+n(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(v-o.lastCarbTime)/1e3/3600?(U=1+Math.max(0,H*r.postmeal_ISF_weight),console.error("pp_ISF adaptation is "+i(U,2)),u=", pp-ISF Ratio: "+i(U,2),1!=U&&(O=!0)):(R=p(H,r),P>-20&&(R*=.5),R=1+R,console.error("delta_ISF adaptation is "+i(R,2)),d=", Δ-ISF Ratio: "+i(R,2),1!=R&&(O=!0));var J=1,K=r.autoisf_hourlychange;return o.mealCOB>0&&!r.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+i(o.mealCOB,1)):F<10?console.error("dura_ISF by-passed; BG is only "+F+"m at level "+G):G<=a?console.error("dura_ISF by-passed; avg. glucose "+G+" below target "+n(a,r)):(J+=F/60*(K/a)*(G-a),O=!0,m=", Duration: "+F+", Avg: "+n(G,r)+", dura-ISF Ratio: "+i(J,2),console.error("dura_ISF  adaptation is "+i(J,2)+" because ISF "+e+" did not do it for "+i(F,1)+"m")),$=1,O?($=Math.max(J,Z,R,A,U),console.error("autoISF adaption ratios:"),console.error("  dura "+i(J,2)),console.error("  bg "+i(Z,2)),console.error("  delta "+i(R,2)),console.error("  pp "+i(U,2)),console.error("  accel "+i(A,2)),A<1&&(console.error("strongest ISF factor "+i($,2)+" weakened to "+i($*A,2)+" as bg decelerates already"),$*=A),$<r.autoisf_min?(console.error("final ISF factor "+i($,2)+" limited by autoisf_min "+r.autoisf_min),$=r.autoisf_min):$>T&&(console.error("final ISF factor "+i($,2)+" limited by autoisf_max "+T),$=T),$>=1&&(e=i(r.sens/Math.max($,_),1)),$<1&&(e=i(r.sens/Math.min($,_),1))):$=_,s+=u+d+m+", Ratio: "+i($,2)+", ISF: "+n(e,r),console.error("Inside autoISF: Ratio "+i($,2)+" resulting in "+n(e,r)),e}console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+i(o.mealCOB,1))}(na,Ze,v,e,_,S,0,sensitivityRatio),void 0===t)return Oe.error="Error: iob_data undefined. ",Oe;var sa,la=t;if(t.length,t.length>1&&(t=la[0]),void 0===t.activity||void 0===t.iob)return Oe.error="Error: iob_data missing some property. ",Oe;var ma=((sa=void 0!==t.lastTemp?i((new Date(Pe).getTime()-t.lastTemp.date)/6e4):0)+r.duration)%30;if(console.error("currenttemp:"+r.rate+" lastTempAge:"+sa+"m, tempModulus:"+ma+"m"),Oe.temp="absolute",Oe.deliverAt=Ue,y&&r&&t.lastTemp&&r.rate!==t.lastTemp.rate&&sa>10&&r.duration)return Oe.reason="Warning: currenttemp rate "+r.rate+" != lastTemp rate "+t.lastTemp.rate+" from pumphistory; canceling temp",M.setTempBasal(0,0,v,Oe,r);if(r&&t.lastTemp&&r.duration>0){var ua=sa-t.lastTemp.duration;if(ua>5&&sa>10)return Oe.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+ua+"m ago; canceling temp",M.setTempBasal(0,0,v,Oe,r)}var da=i(-t.activity*na*5,2),ca=i(6*(Le-da));ca<0&&(ca=i(6*(ze-da)))<0&&(ca=i(6*(e.long_avgdelta-da)));var ga=We,fa=(ga=t.iob>0?i(We-t.iob*na):i(We-t.iob*Math.min(na,v.sens)))+ca;if(void 0===fa||isNaN(fa))return Oe.error="Error: could not calculate eventualBG. Sensitivity: "+na+" Deviation: "+ca,Oe;var ha=function(e,a,r){return i(r+(e-a)/24,1)}(Ze,fa,da);Oe={temp:"absolute",bg:We,tick:je,eventualBG:fa,insulinReq:0,reservoir:x,deliverAt:Ue,sensitivityRatio,TDD:te};var pa=[],ba=[],va=[],Ba=[];pa.push(We),ba.push(We),Ba.push(We),va.push(We);var _a=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of "+t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of "+r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of "+n(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(v,y,_,Ze),Ma=v.enableUAM,ya=0,xa=0;ya=i(Le-da,1);var Sa=i(Le-da,1);csf=na/v.carb_ratio,console.error("profile.sens:"+n(v.sens,v)+", sens:"+n(na,v)+", CSF:"+i(csf,1));var wa=i(30*csf*5/60,1);ya>wa&&(console.error("Limiting carb impact from "+ya+" to "+wa+"mg/dL/5m (30g/h)"),ya=wa);var Ca=3;sensitivityRatio&&(Ca/=sensitivityRatio);var Da=Ca;if(_.carbs){Ca=Math.max(Ca,_.mealCOB/20);var Ia=i((new Date(Pe).getTime()-_.lastCarbTime)/6e4),Fa=(_.carbs-_.mealCOB)/_.carbs;Da=i(Da=Ca+1.5*Ia/60,1),console.error("Last carbs "+Ia+" minutes ago; remainingCATime:"+Da+"hours; "+i(100*Fa,1)+"% carbs absorbed")}var Ga=Math.max(0,ya/5*60*Da/2)/csf,Ta=90,Oa=1;v.remainingCarbsCap&&(Ta=Math.min(90,v.remainingCarbsCap)),v.remainingCarbsFraction&&(Oa=Math.min(1,v.remainingCarbsFraction));var Ua=1-Oa,Ra=Math.max(0,_.mealCOB-Ga-_.carbs*Ua),Aa=(Ra=Math.min(Ta,Ra))*csf*5/60/(Da/2),Pa=i(_.slopeFromMaxDeviation,2),ja=i(_.slopeFromMinDeviation,2),qa=Math.min(Pa,-ja/3),ka=0;0===ya?xa=0:!0===v.floating_carbs?(xa=Math.min(60*Da/5/2,Math.max(0,_.carbs*csf/ya)),ka=Math.min(60*Da/5/2,Math.max(0,_.mealCOB*csf/ya)),_.carbs>0&&(s+=", Floating Carbs:, CID: "+i(xa,1)+", MealCarbs: "+i(_.carbs,1)+", Not Floating:, CID: "+i(ka,1)+", MealCOB: "+i(_.mealCOB,1),console.error("Floating Carbs CID: "+i(xa,1)+" / MealCarbs: "+i(_.carbs,1)+" vs. Not Floating:"+i(ka,1)+" / MealCOB:"+i(_.mealCOB,1)))):xa=Math.min(60*Da/5/2,Math.max(0,_.mealCOB*csf/ya)),console.error("Carb Impact:"+ya+"mg/dL per 5m; CI Duration:"+i(5*xa/60*2,1)+"hours; remaining CI ("+Da/2+"h peak):"+i(Aa,1)+"mg/dL per 5m");var Wa,Ea,La,za,Na,Za=999,$a=999,Ha=999,Ja=We,Ka=999,Qa=999,Va=999,Xa=999,Ya=fa,er=We,ar=We,rr=0,tr=[],or=[];try{la.forEach((function(e){var a=i(-e.activity*na*5,2),r=i(-e.iobWithZeroTemp.activity*na*5,2),t=ya*(1-Math.min(1,ba.length/12));Ya=ba[ba.length-1]+a+t;var o=Ba[Ba.length-1]+r,n=Math.max(0,Math.max(0,ya)*(1-pa.length/Math.max(2*xa,1))),s=Math.min(pa.length,12*Da-pa.length),l=Math.max(0,s/(Da/2*12)*Aa);n+l,tr.push(i(l,0)),or.push(i(n,0)),COBpredBG=pa[pa.length-1]+a+Math.min(0,t)+n+l;var m=Math.max(0,Sa+va.length*qa),u=Math.max(0,Sa*(1-va.length/Math.max(36,1))),d=Math.min(m,u);d>0&&(rr=i(5*(va.length+1)/60,1)),UAMpredBG=va[va.length-1]+a+Math.min(0,t)+d,ba.length<48&&ba.push(Ya),pa.length<48&&pa.push(COBpredBG),va.length<48&&va.push(UAMpredBG),Ba.length<48&&Ba.push(o),COBpredBG<Ka&&(Ka=i(COBpredBG)),UAMpredBG<Qa&&(Qa=i(UAMpredBG)),Ya<Va&&(Va=i(Ya)),o<Xa&&(Xa=i(o));ba.length>18&&Ya<Za&&(Za=i(Ya)),Ya>er&&(er=Ya),(xa||Aa>0)&&pa.length>18&&COBpredBG<$a&&($a=i(COBpredBG)),(xa||Aa>0)&&COBpredBG>er&&(ar=COBpredBG),Ma&&va.length>12&&UAMpredBG<Ha&&(Ha=i(UAMpredBG)),Ma&&UAMpredBG>er&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}_.mealCOB&&(console.error("predCIs (mg/dL/5m):"+or.join(" ")),console.error("remainingCIs:      "+tr.join(" "))),Oe.predBGs={},ba.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))}));for(var ir=ba.length-1;ir>12&&ba[ir-1]===ba[ir];ir--)ba.pop();for(Oe.predBGs.IOB=ba,La=i(ba[ba.length-1]),Ba.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),ir=Ba.length-1;ir>6&&!(Ba[ir-1]>=Ba[ir]||Ba[ir]<=Ze);ir--)Ba.pop();if(Oe.predBGs.ZT=Ba,i(Ba[Ba.length-1]),_.mealCOB>0&&(ya>0||Aa>0)){for(pa.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),ir=pa.length-1;ir>12&&pa[ir-1]===pa[ir];ir--)pa.pop();Oe.predBGs.COB=pa,za=i(pa[pa.length-1]),fa=Math.max(fa,i(pa[pa.length-1]))}if(ya>0||Aa>0){if(Ma){for(va.forEach((function(e,a,r){r[a]=i(Math.min(401,Math.max(39,e)))})),ir=va.length-1;ir>12&&va[ir-1]===va[ir];ir--)va.pop();Oe.predBGs.UAM=va,Na=i(va[va.length-1]),va[va.length-1]&&(fa=Math.max(fa,i(va[va.length-1])))}Oe.eventualBG=fa}console.error("UAM Impact:"+Sa+"mg/dL per 5m; UAM Duration:"+rr+"hours"),Za=Math.max(39,Za),$a=Math.max(39,$a),Ha=Math.max(39,Ha),Wa=i(Za);var nr=_.mealCOB/_.carbs;Ea=i(Ha<999&&$a<999?(1-nr)*UAMpredBG+nr*COBpredBG:$a<999?(Ya+COBpredBG)/2:Ha<999?(Ya+UAMpredBG)/2:Ya),Xa>Ea&&(Ea=Xa),Ja=i(Ja=xa||Aa>0?Ma?nr*Ka+(1-nr)*Qa:Ka:Ma?Qa:Va);var sr=Ha;if(Xa<oa)sr=(Ha+Xa)/2;else if(Xa<Ze){var lr=(Xa-oa)/(Ze-oa);sr=(Ha+(Ha*lr+Xa*(1-lr)))/2}else Xa>Ha&&(sr=(Ha+Xa)/2);if(sr=i(sr),_.carbs)if(!Ma&&$a<999)Wa=i(Math.max(Za,$a));else if($a<999){var mr=nr*$a+(1-nr)*sr;Wa=i(Math.max(Za,$a,mr))}else Wa=Ma?sr:Ja;else Ma&&(Wa=i(Math.max(Za,sr)));Wa=Math.min(Wa,Ea),process.stderr.write("minPredBG: "+Wa+" minIOBPredBG: "+Za+" minZTGuardBG: "+Xa),$a<999&&process.stderr.write(" minCOBPredBG: "+$a),Ha<999&&process.stderr.write(" minUAMPredBG: "+Ha),console.error(" avgPredBG:"+Ea+" COB/Carbs:"+_.mealCOB+"/"+_.carbs),ar>We&&(Wa=Math.min(Wa,ar)),Oe.COB=_.mealCOB,Oe.IOB=t.iob,Oe.BGI=n(da,v),Oe.deviation=n(ca,v),Oe.ISF=n(na,v),Oe.CR=i(v.carb_ratio,2),Oe.target_bg=n(Ze,v),Oe.TDD=i(te,2),Oe.reason=s+", COB: "+Oe.COB+", Dev: "+Oe.deviation+", BGI: "+Oe.BGI+", CR: "+Oe.CR+", Target: "+Oe.target_bg+", minPredBG "+n(Wa,v)+", minGuardBG "+n(Ja,v)+", IOBpredBG "+n(La,v),za>0&&(Oe.reason+=", COBpredBG "+n(za,v)),Na>0&&(Oe.reason+=", UAMpredBG "+n(Na,v)),Oe.reason+=tddReason,Oe.reason+="; ";var ur=ga;ur<40&&(ur=Math.min(Ja,ur));var dr,cr=oa-ur,gr=240,fr=240;if(_.mealCOB>0&&(ya>0||Aa>0)){for(ir=0;ir<pa.length;ir++)if(pa[ir]<$e){gr=5*ir;break}for(ir=0;ir<pa.length;ir++)if(pa[ir]<oa){fr=5*ir;break}}else{for(ir=0;ir<ba.length;ir++)if(ba[ir]<$e){gr=5*ir;break}for(ir=0;ir<ba.length;ir++)if(ba[ir]<oa){fr=5*ir;break}}_a&&Ja<oa&&(console.error("minGuardBG "+n(Ja,v)+" projected below "+n(oa,v)+" - disabling SMB"),_a=!1),void 0===v.maxDelta_bg_threshold&&(dr=.2),void 0!==v.maxDelta_bg_threshold&&(dr=Math.min(v.maxDelta_bg_threshold,.4)),Ne>dr*We&&(console.error("maxDelta "+n(Ne,v)+" > "+100*dr+"% of BG "+n(We,v)+" - disabling SMB"),Oe.reason+="maxDelta "+n(Ne,v)+" > "+100*dr+"% of BG "+n(We,v)+" - SMB disabled!, ",_a=!1),console.error("BG projected to remain above "+n($e,v)+" for "+gr+"minutes"),(fr<240||gr<60)&&console.error("BG projected to remain above "+n(oa,v)+" for "+fr+"minutes");var hr=fr,pr=v.current_basal*na*hr/60,br=Math.max(0,_.mealCOB-.25*_.carbs),vr=(cr-pr)/csf-br;pr=i(pr),vr=i(vr),console.error("naive_eventualBG:"+ga+" bgUndershoot:"+cr+" zeroTempDuration:"+hr+" zeroTempEffect:"+pr+" carbsReq:"+vr),vr>=v.carbsReqThreshold&&fr<=45&&(Oe.carbsReq=vr,Oe.reason+=vr+" add'l carbs req w/in "+fr+"m; ");var Br=0;if(We<oa&&t.iob<20*-v.current_basal/60&&Le>0&&Le>ha)Oe.reason+="IOB "+t.iob+" < "+i(20*-v.current_basal/60,2),Oe.reason+=" and minDelta "+n(Le,v)+" > expectedDelta "+n(ha,v)+"; ";else if(We<oa||Ja<oa)return Oe.reason+="minGuardBG "+n(Ja,v)+"<"+n(oa,v),Br=i(60*((cr=Ze-Ja)/na)/v.current_basal),Br=30*i(Br/30),Br=Math.min(120,Math.max(30,Br)),M.setTempBasal(0,Br,v,Oe,r);if(v.skip_neutral_temps&&Oe.deliverAt.getMinutes()>=55)return Oe.reason+="; Canceling temp at "+Oe.deliverAt.getMinutes()+"m past the hour. ",M.setTempBasal(0,0,v,Oe,r);var _r=0,Mr=Ae;if(fa<$e){if(Oe.reason+="Eventual BG "+n(fa,v)+" < "+n($e,v),Le>ha&&Le>0&&!vr)return ga<40?(Oe.reason+=", naive_eventualBG < 40. ",M.setTempBasal(0,30,v,Oe,r)):(e.delta>Le?Oe.reason+=", but Delta "+n(je,v)+" > expectedDelta "+n(ha,v):Oe.reason+=", but Min. Delta "+Le.toFixed(2)+" > Exp. Delta "+n(ha,v),r.duration>15&&o(Ae,v)===o(r.rate,v)?(Oe.reason+=", temp "+r.rate+" ~ req "+Ae+"U/hr. ",Oe):(Oe.reason+="; setting current basal of "+Ae+" as temp. ",M.setTempBasal(Ae,30,v,Oe,r)));_r=i(_r=2*Math.min(0,(fa-Ze)/na),2);var yr=Math.min(0,(ga-Ze)/na);if(yr=i(yr,2),Le<0&&Le>ha)_r=i(_r*(Le/ha),2);if(Mr=o(Mr=Ae+2*_r,v),r.duration*(r.rate-Ae)/60<Math.min(_r,yr)-.3*Ae)return Oe.reason+=", "+r.duration+"m@"+r.rate.toFixed(2)+" is a lot less than needed. ",M.setTempBasal(Mr,30,v,Oe,r);if(void 0!==r.rate&&r.duration>5&&Mr>=.8*r.rate)return Oe.reason+=", temp "+r.rate+" ~< req "+Mr+"U/hr. ",Oe;if(Mr<=0){if((Br=i(60*((cr=Ze-ga)/na)/v.current_basal))<0?Br=0:(Br=30*i(Br/30),Br=Math.min(120,Math.max(0,Br))),Br>0)return Oe.reason+=", setting "+Br+"m zero temp. ",M.setTempBasal(Mr,Br,v,Oe,r)}else Oe.reason+=", setting "+Mr+"U/hr. ";return M.setTempBasal(Mr,30,v,Oe,r)}if(Le<ha&&(!y||!_a))return e.delta<Le?Oe.reason+="Eventual BG "+n(fa,v)+" > "+n($e,v)+" but Delta "+n(je,v)+" < Exp. Delta "+n(ha,v):Oe.reason+="Eventual BG "+n(fa,v)+" > "+n($e,v)+" but Min. Delta "+Le.toFixed(2)+" < Exp. Delta "+n(ha,v),r.duration>15&&o(Ae,v)===o(r.rate,v)?(Oe.reason+=", temp "+r.rate+" ~ req "+Ae+"U/hr. ",Oe):(Oe.reason+="; setting current basal of "+Ae+" as temp. ",M.setTempBasal(Ae,30,v,Oe,r));if(Math.min(fa,Wa)<He&&(!y||!_a))return Oe.reason+=n(fa,v)+"-"+n(Wa,v)+" in range: no temp required",r.duration>15&&o(Ae,v)===o(r.rate,v)?(Oe.reason+=", temp "+r.rate+" ~ req "+Ae+"U/hr. ",Oe):(Oe.reason+="; setting current basal of "+Ae+" as temp. ",M.setTempBasal(Ae,30,v,Oe,r));if(fa>=He&&(Oe.reason+="Eventual BG "+n(fa,v)+" >= "+n(He,v)+", "),t.iob>Je)return Oe.reason+="IOB "+i(t.iob,2)+" > max_iob "+Je,r.duration>15&&o(Ae,v)===o(r.rate,v)?(Oe.reason+=", temp "+r.rate+" ~ req "+Ae+"U/hr. ",Oe):(Oe.reason+="; setting current basal of "+Ae+" as temp. ",M.setTempBasal(Ae,30,v,Oe,r));(_r=i((Math.min(Wa,fa)-Ze)/na,2))>Je-t.iob?(console.error("SMB limited by maxIOB: "+Je-t.iob+" (. insulinReq: "+_r+" U)"),Oe.reason+="max_iob "+Je+", ",_r=Je-t.iob):console.error("SMB not limited by maxIOB ( insulinReq: "+_r+" U)."),Mr=o(Mr=Ae+2*_r,v),_r=i(_r,3),Oe.insulinReq=_r;var xr=i((new Date(Pe).getTime()-t.lastBolusTime)/6e4,1);if(y&&_a&&We>oa){var Sr=i(_.mealCOB/v.carb_ratio,3);if(v.use_autoisf)wr=v.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var wr=1}wr>1&&console.error("SMB max range extended from default by factor "+wr);var Cr=0;void 0===v.maxSMBBasalMinutes?(Cr=i(wr*v.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m"),_r>Cr&&(console.error("SMB limited by maxBolus: "+Cr+" ( "+_r+" U)"),a)):t.iob>Sr&&t.iob>0?(console.error("IOB"+t.iob+"> COB"+_.mealCOB+"; mealInsulinReq ="+Sr),v.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes: "+v.maxUAMSMBBasalMinutes+", profile.current_basal: "+v.current_basal),Cr=i(wr*v.current_basal*v.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),Cr=i(30*v.current_basal/60,1)),_r>Cr?console.error("SMB limited by maxUAMSMBBasalMinutes: "+v.maxUAMSMBBasalMinutes+" ( "+_r+" )"):console.error("SMB is not limited by maxUAMSMBBasalMinutes. (insulinReq: "+_r+" U)")):(console.error("profile.maxSMBBasalMinutes: "+v.maxSMBBasalMinutes+", profile.current_basal: "+v.current_basal),_r>(Cr=i(wr*v.current_basal*v.maxSMBBasalMinutes/60,1))?console.error("SMB limited by maxSMBBasalMinutes: "+v.maxSMBBasalMinutes+" ( insulinReq: "+_r+" U)"):console.error("SMB is not limited by maxSMBBasalMinutes. (insulinReq: "+_r+" U)"));var Dr=v.bolus_increment,Ir=1/Dr,Fr=b(v,We,Ze);Fr>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+i(Fr,2));var Gr=Math.min(_r*Fr,Cr);Gr=Math.floor(Gr*Ir)/Ir,Br=i(60*((Ze-(ga+Za)/2)/na)/v.current_basal),_r>0&&Gr<Dr&&(Br=0);var Tr=0;Br<=0?Br=0:Br>=30?(Br=30*i(Br/30),Br=Math.min(60,Math.max(0,Br))):(Tr=i(Ae*Br/30,2),Br=30),Oe.reason+=" insulinReq "+_r,Gr>=Cr&&(Oe.reason+="; maxBolus "+Cr),Br>0&&(Oe.reason+="; setting "+Br+"m low temp of "+Tr+"U/h"),Oe.reason+=". ";var Or=3;v.SMBInterval&&(Or=Math.min(10,Math.max(1,v.SMBInterval)));var Ur=i(Or-xr,0),Rr=i(60*(Or-xr),0)%60;if(console.error("naive_eventualBG "+ga+","+Br+"m "+Tr+"U/h temp needed; last bolus "+xr+"m ago; maxBolus: "+Cr),xr>Or?Gr>0&&(Oe.units=Gr,Oe.reason+="Microbolusing "+Gr+"U. "):Oe.reason+="Waiting "+Ur+"m "+Rr+"s to microbolus again. ",Br>0)return Oe.rate=Tr,Oe.duration=Br,Oe}var Ar=M.getMaxSafeBasal(v);return Mr>Ar&&(Oe.reason+="adj. req. rate: "+Mr+" to maxSafeBasal: "+i(Ar,2)+", ",Mr=o(Ar,v)),r.duration*(r.rate-Ae)/60>=2*_r?(Oe.reason+=r.duration+"m@"+r.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+Mr+"U/hr. ",M.setTempBasal(Mr,30,v,Oe,r)):void 0===r.duration||0===r.duration?(Oe.reason+="no temp, setting "+Mr+"U/hr. ",M.setTempBasal(Mr,30,v,Oe,r)):r.duration>5&&o(Mr,v)<=o(r.rate,v)?(Oe.reason+="temp "+r.rate+" >~ req "+Mr+"U/hr. ",Oe):(Oe.reason+="temp "+r.rate+"<"+Mr+"U/hr. ",M.setTempBasal(Mr,30,v,Oe,r))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),i=r(2333),n=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),i=r(1469),n=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(i(a))return o(a,e)+"";if(n(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,i=o.hasOwnProperty,n=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=i.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=n.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=t||o||Function("return this")();e.exports=i},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),i=r(554),n=r(9833);e.exports=function(e,a,r){e=n(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(i(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),i=r(3448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?m(e.slice(2),r?2:8):n.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},r={};function t(a){var o=r[a];if(void 0!==o)return o.exports;var i=r[a]={exports:{}};return e[a](i,i.exports,t),i.exports}t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var o=t(5546);freeaps_determineBasal=o})();