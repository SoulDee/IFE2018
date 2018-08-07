let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let lineChart = {
    data: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270],
    chartHeight: 300,
    diff: 45,
    PointData: {
        r: 3,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    draw: function(data) {
        let max = Math.max.apply(null, data);
        let pixiv = max/lineChart.chartHeight;
        drawXY(ctx);
        drawLine(data, pixiv, 'black');
    },
    changeData: function(e) {
        if (e.target.tagName === 'TD') {
            lineChart.data = setData(e);
            ctx.clearRect(0, 0, 600, 300);
            lineChart.draw(lineChart.data);
        }
    }
}
// 绘制xy轴
function drawXY(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 300);
    ctx.lineTo(600, 300);
    ctx.stroke();
}
// 获取点坐标
function getPointXY(data, i, diff, pixiv) {
    return {
        x: i*diff,
        y: 300-data/pixiv
    }
}
// 绘制数据点
function drawPoint(point, data, ctx, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(point.x, point.y, data.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
// 绘制折线
function drawLine(data, pixiv, color) {
    let fontPoint = {};
        for (let i = 0; i < data.length; i++) {
            let point = getPointXY(data[i], i, lineChart.diff, pixiv);
            drawPoint(point, lineChart.PointData, ctx, color);
            
            if (i !== 0) {
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(fontPoint.x, fontPoint.y);
                ctx.stroke();
                ctx.closePath();
            }
    
            fontPoint.x = point.x;
            fontPoint.y = point.y;
        } 
}

// 绘制多个折线
function drawChart() {
    let data = filterChartData(getData(choiceSelect));
    let pixiv = getPixiv(data);
    ctx.clearRect(0, 0, 600, 300);
    drawXY(ctx);
    for (let i = 0; i < data.length; i++) {
        drawLine(data[i], pixiv, colorList[i]);
    }
}