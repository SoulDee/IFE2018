// 当前选中项存放
let choiceSelect = {
    product: ['手机', '笔记本', '智能音箱'],
    region: ['华东', '华南', '华北']
}

let regions = document.getElementById('region-select'), // 地区选项列表
    tableWrapper = document.querySelector('.table-wrapper'), // 表格容器
    thead = tableWrapper.querySelector('thead'), // 表头
    tbody = tableWrapper.querySelector('tbody'), // 表格
    products = document.getElementById('product-select'), // 产品选项列表
    allChoiceRegion = document.getElementById('allChoiceRegion'), // 地区全选
    allChoiceProduct = document.getElementById('allChoiceProduct'); // 产品全选

// 产品数量是否大于地区 是否要交换
isExChange = () => choiceSelect.product.length > choiceSelect.region.length && choiceSelect.region.length === 1;
// 是否存在缓存的数据
useData = () => localStorage.data ? JSON.parse(localStorage.data): sourceData;
// 是否全选按钮
isAllChoice = (e) => e.target.value === '全选' ? allChoice(e) : oneChoice(e);

// 全选判断 是哪一个全选
function allChoice(e) {
    switch(e.target.id) {
        case 'allChoiceRegion': allChoiceLogic('region', allChoiceRegion, regions);break;
        case 'allChoiceProduct': allChoiceLogic('product', allChoiceProduct, products);break;
        default:break;
    } 
}

// 全选逻辑
function allChoiceLogic(type, target, box) {
    getChoiceSelect();
    if(choiceSelect[type].length === 3) {
        target.checked = true;
    } else {
        let elements = box.querySelector('.select-box').querySelectorAll('input');
        for (let i = 0; i < elements.length; i++) {
            elements[i].checked = true;
            choiceSelect[type].push(elements[i].value);
        }
    };
}
// 单选逻辑
function oneChoice(e) {
    getChoiceSelect();
    let name = `${e.target.name}-select`;
    let type = '',
        all = null;
    switch(name) {
        case 'region-select':
            type = 'region';
            all = allChoiceRegion;
            break;
        case 'product-select': 
            type = 'product';
            all = allChoiceProduct;
            break;
        default:break;
    }
    // 当前选项是否为0，是的话阻止默认事件 
    if(choiceSelect[type].length === 0) {
        e.target.checked = true;
    } else if(choiceSelect[type].length === 3) {
        all.checked = true;
    } else {
        all.checked = false;
    }
}
// 遍历选项，将选中的选项压入choiceSelect
function getChoiceSelect() {
    listChange(products, 'product');
    listChange(regions, 'region');
}

// 遍历查找是否选中 参数为需要遍历的数组，存放到哪里的下标
function listChange(el, type) {
    choiceSelect[type] = [];
    let list = el.querySelector('.select-box').querySelectorAll('input');
    for (let i = 0; i < list.length; i++) {
        if(list[i].checked) {
            choiceSelect[type].push(list[i].value);
        }
    }
}


// 数据更改事件
function setData(e) {
    let arr = postChart.data || lineChart.data;
    let tdList = e.target.parentNode.childNodes;
    for (let i = 1; i < tdList.length; i++) {
        arr[i-1] = (parseInt(tdList[i].querySelector('span').innerText));
    };
    // 是否为首行
    if(arr.length === 13) arr.shift();
    return arr;
}// 数据更改事件
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

// 获取比例
function getPixiv(data) {
    let max = 0;
    for (let i = 0; i < data.length; i++) {
        let num = Math.max.apply(null, data[i]);
        if (num > max) {
            max = num;
        }
    }
    return max/300;
}

// 修改的数据并保存到localStorage
function savaLocalStorage(data) {
    localStorage.data = JSON.stringify(data);
}

// 更新本地数据
function updataLocal(td, val) {
    let data = useData();
    let trIndex = td.parentNode.getAttribute('tr-index');
    let tdIndex = td.getAttribute('td-index')-2;
    let product = td.parentNode.childNodes[0].childNodes[0].innerText;
    let region = td.parentNode.childNodes[1].childNodes[0].innerText;
    // 是否为没有colspan的行
    if (td.parentNode.childNodes.length <= 13) {
        tdIndex += 1;
        product = tbody.childNodes[Math.floor(trIndex/choiceSelect.product.length)].childNodes[0].childNodes[0].innerText;
        region = td.parentNode.childNodes[0].childNodes[0].innerText;
    }
    // 产品和地区是否交换
    if (isExChange()) {
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
    // 点击编辑
    if (NClass.contains('editor')) {
        // 检查是否已经有出于活动中的表格
        if(document.querySelector('.active')) closeUpdata();
        e.target.parentNode.classList.add('active');
        editorData();
    }
    // 点击保存
    if (NClass.contains('save')) {
        saveUpdate();
    }
    // 点击取消
    if (NClass.contains('close')) {
        closeUpdata();
    }
}, false);

// 按月分组
function monthPacket(data) {
    let months = [];
    for (let i = 0; i < 12; i++) {
        let month = [];
        for (let j = 0; j < data.length; j++) {
            month.push(data[j][i]);
        }
        months.push(month);
    }
    return months;
}

// 重新绘制多数据图
function drawChart() {
    lineChart.drawChart();
    postChart.drawChart();
}

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
    let inputList = document.querySelectorAll('input');
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].checked = true;
    }
})();
setStatus();
drawChart();
draw(getData(choiceSelect));





