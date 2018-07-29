// 数据
let sourceData = [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }, {
        product: "手机",
        region: "华北",
        sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    }, {
        product: "手机",
        region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }, {
        product: "笔记本",
        region: "华东",
        sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    }, {
        product: "笔记本",
        region: "华北",
        sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    }, {
        product: "笔记本",
        region: "华南",
        sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    }, {
        product: "智能音箱",
        region: "华东",
        sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    }, {
        product: "智能音箱",
        region: "华北",
        sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    }, {
        product: "智能音箱",
        region: "华南",
        sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]
// 表头数据
let tableHead = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',];
// 当前选中选项
let choiceSelect = [[], []];

let regions = document.getElementById('region-select'), // 地区选项列表
    tableWrapper = document.querySelector('.table-wrapper'), // 表格容器
    thead = tableWrapper.querySelector('thead'), // 表头
    tbody = tableWrapper.querySelector('tbody'), // 表格
    products = document.getElementById('product-select'), // 产品选项列表
    allChoiceRegion = document.getElementById('allChoiceRegion'), // 地区全选
    allChoiceProduct = document.getElementById('allChoiceProduct'); // 产品全选

// 更改选项触发change事件
regions.addEventListener('change', selectChange, false);
products.addEventListener('change', selectChange, false);

// 获取数据并渲染表格
function selectChange(e) {
    ChoiceLogic(e);
    // 获取选项并获取数据
    getChoiceSelect();
    let data = getData(choiceSelect);
    
    // 渲染表格
    draw(data);
}

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
        case 'allChoiceRegion': allChoice(0, allChoiceRegion, regions);break;
        case 'allChoiceProduct': allChoice(1, allChoiceProduct, products);break;
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
            index = 0;
            all = allChoiceRegion;
            break;
        case 'product-select': 
            index = 1;
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
    // 遍历地区
    listChange(regions, 0);
    // 遍历产品
    listChange(products, 1);
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

// 返回过滤后的数据
function getData(choice) {
    let data = sourceData;

    if(choice[0].length > 0) data = dataFilter(data, 'region', choice[0]);
    if(choice[1].length > 0) data = dataFilter(data, 'product', choice[1]);
    return data;
}

// 数据过滤
function dataFilter(data, type, condition) {
    let newData = data.filter((item) => {
        return condition.indexOf(item[type]) !== -1;
    })
    return newData;
}

// 渲染表格
function draw(data) {
    // 获取数组数据
    let dataArray = data.map((item) => objToArray(item));
    // 渲染表格，清空原内容插入table-wrapper
    let docFrag = document.createDocumentFragment();
    dataArray.map((item) => docFrag.appendChild(drawTable(item, 'td')));
    tbody.innerHTML = '';
    tbody.appendChild(docFrag);
}

// 将对象数据转换为数组
function objToArray(items) {
    let arr = [];
    for(let item in items) {
        if(items.hasOwnProperty(item)) {
            if(items[item] instanceof Array) {
                items[item].map((item => arr.push(item)));
            } else {
                arr.push(items[item]);
            }
        }
    }
    return arr;
}

// 绘制方法，参数为数据以及表格类型 th td
function drawTable(data, type) {
    let doc = document;
    let tr = doc.createElement('tr');

    for (let i = 0; i < data.length; i++) {
        let td = doc.createElement(type);
        td.innerText = data[i];
        tr.appendChild(td);
    }
    return tr;
}

// 开始的时候 绘制表头 绘制表格
(() => {
    let th = drawTable(tableHead, 'th');
    thead.appendChild(th);
    draw(sourceData);
})()