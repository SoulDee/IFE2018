// 渲染表格
function draw(data) { 
    let docFrag = document.createDocumentFragment();
    // 渲染表格，清空原内容插入table-wrapper
    data.map((item, index) => {
        let tr = drawTable(item, 'td');
        tr.setAttribute('tr-index', index);
        docFrag.appendChild(tr);
    });
    tbody.innerHTML = '';
    tbody.appendChild(docFrag);
}

// 绘制表头
function drawHeader() {
    let th;
    if(choiceSelect[0].length > choiceSelect[1].length && choiceSelect[1].length === 1) {
        th = drawTable(['地区', '商品', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], 'th')
    } else {
        th = drawTable(['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], 'th');
    }
    thead.appendChild(th);
}

// 绘制方法，参数为数据以及表格类型 th td
function drawTable(data, type) {
    let doc = document;
    let tr = doc.createElement('tr');
    for (let i = 0; i < data.length; i++) {
        let td = doc.createElement(type);
        // 判断哪个作为跨行的td
        if(data.length === 14 && i == 0 && type !== 'th') {
            if(choiceSelect[0].length > choiceSelect[1].length && choiceSelect[1].length === 1) {
                td.setAttribute('rowspan', choiceSelect[0].length);
            } else {
                td.setAttribute('rowspan', choiceSelect[1].length);
            }
        }
        td.innerHTML = `<span class='numberData'>${data[i]}</span>`;
        // 给月份插入编辑 保存 取消
        if(typeof data[i] === 'number') {
            let items = getOpraItem(data[i]);
            td.setAttribute('td-index', i);
            items.map((item) => td.appendChild(item));
        }

        tr.appendChild(td);
    }
    return tr;
}

// 获取数据并渲染表格
function selectChange(e) {
    ChoiceLogic(e);
    getChoiceSelect();
    let data = getData(choiceSelect);
    draw(data);
    drawChart();
}

// 插入表格中的额外内容
function getOpraItem(val) {
    let doc = document;
    let obj = [];
    let itemArr = [
        {
            name: '编辑',
            cla: 'editor'
        },
        {
            name: '保存',
            cla: 'save',
        },
        {
            name: '取消',
            cla: 'close'
        }];

    let input = doc.createElement('input');
    input.classList.add('disappear');
    input.value = val;
    obj.push(input);
    
    itemArr.map((item) => obj.push(createEm(item.name, item.cla)));
    return obj;
}

function createEm(text, cla) {
    let el = document.createElement('em');
    el.innerText = text;
    el.classList.add('disappear', cla);
    return el;
}
