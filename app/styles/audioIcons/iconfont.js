(function(window){var svgSprite='<svg><symbol id="icon-drag" viewBox="0 0 1024 1024"><path d="M889.6 465.856l-149.248-139.968C736.064 321.856 731.072 320 725.376 320c-5.824 0-10.816 1.856-14.976 5.952C706.048 329.856 704 334.528 704 339.968L704 448 512 448 512 256l108.032 0c5.376 0 10.048-2.048 14.08-6.4C637.952 245.44 640 240.448 640 234.624c0-5.696-2.048-10.688-5.952-14.976L494.08 70.4C490.048 66.112 485.376 64 480 64 474.56 64 469.888 66.112 465.856 70.4L325.952 219.648C321.856 223.936 320 228.928 320 234.624 320 240.448 321.856 245.44 325.952 249.6 329.856 253.952 334.528 256 339.968 256L448 256l0 192L256 448 256 339.968c0-5.504-2.048-10.112-6.4-14.08C245.44 321.856 240.448 320 234.624 320 228.928 320 223.936 321.856 219.648 325.952L70.4 465.856C66.112 469.888 64 474.56 64 480c0 5.376 2.112 10.048 6.4 14.08l149.248 140.032C223.936 637.952 228.928 640 234.624 640 240.448 640 245.44 637.952 249.6 634.048 253.952 630.08 256 625.344 256 620.032L256 512l192 0 0 192L339.968 704c-5.504 0-10.112 2.048-14.08 6.4C321.856 714.56 320 719.552 320 725.376c0 5.696 1.856 10.688 5.952 14.976L465.856 889.6C469.888 893.888 474.56 896 480 896c5.376 0 10.048-2.112 14.08-6.4l140.032-149.248C637.952 736.064 640 731.072 640 725.376c0-5.824-2.048-10.816-5.952-14.976C630.08 706.048 625.344 704 620.032 704L512 704 512 512l192 0 0 108.032c0 5.376 2.048 10.048 6.4 14.08C714.56 637.952 719.552 640 725.376 640c5.696 0 10.688-2.048 14.976-5.952L889.6 494.08C893.888 490.048 896 485.376 896 480 896 474.56 893.888 469.888 889.6 465.856z"  ></path></symbol><symbol id="icon-pause" viewBox="0 0 1024 1024"><path d="M816 816m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"  ></path><path d="M512 968a456 456 0 1 1 395.76-229.36 32 32 0 0 1-55.52-32 392 392 0 1 0-145.44 145.44 32 32 0 0 1 32 55.52A456 456 0 0 1 512 968z"  ></path><path d="M416 656a32 32 0 0 1-32-32V400a32 32 0 0 1 64 0v224a32 32 0 0 1-32 32zM608 656a32 32 0 0 1-32-32V400a32 32 0 0 1 64 0v224a32 32 0 0 1-32 32z"  ></path></symbol><symbol id="icon-play" viewBox="0 0 1024 1024"><path d="M816 816m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"  ></path><path d="M512 968a456 456 0 1 1 395.76-229.36 32 32 0 0 1-55.52-32 392 392 0 1 0-145.44 145.44 32 32 0 1 1 32 55.52A456 456 0 0 1 512 968z"  ></path><path d="M424 697.2a48 48 0 0 1-48-48V381.28a48 48 0 0 1 72-41.6l232 134a48 48 0 0 1 0 83.12L448 690.72a48 48 0 0 1-24 6.48z m16-288v212.24l184-106.16z m-24-14z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)