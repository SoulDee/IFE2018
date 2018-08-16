// 获取单例
let getSingle = function( fn ){
    var result = null;
    return function() {
        return result || ( result = fn.apply(this, arguments ) );
    }
};

// 产生一个a 到 b-1的随机数
let aRandom = (a = 0,b = 1) => Math.floor( Math.random() * (b-a+1) ) + a;
// 单例厨师
let createCook = getSingle( (id, name, salary) => new Cook(id, name, salary));
// 单例服务员
let createWaiter = getSingle( (id, name, salary) => new Waiter(id, name, salary));

// 餐厅类
// 属性：金钱，座位数量、职员列表
// 方法：招聘职员，解雇职员，添加新菜
class Restaurant {
    constructor(obj) {
        this.cash = obj.cash;
        this.seats = obj.seats;
        this.staffs = [];
        this.menu = [];
        this.clientMenu = [];
    }
    // 招聘单个厨师
    hireCook(id, name, salary) {
        let cook = createCook(id, name, salary);
        this.staffs.push(cook);
        console.log(`招聘了一个厨师：ID ${id}; 姓名 ${name}; 工资 ${salary}`);
    };
    // 招聘单个服务员
    hireWaiter(id, name, salary) {
        let waiter = createWaiter(id, name, salary);
        this.staffs.push(waiter);
        console.log(`招聘了一个服务员：ID ${id}; 姓名 ${name}; 工资 ${salary}`);
    };
    // 解雇职员
    fire(name) {
        let list = this.staffs;
        for(let i = 0; i < list.length; i++) {
            if (list[i].name === name) {
                list.splice(i, 1);
            }
        }
        console.log(`解雇了${name}`);
    }
    // 添加新的菜品
    addMenu(menuList) {
        let that = this;
        menuList.map( (item) => that.menu.push(new ShopMenu(item.name, item.cost, item.price)) );
        console.log('添加了新的价格表：');
        console.log(JSON.parse(JSON.stringify(this.menu)));
    }

    addclientMenu(menu) {
        let that = this;
        menu.map( (item) => that.clientMenu.push(new ClientMenu(item.name, item.price)) );
        console.log(`添加了新的菜单`);
        console.log(JSON.parse(JSON.stringify(this.clientMenu)));
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
        this.isBusy = false;
    }
    // 完成一次工作
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
    working(food) {
        if (food instanceof Array) {
            console.log(`顾客点了${food[0]}`);
            return food;
        } else {
            console.log('服务员给顾客上菜了');
            return food;
        }
    }
}

// 厨师类，继承自职员
// 完成一次工作：烹饪出菜品
class Cook extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary);
    }
    // 工作
    working(name) {
        console.log(`厨师煮好了${name}`);
        return new Greens(name);
    }
}

// 顾客类
// 属性：食物刘表
// 方法：点菜，吃
class Customer {
    constructor() {
        this.foods = [];
    }
    // 点餐
    order(clientMenu) {
        let foodList = [];
        let food = clientMenu[aRandom(1, clientMenu.length)-1].name;
        foodList.push(food);
        return foodList;
    }
    // 吃饭
    eat() {
        let eated = this.foods.pop();
        console.log(`顾客吃完了${eated.name}`);
    }
}

// 菜品类
// 属性：菜名
class Greens {
    constructor(name) {
        this.name = name;
    }
}

// 商店内部的菜单
// 属性：名字、烹饪成本、价格
class ShopMenu {
    constructor(name, cost, price) {
        this.name = name;
        this.cost = cost;
        this.price = price;
    }
}

// 顾客看到的菜单
// 属性： 名字，价格
class ClientMenu {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
