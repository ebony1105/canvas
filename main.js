/*document.body.ontouchstart = function (eee) {
    eee.preventDefault()
}
*/
var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(canvas)

listenToUser(canvas)


var eraserEnabled = false;
pen.onclick=function()
{
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
}
eraser.onclick=function () {
    eraserEnabled = true
    eraser.classList.add('active');
    pen.classList.remove('active');
}

red.onclick=function () {
    context.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    yellow.classList.remove('active');
}

green.onclick = function () {
    context.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
}

yellow.onclick = function () {
    context.strokeStyle = 'yellow';
    yellow.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
}

thin.onclick=function () {
    lineWidth = 3
}

thick.onclick = function () {
    lineWidth = 15
}

clear.onclick=function () {
    context.clearRect(0,0,canvas.width,canvas.height);
}

save.onclick = function () {
    var url = canvas.toDataURL("image/png");
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href= url
    a.download = 'my_canvas'
    a.target = '_blank'
    a.click()
}
/*
eraser.onclick = function() {
    eraserEnabled =true;
    actions.className = 'actions x'

};
brush.onclick = function(){
    eraserEnabled = false;
    actions.className = 'actions';
};
*/


/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function() {
        setCanvasSize()
    };

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if (document.documentElement.ontouchstart !== undefined) {
        canvas.ontouchstart = function (aaa) {
            console.log('start');
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;

            console.log(x, y);

            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                };
            }
        };

        canvas.ontouchmove = function (aaa) {
            console.log('move');
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;

            console.log(x, y);

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint
            }
        };

        canvas.ontouchend = function (aaa) {
            using = false
        };
    } else {
        //pc device
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function (aaa) {
            using = false
        }

    }
}