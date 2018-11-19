(function(window){var svgSprite='<svg><symbol id="icon-tiaoshi" viewBox="0 0 1024 1024"><path d="M544 388.512V96a32 32 0 0 0-64 0v292.512c-55.104 14.272-96 63.904-96 123.488s40.896 109.216 96 123.488v291.616c0 18.176 14.336 32.896 32 32.896s32-14.72 32-32.928v-291.616c55.104-14.272 96-63.904 96-123.488s-40.896-109.184-96-123.456zM223.136 708.256C223.328 706.816 224 705.504 224 704V96a32 32 0 0 0-64 0v608c0 1.504 0.672 2.816 0.864 4.256A127.744 127.744 0 0 0 64 832a128 128 0 0 0 256 0 127.744 127.744 0 0 0-96.864-123.744zM192 896a64 64 0 1 1 0.032-128.032A64 64 0 0 1 192 896zM960 192a128 128 0 0 0-256 0 127.744 127.744 0 0 0 96.864 123.744c-0.192 1.44-0.864 2.752-0.864 4.256v608a32 32 0 0 0 64 0V320c0-1.504-0.672-2.816-0.864-4.256A127.744 127.744 0 0 0 960 192z m-128 64a64 64 0 1 1 0.032-128.032A64 64 0 0 1 832 256z"  ></path></symbol><symbol id="icon-changjingguanli" viewBox="0 0 1024 1024"><path d="M592 336h-416c-52.928 0-96 43.072-96 96v416c0 52.928 43.072 96 96 96h416c52.928 0 96-43.072 96-96v-416c0-52.928-43.072-96-96-96z m32 512a32 32 0 0 1-32 32h-416c-17.632 0-32-14.336-32-32v-416c0-17.632 14.368-32 32-32h416c17.664 0 32 14.368 32 32v416z"  ></path><path d="M720 208h-416a32 32 0 0 0 0 64h416c17.664 0 32 14.368 32 32v416a32 32 0 1 0 64 0v-416c0-52.928-43.072-96-96-96zM528 752h-288a32 32 0 1 0 0 64h288a32 32 0 1 0 0-64z"  ></path><path d="M848 80h-416a32 32 0 0 0 0 64h416c17.664 0 32 14.368 32 32v416a32 32 0 1 0 64 0v-416c0-52.928-43.072-96-96-96z"  ></path></symbol><symbol id="icon-fenxiangfangshi" viewBox="0 0 1024 1024"><path d="M800 704c-39.584 0-74.528 18.368-98.016 46.592l-273.472-154.72A191.04 191.04 0 0 0 448 512c0-28.928-6.592-56.256-18.048-80.864l204.64-131.84A127.04 127.04 0 0 0 704 320a128 128 0 1 0-128-128c0 21.504 5.792 41.44 15.168 59.232l-197.408 127.168A191.36 191.36 0 0 0 256 320a192 192 0 1 0 135.2 328.288l283.168 160.192A129.376 129.376 0 0 0 672 832a128 128 0 1 0 128-128zM704 128a64 64 0 1 1-0.032 128.032A64 64 0 0 1 704 128z m96 768a64 64 0 1 1 0.032-128.032A64 64 0 0 1 800 896z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)