var d = new Date('2008-01-01');

document.addEventListener('DOMContentLoaded', function () {
    var drawInterval = setInterval(myTimer, 20);
}, false);
var date = new Date();
var stillGoingStrong = normalizeDate(date);

document.getElementById("myDate").value = normalizeDate(date);

drawDate();

function myTimer() {
    drawBubble();
    drawDate();
    if (normalizeDate(d) < document.getElementById("myDate").value) {
        d.setDate(d.getDate() + 1);
    }
    if (normalizeDate(d) > document.getElementById("myDate").value) {
        d.setDate(d.getDate() - 1);
    }

}

function drawBubble() {
    for (var i in data) {
        var bubbleElement = document.getElementById('bubble' + i);

        // Add ball
        if (normalizeDate(d) >= data[i].start && normalizeDate(d) <= data[i].end) {
            var size = data[i].content.length * 10 + 'px';
            if (!bubbleElement) {
                var newElement = document.createElement('div');
                newElement.id = 'bubble' + i;
                newElement.className = "bubble";
                newElement.innerHTML = data[i].content;
                newElement.style.left = Math.floor(Math.random() * 85) + 0 + '%';
                newElement.style.top = Math.floor(Math.random() * 80) + 10 + '%';
                newElement.style.width = size;
                newElement.style.height = size;
                newElement.style.opacity = "0.8";
                newElement.style.lineHeight = size;
                newElement.style.backgroundColor = getRandomColor();
                document.getElementById("bubbleWrap").appendChild(newElement);
                setScaleOne(newElement);
                dragElement(newElement);
            } else {
                bubbleElement.style.opacity = "0.8";
                bubbleElement.style.display = "block";
            }
        }

        // Remove ball
        if (normalizeDate(d) < data[i].start && bubbleElement || normalizeDate(d) > data[i].end && bubbleElement) {
            if (bubbleElement.style.opacity == "0.8") {
                bubbleElement.style.opacity = "0";
                setDisplayNone(bubbleElement);
            }
        }
    }
}

function drawDate() {
    document.getElementById("time").innerHTML = d.toLocaleDateString("sv-SE", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setDisplayNone(bubbleElement) {
    setTimeout(function () {
        bubbleElement.style.display = "none";
    }, 3000);
}

function setScaleOne(newElement) {
    setTimeout(function () {
        newElement.style.transform = "scale(1)";
    }, 1000);
}

function normalizeDate(date) {

    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;

}


//https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}