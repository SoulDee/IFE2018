// 渲染表格
function draw(data) { 
    let docFrag = document.createDocumentFragment();
    // 渲染表格，清空原内容插入table-wrapper
    drawHeader();
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
    thead.innerHTML = '';
    let th;
    if(isExChange()) {
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
            if(isExChange()) {
                td.setAttribute('rowspan', choiceSelect.product.length);
            } else {
                td.setAttribute('rowspan', choiceSelect.region.length);
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
    isAllChoice(e);
    getChoiceSelect();
    draw(getData(choiceSelect));
    drawChart();
    setStatus();
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
// 创建em
function createEm(text, cla) {
    let el = document.createElement('em');
    el.innerText = text;
    el.classList.add('disappear', cla);
    return el;
}

// 编辑方法
function editorData() {
    let td = tbody.querySelector('.active');
    td.querySelector('span').classList.add('disappear');
    td.querySelector('.editor').style.display = 'none';
    td.querySelector('input').classList.remove('disappear');
    td.querySelector('.save').classList.remove('disappear');
    td.querySelector('.close').classList.remove('disappear');
}
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
    } else {
        alert('请输入数字');
    }
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