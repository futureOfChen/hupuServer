//修改自https://github.com/wilq32/jqueryrotate
!function($){for(var supportedCSS,supportedCSSOrigin,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "),a=0;a<toCheck.length;a++)void 0!==styles[toCheck[a]]&&(supportedCSS=toCheck[a]);supportedCSS&&(supportedCSSOrigin=supportedCSS.replace(/[tT]ransform/,"TransformOrigin"),"T"==supportedCSSOrigin[0]&&(supportedCSSOrigin[0]="t")),eval('IE = "v"=="\v"'),$.extend($.fn,{rotate:function(t){if(0!==this.length&&"undefined"!=typeof t){"number"==typeof t&&(t={angle:t});for(var i=[],e=0,s=this.length;e<s;e++){var a=this.get(e);if(a.Wilq32&&a.Wilq32.PhotoEffect)a.Wilq32.PhotoEffect._handleRotation(t);else{var h=$.extend(!0,{},t),r=new Wilq32.PhotoEffect(a,h)._rootObj;i.push($(r))}}return i}},getRotateAngle:function(){for(var t=[0],i=0,e=this.length;i<e;i++){var s=this.get(i);s.Wilq32&&s.Wilq32.PhotoEffect&&(t[i]=s.Wilq32.PhotoEffect._angle)}return t},stopRotate:function(){for(var t=0,i=this.length;t<i;t++){var e=this.get(t);e.Wilq32&&e.Wilq32.PhotoEffect&&clearTimeout(e.Wilq32.PhotoEffect._timer)}}}),Wilq32=window.Wilq32||{},Wilq32.PhotoEffect=function(){return supportedCSS?function(t,i){t.Wilq32={PhotoEffect:this},this._img=this._rootObj=this._eventObj=t,this._handleRotation(i)}:function(t,i){if(this._img=t,this._onLoadDelegate=[i],this._rootObj=document.createElement("span"),this._rootObj.style.display="inline-block",this._rootObj.Wilq32={PhotoEffect:this},t.parentNode.insertBefore(this._rootObj,t),t.complete)this._Loader();else{var e=this;$(this._img).bind("load",function(){e._Loader()})}}}(),Wilq32.PhotoEffect.prototype={_setupParameters:function(t){this._parameters=this._parameters||{},"number"!=typeof this._angle&&(this._angle=0),"number"==typeof t.angle&&(this._angle=t.angle),this._parameters.animateTo="number"==typeof t.animateTo?t.animateTo:this._angle,this._parameters.step=t.step||this._parameters.step||null,this._parameters.easing=t.easing||this._parameters.easing||this._defaultEasing,this._parameters.duration="duration"in t?t.duration:t.duration||this._parameters.duration||1e3,this._parameters.callback=t.callback||this._parameters.callback||this._emptyFunction,this._parameters.center=t.center||this._parameters.center||["50%","50%"],"string"==typeof this._parameters.center[0]?this._rotationCenterX=parseInt(this._parameters.center[0],10)/100*this._imgWidth*this._aspectW:this._rotationCenterX=this._parameters.center[0],"string"==typeof this._parameters.center[1]?this._rotationCenterY=parseInt(this._parameters.center[1],10)/100*this._imgHeight*this._aspectH:this._rotationCenterY=this._parameters.center[1],t.bind&&t.bind!=this._parameters.bind&&this._BindEvents(t.bind)},_emptyFunction:function(){},_defaultEasing:function(t,i,e,s,a){return-s*((i=i/a-1)*i*i*i-1)+e},_handleRotation:function(t,i){return supportedCSS||this._img.complete||i?(this._setupParameters(t),void(this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart())):void this._onLoadDelegate.push(t)},_BindEvents:function(t){if(t&&this._eventObj){if(this._parameters.bind){var i=this._parameters.bind;for(var e in i)i.hasOwnProperty(e)&&$(this._eventObj).unbind(e,i[e])}this._parameters.bind=t;for(var e in t)t.hasOwnProperty(e)&&$(this._eventObj).bind(e,t[e])}},_Loader:function(){return IE?function(){var t=this._img.width,i=this._img.height;this._imgWidth=t,this._imgHeight=i,this._img.parentNode.removeChild(this._img),this._vimage=this.createVMLNode("image"),this._vimage.src=this._img.src,this._vimage.style.height=i+"px",this._vimage.style.width=t+"px",this._vimage.style.position="absolute",this._vimage.style.top="0px",this._vimage.style.left="0px",this._aspectW=this._aspectH=1,this._container=this.createVMLNode("group"),this._container.style.width=t,this._container.style.height=i,this._container.style.position="absolute",this._container.style.top="0px",this._container.style.left="0px",this._container.setAttribute("coordsize",t-1+","+(i-1)),this._container.appendChild(this._vimage),this._rootObj.appendChild(this._container),this._rootObj.style.position="relative",this._rootObj.style.width=t+"px",this._rootObj.style.height=i+"px",this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._eventObj=this._rootObj;for(var e;e=this._onLoadDelegate.shift();)this._handleRotation(e,!0)}:function(){this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._imgWidth=this._img.naturalWidth,this._imgHeight=this._img.naturalHeight;var t=Math.sqrt(this._imgHeight*this._imgHeight+this._imgWidth*this._imgWidth);this._width=3*t,this._height=3*t,this._aspectW=this._img.offsetWidth/this._img.naturalWidth,this._aspectH=this._img.offsetHeight/this._img.naturalHeight,this._img.parentNode.removeChild(this._img),this._canvas=document.createElement("canvas"),this._canvas.setAttribute("width",this._width),this._canvas.style.position="relative",this._canvas.style.left=-this._img.height*this._aspectW+"px",this._canvas.style.top=-this._img.width*this._aspectH+"px",this._canvas.Wilq32=this._rootObj.Wilq32,this._rootObj.appendChild(this._canvas),this._rootObj.style.width=this._img.width*this._aspectW+"px",this._rootObj.style.height=this._img.height*this._aspectH+"px",this._eventObj=this._canvas,this._cnv=this._canvas.getContext("2d");for(var i;i=this._onLoadDelegate.shift();)this._handleRotation(i,!0)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer),this._animateStartTime=+new Date,this._animateStartAngle=this._angle,this._animate()},_animate:function(){var t=+new Date,i=t-this._animateStartTime>this._parameters.duration;if(i&&!this._parameters.animatedGif)clearTimeout(this._timer);else{if(this._canvas||this._vimage||this._img){var e=this._parameters.easing(0,t-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration);this._rotate(~~(10*e)/10)}this._parameters.step&&this._parameters.step(this._angle);var s=this;this._timer=setTimeout(function(){s._animate.call(s)},10)}this._parameters.callback&&i&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var t=Math.PI/180;return IE?function(t){this._angle=t,this._container.style.rotation=t%360+"deg",this._vimage.style.top=-(this._rotationCenterY-this._imgHeight/2)+"px",this._vimage.style.left=-(this._rotationCenterX-this._imgWidth/2)+"px",this._container.style.top=this._rotationCenterY-this._imgHeight/2+"px",this._container.style.left=this._rotationCenterX-this._imgWidth/2+"px"}:supportedCSS?function(t){this._angle=t,this._img.style[supportedCSS]="rotate("+t%360+"deg)",this._img.style[supportedCSSOrigin]=this._parameters.center.join(" ")}:function(i){this._angle=i,i=i%360*t,this._canvas.width=this._width,this._canvas.height=this._height,this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH),this._cnv.translate(this._rotationCenterX,this._rotationCenterY),this._cnv.rotate(i),this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY),this._cnv.scale(this._aspectW,this._aspectH),this._cnv.drawImage(this._img,0,0)}}()},IE&&(Wilq32.PhotoEffect.prototype.createVMLNode=function(){document.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{return!document.namespaces.rvml&&document.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),function(t){return document.createElement("<rvml:"+t+' class="rvml">')}}catch(t){return function(t){return document.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}}())}(Zepto);