let chart = document.getElementById('chart');
let postChart = {
    barWidth: 30,
    diff: 15,
    barColor: 'rgba(50, 50, 50, 0.6)',
    data:[120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270],
    draw: function(data) {
        let frag = document.createDocumentFragment();
        let max = Math.max.apply(null, data);
        let pixiv = max/300;
        chart.innerHTML = '';
        // 绘制轴
        makeSvg('line',{x1:0, y1:0, x2:0, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        makeSvg('line',{x1:0, y1:300, x2:600, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        // 绘制图表
        for(let i = 0; i < data.length; i++) {
            let newData = data[i]/pixiv;
            let start = postChart.diff + i*(postChart.barWidth + postChart.diff);
            let rect = getRect(newData, start, postChart.barWidth);
            makeSvg('rect', rect, frag);
        }
        chart.appendChild(frag);
    },
    changeData: function(e) {
        if (e.target.tagName === 'TD') {
            postChart.data = setData(e);
            postChart.draw(postChart.data);
        } 
    },
    drawChart: function() {
        let frag = document.createDocumentFragment();
        let data = useData();
        // 数据过滤
        data = filterData(data, choiceSelect);
        // 对象转数组
        data = data.map((item) => objToArray(item));
        // 删除前缀
        data = data.map((item) => delPrefix(item));
        // 获取比例
        let pixiv = getPixiv(data);
        // 获取柱子宽度
        let postWidth = postChart.barWidth/data.length;
        // 按月分组
        let packet = monthPacket(data);
        chart.innerHTML = '';
        // 绘制轴
        makeSvg('line',{x1:0, y1:0, x2:0, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        makeSvg('line',{x1:0, y1:300, x2:600, y2:300, stroke:'black', 'stroke-width': 3}, frag);
        // 正式绘制多表格
        for (let i = 0; i < 12; i++) {
            let newData = packet[i];
            for(let j = 0; j < newData.length; j++) {
                let aData = newData[j]/pixiv;
                let start = (postChart.diff + i*(postChart.barWidth + postChart.diff)) + j*postWidth;
                let rect = getRect(aData, start, postWidth, colorList[j]);
                makeSvg('rect', rect, frag);
            }
        }
        chart.appendChild(frag);
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
// 获取一个柱对象
function getRect(data, start, width, color = postChart.barColor) {
    let rect = {};
    rect.x = start;
    rect.y = 300 - data;
    rect.width = width;
    rect.height = data;
    rect.fill = color;
    return rect;
}