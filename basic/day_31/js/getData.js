// 返回过滤后的数据
function getData(choice) {
    let data = useData();
    // 过滤 转换为数组 排序
    data = filterData(data, choice);
    data = data.map((item) => objToArray(item));
    data = data.sort((a, b) => a[0] - b[0]);
    // 交换
    if(isExChange()) {
        data = exChange(data);
    };
    // 将地区产品的重复项制空，方便后面的表格绘制
    data = clearRepeat(data);
    return data;
}

// 删除前缀的产品和地区
delPrefix = (item) => item.splice(2);


// 交换
function exChange(data) {
    for (let i = 0; i < data.length; i++) {
        [data[i][0], data[i][1]] = [data[i][1], data[i][0]];
    }
    return data;
}
// 过滤过程
function filterData(data, choice) {
    if(choice.product.length > 0) data = dataFilter(data, 'product', choice.product);
    if(choice.region.length > 0) data = dataFilter(data, 'region', choice.region);
    return data
}
// 数据过滤
dataFilter = (data, type, condition) => data.filter((item) => condition.indexOf(item[type]) !== -1);

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