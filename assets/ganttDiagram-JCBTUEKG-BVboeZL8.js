import{$n as e,Bt as t,Cr as n,Dn as r,Dt as i,Gr as a,In as o,Jn as s,Jr as c,Kn as l,Kr as u,Pn as d,Qn as f,Rn as p,Sr as m,Wt as h,Xn as g,_r as _,ar as v,bn as y,br as b,cn as x,cr as S,dr as C,fr as w,hr as T,ir as E,jn as D,lr as O,mr as k,nr as A,or as j,pr as M,tr as ee,ur as te,vn as ne,xn as re,xr as ie,yr as N}from"./common-yNp3ynXU.js";var ae=u((e,t)=>{(function(n,r){typeof e==`object`&&typeof t<`u`?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).dayjs_plugin_isoWeek=r()})(e,(function(){var e=`day`;return function(t,n,r){var i=a(function(t){return t.add(4-t.isoWeekday(),e)},`a`),o=n.prototype;o.isoWeekYear=function(){return i(this).year()},o.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),e);var n,a,o,s,c=i(this),l=(n=this.isoWeekYear(),a=this.$u,o=(a?r.utc:r)().year(n).startOf(`year`),s=4-o.isoWeekday(),o.isoWeekday()>4&&(s+=7),o.add(s,e));return c.diff(l,`week`)+1},o.isoWeekday=function(e){return this.$utils().u(e)?this.day()||7:this.day(this.day()%7?e:e-7)};var s=o.startOf;o.startOf=function(e,t){var n=this.$utils(),r=!!n.u(t)||t;return n.p(e)===`isoweek`?r?this.date(this.date()-(this.isoWeekday()-1)).startOf(`day`):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf(`day`):s.bind(this)(e,t)}}}))}),P=u((e,t)=>{(function(n,r){typeof e==`object`&&typeof t<`u`?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).dayjs_plugin_customParseFormat=r()})(e,(function(){var e={LTS:`h:mm:ss A`,LT:`h:mm A`,L:`MM/DD/YYYY`,LL:`MMMM D, YYYY`,LLL:`MMMM D, YYYY h:mm A`,LLLL:`dddd, MMMM D, YYYY h:mm A`},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,r=/\d\d/,i=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,s={},c=a(function(e){return(e=+e)+(e>68?1900:2e3)},`a`),l=a(function(e){return function(t){this[e]=+t}},`f`),u=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||={}).offset=(function(e){if(!e||e===`Z`)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return n===0?0:t[0]===`+`?-n:n})(e)}],d=a(function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},`u`),f=a(function(e,t){var n,r=s.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?`pm`:`PM`);return n},`d`),p={A:[o,function(e){this.afternoon=f(e,!1)}],a:[o,function(e){this.afternoon=f(e,!0)}],Q:[n,function(e){this.month=3*(e-1)+1}],S:[n,function(e){this.milliseconds=100*e}],SS:[r,function(e){this.milliseconds=10*e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[i,l(`seconds`)],ss:[i,l(`seconds`)],m:[i,l(`minutes`)],mm:[i,l(`minutes`)],H:[i,l(`hours`)],h:[i,l(`hours`)],HH:[i,l(`hours`)],hh:[i,l(`hours`)],D:[i,l(`day`)],DD:[r,l(`day`)],Do:[o,function(e){var t=s.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,``)===e&&(this.day=r)}],w:[i,l(`week`)],ww:[r,l(`week`)],M:[i,l(`month`)],MM:[r,l(`month`)],MMM:[o,function(e){var t=d(`months`),n=(d(`monthsShort`)||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw Error();this.month=n%12||n}],MMMM:[o,function(e){var t=d(`months`).indexOf(e)+1;if(t<1)throw Error();this.month=t%12||t}],Y:[/[+-]?\d+/,l(`year`)],YY:[r,function(e){this.year=c(e)}],YYYY:[/\d{4}/,l(`year`)],Z:u,ZZ:u};function m(n){for(var r=n,i=s&&s.formats,a=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var a=r&&r.toUpperCase();return n||i[r]||e[r]||i[a].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),o=a.length,c=0;c<o;c+=1){var l=a[c],u=p[l],d=u&&u[0],f=u&&u[1];a[c]=f?{regex:d,parser:f}:l.replace(/^\[|\]$/g,``)}return function(e){for(var t={},n=0,r=0;n<o;n+=1){var i=a[n];if(typeof i==`string`)r+=i.length;else{var s=i.regex,c=i.parser,l=e.slice(r),u=s.exec(l)[0];c.call(t,u),e=e.replace(u,``)}}return(function(e){var t=e.afternoon;if(t!==void 0){var n=e.hours;t?n<12&&(e.hours+=12):n===12&&(e.hours=0),delete e.afternoon}})(t),t}}return a(m,`l`),function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(c=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,a=e.args;this.$u=r;var o=a[1];if(typeof o==`string`){var c=a[2]===!0,l=a[3]===!0,u=c||l,d=a[2];l&&(d=a[2]),s=this.$locale(),!c&&d&&(s=n.Ls[d]),this.$d=(function(e,t,n,r){try{if([`x`,`X`].indexOf(t)>-1)return new Date((t===`X`?1e3:1)*e);var i=m(t)(e),a=i.year,o=i.month,s=i.day,c=i.hours,l=i.minutes,u=i.seconds,d=i.milliseconds,f=i.zone,p=i.week,h=new Date,g=s||(a||o?1:h.getDate()),_=a||h.getFullYear(),v=0;a&&!o||(v=o>0?o-1:h.getMonth());var y,b=c||0,x=l||0,S=u||0,C=d||0;return f?new Date(Date.UTC(_,v,g,b,x,S,C+60*f.offset*1e3)):n?new Date(Date.UTC(_,v,g,b,x,S,C)):(y=new Date(_,v,g,b,x,S,C),p&&(y=r(y).week(p).toDate()),y)}catch{return new Date(``)}})(t,o,r,n),this.init(),d&&d!==!0&&(this.$L=this.locale(d).$L),u&&t!=this.format(o)&&(this.$d=new Date(``)),s={}}else if(o instanceof Array)for(var f=o.length,p=1;p<=f;p+=1){a[1]=o[p-1];var h=n.apply(this,a);if(h.isValid()){this.$d=h.$d,this.$L=h.$L,this.init();break}p===f&&(this.$d=new Date(``))}else i.call(this,e)}}}))}),F=u((e,t)=>{(function(n,r){typeof e==`object`&&typeof t<`u`?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).dayjs_plugin_advancedFormat=r()})(e,(function(){return function(e,t){var n=t.prototype,r=n.format;n.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return r.bind(this)(e);var i=this.$utils(),a=(e||`YYYY-MM-DDTHH:mm:ssZ`).replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case`Q`:return Math.ceil((t.$M+1)/3);case`Do`:return n.ordinal(t.$D);case`gggg`:return t.weekYear();case`GGGG`:return t.isoWeekYear();case`wo`:return n.ordinal(t.week(),`W`);case`w`:case`ww`:return i.s(t.week(),e===`w`?1:2,`0`);case`W`:case`WW`:return i.s(t.isoWeek(),e===`W`?1:2,`0`);case`k`:case`kk`:return i.s(String(t.$H===0?24:t.$H),e===`k`?1:2,`0`);case`X`:return Math.floor(t.$d.getTime()/1e3);case`x`:return t.$d.getTime();case`z`:return`[`+t.offsetName()+`]`;case`zzz`:return`[`+t.offsetName(`long`)+`]`;default:return e}}));return r.bind(this)(a)}}}))}),oe=u((e,t)=>{(function(n,r){typeof e==`object`&&typeof t<`u`?t.exports=r():typeof define==`function`&&define.amd?define(r):(n=typeof globalThis<`u`?globalThis:n||self).dayjs_plugin_duration=r()})(e,(function(){var e,t,n=1e3,r=6e4,i=36e5,o=864e5,s=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=31536e6,l=2628e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:c,months:l,days:o,hours:i,minutes:r,seconds:n,milliseconds:1,weeks:6048e5},f=a(function(e){return e instanceof y},`c`),p=a(function(e,t,n){return new y(e,n,t.$l)},`f`),m=a(function(e){return t.p(e)+`s`},`m`),h=a(function(e){return e<0},`l`),g=a(function(e){return h(e)?Math.ceil(e):Math.floor(e)},`$`),_=a(function(e){return Math.abs(e)},`y`),v=a(function(e,t){return e?h(e)?{negative:!0,format:``+_(e)+t}:{negative:!1,format:``+e+t}:{negative:!1,format:``}},`v`),y=(function(){function h(e,t,n){var r=this;if(this.$d={},this.$l=n,e===void 0&&(this.$ms=0,this.parseFromMilliseconds()),t)return p(e*d[m(t)],this);if(typeof e==`number`)return this.$ms=e,this.parseFromMilliseconds(),this;if(typeof e==`object`)return Object.keys(e).forEach((function(t){r.$d[m(t)]=e[t]})),this.calMilliseconds(),this;if(typeof e==`string`){var i=e.match(u);if(i){var a=i.slice(2).map((function(e){return e==null?0:Number(e)}));return this.$d.years=a[0],this.$d.months=a[1],this.$d.weeks=a[2],this.$d.days=a[3],this.$d.hours=a[4],this.$d.minutes=a[5],this.$d.seconds=a[6],this.calMilliseconds(),this}}return this}a(h,`l`);var _=h.prototype;return _.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*d[n]}),0)},_.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=g(e/c),e%=c,this.$d.months=g(e/l),e%=l,this.$d.days=g(e/o),e%=o,this.$d.hours=g(e/i),e%=i,this.$d.minutes=g(e/r),e%=r,this.$d.seconds=g(e/n),e%=n,this.$d.milliseconds=e},_.toISOString=function(){var e=v(this.$d.years,`Y`),t=v(this.$d.months,`M`),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var r=v(n,`D`),i=v(this.$d.hours,`H`),a=v(this.$d.minutes,`M`),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3,o=Math.round(1e3*o)/1e3);var s=v(o,`S`),c=e.negative||t.negative||r.negative||i.negative||a.negative||s.negative,l=i.format||a.format||s.format?`T`:``,u=(c?`-`:``)+`P`+e.format+t.format+r.format+l+i.format+a.format+s.format;return u===`P`||u===`-P`?`P0D`:u},_.toJSON=function(){return this.toISOString()},_.format=function(e){var n=e||`YYYY-MM-DDTHH:mm:ss`,r={Y:this.$d.years,YY:t.s(this.$d.years,2,`0`),YYYY:t.s(this.$d.years,4,`0`),M:this.$d.months,MM:t.s(this.$d.months,2,`0`),D:this.$d.days,DD:t.s(this.$d.days,2,`0`),H:this.$d.hours,HH:t.s(this.$d.hours,2,`0`),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,`0`),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,`0`),SSS:t.s(this.$d.milliseconds,3,`0`)};return n.replace(s,(function(e,t){return t||String(r[e])}))},_.as=function(e){return this.$ms/d[m(e)]},_.get=function(e){var t=this.$ms,n=m(e);return n===`milliseconds`?t%=1e3:t=n===`weeks`?g(t/d[n]):this.$d[n],t||0},_.add=function(e,t,n){var r;return r=t?e*d[m(t)]:f(e)?e.$ms:p(e,this).$ms,p(this.$ms+r*(n?-1:1),this)},_.subtract=function(e,t){return this.add(e,t,!0)},_.locale=function(e){var t=this.clone();return t.$l=e,t},_.clone=function(){return p(this.$ms,this)},_.humanize=function(t){return e().add(this.$ms,`ms`).locale(this.$l).fromNow(!t)},_.valueOf=function(){return this.asMilliseconds()},_.milliseconds=function(){return this.get(`milliseconds`)},_.asMilliseconds=function(){return this.as(`milliseconds`)},_.seconds=function(){return this.get(`seconds`)},_.asSeconds=function(){return this.as(`seconds`)},_.minutes=function(){return this.get(`minutes`)},_.asMinutes=function(){return this.as(`minutes`)},_.hours=function(){return this.get(`hours`)},_.asHours=function(){return this.as(`hours`)},_.days=function(){return this.get(`days`)},_.asDays=function(){return this.as(`days`)},_.weeks=function(){return this.get(`weeks`)},_.asWeeks=function(){return this.as(`weeks`)},_.months=function(){return this.get(`months`)},_.asMonths=function(){return this.as(`months`)},_.years=function(){return this.get(`years`)},_.asYears=function(){return this.as(`years`)},h})(),b=a(function(e,t,n){return e.add(t.years()*n,`y`).add(t.months()*n,`M`).add(t.days()*n,`d`).add(t.hours()*n,`h`).add(t.minutes()*n,`m`).add(t.seconds()*n,`s`).add(t.milliseconds()*n,`ms`)},`p`);return function(n,r,i){e=i,t=i().$utils(),i.duration=function(e,t){return p(e,{$l:i.locale()},t)},i.isDuration=f;var a=r.prototype.add,o=r.prototype.subtract;r.prototype.add=function(e,t){return f(e)?b(this,e,1):a.bind(this)(e,t)},r.prototype.subtract=function(e,t){return f(e)?b(this,e,-1):o.bind(this)(e,t)}}}))}),I=(function(){var e=a(function(e,t,n,r){for(n||={},r=e.length;r--;n[e[r]]=t);return n},`o`),t=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],n=[1,26],r=[1,27],i=[1,28],o=[1,29],s=[1,30],c=[1,31],l=[1,32],u=[1,33],d=[1,34],f=[1,9],p=[1,10],m=[1,11],h=[1,12],g=[1,13],_=[1,14],v=[1,15],y=[1,16],b=[1,19],x=[1,20],S=[1,21],C=[1,22],w=[1,23],T=[1,25],E=[1,35],D={trace:a(function(){},`trace`),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:`error`,4:`gantt`,6:`EOF`,8:`SPACE`,10:`NL`,12:`weekday_monday`,13:`weekday_tuesday`,14:`weekday_wednesday`,15:`weekday_thursday`,16:`weekday_friday`,17:`weekday_saturday`,18:`weekday_sunday`,20:`weekend_friday`,21:`weekend_saturday`,22:`dateFormat`,23:`inclusiveEndDates`,24:`topAxis`,25:`axisFormat`,26:`tickInterval`,27:`excludes`,28:`includes`,29:`todayMarker`,30:`title`,31:`acc_title`,32:`acc_title_value`,33:`acc_descr`,34:`acc_descr_value`,35:`acc_descr_multiline_value`,36:`section`,38:`taskTxt`,39:`taskData`,40:`click`,41:`callbackname`,42:`callbackargs`,43:`href`},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:a(function(e,t,n,r,i,a,o){var s=a.length-1;switch(i){case 1:return a[s-1];case 2:this.$=[];break;case 3:a[s-1].push(a[s]),this.$=a[s-1];break;case 4:case 5:this.$=a[s];break;case 6:case 7:this.$=[];break;case 8:r.setWeekday(`monday`);break;case 9:r.setWeekday(`tuesday`);break;case 10:r.setWeekday(`wednesday`);break;case 11:r.setWeekday(`thursday`);break;case 12:r.setWeekday(`friday`);break;case 13:r.setWeekday(`saturday`);break;case 14:r.setWeekday(`sunday`);break;case 15:r.setWeekend(`friday`);break;case 16:r.setWeekend(`saturday`);break;case 17:r.setDateFormat(a[s].substr(11)),this.$=a[s].substr(11);break;case 18:r.enableInclusiveEndDates(),this.$=a[s].substr(18);break;case 19:r.TopAxis(),this.$=a[s].substr(8);break;case 20:r.setAxisFormat(a[s].substr(11)),this.$=a[s].substr(11);break;case 21:r.setTickInterval(a[s].substr(13)),this.$=a[s].substr(13);break;case 22:r.setExcludes(a[s].substr(9)),this.$=a[s].substr(9);break;case 23:r.setIncludes(a[s].substr(9)),this.$=a[s].substr(9);break;case 24:r.setTodayMarker(a[s].substr(12)),this.$=a[s].substr(12);break;case 27:r.setDiagramTitle(a[s].substr(6)),this.$=a[s].substr(6);break;case 28:this.$=a[s].trim(),r.setAccTitle(this.$);break;case 29:case 30:this.$=a[s].trim(),r.setAccDescription(this.$);break;case 31:r.addSection(a[s].substr(8)),this.$=a[s].substr(8);break;case 33:r.addTask(a[s-1],a[s]),this.$=`task`;break;case 34:this.$=a[s-1],r.setClickEvent(a[s-1],a[s],null);break;case 35:this.$=a[s-2],r.setClickEvent(a[s-2],a[s-1],a[s]);break;case 36:this.$=a[s-2],r.setClickEvent(a[s-2],a[s-1],null),r.setLink(a[s-2],a[s]);break;case 37:this.$=a[s-3],r.setClickEvent(a[s-3],a[s-2],a[s-1]),r.setLink(a[s-3],a[s]);break;case 38:this.$=a[s-2],r.setClickEvent(a[s-2],a[s],null),r.setLink(a[s-2],a[s-1]);break;case 39:this.$=a[s-3],r.setClickEvent(a[s-3],a[s-1],a[s]),r.setLink(a[s-3],a[s-2]);break;case 40:this.$=a[s-1],r.setLink(a[s-1],a[s]);break;case 41:case 47:this.$=a[s-1]+` `+a[s];break;case 42:case 43:case 45:this.$=a[s-2]+` `+a[s-1]+` `+a[s];break;case 44:case 46:this.$=a[s-3]+` `+a[s-2]+` `+a[s-1]+` `+a[s];break}},`anonymous`),table:[{3:1,4:[1,2]},{1:[3]},e(t,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:r,14:i,15:o,16:s,17:c,18:l,19:18,20:u,21:d,22:f,23:p,24:m,25:h,26:g,27:_,28:v,29:y,30:b,31:x,33:S,35:C,36:w,37:24,38:T,40:E},e(t,[2,7],{1:[2,1]}),e(t,[2,3]),{9:36,11:17,12:n,13:r,14:i,15:o,16:s,17:c,18:l,19:18,20:u,21:d,22:f,23:p,24:m,25:h,26:g,27:_,28:v,29:y,30:b,31:x,33:S,35:C,36:w,37:24,38:T,40:E},e(t,[2,5]),e(t,[2,6]),e(t,[2,17]),e(t,[2,18]),e(t,[2,19]),e(t,[2,20]),e(t,[2,21]),e(t,[2,22]),e(t,[2,23]),e(t,[2,24]),e(t,[2,25]),e(t,[2,26]),e(t,[2,27]),{32:[1,37]},{34:[1,38]},e(t,[2,30]),e(t,[2,31]),e(t,[2,32]),{39:[1,39]},e(t,[2,8]),e(t,[2,9]),e(t,[2,10]),e(t,[2,11]),e(t,[2,12]),e(t,[2,13]),e(t,[2,14]),e(t,[2,15]),e(t,[2,16]),{41:[1,40],43:[1,41]},e(t,[2,4]),e(t,[2,28]),e(t,[2,29]),e(t,[2,33]),e(t,[2,34],{42:[1,42],43:[1,43]}),e(t,[2,40],{41:[1,44]}),e(t,[2,35],{43:[1,45]}),e(t,[2,36]),e(t,[2,38],{42:[1,46]}),e(t,[2,37]),e(t,[2,39])],defaultActions:{},parseError:a(function(e,t){if(t.recoverable)this.trace(e);else{var n=Error(e);throw n.hash=t,n}},`parseError`),parse:a(function(e){var t=this,n=[0],r=[],i=[null],o=[],s=this.table,c=``,l=0,u=0,d=0,f=2,p=1,m=o.slice.call(arguments,1),h=Object.create(this.lexer),g={yy:{}};for(var _ in this.yy)Object.prototype.hasOwnProperty.call(this.yy,_)&&(g.yy[_]=this.yy[_]);h.setInput(e,g.yy),g.yy.lexer=h,g.yy.parser=this,typeof h.yylloc>`u`&&(h.yylloc={});var v=h.yylloc;o.push(v);var y=h.options&&h.options.ranges;typeof g.yy.parseError==`function`?this.parseError=g.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function b(e){n.length-=2*e,i.length-=e,o.length-=e}a(b,`popStack`);function x(){var e;return e=r.pop()||h.lex()||p,typeof e!=`number`&&(e instanceof Array&&(r=e,e=r.pop()),e=t.symbols_[e]||e),e}a(x,`lex`);for(var S,C,w,T,E,D={},O,k,A,j;;){if(w=n[n.length-1],this.defaultActions[w]?T=this.defaultActions[w]:((S===null||typeof S>`u`)&&(S=x()),T=s[w]&&s[w][S]),typeof T>`u`||!T.length||!T[0]){var M=``;for(O in j=[],s[w])this.terminals_[O]&&O>f&&j.push(`'`+this.terminals_[O]+`'`);M=h.showPosition?`Parse error on line `+(l+1)+`:
`+h.showPosition()+`
Expecting `+j.join(`, `)+`, got '`+(this.terminals_[S]||S)+`'`:`Parse error on line `+(l+1)+`: Unexpected `+(S==p?`end of input`:`'`+(this.terminals_[S]||S)+`'`),this.parseError(M,{text:h.match,token:this.terminals_[S]||S,line:h.yylineno,loc:v,expected:j})}if(T[0]instanceof Array&&T.length>1)throw Error(`Parse Error: multiple actions possible at state: `+w+`, token: `+S);switch(T[0]){case 1:n.push(S),i.push(h.yytext),o.push(h.yylloc),n.push(T[1]),S=null,C?(S=C,C=null):(u=h.yyleng,c=h.yytext,l=h.yylineno,v=h.yylloc,d>0&&d--);break;case 2:if(k=this.productions_[T[1]][1],D.$=i[i.length-k],D._$={first_line:o[o.length-(k||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(k||1)].first_column,last_column:o[o.length-1].last_column},y&&(D._$.range=[o[o.length-(k||1)].range[0],o[o.length-1].range[1]]),E=this.performAction.apply(D,[c,u,l,g.yy,T[1],i,o].concat(m)),typeof E<`u`)return E;k&&(n=n.slice(0,-1*k*2),i=i.slice(0,-1*k),o=o.slice(0,-1*k)),n.push(this.productions_[T[1]][0]),i.push(D.$),o.push(D._$),A=s[n[n.length-2]][n[n.length-1]],n.push(A);break;case 3:return!0}}return!0},`parse`)};D.lexer=(function(){return{EOF:1,parseError:a(function(e,t){if(this.yy.parser)this.yy.parser.parseError(e,t);else throw Error(e)},`parseError`),setInput:a(function(e,t){return this.yy=t||this.yy||{},this._input=e,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match=``,this.conditionStack=[`INITIAL`],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},`setInput`),input:a(function(){var e=this._input[0];return this.yytext+=e,this.yyleng++,this.offset++,this.match+=e,this.matched+=e,e.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),e},`input`),unput:a(function(e){var t=e.length,n=e.split(/(?:\r\n?|\n)/g);this._input=e+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-t),this.offset-=t;var r=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===r.length?this.yylloc.first_column:0)+r[r.length-n.length].length-n[0].length:this.yylloc.first_column-t},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-t]),this.yyleng=this.yytext.length,this},`unput`),more:a(function(){return this._more=!0,this},`more`),reject:a(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError(`Lexical error on line `+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:``,token:null,line:this.yylineno});return this},`reject`),less:a(function(e){this.unput(this.match.slice(e))},`less`),pastInput:a(function(){var e=this.matched.substr(0,this.matched.length-this.match.length);return(e.length>20?`...`:``)+e.substr(-20).replace(/\n/g,``)},`pastInput`),upcomingInput:a(function(){var e=this.match;return e.length<20&&(e+=this._input.substr(0,20-e.length)),(e.substr(0,20)+(e.length>20?`...`:``)).replace(/\n/g,``)},`upcomingInput`),showPosition:a(function(){var e=this.pastInput(),t=Array(e.length+1).join(`-`);return e+this.upcomingInput()+`
`+t+`^`},`showPosition`),test_match:a(function(e,t){var n,r,i;if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),r=e[0].match(/(?:\r\n?|\n).*/g),r&&(this.yylineno+=r.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:r?r[r.length-1].length-r[r.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],n=this.performAction.call(this,this.yy,this,t,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var a in i)this[a]=i[a];return!1}return!1},`test_match`),next:a(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var e,t,n,r;this._more||(this.yytext=``,this.match=``);for(var i=this._currentRules(),a=0;a<i.length;a++)if(n=this._input.match(this.rules[i[a]]),n&&(!t||n[0].length>t[0].length)){if(t=n,r=a,this.options.backtrack_lexer){if(e=this.test_match(n,i[a]),e!==!1)return e;if(this._backtrack){t=!1;continue}else return!1}else if(!this.options.flex)break}return t?(e=this.test_match(t,i[r]),e===!1?!1:e):this._input===``?this.EOF:this.parseError(`Lexical error on line `+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:``,token:null,line:this.yylineno})},`next`),lex:a(function(){return this.next()||this.lex()},`lex`),begin:a(function(e){this.conditionStack.push(e)},`begin`),popState:a(function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},`popState`),_currentRules:a(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},`_currentRules`),topState:a(function(e){return e=this.conditionStack.length-1-Math.abs(e||0),e>=0?this.conditionStack[e]:`INITIAL`},`topState`),pushState:a(function(e){this.begin(e)},`pushState`),stateStackSize:a(function(){return this.conditionStack.length},`stateStackSize`),options:{"case-insensitive":!0},performAction:a(function(e,t,n,r){switch(n){case 0:return this.begin(`open_directive`),`open_directive`;case 1:return this.begin(`acc_title`),31;case 2:return this.popState(),`acc_title_value`;case 3:return this.begin(`acc_descr`),33;case 4:return this.popState(),`acc_descr_value`;case 5:this.begin(`acc_descr_multiline`);break;case 6:this.popState();break;case 7:return`acc_descr_multiline_value`;case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin(`href`);break;case 15:this.popState();break;case 16:return 43;case 17:this.begin(`callbackname`);break;case 18:this.popState();break;case 19:this.popState(),this.begin(`callbackargs`);break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin(`click`);break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return`date`;case 45:return 30;case 46:return`accDescription`;case 47:return 36;case 48:return 38;case 49:return 39;case 50:return`:`;case 51:return 6;case 52:return`INVALID`}},`anonymous`),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}}})();function O(){this.yy={}}return a(O,`Parser`),O.prototype=D,D.Parser=O,new O})();I.parser=I;var se=I,ce=c(t(),1),L=c(s(),1),le=c(ae(),1),ue=c(P(),1),de=c(F(),1);L.default.extend(le.default),L.default.extend(ue.default),L.default.extend(de.default);var fe={friday:5,saturday:6},R=``,pe=``,me,he=``,z=[],B=[],ge=new Map,_e=[],V=[],H=``,ve=``,ye=[`active`,`done`,`crit`,`milestone`,`vert`],U=[],W=``,G=!1,be=!1,xe=`sunday`,K=`saturday`,Se=0,Ce=a(function(){_e=[],V=[],H=``,U=[],q=0,it=void 0,Y=void 0,X=[],R=``,pe=``,ve=``,me=void 0,he=``,z=[],B=[],G=!1,be=!1,Se=0,ge=new Map,W=``,d(),xe=`sunday`,K=`saturday`},`clear`),we=a(function(e){W=e},`setDiagramId`),Te=a(function(e){pe=e},`setAxisFormat`),Ee=a(function(){return pe},`getAxisFormat`),De=a(function(e){me=e},`setTickInterval`),Oe=a(function(){return me},`getTickInterval`),ke=a(function(e){he=e},`setTodayMarker`),Ae=a(function(){return he},`getTodayMarker`),je=a(function(e){R=e},`setDateFormat`),Me=a(function(){G=!0},`enableInclusiveEndDates`),Ne=a(function(){return G},`endDatesAreInclusive`),Pe=a(function(){be=!0},`enableTopAxis`),Fe=a(function(){return be},`topAxisEnabled`),Ie=a(function(e){ve=e},`setDisplayMode`),Le=a(function(){return ve},`getDisplayMode`),Re=a(function(){return R},`getDateFormat`),ze=a(function(e){z=e.toLowerCase().split(/[\s,]+/)},`setIncludes`),Be=a(function(){return z},`getIncludes`),Ve=a(function(e){B=e.toLowerCase().split(/[\s,]+/)},`setExcludes`),He=a(function(){return B},`getExcludes`),Ue=a(function(){return ge},`getLinks`),We=a(function(e){H=e,_e.push(e)},`addSection`),Ge=a(function(){return _e},`getSections`),Ke=a(function(){let e=ct(),t=0;for(;!e&&t<10;)e=ct(),t++;return V=X,V},`getTasks`),qe=a(function(e,t,n,r){let i=e.format(t.trim()),a=e.format(`YYYY-MM-DD`);return r.includes(i)||r.includes(a)?!1:n.includes(`weekends`)&&(e.isoWeekday()===fe[K]||e.isoWeekday()===fe[K]+1)||n.includes(e.format(`dddd`).toLowerCase())?!0:n.includes(i)||n.includes(a)},`isInvalidDate`),Je=a(function(e){xe=e},`setWeekday`),Ye=a(function(){return xe},`getWeekday`),Xe=a(function(e){K=e},`setWeekend`),Ze=a(function(e,t,n,r){if(!n.length||e.manualEndTime)return;let i;i=e.startTime instanceof Date?(0,L.default)(e.startTime):(0,L.default)(e.startTime,t,!0),i=i.add(1,`d`);let a;a=e.endTime instanceof Date?(0,L.default)(e.endTime):(0,L.default)(e.endTime,t,!0);let[o,s]=Qe(i,a,t,n,r);e.endTime=o.toDate(),e.renderEndTime=s},`checkTaskDates`),Qe=a(function(e,t,n,r,i){let a=!1,o=null,s=t.add(1e4,`d`);for(;e<=t;){if(a||(o=t.toDate()),a=qe(e,n,r,i),a&&(t=t.add(1,`d`),t>s))throw Error("Failed to find a valid date that was not excluded by `excludes` after 10,000 iterations.");e=e.add(1,`d`)}return[t,o]},`fixTaskDates`),$e=a(function(e,t,n){if(n=n.trim(),a(e=>{let t=e.trim();return t===`x`||t===`X`},`isTimestampFormat`)(t)&&/^\d+$/.test(n))return new Date(Number(n));let r=/^after\s+(?<ids>[\d\w- ]+)/.exec(n);if(r!==null){let e=null;for(let t of r.groups.ids.split(` `)){let n=Z(t);n!==void 0&&(!e||n.endTime>e.endTime)&&(e=n)}if(e)return e.endTime;let t=new Date;return t.setHours(0,0,0,0),t}let i=(0,L.default)(n,t.trim(),!0);if(i.isValid())return i.toDate();{N.debug(`Invalid date:`+n),N.debug(`With date format:`+t.trim());let e=new Date(n);if(e===void 0||isNaN(e.getTime())||e.getFullYear()<-1e4||e.getFullYear()>1e4)throw Error(`Invalid date:`+n);return e}},`getStartDate`),et=a(function(e){let t=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(e.trim());return t===null?[NaN,`ms`]:[Number.parseFloat(t[1]),t[2]]},`parseDuration`),tt=a(function(e,t,n,r=!1){n=n.trim();let i=/^until\s+(?<ids>[\d\w- ]+)/.exec(n);if(i!==null){let e=null;for(let t of i.groups.ids.split(` `)){let n=Z(t);n!==void 0&&(!e||n.startTime<e.startTime)&&(e=n)}if(e)return e.startTime;let t=new Date;return t.setHours(0,0,0,0),t}let a=(0,L.default)(n,t.trim(),!0);if(a.isValid())return r&&(a=a.add(1,`d`)),a.toDate();let o=(0,L.default)(e),[s,c]=et(n);if(!Number.isNaN(s)){let e=o.add(s,c);e.isValid()&&(o=e)}return o.toDate()},`getEndDate`),q=0,J=a(function(e){return e===void 0?(q+=1,`task`+q):e},`parseId`),nt=a(function(e,t){let n;n=t.substr(0,1)===`:`?t.substr(1,t.length):t;let r=n.split(`,`),i={};gt(r,i,ye);for(let e=0;e<r.length;e++)r[e]=r[e].trim();let a=``;switch(r.length){case 1:i.id=J(),i.startTime=e.endTime,a=r[0];break;case 2:i.id=J(),i.startTime=$e(void 0,R,r[0]),a=r[1];break;case 3:i.id=J(r[0]),i.startTime=$e(void 0,R,r[1]),a=r[2];break;default:}return a&&(i.endTime=tt(i.startTime,R,a,G),i.manualEndTime=(0,L.default)(a,`YYYY-MM-DD`,!0).isValid(),Ze(i,R,B,z)),i},`compileData`),rt=a(function(e,t){let n;n=t.substr(0,1)===`:`?t.substr(1,t.length):t;let r=n.split(`,`),i={};gt(r,i,ye);for(let e=0;e<r.length;e++)r[e]=r[e].trim();switch(r.length){case 1:i.id=J(),i.startTime={type:`prevTaskEnd`,id:e},i.endTime={data:r[0]};break;case 2:i.id=J(),i.startTime={type:`getStartDate`,startData:r[0]},i.endTime={data:r[1]};break;case 3:i.id=J(r[0]),i.startTime={type:`getStartDate`,startData:r[1]},i.endTime={data:r[2]};break;default:}return i},`parseData`),it,Y,X=[],at={},ot=a(function(e,t){let n={section:H,type:H,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:t},task:e,classes:[]},r=rt(Y,t);n.raw.startTime=r.startTime,n.raw.endTime=r.endTime,n.id=r.id,n.prevTaskId=Y,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.vert=r.vert,n.order=Se,Se++;let i=X.push(n);Y=n.id,at[n.id]=i-1},`addTask`),Z=a(function(e){let t=at[e];return X[t]},`findTaskById`),st=a(function(e,t){let n={section:H,type:H,description:e,task:e,classes:[]},r=nt(it,t);n.startTime=r.startTime,n.endTime=r.endTime,n.id=r.id,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.vert=r.vert,it=n,V.push(n)},`addTaskOrg`),ct=a(function(){let e=a(function(e){let t=X[e],n=``;switch(X[e].raw.startTime.type){case`prevTaskEnd`:t.startTime=Z(t.prevTaskId).endTime;break;case`getStartDate`:n=$e(void 0,R,X[e].raw.startTime.startData),n&&(X[e].startTime=n);break}return X[e].startTime&&(X[e].endTime=tt(X[e].startTime,R,X[e].raw.endTime.data,G),X[e].endTime&&(X[e].processed=!0,X[e].manualEndTime=(0,L.default)(X[e].raw.endTime.data,`YYYY-MM-DD`,!0).isValid(),Ze(X[e],R,B,z))),X[e].processed},`compileTask`),t=!0;for(let[n,r]of X.entries())e(n),t&&=r.processed;return t},`compileTasks`),lt=a(function(e,t){let n=t;o().securityLevel!==`loose`&&(n=(0,ce.sanitizeUrl)(t)),e.split(`,`).forEach(function(e){Z(e)!==void 0&&(ft(e,()=>{window.open(n,`_self`)}),ge.set(e,n))}),ut(e,`clickable`)},`setLink`),ut=a(function(e,t){e.split(`,`).forEach(function(e){let n=Z(e);n!==void 0&&n.classes.push(t)})},`setClass`),dt=a(function(e,t,n){if(o().securityLevel!==`loose`||t===void 0)return;let r=[];if(typeof n==`string`){r=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let e=0;e<r.length;e++){let t=r[e].trim();t.startsWith(`"`)&&t.endsWith(`"`)&&(t=t.substr(1,t.length-2)),r[e]=t}}r.length===0&&r.push(e),Z(e)!==void 0&&ft(e,()=>{i.runFunc(t,...r)})},`setClickFun`),ft=a(function(e,t){U.push(function(){let n=W?`${W}-${e}`:e,r=document.querySelector(`[id="${n}"]`);r!==null&&r.addEventListener(`click`,function(){t()})},function(){let n=W?`${W}-${e}`:e,r=document.querySelector(`[id="${n}-text"]`);r!==null&&r.addEventListener(`click`,function(){t()})})},`pushFun`),pt=a(function(e,t,n){e.split(`,`).forEach(function(e){dt(e,t,n)}),ut(e,`clickable`)},`setClickEvent`),mt=a(function(e){U.forEach(function(t){t(e)})},`bindFunctions`),ht={getConfig:a(()=>o().gantt,`getConfig`),clear:Ce,setDateFormat:je,getDateFormat:Re,enableInclusiveEndDates:Me,endDatesAreInclusive:Ne,enableTopAxis:Pe,topAxisEnabled:Fe,setAxisFormat:Te,getAxisFormat:Ee,setTickInterval:De,getTickInterval:Oe,setTodayMarker:ke,getTodayMarker:Ae,setAccTitle:ne,getAccTitle:p,setDiagramTitle:y,getDiagramTitle:D,setDiagramId:we,setDisplayMode:Ie,getDisplayMode:Le,setAccDescription:r,getAccDescription:x,addSection:We,getSections:Ge,getTasks:Ke,addTask:ot,findTaskById:Z,addTaskOrg:st,setIncludes:ze,getIncludes:Be,setExcludes:Ve,getExcludes:He,setClickEvent:pt,setLink:lt,getLinks:Ue,bindFunctions:mt,parseDuration:et,isInvalidDate:qe,setWeekday:Je,getWeekday:Ye,setWeekend:Xe};function gt(e,t,n){let r=!0;for(;r;)r=!1,n.forEach(function(n){let i=`^\\s*`+n+`\\s*$`,a=new RegExp(i);e[0].match(a)&&(t[n]=!0,e.shift(1),r=!0)})}a(gt,`getTaskTags`);var Q=c(s(),1),_t=c(oe(),1);Q.default.extend(_t.default);var vt=a(function(){N.debug(`Something is calling, setConf, remove the call`)},`setConf`),yt={monday:e,tuesday:b,wednesday:j,thursday:n,friday:E,saturday:O,sunday:l},bt=a((e,t)=>{let n=[...e].map(()=>-1/0),r=[...e].sort((e,t)=>e.startTime-t.startTime||e.order-t.order),i=0;for(let e of r)for(let r=0;r<n.length;r++)if(e.startTime>=n[r]){n[r]=e.endTime,e.order=r+t,r>i&&(i=r);break}return i},`getMaxIntersections`),$,xt=1e4,St={parser:se,db:ht,renderer:{setConf:vt,draw:a(function(e,t,n,r){let i=o().gantt;r.db.setDiagramId(t);let s=o().securityLevel,c;s===`sandbox`&&(c=M(`#i`+t));let l=M(s===`sandbox`?c.nodes()[0].contentDocument.body:`body`),u=s===`sandbox`?c.nodes()[0].contentDocument:document,d=u.getElementById(t);$=d.parentElement.offsetWidth,$===void 0&&($=1200),i.useWidth!==void 0&&($=i.useWidth);let p=r.db.getTasks(),y=[];for(let e of p)y.push(e.type);y=se(y);let b={},x=2*i.topPadding;if(r.db.getDisplayMode()===`compact`||i.displayMode===`compact`){let e={};for(let t of p)e[t.section]===void 0?e[t.section]=[t]:e[t.section].push(t);let t=0;for(let n of Object.keys(e)){let r=bt(e[n],t)+1;t+=r,x+=r*(i.barHeight+i.barGap),b[n]=r}}else{x+=p.length*(i.barHeight+i.barGap);for(let e of y)b[e]=p.filter(t=>t.type===e).length}d.setAttribute(`viewBox`,`0 0 `+$+` `+x);let E=l.select(`[id="${t}"]`),D=ie().domain([v(p,function(e){return e.startTime}),S(p,function(e){return e.endTime})]).rangeRound([0,$-i.leftPadding-i.rightPadding]);function O(e,t){let n=e.startTime,r=t.startTime,i=0;return n>r?i=1:n<r&&(i=-1),i}a(O,`taskCompare`),p.sort(O),j(p,$,x),re(E,x,$,i.useMaxWidth),E.append(`text`).text(r.db.getDiagramTitle()).attr(`x`,$/2).attr(`y`,i.titleTopMargin).attr(`class`,`titleText`);function j(e,t,n){let a=i.barHeight,o=a+i.barGap,s=i.topPadding,c=i.leftPadding,l=C().domain([0,y.length]).range([`#00B9FA`,`#F95002`]).interpolate(te);ae(o,s,c,t,n,e,r.db.getExcludes(),r.db.getIncludes()),F(c,s,t,n),ne(e,o,s,c,a,l,t,n),oe(o,s,c,a,l),I(c,s,t,n)}a(j,`makeGantt`);function ne(e,n,a,s,c,l,u){e.sort((e,t)=>e.vert===t.vert?0:e.vert?1:-1);let d=[...new Set(e.map(e=>e.order))].map(t=>e.find(e=>e.order===t));E.append(`g`).selectAll(`rect`).data(d).enter().append(`rect`).attr(`x`,0).attr(`y`,function(e,t){return t=e.order,t*n+a-2}).attr(`width`,function(){return u-i.rightPadding/2}).attr(`height`,n).attr(`class`,function(e){for(let[t,n]of y.entries())if(e.type===n)return`section section`+t%i.numberSectionStyles;return`section section0`}).enter();let f=E.append(`g`).selectAll(`rect`).data(e).enter(),m=r.db.getLinks();if(f.append(`rect`).attr(`id`,function(e){return t+`-`+e.id}).attr(`rx`,3).attr(`ry`,3).attr(`x`,function(e){return e.milestone?D(e.startTime)+s+.5*(D(e.endTime)-D(e.startTime))-.5*c:D(e.startTime)+s}).attr(`y`,function(e,t){return t=e.order,e.vert?i.gridLineStartPadding:t*n+a}).attr(`width`,function(e){return e.milestone?c:e.vert?.08*c:D(e.renderEndTime||e.endTime)-D(e.startTime)}).attr(`height`,function(e){return e.vert?p.length*(i.barHeight+i.barGap)+i.barHeight*2:c}).attr(`transform-origin`,function(e,t){return t=e.order,(D(e.startTime)+s+.5*(D(e.endTime)-D(e.startTime))).toString()+`px `+(t*n+a+.5*c).toString()+`px`}).attr(`class`,function(e){let t=``;e.classes.length>0&&(t=e.classes.join(` `));let n=0;for(let[t,r]of y.entries())e.type===r&&(n=t%i.numberSectionStyles);let r=``;return e.active?e.crit?r+=` activeCrit`:r=` active`:e.done?r=e.crit?` doneCrit`:` done`:e.crit&&(r+=` crit`),r.length===0&&(r=` task`),e.milestone&&(r=` milestone `+r),e.vert&&(r=` vert `+r),r+=n,r+=` `+t,`task`+r}),f.append(`text`).attr(`id`,function(e){return t+`-`+e.id+`-text`}).text(function(e){return e.task}).attr(`font-size`,i.fontSize).attr(`x`,function(e){let t=D(e.startTime),n=D(e.renderEndTime||e.endTime);if(e.milestone&&(t+=.5*(D(e.endTime)-D(e.startTime))-.5*c,n=t+c),e.vert)return D(e.startTime)+s;let r=this.getBBox().width;return r>n-t?n+r+1.5*i.leftPadding>u?t+s-5:n+s+5:(n-t)/2+t+s}).attr(`y`,function(e,t){return e.vert?i.gridLineStartPadding+p.length*(i.barHeight+i.barGap)+60:(t=e.order,t*n+i.barHeight/2+(i.fontSize/2-2)+a)}).attr(`text-height`,c).attr(`class`,function(e){let t=D(e.startTime),n=D(e.endTime);e.milestone&&(n=t+c);let r=this.getBBox().width,a=``;e.classes.length>0&&(a=e.classes.join(` `));let o=0;for(let[t,n]of y.entries())e.type===n&&(o=t%i.numberSectionStyles);let s=``;return e.active&&(s=e.crit?`activeCritText`+o:`activeText`+o),e.done?s=e.crit?s+` doneCritText`+o:s+` doneText`+o:e.crit&&(s=s+` critText`+o),e.milestone&&(s+=` milestoneText`),e.vert&&(s+=` vertText`),r>n-t?n+r+1.5*i.leftPadding>u?a+` taskTextOutsideLeft taskTextOutside`+o+` `+s:a+` taskTextOutsideRight taskTextOutside`+o+` `+s+` width-`+r:a+` taskText taskText`+o+` `+s+` width-`+r}),o().securityLevel===`sandbox`){let e;e=M(`#i`+t);let n=e.nodes()[0].contentDocument;f.filter(function(e){return m.has(e.id)}).each(function(e){var r=n.querySelector(`#`+CSS.escape(t+`-`+e.id)),i=n.querySelector(`#`+CSS.escape(t+`-`+e.id+`-text`));let a=r.parentNode;var o=n.createElement(`a`);o.setAttribute(`xlink:href`,m.get(e.id)),o.setAttribute(`target`,`_top`),a.appendChild(o),o.appendChild(r),o.appendChild(i)})}}a(ne,`drawRects`);function ae(e,n,a,o,s,c,l,u){if(l.length===0&&u.length===0)return;let d,f;for(let{startTime:e,endTime:t}of c)(d===void 0||e<d)&&(d=e),(f===void 0||t>f)&&(f=t);if(!d||!f)return;if((0,Q.default)(f).diff((0,Q.default)(d),`year`)>5){N.warn(`The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.`);return}let p=r.db.getDateFormat(),m=[],h=null,g=(0,Q.default)(d);for(;g.valueOf()<=f;)r.db.isInvalidDate(g,p,l,u)?h?h.end=g:h={start:g,end:g}:h&&=(m.push(h),null),g=g.add(1,`d`);E.append(`g`).selectAll(`rect`).data(m).enter().append(`rect`).attr(`id`,e=>t+`-exclude-`+e.start.format(`YYYY-MM-DD`)).attr(`x`,e=>D(e.start.startOf(`day`))+a).attr(`y`,i.gridLineStartPadding).attr(`width`,e=>D(e.end.endOf(`day`))-D(e.start.startOf(`day`))).attr(`height`,s-n-i.gridLineStartPadding).attr(`transform-origin`,function(t,n){return(D(t.start)+a+.5*(D(t.end)-D(t.start))).toString()+`px `+(n*e+.5*s).toString()+`px`}).attr(`class`,`exclude-range`)}a(ae,`drawExcludeDays`);function P(e,t,n,r){if(n<=0||e>t)return 1/0;let i=t-e,a=Q.default.duration({[r??`day`]:n}).asMilliseconds();return a<=0?1/0:Math.ceil(i/a)}a(P,`getEstimatedTickCount`);function F(e,t,n,a){let o=r.db.getDateFormat(),s=r.db.getAxisFormat(),c;c=s||(o===`D`?`%d`:i.axisFormat??`%Y-%m-%d`);let l=ee(D).tickSize(-a+t+i.gridLineStartPadding).tickFormat(f(c)),u=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||i.tickInterval);if(u!==null){let e=parseInt(u[1],10);if(isNaN(e)||e<=0)N.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let t=u[2],n=r.db.getWeekday()||i.weekday,a=D.domain(),o=a[0],s=a[1],c=P(o,s,e,t);if(c>xt)N.warn(`The tick interval "${e}${t}" would generate ${c} ticks, which exceeds the maximum allowed (${xt}). This may indicate an invalid date or time range. Skipping custom tick interval.`);else switch(t){case`millisecond`:l.ticks(k.every(e));break;case`second`:l.ticks(A.every(e));break;case`minute`:l.ticks(m.every(e));break;case`hour`:l.ticks(w.every(e));break;case`day`:l.ticks(g.every(e));break;case`week`:l.ticks(yt[n].every(e));break;case`month`:l.ticks(T.every(e));break}}}if(E.append(`g`).attr(`class`,`grid`).attr(`transform`,`translate(`+e+`, `+(a-50)+`)`).call(l).selectAll(`text`).style(`text-anchor`,`middle`).attr(`fill`,`#000`).attr(`stroke`,`none`).attr(`font-size`,10).attr(`dy`,`1em`),r.db.topAxisEnabled()||i.topAxis){let n=_(D).tickSize(-a+t+i.gridLineStartPadding).tickFormat(f(c));if(u!==null){let e=parseInt(u[1],10);if(isNaN(e)||e<=0)N.warn(`Invalid tick interval value: "${u[1]}". Skipping custom tick interval.`);else{let t=u[2],a=r.db.getWeekday()||i.weekday,o=D.domain(),s=o[0],c=o[1];if(P(s,c,e,t)<=xt)switch(t){case`millisecond`:n.ticks(k.every(e));break;case`second`:n.ticks(A.every(e));break;case`minute`:n.ticks(m.every(e));break;case`hour`:n.ticks(w.every(e));break;case`day`:n.ticks(g.every(e));break;case`week`:n.ticks(yt[a].every(e));break;case`month`:n.ticks(T.every(e));break}}}E.append(`g`).attr(`class`,`grid`).attr(`transform`,`translate(`+e+`, `+t+`)`).call(n).selectAll(`text`).style(`text-anchor`,`middle`).attr(`fill`,`#000`).attr(`stroke`,`none`).attr(`font-size`,10)}}a(F,`makeGrid`);function oe(e,t){let n=0,r=Object.keys(b).map(e=>[e,b[e]]);E.append(`g`).selectAll(`text`).data(r).enter().append(function(e){let t=e[0].split(h.lineBreakRegex),n=-(t.length-1)/2,r=u.createElementNS(`http://www.w3.org/2000/svg`,`text`);r.setAttribute(`dy`,n+`em`);for(let[e,n]of t.entries()){let t=u.createElementNS(`http://www.w3.org/2000/svg`,`tspan`);t.setAttribute(`alignment-baseline`,`central`),t.setAttribute(`x`,`10`),e>0&&t.setAttribute(`dy`,`1em`),t.textContent=n,r.appendChild(t)}return r}).attr(`x`,10).attr(`y`,function(i,a){if(a>0)for(let o=0;o<a;o++)return n+=r[a-1][1],i[1]*e/2+n*e+t;else return i[1]*e/2+t}).attr(`font-size`,i.sectionFontSize).attr(`class`,function(e){for(let[t,n]of y.entries())if(e[0]===n)return`sectionTitle sectionTitle`+t%i.numberSectionStyles;return`sectionTitle`})}a(oe,`vertLabels`);function I(e,t,n,a){let o=r.db.getTodayMarker();if(o===`off`)return;let s=E.append(`g`).attr(`class`,`today`),c=new Date,l=s.append(`line`);l.attr(`x1`,D(c)+e).attr(`x2`,D(c)+e).attr(`y1`,i.titleTopMargin).attr(`y2`,a-i.titleTopMargin).attr(`class`,`today`),o!==``&&l.attr(`style`,o.replace(/,/g,`;`))}a(I,`drawToday`);function se(e){let t={},n=[];for(let r=0,i=e.length;r<i;++r)Object.prototype.hasOwnProperty.call(t,e[r])||(t[e[r]]=!0,n.push(e[r]));return n}a(se,`checkUnique`)},`draw`)},styles:a(e=>`
  .mermaid-main-font {
        font-family: ${e.fontFamily};
  }

  .exclude-range {
    fill: ${e.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${e.sectionBkgColor};
  }

  .section2 {
    fill: ${e.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${e.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${e.titleColor};
  }

  .sectionTitle1 {
    fill: ${e.titleColor};
  }

  .sectionTitle2 {
    fill: ${e.titleColor};
  }

  .sectionTitle3 {
    fill: ${e.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${e.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${e.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${e.fontFamily};
    fill: ${e.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${e.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${e.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${e.taskTextDarkColor};
    text-anchor: start;
    font-family: ${e.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${e.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${e.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${e.taskBkgColor};
    stroke: ${e.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${e.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${e.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${e.activeTaskBkgColor};
    stroke: ${e.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${e.doneTaskBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  /* Done task text displayed outside the bar sits against the diagram background,
     not against the done-task bar, so it must use the outside/contrast color. */
  .doneText0.taskTextOutsideLeft,
  .doneText0.taskTextOutsideRight,
  .doneText1.taskTextOutsideLeft,
  .doneText1.taskTextOutsideRight,
  .doneText2.taskTextOutsideLeft,
  .doneText2.taskTextOutsideRight,
  .doneText3.taskTextOutsideLeft,
  .doneText3.taskTextOutsideRight {
    fill: ${e.taskTextOutsideColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  /* Done-crit task text outside the bar \u2014 same reasoning as doneText above. */
  .doneCritText0.taskTextOutsideLeft,
  .doneCritText0.taskTextOutsideRight,
  .doneCritText1.taskTextOutsideLeft,
  .doneCritText1.taskTextOutsideRight,
  .doneCritText2.taskTextOutsideLeft,
  .doneCritText2.taskTextOutsideRight,
  .doneCritText3.taskTextOutsideLeft,
  .doneCritText3.taskTextOutsideRight {
    fill: ${e.taskTextOutsideColor} !important;
  }

  .vert {
    stroke: ${e.vertLineColor};
  }

  .vertText {
    font-size: 15px;
    text-anchor: middle;
    fill: ${e.vertLineColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.titleColor||e.textColor};
    font-family: ${e.fontFamily};
  }
`,`getStyles`)};export{St as diagram};