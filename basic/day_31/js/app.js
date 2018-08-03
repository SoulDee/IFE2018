// 当前选中选项
let choiceSelect = [['手机', '笔记本', '智能音箱'], ['华东', '华南', '华北']];

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
    getChoiceSelect();
    let data = getData(choiceSelect);
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

function setData(e) {
    let arr = postChart.data || lineChart.data;
    // 是否表头
    let val = e.target.parentNode.childNodes[2].innerText;
    if(val !== '1月') {
        let tdList = e.target.parentNode.childNodes;
        for (let i = 1; i < tdList.length; i++) {
            arr[i-1] = (parseInt(tdList[i].innerText));
        };
        // 是否为首行
        if(arr.length === 13) arr.shift();
    }
    return arr;
}


tbody.addEventListener('mouseover', lineChart.changeData, false);
tbody.addEventListener('mouseover', postChart.changeData, false);

// 开始的时候自动调用一次 绘制表头 绘制表格
(() => {
    let regionList = document.querySelectorAll('input');
    for (let i = 0; i < regionList.length; i++) {
        regionList[i].checked = true;
    }
})();
draw(getData(choiceSelect));