module.exports = (url, id, x, y) => (`(function() {
	var t = document.currentScript;
    var r = "${url}/iframe.html?id=${id}&x=${x}&y=${y}";
    var e=document.createElement("iframe");
    e.setAttribute("src",r);
    e.setAttribute("style","${x ? `width:${x}px;` : ''}${y ? `width:${y}px;` : ''}border:none;");
    e.setAttribute("scrolling","no");
    if(t.parentNode.tagName=="HEAD"){
        if(document.body!=null)document.body.appendChild(e);
        else window.addEventListener("DOMContentLoaded",function(){
            document.body.appendChild(e);
        });
    }
    
    else t.parentNode.insertBefore(e,t);
})();`)
