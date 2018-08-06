// 当前选中选项
let choiceSelect = [['手机', '笔记本', '智能音箱'], ['华东', '华南', '华北']];

let regions = document.getElementById('region-select'), // 地区选项列表
    tableWrapper = document.querySelector('.table-wrapper'), // 表格容器
    thead = tableWrapper.querySelector('thead'), // 表头
    tbody = tableWrapper.querySelector('tbody'), // 表格
    products = document.getElementById('product-select'), // 产品选项列表
    allChoiceRegion = document.getElementById('allChoiceRegion'), // 地区全选
    allChoiceProduct = document.getElementById('allChoiceProduct'); // 产品全选

// 是否全选按钮
function ChoiceLogic(e) {
    if(e.target.value === '全选') {
        allChoiceLogic(e);
    } else{
        choiceLogic(e);
    }
}
// 全选判断
function allChoiceLogic(e) {
    switch(e.target.id) {
        case 'allChoiceRegion': allChoice(1, allChoiceRegion, regions);break;
        case 'allChoiceProduct': allChoice(0, allChoiceProduct, products);break;
        default:break;
    } 
}

// 全选逻辑
function allChoice(index, target, box) {
    getChoiceSelect();
    if(choiceSelect[index].length === 3) {
        target.checked = true;
    } else {
        let elements = box.querySelector('.select-box').querySelectorAll('input');
        for (let i = 0; i < elements.length; i++) {
            elements[i].checked = true;
            choiceSelect[index].push(elements[i].value);
        }
    };
}
// 单选逻辑
function choiceLogic(e) {
    getChoiceSelect();
    let name = `${e.target.name}-select`;
    let index,
        all;
    switch(name) {
        case 'region-select':
            index = 1;
            all = allChoiceRegion;
            break;
        case 'product-select': 
            index = 0;
            all = allChoiceProduct;
            break;
        default:break;
    }
    if(choiceSelect[index].length === 0) {
        e.target.checked = true;
    } else if(choiceSelect[index].length === 3) {
        all.checked = true;
    } else {
        all.checked = false;
    }
}
// 遍历选项，将选中的选项压入choiceSelect
function getChoiceSelect() {
    listChange(products, 0);
    listChange(regions, 1);
}

// 遍历查找是否选中 参数为需要遍历的数组，存放到哪里的下标
function listChange(el, index) {
    choiceSelect[index] = [];
    let element = el.querySelector('.select-box').querySelectorAll('input');
    for (let i = 0; i < element.length; i++) {
        if(element[i].checked) {
            choiceSelect[index].push(element[i].value);
        }
    }
}

// 改变数据
function setData(e) {
    let arr = postChart.data || lineChart.data;
    let tdList = e.target.parentNode.childNodes;
    for (let i = 1; i < tdList.length; i++) {
        arr[i-1] = (parseInt(tdList[i].querySelector('span').innerText));
    };
    // 是否为首行
    if(arr.length === 13) arr.shift();
    return arr;
}

// 过滤绘制图表需要数据
function filterChartData(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        let newData = data[i].filter((item) => typeof item === 'number');
        arr.push(newData);
    }
    return arr;
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

// 获取比例
function getPixiv(data) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
        let num = Math.max.apply(null, data[i]);
        if (num > max) {
            max = num;
        }
    }
    return max/lineChart.chartHeight;
}

// 修改的数据并保存到localStorage
function savaLocalStorage(data) {
    localStorage.data = JSON.stringify(data);
}

// 更新本地数据
function updataLocal(td, val) {
    let data = localStorage.data ? JSON.parse(localStorage.data): sourceData;
    let trIndex = td.parentNode.getAttribute('tr-index');
    let tdIndex = td.getAttribute('td-index')-2;
    let product = td.parentNode.childNodes[0].childNodes[0].innerText;
    let region = td.parentNode.childNodes[1].childNodes[0].innerText;
    // 是否为没有colspan的行
    if (td.parentNode.childNodes.length <= 13) {
        tdIndex += 1;
        product = tbody.childNodes[Math.floor(trIndex/choiceSelect.length)].childNodes[0].childNodes[0].innerText;
        region = td.parentNode.childNodes[0].childNodes[0].innerText;
    }
    // 产品和地区是否交换
    if (choiceSelect[0].length > choiceSelect[1].length && choiceSelect[1].length === 1) {
        [product, region] = [region, product];
    }
    // 遍历localStrage是否有符合条件的对象，更新他
    for (let i = 0; i < data.length; i++) {
        if (data[i].product === product && data[i].region === region) {
            data[i].sale[tdIndex] = Number(val);
        }
    }
    // 更新本地存储
    savaLocalStorage(data);
}

// tbody绑定点击事件
tableWrapper.addEventListener('click', function(e) {
    let NClass = e.target.classList;
    let td = e.target.parentNode;
    let span = td.querySelector('span'),
        editor = td.querySelector('.editor'),
        input = td.querySelector('input'),
        save = td.querySelector('.save'),
        close = td.querySelector('.close');
    // 点击编辑
    if (NClass.contains('editor')) {
        if (document.querySelector('.active')) {
            closeUpdata();
        }
        td.classList.add('active');
        span.classList.add('disappear');
        editor.style.display = 'none';
        input.classList.remove('disappear');
        save.classList.remove('disappear');
        close.classList.remove('disappear');
    }
    // 点击保存
    if (NClass.contains('save')) {
        saveUpdate();
    }
    // 点击取消
    if (NClass.contains('close')) {
        closeUpdata();
    }
}
, false);

// 保存数据到本地存储
function saveUpdate() {
    let td = tbody.querySelector('.active');
    let tr = td.parentNode;
    let val = td.querySelector('input').value;
    if (!isNaN(Number(val))) {
        updataLocal(td, val);
        td.querySelector('.numberData').innerText = Number(val);
        td.querySelector('span').classList.remove('disappear');
        td.querySelector('.editor').style = '';
        td.querySelector('input').classList.add('disappear');
        td.querySelector('.save').classList.add('disappear');
        td.querySelector('.close').classList.add('disappear');
        td.classList.remove('active');
        drawChart();
        postChart.draw(getTrData(tr));
    } else {
        alert('请输入数字');
    }
}

// 获取单个tr数据
function getTrData(tr) {
    let list = tr.childNodes;
    let arr = [];
    for (let i = 1; i < list.length; i++) {
        arr.push( ( parseInt( list[i].querySelector('span').innerText ) ) );
    };
    // 是否为首行
    if(arr.length === 13) arr.shift();
    return arr;
}

// 取消的方法
function closeUpdata() {
    let td = tbody.querySelector('.active');
    td.querySelector('span').classList.remove('disappear');
    td.querySelector('.editor').style = '';
    td.querySelector('input').classList.add('disappear');
    td.querySelector('.save').classList.add('disappear');
    td.querySelector('.close').classList.add('disappear');
    td.classList.remove('active');
}

// 按键事件
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;
    // 按下Esc
    if (keyCode === 27) {
        e.preventDefault();
        closeUpdata();
    } else if (keyCode === 13) {
    // 按下回车键
        e.preventDefault();
        saveUpdate();
    }
});

// 在编辑状态下的点击事件
document.addEventListener('click',(e) => {
    if (document.querySelector('.active')) {
        let active = document.querySelector('.active');
        let el = e.target;
        if(!el.classList.contains('active') && !active.contains(el)) {
            closeUpdata();
        }
    }
},false)

// 更改选项触发change事件
regions.addEventListener('change', selectChange, false);
products.addEventListener('change', selectChange, false);
// 鼠标离开tbody
tableWrapper.addEventListener('mouseleave', drawChart, false);
// 鼠标滑过表格事件
tbody.addEventListener('mouseover', lineChart.changeData, false);
tbody.addEventListener('mouseover', postChart.changeData, false);

// 页面刚加载做的事情，只执行一次
(() => {
    let regionList = document.querySelectorAll('input');
    drawHeader();
    for (let i = 0; i < regionList.length; i++) {
        regionList[i].checked = true;
    }
})();
drawChart();
postChart.draw(localStorage.data ? JSON.parse(localStorage.data)[0].sale: sourceData[0].sale);
draw(getData(choiceSelect));