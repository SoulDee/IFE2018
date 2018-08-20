// 时间单位 1000ms
const timeUnits = 100;

let btn = document.getElementById('oneEat');
btn.addEventListener('click', () => {
    console.log('来了一个顾客');
    oneEat();
}, false);

// 创建一个餐厅
// 初始资金1000000 座位数量20 员工0 菜单0
// 添加价格表 生成菜单 雇佣单个厨师 雇佣单例服务员
let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1
});
console.log('IFE餐厅隆重开业！欢迎各位来品尝美味！你要的我们都有！');
ifeRestaurant.hireCook(1, 'Tony', 5000);
ifeRestaurant.hireWaiter(2, 'Welian', 3000);
ifeRestaurant.addMenu(foodList);

let ifeMenu = ifeRestaurant.addclientMenu(ifeRestaurant.menu);
const cook1 = ifeRestaurant.staffs[0];
const waiter2 = ifeRestaurant.staffs[1];
console.log('\n');

// 一次吃饭的流程
function oneEat() {
    // 产生一个顾客
    const aClient = new Customer();
    // 顾客点餐
    const getFood = (menu) => {
        const foods = aClient.order(menu);
        return new Promise((resolve) => {
            setTimeout(resolve, 1*timeUnits, foods);
        });
    };
    // 顾客点餐结束获得餐单
    getFood(ifeMenu)
        .then((foods) => {
            waiter2.working(foods);
            return foods;
        })
        .then((foods) => {
            console.log('厨师正在炒菜...');
            const foodsList = cook1.getFoodsList(ifeRestaurant, foods);
            let promiseList = [];
            for (let i = 0; i < foodsList.length; i++) {
                const item = promiseList.length > 0 ? promiseList[promiseList.length-1] : null;
                promiseList.push( cook1.working(foodsList[i], item));
            }
            
            // promiseList[promiseList.length-1].then((value, item) => {
            //     console.log(item);
            // })


            
            

                // let food = foodsList.pop();
                // cook1.working(food)
                //     .then((food) => {
                //         console.log(`厨师炒好了${food.name}`);
                //         waiter2.working(food.name);
                //         aClient.foods.push(food);
                //     })
                //     .then(() => {
                //         // if (aClient.foods.length > 0 && !aClient.statu) {
                //         //     aClient.eat();
                //         // }
                //     });
        })
    console.log('\n');
}