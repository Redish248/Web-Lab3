var form = document.querySelector('.form');
var x_form = document.getElementById("form:X");
var y_form = document.getElementById("form:Y");
var r_form = document.getElementById("form:R");

var generateError = function (text) {
    var error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = text;
    return error;
};

function validateY(input) {
    var str2 = parseFloat(input);
    str2 = str2.toString();
    var error = document.getElementById("error");
    if (input!==str2){
        error.innerHTML = "Некорректное значение Y!";
        return false;
    } else {
        return true;
    }
}

function removeError() {
    var error = document.getElementById("error");
    error.innerHTML = "";
};

function validate(x,y1,r) {
    var check_Y = true;
    var point = false;
    var y = y1;
    if (y.indexOf(",") !== -1) {
        y = y.replace(",",".");
        point = true;
    }
    if (!y || y <= -5 || y >= 3 || isNaN(y) || y.charAt(0).localeCompare(".") === 0) {
        var error = generateError('Некорректно задано значение Y. Y ∈ (-5;3). Y должно быть числом.');
        document.getElementById("rowY").insertBefore(error, null);
        check_Y = false;
    }
    if (check_Y) {
        drawCanvas('canvas', r);
        drawPoint( x, y, r);
        /*
        if (point) {
            y_form.value = y_form.value.replace(".",",");
        }
        ??????????????????????????????????????????????????????????
        */
        form.submit();
        return true;
    } else return false;
}

function drawAllPoints(r) {
    var x,y;
    var counter=0;
    var table = document.getElementById('beanTable');
    drawCanvas('canvas',r);
    if (!(table===null)) {
        table.querySelectorAll('td').forEach(function (e) {
            switch (counter) {
                case 0:
                    x = e.innerHTML;
                    break;
                case 1:
                    y = e.innerHTML;
                    break;
                case 2:
                    break;
                case 3:
                    drawPoint(x, y, r);
                    counter -= 4;
                    break;
            }
            counter++;
        });
    }
}

//------------canvas-------------

function drawCanvas(id, r){
    var canvas = document.getElementById(id),
        context = canvas.getContext("2d");
//очистка
    context.clearRect(0, 0, canvas.width, canvas.height);
//треугольник
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(150, 85);
    context.lineTo(280,150);
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//прямоугольник
    context.beginPath();
    context.rect(20, 150, 130, 130);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//сектор
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 65, Math.PI, Math.PI*3/2, false);
    context.closePath();
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    context.fill();
    context.stroke();

//отрисовка осей
    context.beginPath();
    context.font = "12px Verdana";
    context.moveTo(150, 0); context.lineTo(150, 300);
    context.moveTo(150, 0); context.lineTo(145, 12);
    context.moveTo(150, 0); context.lineTo(155, 12);
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

    context.beginPath();
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(288, 145);
    context.moveTo(300, 150);
    context.lineTo(288, 155);
    context.fillText("X", 290, 135);
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();

//деления X
    context.beginPath();
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.moveTo(145, 85);
    context.lineTo(155, 85);
    context.moveTo(145, 215);
    context.lineTo(155, 215);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    if (r === 0){
        context.fillText("R", 160, 25);
        context.fillText("R/2", 160, 90);
        context.fillText("-R/2", 160, 220);
        context.fillText("-R", 160, 285);
    } else {
        context.fillText(r, 160, 25);
        context.fillText((r / 2), 160, 90);
        context.fillText(-(r / 2), 160, 220);
        context.fillText(-r, 160, 285);
    }

//деления Y
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.moveTo(85, 145);
    context.lineTo(85, 155);
    context.moveTo(215, 145);
    context.lineTo(215, 155);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    if (r===0){
        context.fillText("-R", 12, 140);
        context.fillText("-R/2", 70, 140);
        context.fillText("R/2", 205, 140);
        context.fillText("R", 275, 140);
    } else {
        context.fillText(-r, 12, 140);
        context.fillText(-(r / 2), 70, 140);
        context.fillText((r / 2), 205, 140);
        context.fillText(r, 275, 140);
    }

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

//оно используется?
function createCanvas(id, x, y, r){
    drawCanvas(id, r);
    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130))-2, 4, 4);
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.fill();
    context.stroke();
}

function clickCanvas(r){
    var canvas = document.getElementById('canvas');
    var br = canvas.getBoundingClientRect();
    var left = br.left;
    var top = br.top;
    var event = window.event;
    var x = event.clientX-left;
    var y = event.clientY-top;
    var size = canvas.height;
    if (r>0) {
        x = Math.round((x - size / 2) * r * 10 / 2 / 65) / 10;
        y = Math.round((-y + size / 2) * r * 10 / 2 / 65) / 10;
        drawCanvas('canvas', r);
        x_form.value = x;
        y_form.value = y;
        r_form.value = r;
        drawPoint(x, y, r);
        //document.getElementById('form:submit').click();
    }
}

function drawPoint(x,y,r){
    var color;
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext("2d");
    if (isArea(x,y,r)) {
        color = 'green';
    } else {
        color = 'red';
    }
    ctx.beginPath();
    ctx.arc(150+x*130/r,150-y*130/r,2,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function isArea(x, y, r) {
    if (
        ((x >= 0) && (y >= 0) && (y <= (r-x)/2)) ||
        ((x <= 0) && (y >= 0) && ((x * x + y * y) <= (r * r / 4))) ||
        ((x <= 0) && (y <= 0) && (x >= -2) && (y >= -2))
    ) {
        return true;
    }
    return false;

}