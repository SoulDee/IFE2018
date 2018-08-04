// 渲染表格
function draw(data) {
    let docFrag = document.createDocumentFragment();
    let th = drawHeader();
    docFrag.appendChild(th);
    // 渲染表格，清空原内容插入table-wrapper
    data.map((item) => docFrag.appendChild(drawTable(item, 'td')));
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
    return th;
}

// 绘制方法，参数为数据以及表格类型 th td
function drawTable(data, type) {
    let doc = document;
    let tr = doc.createElement('tr');
    for (let i = 0; i < data.length; i++) {
        let td = doc.createElement(type);
        if(data.length === 14 && i == 0 && type !== 'th') {
            if(choiceSelect[0].length > choiceSelect[1].length && choiceSelect[1].length === 1) {
                td.setAttribute('rowspan', choiceSelect[0].length);
            } else {
                td.setAttribute('rowspan', choiceSelect[1].length);
            }
            
        }
        
        td.innerText = data[i];
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
}