const UUID = require('uuid/v4')

module.exports = (url, id, project, x, y) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="application/javascript" src="${url}/file/client.js"></script>
    <style>
        * { padding:0; margin: 0; }
        body { background: #cc7400; width: ${x}px; height: ${y}px }
        img { user-select: none; -webkit-user-drag: none; user-drag: none; width: 100%; height: 100%; object-fit: cover; object-position: center }
        #click { cursor: pointer }
    </style>
</head>
<body>
    <span id="click">
        <img src="${url}/file/${id}.jpg" alt="">
    </span>

    <script type="application/javascript">
        var d = new Date();

        var data = [
            'id=${id}',
            'click_id=${UUID()}',  
            'tz=' + Intl.DateTimeFormat().resolvedOptions().timeZone,
            'tz_offset=' + d.getTimezoneOffset(),
            'cookies=' + checkCookie(),
        ]
    
        window.addEventListener('message', function(dataPassed) {
            const parsed = JSON.parse(dataPassed.data)
            data.push('location=' + encodeURIComponent(parsed.location))
            
            if (parsed.ref) {
                data.push('ref=' + encodeURIComponent(parsed.ref))
            }
            
            if (parsed.plugins) {
                data.push('plugins=' + encodeURIComponent(parsed.plugins.join(',')))
            }
        })
        
        var click = document.getElementById('click');
        
        click.onclick = function(event) {
            event.stopPropagation();
            event.preventDefault();

            data.push('hash=' + webgl())
          
            const Http = new XMLHttpRequest();
            const url='${url}/click?'+data.join('&');
            Http.open("GET", url);
            Http.send();
            Http.onreadystatechange=(e)=>{
               window.open("${project.link}", "_blank");
            }
        }  
    </script>
</body>
</html>`)
