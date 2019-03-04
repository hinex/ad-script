const UUID = require('uuid/v4')

module.exports = (url, id) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        * { padding:0; margin: 0; }
        body { background: #cc7400 }
        img { width: 100%; height: 100%; object-fit: cover; object-position: center }
        #click { cursor: pointer }
    </style>
</head>
<body>
    <span id="click">
        <img src="${url}/file/${id}.jpg" alt="">
    </span>

    <script type="application/javascript">
        var d = new Date();
        
        function checkCookie(){
            var cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled){ 
                document.cookie = "testcookie";
                cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
            }
            return cookieEnabled ? 'true' : 'false';
        }


        var data = [
            'id=${id}',
            'click_id=${UUID()}',  
            'tz=' + Intl.DateTimeFormat().resolvedOptions().timeZone,
            'tz_offset=' + d.getTimezoneOffset(),
            'cookies=' + checkCookie(),
        ]
    
        window.addEventListener('message', function(dataPassed) {
            const parsed = JSON.parse(dataPassed.data)
            data.push('location=' + parsed.location)
            
            if (parsed.ref) {
                data.push('location=' + parsed.ref)
            }
            
            if (parsed.plugins) {
                data.push('plugins=' + parsed.plugins.join(','))
            }
        })
        
        var click = document.getElementById('click');
        
        click.onclick = function(event) {
          event.stopPropagation();
          event.preventDefault();
          
          console.log(data)
        }  
    </script>
</body>
</html>`)
