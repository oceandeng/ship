!function(a,b){function c(a){var c;for(c in a)if(k[a[c]]!==b)return!0;return!1}function d(){var a,b=["Webkit","Moz","O","ms"];for(a in b)if(c([b[a]+"Transform"]))return"-"+b[a].toLowerCase()+"-";return""}function e(c,d,e){var f=c;return"object"==typeof d?c.each(function(){i[this.id]&&i[this.id].destroy(),new a.mobiscroll.classes[d.component||"Scroller"](this,d)}):("string"==typeof d&&c.each(function(){var a,c=i[this.id];return c&&c[d]&&(a=c[d].apply(this,Array.prototype.slice.call(e,1)),a!==b)?(f=a,!1):void 0}),f)}function f(a){return g.tapped&&!a.tap?(a.stopPropagation(),a.preventDefault(),!1):void 0}var g,h=+new Date,i={},j=a.extend,k=document.createElement("modernizr").style,l=c(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),m=c(["flex","msFlex","WebkitBoxDirection"]),n=d(),o=n.replace(/^\-/,"").replace(/\-$/,"").replace("moz","Moz");a.fn.mobiscroll=function(b){return j(this,a.mobiscroll.components),e(this,b,arguments)},g=a.mobiscroll=a.mobiscroll||{version:"2.16.1",util:{prefix:n,jsPrefix:o,has3d:l,hasFlex:m,testTouch:function(b,c){if("touchstart"==b.type)a(c).attr("data-touch","1");else if(a(c).attr("data-touch"))return a(c).removeAttr("data-touch"),!1;return!0},objectToArray:function(a){var b,c=[];for(b in a)c.push(a[b]);return c},arrayToObject:function(a){var b,c={};if(a)for(b=0;b<a.length;b++)c[a[b]]=a[b];return c},isNumeric:function(a){return a-parseFloat(a)>=0},isString:function(a){return"string"==typeof a},getCoord:function(a,b,c){var d=a.originalEvent||a,e=(c?"client":"page")+b;return d.changedTouches?d.changedTouches[0][e]:a[e]},getPosition:function(c,d){var e,f,g=window.getComputedStyle?getComputedStyle(c[0]):c[0].style;return l?(a.each(["t","webkitT","MozT","OT","msT"],function(a,c){return g[c+"ransform"]!==b?(e=g[c+"ransform"],!1):void 0}),e=e.split(")")[0].split(", "),f=d?e[13]||e[5]:e[12]||e[4]):f=d?g.top.replace("px",""):g.left.replace("px",""),f},constrain:function(a,b,c){return Math.max(b,Math.min(a,c))},vibrate:function(a){"vibrate"in navigator&&navigator.vibrate(a||50)}},tapped:0,autoTheme:"mobiscroll",presets:{scroller:{},numpad:{},listview:{},menustrip:{}},themes:{form:{},frame:{},listview:{},menustrip:{}},i18n:{},instances:i,classes:{},components:{},defaults:{context:"body",mousewheel:!0,vibrate:!0},setDefaults:function(a){j(this.defaults,a)},presetShort:function(a,c,d){this.components[a]=function(f){return e(this,j(f,{component:c,preset:d===!1?b:a}),arguments)}}},a.mobiscroll.classes.Base=function(b,c){var d,e,f,g,k,l,m=a.mobiscroll,n=this;n.settings={},n._presetLoad=function(){},n._init=function(a){f=n.settings,j(c,a),n._hasDef&&(l=m.defaults),j(f,n._defaults,l,c),n._hasTheme&&(k=f.theme,"auto"!=k&&k||(k=m.autoTheme),"default"==k&&(k="mobiscroll"),c.theme=k,g=m.themes[n._class][k]),n._hasLang&&(d=m.i18n[f.lang]),n._hasTheme&&n.trigger("onThemeLoad",[d,c]),j(f,g,d,l,c),n._hasPreset&&(n._presetLoad(f),e=m.presets[n._class][f.preset],e&&(e=e.call(b,n),j(f,e,c)))},n._destroy=function(){n.trigger("onDestroy",[]),delete i[b.id],n=null},n.trigger=function(d,f){var h;return f.push(n),a.each([l,g,e,c],function(a,c){c&&c[d]&&(h=c[d].apply(b,f))}),h},n.option=function(a,b){var c={};"object"==typeof a?c=a:c[a]=b,n.init(c)},n.getInst=function(){return n},c=c||{},b.id||(b.id="mobiscroll"+ ++h),i[b.id]=n},document.addEventListener&&a.each(["mouseover","mousedown","mouseup","click"],function(a,b){document.addEventListener(b,f,!0)})}(jQuery);