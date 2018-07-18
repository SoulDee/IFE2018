// 事件单元
let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};
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
let regions = document.getElementById('region-select'); // 地区表格
let products = document.getElementById('product-select'); // 产品表格
let tableWrapper = document.querySelector('.table-wrapper'); // 表格容器
let selectedList = [[],[]]; // 选中的复选框的数组
let regionAll = document.getElementById('region-all'); // 地区全选按钮
let productAll = document.getElementById('product-all'); // 产品全选按钮


function FormList(sourceData) {
    this.sourceData = sourceData;
}
FormList.prototype = {
    constructor: FormList,
    // 渲染表格
    printTable: function (data) {
        let table = document.createElement('table');
        // 获得表头和正式表格
        table.appendChild(newForm.printTableHead());
        table.appendChild(newForm.printTableBody(newForm.objToArr(data)));

        tableWrapper.innerHTML = '';
        tableWrapper.appendChild(table);
    },
    // 将对象转化为表格形式的数组
    objToArr: function (data) {
        let arrList = [];
        for (let i = 0; i < data.length; i++) {
            let arr = [];
            arr.push(data[i].product);
            arr.push(data[i].region);
            for (let j = 0; j < data[i].sale.length; j++) {
                arr.push(data[i].sale[j]);
            }
            arrList.push(arr);
        }
        return arrList;
    },
    // 获得表头
    printTableHead: function () {
        let tableThead = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            thead = document.createElement('thead'),
            tr = document.createElement("tr");

        for (let index = 0; index < tableThead.length; index++) {
            let th = document.createElement("th");
            th.innerText = tableThead[index];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        return thead;
    },
    // 获得正式表格
    printTableBody: function (data) {
        let tbody = document.createElement('tbody');

        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement("tr");
            for (let j = 0; j < data[i].length; j++) {
                let td = document.createElement("td");
                td.innerText = data[i][j];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        return tbody;
    }
}

let newForm = new FormList();

// 绑定change事件，重新渲染表格
EventUtil.addHandler(document.body, 'change', function(event) {
    // 清空并重新获取选中的数组
    selectedList = [];
    getChecked(regions);
    getChecked(products);
    // 获得过滤后数据并渲染
    newForm.printTable(getData(selectedList));
});

// 判断是否全选
function getChecked(el) { 
    let arr = getChoice(el);
    selectedList.push(arr);
    if (arr.length === regions.elements.length - 1 && arr[length-1] !== 'on') {
        choiceAll(el, true);
    }else {

    }
}
// 遍历选中数组
function getChoice(el) {
    let arr = [];
    for (let index = 0; index < el.elements.length; index++) {
        if (el.elements[index].checked) {
            arr.push(el.elements[index].value);
        }
    }
    return arr;
}

// 全选按钮绑定事件
EventUtil.addHandler(regionAll, 'change', function() {
    if (regionAll.checked) {
        choiceAll(regions, true);
    }else {
        choiceAll(regions, false);
    }
});
EventUtil.addHandler(productAll, 'change', function () {
    if (productAll.checked) {
        choiceAll(products, true);
    } else {
        choiceAll(products, false);
    }
});
// 全选或者全不选
function choiceAll(el, statu) {
    for (let index = 0; index < el.elements.length; index++) {
        el.elements[index].checked = statu;        
    }
}

// 根据select选项获取数据并过滤
function getData(arr) {
    let arr0 = arr[0];
    let arr1 = arr[1];

    if (arr0.length > 0 && arr1.length > 0) {
        return sourceData.filter(function (item) {
            return arr0.indexOf(item.region) !== -1 && arr1.indexOf(item.product) !== -1;
        });
    }
    return sourceData.filter(function(item) {
        return arr0.indexOf(item.region) !== -1 || arr1.indexOf(item.product) !== -1;
    });
}
newForm.printTable(getData(selectedList));