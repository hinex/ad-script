module.exports = (url, id, x, y) => (`(function() {
	var t = document.currentScript;
    var r = "${url}/iframe.html?id=${id}";
    var e=document.createElement("iframe");
    
    var plugins=[];
    for(var i=0;i<navigator.plugins.length;i++)
    {
      plugins.push(navigator.plugins[i].name); 
    }
    
    e.setAttribute("src",r);
    e.setAttribute("style","${x ? `width:${x}px;` : ''}${y ? `height:${y}px;` : ''}border:none;");
    e.setAttribute("scrolling","no");
    
    e.onload = function (){
      e.contentWindow.postMessage(JSON.stringify({
        location: window.location.href,
        ref: document.referrer,
        plugins: plugins,
      }), '*')
    };
    
    if(t.parentNode.tagName=="HEAD"){
        if(document.body!=null)document.body.appendChild(e);
        else window.addEventListener("DOMContentLoaded",function(){
            document.body.appendChild(e);
        });
    }
    else t.parentNode.insertBefore(e,t);
})();`)
