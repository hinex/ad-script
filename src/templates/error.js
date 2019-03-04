const UUID = require('uuid/v4')

module.exports = () => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        * { padding:0; margin: 0; }
        body { 
            background: #654ea3;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);
            background: linear-gradient(to right, #eaafc8, #654ea3);
         }
        #text {
            font-family: sans-serif;
            display: block;
            padding: 20px;
            text-align: center;
            color: #fff
        }
    </style>
</head>
<body>
    <span id="text">
        Error with banner configuration
    </span>
</body>
</html>`)
