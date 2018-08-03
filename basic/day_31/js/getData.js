// 返回过滤后的数据
function getData(choice) {
    let data = sourceData;
    // 过滤
    if(choice[0].length > 0) data = dataFilter(data, 'product', choice[0]);
    if(choice[1].length > 0) data = dataFilter(data, 'region', choice[1]);
    // 转换为数组
    data = data.map((item) => objToArray(item));
    // 排序
    data = data.sort(function(a, b) {
        return a[0] - b[0];
    });
    // 交换
    if(choiceSelect[0].length > choiceSelect[1].length && choiceSelect[1].length === 1) {
        data = exChange(data);
    };
    // 将重复项制空，方便后面的表格绘制
    data = clearRepeat(data);
    return data;
}

// 交换
function exChange(data) {
    for (let i = 0; i < data.length; i++) {
        [data[i][0], data[i][1]] = [data[i][1], data[i][0]];
    }
    return data;
}

// 数据过滤
function dataFilter(data, type, condition) {
    let newData = data.filter((item) => {
        return condition.indexOf(item[type]) !== -1;
    })
    return newData;
}

// 去除相同项目
function clearRepeat(data) {
    let index = 0;
    for (let i = 1; i < data.length; i++) {
        if(data[i][0] === data[index][0]) {
            data[i].shift();
        } else {
            index = i;
        }
    }
    return data;
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