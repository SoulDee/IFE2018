let chart = document.getElementById('chart');
let postChart = {
    barWidth: 30,
    barWidthDiff: 15,
    barColor: 'rgba(50, 50, 50, 0.6)',
    data:[120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270],
    draw: function(data) {
        let frag = document.createDocumentFragment();
        let max = getBarsMax(data);
        let pixiv = max/300;
        // 绘制轴
        makeSvg('line',{x1:0, y1:0, x2:0, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        makeSvg('line',{x1:0, y1:300, x2:600, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        // 绘制图表
        for(let i = 0; i < data.length; i++) {
            let newData = data[i]/pixiv;
            let rect = getRect(newData, i);
            makeSvg('rect', rect, frag);
        }
        chart.appendChild(frag);
    },
    changeData: function(e) {
        postChart.data = setData(e);
        chart.innerHTML = '';
        postChart.draw(postChart.data);
    }
}

/*
 * 制造一个svg元素 传入两个参数  
 * tag：元素类型 attrs：元素属性
 */
function makeSvg(tag, attrs, frag) {
    let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (let attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }
    frag.appendChild(el);
}

// 获取柱状图最大值
function getBarsMax(data) {
    return Math.max.apply(null, data); 
}

// 获取一个柱对象
function getRect(data, i) {
    let rect = {};
    rect.x = postChart.barWidthDiff + i*(postChart.barWidthDiff + postChart.barWidth);
    rect.y = 300 - data;
    rect.width = postChart.barWidth;
    rect.height = data;
    rect.fill = postChart.barColor;
    return rect;
}

postChart.draw(postChart.data);