// 餐厅类
// 属性：金钱，座位数量、职员列表
// 方法：招聘职员，解雇职员
class Restaurant {
    constructor(obj) {
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staffs = obj.staffs;
    }
    // 招聘职员
    hire(job, id, name, salary) {
        let newstaff = null;
        switch(job) {
            case 'cook': newstaff = new Cook(id, name, salary);
                break;
            case 'waiter': newstaff = new Waiter(id, name, salary);
        }
        this.staffs.push(newstaff);
    }
    // 解雇职员
    fire(name) {
        let list = this.staffs;
        for(let i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
            }
        }
    }
}

// 职员类
// 属性：ID，姓名，工资
// 方法：完成一次工作
class Staff {
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    // 完成工作
    do() {
        this.working();
    }
}

// 服务员类，继承自职员
// 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
class Waiter extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
    }
    // 工作
    working() {}
}

// 厨师类，继承自职员
// 完成一次工作：烹饪出菜品
class Cook extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
    }
    // 工作
    working() {
        var greens = new Menu('白米饭', 1, 2);
        return greens;
    }
}

// 顾客类
// 方法：点菜，吃
class Customer {
    constructor() {}
    // 点餐
    order() {}
    // 吃饭
    eat() {}
}


// 菜品类
// 属性：名字、烹饪成本、价格
class Menu {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
}

// 创建一个餐厅
// 初始资金1000000 座位数量20
let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staffs: []
});



// 测试用例
console.log('餐厅初始化人员：');
console.log(ifeRestaurant.staffs);

ifeRestaurant.hire('cook', 1, 'Tony', 5000);

console.log('雇佣一名厨师之后：');
console.log(ifeRestaurant.staffs);

ifeRestaurant.hire('waiter', 2, 'Welian', 3000);

console.log('雇佣一名服务员之后：');
console.log(ifeRestaurant.staffs);

ifeRestaurant.fire('Welian');

console.log('解雇一名服务员之后：');
console.log(ifeRestaurant.staffs);