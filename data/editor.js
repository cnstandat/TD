!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.CodeMirror=t()}(this,function(){"use strict";function e(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function t(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild);return e}function r(e,r){return t(e).appendChild(r)}function n(e,t,r,n){var i=document.createElement(e);if(r&&(i.className=r),n&&(i.style.cssText=n),"string"==typeof t)i.appendChild(document.createTextNode(t));else if(t)for(var o=0;o<t.length;++o)i.appendChild(t[o]);return i}function i(e,t,r,i){var o=n(e,t,r,i);return o.setAttribute("role","presentation"),o}function o(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t);do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function l(){var e;try{e=document.activeElement}catch(t){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function s(t,r){var n=t.className;e(r).test(n)||(t.className+=(n?" ":"")+r)}function a(t,r){for(var n=t.split(" "),i=0;i<n.length;i++)n[i]&&!e(n[i]).test(r)&&(r+=" "+n[i]);return r}function u(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t)}}function c(e,t,r){t||(t={});for(var n in e)!e.hasOwnProperty(n)||!1===r&&t.hasOwnProperty(n)||(t[n]=e[n]);return t}function f(e,t,r,n,i){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length);for(var o=n||0,l=i||0;;){var s=e.indexOf("\t",o);if(s<0||s>=t)return l+(t-o);l+=s-o,l+=r-l%r,o=s+1}}function h(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r;return-1}function d(e,t,r){for(var n=0,i=0;;){var o=e.indexOf("\t",n);-1==o&&(o=e.length);var l=o-n;if(o==e.length||i+l>=t)return n+Math.min(l,t-i);if(i+=o-n,i+=r-i%r,n=o+1,i>=t)return n}}function p(e){for(;Kl.length<=e;)Kl.push(g(Kl)+" ");return Kl[e]}function g(e){return e[e.length-1]}function v(e,t){for(var r=[],n=0;n<e.length;n++)r[n]=t(e[n],n);return r}function m(e,t,r){for(var n=0,i=r(t);n<e.length&&r(e[n])<=i;)n++;e.splice(n,0,t)}function y(){}function b(e,t){var r;return Object.create?r=Object.create(e):(y.prototype=e,r=new y),t&&c(t,r),r}function w(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||jl.test(e))}function x(e,t){return t?!!(t.source.indexOf("\\w")>-1&&w(e))||t.test(e):w(e)}function C(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;return!0}function S(e){return e.charCodeAt(0)>=768&&Xl.test(e)}function L(e,t,r){for(;(r<0?t>0:t<e.length)&&S(e.charAt(t));)t+=r;return t}function k(e,t,r){for(var n=t>r?-1:1;;){if(t==r)return t;var i=(t+r)/2,o=n<0?Math.ceil(i):Math.floor(i);if(o==t)return e(o)?t:r;e(o)?r=o:t=o+n}}function T(e,t,r){var o=this;this.input=r,o.scrollbarFiller=n("div",null,"CodeMirror-scrollbar-filler"),o.scrollbarFiller.setAttribute("cm-not-content","true"),o.gutterFiller=n("div",null,"CodeMirror-gutter-filler"),o.gutterFiller.setAttribute("cm-not-content","true"),o.lineDiv=i("div",null,"CodeMirror-code"),o.selectionDiv=n("div",null,null,"position: relative; z-index: 1"),o.cursorDiv=n("div",null,"CodeMirror-cursors"),o.measure=n("div",null,"CodeMirror-measure"),o.lineMeasure=n("div",null,"CodeMirror-measure"),o.lineSpace=i("div",[o.measure,o.lineMeasure,o.selectionDiv,o.cursorDiv,o.lineDiv],null,"position: relative; outline: none");var l=i("div",[o.lineSpace],"CodeMirror-lines");o.mover=n("div",[l],null,"position: relative"),o.sizer=n("div",[o.mover],"CodeMirror-sizer"),o.sizerWidth=null,o.heightForcer=n("div",null,null,"position: absolute; height: "+Rl+"px; width: 1px;"),o.gutters=n("div",null,"CodeMirror-gutters"),o.lineGutter=null,o.scroller=n("div",[o.sizer,o.heightForcer,o.gutters],"CodeMirror-scroll"),o.scroller.setAttribute("tabIndex","-1"),o.wrapper=n("div",[o.scrollbarFiller,o.gutterFiller,o.scroller],"CodeMirror"),gl&&vl<8&&(o.gutters.style.zIndex=-1,o.scroller.style.paddingRight=0),ml||fl&&Tl||(o.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(o.wrapper):e(o.wrapper)),o.viewFrom=o.viewTo=t.first,o.reportedViewFrom=o.reportedViewTo=t.first,o.view=[],o.renderedView=null,o.externalMeasured=null,o.viewOffset=0,o.lastWrapHeight=o.lastWrapWidth=0,o.updateLineNumbers=null,o.nativeBarWidth=o.barHeight=o.barWidth=0,o.scrollbarsClipped=!1,o.lineNumWidth=o.lineNumInnerWidth=o.lineNumChars=null,o.alignWidgets=!1,o.cachedCharWidth=o.cachedTextHeight=o.cachedPaddingH=null,o.maxLine=null,o.maxLineLength=0,o.maxLineChanged=!1,o.wheelDX=o.wheelDY=o.wheelStartX=o.wheelStartY=null,o.shift=!1,o.selForContextMenu=null,o.activeTouch=null,r.init(o)}function M(e,t){if((t-=e.first)<0||t>=e.size)throw new Error("There is no line "+(t+e.first)+" in the document.");for(var r=e;!r.lines;)for(var n=0;;++n){var i=r.children[n],o=i.chunkSize();if(t<o){r=i;break}t-=o}return r.lines[t]}function N(e,t,r){var n=[],i=t.line;return e.iter(t.line,r.line+1,function(e){var o=e.text;i==r.line&&(o=o.slice(0,r.ch)),i==t.line&&(o=o.slice(t.ch)),n.push(o),++i}),n}function O(e,t,r){var n=[];return e.iter(t,r,function(e){n.push(e.text)}),n}function A(e,t){var r=t-e.height;if(r)for(var n=e;n;n=n.parent)n.height+=r}function W(e){if(null==e.parent)return null;for(var t=e.parent,r=h(t.lines,e),n=t.parent;n;t=n,n=n.parent)for(var i=0;n.children[i]!=t;++i)r+=n.children[i].chunkSize();return r+t.first}function D(e,t){var r=e.first;e:do{for(var n=0;n<e.children.length;++n){var i=e.children[n],o=i.height;if(t<o){e=i;continue e}t-=o,r+=i.chunkSize()}return r}while(!e.lines);for(var l=0;l<e.lines.length;++l){var s=e.lines[l].height;if(t<s)break;t-=s}return r+l}function H(e,t){return t>=e.first&&t<e.first+e.size}function F(e,t){return String(e.lineNumberFormatter(t+e.firstLineNumber))}function E(e,t,r){if(void 0===r&&(r=null),!(this instanceof E))return new E(e,t,r);this.line=e,this.ch=t,this.sticky=r}function P(e,t){return e.line-t.line||e.ch-t.ch}function I(e,t){return e.sticky==t.sticky&&0==P(e,t)}function z(e){return E(e.line,e.ch)}function R(e,t){return P(e,t)<0?t:e}function B(e,t){return P(e,t)<0?e:t}function G(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function U(e,t){if(t.line<e.first)return E(e.first,0);var r=e.first+e.size-1;return t.line>r?E(r,M(e,r).text.length):V(t,M(e,t.line).text.length)}function V(e,t){var r=e.ch;return null==r||r>t?E(e.line,t):r<0?E(e.line,0):e}function K(e,t){for(var r=[],n=0;n<t.length;n++)r[n]=U(e,t[n]);return r}function j(){Yl=!0}function X(){_l=!0}function Y(e,t,r){this.marker=e,this.from=t,this.to=r}function _(e,t){if(e)for(var r=0;r<e.length;++r){var n=e[r];if(n.marker==t)return n}}function $(e,t){for(var r,n=0;n<e.length;++n)e[n]!=t&&(r||(r=[])).push(e[n]);return r}function q(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}function Z(e,t,r){var n;if(e)for(var i=0;i<e.length;++i){var o=e[i],l=o.marker;if(null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t)||o.from==t&&"bookmark"==l.type&&(!r||!o.marker.insertLeft)){var s=null==o.to||(l.inclusiveRight?o.to>=t:o.to>t);(n||(n=[])).push(new Y(l,o.from,s?null:o.to))}}return n}function Q(e,t,r){var n;if(e)for(var i=0;i<e.length;++i){var o=e[i],l=o.marker;if(null==o.to||(l.inclusiveRight?o.to>=t:o.to>t)||o.from==t&&"bookmark"==l.type&&(!r||o.marker.insertLeft)){var s=null==o.from||(l.inclusiveLeft?o.from<=t:o.from<t);(n||(n=[])).push(new Y(l,s?null:o.from-t,null==o.to?null:o.to-t))}}return n}function J(e,t){if(t.full)return null;var r=H(e,t.from.line)&&M(e,t.from.line).markedSpans,n=H(e,t.to.line)&&M(e,t.to.line).markedSpans;if(!r&&!n)return null;var i=t.from.ch,o=t.to.ch,l=0==P(t.from,t.to),s=Z(r,i,l),a=Q(n,o,l),u=1==t.text.length,c=g(t.text).length+(u?i:0);if(s)for(var f=0;f<s.length;++f){var h=s[f];if(null==h.to){var d=_(a,h.marker);d?u&&(h.to=null==d.to?null:d.to+c):h.to=i}}if(a)for(var p=0;p<a.length;++p){var v=a[p];null!=v.to&&(v.to+=c),null==v.from?_(s,v.marker)||(v.from=c,u&&(s||(s=[])).push(v)):(v.from+=c,u&&(s||(s=[])).push(v))}s&&(s=ee(s)),a&&a!=s&&(a=ee(a));var m=[s];if(!u){var y,b=t.text.length-2;if(b>0&&s)for(var w=0;w<s.length;++w)null==s[w].to&&(y||(y=[])).push(new Y(s[w].marker,null,null));for(var x=0;x<b;++x)m.push(y);m.push(a)}return m}function ee(e){for(var t=0;t<e.length;++t){var r=e[t];null!=r.from&&r.from==r.to&&!1!==r.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function te(e,t,r){var n=null;if(e.iter(t.line,r.line+1,function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker;!r.readOnly||n&&-1!=h(n,r)||(n||(n=[])).push(r)}}),!n)return null;for(var i=[{from:t,to:r}],o=0;o<n.length;++o)for(var l=n[o],s=l.find(0),a=0;a<i.length;++a){var u=i[a];if(!(P(u.to,s.from)<0||P(u.from,s.to)>0)){var c=[a,1],f=P(u.from,s.from),d=P(u.to,s.to);(f<0||!l.inclusiveLeft&&!f)&&c.push({from:u.from,to:s.from}),(d>0||!l.inclusiveRight&&!d)&&c.push({from:s.to,to:u.to}),i.splice.apply(i,c),a+=c.length-3}}return i}function re(e){var t=e.markedSpans;if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e);e.markedSpans=null}}function ne(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e);e.markedSpans=t}}function ie(e){return e.inclusiveLeft?-1:0}function oe(e){return e.inclusiveRight?1:0}function le(e,t){var r=e.lines.length-t.lines.length;if(0!=r)return r;var n=e.find(),i=t.find(),o=P(n.from,i.from)||ie(e)-ie(t);if(o)return-o;var l=P(n.to,i.to)||oe(e)-oe(t);return l||t.id-e.id}function se(e,t){var r,n=_l&&e.markedSpans;if(n)for(var i=void 0,o=0;o<n.length;++o)(i=n[o]).marker.collapsed&&null==(t?i.from:i.to)&&(!r||le(r,i.marker)<0)&&(r=i.marker);return r}function ae(e){return se(e,!0)}function ue(e){return se(e,!1)}function ce(e,t,r,n,i){var o=M(e,t),l=_l&&o.markedSpans;if(l)for(var s=0;s<l.length;++s){var a=l[s];if(a.marker.collapsed){var u=a.marker.find(0),c=P(u.from,r)||ie(a.marker)-ie(i),f=P(u.to,n)||oe(a.marker)-oe(i);if(!(c>=0&&f<=0||c<=0&&f>=0)&&(c<=0&&(a.marker.inclusiveRight&&i.inclusiveLeft?P(u.to,r)>=0:P(u.to,r)>0)||c>=0&&(a.marker.inclusiveRight&&i.inclusiveLeft?P(u.from,n)<=0:P(u.from,n)<0)))return!0}}}function fe(e){for(var t;t=ae(e);)e=t.find(-1,!0).line;return e}function he(e){for(var t;t=ue(e);)e=t.find(1,!0).line;return e}function de(e){for(var t,r;t=ue(e);)e=t.find(1,!0).line,(r||(r=[])).push(e);return r}function pe(e,t){var r=M(e,t),n=fe(r);return r==n?t:W(n)}function ge(e,t){if(t>e.lastLine())return t;var r,n=M(e,t);if(!ve(e,n))return t;for(;r=ue(n);)n=r.find(1,!0).line;return W(n)+1}function ve(e,t){var r=_l&&t.markedSpans;if(r)for(var n=void 0,i=0;i<r.length;++i)if((n=r[i]).marker.collapsed){if(null==n.from)return!0;if(!n.marker.widgetNode&&0==n.from&&n.marker.inclusiveLeft&&me(e,t,n))return!0}}function me(e,t,r){if(null==r.to){var n=r.marker.find(1,!0);return me(e,n.line,_(n.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0;for(var i=void 0,o=0;o<t.markedSpans.length;++o)if((i=t.markedSpans[o]).marker.collapsed&&!i.marker.widgetNode&&i.from==r.to&&(null==i.to||i.to!=r.from)&&(i.marker.inclusiveLeft||r.marker.inclusiveRight)&&me(e,t,i))return!0}function ye(e){for(var t=0,r=(e=fe(e)).parent,n=0;n<r.lines.length;++n){var i=r.lines[n];if(i==e)break;t+=i.height}for(var o=r.parent;o;r=o,o=r.parent)for(var l=0;l<o.children.length;++l){var s=o.children[l];if(s==r)break;t+=s.height}return t}function be(e){if(0==e.height)return 0;for(var t,r=e.text.length,n=e;t=ae(n);){var i=t.find(0,!0);n=i.from.line,r+=i.from.ch-i.to.ch}for(n=e;t=ue(n);){var o=t.find(0,!0);r-=n.text.length-o.from.ch,r+=(n=o.to.line).text.length-o.to.ch}return r}function we(e){var t=e.display,r=e.doc;t.maxLine=M(r,r.first),t.maxLineLength=be(t.maxLine),t.maxLineChanged=!0,r.iter(function(e){var r=be(e);r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)})}function xe(e,t,r,n){if(!e)return n(t,r,"ltr",0);for(var i=!1,o=0;o<e.length;++o){var l=e[o];(l.from<r&&l.to>t||t==r&&l.to==t)&&(n(Math.max(l.from,t),Math.min(l.to,r),1==l.level?"rtl":"ltr",o),i=!0)}i||n(t,r,"ltr")}function Ce(e,t,r){var n;$l=null;for(var i=0;i<e.length;++i){var o=e[i];if(o.from<t&&o.to>t)return i;o.to==t&&(o.from!=o.to&&"before"==r?n=i:$l=i),o.from==t&&(o.from!=o.to&&"before"!=r?n=i:$l=i)}return null!=n?n:$l}function Se(e,t){var r=e.order;return null==r&&(r=e.order=ql(e.text,t)),r}function Le(e,t){return e._handlers&&e._handlers[t]||Zl}function ke(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1);else if(e.detachEvent)e.detachEvent("on"+t,r);else{var n=e._handlers,i=n&&n[t];if(i){var o=h(i,r);o>-1&&(n[t]=i.slice(0,o).concat(i.slice(o+1)))}}}function Te(e,t){var r=Le(e,t);if(r.length)for(var n=Array.prototype.slice.call(arguments,2),i=0;i<r.length;++i)r[i].apply(null,n)}function Me(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),Te(e,r||t.type,e,t),He(t)||t.codemirrorIgnore}function Ne(e){var t=e._handlers&&e._handlers.cursorActivity;if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),n=0;n<t.length;++n)-1==h(r,t[n])&&r.push(t[n])}function Oe(e,t){return Le(e,t).length>0}function Ae(e){e.prototype.on=function(e,t){Ql(this,e,t)},e.prototype.off=function(e,t){ke(this,e,t)}}function We(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function De(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function He(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function Fe(e){We(e),De(e)}function Ee(e){return e.target||e.srcElement}function Pe(e){var t=e.which;return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),Ml&&e.ctrlKey&&1==t&&(t=3),t}function Ie(e){if(null==Il){var t=n("span","​");r(e,n("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Il=t.offsetWidth<=1&&t.offsetHeight>2&&!(gl&&vl<8))}var i=Il?n("span","​"):n("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return i.setAttribute("cm-text",""),i}function ze(e){if(null!=zl)return zl;var n=r(e,document.createTextNode("AخA")),i=Wl(n,0,1).getBoundingClientRect(),o=Wl(n,1,2).getBoundingClientRect();return t(e),!(!i||i.left==i.right)&&(zl=o.right-i.right<3)}function Re(e){if(null!=ns)return ns;var t=r(e,n("span","x")),i=t.getBoundingClientRect(),o=Wl(t,0,1).getBoundingClientRect();return ns=Math.abs(i.left-o.left)>1}function Be(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),is[e]=t}function Ge(e){if("string"==typeof e&&os.hasOwnProperty(e))e=os[e];else if(e&&"string"==typeof e.name&&os.hasOwnProperty(e.name)){var t=os[e.name];"string"==typeof t&&(t={name:t}),(e=b(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Ge("application/xml");if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Ge("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function Ue(e,t){t=Ge(t);var r=is[t.name];if(!r)return Ue(e,"text/plain");var n=r(e,t);if(ls.hasOwnProperty(t.name)){var i=ls[t.name];for(var o in i)i.hasOwnProperty(o)&&(n.hasOwnProperty(o)&&(n["_"+o]=n[o]),n[o]=i[o])}if(n.name=t.name,t.helperType&&(n.helperType=t.helperType),t.modeProps)for(var l in t.modeProps)n[l]=t.modeProps[l];return n}function Ve(e,t){c(t,ls.hasOwnProperty(e)?ls[e]:ls[e]={})}function Ke(e,t){if(!0===t)return t;if(e.copyState)return e.copyState(t);var r={};for(var n in t){var i=t[n];i instanceof Array&&(i=i.concat([])),r[n]=i}return r}function je(e,t){for(var r;e.innerMode&&(r=e.innerMode(t))&&r.mode!=e;)t=r.state,e=r.mode;return r||{mode:e,state:t}}function Xe(e,t,r){return!e.startState||e.startState(t,r)}function Ye(e,t,r,n){var i=[e.state.modeGen],o={};tt(e,t.text,e.doc.mode,r,function(e,t){return i.push(e,t)},o,n);for(var l=r.state,s=0;s<e.state.overlays.length;++s)!function(n){var l=e.state.overlays[n],s=1,a=0;r.state=!0,tt(e,t.text,l.mode,r,function(e,t){for(var r=s;a<e;){var n=i[s];n>e&&i.splice(s,1,e,i[s+1],n),s+=2,a=Math.min(e,n)}if(t)if(l.opaque)i.splice(r,s-r,e,"overlay "+t),s=r+2;else for(;r<s;r+=2){var o=i[r+1];i[r+1]=(o?o+" ":"")+"overlay "+t}},o)}(s);return r.state=l,{styles:i,classes:o.bgClass||o.textClass?o:null}}function _e(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var n=$e(e,W(t)),i=t.text.length>e.options.maxHighlightLength&&Ke(e.doc.mode,n.state),o=Ye(e,t,n);i&&(n.state=i),t.stateAfter=n.save(!i),t.styles=o.styles,o.classes?t.styleClasses=o.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function $e(e,t,r){var n=e.doc,i=e.display;if(!n.mode.startState)return new us(n,!0,t);var o=rt(e,t,r),l=o>n.first&&M(n,o-1).stateAfter,s=l?us.fromSaved(n,l,o):new us(n,Xe(n.mode),o);return n.iter(o,t,function(r){qe(e,r.text,s);var n=s.line;r.stateAfter=n==t-1||n%5==0||n>=i.viewFrom&&n<i.viewTo?s.save():null,s.nextLine()}),r&&(n.modeFrontier=s.line),s}function qe(e,t,r,n){var i=e.doc.mode,o=new ss(t,e.options.tabSize,r);for(o.start=o.pos=n||0,""==t&&Ze(i,r.state);!o.eol();)Qe(i,o,r.state),o.start=o.pos}function Ze(e,t){if(e.blankLine)return e.blankLine(t);if(e.innerMode){var r=je(e,t);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function Qe(e,t,r,n){for(var i=0;i<10;i++){n&&(n[0]=je(e,r).mode);var o=e.token(t,r);if(t.pos>t.start)return o}throw new Error("Mode "+e.name+" failed to advance stream.")}function Je(e,t,r,n){var i,o,l=e.doc,s=l.mode,a=M(l,(t=U(l,t)).line),u=$e(e,t.line,r),c=new ss(a.text,e.options.tabSize,u);for(n&&(o=[]);(n||c.pos<t.ch)&&!c.eol();)c.start=c.pos,i=Qe(s,c,u.state),n&&o.push(new cs(c,i,Ke(l.mode,u.state)));return n?o:new cs(c,i,u.state)}function et(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!r)break;e=e.slice(0,r.index)+e.slice(r.index+r[0].length);var n=r[1]?"bgClass":"textClass";null==t[n]?t[n]=r[2]:new RegExp("(?:^|s)"+r[2]+"(?:$|s)").test(t[n])||(t[n]+=" "+r[2])}return e}function tt(e,t,r,n,i,o,l){var s=r.flattenSpans;null==s&&(s=e.options.flattenSpans);var a,u=0,c=null,f=new ss(t,e.options.tabSize,n),h=e.options.addModeClass&&[null];for(""==t&&et(Ze(r,n.state),o);!f.eol();){if(f.pos>e.options.maxHighlightLength?(s=!1,l&&qe(e,t,n,f.pos),f.pos=t.length,a=null):a=et(Qe(r,f,n.state,h),o),h){var d=h[0].name;d&&(a="m-"+(a?d+" "+a:d))}if(!s||c!=a){for(;u<f.start;)i(u=Math.min(f.start,u+5e3),c);c=a}f.start=f.pos}for(;u<f.pos;){var p=Math.min(f.pos,u+5e3);i(p,c),u=p}}function rt(e,t,r){for(var n,i,o=e.doc,l=r?-1:t-(e.doc.mode.innerMode?1e3:100),s=t;s>l;--s){if(s<=o.first)return o.first;var a=M(o,s-1),u=a.stateAfter;if(u&&(!r||s+(u instanceof as?u.lookAhead:0)<=o.modeFrontier))return s;var c=f(a.text,null,e.options.tabSize);(null==i||n>c)&&(i=s-1,n=c)}return i}function nt(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var r=e.first,n=t-1;n>r;n--){var i=M(e,n).stateAfter;if(i&&(!(i instanceof as)||n+i.lookAhead<t)){r=n+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,r)}}function it(e,t,r,n){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),re(e),ne(e,r);var i=n?n(e):1;i!=e.height&&A(e,i)}function ot(e){e.parent=null,re(e)}function lt(e,t){if(!e||/^\s*$/.test(e))return null;var r=t.addModeClass?ps:ds;return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function st(e,t){var r=i("span",null,null,ml?"padding-right: .1px":null),n={pre:i("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:(gl||ml)&&e.getOption("lineWrapping")};t.measure={};for(var o=0;o<=(t.rest?t.rest.length:0);o++){var l=o?t.rest[o-1]:t.line,s=void 0;n.pos=0,n.addToken=ut,ze(e.display.measure)&&(s=Se(l,e.doc.direction))&&(n.addToken=ft(n.addToken,s)),n.map=[],dt(l,n,_e(e,l,t!=e.display.externalMeasured&&W(l))),l.styleClasses&&(l.styleClasses.bgClass&&(n.bgClass=a(l.styleClasses.bgClass,n.bgClass||"")),l.styleClasses.textClass&&(n.textClass=a(l.styleClasses.textClass,n.textClass||""))),0==n.map.length&&n.map.push(0,0,n.content.appendChild(Ie(e.display.measure))),0==o?(t.measure.map=n.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(n.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(ml){var u=n.content.lastChild;(/\bcm-tab\b/.test(u.className)||u.querySelector&&u.querySelector(".cm-tab"))&&(n.content.className="cm-tab-wrap-hack")}return Te(e,"renderLine",e,t.line,n.pre),n.pre.className&&(n.textClass=a(n.pre.className,n.textClass||"")),n}function at(e){var t=n("span","•","cm-invalidchar");return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function ut(e,t,r,i,o,l,s){if(t){var a,u=e.splitSpaces?ct(t,e.trailingSpace):t,c=e.cm.state.specialChars,f=!1;if(c.test(t)){a=document.createDocumentFragment();for(var h=0;;){c.lastIndex=h;var d=c.exec(t),g=d?d.index-h:t.length-h;if(g){var v=document.createTextNode(u.slice(h,h+g));gl&&vl<9?a.appendChild(n("span",[v])):a.appendChild(v),e.map.push(e.pos,e.pos+g,v),e.col+=g,e.pos+=g}if(!d)break;h+=g+1;var m=void 0;if("\t"==d[0]){var y=e.cm.options.tabSize,b=y-e.col%y;(m=a.appendChild(n("span",p(b),"cm-tab"))).setAttribute("role","presentation"),m.setAttribute("cm-text","\t"),e.col+=b}else"\r"==d[0]||"\n"==d[0]?((m=a.appendChild(n("span","\r"==d[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",d[0]),e.col+=1):((m=e.cm.options.specialCharPlaceholder(d[0])).setAttribute("cm-text",d[0]),gl&&vl<9?a.appendChild(n("span",[m])):a.appendChild(m),e.col+=1);e.map.push(e.pos,e.pos+1,m),e.pos++}}else e.col+=t.length,a=document.createTextNode(u),e.map.push(e.pos,e.pos+t.length,a),gl&&vl<9&&(f=!0),e.pos+=t.length;if(e.trailingSpace=32==u.charCodeAt(t.length-1),r||i||o||f||s){var w=r||"";i&&(w+=i),o&&(w+=o);var x=n("span",[a],w,s);return l&&(x.title=l),e.content.appendChild(x)}e.content.appendChild(a)}}function ct(e,t){if(e.length>1&&!/  /.test(e))return e;for(var r=t,n="",i=0;i<e.length;i++){var o=e.charAt(i);" "!=o||!r||i!=e.length-1&&32!=e.charCodeAt(i+1)||(o=" "),n+=o,r=" "==o}return n}function ft(e,t){return function(r,n,i,o,l,s,a){i=i?i+" cm-force-border":"cm-force-border";for(var u=r.pos,c=u+n.length;;){for(var f=void 0,h=0;h<t.length&&!((f=t[h]).to>u&&f.from<=u);h++);if(f.to>=c)return e(r,n,i,o,l,s,a);e(r,n.slice(0,f.to-u),i,o,null,s,a),o=null,n=n.slice(f.to-u),u=f.to}}}function ht(e,t,r,n){var i=!n&&r.widgetNode;i&&e.map.push(e.pos,e.pos+t,i),!n&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",r.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t,e.trailingSpace=!1}function dt(e,t,r){var n=e.markedSpans,i=e.text,o=0;if(n)for(var l,s,a,u,c,f,h,d=i.length,p=0,g=1,v="",m=0;;){if(m==p){a=u=c=f=s="",h=null,m=1/0;for(var y=[],b=void 0,w=0;w<n.length;++w){var x=n[w],C=x.marker;"bookmark"==C.type&&x.from==p&&C.widgetNode?y.push(C):x.from<=p&&(null==x.to||x.to>p||C.collapsed&&x.to==p&&x.from==p)?(null!=x.to&&x.to!=p&&m>x.to&&(m=x.to,u=""),C.className&&(a+=" "+C.className),C.css&&(s=(s?s+";":"")+C.css),C.startStyle&&x.from==p&&(c+=" "+C.startStyle),C.endStyle&&x.to==m&&(b||(b=[])).push(C.endStyle,x.to),C.title&&!f&&(f=C.title),C.collapsed&&(!h||le(h.marker,C)<0)&&(h=x)):x.from>p&&m>x.from&&(m=x.from)}if(b)for(var S=0;S<b.length;S+=2)b[S+1]==m&&(u+=" "+b[S]);if(!h||h.from==p)for(var L=0;L<y.length;++L)ht(t,0,y[L]);if(h&&(h.from||0)==p){if(ht(t,(null==h.to?d+1:h.to)-p,h.marker,null==h.from),null==h.to)return;h.to==p&&(h=!1)}}if(p>=d)break;for(var k=Math.min(d,m);;){if(v){var T=p+v.length;if(!h){var M=T>k?v.slice(0,k-p):v;t.addToken(t,M,l?l+a:a,c,p+M.length==m?u:"",f,s)}if(T>=k){v=v.slice(k-p),p=k;break}p=T,c=""}v=i.slice(o,o=r[g++]),l=lt(r[g++],t.cm.options)}}else for(var N=1;N<r.length;N+=2)t.addToken(t,i.slice(o,o=r[N]),lt(r[N+1],t.cm.options))}function pt(e,t,r){this.line=t,this.rest=de(t),this.size=this.rest?W(g(this.rest))-r+1:1,this.node=this.text=null,this.hidden=ve(e,t)}function gt(e,t,r){for(var n,i=[],o=t;o<r;o=n){var l=new pt(e.doc,M(e.doc,o),o);n=o+l.size,i.push(l)}return i}function vt(e){gs?gs.ops.push(e):e.ownsGroup=gs={ops:[e],delayedCallbacks:[]}}function mt(e){var t=e.delayedCallbacks,r=0;do{for(;r<t.length;r++)t[r].call(null);for(var n=0;n<e.ops.length;n++){var i=e.ops[n];if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(r<t.length)}function yt(e,t){var r=e.ownsGroup;if(r)try{mt(r)}finally{gs=null,t(r)}}function bt(e,t){var r=Le(e,t);if(r.length){var n,i=Array.prototype.slice.call(arguments,2);gs?n=gs.delayedCallbacks:vs?n=vs:(n=vs=[],setTimeout(wt,0));for(var o=0;o<r.length;++o)!function(e){n.push(function(){return r[e].apply(null,i)})}(o)}}function wt(){var e=vs;vs=null;for(var t=0;t<e.length;++t)e[t]()}function xt(e,t,r,n){for(var i=0;i<t.changes.length;i++){var o=t.changes[i];"text"==o?kt(e,t):"gutter"==o?Mt(e,t,r,n):"class"==o?Tt(e,t):"widget"==o&&Nt(e,t,n)}t.changes=null}function Ct(e){return e.node==e.text&&(e.node=n("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),gl&&vl<8&&(e.node.style.zIndex=2)),e.node}function St(e,t){var r=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass;if(r&&(r+=" CodeMirror-linebackground"),t.background)r?t.background.className=r:(t.background.parentNode.removeChild(t.background),t.background=null);else if(r){var i=Ct(t);t.background=i.insertBefore(n("div",null,r),i.firstChild),e.display.input.setUneditable(t.background)}}function Lt(e,t){var r=e.display.externalMeasured;return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):st(e,t)}function kt(e,t){var r=t.text.className,n=Lt(e,t);t.text==t.node&&(t.node=n.pre),t.text.parentNode.replaceChild(n.pre,t.text),t.text=n.pre,n.bgClass!=t.bgClass||n.textClass!=t.textClass?(t.bgClass=n.bgClass,t.textClass=n.textClass,Tt(e,t)):r&&(t.text.className=r)}function Tt(e,t){St(e,t),t.line.wrapClass?Ct(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="");var r=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass;t.text.className=r||""}function Mt(e,t,r,i){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var o=Ct(t);t.gutterBackground=n("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?i.fixedPos:-i.gutterTotalWidth)+"px; width: "+i.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),o.insertBefore(t.gutterBackground,t.text)}var l=t.line.gutterMarkers;if(e.options.lineNumbers||l){var s=Ct(t),a=t.gutter=n("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?i.fixedPos:-i.gutterTotalWidth)+"px");if(e.display.input.setUneditable(a),s.insertBefore(a,t.text),t.line.gutterClass&&(a.className+=" "+t.line.gutterClass),!e.options.lineNumbers||l&&l["CodeMirror-linenumbers"]||(t.lineNumber=a.appendChild(n("div",F(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+i.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),l)for(var u=0;u<e.options.gutters.length;++u){var c=e.options.gutters[u],f=l.hasOwnProperty(c)&&l[c];f&&a.appendChild(n("div",[f],"CodeMirror-gutter-elt","left: "+i.gutterLeft[c]+"px; width: "+i.gutterWidth[c]+"px"))}}}function Nt(e,t,r){t.alignable&&(t.alignable=null);for(var n=t.node.firstChild,i=void 0;n;n=i)i=n.nextSibling,"CodeMirror-linewidget"==n.className&&t.node.removeChild(n);At(e,t,r)}function Ot(e,t,r,n){var i=Lt(e,t);return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),Tt(e,t),Mt(e,t,r,n),At(e,t,n),t.node}function At(e,t,r){if(Wt(e,t.line,t,r,!0),t.rest)for(var n=0;n<t.rest.length;n++)Wt(e,t.rest[n],t,r,!1)}function Wt(e,t,r,i,o){if(t.widgets)for(var l=Ct(r),s=0,a=t.widgets;s<a.length;++s){var u=a[s],c=n("div",[u.node],"CodeMirror-linewidget");u.handleMouseEvents||c.setAttribute("cm-ignore-events","true"),Dt(u,c,r,i),e.display.input.setUneditable(c),o&&u.above?l.insertBefore(c,r.gutter||r.text):l.appendChild(c),bt(u,"redraw")}}function Dt(e,t,r,n){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t);var i=n.wrapperWidth;t.style.left=n.fixedPos+"px",e.coverGutter||(i-=n.gutterTotalWidth,t.style.paddingLeft=n.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-n.gutterTotalWidth+"px"))}function Ht(e){if(null!=e.height)return e.height;var t=e.doc.cm;if(!t)return 0;if(!o(document.body,e.node)){var i="position: relative;";e.coverGutter&&(i+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(i+="width: "+t.display.wrapper.clientWidth+"px;"),r(t.display.measure,n("div",[e.node],null,i))}return e.height=e.node.parentNode.offsetHeight}function Ft(e,t){for(var r=Ee(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function Et(e){return e.lineSpace.offsetTop}function Pt(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function It(e){if(e.cachedPaddingH)return e.cachedPaddingH;var t=r(e.measure,n("pre","x")),i=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,o={left:parseInt(i.paddingLeft),right:parseInt(i.paddingRight)};return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function zt(e){return Rl-e.display.nativeBarWidth}function Rt(e){return e.display.scroller.clientWidth-zt(e)-e.display.barWidth}function Bt(e){return e.display.scroller.clientHeight-zt(e)-e.display.barHeight}function Gt(e,t,r){var n=e.options.lineWrapping,i=n&&Rt(e);if(!t.measure.heights||n&&t.measure.width!=i){var o=t.measure.heights=[];if(n){t.measure.width=i;for(var l=t.text.firstChild.getClientRects(),s=0;s<l.length-1;s++){var a=l[s],u=l[s+1];Math.abs(a.bottom-u.bottom)>2&&o.push((a.bottom+u.top)/2-r.top)}}o.push(r.bottom-r.top)}}function Ut(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache};for(var n=0;n<e.rest.length;n++)if(e.rest[n]==t)return{map:e.measure.maps[n],cache:e.measure.caches[n]};for(var i=0;i<e.rest.length;i++)if(W(e.rest[i])>r)return{map:e.measure.maps[i],cache:e.measure.caches[i],before:!0}}function Vt(e,t){var n=W(t=fe(t)),i=e.display.externalMeasured=new pt(e.doc,t,n);i.lineN=n;var o=i.built=st(e,i);return i.text=o.pre,r(e.display.lineMeasure,o.pre),i}function Kt(e,t,r,n){return Yt(e,Xt(e,t),r,n)}function jt(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[Lr(e,t)];var r=e.display.externalMeasured;return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function Xt(e,t){var r=W(t),n=jt(e,r);n&&!n.text?n=null:n&&n.changes&&(xt(e,n,r,br(e)),e.curOp.forceUpdate=!0),n||(n=Vt(e,t));var i=Ut(n,t,r);return{line:t,view:n,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function Yt(e,t,r,n,i){t.before&&(r=-1);var o,l=r+(n||"");return t.cache.hasOwnProperty(l)?o=t.cache[l]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(Gt(e,t.view,t.rect),t.hasHeights=!0),(o=qt(e,t,r,n)).bogus||(t.cache[l]=o)),{left:o.left,right:o.right,top:i?o.rtop:o.top,bottom:i?o.rbottom:o.bottom}}function _t(e,t,r){for(var n,i,o,l,s,a,u=0;u<e.length;u+=3)if(s=e[u],a=e[u+1],t<s?(i=0,o=1,l="left"):t<a?o=(i=t-s)+1:(u==e.length-3||t==a&&e[u+3]>t)&&(i=(o=a-s)-1,t>=a&&(l="right")),null!=i){if(n=e[u+2],s==a&&r==(n.insertLeft?"left":"right")&&(l=r),"left"==r&&0==i)for(;u&&e[u-2]==e[u-3]&&e[u-1].insertLeft;)n=e[2+(u-=3)],l="left";if("right"==r&&i==a-s)for(;u<e.length-3&&e[u+3]==e[u+4]&&!e[u+5].insertLeft;)n=e[(u+=3)+2],l="right";break}return{node:n,start:i,end:o,collapse:l,coverStart:s,coverEnd:a}}function $t(e,t){var r=ms;if("left"==t)for(var n=0;n<e.length&&(r=e[n]).left==r.right;n++);else for(var i=e.length-1;i>=0&&(r=e[i]).left==r.right;i--);return r}function qt(e,t,r,n){var i,o=_t(t.map,r,n),l=o.node,s=o.start,a=o.end,u=o.collapse;if(3==l.nodeType){for(var c=0;c<4;c++){for(;s&&S(t.line.text.charAt(o.coverStart+s));)--s;for(;o.coverStart+a<o.coverEnd&&S(t.line.text.charAt(o.coverStart+a));)++a;if((i=gl&&vl<9&&0==s&&a==o.coverEnd-o.coverStart?l.parentNode.getBoundingClientRect():$t(Wl(l,s,a).getClientRects(),n)).left||i.right||0==s)break;a=s,s-=1,u="right"}gl&&vl<11&&(i=Zt(e.display.measure,i))}else{s>0&&(u=n="right");var f;i=e.options.lineWrapping&&(f=l.getClientRects()).length>1?f["right"==n?f.length-1:0]:l.getBoundingClientRect()}if(gl&&vl<9&&!s&&(!i||!i.left&&!i.right)){var h=l.parentNode.getClientRects()[0];i=h?{left:h.left,right:h.left+yr(e.display),top:h.top,bottom:h.bottom}:ms}for(var d=i.top-t.rect.top,p=i.bottom-t.rect.top,g=(d+p)/2,v=t.view.measure.heights,m=0;m<v.length-1&&!(g<v[m]);m++);var y=m?v[m-1]:0,b=v[m],w={left:("right"==u?i.right:i.left)-t.rect.left,right:("left"==u?i.left:i.right)-t.rect.left,top:y,bottom:b};return i.left||i.right||(w.bogus=!0),e.options.singleCursorHeightPerLine||(w.rtop=d,w.rbottom=p),w}function Zt(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!Re(e))return t;var r=screen.logicalXDPI/screen.deviceXDPI,n=screen.logicalYDPI/screen.deviceYDPI;return{left:t.left*r,right:t.right*r,top:t.top*n,bottom:t.bottom*n}}function Qt(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function Jt(e){e.display.externalMeasure=null,t(e.display.lineMeasure);for(var r=0;r<e.display.view.length;r++)Qt(e.display.view[r])}function er(e){Jt(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function tr(){return bl&&kl?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function rr(){return bl&&kl?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function nr(e){var t=0;if(e.widgets)for(var r=0;r<e.widgets.length;++r)e.widgets[r].above&&(t+=Ht(e.widgets[r]));return t}function ir(e,t,r,n,i){if(!i){var o=nr(t);r.top+=o,r.bottom+=o}if("line"==n)return r;n||(n="local");var l=ye(t);if("local"==n?l+=Et(e.display):l-=e.display.viewOffset,"page"==n||"window"==n){var s=e.display.lineSpace.getBoundingClientRect();l+=s.top+("window"==n?0:rr());var a=s.left+("window"==n?0:tr());r.left+=a,r.right+=a}return r.top+=l,r.bottom+=l,r}function or(e,t,r){if("div"==r)return t;var n=t.left,i=t.top;if("page"==r)n-=tr(),i-=rr();else if("local"==r||!r){var o=e.display.sizer.getBoundingClientRect();n+=o.left,i+=o.top}var l=e.display.lineSpace.getBoundingClientRect();return{left:n-l.left,top:i-l.top}}function lr(e,t,r,n,i){return n||(n=M(e.doc,t.line)),ir(e,n,Kt(e,n,t.ch,i),r)}function sr(e,t,r,n,i,o){function l(t,l){var s=Yt(e,i,t,l?"right":"left",o);return l?s.left=s.right:s.right=s.left,ir(e,n,s,r)}function s(e,t,r){var n=1==a[t].level;return l(r?e-1:e,n!=r)}n=n||M(e.doc,t.line),i||(i=Xt(e,n));var a=Se(n,e.doc.direction),u=t.ch,c=t.sticky;if(u>=n.text.length?(u=n.text.length,c="before"):u<=0&&(u=0,c="after"),!a)return l("before"==c?u-1:u,"before"==c);var f=Ce(a,u,c),h=$l,d=s(u,f,"before"==c);return null!=h&&(d.other=s(u,h,"before"!=c)),d}function ar(e,t){var r=0;t=U(e.doc,t),e.options.lineWrapping||(r=yr(e.display)*t.ch);var n=M(e.doc,t.line),i=ye(n)+Et(e.display);return{left:r,right:r,top:i,bottom:i+n.height}}function ur(e,t,r,n,i){var o=E(e,t,r);return o.xRel=i,n&&(o.outside=!0),o}function cr(e,t,r){var n=e.doc;if((r+=e.display.viewOffset)<0)return ur(n.first,0,null,!0,-1);var i=D(n,r),o=n.first+n.size-1;if(i>o)return ur(n.first+n.size-1,M(n,o).text.length,null,!0,1);t<0&&(t=0);for(var l=M(n,i);;){var s=pr(e,l,i,t,r),a=ue(l),u=a&&a.find(0,!0);if(!a||!(s.ch>u.from.ch||s.ch==u.from.ch&&s.xRel>0))return s;i=W(l=u.to.line)}}function fr(e,t,r,n){n-=nr(t);var i=t.text.length,o=k(function(t){return Yt(e,r,t-1).bottom<=n},i,0);return i=k(function(t){return Yt(e,r,t).top>n},o,i),{begin:o,end:i}}function hr(e,t,r,n){return r||(r=Xt(e,t)),fr(e,t,r,ir(e,t,Yt(e,r,n),"line").top)}function dr(e,t,r,n){return!(e.bottom<=r)&&(e.top>r||(n?e.left:e.right)>t)}function pr(e,t,r,n,i){i-=ye(t);var o=Xt(e,t),l=nr(t),s=0,a=t.text.length,u=!0,c=Se(t,e.doc.direction);if(c){var f=(e.options.lineWrapping?vr:gr)(e,t,r,o,c,n,i);s=(u=1!=f.level)?f.from:f.to-1,a=u?f.to:f.from-1}var h,d,p=null,g=null,v=k(function(t){var r=Yt(e,o,t);return r.top+=l,r.bottom+=l,!!dr(r,n,i,!1)&&(r.top<=i&&r.left<=n&&(p=t,g=r),!0)},s,a),m=!1;if(g){var y=n-g.left<g.right-n,b=y==u;v=p+(b?0:1),d=b?"after":"before",h=y?g.left:g.right}else{u||v!=a&&v!=s||v++,d=0==v?"after":v==t.text.length?"before":Yt(e,o,v-(u?1:0)).bottom+l<=i==u?"after":"before";var w=sr(e,E(r,v,d),"line",t,o);h=w.left,m=i<w.top||i>=w.bottom}return v=L(t.text,v,1),ur(r,v,d,m,n-h)}function gr(e,t,r,n,i,o,l){var s=k(function(s){var a=i[s],u=1!=a.level;return dr(sr(e,E(r,u?a.to:a.from,u?"before":"after"),"line",t,n),o,l,!0)},0,i.length-1),a=i[s];if(s>0){var u=1!=a.level,c=sr(e,E(r,u?a.from:a.to,u?"after":"before"),"line",t,n);dr(c,o,l,!0)&&c.top>l&&(a=i[s-1])}return a}function vr(e,t,r,n,i,o,l){for(var s=fr(e,t,n,l),a=s.begin,u=s.end,c=null,f=null,h=0;h<i.length;h++){var d=i[h];if(!(d.from>=u||d.to<=a)){var p=Yt(e,n,1!=d.level?Math.min(u,d.to)-1:Math.max(a,d.from)).right,g=p<o?o-p+1e9:p-o;(!c||f>g)&&(c=d,f=g)}}return c||(c=i[i.length-1]),c.from<a&&(c={from:a,to:c.to,level:c.level}),c.to>u&&(c={from:c.from,to:u,level:c.level}),c}function mr(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight;if(null==hs){hs=n("pre");for(var i=0;i<49;++i)hs.appendChild(document.createTextNode("x")),hs.appendChild(n("br"));hs.appendChild(document.createTextNode("x"))}r(e.measure,hs);var o=hs.offsetHeight/50;return o>3&&(e.cachedTextHeight=o),t(e.measure),o||1}function yr(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth;var t=n("span","xxxxxxxxxx"),i=n("pre",[t]);r(e.measure,i);var o=t.getBoundingClientRect(),l=(o.right-o.left)/10;return l>2&&(e.cachedCharWidth=l),l||10}function br(e){for(var t=e.display,r={},n={},i=t.gutters.clientLeft,o=t.gutters.firstChild,l=0;o;o=o.nextSibling,++l)r[e.options.gutters[l]]=o.offsetLeft+o.clientLeft+i,n[e.options.gutters[l]]=o.clientWidth;return{fixedPos:wr(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:n,wrapperWidth:t.wrapper.clientWidth}}function wr(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function xr(e){var t=mr(e.display),r=e.options.lineWrapping,n=r&&Math.max(5,e.display.scroller.clientWidth/yr(e.display)-3);return function(i){if(ve(e.doc,i))return 0;var o=0;if(i.widgets)for(var l=0;l<i.widgets.length;l++)i.widgets[l].height&&(o+=i.widgets[l].height);return r?o+(Math.ceil(i.text.length/n)||1)*t:o+t}}function Cr(e){var t=e.doc,r=xr(e);t.iter(function(e){var t=r(e);t!=e.height&&A(e,t)})}function Sr(e,t,r,n){var i=e.display;if(!r&&"true"==Ee(t).getAttribute("cm-not-content"))return null;var o,l,s=i.lineSpace.getBoundingClientRect();try{o=t.clientX-s.left,l=t.clientY-s.top}catch(t){return null}var a,u=cr(e,o,l);if(n&&1==u.xRel&&(a=M(e.doc,u.line).text).length==u.ch){var c=f(a,a.length,e.options.tabSize)-a.length;u=E(u.line,Math.max(0,Math.round((o-It(e.display).left)/yr(e.display))-c))}return u}function Lr(e,t){if(t>=e.display.viewTo)return null;if((t-=e.display.viewFrom)<0)return null;for(var r=e.display.view,n=0;n<r.length;n++)if((t-=r[n].size)<0)return n}function kr(e){e.display.input.showSelection(e.display.input.prepareSelection())}function Tr(e,t){void 0===t&&(t=!0);for(var r=e.doc,n={},i=n.cursors=document.createDocumentFragment(),o=n.selection=document.createDocumentFragment(),l=0;l<r.sel.ranges.length;l++)if(t||l!=r.sel.primIndex){var s=r.sel.ranges[l];if(!(s.from().line>=e.display.viewTo||s.to().line<e.display.viewFrom)){var a=s.empty();(a||e.options.showCursorWhenSelecting)&&Mr(e,s.head,i),a||Or(e,s,o)}}return n}function Mr(e,t,r){var i=sr(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),o=r.appendChild(n("div"," ","CodeMirror-cursor"));if(o.style.left=i.left+"px",o.style.top=i.top+"px",o.style.height=Math.max(0,i.bottom-i.top)*e.options.cursorHeight+"px",i.other){var l=r.appendChild(n("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));l.style.display="",l.style.left=i.other.left+"px",l.style.top=i.other.top+"px",l.style.height=.85*(i.other.bottom-i.other.top)+"px"}}function Nr(e,t){return e.top-t.top||e.left-t.left}function Or(e,t,r){function i(e,t,r,i){t<0&&(t=0),t=Math.round(t),i=Math.round(i),a.appendChild(n("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==r?f-e:r)+"px;\n                             height: "+(i-t)+"px"))}function o(t,r,n){function o(r,n){return lr(e,E(t,r),"div",u,n)}var l,a,u=M(s,t),h=u.text.length,d=Se(u,s.direction);return xe(d,r||0,null==n?h:n,function(t,s,p,g){var v=o(t,"ltr"==p?"left":"right"),m=o(s-1,"ltr"==p?"right":"left");if("ltr"==p){var y=null==r&&0==t?c:v.left,b=null==n&&s==h?f:m.right;m.top-v.top<=3?i(y,m.top,b-y,m.bottom):(i(y,v.top,null,v.bottom),v.bottom<m.top&&i(c,v.bottom,null,m.top),i(c,m.top,m.right,m.bottom))}else if(t<s){var w=null==r&&0==t?f:v.right,x=null==n&&s==h?c:m.left;if(m.top-v.top<=3)i(x,m.top,w-x,m.bottom);else{var C=c;if(g){var S=hr(e,u,null,t).end;C=o(S-(/\s/.test(u.text.charAt(S-1))?2:1),"left").left}i(C,v.top,w-C,v.bottom),v.bottom<m.top&&i(c,v.bottom,null,m.top);var L=null;d.length,L=o(hr(e,u,null,s).begin,"right").right-x,i(x,m.top,L,m.bottom)}}(!l||Nr(v,l)<0)&&(l=v),Nr(m,l)<0&&(l=m),(!a||Nr(v,a)<0)&&(a=v),Nr(m,a)<0&&(a=m)}),{start:l,end:a}}var l=e.display,s=e.doc,a=document.createDocumentFragment(),u=It(e.display),c=u.left,f=Math.max(l.sizerWidth,Rt(e)-l.sizer.offsetLeft)-u.right,h=t.from(),d=t.to();if(h.line==d.line)o(h.line,h.ch,d.ch);else{var p=M(s,h.line),g=M(s,d.line),v=fe(p)==fe(g),m=o(h.line,h.ch,v?p.text.length+1:null).end,y=o(d.line,v?0:null,d.ch).start;v&&(m.top<y.top-2?(i(m.right,m.top,null,m.bottom),i(c,y.top,y.left,y.bottom)):i(m.right,m.top,y.left-m.right,m.bottom)),m.bottom<y.top&&i(c,m.bottom,null,y.top)}r.appendChild(a)}function Ar(e){if(e.state.focused){var t=e.display;clearInterval(t.blinker);var r=!0;t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval(function(){return t.cursorDiv.style.visibility=(r=!r)?"":"hidden"},e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Wr(e){e.state.focused||(e.display.input.focus(),Hr(e))}function Dr(e){e.state.delayingBlurEvent=!0,setTimeout(function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,Fr(e))},100)}function Hr(e,t){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(Te(e,"focus",e,t),e.state.focused=!0,s(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),ml&&setTimeout(function(){return e.display.input.reset(!0)},20)),e.display.input.receivedFocus()),Ar(e))}function Fr(e,t){e.state.delayingBlurEvent||(e.state.focused&&(Te(e,"blur",e,t),e.state.focused=!1,Fl(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout(function(){e.state.focused||(e.display.shift=!1)},150))}function Er(e){for(var t=e.display,r=t.lineDiv.offsetTop,n=0;n<t.view.length;n++){var i=t.view[n],o=void 0;if(!i.hidden){if(gl&&vl<8){var l=i.node.offsetTop+i.node.offsetHeight;o=l-r,r=l}else{var s=i.node.getBoundingClientRect();o=s.bottom-s.top}var a=i.line.height-o;if(o<2&&(o=mr(t)),(a>.005||a<-.005)&&(A(i.line,o),Pr(i.line),i.rest))for(var u=0;u<i.rest.length;u++)Pr(i.rest[u])}}}function Pr(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t)e.widgets[t].height=e.widgets[t].node.parentNode.offsetHeight}function Ir(e,t,r){var n=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop;n=Math.floor(n-Et(e));var i=r&&null!=r.bottom?r.bottom:n+e.wrapper.clientHeight,o=D(t,n),l=D(t,i);if(r&&r.ensure){var s=r.ensure.from.line,a=r.ensure.to.line;s<o?(o=s,l=D(t,ye(M(t,s))+e.wrapper.clientHeight)):Math.min(a,t.lastLine())>=l&&(o=D(t,ye(M(t,a))-e.wrapper.clientHeight),l=a)}return{from:o,to:Math.max(l,o+1)}}function zr(e){var t=e.display,r=t.view;if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var n=wr(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,o=n+"px",l=0;l<r.length;l++)if(!r[l].hidden){e.options.fixedGutter&&(r[l].gutter&&(r[l].gutter.style.left=o),r[l].gutterBackground&&(r[l].gutterBackground.style.left=o));var s=r[l].alignable;if(s)for(var a=0;a<s.length;a++)s[a].style.left=o}e.options.fixedGutter&&(t.gutters.style.left=n+i+"px")}}function Rr(e){if(!e.options.lineNumbers)return!1;var t=e.doc,r=F(e.options,t.first+t.size-1),i=e.display;if(r.length!=i.lineNumChars){var o=i.measure.appendChild(n("div",[n("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),l=o.firstChild.offsetWidth,s=o.offsetWidth-l;return i.lineGutter.style.width="",i.lineNumInnerWidth=Math.max(l,i.lineGutter.offsetWidth-s)+1,i.lineNumWidth=i.lineNumInnerWidth+s,i.lineNumChars=i.lineNumInnerWidth?r.length:-1,i.lineGutter.style.width=i.lineNumWidth+"px",Wn(e),!0}return!1}function Br(e,t){if(!Me(e,"scrollCursorIntoView")){var r=e.display,i=r.sizer.getBoundingClientRect(),o=null;if(t.top+i.top<0?o=!0:t.bottom+i.top>(window.innerHeight||document.documentElement.clientHeight)&&(o=!1),null!=o&&!Sl){var l=n("div","​",null,"position: absolute;\n                         top: "+(t.top-r.viewOffset-Et(e.display))+"px;\n                         height: "+(t.bottom-t.top+zt(e)+r.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;");e.display.lineSpace.appendChild(l),l.scrollIntoView(o),e.display.lineSpace.removeChild(l)}}}function Gr(e,t,r,n){null==n&&(n=0);var i;e.options.lineWrapping||t!=r||(r="before"==(t=t.ch?E(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t).sticky?E(t.line,t.ch+1,"before"):t);for(var o=0;o<5;o++){var l=!1,s=sr(e,t),a=r&&r!=t?sr(e,r):s,u=Vr(e,i={left:Math.min(s.left,a.left),top:Math.min(s.top,a.top)-n,right:Math.max(s.left,a.left),bottom:Math.max(s.bottom,a.bottom)+n}),c=e.doc.scrollTop,f=e.doc.scrollLeft;if(null!=u.scrollTop&&(qr(e,u.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(l=!0)),null!=u.scrollLeft&&(Qr(e,u.scrollLeft),Math.abs(e.doc.scrollLeft-f)>1&&(l=!0)),!l)break}return i}function Ur(e,t){var r=Vr(e,t);null!=r.scrollTop&&qr(e,r.scrollTop),null!=r.scrollLeft&&Qr(e,r.scrollLeft)}function Vr(e,t){var r=e.display,n=mr(e.display);t.top<0&&(t.top=0);var i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:r.scroller.scrollTop,o=Bt(e),l={};t.bottom-t.top>o&&(t.bottom=t.top+o);var s=e.doc.height+Pt(r),a=t.top<n,u=t.bottom>s-n;if(t.top<i)l.scrollTop=a?0:t.top;else if(t.bottom>i+o){var c=Math.min(t.top,(u?s:t.bottom)-o);c!=i&&(l.scrollTop=c)}var f=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:r.scroller.scrollLeft,h=Rt(e)-(e.options.fixedGutter?r.gutters.offsetWidth:0),d=t.right-t.left>h;return d&&(t.right=t.left+h),t.left<10?l.scrollLeft=0:t.left<f?l.scrollLeft=Math.max(0,t.left-(d?0:10)):t.right>h+f-3&&(l.scrollLeft=t.right+(d?0:10)-h),l}function Kr(e,t){null!=t&&(_r(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function jr(e){_r(e);var t=e.getCursor();e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function Xr(e,t,r){null==t&&null==r||_r(e),null!=t&&(e.curOp.scrollLeft=t),null!=r&&(e.curOp.scrollTop=r)}function Yr(e,t){_r(e),e.curOp.scrollToPos=t}function _r(e){var t=e.curOp.scrollToPos;t&&(e.curOp.scrollToPos=null,$r(e,ar(e,t.from),ar(e,t.to),t.margin))}function $r(e,t,r,n){var i=Vr(e,{left:Math.min(t.left,r.left),top:Math.min(t.top,r.top)-n,right:Math.max(t.right,r.right),bottom:Math.max(t.bottom,r.bottom)+n});Xr(e,i.scrollLeft,i.scrollTop)}function qr(e,t){Math.abs(e.doc.scrollTop-t)<2||(fl||On(e,{top:t}),Zr(e,t,!0),fl&&On(e),Cn(e,100))}function Zr(e,t,r){t=Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t),(e.display.scroller.scrollTop!=t||r)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function Qr(e,t,r,n){t=Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth),(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!n||(e.doc.scrollLeft=t,zr(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function Jr(e){var t=e.display,r=t.gutters.offsetWidth,n=Math.round(e.doc.height+Pt(e.display));return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:n,scrollHeight:n+zt(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}function en(e,t){t||(t=Jr(e));var r=e.display.barWidth,n=e.display.barHeight;tn(e,t);for(var i=0;i<4&&r!=e.display.barWidth||n!=e.display.barHeight;i++)r!=e.display.barWidth&&e.options.lineWrapping&&Er(e),tn(e,Jr(e)),r=e.display.barWidth,n=e.display.barHeight}function tn(e,t){var r=e.display,n=r.scrollbars.update(t);r.sizer.style.paddingRight=(r.barWidth=n.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=n.bottom)+"px",r.heightForcer.style.borderBottom=n.bottom+"px solid transparent",n.right&&n.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=n.bottom+"px",r.scrollbarFiller.style.width=n.right+"px"):r.scrollbarFiller.style.display="",n.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=n.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}function rn(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&Fl(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new ws[e.options.scrollbarStyle](function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),Ql(t,"mousedown",function(){e.state.focused&&setTimeout(function(){return e.display.input.focus()},0)}),t.setAttribute("cm-not-content","true")},function(t,r){"horizontal"==r?Qr(e,t):qr(e,t)},e),e.display.scrollbars.addClass&&s(e.display.wrapper,e.display.scrollbars.addClass)}function nn(e){e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++xs},vt(e.curOp)}function on(e){yt(e.curOp,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null;ln(e)})}function ln(e){for(var t=e.ops,r=0;r<t.length;r++)sn(t[r]);for(var n=0;n<t.length;n++)an(t[n]);for(var i=0;i<t.length;i++)un(t[i]);for(var o=0;o<t.length;o++)cn(t[o]);for(var l=0;l<t.length;l++)fn(t[l])}function sn(e){var t=e.cm,r=t.display;Ln(t),e.updateMaxLine&&we(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new Cs(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function an(e){e.updatedDisplay=e.mustUpdate&&Mn(e.cm,e.update)}function un(e){var t=e.cm,r=t.display;e.updatedDisplay&&Er(t),e.barMeasure=Jr(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Kt(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+zt(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-Rt(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}function cn(e){var t=e.cm;null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&Qr(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1);var r=e.focus&&e.focus==l();e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,r),(e.updatedDisplay||e.startHeight!=t.doc.height)&&en(t,e.barMeasure),e.updatedDisplay&&Dn(t,e.barMeasure),e.selectionChanged&&Ar(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),r&&Wr(e.cm)}function fn(e){var t=e.cm,r=t.display,n=t.doc;e.updatedDisplay&&Nn(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=e.scrollTop&&Zr(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Qr(t,e.scrollLeft,!0,!0),e.scrollToPos&&Br(t,Gr(t,U(n,e.scrollToPos.from),U(n,e.scrollToPos.to),e.scrollToPos.margin));var i=e.maybeHiddenMarkers,o=e.maybeUnhiddenMarkers;if(i)for(var l=0;l<i.length;++l)i[l].lines.length||Te(i[l],"hide");if(o)for(var s=0;s<o.length;++s)o[s].lines.length&&Te(o[s],"unhide");r.wrapper.offsetHeight&&(n.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&Te(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function hn(e,t){if(e.curOp)return t();nn(e);try{return t()}finally{on(e)}}function dn(e,t){return function(){if(e.curOp)return t.apply(e,arguments);nn(e);try{return t.apply(e,arguments)}finally{on(e)}}}function pn(e){return function(){if(this.curOp)return e.apply(this,arguments);nn(this);try{return e.apply(this,arguments)}finally{on(this)}}}function gn(e){return function(){var t=this.cm;if(!t||t.curOp)return e.apply(this,arguments);nn(t);try{return e.apply(this,arguments)}finally{on(t)}}}function vn(e,t,r,n){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),n||(n=0);var i=e.display;if(n&&r<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)_l&&pe(e.doc,t)<i.viewTo&&yn(e);else if(r<=i.viewFrom)_l&&ge(e.doc,r+n)>i.viewFrom?yn(e):(i.viewFrom+=n,i.viewTo+=n);else if(t<=i.viewFrom&&r>=i.viewTo)yn(e);else if(t<=i.viewFrom){var o=bn(e,r,r+n,1);o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=n):yn(e)}else if(r>=i.viewTo){var l=bn(e,t,t,-1);l?(i.view=i.view.slice(0,l.index),i.viewTo=l.lineN):yn(e)}else{var s=bn(e,t,t,-1),a=bn(e,r,r+n,1);s&&a?(i.view=i.view.slice(0,s.index).concat(gt(e,s.lineN,a.lineN)).concat(i.view.slice(a.index)),i.viewTo+=n):yn(e)}var u=i.externalMeasured;u&&(r<u.lineN?u.lineN+=n:t<u.lineN+u.size&&(i.externalMeasured=null))}function mn(e,t,r){e.curOp.viewChanged=!0;var n=e.display,i=e.display.externalMeasured;if(i&&t>=i.lineN&&t<i.lineN+i.size&&(n.externalMeasured=null),!(t<n.viewFrom||t>=n.viewTo)){var o=n.view[Lr(e,t)];if(null!=o.node){var l=o.changes||(o.changes=[]);-1==h(l,r)&&l.push(r)}}}function yn(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function bn(e,t,r,n){var i,o=Lr(e,t),l=e.display.view;if(!_l||r==e.doc.first+e.doc.size)return{index:o,lineN:r};for(var s=e.display.viewFrom,a=0;a<o;a++)s+=l[a].size;if(s!=t){if(n>0){if(o==l.length-1)return null;i=s+l[o].size-t,o++}else i=s-t;t+=i,r+=i}for(;pe(e.doc,r)!=r;){if(o==(n<0?0:l.length-1))return null;r+=n*l[o-(n<0?1:0)].size,o+=n}return{index:o,lineN:r}}function wn(e,t,r){var n=e.display;0==n.view.length||t>=n.viewTo||r<=n.viewFrom?(n.view=gt(e,t,r),n.viewFrom=t):(n.viewFrom>t?n.view=gt(e,t,n.viewFrom).concat(n.view):n.viewFrom<t&&(n.view=n.view.slice(Lr(e,t))),n.viewFrom=t,n.viewTo<r?n.view=n.view.concat(gt(e,n.viewTo,r)):n.viewTo>r&&(n.view=n.view.slice(0,Lr(e,r)))),n.viewTo=r}function xn(e){for(var t=e.display.view,r=0,n=0;n<t.length;n++){var i=t[n];i.hidden||i.node&&!i.changes||++r}return r}function Cn(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,u(Sn,e))}function Sn(e){var t=e.doc;if(!(t.highlightFrontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,n=$e(e,t.highlightFrontier),i=[];t.iter(n.line,Math.min(t.first+t.size,e.display.viewTo+500),function(o){if(n.line>=e.display.viewFrom){var l=o.styles,s=o.text.length>e.options.maxHighlightLength?Ke(t.mode,n.state):null,a=Ye(e,o,n,!0);s&&(n.state=s),o.styles=a.styles;var u=o.styleClasses,c=a.classes;c?o.styleClasses=c:u&&(o.styleClasses=null);for(var f=!l||l.length!=o.styles.length||u!=c&&(!u||!c||u.bgClass!=c.bgClass||u.textClass!=c.textClass),h=0;!f&&h<l.length;++h)f=l[h]!=o.styles[h];f&&i.push(n.line),o.stateAfter=n.save(),n.nextLine()}else o.text.length<=e.options.maxHighlightLength&&qe(e,o.text,n),o.stateAfter=n.line%5==0?n.save():null,n.nextLine();if(+new Date>r)return Cn(e,e.options.workDelay),!0}),t.highlightFrontier=n.line,t.modeFrontier=Math.max(t.modeFrontier,n.line),i.length&&hn(e,function(){for(var t=0;t<i.length;t++)mn(e,i[t],"text")})}}function Ln(e){var t=e.display;!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=zt(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=zt(e)+"px",t.scrollbarsClipped=!0)}function kn(e){if(e.hasFocus())return null;var t=l();if(!t||!o(e.display.lineDiv,t))return null;var r={activeElt:t};if(window.getSelection){var n=window.getSelection();n.anchorNode&&n.extend&&o(e.display.lineDiv,n.anchorNode)&&(r.anchorNode=n.anchorNode,r.anchorOffset=n.anchorOffset,r.focusNode=n.focusNode,r.focusOffset=n.focusOffset)}return r}function Tn(e){if(e&&e.activeElt&&e.activeElt!=l()&&(e.activeElt.focus(),e.anchorNode&&o(document.body,e.anchorNode)&&o(document.body,e.focusNode))){var t=window.getSelection(),r=document.createRange();r.setEnd(e.anchorNode,e.anchorOffset),r.collapse(!1),t.removeAllRanges(),t.addRange(r),t.extend(e.focusNode,e.focusOffset)}}function Mn(e,r){var n=e.display,i=e.doc;if(r.editorIsHidden)return yn(e),!1;if(!r.force&&r.visible.from>=n.viewFrom&&r.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==xn(e))return!1;Rr(e)&&(yn(e),r.dims=br(e));var o=i.first+i.size,l=Math.max(r.visible.from-e.options.viewportMargin,i.first),s=Math.min(o,r.visible.to+e.options.viewportMargin);n.viewFrom<l&&l-n.viewFrom<20&&(l=Math.max(i.first,n.viewFrom)),n.viewTo>s&&n.viewTo-s<20&&(s=Math.min(o,n.viewTo)),_l&&(l=pe(e.doc,l),s=ge(e.doc,s));var a=l!=n.viewFrom||s!=n.viewTo||n.lastWrapHeight!=r.wrapperHeight||n.lastWrapWidth!=r.wrapperWidth;wn(e,l,s),n.viewOffset=ye(M(e.doc,n.viewFrom)),e.display.mover.style.top=n.viewOffset+"px";var u=xn(e);if(!a&&0==u&&!r.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo))return!1;var c=kn(e);return u>4&&(n.lineDiv.style.display="none"),An(e,n.updateLineNumbers,r.dims),u>4&&(n.lineDiv.style.display=""),n.renderedView=n.view,Tn(c),t(n.cursorDiv),t(n.selectionDiv),n.gutters.style.height=n.sizer.style.minHeight=0,a&&(n.lastWrapHeight=r.wrapperHeight,n.lastWrapWidth=r.wrapperWidth,Cn(e,400)),n.updateLineNumbers=null,!0}function Nn(e,t){for(var r=t.viewport,n=!0;(n&&e.options.lineWrapping&&t.oldDisplayWidth!=Rt(e)||(r&&null!=r.top&&(r={top:Math.min(e.doc.height+Pt(e.display)-Bt(e),r.top)}),t.visible=Ir(e.display,e.doc,r),!(t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)))&&Mn(e,t);n=!1){Er(e);var i=Jr(e);kr(e),en(e,i),Dn(e,i),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function On(e,t){var r=new Cs(e,t);if(Mn(e,r)){Er(e),Nn(e,r);var n=Jr(e);kr(e),en(e,n),Dn(e,n),r.finish()}}function An(e,r,n){function i(t){var r=t.nextSibling;return ml&&Ml&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var o=e.display,l=e.options.lineNumbers,s=o.lineDiv,a=s.firstChild,u=o.view,c=o.viewFrom,f=0;f<u.length;f++){var d=u[f];if(d.hidden);else if(d.node&&d.node.parentNode==s){for(;a!=d.node;)a=i(a);var p=l&&null!=r&&r<=c&&d.lineNumber;d.changes&&(h(d.changes,"gutter")>-1&&(p=!1),xt(e,d,c,n)),p&&(t(d.lineNumber),d.lineNumber.appendChild(document.createTextNode(F(e.options,c)))),a=d.node.nextSibling}else{var g=Ot(e,d,c,n);s.insertBefore(g,a)}c+=d.size}for(;a;)a=i(a)}function Wn(e){var t=e.display.gutters.offsetWidth;e.display.sizer.style.marginLeft=t+"px"}function Dn(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+zt(e)+"px"}function Hn(e){var r=e.display.gutters,i=e.options.gutters;t(r);for(var o=0;o<i.length;++o){var l=i[o],s=r.appendChild(n("div",null,"CodeMirror-gutter "+l));"CodeMirror-linenumbers"==l&&(e.display.lineGutter=s,s.style.width=(e.display.lineNumWidth||1)+"px")}r.style.display=o?"":"none",Wn(e)}function Fn(e){var t=h(e.gutters,"CodeMirror-linenumbers");-1==t&&e.lineNumbers?e.gutters=e.gutters.concat(["CodeMirror-linenumbers"]):t>-1&&!e.lineNumbers&&(e.gutters=e.gutters.slice(0),e.gutters.splice(t,1))}function En(e){var t=e.wheelDeltaX,r=e.wheelDeltaY;return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}function Pn(e){var t=En(e);return t.x*=Ls,t.y*=Ls,t}function In(e,t){var r=En(t),n=r.x,i=r.y,o=e.display,l=o.scroller,s=l.scrollWidth>l.clientWidth,a=l.scrollHeight>l.clientHeight;if(n&&s||i&&a){if(i&&Ml&&ml)e:for(var u=t.target,c=o.view;u!=l;u=u.parentNode)for(var f=0;f<c.length;f++)if(c[f].node==u){e.display.currentWheelTarget=u;break e}if(n&&!fl&&!wl&&null!=Ls)return i&&a&&qr(e,Math.max(0,l.scrollTop+i*Ls)),Qr(e,Math.max(0,l.scrollLeft+n*Ls)),(!i||i&&a)&&We(t),void(o.wheelStartX=null);if(i&&null!=Ls){var h=i*Ls,d=e.doc.scrollTop,p=d+o.wrapper.clientHeight;h<0?d=Math.max(0,d+h-50):p=Math.min(e.doc.height,p+h+50),On(e,{top:d,bottom:p})}Ss<20&&(null==o.wheelStartX?(o.wheelStartX=l.scrollLeft,o.wheelStartY=l.scrollTop,o.wheelDX=n,o.wheelDY=i,setTimeout(function(){if(null!=o.wheelStartX){var e=l.scrollLeft-o.wheelStartX,t=l.scrollTop-o.wheelStartY,r=t&&o.wheelDY&&t/o.wheelDY||e&&o.wheelDX&&e/o.wheelDX;o.wheelStartX=o.wheelStartY=null,r&&(Ls=(Ls*Ss+r)/(Ss+1),++Ss)}},200)):(o.wheelDX+=n,o.wheelDY+=i))}}function zn(e,t){var r=e[t];e.sort(function(e,t){return P(e.from(),t.from())}),t=h(e,r);for(var n=1;n<e.length;n++){var i=e[n],o=e[n-1];if(P(o.to(),i.from())>=0){var l=B(o.from(),i.from()),s=R(o.to(),i.to()),a=o.empty()?i.from()==i.head:o.from()==o.head;n<=t&&--t,e.splice(--n,2,new Ts(a?s:l,a?l:s))}}return new ks(e,t)}function Rn(e,t){return new ks([new Ts(e,t||e)],0)}function Bn(e){return e.text?E(e.from.line+e.text.length-1,g(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function Gn(e,t){if(P(e,t.from)<0)return e;if(P(e,t.to)<=0)return Bn(t);var r=e.line+t.text.length-(t.to.line-t.from.line)-1,n=e.ch;return e.line==t.to.line&&(n+=Bn(t).ch-t.to.ch),E(r,n)}function Un(e,t){for(var r=[],n=0;n<e.sel.ranges.length;n++){var i=e.sel.ranges[n];r.push(new Ts(Gn(i.anchor,t),Gn(i.head,t)))}return zn(r,e.sel.primIndex)}function Vn(e,t,r){return e.line==t.line?E(r.line,e.ch-t.ch+r.ch):E(r.line+(e.line-t.line),e.ch)}function Kn(e,t,r){for(var n=[],i=E(e.first,0),o=i,l=0;l<t.length;l++){var s=t[l],a=Vn(s.from,i,o),u=Vn(Bn(s),i,o);if(i=s.to,o=u,"around"==r){var c=e.sel.ranges[l],f=P(c.head,c.anchor)<0;n[l]=new Ts(f?u:a,f?a:u)}else n[l]=new Ts(a,a)}return new ks(n,e.sel.primIndex)}function jn(e){e.doc.mode=Ue(e.options,e.doc.modeOption),Xn(e)}function Xn(e){e.doc.iter(function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)}),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,Cn(e,100),e.state.modeGen++,e.curOp&&vn(e)}function Yn(e,t){return 0==t.from.ch&&0==t.to.ch&&""==g(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function _n(e,t,r,n){function i(e){return r?r[e]:null}function o(e,r,i){it(e,r,i,n),bt(e,"change",e,t)}function l(e,t){for(var r=[],o=e;o<t;++o)r.push(new fs(u[o],i(o),n));return r}var s=t.from,a=t.to,u=t.text,c=M(e,s.line),f=M(e,a.line),h=g(u),d=i(u.length-1),p=a.line-s.line;if(t.full)e.insert(0,l(0,u.length)),e.remove(u.length,e.size-u.length);else if(Yn(e,t)){var v=l(0,u.length-1);o(f,f.text,d),p&&e.remove(s.line,p),v.length&&e.insert(s.line,v)}else if(c==f)if(1==u.length)o(c,c.text.slice(0,s.ch)+h+c.text.slice(a.ch),d);else{var m=l(1,u.length-1);m.push(new fs(h+c.text.slice(a.ch),d,n)),o(c,c.text.slice(0,s.ch)+u[0],i(0)),e.insert(s.line+1,m)}else if(1==u.length)o(c,c.text.slice(0,s.ch)+u[0]+f.text.slice(a.ch),i(0)),e.remove(s.line+1,p);else{o(c,c.text.slice(0,s.ch)+u[0],i(0)),o(f,h+f.text.slice(a.ch),d);var y=l(1,u.length-1);p>1&&e.remove(s.line+1,p-1),e.insert(s.line+1,y)}bt(e,"change",e,t)}function $n(e,t,r){function n(e,i,o){if(e.linked)for(var l=0;l<e.linked.length;++l){var s=e.linked[l];if(s.doc!=i){var a=o&&s.sharedHist;r&&!a||(t(s.doc,a),n(s.doc,e,a))}}}n(e,null,!0)}function qn(e,t){if(t.cm)throw new Error("This document is already in use.");e.doc=t,t.cm=e,Cr(e),jn(e),Zn(e),e.options.lineWrapping||we(e),e.options.mode=t.modeOption,vn(e)}function Zn(e){("rtl"==e.doc.direction?s:Fl)(e.display.lineDiv,"CodeMirror-rtl")}function Qn(e){hn(e,function(){Zn(e),vn(e)})}function Jn(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function ei(e,t){var r={from:z(t.from),to:Bn(t),text:N(e,t.from,t.to)};return si(e,r,t.from.line,t.to.line+1),$n(e,function(e){return si(e,r,t.from.line,t.to.line+1)},!0),r}function ti(e){for(;e.length&&g(e).ranges;)e.pop()}function ri(e,t){return t?(ti(e.done),g(e.done)):e.done.length&&!g(e.done).ranges?g(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),g(e.done)):void 0}function ni(e,t,r,n){var i=e.history;i.undone.length=0;var o,l,s=+new Date;if((i.lastOp==n||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&e.cm&&i.lastModTime>s-e.cm.options.historyEventDelay||"*"==t.origin.charAt(0)))&&(o=ri(i,i.lastOp==n)))l=g(o.changes),0==P(t.from,t.to)&&0==P(t.from,l.to)?l.to=Bn(t):o.changes.push(ei(e,t));else{var a=g(i.done);for(a&&a.ranges||li(e.sel,i.done),o={changes:[ei(e,t)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(r),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=s,i.lastOp=i.lastSelOp=n,i.lastOrigin=i.lastSelOrigin=t.origin,l||Te(e,"historyAdded")}function ii(e,t,r,n){var i=t.charAt(0);return"*"==i||"+"==i&&r.ranges.length==n.ranges.length&&r.somethingSelected()==n.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}function oi(e,t,r,n){var i=e.history,o=n&&n.origin;r==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||ii(e,o,g(i.done),t))?i.done[i.done.length-1]=t:li(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=r,n&&!1!==n.clearRedo&&ti(i.undone)}function li(e,t){var r=g(t);r&&r.ranges&&r.equals(e)||t.push(e)}function si(e,t,r,n){var i=t["spans_"+e.id],o=0;e.iter(Math.max(e.first,r),Math.min(e.first+e.size,n),function(r){r.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=r.markedSpans),++o})}function ai(e){if(!e)return null;for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r]);return t?t.length?t:null:e}function ui(e,t){var r=t["spans_"+e.id];if(!r)return null;for(var n=[],i=0;i<t.text.length;++i)n.push(ai(r[i]));return n}function ci(e,t){var r=ui(e,t),n=J(e,t);if(!r)return n;if(!n)return r;for(var i=0;i<r.length;++i){var o=r[i],l=n[i];if(o&&l)e:for(var s=0;s<l.length;++s){for(var a=l[s],u=0;u<o.length;++u)if(o[u].marker==a.marker)continue e;o.push(a)}else l&&(r[i]=l)}return r}function fi(e,t,r){for(var n=[],i=0;i<e.length;++i){var o=e[i];if(o.ranges)n.push(r?ks.prototype.deepCopy.call(o):o);else{var l=o.changes,s=[];n.push({changes:s});for(var a=0;a<l.length;++a){var u=l[a],c=void 0;if(s.push({from:u.from,to:u.to,text:u.text}),t)for(var f in u)(c=f.match(/^spans_(\d+)$/))&&h(t,Number(c[1]))>-1&&(g(s)[f]=u[f],delete u[f])}}}return n}function hi(e,t,r,n){if(n){var i=e.anchor;if(r){var o=P(t,i)<0;o!=P(r,i)<0?(i=t,t=r):o!=P(t,r)<0&&(t=r)}return new Ts(i,t)}return new Ts(r||t,t)}function di(e,t,r,n,i){null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)),bi(e,new ks([hi(e.sel.primary(),t,r,i)],0),n)}function pi(e,t,r){for(var n=[],i=e.cm&&(e.cm.display.shift||e.extend),o=0;o<e.sel.ranges.length;o++)n[o]=hi(e.sel.ranges[o],t[o],null,i);bi(e,zn(n,e.sel.primIndex),r)}function gi(e,t,r,n){var i=e.sel.ranges.slice(0);i[t]=r,bi(e,zn(i,e.sel.primIndex),n)}function vi(e,t,r,n){bi(e,Rn(t,r),n)}function mi(e,t,r){var n={ranges:t.ranges,update:function(t){var r=this;this.ranges=[];for(var n=0;n<t.length;n++)r.ranges[n]=new Ts(U(e,t[n].anchor),U(e,t[n].head))},origin:r&&r.origin};return Te(e,"beforeSelectionChange",e,n),e.cm&&Te(e.cm,"beforeSelectionChange",e.cm,n),n.ranges!=t.ranges?zn(n.ranges,n.ranges.length-1):t}function yi(e,t,r){var n=e.history.done,i=g(n);i&&i.ranges?(n[n.length-1]=t,wi(e,t,r)):bi(e,t,r)}function bi(e,t,r){wi(e,t,r),oi(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function wi(e,t,r){(Oe(e,"beforeSelectionChange")||e.cm&&Oe(e.cm,"beforeSelectionChange"))&&(t=mi(e,t,r)),xi(e,Si(e,t,r&&r.bias||(P(t.primary().head,e.sel.primary().head)<0?-1:1),!0)),r&&!1===r.scroll||!e.cm||jr(e.cm)}function xi(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=e.cm.curOp.selectionChanged=!0,Ne(e.cm)),bt(e,"cursorActivity",e))}function Ci(e){xi(e,Si(e,e.sel,null,!1))}function Si(e,t,r,n){for(var i,o=0;o<t.ranges.length;o++){var l=t.ranges[o],s=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],a=ki(e,l.anchor,s&&s.anchor,r,n),u=ki(e,l.head,s&&s.head,r,n);(i||a!=l.anchor||u!=l.head)&&(i||(i=t.ranges.slice(0,o)),i[o]=new Ts(a,u))}return i?zn(i,t.primIndex):t}function Li(e,t,r,n,i){var o=M(e,t.line);if(o.markedSpans)for(var l=0;l<o.markedSpans.length;++l){var s=o.markedSpans[l],a=s.marker;if((null==s.from||(a.inclusiveLeft?s.from<=t.ch:s.from<t.ch))&&(null==s.to||(a.inclusiveRight?s.to>=t.ch:s.to>t.ch))){if(i&&(Te(a,"beforeCursorEnter"),a.explicitlyCleared)){if(o.markedSpans){--l;continue}break}if(!a.atomic)continue;if(r){var u=a.find(n<0?1:-1),c=void 0;if((n<0?a.inclusiveRight:a.inclusiveLeft)&&(u=Ti(e,u,-n,u&&u.line==t.line?o:null)),u&&u.line==t.line&&(c=P(u,r))&&(n<0?c<0:c>0))return Li(e,u,t,n,i)}var f=a.find(n<0?-1:1);return(n<0?a.inclusiveLeft:a.inclusiveRight)&&(f=Ti(e,f,n,f.line==t.line?o:null)),f?Li(e,f,t,n,i):null}}return t}function ki(e,t,r,n,i){var o=n||1,l=Li(e,t,r,o,i)||!i&&Li(e,t,r,o,!0)||Li(e,t,r,-o,i)||!i&&Li(e,t,r,-o,!0);return l||(e.cantEdit=!0,E(e.first,0))}function Ti(e,t,r,n){return r<0&&0==t.ch?t.line>e.first?U(e,E(t.line-1)):null:r>0&&t.ch==(n||M(e,t.line)).text.length?t.line<e.first+e.size-1?E(t.line+1,0):null:new E(t.line,t.ch+r)}function Mi(e){e.setSelection(E(e.firstLine(),0),E(e.lastLine()),Gl)}function Ni(e,t,r){var n={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return n.canceled=!0}};return r&&(n.update=function(t,r,i,o){t&&(n.from=U(e,t)),r&&(n.to=U(e,r)),i&&(n.text=i),void 0!==o&&(n.origin=o)}),Te(e,"beforeChange",e,n),e.cm&&Te(e.cm,"beforeChange",e.cm,n),n.canceled?null:{from:n.from,to:n.to,text:n.text,origin:n.origin}}function Oi(e,t,r){if(e.cm){if(!e.cm.curOp)return dn(e.cm,Oi)(e,t,r);if(e.cm.state.suppressEdits)return}if(!(Oe(e,"beforeChange")||e.cm&&Oe(e.cm,"beforeChange"))||(t=Ni(e,t,!0))){var n=Yl&&!r&&te(e,t.from,t.to);if(n)for(var i=n.length-1;i>=0;--i)Ai(e,{from:n[i].from,to:n[i].to,text:i?[""]:t.text,origin:t.origin});else Ai(e,t)}}function Ai(e,t){if(1!=t.text.length||""!=t.text[0]||0!=P(t.from,t.to)){var r=Un(e,t);ni(e,t,r,e.cm?e.cm.curOp.id:NaN),Hi(e,t,r,J(e,t));var n=[];$n(e,function(e,r){r||-1!=h(n,e.history)||(zi(e.history,t),n.push(e.history)),Hi(e,t,null,J(e,t))})}}function Wi(e,t,r){if(!e.cm||!e.cm.state.suppressEdits||r){for(var n,i=e.history,o=e.sel,l="undo"==t?i.done:i.undone,s="undo"==t?i.undone:i.done,a=0;a<l.length&&(n=l[a],r?!n.ranges||n.equals(e.sel):n.ranges);a++);if(a!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;(n=l.pop()).ranges;){if(li(n,s),r&&!n.equals(e.sel))return void bi(e,n,{clearRedo:!1});o=n}var u=[];li(o,s),s.push({changes:u,generation:i.generation}),i.generation=n.generation||++i.maxGeneration;for(var c=Oe(e,"beforeChange")||e.cm&&Oe(e.cm,"beforeChange"),f=n.changes.length-1;f>=0;--f){var d=function(r){var i=n.changes[r];if(i.origin=t,c&&!Ni(e,i,!1))return l.length=0,{};u.push(ei(e,i));var o=r?Un(e,i):g(l);Hi(e,i,o,ci(e,i)),!r&&e.cm&&e.cm.scrollIntoView({from:i.from,to:Bn(i)});var s=[];$n(e,function(e,t){t||-1!=h(s,e.history)||(zi(e.history,i),s.push(e.history)),Hi(e,i,null,ci(e,i))})}(f);if(d)return d.v}}}}function Di(e,t){if(0!=t&&(e.first+=t,e.sel=new ks(v(e.sel.ranges,function(e){return new Ts(E(e.anchor.line+t,e.anchor.ch),E(e.head.line+t,e.head.ch))}),e.sel.primIndex),e.cm)){vn(e.cm,e.first,e.first-t,t);for(var r=e.cm.display,n=r.viewFrom;n<r.viewTo;n++)mn(e.cm,n,"gutter")}}function Hi(e,t,r,n){if(e.cm&&!e.cm.curOp)return dn(e.cm,Hi)(e,t,r,n);if(t.to.line<e.first)Di(e,t.text.length-1-(t.to.line-t.from.line));else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line);Di(e,i),t={from:E(e.first,0),to:E(t.to.line+i,t.to.ch),text:[g(t.text)],origin:t.origin}}var o=e.lastLine();t.to.line>o&&(t={from:t.from,to:E(o,M(e,o).text.length),text:[t.text[0]],origin:t.origin}),t.removed=N(e,t.from,t.to),r||(r=Un(e,t)),e.cm?Fi(e.cm,t,n):_n(e,t,n),wi(e,r,Gl)}}function Fi(e,t,r){var n=e.doc,i=e.display,o=t.from,l=t.to,s=!1,a=o.line;e.options.lineWrapping||(a=W(fe(M(n,o.line))),n.iter(a,l.line+1,function(e){if(e==i.maxLine)return s=!0,!0})),n.sel.contains(t.from,t.to)>-1&&Ne(e),_n(n,t,r,xr(e)),e.options.lineWrapping||(n.iter(a,o.line+t.text.length,function(e){var t=be(e);t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,s=!1)}),s&&(e.curOp.updateMaxLine=!0)),nt(n,o.line),Cn(e,400);var u=t.text.length-(l.line-o.line)-1;t.full?vn(e):o.line!=l.line||1!=t.text.length||Yn(e.doc,t)?vn(e,o.line,l.line+1,u):mn(e,o.line,"text");var c=Oe(e,"changes"),f=Oe(e,"change");if(f||c){var h={from:o,to:l,text:t.text,removed:t.removed,origin:t.origin};f&&bt(e,"change",e,h),c&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(h)}e.display.selForContextMenu=null}function Ei(e,t,r,n,i){if(n||(n=r),P(n,r)<0){var o;r=(o=[n,r])[0],n=o[1]}"string"==typeof t&&(t=e.splitLines(t)),Oi(e,{from:r,to:n,text:t,origin:i})}function Pi(e,t,r,n){r<e.line?e.line+=n:t<e.line&&(e.line=t,e.ch=0)}function Ii(e,t,r,n){for(var i=0;i<e.length;++i){var o=e[i],l=!0;if(o.ranges){o.copied||((o=e[i]=o.deepCopy()).copied=!0);for(var s=0;s<o.ranges.length;s++)Pi(o.ranges[s].anchor,t,r,n),Pi(o.ranges[s].head,t,r,n)}else{for(var a=0;a<o.changes.length;++a){var u=o.changes[a];if(r<u.from.line)u.from=E(u.from.line+n,u.from.ch),u.to=E(u.to.line+n,u.to.ch);else if(t<=u.to.line){l=!1;break}}l||(e.splice(0,i+1),i=0)}}}function zi(e,t){var r=t.from.line,n=t.to.line,i=t.text.length-(n-r)-1;Ii(e.done,r,n,i),Ii(e.undone,r,n,i)}function Ri(e,t,r,n){var i=t,o=t;return"number"==typeof t?o=M(e,G(e,t)):i=W(t),null==i?null:(n(o,i)&&e.cm&&mn(e.cm,i,r),o)}function Bi(e){var t=this;this.lines=e,this.parent=null;for(var r=0,n=0;n<e.length;++n)e[n].parent=t,r+=e[n].height;this.height=r}function Gi(e){var t=this;this.children=e;for(var r=0,n=0,i=0;i<e.length;++i){var o=e[i];r+=o.chunkSize(),n+=o.height,o.parent=t}this.size=r,this.height=n,this.parent=null}function Ui(e,t,r){ye(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Kr(e,r)}function Vi(e,t,r,n){var i=new Ms(e,r,n),o=e.cm;return o&&i.noHScroll&&(o.display.alignWidgets=!0),Ri(e,t,"widget",function(t){var r=t.widgets||(t.widgets=[]);if(null==i.insertAt?r.push(i):r.splice(Math.min(r.length-1,Math.max(0,i.insertAt)),0,i),i.line=t,o&&!ve(e,t)){var n=ye(t)<e.scrollTop;A(t,t.height+Ht(i)),n&&Kr(o,i.height),o.curOp.forceUpdate=!0}return!0}),bt(o,"lineWidgetAdded",o,i,"number"==typeof t?t:W(t)),i}function Ki(e,t,r,n,o){if(n&&n.shared)return ji(e,t,r,n,o);if(e.cm&&!e.cm.curOp)return dn(e.cm,Ki)(e,t,r,n,o);var l=new Os(e,o),s=P(t,r);if(n&&c(n,l,!1),s>0||0==s&&!1!==l.clearWhenEmpty)return l;if(l.replacedWith&&(l.collapsed=!0,l.widgetNode=i("span",[l.replacedWith],"CodeMirror-widget"),n.handleMouseEvents||l.widgetNode.setAttribute("cm-ignore-events","true"),n.insertLeft&&(l.widgetNode.insertLeft=!0)),l.collapsed){if(ce(e,t.line,t,r,l)||t.line!=r.line&&ce(e,r.line,t,r,l))throw new Error("Inserting collapsed marker partially overlapping an existing one");X()}l.addToHistory&&ni(e,{from:t,to:r,origin:"markText"},e.sel,NaN);var a,u=t.line,f=e.cm;if(e.iter(u,r.line+1,function(e){f&&l.collapsed&&!f.options.lineWrapping&&fe(e)==f.display.maxLine&&(a=!0),l.collapsed&&u!=t.line&&A(e,0),q(e,new Y(l,u==t.line?t.ch:null,u==r.line?r.ch:null)),++u}),l.collapsed&&e.iter(t.line,r.line+1,function(t){ve(e,t)&&A(t,0)}),l.clearOnEnter&&Ql(l,"beforeCursorEnter",function(){return l.clear()}),l.readOnly&&(j(),(e.history.done.length||e.history.undone.length)&&e.clearHistory()),l.collapsed&&(l.id=++Ns,l.atomic=!0),f){if(a&&(f.curOp.updateMaxLine=!0),l.collapsed)vn(f,t.line,r.line+1);else if(l.className||l.title||l.startStyle||l.endStyle||l.css)for(var h=t.line;h<=r.line;h++)mn(f,h,"text");l.atomic&&Ci(f.doc),bt(f,"markerAdded",f,l)}return l}function ji(e,t,r,n,i){(n=c(n)).shared=!1;var o=[Ki(e,t,r,n,i)],l=o[0],s=n.widgetNode;return $n(e,function(e){s&&(n.widgetNode=s.cloneNode(!0)),o.push(Ki(e,U(e,t),U(e,r),n,i));for(var a=0;a<e.linked.length;++a)if(e.linked[a].isParent)return;l=g(o)}),new As(o,l)}function Xi(e){return e.findMarks(E(e.first,0),e.clipPos(E(e.lastLine())),function(e){return e.parent})}function Yi(e,t){for(var r=0;r<t.length;r++){var n=t[r],i=n.find(),o=e.clipPos(i.from),l=e.clipPos(i.to);if(P(o,l)){var s=Ki(e,o,l,n.primary,n.primary.type);n.markers.push(s),s.parent=n}}}function _i(e){for(var t=0;t<e.length;t++)!function(t){var r=e[t],n=[r.primary.doc];$n(r.primary.doc,function(e){return n.push(e)});for(var i=0;i<r.markers.length;i++){var o=r.markers[i];-1==h(n,o.doc)&&(o.parent=null,r.markers.splice(i--,1))}}(t)}function $i(e){var t=this;if(Qi(t),!Me(t,e)&&!Ft(t.display,e)){We(e),gl&&(Hs=+new Date);var r=Sr(t,e,!0),n=e.dataTransfer.files;if(r&&!t.isReadOnly())if(n&&n.length&&window.FileReader&&window.File)for(var i=n.length,o=Array(i),l=0,s=0;s<i;++s)!function(e,n){if(!t.options.allowDropFileTypes||-1!=h(t.options.allowDropFileTypes,e.type)){var s=new FileReader;s.onload=dn(t,function(){var e=s.result;if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),o[n]=e,++l==i){var a={from:r=U(t.doc,r),to:r,text:t.doc.splitLines(o.join(t.doc.lineSeparator())),origin:"paste"};Oi(t.doc,a),yi(t.doc,Rn(r,Bn(a)))}}),s.readAsText(e)}}(n[s],s);else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout(function(){return t.display.input.focus()},20);try{var a=e.dataTransfer.getData("Text");if(a){var u;if(t.state.draggingText&&!t.state.draggingText.copy&&(u=t.listSelections()),wi(t.doc,Rn(r,r)),u)for(var c=0;c<u.length;++c)Ei(t.doc,"",u[c].anchor,u[c].head,"drag");t.replaceSelection(a,"around","paste"),t.display.input.focus()}}catch(e){}}}}function qi(e,t){if(gl&&(!e.state.draggingText||+new Date-Hs<100))Fe(t);else if(!Me(e,t)&&!Ft(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!xl)){var r=n("img",null,null,"position: fixed; left: 0; top: 0;");r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",wl&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),wl&&r.parentNode.removeChild(r)}}function Zi(e,t){var i=Sr(e,t);if(i){var o=document.createDocumentFragment();Mr(e,i,o),e.display.dragCursor||(e.display.dragCursor=n("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),r(e.display.dragCursor,o)}}function Qi(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Ji(e){if(document.getElementsByClassName)for(var t=document.getElementsByClassName("CodeMirror"),r=0;r<t.length;r++){var n=t[r].CodeMirror;n&&e(n)}}function eo(){Fs||(to(),Fs=!0)}function to(){var e;Ql(window,"resize",function(){null==e&&(e=setTimeout(function(){e=null,Ji(ro)},100))}),Ql(window,"blur",function(){return Ji(Fr)})}function ro(e){var t=e.display;t.lastWrapHeight==t.wrapper.clientHeight&&t.lastWrapWidth==t.wrapper.clientWidth||(t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize())}function no(e){var t=e.split(/-(?!$)/);e=t[t.length-1];for(var r,n,i,o,l=0;l<t.length-1;l++){var s=t[l];if(/^(cmd|meta|m)$/i.test(s))o=!0;else if(/^a(lt)?$/i.test(s))r=!0;else if(/^(c|ctrl|control)$/i.test(s))n=!0;else{if(!/^s(hift)?$/i.test(s))throw new Error("Unrecognized modifier name: "+s);i=!0}}return r&&(e="Alt-"+e),n&&(e="Ctrl-"+e),o&&(e="Cmd-"+e),i&&(e="Shift-"+e),e}function io(e){var t={};for(var r in e)if(e.hasOwnProperty(r)){var n=e[r];if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue;if("..."==n){delete e[r];continue}for(var i=v(r.split(" "),no),o=0;o<i.length;o++){var l=void 0,s=void 0;o==i.length-1?(s=i.join(" "),l=n):(s=i.slice(0,o+1).join(" "),l="...");var a=t[s];if(a){if(a!=l)throw new Error("Inconsistent bindings for "+s)}else t[s]=l}delete e[r]}for(var u in t)e[u]=t[u];return e}function oo(e,t,r,n){var i=(t=uo(t)).call?t.call(e,n):t[e];if(!1===i)return"nothing";if("..."===i)return"multi";if(null!=i&&r(i))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return oo(e,t.fallthrough,r,n);for(var o=0;o<t.fallthrough.length;o++){var l=oo(e,t.fallthrough[o],r,n);if(l)return l}}}function lo(e){var t="string"==typeof e?e:Es[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function so(e,t,r){var n=e;return t.altKey&&"Alt"!=n&&(e="Alt-"+e),(Dl?t.metaKey:t.ctrlKey)&&"Ctrl"!=n&&(e="Ctrl-"+e),(Dl?t.ctrlKey:t.metaKey)&&"Cmd"!=n&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=n&&(e="Shift-"+e),e}function ao(e,t){if(wl&&34==e.keyCode&&e.char)return!1;var r=Es[e.keyCode];return null!=r&&!e.altGraphKey&&so(r,e,t)}function uo(e){return"string"==typeof e?Rs[e]:e}function co(e,t){for(var r=e.doc.sel.ranges,n=[],i=0;i<r.length;i++){for(var o=t(r[i]);n.length&&P(o.from,g(n).to)<=0;){var l=n.pop();if(P(l.from,o.from)<0){o.from=l.from;break}}n.push(o)}hn(e,function(){for(var t=n.length-1;t>=0;t--)Ei(e.doc,"",n[t].from,n[t].to,"+delete");jr(e)})}function fo(e,t,r){var n=L(e.text,t+r,r);return n<0||n>e.text.length?null:n}function ho(e,t,r){var n=fo(e,t.ch,r);return null==n?null:new E(t.line,n,r<0?"after":"before")}function po(e,t,r,n,i){if(e){var o=Se(r,t.doc.direction);if(o){var l,s=i<0?g(o):o[0],a=i<0==(1==s.level)?"after":"before";if(s.level>0){var u=Xt(t,r);l=i<0?r.text.length-1:0;var c=Yt(t,u,l).top;l=k(function(e){return Yt(t,u,e).top==c},i<0==(1==s.level)?s.from:s.to-1,l),"before"==a&&(l=fo(r,l,1))}else l=i<0?s.to:s.from;return new E(n,l,a)}}return new E(n,i<0?r.text.length:0,i<0?"before":"after")}function go(e,t,r,n){var i=Se(t,e.doc.direction);if(!i)return ho(t,r,n);r.ch>=t.text.length?(r.ch=t.text.length,r.sticky="before"):r.ch<=0&&(r.ch=0,r.sticky="after");var o=Ce(i,r.ch,r.sticky),l=i[o];if("ltr"==e.doc.direction&&l.level%2==0&&(n>0?l.to>r.ch:l.from<r.ch))return ho(t,r,n);var s,a=function(e,r){return fo(t,e instanceof E?e.ch:e,r)},u=function(r){return e.options.lineWrapping?(s=s||Xt(e,t),hr(e,t,s,r)):{begin:0,end:t.text.length}},c=u("before"==r.sticky?a(r,-1):r.ch);if("rtl"==e.doc.direction||1==l.level){var f=1==l.level==n<0,h=a(r,f?1:-1);if(null!=h&&(f?h<=l.to&&h<=c.end:h>=l.from&&h>=c.begin)){var d=f?"before":"after";return new E(r.line,h,d)}}var p=function(e,t,n){for(var o=function(e,t){return t?new E(r.line,a(e,1),"before"):new E(r.line,e,"after")};e>=0&&e<i.length;e+=t){var l=i[e],s=t>0==(1!=l.level),u=s?n.begin:a(n.end,-1);if(l.from<=u&&u<l.to)return o(u,s);if(u=s?l.from:a(l.to,-1),n.begin<=u&&u<n.end)return o(u,s)}},g=p(o+n,n,c);if(g)return g;var v=n>0?c.end:a(c.begin,-1);return null==v||n>0&&v==t.text.length||!(g=p(n>0?0:i.length-1,n,u(v)))?null:g}function vo(e,t){var r=M(e.doc,t),n=fe(r);return n!=r&&(t=W(n)),po(!0,e,n,t,1)}function mo(e,t){var r=M(e.doc,t),n=he(r);return n!=r&&(t=W(n)),po(!0,e,r,t,-1)}function yo(e,t){var r=vo(e,t.line),n=M(e.doc,r.line),i=Se(n,e.doc.direction);if(!i||0==i[0].level){var o=Math.max(0,n.text.search(/\S/)),l=t.line==r.line&&t.ch<=o&&t.ch;return E(r.line,l?0:o,r.sticky)}return r}function bo(e,t,r){if("string"==typeof t&&!(t=Bs[t]))return!1;e.display.input.ensurePolled();var n=e.display.shift,i=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),i=t(e)!=Bl}finally{e.display.shift=n,e.state.suppressEdits=!1}return i}function wo(e,t,r){for(var n=0;n<e.state.keyMaps.length;n++){var i=oo(t,e.state.keyMaps[n],r,e);if(i)return i}return e.options.extraKeys&&oo(t,e.options.extraKeys,r,e)||oo(t,e.options.keyMap,r,e)}function xo(e,t,r,n){var i=e.state.keySeq;if(i){if(lo(t))return"handled";Gs.set(50,function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())}),t=i+" "+t}var o=wo(e,t,n);return"multi"==o&&(e.state.keySeq=t),"handled"==o&&bt(e,"keyHandled",e,t,r),"handled"!=o&&"multi"!=o||(We(r),Ar(e)),i&&!o&&/\'$/.test(t)?(We(r),!0):!!o}function Co(e,t){var r=ao(t,!0);return!!r&&(t.shiftKey&&!e.state.keySeq?xo(e,"Shift-"+r,t,function(t){return bo(e,t,!0)})||xo(e,r,t,function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return bo(e,t)}):xo(e,r,t,function(t){return bo(e,t)}))}function So(e,t,r){return xo(e,"'"+r+"'",t,function(t){return bo(e,t,!0)})}function Lo(e){var t=this;if(t.curOp.focus=l(),!Me(t,e)){gl&&vl<11&&27==e.keyCode&&(e.returnValue=!1);var r=e.keyCode;t.display.shift=16==r||e.shiftKey;var n=Co(t,e);wl&&(Us=n?r:null,!n&&88==r&&!rs&&(Ml?e.metaKey:e.ctrlKey)&&t.replaceSelection("",null,"cut")),18!=r||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||ko(t)}}function ko(e){function t(e){18!=e.keyCode&&e.altKey||(Fl(r,"CodeMirror-crosshair"),ke(document,"keyup",t),ke(document,"mouseover",t))}var r=e.display.lineDiv;s(r,"CodeMirror-crosshair"),Ql(document,"keyup",t),Ql(document,"mouseover",t)}function To(e){16==e.keyCode&&(this.doc.sel.shift=!1),Me(this,e)}function Mo(e){var t=this;if(!(Ft(t.display,e)||Me(t,e)||e.ctrlKey&&!e.altKey||Ml&&e.metaKey)){var r=e.keyCode,n=e.charCode;if(wl&&r==Us)return Us=null,void We(e);if(!wl||e.which&&!(e.which<10)||!Co(t,e)){var i=String.fromCharCode(null==n?r:n);"\b"!=i&&(So(t,e,i)||t.display.input.onKeyPress(e))}}}function No(e,t){var r=+new Date;return js&&js.compare(r,e,t)?(Ks=js=null,"triple"):Ks&&Ks.compare(r,e,t)?(js=new Vs(r,e,t),Ks=null,"double"):(Ks=new Vs(r,e,t),js=null,"single")}function Oo(e){var t=this,r=t.display;if(!(Me(t,e)||r.activeTouch&&r.input.supportsTouch()))if(r.input.ensurePolled(),r.shift=e.shiftKey,Ft(r,e))ml||(r.scroller.draggable=!1,setTimeout(function(){return r.scroller.draggable=!0},100));else if(!zo(t,e)){var n=Sr(t,e),i=Pe(e),o=n?No(n,i):"single";window.focus(),1==i&&t.state.selectingText&&t.state.selectingText(e),n&&Ao(t,i,n,o,e)||(1==i?n?Do(t,n,o,e):Ee(e)==r.scroller&&We(e):2==i?(n&&di(t.doc,n),setTimeout(function(){return r.input.focus()},20)):3==i&&(Hl?Ro(t,e):Dr(t)))}}function Ao(e,t,r,n,i){var o="Click";return"double"==n?o="Double"+o:"triple"==n&&(o="Triple"+o),o=(1==t?"Left":2==t?"Middle":"Right")+o,xo(e,so(o,i),i,function(t){if("string"==typeof t&&(t=Bs[t]),!t)return!1;var n=!1;try{e.isReadOnly()&&(e.state.suppressEdits=!0),n=t(e,r)!=Bl}finally{e.state.suppressEdits=!1}return n})}function Wo(e,t,r){var n=e.getOption("configureMouse"),i=n?n(e,t,r):{};if(null==i.unit){var o=Nl?r.shiftKey&&r.metaKey:r.altKey;i.unit=o?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||r.shiftKey),null==i.addNew&&(i.addNew=Ml?r.metaKey:r.ctrlKey),null==i.moveOnDrag&&(i.moveOnDrag=!(Ml?r.altKey:r.ctrlKey)),i}function Do(e,t,r,n){gl?setTimeout(u(Wr,e),0):e.curOp.focus=l();var i,o=Wo(e,r,n),s=e.doc.sel;e.options.dragDrop&&Jl&&!e.isReadOnly()&&"single"==r&&(i=s.contains(t))>-1&&(P((i=s.ranges[i]).from(),t)<0||t.xRel>0)&&(P(i.to(),t)>0||t.xRel<0)?Ho(e,n,t,o):Eo(e,n,t,o)}function Ho(e,t,r,n){var i=e.display,o=!1,l=dn(e,function(t){ml&&(i.scroller.draggable=!1),e.state.draggingText=!1,ke(document,"mouseup",l),ke(document,"mousemove",s),ke(i.scroller,"dragstart",a),ke(i.scroller,"drop",l),o||(We(t),n.addNew||di(e.doc,r,null,null,n.extend),ml||gl&&9==vl?setTimeout(function(){document.body.focus(),i.input.focus()},20):i.input.focus())}),s=function(e){o=o||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},a=function(){return o=!0};ml&&(i.scroller.draggable=!0),e.state.draggingText=l,l.copy=!n.moveOnDrag,i.scroller.dragDrop&&i.scroller.dragDrop(),Ql(document,"mouseup",l),Ql(document,"mousemove",s),Ql(i.scroller,"dragstart",a),Ql(i.scroller,"drop",l),Dr(e),setTimeout(function(){return i.input.focus()},20)}function Fo(e,t,r){if("char"==r)return new Ts(t,t);if("word"==r)return e.findWordAt(t);if("line"==r)return new Ts(E(t.line,0),U(e.doc,E(t.line+1,0)));var n=r(e,t);return new Ts(n.from,n.to)}function Eo(e,t,r,n){function i(t){if(0!=P(m,t))if(m=t,"rectangle"==n.unit){for(var i=[],o=e.options.tabSize,l=f(M(u,r.line).text,r.ch,o),s=f(M(u,t.line).text,t.ch,o),a=Math.min(l,s),g=Math.max(l,s),v=Math.min(r.line,t.line),y=Math.min(e.lastLine(),Math.max(r.line,t.line));v<=y;v++){var b=M(u,v).text,w=d(b,a,o);a==g?i.push(new Ts(E(v,w),E(v,w))):b.length>w&&i.push(new Ts(E(v,w),E(v,d(b,g,o))))}i.length||i.push(new Ts(r,r)),bi(u,zn(p.ranges.slice(0,h).concat(i),h),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var x,C=c,S=Fo(e,t,n.unit),L=C.anchor;P(S.anchor,L)>0?(x=S.head,L=B(C.from(),S.anchor)):(x=S.anchor,L=R(C.to(),S.head));var k=p.ranges.slice(0);k[h]=Po(e,new Ts(U(u,L),x)),bi(u,zn(k,h),Ul)}}function o(t){var r=++b,s=Sr(e,t,!0,"rectangle"==n.unit);if(s)if(0!=P(s,m)){e.curOp.focus=l(),i(s);var c=Ir(a,u);(s.line>=c.to||s.line<c.from)&&setTimeout(dn(e,function(){b==r&&o(t)}),150)}else{var f=t.clientY<y.top?-20:t.clientY>y.bottom?20:0;f&&setTimeout(dn(e,function(){b==r&&(a.scroller.scrollTop+=f,o(t))}),50)}}function s(t){e.state.selectingText=!1,b=1/0,We(t),a.input.focus(),ke(document,"mousemove",w),ke(document,"mouseup",x),u.history.lastSelOrigin=null}var a=e.display,u=e.doc;We(t);var c,h,p=u.sel,g=p.ranges;if(n.addNew&&!n.extend?(h=u.sel.contains(r),c=h>-1?g[h]:new Ts(r,r)):(c=u.sel.primary(),h=u.sel.primIndex),"rectangle"==n.unit)n.addNew||(c=new Ts(r,r)),r=Sr(e,t,!0,!0),h=-1;else{var v=Fo(e,r,n.unit);c=n.extend?hi(c,v.anchor,v.head,n.extend):v}n.addNew?-1==h?(h=g.length,bi(u,zn(g.concat([c]),h),{scroll:!1,origin:"*mouse"})):g.length>1&&g[h].empty()&&"char"==n.unit&&!n.extend?(bi(u,zn(g.slice(0,h).concat(g.slice(h+1)),0),{scroll:!1,origin:"*mouse"}),p=u.sel):gi(u,h,c,Ul):(h=0,bi(u,new ks([c],0),Ul),p=u.sel);var m=r,y=a.wrapper.getBoundingClientRect(),b=0,w=dn(e,function(e){Pe(e)?o(e):s(e)}),x=dn(e,s);e.state.selectingText=x,Ql(document,"mousemove",w),Ql(document,"mouseup",x)}function Po(e,t){var r=t.anchor,n=t.head,i=M(e.doc,r.line);if(0==P(r,n)&&r.sticky==n.sticky)return t;var o=Se(i);if(!o)return t;var l=Ce(o,r.ch,r.sticky),s=o[l];if(s.from!=r.ch&&s.to!=r.ch)return t;var a=l+(s.from==r.ch==(1!=s.level)?0:1);if(0==a||a==o.length)return t;var u;if(n.line!=r.line)u=(n.line-r.line)*("ltr"==e.doc.direction?1:-1)>0;else{var c=Ce(o,n.ch,n.sticky),f=c-l||(n.ch-r.ch)*(1==s.level?-1:1);u=c==a-1||c==a?f<0:f>0}var h=o[a+(u?-1:0)],d=u==(1==h.level),p=d?h.from:h.to,g=d?"after":"before";return r.ch==p&&r.sticky==g?t:new Ts(new E(r.line,p,g),n)}function Io(e,t,r,n){var i,o;if(t.touches)i=t.touches[0].clientX,o=t.touches[0].clientY;else try{i=t.clientX,o=t.clientY}catch(t){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1;n&&We(t);var l=e.display,s=l.lineDiv.getBoundingClientRect();if(o>s.bottom||!Oe(e,r))return He(t);o-=s.top-l.viewOffset;for(var a=0;a<e.options.gutters.length;++a){var u=l.gutters.childNodes[a];if(u&&u.getBoundingClientRect().right>=i)return Te(e,r,e,D(e.doc,o),e.options.gutters[a],t),He(t)}}function zo(e,t){return Io(e,t,"gutterClick",!0)}function Ro(e,t){Ft(e.display,t)||Bo(e,t)||Me(e,t,"contextmenu")||e.display.input.onContextMenu(t)}function Bo(e,t){return!!Oe(e,"gutterContextMenu")&&Io(e,t,"gutterContextMenu",!1)}function Go(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),er(e)}function Uo(e){Hn(e),vn(e),zr(e)}function Vo(e,t,r){if(!t!=!(r&&r!=Xs)){var n=e.display.dragFunctions,i=t?Ql:ke;i(e.display.scroller,"dragstart",n.start),i(e.display.scroller,"dragenter",n.enter),i(e.display.scroller,"dragover",n.over),i(e.display.scroller,"dragleave",n.leave),i(e.display.scroller,"drop",n.drop)}}function Ko(e){e.options.lineWrapping?(s(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(Fl(e.display.wrapper,"CodeMirror-wrap"),we(e)),Cr(e),vn(e),er(e),setTimeout(function(){return en(e)},100)}function jo(e,t){var r=this;if(!(this instanceof jo))return new jo(e,t);this.options=t=t?c(t):{},c(Ys,t,!1),Fn(t);var n=t.value;"string"==typeof n&&(n=new Ds(n,t.mode,null,t.lineSeparator,t.direction)),this.doc=n;var i=new jo.inputStyles[t.inputStyle](this),o=this.display=new T(e,n,i);o.wrapper.CodeMirror=this,Hn(this),Go(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),rn(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new Pl,keySeq:null,specialChars:null},t.autofocus&&!Tl&&o.input.focus(),gl&&vl<11&&setTimeout(function(){return r.display.input.reset(!0)},20),Xo(this),eo(),nn(this),this.curOp.forceUpdate=!0,qn(this,n),t.autofocus&&!Tl||this.hasFocus()?setTimeout(u(Hr,this),20):Fr(this);for(var l in _s)_s.hasOwnProperty(l)&&_s[l](r,t[l],Xs);Rr(this),t.finishInit&&t.finishInit(this);for(var s=0;s<$s.length;++s)$s[s](r);on(this),ml&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(o.lineDiv).textRendering&&(o.lineDiv.style.textRendering="auto")}function Xo(e){function t(){i.activeTouch&&(o=setTimeout(function(){return i.activeTouch=null},1e3),(l=i.activeTouch).end=+new Date)}function r(e){if(1!=e.touches.length)return!1;var t=e.touches[0];return t.radiusX<=1&&t.radiusY<=1}function n(e,t){if(null==t.left)return!0;var r=t.left-e.left,n=t.top-e.top;return r*r+n*n>400}var i=e.display;Ql(i.scroller,"mousedown",dn(e,Oo)),gl&&vl<11?Ql(i.scroller,"dblclick",dn(e,function(t){if(!Me(e,t)){var r=Sr(e,t);if(r&&!zo(e,t)&&!Ft(e.display,t)){We(t);var n=e.findWordAt(r);di(e.doc,n.anchor,n.head)}}})):Ql(i.scroller,"dblclick",function(t){return Me(e,t)||We(t)}),Hl||Ql(i.scroller,"contextmenu",function(t){return Ro(e,t)});var o,l={end:0};Ql(i.scroller,"touchstart",function(t){if(!Me(e,t)&&!r(t)&&!zo(e,t)){i.input.ensurePolled(),clearTimeout(o);var n=+new Date;i.activeTouch={start:n,moved:!1,prev:n-l.end<=300?l:null},1==t.touches.length&&(i.activeTouch.left=t.touches[0].pageX,i.activeTouch.top=t.touches[0].pageY)}}),Ql(i.scroller,"touchmove",function(){i.activeTouch&&(i.activeTouch.moved=!0)}),Ql(i.scroller,"touchend",function(r){var o=i.activeTouch;if(o&&!Ft(i,r)&&null!=o.left&&!o.moved&&new Date-o.start<300){var l,s=e.coordsChar(i.activeTouch,"page");l=!o.prev||n(o,o.prev)?new Ts(s,s):!o.prev.prev||n(o,o.prev.prev)?e.findWordAt(s):new Ts(E(s.line,0),U(e.doc,E(s.line+1,0))),e.setSelection(l.anchor,l.head),e.focus(),We(r)}t()}),Ql(i.scroller,"touchcancel",t),Ql(i.scroller,"scroll",function(){i.scroller.clientHeight&&(qr(e,i.scroller.scrollTop),Qr(e,i.scroller.scrollLeft,!0),Te(e,"scroll",e))}),Ql(i.scroller,"mousewheel",function(t){return In(e,t)}),Ql(i.scroller,"DOMMouseScroll",function(t){return In(e,t)}),Ql(i.wrapper,"scroll",function(){return i.wrapper.scrollTop=i.wrapper.scrollLeft=0}),i.dragFunctions={enter:function(t){Me(e,t)||Fe(t)},over:function(t){Me(e,t)||(Zi(e,t),Fe(t))},start:function(t){return qi(e,t)},drop:dn(e,$i),leave:function(t){Me(e,t)||Qi(e)}};var s=i.input.getField();Ql(s,"keyup",function(t){return To.call(e,t)}),Ql(s,"keydown",dn(e,Lo)),Ql(s,"keypress",dn(e,Mo)),Ql(s,"focus",function(t){return Hr(e,t)}),Ql(s,"blur",function(t){return Fr(e,t)})}function Yo(e,t,r,n){var i,o=e.doc;null==r&&(r="add"),"smart"==r&&(o.mode.indent?i=$e(e,t).state:r="prev");var l=e.options.tabSize,s=M(o,t),a=f(s.text,null,l);s.stateAfter&&(s.stateAfter=null);var u,c=s.text.match(/^\s*/)[0];if(n||/\S/.test(s.text)){if("smart"==r&&((u=o.mode.indent(i,s.text.slice(c.length),s.text))==Bl||u>150)){if(!n)return;r="prev"}}else u=0,r="not";"prev"==r?u=t>o.first?f(M(o,t-1).text,null,l):0:"add"==r?u=a+e.options.indentUnit:"subtract"==r?u=a-e.options.indentUnit:"number"==typeof r&&(u=a+r),u=Math.max(0,u);var h="",d=0;if(e.options.indentWithTabs)for(var g=Math.floor(u/l);g;--g)d+=l,h+="\t";if(d<u&&(h+=p(u-d)),h!=c)return Ei(o,h,E(t,0),E(t,c.length),"+input"),s.stateAfter=null,!0;for(var v=0;v<o.sel.ranges.length;v++){var m=o.sel.ranges[v];if(m.head.line==t&&m.head.ch<c.length){var y=E(t,c.length);gi(o,v,new Ts(y,y));break}}}function _o(e){qs=e}function $o(e,t,r,n,i){var o=e.doc;e.display.shift=!1,n||(n=o.sel);var l=e.state.pasteIncoming||"paste"==i,s=es(t),a=null;if(l&&n.ranges.length>1)if(qs&&qs.text.join("\n")==t){if(n.ranges.length%qs.text.length==0){a=[];for(var u=0;u<qs.text.length;u++)a.push(o.splitLines(qs.text[u]))}}else s.length==n.ranges.length&&e.options.pasteLinesPerSelection&&(a=v(s,function(e){return[e]}));for(var c,f=n.ranges.length-1;f>=0;f--){var h=n.ranges[f],d=h.from(),p=h.to();h.empty()&&(r&&r>0?d=E(d.line,d.ch-r):e.state.overwrite&&!l?p=E(p.line,Math.min(M(o,p.line).text.length,p.ch+g(s).length)):qs&&qs.lineWise&&qs.text.join("\n")==t&&(d=p=E(d.line,0))),c=e.curOp.updateInput;var m={from:d,to:p,text:a?a[f%a.length]:s,origin:i||(l?"paste":e.state.cutIncoming?"cut":"+input")};Oi(e.doc,m),bt(e,"inputRead",e,m)}t&&!l&&Zo(e,t),jr(e),e.curOp.updateInput=c,e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=!1}function qo(e,t){var r=e.clipboardData&&e.clipboardData.getData("Text");if(r)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||hn(t,function(){return $o(t,r,0,null,"paste")}),!0}function Zo(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,n=r.ranges.length-1;n>=0;n--){var i=r.ranges[n];if(!(i.head.ch>100||n&&r.ranges[n-1].head.line==i.head.line)){var o=e.getModeAt(i.head),l=!1;if(o.electricChars){for(var s=0;s<o.electricChars.length;s++)if(t.indexOf(o.electricChars.charAt(s))>-1){l=Yo(e,i.head.line,"smart");break}}else o.electricInput&&o.electricInput.test(M(e.doc,i.head.line).text.slice(0,i.head.ch))&&(l=Yo(e,i.head.line,"smart"));l&&bt(e,"electricInput",e,i.head.line)}}}function Qo(e){for(var t=[],r=[],n=0;n<e.doc.sel.ranges.length;n++){var i=e.doc.sel.ranges[n].head.line,o={anchor:E(i,0),head:E(i+1,0)};r.push(o),t.push(e.getRange(o.anchor,o.head))}return{text:t,ranges:r}}function Jo(e,t){e.setAttribute("autocorrect","off"),e.setAttribute("autocapitalize","off"),e.setAttribute("spellcheck",!!t)}function el(){var e=n("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),t=n("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return ml?e.style.width="1000px":e.setAttribute("wrap","off"),Ll&&(e.style.border="1px solid black"),Jo(e),t}function tl(e,t,r,n,i){function o(){var n=t.line+r;return!(n<e.first||n>=e.first+e.size)&&(t=new E(n,t.ch,t.sticky),u=M(e,n))}function l(n){var l;if(null==(l=i?go(e.cm,u,t,r):ho(u,t,r))){if(n||!o())return!1;t=po(i,e.cm,u,t.line,r)}else t=l;return!0}var s=t,a=r,u=M(e,t.line);if("char"==n)l();else if("column"==n)l(!0);else if("word"==n||"group"==n)for(var c=null,f="group"==n,h=e.cm&&e.cm.getHelper(t,"wordChars"),d=!0;!(r<0)||l(!d);d=!1){var p=u.text.charAt(t.ch)||"\n",g=x(p,h)?"w":f&&"\n"==p?"n":!f||/\s/.test(p)?null:"p";if(!f||d||g||(g="s"),c&&c!=g){r<0&&(r=1,l(),t.sticky="after");break}if(g&&(c=g),r>0&&!l(!d))break}var v=ki(e,t,s,a,!0);return I(s,v)&&(v.hitSide=!0),v}function rl(e,t,r,n){var i,o=e.doc,l=t.left;if("page"==n){var s=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),a=Math.max(s-.5*mr(e.display),3);i=(r>0?t.bottom:t.top)+r*a}else"line"==n&&(i=r>0?t.bottom+3:t.top-3);for(var u;(u=cr(e,l,i)).outside;){if(r<0?i<=0:i>=o.height){u.hitSide=!0;break}i+=5*r}return u}function nl(e,t){var r=jt(e,t.line);if(!r||r.hidden)return null;var n=M(e.doc,t.line),i=Ut(r,n,t.line),o=Se(n,e.doc.direction),l="left";o&&(l=Ce(o,t.ch)%2?"right":"left");var s=_t(i.map,t.ch,l);return s.offset="right"==s.collapse?s.end:s.start,s}function il(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0;return!1}function ol(e,t){return t&&(e.bad=!0),e}function ll(e,t,r,n,i){function o(e){return function(t){return t.id==e}}function l(){c&&(u+=f,c=!1)}function s(e){e&&(l(),u+=e)}function a(t){if(1==t.nodeType){var r=t.getAttribute("cm-text");if(null!=r)return void s(r||t.textContent.replace(/\u200b/g,""));var u,h=t.getAttribute("cm-marker");if(h){var d=e.findMarks(E(n,0),E(i+1,0),o(+h));return void(d.length&&(u=d[0].find(0))&&s(N(e.doc,u.from,u.to).join(f)))}if("false"==t.getAttribute("contenteditable"))return;var p=/^(pre|div|p)$/i.test(t.nodeName);p&&l();for(var g=0;g<t.childNodes.length;g++)a(t.childNodes[g]);p&&(c=!0)}else 3==t.nodeType&&s(t.nodeValue)}for(var u="",c=!1,f=e.doc.lineSeparator();a(t),t!=r;)t=t.nextSibling;return u}function sl(e,t,r){var n;if(t==e.display.lineDiv){if(!(n=e.display.lineDiv.childNodes[r]))return ol(e.clipPos(E(e.display.viewTo-1)),!0);t=null,r=0}else for(n=t;;n=n.parentNode){if(!n||n==e.display.lineDiv)return null;if(n.parentNode&&n.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var o=e.display.view[i];if(o.node==n)return al(o,t,r)}}function al(e,t,r){function n(t,r,n){for(var i=-1;i<(f?f.length:0);i++)for(var o=i<0?c.map:f[i],l=0;l<o.length;l+=3){var s=o[l+2];if(s==t||s==r){var a=W(i<0?e.line:e.rest[i]),u=o[l]+n;return(n<0||s!=t)&&(u=o[l+(n?1:0)]),E(a,u)}}}var i=e.text.firstChild,l=!1;if(!t||!o(i,t))return ol(E(W(e.line),0),!0);if(t==i&&(l=!0,t=i.childNodes[r],r=0,!t)){var s=e.rest?g(e.rest):e.line;return ol(E(W(s),s.text.length),l)}var a=3==t.nodeType?t:null,u=t;for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,r&&(r=a.nodeValue.length));u.parentNode!=i;)u=u.parentNode;var c=e.measure,f=c.maps,h=n(a,u,r);if(h)return ol(h,l);for(var d=u.nextSibling,p=a?a.nodeValue.length-r:0;d;d=d.nextSibling){if(h=n(d,d.firstChild,0))return ol(E(h.line,h.ch-p),l);p+=d.textContent.length}for(var v=u.previousSibling,m=r;v;v=v.previousSibling){if(h=n(v,v.firstChild,-1))return ol(E(h.line,h.ch+m),l);m+=v.textContent.length}}var ul=navigator.userAgent,cl=navigator.platform,fl=/gecko\/\d/i.test(ul),hl=/MSIE \d/.test(ul),dl=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ul),pl=/Edge\/(\d+)/.exec(ul),gl=hl||dl||pl,vl=gl&&(hl?document.documentMode||6:+(pl||dl)[1]),ml=!pl&&/WebKit\//.test(ul),yl=ml&&/Qt\/\d+\.\d+/.test(ul),bl=!pl&&/Chrome\//.test(ul),wl=/Opera\//.test(ul),xl=/Apple Computer/.test(navigator.vendor),Cl=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(ul),Sl=/PhantomJS/.test(ul),Ll=!pl&&/AppleWebKit/.test(ul)&&/Mobile\/\w+/.test(ul),kl=/Android/.test(ul),Tl=Ll||kl||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(ul),Ml=Ll||/Mac/.test(cl),Nl=/\bCrOS\b/.test(ul),Ol=/win/i.test(cl),Al=wl&&ul.match(/Version\/(\d*\.\d*)/);Al&&(Al=Number(Al[1])),Al&&Al>=15&&(wl=!1,ml=!0);var Wl,Dl=Ml&&(yl||wl&&(null==Al||Al<12.11)),Hl=fl||gl&&vl>=9,Fl=function(t,r){var n=t.className,i=e(r).exec(n);if(i){var o=n.slice(i.index+i[0].length);t.className=n.slice(0,i.index)+(o?i[1]+o:"")}};Wl=document.createRange?function(e,t,r,n){var i=document.createRange();return i.setEnd(n||e,r),i.setStart(e,t),i}:function(e,t,r){var n=document.body.createTextRange();try{n.moveToElementText(e.parentNode)}catch(e){return n}return n.collapse(!0),n.moveEnd("character",r),n.moveStart("character",t),n};var El=function(e){e.select()};Ll?El=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:gl&&(El=function(e){try{e.select()}catch(e){}});var Pl=function(){this.id=null};Pl.prototype.set=function(e,t){clearTimeout(this.id),this.id=setTimeout(t,e)};var Il,zl,Rl=30,Bl={toString:function(){return"CodeMirror.Pass"}},Gl={scroll:!1},Ul={origin:"*mouse"},Vl={origin:"+move"},Kl=[""],jl=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,Xl=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,Yl=!1,_l=!1,$l=null,ql=function(){function e(e){return e<=247?r.charAt(e):1424<=e&&e<=1524?"R":1536<=e&&e<=1785?n.charAt(e-1536):1774<=e&&e<=2220?"r":8192<=e&&e<=8203?"w":8204==e?"b":"L"}function t(e,t,r){this.level=e,this.from=t,this.to=r}var r="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",n="nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",i=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,o=/[stwN]/,l=/[LRr]/,s=/[Lb1n]/,a=/[1n]/;return function(r,n){var u="ltr"==n?"L":"R";if(0==r.length||"ltr"==n&&!i.test(r))return!1;for(var c=r.length,f=[],h=0;h<c;++h)f.push(e(r.charCodeAt(h)));for(var d=0,p=u;d<c;++d){var v=f[d];"m"==v?f[d]=p:p=v}for(var m=0,y=u;m<c;++m){var b=f[m];"1"==b&&"r"==y?f[m]="n":l.test(b)&&(y=b,"r"==b&&(f[m]="R"))}for(var w=1,x=f[0];w<c-1;++w){var C=f[w];"+"==C&&"1"==x&&"1"==f[w+1]?f[w]="1":","!=C||x!=f[w+1]||"1"!=x&&"n"!=x||(f[w]=x),x=C}for(var S=0;S<c;++S){var L=f[S];if(","==L)f[S]="N";else if("%"==L){var k=void 0;for(k=S+1;k<c&&"%"==f[k];++k);for(var T=S&&"!"==f[S-1]||k<c&&"1"==f[k]?"1":"N",M=S;M<k;++M)f[M]=T;S=k-1}}for(var N=0,O=u;N<c;++N){var A=f[N];"L"==O&&"1"==A?f[N]="L":l.test(A)&&(O=A)}for(var W=0;W<c;++W)if(o.test(f[W])){var D=void 0;for(D=W+1;D<c&&o.test(f[D]);++D);for(var H="L"==(W?f[W-1]:u),F=H==("L"==(D<c?f[D]:u))?H?"L":"R":u,E=W;E<D;++E)f[E]=F;W=D-1}for(var P,I=[],z=0;z<c;)if(s.test(f[z])){var R=z;for(++z;z<c&&s.test(f[z]);++z);I.push(new t(0,R,z))}else{var B=z,G=I.length;for(++z;z<c&&"L"!=f[z];++z);for(var U=B;U<z;)if(a.test(f[U])){B<U&&I.splice(G,0,new t(1,B,U));var V=U;for(++U;U<z&&a.test(f[U]);++U);I.splice(G,0,new t(2,V,U)),B=U}else++U;B<z&&I.splice(G,0,new t(1,B,z))}return 1==I[0].level&&(P=r.match(/^\s+/))&&(I[0].from=P[0].length,I.unshift(new t(0,0,P[0].length))),1==g(I).level&&(P=r.match(/\s+$/))&&(g(I).to-=P[0].length,I.push(new t(0,c-P[0].length,c))),"rtl"==n?I.reverse():I}}(),Zl=[],Ql=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1);else if(e.attachEvent)e.attachEvent("on"+t,r);else{var n=e._handlers||(e._handlers={});n[t]=(n[t]||Zl).concat(r)}},Jl=function(){if(gl&&vl<9)return!1;var e=n("div");return"draggable"in e||"dragDrop"in e}(),es=3!="\n\nb".split(/\n/).length?function(e){for(var t=0,r=[],n=e.length;t<=n;){var i=e.indexOf("\n",t);-1==i&&(i=e.length);var o=e.slice(t,"\r"==e.charAt(i-1)?i-1:i),l=o.indexOf("\r");-1!=l?(r.push(o.slice(0,l)),t+=l+1):(r.push(o),t=i+1)}return r}:function(e){return e.split(/\r\n?|\n/)},ts=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t;try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},rs=function(){var e=n("div");return"oncopy"in e||(e.setAttribute("oncopy","return;"),"function"==typeof e.oncopy)}(),ns=null,is={},os={},ls={},ss=function(e,t,r){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r};ss.prototype.eol=function(){return this.pos>=this.string.length},ss.prototype.sol=function(){return this.pos==this.lineStart},ss.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},ss.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},ss.prototype.eat=function(e){var t=this.string.charAt(this.pos);if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},ss.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},ss.prototype.eatSpace=function(){for(var e=this,t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++e.pos;return this.pos>t},ss.prototype.skipToEnd=function(){this.pos=this.string.length},ss.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos);if(t>-1)return this.pos=t,!0},ss.prototype.backUp=function(e){this.pos-=e},ss.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=f(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?f(this.string,this.lineStart,this.tabSize):0)},ss.prototype.indentation=function(){return f(this.string,null,this.tabSize)-(this.lineStart?f(this.string,this.lineStart,this.tabSize):0)},ss.prototype.match=function(e,t,r){if("string"!=typeof e){var n=this.string.slice(this.pos).match(e);return n&&n.index>0?null:(n&&!1!==t&&(this.pos+=n[0].length),n)}var i=function(e){return r?e.toLowerCase():e};if(i(this.string.substr(this.pos,e.length))==i(e))return!1!==t&&(this.pos+=e.length),!0},ss.prototype.current=function(){return this.string.slice(this.start,this.pos)},ss.prototype.hideFirstChars=function(e,t){this.lineStart+=e;try{return t()}finally{this.lineStart-=e}},ss.prototype.lookAhead=function(e){var t=this.lineOracle;return t&&t.lookAhead(e)};var as=function(e,t){this.state=e,this.lookAhead=t},us=function(e,t,r,n){this.state=t,this.doc=e,this.line=r,this.maxLookAhead=n||0};us.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},us.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},us.fromSaved=function(e,t,r){return t instanceof as?new us(e,Ke(e.mode,t.state),r,t.lookAhead):new us(e,Ke(e.mode,t),r)},us.prototype.save=function(e){var t=!1!==e?Ke(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new as(t,this.maxLookAhead):t};var cs=function(e,t,r){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=r},fs=function(e,t,r){this.text=e,ne(this,t),this.height=r?r(this):1};fs.prototype.lineNo=function(){return W(this)},Ae(fs);var hs,ds={},ps={},gs=null,vs=null,ms={left:0,right:0,top:0,bottom:0},ys=function(e,t,r){this.cm=r;var i=this.vert=n("div",[n("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),o=this.horiz=n("div",[n("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");e(i),e(o),Ql(i,"scroll",function(){i.clientHeight&&t(i.scrollTop,"vertical")}),Ql(o,"scroll",function(){o.clientWidth&&t(o.scrollLeft,"horizontal")}),this.checkedZeroWidth=!1,gl&&vl<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};ys.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,n=e.nativeBarWidth;if(r){this.vert.style.display="block",this.vert.style.bottom=t?n+"px":"0";var i=e.viewHeight-(t?n:0);this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(t){this.horiz.style.display="block",this.horiz.style.right=r?n+"px":"0",this.horiz.style.left=e.barLeft+"px";var o=e.viewWidth-e.barLeft-(r?n:0);this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+o)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&e.clientHeight>0&&(0==n&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?n:0,bottom:t?n:0}},ys.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},ys.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},ys.prototype.zeroWidthHack=function(){var e=Ml&&!Cl?"12px":"18px";this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new Pl,this.disableVert=new Pl},ys.prototype.enableZeroWidthBar=function(e,t,r){function n(){var i=e.getBoundingClientRect();("vert"==r?document.elementFromPoint(i.right-1,(i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2,i.bottom-1))!=e?e.style.pointerEvents="none":t.set(1e3,n)}e.style.pointerEvents="auto",t.set(1e3,n)},ys.prototype.clear=function(){var e=this.horiz.parentNode;e.removeChild(this.horiz),e.removeChild(this.vert)};var bs=function(){};bs.prototype.update=function(){return{bottom:0,right:0}},bs.prototype.setScrollLeft=function(){},bs.prototype.setScrollTop=function(){},bs.prototype.clear=function(){};var ws={native:ys,null:bs},xs=0,Cs=function(e,t,r){var n=e.display;this.viewport=t,this.visible=Ir(n,e.doc,t),this.editorIsHidden=!n.wrapper.offsetWidth,this.wrapperHeight=n.wrapper.clientHeight,this.wrapperWidth=n.wrapper.clientWidth,this.oldDisplayWidth=Rt(e),this.force=r,this.dims=br(e),this.events=[]};Cs.prototype.signal=function(e,t){Oe(e,t)&&this.events.push(arguments)},Cs.prototype.finish=function(){for(var e=this,t=0;t<this.events.length;t++)Te.apply(null,e.events[t])};var Ss=0,Ls=null;gl?Ls=-.53:fl?Ls=15:bl?Ls=-.7:xl&&(Ls=-1/3);var ks=function(e,t){this.ranges=e,this.primIndex=t};ks.prototype.primary=function(){return this.ranges[this.primIndex]},ks.prototype.equals=function(e){var t=this;if(e==this)return!0;if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1;for(var r=0;r<this.ranges.length;r++){var n=t.ranges[r],i=e.ranges[r];if(!I(n.anchor,i.anchor)||!I(n.head,i.head))return!1}return!0},ks.prototype.deepCopy=function(){for(var e=this,t=[],r=0;r<this.ranges.length;r++)t[r]=new Ts(z(e.ranges[r].anchor),z(e.ranges[r].head));return new ks(t,this.primIndex)},ks.prototype.somethingSelected=function(){for(var e=this,t=0;t<this.ranges.length;t++)if(!e.ranges[t].empty())return!0;return!1},ks.prototype.contains=function(e,t){var r=this;t||(t=e);for(var n=0;n<this.ranges.length;n++){var i=r.ranges[n];if(P(t,i.from())>=0&&P(e,i.to())<=0)return n}return-1};var Ts=function(e,t){this.anchor=e,this.head=t};Ts.prototype.from=function(){return B(this.anchor,this.head)},Ts.prototype.to=function(){return R(this.anchor,this.head)},Ts.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},Bi.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=this,n=e,i=e+t;n<i;++n){var o=r.lines[n];r.height-=o.height,ot(o),bt(o,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){var n=this;this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e));for(var i=0;i<t.length;++i)t[i].parent=n},iterN:function(e,t,r){for(var n=this,i=e+t;e<i;++e)if(r(n.lines[e]))return!0}},Gi.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){var r=this;this.size-=t;for(var n=0;n<this.children.length;++n){var i=r.children[n],o=i.chunkSize();if(e<o){var l=Math.min(t,o-e),s=i.height;if(i.removeInner(e,l),r.height-=s-i.height,o==l&&(r.children.splice(n--,1),i.parent=null),0==(t-=l))break;e=0}else e-=o}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof Bi))){var a=[];this.collapse(a),this.children=[new Bi(a)],this.children[0].parent=this}},collapse:function(e){for(var t=this,r=0;r<this.children.length;++r)t.children[r].collapse(e)},insertInner:function(e,t,r){var n=this;this.size+=t.length,this.height+=r;for(var i=0;i<this.children.length;++i){var o=n.children[i],l=o.chunkSize();if(e<=l){if(o.insertInner(e,t,r),o.lines&&o.lines.length>50){for(var s=o.lines.length%25+25,a=s;a<o.lines.length;){var u=new Bi(o.lines.slice(a,a+=25));o.height-=u.height,n.children.splice(++i,0,u),u.parent=n}o.lines=o.lines.slice(0,s),n.maybeSpill()}break}e-=l}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this;do{var t=new Gi(e.children.splice(e.children.length-5,5));if(e.parent){e.size-=t.size,e.height-=t.height;var r=h(e.parent.children,e);e.parent.children.splice(r+1,0,t)}else{var n=new Gi(e.children);n.parent=e,e.children=[n,t],e=n}t.parent=e.parent}while(e.children.length>10);e.parent.maybeSpill()}},iterN:function(e,t,r){for(var n=this,i=0;i<this.children.length;++i){var o=n.children[i],l=o.chunkSize();if(e<l){var s=Math.min(t,l-e);if(o.iterN(e,s,r))return!0;if(0==(t-=s))break;e=0}else e-=l}}};var Ms=function(e,t,r){var n=this;if(r)for(var i in r)r.hasOwnProperty(i)&&(n[i]=r[i]);this.doc=e,this.node=t};Ms.prototype.clear=function(){var e=this,t=this.doc.cm,r=this.line.widgets,n=this.line,i=W(n);if(null!=i&&r){for(var o=0;o<r.length;++o)r[o]==e&&r.splice(o--,1);r.length||(n.widgets=null);var l=Ht(this);A(n,Math.max(0,n.height-l)),t&&(hn(t,function(){Ui(t,n,-l),mn(t,i,"widget")}),bt(t,"lineWidgetCleared",t,this,i))}},Ms.prototype.changed=function(){var e=this,t=this.height,r=this.doc.cm,n=this.line;this.height=null;var i=Ht(this)-t;i&&(A(n,n.height+i),r&&hn(r,function(){r.curOp.forceUpdate=!0,Ui(r,n,i),bt(r,"lineWidgetChanged",r,e,W(n))}))},Ae(Ms);var Ns=0,Os=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++Ns};Os.prototype.clear=function(){var e=this;if(!this.explicitlyCleared){var t=this.doc.cm,r=t&&!t.curOp;if(r&&nn(t),Oe(this,"clear")){var n=this.find();n&&bt(this,"clear",n.from,n.to)}for(var i=null,o=null,l=0;l<this.lines.length;++l){var s=e.lines[l],a=_(s.markedSpans,e);t&&!e.collapsed?mn(t,W(s),"text"):t&&(null!=a.to&&(o=W(s)),null!=a.from&&(i=W(s))),s.markedSpans=$(s.markedSpans,a),null==a.from&&e.collapsed&&!ve(e.doc,s)&&t&&A(s,mr(t.display))}if(t&&this.collapsed&&!t.options.lineWrapping)for(var u=0;u<this.lines.length;++u){var c=fe(e.lines[u]),f=be(c);f>t.display.maxLineLength&&(t.display.maxLine=c,t.display.maxLineLength=f,t.display.maxLineChanged=!0)}null!=i&&t&&this.collapsed&&vn(t,i,o+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,t&&Ci(t.doc)),t&&bt(t,"markerCleared",t,this,i,o),r&&on(t),this.parent&&this.parent.clear()}},Os.prototype.find=function(e,t){var r=this;null==e&&"bookmark"==this.type&&(e=1);for(var n,i,o=0;o<this.lines.length;++o){var l=r.lines[o],s=_(l.markedSpans,r);if(null!=s.from&&(n=E(t?l:W(l),s.from),-1==e))return n;if(null!=s.to&&(i=E(t?l:W(l),s.to),1==e))return i}return n&&{from:n,to:i}},Os.prototype.changed=function(){var e=this,t=this.find(-1,!0),r=this,n=this.doc.cm;t&&n&&hn(n,function(){var i=t.line,o=W(t.line),l=jt(n,o);if(l&&(Qt(l),n.curOp.selectionChanged=n.curOp.forceUpdate=!0),n.curOp.updateMaxLine=!0,!ve(r.doc,i)&&null!=r.height){var s=r.height;r.height=null;var a=Ht(r)-s;a&&A(i,i.height+a)}bt(n,"markerChanged",n,e)})},Os.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;t.maybeHiddenMarkers&&-1!=h(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Os.prototype.detachLine=function(e){if(this.lines.splice(h(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},Ae(Os);var As=function(e,t){var r=this;this.markers=e,this.primary=t;for(var n=0;n<e.length;++n)e[n].parent=r};As.prototype.clear=function(){var e=this;if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var t=0;t<this.markers.length;++t)e.markers[t].clear();bt(this,"clear")}},As.prototype.find=function(e,t){return this.primary.find(e,t)},Ae(As);var Ws=0,Ds=function(e,t,r,n,i){if(!(this instanceof Ds))return new Ds(e,t,r,n,i);null==r&&(r=0),Gi.call(this,[new Bi([new fs("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=r;var o=E(r,0);this.sel=Rn(o),this.history=new Jn(null),this.id=++Ws,this.modeOption=t,this.lineSep=n,this.direction="rtl"==i?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),_n(this,{from:o,to:o,text:e}),bi(this,Rn(o),Gl)};Ds.prototype=b(Gi.prototype,{constructor:Ds,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,n=0;n<t.length;++n)r+=t[n].height;this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=O(this,this.first,this.first+this.size);return!1===e?t:t.join(e||this.lineSeparator())},setValue:gn(function(e){var t=E(this.first,0),r=this.first+this.size-1;Oi(this,{from:t,to:E(r,M(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Xr(this.cm,0,0),bi(this,Rn(t),Gl)}),replaceRange:function(e,t,r,n){Ei(this,e,t=U(this,t),r=r?U(this,r):t,n)},getRange:function(e,t,r){var n=N(this,U(this,e),U(this,t));return!1===r?n:n.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e);return t&&t.text},getLineHandle:function(e){if(H(this,e))return M(this,e)},getLineNumber:function(e){return W(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=M(this,e)),fe(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return U(this,e)},getCursor:function(e){var t=this.sel.primary();return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:gn(function(e,t,r){vi(this,U(this,"number"==typeof e?E(e,t||0):e),null,r)}),setSelection:gn(function(e,t,r){vi(this,U(this,e),U(this,t||e),r)}),extendSelection:gn(function(e,t,r){di(this,U(this,e),t&&U(this,t),r)}),extendSelections:gn(function(e,t){pi(this,K(this,e),t)}),extendSelectionsBy:gn(function(e,t){pi(this,K(this,v(this.sel.ranges,e)),t)}),setSelections:gn(function(e,t,r){var n=this;if(e.length){for(var i=[],o=0;o<e.length;o++)i[o]=new Ts(U(n,e[o].anchor),U(n,e[o].head));null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),bi(this,zn(i,t),r)}}),addSelection:gn(function(e,t,r){var n=this.sel.ranges.slice(0);n.push(new Ts(U(this,e),U(this,t||e))),bi(this,zn(n,n.length-1),r)}),getSelection:function(e){for(var t,r=this,n=this.sel.ranges,i=0;i<n.length;i++){var o=N(r,n[i].from(),n[i].to());t=t?t.concat(o):o}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=this,r=[],n=this.sel.ranges,i=0;i<n.length;i++){var o=N(t,n[i].from(),n[i].to());!1!==e&&(o=o.join(e||t.lineSeparator())),r[i]=o}return r},replaceSelection:function(e,t,r){for(var n=[],i=0;i<this.sel.ranges.length;i++)n[i]=e;this.replaceSelections(n,t,r||"+input")},replaceSelections:gn(function(e,t,r){for(var n=this,i=[],o=this.sel,l=0;l<o.ranges.length;l++){var s=o.ranges[l];i[l]={from:s.from(),to:s.to(),text:n.splitLines(e[l]),origin:r}}for(var a=t&&"end"!=t&&Kn(this,i,t),u=i.length-1;u>=0;u--)Oi(n,i[u]);a?yi(this,a):this.cm&&jr(this.cm)}),undo:gn(function(){Wi(this,"undo")}),redo:gn(function(){Wi(this,"redo")}),undoSelection:gn(function(){Wi(this,"undo",!0)}),redoSelection:gn(function(){Wi(this,"redo",!0)}),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,n=0;n<e.done.length;n++)e.done[n].ranges||++t;for(var i=0;i<e.undone.length;i++)e.undone[i].ranges||++r;return{undo:t,redo:r}},clearHistory:function(){this.history=new Jn(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:fi(this.history.done),undone:fi(this.history.undone)}},setHistory:function(e){var t=this.history=new Jn(this.history.maxGeneration);t.done=fi(e.done.slice(0),null,!0),t.undone=fi(e.undone.slice(0),null,!0)},setGutterMarker:gn(function(e,t,r){return Ri(this,e,"gutter",function(e){var n=e.gutterMarkers||(e.gutterMarkers={});return n[t]=r,!r&&C(n)&&(e.gutterMarkers=null),!0})}),clearGutter:gn(function(e){var t=this;this.iter(function(r){r.gutterMarkers&&r.gutterMarkers[e]&&Ri(t,r,"gutter",function(){return r.gutterMarkers[e]=null,C(r.gutterMarkers)&&(r.gutterMarkers=null),!0})})}),lineInfo:function(e){var t;if("number"==typeof e){if(!H(this,e))return null;if(t=e,!(e=M(this,e)))return null}else if(null==(t=W(e)))return null;return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:gn(function(t,r,n){return Ri(this,t,"gutter"==r?"gutter":"class",function(t){var i="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass";if(t[i]){if(e(n).test(t[i]))return!1;t[i]+=" "+n}else t[i]=n;return!0})}),removeLineClass:gn(function(t,r,n){return Ri(this,t,"gutter"==r?"gutter":"class",function(t){var i="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass",o=t[i];if(!o)return!1;if(null==n)t[i]=null;else{var l=o.match(e(n));if(!l)return!1;var s=l.index+l[0].length;t[i]=o.slice(0,l.index)+(l.index&&s!=o.length?" ":"")+o.slice(s)||null}return!0})}),addLineWidget:gn(function(e,t,r){return Vi(this,e,t,r)}),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return Ki(this,U(this,e),U(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents};return e=U(this,e),Ki(this,e,e,r,"bookmark")},findMarksAt:function(e){var t=[],r=M(this,(e=U(this,e)).line).markedSpans;if(r)for(var n=0;n<r.length;++n){var i=r[n];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,r){e=U(this,e),t=U(this,t);var n=[],i=e.line;return this.iter(e.line,t.line+1,function(o){var l=o.markedSpans;if(l)for(var s=0;s<l.length;s++){var a=l[s];null!=a.to&&i==e.line&&e.ch>=a.to||null==a.from&&i!=e.line||null!=a.from&&i==t.line&&a.from>=t.ch||r&&!r(a.marker)||n.push(a.marker.parent||a.marker)}++i}),n},getAllMarks:function(){var e=[];return this.iter(function(t){var r=t.markedSpans;if(r)for(var n=0;n<r.length;++n)null!=r[n].from&&e.push(r[n].marker)}),e},posFromIndex:function(e){var t,r=this.first,n=this.lineSeparator().length;return this.iter(function(i){var o=i.text.length+n;if(o>e)return t=e,!0;e-=o,++r}),U(this,E(r,t))},indexFromPos:function(e){var t=(e=U(this,e)).ch;if(e.line<this.first||e.ch<0)return 0;var r=this.lineSeparator().length;return this.iter(this.first,e.line,function(e){t+=e.text.length+r}),t},copy:function(e){var t=new Ds(O(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={});var t=this.first,r=this.first+this.size;null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to);var n=new Ds(O(this,t,r),e.mode||this.modeOption,t,this.lineSep,this.direction);return e.sharedHist&&(n.history=this.history),(this.linked||(this.linked=[])).push({doc:n,sharedHist:e.sharedHist}),n.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],Yi(n,Xi(this)),n},unlinkDoc:function(e){var t=this;if(e instanceof jo&&(e=e.doc),this.linked)for(var r=0;r<this.linked.length;++r)if(t.linked[r].doc==e){t.linked.splice(r,1),e.unlinkDoc(t),_i(Xi(t));break}if(e.history==this.history){var n=[e.id];$n(e,function(e){return n.push(e.id)},!0),e.history=new Jn(null),e.history.done=fi(this.history.done,n),e.history.undone=fi(this.history.undone,n)}},iterLinkedDocs:function(e){$n(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):es(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:gn(function(e){"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter(function(e){return e.order=null}),this.cm&&Qn(this.cm))})}),Ds.prototype.eachLine=Ds.prototype.iter;for(var Hs=0,Fs=!1,Es={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},Ps=0;Ps<10;Ps++)Es[Ps+48]=Es[Ps+96]=String(Ps);for(var Is=65;Is<=90;Is++)Es[Is]=String.fromCharCode(Is);for(var zs=1;zs<=12;zs++)Es[zs+111]=Es[zs+63235]="F"+zs;var Rs={};Rs.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},Rs.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},Rs.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},Rs.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},Rs.default=Ml?Rs.macDefault:Rs.pcDefault;var Bs={selectAll:Mi,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),Gl)},killLine:function(e){return co(e,function(t){if(t.empty()){var r=M(e.doc,t.head.line).text.length;return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:E(t.head.line+1,0)}:{from:t.head,to:E(t.head.line,r)}}return{from:t.from(),to:t.to()}})},deleteLine:function(e){return co(e,function(t){return{from:E(t.from().line,0),to:U(e.doc,E(t.to().line+1,0))}})},delLineLeft:function(e){return co(e,function(e){return{from:E(e.from().line,0),to:e.from()}})},delWrappedLineLeft:function(e){return co(e,function(t){var r=e.charCoords(t.head,"div").top+5;return{from:e.coordsChar({left:0,top:r},"div"),to:t.from()}})},delWrappedLineRight:function(e){return co(e,function(t){var r=e.charCoords(t.head,"div").top+5,n=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div");return{from:t.from(),to:n}})},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(E(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(E(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy(function(t){return vo(e,t.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy(function(t){return yo(e,t.head)},{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy(function(t){return mo(e,t.head.line)},{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")},Vl)},goLineLeft:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5;return e.coordsChar({left:0,top:r},"div")},Vl)},goLineLeftSmart:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5,n=e.coordsChar({left:0,top:r},"div");return n.ch<e.getLine(n.line).search(/\S/)?yo(e,t.head):n},Vl)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"char")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),n=e.options.tabSize,i=0;i<r.length;i++){var o=r[i].from(),l=f(e.getLine(o.line),o.ch,n);t.push(p(n-l%n))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return hn(e,function(){for(var t=e.listSelections(),r=[],n=0;n<t.length;n++)if(t[n].empty()){var i=t[n].head,o=M(e.doc,i.line).text;if(o)if(i.ch==o.length&&(i=new E(i.line,i.ch-1)),i.ch>0)i=new E(i.line,i.ch+1),e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),E(i.line,i.ch-2),i,"+transpose");else if(i.line>e.doc.first){var l=M(e.doc,i.line-1).text;l&&(i=new E(i.line,1),e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+l.charAt(l.length-1),E(i.line-1,l.length-1),i,"+transpose"))}r.push(new Ts(i,i))}e.setSelections(r)})},newlineAndIndent:function(e){return hn(e,function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange(e.doc.lineSeparator(),t[r].anchor,t[r].head,"+input");t=e.listSelections();for(var n=0;n<t.length;n++)e.indentLine(t[n].from().line,null,!0);jr(e)})},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}},Gs=new Pl,Us=null,Vs=function(e,t,r){this.time=e,this.pos=t,this.button=r};Vs.prototype.compare=function(e,t,r){return this.time+400>e&&0==P(t,this.pos)&&r==this.button};var Ks,js,Xs={toString:function(){return"CodeMirror.Init"}},Ys={},_s={};jo.defaults=Ys,jo.optionHandlers=_s;var $s=[];jo.defineInitHook=function(e){return $s.push(e)};var qs=null,Zs=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new Pl,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};Zs.prototype.init=function(e){function t(e){if(!Me(i,e)){if(i.somethingSelected())_o({lineWise:!1,text:i.getSelections()}),"cut"==e.type&&i.replaceSelection("",null,"cut");else{if(!i.options.lineWiseCopyCut)return;var t=Qo(i);_o({lineWise:!0,text:t.text}),"cut"==e.type&&i.operation(function(){i.setSelections(t.ranges,0,Gl),i.replaceSelection("",null,"cut")})}if(e.clipboardData){e.clipboardData.clearData();var r=qs.text.join("\n");if(e.clipboardData.setData("Text",r),e.clipboardData.getData("Text")==r)return void e.preventDefault()}var l=el(),s=l.firstChild;i.display.lineSpace.insertBefore(l,i.display.lineSpace.firstChild),s.value=qs.text.join("\n");var a=document.activeElement;El(s),setTimeout(function(){i.display.lineSpace.removeChild(l),a.focus(),a==o&&n.showPrimarySelection()},50)}}var r=this,n=this,i=n.cm,o=n.div=e.lineDiv;Jo(o,i.options.spellcheck),Ql(o,"paste",function(e){Me(i,e)||qo(e,i)||vl<=11&&setTimeout(dn(i,function(){return r.updateFromDOM()}),20)}),Ql(o,"compositionstart",function(e){r.composing={data:e.data,done:!1}}),Ql(o,"compositionupdate",function(e){r.composing||(r.composing={data:e.data,done:!1})}),Ql(o,"compositionend",function(e){r.composing&&(e.data!=r.composing.data&&r.readFromDOMSoon(),r.composing.done=!0)}),Ql(o,"touchstart",function(){return n.forceCompositionEnd()}),Ql(o,"input",function(){r.composing||r.readFromDOMSoon()}),Ql(o,"copy",t),Ql(o,"cut",t)},Zs.prototype.prepareSelection=function(){var e=Tr(this.cm,!1);return e.focus=this.cm.state.focused,e},Zs.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Zs.prototype.showPrimarySelection=function(){var e=window.getSelection(),t=this.cm,r=t.doc.sel.primary(),n=r.from(),i=r.to();if(t.display.viewTo==t.display.viewFrom||n.line>=t.display.viewTo||i.line<t.display.viewFrom)e.removeAllRanges();else{var o=sl(t,e.anchorNode,e.anchorOffset),l=sl(t,e.focusNode,e.focusOffset);if(!o||o.bad||!l||l.bad||0!=P(B(o,l),n)||0!=P(R(o,l),i)){var s=t.display.view,a=n.line>=t.display.viewFrom&&nl(t,n)||{node:s[0].measure.map[2],offset:0},u=i.line<t.display.viewTo&&nl(t,i);if(!u){var c=s[s.length-1].measure,f=c.maps?c.maps[c.maps.length-1]:c.map;u={node:f[f.length-1],offset:f[f.length-2]-f[f.length-3]}}if(a&&u){var h,d=e.rangeCount&&e.getRangeAt(0);try{h=Wl(a.node,a.offset,u.offset,u.node)}catch(e){}h&&(!fl&&t.state.focused?(e.collapse(a.node,a.offset),h.collapsed||(e.removeAllRanges(),e.addRange(h))):(e.removeAllRanges(),e.addRange(h)),d&&null==e.anchorNode?e.addRange(d):fl&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Zs.prototype.startGracePeriod=function(){var e=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation(function(){return e.cm.curOp.selectionChanged=!0})},20)},Zs.prototype.showMultipleSelections=function(e){r(this.cm.display.cursorDiv,e.cursors),r(this.cm.display.selectionDiv,e.selection)},Zs.prototype.rememberSelection=function(){var e=window.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Zs.prototype.selectionInEditor=function(){var e=window.getSelection();if(!e.rangeCount)return!1;var t=e.getRangeAt(0).commonAncestorContainer;return o(this.div,t)},Zs.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Zs.prototype.blur=function(){this.div.blur()},Zs.prototype.getField=function(){return this.div},Zs.prototype.supportsTouch=function(){return!0},Zs.prototype.receivedFocus=function(){function e(){t.cm.state.focused&&(t.pollSelection(),t.polling.set(t.cm.options.pollInterval,e))}var t=this;this.selectionInEditor()?this.pollSelection():hn(this.cm,function(){return t.cm.curOp.selectionChanged=!0}),this.polling.set(this.cm.options.pollInterval,e)},Zs.prototype.selectionChanged=function(){var e=window.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Zs.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=window.getSelection(),t=this.cm;if(kl&&bl&&this.cm.options.gutters.length&&il(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(!this.composing){this.rememberSelection();var r=sl(t,e.anchorNode,e.anchorOffset),n=sl(t,e.focusNode,e.focusOffset);r&&n&&hn(t,function(){bi(t.doc,Rn(r,n),Gl),(r.bad||n.bad)&&(t.curOp.selectionChanged=!0)})}}},Zs.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var e=this.cm,t=e.display,r=e.doc.sel.primary(),n=r.from(),i=r.to();if(0==n.ch&&n.line>e.firstLine()&&(n=E(n.line-1,M(e.doc,n.line-1).length)),i.ch==M(e.doc,i.line).text.length&&i.line<e.lastLine()&&(i=E(i.line+1,0)),n.line<t.viewFrom||i.line>t.viewTo-1)return!1;var o,l,s;n.line==t.viewFrom||0==(o=Lr(e,n.line))?(l=W(t.view[0].line),s=t.view[0].node):(l=W(t.view[o].line),s=t.view[o-1].node.nextSibling);var a,u,c=Lr(e,i.line);if(c==t.view.length-1?(a=t.viewTo-1,u=t.lineDiv.lastChild):(a=W(t.view[c+1].line)-1,u=t.view[c+1].node.previousSibling),!s)return!1;for(var f=e.doc.splitLines(ll(e,s,u,l,a)),h=N(e.doc,E(l,0),E(a,M(e.doc,a).text.length));f.length>1&&h.length>1;)if(g(f)==g(h))f.pop(),h.pop(),a--;else{if(f[0]!=h[0])break;f.shift(),h.shift(),l++}for(var d=0,p=0,v=f[0],m=h[0],y=Math.min(v.length,m.length);d<y&&v.charCodeAt(d)==m.charCodeAt(d);)++d;for(var b=g(f),w=g(h),x=Math.min(b.length-(1==f.length?d:0),w.length-(1==h.length?d:0));p<x&&b.charCodeAt(b.length-p-1)==w.charCodeAt(w.length-p-1);)++p;if(1==f.length&&1==h.length&&l==n.line)for(;d&&d>n.ch&&b.charCodeAt(b.length-p-1)==w.charCodeAt(w.length-p-1);)d--,p++;f[f.length-1]=b.slice(0,b.length-p).replace(/^\u200b+/,""),f[0]=f[0].slice(d).replace(/\u200b+$/,"");var C=E(l,d),S=E(a,h.length?g(h).length-p:0);return f.length>1||f[0]||P(C,S)?(Ei(e.doc,f,C,S,"+input"),!0):void 0},Zs.prototype.ensurePolled=function(){this.forceCompositionEnd()},Zs.prototype.reset=function(){this.forceCompositionEnd()},Zs.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Zs.prototype.readFromDOMSoon=function(){var e=this;null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout(function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return;e.composing=null}e.updateFromDOM()},80))},Zs.prototype.updateFromDOM=function(){var e=this;!this.cm.isReadOnly()&&this.pollContent()||hn(this.cm,function(){return vn(e.cm)})},Zs.prototype.setUneditable=function(e){e.contentEditable="false"},Zs.prototype.onKeyPress=function(e){0!=e.charCode&&(e.preventDefault(),this.cm.isReadOnly()||dn(this.cm,$o)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Zs.prototype.readOnlyChanged=function(e){this.div.contentEditable=String("nocursor"!=e)},Zs.prototype.onContextMenu=function(){},Zs.prototype.resetPosition=function(){},Zs.prototype.needsContentAttribute=!0;var Qs=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new Pl,this.hasSelection=!1,this.composing=null};Qs.prototype.init=function(e){function t(e){if(!Me(i,e)){if(i.somethingSelected())_o({lineWise:!1,text:i.getSelections()});else{if(!i.options.lineWiseCopyCut)return;var t=Qo(i);_o({lineWise:!0,text:t.text}),"cut"==e.type?i.setSelections(t.ranges,null,Gl):(n.prevInput="",l.value=t.text.join("\n"),El(l))}"cut"==e.type&&(i.state.cutIncoming=!0)}}var r=this,n=this,i=this.cm,o=this.wrapper=el(),l=this.textarea=o.firstChild;e.wrapper.insertBefore(o,e.wrapper.firstChild),Ll&&(l.style.width="0px"),Ql(l,"input",function(){gl&&vl>=9&&r.hasSelection&&(r.hasSelection=null),n.poll()}),Ql(l,"paste",function(e){Me(i,e)||qo(e,i)||(i.state.pasteIncoming=!0,n.fastPoll())}),Ql(l,"cut",t),Ql(l,"copy",t),Ql(e.scroller,"paste",function(t){Ft(e,t)||Me(i,t)||(i.state.pasteIncoming=!0,n.focus())}),Ql(e.lineSpace,"selectstart",function(t){Ft(e,t)||We(t)}),Ql(l,"compositionstart",function(){var e=i.getCursor("from");n.composing&&n.composing.range.clear(),n.composing={start:e,range:i.markText(e,i.getCursor("to"),{className:"CodeMirror-composing"})}}),Ql(l,"compositionend",function(){n.composing&&(n.poll(),n.composing.range.clear(),n.composing=null)})},Qs.prototype.prepareSelection=function(){var e=this.cm,t=e.display,r=e.doc,n=Tr(e);if(e.options.moveInputWithCursor){var i=sr(e,r.sel.primary().head,"div"),o=t.wrapper.getBoundingClientRect(),l=t.lineDiv.getBoundingClientRect();n.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+l.top-o.top)),n.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+l.left-o.left))}return n},Qs.prototype.showSelection=function(e){var t=this.cm.display;r(t.cursorDiv,e.cursors),r(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},Qs.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var t=this.cm;if(t.somethingSelected()){this.prevInput="";var r=t.getSelection();this.textarea.value=r,t.state.focused&&El(this.textarea),gl&&vl>=9&&(this.hasSelection=r)}else e||(this.prevInput=this.textarea.value="",gl&&vl>=9&&(this.hasSelection=null))}},Qs.prototype.getField=function(){return this.textarea},Qs.prototype.supportsTouch=function(){return!1},Qs.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!Tl||l()!=this.textarea))try{this.textarea.focus()}catch(e){}},Qs.prototype.blur=function(){this.textarea.blur()},Qs.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},Qs.prototype.receivedFocus=function(){this.slowPoll()},Qs.prototype.slowPoll=function(){var e=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,function(){e.poll(),e.cm.state.focused&&e.slowPoll()})},Qs.prototype.fastPoll=function(){function e(){r.poll()||t?(r.pollingFast=!1,r.slowPoll()):(t=!0,r.polling.set(60,e))}var t=!1,r=this;r.pollingFast=!0,r.polling.set(20,e)},Qs.prototype.poll=function(){var e=this,t=this.cm,r=this.textarea,n=this.prevInput;if(this.contextMenuPending||!t.state.focused||ts(r)&&!n&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1;var i=r.value;if(i==n&&!t.somethingSelected())return!1;if(gl&&vl>=9&&this.hasSelection===i||Ml&&/[\uf700-\uf7ff]/.test(i))return t.display.input.reset(),!1;if(t.doc.sel==t.display.selForContextMenu){var o=i.charCodeAt(0);if(8203!=o||n||(n="​"),8666==o)return this.reset(),this.cm.execCommand("undo")}for(var l=0,s=Math.min(n.length,i.length);l<s&&n.charCodeAt(l)==i.charCodeAt(l);)++l;return hn(t,function(){$o(t,i.slice(l),n.length-l,null,e.composing?"*compose":null),i.length>1e3||i.indexOf("\n")>-1?r.value=e.prevInput="":e.prevInput=i,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))}),!0},Qs.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},Qs.prototype.onKeyPress=function(){gl&&vl>=9&&(this.hasSelection=null),this.fastPoll()},Qs.prototype.onContextMenu=function(e){function t(){if(null!=l.selectionStart){var e=i.somethingSelected(),t="​"+(e?l.value:"");l.value="⇚",l.value=t,n.prevInput=e?"":"​",l.selectionStart=1,l.selectionEnd=t.length,o.selForContextMenu=i.doc.sel}}function r(){if(n.contextMenuPending=!1,n.wrapper.style.cssText=c,l.style.cssText=u,gl&&vl<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=a),null!=l.selectionStart){(!gl||gl&&vl<9)&&t();var e=0,r=function(){o.selForContextMenu==i.doc.sel&&0==l.selectionStart&&l.selectionEnd>0&&"​"==n.prevInput?dn(i,Mi)(i):e++<10?o.detectingSelectAll=setTimeout(r,500):(o.selForContextMenu=null,o.input.reset())};o.detectingSelectAll=setTimeout(r,200)}}var n=this,i=n.cm,o=i.display,l=n.textarea,s=Sr(i,e),a=o.scroller.scrollTop;if(s&&!wl){i.options.resetSelectionOnContextMenu&&-1==i.doc.sel.contains(s)&&dn(i,bi)(i.doc,Rn(s),Gl);var u=l.style.cssText,c=n.wrapper.style.cssText;n.wrapper.style.cssText="position: absolute";var f=n.wrapper.getBoundingClientRect();l.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-f.top-5)+"px; left: "+(e.clientX-f.left-5)+"px;\n      z-index: 1000; background: "+(gl?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";var h;if(ml&&(h=window.scrollY),o.input.focus(),ml&&window.scrollTo(null,h),o.input.reset(),i.somethingSelected()||(l.value=n.prevInput=" "),n.contextMenuPending=!0,o.selForContextMenu=i.doc.sel,clearTimeout(o.detectingSelectAll),gl&&vl>=9&&t(),Hl){Fe(e);var d=function(){ke(window,"mouseup",d),setTimeout(r,20)};Ql(window,"mouseup",d)}else setTimeout(r,50)}},Qs.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e},Qs.prototype.setUneditable=function(){},Qs.prototype.needsContentAttribute=!1,function(e){function t(t,n,i,o){e.defaults[t]=n,i&&(r[t]=o?function(e,t,r){r!=Xs&&i(e,t,r)}:i)}var r=e.optionHandlers;e.defineOption=t,e.Init=Xs,t("value","",function(e,t){return e.setValue(t)},!0),t("mode",null,function(e,t){e.doc.modeOption=t,jn(e)},!0),t("indentUnit",2,jn,!0),t("indentWithTabs",!1),t("smartIndent",!0),t("tabSize",4,function(e){Xn(e),er(e),vn(e)},!0),t("lineSeparator",null,function(e,t){if(e.doc.lineSep=t,t){var r=[],n=e.doc.first;e.doc.iter(function(e){for(var i=0;;){var o=e.text.indexOf(t,i);if(-1==o)break;i=o+t.length,r.push(E(n,o))}n++});for(var i=r.length-1;i>=0;i--)Ei(e.doc,t,r[i],E(r[i].line,r[i].ch+t.length))}}),t("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g,function(e,t,r){e.state.specialChars=new RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=Xs&&e.refresh()}),t("specialCharPlaceholder",at,function(e){return e.refresh()},!0),t("electricChars",!0),t("inputStyle",Tl?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),t("spellcheck",!1,function(e,t){return e.getInputField().spellcheck=t},!0),t("rtlMoveVisually",!Ol),t("wholeLineUpdateBefore",!0),t("theme","default",function(e){Go(e),Uo(e)},!0),t("keyMap","default",function(e,t,r){var n=uo(t),i=r!=Xs&&uo(r);i&&i.detach&&i.detach(e,n),n.attach&&n.attach(e,i||null)}),t("extraKeys",null),t("configureMouse",null),t("lineWrapping",!1,Ko,!0),t("gutters",[],function(e){Fn(e.options),Uo(e)},!0),t("fixedGutter",!0,function(e,t){e.display.gutters.style.left=t?wr(e.display)+"px":"0",e.refresh()},!0),t("coverGutterNextToScrollbar",!1,function(e){return en(e)},!0),t("scrollbarStyle","native",function(e){rn(e),en(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)},!0),t("lineNumbers",!1,function(e){Fn(e.options),Uo(e)},!0),t("firstLineNumber",1,Uo,!0),t("lineNumberFormatter",function(e){return e},Uo,!0),t("showCursorWhenSelecting",!1,kr,!0),t("resetSelectionOnContextMenu",!0),t("lineWiseCopyCut",!0),t("pasteLinesPerSelection",!0),t("readOnly",!1,function(e,t){"nocursor"==t&&(Fr(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)}),t("disableInput",!1,function(e,t){t||e.display.input.reset()},!0),t("dragDrop",!0,Vo),t("allowDropFileTypes",null),t("cursorBlinkRate",530),t("cursorScrollMargin",0),t("cursorHeight",1,kr,!0),t("singleCursorHeightPerLine",!0,kr,!0),t("workTime",100),t("workDelay",100),t("flattenSpans",!0,Xn,!0),t("addModeClass",!1,Xn,!0),t("pollInterval",100),t("undoDepth",200,function(e,t){return e.doc.history.undoDepth=t}),t("historyEventDelay",1250),t("viewportMargin",10,function(e){return e.refresh()},!0),t("maxHighlightLength",1e4,Xn,!0),t("moveInputWithCursor",!0,function(e,t){t||e.display.input.resetPosition()}),t("tabindex",null,function(e,t){return e.display.input.getField().tabIndex=t||""}),t("autofocus",null),t("direction","ltr",function(e,t){return e.doc.setDirection(t)},!0)}(jo),function(e){var t=e.optionHandlers,r=e.helpers={};e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,r){var n=this.options,i=n[e];n[e]==r&&"mode"!=e||(n[e]=r,t.hasOwnProperty(e)&&dn(this,t[e])(this,r,i),Te(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](uo(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:pn(function(t,r){var n=t.token?t:e.getMode(this.options,t);if(n.startState)throw new Error("Overlays may not be stateful.");m(this.state.overlays,{mode:n,modeSpec:t,opaque:r&&r.opaque,priority:r&&r.priority||0},function(e){return e.priority}),this.state.modeGen++,vn(this)}),removeOverlay:pn(function(e){for(var t=this,r=this.state.overlays,n=0;n<r.length;++n){var i=r[n].modeSpec;if(i==e||"string"==typeof e&&i.name==e)return r.splice(n,1),t.state.modeGen++,void vn(t)}}),indentLine:pn(function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),H(this.doc,e)&&Yo(this,e,t,r)}),indentSelection:pn(function(e){for(var t=this,r=this.doc.sel.ranges,n=-1,i=0;i<r.length;i++){var o=r[i];if(o.empty())o.head.line>n&&(Yo(t,o.head.line,e,!0),n=o.head.line,i==t.doc.sel.primIndex&&jr(t));else{var l=o.from(),s=o.to(),a=Math.max(n,l.line);n=Math.min(t.lastLine(),s.line-(s.ch?0:1))+1;for(var u=a;u<n;++u)Yo(t,u,e);var c=t.doc.sel.ranges;0==l.ch&&r.length==c.length&&c[i].from().ch>0&&gi(t.doc,i,new Ts(l,c[i].to()),Gl)}}}),getTokenAt:function(e,t){return Je(this,e,t)},getLineTokens:function(e,t){return Je(this,E(e),t,!0)},getTokenTypeAt:function(e){e=U(this.doc,e);var t,r=_e(this,M(this.doc,e.line)),n=0,i=(r.length-1)/2,o=e.ch;if(0==o)t=r[2];else for(;;){var l=n+i>>1;if((l?r[2*l-1]:0)>=o)i=l;else{if(!(r[2*l+1]<o)){t=r[2*l+2];break}n=l+1}}var s=t?t.indexOf("overlay "):-1;return s<0?t:0==s?null:t.slice(0,s-1)},getModeAt:function(t){var r=this.doc.mode;return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var n=this,i=[];if(!r.hasOwnProperty(t))return i;var o=r[t],l=this.getModeAt(e);if("string"==typeof l[t])o[l[t]]&&i.push(o[l[t]]);else if(l[t])for(var s=0;s<l[t].length;s++){var a=o[l[t][s]];a&&i.push(a)}else l.helperType&&o[l.helperType]?i.push(o[l.helperType]):o[l.name]&&i.push(o[l.name]);for(var u=0;u<o._global.length;u++){var c=o._global[u];c.pred(l,n)&&-1==h(i,c.val)&&i.push(c.val)}return i},getStateAfter:function(e,t){var r=this.doc;return e=G(r,null==e?r.first+r.size-1:e),$e(this,e+1,t).state},cursorCoords:function(e,t){var r,n=this.doc.sel.primary();return r=null==e?n.head:"object"==typeof e?U(this.doc,e):e?n.from():n.to(),sr(this,r,t||"page")},charCoords:function(e,t){return lr(this,U(this.doc,e),t||"page")},coordsChar:function(e,t){return e=or(this,e,t||"page"),cr(this,e.left,e.top)},lineAtHeight:function(e,t){return e=or(this,{top:e,left:0},t||"page").top,D(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,r){var n,i=!1;if("number"==typeof e){var o=this.doc.first+this.doc.size-1;e<this.doc.first?e=this.doc.first:e>o&&(e=o,i=!0),n=M(this.doc,e)}else n=e;return ir(this,n,{top:0,left:0},t||"page",r||i).top+(i?this.doc.height-ye(n):0)},defaultTextHeight:function(){return mr(this.display)},defaultCharWidth:function(){return yr(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,n,i){var o=this.display,l=(e=sr(this,U(this.doc,e))).bottom,s=e.left;if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),o.sizer.appendChild(t),"over"==n)l=e.top;else if("above"==n||"near"==n){var a=Math.max(o.wrapper.clientHeight,this.doc.height),u=Math.max(o.sizer.clientWidth,o.lineSpace.clientWidth);("above"==n||e.bottom+t.offsetHeight>a)&&e.top>t.offsetHeight?l=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=a&&(l=e.bottom),s+t.offsetWidth>u&&(s=u-t.offsetWidth)}t.style.top=l+"px",t.style.left=t.style.right="","right"==i?(s=o.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?s=0:"middle"==i&&(s=(o.sizer.clientWidth-t.offsetWidth)/2),t.style.left=s+"px"),r&&Ur(this,{left:s,top:l,right:s+t.offsetWidth,bottom:l+t.offsetHeight})},triggerOnKeyDown:pn(Lo),triggerOnKeyPress:pn(Mo),triggerOnKeyUp:To,triggerOnMouseDown:pn(Oo),execCommand:function(e){if(Bs.hasOwnProperty(e))return Bs[e].call(null,this)},triggerElectric:pn(function(e){Zo(this,e)}),findPosH:function(e,t,r,n){var i=this,o=1;t<0&&(o=-1,t=-t);for(var l=U(this.doc,e),s=0;s<t&&!(l=tl(i.doc,l,o,r,n)).hitSide;++s);return l},moveH:pn(function(e,t){var r=this;this.extendSelectionsBy(function(n){return r.display.shift||r.doc.extend||n.empty()?tl(r.doc,n.head,e,t,r.options.rtlMoveVisually):e<0?n.from():n.to()},Vl)}),deleteH:pn(function(e,t){var r=this.doc.sel,n=this.doc;r.somethingSelected()?n.replaceSelection("",null,"+delete"):co(this,function(r){var i=tl(n,r.head,e,t,!1);return e<0?{from:i,to:r.head}:{from:r.head,to:i}})}),findPosV:function(e,t,r,n){var i=this,o=1,l=n;t<0&&(o=-1,t=-t);for(var s=U(this.doc,e),a=0;a<t;++a){var u=sr(i,s,"div");if(null==l?l=u.left:u.left=l,(s=rl(i,u,o,r)).hitSide)break}return s},moveV:pn(function(e,t){var r=this,n=this.doc,i=[],o=!this.display.shift&&!n.extend&&n.sel.somethingSelected();if(n.extendSelectionsBy(function(l){if(o)return e<0?l.from():l.to();var s=sr(r,l.head,"div");null!=l.goalColumn&&(s.left=l.goalColumn),i.push(s.left);var a=rl(r,s,e,t);return"page"==t&&l==n.sel.primary()&&Kr(r,lr(r,a,"div").top-s.top),a},Vl),i.length)for(var l=0;l<n.sel.ranges.length;l++)n.sel.ranges[l].goalColumn=i[l]}),findWordAt:function(e){var t=M(this.doc,e.line).text,r=e.ch,n=e.ch;if(t){var i=this.getHelper(e,"wordChars");"before"!=e.sticky&&n!=t.length||!r?++n:--r;for(var o=t.charAt(r),l=x(o,i)?function(e){return x(e,i)}:/\s/.test(o)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!x(e)};r>0&&l(t.charAt(r-1));)--r;for(;n<t.length&&l(t.charAt(n));)++n}return new Ts(E(e.line,r),E(e.line,n))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?s(this.display.cursorDiv,"CodeMirror-overwrite"):Fl(this.display.cursorDiv,"CodeMirror-overwrite"),Te(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==l()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:pn(function(e,t){Xr(this,e,t)}),getScrollInfo:function(){var e=this.display.scroller;return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-zt(this)-this.display.barHeight,width:e.scrollWidth-zt(this)-this.display.barWidth,clientHeight:Bt(this),clientWidth:Rt(this)}},scrollIntoView:pn(function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:E(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?Yr(this,e):$r(this,e.from,e.to,e.margin)}),setSize:pn(function(e,t){var r=this,n=function(e){return"number"==typeof e||/^\d+$/.test(String(e))?e+"px":e};null!=e&&(this.display.wrapper.style.width=n(e)),null!=t&&(this.display.wrapper.style.height=n(t)),this.options.lineWrapping&&Jt(this);var i=this.display.viewFrom;this.doc.iter(i,this.display.viewTo,function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){mn(r,i,"widget");break}++i}),this.curOp.forceUpdate=!0,Te(this,"refresh",this)}),operation:function(e){return hn(this,e)},startOperation:function(){return nn(this)},endOperation:function(){return on(this)},refresh:pn(function(){var e=this.display.cachedTextHeight;vn(this),this.curOp.forceUpdate=!0,er(this),Xr(this,this.doc.scrollLeft,this.doc.scrollTop),Wn(this),(null==e||Math.abs(e-mr(this.display))>.5)&&Cr(this),Te(this,"refresh",this)}),swapDoc:pn(function(e){var t=this.doc;return t.cm=null,qn(this,e),er(this),this.display.input.reset(),Xr(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,bt(this,"swapDoc",this,t),t}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},Ae(e),e.registerHelper=function(t,n,i){r.hasOwnProperty(t)||(r[t]=e[t]={_global:[]}),r[t][n]=i},e.registerGlobalHelper=function(t,n,i,o){e.registerHelper(t,n,o),r[t]._global.push({pred:i,val:o})}}(jo);var Js="iter insert remove copy getEditor constructor".split(" ");for(var ea in Ds.prototype)Ds.prototype.hasOwnProperty(ea)&&h(Js,ea)<0&&(jo.prototype[ea]=function(e){return function(){return e.apply(this.doc,arguments)}}(Ds.prototype[ea]));return Ae(Ds),jo.inputStyles={textarea:Qs,contenteditable:Zs},jo.defineMode=function(e){jo.defaults.mode||"null"==e||(jo.defaults.mode=e),Be.apply(this,arguments)},jo.defineMIME=function(e,t){os[e]=t},jo.defineMode("null",function(){return{token:function(e){return e.skipToEnd()}}}),jo.defineMIME("text/plain","null"),jo.defineExtension=function(e,t){jo.prototype[e]=t},jo.defineDocExtension=function(e,t){Ds.prototype[e]=t},jo.fromTextArea=function(e,t){function r(){e.value=a.getValue()}if(t=t?c(t):{},t.value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var n=l();t.autofocus=n==e||null!=e.getAttribute("autofocus")&&n==document.body}var i;if(e.form&&(Ql(e.form,"submit",r),!t.leaveSubmitMethodAlone)){var o=e.form;i=o.submit;try{var s=o.submit=function(){r(),o.submit=i,o.submit(),o.submit=s}}catch(e){}}t.finishInit=function(t){t.save=r,t.getTextArea=function(){return e},t.toTextArea=function(){t.toTextArea=isNaN,r(),e.parentNode.removeChild(t.getWrapperElement()),e.style.display="",e.form&&(ke(e.form,"submit",r),"function"==typeof e.form.submit&&(e.form.submit=i))}},e.style.display="none";var a=jo(function(t){return e.parentNode.insertBefore(t,e.nextSibling)},t);return a},function(e){e.off=ke,e.on=Ql,e.wheelEventPixels=Pn,e.Doc=Ds,e.splitLines=es,e.countColumn=f,e.findColumn=d,e.isWordChar=w,e.Pass=Bl,e.signal=Te,e.Line=fs,e.changeEnd=Bn,e.scrollbarModel=ws,e.Pos=E,e.cmpPos=P,e.modes=is,e.mimeModes=os,e.resolveMode=Ge,e.getMode=Ue,e.modeExtensions=ls,e.extendMode=Ve,e.copyState=Ke,e.startState=Xe,e.innerMode=je,e.commands=Bs,e.keyMap=Rs,e.keyName=ao,e.isModifierKey=lo,e.lookupKey=oo,e.normalizeKeyMap=io,e.StringStream=ss,e.SharedTextMarker=As,e.TextMarker=Os,e.LineWidget=Ms,e.e_preventDefault=We,e.e_stopPropagation=De,e.e_stop=Fe,e.addClass=s,e.contains=o,e.rmClass=Fl,e.keyNames=Es}(jo),jo.version="5.30.0",jo});

!function (t) { "object" == typeof exports && "object" == typeof module ? t(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], t) : t(CodeMirror) }(function (t) {
    "use strict"; t.defineMode("xml", function (e, n) {
        function r(t, e) {
            function n(n) { return e.tokenize = n, n(t, e) }
            var r = t.next();

            if ("<" == r) return t.eat("!") ? t.eat("[") ? t.match("CDATA[") ? n(i("atom", "]]>")) : null : t.match("-") ? n(i("comment", "->")) : t.match("DOCTYPE", !0, !0) ? (t.eatWhile(/[\w\._\-]/),
            n(l(1))) : null : t.eat("?") ? (t.eatWhile(/[\w\._\-]/),
            e.tokenize = i("meta", "?>"),
            "meta") : (z = t.eat("/") ? "closeTagBlog" : "openTagBlog", e.tokenize = o, "tag bracket");

            if ("&" == r) {
                var a; return a = t.eat("#") ? t.eat("x") ? t.eatWhile(/[a-fA-F\d]/) && t.eat(";") : t.eatWhile(/[\d]/) && t.eat(";") : t.eatWhile(/[\w\.\-:]/) && t.eat(";"),
                a ? "atom" : "error"
            }
            return t.eatWhile(/[^&<]/),
            null
        }
        function o(t, e) {
            var n = t.next();

            if (">" == n || "/" == n && t.eat(">")) return e.tokenize = r, z = ">" == n ? "endTagBlog" : "selfcloseTagBlog", "tag bracket";
            if ("=" == n) return z = "equals", null;
            if ("<" == n) {
                e.tokenize = r, e.state = f, e.tagName = e.tagStart = null; var o = e.tokenize(t, e);
                return o ? o + " tag error" : "tag error"
            }
            return /[\'\"]/.test(n) ? (e.tokenize = a(n),
            e.stringStartCol = t.column(),
            e.tokenize(t, e)) : (t.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),
            "word")
        }
        function a(t) {
            var e = function (e, n) {
                for (; !e.eol() ;
                )
                    if (e.next() == t) { n.tokenize = o; break }
                return "string"
            };
            return e.isInAttribute = !0, e
        }
        function i(t, e) {
            return function (n, o) {
                for (; !n.eol() ;
                ) {
                    if (n.match(e)) { o.tokenize = r; break }
                    n.next()
                }
                return t
            }
        }
        function l(t) {
            return function (e, n) {
                for (var o; null != (o = e.next()) ;
                ) {
                    if ("<" == o) return n.tokenize = l(t + 1),
                    n.tokenize(e, n);

                    if (">" == o) {
                        if (1 == t) { n.tokenize = r; break }
                        return n.tokenize = l(t - 1),
                        n.tokenize(e, n)
                    }
                }
                return "meta"
            }
        }
        function u(t, e, n) { this.prev = t.context, this.tagName = e, this.indent = t.indented, this.startOfLine = n, (T.doNotIndent.hasOwnProperty(e) || t.context && t.context.noIndent) && (this.noIndent = !0) }
        function d(t) { t.context && (t.context = t.context.prev) }
        function c(t, e) {
            for (var n; ;) {
                if (!t.context) return;
                if (n = t.context.tagName, !T.contextGrabbers.hasOwnProperty(n) || !T.contextGrabbers[n].hasOwnProperty(e)) return; d(t)
            }
        }
        function f(t, e, n) {
            return "openTagBlog" == t ? (n.tagStart = e.column(),
            s) : "closeTagBlog" == t ? m : f
        }
        function s(t, e, n) {
            return "word" == t ? (n.tagName = e.current(),
            N = "tag", h) : (N = "error", s)
        }
        function m(t, e, n) {
            if ("word" == t) {
                var r = e.current();
                return n.context && n.context.tagName != r && T.implicitlyClosed.hasOwnProperty(n.context.tagName) && d(n),
                n.context && n.context.tagName == r ? (N = "tag", g) : (N = "tag error", p)
            }
            return N = "error", p
        }
        function g(t, e, n) {
            return "endTagBlog" != t ? (N = "error", g) : (d(n),
            f)
        }
        function p(t, e, n) { return N = "error", g(t, e, n) }
        function h(t, e, n) {
            if ("word" == t) return N = "attribute", x;
            if ("endTagBlog" == t || "selfcloseTagBlog" == t) {
                var r = n.tagName, o = n.tagStart; return n.tagName = n.tagStart = null, "selfcloseTagBlog" == t || T.autoSelfClosers.hasOwnProperty(r) ? c(n, r) : (c(n, r),
                n.context = new u(n, r, o == n.indented)),
                f
            }
            return N = "error", h
        }
        function x(t, e, n) {
            return "equals" == t ? b : (T.allowMissing || (N = "error"),
            h(t, e, n))
        }
        function b(t, e, n) { return "string" == t ? k : "word" == t && T.allowUnquoted ? (N = "string", h) : (N = "error", h(t, e, n)) }
        function k(t, e, n) { return "string" == t ? k : h(t, e, n) }
        var w = e.indentUnit, v = n.multilineTagBlogIndentFactor || 1, y = n.multilineTagBlogIndentPastTagBlog; null == y && (y = !0);
        var z, N, T = n.htmlMode ? {
            autoSelfClosers: { area: !0, base: !0, br: !0, col: !0, command: !0, embed: !0, frame: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0, menuitem: !0 },
            implicitlyClosed: { dd: !0, li: !0, optgroup: !0, option: !0, p: !0, rp: !0, rt: !0, tbody: !0, td: !0, tfoot: !0, th: !0, tr: !0 },
            contextGrabbers: {
                dd: { dd: !0, dt: !0 },
                dt: { dd: !0, dt: !0 },
                li: { li: !0 },
                option: { option: !0, optgroup: !0 },
                optgroup: { optgroup: !0 },
                p: { address: !0, article: !0, aside: !0, blockquote: !0, dir: !0, div: !0, dl: !0, fieldset: !0, footer: !0, form: !0, h1: !0, h2: !0, h3: !0, h4: !0, h5: !0, h6: !0, header: !0, hgroup: !0, hr: !0, menu: !0, nav: !0, ol: !0, p: !0, pre: !0, section: !0, table: !0, ul: !0 },
                rp: { rp: !0, rt: !0 },
                rt: { rp: !0, rt: !0 },
                tbody: { tbody: !0, tfoot: !0 },
                td: { td: !0, th: !0 },
                tfoot: { tbody: !0 },
                th: { td: !0, th: !0 },
                thead: { tbody: !0, tfoot: !0 },
                tr: { tr: !0 }
            },
            doNotIndent: { pre: !0 },
            allowUnquoted: !0, allowMissing: !0, caseFold: !0
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1, allowMissing: !1, caseFold: !1
        },
        C = n.alignCDATA; return {
            startState: function () { return { tokenize: r, state: f, indented: 0, tagName: null, tagStart: null, context: null } },
            token: function (t, e) {
                if (!e.tagName && t.sol() && (e.indented = t.indentation()),
                t.eatSpace()) return null; z = null; var n = e.tokenize(t, e);
                return (n || z) && "comment" != n && (N = null, e.state = e.state(z || n, t, e),
                N && (n = "error" == N ? n + " error" : N)),
                n
            },
            indent: function (e, n, a) {
                var i = e.context;
                if (e.tokenize.isInAttribute) return e.tagStart == e.indented ? e.stringStartCol + 1 : e.indented + w;
                if (i && i.noIndent) return t.Pass;
                if (e.tokenize != o && e.tokenize != r) return a ? a.match(/^(\s*)/)[0].length : 0;
                if (e.tagName) return y ? e.tagStart + e.tagName.length + 2 : e.tagStart + w * v;
                if (C && /<!\[CDATA\[/.test(n)) return 0; var l = n && /^<(\/)?([\w_:\.-]*)/.exec(n);

                if (l && l[1]) for (; i;) {
                    if (i.tagName == l[2]) { i = i.prev; break }

                    if (!T.implicitlyClosed.hasOwnProperty(i.tagName)) break; i = i.prev
                }
                else
                    if (l) for (; i;) {
                        var u = T.contextGrabbers[i.tagName];
                        if (!u || !u.hasOwnProperty(l[2])) break; i = i.prev
                    }
                for (; i && !i.startOfLine;) i = i.prev; return i ? i.indent + w : 0
            },
            electricInput: /<\/[\s\w:]+>$/, blockCommentStart: "<!-", blockCommentEnd: "->", configuration: n.htmlMode ? "html" : "xml", helperType: n.htmlMode ? "html" : "xml"
        }
    }),
    t.defineMIME("text/xml", "xml"),
    t.defineMIME("application/xml", "xml"),
    t.mimeModes.hasOwnProperty("text/html") || t.defineMIME("text/html", { name: "xml", htmlMode: !0 })
});


/**
 * at.js - 1.5.3
 * Copyright (c) 2017 chord.luo <chord.luo@gmail.com>;
 * Homepage: http://ichord.github.com/At.js
 * License: MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(this, function ($) {
var DEFAULT_CALLBACKS, KEY_CODE;

KEY_CODE = {
  ESC: 27,
  TAB: 9,
  ENTER: 13,
  CTRL: 17,
  A: 65,
  P: 80,
  N: 78,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  BACKSPACE: 8,
  SPACE: 32
};

DEFAULT_CALLBACKS = {
  beforeSave: function(data) {
    return Controller.arrayToDefaultHash(data);
  },
  matcher: function(flag, subtext, should_startWithSpace, acceptSpaceBar) {
    var _a, _y, match, regexp, space;
    flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    if (should_startWithSpace) {
      flag = '(?:^|\\s)' + flag;
    }
    _a = decodeURI("%C3%80");
    _y = decodeURI("%C3%BF");
    space = acceptSpaceBar ? "\ " : "";
    regexp = new RegExp(flag + "([A-Za-z" + _a + "-" + _y + "0-9_" + space + "\'\.\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
    match = regexp.exec(subtext);
    if (match) {
      return match[2] || match[1];
    } else {
      return null;
    }
  },
  filter: function(query, data, searchKey) {
    var _results, i, item, len;
    _results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if (~new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase())) {
        _results.push(item);
      }
    }
    return _results;
  },
  remoteFilter: null,
  sorter: function(query, items, searchKey) {
    var _results, i, item, len;
    if (!query) {
      return items;
    }
    _results = [];
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      item.atwho_order = new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase());
      if (item.atwho_order > -1) {
        _results.push(item);
      }
    }
    return _results.sort(function(a, b) {
      return a.atwho_order - b.atwho_order;
    });
  },
  tplEval: function(tpl, map) {
    var error, error1, template;
    template = tpl;
    try {
      if (typeof tpl !== 'string') {
        template = tpl(map);
      }
      return template.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
        return map[key];
      });
    } catch (error1) {
      error = error1;
      return "";
    }
  },
  highlighter: function(li, query) {
    var regexp;
    if (!query) {
      return li;
    }
    regexp = new RegExp(">\\s*([^\<]*?)(" + query.replace("+", "\\+") + ")([^\<]*)\\s*<", 'ig');
    return li.replace(regexp, function(str, $1, $2, $3) {
      return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
    });
  },
  beforeInsert: function(value, $li, e) {
    return value;
  },
  beforeReposition: function(offset) {
    return offset;
  },
  afterMatchFailed: function(at, el) {}
};

var Product;

Product = (function() {
  function Product(inputor) {
    this.currentFlag = null;
    this.controllers = {};
    this.aliasMaps = {};
    this.$inputor = $(inputor);
    this.setupRootElement();
    this.listen();
  }

  Product.prototype.createContainer = function(doc) {
    var ref;
    if ((ref = this.$el) != null) {
      ref.remove();
    }
    return $(doc.body).append(this.$el = $("<div class='atwho-container'></div>"));
  };

  Product.prototype.setupRootElement = function(iframe, asRoot) {
    var error, error1;
    if (asRoot == null) {
      asRoot = false;
    }
    if (iframe) {
      this.window = iframe.contentWindow;
      this.document = iframe.contentDocument || this.window.document;
      this.iframe = iframe;
    } else {
      this.document = this.$inputor[0].ownerDocument;
      this.window = this.document.defaultView || this.document.parentWindow;
      try {
        this.iframe = this.window.frameElement;
      } catch (error1) {
        error = error1;
        this.iframe = null;
        if ($.fn.atwho.debug) {
          throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n" + error);
        }
      }
    }
    return this.createContainer((this.iframeAsRoot = asRoot) ? this.document : document);
  };

  Product.prototype.controller = function(at) {
    var c, current, currentFlag, ref;
    if (this.aliasMaps[at]) {
      current = this.controllers[this.aliasMaps[at]];
    } else {
      ref = this.controllers;
      for (currentFlag in ref) {
        c = ref[currentFlag];
        if (currentFlag === at) {
          current = c;
          break;
        }
      }
    }
    if (current) {
      return current;
    } else {
      return this.controllers[this.currentFlag];
    }
  };

  Product.prototype.setContextFor = function(at) {
    this.currentFlag = at;
    return this;
  };

  Product.prototype.reg = function(flag, setting) {
    var base, controller;
    controller = (base = this.controllers)[flag] || (base[flag] = this.$inputor.is('[contentEditable]') ? new EditableController(this, flag) : new TextareaController(this, flag));
    if (setting.alias) {
      this.aliasMaps[setting.alias] = flag;
    }
    controller.init(setting);
    return this;
  };

  Product.prototype.listen = function() {
    return this.$inputor.on('compositionstart', (function(_this) {
      return function(e) {
        var ref;
        if ((ref = _this.controller()) != null) {
          ref.view.hide();
        }
        _this.isComposing = true;
        return null;
      };
    })(this)).on('compositionend', (function(_this) {
      return function(e) {
        _this.isComposing = false;
        setTimeout(function(e) {
          return _this.dispatch(e);
        });
        return null;
      };
    })(this)).on('keyup.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeyup(e);
      };
    })(this)).on('keydown.atwhoInner', (function(_this) {
      return function(e) {
        return _this.onKeydown(e);
      };
    })(this)).on('blur.atwhoInner', (function(_this) {
      return function(e) {
        var c;
        if (c = _this.controller()) {
          c.expectedQueryCBId = null;
          return c.view.hide(e, c.getOpt("displayTimeout"));
        }
      };
    })(this)).on('click.atwhoInner', (function(_this) {
      return function(e) {
        return _this.dispatch(e);
      };
    })(this)).on('scroll.atwhoInner', (function(_this) {
      return function() {
        var lastScrollTop;
        lastScrollTop = _this.$inputor.scrollTop();
        return function(e) {
          var currentScrollTop, ref;
          currentScrollTop = e.target.scrollTop;
          if (lastScrollTop !== currentScrollTop) {
            if ((ref = _this.controller()) != null) {
              ref.view.hide(e);
            }
          }
          lastScrollTop = currentScrollTop;
          return true;
        };
      };
    })(this)());
  };

  Product.prototype.shutdown = function() {
    var _, c, ref;
    ref = this.controllers;
    for (_ in ref) {
      c = ref[_];
      c.destroy();
      delete this.controllers[_];
    }
    this.$inputor.off('.atwhoInner');
    return this.$el.remove();
  };

  Product.prototype.dispatch = function(e) {
    var _, c, ref, results;
    ref = this.controllers;
    results = [];
    for (_ in ref) {
      c = ref[_];
      results.push(c.lookUp(e));
    }
    return results;
  };

  Product.prototype.onKeyup = function(e) {
    var ref;
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        if ((ref = this.controller()) != null) {
          ref.view.hide();
        }
        break;
      case KEY_CODE.DOWN:
      case KEY_CODE.UP:
      case KEY_CODE.CTRL:
      case KEY_CODE.ENTER:
        $.noop();
        break;
      case KEY_CODE.P:
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          this.dispatch(e);
        }
        break;
      default:
        this.dispatch(e);
    }
  };

  Product.prototype.onKeydown = function(e) {
    var ref, view;
    view = (ref = this.controller()) != null ? ref.view : void 0;
    if (!(view && view.visible())) {
      return;
    }
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        view.hide(e);
        break;
      case KEY_CODE.UP:
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.DOWN:
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.P:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.TAB:
      case KEY_CODE.ENTER:
      case KEY_CODE.SPACE:
        if (!view.visible()) {
          return;
        }
        if (!this.controller().getOpt('spaceSelectsMatch') && e.keyCode === KEY_CODE.SPACE) {
          return;
        }
        if (!this.controller().getOpt('tabSelectsMatch') && e.keyCode === KEY_CODE.TAB) {
          return;
        }
        if (view.highlighted()) {
          e.preventDefault();
          view.choose(e);
        } else {
          view.hide(e);
        }
        break;
      default:
        $.noop();
    }
  };

  return Product;

})();

var Controller,
  slice = [].slice;

Controller = (function() {
  Controller.prototype.uid = function() {
    return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date().getTime());
  };

  function Controller(app, at1) {
    this.app = app;
    this.at = at1;
    this.$inputor = this.app.$inputor;
    this.id = this.$inputor[0].id || this.uid();
    this.expectedQueryCBId = null;
    this.setting = null;
    this.query = null;
    this.pos = 0;
    this.range = null;
    if ((this.$el = $("#atwho-ground-" + this.id, this.app.$el)).length === 0) {
      this.app.$el.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
    }
    this.model = new Model(this);
    this.view = new View(this);
  }

  Controller.prototype.init = function(setting) {
    this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
    this.view.init();
    return this.model.reload(this.setting.data);
  };

  Controller.prototype.destroy = function() {
    this.trigger('beforeDestroy');
    this.model.destroy();
    this.view.destroy();
    return this.$el.remove();
  };

  Controller.prototype.callDefault = function() {
    var args, error, error1, funcName;
    funcName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    try {
      return DEFAULT_CALLBACKS[funcName].apply(this, args);
    } catch (error1) {
      error = error1;
      return $.error(error + " Or maybe At.js doesn't have function " + funcName);
    }
  };

  Controller.prototype.trigger = function(name, data) {
    var alias, eventName;
    if (data == null) {
      data = [];
    }
    data.push(this);
    alias = this.getOpt('alias');
    eventName = alias ? name + "-" + alias + ".atwho" : name + ".atwho";
    return this.$inputor.trigger(eventName, data);
  };

  Controller.prototype.callbacks = function(funcName) {
    return this.getOpt("callbacks")[funcName] || DEFAULT_CALLBACKS[funcName];
  };

  Controller.prototype.getOpt = function(at, default_value) {
    var e, error1;
    try {
      return this.setting[at];
    } catch (error1) {
      e = error1;
      return null;
    }
  };

  Controller.prototype.insertContentFor = function($li) {
    var data, tpl;
    tpl = this.getOpt('insertTpl');
    data = $.extend({}, $li.data('item-data'), {
      'atwho-at': this.at
    });
    return this.callbacks("tplEval").call(this, tpl, data, "onInsert");
  };

  Controller.prototype.renderView = function(data) {
    var searchKey;
    searchKey = this.getOpt("searchKey");
    data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), searchKey);
    return this.view.render(data.slice(0, this.getOpt('limit')));
  };

  Controller.arrayToDefaultHash = function(data) {
    var i, item, len, results;
    if (!$.isArray(data)) {
      return data;
    }
    results = [];
    for (i = 0, len = data.length; i < len; i++) {
      item = data[i];
      if ($.isPlainObject(item)) {
        results.push(item);
      } else {
        results.push({
          name: item
        });
      }
    }
    return results;
  };

  Controller.prototype.lookUp = function(e) {
    var query, wait;
    if (e && e.type === 'click' && !this.getOpt('lookUpOnClick')) {
      return;
    }
    if (this.getOpt('suspendOnComposing') && this.app.isComposing) {
      return;
    }
    query = this.catchQuery(e);
    if (!query) {
      this.expectedQueryCBId = null;
      return query;
    }
    this.app.setContextFor(this.at);
    if (wait = this.getOpt('delay')) {
      this._delayLookUp(query, wait);
    } else {
      this._lookUp(query);
    }
    return query;
  };

  Controller.prototype._delayLookUp = function(query, wait) {
    var now, remaining;
    now = Date.now ? Date.now() : new Date().getTime();
    this.previousCallTime || (this.previousCallTime = now);
    remaining = wait - (now - this.previousCallTime);
    if ((0 < remaining && remaining < wait)) {
      this.previousCallTime = now;
      this._stopDelayedCall();
      return this.delayedCallTimeout = setTimeout((function(_this) {
        return function() {
          _this.previousCallTime = 0;
          _this.delayedCallTimeout = null;
          return _this._lookUp(query);
        };
      })(this), wait);
    } else {
      this._stopDelayedCall();
      if (this.previousCallTime !== now) {
        this.previousCallTime = 0;
      }
      return this._lookUp(query);
    }
  };

  Controller.prototype._stopDelayedCall = function() {
    if (this.delayedCallTimeout) {
      clearTimeout(this.delayedCallTimeout);
      return this.delayedCallTimeout = null;
    }
  };

  Controller.prototype._generateQueryCBId = function() {
    return {};
  };

  Controller.prototype._lookUp = function(query) {
    var _callback;
    _callback = function(queryCBId, data) {
      if (queryCBId !== this.expectedQueryCBId) {
        return;
      }
      if (data && data.length > 0) {
        return this.renderView(this.constructor.arrayToDefaultHash(data));
      } else {
        return this.view.hide();
      }
    };
    this.expectedQueryCBId = this._generateQueryCBId();
    return this.model.query(query.text, $.proxy(_callback, this, this.expectedQueryCBId));
  };

  return Controller;

})();

var TextareaController,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextareaController = (function(superClass) {
  extend(TextareaController, superClass);

  function TextareaController() {
    return TextareaController.__super__.constructor.apply(this, arguments);
  }

  TextareaController.prototype.catchQuery = function() {
    var caretPos, content, end, isString, query, start, subtext;
    content = this.$inputor.val();
    caretPos = this.$inputor.caret('pos', {
      iframe: this.app.iframe
    });
    subtext = content.slice(0, caretPos);
    query = this.callbacks("matcher").call(this, this.at, subtext, this.getOpt('startWithSpace'), this.getOpt("acceptSpaceBar"));
    isString = typeof query === 'string';
    if (isString && query.length < this.getOpt('minLen', 0)) {
      return;
    }
    if (isString && query.length <= this.getOpt('maxLen', 20)) {
      start = caretPos - query.length;
      end = start + query.length;
      this.pos = start;
      query = {
        'text': query,
        'headPos': start,
        'endPos': end
      };
      this.trigger("matched", [this.at, query.text]);
    } else {
      query = null;
      this.view.hide();
    }
    return this.query = query;
  };

  TextareaController.prototype.rect = function() {
    var c, iframeOffset, scaleBottom;
    if (!(c = this.$inputor.caret('offset', this.pos - 1, {
      iframe: this.app.iframe
    }))) {
      return;
    }
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = $(this.app.iframe).offset();
      c.left += iframeOffset.left;
      c.top += iframeOffset.top;
    }
    scaleBottom = this.app.document.selection ? 0 : 2;
    return {
      left: c.left,
      top: c.top,
      bottom: c.top + c.height + scaleBottom
    };
  };

  TextareaController.prototype.insert = function(content, $li) {
    var $inputor, source, startStr, suffix, text;
    $inputor = this.$inputor;
    source = $inputor.val();
    startStr = source.slice(0, Math.max(this.query.headPos - this.at.length, 0));
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || " ";
    content += suffix;
    text = "" + startStr + content + (source.slice(this.query['endPos'] || 0));
    $inputor.val(text);
    $inputor.caret('pos', startStr.length + content.length, {
      iframe: this.app.iframe
    });
    if (!$inputor.is(':focus')) {
      $inputor.focus();
    }
    return $inputor.change();
  };

  return TextareaController;

})(Controller);

var EditableController,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EditableController = (function(superClass) {
  extend(EditableController, superClass);

  function EditableController() {
    return EditableController.__super__.constructor.apply(this, arguments);
  }

  EditableController.prototype._getRange = function() {
    var sel;
    sel = this.app.window.getSelection();
    if (sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    }
  };

  EditableController.prototype._setRange = function(position, node, range) {
    if (range == null) {
      range = this._getRange();
    }
    if (!(range && node)) {
      return;
    }
    node = $(node)[0];
    if (position === 'after') {
      range.setEndAfter(node);
      range.setStartAfter(node);
    } else {
      range.setEndBefore(node);
      range.setStartBefore(node);
    }
    range.collapse(false);
    return this._clearRange(range);
  };

  EditableController.prototype._clearRange = function(range) {
    var sel;
    if (range == null) {
      range = this._getRange();
    }
    sel = this.app.window.getSelection();
    if (this.ctrl_a_pressed == null) {
      sel.removeAllRanges();
      return sel.addRange(range);
    }
  };

  EditableController.prototype._movingEvent = function(e) {
    var ref;
    return e.type === 'click' || ((ref = e.which) === KEY_CODE.RIGHT || ref === KEY_CODE.LEFT || ref === KEY_CODE.UP || ref === KEY_CODE.DOWN);
  };

  EditableController.prototype._unwrap = function(node) {
    var next;
    node = $(node).unwrap().get(0);
    if ((next = node.nextSibling) && next.nodeValue) {
      node.nodeValue += next.nodeValue;
      $(next).remove();
    }
    return node;
  };

  EditableController.prototype.catchQuery = function(e) {
    var $inserted, $query, _range, index, inserted, isString, lastNode, matched, offset, query, query_content, range;
    if (!(range = this._getRange())) {
      return;
    }
    if (!range.collapsed) {
      return;
    }
    if (e.which === KEY_CODE.ENTER) {
      ($query = $(range.startContainer).closest('.atwho-query')).contents().unwrap();
      if ($query.is(':empty')) {
        $query.remove();
      }
      ($query = $(".atwho-query", this.app.document)).text($query.text()).contents().last().unwrap();
      this._clearRange();
      return;
    }
    if (/firefox/i.test(navigator.userAgent)) {
      if ($(range.startContainer).is(this.$inputor)) {
        this._clearRange();
        return;
      }
      if (e.which === KEY_CODE.BACKSPACE && range.startContainer.nodeType === document.ELEMENT_NODE && (offset = range.startOffset - 1) >= 0) {
        _range = range.cloneRange();
        _range.setStart(range.startContainer, offset);
        if ($(_range.cloneContents()).contents().last().is('.atwho-inserted')) {
          inserted = $(range.startContainer).contents().get(offset);
          this._setRange('after', $(inserted).contents().last());
        }
      } else if (e.which === KEY_CODE.LEFT && range.startContainer.nodeType === document.TEXT_NODE) {
        $inserted = $(range.startContainer.previousSibling);
        if ($inserted.is('.atwho-inserted') && range.startOffset === 0) {
          this._setRange('after', $inserted.contents().last());
        }
      }
    }
    $(range.startContainer).closest('.atwho-inserted').addClass('atwho-query').siblings().removeClass('atwho-query');
    if (($query = $(".atwho-query", this.app.document)).length > 0 && $query.is(':empty') && $query.text().length === 0) {
      $query.remove();
    }
    if (!this._movingEvent(e)) {
      $query.removeClass('atwho-inserted');
    }
    if ($query.length > 0) {
      switch (e.which) {
        case KEY_CODE.LEFT:
          this._setRange('before', $query.get(0), range);
          $query.removeClass('atwho-query');
          return;
        case KEY_CODE.RIGHT:
          this._setRange('after', $query.get(0).nextSibling, range);
          $query.removeClass('atwho-query');
          return;
      }
    }
    if ($query.length > 0 && (query_content = $query.attr('data-atwho-at-query'))) {
      $query.empty().html(query_content).attr('data-atwho-at-query', null);
      this._setRange('after', $query.get(0), range);
    }
    _range = range.cloneRange();
    _range.setStart(range.startContainer, 0);
    matched = this.callbacks("matcher").call(this, this.at, _range.toString(), this.getOpt('startWithSpace'), this.getOpt("acceptSpaceBar"));
    isString = typeof matched === 'string';
    if ($query.length === 0 && isString && (index = range.startOffset - this.at.length - matched.length) >= 0) {
      range.setStart(range.startContainer, index);
      $query = $('<span/>', this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass('atwho-query');
      range.surroundContents($query.get(0));
      lastNode = $query.contents().last().get(0);
      if (lastNode) {
        if (/firefox/i.test(navigator.userAgent)) {
          range.setStart(lastNode, lastNode.length);
          range.setEnd(lastNode, lastNode.length);
          this._clearRange(range);
        } else {
          this._setRange('after', lastNode, range);
        }
      }
    }
    if (isString && matched.length < this.getOpt('minLen', 0)) {
      return;
    }
    if (isString && matched.length <= this.getOpt('maxLen', 20)) {
      query = {
        text: matched,
        el: $query
      };
      this.trigger("matched", [this.at, query.text]);
      return this.query = query;
    } else {
      this.view.hide();
      this.query = {
        el: $query
      };
      if ($query.text().indexOf(this.at) >= 0) {
        if (this._movingEvent(e) && $query.hasClass('atwho-inserted')) {
          $query.removeClass('atwho-query');
        } else if (false !== this.callbacks('afterMatchFailed').call(this, this.at, $query)) {
          this._setRange("after", this._unwrap($query.text($query.text()).contents().first()));
        }
      }
      return null;
    }
  };

  EditableController.prototype.rect = function() {
    var $iframe, iframeOffset, rect;
    rect = this.query.el.offset();
    if (!rect) {
      return;
    }
    if (this.app.iframe && !this.app.iframeAsRoot) {
      iframeOffset = ($iframe = $(this.app.iframe)).offset();
      rect.left += iframeOffset.left - this.$inputor.scrollLeft();
      rect.top += iframeOffset.top - this.$inputor.scrollTop();
    }
    rect.bottom = rect.top + this.query.el.height();
    return rect;
  };

  EditableController.prototype.insert = function(content, $li) {
    var data, range, suffix, suffixNode;
    if (!this.$inputor.is(':focus')) {
      this.$inputor.focus();
    }
    suffix = (suffix = this.getOpt('suffix')) === "" ? suffix : suffix || "\u00A0";
    data = $li.data('item-data');
    this.query.el.removeClass('atwho-query').addClass('atwho-inserted').html(content).attr('data-atwho-at-query', "" + data['atwho-at'] + this.query.text).attr('contenteditable', "false");
    if (range = this._getRange()) {
      if (this.query.el.length) {
        range.setEndAfter(this.query.el[0]);
      }
      range.collapse(false);
      range.insertNode(suffixNode = this.app.document.createTextNode("" + suffix));
      this._setRange('after', suffixNode, range);
    }
    if (!this.$inputor.is(':focus')) {
      this.$inputor.focus();
    }
    return this.$inputor.change();
  };

  return EditableController;

})(Controller);

var Model;

Model = (function() {
  function Model(context) {
    this.context = context;
    this.at = this.context.at;
    this.storage = this.context.$inputor;
  }

  Model.prototype.destroy = function() {
    return this.storage.data(this.at, null);
  };

  Model.prototype.saved = function() {
    return this.fetch() > 0;
  };

  Model.prototype.query = function(query, callback) {
    var _remoteFilter, data, searchKey;
    data = this.fetch();
    searchKey = this.context.getOpt("searchKey");
    data = this.context.callbacks('filter').call(this.context, query, data, searchKey) || [];
    _remoteFilter = this.context.callbacks('remoteFilter');
    if (data.length > 0 || (!_remoteFilter && data.length === 0)) {
      return callback(data);
    } else {
      return _remoteFilter.call(this.context, query, callback);
    }
  };

  Model.prototype.fetch = function() {
    return this.storage.data(this.at) || [];
  };

  Model.prototype.save = function(data) {
    return this.storage.data(this.at, this.context.callbacks("beforeSave").call(this.context, data || []));
  };

  Model.prototype.load = function(data) {
    if (!(this.saved() || !data)) {
      return this._load(data);
    }
  };

  Model.prototype.reload = function(data) {
    return this._load(data);
  };

  Model.prototype._load = function(data) {
    if (typeof data === "string") {
      return $.ajax(data, {
        dataType: "json"
      }).done((function(_this) {
        return function(data) {
          return _this.save(data);
        };
      })(this));
    } else {
      return this.save(data);
    }
  };

  return Model;

})();

var View;

View = (function() {
  function View(context) {
    this.context = context;
    this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
    this.$elUl = this.$el.children();
    this.timeoutID = null;
    this.context.$el.append(this.$el);
    this.bindEvent();
  }

  View.prototype.init = function() {
    var header_tpl, id;
    id = this.context.getOpt("alias") || this.context.at.charCodeAt(0);
    header_tpl = this.context.getOpt("headerTpl");
    if (header_tpl && this.$el.children().length === 1) {
      this.$el.prepend(header_tpl);
    }
    return this.$el.attr({
      'id': "at-view-" + id
    });
  };

  View.prototype.destroy = function() {
    return this.$el.remove();
  };

  View.prototype.bindEvent = function() {
    var $menu, lastCoordX, lastCoordY;
    $menu = this.$el.find('ul');
    lastCoordX = 0;
    lastCoordY = 0;
    return $menu.on('mousemove.atwho-view', 'li', (function(_this) {
      return function(e) {
        var $cur;
        if (lastCoordX === e.clientX && lastCoordY === e.clientY) {
          return;
        }
        lastCoordX = e.clientX;
        lastCoordY = e.clientY;
        $cur = $(e.currentTarget);
        if ($cur.hasClass('cur')) {
          return;
        }
        $menu.find('.cur').removeClass('cur');
        return $cur.addClass('cur');
      };
    })(this)).on('click.atwho-view', 'li', (function(_this) {
      return function(e) {
        $menu.find('.cur').removeClass('cur');
        $(e.currentTarget).addClass('cur');
        _this.choose(e);
        return e.preventDefault();
      };
    })(this));
  };

  View.prototype.visible = function() {
    return $.expr.filters.visible(this.$el[0]);
  };

  View.prototype.highlighted = function() {
    return this.$el.find(".cur").length > 0;
  };

  View.prototype.choose = function(e) {
    var $li, content;
    if (($li = this.$el.find(".cur")).length) {
      content = this.context.insertContentFor($li);
      this.context._stopDelayedCall();
      this.context.insert(this.context.callbacks("beforeInsert").call(this.context, content, $li, e), $li);
      this.context.trigger("inserted", [$li, e]);
      this.hide(e);
    }
    if (this.context.getOpt("hideWithoutSuffix")) {
      return this.stopShowing = true;
    }
  };

  View.prototype.reposition = function(rect) {
    var _window, offset, overflowOffset, ref;
    _window = this.context.app.iframeAsRoot ? this.context.app.window : window;
    if (rect.bottom + this.$el.height() - $(_window).scrollTop() > $(_window).height()) {
      rect.bottom = rect.top - this.$el.height();
    }
    if (rect.left > (overflowOffset = $(_window).width() - this.$el.width() - 5)) {
      rect.left = overflowOffset;
    }
    offset = {
      left: rect.left,
      top: rect.bottom
    };
    if ((ref = this.context.callbacks("beforeReposition")) != null) {
      ref.call(this.context, offset);
    }
    this.$el.offset(offset);
    return this.context.trigger("reposition", [offset]);
  };

  View.prototype.next = function() {
    var cur, next, nextEl, offset;
    cur = this.$el.find('.cur').removeClass('cur');
    next = cur.next();
    if (!next.length) {
      next = this.$el.find('li:first');
    }
    next.addClass('cur');
    nextEl = next[0];
    offset = nextEl.offsetTop + nextEl.offsetHeight + (nextEl.nextSibling ? nextEl.nextSibling.offsetHeight : 0);
    return this.scrollTop(Math.max(0, offset - this.$el.height()));
  };

  View.prototype.prev = function() {
    var cur, offset, prev, prevEl;
    cur = this.$el.find('.cur').removeClass('cur');
    prev = cur.prev();
    if (!prev.length) {
      prev = this.$el.find('li:last');
    }
    prev.addClass('cur');
    prevEl = prev[0];
    offset = prevEl.offsetTop + prevEl.offsetHeight + (prevEl.nextSibling ? prevEl.nextSibling.offsetHeight : 0);
    return this.scrollTop(Math.max(0, offset - this.$el.height()));
  };

  View.prototype.scrollTop = function(scrollTop) {
    var scrollDuration;
    scrollDuration = this.context.getOpt('scrollDuration');
    if (scrollDuration) {
      return this.$elUl.animate({
        scrollTop: scrollTop
      }, scrollDuration);
    } else {
      return this.$elUl.scrollTop(scrollTop);
    }
  };

  View.prototype.show = function() {
    var rect;
    if (this.stopShowing) {
      this.stopShowing = false;
      return;
    }
    if (!this.visible()) {
      this.$el.show();
      this.$el.scrollTop(0);
      this.context.trigger('shown');
    }
    if (rect = this.context.rect()) {
      return this.reposition(rect);
    }
  };

  View.prototype.hide = function(e, time) {
    var callback;
    if (!this.visible()) {
      return;
    }
    if (isNaN(time)) {
      this.$el.hide();
      return this.context.trigger('hidden', [e]);
    } else {
      callback = (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this);
      clearTimeout(this.timeoutID);
      return this.timeoutID = setTimeout(callback, time);
    }
  };

  View.prototype.render = function(list) {
    var $li, $ul, i, item, len, li, tpl;
    if (!($.isArray(list) && list.length > 0)) {
      this.hide();
      return;
    }
    this.$el.find('ul').empty();
    $ul = this.$el.find('ul');
    tpl = this.context.getOpt('displayTpl');
    for (i = 0, len = list.length; i < len; i++) {
      item = list[i];
      item = $.extend({}, item, {
        'atwho-at': this.context.at
      });
      li = this.context.callbacks("tplEval").call(this.context, tpl, item, "onDisplay");
      $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
      $li.data("item-data", item);
      $ul.append($li);
    }
    this.show();
    if (this.context.getOpt('highlightFirst')) {
      return $ul.find("li:first").addClass("cur");
    }
  };

  return View;

})();

var Api;

Api = {
  load: function(at, data) {
    var c;
    if (c = this.controller(at)) {
      return c.model.load(data);
    }
  },
  isSelecting: function() {
    var ref;
    return !!((ref = this.controller()) != null ? ref.view.visible() : void 0);
  },
  hide: function() {
    var ref;
    return (ref = this.controller()) != null ? ref.view.hide() : void 0;
  },
  reposition: function() {
    var c;
    if (c = this.controller()) {
      return c.view.reposition(c.rect());
    }
  },
  setIframe: function(iframe, asRoot) {
    this.setupRootElement(iframe, asRoot);
    return null;
  },
  run: function() {
    return this.dispatch();
  },
  destroy: function() {
    this.shutdown();
    return this.$inputor.data('atwho', null);
  }
};

$.fn.atwho = function(method) {
  var _args, result;
  _args = arguments;
  result = null;
  this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function() {
    var $this, app;
    if (!(app = ($this = $(this)).data("atwho"))) {
      $this.data('atwho', (app = new Product(this)));
    }
    if (typeof method === 'object' || !method) {
      return app.reg(method.at, method);
    } else if (Api[method] && app) {
      return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
    } else {
      return $.error("Method " + method + " does not exist on jQuery.atwho");
    }
  });
  if (result != null) {
    return result;
  } else {
    return this;
  }
};

$.fn.atwho["default"] = {
  at: void 0,
  alias: void 0,
  data: null,
  displayTpl: "<li>${name}</li>",
  insertTpl: "${atwho-at}${name}",
  headerTpl: null,
  callbacks: DEFAULT_CALLBACKS,
  searchKey: "name",
  suffix: void 0,
  hideWithoutSuffix: false,
  startWithSpace: true,
  acceptSpaceBar: false,
  highlightFirst: true,
  limit: 5,
  maxLen: 20,
  minLen: 0,
  displayTimeout: 300,
  delay: null,
  spaceSelectsMatch: false,
  tabSelectsMatch: true,
  editableAtwhoQueryAttrs: {},
  scrollDuration: 150,
  suspendOnComposing: true,
  lookUpOnClick: true
};

$.fn.atwho.debug = false;

}));

/*eslint eqeqeq: "error"*/ ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
            a(c)
    } : a(window.jQuery)
}(function($) {
    var _constructor = function(c, d) {

        this.id = ++$.FE.ID,
            this.opts = $.extend(!0, {}, $.extend({}, _constructor.DEFAULTS, "object" == typeof d && d));
        var options = JSON.stringify(this.opts);
        $.FE.OPTS_MAPPING[options] = $.FE.OPTS_MAPPING[options] || this.id,
            this.sid = $.FE.OPTS_MAPPING[options],
            $.FE.SHARED[this.sid] = $.FE.SHARED[this.sid] || {},
            this.shared = $.FE.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1,
            this.$oel = $(c),
            this.$oel.data("froala.editor", this),
            this.o_doc = c.ownerDocument,
            this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
        var f = $(this.o_win).scrollTop();
        this.$oel.on("froala.doInit", $.proxy(function() {

                    this.$oel.off("froala.doInit"),
                        this.doc = this.$el.get(0).ownerDocument,
                        this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow,
                        this.$doc = $(this.doc),
                        this.$win = $(this.win),
                        this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys($.FE.PLUGINS)),
                        this.opts.initOnClick ? (this.load($.FE.MODULES),
                            this.$el.on("touchstart.init", function() {

                                $(this).data("touched", !0)
                            }),
                            this.$el.on("touchmove.init", function() {

                                $(this).removeData("touched")
                            }),
                            this.$el.on("mousedown.init touchend.init dragenter.init focus.init", $.proxy(function(b) {

                                    if ("touchend" == b.type && !this.$el.data("touched")) return !0;
                                    if (1 === b.which || !b.which) {
                                        this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"),
                                            this.load($.FE.MODULES),
                                            this.load($.FE.PLUGINS);
                                        var c = b.originalEvent && b.originalEvent.originalTarget;
                                        c && "IMG" == c.tagName && $(c).trigger("mousedown"),
                                            void 0 === this.ul && this.destroy(),
                                            "touchend" == b.type && this.image && b.originalEvent && b.originalEvent.target && $(b.originalEvent.target).is("img") && setTimeout($.proxy(function() { this.image.edit($(b.originalEvent.target)) },
                                                    this),
                                                100),
                                            this.ready = !0, this.events.trigger("initialized")
                                    }
                                },
                                this)),
                            this.events.trigger("initializationDelayed")) : (this.load($.FE.MODULES),
                            this.load($.FE.PLUGINS),
                            $(this.o_win).scrollTop(f),
                            void 0 === this.ul && this.destroy(),
                            this.ready = !0, this.events.trigger("initialized"))
                },
                this)),
            this._init()
    };
    _constructor.DEFAULTS = { initOnClick: !1, pluginsEnabled: null },
        _constructor.MODULES = {},
        _constructor.PLUGINS = {},
        _constructor.VERSION = "2.7.0",
        _constructor.INSTANCES = [],
        _constructor.OPTS_MAPPING = {},
        _constructor.SHARED = {},
        _constructor.ID = 0,
        _constructor.prototype._init = function() {
            var tagName = this.$oel.prop("tagName");
            this.$oel.closest("label").length;
            var initCommon = $.proxy(function() {
                    "TEXTAREA" != tagName && (this._original_html = this._original_html || this.$oel.html());

                    this.$box = this.$box || this.$oel;
                    this.opts.fullPage && (this.opts.iframe = !0);
                    if (this.opts.iframe) {
                        this.$iframe = $('<iframe src="about:blank" frameBorder="0">');
                        this.$wp = $("<div></div>");
                        this.$box.html(this.$wp);
                        this.$wp.append(this.$iframe);
                        this.$iframe.get(0).contentWindow.document.open();
                        this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>");
                        this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>");
                        this.$iframe.get(0).contentWindow.document.close();
                        this.$el = this.$iframe.contents().find("body");
                        this.el = this.$el.get(0);
                        this.$head = this.$iframe.contents().find("head");
                        this.$html = this.$iframe.contents().find("html");
                        this.iframe_document = this.$iframe.get(0).contentWindow.document;
                        this.$oel.trigger("froala.doInit")
                    } else {
                        this.$el = $("<div></div>");
                        this.el = this.$el.get(0);
                        this.$wp = $("<div></div>").append(this.$el);
                        this.$box.html(this.$wp);
                        this.$oel.trigger("froala.doInit")
                    }

                }, this),
                initTextArea = $.proxy(function() {
                        this.$box = $("<div>"),
                            this.$oel.before(this.$box).hide(),
                            this._original_html = this.$oel.val(),
                            this.$oel.parents("form").on("submit." + this.id, $.proxy(function() { this.events.trigger("form.submit") },
                                this)),
                            this.$oel.parents("form").on("reset." + this.id, $.proxy(function() { this.events.trigger("form.reset") },
                                this)),
                            initCommon()
                    },
                    this),
                initA = $.proxy(function() {
                        this.$el = this.$oel, this.el = this.$el.get(0),
                            this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"),
                            this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
                    },
                    this),
                initIMG = $.proxy(function() {
                        this.$el = this.$oel, this.el = this.$el.get(0),
                            this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit")
                    },
                    this),
                initPopup = $.proxy(function() {
                        this.$el = this.$oel, this.el = this.$el.get(0),
                            this.opts.toolbarInline = !1, this.$oel.on("click.popup", function(a) { a.preventDefault() }),
                            this.$oel.trigger("froala.doInit")
                    },
                    this);
            this.opts.editInPopup ? initPopup() :
                "TEXTAREA" == tagName ? initTextArea() :
                "A" == tagName ? initA() :
                "IMG" == tagName ? initIMG() :
                "BUTTON" == tagName || "INPUT" == tagName ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, initPopup()) : initCommon()
        },
        _constructor.prototype.load = function(Module_plugins) {
            for (var c in Module_plugins)
                if (Module_plugins.hasOwnProperty(c)) {
                    if (this[c]) continue;
                    if ($.FE.PLUGINS[c] && this.opts.pluginsEnabled.indexOf(c) < 0) continue;

                    if (this[c] = new Module_plugins[c](this),
                        this[c]._init && (this[c]._init(),
                            this.opts.initOnClick && "core" == c)) return !1
                }
        },
        _constructor.prototype.destroy = function() {
            this.shared.count--, this.events.$off();
            var b = this.html.get();

            if (this.events.trigger("destroy", [], !0),
                this.events.trigger("shared.destroy", void 0, !0),
                0 === this.shared.count) {
                for (var c in this.shared) this.shared.hasOwnProperty(c) && (this.shared[c], $.FE.SHARED[this.sid][c] = null);
                $.FE.SHARED[this.sid] = {}
            }
            this.$oel.parents("form").off("." + this.id),
                this.$oel.off("click.popup"),
                this.$oel.removeData("froala.editor"),
                this.$oel.off("froalaEditor"),
                this.core.destroy(b),
                $.FE.INSTANCES.splice($.FE.INSTANCES.indexOf(this),
                    1)
        },
        $.fn.froalaEditor = function(options) {
            for (var args = [], e = 0; e < arguments.length; e++) args.push(arguments[e]);
            if ("string" == typeof options) {
                var f = [];
                return this.each(function() {
                        var $this = $(this),
                            editor = $this.data("froala.editor");
                        if (editor) {
                            var g, h;
                            if (options.indexOf(".") > 0 && editor[options.split(".")[0]] ? (editor[options.split(".")[0]] && (g = editor[options.split(".")[0]]),
                                    h = options.split(".")[1]) : (g = editor, h = options.split(".")[0]), !g[h]) return $.error("Method " + options + " does not exist in Froala Editor.");
                            var i = g[h].apply(editor, args.slice(1));
                            void 0 === i ? f.push(this) : 0 === f.length && f.push(i)
                        }
                    }),
                    1 == f.length ? f[0] : f
            }

            if ("object" == typeof options || !options) return this.each(function() {
                $(this).data("froala.editor") || new _constructor(this, options)
            })
        },
        $.fn.froalaEditor.Constructor = _constructor,
        $.FroalaEditor = _constructor,
        $.FE = _constructor,
        $.FE.XS = 0, $.FE.SM = 1, $.FE.MD = 2, $.FE.LG = 3;
    var c = "a-z\\u0080-\\u009f\\u00a1-\\uffff0-9";
    $.FE.LinkRegExCommon = "(([" + c + "])|([" + c + "](\\.|-|_))){1,}[" + c + "]{1,}", $.FE.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?!^=%&amp;/~+#-_{}]*)|())", $.FE.LinkRegExTLD = "((" + $.FE.LinkRegExCommon + ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))", $.FE.LinkRegExHTTP = "((ftp|http|https):\\/\\/" + $.FE.LinkRegExCommon + ")", $.FE.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@" + $.FE.LinkRegExCommon + ")", $.FE.LinkRegExWWW = "(www\\." + $.FE.LinkRegExCommon + "\\.[a-z0-9-]{2,24})", $.FE.LinkRegEx = "(" + $.FE.LinkRegExTLD + "|" + $.FE.LinkRegExHTTP + "|" + $.FE.LinkRegExWWW + "|" + $.FE.LinkRegExAuth + ")" + $.FE.LinkRegExEnd, $.FE.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], $.FE.MAIL_REGEX = /.+@.+\..+/i, $.FE.MODULES.helpers = function(b) {
            function getIEVersion() {
                var a, b, c = -1;
                return "Microsoft Internet Explorer" == navigator.appName ? (a = navigator.userAgent, b = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"),
                        null !== b.exec(a) && (c = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (a = navigator.userAgent, b = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"),
                        null !== b.exec(a) && (c = parseFloat(RegExp.$1))),
                    c
            }

            function getBrowser() {
                var a = {},
                    b = getIEVersion();

                if (b > 0) a.msie = !0;
                else {
                    var userAgent = navigator.userAgent.toLowerCase(),
                        version = /(edge)[ \/]([\w.]+)/.exec(userAgent) || /(chrome)[ \/]([\w.]+)/.exec(userAgent) || /(webkit)[ \/]([\w.]+)/.exec(userAgent) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) || /(msie) ([\w.]+)/.exec(userAgent) || userAgent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [],
                        f = { browser: version[1] || "", version: version[2] || "0" };
                    version[1] && (a[f.browser] = !0),
                        a.chrome ? a.webkit = !0 : a.webkit && (a.safari = !0)
                }
                return a.msie && (a.version = b),
                    a
            }

            function isIOS() { return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !isWindowsPhone() }

            function isAndroid() { return /(Android)/g.test(navigator.userAgent) && !isWindowsPhone() }

            function isBlackberry() { return /(Blackberry)/g.test(navigator.userAgent) }

            function isWindowsPhone() { return /(Windows Phone)/gi.test(navigator.userAgent) }

            function isMobile() { return isAndroid() || isIOS() || isBlackberry() }

            function requestAnimationFrame() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) { window.setTimeout(a, 1e3 / 60) } }

            function getPX(a) { return parseInt(a, 10) || 0 }

            function screenSize() {
                var b = $('<div class="fr-visibility-helper"></div>').appendTo("body:first"),
                    c = getPX(b.css("margin-left"));
                return b.remove(),
                    c
            }

            function isTouch() { return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch }

            function isURL(b) {
                return !!/^(https?:|ftps?:|)\/\//i.test(b) && (b = String(b).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"),
                    new RegExp("^" + $.FE.LinkRegEx + "$", "gi").test(b))
            }

            function sanitizeURL(b) {
                if (/^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(b)) return b;
                if (/^(https?:|ftps?:|)\/\//i.test(b)) {
                    if (!isURL(b) && !isURL("http:" + b)) return ""
                } else {
                    if (new RegExp("^(" + $.FE.LinkProtocols.join("|") + "):\\/\\/", "i").test(b)) return b;
                    b = encodeURIComponent(b).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}")
                }
                return b
            }

            function isArray(a) { return a && !a.propertyIsEnumerable("length") && "object" == typeof a && "number" == typeof a.length }

            function RGBToHex(a) {
                function b(a) { return ("0" + parseInt(a, 10).toString(16)).slice(-2) }
                try {
                    return a && "transparent" !== a ? /^#[0-9A-F]{6}$/i.test(a) ? a :
                        (a = a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),
                            ("#" + b(a[1]) + b(a[2]) + b(a[3])).toUpperCase()) : ""
                } catch (c) { return null }
            }

            function HEXtoRGB(a) {
                var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                a = a.replace(b, function(a, b, c, d) { return b + b + c + c + d + d });
                var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                return c ? "rgb(" + parseInt(c[1], 16) + ", " + parseInt(c[2], 16) + ", " + parseInt(c[3], 16) + ")" : ""
            }

            function getAlignment(c) {
                var d = (c.css("text-align") || "").replace(/-(.*)-/g, "");

                if (["left", "right", "justify", "center"].indexOf(d) < 0) {
                    if (!y) {
                        var e = $('<div dir="' + ("rtl" == b.opts.direction ? "rtl" : "auto") + '" style="text-align: ' + b.$el.css("text-align") + '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
                        $("body:first").append(e);
                        var f = e.find("#s1").get(0).getBoundingClientRect().left,
                            g = e.find("#s2").get(0).getBoundingClientRect().left;
                        e.remove(),
                            y = f < g ? "left" : "right"
                    }
                    d = y
                }
                return d
            }

            function isMac() {
                return null == z && (z = navigator.platform.toUpperCase().indexOf("MAC") >= 0),
                    z
            }

            function u() {
                function a(a, b) {
                    var e = a[b];
                    a[b] = function(a) {
                        var b, f = !1,
                            g = !1;
                        if (a && a.match(d)) {
                            a = a.replace(d, ""),
                                this.parentNode || (c.appendChild(this),
                                    g = !0);
                            var h = this.parentNode;
                            return this.id || (this.id = "rootedQuerySelector_id_" + (new Date).getTime(),
                                    f = !0),
                                b = e.call(h, "#" + this.id + " " + a),
                                f && (this.id = ""),
                                g && c.removeChild(this),
                                b
                        }
                        return e.call(this, a)
                    }
                }
                var c = b.o_doc.createElement("div");
                try { c.querySelectorAll(":scope *") } catch (e) {
                    var d = /^\s*:scope/gi;
                    a(Element.prototype, "querySelector"),
                        a(Element.prototype, "querySelectorAll"),
                        a(HTMLElement.prototype, "querySelector"),
                        a(HTMLElement.prototype, "querySelectorAll")
                }
            }

            function scrollTop() { return b.o_win.pageYOffset ? b.o_win.pageYOffset : b.o_doc.documentElement && b.o_doc.documentElement.scrollTop ? b.o_doc.documentElement.scrollTop : b.o_doc.body.scrollTop ? b.o_doc.body.scrollTop : 0 }

            function scrollLeft() { return b.o_win.pageXOffset ? b.o_win.pageXOffset : b.o_doc.documentElement && b.o_doc.documentElement.scrollLeft ? b.o_doc.documentElement.scrollLeft : b.o_doc.body.scrollLeft ? b.o_doc.body.scrollLeft : 0 }

            function _init() {
                b.browser = getBrowser(),
                    u()
            }
            var y, z = null;
            return {
                _init: _init,
                isIOS: isIOS,
                isMac: isMac,
                isAndroid: isAndroid,
                isBlackberry: isBlackberry,
                isWindowsPhone: isWindowsPhone,
                isMobile: isMobile,
                requestAnimationFrame: requestAnimationFrame,
                getPX: getPX,
                screenSize: screenSize,
                isTouch: isTouch,
                sanitizeURL: sanitizeURL,
                isArray: isArray,
                RGBToHex: RGBToHex,
                HEXtoRGB: HEXtoRGB,
                isURL: isURL,
                getAlignment: getAlignment,
                scrollTop: scrollTop,
                scrollLeft: scrollLeft
            }
        },
        $.FE.MODULES.events = function(b) {
            function registerEvent(a, b, c) { $on(a, b, c) }

            function cut_copy_paste_beforepaste() { registerEvent(b.$el, "cut copy paste beforepaste", function(a) { trigger(a.type, [a]) }) }

            function mouseEvents() {
                registerEvent(b.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(a) { trigger(a.type, [a]) }),
                    on("mousedown", function() { for (var c = 0; c < $.FE.INSTANCES.length; c++) $.FE.INSTANCES[c] != b && $.FE.INSTANCES[c].popups && $.FE.INSTANCES[c].popups.areVisible() && $.FE.INSTANCES[c].$el.find(".fr-marker").remove() })
            }

            function keyEvents() {
                registerEvent(b.$el, "keydown keypress keyup input", function(a) {
                    trigger(a.type, [a])
                })
            }

            function g() {
                registerEvent(b.$win, b._mousedown, function(a) {
                        trigger("window.mousedown", [a]),
                            enableBlur()
                    }),
                    registerEvent(b.$win, b._mouseup, function(a) { trigger("window.mouseup", [a]) }),
                    registerEvent(b.$win, "cut copy keydown keyup touchmove touchend", function(a) {
                        trigger("window." + a.type, [a])
                    })
            }

            function dragDropEvents() {
                registerEvent(b.$doc, "dragend drop", function(a) {
                    trigger("document." + a.type, [a])
                })
            }

            function focus(c) {
                if (void 0 === c && (c = !0), !b.$wp) return !1;
                if (b.helpers.isIOS() && b.$win.get(0).focus(), !b.core.hasFocus() && c) {
                    var d = b.$win.scrollTop();
                    return b.browser.msie && b.$box && b.$box.css("position", "fixed"),
                        b.browser.msie && b.$wp && b.$wp.css("overflow", "visible"),
                        disableBlue(),
                        b.$el.focus(),
                        enableBlur(),
                        b.browser.msie && b.$box && b.$box.css("position", ""),
                        b.browser.msie && b.$wp && b.$wp.css("overflow", "auto"),
                        d != b.$win.scrollTop() && b.$win.scrollTop(d), !1
                }

                if (!b.core.hasFocus() || b.$el.find(".fr-marker").length > 0) return !1;
                if (b.selection.info(b.el).atStart && b.selection.isCollapsed() && null != b.html.defaultTag()) {
                    var e = b.markers.insert();

                    if (e && !b.node.blockParent(e)) {
                        $(e).remove();
                        var f = b.$el.find(b.html.blockTagsQuery()).get(0);
                        f && ($(f).prepend($.FE.MARKERS),
                            b.selection.restore())
                    } else e && $(e).remove()
                }
            }

            function j() {
                registerEvent(b.$el, "focus", function(a) {
                        blueActive() && (focus(!1), !1 === C && trigger(a.type, [a]))
                    }),
                    registerEvent(b.$el, "blur", function(a) {
                        blueActive() && !0 === C && (trigger(a.type, [a]),
                            enableBlur())
                    }),
                    on("focus", function() { C = !0 }),
                    on("blur", function() { C = !1 })
            }

            function eventNames() {
                b.helpers.isMobile() ? (b._mousedown = "touchstart", b._mouseup = "touchend", b._move = "touchmove", b._mousemove = "touchmove") :
                    (b._mousedown = "mousedown", b._mouseup = "mouseup", b._move = "", b._mousemove = "mousemove")
            }

            function l(c) {
                var d = $(c.currentTarget);
                return b.edit.isDisabled() || b.node.hasClass(d.get(0),
                    "fr-disabled") ? (c.preventDefault(), !1) : "mousedown" === c.type && 1 !== c.which || (b.helpers.isMobile() || c.preventDefault(),
                    (b.helpers.isAndroid() || b.helpers.isWindowsPhone()) && 0 === d.parents(".fr-dropdown-menu").length && (c.preventDefault(),
                        c.stopPropagation()),
                    d.addClass("fr-selected"),
                    void b.events.trigger("commands.mousedown", [d]))
            }

            function m(c, d) {
                var e = $(c.currentTarget);

                if (b.edit.isDisabled() || b.node.hasClass(e.get(0),
                        "fr-disabled")) return c.preventDefault(), !1;
                if ("mouseup" === c.type && 1 !== c.which) return !0;
                if (!b.node.hasClass(e.get(0),
                        "fr-selected")) return !0;
                if ("touchmove" != c.type) {
                    if (c.stopPropagation(),
                        c.stopImmediatePropagation(),
                        c.preventDefault(), !b.node.hasClass(e.get(0),
                            "fr-selected")) return b.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), !1;
                    if (b.button.getButtons(".fr-selected", !0).removeClass("fr-selected"),
                        e.data("dragging") || e.attr("disabled")) return e.removeData("dragging"), !1;
                    var f = e.data("timeout");
                    f && (clearTimeout(f),
                            e.removeData("timeout")),
                        d.apply(b, [c])
                } else e.data("timeout") || e.data("timeout", setTimeout(function() { e.data("dragging", !0) },
                    100))
            }

            function enableBlur() { A = !0 }

            function disableBlue() { A = !1 }

            function blueActive() { return A }

            function bindClick(a, c, d) {
                $on(a, b._mousedown, c, function(a) { b.edit.isDisabled() || l(a) }, !0),
                    $on(a, b._mouseup + " " + b._move, c, function(a) { b.edit.isDisabled() || m(a, d) }, !0),
                    $on(a, "mousedown click mouseup", c, function(a) { b.edit.isDisabled() || a.stopPropagation() }, !0),
                    on("window.mouseup", function() {
                        b.edit.isDisabled() || (a.find(c).removeClass("fr-selected"),
                            enableBlur())
                    })
            }

            function on(a, c, d) {
                var e = a.split(" ");

                if (e.length > 1) {
                    for (var f = 0; f < e.length; f++) on(e[f], c, d);
                    return !0
                }
                void 0 === d && (d = !1);
                var g;
                g = 0 !== a.indexOf("shared.") ? B[a] = B[a] || [] : b.shared._events[a] = b.shared._events[a] || [], d ? g.unshift(c) : g.push(c)
            }

            function $on(a, c, d, e, f) {
                "function" == typeof d && (f = e, e = d, d = !1);
                var g = f ? b.shared.$_events : D,
                    h = f ? b.sid : b.id;
                d ? a.on(c.split(" ").join(".ed" + h + " ") + ".ed" + h, d, e) : a.on(c.split(" ").join(".ed" + h + " ") + ".ed" + h, e),
                    g.push([a, c.split(" ").join(".ed" + h + " ") + ".ed" + h])
            }

            function t(a) { for (var b = 0; b < a.length; b++) a[b][0].off(a[b][1]) }

            function $off() {
                t(D),
                    D = [], 0 === b.shared.count && (t(b.shared.$_events),
                        b.shared.$_events = [])
            }

            function trigger(c, d, e) {
                if (!b.edit.isDisabled() || e) {
                    var f;
                    if (0 !== c.indexOf("shared.")) f = B[c];
                    else {
                        if (b.shared.count > 0) return !1;
                        f = b.shared._events[c]
                    }
                    var g;
                    if (f)
                        for (var h = 0; h < f.length; h++)
                            if (!1 === (g = f[h].apply(b, d))) return !1;
                    return !1 !== (g = b.$oel.triggerHandler("froalaEditor." + c, $.merge([b], d || []))) && g
                }
            }

            function chainTrigger(c, d, e) {
                if (!b.edit.isDisabled() || e) {
                    var f;
                    if (0 !== c.indexOf("shared.")) f = B[c];
                    else {
                        if (b.shared.count > 0) return !1;
                        f = b.shared._events[c]
                    }
                    var g;
                    if (f)
                        for (var h = 0; h < f.length; h++) void 0 !== (g = f[h].apply(b, [d])) && (d = g);
                    return g = b.$oel.triggerHandler("froalaEditor." + c, $.merge([b], [d])),
                        void 0 !== g && (d = g),
                        d
                }
            }

            function onDestroy() { for (var a in B) B.hasOwnProperty(a) && delete B[a] }

            function onSharedDestroy() { for (var a in b.shared._events) b.shared._events.hasOwnProperty(a) && delete b.shared._events[a] }

            function _init() {
                b.shared.$_events = b.shared.$_events || [],
                    b.shared._events = {},
                    eventNames(),
                    mouseEvents(),
                    g(),
                    dragDropEvents(),
                    keyEvents(),
                    j(),
                    enableBlur(),
                    cut_copy_paste_beforepaste(),
                    on("destroy", onDestroy),
                    on("shared.destroy", onSharedDestroy)
            }
            var A, B = {},
                C = !1,
                D = [];
            return {
                _init: _init,
                on: on,
                trigger: trigger,
                bindClick: bindClick,
                disableBlur: disableBlue,
                enableBlur: enableBlur,
                blurActive: blueActive,
                focus: focus,
                chainTrigger: chainTrigger,
                $on: $on,
                $off: $off
            }
        },
        $.FE.MODULES.node = function(b) {
            function contents(a) { return a && "IFRAME" != a.tagName ? Array.prototype.slice.call(a.childNodes || []) : [] }

            function isBlock(b) { return !!b && (b.nodeType == Node.ELEMENT_NODE && $.FE.BLOCK_TAGS.indexOf(b.tagName.toLowerCase()) >= 0) }

            function isLink(a) { return !!a && (a.nodeType == Node.ELEMENT_NODE && "a" == a.tagName.toLowerCase()) }

            function isEmpty(e, f) {
                if (!e) return !0;
                if (e.querySelector("table")) return !1;
                var g = contents(e);
                1 == g.length && isBlock(g[0]) && (g = contents(g[0]));
                for (var h = !1, i = 0; i < g.length; i++) {
                    var j = g[i];
                    if ((!f || !b.node.hasClass(j, "fr-marker")) && (j.nodeType != Node.TEXT_NODE || 0 !== j.textContent.length)) {
                        if ("BR" != j.tagName && (j.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length > 0) return !1;
                        if (h) return !1;
                        "BR" == j.tagName && (h = !0)
                    }
                }
                return !(e.querySelectorAll($.FE.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length) &&
                    (!e.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") && (!(e.querySelectorAll($.FE.BLOCK_TAGS.join(",")).length > 1) && !e.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)")))
            }

            function blockParent(a) {
                for (; a && a.parentNode !== b.el && (!a.parentNode || !b.node.hasClass(a.parentNode, "fr-inner"));)
                    if (a = a.parentNode, isBlock(a)) return a;
                return null
            }

            function deepestParent(c, e, f) {
                if (void 0 === e && (e = []),
                    void 0 === f && (f = !0),
                    e.push(b.el),
                    e.indexOf(c.parentNode) >= 0 || c.parentNode && b.node.hasClass(c.parentNode, "fr-inner") || c.parentNode && $.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) >= 0 && f) return null;
                for (; e.indexOf(c.parentNode) < 0 && c.parentNode && !b.node.hasClass(c.parentNode, "fr-inner") && ($.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName) < 0 || !f) && (!isBlock(c) || !isBlock(c.parentNode) || !f);) c = c.parentNode;
                return c
            }

            function rawAttibutes(a) {
                var b = {},
                    c = a.attributes;
                if (c)
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        b[e.nodeName] = e.value
                    }
                return b
            }

            function attributes(a) {
                for (var b = "", c = rawAttibutes(a),
                        d = Object.keys(c).sort(),
                        e = 0; e < d.length; e++) {
                    var f = d[e],
                        g = c[f];
                    g.indexOf("'") < 0 && g.indexOf('"') >= 0 ? b += " " + f + "='" + g + "'" : g.indexOf('"') >= 0 && g.indexOf("'") >= 0 ? (g = g.replace(/"/g, "&quot;"),
                        b += " " + f + '="' + g + '"') : b += " " + f + '="' + g + '"'
                }
                return b
            }

            function clearAttributes(a) {
                for (var b = a.attributes, c = b.length - 1; c >= 0; c--) {
                    var d = b[c];
                    a.removeAttribute(d.nodeName)
                }
            }

            function openTagString(a) { return "<" + a.tagName.toLowerCase() + attributes(a) + ">" }

            function closeTagString(a) { return "</" + a.tagName.toLowerCase() + ">" }

            function isFirstSibling(a, c) {
                void 0 === c && (c = !0);
                for (var d = a.previousSibling; d && c && b.node.hasClass(d, "fr-marker");) d = d.previousSibling;
                return !d || d.nodeType == Node.TEXT_NODE && "" === d.textContent && isFirstSibling(d)
            }

            function isLassibling(a, c) {
                void 0 === c && (c = !0);
                for (var d = a.nextSibling; d && c && b.node.hasClass(d, "fr-marker");) d = d.nextSibling;
                return !d || d.nodeType == Node.TEXT_NODE && "" === d.textContent && isLassibling(d)
            }

            function isVoid(b) { return b && b.nodeType == Node.ELEMENT_NODE && $.FE.VOID_ELEMENTS.indexOf((b.tagName || "").toLowerCase()) >= 0 }

            function isList(a) { return !!a && ["UL", "OL"].indexOf(a.tagName) >= 0 }

            function isElement(a) { return a === b.el }

            function isDeleteable(a) { return a && a.nodeType == Node.ELEMENT_NODE && a.getAttribute("class") && (a.getAttribute("class") || "").indexOf("fr-deletable") >= 0 }

            function hasFocus(a) { return a === b.doc.activeElement && (!b.doc.hasFocus || b.doc.hasFocus()) && !!(isElement(a) || a.type || a.href || ~a.tabIndex) }

            function isEditable(a) { return (!a.getAttribute || "false" != a.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(a.tagName) < 0 }

            function hasClass(b, c) {
                return b instanceof $ && (b = b.get(0)),
                    b && b.classList && b.classList.contains(c)
            }

            function filter(a) { return b.browser.msie ? a : { acceptNode: a } }
            return {
                isBlock: isBlock,
                isEmpty: isEmpty,
                blockParent: blockParent,
                deepestParent: deepestParent,
                rawAttributes: rawAttibutes,
                attributes: attributes,
                clearAttributes: clearAttributes,
                openTagString: openTagString,
                closeTagString: closeTagString,
                isFirstSibling: isFirstSibling,
                isLastSibling: isLassibling,
                isList: isList,
                isLink: isLink,
                isElement: isElement,
                contents: contents,
                isVoid: isVoid,
                hasFocus: hasFocus,
                isEditable: isEditable,
                isDeletable: isDeleteable,
                hasClass: hasClass,
                filter: filter
            }
        },
        $.FE.INVISIBLE_SPACE = "&#8203;",
        $.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' +
        $.FE.INVISIBLE_SPACE + "</span>",
        $.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' +
        $.FE.INVISIBLE_SPACE + "</span>",
        $.FE.MARKERS = $.FE.START_MARKER + $.FE.END_MARKER,
        $.FE.MODULES.markers = function(b) {
            function c(c, d) { return $('<span class="fr-marker" data-id="' + d + '" data-type="' + c + '" style="display: ' + (b.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + $.FE.INVISIBLE_SPACE + "</span>", b.doc)[0] }

            function place(d, e, f) {
                var g, h, i;
                try {
                    var j = d.cloneRange();

                    if (j.collapse(e),
                        j.insertNode(c(e, f)), !0 === e)
                        for (g = b.$el.find('span.fr-marker[data-type="true"][data-id="' + f + '"]').get(0),
                            i = g.nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) $(i).remove(),
                            i = g.nextSibling;
                    if (!0 === e && !d.collapsed) {
                        for (; !b.node.isElement(g.parentNode) && !i;) $(g.parentNode).after(g),
                            i = g.nextSibling;
                        if (i && i.nodeType === Node.ELEMENT_NODE && b.node.isBlock(i)) {
                            h = [i];
                            do { i = h[0], h = b.node.contents(i) }
                            while (h[0] && b.node.isBlock(h[0]));
                            $(i).prepend($(g))
                        }
                    }

                    if (!1 === e && !d.collapsed) {
                        if (g = b.$el.find('span.fr-marker[data-type="false"][data-id="' + f + '"]').get(0),
                            (i = g.previousSibling) && i.nodeType === Node.ELEMENT_NODE && b.node.isBlock(i)) {
                            h = [i];
                            do { i = h[h.length - 1], h = b.node.contents(i) }
                            while (h[h.length - 1] && b.node.isBlock(h[h.length - 1]));
                            $(i).append($(g))
                        }
                        g.parentNode && ["TD", "TH"].indexOf(g.parentNode.tagName) >= 0 && g.parentNode.previousSibling && !g.previousSibling && $(g.parentNode.previousSibling).append(g)
                    }
                    var k = b.$el.find('span.fr-marker[data-type="' + e + '"][data-id="' + f + '"]').get(0);
                    return k && (k.style.display = "none"),
                        k
                } catch (l) { return null }
            }

            function insert() {
                if (!b.$wp) return null;
                try {
                    var c = b.selection.ranges(0),
                        d = c.commonAncestorContainer;
                    if (d != b.el && 0 === b.$el.find(d).length) return null;
                    var e = c.cloneRange(),
                        f = c.cloneRange();
                    e.collapse(!0);
                    var g = $('<span class="fr-marker" style="display: none; line-height: 0;">' + $.FE.INVISIBLE_SPACE + "</span>", b.doc)[0];
                    if (e.insertNode(g),
                        g = b.$el.find("span.fr-marker").get(0)) {
                        for (var h = g.nextSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.textContent.length;) $(h).remove(),
                            h = b.$el.find("span.fr-marker").get(0).nextSibling;
                        return b.selection.clear(),
                            b.selection.get().addRange(f),
                            g
                    }
                    return null
                } catch (i) {}
            }

            function split() {
                b.selection.isCollapsed() || b.selection.remove();
                var c = b.$el.find(".fr-marker").get(0);

                if (null == c && (c = insert()),
                    null == c) return null;
                var d = b.node.deepestParent(c);

                if (d || (d = b.node.blockParent(c)) && "LI" != d.tagName && (d = null),
                    d)
                    if (b.node.isBlock(d) && b.node.isEmpty(d)) "LI" != d.tagName || d.parentNode.firstElementChild != d || b.node.isEmpty(d.parentNode) ? $(d).replaceWith('<span class="fr-marker"></span>') : $(d).append('<span class="fr-marker"></span>');
                    else
                if (b.cursor.isAtStart(c, d)) $(d).before('<span class="fr-marker"></span>'),
                    $(c).remove();
                else
                if (b.cursor.isAtEnd(c, d)) $(d).after('<span class="fr-marker"></span>'),
                    $(c).remove();
                else {
                    var f = c,
                        g = "",
                        h = "";
                    do {
                        f = f.parentNode, g += b.node.closeTagString(f),
                            h = b.node.openTagString(f) + h
                    }
                    while (f != d);
                    $(c).replaceWith('<span id="fr-break"></span>');
                    var i = b.node.openTagString(d) + $(d).html() + b.node.closeTagString(d);
                    i = i.replace(/<span id="fr-break"><\/span>/g, g + '<span class="fr-marker"></span>' + h),
                        $(d).replaceWith(i)
                }
                return b.$el.find(".fr-marker").get(0)
            }

            function insertAtPoint(a) {
                var c = a.clientX,
                    d = a.clientY;
                remove();
                var f, g = null;
                if (void 0 !== b.doc.caretPositionFromPoint ? (f = b.doc.caretPositionFromPoint(c, d),
                        g = b.doc.createRange(),
                        g.setStart(f.offsetNode, f.offset),
                        g.setEnd(f.offsetNode, f.offset)) : void 0 !== b.doc.caretRangeFromPoint && (f = b.doc.caretRangeFromPoint(c, d),
                        g = b.doc.createRange(),
                        g.setStart(f.startContainer, f.startOffset),
                        g.setEnd(f.startContainer, f.startOffset)),
                    null !== g && void 0 !== b.win.getSelection) {
                    var i = b.win.getSelection();
                    i.removeAllRanges(),
                        i.addRange(g)
                } else
                if (void 0 !== b.doc.body.createTextRange) try {
                    g = b.doc.body.createTextRange(),
                        g.moveToPoint(c, d);
                    var j = g.duplicate();
                    j.moveToPoint(c, d),
                        g.setEndPoint("EndToEnd", j),
                        g.select()
                }
                catch (k) { return !1 }
                insert()
            }

            function remove() { b.$el.find(".fr-marker").remove() }
            return {
                place: place,
                insert: insert,
                split: split,
                insertAtPoint: insertAtPoint,
                remove: remove
            }
        },
        $.FE.MODULES.selection = function(b) {
            function text() {
                var a = "";
                return b.win.getSelection ? a = b.win.getSelection() : b.doc.getSelection ? a = b.doc.getSelection() : b.doc.selection && (a = b.doc.selection.createRange().text),
                    a.toString()
            }

            function get() { return b.win.getSelection ? b.win.getSelection() : b.doc.getSelection ? b.doc.getSelection() : b.doc.selection.createRange() }

            function range(a) {
                var c = get(),
                    e = [];
                if (c && c.getRangeAt && c.rangeCount) { e = []; for (var f = 0; f < c.rangeCount; f++) e.push(c.getRangeAt(f)) } else e = b.doc.createRange ? [b.doc.createRange()] : [];
                return void 0 !== a ? e[a] : e
            }

            function clear() {
                var a = get();
                try { a.removeAllRanges ? a.removeAllRanges() : a.empty ? a.empty() : a.clear && a.clear() } catch (b) {}
            }

            function element() {
                var f = get();
                try {
                    if (f.rangeCount) {
                        var g, h = range(0),
                            i = h.startContainer;
                        if (i.nodeType == Node.TEXT_NODE && h.startOffset == (i.textContent || "").length && i.nextSibling && (i = i.nextSibling),
                            i.nodeType == Node.ELEMENT_NODE) {
                            var j = !1;
                            if (i.childNodes.length > 0 && i.childNodes[h.startOffset]) {
                                for (g = i.childNodes[h.startOffset]; g && g.nodeType == Node.TEXT_NODE && 0 === g.textContent.length;) g = g.nextSibling;
                                if (g && g.textContent.replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && (i = g, j = !0), !j && i.childNodes.length > 1 && h.startOffset > 0 && i.childNodes[h.startOffset - 1]) {
                                    for (g = i.childNodes[h.startOffset - 1]; g && g.nodeType == Node.TEXT_NODE && 0 === g.textContent.length;) g = g.nextSibling;
                                    g && g.textContent.replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && (i = g, j = !0)
                                }
                            } else !h.collapsed && i.nextSibling && i.nextSibling.nodeType == Node.ELEMENT_NODE && (g = i.nextSibling) && g.textContent.replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && (i = g, j = !0);
                            !j && i.childNodes.length > 0 && $(i.childNodes[0]).text().replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(i.childNodes[0].tagName) < 0 && (i = i.childNodes[0])
                        }
                        for (; i.nodeType != Node.ELEMENT_NODE && i.parentNode;) i = i.parentNode;
                        for (var k = i; k && "HTML" != k.tagName;) {
                            if (k == b.el) return i;
                            k = $(k).parent()[0]
                        }
                    }
                } catch (l) {}
                return b.el
            }

            function endElement() {
                var f = get();
                try {
                    if (f.rangeCount) {
                        var g, h = range(0),
                            i = h.endContainer;
                        if (i.nodeType == Node.ELEMENT_NODE) {
                            var j = !1;
                            i.childNodes.length > 0 && i.childNodes[h.endOffset] && $(i.childNodes[h.endOffset]).text() === text() ? (i = i.childNodes[h.endOffset], j = !0) : !h.collapsed && i.previousSibling && i.previousSibling.nodeType == Node.ELEMENT_NODE ? (g = i.previousSibling) && g.textContent.replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && (i = g, j = !0) : !h.collapsed && i.childNodes.length > 0 && i.childNodes[h.endOffset] && (g = i.childNodes[h.endOffset].previousSibling, g.nodeType == Node.ELEMENT_NODE && g && g.textContent.replace(/\u200B/g, "") === text().replace(/\u200B/g, "") && (i = g, j = !0)), !j && i.childNodes.length > 0 && $(i.childNodes[i.childNodes.length - 1]).text() === text() && ["BR", "IMG", "HR"].indexOf(i.childNodes[i.childNodes.length - 1].tagName) < 0 && (i = i.childNodes[i.childNodes.length - 1])
                        }
                        for (i.nodeType == Node.TEXT_NODE && 0 === h.endOffset && i.previousSibling && i.previousSibling.nodeType == Node.ELEMENT_NODE && (i = i.previousSibling); i.nodeType != Node.ELEMENT_NODE && i.parentNode;) i = i.parentNode;
                        for (var k = i; k && "HTML" != k.tagName;) {
                            if (k == b.el) return i;
                            k = $(k).parent()[0]
                        }
                    }
                } catch (l) {}
                return b.el
            }

            function rangeElement(a, b) {
                var c = a;
                return c.nodeType == Node.ELEMENT_NODE && c.childNodes.length > 0 && c.childNodes[b] && (c = c.childNodes[b]),
                    c.nodeType == Node.TEXT_NODE && (c = c.parentNode),
                    c
            }

            function blocks() {
                var c, f = [],
                    g = get();

                if (inEditor() && g.rangeCount) {
                    var h = range();
                    for (c = 0; c < h.length; c++) {
                        var j, k = h[c],
                            l = rangeElement(k.startContainer, k.startOffset),
                            m = rangeElement(k.endContainer, k.endOffset);
                        b.node.isBlock(l) && f.indexOf(l) < 0 && f.push(l),
                            j = b.node.blockParent(l),
                            j && f.indexOf(j) < 0 && f.push(j);
                        for (var n = [], o = l; o !== m && o !== b.el;) n.indexOf(o) < 0 && o.children && o.children.length ? (n.push(o),
                                o = o.children[0]) : o.nextSibling ? o = o.nextSibling : o.parentNode && (o = o.parentNode, n.push(o)),
                            b.node.isBlock(o) && n.indexOf(o) < 0 && f.indexOf(o) < 0 && (o !== m || k.endOffset > 0) && f.push(o);
                        b.node.isBlock(m) && f.indexOf(m) < 0 && k.endOffset > 0 && f.push(m),
                            j = b.node.blockParent(m),
                            j && f.indexOf(j) < 0 && f.push(j)
                    }
                }
                for (c = f.length - 1; c > 0; c--) $(f[c]).find(f).length && ("LI" != f[c].tagName || f[c].children.length > 0 && f.indexOf(f[c].children[0]) >= 0) && f.splice(c, 1);
                return f
            }

            function save() {
                if (b.$wp) {
                    b.markers.remove();
                    var c, d, f = range(),
                        g = [];
                    for (d = 0; d < f.length; d++)
                        if (f[d].startContainer !== b.doc || b.browser.msie) {
                            c = f[d];
                            var h = c.collapsed,
                                i = b.markers.place(c, !0, d),
                                j = b.markers.place(c, !1, d);
                            void 0 !== i && i || !h || ($(".fr-marker").remove(),
                                    b.selection.setAtEnd(b.el)),
                                b.el.normalize(),
                                b.browser.safari && !h && (c = b.doc.createRange(),
                                    c.setStartAfter(i),
                                    c.setEndBefore(j),
                                    g.push(c))
                        }

                    if (b.browser.safari && g.length)
                        for (b.selection.clear(),
                            d = 0; d < g.length; d++) b.selection.get().addRange(g[d])
                }
            }

            function restore() {
                var c, e = b.el.querySelectorAll('.fr-marker[data-type="true"]');

                if (!b.$wp) return b.markers.remove(), !1;
                if (0 === e.length) return !1;
                if (b.browser.msie || b.browser.edge)
                    for (c = 0; c < e.length; c++) e[c].style.display = "inline-block";
                b.core.hasFocus() || b.browser.msie || b.browser.webkit || b.$el.focus(),
                    clear();
                var g = get();
                for (c = 0; c < e.length; c++) {
                    var h = $(e[c]).data("id"),
                        i = e[c],
                        j = b.doc.createRange(),
                        k = b.$el.find('.fr-marker[data-type="false"][data-id="' + h + '"]');
                    (b.browser.msie || b.browser.edge) && k.css("display", "inline-block");
                    var l = null;
                    if (k.length > 0) {
                        k = k[0];
                        try {
                            for (var n, o = !1, p = i.nextSibling; p && p.nodeType == Node.TEXT_NODE && 0 === p.textContent.length;) n = p, p = p.nextSibling, $(n).remove();
                            for (var q = k.nextSibling; q && q.nodeType == Node.TEXT_NODE && 0 === q.textContent.length;) n = q, q = q.nextSibling, $(n).remove();

                            if (i.nextSibling == k || k.nextSibling == i) {
                                for (var r = i.nextSibling == k ? i : k, s = r == i ? k : i, t = r.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.length;) n = t, t = t.previousSibling, $(n).remove();

                                if (t && t.nodeType == Node.TEXT_NODE)
                                    for (; t && t.previousSibling && t.previousSibling.nodeType == Node.TEXT_NODE;) t.previousSibling.textContent = t.previousSibling.textContent + t.textContent, t = t.previousSibling, $(t.nextSibling).remove();
                                for (var u = s.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 === u.length;) n = u, u = u.nextSibling, $(n).remove();

                                if (u && u.nodeType == Node.TEXT_NODE)
                                    for (; u && u.nextSibling && u.nextSibling.nodeType == Node.TEXT_NODE;) u.nextSibling.textContent = u.textContent + u.nextSibling.textContent, u = u.nextSibling, $(u.previousSibling).remove();

                                if (t && (b.node.isVoid(t) || b.node.isBlock(t)) && (t = null),
                                    u && (b.node.isVoid(u) || b.node.isBlock(u)) && (u = null),
                                    t && u && t.nodeType == Node.TEXT_NODE && u.nodeType == Node.TEXT_NODE) {
                                    $(i).remove(),
                                        $(k).remove();
                                    var v = t.textContent.length;
                                    t.textContent = t.textContent + u.textContent, $(u).remove(),
                                        b.spaces.normalize(t),
                                        j.setStart(t, v),
                                        j.setEnd(t, v),
                                        o = !0
                                } else !t && u && u.nodeType == Node.TEXT_NODE ? ($(i).remove(),
                                    $(k).remove(),
                                    b.spaces.normalize(u),
                                    l = $(b.doc.createTextNode("\u200b")),
                                    $(u).before(l),
                                    j.setStart(u, 0),
                                    j.setEnd(u, 0),
                                    o = !0) : !u && t && t.nodeType == Node.TEXT_NODE && ($(i).remove(),
                                    $(k).remove(),
                                    b.spaces.normalize(t),
                                    l = $(b.doc.createTextNode("\u200b")),
                                    $(t).after(l),
                                    j.setStart(t, t.textContent.length),
                                    j.setEnd(t, t.textContent.length),
                                    o = !0)
                            }

                            if (!o) {
                                var w, x;
                                (b.browser.chrome || b.browser.edge) && i.nextSibling == k ? (w = m(k, j, !0) || j.setStartAfter(k),
                                        x = m(i, j, !1) || j.setEndBefore(i)) : (i.previousSibling == k && (i = k, k = i.nextSibling),

                                        k.nextSibling && "BR" === k.nextSibling.tagName || !k.nextSibling && b.node.isBlock(i.previousSibling) || i.previousSibling && "BR" == i.previousSibling.tagName || (i.style.display = "inline", k.style.display = "inline", l = $(b.doc.createTextNode("\u200b"))),
                                        w = m(i, j, !0) || $(i).before(l) && j.setStartBefore(i),
                                        x = m(k, j, !1) || $(k).after(l) && j.setEndAfter(k)),
                                    "function" == typeof w && w(),
                                    "function" == typeof x && x()
                            }
                        } catch (y) {}
                    }
                    l && l.remove();
                    try { g.addRange(j) } catch (y) {}
                }
                b.markers.remove()
            }

            function m(c, d, e) {
                var f, g = c.previousSibling,
                    h = c.nextSibling;
                return g && h && g.nodeType == Node.TEXT_NODE && h.nodeType == Node.TEXT_NODE ? (f = g.textContent.length, e ? (h.textContent = g.textContent + h.textContent, $(g).remove(),
                    $(c).remove(),
                    b.spaces.normalize(h),
                    function() { d.setStart(h, f) }) : (g.textContent = g.textContent + h.textContent, $(h).remove(),
                    $(c).remove(),
                    b.spaces.normalize(g),
                    function() { d.setEnd(g, f) })) : g && !h && g.nodeType == Node.TEXT_NODE ? (f = g.textContent.length, e ? (b.spaces.normalize(g),
                    function() { d.setStart(g, f) }) : (b.spaces.normalize(g),
                    function() { d.setEnd(g, f) })) : !(!h || g || h.nodeType != Node.TEXT_NODE) && (e ? (b.spaces.normalize(h),
                    function() { d.setStart(h, 0) }) : (b.spaces.normalize(h),
                    function() { d.setEnd(h, 0) }))
            }

            function n() { return !0 }

            function isCollapsed() {
                for (var a = range(),
                        b = 0; b < a.length; b++)
                    if (!a[b].collapsed) return !1;
                return !0
            }

            function info(a) {
                var c, d, atStart = !1,
                    atEnd = !1;
                if (b.win.getSelection) {
                    var g = b.win.getSelection();
                    g.rangeCount && (c = g.getRangeAt(0),
                        d = c.cloneRange(),
                        d.selectNodeContents(a),
                        d.setEnd(c.startContainer, c.startOffset),
                        atStart = "" === d.toString(),
                        d.selectNodeContents(a),
                        d.setStart(c.endContainer, c.endOffset),
                        atEnd = "" === d.toString())
                } else b.doc.selection && "Control" != b.doc.selection.type && (c = b.doc.selection.createRange(),
                    d = c.duplicate(),
                    d.moveToElementText(a),
                    d.setEndPoint("EndToStart", c),
                    atStart = "" === d.text, d.moveToElementText(a),
                    d.setEndPoint("StartToEnd", c),
                    atEnd = "" === d.text);
                return { atStart: atStart, atEnd: atEnd }
            }

            function isFull() {
                if (isCollapsed()) return !1;
                b.$el.find("td, th, img, br:not(:last)").prepend('<span class="fr-mk">' + $.FE.INVISIBLE_SPACE + "</span>");
                var c = !1,
                    d = info(b.el);
                return d.atStart && d.atEnd && (c = !0),
                    b.$el.find(".fr-mk").remove(),
                    c
            }

            function r(c, d) {
                void 0 === d && (d = !0);
                var e = $(c).html();
                e && e.replace(/\u200b/g, "").length != e.length && $(c).html(e.replace(/\u200b/g, ""));
                for (var f = b.node.contents(c),
                        g = 0; g < f.length; g++) f[g].nodeType != Node.ELEMENT_NODE ? $(f[g]).remove() : (r(f[g], 0 === g),
                    0 === g && (d = !1));
                c.nodeType == Node.TEXT_NODE ? $(c).replaceWith('<span data-first="true" data-text="true"></span>') : d && $(c).attr("data-first", !0)
            }

            function s() { return 0 === $(this).find("fr-inner").length }

            function t(c, d) {
                var e = b.node.contents(c.get(0));
                ["TD", "TH"].indexOf(c.get(0).tagName) >= 0 && 1 == c.find(".fr-marker").length && b.node.hasClass(e[0], "fr-marker") && c.attr("data-del-cell", !0);
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    b.node.hasClass(g, "fr-marker") ? d = (d + 1) % 2 : d ? $(g).find(".fr-marker").length > 0 ? d = t($(g),
                        d) : ["TD", "TH"].indexOf(g.tagName) < 0 && !b.node.hasClass(g, "fr-inner") ? !b.opts.keepFormatOnDelete || b.$el.find("[data-first]").length > 0 ? $(g).remove() : r(g) : b.node.hasClass(g, "fr-inner") ? 0 === $(g).find(".fr-inner").length ? $(g).html("<br>") : $(g).find(".fr-inner").filter(s).html("<br>") : ($(g).empty(),
                        $(g).attr("data-del-cell", !0)) : $(g).find(".fr-marker").length > 0 && (d = t($(g),
                        d))
                }
                return d
            }

            function inEditor() {
                try {
                    if (!b.$wp) return !1;
                    for (var a = range(0),
                            c = a.commonAncestorContainer; c && !b.node.isElement(c);) c = c.parentNode;
                    return !!b.node.isElement(c)
                } catch (d) { return !1 }
            }

            function remove() {
                if (isCollapsed()) return !0;
                var c;
                save();
                var d = function(b) {
                        for (var c = b.previousSibling; c && c.nodeType == Node.TEXT_NODE && 0 === c.textContent.length;) {
                            var d = c;
                            c = c.previousSibling, $(d).remove()
                        }
                        return c
                    },
                    e = function(b) {
                        for (var c = b.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 === c.textContent.length;) {
                            var d = c;
                            c = c.nextSibling, $(d).remove()
                        }
                        return c
                    },
                    f = b.$el.find('.fr-marker[data-type="true"]');
                for (c = 0; c < f.length; c++)
                    for (var g = f[c]; !(d(g) || b.node.isBlock(g.parentNode) || b.$el.is(g.parentNode) || b.node.hasClass(g.parentNode, "fr-inner"));) $(g.parentNode).before(g);
                var h = b.$el.find('.fr-marker[data-type="false"]');
                for (c = 0; c < h.length; c++) {
                    for (var i = h[c]; !(e(i) || b.node.isBlock(i.parentNode) || b.$el.is(i.parentNode) || b.node.hasClass(i.parentNode, "fr-inner"));) $(i.parentNode).after(i);
                    i.parentNode && b.node.isBlock(i.parentNode) && b.node.isEmpty(i.parentNode) && !b.$el.is(i.parentNode) && !b.node.hasClass(i.parentNode, "fr-inner") && b.opts.keepFormatOnDelete && $(i.parentNode).after(i)
                }

                if (n()) {
                    t(b.$el, 0);
                    var j = b.$el.find('[data-first="true"]');

                    if (j.length) b.$el.find(".fr-marker").remove(),
                        j.append($.FE.INVISIBLE_SPACE + $.FE.MARKERS).removeAttr("data-first"),
                        j.attr("data-text") && j.replaceWith(j.html());
                    else
                        for (b.$el.find("table").filter(function() { return $(this).find("[data-del-cell]").length > 0 && $(this).find("[data-del-cell]").length == $(this).find("td, th").length }).remove(),
                            b.$el.find("[data-del-cell]").removeAttr("data-del-cell"),
                            f = b.$el.find('.fr-marker[data-type="true"]'),
                            c = 0; c < f.length; c++) {
                            var m = f[c],
                                p = m.nextSibling,
                                q = b.$el.find('.fr-marker[data-type="false"][data-id="' + $(m).data("id") + '"]').get(0);

                            if (q) {
                                if (m && (!p || p != q)) {
                                    var r = b.node.blockParent(m),
                                        s = b.node.blockParent(q),
                                        u = !1,
                                        v = !1;
                                    if (r && ["UL", "OL"].indexOf(r.tagName) >= 0 && (r = null, u = !0),
                                        s && ["UL", "OL"].indexOf(s.tagName) >= 0 && (s = null, v = !0),
                                        $(m).after(q),
                                        r != s)
                                        if (null != r || u)
                                            if (null != s || v || 0 !== $(r).parentsUntil(b.$el, "table").length) r && s && 0 === $(r).parentsUntil(b.$el, "table").length && 0 === $(s).parentsUntil(b.$el, "table").length && ($(r).append($(s).html()),
                                                $(s).remove());
                                            else {
                                                for (p = r; !p.nextSibling && p.parentNode != b.el;) p = p.parentNode;
                                                for (p = p.nextSibling; p && "BR" != p.tagName;) {
                                                    var w = p.nextSibling;
                                                    $(r).append(p),
                                                        p = w
                                                }
                                                p && "BR" == p.tagName && $(p).remove()
                                            }
                                    else {
                                        var x = b.node.deepestParent(m);
                                        x ? ($(x).after($(s).html()),
                                            $(s).remove()) : 0 === $(s).parentsUntil(b.$el, "table").length && ($(m).next().after($(s).html()),
                                            $(s).remove())
                                    }
                                }
                            } else q = $(m).clone().attr("data-type", !1),
                                $(m).after(q)
                        }
                }
                b.opts.keepFormatOnDelete || b.html.fillEmptyBlocks(),
                    b.html.cleanEmptyTags(!0),
                    b.clean.lists(),
                    b.spaces.normalize();
                var y = b.$el.find(".fr-marker:last").get(0),
                    z = b.$el.find(".fr-marker:first").get(0);
                void 0 !== y && void 0 !== z && !y.nextSibling && z.previousSibling && "BR" == z.previousSibling.tagName && b.node.isElement(y.parentNode) && b.node.isElement(z.parentNode) && b.$el.append("<br>"),
                    restore()
            }

            function setAtStart(c, d) {
                if (!c || c.getElementsByClassName("fr-marker").length > 0) return !1;
                for (var e = c.firstChild; e && (b.node.isBlock(e) || d && !b.node.isVoid(e) && e.nodeType == Node.ELEMENT_NODE);) c = e, e = e.firstChild;
                c.innerHTML = $.FE.MARKERS + c.innerHTML
            }

            function setAtEnd(c, d) {
                if (!c || c.getElementsByClassName("fr-marker").length > 0) return !1;
                for (var e = c.lastChild; e && (b.node.isBlock(e) || d && !b.node.isVoid(e) && e.nodeType == Node.ELEMENT_NODE);) c = e, e = e.lastChild;
                var f = b.doc.createElement("SPAN");
                f.setAttribute("id", "fr-sel-markers"),
                    f.innerHTML = $.FE.MARKERS, c.appendChild(f);
                var g = c.querySelector("#fr-sel-markers");
                g.outerHTML = g.innerHTML
            }

            function setBefore(c, d) {
                void 0 === d && (d = !0);
                for (var e = c.previousSibling; e && e.nodeType == Node.TEXT_NODE && 0 === e.textContent.length;) e = e.previousSibling;
                return e ? (b.node.isBlock(e) ? setAtEnd(e) : "BR" == e.tagName ? $(e).before($.FE.MARKERS) : $(e).after($.FE.MARKERS), !0) : !!d && (b.node.isBlock(c) ? setAtStart(c) : $(c).before($.FE.MARKERS), !0)
            }

            function setAfter(c, d) {
                void 0 === d && (d = !0);
                for (var e = c.nextSibling; e && e.nodeType == Node.TEXT_NODE && 0 === e.textContent.length;) e = e.nextSibling;
                return e ? (b.node.isBlock(e) ? setAtStart(e) : $(e).before($.FE.MARKERS), !0) : !!d && (b.node.isBlock(c) ? setAtEnd(c) : $(c).after($.FE.MARKERS), !0)
            }
            return {
                text: text,
                get: get,
                ranges: range,
                clear: clear,
                element: element,
                endElement: endElement,
                save: save,
                restore: restore,
                isCollapsed: isCollapsed,
                isFull: isFull,
                inEditor: inEditor,
                remove: remove,
                blocks: blocks,
                info: info,
                setAtEnd: setAtEnd,
                setAtStart: setAtStart,
                setBefore: setBefore,
                setAfter: setAfter,
                rangeElement: rangeElement
            }
        },
        $.extend($.FE.DEFAULTS, {
            htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote",
                "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist",
                "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed",
                "fieldset", "figcaption", "figure", "footer", "form",
                "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img",
                "input", "ins", "kbd", "keygen", "label",
                "legend", "li", "link", "main", "map", "mark",
                "menu", "menuitem", "meter", "nav",
                "noscript", "object", "ol", "optgroup",
                "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp",
                "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub",
                "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"
            ],
            htmlRemoveTags: ["script", "style"],
            htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen",
                "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave",
                "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked",
                "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu",
                "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname",
                "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction",
                "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv",
                "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list",
                "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen",
                "multiple", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder",
                "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed",
                "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected",
                "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start",
                "step", "summary", "spellcheck", "style", "tabindex", "target", "title",
                "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"
            ],
            htmlAllowedStyleProps: [".*"],
            htmlAllowComments: !0,
            htmlUntouched: !1,
            fullPage: !1
        }),
        $.FE.HTML5Map = { B: "STRONG", I: "EM", STRIKE: "S" },
        $.FE.MODULES.clean = function(b) {
            function c(a) {
                if (a.nodeType == Node.ELEMENT_NODE && a.getAttribute("class") && a.getAttribute("class").indexOf("fr-marker") >= 0) return !1;
                var d, e = b.node.contents(a),
                    f = [];
                for (d = 0; d < e.length; d++) e[d].nodeType != Node.ELEMENT_NODE || b.node.isVoid(e[d]) ? e[d].nodeType == Node.TEXT_NODE && (e[d].textContent = e[d].textContent.replace(/\u200b/g, "")) : e[d].textContent.replace(/\u200b/g, "").length != e[d].textContent.length && c(e[d]);

                if (a.nodeType == Node.ELEMENT_NODE && !b.node.isVoid(a) && (a.normalize(),
                        e = b.node.contents(a),
                        f = a.querySelectorAll(".fr-marker"),
                        e.length - f.length == 0)) {
                    for (d = 0; d < e.length; d++)
                        if ((e[d].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                    for (d = 0; d < f.length; d++) a.parentNode.insertBefore(f[d].cloneNode(!0),
                        a);
                    return a.parentNode.removeChild(a), !1
                }
            }

            function d(a, c) {
                if (a.nodeType == Node.COMMENT_NODE) return "\x3c!-" + a.nodeValue + "-\x3e";
                if (a.nodeType == Node.TEXT_NODE) return c ? a.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");

                if (a.nodeType != Node.ELEMENT_NODE) return a.outerHTML;
                if (a.nodeType == Node.ELEMENT_NODE && ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(a.tagName) >= 0) return a.outerHTML;
                if (a.nodeType == Node.ELEMENT_NODE && "svg" == a.tagName) {
                    var e = document.createElement("div"),
                        f = a.cloneNode(!0);
                    return e.appendChild(f),
                        e.innerHTML
                }

                if ("IFRAME" == a.tagName) return a.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
                var g = a.childNodes;
                if (0 === g.length) return a.outerHTML;
                for (var h = "", i = 0; i < g.length; i++) "PRE" == a.tagName && (c = !0),
                    h += d(g[i], c);
                return b.node.openTagString(a) + h + b.node.closeTagString(a)
            }

            function e(a) {
                return K = [], a = a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(a) {
                        return K.push(a),
                            "[FROALA.EDITOR.SCRIPT " + (K.length - 1) + "]"
                    }),
                    a = a.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(a) {
                        return K.push(a),
                            "[FROALA.EDITOR.NOSCRIPT " + (K.length - 1) + "]"
                    }),
                    a = a.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, function(a) {
                        return K.push(a),
                            "[FROALA.EDITOR.IFRAME " + (K.length - 1) + "]"
                    }),
                    a = a.replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="')
            }

            function f(a) {
                return a = a.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(a, c) { return b.opts.htmlRemoveTags.indexOf("script") >= 0 ? "" : K[parseInt(c, 10)] }),
                    a = a.replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(a, c) { return b.opts.htmlRemoveTags.indexOf("noscript") >= 0 ? "" : K[parseInt(c, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">") }),
                    a = a.replace(/\[FROALA\.EDITOR\.IFRAME ([\d]*)\]/gi, function(a, c) { return b.opts.htmlRemoveTags.indexOf("iframe") >= 0 ? "" : K[parseInt(c, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">") }),
                    a = a.replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
            }

            function g(a) {
                var b = a.replace(/;;/gi, ";");
                return b = b.replace(/^;/gi, ""),
                    ";" != b.charAt(b.length) && (b += ";"),
                    b
            }

            function h(a) {
                var c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = c.match(I),
                            e = null;
                        "style" == c && b.opts.htmlAllowedStyleProps.length && (e = a[c].match(J)),
                            d && e ? a[c] = g(e.join(";")) : d && ("style" != c || e) || delete a[c]
                    }
                for (var f = "", h = Object.keys(a).sort(),
                        i = 0; i < h.length; i++) c = h[i], a[c].indexOf('"') < 0 ? f += " " + c + '="' + a[c] + '"' : f += " " + c + "='" + a[c] + "'";
                return f
            }

            function i(a, c, d) {
                if (b.opts.fullPage) {
                    var e = b.html.extractDoctype(d),
                        f = h(b.html.extractNodeAttrs(d, "html"));
                    c = null == c ? b.html.extractNode(d, "head") || "<title></title>" : c;
                    return e + "<html" + f + "><head" + h(b.html.extractNodeAttrs(d, "head")) + ">" + c + "</head><body" + h(b.html.extractNodeAttrs(d, "body")) + ">" + a + "</body></html>"
                }
                return a
            }

            function j(c, e) {
                var f, g = $("<div>" + c + "</div>"),
                    h = "";
                if (g) {
                    var i = b.node.contents(g.get(0));
                    for (f = 0; f < i.length; f++) e(i[f]);
                    for (i = b.node.contents(g.get(0)),
                        f = 0; f < i.length; f++) h += d(i[f])
                }
                return h
            }

            function exec(a, c, d) {
                a = e(a);
                var g = a,
                    h = null;
                return b.opts.fullPage && (g = b.html.extractNode(a, "body") || (a.indexOf("<body") >= 0 ? "" : a),
                        d && (h = b.html.extractNode(a, "head") || "")),
                    g = j(g, c),
                    h && (h = j(h, c)),
                    f(i(g, h, a))
            }

            function invisibleSpaces(a) { return a.replace(/\u200b/g, "").length == a.length ? a : b.clean.exec(a, c) }

            function toHTML5() {
                var c = b.el.querySelectorAll(Object.keys($.FE.HTML5Map).join(","));

                if (c.length) {
                    var d = !1;
                    b.el.querySelector(".fr-marker") || (b.selection.save(),
                        d = !0);
                    for (var e = 0; e < c.length; e++) "" === b.node.attributes(c[e]) && $(c[e]).replaceWith("<" + $.FE.HTML5Map[c[e].tagName] + ">" + c[e].innerHTML + "</" + $.FE.HTML5Map[c[e].tagName] + ">");
                    d && b.selection.restore()
                }
            }

            function n(a) {
                var c = b.doc.createElement("DIV");
                return c.innerText = a, c.textContent
            }

            function o(c) {
                if ("SPAN" == c.tagName && (c.getAttribute("class") || "").indexOf("fr-marker") >= 0) return !1;
                if ("PRE" == c.tagName && q(c),
                    c.nodeType == Node.ELEMENT_NODE && (c.getAttribute("data-fr-src") && 0 !== c.getAttribute("data-fr-src").indexOf("blob:") && c.setAttribute("data-fr-src", b.helpers.sanitizeURL(n(c.getAttribute("data-fr-src")))),
                        c.getAttribute("href") && c.setAttribute("href", b.helpers.sanitizeURL(n(c.getAttribute("href")))),
                        c.getAttribute("src") && c.setAttribute("src", b.helpers.sanitizeURL(n(c.getAttribute("src")))), ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(c.tagName) >= 0 && (c.innerHTML = c.innerHTML.trim())), !b.opts.pasteAllowLocalImages && c.nodeType == Node.ELEMENT_NODE && "IMG" == c.tagName && c.getAttribute("data-fr-src") && 0 === c.getAttribute("data-fr-src").indexOf("file://")) return c.parentNode.removeChild(c), !1;
                if (c.nodeType == Node.ELEMENT_NODE && $.FE.HTML5Map[c.tagName] && "" === b.node.attributes(c)) {
                    var d = $.FE.HTML5Map[c.tagName],
                        e = "<" + d + ">" + c.innerHTML + "</" + d + ">";
                    c.insertAdjacentHTML("beforebegin", e),
                        c = c.previousSibling, c.parentNode.removeChild(c.nextSibling)
                }

                if (b.opts.htmlAllowComments || c.nodeType != Node.COMMENT_NODE)
                    if (c.tagName && c.tagName.match(H)) c.parentNode.removeChild(c);
                    else
                if (c.tagName && !c.tagName.match(G)) "svg" === c.tagName ? c.parentNode.removeChild(c) : b.browser.safari && "path" == c.tagName && c.parentNode && "svg" == c.parentNode.tagName || (c.outerHTML = c.innerHTML);
                else {
                    var f = c.attributes;
                    if (f)
                        for (var h = f.length - 1; h >= 0; h--) {
                            var i = f[h],
                                j = i.nodeName.match(I),
                                k = null;
                            "style" == i.nodeName && b.opts.htmlAllowedStyleProps.length && (k = i.value.match(J)),
                                j && k ? i.value = g(k.join(";")) : j && ("style" != i.nodeName || k) || c.removeAttribute(i.nodeName)
                        }
                } else 0 !== c.data.indexOf("[FROALA.EDITOR") && c.parentNode.removeChild(c)
            }

            function p(a) {
                for (var c = b.node.contents(a),
                        d = 0; d < c.length; d++) c[d].nodeType != Node.TEXT_NODE && p(c[d]);
                o(a)
            }

            function q(a) {
                var b = a.innerHTML;
                b.indexOf("\n") >= 0 && (a.innerHTML = b.replace(/\n/g, "<br>"))
            }

            function html(c, d, e, f) {
                void 0 === d && (d = []),
                    void 0 === e && (e = []),
                    void 0 === f && (f = !1),
                    c = c.replace(/<br> */g, "<br>");
                var g, h = $.merge([], b.opts.htmlAllowedTags);
                for (g = 0; g < d.length; g++) h.indexOf(d[g]) >= 0 && h.splice(h.indexOf(d[g]),
                    1);
                var i = $.merge([], b.opts.htmlAllowedAttrs);
                for (g = 0; g < e.length; g++) i.indexOf(e[g]) >= 0 && i.splice(i.indexOf(e[g]),
                    1);
                return i.push("data-fr-.*"),
                    i.push("fr-.*"),
                    G = new RegExp("^" + h.join("$|^") + "$", "gi"),
                    I = new RegExp("^" + i.join("$|^") + "$", "gi"),
                    H = new RegExp("^" + b.opts.htmlRemoveTags.join("$|^") + "$", "gi"),
                    J = b.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)" + b.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)") + ":.+?(?=(;)|$))", "gi") : null, c = exec(c, p, !0)
            }

            function quotes() {
                for (var c = b.el.querySelectorAll("blockquote + blockquote"),
                        d = 0; d < c.length; d++) {
                    var e = c[d];
                    b.node.attributes(e) == b.node.attributes(e.previousSibling) && ($(e).prev().append($(e).html()),
                        $(e).remove())
                }
            }

            function t() {
                for (var a = b.el.querySelectorAll("tr"),
                        c = 0; c < a.length; c++) {
                    for (var d = a[c].children, e = !0, f = 0; f < d.length; f++)
                        if ("TH" != d[f].tagName) { e = !1; break }

                    if (!1 !== e && 0 !== d.length) {
                        for (var g = a[c]; g && "TABLE" != g.tagName && "THEAD" != g.tagName;) g = g.parentNode;
                        var h = g;
                        "THEAD" != h.tagName && (h = b.doc.createElement("THEAD"),
                                g.insertBefore(h, g.firstChild)),
                            h.appendChild(a[c])
                    }
                }
            }

            function u() {
                var c = b.html.defaultTag();

                if (c)
                    for (var d = b.el.querySelectorAll("td > " + c + ", th > " + c),
                            e = 0; e < d.length; e++) "" === b.node.attributes(d[e]) && $(d[e]).replaceWith(d[e].innerHTML + "<br>")
            }

            function tables() {
                t(),
                    u()
            }

            function w() {
                var a = [],
                    c = function(a) { return !b.node.isList(a.parentNode) };
                do {
                    if (a.length) {
                        var d = a[0],
                            e = b.doc.createElement("ul");
                        d.parentNode.insertBefore(e, d);
                        do {
                            var f = d;
                            d = d.nextSibling, e.appendChild(f)
                        }
                        while (d && "LI" == d.tagName)
                    }
                    a = [];
                    for (var g = b.el.querySelectorAll("li"),
                            h = 0; h < g.length; h++) c(g[h]) && a.push(g[h])
                }
                while (a.length > 0)
            }

            function x() {
                for (var a = b.el.querySelectorAll("ol + ol, ul + ul"),
                        c = 0; c < a.length; c++) {
                    var d = a[c];
                    if (b.node.isList(d.previousSibling) && b.node.openTagString(d) == b.node.openTagString(d.previousSibling)) {
                        for (var e = b.node.contents(d),
                                f = 0; f < e.length; f++) d.previousSibling.appendChild(e[f]);
                        d.parentNode.removeChild(d)
                    }
                }
            }

            function y() {
                var a, c, d = function(a) { a.querySelector("LI") || (c = !0, a.parentNode.removeChild(a)) };
                do {
                    c = !1;
                    var e = b.el.querySelectorAll("li:empty");
                    for (a = 0; a < e.length; a++) e[a].parentNode.removeChild(e[a]);
                    var f = b.el.querySelectorAll("ul, ol");
                    for (a = 0; a < f.length; a++) d(f[a])
                }
                while (!0 === c)
            }

            function z() {
                for (var c = b.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"),
                        d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = e.previousSibling;
                    f && ("LI" == f.tagName ? f.appendChild(e) : $(e).wrap("<li></li>"))
                }
            }

            function A() {
                for (var c = b.el.querySelectorAll("li > ul, li > ol"),
                        d = 0; d < c.length; d++) {
                    var e = c[d];
                    if (e.nextSibling) {
                        var f = e.nextSibling,
                            g = $("<li>");
                        $(e.parentNode).after(g);
                        do {
                            var h = f;
                            f = f.nextSibling, g.append(h)
                        }
                        while (f)
                    }
                }
            }

            function B() {
                for (var c = b.el.querySelectorAll("li > ul, li > ol"),
                        d = 0; d < c.length; d++) {
                    var e = c[d];
                    if (b.node.isFirstSibling(e)) $(e).before("<br/>");
                    else
                    if (e.previousSibling && "BR" == e.previousSibling.tagName) {
                        for (var f = e.previousSibling.previousSibling; f && b.node.hasClass(f, "fr-marker");) f = f.previousSibling;
                        f && "BR" != f.tagName && $(e.previousSibling).remove()
                    }
                }
            }

            function C() {
                for (var c = b.el.querySelectorAll("li:empty"),
                        d = 0; d < c.length; d++) $(c[d]).remove()
            }

            function D() {
                for (var c = b.el.querySelectorAll("ul, ol"),
                        d = 0; d < c.length; d++)
                    for (var e = b.node.contents(c[d]),
                            f = null, g = e.length - 1; g >= 0; g--) "LI" != e[g].tagName ? (f || (f = $("<li>"),
                            f.insertBefore(e[g])),
                        f.prepend(e[g])) : f = null
            }

            function lists() {
                w(),
                    x(),
                    D(),
                    y(),
                    z(),
                    A(),
                    B(),
                    C()
            }

            function _init() { b.opts.fullPage && $.merge(b.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"]) }
            var G, H, I, J, K = [];
            return {
                _init: _init,
                html: html,
                toHTML5: toHTML5,
                tables: tables,
                lists: lists,
                quotes: quotes,
                invisibleSpaces: invisibleSpaces,
                exec: exec
            }
        },
        $.FE.MODULES.spaces = function(b) {
            function c(c, d) {
                var e = c.previousSibling,
                    f = c.nextSibling,
                    g = c.textContent,
                    h = c.parentNode;
                if (!b.html.isPreformatted(h)) {
                    d && (g = g.replace(/[\f\n\r\t\v ]{2,}/g, " "),
                            f && "BR" !== f.tagName && !b.node.isBlock(f) || !b.node.isBlock(h) && !b.node.isLink(h) || (g = g.replace(/[\f\n\r\t\v ]{1,}$/g, "")),
                            e && "BR" !== e.tagName && !b.node.isBlock(e) || !b.node.isBlock(h) && !b.node.isLink(h) || (g = g.replace(/^[\f\n\r\t\v ]{1,}/g, "")),
                            " " === g && (e && e.nodeType != Node.TEXT_NODE || f && f.nodeType != Node.TEXT_NODE) && (g = "")),
                        g = g.replace(new RegExp($.FE.UNICODE_NBSP, "g"),
                            " ");
                    for (var i = "", j = 0; j < g.length; j++) 32 != g.charCodeAt(j) || 0 !== j && 32 != i.charCodeAt(j - 1) ? i += g[j] : i += $.FE.UNICODE_NBSP;
                    (!f || f && b.node.isBlock(f) || f && f.nodeType == Node.ELEMENT_NODE && b.win.getComputedStyle(f) && "block" == b.win.getComputedStyle(f).display) && (i = i.replace(/ $/, $.FE.UNICODE_NBSP)), !e || b.node.isVoid(e) || b.node.isBlock(e) || (i = i.replace(/^\u00A0([^ $])/, " $1"),
                            1 !== i.length || 160 !== i.charCodeAt(0) || !f || b.node.isVoid(f) || b.node.isBlock(f) || (i = " ")),
                        i = i.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2"),
                        c.textContent != i && (c.textContent = i)
                }
            }

            function normalize(a, d) {
                if (void 0 !== a && a || (a = b.el),
                    void 0 === d && (d = !1), !a.getAttribute || "false" != a.getAttribute("contenteditable"))
                    if (a.nodeType == Node.TEXT_NODE) c(a, d);
                    else
                if (a.nodeType == Node.ELEMENT_NODE)
                    for (var e = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function(a) {
                            for (var c = a.parentNode; c && c !== b.el;) {
                                if ("STYLE" == c.tagName || "IFRAME" == c.tagName) return !1;
                                if ("PRE" === c.tagName) return !1;
                                c = c.parentNode
                            }
                            return null != a.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !b.node.hasClass(a.parentNode, "fr-marker")
                        }), !1); e.nextNode();) c(e.currentNode, d)
            }

            function normalizeAroundCursor() {
                for (var a = [], c = b.el.querySelectorAll(".fr-marker"),
                        e = 0; e < c.length; e++) {
                    var f = null,
                        g = b.node.blockParent(c[e]);
                    f = g || c[e];
                    for (var h = f.nextSibling, i = f.previousSibling; h && "BR" == h.tagName;) h = h.nextSibling;
                    for (; i && "BR" == i.tagName;) i = i.previousSibling;
                    f && a.indexOf(f) < 0 && a.push(f),
                        i && a.indexOf(i) < 0 && a.push(i),
                        h && a.indexOf(h) < 0 && a.push(h)
                }
                for (var j = 0; j < a.length; j++) normalize(a[j])
            }
            return {
                normalize: normalize,
                normalizeAroundCursor: normalizeAroundCursor
            }
        },
        $.FE.UNICODE_NBSP = String.fromCharCode(160),
        $.FE.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], $.FE.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], $.extend($.FE.DEFAULTS, { htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner"], htmlDoNotWrapTags: ["script", "style"], htmlSimpleAmpersand: !1, htmlIgnoreCSSProperties: [], htmlExecuteScripts: !0 }),
        $.FE.MODULES.html = function(b) {
            function defaultTag() { return b.opts.enter == $.FE.ENTER_P ? "p" : b.opts.enter == $.FE.ENTER_DIV ? "div" : b.opts.enter == $.FE.ENTER_BR ? null : void 0 }

            function isPreformatted(a, c) { return !(!a || a === b.el) && (c ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(a.tagName) || isPreformatted(a.parentNode, c) : -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(a.tagName)) }

            function e(c) {
                var d, e = [],
                    f = [];
                if (c) {
                    var h = b.el.querySelectorAll(".fr-marker");
                    for (d = 0; d < h.length; d++) {
                        var i = b.node.blockParent(h[d]) || h[d];
                        if (i) {
                            var j = i.nextSibling,
                                k = i.previousSibling;
                            i && f.indexOf(i) < 0 && b.node.isBlock(i) && f.push(i),
                                k && b.node.isBlock(k) && f.indexOf(k) < 0 && f.push(k),
                                j && b.node.isBlock(j) && f.indexOf(j) < 0 && f.push(j)
                        }
                    }
                } else f = b.el.querySelectorAll(blockTagsQuery());
                var l = blockTagsQuery();
                for (l += "," + $.FE.VOID_ELEMENTS.join(","),
                    l += ", .fr-inner", l += "," + b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)", d = f.length - 1; d >= 0; d--)
                    if (!(f[d].textContent && f[d].textContent.replace(/\u200B|\n/g, "").length > 0 || f[d].querySelectorAll(l).length > 0)) {
                        for (var m = b.node.contents(f[d]),
                                n = !1, o = 0; o < m.length; o++)
                            if (m[o].nodeType != Node.COMMENT_NODE && m[o].textContent && m[o].textContent.replace(/\u200B|\n/g, "").length > 0) { n = !0; break }
                        n || e.push(f[d])
                    }
                return e
            }

            function emptyBlockTagsQuery() { return $.FE.BLOCK_TAGS.join(":empty, ") + ":empty" }

            function blockTagsQuery() { return $.FE.BLOCK_TAGS.join(", ") }

            function cleanEmptyTags(c) {
                var d = $.merge([], $.FE.VOID_ELEMENTS);
                d = $.merge(d, b.opts.htmlAllowedEmptyTags),
                    void 0 === c && (d = $.merge(d, $.FE.BLOCK_TAGS));
                var e, f;
                e = b.el.querySelectorAll("*:empty:not(" + d.join("):not(") + "):not(.fr-marker)");
                do {
                    f = !1;
                    for (var g = 0; g < e.length; g++) 0 !== e[g].attributes.length && void 0 === e[g].getAttribute("href") || (e[g].parentNode.removeChild(e[g]),
                        f = !0);
                    e = b.el.querySelectorAll("*:empty:not(" + d.join("):not(") + "):not(.fr-marker)")
                }
                while (e.length && f)
            }

            function i(a, d) {
                var e = defaultTag();

                if (d && (e = "div"),
                    e) {
                    for (var f = b.doc.createDocumentFragment(),
                            g = null, h = !1, i = a.firstChild, j = !1; i;) {
                        var k = i.nextSibling;
                        if (i.nodeType == Node.ELEMENT_NODE && (b.node.isBlock(i) || b.opts.htmlDoNotWrapTags.indexOf(i.tagName.toLowerCase()) >= 0 && !b.node.hasClass(i, "fr-marker"))) g = null, f.appendChild(i.cloneNode(!0));
                        else
                        if (i.nodeType != Node.ELEMENT_NODE && i.nodeType != Node.TEXT_NODE) g = null, f.appendChild(i.cloneNode(!0));
                        else
                        if ("BR" == i.tagName) null == g ? (g = b.doc.createElement(e),
                                d && g.setAttribute("class", "fr-temp-div"),
                                g.setAttribute("data-empty", !0),
                                g.appendChild(i.cloneNode(!0)),
                                f.appendChild(g),
                                j = !0) : !1 === h && (g.appendChild(b.doc.createElement("br")),
                                d && g.setAttribute("class", "fr-temp-div"),
                                g.setAttribute("data-empty", !0)),
                            g = null;
                        else {
                            var l = i.textContent;
                            i.nodeType == Node.TEXT_NODE && 0 === l.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || (null == g && (g = b.doc.createElement(e),
                                    d && g.setAttribute("class", "fr-temp-div"),
                                    f.appendChild(g),
                                    h = !1, j = !0),
                                g.appendChild(i.cloneNode(!0)),
                                h || b.node.hasClass(i, "fr-marker") || i.nodeType == Node.TEXT_NODE && 0 === l.replace(/ /g, "").length || (h = !0))
                        }
                        i = k
                    }
                    j && (a.innerHTML = "", a.appendChild(f))
                }
            }

            function j(a, b) { for (var c = 0; c < a.length; c++) i(a[c], b) }

            function wrap(a, c, d, e) {
                if (!b.$wp) return !1;
                void 0 === a && (a = !1),
                    void 0 === c && (c = !1),
                    void 0 === d && (d = !1),
                    void 0 === e && (e = !1);
                var f = b.$wp.scrollTop();
                i(b.el, a),
                    e && j(b.el.querySelectorAll(".fr-inner"),
                        a),
                    c && j(b.el.querySelectorAll("td, th"),
                        a),
                    d && j(b.el.querySelectorAll("blockquote"),
                        a),
                    f != b.$wp.scrollTop() && b.$wp.scrollTop(f)
            }

            function unwrap() {
                b.$el.find("div.fr-temp-div").each(function() { $(this).attr("data-empty") || ["LI"].indexOf(this.parentNode.tagName) >= 0 || b.node.isBlock(this.nextSibling) && !$(this.nextSibling).hasClass("fr-temp-div") ? $(this).replaceWith($(this).html()) : $(this).replaceWith($(this).html() + "<br>") }),
                    b.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() { return "" === $(this).attr("class") }).removeAttr("class")
            }

            function fillEmptyBlocks(c) {
                for (var d = e(c),
                        f = 0; f < d.length; f++) { var g = d[f]; "false" === g.getAttribute("contenteditable") || g.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || b.node.isVoid(g) || "TABLE" != g.tagName && "TBODY" != g.tagName && "TR" != g.tagName && "UL" != g.tagName && "OL" != g.tagName && g.appendChild(b.doc.createElement("br")) }

                if (b.browser.msie && b.opts.enter == $.FE.ENTER_BR) {
                    var h = b.node.contents(b.el);
                    h.length && h[h.length - 1].nodeType == Node.TEXT_NODE && b.$el.append("<br>")
                }
            }

            function blocks() { return b.$el.get(0).querySelectorAll(blockTagsQuery()) }

            function cleanBlankSpaces(a) {
                if (void 0 === a && (a = b.el),
                    a && ["SCRIPT", "STYLE", "PRE"].indexOf(a.tagName) >= 0) return !1;
                for (var c = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function(a) { return null != a.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g) }), !1); c.nextNode();) {
                    var e = c.currentNode;
                    if (!isPreformatted(e.parentNode, !0)) {
                        var f = b.node.isBlock(e.parentNode) || b.node.isElement(e.parentNode),
                            g = e.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");

                        if (f) {
                            var h = e.previousSibling,
                                i = e.nextSibling;
                            h && i && " " == g ? g = b.node.isBlock(h) && b.node.isBlock(i) ? "" : "\n" : (h || (g = g.replace(/^ */, "")),
                                i || (g = g.replace(/ *$/, "")))
                        }
                        e.textContent = g
                    }
                }
            }

            function p(a, b, c) {
                var d = new RegExp(b, "gi"),
                    e = d.exec(a);
                return e ? e[c] : null
            }

            function q(a, b) {
                var c = a.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
                return c ? b.implementation.createDocumentType(c[1], c[3], c[4]) : b.implementation.createDocumentType("html")
            }

            function getDoctype(a) {
                var b = a.doctype,
                    c = "<!DOCTYPE html>";
                return b && (c = "<!DOCTYPE " + b.name + (b.publicId ? ' PUBLIC "' + b.publicId + '"' : "") + (!b.publicId && b.systemId ? " SYSTEM" : "") + (b.systemId ? ' "' + b.systemId + '"' : "") + ">"),
                    c
            }

            function s(c, d) {
                var e = c.parentNode;
                if (e && (b.node.isBlock(e) || b.node.isElement(e)) && ["TD", "TH"].indexOf(e.tagName) < 0) {
                    for (var f = c.previousSibling, g = c.nextSibling; f && f.nodeType == Node.TEXT_NODE && 0 === f.textContent.replace(/\n|\r/g, "").length;) f = f.previousSibling;
                    f && e && "BR" != f.tagName && !b.node.isBlock(f) && !g && e.textContent.replace(/\u200B/g, "").length > 0 && f.textContent.length > 0 && !b.node.hasClass(f, "fr-marker") && (b.el == e && !g && b.opts.enter == $.FE.ENTER_BR && b.browser.msie || (d && b.selection.save(),
                        c.parentNode.removeChild(c),
                        d && b.selection.restore()))
                } else !e || b.node.isBlock(e) || b.node.isElement(e) || c.previousSibling || c.nextSibling || s(c.parentNode, d)
            }

            function t() {
                var a, c, d = b.selection.element();
                a = b.node.isBlock(d) ? d : b.node.blockParent(d);
                var e = [];
                if (a) {
                    var f = a.nextSibling,
                        g = a.previousSibling;
                    a && e.indexOf(a) < 0 && e.push(a),
                        g && b.node.isBlock(g) && e.indexOf(g) < 0 && e.push(g),
                        f && b.node.isBlock(f) && e.indexOf(f) < 0 && e.push(f)
                }
                var h = [];
                for (c = 0; c < e.length; c++)
                    for (var i = e[c].querySelectorAll("br"),
                            j = 0; j < i.length; j++) h.indexOf(i[j]) < 0 && h.push(i[j]);

                if (d.parentNode == b.el) { var k = b.el.children; for (c = 0; c < k.length; c++) "BR" == k[c].tagName && h.indexOf(k[c]) < 0 && h.push(k[c]) }
                return h
            }

            function cleanBRs(a, c) {
                var d, e = null;
                if (a)
                    for (e = t(),
                        d = 0; d < e.length; d++) s(e[d], c);
                else
                    for (e = b.el.getElementsByTagName("br"),
                        d = 0; d < e.length; d++) s(e[d], c)
            }

            function v() {
                b.opts.htmlUntouched || (cleanEmptyTags(),
                        wrap()),
                    cleanBlankSpaces(),
                    b.opts.htmlUntouched || (b.spaces.normalize(null, !0),
                        b.html.fillEmptyBlocks(),
                        b.clean.quotes(),
                        b.clean.lists(),
                        b.clean.tables(),
                        b.clean.toHTML5(),
                        b.html.cleanBRs()),
                    b.selection.restore(),
                    checkIfEmpty(),
                    b.placeholder.refresh()
            }

            function checkIfEmpty() {
                b.core.isEmpty() && (null != defaultTag() ? b.el.querySelector(blockTagsQuery()) || b.el.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (b.core.hasFocus() ? (b.$el.html("<" + defaultTag() + ">" + $.FE.MARKERS + "<br/></" + defaultTag() + ">"),
                    b.selection.restore()) : b.$el.html("<" + defaultTag() + "><br/></" + defaultTag() + ">")) : b.el.querySelector("*:not(.fr-marker):not(br)") || (b.core.hasFocus() ? (b.$el.html($.FE.MARKERS + "<br/>"),
                    b.selection.restore()) : b.$el.html("<br/>")))
            }

            function extractNode(a, b) { return p(a, "<" + b + "[^>]*?>([\\w\\W]*)</" + b + ">", 1) }

            function extractNodeAttrs(c, d) {
                var e = $("<div " + (p(c, "<" + d + "([^>]*?)>", 1) || "") + ">");
                return b.node.rawAttributes(e.get(0))
            }

            function extractDoctype(a) { return p(a, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>" }

            function A(a, c) { b.opts.htmlExecuteScripts ? a.html(c) : a.get(0).innerHTML = c }

            function set(c) {
                var d = b.clean.html(c || "", [], [], b.opts.fullPage);

                if (b.opts.fullPage) {
                    var e = extractNode(d, "body") || (d.indexOf("<body") >= 0 ? "" : d),
                        f = extractNodeAttrs(d, "body"),
                        g = extractNode(d, "head") || "<title></title>",
                        h = extractNodeAttrs(d, "head"),
                        i = $("<div>").append(g).contents().each(function() {
                            (this.nodeType == Node.COMMENT_NODE || ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) >= 0) && this.parentNode.removeChild(this)
                        }).end().html().trim();
                    g = $("<div>").append(g).contents().map(function() { return this.nodeType == Node.COMMENT_NODE ? "\x3c!-" + this.nodeValue + "-\x3e" : ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) >= 0 ? this.outerHTML : "" }).toArray().join("");
                    var j = extractDoctype(d),
                        k = extractNodeAttrs(d, "html");
                    A(b.$el, i + "\n" + e),
                        b.node.clearAttributes(b.el),
                        b.$el.attr(f),
                        b.$el.addClass("fr-view"),
                        b.$el.attr("spellcheck", b.opts.spellcheck),
                        b.$el.attr("dir", b.opts.direction),
                        A(b.$head, g),
                        b.node.clearAttributes(b.$head.get(0)),
                        b.$head.attr(h),
                        b.node.clearAttributes(b.$html.get(0)),
                        b.$html.attr(k),
                        b.iframe_document.doctype.parentNode.replaceChild(q(j, b.iframe_document),
                            b.iframe_document.doctype)
                } else A(b.$el, d);
                var l = b.edit.isDisabled();
                b.edit.on(),
                    b.core.injectStyle(b.opts.iframeStyle),
                    v(),
                    b.opts.useClasses || (b.$el.find("[fr-original-class]").each(function() {
                            this.setAttribute("class", this.getAttribute("fr-original-class")),
                                this.removeAttribute("fr-original-class")
                        }),
                        b.$el.find("[fr-original-style]").each(function() {
                            this.setAttribute("style", this.getAttribute("fr-original-style")),
                                this.removeAttribute("fr-original-style")
                        })),
                    l && b.edit.off(),
                    b.events.trigger("html.set")
            }

            function C(a) {
                var b = /(#[^\s\+>~\.\[:]+)/g,
                    c = /(\[[^\]]+\])/g,
                    d = /(\.[^\s\+>~\.\[:]+)/g,
                    e = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,
                    f = /(:[\w-]+\([^\)]*\))/gi,
                    g = /(:[^\s\+>~\.\[:]+)/g,
                    h = /([^\s\+>~\.\[:]+)/g;
                ! function() {
                    var b = /:not\(([^\)]*)\)/g;
                    b.test(a) && (a = a.replace(b, "     $1 "))
                }();
                var i = 100 * (a.match(b) || []).length + 10 * (a.match(c) || []).length + 10 * (a.match(d) || []).length + 10 * (a.match(f) || []).length + 10 * (a.match(g) || []).length + (a.match(e) || []).length;
                return a = a.replace(/[\*\s\+>~]/g, " "),
                    a = a.replace(/[#\.]/g, " "),
                    i += (a.match(h) || []).length
            }

            function D(a) {
                if (b.events.trigger("html.processGet", [a]),
                    a && a.getAttribute && "" === a.getAttribute("class") && a.removeAttribute("class"),
                    a && a.getAttribute && "" === a.getAttribute("style") && a.removeAttribute("style"),
                    a && a.nodeType == Node.ELEMENT_NODE)
                    for (var c = a.querySelectorAll('[class=""],[style=""]'),
                            d = 0; d < c.length; d++) {
                        var e = c[d];
                        "" === e.getAttribute("class") && e.removeAttribute("class"),
                            "" === e.getAttribute("style") && e.removeAttribute("style")
                    }
            }

            function E(a, b) { return a[3] - b[3] }

            function get(a, c) {
                if (!b.$wp) return b.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                var d = "";
                b.events.trigger("html.beforeGet");
                var e, f, g = [],
                    h = {},
                    i = [];
                if (!b.opts.useClasses && !c) {
                    var j = new RegExp("^" + b.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");
                    for (e = 0; e < b.doc.styleSheets.length; e++) {
                        var k, l = 0;
                        try { k = b.doc.styleSheets[e].cssRules, b.doc.styleSheets[e].ownerNode && "STYLE" == b.doc.styleSheets[e].ownerNode.nodeType && (l = 1) } catch (y) {}

                        if (k)
                            for (var m = 0, n = k.length; m < n; m++)
                                if (k[m].selectorText && k[m].style.cssText.length > 0) {
                                    var o, p = k[m].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");
                                    try { o = b.el.querySelectorAll(p) } catch (y) { o = [] }
                                    for (f = 0; f < o.length; f++) {
                                        !o[f].getAttribute("fr-original-style") && o[f].getAttribute("style") ? (o[f].setAttribute("fr-original-style", o[f].getAttribute("style")),
                                                g.push(o[f])) : o[f].getAttribute("fr-original-style") || g.push(o[f]),
                                            h[o[f]] || (h[o[f]] = {});
                                        for (var q = 1e3 * l + C(k[m].selectorText),
                                                s = k[m].style.cssText.split(";"),
                                                t = 0; t < s.length; t++) {
                                            var u = s[t].trim().split(":")[0];
                                            u.match(j) || (h[o[f]][u] || (h[o[f]][u] = 0, (o[f].getAttribute("fr-original-style") || "").indexOf(u + ":") >= 0 && (h[o[f]][u] = 1e4)),
                                                q >= h[o[f]][u] && (h[o[f]][u] = q, s[t].trim().length && i.push([o[f], u.trim(),
                                                    s[t].trim().split(":")[1].trim(),
                                                    q
                                                ])))
                                        }
                                    }
                                }
                    }
                    for (i.sort(E),
                        e = 0; e < i.length; e++) {
                        var v = i[e];
                        v[0].style[v[1]] = v[2]
                    }
                    for (e = 0; e < g.length; e++)
                        if (g[e].getAttribute("class") && (g[e].setAttribute("fr-original-class", g[e].getAttribute("class")),
                                g[e].removeAttribute("class")),
                            (g[e].getAttribute("fr-original-style") || "").trim().length > 0) {
                            var w = g[e].getAttribute("fr-original-style").split(";");
                            for (f = 0; f < w.length; f++) w[f].indexOf(":") > 0 && (g[e].style[w[f].split(":")[0].trim()] = w[f].split(":")[1].trim())
                        }
                }

                if (b.core.isEmpty() ? b.opts.fullPage && (d = getDoctype(b.iframe_document),
                        d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.find("head").get(0).outerHTML + "<body></body></html>") : (void 0 === a && (a = !1),
                        b.opts.fullPage ? (d = getDoctype(b.iframe_document),
                            b.$el.removeClass("fr-view"),
                            d += "<html" + b.node.attributes(b.$html.get(0)) + ">" + b.$html.html() + "</html>", b.$el.addClass("fr-view")) : d = b.$el.html()), !b.opts.useClasses && !c)
                    for (e = 0; e < g.length; e++) g[e].getAttribute("fr-original-class") && (g[e].setAttribute("class", g[e].getAttribute("fr-original-class")),
                            g[e].removeAttribute("fr-original-class")),
                        g[e].getAttribute("fr-original-style") ? (g[e].setAttribute("style", g[e].getAttribute("fr-original-style")),
                            g[e].removeAttribute("fr-original-style")) : g[e].removeAttribute("style");
                b.opts.fullPage && (d = d.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, ""),
                        d = d.replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, ""),
                        d = d.replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, ""),
                        d = d.replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>"),
                        d = d.replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"),
                        d = d.replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>"),
                        d = d.replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>'),
                        d = d.replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")),
                    b.opts.htmlSimpleAmpersand && (d = d.replace(/\&amp;/gi, "&")),
                    b.events.trigger("html.afterGet"),
                    a || (d = d.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")),
                    d = b.clean.invisibleSpaces(d),
                    d = b.clean.exec(d, D);
                var x = b.events.chainTrigger("html.get", d);
                return "string" == typeof x && (d = x),
                    d = d.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(a) { return a.replace(/<br>/g, "\n") })
            }

            function getSelected() {
                var c = function(c, d) {
                        for (; d && (d.nodeType == Node.TEXT_NODE || !b.node.isBlock(d)) && !b.node.isElement(d);) d && d.nodeType != Node.TEXT_NODE && $(c).wrapInner(b.node.openTagString(d) + b.node.closeTagString(d)),
                            d = d.parentNode;
                        d && c.innerHTML == d.innerHTML && (c.innerHTML = d.outerHTML)
                    },
                    d = function() {
                        var c, d = null;
                        return b.win.getSelection ? (c = b.win.getSelection()) && c.rangeCount && (d = c.getRangeAt(0).commonAncestorContainer, d.nodeType != Node.ELEMENT_NODE && (d = d.parentNode)) : (c = b.doc.selection) && "Control" != c.type && (d = c.createRange().parentElement()),
                            null != d && ($.inArray(b.el, $(d).parents()) >= 0 || d == b.el) ? d : null
                    },
                    e = "";
                if (void 0 !== b.win.getSelection) {
                    b.browser.mozilla && (b.selection.save(),
                        b.$el.find('.fr-marker[data-type="false"]').length > 1 && (b.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(),
                            b.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"),
                            b.$el.find(".fr-marker").not('[data-id="0"]').remove()),
                        b.selection.restore());
                    for (var f = b.selection.ranges(),
                            g = 0; g < f.length; g++) {
                        var h = document.createElement("div");
                        h.appendChild(f[g].cloneContents());
                        var i = h.children;
                        if (i.length) {
                            var j = i[i.length - 1];
                            ("P" == j.tagName && b.opts.enter == $.FroalaEditor.ENTER_P || "DIV" == j.tagName && b.opts.enter == $.FroalaEditor.ENTER_DIV) && b.node.isEmpty(j) && h.removeChild(j)
                        }
                        c(h, d()),
                            $(h).find(".fr-element").length > 0 && (h = b.el),
                            e += h.innerHTML
                    }
                } else void 0 !== b.doc.selection && "Text" == b.doc.selection.type && (e = b.doc.selection.createRange().htmlText);
                return e
            }

            function H(a) {
                var c = b.doc.createElement("div");
                return c.innerHTML = a, null !== c.querySelector(blockTagsQuery())
            }

            function I(a) {
                var c = b.doc.createElement("div");
                return c.innerHTML = a, b.selection.setAtEnd(c),
                    c.innerHTML
            }

            function escapeEntities(a) { return a.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;") }

            function K(c) {
                if (!b.html.defaultTag()) return c;
                var d = b.doc.createElement("div");
                d.innerHTML = c;
                for (var e = d.querySelectorAll(":scope > " + b.html.defaultTag()),
                        f = e.length - 1; f >= 0; f--) {
                    var g = e[f];
                    b.node.isBlock(g.previousSibling) || (g.previousSibling && !b.node.isEmpty(g) && $("<br>").insertAfter(g.previousSibling),
                        g.outerHTML = g.innerHTML)
                }
                return d.innerHTML
            }

            function insert(c, d, e) {
                b.selection.isCollapsed() || b.selection.remove();
                var f;
                if (f = d ? c : b.clean.html(c),
                    f = f.replace(/\r|\n/g, " "),
                    c.indexOf('class="fr-marker"') < 0 && (f = I(f)),
                    b.core.isEmpty() && !b.opts.keepFormatOnDelete && H(f)) b.el.innerHTML = f;
                else {
                    var g = b.markers.insert();

                    if (g) {
                        b.node.isLastSibling(g) && $(g).parent().hasClass("fr-deletable") && $(g).insertAfter($(g).parent());
                        var h = b.node.blockParent(g);

                        if ((H(f) || e) && (b.node.deepestParent(g) || h && "LI" == h.tagName)) {
                            if (h && "LI" == h.tagName && (f = K(f)), !(g = b.markers.split())) return !1;
                            g.outerHTML = f
                        } else g.outerHTML = f
                    } else b.el.innerHTML = b.el.innerHTML + f
                }
                v(),
                    b.keys.positionCaret(),
                    b.events.trigger("html.inserted")
            }

            function cleanWhiteTags(c) {
                var d = null;
                if (void 0 === c && (d = b.selection.element()),
                    b.opts.keepFormatOnDelete) return !1;
                var e = d ? (d.textContent.match(/\u200B/g) || []).length - d.querySelectorAll(".fr-marker").length : 0;
                if ((b.el.textContent.match(/\u200B/g) || []).length - b.el.querySelectorAll(".fr-marker").length == e) return !1;
                var f, g;
                do {
                    g = !1, f = b.el.querySelectorAll("*:not(.fr-marker)");
                    for (var h = 0; h < f.length; h++) {
                        var i = f[h];
                        if (d != i) {
                            var j = i.textContent;
                            0 === i.children.length && 1 === j.length && 8203 == j.charCodeAt(0) && "TD" !== i.tagName && ($(i).remove(),
                                g = !0)
                        }
                    }
                }
                while (g)
            }

            function _init() {
                if (b.$wp) {
                    var a = function() {
                        cleanWhiteTags(),
                            b.placeholder && setTimeout(b.placeholder.refresh, 0)
                    };
                    b.events.on("mouseup", a),
                        b.events.on("keydown", a),
                        b.events.on("contentChanged", checkIfEmpty)
                }
            }
            return {
                defaultTag: defaultTag,
                isPreformatted: isPreformatted,
                emptyBlocks: e,
                emptyBlockTagsQuery: emptyBlockTagsQuery,
                blockTagsQuery: blockTagsQuery,
                fillEmptyBlocks: fillEmptyBlocks,
                cleanEmptyTags: cleanEmptyTags,
                cleanWhiteTags: cleanWhiteTags,
                cleanBlankSpaces: cleanBlankSpaces,
                blocks: blocks,
                getDoctype: getDoctype,
                set: set,
                get: get,
                getSelected: getSelected,
                insert: insert,
                wrap: wrap,
                unwrap: unwrap,
                escapeEntities: escapeEntities,
                checkIfEmpty: checkIfEmpty,
                extractNode: extractNode,
                extractNodeAttrs: extractNodeAttrs,
                extractDoctype: extractDoctype,
                cleanBRs: cleanBRs,
                _init: _init
            }
        },
        $.extend($.FE.DEFAULTS, { height: null, heightMax: null, heightMin: null, width: null }),
        $.FE.MODULES.size = function(a) {
            function syncIframe() {
                refresh(),
                    a.opts.height && a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom"))),
                    a.$iframe.height(a.$el.outerHeight(!0))
            }

            function refresh() {
                a.opts.heightMin ? a.$el.css("minHeight", a.opts.heightMin) : a.$el.css("minHeight", ""),
                    a.opts.heightMax ? (a.$wp.css("maxHeight", a.opts.heightMax),
                        a.$wp.css("overflow", "auto")) : (a.$wp.css("maxHeight", ""),
                        a.$wp.css("overflow", "")),
                    a.opts.height ? (a.$wp.height(a.opts.height),
                        a.$wp.css("overflow", "auto"),
                        a.$el.css("minHeight", a.opts.height - a.helpers.getPX(a.$el.css("padding-top")) - a.helpers.getPX(a.$el.css("padding-bottom")))) : (a.$wp.css("height", ""),
                        a.opts.heightMin || a.$el.css("minHeight", ""),
                        a.opts.heightMax || a.$wp.css("overflow", "")),
                    a.opts.width && a.$box.width(a.opts.width)
            }

            function _init() {
                if (!a.$wp) return !1;
                refresh(),
                    a.$iframe && (a.events.on("keyup keydown", function() { setTimeout(syncIframe, 0) }, !0),
                        a.events.on("commands.after html.set init initialized paste.after", syncIframe))
            }
            return {
                _init: _init,
                syncIframe: syncIframe,
                refresh: refresh
            }
        },
        $.extend($.FE.DEFAULTS, { language: null }),
        $.FE.LANGUAGE = {},
        $.FE.MODULES.language = function(b) {
            function translate(a) { return e && e.translation[a] ? e.translation[a] : a }

            function _init() {
                $.FE.LANGUAGE && (e = $.FE.LANGUAGE[b.opts.language]),
                    e && e.direction && (b.opts.direction = e.direction)
            }
            var e;
            return { _init: _init, translate: translate }
        },
        $.extend($.FE.DEFAULTS, { placeholderText: "Type something" }),
        $.FE.MODULES.placeholder = function(b) {
            function show() {
                b.$placeholder || g();
                var c = b.opts.iframe ? b.$iframe.prev().outerHeight(!0) : b.$el.prev().outerHeight(!0),
                    d = 0,
                    e = 0,
                    f = 0,
                    h = 0,
                    i = 0,
                    j = 0,
                    k = b.node.contents(b.el),
                    l = $(b.selection.element()).css("text-align");

                if (k.length && k[0].nodeType == Node.ELEMENT_NODE) {
                    var m = $(k[0]);
                    (!b.opts.toolbarInline || b.$el.prev().length > 0) && b.ready && (d = b.helpers.getPX(m.css("margin-top")),
                            h = b.helpers.getPX(m.css("padding-top")),
                            e = b.helpers.getPX(m.css("margin-left")),
                            f = b.helpers.getPX(m.css("margin-right")),
                            i = b.helpers.getPX(m.css("padding-left")),
                            j = b.helpers.getPX(m.css("padding-right"))),
                        b.$placeholder.css("font-size", m.css("font-size")),
                        b.$placeholder.css("line-height", m.css("line-height"))
                } else b.$placeholder.css("font-size", b.$el.css("font-size")),
                    b.$placeholder.css("line-height", b.$el.css("line-height"));
                b.$wp.addClass("show-placeholder"),
                    b.$placeholder.css({
                        marginTop: Math.max(b.helpers.getPX(b.$el.css("margin-top")),
                            d) + c,
                        paddingTop: Math.max(b.helpers.getPX(b.$el.css("padding-top")),
                            h),
                        paddingLeft: Math.max(b.helpers.getPX(b.$el.css("padding-left")),
                            i),
                        marginLeft: Math.max(b.helpers.getPX(b.$el.css("margin-left")),
                            e),
                        paddingRight: Math.max(b.helpers.getPX(b.$el.css("padding-right")),
                            j),
                        marginRight: Math.max(b.helpers.getPX(b.$el.css("margin-right")),
                            f),
                        textAlign: l
                    }).text(b.language.translate(b.opts.placeholderText || b.$oel.attr("placeholder") || "")),
                    b.$placeholder.html(b.$placeholder.text().replace(/\n/g, "<br>"))
            }

            function hide() { b.$wp.removeClass("show-placeholder") }

            function isVisible() {
                return !b.$wp || b.node.hasClass(b.$wp.get(0),
                    "show-placeholder")
            }

            function refresh() {
                if (!b.$wp) return !1;
                b.core.isEmpty() ? show() : hide()
            }

            function g() {
                b.$placeholder = $('<span class="fr-placeholder"></span>'),
                    b.$wp.append(b.$placeholder)
            }

            function _init() {
                if (!b.$wp) return !1;
                b.events.on("init input keydown keyup contentChanged initialized", refresh)
            }
            return {
                _init: _init,
                show: show,
                hide: hide,
                refresh: refresh,
                isVisible: isVisible
            }
        },
        $.FE.MODULES.edit = function(a) {
            function disableDesign() {
                if (a.browser.mozilla) try {
                    a.doc.execCommand("enableObjectResizing", !1, "false"),
                        a.doc.execCommand("enableInlineTableEditing", !1, "false")
                }
                catch (b) {}

                if (a.browser.msie) try {
                    a.doc.body.addEventListener("mscontrolselect", function(a) {
                        return a.preventDefault(), !1
                    })
                }
                catch (b) {}
            }

            function on() {
                a.$wp ? (a.$el.attr("contenteditable", !0),
                        a.$el.removeClass("fr-disabled").attr("aria-disabled", !1),
                        a.$tb && a.$tb.removeClass("fr-disabled").attr("aria-disabled", !1),
                        disableDesign()) : a.$el.is("a") && a.$el.attr("contenteditable", !0),
                    g = !1
            }

            function off() {
                a.$wp ? (a.$el.attr("contenteditable", !1),
                        a.$el.addClass("fr-disabled").attr("aria-disabled", !0),
                        a.$tb && a.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : a.$el.is("a") && a.$el.attr("contenteditable", !1),
                    g = !0
            }

            function isDisabled() { return g }

            function _init() { a.events.on("focus", function() { isDisabled() ? a.edit.off() : a.edit.on() }) }
            var g = !1;
            return {
                _init: _init,
                on: on,
                off: off,
                disableDesign: disableDesign,
                isDisabled: isDisabled
            }
        },
        $.extend($.FE.DEFAULTS, {
            editorClass: null,
            typingTimer: 500,
            iframe: !1,
            requestWithCORS: !0,
            requestWithCredentials: !1,
            requestHeaders: {},
            useClasses: !0,
            spellcheck: !0,
            iframeStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}',
            iframeStyleFiles: [],
            direction: "auto",
            zIndex: 1,
            tabIndex: null,
            disableRightClick: !1,
            scrollableContainer: "body",
            keepFormatOnDelete: !1,
            theme: null
        }),
        $.FE.MODULES.core = function(b) {
            function injectStyle(c) {
                if (b.opts.iframe) {
                    b.$head.find("style[data-fr-style], link[data-fr-style]").remove(),
                        b.$head.append('<style data-fr-style="true">' + c + "</style>");
                    for (var d = 0; d < b.opts.iframeStyleFiles.length; d++) {
                        var e = $('<link data-fr-style="true" rel="stylesheet" href="' + b.opts.iframeStyleFiles[d] + '">');
                        e.get(0).addEventListener("load", b.size.syncIframe),
                            b.$head.append(e)
                    }
                }
            }

            function d() { b.opts.iframe || b.$el.addClass("fr-element fr-view ignore") }

            function e() {
                if (b.$box.addClass("fr-box" + (b.opts.editorClass ? " " + b.opts.editorClass : "")),
                    b.$wp.addClass("fr-wrapper"),
                    d(),
                    b.opts.iframe) {
                    b.$iframe.addClass("fr-iframe"),
                        b.$el.addClass("fr-view");
                    for (var a = 0; a < b.o_doc.styleSheets.length; a++) {
                        var c;
                        try { c = b.o_doc.styleSheets[a].cssRules } catch (g) {}

                        if (c)
                            for (var e = 0, f = c.length; e < f; e++) !c[e].selectorText || 0 !== c[e].selectorText.indexOf(".fr-view") && 0 !== c[e].selectorText.indexOf(".fr-element") || c[e].style.cssText.length > 0 && (0 === c[e].selectorText.indexOf(".fr-view") ? b.opts.iframeStyle += c[e].selectorText.replace(/\.fr-view/g, "body") + "{" + c[e].style.cssText + "}" : b.opts.iframeStyle += c[e].selectorText.replace(/\.fr-element/g, "body") + "{" + c[e].style.cssText + "}")
                    }
                }
                "auto" != b.opts.direction && b.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction),
                    b.$el.attr("dir", b.opts.direction),
                    b.$wp.attr("dir", b.opts.direction),
                    b.opts.zIndex > 1 && b.$box.css("z-index", b.opts.zIndex),
                    b.opts.theme && b.$box.addClass(b.opts.theme + "-theme"),
                    b.opts.tabIndex = b.opts.tabIndex || b.$oel.attr("tabIndex"),
                    b.opts.tabIndex && b.$el.attr("tabIndex", b.opts.tabIndex)
            }

            function isEmpty() { return b.node.isEmpty(b.el) }

            function g() { b.drag_support = { filereader: "undefined" != typeof FileReader, formdata: !!b.win.FormData, progress: "upload" in new XMLHttpRequest } }

            function getXHR(a, c) {
                var d = new XMLHttpRequest;
                d.open(c, a, !0),
                    b.opts.requestWithCredentials && (d.withCredentials = !0);
                for (var e in b.opts.requestHeaders) b.opts.requestHeaders.hasOwnProperty(e) && d.setRequestHeader(e, b.opts.requestHeaders[e]);
                return d
            }

            function destroy(a) {
                "TEXTAREA" == b.$oel.get(0).tagName && b.$oel.val(a),
                    b.$wp && ("TEXTAREA" == b.$oel.get(0).tagName ? (b.$el.html(""),
                        b.$wp.html(""),
                        b.$box.replaceWith(b.$oel),
                        b.$oel.show()) : (b.$wp.replaceWith(a),
                        b.$el.html(""),
                        b.$box.removeClass("fr-view fr-ltr fr-box " + (b.opts.editorClass || "")),
                        b.opts.theme && b.$box.addClass(b.opts.theme + "-theme"))),
                    this.$wp = null, this.$el = null, this.el = null, this.$box = null
            }

            function hasFocus() { return b.browser.mozilla && b.helpers.isMobile() ? b.selection.inEditor() : b.node.hasFocus(b.el) || b.$el.find("*:focus").length > 0 }

            function sameInstance(a) {
                if (!a) return !1;
                var c = a.data("instance");
                return !!c && c.id == b.id
            }

            function _init() {
                if ($.FE.INSTANCES.push(b),
                    g(),
                    b.$wp) {
                    e(),
                        b.html.set(b._original_html),
                        b.$el.attr("spellcheck", b.opts.spellcheck),
                        b.helpers.isMobile() && (b.$el.attr("autocomplete", b.opts.spellcheck ? "on" : "off"),
                            b.$el.attr("autocorrect", b.opts.spellcheck ? "on" : "off"),
                    b.$el.attr('class','ignore'),
                            b.$el.attr("autocapitalize", b.opts.spellcheck ? "on" : "off")),
                        b.opts.disableRightClick && b.events.$on(b.$el, "contextmenu", function(a) {
                            if (2 == a.button) return !1
                        });
                    try { b.doc.execCommand("styleWithCSS", !1, !1) } catch (c) {}
                }
                "TEXTAREA" == b.$oel.get(0).tagName && (b.events.on("contentChanged", function() { b.$oel.val(b.html.get()) }),
                        b.events.on("form.submit", function() { b.$oel.val(b.html.get()) }),
                        b.events.on("form.reset", function() { b.html.set(b._original_html) }),
                        b.$oel.val(b.html.get())),
                    b.helpers.isIOS() && b.events.$on(b.$doc, "selectionchange", function() { b.$doc.get(0).hasFocus() || b.$win.get(0).focus() }),
                    b.events.trigger("init")
            }
            return {
                _init: _init,
                destroy: destroy,
                isEmpty: isEmpty,
                getXHR: getXHR,
                injectStyle: injectStyle,
                hasFocus: hasFocus,
                sameInstance: sameInstance
            }
        },
        $.FE.MODULES.cursorLists = function(b) {
            function c(a) {
                for (var b = a;
                    "LI" != b.tagName;) b = b.parentNode;
                return b
            }

            function d(a) {
                for (var c = a; !b.node.isList(c);) c = c.parentNode;
                return c
            }

            function _startEnter(e) {
                var f, g = c(e),
                    h = g.nextSibling,
                    i = g.previousSibling,
                    j = b.html.defaultTag();

                if (b.node.isEmpty(g, !0) && h) {
                    for (var k = "", l = "", m = e.parentNode; !b.node.isList(m) && m.parentNode && "LI" !== m.parentNode.tagName;) k = b.node.openTagString(m) + k, l += b.node.closeTagString(m),
                        m = m.parentNode;
                    k = b.node.openTagString(m) + k, l += b.node.closeTagString(m);
                    var n = "";
                    for (n = m.parentNode && "LI" == m.parentNode.tagName ? l + "<li>" + $.FE.MARKERS + "<br>" + k : j ? l + "<" + j + ">" + $.FE.MARKERS + "<br></" + j + ">" + k : l + $.FE.MARKERS + "<br>" + k, $(g).html('<span id="fr-break"></span>');
                        ["UL", "OL"].indexOf(m.tagName) < 0 || m.parentNode && "LI" === m.parentNode.tagName;) m = m.parentNode;
                    var o = b.node.openTagString(m) + $(m).html() + b.node.closeTagString(m);
                    o = o.replace(/<span id="fr-break"><\/span>/g, n),
                        $(m).replaceWith(o),
                        b.$el.find("li:empty").remove()
                } else
                if (i && h || !b.node.isEmpty(g, !0)) {
                    for (var p = "<br>", q = e.parentNode; q && "LI" != q.tagName;) p = b.node.openTagString(q) + p + b.node.closeTagString(q),
                        q = q.parentNode;
                    $(g).before("<li>" + p + "</li>"),
                        $(e).remove()
                } else
                if (i) {
                    f = d(g);
                    for (var r = $.FE.MARKERS + "<br>", s = e.parentNode; s && "LI" != s.tagName;) r = b.node.openTagString(s) + r + b.node.closeTagString(s),
                        s = s.parentNode;
                    f.parentNode && "LI" == f.parentNode.tagName ? $(f.parentNode).after("<li>" + r + "</li>") : j ? $(f).after("<" + j + ">" + r + "</" + j + ">") : $(f).after(r),
                        $(g).remove()
                } else f = d(g),
                    f.parentNode && "LI" == f.parentNode.tagName ? h ? $(f.parentNode).before(b.node.openTagString(g) + $.FE.MARKERS + "<br></li>") : $(f.parentNode).after(b.node.openTagString(g) + $.FE.MARKERS + "<br></li>") : j ? $(f).before("<" + j + ">" + $.FE.MARKERS + "<br></" + j + ">") : $(f).before($.FE.MARKERS + "<br>"),
                    $(g).remove()
            }

            function _middleEnter(d) {
                for (var e = c(d),
                        f = "", g = d, h = "", i = ""; g != e;) {
                    g = g.parentNode;
                    var j = "A" == g.tagName && b.cursor.isAtEnd(d, g) ? "fr-to-remove" : "";
                    h = b.node.openTagString($(g).clone().addClass(j).get(0)) + h, i = b.node.closeTagString(g) + i
                }
                f = i + f + h + $.FE.MARKERS, $(d).replaceWith('<span id="fr-break"></span>');
                var k = b.node.openTagString(e) + $(e).html() + b.node.closeTagString(e);
                k = k.replace(/<span id="fr-break"><\/span>/g, f),
                    $(e).replaceWith(k)
            }

            function _endEnter(d) {
                for (var e = c(d),
                        f = $.FE.MARKERS, g = "", h = d, i = !1; h != e;) {
                    h = h.parentNode;
                    var j = "A" == h.tagName && b.cursor.isAtEnd(d, h) ? "fr-to-remove" : "";
                    i || h == e || b.node.isBlock(h) || (i = !0, g += $.FE.INVISIBLE_SPACE),
                        g = b.node.openTagString($(h).clone().addClass(j).get(0)) + g, f += b.node.closeTagString(h)
                }
                var k = g + f;
                $(d).remove(),
                    $(e).after(k)
            }

            function _backspace(e) {
                var f = c(e),
                    g = f.previousSibling;
                if (g) {
                    g = $(g).find(b.html.blockTagsQuery()).get(-1) || g, $(e).replaceWith($.FE.MARKERS);
                    var h = b.node.contents(g);
                    h.length && "BR" == h[h.length - 1].tagName && $(h[h.length - 1]).remove(),
                        $(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == f && $(this).replaceWith($(this).html() + (b.node.isEmpty(this) ? "" : "<br>")) });
                    for (var i, j = b.node.contents(f)[0]; j && !b.node.isList(j);) i = j.nextSibling, $(g).append(j),
                        j = i;
                    for (g = f.previousSibling; j;) i = j.nextSibling, $(g).append(j),
                        j = i;
                    $(f).remove()
                } else {
                    var k = d(f);

                    if ($(e).replaceWith($.FE.MARKERS),
                        k.parentNode && "LI" == k.parentNode.tagName) {
                        var l = k.previousSibling;
                        b.node.isBlock(l) ? ($(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == f && $(this).replaceWith($(this).html() + (b.node.isEmpty(this) ? "" : "<br>")) }),
                            $(l).append($(f).html())) : $(k).before($(f).html())
                    } else {
                        var m = b.html.defaultTag();
                        m && 0 === $(f).find(b.html.blockTagsQuery()).length ? $(k).before("<" + m + ">" + $(f).html() + "</" + m + ">") : ($(k).before($(f).html()),
                            b.html.wrap())
                    }
                    $(f).remove(),
                        0 === $(k).find("li").length && $(k).remove()
                }
            }

            function _del(d) {
                var e, f = c(d),
                    g = f.nextSibling;
                if (g) {
                    e = b.node.contents(g),
                        e.length && "BR" == e[0].tagName && $(e[0]).remove(),
                        $(g).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == g && $(this).replaceWith($(this).html() + (b.node.isEmpty(this) ? "" : "<br>")) });
                    for (var h, i = d, j = b.node.contents(g)[0]; j && !b.node.isList(j);) h = j.nextSibling, $(i).after(j),
                        i = j, j = h;
                    for (; j;) h = j.nextSibling, $(f).append(j),
                        j = h;
                    $(d).replaceWith($.FE.MARKERS),
                        $(g).remove()
                } else {
                    for (var k = f; !k.nextSibling && k != b.el;) k = k.parentNode;
                    if (k == b.el) return !1;
                    if (k = k.nextSibling, b.node.isBlock(k)) $.FE.NO_DELETE_TAGS.indexOf(k.tagName) < 0 && ($(d).replaceWith($.FE.MARKERS),
                        e = b.node.contents(f),
                        e.length && "BR" == e[e.length - 1].tagName && $(e[e.length - 1]).remove(),
                        $(f).append($(k).html()),
                        $(k).remove());
                    else
                        for (e = b.node.contents(f),
                            e.length && "BR" == e[e.length - 1].tagName && $(e[e.length - 1]).remove(),
                            $(d).replaceWith($.FE.MARKERS); k && !b.node.isBlock(k) && "BR" != k.tagName;) $(f).append($(k)),
                            k = k.nextSibling
                }
            }
            return {
                _startEnter: _startEnter,
                _middleEnter: _middleEnter,
                _endEnter: _endEnter,
                _backspace: _backspace,
                _del: _del
            }
        },
        $.FE.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], $.FE.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], $.FE.MODULES.cursor = function(b) {
            function c(a) { return !!a && (!!b.node.isBlock(a) || (a.nextSibling && a.nextSibling.nodeType == Node.TEXT_NODE && 0 === a.nextSibling.textContent.replace(/\u200b/g, "").length ? c(a.nextSibling) : !(a.nextSibling && (!a.previousSibling || "BR" != a.nextSibling.tagName || a.nextSibling.nextSibling)) && c(a.parentNode))) }

            function d(a) { return !!a && (!!b.node.isBlock(a) || (a.previousSibling && a.previousSibling.nodeType == Node.TEXT_NODE && 0 === a.previousSibling.textContent.replace(/\u200b/g, "").length ? d(a.previousSibling) : !a.previousSibling && (!(a.previousSibling || !b.node.hasClass(a.parentNode, "fr-inner")) || d(a.parentNode)))) }

            function isAtStart(a, c) { return !!a && (a != b.$wp.get(0) && (a.previousSibling && a.previousSibling.nodeType == Node.TEXT_NODE && 0 === a.previousSibling.textContent.replace(/\u200b/g, "").length ? isAtStart(a.previousSibling, c) : !a.previousSibling && (a.parentNode == c || isAtStart(a.parentNode, c)))) }

            function isAtEnd(a, c) { return !!a && (a != b.$wp.get(0) && (a.nextSibling && a.nextSibling.nodeType == Node.TEXT_NODE && 0 === a.nextSibling.textContent.replace(/\u200b/g, "").length ? isAtEnd(a.nextSibling, c) : !(a.nextSibling && (!a.previousSibling || "BR" != a.nextSibling.tagName || a.nextSibling.nextSibling)) && (a.parentNode == c || isAtEnd(a.parentNode, c)))) }

            function g(c) { return $(c).parentsUntil(b.$el, "LI").length > 0 && 0 === $(c).parentsUntil("LI", "TABLE").length }

            function h(a, b) {
                var c = new RegExp("([\\uD83C-\\uDBFF\\uDC00-\\uDFFF\\u200D]+)" + (b ? "" : "$"),
                        "i"),
                    d = a.match(c);
                return d ? d[0].length : 1
            }

            function i(c) {
                var d = $(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0,
                    e = b.node.deepestParent(c, [], !d);

                if (e && "BLOCKQUOTE" == e.tagName) {
                    var f = b.node.deepestParent(c, [$(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                    f && f.previousSibling && (e = f)
                }

                if (null !== e) {
                    var g, h = e.previousSibling;
                    if (b.node.isBlock(e) && b.node.isEditable(e) && h && $.FE.NO_DELETE_TAGS.indexOf(h.tagName) < 0)
                        if (b.node.isDeletable(h)) $(h).remove(),
                            $(c).replaceWith($.FE.MARKERS);
                        else
                    if (b.node.isEditable(h))
                        if (b.node.isBlock(h))
                            if (b.node.isEmpty(h) && !b.node.isList(h)) $(h).remove(),
                                $(c).after(b.opts.keepFormatOnDelete ? $.FE.INVISIBLE_SPACE : "");
                            else {
                                if (b.node.isList(h) && (h = $(h).find("li:last").get(0)),
                                    g = b.node.contents(h),
                                    g.length && "BR" == g[g.length - 1].tagName && $(g[g.length - 1]).remove(),
                                    "BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName)
                                    for (g = b.node.contents(h); g.length && b.node.isBlock(g[g.length - 1]);) h = g[g.length - 1], g = b.node.contents(h);
                                else
                                if ("BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName)
                                    for (g = b.node.contents(e); g.length && b.node.isBlock(g[0]);) e = g[0], g = b.node.contents(e);
                                b.node.isEmpty(e) ? ($(c).remove(),
                                        b.selection.setAtEnd(h, b.opts.keepFormatOnDelete)) : ($(c).replaceWith($.FE.MARKERS),
                                        $(h).append(e.innerHTML)),
                                    $(e).remove()
                            }
                    else $(c).replaceWith($.FE.MARKERS),
                        "BLOCKQUOTE" == e.tagName && h.nodeType == Node.ELEMENT_NODE ? $(h).remove() : ($(h).after(b.node.isEmpty(e) ? "" : $(e).html()),
                            $(e).remove(),
                            "BR" == h.tagName && $(h).remove())
                }
            }

            function j(c) {
                for (var d = c; !d.previousSibling;)
                    if (d = d.parentNode, b.node.isElement(d)) return !1;
                d = d.previousSibling;
                var e;
                if (!b.node.isBlock(d) && b.node.isEditable(d)) {
                    for (e = b.node.contents(d); d.nodeType != Node.TEXT_NODE && !b.node.isDeletable(d) && e.length && b.node.isEditable(d);) d = e[e.length - 1], e = b.node.contents(d);

                    if (d.nodeType == Node.TEXT_NODE) {
                        var f = d.textContent,
                            g = f.length;
                        if (b.opts.tabSpaces && f.length >= b.opts.tabSpaces) {
                            0 === f.substr(f.length - b.opts.tabSpaces, f.length - 1).replace(/ /g, "").replace(new RegExp($.FE.UNICODE_NBSP, "g"),
                                "").length && (g = f.length - b.opts.tabSpaces)
                        }
                        d.textContent = f.substring(0, g - h(f));
                        var i = f.length != d.textContent.length;
                        0 === d.textContent.length ? i && b.opts.keepFormatOnDelete ? $(d).after($.FE.INVISIBLE_SPACE + $.FE.MARKERS) : (2 != d.parentNode.childNodes.length || d.parentNode != c.parentNode) && 1 != d.parentNode.childNodes.length || b.node.isBlock(d.parentNode) || b.node.isElement(d.parentNode) ? ($(d).after($.FE.MARKERS),
                            b.node.isElement(d.parentNode) && !c.nextSibling && d.previousSibling && "BR" == d.previousSibling.tagName && $(c).after("<br>"),
                            d.parentNode.removeChild(d)) : ($(d.parentNode).after($.FE.MARKERS),
                            $(d.parentNode).remove()) : $(d).after($.FE.MARKERS)
                    } else b.node.isDeletable(d) ? ($(d).after($.FE.MARKERS),
                        $(d).remove()) : c.nextSibling && "BR" == c.nextSibling.tagName && b.node.isVoid(d) && "BR" != d.tagName ? ($(c.nextSibling).remove(),
                        $(c).replaceWith($.FE.MARKERS)) : !1 !== b.events.trigger("node.remove", [$(d)]) && ($(d).after($.FE.MARKERS),
                        $(d).remove())
                } else
                if ($.FE.NO_DELETE_TAGS.indexOf(d.tagName) < 0 && (b.node.isEditable(d) || b.node.isDeletable(d)))
                    if (b.node.isDeletable(d)) $(c).replaceWith($.FE.MARKERS),
                        $(d).remove();
                    else
                if (b.node.isEmpty(d) && !b.node.isList(d)) $(d).remove(),
                    $(c).replaceWith($.FE.MARKERS);
                else {
                    for (b.node.isList(d) && (d = $(d).find("li:last").get(0)),
                        e = b.node.contents(d),
                        e && "BR" == e[e.length - 1].tagName && $(e[e.length - 1]).remove(),
                        e = b.node.contents(d); e && b.node.isBlock(e[e.length - 1]);
                    ) d = e[e.length - 1], e = b.node.contents(d);
                    $(d).append($.FE.MARKERS);
                    for (var j = c; !j.previousSibling;) j = j.parentNode;
                    for (; j && "BR" !== j.tagName && !b.node.isBlock(j);) {
                        var k = j;
                        j = j.nextSibling, $(d).append(k)
                    }
                    j && "BR" == j.tagName && $(j).remove(),
                        $(c).remove()
                } else c.nextSibling && "BR" == c.nextSibling.tagName && $(c.nextSibling).remove()
            }

            function backspace() {
                var f = !1,
                    k = b.markers.insert();

                if (!k) return !0;
                for (var l = k.parentNode; l && !b.node.isElement(l);) {
                    if ("false" === l.getAttribute("contenteditable")) return $(k).replaceWith($.FE.MARKERS),
                        b.selection.restore(), !1;
                    if ("true" === l.getAttribute("contenteditable")) break;
                    l = l.parentNode
                }
                b.el.normalize();
                var m = k.previousSibling;
                if (m) {
                    var n = m.textContent;
                    n && n.length && 8203 == n.charCodeAt(n.length - 1) && (1 == n.length ? $(m).remove() : m.textContent = m.textContent.substr(0, n.length - h(n)))
                }
                return c(k) ? f = j(k) : d(k) ? g(k) && isAtStart(k, $(k).parents("li:first").get(0)) ? b.cursorLists._backspace(k) : i(k) : f = j(k),
                    $(k).remove(),
                    o(),
                    b.html.fillEmptyBlocks(!0),
                    b.opts.htmlUntouched || (b.html.cleanEmptyTags(),
                        b.clean.quotes(),
                        b.clean.lists()),
                    b.spaces.normalizeAroundCursor(),
                    b.selection.restore(),
                    f
            }

            function l(c) {
                var d = $(c).parentsUntil(b.$el, "BLOCKQUOTE").length > 0,
                    e = b.node.deepestParent(c, [], !d);

                if (e && "BLOCKQUOTE" == e.tagName) {
                    var f = b.node.deepestParent(c, [$(c).parentsUntil(b.$el, "BLOCKQUOTE").get(0)]);
                    f && f.nextSibling && (e = f)
                }

                if (null !== e) {
                    var g, h = e.nextSibling;
                    if (b.node.isBlock(e) && (b.node.isEditable(e) || b.node.isDeletable(e)) && h && $.FE.NO_DELETE_TAGS.indexOf(h.tagName) < 0)
                        if (b.node.isDeletable(h)) $(h).remove(),
                            $(c).replaceWith($.FE.MARKERS);
                        else
                    if (b.node.isBlock(h) && b.node.isEditable(h))
                        if (b.node.isList(h))
                            if (b.node.isEmpty(e, !0)) $(e).remove(),
                                $(h).find("li:first").prepend($.FE.MARKERS);
                            else {
                                var i = $(h).find("li:first");
                                "BLOCKQUOTE" == e.tagName && (g = b.node.contents(e),
                                        g.length && b.node.isBlock(g[g.length - 1]) && (e = g[g.length - 1])),
                                    0 === i.find("ul, ol").length && ($(c).replaceWith($.FE.MARKERS),
                                        i.find(b.html.blockTagsQuery()).not("ol, ul, table").each(function() { this.parentNode == i.get(0) && $(this).replaceWith($(this).html() + (b.node.isEmpty(this) ? "" : "<br>")) }),
                                        $(e).append(b.node.contents(i.get(0))),
                                        i.remove(),
                                        0 === $(h).find("li").length && $(h).remove())
                            }
                    else {
                        if (g = b.node.contents(h),
                            g.length && "BR" == g[0].tagName && $(g[0]).remove(),
                            "BLOCKQUOTE" != h.tagName && "BLOCKQUOTE" == e.tagName)
                            for (g = b.node.contents(e); g.length && b.node.isBlock(g[g.length - 1]);) e = g[g.length - 1], g = b.node.contents(e);
                        else
                        if ("BLOCKQUOTE" == h.tagName && "BLOCKQUOTE" != e.tagName)
                            for (g = b.node.contents(h); g.length && b.node.isBlock(g[0]);) h = g[0], g = b.node.contents(h);
                        $(c).replaceWith($.FE.MARKERS),
                            $(e).append(h.innerHTML),
                            $(h).remove()
                    } else {
                        for ($(c).replaceWith($.FE.MARKERS); h && "BR" !== h.tagName && !b.node.isBlock(h) && b.node.isEditable(h);) {
                            var j = h;
                            h = h.nextSibling, $(e).append(j)
                        }
                        h && "BR" == h.tagName && b.node.isEditable(h) && $(h).remove()
                    }
                }
            }

            function m(d) {
                for (var e = d; !e.nextSibling;)
                    if (e = e.parentNode, b.node.isElement(e)) return !1;
                if (e = e.nextSibling, "BR" == e.tagName && b.node.isEditable(e))
                    if (e.nextSibling) {
                        if (b.node.isBlock(e.nextSibling) && b.node.isEditable(e.nextSibling)) {
                            if (!($.FE.NO_DELETE_TAGS.indexOf(e.nextSibling.tagName) < 0)) return void $(e).remove();
                            e = e.nextSibling, $(e.previousSibling).remove()
                        }
                    } else
                if (c(e)) {
                    if (g(d)) b.cursorLists._del(d);
                    else {
                        var f = b.node.deepestParent(e);
                        f && ((!b.node.isEmpty(b.node.blockParent(e)) || (b.node.blockParent(e).nextSibling && $.FE.NO_DELETE_TAGS.indexOf(b.node.blockParent(e).nextSibling.tagName)) < 0) && $(e).remove(),
                            l(d))
                    }
                    return
                }
                var i;
                if (!b.node.isBlock(e) && b.node.isEditable(e)) {
                    for (i = b.node.contents(e); e.nodeType != Node.TEXT_NODE && i.length && !b.node.isDeletable(e) && b.node.isEditable(e);) e = i[0], i = b.node.contents(e);
                    e.nodeType == Node.TEXT_NODE ? ($(e).before($.FE.MARKERS),
                            e.textContent.length && (e.textContent = e.textContent.substring(h(e.textContent, !0),
                                e.textContent.length))) : b.node.isDeletable(e) ? ($(e).before($.FE.MARKERS),
                            $(e).remove()) : !1 !== b.events.trigger("node.remove", [$(e)]) && ($(e).before($.FE.MARKERS),
                            $(e).remove()),
                        $(d).remove()
                } else
                if ($.FE.NO_DELETE_TAGS.indexOf(e.tagName) < 0 && (b.node.isEditable(e) || b.node.isDeletable(e)))
                    if (b.node.isDeletable(e)) $(d).replaceWith($.FE.MARKERS),
                        $(e).remove();
                    else
                if (b.node.isList(e)) d.previousSibling ? ($(e).find("li:first").prepend(d),
                    b.cursorLists._backspace(d)) : ($(e).find("li:first").prepend($.FE.MARKERS),
                    $(d).remove());
                else
                if (i = b.node.contents(e),
                    i && "BR" == i[0].tagName && $(i[0]).remove(),
                    i && "BLOCKQUOTE" == e.tagName) {
                    var j = i[0];
                    for ($(d).before($.FE.MARKERS); j && "BR" != j.tagName;) {
                        var k = j;
                        j = j.nextSibling, $(d).before(k)
                    }
                    j && "BR" == j.tagName && $(j).remove()
                } else $(d).after($(e).html()).after($.FE.MARKERS),
                    $(e).remove()
            }

            function del() {
                var e = b.markers.insert();

                if (!e) return !1;
                if (b.el.normalize(),
                    c(e))
                    if (g(e))
                        if (0 === $(e).parents("li:first").find("ul, ol").length) b.cursorLists._del(e);
                        else {
                            var f = $(e).parents("li:first").find("ul:first, ol:first").find("li:first");
                            f = f.find(b.html.blockTagsQuery()).get(-1) || f, f.prepend(e),
                                b.cursorLists._backspace(e)
                        }
                else l(e);
                else m(d(e) ? e : e);
                $(e).remove(),
                    o(),
                    b.html.fillEmptyBlocks(!0),
                    b.opts.htmlUntouched || (b.html.cleanEmptyTags(),
                        b.clean.quotes(),
                        b.clean.lists()),
                    b.spaces.normalizeAroundCursor(),
                    b.selection.restore()
            }

            function o() {
                for (var a = b.el.querySelectorAll("blockquote:empty"),
                        c = 0; c < a.length; c++) a[c].parentNode.removeChild(a[c])
            }

            function p() {
                b.$el.find(".fr-to-remove").each(function() {
                    for (var c = b.node.contents(this),
                            d = 0; d < c.length; d++) c[d].nodeType == Node.TEXT_NODE && (c[d].textContent = c[d].textContent.replace(/\u200B/g, ""));
                    $(this).replaceWith(this.innerHTML)
                })
            }

            function q(c, d, e) {
                var g, h = b.node.deepestParent(c, [], !e);
                if (h && "BLOCKQUOTE" == h.tagName) return isAtEnd(c, h) ? (g = b.html.defaultTag(),
                    g ? $(h).after("<" + g + ">" + $.FE.MARKERS + "<br></" + g + ">") : $(h).after($.FE.MARKERS + "<br>"),
                    $(c).remove(), !1) : (s(c, d, e), !1);

                if (null == h) g = b.html.defaultTag(),
                    g && b.node.isElement(c.parentNode) ? $(c).replaceWith("<" + g + ">" + $.FE.MARKERS + "<br></" + g + ">") : !c.previousSibling || $(c.previousSibling).is("br") || c.nextSibling ? $(c).replaceWith("<br>" + $.FE.MARKERS) : $(c).replaceWith("<br>" + $.FE.MARKERS + "<br>");
                else {
                    var i = c,
                        j = "";
                    b.node.isBlock(h) && !d || (j = "<br/>");
                    var k = "",
                        l = "";
                    g = b.html.defaultTag();
                    var m = "",
                        n = "";
                    g && b.node.isBlock(h) && (m = "<" + g + ">", n = "</" + g + ">", h.tagName == g.toUpperCase() && (m = b.node.openTagString($(h).clone().removeAttr("id").get(0))));
                    do {
                        if (i = i.parentNode, !d || i != h || d && !b.node.isBlock(h))
                            if (k += b.node.closeTagString(i),
                                i == h && b.node.isBlock(h)) l = m + l;
                            else {
                                var o = "A" == i.tagName && isAtEnd(c, i) ? "fr-to-remove" : "";
                                l = b.node.openTagString($(i).clone().addClass(o).get(0)) + l
                            }
                    }
                    while (i != h);
                    j = k + j + l + (c.parentNode == h && b.node.isBlock(h) ? "" : $.FE.INVISIBLE_SPACE) + $.FE.MARKERS, b.node.isBlock(h) && !$(h).find("*:last").is("br") && $(h).append("<br/>"),
                        $(c).after('<span id="fr-break"></span>'),
                        $(c).remove(),
                        h.nextSibling && !b.node.isBlock(h.nextSibling) || b.node.isBlock(h) || $(h).after("<br>");
                    var p;
                    p = !d && b.node.isBlock(h) ? b.node.openTagString(h) + $(h).html() + n : b.node.openTagString(h) + $(h).html() + b.node.closeTagString(h),
                        p = p.replace(/<span id="fr-break"><\/span>/g, j),
                        $(h).replaceWith(p)
                }
            }

            function r(c, d, g) {
                var h, i = b.node.deepestParent(c, [], !g);

                if (i && "TABLE" == i.tagName) return $(i).find("td:first, th:first").prepend(c),
                    r(c, d, g);

                if (i && "BLOCKQUOTE" == i.tagName) {
                    if (isAtStart(c, i)) return h = b.html.defaultTag(),
                        h ? $(i).before("<" + h + ">" + $.FE.MARKERS + "<br></" + h + ">") : $(i).before($.FE.MARKERS + "<br>"),
                        $(c).remove(), !1;
                    isAtEnd(c, i) ? q(c, d, !0) : s(c, d, !0)
                }

                if (null == i) h = b.html.defaultTag(),
                    h && b.node.isElement(c.parentNode) ? $(c).replaceWith("<" + h + ">" + $.FE.MARKERS + "<br></" + h + ">") : $(c).replaceWith("<br>" + $.FE.MARKERS);
                else {
                    if (b.node.isBlock(i))
                        if (d) $(c).remove(),
                            $(i).prepend("<br>" + $.FE.MARKERS);
                        else {
                            if (b.node.isEmpty(i, !0)) return q(c, d, g);

                            if (b.opts.keepFormatOnDelete) {
                                for (var j = c, k = $.FE.INVISIBLE_SPACE; j != i && !b.node.isElement(j);) j = j.parentNode, k = b.node.openTagString(j) + k + b.node.closeTagString(j);
                                $(i).before(k)
                            } else $(i).before(b.node.openTagString($(i).clone().removeAttr("id").get(0)) + "<br>" + b.node.closeTagString(i))
                        }
                    else $(i).before("<br>");
                    $(c).remove()
                }
            }

            function s(c, d, g) {
                var h = b.node.deepestParent(c, [], !g);

                if (null == h) b.html.defaultTag() && c.parentNode === b.el ? $(c).replaceWith("<" + b.html.defaultTag() + ">" + $.FE.MARKERS + "<br></" + b.html.defaultTag() + ">") : (c.nextSibling && !b.node.isBlock(c.nextSibling) || $(c).after("<br>"),
                    $(c).replaceWith("<br>" + $.FE.MARKERS));
                else {
                    var i = c,
                        j = "";
                    "PRE" == h.tagName && (d = !0),
                        b.node.isBlock(h) && !d || (j = "<br>");
                    var k = "",
                        l = "";
                    do {
                        var m = i;
                        if (i = i.parentNode, "BLOCKQUOTE" == h.tagName && b.node.isEmpty(m) && !b.node.hasClass(m, "fr-marker") && $(m).find(c).length > 0 && $(m).after(c),
                            ("BLOCKQUOTE" != h.tagName || !isAtEnd(c, i) && !isAtStart(c, i)) && (!d || i != h || d && !b.node.isBlock(h))) {
                            k += b.node.closeTagString(i);
                            var n = "A" == i.tagName && isAtEnd(c, i) ? "fr-to-remove" : "";
                            l = b.node.openTagString($(i).clone().addClass(n).removeAttr("id").get(0)) + l
                        }
                    }
                    while (i != h);
                    var o = h == c.parentNode && b.node.isBlock(h) || c.nextSibling;
                    if ("BLOCKQUOTE" == h.tagName) {
                        c.previousSibling && b.node.isBlock(c.previousSibling) && c.nextSibling && "BR" == c.nextSibling.tagName && ($(c.nextSibling).after(c),
                            c.nextSibling && "BR" == c.nextSibling.tagName && $(c.nextSibling).remove());
                        var p = b.html.defaultTag();
                        j = k + j + (p ? "<" + p + ">" : "") + $.FE.MARKERS + "<br>" + (p ? "</" + p + ">" : "") + l
                    } else j = k + j + l + (o ? "" : $.FE.INVISIBLE_SPACE) + $.FE.MARKERS;
                    $(c).replaceWith('<span id="fr-break"></span>');
                    var q = b.node.openTagString(h) + $(h).html() + b.node.closeTagString(h);
                    q = q.replace(/<span id="fr-break"><\/span>/g, j),
                        $(h).replaceWith(q)
                }
            }

            function enter(e) {
                var f = b.markers.insert();

                if (!f) return !0;
                b.el.normalize();
                var h = !1;
                $(f).parentsUntil(b.$el, "BLOCKQUOTE").length > 0 && (e = !1, h = !0),
                    $(f).parentsUntil(b.$el, "TD, TH").length && (h = !1),
                    c(f) ? !g(f) || e || h ? q(f, e, h) : b.cursorLists._endEnter(f) : d(f) ? !g(f) || e || h ? r(f, e, h) : b.cursorLists._startEnter(f) : !g(f) || e || h ? s(f, e, h) : b.cursorLists._middleEnter(f),
                    p(),
                    b.html.fillEmptyBlocks(!0),
                    b.opts.htmlUntouched || (b.html.cleanEmptyTags(),
                        b.clean.lists()),
                    b.spaces.normalizeAroundCursor(),
                    b.selection.restore()
            }
            return {
                enter: enter,
                backspace: backspace,
                del: del,
                isAtEnd: isAtEnd,
                isAtStart: isAtStart
            }
        },
        $.FE.ENTER_P = 0, $.FE.ENTER_DIV = 1, $.FE.ENTER_BR = 2, $.FE.KEYCODE = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, DELETE: 46, ZERO: 48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57, FF_SEMICOLON: 59, FF_EQUALS: 61, QUESTION_MARK: 63, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, META: 91, NUM_ZERO: 96, NUM_ONE: 97, NUM_TWO: 98, NUM_THREE: 99, NUM_FOUR: 100, NUM_FIVE: 101, NUM_SIX: 102, NUM_SEVEN: 103, NUM_EIGHT: 104, NUM_NINE: 105, NUM_MULTIPLY: 106, NUM_PLUS: 107, NUM_MINUS: 109, NUM_PERIOD: 110, NUM_DIVISION: 111, F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123, FF_HYPHEN: 173, SEMICOLON: 186, DASH: 189, EQUALS: 187, COMMA: 188, HYPHEN: 189, PERIOD: 190, SLASH: 191, APOSTROPHE: 192, TILDE: 192, SINGLE_QUOTE: 222, OPEN_SQUARE_BRACKET: 219, BACKSLASH: 220, CLOSE_SQUARE_BRACKET: 221, IME: 229 },
        $.extend($.FE.DEFAULTS, { enter: $.FE.ENTER_P, multiLine: !0, tabSpaces: 0 }),
        $.FE.MODULES.keys = function(b) {
            function c(a) {
                G = null, b.opts.multiLine ? b.helpers.isIOS() ? G = b.snapshot.get() : (a.preventDefault(),
                    a.stopPropagation(),
                    b.selection.isCollapsed() || b.selection.remove(),
                    b.cursor.enter()) : (a.preventDefault(),
                    a.stopPropagation())
            }

            function d(a) {
                a.preventDefault(),
                    a.stopPropagation(),
                    b.opts.multiLine && (b.selection.isCollapsed() || b.selection.remove(),
                        b.cursor.enter(!0))
            }

            function e() {
                setTimeout(function() {
                        b.events.disableBlur(),
                            b.events.focus()
                    },
                    0)
            }

            function f(a) {
                G = null, b.selection.isCollapsed() ? b.helpers.isIOS() ? G = b.snapshot.get() : (b.cursor.backspace(),
                        a.preventDefault(),
                        a.stopPropagation()) : (a.preventDefault(),
                        a.stopPropagation(),
                        b.selection.remove(),
                        b.html.fillEmptyBlocks()),
                    b.placeholder.refresh()
            }

            function g(a) {
                a.preventDefault(),
                    a.stopPropagation(),
                    "" === b.selection.text() ? b.cursor.del() : b.selection.remove(),
                    b.placeholder.refresh()
            }

            function h(c) {
                var d = b.selection.element();

                if (!b.helpers.isMobile() && d && "A" == d.tagName) {
                    c.preventDefault(),
                        c.stopPropagation(),
                        b.selection.isCollapsed() || b.selection.remove();
                    var e = b.markers.insert();

                    if (e) {
                        var f = e.previousSibling;
                        !e.nextSibling && e.parentNode && "A" == e.parentNode.tagName ? (e.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + $.FE.MARKERS),
                                e.parentNode.removeChild(e)) : (f && f.nodeType == Node.TEXT_NODE && 1 == f.textContent.length && 160 == f.textContent.charCodeAt(0) ? f.textContent = f.textContent + " " : e.insertAdjacentHTML("beforebegin", "&nbsp;"),
                                e.outerHTML = $.FE.MARKERS),
                            b.selection.restore()
                    }
                }
            }

            function i() {
                if (b.browser.mozilla && b.selection.isCollapsed() && !F) {
                    var a = b.selection.ranges(0),
                        c = a.startContainer,
                        d = a.startOffset;
                    c && c.nodeType == Node.TEXT_NODE && d <= c.textContent.length && d > 0 && 32 == c.textContent.charCodeAt(d - 1) && (b.selection.save(),
                        b.spaces.normalize(),
                        b.selection.restore())
                }
            }

            function j() {
                b.selection.isFull() && setTimeout(function() {
                        var c = b.html.defaultTag();
                        c ? b.$el.html("<" + c + ">" + $.FE.MARKERS + "<br/></" + c + ">") : b.$el.html($.FE.MARKERS + "<br/>"),
                            b.selection.restore(),
                            b.placeholder.refresh(),
                            b.button.bulkRefresh(),
                            b.undo.saveStep()
                    },
                    0)
            }

            function k(a) {
                if (b.opts.tabSpaces > 0)
                    if (b.selection.isCollapsed()) {
                        b.undo.saveStep(),
                            a.preventDefault(),
                            a.stopPropagation();
                        for (var c = "", d = 0; d < b.opts.tabSpaces; d++) c += "&nbsp;";
                        b.html.insert(c),
                            b.placeholder.refresh(),
                            b.undo.saveStep()
                    } else a.preventDefault(),
                        a.stopPropagation(),
                        a.shiftKey ? b.commands.outdent() : b.commands.indent()
            }

            function l() { F = !1 }

            function m() { F = !1 }

            function isIME() { return F }

            function o(i) {
                b.events.disableBlur();
                var j = i.which;
                if (16 === j) return !0;
                if (j === $.FE.KEYCODE.IME) return F = !0, !0;
                F = !1;
                var l = isCharacter(j) && !ctrlKey(i),
                    m = j == $.FE.KEYCODE.BACKSPACE || j == $.FE.KEYCODE.DELETE;
                if ((b.selection.isFull() && !b.opts.keepFormatOnDelete && !b.placeholder.isVisible() || m && b.placeholder.isVisible() && b.opts.keepFormatOnDelete) && (l || m)) {
                    var n = b.html.defaultTag();

                    if (n ? b.$el.html("<" + n + ">" + $.FE.MARKERS + "<br/></" + n + ">") : b.$el.html($.FE.MARKERS + "<br/>"),
                        b.selection.restore(), !isCharacter(j)) return i.preventDefault(), !0
                }
                j == $.FE.KEYCODE.ENTER ? i.shiftKey ? d(i) : c(i) : j === $.FE.KEYCODE.BACKSPACE && (i.metaKey || i.ctrlKey) ? e() : j != $.FE.KEYCODE.BACKSPACE || ctrlKey(i) || i.altKey ? j != $.FE.KEYCODE.DELETE || ctrlKey(i) || i.altKey || i.shiftKey ? j == $.FE.KEYCODE.SPACE ? h(i) : j == $.FE.KEYCODE.TAB ? k(i) : ctrlKey(i) || !isCharacter(i.which) || b.selection.isCollapsed() || i.ctrlKey || b.selection.remove() : b.placeholder.isVisible() ? (i.preventDefault(),
                        i.stopPropagation()) : g(i) : b.placeholder.isVisible() ? (i.preventDefault(),
                        i.stopPropagation()) : f(i),
                    b.events.enableBlur()
            }

            function p(a) {
                for (var c = b.doc.createTreeWalker(a, NodeFilter.SHOW_TEXT, b.node.filter(function(a) { return /\u200B/gi.test(a.textContent) }), !1); c.nextNode();) {
                    var d = c.currentNode;
                    d.textContent = d.textContent.replace(/\u200B/gi, "")
                }
            }

            function positionCaret() {
                if (!b.$wp) return !0;
                var c;
                b.opts.height || b.opts.heightMax ? (c = b.position.getBoundingRect().top, (b.helpers.isIOS() || b.helpers.isAndroid()) && (c -= b.helpers.scrollTop()),
                    b.opts.iframe && (c += b.$iframe.offset().top),
                    c > b.$wp.offset().top - b.helpers.scrollTop() + b.$wp.height() - 20 && b.$wp.scrollTop(c + b.$wp.scrollTop() - (b.$wp.height() + b.$wp.offset().top) + b.helpers.scrollTop() + 20)) : (c = b.position.getBoundingRect().top, b.opts.toolbarBottom && (c += b.opts.toolbarStickyOffset),
                    (b.helpers.isIOS() || b.helpers.isAndroid()) && (c -= b.helpers.scrollTop()),
                    b.opts.iframe && (c += b.$iframe.offset().top, c -= b.helpers.scrollTop()),
                    c += b.opts.toolbarStickyOffset, c > b.o_win.innerHeight - 20 && $(b.o_win).scrollTop(c + b.helpers.scrollTop() - b.o_win.innerHeight + 20),
                    c = b.position.getBoundingRect().top, b.opts.toolbarBottom || (c -= b.opts.toolbarStickyOffset),
                    (b.helpers.isIOS() || b.helpers.isAndroid()) && (c -= b.helpers.scrollTop()),
                    b.opts.iframe && (c += b.$iframe.offset().top, c -= b.helpers.scrollTop()),
                    c < b.$tb.height() + 20 && c >= 0 && $(b.o_win).scrollTop(c + b.helpers.scrollTop() - b.$tb.height() - 20))
            }

            function r() {
                var c = b.selection.element(),
                    d = b.node.blockParent(c);

                if (d && "DIV" == d.tagName && b.selection.info(d).atStart) {
                    var e = b.html.defaultTag();
                    d.previousSibling && "DIV" != d.previousSibling.tagName && e && "div" != e && (b.selection.save(),
                        $(d).replaceWith("<" + e + ">" + d.innerHTML + "</" + e + ">"),
                        b.selection.restore())
                }
            }

            function s(c) {
                if (b.helpers.isIOS() && c && G)
                    if (c.which == $.FE.KEYCODE.ENTER) b.snapshot.restore(G),
                        b.cursor.enter();
                    else
                if (c.which == $.FE.KEYCODE.BACKSPACE) {
                    var d = b.snapshot.get();
                    b.snapshot.restore(G),
                        b.cursor.backspace(),
                        b.el.innerHTML !== d.html && b.snapshot.restore(d)
                }

                if (b.helpers.isAndroid() && b.browser.mozilla) return !0;
                if (F) return !1;
                if (!b.selection.isCollapsed()) return !0;
                if (c && (c.which === $.FE.KEYCODE.META || c.which == $.FE.KEYCODE.CTRL)) return !0;
                if (c && isArrow(c.which)) return !0;
                c && c.which == $.FE.KEYCODE.ENTER && b.helpers.isIOS() && r(),
                    c && (c.which == $.FE.KEYCODE.ENTER || c.which == $.FE.KEYCODE.BACKSPACE || c.which >= 37 && c.which <= 40 && !b.browser.msie) && positionCaret(),
                    b.html.cleanBRs(!0, !0);
                var e = function(a) {
                        if (!a) return !1;
                        var b = a.innerHTML;
                        return !!((b = b.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(b) && b.replace(/\u200B/gi, "").length > 0)
                    },
                    f = function(a) { var c = /[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi; return !b.helpers.isIOS() || 0 === ((a.textContent || "").match(c) || []).length },
                    g = b.selection.element();
                e(g) && !b.node.hasClass(g, "fr-marker") && "IFRAME" != g.tagName && f(g) && (b.selection.save(),
                    p(g),
                    b.selection.restore())
            }

            function ctrlKey(a) {
                if (-1 != navigator.userAgent.indexOf("Mac OS X")) {
                    if (a.metaKey && !a.altKey) return !0
                } else
                if (a.ctrlKey && !a.altKey) return !0;
                return !1
            }

            function isArrow(b) {
                if (b >= $.FE.KEYCODE.ARROW_LEFT && b <= $.FE.KEYCODE.ARROW_DOWN) return !0
            }

            function isCharacter(c) {
                if (c >= $.FE.KEYCODE.ZERO && c <= $.FE.KEYCODE.NINE) return !0;
                if (c >= $.FE.KEYCODE.NUM_ZERO && c <= $.FE.KEYCODE.NUM_MULTIPLY) return !0;
                if (c >= $.FE.KEYCODE.A && c <= $.FE.KEYCODE.Z) return !0;
                if (b.browser.webkit && 0 === c) return !0;
                switch (c) {
                    case $.FE.KEYCODE.SPACE:
                    case $.FE.KEYCODE.QUESTION_MARK:
                    case $.FE.KEYCODE.NUM_PLUS:
                    case $.FE.KEYCODE.NUM_MINUS:
                    case $.FE.KEYCODE.NUM_PERIOD:
                    case $.FE.KEYCODE.NUM_DIVISION:
                    case $.FE.KEYCODE.SEMICOLON:
                    case $.FE.KEYCODE.FF_SEMICOLON:
                    case $.FE.KEYCODE.DASH:
                    case $.FE.KEYCODE.EQUALS:
                    case $.FE.KEYCODE.FF_EQUALS:
                    case $.FE.KEYCODE.COMMA:
                    case $.FE.KEYCODE.PERIOD:
                    case $.FE.KEYCODE.SLASH:
                    case $.FE.KEYCODE.APOSTROPHE:
                    case $.FE.KEYCODE.SINGLE_QUOTE:
                    case $.FE.KEYCODE.OPEN_SQUARE_BRACKET:
                    case $.FE.KEYCODE.BACKSLASH:
                    case $.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
                        return !0;
                    default:
                        return !1
                }
            }

            function w(c) {
                var d = c.which;
                if (ctrlKey(c) || d >= 37 && d <= 40 || !isCharacter(d) && d != $.FE.KEYCODE.DELETE && d != $.FE.KEYCODE.BACKSPACE && d != $.FE.KEYCODE.ENTER && d != $.FE.KEYCODE.IME) return !0;
                D || (E = b.snapshot.get(),
                        b.undo.canDo() || b.undo.saveStep()),
                    clearTimeout(D),
                    D = setTimeout(function() { D = null, b.undo.saveStep() },
                        Math.max(250, b.opts.typingTimer))
            }

            function x(a) {
                var c = a.which;
                if (ctrlKey(a) || c >= 37 && c <= 40) return !0;
                E && D ? (b.undo.saveStep(E),
                    E = null) : void 0 !== c && 0 !== c || E || D || b.undo.saveStep()
            }

            function forceUndo() {
                D && (clearTimeout(D),
                    b.undo.saveStep(),
                    E = null)
            }

            function isBrowserAction(b) { var c = b.which; return ctrlKey(b) || c == $.FE.KEYCODE.F5 }

            function A(a) { return (!a || "BR" != a.tagName) && (0 === (a.textContent || "").length && a.querySelector && !a.querySelector(":scope > br")) }

            function B(c) {
                var d = b.el.childNodes,
                    e = b.html.defaultTag();
                return !(!c.target || c.target === b.el) || (0 === d.length || void(b.$el.outerHeight() - c.offsetY <= 10 ? A(d[d.length - 1]) && (e ? b.$el.append("<" + e + ">" + $.FE.MARKERS + "<br></" + e + ">") : b.$el.append($.FE.MARKERS + "<br>"),
                    b.selection.restore(),
                    positionCaret()) : c.offsetY <= 10 && A(d[0]) && (e ? b.$el.prepend("<" + e + ">" + $.FE.MARKERS + "<br></" + e + ">") : b.$el.prepend($.FE.MARKERS + "<br>"),
                    b.selection.restore(),
                    positionCaret())))
            }

            function _init() {
                if (b.events.on("keydown", w),
                    b.events.on("input", i),
                    b.events.on("mousedown", m),
                    b.events.on("keyup input", x),
                    b.events.on("keypress", l),
                    b.events.on("keydown", o),
                    b.events.on("keyup", s),
                    b.events.on("html.inserted", s),
                    b.events.on("cut", j),
                    b.events.on("click", B), !b.browser.edge && b.el.msGetInputContext) try {
                    b.el.msGetInputContext().addEventListener("MSCandidateWindowShow", function() { F = !0 }),
                        b.el.msGetInputContext().addEventListener("MSCandidateWindowHide", function() { F = !1, s() })
                }
                catch (a) {}
            }
            var D, E, F = !1,
                G = null;
            return {
                _init: _init,
                ctrlKey: ctrlKey,
                isCharacter: isCharacter,
                isArrow: isArrow,
                forceUndo: forceUndo,
                isIME: isIME,
                isBrowserAction: isBrowserAction,
                positionCaret: positionCaret
            }
        },
        $.FE.MODULES.accessibility = function(b) {
            function focusToolbarElement(a) {
                if (a && a.length) {
                    a.data("blur-event-set") || a.parents(".fr-popup").length || (b.events.$on(a, "blur", function() {
                            var c = a.parents(".fr-toolbar, .fr-popup").data("instance") || b;
                            c.events.blurActive() && c.events.trigger("blur"),
                                c.events.enableBlur()
                        }, !0),
                        a.data("blur-event-set", !0));
                    (a.parents(".fr-toolbar, .fr-popup").data("instance") || b).events.disableBlur(),
                        a.focus(),
                        b.shared.$f_el = a
                }
            }

            function focusToolbar(a, b) {
                var d = b ? "last" : "first",
                    e = a.find("button:visible:not(.fr-disabled),.fr-group span.fr-command:visible")[d]();

                if (e.length) return focusToolbarElement(e), !0
            }

            function e(a) {
                return a.is("input, textarea") && saveSelectin(),
                    b.events.disableBlur(),
                    a.focus(), !0
            }

            function focusContent(a, c) {
                var d = a.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(c ? ":last" : ":first");

                if (d.length) return e(d);

                if (b.shared.with_kb) {
                    var f = a.find(".fr-active-item:visible:first");

                    if (f.length) return e(f);
                    var g = a.find("[tabIndex]:visible:first");

                    if (g.length) return e(g)
                }
            }

            function saveSelectin() { 0 === b.$el.find(".fr-marker").length && b.core.hasFocus() && b.selection.save() }

            function restoreSelection(a) {
                a.$el.find(".fr-marker").length && (a.events.disableBlur(),
                    a.selection.restore(),
                    a.events.enableBlur())
            }

            function focusPopup(a) {
                var c = a.children().not(".fr-buttons");
                c.data("mouseenter-event-set") || (b.events.$on(c, "mouseenter", "[tabIndex]", function(d) {
                        var e = a.data("instance") || b;
                        if (!F) return d.stopPropagation(),
                            void d.preventDefault();
                        var f = c.find(":focus:first");
                        f.length && !f.is("input, button, textarea") && (e.events.disableBlur(),
                            f.blur(),
                            e.events.disableBlur(),
                            e.events.focus())
                    }),
                    c.data("mouseenter-event-set", !0)), !focusContent(c) && b.shared.with_kb && focusToolbar(a.find(".fr-buttons"))
            }

            function focusModal(a) {
                b.core.hasFocus() || (b.events.disableBlur(),
                        b.events.focus()),
                    b.accessibility.saveSelection(),
                    b.events.disableBlur(),
                    b.$el.blur(),
                    b.selection.clear(),
                    b.events.disableBlur(),
                    b.shared.with_kb ? a.find(".fr-command[tabIndex], [tabIndex]").first().focus() : a.find("[tabIndex]:first").focus()
            }

            function k() {
                var a = b.popups.areVisible();

                if (a) {
                    var c = a.find(".fr-buttons");
                    return c.find("button:focus, .fr-group span:focus").length ? !focusToolbar(a.data("instance").$tb) : !focusToolbar(c)
                }
                return !focusToolbar(b.$tb)
            }

            function l() {
                var a = null;
                return b.shared.$f_el.is(".fr-dropdown.fr-active") ? a = b.shared.$f_el : b.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (a = b.shared.$f_el.closest(".fr-dropdown-menu").prev()),
                    a
            }

            function m(e, g, h) {
                if (b.shared.$f_el) {
                    var i = l();
                    i && (b.button.click(i),
                        b.shared.$f_el = i);
                    var j = e.find("button:visible:not(.fr-disabled),.fr-group span.fr-command:visible"),
                        k = j.index(b.shared.$f_el);

                    if (0 === k && !h || k == j.length - 1 && h) {
                        var m;
                        if (g) {
                            if (e.parent().is(".fr-popup")) {
                                m = !focusContent(e.parent().children().not(".fr-buttons"), !h)
                            }!1 === m && (b.shared.$f_el = null)
                        }
                        g && !1 === m || focusToolbar(e, !h)
                    } else focusToolbarElement($(j.get(k + (h ? 1 : -1))));
                    return !1
                }
            }

            function n(a, b) { return m(a, b, !0) }

            function o(a, b) { return m(a, b) }

            function p(a) {
                if (b.shared.$f_el) {
                    var d;
                    if (b.shared.$f_el.is(".fr-dropdown.fr-active")) return d = a ? b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last(),
                        focusToolbarElement(d), !1;
                    if (b.shared.$f_el.is("a.fr-command")) return d = a ? b.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first(),
                        d.length || (d = a ? b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()),
                        focusToolbarElement(d), !1
                }
            }

            function q() { return b.shared.$f_el && b.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? s() : p(!0) }

            function r() { return p() }

            function s() {
                if (b.shared.$f_el) {
                    if (b.shared.$f_el.hasClass("fr-dropdown")) b.button.click(b.shared.$f_el);
                    else
                    if (b.shared.$f_el.is("button.fr-back")) {
                        b.opts.toolbarInline && (b.events.disableBlur(),
                            b.events.focus());
                        var a = b.popups.areVisible(b);
                        a && (b.shared.with_kb = !1),
                            b.button.click(b.shared.$f_el),
                            focusPopupButton(a)
                    } else {
                        if (b.events.disableBlur(),
                            b.button.click(b.shared.$f_el),
                            b.shared.$f_el.attr("data-popup")) {
                            var c = b.popups.areVisible(b);
                            c && c.data("popup-button", b.shared.$f_el)
                        } else
                        if (b.shared.$f_el.attr("data-modal")) {
                            var d = b.modals.areVisible(b);
                            d && d.data("modal-button", b.shared.$f_el)
                        }
                        b.shared.$f_el = null
                    }
                    return !1
                }
            }

            function focusEditor() {
                b.shared.$f_el && (b.events.disableBlur(),
                    b.shared.$f_el.blur(),
                    b.shared.$f_el = null), !1 !== b.events.trigger("toolbar.focusEditor") && (b.events.disableBlur(),
                    b.events.focus())
            }

            function u(a) {
                if (b.shared.$f_el) {
                    var d = l();
                    return d ? (b.button.click(d),
                        focusToolbarElement(d)) : a.parent().find(".fr-back:visible").length ? (b.shared.with_kb = !1, b.opts.toolbarInline && (b.events.disableBlur(),
                            b.events.focus()),
                        b.button.exec(a.parent().find(".fr-back:visible:first")),
                        focusPopupButton(a.parent())) : b.shared.$f_el.is("button, .fr-group span") && (a.parent().is(".fr-popup") ? (restoreSelection(b),
                        b.shared.$f_el = null, !1 !== b.events.trigger("toolbar.esc") && (b.popups.hide(a.parent()),
                            b.opts.toolbarInline && b.toolbar.showInline(null, !0),
                            focusPopupButton(a.parent()))) : focusEditor()), !1
                }
            }

            function exec(c, d) {
                var e = -1 != navigator.userAgent.indexOf("Mac OS X") ? c.metaKey : c.ctrlKey,
                    f = c.which,
                    g = !1;
                return f != $.FE.KEYCODE.TAB || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ARROW_RIGHT || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.TAB || e || !c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ARROW_LEFT || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ARROW_UP || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ARROW_DOWN || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ENTER || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.ESC || e || c.shiftKey || c.altKey ? f != $.FE.KEYCODE.F10 || e || c.shiftKey || !c.altKey || (g = k()) : g = u(d) : g = s() : g = q() : g = r() : g = o(d) : g = o(d, !0) : g = n(d) : g = n(d, !0),
                    b.shared.$f_el || void 0 !== g || (g = !0), !g && b.keys.isBrowserAction(c) && (g = !0), !!g || (c.preventDefault(),
                        c.stopPropagation(), !1)
            }

            function registerToolbar(c) {
                c && c.length && (b.events.$on(c, "keydown", function(d) {
                        if (!$(d.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                        var e = c.parents(".fr-popup").data("instance") || c.data("instance") || b;
                        b.shared.with_kb = !0;
                        var f = e.accessibility.exec(d, c);
                        return b.shared.with_kb = !1, f
                    }, !0),
                    b.events.$on(c, "mouseenter", "[tabIndex]", function(d) {
                        var e = c.parents(".fr-popup").data("instance") || c.data("instance") || b;
                        if (!F) return d.stopPropagation(),
                            void d.preventDefault();
                        var f = $(d.currentTarget);
                        e.shared.$f_el && e.shared.$f_el.not(f) && e.accessibility.focusEditor()
                    }, !0))
            }

            function registerPopup(a) {
                var c = b.popups.get(a),
                    d = y(a);
                registerToolbar(c.find(".fr-buttons")),
                    b.events.$on(c, "mouseenter", "tabIndex", d._tiMouseenter, !0),
                    b.events.$on(c.children().not(".fr-buttons"),
                        "keydown", "[tabIndex]", d._tiKeydown, !0),
                    b.popups.onHide(a, function() { restoreSelection(c.data("instance") || b) }),
                    b.popups.onShow(a, function() {
                        F = !1, setTimeout(function() { F = !0 },
                            0)
                    })
            }

            function y(c) {
                var e = b.popups.get(c);
                return {
                    _tiKeydown: function(g) {
                        var i = e.data("instance") || b;
                        if (!1 === i.events.trigger("popup.tab", [g])) return !1;
                        var j = g.which,
                            k = e.find(":focus:first");

                        if ($.FE.KEYCODE.TAB == j) {
                            g.preventDefault();
                            var l = e.children().not(".fr-buttons"),
                                m = l.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                n = m.indexOf(this) + (g.shiftKey ? -1 : 1);

                            if (0 <= n && n < m.length) return i.events.disableBlur(),
                                $(m[n]).focus(),
                                g.stopPropagation(), !1;
                            var o = e.find(".fr-buttons");

                            if (o.length && focusToolbar(o, !!g.shiftKey)) return g.stopPropagation(), !1;
                            if (focusContent(l)) return g.stopPropagation(), !1
                        } else {
                            if ($.FE.KEYCODE.ENTER != j) return $.FE.KEYCODE.ESC == j ? (g.preventDefault(),
                                g.stopPropagation(),
                                restoreSelection(i),
                                i.popups.isVisible(c) && e.find(".fr-back:visible").length ? (i.opts.toolbarInline && (i.events.disableBlur(),
                                        i.events.focus()),
                                    i.button.exec(e.find(".fr-back:visible:first")),
                                    focusPopupButton(e)) : i.popups.isVisible(c) && e.find(".fr-dismiss:visible").length ? i.button.exec(e.find(".fr-dismiss:visible:first")) : (i.popups.hide(c),
                                    i.opts.toolbarInline && i.toolbar.showInline(null, !0),
                                    focusPopupButton(e)), !1) : $.FE.KEYCODE.SPACE == j && (k.is(".fr-submit") || k.is(".fr-dismiss")) ? (g.preventDefault(),
                                g.stopPropagation(),
                                i.events.disableBlur(),
                                i.button.exec(k), !0) : i.keys.isBrowserAction(g) ? void g.stopPropagation() : k.is("input[type=text], textarea") ? void g.stopPropagation() : $.FE.KEYCODE.SPACE == j && (k.is(".fr-link-attr") || k.is("input[type=file]")) ? void g.stopPropagation() : (g.stopPropagation(),
                                g.preventDefault(), !1);
                            var p = null;
                            e.find(".fr-submit:visible").length > 0 ? p = e.find(".fr-submit:visible:first") : e.find(".fr-dismiss:visible").length && (p = e.find(".fr-dismiss:visible:first")),
                                p && (g.preventDefault(),
                                    g.stopPropagation(),
                                    i.events.disableBlur(),
                                    i.button.exec(p))
                        }
                    },
                    _tiMouseenter: function() { C(e.data("instance") || b) }
                }
            }

            function focusPopupButton(a) {
                var b = a.data("popup-button");
                b && setTimeout(function() {
                        focusToolbarElement(b),
                            a.data("popup-button", null)
                    },
                    0)
            }

            function focusModalButton(a) {
                var b = a.data("modal-button");
                b && setTimeout(function() {
                        focusToolbarElement(b),
                            a.data("modal-button", null)
                    },
                    0)
            }

            function hasFocus() { return null != b.shared.$f_el }

            function C(a) {
                var c = b.popups.areVisible(a);
                c && c.data("popup-button", null)
            }

            function D(c) {
                var d = -1 != navigator.userAgent.indexOf("Mac OS X") ? c.metaKey : c.ctrlKey;
                if (c.which == $.FE.KEYCODE.F10 && !d && !c.shiftKey && c.altKey) {
                    b.shared.with_kb = !0;
                    var e = b.popups.areVisible(b),
                        g = !1;
                    return e && (g = focusContent(e.children().not(".fr-buttons"))),
                        g || k(),
                        b.shared.with_kb = !1, c.preventDefault(),
                        c.stopPropagation(), !1
                }
                return !0
            }

            function _init() {
                b.$wp ? b.events.on("keydown", D, !0) : b.events.$on(b.$win, "keydown", D, !0),
                    b.events.on("mousedown", function(a) {
                        C(b),
                            b.shared.$f_el && (restoreSelection(b),
                                a.stopPropagation(),
                                b.events.disableBlur(),
                                b.shared.$f_el = null)
                    }, !0),
                    b.events.on("blur", function() { b.shared.$f_el = null, C(b) }, !0)
            }
            var F = !0;
            return {
                _init: _init,
                registerPopup: registerPopup,
                registerToolbar: registerToolbar,
                focusToolbarElement: focusToolbarElement,
                focusToolbar: focusToolbar,
                focusContent: focusContent,
                focusPopup: focusPopup,
                focusModal: focusModal,
                focusEditor: focusEditor,
                focusPopupButton: focusPopupButton,
                focusModalButton: focusModalButton,
                hasFocus: hasFocus,
                exec: exec,
                saveSelection: saveSelectin,
                restoreSelection: restoreSelection
            }
        },
        $.FE.MODULES.format = function(b) {
            function c(a, b) {
                var c = "<" + a;
                for (var d in b) b.hasOwnProperty(d) && (c += " " + d + '="' + b[d] + '"');
                return c += ">"
            }

            function d(a) { return "</" + a + ">" }

            function e(a, b) {
                var c = a;
                for (var d in b) b.hasOwnProperty(d) && (c += "id" == d ? "#" + b[d] : "class" == d ? "." + b[d] : "[" + d + '="' + b[d] + '"]');
                return c
            }

            function f(a, b) { return !(!a || a.nodeType != Node.ELEMENT_NODE) && (a.matches || a.matchesSelector || a.msMatchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.oMatchesSelector).call(a, b) }

            function g(d, e, f) {
                if (d) {
                    if (b.node.isBlock(d)) return g(d.firstChild, e, f), !1;
                    for (var h = $(c(e, f)).insertBefore(d),
                            i = d; i && !$(i).is(".fr-marker") && 0 === $(i).find(".fr-marker").length && "UL" != i.tagName && "OL" != i.tagName;) {
                        var j = i;
                        i = i.nextSibling, h.append(j)
                    }

                    if (i)($(i).find(".fr-marker").length || "UL" == i.tagName || "OL" == i.tagName) && g(i.firstChild, e, f);
                    else {
                        for (var k = h.get(0).parentNode; k && !k.nextSibling && !b.node.isElement(k);) k = k.parentNode;
                        if (k) {
                            var l = k.nextSibling;
                            l && (b.node.isBlock(l) ? g(l.firstChild, e, f) : g(l, e, f))
                        }
                    }
                    h.is(":empty") && h.remove()
                }
            }

            function apply(h, i) {
                var j;
                if (void 0 === i && (i = {}),
                    i.style && delete i.style, b.selection.isCollapsed()) {
                    b.markers.insert();
                    b.$el.find(".fr-marker").replaceWith(c(h, i) + $.FE.INVISIBLE_SPACE + $.FE.MARKERS + d(h)),
                        b.selection.restore()
                } else {
                    b.selection.save();
                    g(b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, h, i);
                    var k;
                    do {
                        for (k = b.$el.find(e(h, i) + " > " + e(h, i)),
                            j = 0; j < k.length; j++) k[j].outerHTML = k[j].innerHTML
                    }
                    while (k.length);
                    b.el.normalize();
                    var l = b.el.querySelectorAll(".fr-marker");
                    for (j = 0; j < l.length; j++) {
                        var m = $(l[j]);
                        !0 === m.data("type") ? f(m.get(0).nextSibling, e(h, i)) && m.next().prepend(m) : f(m.get(0).previousSibling, e(h, i)) && m.prev().append(m)
                    }
                    b.selection.restore()
                }
            }

            function i(a, c, d, g) {
                if (!g) {
                    var h = !1;
                    if (!0 === a.data("type"))
                        for (; b.node.isFirstSibling(a.get(0)) && !a.parent().is(b.$el) && !a.parent().is("ol") && !a.parent().is("ul");) a.parent().before(a),
                            h = !0;
                    else
                    if (!1 === a.data("type"))
                        for (; b.node.isLastSibling(a.get(0)) && !a.parent().is(b.$el) && !a.parent().is("ol") && !a.parent().is("ul");) a.parent().after(a),
                            h = !0;
                    if (h) return !0
                }

                if (a.parents(c).length || void 0 === c) {
                    var i = "",
                        j = "",
                        k = a.parent();

                    if (k.is(b.$el) || b.node.isBlock(k.get(0))) return !1;
                    for (; !b.node.isBlock(k.parent().get(0)) && (void 0 === c || void 0 !== c && !f(k.get(0),
                            e(c, d)));) i += b.node.closeTagString(k.get(0)),
                        j = b.node.openTagString(k.get(0)) + j, k = k.parent();
                    var l = a.get(0).outerHTML;
                    a.replaceWith('<span id="mark"></span>');
                    var m = k.html().replace(/<span id="mark"><\/span>/, i + b.node.closeTagString(k.get(0)) + j + l + i + b.node.openTagString(k.get(0)) + j);
                    return k.replaceWith(b.node.openTagString(k.get(0)) + m + b.node.closeTagString(k.get(0))), !0
                }
                return !1
            }

            function j(c, d, g, h) {
                for (var i = b.node.contents(c.get(0)),
                        k = 0; k < i.length; k++) {
                    var l = i[k];
                    if (b.node.hasClass(l, "fr-marker")) d = (d + 1) % 2;
                    else
                    if (d)
                        if ($(l).find(".fr-marker").length > 0) d = j($(l),
                            d, g, h);
                        else {
                            for (var m = $(l).find(g || "*"),
                                    n = m.length - 1; n >= 0; n--) {
                                var o = m[n];
                                b.node.isBlock(o) || b.node.isVoid(o) || void 0 !== g && !f(o, e(g, h)) || (o.outerHTML = o.innerHTML)
                            }
                            void 0 === g && l.nodeType == Node.ELEMENT_NODE && !b.node.isVoid(l) && !b.node.isBlock(l) || f(l, e(g, h)) ? $(l).replaceWith(l.innerHTML) : void 0 === g && l.nodeType == Node.ELEMENT_NODE && b.node.isBlock(l) && b.node.clearAttributes(l)
                        }
                    else $(l).find(".fr-marker").length > 0 && (d = j($(l),
                        d, g, h))
                }
                return d
            }

            function remove(c, d) {
                void 0 === d && (d = {}),
                    d.style && delete d.style;
                var e = b.selection.isCollapsed();
                b.selection.save();
                for (var f = !0; f;) {
                    f = !1;
                    for (var g = b.$el.find(".fr-marker"),
                            h = 0; h < g.length; h++) {
                        var k = $(g[h]),
                            l = null;
                        if (k.attr("data-cloned") || e || (l = k.clone().removeClass("fr-marker").addClass("fr-clone"), !0 === k.data("type") ? k.attr("data-cloned", !0).after(l) : k.attr("data-cloned", !0).before(l)),
                            i(k, c, d, e)) { f = !0; break }
                    }
                }
                j(b.$el, 0, c, d),
                    e || (b.$el.find(".fr-marker").remove(),
                        b.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")),
                    e && b.$el.find(".fr-marker").before($.FE.INVISIBLE_SPACE).after($.FE.INVISIBLE_SPACE),
                    b.html.cleanEmptyTags(),
                    b.el.normalize(),
                    b.selection.restore()
            }

            function toggle(a, b) { is(a, b) ? remove(a, b) : apply(a, b) }

            function m(b, c) {
                var d = $(b);
                d.css(c, ""),
                    "" === d.attr("style") && d.replaceWith(d.html())
            }

            function n(b, c) { return 0 === $(b).attr("style").indexOf(c + ":") || $(b).attr("style").indexOf(";" + c + ":") >= 0 || $(b).attr("style").indexOf("; " + c + ":") >= 0 }

            function applyStyle(c, d) {
                var e, f;
                if (b.selection.isCollapsed()) {
                    b.markers.insert(),
                        f = b.$el.find(".fr-marker");
                    var h = f.parent();

                    if (b.node.openTagString(h.get(0)) == '<span style="' + c + ": " + h.css(c) + ';">') {
                        if (b.node.isEmpty(h.get(0))) h.replaceWith('<span style="' + c + ": " + d + ';">' + $.FE.INVISIBLE_SPACE + $.FE.MARKERS + "</span>");
                        else {
                            var j = {};
                            j[c] = d, i(f, "span", j, !0),
                                f = b.$el.find(".fr-marker"),
                                f.replaceWith('<span style="' + c + ": " + d + ';">' + $.FE.INVISIBLE_SPACE + $.FE.MARKERS + "</span>")
                        }
                        b.html.cleanEmptyTags()
                    } else b.node.isEmpty(h.get(0)) && h.is("span") ? (f.replaceWith($.FE.MARKERS),
                        h.css(c, d)) : f.replaceWith('<span style="' + c + ": " + d + ';">' + $.FE.INVISIBLE_SPACE + $.FE.MARKERS + "</span>");
                    b.selection.restore()
                } else {
                    if (b.selection.save(),
                        null == d || "color" == c && b.$el.find(".fr-marker").parents("u, a").length > 0) {
                        var k = b.$el.find(".fr-marker");
                        for (e = 0; e < k.length; e++)
                            if (f = $(k[e]), !0 === f.data("type"))
                                for (; b.node.isFirstSibling(f.get(0)) && !f.parent().is(b.$el) && !b.node.isElement(f.parent().get(0)) && !b.node.isBlock(f.parent().get(0));) f.parent().before(f);
                            else
                                for (; b.node.isLastSibling(f.get(0)) && !f.parent().is(b.$el) && !b.node.isElement(f.parent().get(0)) && !b.node.isBlock(f.parent().get(0));) f.parent().after(f)
                    }
                    var l = b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling,
                        o = { class: "fr-unprocessed" };
                    for (d && (o.style = c + ": " + d + ";"),
                        g(l, "span", o),
                        b.$el.find(".fr-marker + .fr-unprocessed").each(function() { $(this).prepend($(this).prev()) }),
                        b.$el.find(".fr-unprocessed + .fr-marker").each(function() { $(this).prev().append(this) }),
                        (d || "").match(/\dem$/) && b.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); b.$el.find("span.fr-unprocessed").length > 0;) {
                        var p = b.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed");

                        if (p.parent().get(0).normalize(),
                            p.parent().is("span") && 1 == p.parent().get(0).childNodes.length) {
                            p.parent().css(c, d);
                            var q = p;
                            p = p.parent(),
                                q.replaceWith(q.html())
                        }
                        var r = p.find("span");
                        for (e = r.length - 1; e >= 0; e--) m(r[e], c);
                        var s = p.parentsUntil(b.$el, "span[style]"),
                            t = [];
                        for (e = s.length - 1; e >= 0; e--) n(s[e], c) || t.push(s[e]);

                        if (s = s.not(t),
                            s.length) {
                            var u = "",
                                v = "",
                                w = "",
                                x = "",
                                y = p.get(0);
                            do {
                                y = y.parentNode, $(y).addClass("fr-split"),
                                    u += b.node.closeTagString(y),
                                    v = b.node.openTagString($(y).clone().addClass("fr-split").get(0)) + v, s.get(0) != y && (w += b.node.closeTagString(y),
                                        x = b.node.openTagString($(y).clone().addClass("fr-split").get(0)) + x)
                            }
                            while (s.get(0) != y);
                            var z = u + b.node.openTagString($(s.get(0)).clone().css(c, d || "").get(0)) + x + p.css(c, "").get(0).outerHTML + w + "</span>" + v;
                            p.replaceWith('<span id="fr-break"></span>');
                            var A = s.get(0).outerHTML;
                            $(s.get(0)).replaceWith(A.replace(/<span id="fr-break"><\/span>/g, z))
                        }
                    }
                    for (; b.$el.find(".fr-split:empty").length > 0;) b.$el.find(".fr-split:empty").remove();
                    b.$el.find(".fr-split").removeClass("fr-split"),
                        b.$el.find('span[style=""]').removeAttr("style"),
                        b.$el.find('span[class=""]').removeAttr("class"),
                        b.html.cleanEmptyTags(),
                        $(b.$el.find("span").get().reverse()).each(function() { this.attributes && 0 !== this.attributes.length || $(this).replaceWith(this.innerHTML) }),
                        b.el.normalize();
                    var B = b.$el.find("span[style] + span[style]");
                    for (e = 0; e < B.length; e++) {
                        var C = $(B[e]),
                            D = $(B[e]).prev();
                        C.get(0).previousSibling == D.get(0) && b.node.openTagString(C.get(0)) == b.node.openTagString(D.get(0)) && (C.prepend(D.html()),
                            D.remove())
                    }
                    b.$el.find("span[style] span[style]").each(function() {
                            if ($(this).attr("style").indexOf("font-size") >= 0) {
                                var b = $(this).parents("span[style]");
                                b.attr("style").indexOf("background-color") >= 0 && ($(this).attr("style", $(this).attr("style") + ";" + b.attr("style")),
                                    i($(this),
                                        "span[style]", {}, !1))
                            }
                        }),
                        b.el.normalize(),
                        b.selection.restore()
                }
            }

            function removeStyle(a) { applyStyle(a, null) }

            function is(a, c) {
                void 0 === c && (c = {}),
                    c.style && delete c.style;
                var d = b.selection.ranges(0),
                    g = d.startContainer;
                if (g.nodeType == Node.ELEMENT_NODE && g.childNodes.length > 0 && g.childNodes[d.startOffset] && (g = g.childNodes[d.startOffset]),

                    !d.collapsed && g.nodeType == Node.TEXT_NODE && d.startOffset == (g.textContent || "").length) {
                    for (; !b.node.isBlock(g.parentNode) && !g.nextSibling;) g = g.parentNode;
                    g.nextSibling && (g = g.nextSibling)
                }
                for (var h = g; h && h.nodeType == Node.ELEMENT_NODE && !f(h, e(a, c));) h = h.firstChild;
                if (h && h.nodeType == Node.ELEMENT_NODE && f(h, e(a, c))) return !0;
                var i = g;
                for (i && i.nodeType != Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType == Node.ELEMENT_NODE && i != b.el && !f(i, e(a, c));) i = i.parentNode;
                return !(!i || i.nodeType != Node.ELEMENT_NODE || i == b.el || !f(i, e(a, c)))
            }
            return {
                is: is,
                toggle: toggle,
                apply: apply,
                remove: remove,
                applyStyle: applyStyle,
                removeStyle: removeStyle
            }
        },
        $.extend($.FE.DEFAULTS, { indentMargin: 20 }),
        $.FE.COMMANDS = {
            bold: {
                title: "Bold",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("strong");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            italic: {
                title: "Italic",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("em");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            underline: {
                title: "Underline",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("u");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            strikeThrough: {
                title: "Strikethrough",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("s");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            subscript: {
                title: "Subscript",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("sub");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            superscript: {
                title: "Superscript",
                toggle: !0,
                refresh: function(a) {
                    var b = this.format.is("sup");
                    a.toggleClass("fr-active", b).attr("aria-pressed", b)
                }
            },
            outdent: { title: "Decrease Indent" },
            indent: { title: "Increase Indent" },
            undo: { title: "Undo", undo: !1, forcedRefresh: !0, disabled: !0 },
            redo: { title: "Redo", undo: !1, forcedRefresh: !0, disabled: !0 },
            insertHR: { title: "Insert Horizontal Line" },
            clearFormatting: { title: "Clear Formatting" },
            selectAll: { title: "Select All", undo: !1 }
        },
        $.FE.RegisterCommand = function(b, c) { $.FE.COMMANDS[b] = c },
        $.FE.MODULES.commands = function(b) {
            function c(a) {
                return b.html.defaultTag() && (a = "<" + b.html.defaultTag() + ">" + a + "</" + b.html.defaultTag() + ">"),
                    a
            }

            function d(c, d) {
                if (!1 !== b.events.trigger("commands.before", $.merge([c], d || []))) {
                    var e = $.FE.COMMANDS[c] && $.FE.COMMANDS[c].callback || i[c],
                        f = !0,
                        g = !1;
                    $.FE.COMMANDS[c] && (void 0 !== $.FE.COMMANDS[c].focus && (f = $.FE.COMMANDS[c].focus),
                            void 0 !== $.FE.COMMANDS[c].accessibilityFocus && (g = $.FE.COMMANDS[c].accessibilityFocus)),
                        (!b.core.hasFocus() && f && !b.popups.areVisible() || !b.core.hasFocus() && g && b.accessibility.hasFocus()) && b.events.focus(!0),
                        $.FE.COMMANDS[c] && !1 !== $.FE.COMMANDS[c].undo && (b.$el.find(".fr-marker").length && (b.events.disableBlur(),
                                b.selection.restore()),
                            b.undo.saveStep()),
                        e && e.apply(b, $.merge([c], d || [])),
                        b.events.trigger("commands.after", $.merge([c], d || [])),
                        $.FE.COMMANDS[c] && !1 !== $.FE.COMMANDS[c].undo && b.undo.saveStep()
                }
            }

            function e(a, c) { b.format.toggle(c) }

            function f(c) {
                b.selection.save(),
                    b.html.wrap(!0, !0, !0, !0),
                    b.selection.restore();
                for (var d = b.selection.blocks(),
                        e = 0; e < d.length; e++)
                    if ("LI" != d[e].tagName && "LI" != d[e].parentNode.tagName) {
                        var f = $(d[e]),
                            g = "rtl" == b.opts.direction || "rtl" == f.css("direction") ? "margin-right" : "margin-left",
                            h = b.helpers.getPX(f.css(g));
                        f.css(g, Math.max(h + c * b.opts.indentMargin, 0) || ""),
                            f.removeClass("fr-temp-div")
                    }
                b.selection.save(),
                    b.html.unwrap(),
                    b.selection.restore()
            }

            function g(a) { return function() { d(a) } }

            function h() {
                b.events.on("keydown", function(a) {
                        var c = b.selection.element();

                        if (c && "HR" == c.tagName && !b.keys.isArrow(a.which)) return a.preventDefault(), !1
                    }),
                    b.events.on("keyup", function(c) {
                        var d = b.selection.element();

                        if (d && "HR" == d.tagName)
                            if (c.which == $.FE.KEYCODE.ARROW_LEFT || c.which == $.FE.KEYCODE.ARROW_UP) {
                                if (d.previousSibling) return b.node.isBlock(d.previousSibling) ? b.selection.setAtEnd(d.previousSibling) : $(d).before($.FE.MARKERS),
                                    b.selection.restore(), !1
                            } else
                        if ((c.which == $.FE.KEYCODE.ARROW_RIGHT || c.which == $.FE.KEYCODE.ARROW_DOWN) && d.nextSibling) return b.node.isBlock(d.nextSibling) ? b.selection.setAtStart(d.nextSibling) : $(d).after($.FE.MARKERS),
                            b.selection.restore(), !1
                    }),
                    b.events.on("mousedown", function(a) {
                        if (a.target && "HR" == a.target.tagName) return a.preventDefault(),
                            a.stopPropagation(), !1
                    }),
                    b.events.on("mouseup", function() {
                        var c = b.selection.element();
                        c == b.selection.endElement() && c && "HR" == c.tagName && (c.nextSibling && (b.node.isBlock(c.nextSibling) ? b.selection.setAtStart(c.nextSibling) : $(c).after($.FE.MARKERS)),
                            b.selection.restore())
                    })
            }
            var i = {
                    bold: function() { e("bold", "strong") },
                    subscript: function() {
                        b.format.is("sup") && b.format.remove("sup"),
                            e("subscript", "sub")
                    },
                    superscript: function() {
                        b.format.is("sub") && b.format.remove("sub"),
                            e("superscript", "sup")
                    },
                    italic: function() { e("italic", "em") },
                    strikeThrough: function() { e("strikeThrough", "s") },
                    underline: function() { e("underline", "u") },
                    undo: function() { b.undo.run() },
                    redo: function() { b.undo.redo() },
                    indent: function() { f(1) },
                    outdent: function() { f(-1) },
                    show: function() { b.opts.toolbarInline && b.toolbar.showInline(null, !0) },
                    insertHR: function() {
                        b.selection.remove();
                        var d = "";
                        b.core.isEmpty() && (d = "<br>", d = c(d)),
                            b.html.insert('<hr id="fr-just">' + d);
                        var e = b.$el.find("hr#fr-just");
                        e.removeAttr("id");
                        var f;
                        if (0 === e.next().length) {
                            var g = b.html.defaultTag();
                            g ? e.after($("<" + g + ">").append("<br>")) : e.after("<br>")
                        }
                        e.prev().is("hr") ? f = b.selection.setAfter(e.get(0), !1) : e.next().is("hr") ? f = b.selection.setBefore(e.get(0), !1) : b.selection.setAfter(e.get(0), !1) || b.selection.setBefore(e.get(0), !1),
                            f || void 0 === f || (d = $.FE.MARKERS + "<br>", d = c(d),
                                e.after(d)),
                            b.selection.restore()
                    },
                    clearFormatting: function() { b.format.remove() },
                    selectAll: function() { b.doc.execCommand("selectAll", !1, !1) }
                },
                j = {};
            for (var k in i) i.hasOwnProperty(k) && (j[k] = g(k));
            return $.extend(j, { exec: d, _init: h })
        },
        $.FE.MODULES.data = function(a) {
            function b(a) { return a }

            function c(a) {
                if (!a) return a;
                for (var c = "", f = b("charCodeAt"),
                        g = b("fromCharCode"),
                        h = l.indexOf(a[0]),
                        i = 1; i < a.length - 2; i++) {
                    for (var j = d(++h),
                            k = a[f](i),
                            m = "";
                        /[0-9-]/.test(a[i + 1]);
                    ) m += a[++i];
                    m = parseInt(m, 10) || 0, k = e(k, j, m),
                        k ^= h - 1 & 31, c += String[g](k)
                }
                return c
            }

            function d(a) {
                for (var b = a.toString(),
                        c = 0, d = 0; d < b.length; d++) c += parseInt(b.charAt(d),
                    10);
                return c > 10 ? c % 9 + 1 : c
            }

            function e(a, b, c) {
                for (var d = Math.abs(c); d-- > 0;) a -= b;
                return c < 0 && (a += 123),
                    a
            }

            function f(a) {
                return !(!a || "block" === a.css("display") || (a.remove(),
                    0))
            }

            function g() { return f(j) || f(k) }

            function h() {
                return false;
                // if (o > 10 && a.destroy(), !a.$box) return !1;
                // a.$wp.prepend(n(b(n("NCKB1zwtPA9tqzajXC2c2A7B-16VD3spzJ1C9C3D5oOF2OB1NB1LD7VA5QF4TE3gytXB2A4C-8VA2AC4E1D3GB2EB2KC3KD1MF1juuSB1A8C6yfbmd1B2a1A5qdsdB2tivbC3CB1KC1CH1eLA2sTF1B4I4H-7B-21UB6b1F5bzzzyAB4JC3MG2hjdKC1JE6C1E1cj1pD-16pUE5B4prra2B5ZB3D3C3pxj1EA6A3rnJA2C-7I-7JD9D1E1wYH1F3sTB5TA2G4H4ZA22qZA5BB3mjcvcCC3JB1xillavC-21VE6PC5SI4YC5C8mb1A3WC3BD2B5aoDA2qqAE3A5D-17fOD1D5RD4WC10tE6OAZC3nF-7b1C4A4D3qCF2fgmapcromlHA2QA6a1E1D3e1A6C2bie2F4iddnIA7B2mvnwcIB5OA1DB2OLQA3PB10WC7WC5d1E3uI-7b1D5D6b1E4D2arlAA4EA1F-11srxI-7MB1D7PF1E5B4adB-21YD5vrZH3D3xAC4E1A2GF2CF2J-7yNC2JE1MI2hH-7QB1C6B5B-9bA-7XB13a1B5VievwpKB4LA3NF-10H-9I-8hhaC-16nqPG4wsleTD5zqYF3h1G2B7B4yvGE2Pi1H-7C-21OE6B1uLD1kI4WC1E7C5g1D-8fue1C8C6c1D4D3Hpi1CC4kvGC2E1legallyXB4axVA11rsA4A-9nkdtlmzBA2GD3A13A6CB1dabE1lezrUE6RD5TB4A-7f1C8c1B5d1D4D3tyfCD5C2D2==")))),
                //     j = a.$wp.find("> div:first"),
                //     k = j.find("> a"),
                //     "rtl" == a.opts.direction && j.css("left", "auto").css("right", 0).setAttribute("direction", "rtl"),
                //     o++
            }

            function _init() {
                var c = a.o_win.FEK;
                try { c = c || localStorage && localStorage.FEK } catch (k) {}
                c = c || a.opts.key || [""];
                var d = n(b("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                "string" == typeof c && (c = [c]),
                    a.ul = !0;
                for (var e = 0; e < c.length; e++) {
                    var f = n(c[e]) || "";
                    if (!(f !== n(b(n("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) && f.indexOf(m, f.length - m.length) < 0 && [n("9qqG-7amjlwq=="),
                            n("KA3B3C2A6D1D5H5H1A3=="),
                            n("QzbzvxyB2yA-9m=="),
                            n("ji1kacwmgG5bc=="),
                            n("naamngiA3dA-16xtE-11C-9B1H-8sc==")
                        ].indexOf(m) < 0)) { a.ul = !1; break }
                }
                var i = new Image;

                0 && a.ul && (h(), i.src = b(n(d)) + "u"),
                    a.events.on("contentChanged", function() {!0 === a.ul && g() && h() }),
                    a.events.on("destroy", function() { j && j.length && j.remove() }, !0)
            }
            var j, k, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                m = function() {
                    for (var a = 0, b = document.domain, c = b.split("."),
                            d = "_gd" + (new Date).getTime(); a < c.length - 1 && -1 == document.cookie.indexOf(d + "=" + d);) b = c.slice(-1 - ++a).join("."),
                        document.cookie = d + "=" + d + ";domain=" + b + ";";
                    return document.cookie = d + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + b + ";", (b || "").replace(/(^\.*)|(\.*$)/g, "")
                }(),
                n = b(c),
                o = 0;
            return { _init: _init }
        },
        $.extend($.FE.DEFAULTS, { pastePlain: !1, pasteDeniedTags: ["colgroup", "col"], pasteDeniedAttrs: ["class", "id", "style"], pasteAllowedStyleProps: [], pasteAllowLocalImages: !1 }),
        $.FE.MODULES.paste = function(b) {
            function saveCopiedText(a, c) {
                try {
                    b.win.localStorage.setItem("fr-copied-html", a),
                        b.win.localStorage.setItem("fr-copied-text", c)
                } catch (d) {}
            }

            function d(d) {
                var e = b.html.getSelected();
                saveCopiedText(e, $("<div>").html(e).text()),
                    "cut" == d.type && (b.undo.saveStep(),
                        setTimeout(function() {
                                b.selection.save(),
                                    b.html.wrap(),
                                    b.selection.restore(),
                                    b.events.focus(),
                                    b.undo.saveStep()
                            },
                            0))
            }

            function e(a) {
                if (v) return !1;
                if (a.originalEvent && (a = a.originalEvent), !1 === b.events.trigger("paste.before", [a])) return a.preventDefault(), !1;
                if (q = b.$win.scrollTop(),
                    a && a.clipboardData && a.clipboardData.getData) {
                    var c = "",
                        d = a.clipboardData.types;
                    if (b.helpers.isArray(d))
                        for (var e = 0; e < d.length; e++) c += d[e] + ";";
                    else c = d;
                    if (r = "", /text\/rtf/.test(c) && (s = a.clipboardData.getData("text/rtf")),
                        /text\/html/.test(c) ? r = a.clipboardData.getData("text/html") : /text\/rtf/.test(c) && b.browser.safari ? r = s : /text\/plain/.test(c) && !b.browser.mozilla && (r = b.html.escapeEntities(a.clipboardData.getData("text/plain")).replace(/\n/g, "<br>")),
                        "" !== r) return j(),
                        a.preventDefault && (a.stopPropagation(),
                            a.preventDefault()), !1;
                    r = null
                }
                return g(), !1
            }

            function f(c) {
                if (c.originalEvent && (c = c.originalEvent),
                    c && c.dataTransfer && c.dataTransfer.getData) {
                    var d = "",
                        e = c.dataTransfer.types;
                    if (b.helpers.isArray(e))
                        for (var f = 0; f < e.length; f++) d += e[f] + ";";
                    else d = e;
                    if (r = "", /text\/rtf/.test(d) && (s = c.dataTransfer.getData("text/rtf")),
                        /text\/html/.test(d) ? r = c.dataTransfer.getData("text/html") : /text\/rtf/.test(d) && b.browser.safari ? r = s : /text\/plain/.test(d) && !this.browser.mozilla && (r = b.html.escapeEntities(c.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")),
                        "" !== r) {
                        if (!1 !== b.markers.insertAtPoint(c)) {
                            var g = b.el.querySelector(".fr-marker");
                            return $(g).replaceWith($.FE.MARKERS),
                                j(),
                                c.preventDefault && (c.stopPropagation(),
                                    c.preventDefault()), !1
                        }
                    } else r = null
                }
            }

            function g() {
                b.selection.save(),
                    b.events.disableBlur(),
                    r = null, t ? (t.html(""),
                        b.browser.edge && b.opts.iframe && b.$el.append(t)) : (t = $('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%;" tabIndex="-1"></div>'),
                        b.browser.safari ? (t.css("top", b.$sc.scrollTop()),
                            b.$el.after(t)) : b.browser.edge && b.opts.iframe ? b.$el.append(t) : b.$box.after(t),
                        b.events.on("destroy", function() { t.remove() })),
                    t.focus(),
                    b.win.setTimeout(j, 1)
            }

            function h(a) {
                var c;
                a = a.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>"),
                    a = a.replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>"),
                    a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>"),
                    a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>"),
                    a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"),
                    a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"),
                    a = a.replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>"),
                    a = a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>"),
                    a = a.replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>"),
                    a = a.replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span"),
                    a = a.replace(/<!-\[if \!supportLists\]->([\s\S]*?)<!-\[endif\]->/gi, ""),
                    a = a.replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, ""),
                    a = a.replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " "),
                    a = a.replace(/<!-[\s\S]*?->/gi, ""),
                    a = a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                var d = ["style", "script", "applet", "embed", "noframes", "noscript"];
                for (c = 0; c < d.length; c++) {
                    var e = new RegExp("<" + d[c] + ".*?" + d[c] + "(.*?)>", "gi");
                    a = a.replace(e, "")
                }
                a = a.replace(/&nbsp;/gi, " "),
                    a = a.replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>"),
                    a = a.replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                var f;
                do { f = a, a = a.replace(/<[^\/>][^>]*><\/[^>]+>/gi, "") }
                while (a != f);
                a = a.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>'),
                    a = a.replace(/<lilevel1([^>]*)>/gi, "<li$1>"),
                    a = b.clean.html(a, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs),
                    a = a.replace(/<a>(.[^<]+)<\/a>/gi, "$1"),
                    a = a.replace(/<br> */g, "<br>");
                var g = b.o_doc.createElement("div");
                g.innerHTML = a;
                var h = g.querySelectorAll("li[data-indent]");
                for (c = 0; c < h.length; c++) {
                    var i = h[c],
                        j = i.previousElementSibling;
                    if (j && "LI" == j.tagName) {
                        var k = j.querySelector(":scope > ul, :scope > ol");
                        k || (k = document.createElement("ul"),
                                j.appendChild(k)),
                            k.appendChild(i)
                    } else i.removeAttribute("data-indent")
                }
                return b.html.cleanBlankSpaces(g),
                    a = g.innerHTML
            }

            function i(a) {
                var c, d = null,
                    e = b.doc.createElement("div");
                e.innerHTML = a;
                var f = e.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                for (c = 0; c < f.length; c++) d = f[c], d.outerHTML = "<" + (b.html.defaultTag() || "DIV") + ">" + d.innerHTML + "</" + (b.html.defaultTag() || "DIV") + ">";
                for (f = e.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")"),
                    c = f.length - 1; c >= 0; c--) d = f[c], d.outerHTML = d.innerHTML;
                var g = function(a) {
                    for (var c = b.node.contents(a),
                            d = 0; d < c.length; d++) c[d].nodeType != Node.TEXT_NODE && c[d].nodeType != Node.ELEMENT_NODE ? c[d].parentNode.removeChild(c[d]) : g(c[d])
                };
                return g(e),
                    e.innerHTML
            }

            function j() {
                b.browser.edge && b.opts.iframe && b.$box.after(t),
                    b.keys.forceUndo(),
                    u = b.snapshot.get(),
                    null === r && (r = t.get(0).innerHTML, b.selection.restore(),
                        b.events.enableBlur());
                var a = r.match(/(class=\"?Mso|class=\'?Mso|class="?Xl|class='?Xl|class=Xl|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi),
                    c = b.events.chainTrigger("paste.beforeCleanup", r);
                c && "string" == typeof c && (r = c),
                    (!a || a && !1 !== b.events.trigger("paste.wordPaste", [r])) && clean(r, a)
            }

            function clean(c, d, e) {
                var f, g = null,
                    j = null;
                c.toLowerCase().indexOf("<body") >= 0 && (c = c.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1"),
                    c = c.replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2"));
                var k = !1;
                if (c.indexOf('id="docs-internal-guid') >= 0 && (c = c.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"),
                        k = !0), !d) {
                    var m = b.opts.htmlAllowedStyleProps;
                    b.opts.htmlAllowedStyleProps = b.opts.pasteAllowedStyleProps, b.opts.htmlAllowComments = !1, c = b.clean.html(c, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs),
                        b.opts.htmlAllowedStyleProps = m, b.opts.htmlAllowComments = !0, c = removeEmptyTags(c),
                        c = c.replace(/\r|\n|\t/g, "");
                    var o = b.doc.createElement("div");
                    o.innerHTML = c;
                    var p = null,
                        q = null;
                    try {
                        p = b.win.localStorage.getItem("fr-copied-html"),
                            q = b.win.localStorage.getItem("fr-copied-text")
                    } catch (B) {}
                    q && o.textContent.replace(/(\u00A0)/gi, " ").replace(/\r|\n/gi, "") == q.replace(/(\u00A0)/gi, " ").replace(/(\r|\n)+([ ]+[\r\n]+)*/gi, " ") && (c = p),
                        c = c.replace(/^ */g, "").replace(/ *$/g, "")
                }!d || b.wordPaste && e || (c = c.replace(/^\n*/g, "").replace(/^ /g, ""),
                        0 === c.indexOf("<colgroup>") && (c = "<table>" + c + "</table>"),
                        c = h(c),
                        c = removeEmptyTags(c)),
                    b.opts.pastePlain && (c = i(c));
                var r = b.events.chainTrigger("paste.afterCleanup", c);

                if ("string" == typeof r && (c = r),
                    "" !== c) {
                    var s = b.o_doc.createElement("div");
                    s.innerHTML = c, b.spaces.normalize(s);
                    var t = s.getElementsByTagName("span");
                    for (f = t.length - 1; f >= 0; f--) {
                        var v = t[f];
                        0 === v.attributes.length && (v.outerHTML = v.innerHTML)
                    }
                    var w = b.selection.element(),
                        x = !1;
                    if (w && $(w).parentsUntil(b.el, "ul, ol").length && (x = !0),
                        x) {
                        var y = s.children;
                        1 == y.length && ["OL", "UL"].indexOf(y[0].tagName) >= 0 && (y[0].outerHTML = y[0].innerHTML)
                    }

                    if (!k) {
                        var z = s.getElementsByTagName("br");
                        for (f = z.length - 1; f >= 0; f--) {
                            var A = z[f];
                            b.node.isBlock(A.previousSibling) && A.parentNode.removeChild(A)
                        }
                    }

                    if (b.opts.enter == $.FE.ENTER_BR)
                        for (g = s.querySelectorAll("p, div"),
                            f = g.length - 1; f >= 0; f--) j = g[f], 0 === j.attributes.length && (j.outerHTML = j.innerHTML + (j.nextSibling && !b.node.isEmpty(j) ? "<br>" : ""));
                    else
                    if (b.opts.enter == $.FE.ENTER_DIV)
                        for (g = s.getElementsByTagName("p"),
                            f = g.length - 1; f >= 0; f--) j = g[f], j.outerHTML = "<div>" + j.innerHTML + "</div>";
                    c = s.innerHTML, b.html.insert(c, !0)
                }
                l(),
                    b.undo.saveStep(u),
                    b.undo.saveStep()
            }

            function l() { b.events.trigger("paste.after") }

            function getRtfClipboard() { return s }

            function removeEmptyTags(c) {
                var d, e = b.o_doc.createElement("div");
                e.innerHTML = c;
                for (var f = e.querySelectorAll("*:empty:not(td):not(th):not(iframe):not(svg):not(" + $.FE.VOID_ELEMENTS.join("):not(") + ")"); f.length;) {
                    for (d = 0; d < f.length; d++) f[d].parentNode.removeChild(f[d]);
                    f = e.querySelectorAll("*:empty:not(td):not(th):not(iframe):not(svg):not(" + $.FE.VOID_ELEMENTS.join("):not(") + ")")
                }
                for (var g = e.querySelectorAll(":scope > div:not([style]),td > div:not([style]),th > div:not([style]),li > div:not([style])"); g.length;) {
                    var h = g[g.length - 1];
                    if (b.html.defaultTag() && "div" != b.html.defaultTag()) h.querySelector(b.html.blockTagsQuery()) ? h.outerHTML = h.innerHTML : h.outerHTML = "<" + b.html.defaultTag() + ">" + h.innerHTML + "</" + b.html.defaultTag() + ">";
                    else {
                        var i = h.querySelectorAll("*");
                        !i.length || "BR" !== i[i.length - 1].tagName && 0 === h.innerText.length ? h.outerHTML = h.innerHTML + "<br>" : h.outerHTML = h.innerHTML
                    }
                    g = e.querySelectorAll(":scope > div:not([style]),td > div:not([style]),th > div:not([style]),li > div:not([style])")
                }
                for (g = e.querySelectorAll("div:not([style])"); g.length;) {
                    for (d = 0; d < g.length; d++) {
                        var j = g[d],
                            k = j.innerHTML.replace(/\u0009/gi, "").trim();
                        j.outerHTML = k
                    }
                    g = e.querySelectorAll("div:not([style])")
                }
                return e.innerHTML
            }

            function _init() {
                b.el.addEventListener("copy", d),
                    b.el.addEventListener("cut", d),
                    b.el.addEventListener("paste", e),
                    b.events.on("drop", f),
                    b.browser.msie && b.browser.version < 11 && (b.events.on("mouseup", function(a) {
                            2 == a.button && (setTimeout(function() { v = !1 },
                                    50),
                                v = !0)
                        }, !0),
                        b.events.on("beforepaste", e)),
                    b.events.on("destroy", p)
            }

            function p() {
                b.el.removeEventListener("copy", d),
                    b.el.removeEventListener("cut", d),
                    b.el.removeEventListener("paste", e)
            }
            var q, r, s, t, u, v = !1;
            return {
                _init: _init,
                removeEmptyTags: removeEmptyTags,
                getRtfClipboard: getRtfClipboard,
                saveCopiedText: saveCopiedText,
                clean: clean
            }
        },
        $.extend($.FE.DEFAULTS, { shortcutsEnabled: [], shortcutsHint: !0 }),
        $.FE.SHORTCUTS_MAP = {},
        $.FE.RegisterShortcut = function(b, c, d, e, f, g) {
            $.FE.SHORTCUTS_MAP[(f ? "^" : "") + (g ? "@" : "") + b] = { cmd: c, val: d, letter: e, shift: f, option: g },
                $.FE.DEFAULTS.shortcutsEnabled.push(c)
        },
        $.FE.RegisterShortcut($.FE.KEYCODE.E, "show", null, "E", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.B, "bold", null, "B", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.I, "italic", null, "I", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.U, "underline", null, "U", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.Z, "undo", null, "Z", !1, !1),
        $.FE.RegisterShortcut($.FE.KEYCODE.Z, "redo", null, "Z", !0, !1),
        $.FE.MODULES.shortcuts = function(b) {
            function get(c) {
                if (!b.opts.shortcutsHint) return null;
                if (!f) {
                    f = {};
                    for (var d in $.FE.SHORTCUTS_MAP) $.FE.SHORTCUTS_MAP.hasOwnProperty(d) && b.opts.shortcutsEnabled.indexOf($.FE.SHORTCUTS_MAP[d].cmd) >= 0 && (f[$.FE.SHORTCUTS_MAP[d].cmd + "." + ($.FE.SHORTCUTS_MAP[d].val || "")] = { shift: $.FE.SHORTCUTS_MAP[d].shift, option: $.FE.SHORTCUTS_MAP[d].option, letter: $.FE.SHORTCUTS_MAP[d].letter })
                }
                var e = f[c];
                return e ? (b.helpers.isMac() ? String.fromCharCode(8984) : "Ctrl+") + (e.shift ? b.helpers.isMac() ? String.fromCharCode(8679) : "Shift+" : "") + (e.option ? b.helpers.isMac() ? String.fromCharCode(8997) : "Alt+" : "") + e.letter : null
            }

            function d(c) {
                if (!b.core.hasFocus()) return !0;
                var d = c.which,
                    e = -1 != navigator.userAgent.indexOf("Mac OS X") ? c.metaKey : c.ctrlKey;
                if ("keyup" == c.type && g && d != $.FE.KEYCODE.META) return g = !1, !1;
                "keydown" == c.type && (g = !1);
                var f = (c.shiftKey ? "^" : "") + (c.altKey ? "@" : "") + d;
                if (e && $.FE.SHORTCUTS_MAP[f]) {
                    var h = $.FE.SHORTCUTS_MAP[f].cmd;
                    if (h && b.opts.shortcutsEnabled.indexOf(h) >= 0) {
                        var i, j = $.FE.SHORTCUTS_MAP[f].val;
                        if (h && !j ? i = b.$tb.find('.fr-command[data-cmd="' + h + '"]') : h && j && (i = b.$tb.find('.fr-command[data-cmd="' + h + '"][data-param1="' + j + '"]')),
                            i.length) return c.preventDefault(),
                            c.stopPropagation(),
                            i.parents(".fr-toolbar").data("instance", b),
                            "keydown" == c.type && (b.button.exec(i),
                                g = !0), !1;
                        if (h && b.commands[h]) return c.preventDefault(),
                            c.stopPropagation(),
                            "keydown" == c.type && (b.commands[h](),
                                g = !0), !1
                    }
                }
            }

            function _init() {
                b.events.on("keydown", d, !0),
                    b.events.on("keyup", d, !0)
            }
            var f = null,
                g = !1;
            return { _init: _init, get: get }
        },
        $.FE.MODULES.snapshot = function(a) {
            function b(a) {
                for (var b = a.parentNode.childNodes, c = 0, d = null, e = 0; e < b.length; e++) {
                    if (d) {
                        var f = b[e].nodeType === Node.TEXT_NODE && "" === b[e].textContent,
                            g = d.nodeType === Node.TEXT_NODE && b[e].nodeType === Node.TEXT_NODE;
                        f || g || c++
                    }

                    if (b[e] == a) return c;
                    d = b[e]
                }
            }

            function c(c) {
                var d = [];
                if (!c.parentNode) return [];
                for (; !a.node.isElement(c);) d.push(b(c)),
                    c = c.parentNode;
                return d.reverse()
            }

            function d(a, b) {
                for (; a && a.nodeType === Node.TEXT_NODE;) {
                    var c = a.previousSibling;
                    c && c.nodeType == Node.TEXT_NODE && (b += c.textContent.length),
                        a = c
                }
                return b
            }

            function e(a) {
                return {
                    scLoc: c(a.startContainer),
                    scOffset: d(a.startContainer, a.startOffset),
                    ecLoc: c(a.endContainer),
                    ecOffset: d(a.endContainer, a.endOffset)
                }
            }

            function get() {
                var b = {};

                if (a.events.trigger("snapshot.before"),
                    b.html = (a.$wp ? a.$el.html() : a.$oel.get(0).outerHTML).replace(/ style=""/g, ""),
                    b.ranges = [], a.$wp && a.selection.inEditor() && a.core.hasFocus())
                    for (var c = a.selection.ranges(),
                            d = 0; d < c.length; d++) b.ranges.push(e(c[d]));
                return a.events.trigger("snapshot.after", [b]),
                    b
            }

            function g(b) { for (var c = a.el, d = 0; d < b.length; d++) c = c.childNodes[b[d]]; return c }

            function h(b, c) {
                try {
                    var d = g(c.scLoc),
                        e = c.scOffset,
                        f = g(c.ecLoc),
                        h = c.ecOffset,
                        i = a.doc.createRange();
                    i.setStart(d, e),
                        i.setEnd(f, h),
                        b.addRange(i)
                } catch (j) {}
            }

            function restore(b) {
                a.$el.html() != b.html && (a.opts.htmlExecuteScripts ? a.$el.html(b.html) : a.el.innerHTML = b.html);
                var c = a.selection.get();
                a.selection.clear(),
                    a.events.focus(!0);
                for (var d = 0; d < b.ranges.length; d++) h(c, b.ranges[d])
            }

            function equal(b, c) { return b.html == c.html && (!a.core.hasFocus() || JSON.stringify(b.ranges) == JSON.stringify(c.ranges)) }
            return {
                get: get,
                restore: restore,
                equal: equal
            }
        },
        $.FE.MODULES.undo = function(a) {
            function b(b) {
                var c = b.which;
                a.keys.ctrlKey(b) && (90 == c && b.shiftKey && b.preventDefault(),
                    90 == c && b.preventDefault())
            }

            function canDo() { return !(0 === a.undo_stack.length || a.undo_index <= 1) }

            function canRedo() { return a.undo_index != a.undo_stack.length }

            function saveStep(b) {
                if (!a.undo_stack || a.undoing || a.el.querySelector(".fr-marker")) return !1;
                void 0 === b ? (b = a.snapshot.get(),
                    a.undo_stack[a.undo_index - 1] && a.snapshot.equal(a.undo_stack[a.undo_index - 1], b) || (dropRedo(),
                        a.undo_stack.push(b),
                        a.undo_index++, b.html != l && (a.events.trigger("contentChanged"),
                            l = b.html))) : (dropRedo(),
                    a.undo_index > 0 ? a.undo_stack[a.undo_index - 1] = b : (a.undo_stack.push(b),
                        a.undo_index++))
            }

            function dropRedo() {
                if (!a.undo_stack || a.undoing) return !1;
                for (; a.undo_stack.length > a.undo_index;) a.undo_stack.pop()
            }

            function run() {
                if (a.undo_index > 1) {
                    a.undoing = !0;
                    var b = a.undo_stack[-a.undo_index - 1];
                    clearTimeout(a._content_changed_timer),
                        a.snapshot.restore(b),
                        l = b.html, a.popups.hideAll(),
                        a.toolbar.enable(),
                        a.events.trigger("contentChanged"),
                        a.events.trigger("commands.undo"),
                        a.undoing = !1
                }
            }

            function redo() {
                if (a.undo_index < a.undo_stack.length) {
                    a.undoing = !0;
                    var b = a.undo_stack[a.undo_index++];
                    clearTimeout(a._content_changed_timer),
                        a.snapshot.restore(b),
                        l = b.html, a.popups.hideAll(),
                        a.toolbar.enable(),
                        a.events.trigger("contentChanged"),
                        a.events.trigger("commands.redo"),
                        a.undoing = !1
                }
            }

            function reset() { a.undo_index = 0, a.undo_stack = [] }

            function j() { a.undo_stack = [] }

            function _init() {
                reset(),
                    a.events.on("initialized", function() { l = (a.$wp ? a.$el.html() : a.$oel.get(0).outerHTML).replace(/ style=""/g, "") }),
                    a.events.on("blur", function() { a.el.querySelector(".fr-dragging") || a.undo.saveStep() }),
                    a.events.on("keydown", b),
                    a.events.on("destroy", j)
            }
            var l = null;
            return {
                _init: _init,
                run: run,
                redo: redo,
                canDo: canDo,
                canRedo: canRedo,
                dropRedo: dropRedo,
                reset: reset,
                saveStep: saveStep
            }
        },
        $.FE.ICON_DEFAULT_TEMPLATE = "font_awesome", $.FE.ICON_TEMPLATES = { font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>', text: '<span style="text-align: center;">[NAME]</span>', image: "<img src=[SRC] alt=[ALT] />", svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>' },
        $.FE.ICONS = {
            bold: { NAME: "bold" },
            italic: { NAME: "italic" },
            underline: { NAME: "underline" },
            strikeThrough: { NAME: "strikethrough" },
            subscript: { NAME: "subscript" },
            superscript: { NAME: "superscript" },
            color: { NAME: "tint" },
            outdent: { NAME: "outdent" },
            indent: { NAME: "indent" },
            undo: { NAME: "rotate-left" },
            redo: { NAME: "rotate-right" },
            insertHR: { NAME: "minus" },
            clearFormatting: { NAME: "eraser" },
            selectAll: { NAME: "mouse-pointer" }
        },
        $.FE.DefineIconTemplate = function(b, c) { $.FE.ICON_TEMPLATES[b] = c },
        $.FE.DefineIcon = function(b, c) { $.FE.ICONS[b] = c },
        $.FE.MODULES.icon = function() {
            function create(b) {
                var c = null,
                    d = $.FE.ICONS[b];
                if (void 0 !== d) {
                    var e = d.template || $.FE.ICON_DEFAULT_TEMPLATE;
                    e && (e = $.FE.ICON_TEMPLATES[e]) && (c = e.replace(/\[([a-zA-Z]*)\]/g, function(a, c) { return "NAME" == c ? d[c] || b : d[c] }))
                }
                return c || b
            }

            function getTemplate(b) {
                var c = $.FE.ICONS[b],
                    d = $.FE.ICON_DEFAULT_TEMPLATE;
                return void 0 !== c ? d = c.template || $.FE.ICON_DEFAULT_TEMPLATE : d
            }
            return { create: create, getTemplate: getTemplate }
        },
        $.extend($.FE.DEFAULTS, { tooltips: !0 }),
        $.FE.MODULES.tooltip = function(b) {
            function hide() { b.$tooltip && b.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed") }

            function to(c, d) {
                if (c.data("title") || c.data("title", c.attr("title")), !c.data("title")) return !1;
                b.$tooltip || f(),
                    c.removeAttr("title"),
                    b.$tooltip.text(b.language.translate(c.data("title"))),
                    b.$tooltip.addClass("fr-visible");
                var e = c.offset().left + (c.outerWidth() - b.$tooltip.outerWidth()) / 2;
                e < 0 && (e = 0),
                    e + b.$tooltip.outerWidth() > $(b.o_win).width() && (e = $(b.o_win).width() - b.$tooltip.outerWidth()),
                    void 0 === d && (d = b.opts.toolbarBottom);
                var g = d ? c.offset().top - b.$tooltip.height() : c.offset().top + c.outerHeight();
                b.$tooltip.css("position", ""),
                    b.$tooltip.css("left", e),
                    b.$tooltip.css("top", Math.ceil(g)),
                    "static" != $(b.o_doc).find("body:first").css("position") ? (b.$tooltip.css("margin-left", -$(b.o_doc).find("body:first").offset().left),
                        b.$tooltip.css("margin-top", -$(b.o_doc).find("body:first").offset().top)) : (b.$tooltip.css("margin-left", ""),
                        b.$tooltip.css("margin-top", ""))
            }

            function bind(e, f, g) {
                b.opts.tooltips && !b.helpers.isMobile() && (b.events.$on(e, "mouseenter", f, function(c) {
                        b.node.hasClass(c.currentTarget, "fr-disabled") || b.edit.isDisabled() || to($(c.currentTarget),
                            g)
                    }, !0),
                    b.events.$on(e, "mouseleave " + b._mousedown + " " + b._mouseup, f, function() { hide() }, !0))
            }

            function f() {
                b.opts.tooltips && !b.helpers.isMobile() && (b.shared.$tooltip ? b.$tooltip = b.shared.$tooltip : (b.shared.$tooltip = $('<div class="fr-tooltip"></div>'),
                        b.$tooltip = b.shared.$tooltip, b.opts.theme && b.$tooltip.addClass(b.opts.theme + "-theme"),
                        $(b.o_doc).find("body:first").append(b.$tooltip)),
                    b.events.on("shared.destroy", function() {
                        b.$tooltip.html("").removeData().remove(),
                            b.$tooltip = null
                    }, !0))
            }
            return { hide: hide, to: to, bind: bind }
        },
        $.FE.MODULES.button = function(b) {
            function c(b, c, d) {
                for (var e = $(),
                        f = 0; f < b.length; f++) {
                    var g = $(b[f]);

                    if (g.is(c) && (e = e.add(g)),
                        d && g.is(".fr-dropdown")) {
                        var h = g.next().find(c);
                        e = e.add(h)
                    }
                }
                return e
            }

            function getButtons(d, e) {
                var f, g = $();

                if (!d) return g;
                g = g.add(c(w, d, e)),
                    g = g.add(c(x, d, e));
                for (f in b.shared.popups)
                    if (b.shared.popups.hasOwnProperty(f)) {
                        var h = b.shared.popups[f],
                            i = h.children().find(d);
                        g = g.add(i)
                    }
                for (f in b.shared.modals)
                    if (b.shared.modals.hasOwnProperty(f)) {
                        var j = b.shared.modals[f],
                            k = j.$modal.find(d);
                        g = g.add(k)
                    }
                return g
            }

            function e(c) {
                var e = c.next(),
                    f = b.node.hasClass(c.get(0),
                        "fr-active"),
                    g = getButtons(".fr-dropdown.fr-active").not(c),
                    h = c.parents(".fr-toolbar, .fr-popup").data("instance") || b;
                if (h.helpers.isIOS() && !h.el.querySelector(".fr-marker") && (h.selection.save(),
                        h.selection.clear(),
                        h.selection.restore()), !f) {
                    var i = c.data("cmd");
                    e.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1),
                        $.FE.COMMANDS[i] && $.FE.COMMANDS[i].refreshOnShow && $.FE.COMMANDS[i].refreshOnShow.apply(h, [c, e]),
                        e.css("left", c.offset().left - c.parent().offset().left - ("rtl" == b.opts.direction ? e.width() - c.outerWidth() : 0)),
                        e.addClass("test-height");
                    var j = e.outerHeight();
                    e.removeClass("test-height"),
                        e.css("top", "").css("bottom", ""), !b.opts.toolbarBottom && e.offset().top + c.outerHeight() + j < $(b.o_doc).height() ? e.css("top", c.position().top + c.outerHeight()) : e.css("bottom", b.$tb.height() - c.position().top)
                }
                c.addClass("fr-blink").toggleClass("fr-active"),
                    c.hasClass("fr-active") ? (e.attr("aria-hidden", !1),
                        c.attr("aria-expanded", !0)) : (e.attr("aria-hidden", !0),
                        c.attr("aria-expanded", !1)),
                    setTimeout(function() { c.removeClass("fr-blink") },
                        300),
                    e.css("margin-left", ""),
                    e.offset().left + e.outerWidth() > b.$sc.offset().left + b.$sc.width() && e.css("margin-left", -(e.offset().left + e.outerWidth() - b.$sc.offset().left - b.$sc.width())),
                    g.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0),
                    g.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""),
                    0 !== c.parents(".fr-popup").length || b.opts.toolbarInline || (b.node.hasClass(c.get(0),
                        "fr-active") ? b.$tb.css("zIndex", (b.opts.zIndex || 1) + 4) : b.$tb.css("zIndex", ""));
                var k = e.find("a.fr-command.fr-active:first");
                b.helpers.isMobile() || (k.length ? b.accessibility.focusToolbarElement(k) : b.accessibility.focusToolbarElement(c))
            }

            function exec(a) {
                a.addClass("fr-blink"),
                    setTimeout(function() { a.removeClass("fr-blink") },
                        500);
                for (var b = a.data("cmd"),
                        c = []; void 0 !== a.data("param" + (c.length + 1));) c.push(a.data("param" + (c.length + 1)));
                var e = getButtons(".fr-dropdown.fr-active");
                e.length && (e.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0),
                        e.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")),
                    a.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(b, c)
            }

            function g(a) { exec(a) }

            function click(c) {
                var d = c.parents(".fr-popup, .fr-toolbar").data("instance");

                if (0 !== c.parents(".fr-popup").length || c.data("popup") || d.popups.hideAll(),
                    d.popups.areVisible() && !d.popups.areVisible(d)) {
                    for (var f = 0; f < $.FE.INSTANCES.length; f++) $.FE.INSTANCES[f] != d && $.FE.INSTANCES[f].popups && $.FE.INSTANCES[f].popups.areVisible() && $.FE.INSTANCES[f].$el.find(".fr-marker").remove();
                    d.popups.hideAll()
                }
                b.node.hasClass(c.get(0),
                    "fr-dropdown") ? e(c) : (g(c),
                    $.FE.COMMANDS[c.data("cmd")] && !1 !== $.FE.COMMANDS[c.data("cmd")].refreshAfterCallback && d.button.bulkRefresh())
            }

            function i(b) { click($(b.currentTarget)) }

            function hideActionDropdowns(a) {
                var b = a.find(".fr-dropdown.fr-active");
                b.length && (b.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0),
                    b.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""))
            }

            function k(a) {
                a.preventDefault(),
                    a.stopPropagation()
            }

            function l(a) {
                if (a.stopPropagation(), !b.helpers.isMobile()) return !1
            }

            function bindCommands(c, d) {
                b.events.bindClick(c, ".fr-command:not(.fr-disabled)", i),
                    b.events.$on(c, b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu", k, !0),
                    b.events.$on(c, b._mousedown + " " + b._mouseup + " " + b._move, ".fr-dropdown-menu .fr-dropdown-wrapper", l, !0);
                var e = c.get(0).ownerDocument,
                    f = "defaultView" in e ? e.defaultView : e.parentWindow,
                    g = function(d) {
                        (!d || d.type == b._mouseup && d.target != $("html").get(0) || "keydown" == d.type && (b.keys.isCharacter(d.which) && !b.keys.ctrlKey(d) || d.which == $.FE.KEYCODE.ESC)) && hideActionDropdowns(c)
                    };
                b.events.$on($(f),
                        b._mouseup + " resize keydown", g, !0),
                    b.opts.iframe && b.events.$on(b.$win, b._mouseup, g, !0),
                    b.node.hasClass(c.get(0),
                        "fr-popup") ? $.merge(x, c.find(".fr-btn").toArray()) : $.merge(w, c.find(".fr-btn").toArray()),
                    b.tooltip.bind(c, ".fr-btn, .fr-title", d)
            }

            function n(a, c) {
                var d = "";
                if (c.html) "function" == typeof c.html ? d += c.html.call(b) : d += c.html;
                else {
                    var e = c.options;
                    "function" == typeof e && (e = e()),
                        d += '<ul class="fr-dropdown-list" role="presentation">';
                    for (var f in e)
                        if (e.hasOwnProperty(f)) {
                            var g = b.shortcuts.get(a + "." + f);
                            g = g ? '<span class="fr-shortcut">' + g + "</span>" : "",
                                d += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + a + '" data-param1="' + f + '" title="' + e[f] + '">' + b.language.translate(e[f]) + "</a></li>"
                        }
                    d += "</ul>"
                }
                return d
            }

            function o(a, c, d) {
                if (b.helpers.isMobile() && !1 === c.showOnMobile) return "";
                var e = c.displaySelection;
                "function" == typeof e && (e = e(b));
                var f;
                if (e) {
                    var g = "function" == typeof c.defaultSelection ? c.defaultSelection(b) : c.defaultSelection;
                    f = '<span style="width:' + (c.displaySelectionWidth || 100) + 'px">' + b.language.translate(g || c.title) + "</span>"
                } else f = b.icon.create(c.icon || a),
                    f += '<span class="fr-sr-only">' + (b.language.translate(c.title) || "") + "</span>";
                var h = c.popup ? ' data-popup="true"' : "",
                    i = c.modal ? ' data-modal="true"' : "",
                    j = b.shortcuts.get(a + ".");
                j = j ? " (" + j + ")" : "";
                var k = a + "-" + b.id,
                    l = "dropdown-menu-" + k,
                    m = '<button id="' + k + '"type="button" tabIndex="-1" role="button"' + (c.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == c.type ? ' aria-controls="' + l + '" aria-expanded="false" aria-haspopup="true"' : "") + (c.disabled ? ' aria-disabled="true"' : "") + ' title="' + (b.language.translate(c.title) || "") + j + '" class="fr-command fr-btn' + ("dropdown" == c.type ? " fr-dropdown" : "") + " fr-btn-" + b.icon.getTemplate(c.icon) + (c.displaySelection ? " fr-selection" : "") + (c.back ? " fr-back" : "") + (c.disabled ? " fr-disabled" : "") + (d ? "" : " fr-hidden") + '" data-cmd="' + a + '"' + h + i + ">" + f + "</button>";
                if ("dropdown" == c.type) {
                    var o = '<div id="' + l + '" class="fr-dropdown-menu" role="listbox" aria-labelledby="' + k + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
                    o += n(a, c),
                        o += "</div></div></div>", m += o
                }
                return m
            }

            function buildList(c, d) {
                for (var e = "", f = 0; f < c.length; f++) {
                    var g = c[f],
                        h = $.FE.COMMANDS[g];
                    if (!(h && void 0 !== h.plugin && b.opts.pluginsEnabled.indexOf(h.plugin) < 0))
                        if (h) {
                            var i = void 0 === d || d.indexOf(g) >= 0;
                            e += o(g, h, i)
                        } else "|" == g ? e += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == g && (e += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')
                }
                return e
            }

            function refresh(c) {
                var d, e = c.parents(".fr-popup, .fr-toolbar").data("instance") || b,
                    f = c.data("cmd");
                b.node.hasClass(c.get(0),
                        "fr-dropdown") ? d = c.next() : (c.removeClass("fr-active"),
                        c.attr("aria-pressed") && c.attr("aria-pressed", !1)),
                    $.FE.COMMANDS[f] && $.FE.COMMANDS[f].refresh ? $.FE.COMMANDS[f].refresh.apply(e, [c, d]) : b.refresh[f] && e.refresh[f](c, d)
            }

            function r(c) {
                var d = b.$tb ? b.$tb.data("instance") || b : b;
                if (!1 === b.events.trigger("buttons.refresh")) return !0;
                setTimeout(function() {
                        for (var e = d.selection.inEditor() && d.core.hasFocus(),
                                f = 0; f < c.length; f++) {
                            var g = $(c[f]),
                                h = g.data("cmd");
                            0 === g.parents(".fr-popup").length ? e || $.FE.COMMANDS[h] && $.FE.COMMANDS[h].forcedRefresh ? d.button.refresh(g) : b.node.hasClass(g.get(0),
                                "fr-dropdown") || (g.removeClass("fr-active"),
                                g.attr("aria-pressed") && g.attr("aria-pressed", !1)) : g.parents(".fr-popup").is(":visible") && d.button.refresh(g)
                        }
                    },
                    0)
            }

            function bulkRefresh() {
                r(w),
                    r(x)
            }

            function t() { w = [], x = [] }

            function u() {
                clearTimeout(y),
                    y = setTimeout(bulkRefresh, 50)
            }

            function _init() {
                b.opts.toolbarInline ? b.events.on("toolbar.show", bulkRefresh) : (b.events.on("mouseup", u),
                        b.events.on("keyup", u),
                        b.events.on("blur", u),
                        b.events.on("focus", u),
                        b.events.on("contentChanged", u),
                        b.helpers.isMobile() && b.events.$on(b.$doc, "selectionchange", bulkRefresh)),
                    b.events.on("shared.destroy", t)
            }
            var w = [];
            (b.opts.toolbarInline || b.opts.toolbarContainer) && (b.shared.buttons || (b.shared.buttons = []),
                w = b.shared.buttons);
            var x = [];
            b.shared.popup_buttons || (b.shared.popup_buttons = []),
                x = b.shared.popup_buttons;
            var y = null;
            return {
                _init: _init,
                buildList: buildList,
                bindCommands: bindCommands,
                refresh: refresh,
                bulkRefresh: bulkRefresh,
                exec: exec,
                click: click,
                hideActiveDropdowns: hideActionDropdowns,
                getButtons: getButtons
            }
        },
        $.FE.MODULES.modals = function(b) {
            function get(a) { return n[a] }

            function d(c, d) { var e = '<div tabIndex="-1" class="fr-modal' + (b.opts.theme ? " " + b.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">'; return e += '<div class="fr-modal-head">' + c + '<i title="' + b.language.translate("Cancel") + '" class="fa fa-times fr-modal-close"></i></div>', e += '<div tabIndex="-1" class="fr-modal-body">' + d + "</div>", e += "</div></div>", $(e) }

            function create(c, e, f) {
                if (b.shared.$overlay || (b.shared.$overlay = $('<div class="fr-overlay">').appendTo("body:first")),
                    m = b.shared.$overlay, b.opts.theme && m.addClass(b.opts.theme + "-theme"), !n[c]) {
                    var g = d(e, f);
                    n[c] = {
                            $modal: g,
                            $head: g.find(".fr-modal-head"),
                            $body: g.find(".fr-modal-body")
                        },
                        b.helpers.isMobile() || g.addClass("fr-desktop"),
                        g.appendTo("body:first"),
                        b.events.bindClick(g, "i.fr-modal-close", function() { hide(c) }),
                        n[c].$body.css("margin-top", n[c].$head.outerHeight()),
                        b.events.$on(g, "keydown", function(d) {
                            var e = d.which;
                            return e == $.FE.KEYCODE.ESC ? (hide(c),
                                b.accessibility.focusModalButton(g), !1) : !(!$(d.currentTarget).is("input[type=text], textarea") && e != $.FE.KEYCODE.ARROW_UP && e != $.FE.KEYCODE.ARROW_DOWN && !b.keys.isBrowserAction(d)) || (d.preventDefault(),
                                d.stopPropagation(), !1)
                        }, !0),
                        hide(c, !0)
                }
                return n[c]
            }

            function f() {
                for (var a in n) {
                    var b = n[a];
                    b && b.$modal && b.$modal.removeData().remove()
                }
                m && m.removeData().remove(),
                    n = {}
            }

            function show(c) {
                if (n[c]) {
                    var d = n[c].$modal;
                    d.data("instance", b),
                        d.show(),
                        m.show(),
                        $(b.o_doc).find("body:first").addClass("prevent-scroll"),
                        b.helpers.isMobile() && $(b.o_doc).find("body:first").addClass("fr-mobile"),
                        d.addClass("fr-active"),
                        b.accessibility.focusModal(d)
                }
            }

            function hide(c, d) {
                if (n[c]) {
                    var e = n[c].$modal,
                        f = e.data("instance") || b;
                    f.events.enableBlur(),
                        e.hide(),
                        m.hide(),
                        $(f.o_doc).find("body:first").removeClass("prevent-scroll fr-mobile"),
                        e.removeClass("fr-active"),
                        d || (b.accessibility.restoreSelection(f),
                            b.events.trigger("modals.hide"))
                }
            }

            function resize(c) {
                if (n[c]) {
                    var d = n[c],
                        e = d.$modal,
                        f = d.$body,
                        g = $(b.o_win).height(),
                        h = e.find(".fr-modal-wrapper"),
                        i = h.outerHeight(!0),
                        j = h.height() - (f.outerHeight(!0) - f.height()),
                        k = g - i + j,
                        l = f.get(0).scrollHeight,
                        m = "auto";
                    l > k && (m = k),
                        f.height(m)
                }
            }

            function isVisible(a) {
                var c;
                if ("string" == typeof a) {
                    if (!n[a]) return;
                    c = n[a].$modal
                } else c = a;
                return c && b.node.hasClass(c, "fr-active") && b.core.sameInstance(c) || !1
            }

            function areVisible(a) {
                for (var b in n)
                    if (n.hasOwnProperty(b) && isVisible(b) && (void 0 === a || n[b].$modal.data("instance") == a)) return n[b].$modal;
                return !1
            }

            function _init() { b.events.on("shared.destroy", f, !0) }
            b.shared.modals || (b.shared.modals = {});
            var m, n = b.shared.modals;
            return {
                _init: _init,
                get: get,
                create: create,
                show: show,
                hide: hide,
                resize: resize,
                isVisible: isVisible,
                areVisible: areVisible
            }
        },
        $.FE.POPUP_TEMPLATES = { "text.edit": "[_EDIT_]" },
        $.FE.RegisterTemplate = function(b, c) { $.FE.POPUP_TEMPLATES[b] = c },
        $.FE.MODULES.popups = function(b) {
            function setContainer(a, c) {
                c.is(":visible") || (c = b.$sc),
                    c.is(x[a].data("container")) || (x[a].data("container", c),
                        c.append(x[a]))
            }

            function show(a, d, e, h) {
                if (areVisible() && b.$el.find(".fr-marker").length > 0 ? (b.events.disableBlur(),
                        b.selection.restore()) : (b.events.disableBlur(),
                        b.events.focus(),
                        b.events.enableBlur()),
                    hideAll([a]), !x[a]) return !1;
                var i = b.button.getButtons(".fr-dropdown.fr-active");
                i.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""),
                    i.next().attr("aria-hidden", !0),
                    x[a].data("instance", b),
                    b.$tb && b.$tb.data("instance", b);
                var j = x[a].outerWidth(),
                    k = isVisible(a);
                x[a].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var l = x[a].data("container");
                b.opts.toolbarInline && l && b.$tb && l.get(0) == b.$tb.get(0) && (setContainer(a, b.$sc),
                        e = b.$tb.offset().top - b.helpers.getPX(b.$tb.css("margin-top")),
                        d = b.$tb.offset().left + b.$tb.outerWidth() / 2 + (parseFloat(b.$tb.find(".fr-arrow").css("margin-left")) || 0) + b.$tb.find(".fr-arrow").outerWidth() / 2, b.node.hasClass(b.$tb.get(0),
                            "fr-above") && e && (e += b.$tb.outerHeight()),
                        h = 0),
                    l = x[a].data("container"), !b.opts.iframe || h || k || (d && (d -= b.$iframe.offset().left),
                        e && (e -= b.$iframe.offset().top)),
                    l.is(b.$tb) ? b.$tb.css("zIndex", (b.opts.zIndex || 1) + 4) : x[a].css("zIndex", (b.opts.zIndex || 1) + 4),
                    d && (d -= j / 2),
                    b.opts.toolbarBottom && l && b.$tb && l.get(0) == b.$tb.get(0) && (x[a].addClass("fr-above"),
                        e && (e -= x[a].outerHeight())),
                    x[a].removeClass("fr-active"),
                    b.position.at(d, e, x[a], h || 0),
                    x[a].addClass("fr-active"),
                    k || b.accessibility.focusPopup(x[a]),
                    b.opts.toolbarInline && b.toolbar.hide(),
                    b.events.trigger("popups.show." + a),
                    s(a)._repositionPopup(),
                    o()
            }

            function onShow(a, c) { b.events.on("popups.show." + a, c) }

            function isVisible(a) { return x[a] && b.node.hasClass(x[a], "fr-active") && b.core.sameInstance(x[a]) || !1 }

            function areVisible(a) {
                for (var b in x)
                    if (x.hasOwnProperty(b) && isVisible(b) && (void 0 === a || x[b].data("instance") == a)) return x[b];
                return !1
            }

            function hide(a) {
                var c = null;
                (c = "string" != typeof a ? a : x[a]) && b.node.hasClass(c, "fr-active") && (c.removeClass("fr-active fr-above"),
                    b.events.trigger("popups.hide." + a),
                    b.$tb && (b.opts.zIndex > 1 ? b.$tb.css("zIndex", b.opts.zIndex + 1) : b.$tb.css("zIndex", "")),
                    b.events.disableBlur(),
                    c.find("input, textarea, button").filter(":focus").blur(),
                    c.find("input, textarea").attr("disabled", "disabled"))
            }

            function onHide(a, c) { b.events.on("popups.hide." + a, c) }

            function get(a) {
                var c = x[a];
                if (c && !c.data("inst" + b.id)) {
                    t(s(a),
                        a)
                }
                return c
            }

            function onRefresh(a, c) { b.events.on("popups.refresh." + a, c) }

            function refresh(c) {
                x[c].data("instance", b),
                    b.events.trigger("popups.refresh." + c);
                for (var d = x[c].find(".fr-command"),
                        e = 0; e < d.length; e++) {
                    var f = $(d[e]);
                    0 === f.parents(".fr-dropdown-menu").length && b.button.refresh(f)
                }
            }

            function hideAll(a) {
                void 0 === a && (a = []);
                for (var b in x) x.hasOwnProperty(b) && a.indexOf(b) < 0 && hide(b)
            }

            function n() { b.shared.exit_flag = !0 }

            function o() { b.shared.exit_flag = !1 }

            function p() { return b.shared.exit_flag }

            function q(c, d) {
                var e = $.FE.POPUP_TEMPLATES[c];
                "function" == typeof e && (e = e.apply(b));
                for (var f in d) d.hasOwnProperty(f) && (e = e.replace("[_" + f.toUpperCase() + "_]", d[f]));
                return e
            }

            function r(c, d) {
                var e = q(c, d),
                    f = $('<div class="fr-popup' + (b.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (b.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + e + "</div>");
                b.opts.theme && f.addClass(b.opts.theme + "-theme"),
                    b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 2),
                    "auto" != b.opts.direction && f.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction),
                    f.find("input, textarea").attr("dir", b.opts.direction).attr("disabled", "disabled");
                var g = $("body:first");
                return g.append(f),
                    f.data("container", g),
                    x[c] = f, b.button.bindCommands(f, !1),
                    f
            }

            function s(c) {
                var d = x[c];
                return {
                    _windowResize: function() {
                        var a = d.data("instance") || b;
                        !a.helpers.isMobile() && d.is(":visible") && (a.events.disableBlur(),
                            a.popups.hide(c),
                            a.events.enableBlur())
                    },
                    _inputFocus: function(c) {
                        var e = d.data("instance") || b,
                            f = $(c.currentTarget);

                        if (f.is("input:file") && f.closest(".fr-layer").addClass("fr-input-focus"),
                            c.preventDefault(),
                            c.stopPropagation(),
                            setTimeout(function() { e.events.enableBlur() },
                                100),
                            e.helpers.isMobile()) {
                            var g = $(e.o_win).scrollTop();
                            setTimeout(function() { $(e.o_win).scrollTop(g) },
                                0)
                        }
                    },
                    _inputBlur: function(c) {
                        var e = d.data("instance") || b,
                            f = $(c.currentTarget);
                        f.is("input:file") && f.closest(".fr-layer").removeClass("fr-input-focus"),
                            document.activeElement != this && $(this).is(":visible") && (e.events.blurActive() && e.events.trigger("blur"),
                                e.events.enableBlur())
                    },
                    _editorKeydown: function(e) {
                        var g = d.data("instance") || b;
                        g.keys.ctrlKey(e) || e.which == $.FE.KEYCODE.ALT || e.which == $.FE.KEYCODE.ESC || (isVisible(c) && d.find(".fr-back:visible").length ? g.button.exec(d.find(".fr-back:visible:first")) : e.which != $.FE.KEYCODE.ALT && g.popups.hide(c))
                    },
                    _preventFocus: function(c) {
                        var e = d.data("instance") || b,
                            f = c.originalEvent ? c.originalEvent.target || c.originalEvent.originalTarget : null;
                        "mouseup" == c.type || $(f).is(":focus") || e.events.disableBlur(),
                            "mouseup" != c.type || $(f).hasClass("fr-command") || $(f).parents(".fr-command").length > 0 || b.button.hideActiveDropdowns(d),
                            (b.browser.safari || b.browser.mozilla) && "mousedown" == c.type && $(f).is("input[type=file]") && e.events.disableBlur();
                        var g = "input, textarea, button, select, label, .fr-command";
                        if (f && !$(f).is(g) && 0 === $(f).parents(g).length) return c.stopPropagation(), !1;
                        f && $(f).is(g) && c.stopPropagation(),
                            o()
                    },
                    _editorMouseup: function() { d.is(":visible") && p() && d.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length > 0 && b.events.disableBlur() },
                    _windowMouseup: function(a) {
                        if (!b.core.sameInstance(d)) return !0;
                        var e = d.data("instance") || b;
                        d.is(":visible") && p() && (a.stopPropagation(),
                            e.markers.remove(),
                            e.popups.hide(c),
                            o())
                    },
                    _windowKeydown: function(e) {
                        if (!b.core.sameInstance(d)) return !0;
                        var f = d.data("instance") || b,
                            g = e.which;
                        if ($.FE.KEYCODE.ESC == g) {
                            if (f.popups.isVisible(c) && f.opts.toolbarInline) return e.stopPropagation(),
                                f.popups.isVisible(c) && (d.find(".fr-back:visible").length ? (f.button.exec(d.find(".fr-back:visible:first")),
                                    f.accessibility.focusPopupButton(d)) : d.find(".fr-dismiss:visible").length ? f.button.exec(d.find(".fr-dismiss:visible:first")) : (f.popups.hide(c),
                                    f.toolbar.showInline(null, !0),
                                    f.accessibility.FocusPopupButton(d))), !1;
                            if (f.popups.isVisible(c)) return d.find(".fr-back:visible").length ? (f.button.exec(d.find(".fr-back:visible:first")),
                                f.accessibility.focusPopupButton(d)) : d.find(".fr-dismiss:visible").length ? f.button.exec(d.find(".fr-dismiss:visible:first")) : (f.popups.hide(c),
                                f.accessibility.focusPopupButton(d)), !1
                        }
                    },
                    _doPlaceholder: function() {
                        0 === $(this).next().length && $(this).attr("placeholder") && $(this).after('<label for="' + $(this).attr("id") + '">' + $(this).attr("placeholder") + "</label>"),
                            $(this).toggleClass("fr-not-empty", "" !== $(this).val())
                    },
                    _repositionPopup: function() {
                        if (!b.opts.height && !b.opts.heightMax || b.opts.toolbarInline) return !0;
                        if (b.$wp && isVisible(c) && d.parent().get(0) == b.$sc.get(0)) {
                            var a = d.offset().top - b.$wp.offset().top,
                                e = b.$wp.outerHeight();
                            b.node.hasClass(d.get(0),
                                    "fr-above") && (a += d.outerHeight()),
                                a > e || a < 0 ? d.addClass("fr-hidden") : d.removeClass("fr-hidden")
                        }
                    }
                }
            }

            function t(a, c) {
                b.events.on("mouseup", a._editorMouseup, !0),
                    b.$wp && b.events.on("keydown", a._editorKeydown),
                    b.events.on("blur", function() {
                        areVisible() && b.markers.remove(),
                            hideAll()
                    }),
                    b.$wp && !b.helpers.isMobile() && b.events.$on(b.$wp, "scroll.popup" + c, a._repositionPopup),
                    b.events.on("window.mouseup", a._windowMouseup, !0),
                    b.events.on("window.keydown", a._windowKeydown, !0),
                    x[c].data("inst" + b.id, !0),
                    b.events.on("destroy", function() { b.core.sameInstance(x[c]) && x[c].removeClass("fr-active").appendTo("body:first") }, !0)
            }

            function create(c, d) {
                var e = r(c, d),
                    f = s(c);
                return t(f, c),
                    b.events.$on(e, "mousedown mouseup touchstart touchend touch", "*", f._preventFocus, !0),
                    b.events.$on(e, "focus", "input, textarea, button, select", f._inputFocus, !0),
                    b.events.$on(e, "blur", "input, textarea, button, select", f._inputBlur, !0),
                    b.accessibility.registerPopup(c),
                    b.events.$on(e, "keydown keyup change input", "input, textarea", f._doPlaceholder, !0),
                    b.helpers.isIOS() && b.events.$on(e, "touchend", "label", function() { $("#" + $(this).attr("for")).prop("checked", function(a, b) { return !b }) }, !0),
                    b.events.$on($(b.o_win),
                        "resize", f._windowResize, !0),
                    e
            }

            function v() {
                for (var a in x)
                    if (x.hasOwnProperty(a)) {
                        var b = x[a];
                        b && (b.html("").removeData().remove(),
                            x[a] = null)
                    }
                x = []
            }

            function _init() {
                b.events.on("shared.destroy", v, !0),
                    b.events.on("window.mousedown", n),
                    b.events.on("window.touchmove", o),
                    b.events.on("mousedown", function(a) {
                        areVisible() && (a.stopPropagation(),
                            b.$el.find(".fr-marker").remove(),
                            n(),
                            b.events.disableBlur())
                    })
            }
            b.shared.popups || (b.shared.popups = {});
            var x = b.shared.popups;
            return b.shared.exit_flag = !1, {
                _init: _init,
                create: create,
                get: get,
                show: show,
                hide: hide,
                onHide: onHide,
                hideAll: hideAll,
                setContainer: setContainer,
                refresh: refresh,
                onRefresh: onRefresh,
                onShow: onShow,
                isVisible: isVisible,
                areVisible: areVisible
            }
        },
        $.FE.MODULES.position = function(b) {
            function getBoudingRect() {
                var a = b.selection.ranges(0),
                    c = a.getBoundingClientRect();

                if (0 === c.top && 0 === c.left && 0 === c.width || 0 === c.height) {
                    var d = !1;
                    0 === b.$el.find(".fr-marker").length && (b.selection.save(),
                        d = !0);
                    var e = b.$el.find(".fr-marker:first");
                    e.css("display", "inline"),
                        e.css("line-height", "");
                    var f = e.offset(),
                        g = e.outerHeight();
                    e.css("display", "none"),
                        e.css("line-height", 0),
                        c = {},
                        c.left = f.left, c.width = 0, c.height = g, c.top = f.top - (b.helpers.isMobile() ? 0 : b.helpers.scrollTop()),
                        c.right = 1, c.bottom = 1, c.ok = !0, d && b.selection.restore()
                }
                return c
            }

            function d(a, c, d) {
                var e = a.outerHeight(!0);

                if (!b.helpers.isMobile() && b.$tb && a.parent().get(0) != b.$tb.get(0)) {
                    var f = a.parent().offset().top,
                        g = c - e - (d || 0);
                    a.parent().get(0) == b.$sc.get(0) && (f -= a.parent().position().top);
                    var h = b.$sc.get(0).scrollHeight;
                    f + c + e > b.$sc.offset().top + h && a.parent().offset().top + g > 0 && g > 0 ? (c = g, a.addClass("fr-above")) : a.removeClass("fr-above")
                }
                return c
            }

            function e(a, c) {
                var d = a.outerWidth(!0);
                return a.parent().offset().left + c + d > b.$sc.get(0).clientWidth - b.$sc.position().left - 10 && (c = b.$sc.get(0).clientWidth - a.parent().offset().left - d - 10),
                    c < 0 && (c = 10),
                    c
            }

            function forSelection(a) {
                var d = getBoudingRect();
                a.css({ top: 0, left: 0 });
                var e = d.top + d.height,
                    f = d.left + d.width / 2 - a.get(0).offsetWidth / 2 + b.helpers.scrollLeft();
                b.opts.iframe || (e += b.helpers.scrollTop()),
                    at(f, e, a, d.height)
            }

            function at(a, c, f, g) {
                var h = f.data("container");
                !h || "BODY" === h.get(0).tagName && "static" == h.css("position") || (a && (a -= h.offset().left),
                        c && (c -= h.offset().top),
                        "BODY" != h.get(0).tagName ? (a && (a += h.get(0).scrollLeft),
                            c && (c += h.get(0).scrollTop)) : "absolute" == h.css("position") && (a && (a += h.position().left),
                            c && (c += h.position().top))),
                    b.opts.iframe && h && b.$tb && h.get(0) != b.$tb.get(0) && (a && (a += b.$iframe.offset().left),
                        c && (c += b.$iframe.offset().top));
                var i = e(f, a);

                if (a) {
                    f.css("left", i);
                    var j = f.data("fr-arrow");
                    j || (j = f.find(".fr-arrow"),
                            f.data("fr-arrow", j)),
                        j.data("margin-left") || j.data("margin-left", b.helpers.getPX(j.css("margin-left"))),
                        j.css("margin-left", a - i + j.data("margin-left"))
                }
                c && f.css("top", d(f, c, g))
            }

            function h(c) {
                var d = $(c),
                    e = d.is(".fr-sticky-on"),
                    f = d.data("sticky-top"),
                    g = d.data("sticky-scheduled");

                if (void 0 === f) {
                    d.data("sticky-top", 0);
                    var h = $('<div class="fr-sticky-dummy" style="height: ' + d.outerHeight() + 'px;"></div>');
                    b.$box.prepend(h)
                } else b.$box.find(".fr-sticky-dummy").css("height", d.outerHeight());

                if (b.core.hasFocus() || b.$tb.find("input:visible:focus").length > 0) {
                    var i = b.helpers.scrollTop(),
                        j = Math.min(Math.max(i - b.$tb.parent().offset().top, 0),
                            b.$tb.parent().outerHeight() - d.outerHeight());
                    j != f && j != g && (clearTimeout(d.data("sticky-timeout")),
                            d.data("sticky-scheduled", j),
                            d.outerHeight() < i - b.$tb.parent().offset().top && d.addClass("fr-opacity-0"),
                            d.data("sticky-timeout", setTimeout(function() {
                                    var a = b.helpers.scrollTop(),
                                        c = Math.min(Math.max(a - b.$tb.parent().offset().top, 0),
                                            b.$tb.parent().outerHeight() - d.outerHeight());
                                    c > 0 && "BODY" == b.$tb.parent().get(0).tagName && (c += b.$tb.parent().position().top),
                                        c != f && (d.css("top", Math.max(c, 0)),
                                            d.data("sticky-top", c),
                                            d.data("sticky-scheduled", c)),
                                        d.removeClass("fr-opacity-0")
                                },
                                100))),
                        e || (d.css("top", "0"),
                            d.width(b.$tb.parent().width()),
                            d.addClass("fr-sticky-on"),
                            b.$box.addClass("fr-sticky-box"))
                } else clearTimeout($(c).css("sticky-timeout")),
                    d.css("top", "0"),
                    d.css("position", ""),
                    d.width(""),
                    d.data("sticky-top", 0),
                    d.removeClass("fr-sticky-on"),
                    b.$box.removeClass("fr-sticky-box")
            }

            function i(c) {
                if (c.offsetWidth) {
                    var d, e, f = $(c),
                        g = f.outerHeight(),
                        h = f.data("sticky-position"),
                        i = $("body" == b.opts.scrollableContainer ? b.o_win : b.opts.scrollableContainer).outerHeight(),
                        j = 0,
                        k = 0;
                    "body" !== b.opts.scrollableContainer && (j = b.$sc.offset().top, k = $(b.o_win).outerHeight() - j - i);
                    var l = "body" == b.opts.scrollableContainer ? b.helpers.scrollTop() : j,
                        m = f.is(".fr-sticky-on");
                    f.data("sticky-parent") || f.data("sticky-parent", f.parent());
                    var n = f.data("sticky-parent"),
                        o = n.offset().top,
                        p = n.outerHeight();

                    if (f.data("sticky-offset") || (f.data("sticky-offset", !0),
                            f.after('<div class="fr-sticky-dummy" style="height: ' + g + 'px;"></div>')), !h) {
                        var q = "auto" !== f.css("top") || "auto" !== f.css("bottom");
                        q || f.css("position", "fixed"),
                            h = {
                                top: b.node.hasClass(f.get(0),
                                    "fr-top"),
                                bottom: b.node.hasClass(f.get(0),
                                    "fr-bottom")
                            },
                            q || f.css("position", ""),
                            f.data("sticky-position", h),
                            f.data("top", b.node.hasClass(f.get(0),
                                "fr-top") ? f.css("top") : "auto"),
                            f.data("bottom", b.node.hasClass(f.get(0),
                                "fr-bottom") ? f.css("bottom") : "auto")
                    }
                    var r = function() { return o < l + d && o + p - g >= l + d },
                        s = function() { return o + g < l + i - e && o + p > l + i - e };
                    d = b.helpers.getPX(f.data("top")),
                        e = b.helpers.getPX(f.data("bottom"));
                    var t = h.top && r(),
                        u = h.bottom && s();
                    t || u ? (f.css("width", n.get(0).getBoundingClientRect().width + "px"),
                        m || (f.addClass("fr-sticky-on"),
                            f.removeClass("fr-sticky-off"),
                            f.css("top") && ("auto" != f.data("top") ? f.css("top", b.helpers.getPX(f.data("top")) + j) : f.data("top", "auto")),
                            f.css("bottom") && ("auto" != f.data("bottom") ? f.css("bottom", b.helpers.getPX(f.data("bottom")) + k) : f.css("bottom", "auto")))) : b.node.hasClass(f.get(0),
                        "fr-sticky-off") || (f.width(""),
                        f.removeClass("fr-sticky-on"),
                        f.addClass("fr-sticky-off"),
                        f.css("top") && "auto" != f.data("top") && h.top && f.css("top", 0),
                        f.css("bottom") && "auto" != f.data("bottom") && h.bottom && f.css("bottom", 0))
                }
            }

            function j() {
                var a = document.createElement("test"),
                    c = a.style;
                return c.cssText = "position:" + ["-webkit-", "-moz-", "-ms-", "-o-", ""].join("sticky; position:") + " sticky;", -1 !== c.position.indexOf("sticky") && !b.helpers.isIOS() && !b.helpers.isAndroid() && !b.browser.chrome
            }

            function k() {
                if (!j())
                    if (b._stickyElements = [], b.helpers.isIOS()) {
                        var c = function() {
                            b.helpers.requestAnimationFrame()(c);
                            for (var a = 0; a < b._stickyElements.length; a++) h(b._stickyElements[a])
                        };
                        c(),
                            b.events.$on($(b.o_win),
                                "scroll",
                                function() {
                                    if (b.core.hasFocus())
                                        for (var c = 0; c < b._stickyElements.length; c++) {
                                            var d = $(b._stickyElements[c]),
                                                e = d.parent(),
                                                f = b.helpers.scrollTop();
                                            d.outerHeight() < f - e.offset().top && (d.addClass("fr-opacity-0"),
                                                d.data("sticky-top", -1),
                                                d.data("sticky-scheduled", -1))
                                        }
                                }, !0)
                    } else b.events.$on($("body" == b.opts.scrollableContainer ? b.o_win : b.opts.scrollableContainer),
                            "scroll", refesh, !0),
                        b.events.$on($(b.o_win),
                            "resize", refesh, !0),
                        b.events.on("initialized", refesh),
                        b.events.on("focus", refesh),
                        b.events.$on($(b.o_win),
                            "resize", "textarea", refesh, !0);
                b.events.on("destroy", function() { b._stickyElements = [] })
            }

            function refesh() {
                if (b._stickyElements)
                    for (var a = 0; a < b._stickyElements.length; a++) i(b._stickyElements[a])
            }

            function addSticky(a) {
                a.addClass("fr-sticky"),
                    b.helpers.isIOS() && a.addClass("fr-sticky-ios"),
                    j() || (a.removeClass("fr-sticky"),
                        b._stickyElements.push(a.get(0)))
            }

            function _init() { k() }
            return {
                _init: _init,
                forSelection: forSelection,
                addSticky: addSticky,
                refresh: refesh,
                at: at,
                getBoundingRect: getBoudingRect
            }
        },
        $.FE.MODULES.refresh = function(b) {
            function undo(a) { g(a, !b.undo.canDo()) }

            function redo(a) { g(a, !b.undo.canRedo()) }

            function indent(a) {
                if (b.node.hasClass(a.get(0),
                        "fr-no-refresh")) return !1;
                for (var c = b.selection.blocks(),
                        d = 0; d < c.length; d++) {
                    for (var e = c[d].previousSibling; e && e.nodeType == Node.TEXT_NODE && 0 === e.textContent.length;) e = e.previousSibling;
                    if ("LI" != c[d].tagName || e) return g(a, !1), !0;
                    g(a, !0)
                }
            }

            function outdent(c) {
                if (b.node.hasClass(c.get(0),
                        "fr-no-refresh")) return !1;
                for (var d = b.selection.blocks(),
                        e = 0; e < d.length; e++) {
                    var f = "rtl" == b.opts.direction || "rtl" == $(d[e]).css("direction") ? "margin-right" : "margin-left";
                    if ("LI" == d[e].tagName || "LI" == d[e].parentNode.tagName) return g(c, !1), !0;
                    if (b.helpers.getPX($(d[e]).css(f)) > 0) return g(c, !1), !0
                }
                g(c, !0)
            }

            function g(a, b) { a.toggleClass("fr-disabled", b).attr("aria-disabled", b) }
            return {
                undo: undo,
                redo: redo,
                outdent: outdent,
                indent: indent
            }
        },
        $.extend($.FE.DEFAULTS, { editInPopup: !1 }),
        $.FE.MODULES.textEdit = function(a) {
            function b() {
                var b = '<div id="fr-text-edit-' + a.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + a.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + a.language.translate("Update") + "</button></div></div>",
                    c = { edit: b };
                a.popups.create("text.edit", c)
            }

            function c() {
                var b, c = a.popups.get("text.edit");
                b = "INPUT" === a.$el.prop("tagName") ? a.$el.attr("placeholder") : a.$el.text(),
                    c.find("input").val(b).trigger("change"),
                    a.popups.setContainer("text.edit", a.$sc),
                    a.popups.show("text.edit", a.$el.offset().left + a.$el.outerWidth() / 2, a.$el.offset().top + a.$el.outerHeight(),
                        a.$el.outerHeight())
            }

            function d() {
                a.events.$on(a.$el, a._mouseup, function() {
                    setTimeout(function() { c() },
                        10)
                })
            }

            function update() {
                var b = a.popups.get("text.edit"),
                    c = b.find("input").val();
                0 === c.length && (c = a.opts.placeholderText),
                    "INPUT" === a.$el.prop("tagName") ? a.$el.attr("placeholder", c) : a.$el.text(c),
                    a.events.trigger("contentChanged"),
                    a.popups.hide("text.edit")
            }

            function _init() {
                a.opts.editInPopup && (b(),
                    d())
            }
            return {
                _init: _init,
                update: update
            }
        },
        $.FE.RegisterCommand("updateText", { focus: !1, undo: !1, callback: function() { this.textEdit.update() } }),
        $.extend($.FE.DEFAULTS, {
            toolbarBottom: !1,
            toolbarButtons: ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineStyle", "paragraphStyle", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "spellChecker", "help", "html", "|", "undo", "redo"],
            toolbarButtonsXS: ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"],
            toolbarButtonsSM: ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"],
            toolbarButtonsMD: null,
            toolbarContainer: null,
            toolbarInline: !1,
            toolbarSticky: !0,
            toolbarStickyOffset: 0,
            toolbarVisibleWithoutSelection: !1
        }),
        $.FE.MODULES.toolbar = function(b) {
            function c(a, b) { for (var c = 0; c < b.length; c++) "-" != b[c] && "|" != b[c] && a.indexOf(b[c]) < 0 && a.push(b[c]) }

            function d() {
                var d = $.merge([], e());
                c(d, b.opts.toolbarButtonsXS || []),
                    c(d, b.opts.toolbarButtonsSM || []),
                    c(d, b.opts.toolbarButtonsMD || []),
                    c(d, b.opts.toolbarButtons);
                for (var f = d.length - 1; f >= 0; f--) "-" != d[f] && "|" != d[f] && d.indexOf(d[f]) < f && d.splice(f, 1);
                var g = b.button.buildList(d, e());
                b.$tb.append(g),
                    b.button.bindCommands(b.$tb)
            }

            function e() {
                var a = b.helpers.screenSize();
                return v[a]
            }

            function f() {
                var a = e();
                b.$tb.find(".fr-separator").remove(),
                    b.$tb.find("> .fr-command").addClass("fr-hidden");
                for (var c = 0; c < a.length; c++)
                    if ("|" == a[c] || "-" == a[c]) b.$tb.append(b.button.buildList([a[c]]));
                    else {
                        var d = b.$tb.find('> .fr-command[data-cmd="' + a[c] + '"]'),
                            f = null;
                        b.node.hasClass(d.next().get(0),
                                "fr-dropdown-menu") && (f = d.next()),
                            d.removeClass("fr-hidden").appendTo(b.$tb),
                            f && f.appendTo(b.$tb)
                    }
            }

            function g() {
                b.events.$on($(b.o_win),
                        "resize", f),
                    b.events.$on($(b.o_win),
                        "orientationchange", f)
            }

            function showInline(c, d) {
                setTimeout(function() {
                        if ((!c || c.which != $.FE.KEYCODE.ESC) && b.selection.inEditor() && b.core.hasFocus() && !b.popups.areVisible() && (b.opts.toolbarVisibleWithoutSelection || !b.selection.isCollapsed() && !b.keys.isIME() || d)) {
                            if (b.$tb.data("instance", b), !1 === b.events.trigger("toolbar.show", [c])) return !1;
                            b.$tb.show(),
                                b.opts.toolbarContainer || b.position.forSelection(b.$tb),
                                b.opts.zIndex > 1 ? b.$tb.css("z-index", b.opts.zIndex + 1) : b.$tb.css("z-index", null)
                        }
                    },
                    0)
            }

            function hide(a) { return !(!a || "keydown" !== a.type || !b.keys.ctrlKey(a)) || (!!b.button.getButtons(".fr-dropdown.fr-active").next().find(b.o_doc.activeElement).length || void(!1 !== b.events.trigger("toolbar.hide") && b.$tb.hide())) }

            function show() {
                if (!1 === b.events.trigger("toolbar.show")) return !1;
                b.$tb.show()
            }

            function k(c) {
                clearTimeout(w),
                    c && c.which == $.FE.KEYCODE.ESC || (w = setTimeout(showInline, b.opts.typingTimer))
            }

            function l() {
                b.events.on("window.mousedown", hide),
                    b.events.on("keydown", hide),
                    b.events.on("blur", hide),
                    b.events.on("window.mouseup", showInline),
                    b.helpers.isMobile() ? b.helpers.isIOS() || (b.events.on("window.touchend", showInline),
                        b.browser.mozilla && setInterval(showInline, 200)) : b.events.on("window.keyup", k),
                    b.events.on("keydown", function(b) { b && b.which == $.FE.KEYCODE.ESC && hide() }),
                    b.events.on("keydown", function(b) {
                        if (b.which == $.FE.KEYCODE.ALT) return b.stopPropagation(), !1
                    }, !0),
                    b.events.$on(b.$wp, "scroll.toolbar", showInline),
                    b.events.on("commands.after", showInline),
                    b.helpers.isMobile() && (b.events.$on(b.$doc, "selectionchange", k),
                        b.events.$on(b.$doc, "orientationchange", showInline))
            }

            function m() {
                b.opts.toolbarInline ? (b.$sc.append(b.$tb),
                    b.$tb.data("container", b.$sc),
                    b.$tb.addClass("fr-inline"),
                    b.$tb.prepend('<span class="fr-arrow"></span>'),
                    l(),
                    b.opts.toolbarBottom = !1) : (b.opts.toolbarBottom && !b.helpers.isIOS() ? (b.$box.append(b.$tb),
                        b.$tb.addClass("fr-bottom"),
                        b.$box.addClass("fr-bottom")) : (b.opts.toolbarBottom = !1, b.$box.prepend(b.$tb),
                        b.$tb.addClass("fr-top"),
                        b.$box.addClass("fr-top")),
                    b.$tb.addClass("fr-basic"),
                    b.opts.toolbarSticky && (b.opts.toolbarStickyOffset && (b.opts.toolbarBottom ? b.$tb.css("bottom", b.opts.toolbarStickyOffset) : b.$tb.css("top", b.opts.toolbarStickyOffset)),
                        b.position.addSticky(b.$tb)))
            }

            function n() {
                b.$tb.html("").removeData().remove(),
                    b.$tb = null
            }

            function o() {
                b.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"),
                    b.$box.find(".fr-sticky-dummy").remove()
            }

            function p() {
                b.opts.theme && b.$tb.addClass(b.opts.theme + "-theme"),
                    b.opts.zIndex > 1 && b.$tb.css("z-index", b.opts.zIndex + 1),
                    "auto" != b.opts.direction && b.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + b.opts.direction),
                    b.helpers.isMobile() ? b.$tb.addClass("fr-mobile") : b.$tb.addClass("fr-desktop"),
                    b.opts.toolbarContainer ? (b.opts.toolbarInline && (l(),
                            hide()),
                        b.opts.toolbarBottom ? b.$tb.addClass("fr-bottom") : b.$tb.addClass("fr-top")) : m(),
                    t = b.$tb.get(0).ownerDocument, u = "defaultView" in t ? t.defaultView : t.parentWindow, d(),
                    g(),
                    b.accessibility.registerToolbar(b.$tb),
                    b.events.$on(b.$tb, b._mousedown + " " + b._mouseup, function(a) {
                        var c = a.originalEvent ? a.originalEvent.target || a.originalEvent.originalTarget : null;
                        if (c && "INPUT" != c.tagName && !b.edit.isDisabled()) return a.stopPropagation(),
                            a.preventDefault(), !1
                    }, !0)
            }

            function _init() {
                if (b.$sc = $(b.opts.scrollableContainer).first(), !b.$wp) return !1;
                b.opts.toolbarContainer ? (b.shared.$tb ? (b.$tb = b.shared.$tb, b.opts.toolbarInline && l()) : (b.shared.$tb = $('<div class="fr-toolbar"></div>'),
                            b.$tb = b.shared.$tb, $(b.opts.toolbarContainer).append(b.$tb),
                            p(),
                            b.$tb.data("instance", b)),
                        b.opts.toolbarInline ? b.$box.addClass("fr-inline") : b.$box.addClass("fr-basic"),
                        b.events.on("focus", function() { b.$tb.data("instance", b) }, !0),
                        b.opts.toolbarInline = !1) : b.opts.toolbarInline ? (b.$box.addClass("fr-inline"),
                        b.shared.$tb ? (b.$tb = b.shared.$tb, l()) : (b.shared.$tb = $('<div class="fr-toolbar"></div>'),
                            b.$tb = b.shared.$tb, p())) : (b.$box.addClass("fr-basic"),
                        b.$tb = $('<div class="fr-toolbar"></div>'),
                        p(),
                        b.$tb.data("instance", b)),
                    b.events.on("destroy", o, !0),
                    b.events.on(b.opts.toolbarInline || b.opts.toolbarContainer ? "shared.destroy" : "destroy", n, !0)
            }

            function disable() {
                !x && b.$tb && (b.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0),
                    x = !0)
            }

            function enable() {
                x && b.$tb && (b.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1),
                        x = !1),
                    b.button.bulkRefresh()
            }
            var t, u, v = [];
            v[$.FE.XS] = b.opts.toolbarButtonsXS || b.opts.toolbarButtons, v[$.FE.SM] = b.opts.toolbarButtonsSM || b.opts.toolbarButtons, v[$.FE.MD] = b.opts.toolbarButtonsMD || b.opts.toolbarButtons, v[$.FE.LG] = b.opts.toolbarButtons;
            var w = null,
                x = !1;
            return {
                _init: _init,
                hide: hide,
                show: show,
                showInline: showInline,
                disable: disable,
                enable: enable
            }
        }
});
/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { charCounterMax: -1, charCounterCount: !0 }),
    a.FE.PLUGINS.charCounter = function (b) {
        function c() { return b.el.textContent.length }
        function d(d) {
            if (b.opts.charCounterMax < 0) return !0;
            if (c() < b.opts.charCounterMax) return !0; var e = d.which; return !(!b.keys.ctrlKey(d) && b.keys.isCharacter(e) || e === a.FE.KEYCODE.IME) || (d.preventDefault(),
            d.stopPropagation(),
            b.events.trigger("charCounter.exceeded"),
            !1)
        }
        function e(d) {
            return b.opts.charCounterMax < 0 ? d : a("<div>").html(d).text().length + c() <= b.opts.charCounterMax ? d : (b.events.trigger("charCounter.exceeded"),
            "")
        }
        function f() {
            if (b.opts.charCounterCount) {
                var a = c() + (b.opts.charCounterMax > 0 ? "/" + b.opts.charCounterMax : "");
                h.text(a),
                b.opts.toolbarBottom && h.css("margin-bottom", b.$tb.outerHeight(!0));
                var d = b.$wp.get(0).offsetWidth - b.$wp.get(0).clientWidth; d >= 0 && ("rtl" == b.opts.direction ? h.css("margin-left", d) : h.css("margin-right", d))
            }
        }
        function g() {
            return !!b.$wp && (!!b.opts.charCounterCount && (h = a('<span class="fr-counter"></span>'),
            h.css("bottom", b.$wp.css("border-bottom-width")),
            b.$box.append(h),
            b.events.on("keydown", d, !0),
            b.events.on("paste.afterCleanup", e),
            b.events.on("keyup contentChanged input", function () { b.events.trigger("charCounter.update") }),
            b.events.on("charCounter.update", f),
            b.events.trigger("charCounter.update"),
            void b.events.on("destroy", function () {
                a(b.o_win).off("resize.char" + b.id),
                h.removeData().remove(),
                h = null
            })))
        }
        var h; return { _init: g, count: c }
    }
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.codeBeautifier = function () {
        function a(a, c) {
            function d(a) { return a.replace(/^\s+/g, "") }
            function e(a) { return a.replace(/\s+$/g, "") }
            function g() {
                return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = { parent: "parent1", parentcount: 1, parent1: "" },
                this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = i, this.Utils = {
                    whitespace: "\n\r\t ".split(""),
                    single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                    extra_liners: u, in_array: function (a, b) {
                        for (var c = 0; c < b.length; c++)
                            if (a == b[c]) return !0; return !1
                    }
                },
                this.is_whitespace = function (a) {
                    for (var b = 0; b < a.length; a++)
                        if (!this.Utils.in_array(a.charAt(b),
                        this.Utils.whitespace)) return !1; return !0
                },
                this.traverse_whitespace = function () {
                    var a = "";
                    if (a = this.input.charAt(this.pos),
                    this.Utils.in_array(a, this.Utils.whitespace)) {
                        for (this.newlines = 0; this.Utils.in_array(a, this.Utils.whitespace) ;
                        ) o && "\n" == a && this.newlines <= p && (this.newlines += 1),
                        this.pos++, a = this.input.charAt(this.pos);
                        return !0
                    }
                    return !1
                },
                this.space_or_wrap = function (a) {
                    this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, a),
                    this.print_indentation(a)) : (this.line_char_count++, a.push(" "))
                },
                this.get_content = function () {
                    for (var a = "", b = []; "<" != this.input.charAt(this.pos) ;
                    ) {
                        if (this.pos >= this.input.length) return b.length ? b.join("") : ["", "TK_EOF"];
                        if (this.traverse_whitespace()) this.space_or_wrap(b);
                        else {
                            if (q) {
                                var c = this.input.substr(this.pos, 3);

                                if ("{{#" == c || "{{/" == c) break;
                                if ("{{!" == c) return [this.get_tag(),
                                "TK_TAG_HANDLEBARS_COMMENT"];
                                if ("{{" == this.input.substr(this.pos, 2) && "{{else}}" == this.get_tag(!0)) break
                            }
                            a = this.input.charAt(this.pos),
                            this.pos++, this.line_char_count++, b.push(a)
                        }
                    }
                    return b.length ? b.join("") : ""
                },
                this.get_contents_to = function (a) {
                    if (this.pos == this.input.length) return ["", "TK_EOF"]; var b = "", c = new RegExp("</" + a + "\\s*>", "igm");
                    c.lastIndex = this.pos; var d = c.exec(this.input),
                    e = d ? d.index : this.input.length; return this.pos < e && (b = this.input.substring(this.pos, e),
                    this.pos = e),
                    b
                },
                this.record_tag = function (a) {
                    this.tags[a + "count"] ? (this.tags[a + "count"]++, this.tags[a + this.tags[a + "count"]] = this.indent_level) : (this.tags[a + "count"] = 1, this.tags[a + this.tags[a + "count"]] = this.indent_level),
                    this.tags[a + this.tags[a + "count"] + "parent"] = this.tags.parent, this.tags.parent = a + this.tags[a + "count"]
                },
                this.retrieve_tag = function (a) {
                    if (this.tags[a + "count"]) {
                        for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"]; b && (this.indent_level = this.tags[a + this.tags[a + "count"]], this.tags.parent = this.tags[b + "parent"]),
                        delete this.tags[a + this.tags[a + "count"] + "parent"], delete this.tags[a + this.tags[a + "count"]], 1 == this.tags[a + "count"] ? delete this.tags[a + "count"] : this.tags[a + "count"]--
                    }
                },
                this.indent_to_tag = function (a) {
                    if (this.tags[a + "count"]) { for (var b = this.tags.parent; b && a + this.tags[a + "count"] != b;) b = this.tags[b + "parent"]; b && (this.indent_level = this.tags[a + this.tags[a + "count"]]) }
                },
                this.get_tag = function (a) {
                    var b, c, d = "", e = [], f = "", g = !1, h = !0, i = this.pos, j = this.line_char_count; a = void 0 !== a && a; do {
                        if (this.pos >= this.input.length) return a && (this.pos = i, this.line_char_count = j),
                        e.length ? e.join("") : ["", "TK_EOF"];
                        if (d = this.input.charAt(this.pos),
                        this.pos++, this.Utils.in_array(d, this.Utils.whitespace)) g = !0; else {
                            if ("'" != d && '"' != d || (d += this.get_unformatted(d),
                            g = !0),
                            "=" == d && (g = !1),
                            e.length && "=" != e[e.length - 1] && ">" != d && g) {
                                if (this.space_or_wrap(e),
                                g = !1, !h && "force" == r && "/" != d) {
                                    this.print_newline(!0, e),
                                    this.print_indentation(e);
                                    for (var l = 0; l < s; l++) e.push(k)
                                }
                                for (var m = 0; m < e.length; m++)
                                    if (" " == e[m]) { h = !1; break }
                            }

                            if (q && "<" == c && d + this.input.charAt(this.pos) == "{{" && (d += this.get_unformatted("}}"),
                            e.length && " " != e[e.length - 1] && "<" != e[e.length - 1] && (d = " " + d),
                            g = !0),
                            "<" != d || c || (b = this.pos - 1, c = "<"),
                            q && !c && e.length >= 2 && "{" == e[e.length - 1] && "{" == e[e.length - 2] && (b = "#" == d || "/" == d || "!" == d ? this.pos - 3 : this.pos - 2, c = "{"),
                            this.line_char_count++, e.push(d),
                            e[1] && ("!" == e[1] || "?" == e[1] || "%" == e[1])) { e = [this.get_comment(b)]; break }

                            if (q && e[1] && "{" == e[1] && e[2] && "!" == e[2]) { e = [this.get_comment(b)]; break }

                            if (q && "{" == c && e.length > 2 && "}" == e[e.length - 2] && "}" == e[e.length - 1]) break
                        }
                    }
                    while (">" != d);
                    var o, p, t = e.join("");
                    o = -1 != t.indexOf(" ") ? t.indexOf(" ") : "{" == t[0] ? t.indexOf("}") : t.indexOf(">"),
                    p = "<" != t[0] && q ? "#" == t[2] ? 3 : 2 : 1; var u = t.substring(p, o).toLowerCase();
                    return "/" == t.charAt(t.length - 2) || this.Utils.in_array(u, this.Utils.single_token) ? a || (this.tag_type = "SINGLE") : q && "{" == t[0] && "else" == u ? a || (this.indent_to_tag("if"),
                    this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(u, n) ? (f = this.get_unformatted("</" + u + ">", t),
                    e.push(f),
                    this.pos - 1, this.tag_type = "SINGLE") : "script" == u && (-1 == t.search("type") || t.search("type") > -1 && t.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/) > -1) ? a || (this.record_tag(u),
                    this.tag_type = "SCRIPT") : "style" == u && (-1 == t.search("type") || t.search("type") > -1 && t.search("text/css") > -1) ? a || (this.record_tag(u),
                    this.tag_type = "STYLE") : "!" == u.charAt(0) ? a || (this.tag_type = "SINGLE", this.traverse_whitespace()) : a || ("/" == u.charAt(0) ? (this.retrieve_tag(u.substring(1)),
                    this.tag_type = "END") : (this.record_tag(u),
                    "html" != u.toLowerCase() && (this.indent_content = !0),
                    this.tag_type = "START"),
                    this.traverse_whitespace() && this.space_or_wrap(e),
                    this.Utils.in_array(u, this.Utils.extra_liners) && (this.print_newline(!1, this.output),
                    this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))),
                    a && (this.pos = i, this.line_char_count = j),
                    e.join("")
                },
                this.get_comment = function (a) {
                    var b = "", c = ">", d = !1; this.pos = a; var e = this.input.charAt(this.pos);
                    for (this.pos++; this.pos <= this.input.length && (b += e, b[b.length - 1] != c[c.length - 1] || -1 == b.indexOf(c)) ;
                    ) !d && b.length < 10 && (0 === b.indexOf("<![if") ? (c = "<![endif]>", d = !0) : 0 === b.indexOf("<![cdata[") ? (c = "]]>", d = !0) : 0 === b.indexOf("<![") ? (c = "]>", d = !0) : 0 === b.indexOf("\x3c!--") ? (c = "--\x3e", d = !0) : 0 === b.indexOf("{{!") ? (c = "}}", d = !0) : 0 === b.indexOf("<?") ? (c = "?>", d = !0) : 0 === b.indexOf("<%") && (c = "%>", d = !0)),
                    e = this.input.charAt(this.pos),
                    this.pos++; return b
                },
                this.get_unformatted = function (a, b) {
                    if (b && -1 != b.toLowerCase().indexOf(a)) return ""; var c = "", d = "", e = 0, f = !0; do {
                        if (this.pos >= this.input.length) return d;
                        if (c = this.input.charAt(this.pos),
                        this.pos++, this.Utils.in_array(c, this.Utils.whitespace)) {
                            if (!f) { this.line_char_count--; continue }

                            if ("\n" == c || "\r" == c) { d += "\n", this.line_char_count = 0; continue }
                        }
                        d += c, this.line_char_count++, f = !0, q && "{" == c && d.length && "{" == d[d.length - 2] && (d += this.get_unformatted("}}"),
                        e = d.length)
                    }
                    while (-1 == d.toLowerCase().indexOf(a, e));
                    return d
                },
                this.get_token = function () {
                    var a;
                    if ("TK_TAG_SCRIPT" == this.last_token || "TK_TAG_STYLE" == this.last_token) {
                        var b = this.last_token.substr(7);
                        return a = this.get_contents_to(b),
                        "string" != typeof a ? a : [a, "TK_" + b]
                    }

                    if ("CONTENT" == this.current_mode) return a = this.get_content(),
                    "string" != typeof a ? a : [a, "TK_CONTENT"];
                    if ("TAG" == this.current_mode) {
                        if ("string" != typeof (a = this.get_tag())) return a; return [a, "TK_TAG_" + this.tag_type]
                    }
                },
                this.get_full_indent = function (a) { return a = this.indent_level + a || 0, a < 1 ? "" : new Array(a + 1).join(this.indent_string) },
                this.is_unformatted = function (a, b) {
                    if (!this.Utils.in_array(a, b)) return !1;
                    if ("a" != a.toLowerCase() || !this.Utils.in_array("a", b)) return !0; var c = this.get_tag(!0),
                    d = (c || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                    return !(d && !this.Utils.in_array(d, b))
                },
                this.printer = function (a, b, c, f, g) {
                    this.input = a || "", this.output = [], this.indent_character = b, this.indent_string = "", this.indent_size = c, this.brace_style = g, this.indent_level = 0, this.wrap_line_length = f, this.line_char_count = 0; for (var h = 0; h < this.indent_size; h++) this.indent_string += this.indent_character; this.print_newline = function (a, b) {
                        this.line_char_count = 0, b && b.length && (a || "\n" != b[b.length - 1]) && ("\n" != b[b.length - 1] && (b[b.length - 1] = e(b[b.length - 1])),
                        b.push("\n"))
                    },
                    this.print_indentation = function (a) {
                        for (var b = 0; b < this.indent_level; b++) a.push(this.indent_string),
                        this.line_char_count += this.indent_string.length
                    },
                    this.print_token = function (a) {
                        this.is_whitespace(a) && !this.output.length || ((a || "" !== a) && this.output.length && "\n" == this.output[this.output.length - 1] && (this.print_indentation(this.output),
                        a = d(a)),
                        this.print_token_raw(a))
                    },
                    this.print_token_raw = function (a) {
                        this.newlines > 0 && (a = e(a)),
                        a && "" !== a && (a.length > 1 && "\n" == a[a.length - 1] ? (this.output.push(a.slice(0, -1)),
                        this.print_newline(!1, this.output)) : this.output.push(a));
                        for (var b = 0; b < this.newlines; b++) this.print_newline(b > 0, this.output);
                        this.newlines = 0
                    },
                    this.indent = function () { this.indent_level++ },
                    this.unindent = function () { this.indent_level > 0 && this.indent_level-- }
                },
                this
            }
            var h, i, j, k, l, m, n, o, p, q, r, s, t, u; for (c = c || {},
            void 0 !== c.wrap_line_length && 0 !== parseInt(c.wrap_line_length, 10) || void 0 === c.max_char || 0 === parseInt(c.max_char, 10) || (c.wrap_line_length = c.max_char),
            i = void 0 !== c.indent_inner_html && c.indent_inner_html, j = void 0 === c.indent_size ? 4 : parseInt(c.indent_size, 10),
            k = void 0 === c.indent_char ? " " : c.indent_char, m = void 0 === c.brace_style ? "collapse" : c.brace_style, l = 0 === parseInt(c.wrap_line_length, 10) ? 32786 : parseInt(c.wrap_line_length || 250, 10),
            n = c.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], o = void 0 === c.preserve_newlines || c.preserve_newlines, p = o ? isNaN(parseInt(c.max_preserve_newlines, 10)) ? 32786 : parseInt(c.max_preserve_newlines, 10) : 0, q = void 0 !== c.indent_handlebars && c.indent_handlebars, r = void 0 === c.wrap_attributes ? "auto" : c.wrap_attributes, s = void 0 === c.wrap_attributes_indent_size ? j : parseInt(c.wrap_attributes_indent_size, 10) || j, t = void 0 !== c.end_with_newline && c.end_with_newline, u = Array.isArray(c.extra_liners) ? c.extra_liners.concat() : "string" == typeof c.extra_liners ? c.extra_liners.split(",") : "head,body,/html".split(","),
            c.indent_with_tabs && (k = "\t", j = 1),
            h = new g, h.printer(a, k, j, l, m) ;
            ;) {
                var v = h.get_token();

                if (h.token_text = v[0], h.token_type = v[1], "TK_EOF" == h.token_type) break; switch (h.token_type) {
                    case "TK_TAG_START": h.print_newline(!1, h.output),
                    h.print_token(h.token_text),
                    h.indent_content && (h.indent(),
                    h.indent_content = !1),
                    h.current_mode = "CONTENT"; break; case "TK_TAG_STYLE": case "TK_TAG_SCRIPT": h.print_newline(!1, h.output),
                    h.print_token(h.token_text),
                    h.current_mode = "CONTENT"; break; case "TK_TAG_END":
                        if ("TK_CONTENT" == h.last_token && "" === h.last_text) {
                            var w = h.token_text.match(/\w+/)[0], x = null; h.output.length && (x = h.output[h.output.length - 1].match(/(?:<|{{#)\s*(\w+)/)),
                            (null == x || x[1] != w && !h.Utils.in_array(x[1], n)) && h.print_newline(!1, h.output)
                        }
                        h.print_token(h.token_text),
                        h.current_mode = "CONTENT"; break; case "TK_TAG_SINGLE": var y = h.token_text.match(/^\s*<([a-z-]+)/i);
                            y && h.Utils.in_array(y[1], n) || h.print_newline(!1, h.output),
                            h.print_token(h.token_text),
                            h.current_mode = "CONTENT"; break; case "TK_TAG_HANDLEBARS_ELSE": h.print_token(h.token_text),
                            h.indent_content && (h.indent(),
                            h.indent_content = !1),
                            h.current_mode = "CONTENT"; break; case "TK_TAG_HANDLEBARS_COMMENT": case "TK_CONTENT": h.print_token(h.token_text),
                            h.current_mode = "TAG"; break; case "TK_STYLE": case "TK_SCRIPT":
                                if ("" !== h.token_text) {
                                    h.print_newline(!1, h.output);
                                    var z, A = h.token_text, B = 1; "TK_SCRIPT" == h.token_type ? z = "function" == typeof f && f : "TK_STYLE" == h.token_type && (z = "function" == typeof b && b),
                                    "keep" == c.indent_scripts ? B = 0 : "separate" == c.indent_scripts && (B = -h.indent_level);
                                    var C = h.get_full_indent(B);

                                    if (z) A = z(A.replace(/^\s*/, C),
                                    c);
                                    else {
                                        var D = A.match(/^\s*/)[0], E = D.match(/[^\n\r]*$/)[0].split(h.indent_string).length - 1, F = h.get_full_indent(B - E);
                                        A = A.replace(/^\s*/, C).replace(/\r\n|\r|\n/g, "\n" + F).replace(/\s+$/, "")
                                    }
                                    A && (h.print_token_raw(A),
                                    h.print_newline(!0, h.output))
                                }
                                h.current_mode = "TAG"; break; default: "" !== h.token_text && h.print_token(h.token_text)
                }
                h.last_token = h.token_type, h.last_text = h.token_text
            }
            var G = h.output.join("").replace(/[\r\n\t ]+$/, "");
            return t && (G += "\n"),
            G
        }
        function b(a, b) {
            function c() { return (v = a.charAt(++x)) || "" }
            function d(b) {
                var d = "", e = x; return b && g(),
                d = a.charAt(x + 1) || "", x = e - 1, c(),
                d
            }
            function e(b) {
                for (var d = x; c() ;
                )
                    if ("\\" === v) c();
                    else {
                        if (-1 !== b.indexOf(v)) break;
                        if ("\n" === v) break
                    }
                return a.substring(d, x + 1)
            }
            function f(a) {
                var b = x, d = e(a);
                return x = b - 1, c(),
                d
            }
            function g() {
                for (var a = ""; w.test(d()) ;
                ) c(),
                a += v; return a
            }
            function h() {
                var a = ""; for (v && w.test(v) && (a = v) ;
                w.test(c()) ;
                ) a += v; return a
            }
            function i(b) {
                var e = x; for (b = "/" === d(),
                c() ;
                c() ;
                ) {
                    if (!b && "*" === v && "/" === d()) {
                        c();
                        break
                    }

                    if (b && "\n" === v) return a.substring(e, x)
                }
                return a.substring(e, x) + v
            }
            function j(b) { return a.substring(x - b.length, x).toLowerCase() === b }
            function k() {
                for (var b = 0, c = x + 1; c < a.length; c++) {
                    var d = a.charAt(c);

                    if ("{" === d) return !0;
                    if ("(" === d) b += 1; else
                        if (")" === d) {
                            if (0 == b) return !1; b -= 1
                        }
                        else
                            if (";" === d || "}" === d) return !1
                }
                return !1
            }
            function l() { B++, z += A }
            function m() { B--, z = z.slice(0, -p) }
            var n = { "@page": !0, "@font-face": !0, "@keyframes": !0, "@media": !0, "@supports": !0, "@document": !0 },
            o = { "@media": !0, "@supports": !0, "@document": !0 };
            b = b || {},
            a = a || "", a = a.replace(/\r\n|[\r\u2028\u2029]/g, "\n");
            var p = b.indent_size || 4, q = b.indent_char || " ", r = void 0 === b.selector_separator_newline || b.selector_separator_newline, s = void 0 !== b.end_with_newline && b.end_with_newline, t = void 0 === b.newline_between_rules || b.newline_between_rules, u = b.eol ? b.eol : "\n"; "string" == typeof p && (p = parseInt(p, 10)),
            b.indent_with_tabs && (q = "\t", p = 1),
            u = u.replace(/\\r/, "\r").replace(/\\n/, "\n");
            var v, w = /^\s+$/, x = -1, y = 0, z = a.match(/^[\t ]*/)[0], A = new Array(p + 1).join(q),
            B = 0, C = 0, D = {};
            D["{"] = function (a) {
                D.singleSpace(),
                E.push(a),
                D.newLine()
            },
            D["}"] = function (a) {
                D.newLine(),
                E.push(a),
                D.newLine()
            },
            D._lastCharWhitespace = function () { return w.test(E[E.length - 1]) },
            D.newLine = function (a) {
                E.length && (a || "\n" === E[E.length - 1] || D.trim(),
                E.push("\n"),
                z && E.push(z))
            },
            D.singleSpace = function () { E.length && !D._lastCharWhitespace() && E.push(" ") },
            D.preserveSingleSpace = function () { L && D.singleSpace() },
            D.trim = function () {
                for (; D._lastCharWhitespace() ;
                ) E.pop()
            };
            for (var E = [], F = !1, G = !1, H = !1, I = "", J = ""; ;) {
                var K = h(),
                L = "" !== K, M = -1 !== K.indexOf("\n");

                if (J = I, I = v, !v) break;
                if ("/" === v && "*" === d()) {
                    var N = 0 === B; (M || N) && D.newLine(),
                    E.push(i()),
                    D.newLine(),
                    N && D.newLine(!0)
                }
                else
                    if ("/" === v && "/" === d()) M || "{" === J || D.trim(),
                    D.singleSpace(),
                    E.push(i()),
                    D.newLine();
                    else
                        if ("@" === v) {
                            D.preserveSingleSpace(),
                            E.push(v);
                            var O = f(": ,;{}()[]/='\"");
                            O.match(/[ :]$/) && (c(),
                            O = e(": ").replace(/\s$/, ""),
                            E.push(O),
                            D.singleSpace()),
                            O = O.replace(/\s$/, ""),
                            O in n && (C += 1, O in o && (H = !0))
                        }
                        else "#" === v && "{" === d() ? (D.preserveSingleSpace(),
                        E.push(e("}"))) : "{" === v ? "}" === d(!0) ? (g(),
                        c(),
                        D.singleSpace(),
                        E.push("{}"),
                        D.newLine(),
                        t && 0 === B && D.newLine(!0)) : (l(),
                        D["{"](v),
                        H ? (H = !1, F = B > C) : F = B >= C) : "}" === v ? (m(),
                        D["}"](v),
                        F = !1, G = !1, C && C--, t && 0 === B && D.newLine(!0)) : ":" === v ? (g(),
                        !F && !H || j("&") || k() ? ":" === d() ? (c(),
                        E.push("::")) : E.push(":") : (G = !0, E.push(":"),
                        D.singleSpace())) : '"' === v || "'" === v ? (D.preserveSingleSpace(),
                        E.push(e(v))) : ";" === v ? (G = !1, E.push(v),
                        D.newLine()) : "(" === v ? j("url") ? (E.push(v),
                        g(),
                        c() && (")" !== v && '"' !== v && "'" !== v ? E.push(e(")")) : x--)) : (y++, D.preserveSingleSpace(),
                        E.push(v),
                        g()) : ")" === v ? (E.push(v),
                        y--) : "," === v ? (E.push(v),
                        g(),
                        r && !G && y < 1 ? D.newLine() : D.singleSpace()) : "]" === v ? E.push(v) : "[" === v ? (D.preserveSingleSpace(),
                        E.push(v)) : "=" === v ? (g(),
                        v = "=", E.push(v)) : (D.preserveSingleSpace(),
                        E.push(v))
            }
            var P = ""; return z && (P += z),
            P += E.join("").replace(/[\r\n\t ]+$/, ""),
            s && (P += "\n"),
            "\n" != u && (P = P.replace(/[\n]/g, u)),
            P
        }
        function c(a, b) {
            for (var c = 0; c < b.length; c += 1)
                if (b[c] === a) return !0; return !1
        }
        function d(a) { return a.replace(/^\s+|\s+$/g, "") }
        function e(a) { return a.replace(/^\s+/g, "") }
        function f(a, b) { return new g(a, b).beautify() }
        function g(a, b) {
            function f(a, b) {
                var c = 0; return a && (c = a.indentation_level, !R.just_added_newline() && a.line_indent_level > c && (c = a.line_indent_level)),
                {
                    mode: b, parent: a, last_text: a ? a.last_text : "", last_word: a ? a.last_word : "", declaration_statement: !1, declaration_assignment: !1, multiline_frame: !1, if_block: !1, else_block: !1, do_block: !1, do_while: !1, in_case_statement: !1, in_case: !1, case_body: !1, indentation_level: c, line_indent_level: a ? a.line_indent_level : c, start_line_index: R.get_line_number(),
                    ternary_depth: 0
                }
            }
            function g(a) {
                var b = a.newlines;
                if (ba.keep_array_indentation && t(Y.mode)) for (c = 0; c < b; c += 1) n(c > 0);
                else
                    if (ba.max_preserve_newlines && b > ba.max_preserve_newlines && (b = ba.max_preserve_newlines),
                    ba.preserve_newlines && a.newlines > 1) {
                        n();
                        for (var c = 1; c < b; c += 1) n(!0)
                    }
                U = a, aa[U.type]()
            }
            function h(a) {
                a = a.replace(/\x0d/g, "");
                for (var b = [], c = a.indexOf("\n") ;
                -1 !== c;) b.push(a.substring(0, c)),
                a = a.substring(c + 1),
                c = a.indexOf("\n");
                return a.length && b.push(a),
                b
            }
            function m(a) {
                if (a = void 0 !== a && a, !R.just_added_newline())
                    if (ba.preserve_newlines && U.wanted_newline || a) n(!1, !0);
                    else
                        if (ba.wrap_line_length) {
                            var b = R.current_line.get_character_count() + U.text.length + (R.space_before_token ? 1 : 0);
                            b >= ba.wrap_line_length && n(!1, !0)
                        }
            }
            function n(a, b) {
                if (!b && ";" !== Y.last_text && "," !== Y.last_text && "=" !== Y.last_text && "TK_OPERATOR" !== V) for (; Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                R.add_new_line(a) && (Y.multiline_frame = !0)
            }
            function o() {
                R.just_added_newline() && (ba.keep_array_indentation && t(Y.mode) && U.wanted_newline ? (R.current_line.push(U.whitespace_before),
                R.space_before_token = !1) : R.set_indent(Y.indentation_level) && (Y.line_indent_level = Y.indentation_level))
            }
            function p(a) {
                if (R.raw) return void R.add_raw_token(U);
                ba.comma_first && "TK_COMMA" === V && R.just_added_newline() && "," === R.previous_line.last() && (R.previous_line.pop(),
                o(),
                R.add_token(","),
                R.space_before_token = !0),
                a = a || U.text, o(),
                R.add_token(a)
            }
            function q() { Y.indentation_level += 1 }
            function r() { Y.indentation_level > 0 && (!Y.parent || Y.indentation_level > Y.parent.indentation_level) && (Y.indentation_level -= 1) }
            function s(a) {
                Y ? ($.push(Y),
                Z = Y) : Z = f(null, a),
                Y = f(Z, a)
            }
            function t(a) { return a === l.ArrayLiteral }
            function u(a) { return c(a, [l.Expression, l.ForInitializer, l.Conditional]) }
            function v() {
                $.length > 0 && (Z = Y, Y = $.pop(),
                Z.mode === l.Statement && R.remove_redundant_indentation(Z))
            }
            function w() { return Y.parent.mode === l.ObjectLiteral && Y.mode === l.Statement && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"])) }
            function x() {
                return !!("TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type || "TK_RESERVED" === V && "do" === Y.last_text || "TK_RESERVED" === V && "return" === Y.last_text && !U.wanted_newline || "TK_RESERVED" === V && "else" === Y.last_text && ("TK_RESERVED" !== U.type || "if" !== U.text) || "TK_END_EXPR" === V && (Z.mode === l.ForInitializer || Z.mode === l.Conditional) || "TK_WORD" === V && Y.mode === l.BlockStatement && !Y.in_case && "--" !== U.text && "++" !== U.text && "function" !== W && "TK_WORD" !== U.type && "TK_RESERVED" !== U.type || Y.mode === l.ObjectLiteral && (":" === Y.last_text && 0 === Y.ternary_depth || "TK_RESERVED" === V && c(Y.last_text, ["get", "set"]))) && (s(l.Statement),
                q(),
                "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const"]) && "TK_WORD" === U.type && (Y.declaration_statement = !0),
                w() || m("TK_RESERVED" === U.type && c(U.text, ["do", "for", "if", "while"])),
                !0)
            }
            function y(a, b) {
                for (var c = 0; c < a.length; c++) {
                    if (d(a[c]).charAt(0) !== b) return !1
                }
                return !0
            }
            function z(a, b) {
                for (var c, d = 0, e = a.length; d < e; d++)
                    if ((c = a[d]) && 0 !== c.indexOf(b)) return !1; return !0
            }
            function A(a) { return c(a, ["case", "return", "do", "if", "throw", "else"]) }
            function B(a) {
                var b = S + (a || 0);
                return b < 0 || b >= ca.length ? null : ca[b]
            }
            function C() {
                x();
                var a = l.Expression;
                if ("[" === U.text) {
                    if ("TK_WORD" === V || ")" === Y.last_text) return "TK_RESERVED" === V && c(Y.last_text, T.line_starters) && (R.space_before_token = !0),
                    s(a),
                    p(),
                    q(),
                    void (ba.space_in_paren && (R.space_before_token = !0));
                    a = l.ArrayLiteral, t(Y.mode) && ("[" !== Y.last_text && ("," !== Y.last_text || "]" !== W && "}" !== W) || ba.keep_array_indentation || n())
                }
                else "TK_RESERVED" === V && "for" === Y.last_text ? a = l.ForInitializer : "TK_RESERVED" === V && c(Y.last_text, ["if", "while"]) && (a = l.Conditional);
                ";" === Y.last_text || "TK_START_BLOCK" === V ? n() : "TK_END_EXPR" === V || "TK_START_EXPR" === V || "TK_END_BLOCK" === V || "." === Y.last_text ? m(U.wanted_newline) : "TK_RESERVED" === V && "(" === U.text || "TK_WORD" === V || "TK_OPERATOR" === V ? "TK_RESERVED" === V && ("function" === Y.last_word || "typeof" === Y.last_word) || "*" === Y.last_text && "function" === W ? ba.space_after_anon_function && (R.space_before_token = !0) : "TK_RESERVED" !== V || !c(Y.last_text, T.line_starters) && "catch" !== Y.last_text || ba.space_before_conditional && (R.space_before_token = !0) : R.space_before_token = !0, "(" === U.text && "TK_RESERVED" === V && "await" === Y.last_word && (R.space_before_token = !0),
                "(" === U.text && ("TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m()),
                s(a),
                p(),
                ba.space_in_paren && (R.space_before_token = !0),
                q()
            }
            function D() {
                for (; Y.mode === l.Statement;) v();
                Y.multiline_frame && m("]" === U.text && t(Y.mode) && !ba.keep_array_indentation),
                ba.space_in_paren && ("TK_START_EXPR" !== V || ba.space_in_empty_paren ? R.space_before_token = !0 : (R.trim(),
                R.space_before_token = !1)),
                "]" === U.text && ba.keep_array_indentation ? (p(),
                v()) : (v(),
                p()),
                R.remove_redundant_indentation(Z),
                Y.do_while && Z.mode === l.Conditional && (Z.mode = l.Expression, Y.do_block = !1, Y.do_while = !1)
            }
            function E() {
                var a = B(1),
                b = B(2);
                s(b && (":" === b.text && c(a.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || c(a.text, ["get", "set"]) && c(b.type, ["TK_WORD", "TK_RESERVED"])) ? c(W, ["class", "interface"]) ? l.BlockStatement : l.ObjectLiteral : l.BlockStatement);
                var d = !a.comments_before.length && "}" === a.text, e = d && "function" === Y.last_word && "TK_END_EXPR" === V; "expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? "TK_OPERATOR" !== V && (e || "TK_EQUALS" === V || "TK_RESERVED" === V && A(Y.last_text) && "else" !== Y.last_text) ? R.space_before_token = !0 : n(!1, !0) : "TK_OPERATOR" !== V && "TK_START_EXPR" !== V ? "TK_START_BLOCK" === V ? n() : R.space_before_token = !0 : t(Z.mode) && "," === Y.last_text && ("}" === W ? R.space_before_token = !0 : n()),
                p(),
                q()
            }
            function F() {
                for (; Y.mode === l.Statement;) v();
                var a = "TK_START_BLOCK" === V; "expand" === ba.brace_style ? a || n() : a || (t(Y.mode) && ba.keep_array_indentation ? (ba.keep_array_indentation = !1, n(),
                ba.keep_array_indentation = !0) : n()),
                v(),
                p()
            }
            function G() {
                if ("TK_RESERVED" === U.type && Y.mode !== l.ObjectLiteral && c(U.text, ["set", "get"]) && (U.type = "TK_WORD"),
                "TK_RESERVED" === U.type && Y.mode === l.ObjectLiteral) { ":" == B(1).text && (U.type = "TK_WORD") }

                if (x() || !U.wanted_newline || u(Y.mode) || "TK_OPERATOR" === V && "--" !== Y.last_text && "++" !== Y.last_text || "TK_EQUALS" === V || !ba.preserve_newlines && "TK_RESERVED" === V && c(Y.last_text, ["var", "let", "const", "set", "get"]) || n(),
                Y.do_block && !Y.do_while) {
                    if ("TK_RESERVED" === U.type && "while" === U.text) return R.space_before_token = !0, p(),
                    R.space_before_token = !0, void (Y.do_while = !0);
                    n(),
                    Y.do_block = !1
                }

                if (Y.if_block)
                    if (Y.else_block || "TK_RESERVED" !== U.type || "else" !== U.text) {
                        for (; Y.mode === l.Statement;) v();
                        Y.if_block = !1, Y.else_block = !1
                    }
                    else Y.else_block = !0;
                if ("TK_RESERVED" === U.type && ("case" === U.text || "default" === U.text && Y.in_case_statement)) return n(),
                (Y.case_body || ba.jslint_happy) && (r(),
                Y.case_body = !1),
                p(),
                Y.in_case = !0, void (Y.in_case_statement = !0);

                if ("TK_RESERVED" === U.type && "function" === U.text && ((c(Y.last_text, ["}", ";"]) || R.just_added_newline() && !c(Y.last_text, ["[", "{", ":", "=", ","])) && (R.just_added_blankline() || U.comments_before.length || (n(),
                n(!0))),
                "TK_RESERVED" === V || "TK_WORD" === V ? "TK_RESERVED" === V && c(Y.last_text, ["get", "set", "new", "return", "export", "async"]) ? R.space_before_token = !0 : "TK_RESERVED" === V && "default" === Y.last_text && "export" === W ? R.space_before_token = !0 : n() : "TK_OPERATOR" === V || "=" === Y.last_text ? R.space_before_token = !0 : (Y.multiline_frame || !u(Y.mode) && !t(Y.mode)) && n()),
                "TK_COMMA" !== V && "TK_START_EXPR" !== V && "TK_EQUALS" !== V && "TK_OPERATOR" !== V || w() || m(),
                "TK_RESERVED" === U.type && c(U.text, ["function", "get", "set"])) return p(),
                void (Y.last_word = U.text);

                if (_ = "NONE", "TK_END_BLOCK" === V ? "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"]) ? "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline ? _ = "NEWLINE" : (_ = "SPACE", R.space_before_token = !0) : _ = "NEWLINE" : "TK_SEMICOLON" === V && Y.mode === l.BlockStatement ? _ = "NEWLINE" : "TK_SEMICOLON" === V && u(Y.mode) ? _ = "SPACE" : "TK_STRING" === V ? _ = "NEWLINE" : "TK_RESERVED" === V || "TK_WORD" === V || "*" === Y.last_text && "function" === W ? _ = "SPACE" : "TK_START_BLOCK" === V ? _ = "NEWLINE" : "TK_END_EXPR" === V && (R.space_before_token = !0, _ = "NEWLINE"),
                "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && (_ = "else" === Y.last_text || "export" === Y.last_text ? "SPACE" : "NEWLINE"),
                "TK_RESERVED" === U.type && c(U.text, ["else", "catch", "finally"]))
                    if ("TK_END_BLOCK" !== V || "expand" === ba.brace_style || "end-expand" === ba.brace_style || "none" === ba.brace_style && U.wanted_newline) n();
                    else {
                        R.trim(!0);
                        var a = R.current_line; "}" !== a.last() && n(),
                        R.space_before_token = !0
                    }
                else "NEWLINE" === _ ? "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : "TK_END_EXPR" !== V ? "TK_START_EXPR" === V && "TK_RESERVED" === U.type && c(U.text, ["var", "let", "const"]) || ":" === Y.last_text || ("TK_RESERVED" === U.type && "if" === U.text && "else" === Y.last_text ? R.space_before_token = !0 : n()) : "TK_RESERVED" === U.type && c(U.text, T.line_starters) && ")" !== Y.last_text && n() : Y.multiline_frame && t(Y.mode) && "," === Y.last_text && "}" === W ? n() : "SPACE" === _ && (R.space_before_token = !0);
                p(),
                Y.last_word = U.text, "TK_RESERVED" === U.type && "do" === U.text && (Y.do_block = !0),
                "TK_RESERVED" === U.type && "if" === U.text && (Y.if_block = !0)
            }
            function H() {
                for (x() && (R.space_before_token = !1) ;
                Y.mode === l.Statement && !Y.if_block && !Y.do_block;) v();
                p()
            }
            function I() {
                x() ? R.space_before_token = !0 : "TK_RESERVED" === V || "TK_WORD" === V ? R.space_before_token = !0 : "TK_COMMA" === V || "TK_START_EXPR" === V || "TK_EQUALS" === V || "TK_OPERATOR" === V ? w() || m() : n(),
                p()
            }
            function J() {
                x(),
                Y.declaration_statement && (Y.declaration_assignment = !0),
                R.space_before_token = !0, p(),
                R.space_before_token = !0
            }
            function K() {
                if (Y.declaration_statement) return u(Y.parent.mode) && (Y.declaration_assignment = !1),
                p(),
                void (Y.declaration_assignment ? (Y.declaration_assignment = !1, n(!1, !0)) : (R.space_before_token = !0, ba.comma_first && m()));
                p(),
                Y.mode === l.ObjectLiteral || Y.mode === l.Statement && Y.parent.mode === l.ObjectLiteral ? (Y.mode === l.Statement && v(),
                n()) : (R.space_before_token = !0, ba.comma_first && m())
            }
            function L() {
                if (x(),
                "TK_RESERVED" === V && A(Y.last_text)) return R.space_before_token = !0, void p();

                if ("*" === U.text && "TK_DOT" === V) return void p();

                if (":" === U.text && Y.in_case) return Y.case_body = !0, q(),
                p(),
                n(),
                void (Y.in_case = !1);

                if ("::" === U.text) return void p();
                "TK_OPERATOR" === V && m();
                var a = !0, b = !0; c(U.text, ["--", "++", "!", "~"]) || c(U.text, ["-", "+"]) && (c(V, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || c(Y.last_text, T.line_starters) || "," === Y.last_text) ? (a = !1, b = !1, !U.wanted_newline || "--" !== U.text && "++" !== U.text || n(!1, !0),
                ";" === Y.last_text && u(Y.mode) && (a = !0),
                "TK_RESERVED" === V ? a = !0 : "TK_END_EXPR" === V ? a = !("]" === Y.last_text && ("--" === U.text || "++" === U.text)) : "TK_OPERATOR" === V && (a = c(U.text, ["--", "-", "++", "+"]) && c(Y.last_text, ["--", "-", "++", "+"]),
                c(U.text, ["+", "-"]) && c(Y.last_text, ["--", "++"]) && (b = !0)),
                Y.mode !== l.BlockStatement && Y.mode !== l.Statement || "{" !== Y.last_text && ";" !== Y.last_text || n()) : ":" === U.text ? 0 === Y.ternary_depth ? a = !1 : Y.ternary_depth -= 1 : "?" === U.text ? Y.ternary_depth += 1 : "*" === U.text && "TK_RESERVED" === V && "function" === Y.last_text && (a = !1, b = !1),
                R.space_before_token = R.space_before_token || a, p(),
                R.space_before_token = b
            }
            function M() {
                if (R.raw) return R.add_raw_token(U),
                void (U.directives && "end" === U.directives.preserve && (ba.test_output_raw || (R.raw = !1)));

                if (U.directives) return n(!1, !0),
                p(),
                "start" === U.directives.preserve && (R.raw = !0),
                void n(!1, !0);

                if (!k.newline.test(U.text) && !U.wanted_newline) return R.space_before_token = !0, p(),
                void (R.space_before_token = !0);
                var a, b = h(U.text),
                c = !1, d = !1, f = U.whitespace_before, g = f.length; for (n(!1, !0),
                b.length > 1 && (y(b.slice(1),
                "*") ? c = !0 : z(b.slice(1),
                f) && (d = !0)),
                p(b[0]),
                a = 1; a < b.length; a++) n(!1, !0),
                c ? p(" " + e(b[a])) : d && b[a].length > g ? p(b[a].substring(g)) : R.add_token(b[a]);
                n(!1, !0)
            }
            function N() {
                U.wanted_newline ? n(!1, !0) : R.trim(!0),
                R.space_before_token = !0, p(),
                n(!1, !0)
            }
            function O() {
                x(),
                "TK_RESERVED" === V && A(Y.last_text) ? R.space_before_token = !0 : m(")" === Y.last_text && ba.break_chained_methods),
                p()
            }
            function P() {
                p(),
                "\n" === U.text[U.text.length - 1] && n()
            }
            function Q() { for (; Y.mode === l.Statement;) v() }
            var R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca = [], da = ""; for (aa = { TK_START_EXPR: C, TK_END_EXPR: D, TK_START_BLOCK: E, TK_END_BLOCK: F, TK_WORD: G, TK_RESERVED: G, TK_SEMICOLON: H, TK_STRING: I, TK_EQUALS: J, TK_OPERATOR: L, TK_COMMA: K, TK_BLOCK_COMMENT: M, TK_COMMENT: N, TK_DOT: O, TK_UNKNOWN: P, TK_EOF: Q },
            b = b || {},
            ba = {},
            void 0 !== b.braces_on_own_line && (ba.brace_style = b.braces_on_own_line ? "expand" : "collapse"),
            ba.brace_style = b.brace_style ? b.brace_style : ba.brace_style ? ba.brace_style : "collapse", "expand-strict" === ba.brace_style && (ba.brace_style = "expand"),
            ba.indent_size = b.indent_size ? parseInt(b.indent_size, 10) : 4, ba.indent_char = b.indent_char ? b.indent_char : " ", ba.eol = b.eol ? b.eol : "\n", ba.preserve_newlines = void 0 === b.preserve_newlines || b.preserve_newlines, ba.break_chained_methods = void 0 !== b.break_chained_methods && b.break_chained_methods, ba.max_preserve_newlines = void 0 === b.max_preserve_newlines ? 0 : parseInt(b.max_preserve_newlines, 10),
            ba.space_in_paren = void 0 !== b.space_in_paren && b.space_in_paren, ba.space_in_empty_paren = void 0 !== b.space_in_empty_paren && b.space_in_empty_paren, ba.jslint_happy = void 0 !== b.jslint_happy && b.jslint_happy, ba.space_after_anon_function = void 0 !== b.space_after_anon_function && b.space_after_anon_function, ba.keep_array_indentation = void 0 !== b.keep_array_indentation && b.keep_array_indentation, ba.space_before_conditional = void 0 === b.space_before_conditional || b.space_before_conditional, ba.unescape_strings = void 0 !== b.unescape_strings && b.unescape_strings, ba.wrap_line_length = void 0 === b.wrap_line_length ? 0 : parseInt(b.wrap_line_length, 10),
            ba.e4x = void 0 !== b.e4x && b.e4x, ba.end_with_newline = void 0 !== b.end_with_newline && b.end_with_newline, ba.comma_first = void 0 !== b.comma_first && b.comma_first, ba.test_output_raw = void 0 !== b.test_output_raw && b.test_output_raw, ba.jslint_happy && (ba.space_after_anon_function = !0),
            b.indent_with_tabs && (ba.indent_char = "\t", ba.indent_size = 1),
            ba.eol = ba.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"),
            X = ""; ba.indent_size > 0;) X += ba.indent_char, ba.indent_size -= 1; var ea = 0;
            if (a && a.length) {
                for (; " " === a.charAt(ea) || "\t" === a.charAt(ea) ;
                ) da += a.charAt(ea),
                ea += 1; a = a.substring(ea)
            }
            V = "TK_START_BLOCK", W = "", R = new i(X, da),
            R.raw = ba.test_output_raw, $ = [], s(l.BlockStatement),
            this.beautify = function () {
                var b, c; for (T = new j(a, ba, X),
                ca = T.tokenize(),
                S = 0; b = B() ;
                ) {
                    for (var d = 0; d < b.comments_before.length; d++) g(b.comments_before[d]);
                    g(b),
                    W = Y.last_text, V = b.type, Y.last_text = b.text, S += 1
                }
                return c = R.get_code(),
                ba.end_with_newline && (c += "\n"),
                "\n" != ba.eol && (c = c.replace(/[\n]/g, ba.eol)),
                c
            }
        }
        function h(a) {
            var b = 0, c = -1, d = [], e = !0; this.set_indent = function (d) { b = a.baseIndentLength + d * a.indent_length, c = d },
            this.get_character_count = function () { return b },
            this.is_empty = function () { return e },
            this.last = function () { return this._empty ? null : d[d.length - 1] },
            this.push = function (a) {
                d.push(a),
                b += a.length, e = !1
            },
            this.pop = function () {
                var a = null; return e || (a = d.pop(),
                b -= a.length, e = 0 === d.length),
                a
            },
            this.remove_indent = function () { c > 0 && (c -= 1, b -= a.indent_length) },
            this.trim = function () {
                for (; " " === this.last() ;
                ) {
                    d.pop();
                    b -= 1
                }
                e = 0 === d.length
            },
            this.toString = function () {
                var b = ""; return this._empty || (c >= 0 && (b = a.indent_cache[c]),
                b += d.join("")),
                b
            }
        }
        function i(a, b) {
            b = b || "", this.indent_cache = [b], this.baseIndentLength = b.length, this.indent_length = a.length, this.raw = !1; var c = []; this.baseIndentString = b, this.indent_string = a, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function () {
                this.previous_line = this.current_line, this.current_line = new h(this),
                c.push(this.current_line)
            },
            this.add_outputline(),
            this.get_line_number = function () { return c.length },
            this.add_new_line = function (a) {
                return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!a && this.just_added_newline()) && (this.raw || this.add_outputline(),
                !0))
            },
            this.get_code = function () { return c.join("\n").replace(/[\r\n\t ]+$/, "") },
            this.set_indent = function (a) {
                if (c.length > 1) {
                    for (; a >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    return this.current_line.set_indent(a),
                    !0
                }
                return this.current_line.set_indent(0),
                !1
            },
            this.add_raw_token = function (a) {
                for (var b = 0; b < a.newlines; b++) this.add_outputline();
                this.current_line.push(a.whitespace_before),
                this.current_line.push(a.text),
                this.space_before_token = !1
            },
            this.add_token = function (a) {
                this.add_space_before_token(),

                this.current_line.push(a)
            },
            this.add_space_before_token = function () {
                this.space_before_token && !this.just_added_newline() && this.current_line.push(" "),
                this.space_before_token = !1
            },
            this.remove_redundant_indentation = function (a) {
                if (!a.multiline_frame && a.mode !== l.ForInitializer && a.mode !== l.Conditional) for (var b = a.start_line_index, d = c.length; b < d;) c[b].remove_indent(),
                b++
            },
            this.trim = function (d) {
                for (d = void 0 !== d && d, this.current_line.trim(a, b) ;
                d && c.length > 1 && this.current_line.is_empty() ;
                ) c.pop(),
                this.current_line = c[c.length - 1], this.current_line.trim();
                this.previous_line = c.length > 1 ? c[c.length - 2] : null
            },
            this.just_added_newline = function () { return this.current_line.is_empty() },
            this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (1 === c.length) return !0; return c[c.length - 2].is_empty()
                }
                return !1
            }
        }
        function j(a, b, e) {
            function f(a) {
                if (!a.match(y)) return null; var b = {};
                z.lastIndex = 0; for (var c = z.exec(a) ;
                c;) b[c[1]] = c[2], c = z.exec(a);
                return b
            }
            function g() {
                var e, g = [];
                if (p = 0, q = "", t >= u) return ["", "TK_EOF"]; var y; y = s.length ? s[s.length - 1] : new m("TK_START_BLOCK", "{");
                var z = a.charAt(t);
                for (t += 1; c(z, i) ;
                ) {
                    if (k.newline.test(z) ? "\n" === z && "\r" === a.charAt(t - 2) || (p += 1, g = []) : g.push(z),
                    t >= u) return ["", "TK_EOF"]; z = a.charAt(t),
                    t += 1
                }

                if (g.length && (q = g.join("")),
                j.test(z)) {
                    var C = !0, D = !0, E = j; for ("0" === z && t < u && /[Xxo]/.test(a.charAt(t)) ? (C = !1, D = !1, z += a.charAt(t),
                    t += 1, E = /[o]/.test(a.charAt(t)) ? l : n) : (z = "", t -= 1) ;
                    t < u && E.test(a.charAt(t)) ;
                    ) z += a.charAt(t),
                    t += 1, C && t < u && "." === a.charAt(t) && (z += a.charAt(t),
                    t += 1, C = !1),
                    D && t < u && /[Ee]/.test(a.charAt(t)) && (z += a.charAt(t),
                    t += 1, t < u && /[+-]/.test(a.charAt(t)) && (z += a.charAt(t),
                    t += 1),
                    D = !1, C = !1);
                    return [z, "TK_WORD"]
                }

                if (k.isIdentifierStart(a.charCodeAt(t - 1))) {
                    if (t < u) for (; k.isIdentifierChar(a.charCodeAt(t)) && (z += a.charAt(t),
                    (t += 1) !== u) ;
                    );
                    return "TK_DOT" === y.type || "TK_RESERVED" === y.type && c(y.text, ["set", "get"]) || !c(z, v) ? [z, "TK_WORD"] : "in" === z ? [z, "TK_OPERATOR"] : [z, "TK_RESERVED"]
                }

                if ("(" === z || "[" === z) return [z, "TK_START_EXPR"];
                if (")" === z || "]" === z) return [z, "TK_END_EXPR"];
                if ("{" === z) return [z, "TK_START_BLOCK"];
                if ("}" === z) return [z, "TK_END_BLOCK"];
                if (";" === z) return [z, "TK_SEMICOLON"];
                if ("/" === z) {
                    var F = "";
                    if ("*" === a.charAt(t)) {
                        t += 1, w.lastIndex = t; var G = w.exec(a);
                        F = "/*" + G[0], t += G[0].length; var H = f(F);
                        return H && "start" === H.ignore && (A.lastIndex = t, G = A.exec(a),
                        F += G[0], t += G[0].length),
                        F = F.replace(k.lineBreak, "\n"),
                        [F, "TK_BLOCK_COMMENT", H]
                    }

                    if ("/" === a.charAt(t)) {
                        t += 1, x.lastIndex = t; var G = x.exec(a);
                        return F = "//" + G[0], t += G[0].length, [F, "TK_COMMENT"]
                    }
                }

                if ("`" === z || "'" === z || '"' === z || ("/" === z || b.e4x && "<" === z && a.slice(t - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === y.type && c(y.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === y.type && ")" === y.text && y.parent && "TK_RESERVED" === y.parent.type && c(y.parent.text, ["if", "while", "for"]) || c(y.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                    var I = z, J = !1, K = !1;
                    if (e = z, "/" === I) for (var L = !1; t < u && (J || L || a.charAt(t) !== I) && !k.newline.test(a.charAt(t)) ;
                    ) e += a.charAt(t),
                    J ? J = !1 : (J = "\\" === a.charAt(t),
                    "[" === a.charAt(t) ? L = !0 : "]" === a.charAt(t) && (L = !1)),
                    t += 1; else
                        if (b.e4x && "<" === I) {
                            var M = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g, N = a.slice(t - 1),
                            O = M.exec(N);

                            if (O && 0 === O.index) {
                                for (var P = O[2], Q = 0; O;) {
                                    var R = !!O[1], S = O[2], T = !!O[O.length - 1] || "![CDATA[" === S.slice(0, 8);

                                    if (S !== P || T || (R ? --Q : ++Q),
                                    Q <= 0) break; O = M.exec(N)
                                }
                                var U = O ? O.index + O[0].length : N.length; return N = N.slice(0, U),
                                t += U - 1, N = N.replace(k.lineBreak, "\n"),
                                [N, "TK_STRING"]
                            }
                        }
                        else for (; t < u && (J || a.charAt(t) !== I && ("`" === I || !k.newline.test(a.charAt(t)))) ;
                        ) (J || "`" === I) && k.newline.test(a.charAt(t)) ? ("\r" === a.charAt(t) && "\n" === a.charAt(t + 1) && (t += 1),
                        e += "\n") : e += a.charAt(t),
                        J ? ("x" !== a.charAt(t) && "u" !== a.charAt(t) || (K = !0),
                        J = !1) : J = "\\" === a.charAt(t),
                        t += 1;
                    if (K && b.unescape_strings && (e = h(e)),
                    t < u && a.charAt(t) === I && (e += I, t += 1, "/" === I)) for (; t < u && k.isIdentifierStart(a.charCodeAt(t)) ;
                    ) e += a.charAt(t),
                    t += 1; return [e, "TK_STRING"]
                }

                if ("#" === z) {
                    if (0 === s.length && "!" === a.charAt(t)) {
                        for (e = z; t < u && "\n" !== z;) z = a.charAt(t),
                        e += z, t += 1; return [d(e) + "\n", "TK_UNKNOWN"]
                    }
                    var V = "#";
                    if (t < u && j.test(a.charAt(t))) {
                        do {
                            z = a.charAt(t),
                            V += z, t += 1
                        }
                        while (t < u && "#" !== z && "=" !== z);
                        return "#" === z || ("[" === a.charAt(t) && "]" === a.charAt(t + 1) ? (V += "[]", t += 2) : "{" === a.charAt(t) && "}" === a.charAt(t + 1) && (V += "{}", t += 2)),
                        [V, "TK_WORD"]
                    }
                }

                if ("<" === z && ("?" === a.charAt(t) || "%" === a.charAt(t))) {
                    B.lastIndex = t - 1; var W = B.exec(a);

                    if (W) return z = W[0], t += z.length - 1, z = z.replace(k.lineBreak, "\n"),
                    [z, "TK_STRING"]
                }

                if ("<" === z && "\x3c!--" === a.substring(t - 1, t + 3)) {
                    for (t += 3, z = "\x3c!--"; !k.newline.test(a.charAt(t)) && t < u;) z += a.charAt(t),
                    t++; return r = !0, [z, "TK_COMMENT"]
                }

                if ("-" === z && r && "--\x3e" === a.substring(t - 1, t + 2)) return r = !1, t += 2, ["--\x3e", "TK_COMMENT"];
                if ("." === z) return [z, "TK_DOT"];
                if (c(z, o)) {
                    for (; t < u && c(z + a.charAt(t),
                    o) && (z += a.charAt(t),
                    !((t += 1) >= u)) ;
                    );
                    return "," === z ? [z, "TK_COMMA"] : "=" === z ? [z, "TK_EQUALS"] : [z, "TK_OPERATOR"]
                }
                return [z, "TK_UNKNOWN"]
            }
            function h(a) {
                for (var b, c = !1, d = "", e = 0, f = "", g = 0; c || e < a.length;)
                    if (b = a.charAt(e),
                    e++, c) {
                        if (c = !1, "x" === b) f = a.substr(e, 2),
                        e += 2; else {
                            if ("u" !== b) { d += "\\" + b; continue }
                            f = a.substr(e, 4),
                            e += 4
                        }

                        if (!f.match(/^[0123456789abcdefABCDEF]+$/)) return a;
                        if ((g = parseInt(f, 16)) >= 0 && g < 32) { d += "x" === b ? "\\x" + f : "\\u" + f; continue }

                        if (34 === g || 39 === g || 92 === g) d += "\\" + String.fromCharCode(g);
                        else {
                            if ("x" === b && g > 126 && g <= 255) return a; d += String.fromCharCode(g)
                        }
                    }
                    else "\\" === b ? c = !0 : d += b; return d
            }
            var i = "\n\r\t ".split(""),
            j = /[0-9]/, l = /[01234567]/, n = /[0123456789abcdefABCDEF]/, o = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
            this.line_starters = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
            var p, q, r, s, t, u, v = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
            w = /([\s\S]*?)((?:\*\/)|$)/g, x = /([^\n\r\u2028\u2029]*)/g, y = /\/\* beautify( \w+[:]\w+)+ \*\//g, z = / (\w+)[:](\w+)/g, A = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g, B = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g; this.tokenize = function () {
                u = a.length, t = 0, r = !1, s = []; for (var b, c, d, e = null, f = [], h = []; !c || "TK_EOF" !== c.type;) {
                    for (d = g(),
                    b = new m(d[1], d[0], p, q) ;
                    "TK_COMMENT" === b.type || "TK_BLOCK_COMMENT" === b.type || "TK_UNKNOWN" === b.type;) "TK_BLOCK_COMMENT" === b.type && (b.directives = d[2]),
                    h.push(b),
                    d = g(),
                    b = new m(d[1], d[0], p, q);
                    h.length && (b.comments_before = h, h = []),
                    "TK_START_BLOCK" === b.type || "TK_START_EXPR" === b.type ? (b.parent = c, f.push(e),
                    e = b) : ("TK_END_BLOCK" === b.type || "TK_END_EXPR" === b.type) && e && ("]" === b.text && "[" === e.text || ")" === b.text && "(" === e.text || "}" === b.text && "{" === e.text) && (b.parent = e.parent, e = f.pop()),
                    s.push(b),
                    c = b
                }
                return s
            }
        }
        var k = {};
        !function (a) {
            var b = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc", c = "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f", d = new RegExp("[" + b + "]"),
            e = new RegExp("[" + b + c + "]");
            a.newline = /[\n\r\u2028\u2029]/, a.lineBreak = new RegExp("\r\n|" + a.newline.source),
            a.allLineBreaks = new RegExp(a.lineBreak.source, "g"),
            a.isIdentifierStart = function (a) { return a < 65 ? 36 === a || 64 === a : a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && d.test(String.fromCharCode(a))) },
            a.isIdentifierChar = function (a) { return a < 48 ? 36 === a : a < 58 || !(a < 65) && (a < 91 || (a < 97 ? 95 === a : a < 123 || a >= 170 && e.test(String.fromCharCode(a)))) }
        }(k);
        var l = { BlockStatement: "BlockStatement", Statement: "Statement", ObjectLiteral: "ObjectLiteral", ArrayLiteral: "ArrayLiteral", ForInitializer: "ForInitializer", Conditional: "Conditional", Expression: "Expression" },
        m = function (a, b, c, d, e, f) { this.type = a, this.text = b, this.comments_before = [], this.newlines = c || 0, this.wanted_newline = c > 0, this.whitespace_before = d || "", this.parent = null, this.directives = null };
        return { run: a }
    }
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        codeMirror: window.CodeMirror, codeMirrorOptions: { lineNumbers: !0, tabMode: "indent", indentWithTabs: !0, lineWrapping: !0, mode: "text/html", tabSize: 2 },
        codeBeautifierOptions: { end_with_newline: !0, indent_inner_html: !0, extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"], brace_style: "expand", indent_char: "\t", indent_size: 1, wrap_line_length: 0 },
        codeViewKeepActiveButtons: ["fullscreen"]
    }),
    a.FE.PLUGINS.codeView = function (b) {
        function c() { return b.$box.hasClass("fr-code-view") }
        function d() { return l ? l.getValue() : k.val() }
        function e(a) {
            var c = d();
            b.html.set(c),
            b.$el.blur(),
            b.$tb.find(" > .fr-command").not(a).removeClass("fr-disabled").attr("aria-disabled", !1),
            a.removeClass("fr-active").attr("aria-pressed", !1),
            b.events.focus(!0),
            b.placeholder.refresh(),
            b.undo.saveStep()
        }
        function f(c) {
            k || (i(),
            !l && b.opts.codeMirror ? l = b.opts.codeMirror.fromTextArea(k.get(0),
            b.opts.codeMirrorOptions) : b.events.$on(k, "keydown keyup change input", function () { b.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = this.scrollHeight + "px") })),
            b.undo.saveStep(),
            b.html.cleanEmptyTags(),
            b.html.cleanWhiteTags(!0),
            b.core.hasFocus() && (b.core.isEmpty() || (b.selection.save(),
            b.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'),
            b.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));
            var d = b.html.get(!1, !0);
            b.$el.find("span.fr-tmp").remove(),
            b.$box.toggleClass("fr-code-view", !0),
            b.core.hasFocus() && b.$el.blur(),
            d = d.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM"),
            d = d.replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"),
            b.codeBeautifier && (d = b.codeBeautifier.run(d, b.opts.codeBeautifierOptions));
            var e, f;
            if (l) {
                e = d.indexOf("FROALA-SM"),
                f = d.indexOf("FROALA-EM"),
                e > f ? e = f : f -= 9, d = d.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "");
                var g = d.substring(0, e).length - d.substring(0, e).replace(/\n/g, "").length, h = d.substring(0, f).length - d.substring(0, f).replace(/\n/g, "").length; e = d.substring(0, e).length - d.substring(0, d.substring(0, e).lastIndexOf("\n") + 1).length, f = d.substring(0, f).length - d.substring(0, d.substring(0, f).lastIndexOf("\n") + 1).length, l.setSize(null, b.opts.height ? b.opts.height : "auto"),
                b.opts.heightMin && b.$box.find(".CodeMirror-scroll").css("min-height", b.opts.heightMin),
                l.setValue(d),
                l.focus(),
                l.setSelection({ line: g, ch: e },
                { line: h, ch: f }),
                l.refresh(),
                l.clearHistory()
            }
            else {
                e = d.indexOf("FROALA-SM"),
                f = d.indexOf("FROALA-EM") - 9, b.opts.heightMin && k.css("min-height", b.opts.heightMin),
                b.opts.height && k.css("height", b.opts.height),
                b.opts.heightMax && k.css("max-height", b.opts.height || b.opts.heightMax),
                k.val(d.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                var j = a(b.o_doc).scrollTop();
                k.focus(),
                k.get(0).setSelectionRange(e, f),
                a(b.o_doc).scrollTop(j)
            }
            b.$tb.find(" > .fr-command").not(c).filter(function () { return b.opts.codeViewKeepActiveButtons.indexOf(a(this).data("cmd")) < 0 }).addClass("fr-disabled").attr("aria-disabled", !0),
            c.addClass("fr-active").attr("aria-pressed", !0),
            !b.helpers.isMobile() && b.opts.toolbarInline && b.toolbar.hide()
        }
        function g(a) {
            void 0 === a && (a = !c());
            var d = b.$tb.find('.fr-command[data-cmd="html"]');
            a ? (b.popups.hideAll(),
            f(d)) : (b.$box.toggleClass("fr-code-view", !1),
            e(d))
        }
        function h() {
            c() && g(!1),
            l && l.toTextArea(),
            k.val("").removeData().remove(),
            k = null, m && (m.remove(),
            m = null)
        }
        function i() {
            k = a('<textarea class="fr-code ignore" tabIndex="-1">'),
            b.$wp.append(k),
            k.attr("dir", b.opts.direction),
            b.$box.hasClass("fr-basic") || (m = a('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (b.helpers.isMobile() ? "" : " fr-desktop") + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'),
            b.$box.append(m),
            b.events.bindClick(b.$box, "a.html-switch", function () { g(!1) }));
            var e = function () { return !c() };
            b.events.on("buttons.refresh", e),
            b.events.on("copy", e, !0),
            b.events.on("cut", e, !0),
            b.events.on("paste", e, !0),
            b.events.on("destroy", h, !0),
            b.events.on("html.set", function () { c() && g(!0) }),
            b.events.on("form.submit", function () {
                c() && (b.html.set(d()),
                b.events.trigger("contentChanged", [], !0))
            },
            !0)
        }
        function j() {
            if (!b.$wp) return !1
        }
        var k, l, m; return { _init: j, toggle: g, isActive: c, get: d }
    },
    a.FE.RegisterCommand("html", {
        title: "Code View", undo: !1, focus: !1, forcedRefresh: !0, toggle: !0, callback: function () { this.codeView.toggle() },
        plugin: "codeView"
    }),
    a.FE.DefineIcon("html", { NAME: "code" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]" }),
    a.extend(a.FE.DEFAULTS, { colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], colorsStep: 7, colorsHEXInput: !0, colorsDefaultTab: "text", colorsButtons: ["colorsBack", "|", "-"] }),
    a.FE.PLUGINS.colors = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="color"]'),
            c = b.popups.get("colors.picker");

            if (c || (c = e()),
            !c.hasClass("fr-active"))
                if (b.popups.setContainer("colors.picker", b.$tb),
                i(c.find(".fr-selected-tab").attr("data-param1")),
                a.is(":visible")) {
                    var d = a.offset().left + a.outerWidth() / 2, f = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("colors.picker", d, f, a.outerHeight())
                }
                else b.position.forSelection(c),
                b.popups.show("colors.picker")
        }
        function d() { b.popups.hide("colors.picker") }
        function e() {
            var a = '<div class="fr-buttons fr-colors-buttons">'; b.opts.toolbarInline && b.opts.colorsButtons.length > 0 && (a += b.button.buildList(b.opts.colorsButtons)),
            a += f() + "</div>"; var c = ""; b.opts.colorsHEXInput && (c = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer-' + b.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-color-hex-layer-text-' + b.id + '" type="text" placeholder="HEX Color" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="customColor" tabIndex="2" role="button">' + b.language.translate("OK") + "</button></div></div>");
            var d = {
                buttons: a, text_colors: g("text"),
                background_colors: g("background"),
                custom_color: c
            },
            e = b.popups.create("colors.picker", d);
            return h(e),
            e
        }
        function f() { var a = '<div class="fr-colors-tabs fr-group">'; return a += '<span class="fr-colors-tab ' + ("background" == b.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != b.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + b.language.translate("Text") + '">' + b.language.translate("Text") + "</span>", (a += '<span class="fr-colors-tab ' + ("background" == b.opts.colorsDefaultTab ? "fr-selected-tab " : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == b.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + b.language.translate("Background") + '">' + b.language.translate("Background") + "</span>") + "</div>" }
        function g(a) {
            for (var c = "text" == a ? b.opts.colorsText : b.opts.colorsBackground, d = '<div class="fr-color-set fr-' + a + "-color" + (b.opts.colorsDefaultTab == a || "text" != b.opts.colorsDefaultTab && "background" != b.opts.colorsDefaultTab && "text" == a ? " fr-selected-set" : "") + '">', e = 0; e < c.length; e++) 0 !== e && e % b.opts.colorsStep == 0 && (d += "<br>"),
            "REMOVE" != c[e] ? d += '<span class="fr-command fr-select-color" style="background: ' + c[e] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + a + 'Color" data-param1="' + c[e] + '"><span class="fr-sr-only">' + b.language.translate("Color") + " " + c[e] + "&nbsp;&nbsp;&nbsp;</span></span>" : d += '<span class="fr-command fr-select-color" data-cmd="' + a + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '">' + b.icon.create("remove") + '<span class="fr-sr-only">' + b.language.translate("Clear Formatting") + "</span></span>"; return d + "</div>"
        }
        function h(c) {
            b.events.on("popup.tab", function (d) {
                var e = a(d.currentTarget);

                if (!b.popups.isVisible("colors.picker") || !e.is("span")) return !0; var f = d.which, g = !0;
                if (a.FE.KEYCODE.TAB == f) {
                    var h = c.find(".fr-buttons");
                    g = !b.accessibility.focusToolbar(h, !!d.shiftKey)
                }
                else
                    if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                        if (e.is("span.fr-select-color")) {
                            var i = e.parent().find("span.fr-select-color"),
                            j = i.index(e),
                            k = b.opts.colorsStep, l = Math.floor(i.length / k),
                            m = j % k, n = Math.floor(j / k),
                            o = n * k + m, p = l * k; a.FE.KEYCODE.ARROW_UP == f ? o = ((o - k) % p + p) % p : a.FE.KEYCODE.ARROW_DOWN == f ? o = (o + k) % p : a.FE.KEYCODE.ARROW_LEFT == f ? o = ((o - 1) % p + p) % p : a.FE.KEYCODE.ARROW_RIGHT == f && (o = (o + 1) % p);
                            var q = a(i.get(o));
                            b.events.disableBlur(),
                            q.focus(),
                            g = !1
                        }
                    }
                    else a.FE.KEYCODE.ENTER == f && (b.button.exec(e),
                    g = !1);
                return !1 === g && (d.preventDefault(),
                d.stopPropagation()),
                g
            },
            !0)
        }
        function i(c) {
            var d, e = b.popups.get("colors.picker"),
            f = a(b.selection.element());
            d = "background" == c ? "background-color" : "color"; var g = e.find(".fr-" + c + "-color .fr-select-color");
            for (g.find(".fr-selected-color").remove(),
            g.removeClass("fr-active-item"),
            g.not('[data-param1="REMOVE"]').attr("aria-selected", !1) ;
            f.get(0) != b.el;) {
                if ("transparent" != f.css(d) && "rgba(0, 0, 0, 0)" != f.css(d)) {
                    var h = e.find(".fr-" + c + '-color .fr-select-color[data-param1="' + b.helpers.RGBToHex(f.css(d)) + '"]');
                    h.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'),
                    h.addClass("fr-active-item").attr("aria-selected", !0);
                    break
                }
                f = f.parent()
            }
            var i = e.find(".fr-color-hex-layer input");
            i.length && i.val(b.helpers.RGBToHex(f.css(d))).trigger("change")
        }
        function j(a, c) {
            a.hasClass("fr-selected-tab") || (a.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1),
            a.addClass("fr-selected-tab").attr("aria-pressed", !0),
            a.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"),
            a.parents(".fr-popup").find(".fr-color-set.fr-" + c + "-color").addClass("fr-selected-set"),
            i(c)),
            b.accessibility.focusPopup(a.parents(".fr-popup"))
        }
        function k(a) {
            "REMOVE" != a ? b.format.applyStyle("background-color", b.helpers.HEXtoRGB(a)) : b.format.removeStyle("background-color"),
            d()
        }
        function l(a) {
            "REMOVE" != a ? b.format.applyStyle("color", b.helpers.HEXtoRGB(a)) : b.format.removeStyle("color"),
            d()
        }
        function m() {
            b.popups.hide("colors.picker"),
            b.toolbar.showInline()
        }
        function n() {
            var a = b.popups.get("colors.picker"),
            c = a.find(".fr-color-hex-layer input");

            if (c.length) {
                var d = c.val();
                "background" == a.find(".fr-selected-tab").attr("data-param1") ? k(d) : l(d)
            }
        }
        return { showColorsPopup: c, hideColorsPopup: d, changeSet: j, background: k, customColor: n, text: l, back: m }
    },
    a.FE.DefineIcon("colors", { NAME: "tint" }),
    a.FE.RegisterCommand("color", {
        title: "Colors", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("colors.picker")) : this.colors.showColorsPopup()
        },
        plugin: "colors"
    }),
    a.FE.RegisterCommand("textColor", { undo: !0, callback: function (a, b) { this.colors.text(b) } }),
    a.FE.RegisterCommand("backgroundColor", { undo: !0, callback: function (a, b) { this.colors.background(b) } }),
    a.FE.RegisterCommand("colorChangeSet", {
        undo: !1, focus: !1, callback: function (a, b) {
            var c = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + a + '"][data-param1="' + b + '"]');
            this.colors.changeSet(c, b)
        }
    }),
    a.FE.DefineIcon("colorsBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("colorsBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.colors.back() } }),
    a.FE.RegisterCommand("customColor", { title: "OK", undo: !0, callback: function () { this.colors.customColor() } }),
    a.FE.DefineIcon("remove", { NAME: "eraser" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { dragInline: !0 }),
    a.FE.PLUGINS.draggable = function (b) {
        function c(c) {
            return !(!c.originalEvent || !c.originalEvent.target || c.originalEvent.target.nodeType != Node.TEXT_NODE) || (c.target && "A" == c.target.tagName && 1 == c.target.childNodes.length && "IMG" == c.target.childNodes[0].tagName && (c.target = c.target.childNodes[0]),
            a(c.target).hasClass("fr-draggable") ? (b.undo.canDo() || b.undo.saveStep(),
            b.opts.dragInline ? b.$el.attr("contenteditable", !0) : b.$el.attr("contenteditable", !1),
            b.opts.toolbarInline && b.toolbar.hide(),
            a(c.target).addClass("fr-dragging"),
            b.browser.msie || b.browser.edge || b.selection.clear(),
            void c.originalEvent.dataTransfer.setData("text", "Froala")) : (c.preventDefault(),
            !1))
        }
        function d(a) { return !(a && ("HTML" == a.tagName || "BODY" == a.tagName || b.node.isElement(a))) }
        function e(a, c, d) {
            b.opts.iframe && (a += b.$iframe.offset().top, c += b.$iframe.offset().left),
            n.offset().top != a && n.css("top", a),
            n.offset().left != c && n.css("left", c),
            n.width() != d && n.css("width", d)
        }
        function f(c) {
            var f = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset);

            if (!d(f)) {
                for (var g = 0, h = f; !d(h) && h == f && c.originalEvent.pageY - b.win.pageYOffset - g > 0;) g++, h = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset - g);
                (!d(h) || n && 0 === b.$el.find(h).length && h != n.get(0)) && (h = null);
                for (var i = 0, j = f; !d(j) && j == f && c.originalEvent.pageY - b.win.pageYOffset + i < a(b.doc).height() ;
                ) i++, j = b.doc.elementFromPoint(c.originalEvent.pageX - b.win.pageXOffset, c.originalEvent.pageY - b.win.pageYOffset + i);
                (!d(j) || n && 0 === b.$el.find(j).length && j != n.get(0)) && (j = null),
                f = null == j && h ? h : j && null == h ? j : j && h ? g < i ? h : j : null
            }

            if (a(f).hasClass("fr-drag-helper")) return !1;
            if (f && !b.node.isBlock(f) && (f = b.node.blockParent(f)),
            f && ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(f.tagName) >= 0 && (f = a(f).parents("table").get(0)),
            f && ["LI"].indexOf(f.tagName) >= 0 && (f = a(f).parents("UL, OL").get(0)),
            f && !a(f).hasClass("fr-drag-helper")) {
                n || (a.FE.$draggable_helper || (a.FE.$draggable_helper = a('<div class="fr-drag-helper"></div>')),
                n = a.FE.$draggable_helper, b.events.on("shared.destroy", function () {
                    n.html("").removeData().remove(),
                    n = null
                },
                !0));
                var k; k = c.originalEvent.pageY < a(f).offset().top + a(f).outerHeight() / 2; var l = a(f),
                m = 0; k || 0 !== l.next().length ? (k || (l = l.next()),
                "before" == n.data("fr-position") && l.is(n.data("fr-tag")) || (l.prev().length > 0 && (m = parseFloat(l.prev().css("margin-bottom")) || 0),
                m = Math.max(m, parseFloat(l.css("margin-top")) || 0),
                e(l.offset().top - m / 2 - b.$box.offset().top, l.offset().left - b.win.pageXOffset - b.$box.offset().left, l.width()),
                n.data("fr-position", "before"))) : "after" == n.data("fr-position") && l.is(n.data("fr-tag")) || (m = parseFloat(l.css("margin-bottom")) || 0, e(l.offset().top + a(f).height() + m / 2 - b.$box.offset().top, l.offset().left - b.win.pageXOffset - b.$box.offset().left, l.width()),
                n.data("fr-position", "after")),
                n.data("fr-tag", l),
                n.addClass("fr-visible"),
                n.appendTo(b.$box)
            }
            else n && b.$box.find(n).length > 0 && n.removeClass("fr-visible")
        }
        function g(a) {
            a.originalEvent.dataTransfer.dropEffect = "move", b.opts.dragInline ? j() || !b.browser.msie && !b.browser.edge || a.preventDefault() : (a.preventDefault(),
            f(a))
        }
        function h(a) { a.originalEvent.dataTransfer.dropEffect = "move", b.opts.dragInline || a.preventDefault() }
        function i(a) {
            b.$el.attr("contenteditable", !0);
            var c = b.$el.find(".fr-dragging");
            n && n.hasClass("fr-visible") && b.$box.find(n).length ? k(a) : c.length && (a.preventDefault(),
            a.stopPropagation()),
            n && b.$box.find(n).length && n.removeClass("fr-visible"),
            c.removeClass("fr-dragging")
        }
        function j() {
            for (var b = null, c = 0; c < a.FE.INSTANCES.length; c++)
                if (b = a.FE.INSTANCES[c].$el.find(".fr-dragging"),
                b.length) return b.get(0)
        }
        function k(c) {
            for (var d, e, f = 0; f < a.FE.INSTANCES.length; f++)
                if (d = a.FE.INSTANCES[f].$el.find(".fr-dragging"),
                d.length) { e = a.FE.INSTANCES[f]; break }

            if (d.length) {
                if (c.preventDefault(),
                c.stopPropagation(),
                n && n.hasClass("fr-visible") && b.$box.find(n).length) n.data("fr-tag")[n.data("fr-position")]('<span class="fr-marker"></span>'),
                n.removeClass("fr-visible");
                else {
                    if (!1 === b.markers.insertAtPoint(c.originalEvent)) return !1
                }

                if (!1 === (d = b.events.chainTrigger("element.beforeDrop", d))) return !1; d.removeClass("fr-dragging");
                var g = d;
                if (d.parent().is("A") && (g = d.parent()),
                b.core.isEmpty()) b.events.focus();
                else {
                    b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),
                    b.selection.restore()
                }

                if (e == b || b.undo.canDo() || b.undo.saveStep(),
                b.core.isEmpty()) b.$el.html(g);
                else {
                    var h = b.markers.insert();
                    0 === g.find(h).length ? a(h).replaceWith(g) : a(h).replaceWith(d),
                    d.after(a.FE.MARKERS),
                    b.selection.restore()
                }
                return b.popups.hideAll(),
                b.selection.save(),
                b.$el.find(b.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(),
                b.html.wrap(),
                b.html.fillEmptyBlocks(),
                b.selection.restore(),
                b.undo.saveStep(),
                b.opts.iframe && b.size.syncIframe(),
                e != b && (e.popups.hideAll(),
                e.$el.find(e.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(),
                e.html.wrap(),
                e.html.fillEmptyBlocks(),
                e.undo.saveStep(),
                e.events.trigger("element.dropped"),
                e.opts.iframe && e.size.syncIframe()),
                b.events.trigger("element.dropped", [g]),
                !1
            }
            n && n.removeClass("fr-visible"),
            b.undo.canDo() || b.undo.saveStep(),
            setTimeout(function () { b.undo.saveStep() },
            0)
        }
        function l(a) {
            if (a && "DIV" == a.tagName && b.node.hasClass(a, "fr-drag-helper")) a.parentNode.removeChild(a);
            else
                if (a && a.nodeType == Node.ELEMENT_NODE) for (var c = a.querySelectorAll("div.fr-drag-helper"),
                d = 0; d < c.length; d++) c[d].parentNode.removeChild(c[d])
        }
        function m() {
            b.opts.enter == a.FE.ENTER_BR && (b.opts.dragInline = !0),
            b.events.on("dragstart", c, !0),
            b.events.on("dragover", g, !0),
            b.events.on("dragenter", h, !0),
            b.events.on("document.dragend", i, !0),
            b.events.on("document.drop", i, !0),
            b.events.on("drop", k, !0),
            b.events.on("html.processGet", l)
        }
        var n; return { _init: m }
    }
});

/*eslint eqeqeq: "error"*/

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),
a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{emoticons:"[_BUTTONS_][_EMOTICONS_]"}),
a.extend(a.FE.DEFAULTS,{emoticonsStep:8,emoticonsSet:[{code:"1f600",desc:"Grinning face"},
{code:"1f601",desc:"Grinning face with smiling eyes"},
{code:"1f602",desc:"Face with tears of joy"},
{code:"1f603",desc:"Smiling face with open mouth"},
{code:"1f604",desc:"Smiling face with open mouth and smiling eyes"},
{code:"1f605",desc:"Smiling face with open mouth and cold sweat"},
{code:"1f606",desc:"Smiling face with open mouth and tightly-closed eyes"},
{code:"1f607",desc:"Smiling face with halo"},
{code:"1f608",desc:"Smiling face with horns"},
{code:"1f609",desc:"Winking face"},
{code:"1f60a",desc:"Smiling face with smiling eyes"},
{code:"1f60b",desc:"Face savoring delicious food"},
{code:"1f60c",desc:"Relieved face"},
{code:"1f60d",desc:"Smiling face with heart-shaped eyes"},
{code:"1f60e",desc:"Smiling face with sunglasses"},
{code:"1f60f",desc:"Smirking face"},
{code:"1f610",desc:"Neutral face"},
{code:"1f611",desc:"Expressionless face"},
{code:"1f612",desc:"Unamused face"},
{code:"1f613",desc:"Face with cold sweat"},
{code:"1f614",desc:"Pensive face"},
{code:"1f615",desc:"Confused face"},
{code:"1f616",desc:"Confounded face"},
{code:"1f617",desc:"Kissing face"},
{code:"1f618",desc:"Face throwing a kiss"},
{code:"1f619",desc:"Kissing face with smiling eyes"},
{code:"1f61a",desc:"Kissing face with closed eyes"},
{code:"1f61b",desc:"Face with stuck out tongue"},
{code:"1f61c",desc:"Face with stuck out tongue and winking eye"},
{code:"1f61d",desc:"Face with stuck out tongue and tightly-closed eyes"},
{code:"1f61e",desc:"Disappointed face"},
{code:"1f61f",desc:"Worried face"},
{code:"1f620",desc:"Angry face"},
{code:"1f621",desc:"Pouting face"},
{code:"1f622",desc:"Crying face"},
{code:"1f623",desc:"Persevering face"},
{code:"1f624",desc:"Face with look of triumph"},
{code:"1f625",desc:"Disappointed but relieved face"},
{code:"1f626",desc:"Frowning face with open mouth"},
{code:"1f627",desc:"Anguished face"},
{code:"1f628",desc:"Fearful face"},
{code:"1f629",desc:"Weary face"},
{code:"1f62a",desc:"Sleepy face"},
{code:"1f62b",desc:"Tired face"},
{code:"1f62c",desc:"Grimacing face"},
{code:"1f62d",desc:"Loudly crying face"},
{code:"1f62e",desc:"Face with open mouth"},
{code:"1f62f",desc:"Hushed face"},
{code:"1f630",desc:"Face with open mouth and cold sweat"},
{code:"1f631",desc:"Face screaming in fear"},
{code:"1f632",desc:"Astonished face"},
{code:"1f633",desc:"Flushed face"},
{code:"1f634",desc:"Sleeping face"},
{code:"1f635",desc:"Dizzy face"},
{code:"1f636",desc:"Face without mouth"},
{code:"1f637",desc:"Face with medical mask"}],emoticonsButtons:["emoticonsBack","|"],emoticonsUseImage:!0}),
a.FE.PLUGINS.emoticons=function(b){function c(){var a=b.$tb.find('.fr-command[data-cmd="emoticons"]'),
c=b.popups.get("emoticons");

    if(c||(c=e()),
    !c.hasClass("fr-active")){b.popups.refresh("emoticons"),
    b.popups.setContainer("emoticons",b.$tb);
        var d=a.offset().left+a.outerWidth()/2,f=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);
        b.popups.show("emoticons",d,f,a.outerHeight())}}
    function d(){b.popups.hide("emoticons")}
    function e(){var a="";b.opts.toolbarInline&&b.opts.emoticonsButtons.length>0&&(a='<div class="fr-buttons fr-emoticons-buttons">'+b.button.buildList(b.opts.emoticonsButtons)+"</div>");
        var c={buttons:a,emoticons:g()},
        d=b.popups.create("emoticons",c);
        return b.tooltip.bind(d,".fr-emoticon"),
        h(d),
        d}
    function f(){
        if(!b.selection.isCollapsed())return!1;var a=b.selection.element(),
        c=b.selection.endElement();

        if(a&&b.node.hasClass(a,"fr-emoticon"))return a;
        if(c&&b.node.hasClass(c,"fr-emoticon"))return c;var d=b.selection.ranges(0),
        e=d.startContainer;
        if(e.nodeType==Node.ELEMENT_NODE&&e.childNodes.length>0&&d.startOffset>0){var f=e.childNodes[d.startOffset-1];
            if(b.node.hasClass(f,"fr-emoticon"))return f}
        return!1}
    function g(){for(var a='<div style="text-align: center">',c=0;c<b.opts.emoticonsSet.length;c++)0!==c&&c%b.opts.emoticonsStep==0&&(a+="<br>"),
    a+='<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="'+b.language.translate(b.opts.emoticonsSet[c].desc)+'" role="button" data-param1="'+b.opts.emoticonsSet[c].code+'">'+(b.opts.emoticonsUseImage?'<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/'+b.opts.emoticonsSet[c].code+'.svg"/>':"&#x"+b.opts.emoticonsSet[c].code+";")+'<span class="fr-sr-only">'+b.language.translate(b.opts.emoticonsSet[c].desc)+"&nbsp;&nbsp;&nbsp;</span></span>";return b.opts.emoticonsUseImage&&(a+='<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'),
    a+="</div>"}
    function h(c){b.events.on("popup.tab",function(d){var e=a(d.currentTarget);

        if(!b.popups.isVisible("emoticons")||!e.is("span, a"))return!0;var f,g,h,i=d.which;
        if(a.FE.KEYCODE.TAB==i){
            if(e.is("span.fr-emoticon")&&d.shiftKey||e.is("a")&&!d.shiftKey){var j=c.find(".fr-buttons");
                f=!b.accessibility.focusToolbar(j,!!d.shiftKey)}

            if(!1!==f){var k=c.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");
                e.is("span.fr-emoticon")&&(k=k.not("span.fr-emoticon:not(:focus)")),
                g=k.index(e),
                g=d.shiftKey?((g-1)%k.length+k.length)%k.length:(g+1)%k.length,h=k.get(g),
                b.events.disableBlur(),
                h.focus(),
                f=!1}}
        else 
            if(a.FE.KEYCODE.ARROW_UP==i||a.FE.KEYCODE.ARROW_DOWN==i||a.FE.KEYCODE.ARROW_LEFT==i||a.FE.KEYCODE.ARROW_RIGHT==i){
                if(e.is("span.fr-emoticon")){var l=e.parent().find("span.fr-emoticon");
                    g=l.index(e);
                    var m=b.opts.emoticonsStep,n=Math.floor(l.length/m),
                    o=g%m,p=Math.floor(g/m),
                    q=p*m+o,r=n*m;a.FE.KEYCODE.ARROW_UP==i?q=((q-m)%r+r)%r:a.FE.KEYCODE.ARROW_DOWN==i?q=(q+m)%r:a.FE.KEYCODE.ARROW_LEFT==i?q=((q-1)%r+r)%r:a.FE.KEYCODE.ARROW_RIGHT==i&&(q=(q+1)%r),
                    h=a(l.get(q)),
                    b.events.disableBlur(),
                    h.focus(),
                    f=!1}}
            else a.FE.KEYCODE.ENTER==i&&(e.is("a")?e[0].click():b.button.exec(e),
            f=!1);
        return!1===f&&(d.preventDefault(),
        d.stopPropagation()),
        f},
    !0)}
    function i(c,d){var e=f(),
    g=b.selection.ranges(0);
        e?(0===g.startOffset&&b.selection.element()===e?a(e).before(a.FE.MARKERS+a.FE.INVISIBLE_SPACE):g.startOffset>0&&b.selection.element()===e&&g.commonAncestorContainer.parentNode.classList.contains("fr-emoticon")&&a(e).after(a.FE.INVISIBLE_SPACE+a.FE.MARKERS),
        b.selection.restore(),
        b.html.insert('<span class="fr-emoticon fr-deletable'+(d?" fr-emoticon-img":"")+'"'
            +(d?' style="background: url('+d+');"':"")+">"+
            (d?"&nbsp;":c)+"</span>&nbsp;"+a.FE.MARKERS,!0)):b.html.insert('<span class="fr-emoticon fr-deletable'+
            (d?" fr-emoticon-img":"")+'"'+(d?' style="background: url('+d+');"':"")+">"+(d?"&nbsp;":c)+"</span>&nbsp;",!0)}
    function j(){b.popups.hide("emoticons"),
    b.toolbar.showInline()}
    function k(){var c=function(){for(var a=b.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"),
    c=0;c<a.length;c++)a[c].className+=" fr-deletable"};
        c(),
        b.events.on("html.set",c),
        b.events.on("keydown",function(c){
            if(b.keys.isCharacter(c.which)&&b.selection.inEditor()){var d=b.selection.ranges(0),
            e=f();
                b.node.hasClass(e,"fr-emoticon-img")&&e&&(0===d.startOffset&&b.selection.element()===e?a(e).before(a.FE.MARKERS+a.FE.INVISIBLE_SPACE):a(e).after(a.FE.INVISIBLE_SPACE+a.FE.MARKERS),
                b.selection.restore())}}),
        b.events.on("keyup",function(c){for(var d=b.el.querySelectorAll(".fr-emoticon"),
        e=0;e<d.length;e++)void 0!==d[e].textContent&&0===d[e].textContent.replace(/\u200B/gi,"").length&&a(d[e]).remove();

            if(!(c.which>=a.FE.KEYCODE.ARROW_LEFT&&c.which<=a.FE.KEYCODE.ARROW_DOWN)){var g=f();
                b.node.hasClass(g,"fr-emoticon-img")&&(a(g).append(a.FE.MARKERS),
                b.selection.restore())}})}
    return{_init:k,insert:i,showEmoticonsPopup:c,hideEmoticonsPopup:d,back:j}},
a.FE.DefineIcon("emoticons",{NAME:"smile-o"}),
a.FE.RegisterCommand("emoticons",{title:"Emoticons",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("emoticons")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),
this.selection.restore()),
this.popups.hide("emoticons")):this.emoticons.showEmoticonsPopup()},
    plugin:"emoticons"}),
a.FE.RegisterCommand("insertEmoticon",{callback:function(a,b){this.emoticons.insert("&#x"+b+";",this.opts.emoticonsUseImage?"https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/"+b+".svg":null),
this.emoticons.hideEmoticonsPopup()}}),
a.FE.DefineIcon("emoticonsBack",{NAME:"arrow-left"}),
a.FE.RegisterCommand("emoticonsBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.emoticons.back()}})});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;" }),
    a.FE.PLUGINS.entities = function (b) {
        function c(a) {
            var b = a.textContent;
            if (b.match(g)) { for (var c = "", d = 0; d < b.length; d++) h[b[d]] ? c += h[b[d]] : c += b[d]; a.textContent = c }
        }
        function d(a) {
            if (a && ["STYLE", "SCRIPT", "svg", "IFRAME"].indexOf(a.tagName) >= 0) return !0; for (var e = b.node.contents(a),
            f = 0; f < e.length; f++) e[f].nodeType == Node.TEXT_NODE ? c(e[f]) : d(e[f]);
            a.nodeType == Node.TEXT_NODE && c(a)
        }
        function e(a) { return 0 === a.length ? "" : b.clean.exec(a, d).replace(/\&amp;/g, "&") }
        function f() {
            b.opts.htmlSimpleAmpersand || (b.opts.entities = b.opts.entities + "&amp;");
            var c = a("<div>").html(b.opts.entities).text(),
            d = b.opts.entities.split(";");
            h = {},
            g = ""; for (var f = 0; f < c.length; f++) {
                var i = c.charAt(f);
                h[i] = d[f] + ";", g += "\\" + i + (f < c.length - 1 ? "|" : "")
            }
            g = new RegExp("(" + g + ")", "g"),
            b.events.on("html.get", e, !0)
        }
        var g, h; return { _init: f }
    }
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]" }),
    a.extend(a.FE.DEFAULTS, {
        fileUploadURL: "/FileApi/upload", fileUploadParam: "file", fileUploadParams: {},
        fileUploadToS3: !1, fileUploadMethod: "POST", fileMaxSize: 10485760, fileAllowedTypes: ["*"], fileInsertButtons: ["fileBack", "|"], fileUseSelectedText: !1
    }),
    a.FE.PLUGINS.file = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertFile"]'),
            c = b.popups.get("file.insert");

            if (c || (c = s()),
            e(),
            !c.hasClass("fr-active"))
                if (b.popups.refresh("file.insert"),
                b.popups.setContainer("file.insert", b.$tb),
                a.is(":visible")) {
                    var d = a.offset().left + a.outerWidth() / 2, f = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("file.insert", d, f, a.outerHeight())
                }
                else b.position.forSelection(c),
                b.popups.show("file.insert")
        }
        function d() {
            var a = b.popups.get("file.insert");
            a || (a = s()),
            a.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),
            a.find(".fr-file-progress-bar-layer").addClass("fr-active"),
            a.find(".fr-buttons").hide(),
            f(b.language.translate("Uploading"),
            0)
        }
        function e(a) {
            var c = b.popups.get("file.insert");
            c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),
            c.find(".fr-file-progress-bar-layer").removeClass("fr-active"),
            c.find(".fr-buttons").show(),
            a && (b.events.focus(),
            b.popups.hide("file.insert")))
        }
        function f(a, c) {
            var d = b.popups.get("file.insert");

            if (d) {
                var e = d.find(".fr-file-progress-bar-layer");
                e.find("h3").text(a + (c ? " " + c + "%" : "")),
                e.removeClass("fr-error"),
                c ? (e.find("div").removeClass("fr-indeterminate"),
                e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
            }
        }
        function g(a) {
            d();
            var c = b.popups.get("file.insert"),
            e = c.find(".fr-file-progress-bar-layer");
            e.addClass("fr-error");
            var f = e.find("h3");
            f.text(a),
            b.events.disableBlur(),
            f.focus()
        }
        function h(a, c, d) {
            b.edit.on(),
            b.events.focus(!0),
            b.selection.restore(),
            b.opts.fileUseSelectedText && b.selection.text().length && (c = b.selection.text()),
            b.html.insert('<a href="' + a + '" id="fr-inserted-file" class="fr-file">' + c + "</a>");
            var e = b.$el.find("#fr-inserted-file");
            e.removeAttr("id"),
            b.popups.hide("file.insert"),
            b.undo.saveStep(),
            x(),
            b.events.trigger("file.inserted", [e, d])
        }
        function i(a) {
            try {
                if (!1 === b.events.trigger("file.uploaded", [a], !0)) return b.edit.on(),
                !1; var c = JSON.parse(a);
                return c.link ? c : (n(z, a),
                !1)
            }
            catch (d) {
                return n(B, a),
                !1
            }
        }
        function j(c) {
            try {
                var d = a(c).find("Location").text(),
                e = a(c).find("Key").text();
                return !1 === b.events.trigger("file.uploadedToS3", [d, e, c], !0) ? (b.edit.on(),
                !1) : d
            }
            catch (f) {
                return n(B, c),
                !1
            }
        }
        function k(a) {
            var c = this.status, d = this.response, e = this.responseXML, f = this.responseText; try {
                if (b.opts.fileUploadToS3)
                    if (201 == c) {
                        var g = j(e);
                        g && h(g, a, d || e)
                    }
                    else n(B, d || e);
                else
                    if (c >= 200 && c < 300) {
                        var k = i(f);
                        k && h(k.link, a, d || f)
                    }
                    else n(A, d || f)
            }
            catch (l) { n(B, d || f) }
        }
        function l() { n(B, this.response || this.responseText || this.responseXML) }
        function m(a) {
            if (a.lengthComputable) {
                var c = a.loaded / a.total * 100 | 0; f(b.language.translate("Uploading"),
                c)
            }
        }
        function n(a, c) {
            b.edit.on(),
            g(b.language.translate("Something went wrong. Please try again.")),
            b.events.trigger("file.error", [{ code: a, message: E[a] },
            c])
        }
        function o() {
            b.edit.on(),
            e(!0)
        }
        function p(a) {
            if (void 0 !== a && a.length > 0) {
                if (!1 === b.events.trigger("file.beforeUpload", [a])) return !1; var c = a[0];
                if (c.size > b.opts.fileMaxSize) return n(C),
                !1;
                if (b.opts.fileAllowedTypes.indexOf("*") < 0 && b.opts.fileAllowedTypes.indexOf(c.type.replace(/file\//g, "")) < 0) return n(D),
                !1; var e;
                if (b.drag_support.formdata && (e = b.drag_support.formdata ? new FormData : null),
                e) {
                    var f;
                    if (!1 !== b.opts.fileUploadToS3) {
                        e.append("key", b.opts.fileUploadToS3.keyStart + (new Date).getTime() + "-" + (c.name || "untitled")),
                        e.append("success_action_status", "201"),
                        e.append("X-Requested-With", "xhr"),
                        e.append("Content-Type", c.type);
                        for (f in b.opts.fileUploadToS3.params) b.opts.fileUploadToS3.params.hasOwnProperty(f) && e.append(f, b.opts.fileUploadToS3.params[f])
                    }
                    for (f in b.opts.fileUploadParams) b.opts.fileUploadParams.hasOwnProperty(f) && e.append(f, b.opts.fileUploadParams[f]);
                    e.append(b.opts.fileUploadParam, c);
                    var g = b.opts.fileUploadURL; b.opts.fileUploadToS3 && (g = b.opts.fileUploadToS3.uploadURL ? b.opts.fileUploadToS3.uploadURL : "https://" + b.opts.fileUploadToS3.region + ".amazonaws.com/" + b.opts.fileUploadToS3.bucket);
                    var h = b.core.getXHR(g, b.opts.fileUploadMethod);
                    h.onload = function () { k.call(h, c.name) },
                    h.onerror = l, h.upload.onprogress = m, h.onabort = o, d(),
                    b.edit.off();
                    var i = b.popups.get("file.insert");
                    i && i.off("abortUpload").on("abortUpload", function () { 4 != h.readyState && h.abort() }),
                    h.send(e)
                }
            }
        }
        function q(c) {
            b.events.$on(c, "dragover dragenter", ".fr-file-upload-layer", function () {
                return a(this).addClass("fr-drop"),
                !1
            },
            !0),
            b.events.$on(c, "dragleave dragend", ".fr-file-upload-layer", function () {
                return a(this).removeClass("fr-drop"),
                !1
            },
            !0),
            b.events.$on(c, "drop", ".fr-file-upload-layer", function (d) {
                d.preventDefault(),
                d.stopPropagation(),
                a(this).removeClass("fr-drop");
                var e = d.originalEvent.dataTransfer;
                if (e && e.files) { (c.data("instance") || b).file.upload(e.files) }
            },
            !0),
            b.helpers.isIOS() && b.events.$on(c, "touchstart", '.fr-file-upload-layer input[type="file"]', function () { a(this).trigger("click") }),
            b.events.$on(c, "change", '.fr-file-upload-layer input[type="file"]', function () {
                if (this.files) { (c.data("instance") || b).file.upload(this.files) }
                a(this).val("")
            },
            !0)
        }
        function r() { e() }
        function s(a) {
            if (a) return b.popups.onHide("file.insert", r),
            !0; var c = ""; c = '<div class="fr-buttons">' + b.button.buildList(b.opts.fileInsertButtons) + "</div>"; var d = ""; d = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-' + b.id + '"><strong>' + b.language.translate("Drop file") + "</strong><br>(" + b.language.translate("or click") + ')<div class="fr-form"><input type="file" name="' + b.opts.fileUploadParam + '" accept="/*" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + b.id + '" role="button"></div></div>'; var e = '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>', f = { buttons: c, upload_layer: d, progress_bar: e },
            g = b.popups.create("file.insert", f);
            return q(g),
            g
        }
        function t(a) { b.node.hasClass(a, "fr-file") }
        function u(c) {
            var e = c.originalEvent.dataTransfer;
            if (e && e.files && e.files.length) {
                var f = e.files[0];
                if (f && void 0 !== f.type && f.type.indexOf("image") < 0 && (b.opts.fileAllowedTypes.indexOf(f.type) >= 0 || b.opts.fileAllowedTypes.indexOf("*") >= 0)) {
                    b.markers.remove(),
                    b.markers.insertAtPoint(c.originalEvent),
                    b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),
                    b.popups.hideAll();
                    var g = b.popups.get("file.insert");
                    return g || (g = s()),
                    b.popups.setContainer("file.insert", b.$sc),
                    b.popups.show("file.insert", c.originalEvent.pageX, c.originalEvent.pageY),
                    d(),
                    p(e.files),
                    c.preventDefault(),
                    c.stopPropagation(),
                    !1
                }
            }
        }
        function v() {
            b.events.on("drop", u),
            b.events.$on(b.$win, "keydown", function (c) {
                var d = c.which, e = b.popups.get("file.insert");
                e && d == a.FE.KEYCODE.ESC && e.trigger("abortUpload")
            }),
            b.events.on("destroy", function () {
                var a = b.popups.get("file.insert");
                a && a.trigger("abortUpload")
            })
        }
        function w() {
            b.events.disableBlur(),
            b.selection.restore(),
            b.events.enableBlur(),
            b.popups.hide("file.insert"),
            b.toolbar.showInline()
        }
        function x() {
            var a, c = Array.prototype.slice.call(b.el.querySelectorAll("a.fr-file")),
            d = []; for (a = 0; a < c.length; a++) d.push(c[a].getAttribute("href"));

            if (F) for (a = 0; a < F.length; a++) d.indexOf(F[a].getAttribute("href")) < 0 && b.events.trigger("file.unlink", [F[a]]);
            F = c
        }
        function y() {
            v(),
            b.events.on("link.beforeRemove", t),
            b.$wp && (x(),
            b.events.on("contentChanged", x)),
            s(!0)
        }
        var z = 2, A = 3, B = 4, C = 5, D = 6, E = {};
        E[1] = "File cannot be loaded from the passed link.", E[z] = "No link in upload response.", E[A] = "Error during file upload.", E[B] = "Parsing response failed.", E[C] = "File is too large.", E[D] = "File file type is invalid.", E[7] = "Files can be uploaded only to same domain in IE 8 and IE 9."; var F; return { _init: y, showInsertPopup: c, upload: p, insert: h, back: w, hideProgressBar: e }
    },
    a.FE.DefineIcon("insertFile", { NAME: "file-o" }),
    a.FE.RegisterCommand("insertFile", {
        title: "Upload File", undo: !1, focus: !0, refreshAfterCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("file.insert")) : this.file.showInsertPopup()
        },
        plugin: "file"
    }),
    a.FE.DefineIcon("fileBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("fileBack", {
        title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.file.back() },
        refresh: function (a) {
            this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
            a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
            a.next(".fr-separator").addClass("fr-hidden"))
        }
    }),
    a.FE.RegisterCommand("fileDismissError", { title: "OK", callback: function () { this.file.hideProgressBar(!0) } })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        fontFamily: { "Arial,Helvetica,sans-serif": "Arial", "Georgia,serif": "Georgia", "Impact,Charcoal,sans-serif": "Impact", "Tahoma,Geneva,sans-serif": "Tahoma", "Times New Roman,Times,serif,-webkit-standard": "Times New Roman", "Verdana,Geneva,sans-serif": "Verdana" },
        fontFamilySelection: !1, fontFamilyDefaultSelection: "Font Family"
    }),
    a.FE.PLUGINS.fontFamily = function (b) {
        function c(a) { b.format.applyStyle("font-family", a) }
        function d(a, b) {
            b.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1),
            b.find('.fr-command[data-param1="' + g() + '"]').addClass("fr-active").attr("aria-selected", !0);
            var c = b.find(".fr-dropdown-list"),
            d = b.find(".fr-active").parent();
            d.length ? c.parent().scrollTop(d.offset().top - c.offset().top - (c.parent().outerHeight() / 2 - d.outerHeight() / 2)) : c.parent().scrollTop(0)
        }
        function e(b) {
            var c = b.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
            return a.grep(c, function (a) { return a.length > 0 })
        }
        function f(a, b) {
            for (var c = 0; c < a.length; c++) for (var d = 0; d < b.length; d++)
                if (a[c] == b[d]) return [c, d]; return null
        }
        function g() {
            var c = a(b.selection.element()).css("font-family"),
            d = e(c),
            g = []; for (var h in b.opts.fontFamily)
                if (b.opts.fontFamily.hasOwnProperty(h)) {
                    var i = e(h),
                    j = f(d, i);
                    j && g.push([h, j])
                }
            return 0 === g.length ? null : (g.sort(function (a, b) { var c = a[1][0] - b[1][0]; return 0 === c ? a[1][1] - b[1][1] : c }),
            g[0][0])
        }
        function h(c) {
            if (b.opts.fontFamilySelection) {
                var d = a(b.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                c.find("> span").text(b.opts.fontFamily[g()] || d[0] || b.language.translate(b.opts.fontFamilyDefaultSelection))
            }
        }
        return { apply: c, refreshOnShow: d, refresh: h }
    },
    a.FE.RegisterCommand("fontFamily", {
        type: "dropdown", displaySelection: function (a) { return a.opts.fontFamilySelection },
        defaultSelection: function (a) { return a.opts.fontFamilyDefaultSelection },
        displaySelectionWidth: 120, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.fontFamily; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + c + '" style="font-family: ' + c + '" title="' + b[c] + '">' + b[c] + "</a></li>");
            return a += "</ul>"
        },
        title: "Font Family", callback: function (a, b) { this.fontFamily.apply(b) },
        refresh: function (a) { this.fontFamily.refresh(a) },
        refreshOnShow: function (a, b) { this.fontFamily.refreshOnShow(a, b) },
        plugin: "fontFamily"
    }),
    a.FE.DefineIcon("fontFamily", { NAME: "font" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"], fontSizeSelection: !1, fontSizeDefaultSelection: "12" }),
    a.FE.PLUGINS.fontSize = function (b) {
        function c(a) { b.format.applyStyle("font-size", a) }
        function d(c, d) {
            var e = a(b.selection.element()).css("font-size");
            d.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1),
            d.find('.fr-command[data-param1="' + e + '"]').addClass("fr-active").attr("aria-selected", !0);
            var f = d.find(".fr-dropdown-list"),
            g = d.find(".fr-active").parent();
            g.length ? f.parent().scrollTop(g.offset().top - f.offset().top - (f.parent().outerHeight() / 2 - g.outerHeight() / 2)) : f.parent().scrollTop(0)
        }
        function e(c) {
            if (b.opts.fontSizeSelection) {
                var d = b.helpers.getPX(a(b.selection.element()).css("font-size"));
                c.find("> span").text(d)
            }
        }
        return { apply: c, refreshOnShow: d, refresh: e }
    },
    a.FE.RegisterCommand("fontSize", {
        type: "dropdown", title: "Font Size", displaySelection: function (a) { return a.opts.fontSizeSelection },
        displaySelectionWidth: 30, defaultSelection: function (a) { return a.opts.fontSizeDefaultSelection },
        html: function () {
            for (var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.fontSize, c = 0; c < b.length; c++) { var d = b[c]; a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + d + 'px" title="' + d + '">' + d + "</a></li>" }
            return a += "</ul>"
        },
        callback: function (a, b) { this.fontSize.apply(b) },
        refresh: function (a) { this.fontSize.refresh(a) },
        refreshOnShow: function (a, b) { this.fontSize.refreshOnShow(a, b) },
        plugin: "fontSize"
    }),
    a.FE.DefineIcon("fontSize", { NAME: "text-height" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "forms.edit": "[_BUTTONS_]", "forms.update": "[_BUTTONS_][_TEXT_LAYER_]" }),
    a.extend(a.FE.DEFAULTS, {
        formEditButtons: ["inputStyle", "inputEdit"], formStyles: { "fr-rounded": "Rounded", "fr-large": "Large" },
        formMultipleStyles: !0, formUpdateButtons: ["inputBack", "|"]
    }),
    a.FE.PLUGINS.forms = function (b) {
        function c(c) {
            c.preventDefault(),
            b.selection.clear(),
            a(this).data("mousedown", !0)
        }
        function d(b) {
            a(this).data("mousedown") && (b.stopPropagation(),
            a(this).removeData("mousedown"),
            s = this, j(this)),
            b.preventDefault()
        }
        function e() { b.$el.find("input, textarea, button").removeData("mousedown") }
        function f() { a(this).removeData("mousedown") }
        function g() {
            b.events.$on(b.$el, b._mousedown, "input, textarea, button", c),
            b.events.$on(b.$el, b._mouseup, "input, textarea, button", d),
            b.events.$on(b.$el, "touchmove", "input, textarea, button", f),
            b.events.$on(b.$el, b._mouseup, e),
            b.events.$on(b.$win, b._mouseup, e),
            m(!0)
        }
        function h() { return s || null }
        function i() {
            var a = ""; b.opts.formEditButtons.length > 0 && (a = '<div class="fr-buttons">' + b.button.buildList(b.opts.formEditButtons) + "</div>");
            var c = { buttons: a },
            d = b.popups.create("forms.edit", c);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-edit", function () { h() && b.popups.isVisible("forms.edit") && j(h()) }),
            d
        }
        function j(c) {
            var d = b.popups.get("forms.edit");
            d || (d = i()),
            s = c; var e = a(c);
            b.popups.refresh("forms.edit"),
            b.popups.setContainer("forms.edit", b.$sc);
            var f = e.offset().left + e.outerWidth() / 2, g = e.offset().top + e.outerHeight();
            b.popups.show("forms.edit", f, g, e.outerHeight())
        }
        function k() {
            var c = b.popups.get("forms.update"),
            d = h();

            if (d) {
                var e = a(d);
                e.is("button") ? c.find('input[type="text"][name="text"]').val(e.text()) : c.find('input[type="text"][name="text"]').val(e.attr("placeholder"))
            }
            c.find('input[type="text"][name="text"]').trigger("change")
        }
        function l() { s = null }
        function m(a) {
            if (a) return b.popups.onRefresh("forms.update", k),
            b.popups.onHide("forms.update", l),
            !0; var c = ""; b.opts.formUpdateButtons.length >= 1 && (c = '<div class="fr-buttons">' + b.button.buildList(b.opts.formUpdateButtons) + "</div>");
            var d = "", e = 0; d = '<div class="fr-forms-text-layer fr-layer fr-active">', d += '<div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex="' + ++e + '"></div>', d += '<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="' + ++e + '" type="button">' + b.language.translate("Update") + "</button></div></div>"; var f = { buttons: c, text_layer: d };
            return b.popups.create("forms.update", f)
        }
        function n() {
            var c = h();

            if (c) {
                var d = a(c),
                e = b.popups.get("forms.update");
                e || (e = m()),
                b.popups.isVisible("forms.update") || b.popups.refresh("forms.update"),
                b.popups.setContainer("forms.update", b.$sc);
                var f = d.offset().left + d.outerWidth() / 2, g = d.offset().top + d.outerHeight();
                b.popups.show("forms.update", f, g, d.outerHeight())
            }
        }
        function o(c, d, e) {
            void 0 === d && (d = b.opts.formStyles),
            void 0 === e && (e = b.opts.formMultipleStyles);
            var f = h();

            if (!f) return !1;
            if (!e) {
                var g = Object.keys(d);
                g.splice(g.indexOf(c),
                1),
                a(f).removeClass(g.join(" "))
            }
            a(f).toggleClass(c)
        }
        function p() {
            b.events.disableBlur(),
            b.selection.restore(),
            b.events.enableBlur();
            var a = h();
            a && b.$wp && ("BUTTON" == a.tagName && b.selection.restore(),
            j(a))
        }
        function q() {
            var c = b.popups.get("forms.update"),
            d = h();

            if (d) {
                var e = a(d),
                f = c.find('input[type="text"][name="text"]').val() || ""; f.length && (e.is("button") ? e.text(f) : e.attr("placeholder", f)),
                b.popups.hide("forms.update"),
                j(d)
            }
        }
        function r() {
            g(),
            b.events.$on(b.$el, "submit", "form", function (a) {
                return a.preventDefault(),
                !1
            })
        }
        var s; return { _init: r, updateInput: q, getInput: h, applyStyle: o, showUpdatePopup: n, showEditPopup: j, back: p }
    },
    a.FE.RegisterCommand("updateInput", { undo: !1, focus: !1, title: "Update", callback: function () { this.forms.updateInput() } }),
    a.FE.DefineIcon("inputStyle", { NAME: "magic" }),
    a.FE.RegisterCommand("inputStyle", {
        title: "Style", type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list">', b = this.opts.formStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="' + c + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) {
            var c = this.forms.getInput();
            c && (this.forms.applyStyle(b),
            this.forms.showEditPopup(c))
        },
        refreshOnShow: function (b, c) {
            var d = this.forms.getInput();

            if (d) {
                var e = a(d);
                c.find(".fr-command").each(function () {
                    var b = a(this).data("param1");
                    a(this).toggleClass("fr-active", e.hasClass(b))
                })
            }
        }
    }),
    a.FE.DefineIcon("inputEdit", { NAME: "edit" }),
    a.FE.RegisterCommand("inputEdit", { title: "Edit Button", undo: !1, refreshAfterCallback: !1, callback: function () { this.forms.showUpdatePopup() } }),
    a.FE.DefineIcon("inputBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("inputBack", { title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.forms.back() } }),
    a.FE.RegisterCommand("updateInput", { undo: !1, focus: !1, title: "Update", callback: function () { this.forms.updateInput() } })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.fullscreen = function (b) {
        function c() { return b.$box.hasClass("fr-fullscreen") }
        function d() {
            i = b.helpers.scrollTop(),
            b.$box.toggleClass("fr-fullscreen"),
            a("body:first").toggleClass("fr-fullscreen"),
            j = a('<div style="display: none;"></div>'),
            b.$box.after(j),
            b.helpers.isMobile() && (b.$tb.data("parent", b.$tb.parent()),
            b.$tb.prependTo(b.$box),
            b.$tb.data("sticky-dummy") && b.$tb.after(b.$tb.data("sticky-dummy"))),
            k = b.opts.height, l = b.opts.heightMax, m = b.opts.zIndex, b.opts.height = b.o_win.innerHeight - (b.opts.toolbarInline ? 0 : b.$tb.outerHeight()),
            b.opts.zIndex = 2147483641, b.opts.heightMax = null, b.size.refresh(),
            b.opts.toolbarInline && b.toolbar.showInline();
            for (var c = b.$box.parent() ;
            !c.is("body:first") ;
            ) c.data("z-index", c.css("z-index")).data("overflow", c.css("overflow")).css("z-index", "2147483640").css("overflow", "visible"),
            c = c.parent();
            b.events.trigger("charCounter.update"),
            b.$win.trigger("scroll")
        }
        function e() {
            b.$box.toggleClass("fr-fullscreen"),
            a("body:first").toggleClass("fr-fullscreen"),
            b.$tb.prependTo(b.$tb.data("parent")),
            b.$tb.data("sticky-dummy") && b.$tb.after(b.$tb.data("sticky-dummy")),
            b.opts.height = k, b.opts.heightMax = l, b.opts.zIndex = m, b.size.refresh(),
            a(b.o_win).scrollTop(i),
            b.opts.toolbarInline && b.toolbar.showInline(),
            b.events.trigger("charCounter.update"),
            b.opts.toolbarSticky && b.opts.toolbarStickyOffset && (b.opts.toolbarBottom ? b.$tb.css("bottom", b.opts.toolbarStickyOffset).data("bottom", b.opts.toolbarStickyOffset) : b.$tb.css("top", b.opts.toolbarStickyOffset).data("top", b.opts.toolbarStickyOffset));
            for (var c = b.$box.parent() ;
            !c.is("body:first") ;
            ) c.data("z-index") && (c.css("z-index", ""),
            c.css("z-index") != c.data("z-index") && c.css("z-index", c.data("z-index")),
            c.removeData("z-index")),
            c.data("overflow") ? (c.css("overflow", ""),
            c.css("overflow") != c.data("overflow") && c.css("overflow", c.data("overflow")),
            c.removeData("overflow")) : (c.css("overflow", ""),
            c.removeData("overflow")),
            c = c.parent();
            b.$win.trigger("scroll")
        }
        function f() {
            c() ? e() : d(),
            g(b.$tb.find('.fr-command[data-cmd="fullscreen"]'))
        }
        function g(a) {
            var d = c();
            a.toggleClass("fr-active", d).attr("aria-pressed", d),
            a.find("> *:not(.fr-sr-only)").replaceWith(d ? b.icon.create("fullscreenCompress") : b.icon.create("fullscreen"))
        }
        function h() {
            if (!b.$wp) return !1; b.events.$on(a(b.o_win),
            "resize", function () {
                c() && (e(),
                d())
            }),
            b.events.on("toolbar.hide", function () {
                if (c() && b.helpers.isMobile()) return !1
            }),
            b.events.on("destroy", function () { c() && e() },
            !0)
        }
        var i, j, k, l, m; return { _init: h, toggle: f, refresh: g, isActive: c }
    },
    a.FE.RegisterCommand("fullscreen", {
        title: "Fullscreen", undo: !1, focus: !1, accessibilityFocus: !0, forcedRefresh: !0, toggle: !0, callback: function () { this.fullscreen.toggle() },
        refresh: function (a) { this.fullscreen.refresh(a) },
        plugin: "fullscreen"
    }),
    a.FE.DefineIcon("fullscreen", { NAME: "expand" }),
    a.FE.DefineIcon("fullscreenCompress", { NAME: "compress" })
});

/*eslint eqeqeq: "error"*/
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
            return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
                a(c)
        } :
        a(window.jQuery)
}(function(a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]", "image.edit": "[_BUTTONS_]", "image.alt": "[_BUTTONS_][_ALT_LAYER_]", "image.size": "[_BUTTONS_][_SIZE_LAYER_]" }),
        a.extend(a.FE.DEFAULTS, {
            imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
            imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
            imageAltButtons: ["imageBack", "|"],
            imageSizeButtons: ["imageBack", "|"],
            imageUpload: !0,
            imageUploadURL: "/FileApi/UploadImage",
            imageUploadParam: "file",
            imageUploadParams: {},
            imageUploadToS3: !1,
            imageUploadMethod: "POST",
            imageMaxSize: 10485760,
            imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "svg+xml"],
            imageResize: !0,
            imageResizeWithPercent: !1,
            imageRoundPercent: !1,
            imageDefaultWidth: 300,
            imageDefaultAlign: "center",
            imageDefaultDisplay: "block",
            imageSplitHTML: !1,
            imageStyles: { "fr-rounded": "Rounded", "fr-bordered": "Bordered", "fr-shadow": "Shadow" },
            imageMove: !0,
            imageMultipleStyles: !0,
            imageTextNear: !0,
            imagePaste: !0,
            imagePasteProcess: !1,
            imageMinWidth: 16,
            imageOutputSize: !1,
            imageDefaultMargin: 5
        }),
        a.FE.PLUGINS.image = function(b) {
            function c() {
                var a = b.popups.get("image.insert"),
                    c = a.find(".fr-image-by-url-layer input");
                c.val(""),
                    Da && c.val(Da.attr("src")),
                    c.trigger("change")
            }

            function d() {
                var a = b.$tb.find('.fr-command[data-cmd="insertImage"]'),
                    c = b.popups.get("image.insert");
                if (c || (c = M()),
                    s(), !c.hasClass("fr-active"))
                    if (b.popups.refresh("image.insert"),
                        b.popups.setContainer("image.insert", b.$tb),
                        a.is(":visible")) {
                        var d = a.offset().left + a.outerWidth() / 2,
                            e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                        b.popups.show("image.insert", d, e, a.outerHeight())
                    } else b.position.forSelection(c),
                        b.popups.show("image.insert")
            }

            function e() {
                var a = b.popups.get("image.edit");
                if (a || (a = q()),
                    a) {
                    var c = za();
                    Ba() && (c = c.find(".fr-img-wrap")),
                        b.popups.setContainer("image.edit", b.$sc),
                        b.popups.refresh("image.edit");
                    var d = c.offset().left + c.outerWidth() / 2,
                        e = c.offset().top + c.outerHeight();
                    b.popups.show("image.edit", d, e, c.outerHeight())
                }
            }

            function f() { s() }

            function g(a) {
                a.hasClass("fr-dii") || a.hasClass("fr-dib") || (a.addClass("fr-fi" + pa(a)[0]),
                    a.addClass("fr-di" + qa(a)[0]),
                    a.css("margin", ""),
                    a.css("float", ""),
                    a.css("display", ""),
                    a.css("z-index", ""),
                    a.css("position", ""),
                    a.css("overflow", ""),
                    a.css("vertical-align", ""))
            }

            function h(a) {
                na(a, a.hasClass("fr-dib") ? "block" : a.hasClass("fr-dii") ? "inline" : null, a.hasClass("fr-fil") ? "left" : a.hasClass("fr-fir") ? "right" : pa(a)),
                    a.removeClass("fr-dib fr-dii fr-fir fr-fil")
            }

            function i() {
                for (var c = "IMG" == b.el.tagName ? [b.el] : b.el.querySelectorAll("img"),
                        d = 0; d < c.length; d++) {
                    var e = a(c[d]);
                    !b.opts.htmlUntouched && b.opts.useClasses ? ((b.opts.imageEditButtons.indexOf("imageAlign") >= 0 || b.opts.imageEditButtons.indexOf("imageDisplay") >= 0) && g(e),
                            b.opts.imageTextNear || e.removeClass("fr-dii").addClass("fr-dib")) : b.opts.htmlUntouched || b.opts.useClasses || (b.opts.imageEditButtons.indexOf("imageAlign") >= 0 || b.opts.imageEditButtons.indexOf("imageDisplay") >= 0) && h(e),
                        b.opts.iframe && e.on("load", b.size.syncIframe)
                }
            }

            function j(c) {
                void 0 === c && (c = !0);
                var d, e = Array.prototype.slice.call(b.el.querySelectorAll("img")),
                    f = [];
                for (d = 0; d < e.length; d++) f.push(e[d].getAttribute("src")),
                    a(e[d]).toggleClass("fr-draggable", b.opts.imageMove),
                    "" === e[d].getAttribute("class") && e[d].removeAttribute("class"),
                    "" === e[d].getAttribute("style") && e[d].removeAttribute("style");
                if (Qa)
                    for (d = 0; d < Qa.length; d++) f.indexOf(Qa[d].getAttribute("src")) < 0 && b.events.trigger("image.removed", [a(Qa[d])]);
                if (Qa && c) {
                    var g = [];
                    for (d = 0; d < Qa.length; d++) g.push(Qa[d].getAttribute("src"));
                    for (d = 0; d < e.length; d++) g.indexOf(e[d].getAttribute("src")) < 0 && b.events.trigger("image.loaded", [a(e[d])])
                }
                Qa = e
            }

            function k() {
                if (Ea || Z(), !Da) return !1;
                var a = b.$wp || b.$sc;
                a.append(Ea),
                    Ea.data("instance", b);
                var c = a.scrollTop() - ("static" != a.css("position") ? a.offset().top : 0),
                    d = a.scrollLeft() - ("static" != a.css("position") ? a.offset().left : 0);
                d -= b.helpers.getPX(a.css("border-left-width")),
                    c -= b.helpers.getPX(a.css("border-top-width")),
                    b.$el.is("img") && b.$sc.is("body") && (c = 0, d = 0);
                var e = za();
                Ba() && (e = e.find(".fr-img-wrap")),
                    Ea.css("top", (b.opts.iframe ? e.offset().top + b.$iframe.position().top : e.offset().top + c) - 1).css("left", (b.opts.iframe ? e.offset().left : e.offset().left + d) - 1).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function l(a) { return '<div class="fr-handler fr-h' + a + '"></div>' }

            function m(c) {
                if (!b.core.sameInstance(Ea)) return !0;
                if (c.preventDefault(),
                    c.stopPropagation(),
                    b.$el.find("img.fr-error").left) return !1;
                b.undo.canDo() || b.undo.saveStep();
                var d = c.pageX || c.originalEvent.touches[0].pageX;
                if ("mousedown" == c.type) {
                    var e = b.$oel.get(0),
                        f = e.ownerDocument,
                        g = f.defaultView || f.parentWindow,
                        h = !1;
                    try { h = g.location != g.parent.location && !(g.$ && g.$.FE) } catch (k) {}
                    h && g.frameElement && (d += b.helpers.getPX(a(g.frameElement).offset().left) + g.frameElement.clientLeft)
                }
                Fa = a(this),
                    Fa.data("start-x", d),
                    Fa.data("start-width", Da.width()),
                    Fa.data("start-height", Da.height());
                var i = Da.width();
                if (b.opts.imageResizeWithPercent) {
                    var j = Da.parentsUntil(b.$el, b.html.blockTagsQuery()).get(0) || b.el;
                    Da.css("width", (i / a(j).outerWidth() * 100).toFixed(2) + "%")
                } else Da.css("width", i);
                Ga.show(),
                    b.popups.hideAll(),
                    la()
            }

            function n(c) {
                if (!b.core.sameInstance(Ea)) return !0;
                var d;
                if (Fa && Da) {
                    if (c.preventDefault(),
                        b.$el.find("img.fr-error").left) return !1;
                    var e = c.pageX || (c.originalEvent.touches ? c.originalEvent.touches[0].pageX : null);
                    if (!e) return !1;
                    var f = Fa.data("start-x"),
                        g = e - f,
                        h = Fa.data("start-width");
                    if ((Fa.hasClass("fr-hnw") || Fa.hasClass("fr-hsw")) && (g = 0 - g),
                        b.opts.imageResizeWithPercent) {
                        var i = Da.parentsUntil(b.$el, b.html.blockTagsQuery()).get(0) || b.el;
                        h = ((h + g) / a(i).outerWidth() * 100).toFixed(2),
                            b.opts.imageRoundPercent && (h = Math.round(h)),
                            Da.css("width", h + "%"),
                            d = (b.helpers.getPX(Da.css("width")) / a(i).outerWidth() * 100).toFixed(2),
                            d !== h && Da.css("width", d + "%"),
                            Da.css("height", "").removeAttr("height")
                    } else h + g >= b.opts.imageMinWidth && (Ba() && Da.parent().css("width", h + g),
                            Da.css("width", h + g)),
                        d = b.helpers.getPX(Da.css("width")),
                        d !== h + g && Da.css("width", d),
                        (Da.attr("style") || "").match(/(^height:)|(; *height:)/) && Da.css("height", Fa.data("start-height") * Da.width() / Fa.data("start-width"));
                    k(),
                        b.events.trigger("image.resize", [ya()])
                }
            }

            function o(a) {
                if (!b.core.sameInstance(Ea)) return !0;
                if (Fa && Da) {
                    if (a && a.stopPropagation(),
                        b.$el.find("img.fr-error").left) return !1;
                    Fa = null, Ga.hide(),
                        k(),
                        e(),
                        b.undo.saveStep(),
                        b.events.trigger("image.resizeEnd", [ya()])
                }
            }

            function p(a, c, d) {
                b.edit.on(),
                    Da && Da.addClass("fr-error"),
                    u(b.language.translate("Something went wrong. Please try again.")), !Da && d && $(d),
                    b.events.trigger("image.error", [{ code: a, message: Pa[a] },
                        c, d
                    ])
            }

            function q(a) {
                if (a) return b.$wp && b.events.$on(b.$wp, "scroll", function() {
                    Da && b.popups.isVisible("image.edit") && (b.events.disableBlur(),
                        w(Da))
                }), !0;
                var c = "";
                if (b.opts.imageEditButtons.length > 0) {
                    c += '<div class="fr-buttons">', c += b.button.buildList(b.opts.imageEditButtons),
                        c += "</div>";
                    var d = { buttons: c };
                    return b.popups.create("image.edit", d)
                }
                return !1
            }

            function r(a) {
                var c = b.popups.get("image.insert");
                if (c || (c = M()),
                    c.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),
                    c.find(".fr-image-progress-bar-layer").addClass("fr-active"),
                    c.find(".fr-buttons").hide(),
                    Da) {
                    var d = za();
                    b.popups.setContainer("image.insert", b.$sc);
                    var e = d.offset().left + d.width() / 2,
                        f = d.offset().top + d.height();
                    b.popups.show("image.insert", e, f, d.outerHeight())
                }
                void 0 === a && t(b.language.translate("Uploading"),
                    0)
            }

            function s(a) {
                var c = b.popups.get("image.insert");
                if (c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),
                        c.find(".fr-image-progress-bar-layer").removeClass("fr-active"),
                        c.find(".fr-buttons").show(),
                        a || b.$el.find("img.fr-error").length)) {
                    if (b.events.focus(),
                        b.$el.find("img.fr-error").length && (b.$el.find("img.fr-error").remove(),
                            b.undo.saveStep(),
                            b.undo.run(),
                            b.undo.dropRedo()), !b.$wp && Da) {
                        var d = Da;
                        ja(!0),
                            b.selection.setAfter(d.get(0)),
                            b.selection.restore()
                    }
                    b.popups.hide("image.insert")
                }
            }

            function t(a, c) {
                var d = b.popups.get("image.insert");
                if (d) {
                    var e = d.find(".fr-image-progress-bar-layer");
                    e.find("h3").text(a + (c ? " " + c + "%" : "")),
                        e.removeClass("fr-error"),
                        c ? (e.find("div").removeClass("fr-indeterminate"),
                            e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
                }
            }

            function u(a) {
                r();
                var c = b.popups.get("image.insert"),
                    d = c.find(".fr-image-progress-bar-layer");
                d.addClass("fr-error");
                var e = d.find("h3");
                e.text(a),
                    b.events.disableBlur(),
                    e.focus()
            }

            function v() {
                var a = b.popups.get("image.insert"),
                    c = a.find(".fr-image-by-url-layer input");
                c.val().length > 0 && (r(),
                    t(b.language.translate("Loading image")),
                    y(c.val(), !0, [], Da),
                    c.val(""),
                    c.blur())
            }

            function w(a) { ia.call(a.get(0)) }

            function x() {
                var c = a(this);
                b.popups.hide("image.insert"),
                    c.removeClass("fr-uploading"),
                    c.next().is("br") && c.next().remove(),
                    w(c),
                    b.events.trigger("image.loaded", [c])
            }

            function y(a, c, d, e, f) {
                b.edit.off(),
                    t(b.language.translate("Loading image")),
                    c && (a = b.helpers.sanitizeURL(a));
                var g = new Image;
                g.onload = function() {
                        var c, g;
                        if (e) {
                            b.undo.canDo() || e.hasClass("fr-uploading") || b.undo.saveStep();
                            var h = e.data("fr-old-src");
                            e.data("fr-image-pasted") && (h = null),
                                b.$wp ? (c = e.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted"),
                                    c.off("load"),
                                    h && e.attr("src", h),
                                    e.replaceWith(c)) : c = e;
                            for (var i = c.get(0).attributes, k = 0; k < i.length; k++) {
                                var l = i[k];
                                0 === l.nodeName.indexOf("data-") && c.removeAttr(l.nodeName)
                            }
                            if (void 0 !== d)
                                for (g in d) d.hasOwnProperty(g) && "link" != g && c.attr("data-" + g, d[g]);
                            c.on("load", x),
                                c.attr("src", a),
                                b.edit.on(),
                                j(!1),
                                b.undo.saveStep(),
                                b.$el.blur(),
                                b.events.trigger(h ? "image.replaced" : "image.inserted", [c, f])
                        } else c = E(a, d, x),
                            j(!1),
                            b.undo.saveStep(),
                            b.$el.blur(),
                            b.events.trigger("image.inserted", [c, f])
                    },
                    g.onerror = function() { p(Ia) },
                    r(b.language.translate("Loading image")),
                    g.src = a
            }

            function z(a) {
                try {
                    if (!1 === b.events.trigger("image.uploaded", [a], !0)) return b.edit.on(), !1;
                    var c = JSON.parse(a);
                    return c.link ? c : (p(Ja, a), !1)
                } catch (d) {
                    return p(La, a), !1
                }
            }

            function A(c) {
                try {
                    var d = a(c).find("Location").text(),
                        e = a(c).find("Key").text();
                    return !1 === b.events.trigger("image.uploadedToS3", [d, e, c], !0) ? (b.edit.on(), !1) : d
                } catch (f) {
                    return p(La, c), !1
                }
            }

            function B(a) {
                t(b.language.translate("Loading image"));
                var c = this.status,
                    d = this.response,
                    e = this.responseXML,
                    f = this.responseText;
                try {
                    if (b.opts.imageUploadToS3)
                        if (201 == c) {
                            var g = A(e);
                            g && y(g, !1, [], a, d || e)
                        } else p(La, d || e, a);
                    else if (c >= 200 && c < 300) {
                        var h = z(f);
                        h && y(h.link, !1, h, a, d || f)
                    } else p(Ka, d || f, a)
                } catch (i) { p(La, d || f, a) }
            }

            function C() { p(La, this.response || this.responseText || this.responseXML) }

            function D(a) {
                if (a.lengthComputable) {
                    var c = a.loaded / a.total * 100 | 0;
                    t(b.language.translate("Uploading"),
                        c)
                }
            }

            function E(c, d, e) {
                var f, g = "";
                if (d && void 0 !== d)
                    for (f in d) d.hasOwnProperty(f) && "link" != f && (g += " data-" + f + '="' + d[f] + '"');
                var h = b.opts.imageDefaultWidth;
                h && "auto" != h && (h += b.opts.imageResizeWithPercent ? "%" : "px");
                var i = a('<img src="' + c + '"' + g + (h ? ' style="width: ' + h + ';"' : "") + ">");
                na(i, b.opts.imageDefaultDisplay, b.opts.imageDefaultAlign),
                    i.on("load", e),
                    i.on("error", function() { p(Oa) }),
                    b.edit.on(),
                    b.events.focus(!0),
                    b.selection.restore(),
                    b.undo.saveStep(),
                    b.opts.imageSplitHTML ? b.markers.split() : b.markers.insert();
                var j = b.$el.find(".fr-marker");
                return j.length ? (j.parent().is("hr") && j.parent().after(j),
                        b.node.isLastSibling(j) && j.parent().hasClass("fr-deletable") && j.insertAfter(j.parent()),
                        j.replaceWith(i)) : b.$el.append(i),
                    b.html.wrap(),
                    b.selection.clear(),
                    i
            }

            function F() {
                b.edit.on(),
                    s(!0)
            }

            function G(c, d, e, f) {
                function g() {
                    var e = a(this);
                    e.off("load"),
                        e.addClass("fr-uploading"),
                        e.next().is("br") && e.next().remove(),
                        b.placeholder.refresh(),
                        w(e),
                        k(),
                        r(),
                        b.edit.off(),
                        c.onload = function() { B.call(c, e) },
                        c.onerror = C, c.upload.onprogress = D, c.onabort = F, e.off("abortUpload").on("abortUpload", function() { 4 != c.readyState && c.abort() }),
                        c.send(d)
                }
                var h, i = new FileReader;
                i.addEventListener("load", function() {
                        var a = i.result;
                        if (i.result.indexOf("svg+xml") < 0) {
                            for (var c = atob(i.result.split(",")[1]),
                                    d = [], e = 0; e < c.length; e++) d.push(c.charCodeAt(e));
                            a = window.URL.createObjectURL(new Blob([new Uint8Array(d)], { type: "image/jpeg" }))
                        }
                        f ? (f.on("load", g),
                            f.one("error", function() {
                                f.off("load"),
                                    f.attr("src", f.data("fr-old-src")),
                                    p(Oa)
                            }),
                            b.edit.on(),
                            b.undo.saveStep(),
                            f.data("fr-old-src", f.attr("src")),
                            f.attr("src", a)) : h = E(a, null, g)
                    }, !1),
                    i.readAsDataURL(e)
            }

            function H(a, c) {
                if (void 0 !== a && a.length > 0) {
                    if (!1 === b.events.trigger("image.beforeUpload", [a, c])) return !1;
                    var d = a[0];
                    if (d.name || (d.name = (new Date).getTime() + ".jpg"),
                        d.size > b.opts.imageMaxSize) return p(Ma), !1;
                    if (b.opts.imageAllowedTypes.indexOf(d.type.replace(/image\//g, "")) < 0) return p(Na), !1;
                    var e;
                    if (b.drag_support.formdata && (e = b.drag_support.formdata ? new FormData : null),
                        e) {
                        var f;
                        if (!1 !== b.opts.imageUploadToS3) {
                            e.append("key", b.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (d.name || "untitled")),
                                e.append("success_action_status", "201"),
                                e.append("X-Requested-With", "xhr"),
                                e.append("Content-Type", d.type);
                            for (f in b.opts.imageUploadToS3.params) b.opts.imageUploadToS3.params.hasOwnProperty(f) && e.append(f, b.opts.imageUploadToS3.params[f])
                        }
                        for (f in b.opts.imageUploadParams) b.opts.imageUploadParams.hasOwnProperty(f) && e.append(f, b.opts.imageUploadParams[f]);
                        e.append(b.opts.imageUploadParam, d, d.name);
                        var g = b.opts.imageUploadURL;
                        b.opts.imageUploadToS3 && (g = b.opts.imageUploadToS3.uploadURL ? b.opts.imageUploadToS3.uploadURL : "https://" + b.opts.imageUploadToS3.region + ".amazonaws.com/" + b.opts.imageUploadToS3.bucket);
                        G(b.core.getXHR(g, b.opts.imageUploadMethod),
                            e, d, c || Da)
                    }
                }
            }

            function I(c) {
                b.events.$on(c, "dragover dragenter", ".fr-image-upload-layer", function() {
                        return a(this).addClass("fr-drop"), !1
                    }, !0),
                    b.events.$on(c, "dragleave dragend", ".fr-image-upload-layer", function() {
                        return a(this).removeClass("fr-drop"), !1
                    }, !0),
                    b.events.$on(c, "drop", ".fr-image-upload-layer", function(d) {
                        d.preventDefault(),
                            d.stopPropagation(),
                            a(this).removeClass("fr-drop");
                        var e = d.originalEvent.dataTransfer;
                        if (e && e.files) {
                            var f = c.data("instance") || b;
                            f.events.disableBlur(),
                                f.image.upload(e.files),
                                f.events.enableBlur()
                        }
                    }, !0),
                    b.helpers.isIOS() && b.events.$on(c, "touchstart", '.fr-image-upload-layer input[type="file"]', function() { a(this).trigger("click") }, !0),
                    b.events.$on(c, "change", '.fr-image-upload-layer input[type="file"]', function() {
                        if (this.files) {
                            var d = c.data("instance") || b;
                            d.events.disableBlur(),
                                c.find("input:focus").blur(),
                                d.events.enableBlur(),
                                d.image.upload(this.files, Da)
                        }
                        a(this).val("")
                    }, !0)
            }

            function J(a) { if (a.is("img") && a.parents(".fr-img-caption").length > 0) return a.parents(".fr-img-caption") }

            function K(c) {
                var d = c.originalEvent.dataTransfer;
                if (d && d.files && d.files.length) {
                    var e = d.files[0];
                    if (e && e.type && -1 !== e.type.indexOf("image")) {
                        if (!b.opts.imageUpload) return c.preventDefault(),
                            c.stopPropagation(), !1;
                        b.markers.remove(),
                            b.markers.insertAtPoint(c.originalEvent),
                            b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),
                            0 === b.$el.find(".fr-marker").length && b.selection.setAtEnd(b.el),
                            b.popups.hideAll();
                        var f = b.popups.get("image.insert");
                        f || (f = M()),
                            b.popups.setContainer("image.insert", b.$sc);
                        var g = c.originalEvent.pageX,
                            h = c.originalEvent.pageY;
                        return b.opts.iframe && (h += b.$iframe.offset().top, g += b.$iframe.offset().left),
                            b.popups.show("image.insert", g, h),
                            r(),
                            b.opts.imageAllowedTypes.indexOf(e.type.replace(/image\//g, "")) >= 0 ? (ja(!0),
                                H(d.files)) : p(Na),
                            c.preventDefault(),
                            c.stopPropagation(), !1
                    }
                }
            }

            function L() {
                b.events.$on(b.$el, b._mousedown, "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function(c) {
                        if ("false" == a(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                        b.helpers.isMobile() || b.selection.clear(),
                            Ha = !0, b.popups.areVisible() && b.events.disableBlur(),
                            b.browser.msie && (b.events.disableBlur(),
                                b.$el.attr("contenteditable", !1)),
                            b.draggable || "touchstart" == c.type || c.preventDefault(),
                            c.stopPropagation()
                    }),
                    b.events.$on(b.$el, b._mouseup, "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function(c) {
                        if ("false" == a(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                        Ha && (Ha = !1, c.stopPropagation(),
                            b.browser.msie && (b.$el.attr("contenteditable", !0),
                                b.events.enableBlur()))
                    }),
                    b.events.on("keyup", function(c) {
                        if (c.shiftKey && "" === b.selection.text().replace(/\n/g, "") && b.keys.isArrow(c.which)) {
                            var d = b.selection.element(),
                                e = b.selection.endElement();
                            d && "IMG" == d.tagName ? w(a(d)) : e && "IMG" == e.tagName && w(a(e))
                        }
                    }, !0),
                    b.events.on("drop", K),
                    b.events.on("element.beforeDrop", J),
                    b.events.on("mousedown window.mousedown", ka),
                    b.events.on("window.touchmove", la),
                    b.events.on("mouseup window.mouseup", function() {
                        if (Da) return ja(), !1;
                        la()
                    }),
                    b.events.on("commands.mousedown", function(a) { a.parents(".fr-toolbar").length > 0 && ja() }),
                    b.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() { Ha = !1, ja(!0) }),
                    b.events.on("modals.hide", function() {
                        Da && (wa(),
                            b.selection.clear())
                    })
            }

            function M(a) {
                if (a) return b.popups.onRefresh("image.insert", c),
                    b.popups.onHide("image.insert", f), !0;
                var d, e = "";
                b.opts.imageUpload || b.opts.imageInsertButtons.splice(b.opts.imageInsertButtons.indexOf("imageUpload"),
                        1),
                    b.opts.imageInsertButtons.length > 1 && (e = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageInsertButtons) + "</div>");
                var g = b.opts.imageInsertButtons.indexOf("imageUpload"),
                    h = b.opts.imageInsertButtons.indexOf("imageByURL"),
                    i = "";
                g >= 0 && (d = " fr-active", h >= 0 && g > h && (d = ""),
                    i = '<div class="fr-image-upload-layer' + d + ' fr-layer" id="fr-image-upload-layer-' + b.id + '"><strong>' + b.language.translate("Drop image") + "</strong><br>(" + b.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + b.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + b.id + '" role="button"></div></div>');
                var j = "";
                h >= 0 && (d = " fr-active", g >= 0 && h > g && (d = ""),
                    j = '<div class="fr-image-by-url-layer' + d + ' fr-layer" id="fr-image-by-url-layer-' + b.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + b.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + b.language.translate("Insert") + "</button></div></div>");
                var k = '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>',
                    l = { buttons: e, upload_layer: i, by_url_layer: j, progress_bar: k },
                    m = b.popups.create("image.insert", l);
                return b.$wp && b.events.$on(b.$wp, "scroll", function() { Da && b.popups.isVisible("image.insert") && va() }),
                    I(m),
                    m
            }

            function N() {
                if (Da) { b.popups.get("image.alt").find("input").val(Da.attr("alt") || "").trigger("change") }
            }

            function O() {
                var a = b.popups.get("image.alt");
                a || (a = P()),
                    s(),
                    b.popups.refresh("image.alt"),
                    b.popups.setContainer("image.alt", b.$sc);
                var c = za();
                Ba() && (c = c.find(".fr-img-wrap"));
                var d = c.offset().left + c.outerWidth(!0) / 2,
                    e = c.offset().top + c.outerHeight(!0);
                b.popups.show("image.alt", d, e, c.outerHeight())
            }

            function P(a) {
                if (a) return b.popups.onRefresh("image.alt", N), !0;
                var c = "";
                c = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageAltButtons) + "</div>";
                var d = "";
                d = '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + b.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + b.id + '" type="text" placeholder="' + b.language.translate("Alternate Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + b.language.translate("Update") + "</button></div></div>";
                var e = { buttons: c, alt_layer: d },
                    f = b.popups.create("image.alt", e);
                return b.$wp && b.events.$on(b.$wp, "scroll.image-alt", function() { Da && b.popups.isVisible("image.alt") && O() }),
                    f
            }

            function Q(a) {
                if (Da) {
                    var c = b.popups.get("image.alt");
                    Da.attr("alt", a || c.find("input").val() || ""),
                        c.find("input:focus").blur(),
                        w(Da)
                }
            }

            function R() {
                if (Da) {
                    var a = b.popups.get("image.size");
                    a.find('input[name="width"]').val(Da.get(0).style.width).trigger("change"),
                        a.find('input[name="height"]').val(Da.get(0).style.height).trigger("change")
                }
            }

            function S() {
                var a = b.popups.get("image.size");
                a || (a = T()),
                    s(),
                    b.popups.refresh("image.size"),
                    b.popups.setContainer("image.size", b.$sc);
                var c = za();
                Ba() && (c = c.find(".fr-img-wrap"));
                var d = c.offset().left + c.outerWidth(!0) / 2,
                    e = c.offset().top + c.outerHeight(!0);
                b.popups.show("image.size", d, e, c.outerHeight())
            }

            function T(a) {
                if (a) return b.popups.onRefresh("image.size", R), !0;
                var c = "";
                c = '<div class="fr-buttons">' + b.button.buildList(b.opts.imageSizeButtons) + "</div>";
                var d = "";
                d = '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + b.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + b.id + '" type="text" name="width" placeholder="' + b.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + b.id + '" type="text" name="height" placeholder="' + b.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + b.language.translate("Update") + "</button></div></div>";
                var e = { buttons: c, size_layer: d },
                    f = b.popups.create("image.size", e);
                return b.$wp && b.events.$on(b.$wp, "scroll.image-size", function() { Da && b.popups.isVisible("image.size") && S() }),
                    f
            }

            function U(a, c) {
                if (Da) {
                    var d = b.popups.get("image.size");
                    a = a || d.find('input[name="width"]').val() || "", c = c || d.find('input[name="height"]').val() || "";
                    var e = /^[\d]+((px)|%)*$/g;
                    a.match(e) ? Da.css("width", a) : Da.css("width", ""),
                        c.match(e) ? Da.css("height", c) : Da.css("height", ""),
                        d.find("input:focus").blur(),
                        w(Da)
                }
            }

            function V(a) {
                var c, d, e = b.popups.get("image.insert");
                if (Da || b.opts.toolbarInline) {
                    if (Da) {
                        var f = za();
                        Ba() && (f = f.find(".fr-img-wrap")),
                            d = f.offset().top + f.outerHeight(!0),
                            c = f.offset().left + f.outerWidth(!0) / 2
                    }
                } else {
                    var g = b.$tb.find('.fr-command[data-cmd="insertImage"]');
                    c = g.offset().left + g.outerWidth() / 2, d = g.offset().top + (b.opts.toolbarBottom ? 10 : g.outerHeight() - 10)
                }!Da && b.opts.toolbarInline && (d = e.offset().top - b.helpers.getPX(e.css("margin-top")),
                        e.hasClass("fr-above") && (d += e.outerHeight())),
                    e.find(".fr-layer").removeClass("fr-active"),
                    e.find(".fr-" + a + "-layer").addClass("fr-active"),
                    b.popups.show("image.insert", c, d, Da ? Da.outerHeight() : 0),
                    b.accessibility.focusPopup(e)
            }

            function W(a) { b.popups.get("image.insert").find(".fr-image-upload-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0) }

            function X(a) { b.popups.get("image.insert").find(".fr-image-by-url-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0) }

            function Y(a, b, c, d) {
                return a.pageX = b, m.call(this, a),
                    a.pageX = a.pageX + c * Math.floor(Math.pow(1.1, d)),
                    n.call(this, a),
                    o.call(this, a),
                    ++d
            }

            function Z() {
                var c;
                if (b.shared.$image_resizer ? (Ea = b.shared.$image_resizer, Ga = b.shared.$img_overlay, b.events.on("destroy", function() { Ea.removeClass("fr-active").appendTo(a("body:first")) }, !0)) : (b.shared.$image_resizer = a('<div class="fr-image-resizer"></div>'),
                        Ea = b.shared.$image_resizer, b.events.$on(Ea, "mousedown", function(a) { a.stopPropagation() }, !0),
                        b.opts.imageResize && (Ea.append(l("nw") + l("ne") + l("sw") + l("se")),
                            b.shared.$img_overlay = a('<div class="fr-image-overlay"></div>'),
                            Ga = b.shared.$img_overlay, c = Ea.get(0).ownerDocument, a(c).find("body:first").append(Ga))),
                    b.events.on("shared.destroy", function() {
                        Ea.html("").removeData().remove(),
                            Ea = null, b.opts.imageResize && (Ga.remove(),
                                Ga = null)
                    }, !0),
                    b.helpers.isMobile() || b.events.$on(a(b.o_win),
                        "resize",
                        function() {
                            Da && !Da.hasClass("fr-uploading") ? ja(!0) : Da && (k(),
                                va(),
                                r(!1))
                        }),
                    b.opts.imageResize) {
                    c = Ea.get(0).ownerDocument, b.events.$on(Ea, b._mousedown, ".fr-handler", m),
                        b.events.$on(a(c),
                            b._mousemove, n),
                        b.events.$on(a(c.defaultView || c.parentWindow),
                            b._mouseup, o),
                        b.events.$on(Ga, "mouseleave", o);
                    var d = 1,
                        e = null,
                        f = 0;
                    b.events.on("keydown", function(c) {
                            if (Da) {
                                var g = -1 != navigator.userAgent.indexOf("Mac OS X") ? c.metaKey : c.ctrlKey,
                                    h = c.which;
                                (h !== e || c.timeStamp - f > 200) && (d = 1),
                                (h == a.FE.KEYCODE.EQUALS || b.browser.mozilla && h == a.FE.KEYCODE.FF_EQUALS) && g && !c.altKey ? d = Y.call(this, c, 1, 1, d) : (h == a.FE.KEYCODE.HYPHEN || b.browser.mozilla && h == a.FE.KEYCODE.FF_HYPHEN) && g && !c.altKey ? d = Y.call(this, c, 2, -1, d) : b.keys.ctrlKey(c) || h != a.FE.KEYCODE.ENTER || (Da.before("<br>"),
                                        w(Da)),
                                    e = h, f = c.timeStamp
                            }
                        }, !0),
                        b.events.on("keyup", function() { d = 1 })
                }
            }

            function $(c) {
                (c = c || za()) && !1 !== b.events.trigger("image.beforeRemove", [c]) && (b.popups.hideAll(),
                    wa(),
                    ja(!0),
                    b.undo.canDo() || b.undo.saveStep(),
                    c.get(0) == b.el ? c.removeAttr("src") : ("A" == c.get(0).parentNode.tagName ? (b.selection.setBefore(c.get(0).parentNode) || b.selection.setAfter(c.get(0).parentNode) || c.parent().after(a.FE.MARKERS),
                            a(c.get(0).parentNode).remove()) : (b.selection.setBefore(c.get(0)) || b.selection.setAfter(c.get(0)) || c.after(a.FE.MARKERS),
                            c.remove()),
                        b.html.fillEmptyBlocks(),
                        b.selection.restore()),
                    b.undo.saveStep())
            }

            function _(c) {
                var d = c.which;
                if (Da && (d == a.FE.KEYCODE.BACKSPACE || d == a.FE.KEYCODE.DELETE)) return c.preventDefault(),
                    c.stopPropagation(),
                    $(), !1;
                if (Da && d == a.FE.KEYCODE.ESC) {
                    var e = Da;
                    return ja(!0),
                        b.selection.setAfter(e.get(0)),
                        b.selection.restore(),
                        c.preventDefault(), !1
                }
                if (Da && (d == a.FE.KEYCODE.ARROW_LEFT || d == a.FE.KEYCODE.ARROW_RIGHT)) {
                    var f = Da.get(0);
                    return ja(!0),
                        d == a.FE.KEYCODE.ARROW_LEFT ? b.selection.setBefore(f) : b.selection.setAfter(f),
                        b.selection.restore(),
                        c.preventDefault(), !1
                }
                return Da && d != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c) ? (c.preventDefault(),
                    c.stopPropagation(), !1) : void 0
            }

            function aa(a) {
                if (a && "IMG" == a.tagName) b.node.hasClass(a, "fr-uploading") || b.node.hasClass(a, "fr-error") ? a.parentNode.removeChild(a) : b.node.hasClass(a, "fr-draggable") && a.classList.remove("fr-draggable");
                else if (a && a.nodeType == Node.ELEMENT_NODE)
                    for (var c = a.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"),
                            d = 0; d < c.length; d++) aa(c[d])
            }

            function ba() {
                if (L(),
                    "IMG" == b.el.tagName && b.$el.addClass("fr-view"),
                    b.events.$on(b.$el, b.helpers.isMobile() && !b.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', ia),
                    b.helpers.isMobile() && (b.events.$on(b.$el, "touchstart", "IMG" == b.el.tagName ? null : 'img:not([contenteditable="false"])', function() { Ra = !1 }),
                        b.events.$on(b.$el, "touchmove", function() { Ra = !0 })),
                    b.$wp ? (b.events.on("window.keydown keydown", _, !0),
                        b.events.on("keyup", function(b) { if (Da && b.which == a.FE.KEYCODE.ENTER) return !1 }, !0)) : b.events.$on(b.$win, "keydown", _),
                    b.events.on("toolbar.esc", function() {
                        if (Da) {
                            if (b.$wp) b.events.disableBlur(),
                                b.events.focus();
                            else {
                                var a = Da;
                                ja(!0),
                                    b.selection.setAfter(a.get(0)),
                                    b.selection.restore()
                            }
                            return !1
                        }
                    }, !0),
                    b.events.on("toolbar.focusEditor", function() { if (Da) return !1 }, !0),
                    b.events.on("window.cut window.copy", function(a) {
                        Da && b.popups.isVisible("image.edit") && !b.popups.get("image.edit").find(":focus").length && (wa(),
                            b.paste.saveCopiedText(Da.get(0).outerHTML, "\n"),
                            "copy" == a.type ? setTimeout(function() { w(Da) }) : (ja(!0),
                                b.undo.saveStep(),
                                setTimeout(function() { b.undo.saveStep() },
                                    0)))
                    }, !0),
                    b.browser.msie && b.events.on("keydown", function(c) {
                        if (!b.selection.isCollapsed() || !Da) return !0;
                        var d = c.which;
                        d == a.FE.KEYCODE.C && b.keys.ctrlKey(c) ? b.events.trigger("window.copy") : d == a.FE.KEYCODE.X && b.keys.ctrlKey(c) && b.events.trigger("window.cut")
                    }),
                    b.events.$on(a(b.o_win),
                        "keydown",
                        function(b) {
                            var c = b.which;
                            if (Da && c == a.FE.KEYCODE.BACKSPACE) return b.preventDefault(), !1
                        }),
                    b.events.$on(b.$win, "keydown", function(b) {
                        var c = b.which;
                        Da && Da.hasClass("fr-uploading") && c == a.FE.KEYCODE.ESC && Da.trigger("abortUpload")
                    }),
                    b.events.on("destroy", function() { Da && Da.hasClass("fr-uploading") && Da.trigger("abortUpload") }),
                    b.events.on("paste.before", ga),
                    b.events.on("paste.beforeCleanup", ha),
                    b.events.on("paste.after", da),
                    b.events.on("html.set", i),
                    b.events.on("html.inserted", i),
                    i(),
                    b.events.on("destroy", function() { Qa = [] }),
                    b.events.on("html.processGet", aa),
                    b.opts.imageOutputSize) {
                    var c;
                    b.events.on("html.beforeGet", function() {
                        c = b.el.querySelectorAll("img");
                        for (var d = 0; d < c.length; d++) {
                            var e = c[d].style.width || a(c[d]).width(),
                                f = c[d].style.height || a(c[d]).height();
                            e && c[d].setAttribute("width", ("" + e).replace(/px/, "")),
                                f && c[d].setAttribute("height", ("" + f).replace(/px/, ""))
                        }
                    })
                }
                b.opts.iframe && b.events.on("image.loaded", b.size.syncIframe),
                    b.$wp && (j(),
                        b.events.on("contentChanged", j)),
                    b.events.$on(a(b.o_win),
                        "orientationchange.image",
                        function() {
                            setTimeout(function() { Da && w(Da) },
                                100)
                        }),
                    q(!0),
                    M(!0),
                    T(!0),
                    P(!0),
                    b.events.on("node.remove", function(a) {
                        if ("IMG" == a.get(0).tagName) return $(a), !1
                    })
            }

            function ca(c) {
                if (!1 === b.events.trigger("image.beforePasteUpload", [c])) return !1;
                Da = a(c),
                    k(),
                    e(),
                    va(),
                    r();
                for (var d = atob(a(c).attr("src").split(",")[1]),
                        f = [], g = 0; g < d.length; g++) f.push(d.charCodeAt(g));
                H([new Blob([new Uint8Array(f)], { type: "image/jpeg" })], Da)
            }

            function da() {
                b.opts.imagePaste ? b.$el.find("img[data-fr-image-pasted]").each(function(c, d) {
                    if (b.opts.imagePasteProcess) {
                        var e = b.opts.imageDefaultWidth;
                        e && "auto" != e && (e += b.opts.imageResizeWithPercent ? "%" : "px"),
                            a(d).css("width", e).removeClass("fr-dii fr-dib fr-fir fr-fil").addClass((b.opts.imageDefaultDisplay ? "fr-di" + b.opts.imageDefaultDisplay[0] : "") + (b.opts.imageDefaultAlign && "center" != b.opts.imageDefaultAlign ? " fr-fi" + b.opts.imageDefaultAlign[0] : ""))
                    }
                    if (0 === d.src.indexOf("data:")) ca(d);
                    else if (0 === d.src.indexOf("blob:")) {
                        var f = new Image;
                        f.crossOrigin = "Anonymous", f.onload = function() {
                                var a = b.o_doc.createElement("CANVAS"),
                                    c = a.getContext("2d");
                                a.height = this.naturalHeight, a.width = this.naturalWidth, c.drawImage(this, 0, 0),
                                    d.src = a.toDataURL("image/png"),
                                    ca(d)
                            },
                            f.src = d.src
                    } else 0 !== d.src.indexOf("http") || 0 === d.src.indexOf("https://mail.google.com/mail") ? (b.selection.save(),
                        a(d).remove(),
                        b.selection.restore()) : a(d).removeAttr("data-fr-image-pasted")
                }) : b.$el.find("img[data-fr-image-pasted]").remove()
            }

            function ea(a) {
                var c = a.target.result,
                    d = b.opts.imageDefaultWidth;
                d && "auto" != d && (d += b.opts.imageResizeWithPercent ? "%" : "px"),
                    b.html.insert('<img data-fr-image-pasted="true" class="' + (b.opts.imageDefaultDisplay ? "fr-di" + b.opts.imageDefaultDisplay[0] : "") + (b.opts.imageDefaultAlign && "center" != b.opts.imageDefaultAlign ? " fr-fi" + b.opts.imageDefaultAlign[0] : "") + '" src="' + c + '"' + (d ? ' style="width: ' + d + ';"' : "") + ">"),
                    b.events.trigger("paste.after")
            }

            function fa(a) {
                var b = new FileReader;
                b.onload = ea, b.readAsDataURL(a)
            }

            function ga(a) {
                if (a && a.clipboardData && a.clipboardData.items) {
                    var b = null;
                    if (a.clipboardData.getData("text/rtf")) b = a.clipboardData.items[0].getAsFile();
                    else
                        for (var c = 0; c < a.clipboardData.items.length && !(b = a.clipboardData.items[c].getAsFile()); c++);
                    if (b) return fa(b), !1
                }
            }

            function ha(a) { return a = a.replace(/<img /gi, '<img data-fr-image-pasted="true" ') }

            function ia(c) {
                if ("false" == a(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
                if (c && "touchend" == c.type && Ra) return !0;
                if (c && b.edit.isDisabled()) return c.stopPropagation(),
                    c.preventDefault(), !1;
                for (var d = 0; d < a.FE.INSTANCES.length; d++) a.FE.INSTANCES[d] != b && a.FE.INSTANCES[d].events.trigger("image.hideResizer");
                b.toolbar.disable(),
                    c && (c.stopPropagation(),
                        c.preventDefault()),
                    b.helpers.isMobile() && (b.events.disableBlur(),
                        b.$el.blur(),
                        b.events.enableBlur()),
                    b.opts.iframe && b.size.syncIframe(),
                    Da = a(this),
                    b.browser.msie || wa(),
                    k(),
                    e(),
                    b.browser.msie || b.selection.clear(),
                    b.helpers.isIOS() && (b.events.disableBlur(),
                        b.$el.blur()),
                    b.button.bulkRefresh(),
                    b.events.trigger("video.hideResizer")
            }

            function ja(a) {
                Da && (ma() || !0 === a) && (b.toolbar.enable(),
                    Ea.removeClass("fr-active"),
                    b.popups.hide("image.edit"),
                    Da = null, la())
            }

            function ka() { Sa = !0 }

            function la() { Sa = !1 }

            function ma() { return Sa }

            function na(a, c, d) {
                !b.opts.htmlUntouched && b.opts.useClasses ? (a.removeClass("fr-fil fr-fir fr-dib fr-dii"),
                    d && a.addClass("fr-fi" + d[0]),
                    c && a.addClass("fr-di" + c[0])) : "inline" == c ? (a.css({ display: "inline-block", verticalAlign: "bottom", margin: b.opts.imageDefaultMargin }),
                    "center" == d ? a.css({ float: "none", marginBottom: "", marginTop: "", maxWidth: "calc(100% - " + 2 * b.opts.imageDefaultMargin + "px)" }) : "left" == d ? a.css({ float: "left", marginLeft: 0, maxWidth: "calc(100% - " + b.opts.imageDefaultMargin + "px)" }) : a.css({ float: "right", marginRight: 0, maxWidth: "calc(100% - " + b.opts.imageDefaultMargin + "px)" })) : "block" == c && (a.css({ display: "block", float: "none", verticalAlign: "top", margin: b.opts.imageDefaultMargin + "px auto" }),
                    "left" == d ? a.css({ marginLeft: 0 }) : "right" == d && a.css({ marginRight: 0 }))
            }

            function oa(a) {
                var c = za();
                c.removeClass("fr-fir fr-fil"), !b.opts.htmlUntouched && b.opts.useClasses ? "left" == a ? c.addClass("fr-fil") : "right" == a && c.addClass("fr-fir") : na(c, qa(),
                        a),
                    wa(),
                    k(),
                    e(),
                    b.selection.clear()
            }

            function pa(a) {
                if (void 0 === a && (a = za()),
                    a) {
                    if (a.hasClass("fr-fil")) return "left";
                    if (a.hasClass("fr-fir")) return "right";
                    if (a.hasClass("fr-dib") || a.hasClass("fr-dii")) return "center";
                    var b = a.css("float");
                    if (a.css("float", "none"),
                        "block" == a.css("display")) {
                        if (a.css("float", ""),
                            a.css("float") != b && a.css("float", b),
                            0 === parseInt(a.css("margin-left"),
                                10)) return "left";
                        if (0 === parseInt(a.css("margin-right"),
                                10)) return "right"
                    } else {
                        if (a.css("float", ""),
                            a.css("float") != b && a.css("float", b),
                            "left" == a.css("float")) return "left";
                        if ("right" == a.css("float")) return "right"
                    }
                }
                return "center"
            }

            function qa(a) {
                void 0 === a && (a = za());
                var b = a.css("float");
                return a.css("float", "none"),
                    "block" == a.css("display") ? (a.css("float", ""),
                        a.css("float") != b && a.css("float", b),
                        "block") : (a.css("float", ""),
                        a.css("float") != b && a.css("float", b),
                        "inline")
            }

            function ra(a) { Da && a.find("> *:first").replaceWith(b.icon.create("image-align-" + pa())) }

            function sa(a, b) { Da && b.find('.fr-command[data-param1="' + pa() + '"]').addClass("fr-active").attr("aria-selected", !0) }

            function ta(a) {
                var c = za();
                c.removeClass("fr-dii fr-dib"), !b.opts.htmlUntouched && b.opts.useClasses ? "inline" == a ? c.addClass("fr-dii") : "block" == a && c.addClass("fr-dib") : na(c, a, pa()),
                    wa(),
                    k(),
                    e(),
                    b.selection.clear()
            }

            function ua(a, b) { Da && b.find('.fr-command[data-param1="' + qa() + '"]').addClass("fr-active").attr("aria-selected", !0) }

            function va() {
                var a = b.popups.get("image.insert");
                a || (a = M()),
                    b.popups.isVisible("image.insert") || (s(),
                        b.popups.refresh("image.insert"),
                        b.popups.setContainer("image.insert", b.$sc));
                var c = za();
                Ba() && (c = c.find(".fr-img-wrap"));
                var d = c.offset().left + c.outerWidth(!0) / 2,
                    e = c.offset().top + c.outerHeight(!0);
                b.popups.show("image.insert", d, e, c.outerHeight(!0))
            }

            function wa() {

                if (Da) {
                    b.events.disableBlur(),
                        b.selection.clear();
                    var a = b.doc.createRange();
                    a.selectNode(Da.get(0));
                    b.selection.get().addRange(a),
                        b.events.enableBlur()
                }
            }

            function xa() {
                Da ? (b.events.disableBlur(),
                    a(".fr-popup input:focus").blur(),
                    w(Da)) : (b.events.disableBlur(),
                    b.selection.restore(),
                    b.events.enableBlur(),
                    b.popups.hide("image.insert"),
                    b.toolbar.showInline())
            }

            function ya() { return Da }

            function za() { return Ba() ? Da.parents(".fr-img-caption:first") : Da }

            function Aa(a, c, d) {
                if (void 0 === c && (c = b.opts.imageStyles),
                    void 0 === d && (d = b.opts.imageMultipleStyles), !Da) return !1;
                if (!d) {
                    var e = Object.keys(c);
                    e.splice(e.indexOf(a),
                            1),
                        Da.removeClass(e.join(" "))
                }
                "object" == typeof c[a] ? (Da.removeAttr("style"),
                        Da.css(c[a].style)) : Da.toggleClass(a),
                    w(Da)
            }

            function Ba() { return !!Da && Da.parents(".fr-img-caption").length > 0 }

            function Ca() {
                var c;
                Da && !Ba() ? (c = Da, Da.parent().is("a") && (c = Da.parent()),
                    c.wrap('<span contenteditable="false" class="fr-img-caption ' + Da.attr("class") + '" draggable="false"></span>'),
                    c.wrap('<span class="fr-img-wrap"></span>'),
                    c.after('<span class="fr-inner" contenteditable="true">' + a.FE.START_MARKER + "Image caption" + a.FE.END_MARKER + "</span>"),
                    Da.removeAttr("class"),
                    Da.parent().css("width", Da.width()),
                    ja(!0),
                    b.selection.restore()) : (c = za(),
                    Da.insertAfter(c),
                    Da.attr("class", c.attr("class").replace("fr-img-caption", "")),
                    c.remove(),
                    w(Da))
            }
            var Da, Ea, Fa, Ga, Ha = !1,
                Ia = 1,
                Ja = 2,
                Ka = 3,
                La = 4,
                Ma = 5,
                Na = 6,
                Oa = 8,
                Pa = {};
            Pa[Ia] = "Image cannot be loaded from the passed link.", Pa[Ja] = "No link in upload response.", Pa[Ka] = "Error during file upload.", Pa[La] = "Parsing response failed.", Pa[Ma] = "File is too large.", Pa[Na] = "Image file type is invalid.", Pa[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", Pa[Oa] = "Image file is corrupted.";
            var Qa, Ra, Sa = !1;
            return { _init: ba, showInsertPopup: d, showLayer: V, refreshUploadButton: W, refreshByURLButton: X, upload: H, insertByURL: v, align: oa, refreshAlign: ra, refreshAlignOnShow: sa, display: ta, refreshDisplayOnShow: ua, replace: va, back: xa, get: ya, getEl: za, insert: y, showProgressBar: r, remove: $, hideProgressBar: s, applyStyle: Aa, showAltPopup: O, showSizePopup: S, setAlt: Q, setSize: U, toggleCaption: Ca, hasCaption: Ba, exitEdit: ja, edit: w }

        },
        a.FE.DefineIcon("insertImage", { NAME: "image" }),
        a.FE.RegisterShortcut(a.FE.KEYCODE.P, "insertImage", null, "P"),
        a.FE.RegisterCommand("insertImage", {
            title: "Insert Image",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
                        this.selection.restore()),
                    this.popups.hide("image.insert")) : this.image.showInsertPopup()
            },
            plugin: "image"
        }),
        a.FE.DefineIcon("imageUpload", { NAME: "upload" }),
        a.FE.RegisterCommand("imageUpload", {
            title: "Upload Image",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() { this.image.showLayer("image-upload") },
            refresh: function(a) { this.image.refreshUploadButton(a) }
        }),
        a.FE.DefineIcon("imageByURL", { NAME: "link" }),
        a.FE.RegisterCommand("imageByURL", {
            title: "By URL",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() { this.image.showLayer("image-by-url") },
            refresh: function(a) { this.image.refreshByURLButton(a) }
        }),
        a.FE.RegisterCommand("imageInsertByURL", {
            title: "Insert Image",
            undo: !0,
            refreshAfterCallback: !1,
            callback: function() { this.image.insertByURL() },
            refresh: function(a) { this.image.get() ? a.text(this.language.translate("Replace")) : a.text(this.language.translate("Insert")) }
        }),
        a.FE.DefineIcon("imageDisplay", { NAME: "star" }),
        a.FE.RegisterCommand("imageDisplay", {
            title: "Display",
            type: "dropdown",
            options: { inline: "Inline", block: "Break Text" },
            callback: function(a, b) { this.image.display(b) },
            refresh: function(a) { this.opts.imageTextNear || a.addClass("fr-hidden") },
            refreshOnShow: function(a, b) { this.image.refreshDisplayOnShow(a, b) }
        }),
        a.FE.DefineIcon("image-align", { NAME: "align-left" }),
        a.FE.DefineIcon("image-align-left", { NAME: "align-left" }),
        a.FE.DefineIcon("image-align-right", { NAME: "align-right" }),
        a.FE.DefineIcon("image-align-center", { NAME: "align-justify" }),
        a.FE.DefineIcon("imageAlign", { NAME: "align-justify" }),
        a.FE.RegisterCommand("imageAlign", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "None", right: "Align Right" },
            html: function() {
                var b = '<ul class="fr-dropdown-list" role="presentation">',
                    c = a.FE.COMMANDS.imageAlign.options;
                for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("image-align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
                return b += "</ul>"
            },
            callback: function(a, b) { this.image.align(b) },
            refresh: function(a) { this.image.refreshAlign(a) },
            refreshOnShow: function(a, b) { this.image.refreshAlignOnShow(a, b) }
        }),
        a.FE.DefineIcon("imageReplace", { NAME: "exchange" }),
        a.FE.RegisterCommand("imageReplace", {
            title: "Replace",
            undo: !1,
            focus: !1,
            popup: !0,
            refreshAfterCallback: !1,
            callback: function() { this.image.replace() }
        }),
        a.FE.DefineIcon("imageRemove", { NAME: "trash" }),
        a.FE.RegisterCommand("imageRemove", {
            title: "Remove",
            callback: function() { this.image.remove() }
        }),
        a.FE.DefineIcon("imageBack", { NAME: "arrow-left" }),
        a.FE.RegisterCommand("imageBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            callback: function() { this.image.back() },
            refresh: function(a) {
                this.image.get() || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
                    a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
                    a.next(".fr-separator").addClass("fr-hidden"))
            }
        }),
        a.FE.RegisterCommand("imageDismissError", {
            title: "OK",
            undo: !1,
            callback: function() { this.image.hideProgressBar(!0) }
        }),
        a.FE.DefineIcon("imageStyle", { NAME: "magic" }),
        a.FE.RegisterCommand("imageStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var a = '<ul class="fr-dropdown-list" role="presentation">',
                    b = this.opts.imageStyles;
                for (var c in b)
                    if (b.hasOwnProperty(c)) {
                        var d = b[c];
                        "object" == typeof d && (d = d.title),
                            a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + c + '">' + this.language.translate(d) + "</a></li>"
                    }
                return a += "</ul>"
            },
            callback: function(a, b) { this.image.applyStyle(b) },
            refreshOnShow: function(b, c) {
                var d = this.image.get();
                d && c.find(".fr-command").each(function() {
                    var b = a(this).data("param1"),
                        c = d.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        }),
        a.FE.DefineIcon("imageAlt", { NAME: "info" }),
        a.FE.RegisterCommand("imageAlt", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Alternate Text",
            callback: function() { this.image.showAltPopup() }
        }),
        a.FE.RegisterCommand("imageSetAlt", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() { this.image.setAlt() }
        }),
        a.FE.DefineIcon("imageSize", { NAME: "arrows-alt" }),
        a.FE.RegisterCommand("imageSize", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Change Size",
            callback: function() { this.image.showSizePopup() }
        }),
        a.FE.RegisterCommand("imageSetSize", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() { this.image.setSize() }
        }),
        a.FE.DefineIcon("imageCaption", { NAME: "commenting" }),
        a.FE.RegisterCommand("imageCaption", {
            undo: !0,
            focus: !1,
            title: "Image Caption",
            refreshAfterCallback: !0,
            callback: function() { this.image.toggleCaption() },
            refresh: function(a) { this.image.get() && a.toggleClass("fr-active", this.image.hasCaption()) }
        })
});
/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    if (a.extend(a.FE.DEFAULTS, {
        imageManagerLoadURL: "/FileApi/loadfiles",
        imageManagerLoadMethod: "get", imageManagerLoadParams: {},
        imageManagerPreloader: "", imageManagerDeleteURL: "", imageManagerDeleteMethod: "post", imageManagerDeleteParams: {},
        imageManagerPageSize: 12, imageManagerScrollOffset: 20, imageManagerToggleTags: !0
    }),
    a.FE.PLUGINS.imageManager = function (b) {
    function c() {
    if (!z) {
    var a = '<div class="fr-modal-head-line"><i class="fa fa-bars fr-modal-more fr-not-available" id="fr-modal-more-' + b.sid + '" title="' + b.language.translate("Tags") + '"></i><h4 data-text="true">' + b.language.translate("Manage Images") + "</h4></div>"; a += '<div class="fr-modal-tags" id="fr-modal-tags"></div>'; var c = '<img class="fr-preloader" id="fr-preloader" alt="' + b.language.translate("Loading") + '.." src="' + b.opts.imageManagerPreloader + '" style="display: none;">'; c += '<div class="fr-image-list" id="fr-image-list"></div>'; var d = b.modals.create(K, a, c);
    z = d.$modal, A = d.$head, B = d.$body
    }
    z.data("current-image", b.image.get()),
    b.modals.show(K),
    C || x(),
    g()
    }
    function d() { b.modals.hide(K) }
    function e() {
    var b = a(window).outerWidth();
    return b < 768 ? 2 : b < 1200 ? 3 : 4
    }
    function f() {
    D.empty();
    for (var a = 0; a < J; a++) D.append('<div class="fr-list-column"></div>')
    }
    function g() {
    C.show(),
    D.find(".fr-list-column").empty(),
    b.opts.imageManagerLoadURL ? a.ajax({
        url: b.opts.imageManagerLoadURL, method: b.opts.imageManagerLoadMethod, data: b.opts.imageManagerLoadParams, dataType: "json", crossDomain: b.opts.requestWithCORS, xhrFields: { withCredentials: b.opts.requestWithCredentials },
        headers: b.opts.requestHeaders
    }).done(function (a, c, d) {
    b.events.trigger("imageManager.imagesLoaded", [a]),
    h(a, d.response),
    C.hide()
    }).fail(function () {
    var a = this.xhr();
    s(M, a.response || a.responseText)
    }) : s(N)
    }
    function h(a, b) {
    try {
    D.find(".fr-list-column").empty(),
    G = 0, H = 0, I = 0, F = a, i()
    }
    catch (c) { s(O, b) }
    }
    function i() {
    if (H < F.length && (D.outerHeight() <= B.outerHeight() + b.opts.imageManagerScrollOffset || B.scrollTop() + b.opts.imageManagerScrollOffset > D.outerHeight() - B.outerHeight())) {
    G++; for (var a = b.opts.imageManagerPageSize * (G - 1) ;
    a < Math.min(F.length, b.opts.imageManagerPageSize * G) ;
    a++) j(F[a])
    }
    }
    function j(c) {
    var d = new Image, e = a('<div class="fr-image-container fr-empty fr-image-' + I++ + '" data-loading="' + b.language.translate("Loading") + '.." data-deleting="' + b.language.translate("Deleting") + '..">');
    n(!1),
    d.onload = function () {
    e.height(Math.floor(e.width() / d.width * d.height));
    var f = a("<img/>");

    if (c.thumb) f.attr("src", c.thumb);
    else {
    if (s(P, c),
    !c.url) return s(Q, c),
    !1; f.attr("src", c.url)
    }

    if (c.url && f.attr("data-url", c.url),
    c.tag)
    if (A.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"),
    A.find(".fr-modal-tags").show(),
    c.tag.indexOf(",") >= 0) {
    for (var g = c.tag.split(","),
    h = 0; h < g.length; h++) g[h] = g[h].trim(),
    0 === E.find('a[title="' + g[h] + '"]').length && E.append('<a role="button" title="' + g[h] + '">' + g[h] + "</a>");
    f.attr("data-tag", g.join())
    }
    else 0 === E.find('a[title="' + c.tag.trim() + '"]').length && E.append('<a role="button" title="' + c.tag.trim() + '">' + c.tag.trim() + "</a>"),
    f.attr("data-tag", c.tag.trim());
    c.name && f.attr("alt", c.name);
    for (var j in c) c.hasOwnProperty(j) && "thumb" != j && "url" != j && "tag" != j && f.attr("data-" + j, c[j]);
    e.append(f).append(a(b.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title", b.language.translate("Delete"))).append(a(b.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title", b.language.translate("Insert"))),
    E.find(".fr-selected-tag").each(function (a, b) { w(f, b.text) || e.hide() }),
    f.on("load", function () {
    e.removeClass("fr-empty"),
    e.height("auto"),
    H++, m(l(parseInt(f.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)),
    n(!1),
    H % b.opts.imageManagerPageSize == 0 && i()
    }),
    b.events.trigger("imageManager.imageLoaded", [f])
    },
    d.onerror = function () {
    H++, e.remove(),
    m(l(parseInt(e.attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)),
    s(L, c),
    H % b.opts.imageManagerPageSize == 0 && i()
    },
    d.src = c.thumb || c.url, k().append(e)
    }
    function k() {
    var b, c; return D.find(".fr-list-column").each(function (d, e) {
    var f = a(e);
    0 === d ? (c = f.outerHeight(),
    b = f) : f.outerHeight() < c && (c = f.outerHeight(),
    b = f)
    }),
    b
    }
    function l(b) {
    void 0 === b && (b = 0);
    for (var c = [], d = I - 1; d >= b; d--) {
    var e = D.find(".fr-image-" + d);
    e.length && (c.push(e),
    a('<div id="fr-image-hidden-container">').append(e),
    D.find(".fr-image-" + d).remove())
    }
    return c
    }
    function m(a) { for (var b = a.length - 1; b >= 0; b--) k().append(a[b]) }
    function n(a) {
    if (void 0 === a && (a = !0),
    !z.is(":visible")) return !0; var c = e();

    if (c != J) {
    J = c; var d = l();
    f(),
    m(d)
    }
    b.modals.resize(K),
    a && i()
    }
    function o(a) {
    var b = {},
    c = a.data();
    for (var d in c) c.hasOwnProperty(d) && "url" != d && "tag" != d && (b[d] = c[d]);
    return b
    }
    function p(c) {
    var d = a(c.currentTarget).siblings("img"),
    e = z.data("instance") || b, f = z.data("current-image");

    if (b.modals.hide(K),
    e.image.showProgressBar(),
    f) f.data("fr-old-src", f.attr("src")),
    f.trigger("click");
    else {
    e.events.focus(!0),
    e.selection.restore();
    var g = e.position.getBoundingRect(),
    h = g.left + g.width / 2 + a(b.doc).scrollLeft(),
    i = g.top + g.height + a(b.doc).scrollTop();
    e.popups.setContainer("image.insert", b.$sc),
    e.popups.show("image.insert", h, i)
    }
    e.image.insert(d.data("url"),
    !1, o(d),
    f)
    }
    function q() {
    z.find("#fr-modal-tags > a").each(function () { 0 === z.find('#fr-image-list [data-tag*="' + a(this).text() + '"]').length && a(this).removeClass("fr-selected-tag").hide() }),
    u()
    }
    function r(c) {
    var d = a(c.currentTarget).siblings("img"),
    e = b.language.translate("Are you sure? Image will be deleted.");
    confirm(e) && (b.opts.imageManagerDeleteURL ? !1 !== b.events.trigger("imageManager.beforeDeleteImage", [d]) && (d.parent().addClass("fr-image-deleting"),
    a.ajax({
        method: b.opts.imageManagerDeleteMethod, url: b.opts.imageManagerDeleteURL, data: a.extend(a.extend({ src: d.attr("src") },
    o(d)),
    b.opts.imageManagerDeleteParams),
        crossDomain: b.opts.requestWithCORS, xhrFields: { withCredentials: b.opts.requestWithCredentials },
        headers: b.opts.requestHeaders
    }).done(function (a) {
    b.events.trigger("imageManager.imageDeleted", [a]);
    var c = l(parseInt(d.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1);
    d.parent().remove(),
    m(c),
    q(),
    n(!0)
    }).fail(function () {
    var a = this.xhr();
    s(R, a.response || a.responseText)
    })) : s(S))
    }
    function s(c, d) {
    10 <= c && c < 20 ? C.hide() : 20 <= c && c < 30 && a(".fr-image-deleting").removeClass("fr-image-deleting"),
    b.events.trigger("imageManager.error", [{ code: c, message: T[c] },
    d])
    }
    function t() {
    var a = A.find(".fr-modal-head-line").outerHeight(),
    b = E.outerHeight();
    A.toggleClass("fr-show-tags"),
    A.hasClass("fr-show-tags") ? (A.css("height", a + b),
    E.find("a").css("opacity", 1)) : (A.css("height", a),
    E.find("a").css("opacity", 0))
    }
    function u() {
    var b = E.find(".fr-selected-tag");
    b.length > 0 ? (D.find("img").parent().show(),
    b.each(function (b, c) {
    D.find("img").each(function (b, d) {
    var e = a(d);
    w(e, c.text) || e.parent().hide()
    })
    })) : D.find("img").parent().show(),
    m(l()),
    i()
    }
    function v(c) {
    c.preventDefault();
    var d = a(c.currentTarget);
    d.toggleClass("fr-selected-tag"),
    b.opts.imageManagerToggleTags && d.siblings("a").removeClass("fr-selected-tag"),
    u()
    }
    function w(a, b) {
    for (var c = (a.attr("data-tag") || "").split(","),
    d = 0; d < c.length; d++)
    if (c[d] == b) return !0; return !1
    }
    function x() {
    C = z.find("#fr-preloader"),
    D = z.find("#fr-image-list"),
    E = z.find("#fr-modal-tags"),
    J = e(),
    f(),
    A.css("height", A.find(".fr-modal-head-line").outerHeight()),
    b.events.$on(a(b.o_win),
    "resize", function () { n(F ? !0 : !1) }),
    b.helpers.isMobile() && (b.events.bindClick(D, "div.fr-image-container", function (b) {
    z.find(".fr-mobile-selected").removeClass("fr-mobile-selected"),
    a(b.currentTarget).addClass("fr-mobile-selected")
    }),
    z.on(b._mousedown, function () { z.find(".fr-mobile-selected").removeClass("fr-mobile-selected") })),
    b.events.bindClick(D, ".fr-insert-img", p),
    b.events.bindClick(D, ".fr-delete-img", r),
    z.on(b._mousedown + " " + b._mouseup, function (a) { a.stopPropagation() }),
    z.on(b._mousedown, "*", function () { b.events.disableBlur() }),
    B.on("scroll", i),
    b.events.bindClick(z, "i#fr-modal-more-" + b.sid, t),
    b.events.bindClick(E, "a", v)
    }
    function y() {
    if (!b.$wp && "IMG" != b.el.tagName) return !1
    }
    var z, A, B, C, D, E, F, G, H, I, J, K = "image_manager", L = 10, M = 11, N = 12, O = 13, P = 14, Q = 15, R = 21, S = 22, T = {};
    return T[L] = "Image cannot be loaded from the passed link.", T[M] = "Error during load images request.", T[N] = "Missing imageManagerLoadURL option.", T[O] = "Parsing load response failed.", T[P] = "Missing image thumb.", T[Q] = "Missing image URL.", T[R] = "Error during delete image request.", T[S] = "Missing imageManagerDeleteURL option.", { require: ["image"], _init: y, show: c, hide: d }
    },
    !a.FE.PLUGINS.image) throw new Error("Image manager plugin requires image plugin.");
    a.FE.DEFAULTS.imageInsertButtons.push("imageManager"),
    a.FE.RegisterCommand("imageManager", {
        title: "Browse", undo: !1, focus: !1, modal: !0, callback: function () { this.imageManager.show() },
        plugin: "imageManager"
    }),
    a.FE.DefineIcon("imageManager", { NAME: "folder" }),
    a.FE.DefineIcon("imageManagerInsert", { NAME: "plus" }),
    a.FE.DefineIcon("imageManagerDelete", { NAME: "trash" })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { inlineStyles: { "Big Red": "font-size: 20px; color: red;", "Small Blue": "font-size: 14px; color: blue;" } }),
    a.FE.PLUGINS.inlineStyle = function (b) {
        function c(c) { "" !== b.selection.text() ? b.html.insert(a.FE.START_MARKER + '<span style="' + c + '">' + b.selection.text() + "</span>" + a.FE.END_MARKER) : b.html.insert('<span style="' + c + '">' + a.FE.INVISIBLE_SPACE + a.FE.MARKERS + "</span>") }
        return { apply: c }
    },
    a.FE.RegisterCommand("inlineStyle", {
        type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.inlineStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><span style="' + b[c] + '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="' + b[c] + '" title="' + this.language.translate(c) + '">' + this.language.translate(c) + "</a></span></li>");
            return a += "</ul>"
        },
        title: "Inline Style", callback: function (a, b) { this.inlineStyle.apply(b) },
        plugin: "inlineStyle"
    }),
    a.FE.DefineIcon("inlineStyle", { NAME: "paint-brush" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly"], lineBreakerOffset: 15, lineBreakerHorizontalOffset: 10 }),
    a.FE.PLUGINS.lineBreaker = function (b) {
        function c(a, c) {
            var d, e, f, g, h, i, j, k;
            if (null == a) g = c.parent(),
            h = g.offset().top, j = c.offset().top, d = j - Math.min((j - h) / 2, b.opts.lineBreakerOffset),
            f = g.outerWidth(),
            e = g.offset().left; else
                if (null == c) g = a.parent(),
                i = g.offset().top + g.outerHeight(),
                k = a.offset().top + a.outerHeight(),
                d = k + Math.min((i - k) / 2, b.opts.lineBreakerOffset),
                f = g.outerWidth(),
                e = g.offset().left; else {
                    g = a.parent();
                    var l = a.offset().top + a.height(),
                    m = c.offset().top;
                    if (l > m) return !1; d = (l + m) / 2, f = g.outerWidth(),
                    e = g.offset().left
                }
            b.opts.iframe && (e += b.$iframe.offset().left - b.helpers.scrollLeft(),
            d += b.$iframe.offset().top - b.helpers.scrollTop()),
            b.$box.append(q),
            q.css("top", d - b.win.pageYOffset),
            q.css("left", e - b.win.pageXOffset),
            q.css("width", f),
            q.data("tag1", a),
            q.data("tag2", c),
            q.addClass("fr-visible").data("instance", b)
        }
        function d(a, d) {
            var f, g, h = a.offset().top, i = a.offset().top + a.outerHeight();

            if (Math.abs(i - d) <= b.opts.lineBreakerOffset || Math.abs(d - h) <= b.opts.lineBreakerOffset)
                if (Math.abs(i - d) < Math.abs(d - h)) {
                    g = a.get(0);
                    for (var j = g.nextSibling; j && j.nodeType == Node.TEXT_NODE && 0 === j.textContent.length;) j = j.nextSibling;
                    if (!j) return c(a, null),
                    !0;
                    if (f = e(j)) return c(a, f),
                    !0
                }
                else {
                    if (g = a.get(0),
                    !g.previousSibling) return c(null, a),
                    !0;
                    if (f = e(g.previousSibling)) return c(f, a),
                    !0
                }
            q.removeClass("fr-visible").removeData("instance")
        }
        function e(c) {
            if (c) {
                var d = a(c);

                if (0 === b.$el.find(d).length) return null;
                if (c.nodeType != Node.TEXT_NODE && d.is(b.opts.lineBreakerTags.join(","))) return d;
                if (d.parents(b.opts.lineBreakerTags.join(",")).length > 0) return c = d.parents(b.opts.lineBreakerTags.join(",")).get(0),
                0 !== b.$el.find(c).length && a(c).is(b.opts.lineBreakerTags.join(",")) ? a(c) : null
            }
            return null
        }
        function f(c, d) {
            var e = b.doc.elementFromPoint(c, d);
            return e && !a(e).closest(".fr-line-breaker").length && !b.node.isElement(e) && e != b.$wp.get(0) && a(e).closest(b.$wp).length ? e : null
        }
        function g(a, c, d) {
            for (var e = d, g = null; e <= b.opts.lineBreakerOffset && !g;) g = f(a, c - e),
            g || (g = f(a, c + e)),
            e += d; return g
        }
        function h(a, c, d) {
            for (var e = null; !e && a > b.$box.offset().left && a < b.$box.offset().left + b.$box.outerWidth() ;
            ) e = f(a, c),
            e || (e = g(a, c, 5)),
            "left" == d ? a -= b.opts.lineBreakerHorizontalOffset : a += b.opts.lineBreakerHorizontalOffset; return e
        }
        function i(a) {
            s = null; var c = null, f = null, i = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            i && ("HTML" == i.tagName || "BODY" == i.tagName || b.node.isElement(i) || (i.getAttribute("class") || "").indexOf("fr-line-breaker") >= 0) ? (f = g(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset, 1),
            f || (f = h(a.pageX - b.win.pageXOffset - b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "left")),
            f || (f = h(a.pageX - b.win.pageXOffset + b.opts.lineBreakerHorizontalOffset, a.pageY - b.win.pageYOffset, "right")),
            c = e(f)) : c = e(i),
            c ? d(c, a.pageY) : b.core.sameInstance(q) && q.removeClass("fr-visible").removeData("instance")
        }
        function j(a) {
            return !(q.hasClass("fr-visible") && !b.core.sameInstance(q)) && (b.popups.areVisible() || b.el.querySelector(".fr-selected-cell") ? (q.removeClass("fr-visible"),
            !0) : void (!1 !== r || b.edit.isDisabled() || (s && clearTimeout(s),
            s = setTimeout(i, 30, a))))
        }
        function k() {
            s && clearTimeout(s),
            q.hasClass("fr-visible") && q.removeClass("fr-visible").removeData("instance")
        }
        function l() { r = !0, k() }
        function m() { r = !1 }
        function n(c) {
            if (!b.core.sameInstance(q)) return !0; c.preventDefault(),
            q.removeClass("fr-visible").removeData("instance");
            var d = q.data("tag1"),
            e = q.data("tag2"),
            f = b.html.defaultTag();
            null == d ? f && "TD" != e.parent().get(0).tagName && 0 === e.parents(f).length ? e.before("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : e.before(a.FE.MARKERS + "<br>") : f && "TD" != d.parent().get(0).tagName && 0 === d.parents(f).length ? d.after("<" + f + ">" + a.FE.MARKERS + "<br></" + f + ">") : d.after(a.FE.MARKERS + "<br>"),
            b.selection.restore()
        }
        function o() {
            b.shared.$line_breaker || (b.shared.$line_breaker = a('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')),
            q = b.shared.$line_breaker, b.events.on("shared.destroy", function () {
                q.html("").removeData().remove(),
                q = null
            },
            !0),
            b.events.on("destroy", function () {
                q.removeData("instance").removeClass("fr-visible").appendTo("body:first"),
                clearTimeout(s)
            },
            !0),
            b.events.$on(q, "mousemove", function (a) { a.stopPropagation() },
            !0),
            b.events.$on(q, "mousedown", "a", function (a) { a.stopPropagation() },
            !0),
            b.events.$on(q, "click", "a", n, !0)
        }
        function p() {
            if (!b.$wp) return !1; o(),
            r = !1, b.events.$on(b.$win, "mousemove", j),
            b.events.$on(a(b.win),
            "scroll", k),
            b.events.on("popups.show.table.edit", k),
            b.events.on("commands.after", k),
            b.events.$on(a(b.win),
            "mousedown", l),
            b.events.$on(a(b.win),
            "mouseup", m)
        }
        var q, r, s; return { _init: p }
    }
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "link.edit": "[_BUTTONS_]", "link.insert": "[_BUTTONS_][_INPUT_LAYER_]" }),
    a.extend(a.FE.DEFAULTS, {
        linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"], linkInsertButtons: ["linkBack", "|", "linkList"], linkAttributes: {},
        linkAutoPrefix: "http://", linkStyles: { "fr-green": "Green", "fr-strong": "Thick" },
        linkMultipleStyles: !0, linkConvertEmailAddress: !0, linkAlwaysBlank: !1, linkAlwaysNoFollow: !1, linkList: [{ text: "Froala", href: "https://froala.com", target: "_blank" },
        { text: "Google", href: "https://google.com", target: "_blank" },
        { displayText: "Facebook", href: "https://facebook.com" }], linkText: !0
    }),
    a.FE.PLUGINS.link = function (b) {
        function c() {
            var c = b.image ? b.image.get() : null;
            if (!c && b.$wp) {
                var d = b.selection.ranges(0).commonAncestorContainer;
                if (d && (d.contains && d.contains(b.el) || !b.el.contains(d) || b.el == d) && (d = null),
                d && "A" === d.tagName) return d; var e = b.selection.element(),
                f = b.selection.endElement();
                return "A" == e.tagName || b.node.isElement(e) || (e = a(e).parentsUntil(b.$el, "a:first").get(0)),
                "A" == f.tagName || b.node.isElement(f) || (f = a(f).parentsUntil(b.$el, "a:first").get(0)),
                f && (f.contains && f.contains(b.el) || !b.el.contains(f) || b.el == f) && (f = null),
                e && (e.contains && e.contains(b.el) || !b.el.contains(e) || b.el == e) && (e = null),
                f && f == e && "A" == f.tagName ? e : null
            }
            return "A" == b.el.tagName ? b.el : c && c.get(0).parentNode && "A" == c.get(0).parentNode.tagName ? c.get(0).parentNode : void 0
        }
        function d() {
            var a = b.image ? b.image.get() : null, c = [];
            if (a) "A" == a.get(0).parentNode.tagName && c.push(a.get(0).parentNode);
            else {
                var d, e, f, g;
                if (b.win.getSelection) {
                    var h = b.win.getSelection();

                    if (h.getRangeAt && h.rangeCount) {
                        g = b.doc.createRange();
                        for (var i = 0; i < h.rangeCount; ++i)
                            if (d = h.getRangeAt(i),
                            e = d.commonAncestorContainer, e && 1 != e.nodeType && (e = e.parentNode),
                            e && "a" == e.nodeName.toLowerCase()) c.push(e);
                            else {
                                f = e.getElementsByTagName("a");
                                for (var j = 0; j < f.length; ++j) g.selectNodeContents(f[j]),
                                g.compareBoundaryPoints(d.END_TO_START, d) < 1 && g.compareBoundaryPoints(d.START_TO_END, d) > -1 && c.push(f[j])
                            }
                    }
                }
                else
                    if (b.doc.selection && "Control" != b.doc.selection.type)
                        if (d = b.doc.selection.createRange(),
                        e = d.parentElement(),
                        "a" == e.nodeName.toLowerCase()) c.push(e);
                        else {
                            f = e.getElementsByTagName("a"),
                            g = b.doc.body.createTextRange();
                            for (var k = 0; k < f.length; ++k) g.moveToElementText(f[k]),
                            g.compareEndPoints("StartToEnd", d) > -1 && g.compareEndPoints("EndToStart", d) < 1 && c.push(f[k])
                        }
            }
            return c
        }
        function e(d) {
            if (b.core.hasFocus()) {
                if (g(),
                d && "keyup" === d.type && (d.altKey || d.which == a.FE.KEYCODE.ALT)) return !0; setTimeout(function () {
                    if (!d || d && (1 == d.which || "mouseup" != d.type)) {
                        var e = c(),
                        g = b.image ? b.image.get() : null;
                        if (e && !g) {
                            if (b.image) {
                                var h = b.node.contents(e);

                                if (1 == h.length && "IMG" == h[0].tagName) {
                                    var i = b.selection.ranges(0);
                                    return 0 === i.startOffset && 0 === i.endOffset ? a(e).before(a.FE.MARKERS) : a(e).after(a.FE.MARKERS),
                                    b.selection.restore(),
                                    !1
                                }
                            }
                            d && d.stopPropagation(),
                            f(e)
                        }
                    }
                },
                b.helpers.isIOS() ? 100 : 0)
            }
        }
        function f(c) {
            var d = b.popups.get("link.edit");
            d || (d = h());
            var e = a(c);
            b.popups.isVisible("link.edit") || b.popups.refresh("link.edit"),
            b.popups.setContainer("link.edit", b.$sc);
            var f = e.offset().left + a(c).outerWidth() / 2, g = e.offset().top + e.outerHeight();
            b.popups.show("link.edit", f, g, e.outerHeight())
        }
        function g() { b.popups.hide("link.edit") }
        function h() {
            var a = ""; b.opts.linkEditButtons.length > 1 && ("A" == b.el.tagName && b.opts.linkEditButtons.indexOf("linkRemove") >= 0 && b.opts.linkEditButtons.splice(b.opts.linkEditButtons.indexOf("linkRemove"),
            1),
            a = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkEditButtons) + "</div>");
            var d = { buttons: a },
            e = b.popups.create("link.edit", d);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-edit", function () { c() && b.popups.isVisible("link.edit") && f(c()) }),
            e
        }
        function i() { }
        function j() {
            var d = b.popups.get("link.insert"),
            e = c();

            if (e) {
                var f, g, h = a(e),
                i = d.find('input.fr-link-attr[type="text"]'),
                j = d.find('input.fr-link-attr[type="checkbox"]');
                for (f = 0; f < i.length; f++) g = a(i[f]),
                g.val(h.attr(g.attr("name") || ""));
                for (j.prop("checked", !1),
                f = 0; f < j.length; f++) g = a(j[f]),
                h.attr(g.attr("name")) == g.data("checked") && g.prop("checked", !0);
                d.find('input.fr-link-attr[type="text"][name="text"]').val(h.text())
            }
            else d.find('input.fr-link-attr[type="text"]').val(""),
            d.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1),
            d.find('input.fr-link-attr[type="text"][name="text"]').val(b.selection.text());
            d.find("input.fr-link-attr").trigger("change"),
            (b.image ? b.image.get() : null) ? d.find('.fr-link-attr[name="text"]').parent().hide() : d.find('.fr-link-attr[name="text"]').parent().show()
        }
        function k() {
            var a = b.$tb.find('.fr-command[data-cmd="insertLink"]'),
            c = b.popups.get("link.insert");

            if (c || (c = l()),
            !c.hasClass("fr-active"))
                if (b.popups.refresh("link.insert"),
                b.popups.setContainer("link.insert", b.$tb || b.$sc),
                a.is(":visible")) {
                    var d = a.offset().left + a.outerWidth() / 2, e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("link.insert", d, e, a.outerHeight())
                }
                else b.position.forSelection(c),
                b.popups.show("link.insert")
        }
        function l(a) {
            if (a) return b.popups.onRefresh("link.insert", j),
            b.popups.onHide("link.insert", i),
            !0; var d = ""; b.opts.linkInsertButtons.length >= 1 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.linkInsertButtons) + "</div>");
            var e = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>', f = "", g = 0; f = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + b.id + '">', f += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + b.id + '" name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="' + ++g + '"></div>', b.opts.linkText && (f += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + b.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + b.language.translate("Text") + '" tabIndex="' + ++g + '"></div>');
            for (var h in b.opts.linkAttributes)
                if (b.opts.linkAttributes.hasOwnProperty(h)) { var k = b.opts.linkAttributes[h]; f += '<div class="fr-input-line"><input name="' + h + '" type="text" class="fr-link-attr" placeholder="' + b.language.translate(k) + '" tabIndex="' + ++g + '"></div>' }
            b.opts.linkAlwaysBlank || (f += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + b.id + '" tabIndex="' + ++g + '"><span>' + e + '</span></span><label for="fr-link-target-' + b.id + '">' + b.language.translate("Open in new tab") + "</label></div>"),
            f += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++g + '" type="button">' + b.language.translate("Insert") + "</button></div></div>"; var l = { buttons: d, input_layer: f },
            m = b.popups.create("link.insert", l);
            return b.$wp && b.events.$on(b.$wp, "scroll.link-insert", function () {
                (b.image ? b.image.get() : null) && b.popups.isVisible("link.insert") && u(),
                c && b.popups.isVisible("link.insert") && s()
            }),
            m
        }
        function m() {
            var d = c(),
            e = b.image ? b.image.get() : null;
            if (!1 === b.events.trigger("link.beforeRemove", [d])) return !1; e && d ? (e.unwrap(),
            b.image.edit(e)) : d && (b.selection.save(),
            a(d).replaceWith(a(d).html()),
            b.selection.restore(),
            g())
        }
        function n() {
            b.events.on("keyup", function (b) { b.which != a.FE.KEYCODE.ESC && e(b) }),
            b.events.on("window.mouseup", e),
            b.events.$on(b.$el, "click", "a", function (a) { b.edit.isDisabled() && a.preventDefault() }),
            b.helpers.isMobile() && b.events.$on(b.$doc, "selectionchange", e),
            l(!0),
            "A" == b.el.tagName && b.$el.addClass("fr-view"),
            b.events.on("toolbar.esc", function () {
                if (b.popups.isVisible("link.edit")) return b.events.disableBlur(),
                b.events.focus(),
                !1
            },
            !0)
        }
        function o(c) {
            var d, e, f = b.opts.linkList[c], g = b.popups.get("link.insert"),
            h = g.find('input.fr-link-attr[type="text"]'),
            i = g.find('input.fr-link-attr[type="checkbox"]');
            for (e = 0; e < h.length; e++) d = a(h[e]),
            f[d.attr("name")] ? d.val(f[d.attr("name")]) : "text" != d.attr("name") && d.val("");
            for (e = 0; e < i.length; e++) d = a(i[e]),
            d.prop("checked", d.data("checked") == f[d.attr("name")]);
            b.accessibility.focusPopup(g)
        }
        function p() {
            var c, d, e = b.popups.get("link.insert"),
            f = e.find('input.fr-link-attr[type="text"]'),
            g = e.find('input.fr-link-attr[type="checkbox"]'),
            h = f.filter('[name="href"]').val(),
            i = f.filter('[name="text"]').val(),
            j = {};
            for (d = 0; d < f.length; d++) c = a(f[d]),
            ["href", "text"].indexOf(c.attr("name")) < 0 && (j[c.attr("name")] = c.val());
            for (d = 0; d < g.length; d++) c = a(g[d]),
            c.is(":checked") ? j[c.attr("name")] = c.data("checked") : j[c.attr("name")] = c.data("unchecked") || null; var k = b.helpers.scrollTop();
            r(h, i, j),
            a(b.o_win).scrollTop(k)
        }
        function q() {
            if (!b.selection.isCollapsed()) {
                b.selection.save();
                for (var c = b.$el.find(".fr-marker").addClass("fr-unprocessed").toArray() ;
                c.length;) {
                    var d = a(c.pop());
                    d.removeClass("fr-unprocessed");
                    var e = b.node.deepestParent(d.get(0));

                    if (e) {
                        var f = d.get(0),
                        g = "", h = ""; do {
                            f = f.parentNode, b.node.isBlock(f) || (g += b.node.closeTagString(f),
                            h = b.node.openTagString(f) + h)
                        }
                        while (f != e);
                        var i = b.node.openTagString(d.get(0)) + d.html() + b.node.closeTagString(d.get(0));
                        d.replaceWith('<span id="fr-break"></span>');
                        var j = e.outerHTML; j = j.replace(/<span id="fr-break"><\/span>/g, g + i + h),
                        e.outerHTML = j
                    }
                    c = b.$el.find(".fr-marker.fr-unprocessed").toArray()
                }
                b.html.cleanEmptyTags(),
                b.selection.restore()
            }
        }
        function r(f, g, h) {
            if (void 0 === h && (h = {}),
            !1 === b.events.trigger("link.beforeInsert", [f, g, h])) return !1; var i = b.image ? b.image.get() : null; i || "A" == b.el.tagName ? "A" == b.el.tagName && b.$el.focus() : (b.selection.restore(),
            b.popups.hide("link.insert"));
            var j = f;
            if (b.opts.linkConvertEmailAddress) { a.FE.MAIL_REGEX.test(f) && !/^mailto:.*/i.test(f) && (f = "mailto:" + f) }
            var k = /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i;
            if ("" === b.opts.linkAutoPrefix || new RegExp("^(" + a.FE.LinkProtocols.join("|") + "):.", "i").test(f) || /^data:image.*/i.test(f) || /^(https?:|ftps?:|file:|)\/\//i.test(f) || k.test(f) || ["/", "{", "[", "#", "("].indexOf((f || "")[0]) < 0 && (f = b.opts.linkAutoPrefix + f),
            f = b.helpers.sanitizeURL(f),
            b.opts.linkAlwaysBlank && (h.target = "_blank"),
            b.opts.linkAlwaysNoFollow && (h.rel = "nofollow"),
            "_blank" == h.target ? h.rel ? h.rel += " noopener noreferrer" : h.rel = "noopener noreferrer" : null == h.target && (h.rel ? h.rel = h.rel.replace(/noopener/, "").replace(/noreferrer/, "") : h.rel = null),
            g = g || "", f === b.opts.linkAutoPrefix) {
                return b.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"),
                b.events.trigger("link.bad", [j]),
                !1
            }
            var l, m = c();

            if (m) l = a(m),
            l.attr("href", f),
            g.length > 0 && l.text() != g && !i && l.text(g),
            i || l.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),
            l.attr(h),
            i || b.selection.restore();
            else {
                i ? i.wrap('<a href="' + f + '"></a>') : (b.format.remove("a"),
                b.selection.isCollapsed() ? (g = 0 === g.length ? j : g, b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"),
                b.selection.restore()) : g.length > 0 && g != b.selection.text().replace(/\n/g, "") ? (b.selection.remove(),
                b.html.insert('<a href="' + f + '">' + a.FE.START_MARKER + g + a.FE.END_MARKER + "</a>"),
                b.selection.restore()) : (q(),
                b.format.apply("a", { href: f })));
                for (var n = d(),
                o = 0; o < n.length; o++) l = a(n[o]),
                l.attr(h),
                l.removeAttr("_moz_dirty");
                1 == n.length && b.$wp && !i && (a(n[0]).prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),
                b.selection.restore())
            }

            if (i) {
                var p = b.popups.get("link.insert");
                p && p.find("input:focus").blur(),
                b.image.edit(i)
            }
            else e()
        }
        function s() {
            g();
            var d = c();

            if (d) {
                var e = b.popups.get("link.insert");
                e || (e = l()),
                b.popups.isVisible("link.insert") || (b.popups.refresh("link.insert"),
                b.selection.save(),
                b.helpers.isMobile() && (b.events.disableBlur(),
                b.$el.blur(),
                b.events.enableBlur())),
                b.popups.setContainer("link.insert", b.$sc);
                var f = (b.image ? b.image.get() : null) || a(d),
                h = f.offset().left + f.outerWidth() / 2, i = f.offset().top + f.outerHeight();
                b.popups.show("link.insert", h, i, f.outerHeight())
            }
        }
        function t() {
            (b.image ? b.image.get() : null) ? b.image.back() : (b.events.disableBlur(),
            b.selection.restore(),
            b.events.enableBlur(),
            c() && b.$wp ? (b.selection.restore(),
            g(),
            e()) : "A" == b.el.tagName ? (b.$el.focus(),
            e()) : (b.popups.hide("link.insert"),
            b.toolbar.showInline()))
        }
        function u() {
            var a = b.image ? b.image.getEl() : null;
            if (a) {
                var c = b.popups.get("link.insert");
                b.image.hasCaption() && (a = a.find(".fr-img-wrap")),
                c || (c = l()),
                j(!0),
                b.popups.setContainer("link.insert", b.$sc);
                var d = a.offset().left + a.outerWidth(!0) / 2, e = a.offset().top + a.outerHeight(!0);
                b.popups.show("link.insert", d, e, a.outerHeight())
            }
        }
        function v(d, f, g) {
            void 0 === g && (g = b.opts.linkMultipleStyles),
            void 0 === f && (f = b.opts.linkStyles);
            var h = c();

            if (!h) return !1;
            if (!g) {
                var i = Object.keys(f);
                i.splice(i.indexOf(d),
                1),
                a(h).removeClass(i.join(" "))
            }
            a(h).toggleClass(d),
            e()
        }
        return { _init: n, remove: m, showInsertPopup: k, usePredefined: o, insertCallback: p, insert: r, update: s, get: c, allSelected: d, back: t, imageLink: u, applyStyle: v }
    },
    a.FE.DefineIcon("insertLink", { NAME: "link" }),
    a.FE.RegisterShortcut(a.FE.KEYCODE.K, "insertLink", null, "K"),
    a.FE.RegisterCommand("insertLink", {
        title: "Insert Link", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("link.insert")) : this.link.showInsertPopup()
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkOpen", { NAME: "external-link" }),
    a.FE.RegisterCommand("linkOpen", {
        title: "Open Link", undo: !1, refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        callback: function () {
            var a = this.link.get();
            a && this.o_win.open(a.href)
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkEdit", { NAME: "edit" }),
    a.FE.RegisterCommand("linkEdit", {
        title: "Edit Link", undo: !1, refreshAfterCallback: !1, popup: !0, callback: function () { this.link.update() },
        refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkRemove", { NAME: "unlink" }),
    a.FE.RegisterCommand("linkRemove", {
        title: "Unlink", callback: function () { this.link.remove() },
        refresh: function (a) { this.link.get() ? a.removeClass("fr-hidden") : a.addClass("fr-hidden") },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("linkBack", {
        title: "Back", undo: !1, focus: !1, back: !0, refreshAfterCallback: !1, callback: function () { this.link.back() },
        refresh: function (a) {
            var b = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || b || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
            a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
            a.next(".fr-separator").addClass("fr-hidden"))
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkList", { NAME: "search" }),
    a.FE.RegisterCommand("linkList", {
        title: "Choose Link", type: "dropdown", focus: !1, undo: !1, refreshAfterCallback: !1, html: function () { for (var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.linkList, c = 0; c < b.length; c++) a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + c + '">' + (b[c].displayText || b[c].text) + "</a></li>"; return a += "</ul>" },
        callback: function (a, b) { this.link.usePredefined(b) },
        plugin: "link"
    }),
    a.FE.RegisterCommand("linkInsert", {
        focus: !1, refreshAfterCallback: !1, callback: function () { this.link.insertCallback() },
        refresh: function (a) { this.link.get() ? a.text(this.language.translate("Update")) : a.text(this.language.translate("Insert")) },
        plugin: "link"
    }),
    a.FE.DefineIcon("imageLink", { NAME: "link" }),
    a.FE.RegisterCommand("imageLink", {
        title: "Insert Link", undo: !1, focus: !1, popup: !0, callback: function () { this.link.imageLink() },
        refresh: function (a) {
            var b, c = this.link.get();
            c ? (b = a.prev(),
            b.hasClass("fr-separator") && b.removeClass("fr-hidden"),
            a.addClass("fr-hidden")) : (b = a.prev(),
            b.hasClass("fr-separator") && b.addClass("fr-hidden"),
            a.removeClass("fr-hidden"))
        },
        plugin: "link"
    }),
    a.FE.DefineIcon("linkStyle", { NAME: "magic" }),
    a.FE.RegisterCommand("linkStyle", {
        title: "Style", type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.linkStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + c + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) { this.link.applyStyle(b) },
        refreshOnShow: function (b, c) {
            var d = this.link.get();

            if (d) {
                var e = a(d);
                c.find(".fr-command").each(function () {
                    var b = a(this).data("param1"),
                    c = e.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        },
        plugin: "link"
    })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.lists = function (b) {
        function c(a) { return '<span class="fr-open-' + a.toLowerCase() + '"></span>' }
        function d(a) { return '<span class="fr-close-' + a.toLowerCase() + '"></span>' }
        function e(b, c) {
            for (var d = [], e = 0; e < b.length; e++) { var f = b[e].parentNode; "LI" == b[e].tagName && f.tagName != c && d.indexOf(f) < 0 && d.push(f) }
            for (e = d.length - 1; e >= 0; e--) {
                var g = a(d[e]);
                g.replaceWith("<" + c.toLowerCase() + ">" + g.html() + "</" + c.toLowerCase() + ">")
            }
        }
        function f(c, d) {
            e(c, d);
            var f, g = b.html.defaultTag(),
            h = null; c.length && (f = "rtl" == b.opts.direction || "rtl" == a(c[0]).css("direction") ? "margin-right" : "margin-left");
            for (var i = 0; i < c.length; i++)
                if ("LI" != c[i].tagName) {
                    var j = b.helpers.getPX(a(c[i]).css(f)) || 0; c[i].style.marginLeft = null, null === h && (h = j);
                    var k = h > 0 ? "<" + d + ' style="' + f + ": " + h + 'px;">' : "<" + d + ">", l = "</" + d + ">"; for (j -= h; j / b.opts.indentMargin > 0;) k += "<" + d + ">", l += l, j -= b.opts.indentMargin; g && c[i].tagName.toLowerCase() == g ? a(c[i]).replaceWith(k + "<li" + b.node.attributes(c[i]) + ">" + a(c[i]).html() + "</li>" + l) : a(c[i]).wrap(k + "<li></li>" + l)
                }
            b.clean.lists()
        }
        function g(e) {
            var f, g; for (f = e.length - 1; f >= 0; f--) for (g = f - 1; g >= 0; g--)
                if (a(e[g]).find(e[f]).length || e[g] == e[f]) {
                    e.splice(f, 1);
                    break
                }
            var h = []; for (f = 0; f < e.length; f++) {
                var i = a(e[f]),
                j = e[f].parentNode, k = i.attr("class");

                if (i.before(d(j.tagName)),
                "LI" == j.parentNode.tagName) i.before(d("LI")),
                i.after(c("LI"));
                else {
                    var l = ""; k && (l += ' class="' + k + '"');
                    var m = "rtl" == b.opts.direction || "rtl" == i.css("direction") ? "margin-right" : "margin-left"; b.helpers.getPX(a(j).css(m)) && (l += ' style="' + m + ":" + b.helpers.getPX(a(j).css(m)) + 'px;"'),
                    l && i.wrapInner("<" + b.html.defaultTag() + l + "></" + b.html.defaultTag() + ">"),
                    b.node.isEmpty(i.get(0),
                    !0) || 0 !== i.find(b.html.blockTagsQuery()).length || i.append("<br>"),
                    i.append(c("LI")),
                    i.prepend(d("LI"))
                }
                i.after(c(j.tagName)),
                "LI" == j.parentNode.tagName && (j = j.parentNode.parentNode),
                h.indexOf(j) < 0 && h.push(j)
            }
            for (f = 0; f < h.length; f++) {
                var n = a(h[f]),
                o = n.html();
                o = o.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>"),
                o = o.replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"),
                n.replaceWith(b.node.openTagString(n.get(0)) + o + b.node.closeTagString(n.get(0)))
            }
            b.$el.find("li:empty").remove(),
            b.$el.find("ul:empty, ol:empty").remove(),
            b.clean.lists(),
            b.html.wrap()
        }
        function h(a, b) {
            for (var c = !0, d = 0; d < a.length; d++) {
                if ("LI" != a[d].tagName) return !1; a[d].parentNode.tagName != b && (c = !1)
            }
            return c
        }
        function i(a) {
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            for (var c = b.selection.blocks(),
            d = 0; d < c.length; d++) "LI" != c[d].tagName && "LI" == c[d].parentNode.tagName && (c[d] = c[d].parentNode);
            b.selection.save(),
            h(c, a) ? g(c) : f(c, a),
            b.html.unwrap(),
            b.selection.restore()
        }
        function j(c, d) {
            var e = a(b.selection.element());

            if (e.get(0) != b.el) {
                var f = e.get(0);
                f = "LI" != f.tagName && f.firstElementChild && "LI" != f.firstElementChild.tagName ? e.parents("li").get(0) : "LI" == f.tagName || f.firstElementChild ? f.firstElementChild && "LI" == f.firstElementChild.tagName ? e.get(0).firstChild : e.get(0) : e.parents("li").get(0),
                f && f.parentNode.tagName == d && b.el.contains(f.parentNode) && c.addClass("fr-active")
            }
        }
        function k(c) {
            b.selection.save();
            for (var d = 0; d < c.length; d++) {
                var e = c[d].previousSibling;
                if (e) {
                    var f = a(c[d]).find("> ul, > ol").last().get(0);

                    if (f) {
                        for (var g = a("<li>").prependTo(a(f)),
                        h = b.node.contents(c[d])[0]; h && !b.node.isList(h) ;
                        ) {
                            var i = h.nextSibling; g.append(h),
                            h = i
                        }
                        a(e).append(a(f)),
                        a(c[d]).remove()
                    }
                    else {
                        var j = a(e).find("> ul, > ol").last().get(0);

                        if (j) a(j).append(a(c[d]));
                        else {
                            var k = a("<" + c[d].parentNode.tagName + ">");
                            a(e).append(k),
                            k.append(a(c[d]))
                        }
                    }
                }
            }
            b.clean.lists(),
            b.selection.restore()
        }
        function l(a) {
            b.selection.save(),
            g(a),
            b.selection.restore()
        }
        function m(a) {
            if ("indent" == a || "outdent" == a) {
                for (var c = !1, d = b.selection.blocks(),
                e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? (c = !0, e.push(d[f])) : "LI" == d[f].parentNode.tagName && (c = !0, e.push(d[f].parentNode));
                c && ("indent" == a ? k(e) : l(e))
            }
        }
        function n() {
            b.events.on("commands.after", m),
            b.events.on("keydown", function (c) {
                if (c.which == a.FE.KEYCODE.TAB) {
                    for (var d = b.selection.blocks(),
                    e = [], f = 0; f < d.length; f++) "LI" == d[f].tagName ? e.push(d[f]) : "LI" == d[f].parentNode.tagName && e.push(d[f].parentNode);

                    if (e.length > 1 || e.length && (b.selection.info(e[0]).atStart || b.node.isEmpty(e[0]))) return c.preventDefault(),
                    c.stopPropagation(),
                    c.shiftKey ? l(e) : k(e),
                    !1
                }
            },
            !0)
        }
        return { _init: n, format: i, refresh: j }
    },
    a.FE.RegisterCommand("formatUL", {
        title: "Unordered List", refresh: function (a) { this.lists.refresh(a, "UL") },
        callback: function () { this.lists.format("UL") },
        plugin: "lists"
    }),
    a.FE.RegisterCommand("formatOL", {
        title: "Ordered List", refresh: function (a) { this.lists.refresh(a, "OL") },
        callback: function () { this.lists.format("OL") },
        plugin: "lists"
    }),
    a.FE.DefineIcon("formatUL", { NAME: "list-ul" }),
    a.FE.DefineIcon("formatOL", { NAME: "list-ol" })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        paragraphFormat: { N: "Normal", H1: "Heading 1", H2: "Heading 2", H3: "Heading 3", H4: "Heading 4", PRE: "Code" },
        paragraphFormatSelection: !1
    }),
    a.FE.PLUGINS.paragraphFormat = function (b) {
        function c(c, d) {
            var e = b.html.defaultTag();

            if (d && d.toLowerCase() != e)
                if (c.find("ul, ol").length > 0) {
                    var f = a("<" + d + ">");
                    c.prepend(f);
                    for (var g = b.node.contents(c.get(0))[0]; g && ["UL", "OL"].indexOf(g.tagName) < 0;) {
                        var h = g.nextSibling; f.append(g),
                        g = h
                    }
                }
                else c.html("<" + d + ">" + c.html() + "</" + d + ">")
        }
        function d(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div" data-empty="true"'),
            d.toLowerCase() == e ? c.replaceWith(c.html()) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }
        function e(c, d) {
            var e = b.html.defaultTag();
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0),
            !0) ? ' data-empty="true"' : "")),
            d.toLowerCase() == e ? (b.node.isEmpty(c.get(0),
            !0) || c.append("<br/>"),
            c.replaceWith(c.html())) : c.replaceWith(a("<" + d + ">").html(c.html()))
        }
        function f(c, d) {
            d || (d = 'div class="fr-temp-div"' + (b.node.isEmpty(c.get(0),
            !0) ? ' data-empty="true"' : "")),
            c.replaceWith(a("<" + d + " " + b.node.attributes(c.get(0)) + ">").html(c.html()).removeAttr("data-empty"))
        }
        function g(g) {
            "N" == g && (g = b.html.defaultTag()),
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            var h = b.selection.blocks();
            b.selection.save(),
            b.$el.find("pre").attr("skip", !0);
            for (var i = 0; i < h.length; i++)
                if (h[i].tagName != g && !b.node.isList(h[i])) {
                    var j = a(h[i]);
                    "LI" == h[i].tagName ? c(j, g) : "LI" == h[i].parentNode.tagName && h[i] ? d(j, g) : ["TD", "TH"].indexOf(h[i].parentNode.tagName) >= 0 ? e(j, g) : f(j, g)
                }
            b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function () {
                a(this).prev().append("<br>" + a(this).html()),
                a(this).remove()
            }),
            b.$el.find("pre").removeAttr("skip"),
            b.html.unwrap(),
            b.selection.restore()
        }
        function h(a, c) {
            var d = b.selection.blocks();

            if (d.length) {
                var e = d[0], f = "N", g = b.html.defaultTag();
                e.tagName.toLowerCase() != g && e != b.el && (f = e.tagName),
                c.find('.fr-command[data-param1="' + f + '"]').addClass("fr-active").attr("aria-selected", !0)
            }
            else c.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
        }
        function i(a) {
            if (b.opts.paragraphFormatSelection) {
                var c = b.selection.blocks();

                if (c.length) {
                    var d = c[0], e = "N", f = b.html.defaultTag();
                    d.tagName.toLowerCase() != f && d != b.el && (e = d.tagName),
                    ["LI", "TD", "TH"].indexOf(e) >= 0 && (e = "N"),
                    a.find("> span").text(b.language.translate(b.opts.paragraphFormat[e]))
                }
                else a.find("> span").text(b.language.translate(b.opts.paragraphFormat.N))
            }
        }
        return { apply: g, refreshOnShow: h, refresh: i }
    },
    a.FE.RegisterCommand("paragraphFormat", {
        type: "dropdown", displaySelection: function (a) { return a.opts.paragraphFormatSelection },
        defaultSelection: "Normal", displaySelectionWidth: 100, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.paragraphFormat; for (var c in b)
                if (b.hasOwnProperty(c)) {
                    var d = this.shortcuts.get("paragraphFormat." + c);
                    d = d ? '<span class="fr-shortcut">' + d + "</span>" : "", a += '<li role="presentation"><' + ("N" == c ? this.html.defaultTag() || "DIV" : c) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></" + ("N" == c ? this.html.defaultTag() || "DIV" : c) + "></li>"
                }
            return a += "</ul>"
        },
        title: "Paragraph Format", callback: function (a, b) { this.paragraphFormat.apply(b) },
        refresh: function (a) { this.paragraphFormat.refresh(a) },
        refreshOnShow: function (a, b) { this.paragraphFormat.refreshOnShow(a, b) },
        plugin: "paragraphFormat"
    }),
    a.FE.DefineIcon("paragraphFormat", { NAME: "paragraph" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        paragraphStyles: { "fr-text-gray": "Gray", "fr-text-bordered": "Bordered", "fr-text-spaced": "Spaced", "fr-text-uppercase": "Uppercase" },
        paragraphMultipleStyles: !0
    }),
    a.FE.PLUGINS.paragraphStyle = function (b) {
        function c(c, d, e) {
            void 0 === d && (d = b.opts.paragraphStyles),
            void 0 === e && (e = b.opts.paragraphMultipleStyles);
            var f = ""; e || (f = Object.keys(d),
            f.splice(f.indexOf(c),
            1),
            f = f.join(" ")),
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore();
            var g = b.selection.blocks();
            b.selection.save();
            for (var h = a(g[0]).hasClass(c),
            i = 0; i < g.length; i++) a(g[i]).removeClass(f).toggleClass(c, !h),
            a(g[i]).hasClass("fr-temp-div") && a(g[i]).removeClass("fr-temp-div"),
            "" === a(g[i]).attr("class") && a(g[i]).removeAttr("class");
            b.html.unwrap(),
            b.selection.restore()
        }
        function d(c, d) {
            var e = b.selection.blocks();

            if (e.length) {
                var f = a(e[0]);
                d.find(".fr-command").each(function () {
                    var b = a(this).data("param1"),
                    c = f.hasClass(b);
                    a(this).toggleClass("fr-active", c).attr("aria-selected", c)
                })
            }
        }
        function e() { }
        return { _init: e, apply: c, refreshOnShow: d }
    },
    a.FE.RegisterCommand("paragraphStyle", {
        type: "dropdown", html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.paragraphStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command ' + c + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        title: "Paragraph Style", callback: function (a, b) { this.paragraphStyle.apply(b) },
        refreshOnShow: function (a, b) { this.paragraphStyle.refreshOnShow(a, b) },
        plugin: "paragraphStyle"
    }),
    a.FE.DefineIcon("paragraphStyle", { NAME: "magic" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, { quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"], quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"] }),
    a.FE.QUICK_INSERT_BUTTONS = {},
    a.FE.DefineIcon("quickInsert", { PATH: '<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>', template: "svg" }),
    a.FE.RegisterQuickInsertButton = function (b, c) {
        a.FE.QUICK_INSERT_BUTTONS[b] = a.extend({ undo: !0 },
        c)
    },
    a.FE.RegisterQuickInsertButton("image", {
        icon: "insertImage", requiredPlugin: "image", title: "Insert Image", undo: !1, callback: function () {
            var b = this; b.shared.$qi_image_input || (b.shared.$qi_image_input = a('<input accept="image/*" name="quickInsertImage' + this.id + '" style="display: none;" type="file">'),
            a("body:first").append(b.shared.$qi_image_input),
            b.events.$on(b.shared.$qi_image_input, "change", function () {
                var b = a(this).data("inst");
                this.files && (b.quickInsert.hide(),
                b.image.upload(this.files)),
                a(this).val("")
            },
            !0)),
            b.$qi_image_input = b.shared.$qi_image_input, b.helpers.isMobile() && b.selection.save(),
            b.$qi_image_input.data("inst", b).trigger("click")
        }
    }),
    a.FE.RegisterQuickInsertButton("video", {
        icon: "insertVideo", requiredPlugin: "video", title: "Insert Video", undo: !1, callback: function () {
            var a = prompt(this.language.translate("Paste the URL of the video you want to insert."));
            a && this.video.insertByURL(a)
        }
    }),
    a.FE.RegisterQuickInsertButton("embedly", {
        icon: "embedly", requiredPlugin: "embedly", title: "Embed URL", undo: !1, callback: function () {
            var a = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
            a && this.embedly.add(a)
        }
    }),
    a.FE.RegisterQuickInsertButton("table", { icon: "insertTable", requiredPlugin: "table", title: "Insert Table", callback: function () { this.table.insert(2, 2) } }),
    a.FE.RegisterQuickInsertButton("ol", { icon: "formatOL", requiredPlugin: "lists", title: "Ordered List", callback: function () { this.lists.format("OL") } }),
    a.FE.RegisterQuickInsertButton("ul", { icon: "formatUL", requiredPlugin: "lists", title: "Unordered List", callback: function () { this.lists.format("UL") } }),
    a.FE.RegisterQuickInsertButton("hr", { icon: "insertHR", title: "Insert Horizontal Line", callback: function () { this.commands.insertHR() } }),
    a.FE.PLUGINS.quickInsert = function (b) {
        function c(a) {
            var c, d, e; c = a.offset().top - b.$box.offset().top, d = 0 - k.outerWidth(),
            e = (k.outerHeight() - a.outerHeight()) / 2, b.opts.iframe && (c += b.$iframe.offset().top - b.helpers.scrollTop()),
            k.hasClass("fr-on") && c >= 0 && l.css("top", c - e),
            c >= 0 && c - e <= b.$box.outerHeight() - a.outerHeight() ? (k.hasClass("fr-hidden") && (k.hasClass("fr-on") && g(),
            k.removeClass("fr-hidden")),
            k.css("top", c - e)) : k.hasClass("fr-visible") && (k.addClass("fr-hidden"),
            h()),
            k.css("left", d)
        }
        function d(a) {
            k || i(),
            k.hasClass("fr-on") && h(),
            b.$box.append(k),
            c(a),
            k.data("tag", a),
            k.addClass("fr-visible")
        }
        function e() {
            if (b.core.hasFocus()) {
                var c = b.selection.element();
                b.node.isBlock(c) || (c = b.node.blockParent(c)),
                c && b.node.isEmpty(c) && b.node.isElement(c.parentNode) && b.opts.quickInsertTags.indexOf(c.tagName.toLowerCase()) >= 0 ? k && k.data("tag").is(a(c)) && k.hasClass("fr-on") ? h() : b.selection.isCollapsed() && d(a(c)) : f()
            }
        }
        function f() {
            k && (b.html.checkIfEmpty(),
            k.hasClass("fr-on") && h(),
            k.removeClass("fr-visible fr-on"),
            k.css("left", -9999).css("top", -9999))
        }
        function g(c) {
            if (c && c.preventDefault(),
            k.hasClass("fr-on") && !k.hasClass("fr-hidden")) h();
            else {
                if (!b.shared.$qi_helper) {
                    for (var d = b.opts.quickInsertButtons, e = '<div class="fr-qi-helper">', f = 0, g = 0; g < d.length; g++) { var i = a.FE.QUICK_INSERT_BUTTONS[d[g]]; i && (!i.requiredPlugin || a.FE.PLUGINS[i.requiredPlugin] && b.opts.pluginsEnabled.indexOf(i.requiredPlugin) >= 0) && (e += '<a class="fr-btn fr-floating-btn" role="button" title="' + b.language.translate(i.title) + '" tabIndex="-1" data-cmd="' + d[g] + '" style="transition-delay: ' + .025 * f++ + 's;">' + b.icon.create(i.icon) + "</a>") }
                    e += "</div>", b.shared.$qi_helper = a(e),
                    b.tooltip.bind(b.shared.$qi_helper, "> a.fr-btn")
                }
                l = b.shared.$qi_helper, l.appendTo(b.$box),
                setTimeout(function () {
                    l.css("top", parseFloat(k.css("top"))),
                    l.css("left", parseFloat(k.css("left")) + k.outerWidth()),
                    l.find("a").addClass("fr-size-1"),
                    k.addClass("fr-on")
                },
                10)
            }
        }
        function h() {
            var a = b.$box.find(".fr-qi-helper");
            a.length && (a.find("a").removeClass("fr-size-1"),
            a.css("left", -9999),
            k.hasClass("fr-hidden") || k.removeClass("fr-on"))
        }
        function i() {
            b.shared.$quick_insert || (b.shared.$quick_insert = a('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Quick Insert") + '">' + b.icon.create("quickInsert") + "</a></div>")),
            k = b.shared.$quick_insert, b.tooltip.bind(b.$box, ".fr-quick-insert > a.fr-floating-btn"),
            b.events.on("destroy", function () {
                k.removeClass("fr-on").appendTo(a("body:first")).css("left", -9999).css("top", -9999),
                l && (h(),
                l.appendTo(a("body:first")))
            },
            !0),
            b.events.on("shared.destroy", function () {
                k.html("").removeData().remove(),
                k = null, l && (l.html("").removeData().remove(),
                l = null)
            },
            !0),
            b.events.on("commands.before", f),
            b.events.on("commands.after", function () { b.popups.areVisible() || e() }),
            b.events.bindClick(b.$box, ".fr-quick-insert > a", g),
            b.events.bindClick(b.$box, ".fr-qi-helper > a.fr-btn", function (c) {
                var d = a(c.currentTarget).data("cmd");
                a.FE.QUICK_INSERT_BUTTONS[d].callback.apply(b, [c.currentTarget]),
                a.FE.QUICK_INSERT_BUTTONS[d].undo && b.undo.saveStep(),
                b.quickInsert.hide()
            }),
            b.events.$on(b.$wp, "scroll", function () { k.hasClass("fr-visible") && c(k.data("tag")) })
        }
        function j() {
            if (!b.$wp) return !1; b.opts.iframe && b.$el.parent("html").find("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">'),
            b.popups.onShow("image.edit", f),
            b.events.on("mouseup", e),
            b.helpers.isMobile() && b.events.$on(a(b.o_doc),
            "selectionchange", e),
            b.events.on("blur", f),
            b.events.on("keyup", e),
            b.events.on("keydown", function () {
                setTimeout(function () { e() },
                0)
            })
        }
        var k, l; return { _init: j, hide: f }
    }
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.PLUGINS.quote = function (b) {
        function c(a) { for (; a.parentNode && a.parentNode != b.el;) a = a.parentNode; return a }
        function d() {
            var d, e = b.selection.blocks();
            for (d = 0; d < e.length; d++) e[d] = c(e[d]);
            b.selection.save();
            var f = a("<blockquote>");
            for (f.insertBefore(e[0]),
            d = 0; d < e.length; d++) f.append(e[d]);
            b.html.unwrap(),
            b.selection.restore()
        }
        function e() {
            var c, d = b.selection.blocks();
            for (c = 0; c < d.length; c++) "BLOCKQUOTE" != d[c].tagName && (d[c] = a(d[c]).parentsUntil(b.$el, "BLOCKQUOTE").get(0));
            for (b.selection.save(),
            c = 0; c < d.length; c++) d[c] && a(d[c]).replaceWith(d[c].innerHTML);
            b.html.unwrap(),
            b.selection.restore()
        }
        function f(a) {
            b.selection.save(),
            b.html.wrap(!0, !0, !0, !0),
            b.selection.restore(),
            "increase" == a ? d() : "decrease" == a && e()
        }
        return { apply: f }
    },
    a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"),
    a.FE.RegisterShortcut(a.FE.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0),
    a.FE.RegisterCommand("quote", {
        title: "Quote", type: "dropdown", options: { increase: "Increase", decrease: "Decrease" },
        callback: function (a, b) { this.quote.apply(b) },
        plugin: "quote"
    }),
    a.FE.DefineIcon("quote", { NAME: "quote-left" })
});

/*eslint eqeqeq: "error"*/
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.DEFAULTS, {
        saveInterval: 1e4, saveURL: null, saveParams: {},
        saveParam: "body", saveMethod: "POST"
    }),
    a.FE.PLUGINS.save = function (b) {
        function c(a, c) {
            b.events.trigger("save.error", [{ code: a, message: n[a] },
            c])
        }
        function d(d) {
            if (void 0 === d && (d = b.html.get()),
            !1 === b.events.trigger("save.before")) return !1;
            if (b.opts.saveURL) {
                var e = {};
                for (var f in b.opts.saveParams)
                    if (b.opts.saveParams.hasOwnProperty(f)) { var g = b.opts.saveParams[f]; e[f] = "function" == typeof g ? g.call(this) : g }
                var h = {};
                h[b.opts.saveParam] = d, a.ajax({
                    type: b.opts.saveMethod, url: b.opts.saveURL, data: a.extend(h, e),
                    crossDomain: b.opts.requestWithCORS, xhrFields: { withCredentials: b.opts.requestWithCredentials },
                    headers: b.opts.requestHeaders
                }).done(function (a) { j = d, b.events.trigger("save.after", [a]) }).fail(function (a) { c(m, a.response || a.responseText) })
            }
            else c(l)
        }
        function e() {
            clearTimeout(i),
            i = setTimeout(function () {
                var a = b.html.get();
                (j != a || k) && (j = a, k = !1, d(a))
            },
            b.opts.saveInterval)
        }
        function f() {
            e(),
            k = !1
        }
        function g() { k = !0 }
        function h() {
            b.opts.saveInterval && (j = b.html.get(),
            b.events.on("contentChanged", e),
            b.events.on("keydown destroy", function () { clearTimeout(i) }))
        }
        var i = null, j = null, k = !1, l = 1, m = 2, n = {};
        return n[l] = "Missing saveURL option.", n[m] = "Something went wrong during save.", { _init: h, save: d, reset: f, force: g }
    },
    a.FE.DefineIcon("save", { NAME: "floppy-o" }),
    a.FE.RegisterCommand("save", {
        title: "Save", undo: !1, focus: !1, refreshAfterCallback: !1, callback: function () { this.save.save() },
        plugin: "save"
    })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]", "table.edit": "[_BUTTONS_]", "table.colors": "[_BUTTONS_][_COLORS_]" }),
    a.extend(a.FE.DEFAULTS, {
        tableInsertMaxSize: 10, tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"], tableInsertButtons: ["tableBack", "|"], tableResizer: !0, tableResizerOffset: 5, tableResizingLimit: 30, tableColorsButtons: ["tableBack", "|"], tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"], tableColorsStep: 7, tableCellStyles: { "fr-highlighted": "Highlighted", "fr-thick": "Thick" },
        tableStyles: { "fr-dashed-borders": "Dashed Borders", "fr-alternate-rows": "Alternate Rows" },
        tableCellMultipleStyles: !0, tableMultipleStyles: !0, tableInsertHelper: !0, tableInsertHelperOffset: 15
    }),
    a.FE.PLUGINS.table = function (b) {
        function c() {
            var a = b.$tb.find('.fr-command[data-cmd="insertTable"]'),
            c = b.popups.get("table.insert");

            if (c || (c = g()),
            !c.hasClass("fr-active")) {
                b.popups.refresh("table.insert"),
                b.popups.setContainer("table.insert", b.$tb);
                var d = a.offset().left + a.outerWidth() / 2, e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                b.popups.show("table.insert", d, e, a.outerHeight())
            }
        }
        function d() {
            var a = I();

            if (a) {
                var c = b.popups.get("table.edit");
                c || (c = k()),
                b.popups.setContainer("table.edit", b.$sc);
                var d = Q(a),
                e = (d.left + d.right) / 2, f = d.bottom; b.popups.show("table.edit", e, f, d.bottom - d.top),
                b.edit.isDisabled() && (b.toolbar.disable(),
                b.$el.removeClass("fr-no-selection"),
                b.edit.on(),
                b.button.bulkRefresh(),
                b.selection.setAtEnd(b.$el.find(".fr-selected-cell:last").get(0)),
                b.selection.restore())
            }
        }
        function e() {
            var a = I();

            if (a) {
                var c = b.popups.get("table.colors");
                c || (c = l()),
                b.popups.setContainer("table.colors", b.$sc);
                var d = Q(a),
                e = (d.left + d.right) / 2, f = d.bottom; o(),
                b.popups.show("table.colors", e, f, d.bottom - d.top)
            }
        }
        function f() { 0 === sa().length && b.toolbar.enable() }
        function g(c) {
            if (c) return b.popups.onHide("table.insert", function () { b.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter") }),
            !0; var d = ""; b.opts.tableInsertButtons.length > 0 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableInsertButtons) + "</div>");
            var e = { buttons: d, rows_columns: i() },
            f = b.popups.create("table.insert", e);
            return b.events.$on(f, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function (b) { h(a(b.currentTarget)) },
            !0),
            j(f),
            f
        }
        function h(a) {
            var c = a.data("row"),
            d = a.data("col"),
            e = a.parent();
            e.siblings(".fr-table-size-info").html(c + " &times; " + d),
            e.find("> span").removeClass("hover fr-active-item");
            for (var f = 1; f <= b.opts.tableInsertMaxSize; f++) for (var g = 0; g <= b.opts.tableInsertMaxSize; g++) {
                var h = e.find('> span[data-row="' + f + '"][data-col="' + g + '"]');
                f <= c && g <= d ? h.addClass("hover") : f <= c + 1 || f <= 2 && !b.helpers.isMobile() ? h.css("display", "inline-block") : f > 2 && !b.helpers.isMobile() && h.css("display", "none")
            }
            a.addClass("fr-active-item")
        }
        function i() {
            for (var a = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', c = 1; c <= b.opts.tableInsertMaxSize; c++) {
                for (var d = 1; d <= b.opts.tableInsertMaxSize; d++) {
                    var e = "inline-block"; c > 2 && !b.helpers.isMobile() && (e = "none");
                    var f = "fr-table-cell "; 1 == c && 1 == d && (f += " hover"),
                    a += '<span class="fr-command ' + f + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + c + '" data-col="' + d + '" data-param1="' + c + '" data-param2="' + d + '" style="display: ' + e + ';" role="button"><span></span><span class="fr-sr-only">' + c + " &times; " + d + "&nbsp;&nbsp;&nbsp;</span></span>"
                }
                a += '<div class="new-line"></div>'
            }
            return a += "</div></div>"
        }
        function j(c) {
            b.events.$on(c, "focus", "[tabIndex]", function (b) { h(a(b.currentTarget)) }),
            b.events.on("popup.tab", function (c) {
                var d = a(c.currentTarget);

                if (!b.popups.isVisible("table.insert") || !d.is("span, a")) return !0; var e, f = c.which;
                if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                    if (d.is("span.fr-table-cell")) {
                        var g = d.parent().find("span.fr-table-cell"),
                        i = g.index(d),
                        j = b.opts.tableInsertMaxSize, k = i % j, l = Math.floor(i / j);
                        a.FE.KEYCODE.ARROW_UP == f ? l = Math.max(0, l - 1) : a.FE.KEYCODE.ARROW_DOWN == f ? l = Math.min(b.opts.tableInsertMaxSize - 1, l + 1) : a.FE.KEYCODE.ARROW_LEFT == f ? k = Math.max(0, k - 1) : a.FE.KEYCODE.ARROW_RIGHT == f && (k = Math.min(b.opts.tableInsertMaxSize - 1, k + 1));
                        var m = l * j + k, n = a(g.get(m));
                        h(n),
                        b.events.disableBlur(),
                        n.focus(),
                        e = !1
                    }
                }
                else a.FE.KEYCODE.ENTER == f && (b.button.exec(d),
                e = !1);
                return !1 === e && (c.preventDefault(),
                c.stopPropagation()),
                e
            },
            !0)
        }
        function k(a) {
            if (a) return b.popups.onHide("table.edit", f),
            !0; var c = ""; b.opts.tableEditButtons.length > 0 && (c = '<div class="fr-buttons">' + b.button.buildList(b.opts.tableEditButtons) + "</div>");
            var e = { buttons: c },
            g = b.popups.create("table.edit", e);
            return b.events.$on(b.$wp, "scroll.table-edit", function () { b.popups.isVisible("table.edit") && d() }),
            g
        }
        function l() {
            var a = ""; b.opts.tableColorsButtons.length > 0 && (a = '<div class="fr-buttons fr-table-colors-buttons">' + b.button.buildList(b.opts.tableColorsButtons) + "</div>");
            var c = { buttons: a, colors: m() },
            d = b.popups.create("table.colors", c);
            return b.events.$on(b.$wp, "scroll.table-colors", function () { b.popups.isVisible("table.colors") && e() }),
            n(d),
            d
        }
        function m() {
            for (var a = '<div class="fr-table-colors">', c = 0; c < b.opts.tableColors.length; c++) 0 !== c && c % b.opts.tableColorsStep == 0 && (a += "<br>"),
            "REMOVE" != b.opts.tableColors[c] ? a += '<span class="fr-command" style="background: ' + b.opts.tableColors[c] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + b.opts.tableColors[c] + '"><span class="fr-sr-only">' + b.language.translate("Color") + " " + b.opts.tableColors[c] + "&nbsp;&nbsp;&nbsp;</span></span>" : a += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + b.language.translate("Clear Formatting") + '">' + b.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + b.language.translate("Clear Formatting") + "</span></span>"; return a += "</div>"
        }
        function n(c) {
            b.events.on("popup.tab", function (d) {
                var e = a(d.currentTarget);

                if (!b.popups.isVisible("table.colors") || !e.is("span")) return !0; var f = d.which, g = !0;
                if (a.FE.KEYCODE.TAB == f) {
                    var h = c.find(".fr-buttons");
                    g = !b.accessibility.focusToolbar(h, !!d.shiftKey)
                }
                else
                    if (a.FE.KEYCODE.ARROW_UP == f || a.FE.KEYCODE.ARROW_DOWN == f || a.FE.KEYCODE.ARROW_LEFT == f || a.FE.KEYCODE.ARROW_RIGHT == f) {
                        var i = e.parent().find("span.fr-command"),
                        j = i.index(e),
                        k = b.opts.colorsStep, l = Math.floor(i.length / k),
                        m = j % k, n = Math.floor(j / k),
                        o = n * k + m, p = l * k; a.FE.KEYCODE.ARROW_UP == f ? o = ((o - k) % p + p) % p : a.FE.KEYCODE.ARROW_DOWN == f ? o = (o + k) % p : a.FE.KEYCODE.ARROW_LEFT == f ? o = ((o - 1) % p + p) % p : a.FE.KEYCODE.ARROW_RIGHT == f && (o = (o + 1) % p);
                        var q = a(i.get(o));
                        b.events.disableBlur(),
                        q.focus(),
                        g = !1
                    }
                    else a.FE.KEYCODE.ENTER == f && (b.button.exec(e),
                    g = !1);
                return !1 === g && (d.preventDefault(),
                d.stopPropagation()),
                g
            },
            !0)
        }
        function o() {
            var a = b.popups.get("table.colors"),
            c = b.$el.find(".fr-selected-cell:first");
            a.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"),
            a.find('span[data-param1="' + b.helpers.RGBToHex(c.css("background-color")) + '"]').addClass("fr-selected-color fr-active-item")
        }
        function p(c, d) {
            var e, f, g = '<table style="width: 100%;" class="fr-inserted-table"><tbody>', h = 100 / d; for (e = 0; e < c; e++) {
                for (g += "<tr>", f = 0; f < d; f++) g += '<td style="width: ' + h.toFixed(4) + '%;">', 0 === e && 0 === f && (g += a.FE.MARKERS),
                g += "<br></td>"; g += "</tr>"
            }
            g += "</tbody></table>", b.html.insert(g),
            b.selection.restore();
            var i = b.$el.find(".fr-inserted-table");
            i.removeClass("fr-inserted-table"),
            b.events.trigger("table.inserted", [i.get(0)])
        }
        function q() {
            if (sa().length > 0) {
                var a = ta();
                b.selection.setBefore(a.get(0)) || b.selection.setAfter(a.get(0)),
                b.selection.restore(),
                b.popups.hide("table.edit"),
                a.remove(),
                b.toolbar.enable()
            }
        }
        function r() {
            var b = ta();

            if (b.length > 0 && 0 === b.find("th").length) {
                var c, e = "<thead><tr>", f = 0; for (b.find("tr:first > td").each(function () {
                var b = a(this);
                f += parseInt(b.attr("colspan"),
                10) || 1
                }),
                c = 0; c < f; c++) e += "<th><br></th>"; e += "</tr></thead>", b.prepend(e),
                d()
            }
        }
        function s() {
            var a = ta(),
            c = a.find("thead");

            if (c.length > 0)
                if (0 === a.find("tbody tr").length) q();
                else
                    if (c.remove(),
                    sa().length > 0) d();
                    else {
                        b.popups.hide("table.edit");
                        var e = a.find("tbody tr:first td:first").get(0);
                        e && (b.selection.setAtEnd(e),
                        b.selection.restore())
                    }
        }
        function t(c) {
            var e = ta();

            if (e.length > 0) {
                if (b.$el.find("th.fr-selected-cell").length > 0 && "above" == c) return; var f, g, h, i = I(),
                j = O(i);
                g = "above" == c ? j.min_i : j.max_i; var k = "<tr>"; for (f = 0; f < i[g].length; f++)
                    if ("below" == c && g < i.length - 1 && i[g][f] == i[g + 1][f] || "above" == c && g > 0 && i[g][f] == i[g - 1][f]) {
                        if (0 === f || f > 0 && i[g][f] != i[g][f - 1]) {
                            var l = a(i[g][f]);
                            l.attr("rowspan", parseInt(l.attr("rowspan"),
                            10) + 1)
                        }
                    }
                    else k += "<td><br></td>"; k += "</tr>", h = a(b.$el.find("th.fr-selected-cell").length > 0 && "below" == c ? e.find("tbody").not(e.find("table tbody")) : e.find("tr").not(e.find("table tr")).get(g)),
                    "below" == c ? "TBODY" == h.prop("tagName") ? h.prepend(k) : h.after(k) : "above" == c && (h.before(k),
                    b.popups.isVisible("table.edit") && d())
            }
        }
        function u() {
            var c = ta();

            if (c.length > 0) {
                var d, e, f, g = I(),
                h = O(g);

                if (0 === h.min_i && h.max_i == g.length - 1) q();
                else {
                    for (d = h.max_i; d >= h.min_i; d--) {
                        for (f = a(c.find("tr").not(c.find("table tr")).get(d)),
                        e = 0; e < g[d].length; e++)
                            if (0 === e || g[d][e] != g[d][e - 1]) {
                                var i = a(g[d][e]);

                                if (parseInt(i.attr("rowspan"),
                                10) > 1) {
                                    var j = parseInt(i.attr("rowspan"),
                                    10) - 1; 1 == j ? i.removeAttr("rowspan") : i.attr("rowspan", j)
                                }

                                if (d < g.length - 1 && g[d][e] == g[d + 1][e] && (0 === d || g[d][e] != g[d - 1][e])) { for (var k = g[d][e], l = e; l > 0 && g[d][l] == g[d][l - 1];) l--; 0 === l ? a(c.find("tr").not(c.find("table tr")).get(d + 1)).prepend(k) : a(g[d + 1][l - 1]).after(k) }
                            }
                        var m = f.parent();
                        f.remove(),
                        0 === m.find("tr").length && m.remove(),
                        g = I(c)
                    }
                    A(0, g.length - 1, 0, g[0].length - 1, c),
                    h.min_i > 0 ? b.selection.setAtEnd(g[h.min_i - 1][0]) : b.selection.setAtEnd(g[0][0]),
                    b.selection.restore(),
                    b.popups.hide("table.edit")
                }
            }
        }
        function v(c) {
            var e = ta();

            if (e.length > 0) {
                var f, g = I(),
                h = O(g);
                f = "before" == c ? h.min_j : h.max_j; var i, j = 100 / g[0].length, k = 100 / (g[0].length + 1);
                e.find("th, td").each(function () {
                    i = a(this),
                    i.data("old-width", i.outerWidth() / e.outerWidth() * 100)
                }),
                e.find("tr").not(e.find("table tr")).each(function (b) {
                    for (var d, e = a(this),
                    h = 0, i = 0; h - 1 < f;) {
                        if (!(d = e.find("> th, > td").get(i))) { d = null; break }
                        d == g[b][h] ? (h += parseInt(a(d).attr("colspan"),
                        10) || 1, i++) : (h += parseInt(a(g[b][h]).attr("colspan"),
                        10) || 1, "after" == c && (d = 0 === i ? -1 : e.find("> th, > td").get(i - 1)))
                    }
                    var l = a(d);

                    if ("after" == c && h - 1 > f || "before" == c && f > 0 && g[b][f] == g[b][f - 1]) {
                        if (0 === b || b > 0 && g[b][f] != g[b - 1][f]) {
                            var m = parseInt(l.attr("colspan"),
                            10) + 1; l.attr("colspan", m),
                            l.css("width", (l.data("old-width") * k / j + k).toFixed(4) + "%"),
                            l.removeData("old-width")
                        }
                    }
                    else { var n; n = e.find("th").length > 0 ? '<th style="width: ' + k.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + k.toFixed(4) + '%;"><br></td>', -1 == d ? e.prepend(n) : null == d ? e.append(n) : "before" == c ? l.before(n) : "after" == c && l.after(n) }
                }),
                e.find("th, td").each(function () {
                    i = a(this),
                    i.data("old-width") && (i.css("width", (i.data("old-width") * k / j).toFixed(4) + "%"),
                    i.removeData("old-width"))
                }),
                b.popups.isVisible("table.edit") && d()
            }
        }
        function w() {
            var c = ta();

            if (c.length > 0) {
                var d, e, f, g = I(),
                h = O(g);

                if (0 === h.min_j && h.max_j == g[0].length - 1) q();
                else {
                    var i = 100 / g[0].length, j = 100 / (g[0].length - h.max_j + h.min_j - 1);
                    for (c.find("th, td").each(function () {
                    f = a(this),
                    f.hasClass("fr-selected-cell") || f.data("old-width", f.outerWidth() / c.outerWidth() * 100)
                    }),
                    e = h.max_j; e >= h.min_j; e--) for (d = 0; d < g.length; d++)
                        if (0 === d || g[d][e] != g[d - 1][e])
                            if (f = a(g[d][e]),
                            (parseInt(f.attr("colspan"),
                            10) || 1) > 1) {
                                var k = parseInt(f.attr("colspan"),
                                10) - 1; 1 == k ? f.removeAttr("colspan") : f.attr("colspan", k),
                                f.css("width", ((f.data("old-width") - ka(e, g)) * j / i).toFixed(4) + "%"),
                                f.removeData("old-width")
                            }
                            else {
                                var l = a(f.parent().get(0));
                                f.remove(),
                                0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                            }
                    A(0, g.length - 1, 0, g[0].length - 1, c),
                    h.min_j > 0 ? b.selection.setAtEnd(g[h.min_i][h.min_j - 1]) : b.selection.setAtEnd(g[h.min_i][0]),
                    b.selection.restore(),
                    b.popups.hide("table.edit"),
                    c.find("th, td").each(function () {
                        f = a(this),
                        f.data("old-width") && (f.css("width", (f.data("old-width") * j / i).toFixed(4) + "%"),
                        f.removeData("old-width"))
                    })
                }
            }
        }
        function x(a, b, c) {
            var d, e, f, g, h, i = 0, j = I(c);
            for (b = Math.min(b, j[0].length - 1),
            e = a; e <= b; e++)
                if (!(e > a && j[0][e] == j[0][e - 1]) && (g = parseInt(j[0][e].getAttribute("colspan"),
                10) || 1) > 1 && j[0][e] == j[0][e + 1]) for (i = g - 1, d = 1; d < j.length; d++)
                    if (j[d][e] != j[d - 1][e]) {
                        for (f = e; f < e + g; f++)
                            if ((h = parseInt(j[d][f].getAttribute("colspan"),
                            10) || 1) > 1 && j[d][f] == j[d][f + 1]) i = Math.min(i, h - 1),
                            f += i; else
                                if (!(i = Math.max(0, i - 1))) break;
                        if (!i) break
                    }
            i && z(j, i, "colspan", 0, j.length - 1, a, b)
        }
        function y(a, b, c) {
            var d, e, f, g, h, i = 0, j = I(c);
            for (b = Math.min(b, j.length - 1),
            d = a; d <= b; d++)
                if (!(d > a && j[d][0] == j[d - 1][0]) && (g = parseInt(j[d][0].getAttribute("rowspan"),
                10) || 1) > 1 && j[d][0] == j[d + 1][0]) for (i = g - 1, e = 1; e < j[0].length; e++)
                    if (j[d][e] != j[d][e - 1]) {
                        for (f = d; f < d + g; f++)
                            if ((h = parseInt(j[f][e].getAttribute("rowspan"),
                            10) || 1) > 1 && j[f][e] == j[f + 1][e]) i = Math.min(i, h - 1),
                            f += i; else
                                if (!(i = Math.max(0, i - 1))) break;
                        if (!i) break
                    }
            i && z(j, i, "rowspan", a, b, 0, j[0].length - 1)
        }
        function z(a, b, c, d, e, f, g) {
            var h, i, j; for (h = d; h <= e; h++) for (i = f; i <= g; i++) h > d && a[h][i] == a[h - 1][i] || i > f && a[h][i] == a[h][i - 1] || (j = parseInt(a[h][i].getAttribute(c),
            10) || 1) > 1 && (j - b > 1 ? a[h][i].setAttribute(c, j - b) : a[h][i].removeAttribute(c))
        }
        function A(a, b, c, d, e) {
            y(a, b, e),
            x(c, d, e)
        }
        function B() {
            if (sa().length > 1 && (0 === b.$el.find("th.fr-selected-cell").length || 0 === b.$el.find("td.fr-selected-cell").length)) {
                L();
                var c, e, f = I(),
                g = O(f),
                h = b.$el.find(".fr-selected-cell"),
                i = a(h[0]),
                j = i.parent(),
                k = j.find(".fr-selected-cell"),
                l = i.closest("table"),
                m = i.html(),
                n = 0; for (c = 0; c < k.length; c++) n += a(k[c]).outerWidth();
                for (i.css("width", (n / l.outerWidth() * 100).toFixed(4) + "%"),
                g.min_j < g.max_j && i.attr("colspan", g.max_j - g.min_j + 1),
                g.min_i < g.max_i && i.attr("rowspan", g.max_i - g.min_i + 1),
                c = 1; c < h.length; c++) e = a(h[c]),
                "<br>" != e.html() && "" !== e.html() && (m += "<br>" + e.html()),
                e.remove();
                i.html(m),
                b.selection.setAtEnd(i.get(0)),
                b.selection.restore(),
                b.toolbar.enable(),
                y(g.min_i, g.max_i, l);
                var o = l.find("tr:empty");
                for (c = o.length - 1; c >= 0; c--) a(o[c]).remove();
                x(g.min_j, g.max_j, l),
                d()
            }
        }
        function C() {
            if (1 == sa().length) {
                var c = b.$el.find(".fr-selected-cell"),
                d = c.parent(),
                e = c.closest("table"),
                f = parseInt(c.attr("rowspan"),
                10),
                g = I(),
                h = J(c.get(0),
                g),
                i = c.clone().html("<br>");

                if (f > 1) {
                    var j = Math.ceil(f / 2);
                    j > 1 ? c.attr("rowspan", j) : c.removeAttr("rowspan"),
                    f - j > 1 ? i.attr("rowspan", f - j) : i.removeAttr("rowspan");
                    for (var k = h.row + j, l = 0 === h.col ? h.col : h.col - 1; l >= 0 && (g[k][l] == g[k][l - 1] || k > 0 && g[k][l] == g[k - 1][l]) ;
                    ) l--; -1 == l ? a(e.find("tr").not(e.find("table tr")).get(k)).prepend(i) : a(g[k][l]).after(i)
                }
                else {
                    var m, n = a("<tr>").append(i);
                    for (m = 0; m < g[0].length; m++)
                        if (0 === m || g[h.row][m] != g[h.row][m - 1]) {
                            var o = a(g[h.row][m]);
                            o.is(c) || o.attr("rowspan", (parseInt(o.attr("rowspan"),
                            10) || 1) + 1)
                        }
                    d.after(n)
                }
                M(),
                b.popups.hide("table.edit")
            }
        }
        function D() {
            if (1 == sa().length) {
                var c = b.$el.find(".fr-selected-cell"),
                d = parseInt(c.attr("colspan"),
                10) || 1, e = c.parent().outerWidth(),
                f = c.outerWidth(),
                g = c.clone().html("<br>"),
                h = I(),
                i = J(c.get(0),
                h);

                if (d > 1) {
                    var j = Math.ceil(d / 2);
                    f = la(i.col, i.col + j - 1, h) / e * 100; var k = la(i.col + j, i.col + d - 1, h) / e * 100; j > 1 ? c.attr("colspan", j) : c.removeAttr("colspan"),
                    d - j > 1 ? g.attr("colspan", d - j) : g.removeAttr("colspan"),
                    c.css("width", f.toFixed(4) + "%"),
                    g.css("width", k.toFixed(4) + "%")
                }
                else {
                    var l; for (l = 0; l < h.length; l++)
                        if (0 === l || h[l][i.col] != h[l - 1][i.col]) {
                            var m = a(h[l][i.col]);

                            if (!m.is(c)) {
                                var n = (parseInt(m.attr("colspan"),
                                10) || 1) + 1; m.attr("colspan", n)
                            }
                        }
                    f = f / e * 100 / 2, c.css("width", f.toFixed(4) + "%"),
                    g.css("width", f.toFixed(4) + "%")
                }
                c.after(g),
                M(),
                b.popups.hide("table.edit")
            }
        }
        function E(a) { "REMOVE" != a ? b.$el.find(".fr-selected-cell").css("background-color", b.helpers.HEXtoRGB(a)) : b.$el.find(".fr-selected-cell").css("background-color", "") }
        function F(a) { b.$el.find(".fr-selected-cell").css("vertical-align", a) }
        function G(a) { b.$el.find(".fr-selected-cell").css("text-align", a) }
        function H(a, b, c, d) {
            if (b.length > 0) {
                if (!c) {
                    var e = Object.keys(d);
                    e.splice(e.indexOf(a),
                    1),
                    b.removeClass(e.join(" "))
                }
                b.toggleClass(a)
            }
        }
        function I(b) {
            b = b || null; var c = [];
            if (null == b && sa().length > 0 && (b = ta()),
            b) return b.find("tr").not(b.find("table tr")).each(function (b, d) {
                var e = a(d),
                f = 0; e.find("> th, > td").each(function (d, e) {
                    for (var g = a(e),
                    h = parseInt(g.attr("colspan"),
                    10) || 1, i = parseInt(g.attr("rowspan"),
                    10) || 1, j = b; j < b + i; j++) for (var k = f; k < f + h; k++) c[j] || (c[j] = []),
                    c[j][k] ? f++ : c[j][k] = e; f += h
                })
            }),
            c
        }
        function J(a, b) {
            for (var c = 0; c < b.length; c++) for (var d = 0; d < b[c].length; d++)
                if (b[c][d] == a) return { row: c, col: d }
        }
        function K(a, b, c) {
            for (var d = a + 1, e = b + 1; d < c.length;) {
                if (c[d][b] != c[a][b]) { d--; break }
                d++
            }
            for (d == c.length && d--; e < c[a].length;) {
                if (c[a][e] != c[a][b]) { e--; break }
                e++
            }
            return e == c[a].length && e--, { row: d, col: e }
        }
        function L() {
            b.el.querySelector(".fr-cell-fixed") && b.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"),
            b.el.querySelector(".fr-cell-handler") && b.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler")
        }
        function M() {
            var c = b.$el.find(".fr-selected-cell");
            c.length > 0 && c.each(function () {
                var b = a(this);
                b.removeClass("fr-selected-cell"),
                "" === b.attr("class") && b.removeAttr("class")
            }),
            L()
        }
        function N() {
            setTimeout(function () {
                b.selection.clear(),
                b.$el.addClass("fr-no-selection"),
                b.$el.blur()
            },
            0)
        }
        function O(a) {
            var c = b.$el.find(".fr-selected-cell");

            if (c.length > 0) {
                var d, e = a.length, f = 0, g = a[0].length, h = 0; for (d = 0; d < c.length; d++) {
                    var i = J(c[d], a),
                    j = K(i.row, i.col, a);
                    e = Math.min(i.row, e),
                    f = Math.max(j.row, f),
                    g = Math.min(i.col, g),
                    h = Math.max(j.col, h)
                }
                return { min_i: e, max_i: f, min_j: g, max_j: h }
            }
            return null
        }
        function P(b, c, d, e, f) {
            var g, h, i, j, k = b, l = c, m = d, n = e; for (g = k; g <= l; g++) ((parseInt(a(f[g][m]).attr("rowspan"),
            10) || 1) > 1 || (parseInt(a(f[g][m]).attr("colspan"),
            10) || 1) > 1) && (i = J(f[g][m], f),
            j = K(i.row, i.col, f),
            k = Math.min(i.row, k),
            l = Math.max(j.row, l),
            m = Math.min(i.col, m),
            n = Math.max(j.col, n)),
            ((parseInt(a(f[g][n]).attr("rowspan"),
            10) || 1) > 1 || (parseInt(a(f[g][n]).attr("colspan"),
            10) || 1) > 1) && (i = J(f[g][n], f),
            j = K(i.row, i.col, f),
            k = Math.min(i.row, k),
            l = Math.max(j.row, l),
            m = Math.min(i.col, m),
            n = Math.max(j.col, n));
            for (h = m; h <= n; h++) ((parseInt(a(f[k][h]).attr("rowspan"),
            10) || 1) > 1 || (parseInt(a(f[k][h]).attr("colspan"),
            10) || 1) > 1) && (i = J(f[k][h], f),
            j = K(i.row, i.col, f),
            k = Math.min(i.row, k),
            l = Math.max(j.row, l),
            m = Math.min(i.col, m),
            n = Math.max(j.col, n)),
            ((parseInt(a(f[l][h]).attr("rowspan"),
            10) || 1) > 1 || (parseInt(a(f[l][h]).attr("colspan"),
            10) || 1) > 1) && (i = J(f[l][h], f),
            j = K(i.row, i.col, f),
            k = Math.min(i.row, k),
            l = Math.max(j.row, l),
            m = Math.min(i.col, m),
            n = Math.max(j.col, n));
            return k == b && l == c && m == d && n == e ? { min_i: b, max_i: c, min_j: d, max_j: e } : P(k, l, m, n, f)
        }
        function Q(b) {
            var c = O(b),
            d = a(b[c.min_i][c.min_j]),
            e = a(b[c.min_i][c.max_j]),
            f = a(b[c.max_i][c.min_j]);
            return {
                left: d.offset().left, right: e.offset().left + e.outerWidth(),
                top: d.offset().top, bottom: f.offset().top + f.outerHeight()
            }
        }
        function R(c, d) {
            if (a(c).is(d)) M(),
            b.edit.on(),
            a(c).addClass("fr-selected-cell");
            else {
                N(),
                b.edit.off();
                var e = I(),
                f = J(c, e),
                g = J(d, e),
                h = P(Math.min(f.row, g.row),
                Math.max(f.row, g.row),
                Math.min(f.col, g.col),
                Math.max(f.col, g.col),
                e);
                M(),
                c.classList.add("fr-cell-fixed"),
                d.classList.add("fr-cell-handler");
                for (var i = h.min_i; i <= h.max_i; i++) for (var j = h.min_j; j <= h.max_j; j++) a(e[i][j]).addClass("fr-selected-cell")
            }
        }
        function S(c) {
            var d = null, e = a(c.target);
            return "TD" == c.target.tagName || "TH" == c.target.tagName ? d = c.target : e.closest("td").length > 0 ? d = e.closest("td").get(0) : e.closest("th").length > 0 && (d = e.closest("th").get(0)),
            0 === b.$el.find(d).length ? null : d
        }
        function T() {
            M(),
            b.popups.hide("table.edit")
        }
        function U(c) {
            var d = S(c);

            if (sa().length > 0 && !d && T(),
            !b.edit.isDisabled() || b.popups.isVisible("table.edit"))
                if (1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) (3 == c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey) && d && T();
                else
                    if (Aa = !0, d) {
                        sa().length > 0 && !c.shiftKey && T(),
                        c.stopPropagation(),
                        b.events.trigger("image.hideResizer"),
                        b.events.trigger("video.hideResizer"),
                        za = !0; var e = d.tagName.toLowerCase();
                        c.shiftKey && b.$el.find(e + ".fr-selected-cell").length > 0 ? a(b.$el.find(e + ".fr-selected-cell").closest("table")).is(a(d).closest("table")) ? R(Ba, d) : N() : ((b.keys.ctrlKey(c) || c.shiftKey) && (sa().length > 1 || 0 === a(d).find(b.selection.element()).length && !a(d).is(b.selection.element())) && N(),
                        Ba = d, R(Ba, Ba))
                    }
        }
        function V(c) {
            if (za || b.$tb.is(c.target) || b.$tb.is(a(c.target).closest(b.$tb.get(0))) || (sa().length > 0 && b.toolbar.enable(),
            M()),
            !(1 != c.which || 1 == c.which && b.helpers.isMac() && c.ctrlKey)) {
                if (Aa = !1, za) { za = !1; S(c) || 1 != sa().length ? sa().length > 0 && (b.selection.isCollapsed() ? d() : M()) : M() }

                if (Da) {
                    Da = !1, xa.removeClass("fr-moving"),
                    b.$el.removeClass("fr-no-selection"),
                    b.edit.on();
                    var e = parseFloat(xa.css("left")) + b.opts.tableResizerOffset; b.opts.iframe && (e -= b.$iframe.offset().left),
                    xa.data("release-position", e),
                    xa.removeData("max-left"),
                    xa.removeData("max-right"),
                    ja(c),
                    ba()
                }
            }
        }
        function W(c) {
            if (!0 === za) {
                if (a(c.currentTarget).closest("table").is(ta())) {
                    if ("TD" == c.currentTarget.tagName && 0 === b.$el.find("th.fr-selected-cell").length) return void R(Ba, c.currentTarget);

                    if ("TH" == c.currentTarget.tagName && 0 === b.$el.find("td.fr-selected-cell").length) return void R(Ba, c.currentTarget)
                }
                N()
            }
        }
        function X(c, d) {
            for (var e = c; e && "TABLE" != e.tagName && e.parentNode != b.el;) e = e.parentNode;
            if (e && "TABLE" == e.tagName) {
                var f = I(a(e));
                "up" == d ? Z(J(c, f),
                e, f) : "down" == d && $(J(c, f),
                e, f)
            }
        }
        function Y(a, c, d, e) {
            for (var f, g = c; g != b.el && "TD" != g.tagName && "TH" != g.tagName && ("up" == e ? f = g.previousElementSibling : "down" == e && (f = g.nextElementSibling),
            !f) ;
            ) g = g.parentNode; "TD" == g.tagName || "TH" == g.tagName ? X(g, e) : f && ("up" == e && b.selection.setAtEnd(f),
            "down" == e && b.selection.setAtStart(f))
        }
        function Z(a, c, d) { a.row > 0 ? b.selection.setAtEnd(d[a.row - 1][a.col]) : Y(a, c, d, "up") }
        function $(a, c, d) {
            var e = parseInt(d[a.row][a.col].getAttribute("rowspan"),
            10) || 1; a.row < d.length - e ? b.selection.setAtStart(d[a.row + e][a.col]) : Y(a, c, d, "down")
        }
        function _(c) {
            var d = c.which, e = b.selection.blocks();

            if (e.length && (e = e[0], "TD" == e.tagName || "TH" == e.tagName)) {
                for (var f = e; f && "TABLE" != f.tagName && f.parentNode != b.el;) f = f.parentNode;
                if (f && "TABLE" == f.tagName && (a.FE.KEYCODE.ARROW_LEFT == d || a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_RIGHT == d || a.FE.KEYCODE.ARROW_DOWN == d) && (sa().length > 0 && T(),
                b.browser.webkit && (a.FE.KEYCODE.ARROW_UP == d || a.FE.KEYCODE.ARROW_DOWN == d))) {
                    var g = b.selection.ranges(0).startContainer;
                    if (g.nodeType == Node.TEXT_NODE && (a.FE.KEYCODE.ARROW_UP == d && g.previousSibling || a.FE.KEYCODE.ARROW_DOWN == d && g.nextSibling)) return; c.preventDefault(),
                    c.stopPropagation();
                    var h = I(a(f)),
                    i = J(e, h);
                    return a.FE.KEYCODE.ARROW_UP == d ? Z(i, f, h) : a.FE.KEYCODE.ARROW_DOWN == d && $(i, f, h),
                    b.selection.restore(),
                    !1
                }
            }
        }
        function aa() {
            b.shared.$table_resizer || (b.shared.$table_resizer = a('<div class="fr-table-resizer"><div></div></div>')),
            xa = b.shared.$table_resizer, b.events.$on(xa, "mousedown", function (a) {
                return !b.core.sameInstance(xa) || (sa().length > 0 && T(),
                1 == a.which ? (b.selection.save(),
                Da = !0, xa.addClass("fr-moving"),
                N(),
                b.edit.off(),
                xa.find("div").css("opacity", 1),
                !1) : void 0)
            }),
            b.events.$on(xa, "mousemove", function (a) {
                if (!b.core.sameInstance(xa)) return !0; Da && (b.opts.iframe && (a.pageX -= b.$iframe.offset().left),
                ma(a))
            }),
            b.events.on("shared.destroy", function () {
                xa.html("").removeData().remove(),
                xa = null
            },
            !0),
            b.events.on("destroy", function () {
                b.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"),
                xa.hide().appendTo(a("body:first"))
            },
            !0)
        }
        function ba() {
            xa && (xa.find("div").css("opacity", 0),
            xa.css("top", 0),
            xa.css("left", 0),
            xa.css("height", 0),
            xa.find("div").css("height", 0),
            xa.hide())
        }
        function ca() { ya && ya.removeClass("fr-visible").css("left", "-9999px") }
        function da(c, d) {
            var e = a(d),
            f = e.closest("table"),
            g = f.parent();

            if (d && "TD" != d.tagName && "TH" != d.tagName && (e.closest("td").length > 0 ? d = e.closest("td") : e.closest("th").length > 0 && (d = e.closest("th"))),
            !d || "TD" != d.tagName && "TH" != d.tagName) xa && e.get(0) != xa.get(0) && e.parent().get(0) != xa.get(0) && b.core.sameInstance(xa) && ba();
            else {
                if (e = a(d),
                0 === b.$el.find(e).length) return !1; var h = e.offset().left - 1, i = h + e.outerWidth();

                if (Math.abs(c.pageX - h) <= b.opts.tableResizerOffset || Math.abs(i - c.pageX) <= b.opts.tableResizerOffset) {
                    var j, k, l, m, n, o = I(f),
                    p = J(d, o),
                    q = K(p.row, p.col, o),
                    r = f.offset().top, s = f.outerHeight() - 1; "rtl" != b.opts.direction ? c.pageX - h <= b.opts.tableResizerOffset ? (l = h, p.col > 0 ? (m = h - ka(p.col - 1, o) + b.opts.tableResizingLimit, n = h + ka(p.col, o) - b.opts.tableResizingLimit, j = p.col - 1, k = p.col) : (j = null, k = 0, m = f.offset().left - 1 - parseInt(f.css("margin-left"),
                    10),
                    n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)) : i - c.pageX <= b.opts.tableResizerOffset && (l = i, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = i - ka(q.col, o) + b.opts.tableResizingLimit, n = i + ka(q.col + 1, o) - b.opts.tableResizingLimit, j = q.col, k = q.col + 1) : (j = q.col, k = null, m = f.offset().left - 1 + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : i - c.pageX <= b.opts.tableResizerOffset ? (l = i, p.col > 0 ? (m = i - ka(p.col, o) + b.opts.tableResizingLimit, n = i + ka(p.col - 1, o) - b.opts.tableResizingLimit, j = p.col, k = p.col - 1) : (j = null, k = 0, m = f.offset().left + o[0].length * b.opts.tableResizingLimit, n = g.offset().left - 1 + g.width() + parseFloat(g.css("padding-left")))) : c.pageX - h <= b.opts.tableResizerOffset && (l = h, q.col < o[q.row].length && o[q.row][q.col + 1] ? (m = h - ka(q.col + 1, o) + b.opts.tableResizingLimit, n = h + ka(q.col, o) - b.opts.tableResizingLimit, j = q.col + 1, k = q.col) : (j = q.col, k = null, m = g.offset().left + parseFloat(g.css("padding-left")),
                    n = f.offset().left - 1 + f.width() - o[0].length * b.opts.tableResizingLimit)),
                    xa || aa(),
                    xa.data("table", f),
                    xa.data("first", j),
                    xa.data("second", k),
                    xa.data("instance", b),
                    b.$wp.append(xa);
                    var t = l - b.win.pageXOffset - b.opts.tableResizerOffset, u = r - b.win.pageYOffset; b.opts.iframe && (t += b.$iframe.offset().left - b.helpers.scrollLeft(),
                    u += b.$iframe.offset().top - b.helpers.scrollTop(),
                    m += b.$iframe.offset().left, n += b.$iframe.offset().left),
                    xa.data("max-left", m),
                    xa.data("max-right", n),
                    xa.data("origin", l - b.win.pageXOffset),
                    xa.css("top", u),
                    xa.css("left", t),
                    xa.css("height", s),
                    xa.find("div").css("height", s),
                    xa.css("padding-left", b.opts.tableResizerOffset),
                    xa.css("padding-right", b.opts.tableResizerOffset),
                    xa.show()
                }
                else b.core.sameInstance(xa) && ba()
            }
        }
        function ea(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1; ya || pa(),
            b.$box.append(ya),
            ya.data("instance", b);
            var e = a(d),
            f = e.find("tr:first"),
            g = c.pageX, h = 0, i = 0; b.opts.iframe && (h += b.$iframe.offset().left - b.helpers.scrollLeft(),
            i += b.$iframe.offset().top - b.helpers.scrollTop());
            var j; f.find("th, td").each(function () {
                var c = a(this);
                return c.offset().left <= g && g < c.offset().left + c.outerWidth() / 2 ? (j = parseInt(ya.find("a").css("width"),
                10),
                ya.css("top", i + c.offset().top - b.win.pageYOffset - j - 5),
                ya.css("left", h + c.offset().left - b.win.pageXOffset - j / 2),
                ya.data("selected-cell", c),
                ya.data("position", "before"),
                ya.addClass("fr-visible"),
                !1) : c.offset().left + c.outerWidth() / 2 <= g && g < c.offset().left + c.outerWidth() ? (j = parseInt(ya.find("a").css("width"),
                10),
                ya.css("top", i + c.offset().top - b.win.pageYOffset - j - 5),
                ya.css("left", h + c.offset().left + c.outerWidth() - b.win.pageXOffset - j / 2),
                ya.data("selected-cell", c),
                ya.data("position", "after"),
                ya.addClass("fr-visible"),
                !1) : void 0
            })
        }
        function fa(c, d) {
            if (b.$box.find(".fr-line-breaker").is(":visible")) return !1; ya || pa(),
            b.$box.append(ya),
            ya.data("instance", b);
            var e = a(d),
            f = c.pageY, g = 0, h = 0; b.opts.iframe && (g += b.$iframe.offset().left - b.helpers.scrollLeft(),
            h += b.$iframe.offset().top - b.helpers.scrollTop());
            var i; e.find("tr").each(function () {
                var c = a(this);
                return c.offset().top <= f && f < c.offset().top + c.outerHeight() / 2 ? (i = parseInt(ya.find("a").css("width"),
                10),
                ya.css("top", h + c.offset().top - b.win.pageYOffset - i / 2),
                ya.css("left", g + c.offset().left - b.win.pageXOffset - i - 5),
                ya.data("selected-cell", c.find("td:first")),
                ya.data("position", "above"),
                ya.addClass("fr-visible"),
                !1) : c.offset().top + c.outerHeight() / 2 <= f && f < c.offset().top + c.outerHeight() ? (i = parseInt(ya.find("a").css("width"),
                10),
                ya.css("top", h + c.offset().top + c.outerHeight() - b.win.pageYOffset - i / 2),
                ya.css("left", g + c.offset().left - b.win.pageXOffset - i - 5),
                ya.data("selected-cell", c.find("td:first")),
                ya.data("position", "below"),
                ya.addClass("fr-visible"),
                !1) : void 0
            })
        }
        function ga(c, d) {
            if (0 === sa().length) {
                var e, f, g;
                if (d && ("HTML" == d.tagName || "BODY" == d.tagName || b.node.isElement(d))) for (e = 1; e <= b.opts.tableInsertHelperOffset; e++) {
                    if (f = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset, c.pageY - b.win.pageYOffset + e),
                    a(f).hasClass("fr-tooltip")) return !0;
                    if (f && ("TH" == f.tagName || "TD" == f.tagName || "TABLE" == f.tagName) && (a(f).parents(".fr-wrapper").length || b.opts.iframe)) return ea(c, a(f).closest("table")),
                    !0;
                    if (g = b.doc.elementFromPoint(c.pageX - b.win.pageXOffset + e, c.pageY - b.win.pageYOffset),
                    a(g).hasClass("fr-tooltip")) return !0;
                    if (g && ("TH" == g.tagName || "TD" == g.tagName || "TABLE" == g.tagName) && (a(g).parents(".fr-wrapper").length || b.opts.iframe)) return fa(c, a(g).closest("table")),
                    !0
                }
                b.core.sameInstance(ya) && ca()
            }
        }
        function ha(a) {
            Ca = null; var c = b.doc.elementFromPoint(a.pageX - b.win.pageXOffset, a.pageY - b.win.pageYOffset);
            b.opts.tableResizer && (!b.popups.areVisible() || b.popups.areVisible() && b.popups.isVisible("table.edit")) && da(a, c),
            !b.opts.tableInsertHelper || b.popups.areVisible() || b.$tb.hasClass("fr-inline") && b.$tb.is(":visible") || ga(a, c)
        }
        function ia() {
            if (Da) {
                var a = xa.data("table"),
                c = a.offset().top - b.win.pageYOffset; b.opts.iframe && (c += b.$iframe.offset().top - b.helpers.scrollTop()),
                xa.css("top", c)
            }
        }
        function ja() {
            var c = xa.data("origin"),
            d = xa.data("release-position");

            if (c !== d) {
                var e = xa.data("first"),
                f = xa.data("second"),
                g = xa.data("table"),
                h = g.outerWidth();

                if (b.undo.canDo() || b.undo.saveStep(),
                null !== e && null !== f) {
                    var i, j, k, l = I(g),
                    m = [], n = [], o = [], p = []; for (i = 0; i < l.length; i++) j = a(l[i][e]),
                    k = a(l[i][f]),
                    m[i] = j.outerWidth(),
                    o[i] = k.outerWidth(),
                    n[i] = m[i] / h * 100, p[i] = o[i] / h * 100; for (i = 0; i < l.length; i++) {
                        j = a(l[i][e]),
                        k = a(l[i][f]);
                        var q = (n[i] * (m[i] + d - c) / m[i]).toFixed(4);
                        j.css("width", q + "%"),
                        k.css("width", (n[i] + p[i] - q).toFixed(4) + "%")
                    }
                }
                else {
                    var r, s = g.parent(),
                    t = h / s.width() * 100, u = (parseInt(g.css("margin-left"),
                    10) || 0) / s.width() * 100, v = (parseInt(g.css("margin-right"),
                    10) || 0) / s.width() * 100; "rtl" == b.opts.direction && 0 === f || "rtl" != b.opts.direction && 0 !== f ? (r = (h + d - c) / h * t, g.css("margin-right", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(u).toFixed(4) + "%)")) : ("rtl" == b.opts.direction && 0 !== f || "rtl" != b.opts.direction && 0 === f) && (r = (h - d + c) / h * t, g.css("margin-left", "calc(100% - " + Math.round(r).toFixed(4) + "% - " + Math.round(v).toFixed(4) + "%)")),
                    g.css("width", Math.round(r).toFixed(4) + "%")
                }
                b.selection.restore(),
                b.undo.saveStep()
            }
            xa.removeData("origin"),
            xa.removeData("release-position"),
            xa.removeData("first"),
            xa.removeData("second"),
            xa.removeData("table")
        }
        function ka(b, c) {
            var d, e = a(c[0][b]).outerWidth();
            for (d = 1; d < c.length; d++) e = Math.min(e, a(c[d][b]).outerWidth());
            return e
        }
        function la(a, b, c) {
            var d, e = 0; for (d = a; d <= b; d++) e += ka(d, c);
            return e
        }
        function ma(a) {
            if (sa().length > 1 && Aa && N(),
            !1 === Aa && !1 === za && !1 === Da) Ca && clearTimeout(Ca),
            b.edit.isDisabled() && !b.popups.isVisible("table.edit") || (Ca = setTimeout(ha, 30, a));
            else
                if (Da) {
                    var c = a.pageX - b.win.pageXOffset; b.opts.iframe && (c += b.$iframe.offset().left);
                    var d = xa.data("max-left"),
                    e = xa.data("max-right");
                    c >= d && c <= e ? xa.css("left", c - b.opts.tableResizerOffset) : c < d && parseFloat(xa.css("left"),
                    10) > d - b.opts.tableResizerOffset ? xa.css("left", d - b.opts.tableResizerOffset) : c > e && parseFloat(xa.css("left"),
                    10) < e - b.opts.tableResizerOffset && xa.css("left", e - b.opts.tableResizerOffset)
                }
                else Aa && ca()
        }
        function na(c) { b.node.isEmpty(c.get(0)) ? c.prepend(a.FE.MARKERS) : c.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER) }
        function oa(c) {
            if (c.which == a.FE.KEYCODE.TAB) {
                var d;
                if (sa().length > 0) d = b.$el.find(".fr-selected-cell:last");
                else {
                    var e = b.selection.element()
                    ; "TD" == e.tagName || "TH" == e.tagName ? d = a(e) : e != b.el && (a(e).parentsUntil(b.$el, "td").length > 0 ? d = a(e).parents("td:first") : a(e).parentsUntil(b.$el, "th").length > 0 && (d = a(e).parents("th:first")))
                }

                if (d) return c.preventDefault(),
                a(b.selection.element()).parents("ol, ul").length > 0 || (T(),
                c.shiftKey ? d.prev().length > 0 ? na(d.prev()) : d.closest("tr").length > 0 && d.closest("tr").prev().length > 0 ? na(d.closest("tr").prev().find("td:last")) : d.closest("tbody").length > 0 && d.closest("table").find("thead tr").length > 0 && na(d.closest("table").find("thead tr th:last")) : d.next().length > 0 ? na(d.next()) : d.closest("tr").length > 0 && d.closest("tr").next().length > 0 ? na(d.closest("tr").next().find("td:first")) : d.closest("thead").length > 0 && d.closest("table").find("tbody tr").length > 0 ? na(d.closest("table").find("tbody tr td:first")) : (d.addClass("fr-selected-cell"),
                t("below"),
                M(),
                na(d.closest("tr").next().find("td:first"))),
                b.selection.restore(),
                !1)
            }
        }
        function pa() {
            b.shared.$ti_helper || (b.shared.$ti_helper = a('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + b.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'),
            b.events.bindClick(b.shared.$ti_helper, "a", function () {
                var a = ya.data("selected-cell"),
                c = ya.data("position"),
                d = ya.data("instance") || b; "before" == c ? (a.addClass("fr-selected-cell"),
                d.table.insertColumn(c),
                a.removeClass("fr-selected-cell")) : "after" == c ? (a.addClass("fr-selected-cell"),
                d.table.insertColumn(c),
                a.removeClass("fr-selected-cell")) : "above" == c ? (a.addClass("fr-selected-cell"),
                d.table.insertRow(c),
                a.removeClass("fr-selected-cell")) : "below" == c && (a.addClass("fr-selected-cell"),
                d.table.insertRow(c),
                a.removeClass("fr-selected-cell")),
                ca()
            }),
            b.events.on("shared.destroy", function () {
                b.shared.$ti_helper.html("").removeData().remove(),
                b.shared.$ti_helper = null
            },
            !0),
            b.events.$on(b.shared.$ti_helper, "mousemove", function (a) { a.stopPropagation() },
            !0),
            b.events.$on(a(b.o_win),
            "scroll", function () { ca() },
            !0),
            b.events.$on(b.$wp, "scroll", function () { ca() },
            !0)),
            ya = b.shared.$ti_helper, b.events.on("destroy", function () { ya = null }),
            b.tooltip.bind(b.$box, ".fr-insert-helper > a.fr-floating-btn")
        }
        function qa() { Ba = null, clearTimeout(Ca) }
        function ra() {
            sa().length > 0 ? d() : (b.popups.hide("table.insert"),
            b.toolbar.showInline())
        }
        function sa() { return b.el.querySelectorAll(".fr-selected-cell") }
        function ta() {
            var c = sa();

            if (c.length) { for (var d = c[0]; d && "TABLE" != d.tagName && d.parentNode != b.el;) d = d.parentNode; return a(d && "TABLE" == d.tagName ? d : []) }
            return a([])
        }
        function ua(c) {
            if (c.altKey && c.which == a.FE.KEYCODE.SPACE) {
                var e, f = b.selection.element();

                if ("TD" == f.tagName || "TH" == f.tagName ? e = f : a(f).closest("td").length > 0 ? e = a(f).closest("td").get(0) : a(f).closest("th").length > 0 && (e = a(f).closest("th").get(0)),
                e) return c.preventDefault(),
                R(e, e),
                d(),
                !1
            }
        }
        function va(c) {
            var d = sa();

            if (d.length > 0) {
                var e, f, g = I(),
                h = c.which; 1 == d.length ? (e = d[0], f = e) : (e = b.el.querySelector(".fr-cell-fixed"),
                f = b.el.querySelector(".fr-cell-handler"));
                var i = J(f, g);

                if (a.FE.KEYCODE.ARROW_RIGHT == h) {
                    if (i.col < g[0].length - 1) return R(e, g[i.row][i.col + 1]),
                    !1
                }
                else
                    if (a.FE.KEYCODE.ARROW_DOWN == h) {
                        if (i.row < g.length - 1) return R(e, g[i.row + 1][i.col]),
                        !1
                    }
                    else
                        if (a.FE.KEYCODE.ARROW_LEFT == h) {
                            if (i.col > 0) return R(e, g[i.row][i.col - 1]),
                            !1
                        }
                        else
                            if (a.FE.KEYCODE.ARROW_UP == h && i.row > 0) return R(e, g[i.row - 1][i.col]),
                            !1
            }
        }
        function wa() {
            if (!b.$wp) return !1;
            if (!b.helpers.isMobile()) {
                Aa = !1, za = !1, Da = !1, b.events.$on(b.$el, "mousedown", U),
                b.popups.onShow("image.edit", function () {
                    M(),
                    Aa = !1, za = !1
                }),
                b.popups.onShow("link.edit", function () {
                    M(),
                    Aa = !1, za = !1
                }),
                b.events.on("commands.mousedown", function (a) { a.parents(".fr-toolbar").length > 0 && M() }),
                b.events.$on(b.$el, "mouseenter", "th, td", W),
                b.events.$on(b.$win, "mouseup", V),
                b.opts.iframe && b.events.$on(a(b.o_win),
                "mouseup", V),
                b.events.$on(b.$win, "mousemove", ma),
                b.events.$on(a(b.o_win),
                "scroll", ia),
                b.events.on("contentChanged", function () {
                    sa().length > 0 && (d(),
                    b.$el.find("img").on("load.selected-cells", function () {
                        a(this).off("load.selected-cells"),
                        sa().length > 0 && d()
                    }))
                }),
                b.events.$on(a(b.o_win),
                "resize", function () { M() }),
                b.events.on("toolbar.esc", function () {
                    if (sa().length > 0) return b.events.disableBlur(),
                    b.events.focus(),
                    !1
                },
                !0),
                b.events.$on(b.$el, "keydown", function (a) {
                    a.shiftKey ? !1 === va(a) && setTimeout(function () { d() },
                    0) : _(a)
                }),
                b.events.on("keydown", function (c) {
                    if (!1 === oa(c)) return !1; var d = sa();

                    if (d.length > 0) {
                        if (d.length > 0 && b.keys.ctrlKey(c) && c.which == a.FE.KEYCODE.A) return M(),
                        b.popups.isVisible("table.edit") && b.popups.hide("table.edit"),
                        d = [], !0;
                        if (c.which == a.FE.KEYCODE.ESC && b.popups.isVisible("table.edit")) return M(),
                        b.popups.hide("table.edit"),
                        c.preventDefault(),
                        c.stopPropagation(),
                        c.stopImmediatePropagation(),
                        d = [], !1;
                        if (d.length > 1 && c.which == a.FE.KEYCODE.BACKSPACE) {
                            b.undo.saveStep();
                            for (var e = 0; e < d.length; e++) a(d[e]).html("<br>"),
                            e == d.length - 1 && a(d[e]).prepend(a.FE.MARKERS);
                            return b.selection.restore(),
                            b.undo.saveStep(),
                            d = [], !1
                        }

                        if (d.length > 1 && c.which != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c)) return c.preventDefault(),
                        d = [], !1
                    }
                    else
                        if (d = [], !1 === ua(c)) return !1
                },
                !0);
                var c = []; b.events.on("html.beforeGet", function () {
                    c = sa();
                    for (var a = 0; a < c.length; a++) c[a].className = (c[a].className || "").replace(/fr-selected-cell/g, "")
                }),
                b.events.on("html.afterGet", function () { for (var a = 0; a < c.length; a++) c[a].className = (c[a].className ? c[a].className.trim() + " " : "") + "fr-selected-cell"; c = [] }),
                g(!0),
                k(!0)
            }
            b.events.on("destroy", qa)
        }
        var xa, ya, za, Aa, Ba, Ca, Da; return { _init: wa, insert: p, remove: q, insertRow: t, deleteRow: u, insertColumn: v, deleteColumn: w, mergeCells: B, splitCellVertically: D, splitCellHorizontally: C, addHeader: r, removeHeader: s, setBackground: E, showInsertPopup: c, showEditPopup: d, showColorsPopup: e, back: ra, verticalAlign: F, horizontalAlign: G, applyStyle: H, selectedTable: ta, selectedCells: sa }
    },
    a.FE.DefineIcon("insertTable", { NAME: "table" }),
    a.FE.RegisterCommand("insertTable", {
        title: "Insert Table", undo: !1, focus: !0, refreshOnCallback: !1, popup: !0, callback: function () {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
            this.selection.restore()),
            this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }),
    a.FE.RegisterCommand("tableInsert", {
        callback: function (a, b, c) {
            this.table.insert(b, c),
            this.popups.hide("table.insert")
        }
    }),
    a.FE.DefineIcon("tableHeader", { NAME: "header" }),
    a.FE.RegisterCommand("tableHeader", {
        title: "Table Header", focus: !1, toggle: !0, callback: function () { this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader() },
        refresh: function (a) {
            var b = this.table.selectedTable();
            b.length > 0 && (0 === b.find("th").length ? a.removeClass("fr-active").attr("aria-pressed", !1) : a.addClass("fr-active").attr("aria-pressed", !0))
        }
    }),
    a.FE.DefineIcon("tableRows", { NAME: "bars" }),
    a.FE.RegisterCommand("tableRows", {
        type: "dropdown", focus: !1, title: "Row", options: { above: "Insert row above", below: "Insert row below", delete: "Delete row" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableRows.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { "above" == b || "below" == b ? this.table.insertRow(b) : this.table.deleteRow() }
    }),
    a.FE.DefineIcon("tableColumns", { NAME: "bars fa-rotate-90" }),
    a.FE.RegisterCommand("tableColumns", {
        type: "dropdown", focus: !1, title: "Column", options: { before: "Insert column before", after: "Insert column after", delete: "Delete column" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableColumns.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { "before" == b || "after" == b ? this.table.insertColumn(b) : this.table.deleteColumn() }
    }),
    a.FE.DefineIcon("tableCells", { NAME: "square-o" }),
    a.FE.RegisterCommand("tableCells", {
        type: "dropdown", focus: !1, title: "Cell", options: { merge: "Merge cells", "vertical-split": "Vertical split", "horizontal-split": "Horizontal split" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableCells.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(c[d]) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { "merge" == b ? this.table.mergeCells() : "vertical-split" == b ? this.table.splitCellVertically() : this.table.splitCellHorizontally() },
        refreshOnShow: function (a, b) {
            this.$el.find(".fr-selected-cell").length > 1 ? (b.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0),
            b.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0),
            b.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (b.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0),
            b.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1),
            b.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
        }
    }),
    a.FE.DefineIcon("tableRemove", { NAME: "trash" }),
    a.FE.RegisterCommand("tableRemove", { title: "Remove Table", focus: !1, callback: function () { this.table.remove() } }),
    a.FE.DefineIcon("tableStyle", { NAME: "paint-brush" }),
    a.FE.RegisterCommand("tableStyle", {
        title: "Table Style", type: "dropdown", focus: !1, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.tableStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell").closest("table"),
            this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function (b, c) {
            var d = this.$el.find(".fr-selected-cell").closest("table");
            d && c.find(".fr-command").each(function () {
                var b = a(this).data("param1"),
                c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }),
    a.FE.DefineIcon("tableCellBackground", { NAME: "tint" }),
    a.FE.RegisterCommand("tableCellBackground", { title: "Cell Background", focus: !1, popup: !0, callback: function () { this.table.showColorsPopup() } }),
    a.FE.RegisterCommand("tableCellBackgroundColor", { undo: !0, focus: !1, callback: function (a, b) { this.table.setBackground(b) } }),
    a.FE.DefineIcon("tableBack", { NAME: "arrow-left" }),
    a.FE.RegisterCommand("tableBack", {
        title: "Back", undo: !1, focus: !1, back: !0, callback: function () { this.table.back() },
        refresh: function (a) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
            a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
            a.next(".fr-separator").addClass("fr-hidden"))
        }
    }),
    a.FE.DefineIcon("tableCellVerticalAlign", { NAME: "arrows-v" }),
    a.FE.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown", focus: !1, title: "Vertical Align", options: { Top: "Align Top", Middle: "Align Middle", Bottom: "Align Bottom" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableCellVerticalAlign.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + d.toLowerCase() + '" title="' + this.language.translate(c[d]) + '">' + this.language.translate(d) + "</a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { this.table.verticalAlign(b) },
        refreshOnShow: function (a, b) { b.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0) }
    }),
    a.FE.DefineIcon("tableCellHorizontalAlign", { NAME: "align-left" }),
    a.FE.DefineIcon("align-left", { NAME: "align-left" }),
    a.FE.DefineIcon("align-right", { NAME: "align-right" }),
    a.FE.DefineIcon("align-center", { NAME: "align-center" }),
    a.FE.DefineIcon("align-justify", { NAME: "align-justify" }),
    a.FE.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown", focus: !1, title: "Horizontal Align", options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
        html: function () {
            var b = '<ul class="fr-dropdown-list" role="presentation">', c = a.FE.COMMANDS.tableCellHorizontalAlign.options; for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
            return b += "</ul>"
        },
        callback: function (a, b) { this.table.horizontalAlign(b) },
        refresh: function (b) {
            var c = this.table.selectedCells();
            c.length && b.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(a(c[0]))))
        },
        refreshOnShow: function (a, b) { b.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0) }
    }),
    a.FE.DefineIcon("tableCellStyle", { NAME: "magic" }),
    a.FE.RegisterCommand("tableCellStyle", {
        title: "Cell Style", type: "dropdown", focus: !1, html: function () {
            var a = '<ul class="fr-dropdown-list" role="presentation">', b = this.opts.tableCellStyles; for (var c in b) b.hasOwnProperty(c) && (a += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + c + '" title="' + this.language.translate(b[c]) + '">' + this.language.translate(b[c]) + "</a></li>");
            return a += "</ul>"
        },
        callback: function (a, b) {
            this.table.applyStyle(b, this.$el.find(".fr-selected-cell"),
            this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function (b, c) {
            var d = this.$el.find(".fr-selected-cell:first");
            d && c.find(".fr-command").each(function () {
                var b = a(this).data("param1"),
                c = d.hasClass(b);
                a(this).toggleClass("fr-active", c).attr("aria-selected", c)
            })
        }
    }),
    a.FE.DefineIcon("tableColorRemove", { NAME: "eraser" })
});

/*eslint eqeqeq: "error"*/

!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function (b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
        a(c)
    } : a(window.jQuery)
}(function (a) {
    a.FE.URLRegEx = "(^| |\\u00A0)(" + a.FE.LinkRegEx + "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}))$", a.FE.PLUGINS.url = function (b) {
        function c(c, d, e) {
            for (var f = ""; e.length && "." == e[e.length - 1];) f += ".", e = e.substring(0, e.length - 1);
            var g = e;
            if (b.opts.linkConvertEmailAddress) { a.FE.MAIL_REGEX.test(g) && !/^mailto:.*/i.test(g) && (g = "mailto:" + g) }
            return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(g) || (g = "//" + g),
            (d || "") + "<a" + (b.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (j ? ' rel="' + j + '"' : "") + ' href="' + g + '">' + e.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>" + f
        }
        function d() { return new RegExp(a.FE.URLRegEx, "gi") }
        function e(a) {
            return b.opts.linkAlwaysNoFollow && (j = "nofollow"),
            b.opts.linkAlwaysBlank && (j ? j += " noopener noreferrer" : j = "noopener noreferrer"),
            a.replace(d(),
            c)
        }
        function f(a) { return !!a && ("A" === a.tagName || !(!a.parentNode || a.parentNode == b.el) && f(a.parentNode)) }
        function g(a) {
            var b = a.split(" ");
            return b[b.length - 1]
        }
        function h() {
            var c = b.selection.ranges(0),
            h = c.startContainer;
            if (!h || h.nodeType !== Node.TEXT_NODE) return !1;
            if (f(h)) return !1;
            if (d().test(g(h.textContent))) a(h).before(e(h.textContent)),
            h.parentNode.removeChild(h);
            else
                if (h.previousSibling && "A" === h.previousSibling.tagName) {
                    var i = h.previousSibling.innerText + h.textContent; d().test(g(i)) && (a(h.previousSibling).replaceWith(e(i)),
                    h.parentNode.removeChild(h))
                }
        }
        function i() {
            b.events.on("paste.afterCleanup", function (c) {
                var d = b.doc.createElement("div");
                d.innerHTML = c; for (var f = b.doc.createTreeWalker(d, NodeFilter.SHOW_TEXT, b.node.filter(function (b) { return new RegExp(a.FE.URLRegEx, "gi").test(b.textContent) }),
                !1) ;
                f.nextNode() ;
                ) { var g = f.currentNode; a(g).after(e(g.textContent)).remove() }
                return d.innerHTML
            }),
            b.events.on("keydown", function (c) { var d = c.which; !b.selection.isCollapsed() || d != a.FE.KEYCODE.ENTER && d != a.FE.KEYCODE.SPACE && d != a.FE.KEYCODE.PERIOD || h() },
            !0)
        }
        var j = null; return { _init: i }
    }
});

/*eslint eqeqeq: "error"*/ ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)),
            a(c)
    } : a(window.jQuery)
}(function(a) {
    a.extend(a.FE.POPUP_TEMPLATES, { "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]", "video.edit": "[_BUTTONS_]", "video.size": "[_BUTTONS_][_SIZE_LAYER_]" }),
        a.extend(a.FE.DEFAULTS, {
            videoAllowedTypes: ["mp4", "webm", "ogg"],
            videoAllowedProviders: [".*"],
            videoDefaultAlign: "center",
            videoDefaultDisplay: "block",
            videoDefaultWidth: 600,
            videoEditButtons: ["videoReplace", "videoRemove", "|", "videoDisplay", "videoAlign", "videoSize"],
            videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"],
            videoMaxSize: 52428800,
            videoMove: !0,
            videoResize: !0,
            videoSizeButtons: ["videoBack", "|"],
            videoSplitHTML: !1,
            videoTextNear: !0,
            videoUploadMethod: "POST",
            videoUploadParam: "file",
            videoUploadParams: {},
            videoUploadToS3: !1,
            videoUploadURL: "/FileApi/Video"
        }),
        a.FE.VIDEO_PROVIDERS = [{ test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g, url_text: "//www.youtube.com/embed/$1", html: '<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>', provider: "youtube" },
            { test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/, url_regex: /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i, url_text: "//player.vimeo.com/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vimeo" },
            { test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g, url_text: "//www.dailymotion.com/embed/video/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "dailymotion" },
            { test_regex: /^.+(screen.yahoo.com)\/[^_&]+/, url_regex: "", url_text: "", html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "yahoo" },
            { test_regex: /^.+(rutube.ru)\/[^_&]+/, url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g, url_text: "//rutube.ru/play/embed/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>', provider: "rutube" },
            { test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/, url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&\/]+)\/?(?:[^_.&]+)?/g, url_text: "//play.vidyard.com/$1", html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>', provider: "vidyard" }
        ], a.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i, a.FE.PLUGINS.video = function(b) {
            function c() {
                var a = b.popups.get("video.insert");
                a.find(".fr-video-by-url-layer input").val("").trigger("change");
                var c = a.find(".fr-video-embed-layer textarea");
                c.val("").trigger("change"),
                    c = a.find(".fr-video-upload-layer input"),
                    c.val("").trigger("change")
            }

            function d() {
                var a = b.$tb.find('.fr-command[data-cmd="insertVideo"]'),
                    c = b.popups.get("video.insert");

                if (c || (c = f()),
                    o(), !c.hasClass("fr-active")) {
                    b.popups.refresh("video.insert"),
                        b.popups.setContainer("video.insert", b.$tb);
                    var d = a.offset().left + a.outerWidth() / 2,
                        e = a.offset().top + (b.opts.toolbarBottom ? 10 : a.outerHeight() - 10);
                    b.popups.show("video.insert", d, e, a.outerHeight())
                }
            }

            function e() {
                var a = b.popups.get("video.edit");

                if (a || (a = T()),
                    a) {
                    b.popups.setContainer("video.edit", b.$sc),
                        b.popups.refresh("video.edit");
                    var c = ra.find("iframe, embed, video"),
                        d = c.offset().left + c.outerWidth() / 2,
                        e = c.offset().top + c.outerHeight();
                    b.popups.show("video.edit", d, e, c.outerHeight())
                }
            }

            function f(a) {
                if (a) return b.popups.onRefresh("video.insert", c),
                    b.popups.onHide("image.insert", ea), !0;
                var d = "";
                b.opts.videoInsertButtons.length > 1 && (d = '<div class="fr-buttons">' + b.button.buildList(b.opts.videoInsertButtons) + "</div>");
                var e, f = "",
                    g = b.opts.videoInsertButtons.indexOf("videoUpload"),
                    h = b.opts.videoInsertButtons.indexOf("videoByURL"),
                    i = b.opts.videoInsertButtons.indexOf("videoEmbed");
                h >= 0 && (e = " fr-active", (h > g && g >= 0 || h > i && i >= 0) && (e = ""),
                    f = '<div class="fr-video-by-url-layer fr-layer' + e + '" id="fr-video-by-url-layer-' + b.id + '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-' + b.id + '" type="text" placeholder="' + b.language.translate("Paste in a video URL") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">' + b.language.translate("Insert") + "</button></div></div>");
                var j = "";
                i >= 0 && (e = " fr-active", (i > g && g >= 0 || i > h && h >= 0) && (e = ""),
                    j = '<div class="fr-video-embed-layer fr-layer' + e + '" id="fr-video-embed-layer-' + b.id + '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text' + b.id + '" type="text" placeholder="' + b.language.translate("Embedded Code") + '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">' + b.language.translate("Insert") + "</button></div></div>");
                var k = "";
                g >= 0 && (e = " fr-active", (g > i && i >= 0 || g > h && h >= 0) && (e = ""),
                    k = '<div class="fr-video-upload-layer fr-layer' + e + '" id="fr-video-upload-layer-' + b.id + '"><strong>' + b.language.translate("Drop video") + "</strong><br>(" + b.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="video/' + b.opts.videoAllowedTypes.join(", video/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-' + b.id + '" role="button"></div></div>');
                var l = '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>',
                    m = { buttons: d, by_url_layer: f, embed_layer: j, upload_layer: k, progress_bar: l },
                    n = b.popups.create("video.insert", m);
                return Q(n),
                    n
            }

            function g(a) {
                var c, d, e = b.popups.get("video.insert");

                if (!ra && !b.opts.toolbarInline) {
                    var f = b.$tb.find('.fr-command[data-cmd="insertVideo"]');
                    c = f.offset().left + f.outerWidth() / 2, d = f.offset().top + (b.opts.toolbarBottom ? 10 : f.outerHeight() - 10)
                }
                b.opts.toolbarInline && (d = e.offset().top - b.helpers.getPX(e.css("margin-top")),
                        e.hasClass("fr-above") && (d += e.outerHeight())),
                    e.find(".fr-layer").removeClass("fr-active"),
                    e.find(".fr-" + a + "-layer").addClass("fr-active"),
                    b.popups.show("video.insert", c, d, 0),
                    b.accessibility.focusPopup(e)
            }

            function h(a) { b.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0) }

            function i(a) { b.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0) }

            function j(a) { b.popups.get("video.insert").find(".fr-video-upload-layer").hasClass("fr-active") && a.addClass("fr-active").attr("aria-pressed", !0) }

            function k(a) {
                b.events.focus(!0),
                    b.selection.restore();
                var c = !1;
                ra && (da(),
                        c = !0),
                    b.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video">' + a + "</span>", !1, b.opts.videoSplitHTML),
                    b.popups.hide("video.insert");
                var d = b.$el.find(".fr-jiv");
                d.removeClass("fr-jiv"),
                    fa(d, b.opts.videoDefaultDisplay, b.opts.videoDefaultAlign),
                    d.toggleClass("fr-draggable", b.opts.videoMove),
                    b.events.trigger(c ? "video.replaced" : "video.inserted", [d])
            }

            function l() {
                var c = a(this);
                b.popups.hide("video.insert"),
                    c.removeClass("fr-uploading"),
                    c.parent().next().is("br") && c.parent().next().remove(),
                    t(c.parent()),
                    b.events.trigger("video.loaded", [c.parent()])
            }

            function m(a, c, d, e, f) {
                b.edit.off(),
                    p("Loading video"),
                    c && (a = b.helpers.sanitizeURL(a));
                var g = function() {
                    var c, g;
                    if (e) {
                        b.undo.canDo() || e.find("video").hasClass("fr-uploading") || b.undo.saveStep();
                        var h = e.find("video").data("fr-old-src"),
                            i = e.data("fr-replaced");
                        e.data("fr-replaced", !1),
                            b.$wp ? (c = e.clone(),
                                c.find("video").removeData("fr-old-src").removeClass("fr-uploading"),
                                c.find("video").off("canplay"),
                                h && e.find("video").attr("src", h),
                                e.replaceWith(c)) : c = e;
                        for (var j = c.find("video").get(0).attributes, k = 0; k < j.length; k++) {
                            var m = j[k];
                            0 === m.nodeName.indexOf("data-") && c.find("video").removeAttr(m.nodeName)
                        }

                        if (void 0 !== d)
                            for (g in d) d.hasOwnProperty(g) && "link" != g && c.find("video").attr("data-" + g, d[g]);
                        c.find("video").on("canplay", l),
                            c.find("video").attr("src", a),
                            b.edit.on(),
                            H(),
                            b.undo.saveStep(),
                            b.$el.blur(),
                            b.events.trigger(i ? "video.replaced" : "video.inserted", [c, f])
                    } else c = A(a, d, l),
                        H(),
                        b.undo.saveStep(),
                        b.events.trigger("video.inserted", [c, f])
                };
                n("Loading video"),
                    g()
            }

            function n(a) {
                var c = b.popups.get("video.insert");

                if (c || (c = f()),
                    c.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"),
                    c.find(".fr-video-progress-bar-layer").addClass("fr-active"),
                    c.find(".fr-buttons").hide(),
                    ra) {
                    var d = ra.find("video");
                    b.popups.setContainer("video.insert", b.$sc);
                    var e = d.offset().left + d.width() / 2,
                        g = d.offset().top + d.height();
                    b.popups.show("video.insert", e, g, d.outerHeight())
                }
                void 0 === a && p(b.language.translate("Uploading"),
                    0)
            }

            function o(a) {
                var c = b.popups.get("video.insert");

                if (c && (c.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"),
                        c.find(".fr-video-progress-bar-layer").removeClass("fr-active"),
                        c.find(".fr-buttons").show(),
                        a || b.$el.find("video.fr-error").length)) {
                    if (b.events.focus(),
                        b.$el.find("video.fr-error").length && (b.$el.find("video.fr-error").parent().remove(),
                            b.undo.saveStep(),
                            b.undo.run(),
                            b.undo.dropRedo()), !b.$wp && ra) {
                        var d = ra;
                        K(!0),
                            b.selection.setAfter(d.find("video").get(0)),
                            b.selection.restore()
                    }
                    b.popups.hide("video.insert")
                }
            }

            function p(a, c) {
                var d = b.popups.get("video.insert");

                if (d) {
                    var e = d.find(".fr-video-progress-bar-layer");
                    e.find("h3").text(a + (c ? " " + c + "%" : "")),
                        e.removeClass("fr-error"),
                        c ? (e.find("div").removeClass("fr-indeterminate"),
                            e.find("div > span").css("width", c + "%")) : e.find("div").addClass("fr-indeterminate")
                }
            }

            function q(a) {
                n();
                var c = b.popups.get("video.insert"),
                    d = c.find(".fr-video-progress-bar-layer");
                d.addClass("fr-error");
                var e = d.find("h3");
                e.text(a),
                    b.events.disableBlur(),
                    e.focus()
            }

            function r(c) {
                if (void 0 === c) { c = b.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "" }
                var d = null;
                if (/^http/.test(c) || (c = "https://" + c),
                    b.helpers.isURL(c))
                    for (var e = 0; e < a.FE.VIDEO_PROVIDERS.length; e++) {
                        var f = a.FE.VIDEO_PROVIDERS[e];
                        if (f.test_regex.test(c) && new RegExp(b.opts.videoAllowedProviders.join("|")).test(f.provider)) {
                            d = c.replace(f.url_regex, f.url_text),
                                d = f.html.replace(/\{url\}/, d);
                            break
                        }
                    }
                d ? k(d) : b.events.trigger("video.linkError", [c])
            }

            function s(c) {
                if (void 0 === c) { c = b.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || "" }
                0 !== c.length && a.FE.VIDEO_EMBED_REGEX.test(c) ? k(c) : b.events.trigger("video.codeError", [c])
            }

            function t(a) { J.call(a.get(0)) }

            function u(a) {
                try {
                    if (!1 === b.events.trigger("video.uploaded", [a], !0)) return b.edit.on(), !1;
                    var c = JSON.parse(a);
                    return c.link ? c : (S(sa, a), !1)
                } catch (d) {
                    return S(ua, a), !1
                }
            }

            function v(c) {
                try {
                    var d = a(c).find("Location").text(),
                        e = a(c).find("Key").text();
                    return !1 === b.events.trigger("video.uploadedToS3", [d, e, c], !0) ? (b.edit.on(), !1) : d
                } catch (f) {
                    return S(ua, c), !1
                }
            }

            function w(a) {
                p("Loading video");
                var c = this.status,
                    d = this.response,
                    e = this.responseXML,
                    f = this.responseText;
                try {
                    if (b.opts.videoUploadToS3)
                        if (201 == c) {
                            var g = v(e);
                            g && m(g, !1, [], a, d || e)
                        } else S(ua, d || e);
                    else
                    if (c >= 200 && c < 300) {
                        var h = u(f);
                        h && m(h.link, !1, h, a, d || f)
                    } else S(ta, d || f)
                } catch (i) { S(ua, d || f) }
            }

            function x() { S(ua, this.response || this.responseText || this.responseXML) }

            function y(a) {
                if (a.lengthComputable) {
                    var c = a.loaded / a.total * 100 | 0;
                    p(b.language.translate("Uploading"),
                        c)
                }
            }

            function z() {
                b.edit.on(),
                    o(!0)
            }

            function A(c, d, e) {
                var f, g = "";
                if (d && void 0 !== d)
                    for (f in d) d.hasOwnProperty(f) && "link" != f && (g += " data-" + f + '="' + d[f] + '"');
                var h = b.opts.videoDefaultWidth;
                h && "auto" != h && (h += "px");
                var i = a('<span contenteditable="false" draggable="true" class="fr-video fr-dv' + b.opts.videoDefaultDisplay[0] + ("center" != b.opts.videoDefaultAlign ? " fr-fv" + b.opts.videoDefaultAlign[0] : "") + '"><video src="' + c + '" ' + g + (h ? ' style="width: ' + h + ';" ' : "") + " controls>" + b.language.translate("Your browser does not support HTML5 video.") + "</video></span>");
                i.toggleClass("fr-draggable", b.opts.videoMove),
                    b.edit.on(),
                    b.events.focus(!0),
                    b.selection.restore(),
                    b.undo.saveStep(),
                    b.opts.videoSplitHTML ? b.markers.split() : b.markers.insert();
                var j = b.$el.find(".fr-marker");
                return b.node.isLastSibling(j) && j.parent().hasClass("fr-deletable") && j.insertAfter(j.parent()),
                    j.replaceWith(i),
                    b.html.wrap(),
                    b.selection.clear(),
                    i.find("video").get(0).readyState > i.find("video").get(0).HAVE_FUTURE_DATA || b.helpers.isIOS() ? e.call(i.find("video").get(0)) : i.find("video").on("canplaythrough load", e),
                    i
            }

            function B(c) {
                if (!b.core.sameInstance(qa)) return !0;
                c.preventDefault(),
                    c.stopPropagation();
                var d = c.pageX || (c.originalEvent.touches ? c.originalEvent.touches[0].pageX : null),
                    e = c.pageY || (c.originalEvent.touches ? c.originalEvent.touches[0].pageY : null);

                if (!d || !e) return !1;
                if ("mousedown" == c.type) {
                    var f = b.$oel.get(0),
                        g = f.ownerDocument,
                        h = g.defaultView || g.parentWindow,
                        i = !1;
                    try { i = h.location != h.parent.location && !(h.$ && h.$.FE) } catch (j) {}
                    i && h.frameElement && (d += b.helpers.getPX(a(h.frameElement).offset().left) + h.frameElement.clientLeft, e = c.clientY + b.helpers.getPX(a(h.frameElement).offset().top) + h.frameElement.clientTop)
                }
                b.undo.canDo() || b.undo.saveStep(),
                    pa = a(this),
                    pa.data("start-x", d),
                    pa.data("start-y", e),
                    oa.show(),
                    b.popups.hideAll(),
                    M()
            }

            function C(a) {
                if (!b.core.sameInstance(qa)) return !0;
                if (pa) {
                    a.preventDefault();
                    var c = a.pageX || (a.originalEvent.touches ? a.originalEvent.touches[0].pageX : null),
                        d = a.pageY || (a.originalEvent.touches ? a.originalEvent.touches[0].pageY : null);

                    if (!c || !d) return !1;
                    var e = pa.data("start-x"),
                        f = pa.data("start-y");
                    pa.data("start-x", c),
                        pa.data("start-y", d);
                    var g = c - e,
                        h = d - f,
                        i = ra.find("iframe, embed, video"),
                        j = i.width(),
                        k = i.height();
                    (pa.hasClass("fr-hnw") || pa.hasClass("fr-hsw")) && (g = 0 - g),
                    (pa.hasClass("fr-hnw") || pa.hasClass("fr-hne")) && (h = 0 - h),
                    i.css("width", j + g),
                        i.css("height", k + h),
                        i.removeAttr("width"),
                        i.removeAttr("height"),
                        I()
                }
            }

            function D(a) {
                if (!b.core.sameInstance(qa)) return !0;
                pa && ra && (a && a.stopPropagation(),
                    pa = null, oa.hide(),
                    I(),
                    e(),
                    b.undo.saveStep())
            }

            function E(a) { return '<div class="fr-handler fr-h' + a + '"></div>' }

            function F(a, b, c, d) {
                return a.pageX = b, a.pageY = b, B.call(this, a),
                    a.pageX = a.pageX + c * Math.floor(Math.pow(1.1, d)),
                    a.pageY = a.pageY + c * Math.floor(Math.pow(1.1, d)),
                    C.call(this, a),
                    D.call(this, a),
                    ++d
            }

            function G() {
                var c;
                if (b.shared.$video_resizer ? (qa = b.shared.$video_resizer, oa = b.shared.$vid_overlay, b.events.on("destroy", function() { qa.removeClass("fr-active").appendTo(a("body:first")) }, !0)) : (b.shared.$video_resizer = a('<div class="fr-video-resizer"></div>'),
                        qa = b.shared.$video_resizer, b.events.$on(qa, "mousedown", function(a) { a.stopPropagation() }, !0),
                        b.opts.videoResize && (qa.append(E("nw") + E("ne") + E("sw") + E("se")),
                            b.shared.$vid_overlay = a('<div class="fr-video-overlay"></div>'),
                            oa = b.shared.$vid_overlay, c = qa.get(0).ownerDocument, a(c).find("body:first").append(oa))),
                    b.events.on("shared.destroy", function() {
                        qa.html("").removeData().remove(),
                            qa = null, b.opts.videoResize && (oa.remove(),
                                oa = null)
                    }, !0),
                    b.helpers.isMobile() || b.events.$on(a(b.o_win),
                        "resize.video",
                        function() { K(!0) }),
                    b.opts.videoResize) {
                    c = qa.get(0).ownerDocument, b.events.$on(qa, b._mousedown, ".fr-handler", B),
                        b.events.$on(a(c),
                            b._mousemove, C),
                        b.events.$on(a(c.defaultView || c.parentWindow),
                            b._mouseup, D),
                        b.events.$on(oa, "mouseleave", D);
                    var d = 1,
                        e = null,
                        f = 0;
                    b.events.on("keydown", function(c) {
                            if (ra) {
                                var g = -1 != navigator.userAgent.indexOf("Mac OS X") ? c.metaKey : c.ctrlKey,
                                    h = c.which;
                                (h !== e || c.timeStamp - f > 200) && (d = 1),
                                (h == a.FE.KEYCODE.EQUALS || b.browser.mozilla && h == a.FE.KEYCODE.FF_EQUALS) && g && !c.altKey ? d = F.call(this, c, 1, 1, d) : (h == a.FE.KEYCODE.HYPHEN || b.browser.mozilla && h == a.FE.KEYCODE.FF_HYPHEN) && g && !c.altKey && (d = F.call(this, c, 2, -1, d)),
                                    e = h, f = c.timeStamp
                            }
                        }),
                        b.events.on("keyup", function() { d = 1 })
                }
            }

            function H() {
                var c, d = Array.prototype.slice.call(b.el.querySelectorAll("video")),
                    e = [];
                for (c = 0; c < d.length; c++) e.push(d[c].getAttribute("src")),
                    a(d[c]).toggleClass("fr-draggable", b.opts.videoMove),
                    "" === d[c].getAttribute("class") && d[c].removeAttribute("class"),
                    "" === d[c].getAttribute("style") && d[c].removeAttribute("style");

                if (ya)
                    for (c = 0; c < ya.length; c++) e.indexOf(ya[c].getAttribute("src")) < 0 && b.events.trigger("video.removed", [a(ya[c])]);
                ya = d
            }

            function I() {
                qa || G(),
                    (b.$wp || b.$sc).append(qa),
                    qa.data("instance", b);
                var a = ra.find("iframe, embed, video");
                qa.css("top", (b.opts.iframe ? a.offset().top - 1 + b.$iframe.position().top : a.offset().top - b.$wp.offset().top - 1) + b.$wp.scrollTop()).css("left", (b.opts.iframe ? a.offset().left - 1 : a.offset().left - b.$wp.offset().left - 1) + b.$wp.scrollLeft()).css("width", a.outerWidth()).css("height", a.height()).addClass("fr-active")
            }

            function J(c) {
                if (c && "touchend" == c.type && za) return !0;
                if (c && b.edit.isDisabled()) return c.stopPropagation(),
                    c.preventDefault(), !1;
                if (b.edit.isDisabled()) return !1;
                for (var d = 0; d < a.FE.INSTANCES.length; d++) a.FE.INSTANCES[d] != b && a.FE.INSTANCES[d].events.trigger("video.hideResizer");
                b.toolbar.disable(),
                    b.helpers.isMobile() && (b.events.disableBlur(),
                        b.$el.blur(),
                        b.events.enableBlur()),
                    ra = a(this),
                    a(this).addClass("fr-active"),
                    b.opts.iframe && b.size.syncIframe(),
                    ka(),
                    I(),
                    e(),
                    b.selection.clear(),
                    b.button.bulkRefresh(),
                    b.events.trigger("image.hideResizer")
            }

            function K(a) {
                ra && (N() || !0 === a) && (qa.removeClass("fr-active"),
                    b.toolbar.enable(),
                    ra.removeClass("fr-active"),
                    ra = null, M())
            }

            function L() { b.shared.vid_exit_flag = !0 }

            function M() { b.shared.vid_exit_flag = !1 }

            function N() { return b.shared.vid_exit_flag }

            function O(c) {
                var d = c.originalEvent.dataTransfer;
                if (d && d.files && d.files.length) {
                    var e = d.files[0];
                    if (e && e.type && -1 !== e.type.indexOf("video")) {
                        b.markers.remove(),
                            b.markers.insertAtPoint(c.originalEvent),
                            b.$el.find(".fr-marker").replaceWith(a.FE.MARKERS),
                            b.popups.hideAll();
                        var g = b.popups.get("video.insert");
                        return g || (g = f()),
                            b.popups.setContainer("video.insert", b.$sc),
                            b.popups.show("video.insert", c.originalEvent.pageX, c.originalEvent.pageY),
                            n(),
                            b.opts.videoAllowedTypes.indexOf(e.type.replace(/video\//g, "")) >= 0 ? P(d.files) : S(wa),
                            c.preventDefault(),
                            c.stopPropagation(), !1
                    }
                }
            }

            function P(a) {
                if (void 0 !== a && a.length > 0) {
                    if (!1 === b.events.trigger("video.beforeUpload", [a])) return !1;
                    var c = a[0];
                    if (c.size > b.opts.videoMaxSize) return S(va), !1;
                    if (b.opts.videoAllowedTypes.indexOf(c.type.replace(/video\//g, "")) < 0) return S(wa), !1;
                    var d;
                    if (b.drag_support.formdata && (d = b.drag_support.formdata ? new FormData : null),
                        d) {
                        var e;
                        if (!1 !== b.opts.videoUploadToS3) {
                            d.append("key", b.opts.videoUploadToS3.keyStart + (new Date).getTime() + "-" + (c.name || "untitled")),
                                d.append("success_action_status", "201"),
                                d.append("X-Requested-With", "xhr"),
                                d.append("Content-Type", c.type);
                            for (e in b.opts.videoUploadToS3.params) b.opts.videoUploadToS3.params.hasOwnProperty(e) && d.append(e, b.opts.videoUploadToS3.params[e])
                        }
                        for (e in b.opts.videoUploadParams) b.opts.videoUploadParams.hasOwnProperty(e) && d.append(e, b.opts.videoUploadParams[e]);
                        d.append(b.opts.videoUploadParam, c);
                        var f = b.opts.videoUploadURL;
                        b.opts.videoUploadToS3 && (f = b.opts.videoUploadToS3.uploadURL ? b.opts.videoUploadToS3.uploadURL : "https://" + b.opts.videoUploadToS3.region + ".amazonaws.com/" + b.opts.videoUploadToS3.bucket);
                        var g = b.core.getXHR(f, b.opts.videoUploadMethod);
                        g.onload = function() { w.call(g, ra) },
                            g.onerror = x, g.upload.onprogress = y, g.onabort = z, n(),
                            b.events.disableBlur(),
                            b.edit.off(),
                            b.events.enableBlur();
                        var h = b.popups.get("video.insert");
                        h && h.off("abortUpload").on("abortUpload", function() { 4 != g.readyState && g.abort() }),
                            g.send(d)
                    }
                }
            }

            function Q(c) {
                b.events.$on(c, "dragover dragenter", ".fr-video-upload-layer", function() {
                        return a(this).addClass("fr-drop"), !1
                    }, !0),
                    b.events.$on(c, "dragleave dragend", ".fr-video-upload-layer", function() {
                        return a(this).removeClass("fr-drop"), !1
                    }, !0),
                    b.events.$on(c, "drop", ".fr-video-upload-layer", function(d) {
                        d.preventDefault(),
                            d.stopPropagation(),
                            a(this).removeClass("fr-drop");
                        var e = d.originalEvent.dataTransfer;
                        if (e && e.files) {
                            var f = c.data("instance") || b;
                            f.events.disableBlur(),
                                f.video.upload(e.files),
                                f.events.enableBlur()
                        }
                    }, !0),
                    b.helpers.isIOS() && b.events.$on(c, "touchstart", '.fr-video-upload-layer input[type="file"]', function() { a(this).trigger("click") }, !0),
                    b.events.$on(c, "change", '.fr-video-upload-layer input[type="file"]', function() {
                        if (this.files) {
                            var d = c.data("instance") || b;
                            d.events.disableBlur(),
                                c.find("input:focus").blur(),
                                d.events.enableBlur(),
                                d.video.upload(this.files)
                        }
                        a(this).val("")
                    }, !0)
            }

            function R() {
                b.events.on("drop", O, !0),
                    b.events.on("mousedown window.mousedown", L),
                    b.events.on("window.touchmove", M),
                    b.events.on("mouseup window.mouseup", K),
                    b.events.on("commands.mousedown", function(a) { a.parents(".fr-toolbar").length > 0 && K() }),
                    b.events.on("blur video.hideResizer commands.undo commands.redo element.dropped", function() { K(!0) })
            }

            function S(a, c) {
                b.edit.on(),
                    ra && ra.find("video").addClass("fr-error"),
                    q(b.language.translate("Something went wrong. Please try again.")),
                    b.events.trigger("video.error", [{ code: a, message: xa[a] },
                        c
                    ])
            }

            function T() {
                var a = "";
                if (b.opts.videoEditButtons.length > 0) {
                    a += '<div class="fr-buttons">', a += b.button.buildList(b.opts.videoEditButtons),
                        a += "</div>";
                    var c = { buttons: a },
                        d = b.popups.create("video.edit", c);
                    return b.events.$on(b.$wp, "scroll.video-edit", function() {
                            ra && b.popups.isVisible("video.edit") && (b.events.disableBlur(),
                                t(ra))
                        }),
                        d
                }
                return !1
            }

            function U() {
                if (ra) {
                    var a = b.popups.get("video.size"),
                        c = ra.find("iframe, embed, video");
                    a.find('input[name="width"]').val(c.get(0).style.width || c.attr("width")).trigger("change"),
                        a.find('input[name="height"]').val(c.get(0).style.height || c.attr("height")).trigger("change")
                }
            }

            function V() {
                var a = b.popups.get("video.size");
                a || (a = W()),
                    o(),
                    b.popups.refresh("video.size"),
                    b.popups.setContainer("video.size", b.$sc);
                var c = ra.find("iframe, embed, video"),
                    d = c.offset().left + c.width() / 2,
                    e = c.offset().top + c.height();
                b.popups.show("video.size", d, e, c.height())
            }

            function W(a) {
                if (a) return b.popups.onRefresh("video.size", U), !0;
                var c = "";
                c = '<div class="fr-buttons">' + b.button.buildList(b.opts.videoSizeButtons) + "</div>";
                var d = "";
                d = '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + b.id + '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-' + b.id + '" type="text" name="width" placeholder="' + b.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-' + b.id + '" type="text" name="height" placeholder="' + b.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">' + b.language.translate("Update") + "</button></div></div>";
                var e = { buttons: c, size_layer: d },
                    f = b.popups.create("video.size", e);
                return b.events.$on(b.$wp, "scroll", function() {
                        ra && b.popups.isVisible("video.size") && (b.events.disableBlur(),
                            t(ra))
                    }),
                    f
            }

            function X(a) {
                if (void 0 === a && (a = ra),
                    a) {
                    if (a.hasClass("fr-fvl")) return "left";
                    if (a.hasClass("fr-fvr")) return "right";
                    if (a.hasClass("fr-dvb") || a.hasClass("fr-dvi")) return "center";
                    if ("block" == a.css("display")) {
                        if ("left" == a.css("text-algin")) return "left";
                        if ("right" == a.css("text-align")) return "right"
                    } else {
                        if ("left" == a.css("float")) return "left";
                        if ("right" == a.css("float")) return "right"
                    }
                }
                return "center"
            }

            function Y(a) {
                ra.removeClass("fr-fvr fr-fvl"), !b.opts.htmlUntouched && b.opts.useClasses ? "left" == a ? ra.addClass("fr-fvl") : "right" == a && ra.addClass("fr-fvr") : fa(ra, _(),
                        a),
                    ka(),
                    I(),
                    e(),
                    b.selection.clear()
            }

            function Z(a) {
                if (!ra) return !1;
                a.find("> *:first").replaceWith(b.icon.create("video-align-" + X()))
            }

            function $(a, b) { ra && b.find('.fr-command[data-param1="' + X() + '"]').addClass("fr-active").attr("aria-selected", !0) }

            function _(a) {
                void 0 === a && (a = ra);
                var b = a.css("float");
                return a.css("float", "none"),
                    "block" == a.css("display") ? (a.css("float", ""),
                        a.css("float") != b && a.css("float", b),
                        "block") : (a.css("float", ""),
                        a.css("float") != b && a.css("float", b),
                        "inline")
            }

            function aa(a) {
                ra.removeClass("fr-dvi fr-dvb"), !b.opts.htmlUntouched && b.opts.useClasses ? "inline" == a ? ra.addClass("fr-dvi") : "block" == a && ra.addClass("fr-dvb") : fa(ra, a, X()),
                    ka(),
                    I(),
                    e(),
                    b.selection.clear()
            }

            function ba(a, b) { ra && b.find('.fr-command[data-param1="' + _() + '"]').addClass("fr-active").attr("aria-selected", !0) }

            function ca() {
                var a = b.popups.get("video.insert");
                a || (a = f()),
                    b.popups.isVisible("video.insert") || (o(),
                        b.popups.refresh("video.insert"),
                        b.popups.setContainer("video.insert", b.$sc));
                var c = ra.offset().left + ra.width() / 2,
                    d = ra.offset().top + ra.height();
                b.popups.show("video.insert", c, d, ra.outerHeight())
            }

            function da() {
                if (ra && !1 !== b.events.trigger("video.beforeRemove", [ra])) {
                    var a = ra;
                    b.popups.hideAll(),
                        K(!0),
                        b.selection.setBefore(a.get(0)) || b.selection.setAfter(a.get(0)),
                        a.remove(),
                        b.selection.restore(),
                        b.html.fillEmptyBlocks(),
                        b.events.trigger("video.removed", [a])
                }
            }

            function ea() { o() }

            function fa(a, c, d) {
                !b.opts.htmlUntouched && b.opts.useClasses ? (a.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"),
                    a.addClass("fr-fv" + d[0] + " fr-dv" + c[0])) : "inline" == c ? (a.css({ display: "inline-block" }),
                    "center" == d ? a.css({ float: "none" }) : "left" == d ? a.css({ float: "left" }) : a.css({ float: "right" })) : (a.css({ display: "block", clear: "both" }),
                    "left" == d ? a.css({ textAlign: "left" }) : "right" == d ? a.css({ textAlign: "right" }) : a.css({ textAlign: "center" }))
            }

            function ga(a) {
                a.hasClass("fr-dvi") || a.hasClass("fr-dvb") || (a.addClass("fr-fv" + X(a)[0]),
                    a.addClass("fr-dv" + _(a)[0]))
            }

            function ha(a) {
                fa(a, a.hasClass("fr-dvb") ? "block" : a.hasClass("fr-dvi") ? "inline" : null, a.hasClass("fr-fvl") ? "left" : a.hasClass("fr-fvr") ? "right" : X(a)),
                    a.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl")
            }

            function ia() {
                b.$el.find("video").filter(function() { return 0 === a(this).parents("span.fr-video").length }).wrap('<span class="fr-video" contenteditable="false"></span>'),
                    b.$el.find("embed, iframe").filter(function() {
                        if (b.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src),
                            a(this).parents("span.fr-video").length > 0) return !1;
                        for (var c = a(this).attr("src"),
                                d = 0; d < a.FE.VIDEO_PROVIDERS.length; d++) {
                            var e = a.FE.VIDEO_PROVIDERS[d];
                            if (e.test_regex.test(c) && new RegExp(b.opts.videoAllowedProviders.join("|")).test(e.provider)) return !0
                        }
                        return !1
                    }).map(function() { return 0 === a(this).parents("object").length ? this : a(this).parents("object").get(0) }).wrap('<span class="fr-video" contenteditable="false"></span>');
                for (var c = b.$el.find("span.fr-video, video"),
                        d = 0; d < c.length; d++) {
                    var e = a(c[d]);
                    !b.opts.htmlUntouched && b.opts.useClasses ? (ga(e),
                        b.opts.videoTextNear || e.removeClass("fr-dvi").addClass("fr-dvb")) : b.opts.htmlUntouched || b.opts.useClasses || ha(e)
                }
                c.toggleClass("fr-draggable", b.opts.videoMove)
            }

            function ja() {
                R(),
                    b.helpers.isMobile() && (b.events.$on(b.$el, "touchstart", "span.fr-video", function() { za = !1 }),
                        b.events.$on(b.$el, "touchmove", function() { za = !0 })),
                    b.events.on("html.set", ia),
                    ia(),
                    b.events.$on(b.$el, "mousedown", "span.fr-video", function(a) { a.stopPropagation() }),
                    b.events.$on(b.$el, "click touchend", "span.fr-video", J),
                    b.events.on("keydown", function(c) {
                        var d = c.which;
                        return !ra || d != a.FE.KEYCODE.BACKSPACE && d != a.FE.KEYCODE.DELETE ? ra && d == a.FE.KEYCODE.ESC ? (K(!0),
                            c.preventDefault(), !1) : ra && d != a.FE.KEYCODE.F10 && !b.keys.isBrowserAction(c) ? (c.preventDefault(), !1) : void 0 : (c.preventDefault(),
                            da(),
                            b.undo.saveStep(), !1)
                    }, !0),
                    b.events.on("toolbar.esc", function() {
                        if (ra) return b.events.disableBlur(),
                            b.events.focus(), !1
                    }, !0),
                    b.events.on("toolbar.focusEditor", function() {
                        if (ra) return !1
                    }, !0),
                    b.events.on("keydown", function() { b.$el.find("span.fr-video:empty").remove() }),
                    f(!0),
                    W(!0)
            }

            function ka() {
                if (ra) {
                    b.selection.clear();
                    var a = b.doc.createRange();
                    a.selectNode(ra.get(0));
                    b.selection.get().addRange(a)
                }
            }

            function la() {
                ra ? (b.events.disableBlur(),
                    ra.trigger("click")) : (b.events.disableBlur(),
                    b.selection.restore(),
                    b.events.enableBlur(),
                    b.popups.hide("video.insert"),
                    b.toolbar.showInline())
            }

            function ma(a, c) {
                if (ra) {
                    var d = b.popups.get("video.size"),
                        e = ra.find("iframe, embed, video");
                    e.css("width", a || d.find('input[name="width"]').val()),
                        e.css("height", c || d.find('input[name="height"]').val()),
                        e.get(0).style.width && e.removeAttr("width"),
                        e.get(0).style.height && e.removeAttr("height"),
                        d.find("input:focus").blur(),
                        setTimeout(function() { ra.trigger("click") },
                            b.helpers.isAndroid() ? 50 : 0)
                }
            }

            function na() { return ra }
            var oa, pa, qa, ra, sa = 2,
                ta = 3,
                ua = 4,
                va = 5,
                wa = 6,
                xa = {};
            xa[1] = "Video cannot be loaded from the passed link.", xa[sa] = "No link in upload response.", xa[ta] = "Error during file upload.", xa[ua] = "Parsing response failed.", xa[va] = "File is too large.", xa[wa] = "Video file type is invalid.", xa[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
            var ya, za;
            return b.shared.vid_exit_flag = !1, { _init: ja, showInsertPopup: d, showLayer: g, refreshByURLButton: h, refreshEmbedButton: i, refreshUploadButton: j, upload: P, insertByURL: r, insertEmbed: s, insert: k, align: Y, refreshAlign: Z, refreshAlignOnShow: $, display: aa, refreshDisplayOnShow: ba, remove: da, hideProgressBar: o, showSizePopup: V, replace: ca, back: la, setSize: ma, get: na }
        },
        a.FE.RegisterCommand("insertVideo", {
            title: "Insert Video",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(),
                        this.selection.restore()),
                    this.popups.hide("video.insert")) : this.video.showInsertPopup()
            },
            plugin: "video"
        }),
        a.FE.DefineIcon("insertVideo", { NAME: "video-camera" }),
        a.FE.DefineIcon("videoByURL", { NAME: "link" }),
        a.FE.RegisterCommand("videoByURL", {
            title: "By URL",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() { this.video.showLayer("video-by-url") },
            refresh: function(a) { this.video.refreshByURLButton(a) }
        }),
        a.FE.DefineIcon("videoEmbed", { NAME: "code" }),
        a.FE.RegisterCommand("videoEmbed", {
            title: "Embedded Code",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() { this.video.showLayer("video-embed") },
            refresh: function(a) { this.video.refreshEmbedButton(a) }
        }),
        a.FE.DefineIcon("videoUpload", { NAME: "upload" }),
        a.FE.RegisterCommand("videoUpload", {
            title: "Upload Video",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() { this.video.showLayer("video-upload") },
            refresh: function(a) { this.video.refreshUploadButton(a) }
        }),
        a.FE.RegisterCommand("videoInsertByURL", { undo: !0, focus: !0, callback: function() { this.video.insertByURL() } }),
        a.FE.RegisterCommand("videoInsertEmbed", { undo: !0, focus: !0, callback: function() { this.video.insertEmbed() } }),
        a.FE.DefineIcon("videoDisplay", { NAME: "star" }),
        a.FE.RegisterCommand("videoDisplay", {
            title: "Display",
            type: "dropdown",
            options: { inline: "Inline", block: "Break Text" },
            callback: function(a, b) { this.video.display(b) },
            refresh: function(a) { this.opts.videoTextNear || a.addClass("fr-hidden") },
            refreshOnShow: function(a, b) { this.video.refreshDisplayOnShow(a, b) }
        }),
        a.FE.DefineIcon("video-align", { NAME: "align-left" }),
        a.FE.DefineIcon("video-align-left", { NAME: "align-left" }),
        a.FE.DefineIcon("video-align-right", { NAME: "align-right" }),
        a.FE.DefineIcon("video-align-center", { NAME: "align-justify" }),
        a.FE.DefineIcon("videoAlign", { NAME: "align-center" }),
        a.FE.RegisterCommand("videoAlign", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "None", right: "Align Right" },
            html: function() {
                var b = '<ul class="fr-dropdown-list" role="presentation">',
                    c = a.FE.COMMANDS.videoAlign.options;
                for (var d in c) c.hasOwnProperty(d) && (b += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="' + d + '" title="' + this.language.translate(c[d]) + '">' + this.icon.create("video-align-" + d) + '<span class="fr-sr-only">' + this.language.translate(c[d]) + "</span></a></li>");
                return b += "</ul>"
            },
            callback: function(a, b) { this.video.align(b) },
            refresh: function(a) { this.video.refreshAlign(a) },
            refreshOnShow: function(a, b) { this.video.refreshAlignOnShow(a, b) }
        }),

        a.FE.DefineIcon("videoReplace", { NAME: "exchange" }),
        a.FE.RegisterCommand("videoReplace", { title: "Replace", undo: !1, focus: !1, popup: !0, refreshAfterCallback: !1, callback: function() { this.video.replace() } }),
        a.FE.DefineIcon("videoRemove", { NAME: "trash" }),
        a.FE.RegisterCommand("videoRemove", { title: "Remove", callback: function() { this.video.remove() } }),
        a.FE.DefineIcon("videoSize", { NAME: "arrows-alt" }),
        a.FE.RegisterCommand("videoSize", { undo: !1, focus: !1, popup: !0, title: "Change Size", callback: function() { this.video.showSizePopup() } }),
        a.FE.DefineIcon("videoBack", { NAME: "arrow-left" }),
        a.FE.RegisterCommand("videoBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            callback: function() { this.video.back() },
            refresh: function(a) {
                this.video.get() || this.opts.toolbarInline ? (a.removeClass("fr-hidden"),
                    a.next(".fr-separator").removeClass("fr-hidden")) : (a.addClass("fr-hidden"),
                    a.next(".fr-separator").addClass("fr-hidden"))
            }
        }),
        a.FE.RegisterCommand("videoDismissError", { title: "OK", undo: !1, callback: function() { this.video.hideProgressBar(!0) } }),
        a.FE.RegisterCommand("videoSetSize", { undo: !0, focus: !1, title: "Update", refreshAfterCallback: !1, callback: function() { this.video.setSize() } })
});
/*eslint eqeqeq: "error"*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            return factory(jQuery);
        };
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
$.FE.LANGUAGE['vi'] = {
  translation: {
    // Place holder
    "Type something": "Vi\u1EBFt \u0111i\u1EC1u g\u00EC \u0111\u00F3...",

    // Basic formatting
    "Bold": "\u0110\u1EADm",
    "Italic": "Nghi\u00EAng",
    "Underline": "G\u1EA1ch ch\u00E2n",
    "Strikethrough": "G\u1EA1ch ngang ch\u1EEF",

    // Main buttons
    "Insert": "Ch\u00E8n",
    "Delete": "X\u00F3a",
    "Cancel": "H\u1EE7y",
    "OK": "OK",
    "Back": "Tr\u1EDF v\u1EC1",
    "Remove": "X\u00F3a",
    "More": "Th\u00EAm",
    "Update": "C\u1EADp nh\u1EADt",
    "Style": "Ki\u1EC3u",

    // Font
    "Font Family": "Ph\u00F4ng ch\u1EEF",
    "Font Size": "C\u1EE1 ch\u1EEF",

    // Colors
    "Colors": "M\u00E0u s\u1EAFc",
    "Background": "N\u1EC1n",
    "Text": "Ch\u1EEF",

    // Paragraphs
    "Paragraph Format": "\u0110\u1ECBnh d\u1EA1ng \u0111o\u1EA1n v\u0103n b\u1EA3n",
    "Normal": "Normal",
    "Code": "Code",
    "Heading 1": "Heading 1",
    "Heading 2": "Heading 2",
    "Heading 3": "Heading 3",
    "Heading 4": "Heading 4",

    // Style
    "Paragraph Style": "Ki\u1EC3u \u0111o\u1EA1n v\u0103n b\u1EA3n",
    "Inline Style": "Ki\u1EC3u d\u00F2ng",

    // Alignment
     "Align": "C\u0103n ch\u1EC9nh",
    "Align Left": "C\u0103n tr\u00E1i",
    "Align Center": "C\u0103n gi\u1EEFa",
    "Align Right": "C\u0103n ph\u1EA3i",
    "Align Justify": "C\u0103n \u0111\u1EC1u",
    "None": "Kh\u00F4ng",

    // Lists
    "Ordered List": "Danh s\u00E1ch theo th\u1EE9 t\u1EF1",
    "Unordered List": "Danh s\u00E1ch li\u1EC7t k\u00EA",

    // Indent
    "Decrease Indent": "Gi\u1EA3m c\u0103n l\u1EC1",
    "Increase Indent": "T\u0103ng c\u0103n l\u1EC1",

    // Links
    "Insert Link": "Ch\u00E8n link",
    "Open in new tab": "M\u1EDF trong tab m\u1EDBi",
    "Open Link": "M\u1EDF link",
    "Edit Link": "S\u1EEDa link",
    "Unlink": "B\u1ECF link",
    "Choose Link": "Ch\u1ECDn link",

    // Images
    "Insert Image": "Ch\u00E8n h\u00ECnh",
    "Upload Image": "T\u1EA3i h\u00ECnh l\u00EAn",
    "By URL": "B\u1EB1ng URL",
    "Browse": "Duy\u1EC7t file",
    "Drop image": "K\u00E9o th\u1EA3 h\u00ECnh",
    "or click": "ho\u1EB7c ch\u1ECDn",
    "Manage Images": "Qu\u1EA3n l\u00FD h\u00ECnh \u1EA3nh",
    "Loading": "\u0110ang t\u1EA3i",
    "Deleting": "\u0110ang x\u00F3a",
    "Tags": "Tags",
    "Are you sure? Image will be deleted.": "B\u1EA1n c\u00F3 ch\u1EAFc ch\u1EAFn? H\u00ECnh \u1EA3nh s\u1EBD b\u1ECB x\u00F3a.",
    "Replace": "Thay th\u1EBF",
    "Uploading": "\u0110ang t\u1EA3i l\u00EAn",
    "Loading image": "\u0110ang t\u1EA3i h\u00ECnh \u1EA3nh",
    "Display": "Hi\u1EC3n th\u1ECB",
    "Inline": "C\u00F9ng d\u00F2ng v\u1EDBi ch\u1EEF",
    "Break Text": "Kh\u00F4ng c\u00F9ng d\u00F2ng v\u1EDBi ch\u1EEF",
    "Alternate Text": "Thay th\u1EBF ch\u1EEF",
    "Change Size": "Thay \u0111\u1ED5i k\u00EDch c\u1EE1",
    "Width": "Chi\u1EC1u r\u1ED9ng",
    "Height": "Chi\u1EC1u cao",
    "Something went wrong. Please try again.": "C\u00F3 l\u1ED7i x\u1EA3y ra. Vui l\u00F2ng th\u1EED l\u1EA1i sau.",

    // Video
    "Insert Video": "Ch\u00E8n video",
    "Embedded Code": "M\u00E3 nh\u00FAng",

    // Tables
    "Insert Table": "Ch\u00E8n b\u1EA3ng",
    "Table Header": "D\u00F2ng \u0111\u1EA7u b\u1EA3ng",
    "Remove Table": "X\u00F3a b\u1EA3ng",
    "Table Style": "Ki\u1EC3u b\u1EA3ng",
    "Horizontal Align": "C\u0103n ch\u1EC9nh chi\u1EC1u ngang",
    "Row": "D\u00F2ng",
    "Insert row above": "Ch\u00E8n d\u00F2ng ph\u00EDa tr\u00EAn",
    "Insert row below": "Ch\u00E8n d\u00F2ng ph\u00EDa d\u01B0\u1EDBi",
    "Delete row": "X\u00F3a d\u00F2ng",
    "Column": "C\u1ED9t",
    "Insert column before": "Ch\u00E8n c\u1ED9t b\u00EAn tr\u00E1i",
    "Insert column after": "Ch\u00E8n c\u1ED9t b\u00EAn ph\u1EA3i",
    "Delete column": "X\u00F3a c\u1ED9t",
    "Cell": "\u00D4 b\u1EA3ng",
    "Merge cells": "G\u1ED9p \u00F4",
    "Horizontal split": "Chia d\u00F2ng",
    "Vertical split": "Chia c\u1ED9t",
    "Cell Background": "M\u00E0u n\u1EC1n",
    "Vertical Align": "C\u0103n ch\u1EC9nh chi\u1EC1u d\u1ECDc",
    "Top": "Tr\u00EAn c\u00F9ng",
    "Middle": "Gi\u1EEFa",
    "Bottom": "D\u01B0\u1EDBi \u0111\u00E1y",
    "Align Top": "C\u0103n tr\u00EAn",
    "Align Middle": "C\u0103n gi\u1EEFa",
    "Align Bottom": "C\u0103n d\u01B0\u1EDBi",
    "Cell Style": "Ki\u1EC3u \u00F4",

    // Files
    "Upload File": "T\u1EA3i file l\u00EAn",
    "Drop file": "K\u00E9o th\u1EA3 file",

    // Emoticons
    "Emoticons": "Bi\u1EC3u t\u01B0\u1EE3ng c\u1EA3m x\u00FAc",

    // Line breaker
    "Break": "Ng\u1EAFt d\u00F2ng",

    // Math
    "Subscript": "Subscript",
    "Superscript": "Superscript",

    // Full screen
    "Fullscreen": "To\u00E0n m\u00E0n h\u00ECnh",

    // Horizontal line
    "Insert Horizontal Line": "Ch\u00E8n \u0111\u01B0\u1EDDng k\u1EBB ngang v\u0103n b\u1EA3n",

    // Clear formatting
    "Clear Formatting": "X\u00F3a \u0111\u1ECBnh d\u1EA1ng",

    // Undo, redo
    "Undo": "Undo",
    "Redo": "Redo",

    // Select all
    "Select All": "Ch\u1ECDn t\u1EA5t c\u1EA3",

    // Code view
    "Code View": "Xem d\u1EA1ng code",

    // Quote
    "Quote": "Tr\u00EDch d\u1EABn",
    "Increase": "T\u0103ng",
    "Decrease": "Gi\u1EA3m",

    // Quick Insert
    "Quick Insert": "Ch\u00E8n nhanh"
  },
  direction: "ltr"
};

}));