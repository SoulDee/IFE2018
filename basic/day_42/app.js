let btn = document.getElementById('oneEat');
btn.addEventListener('click', () => {
    console.log('来了一个顾客');
    oneEat();
}, false);

// 一次吃饭的流程
function oneEat() {
    // 产生一个顾客
    let aClient = new Customer();
    // 顾客点餐
    let food = aClient.order(ifeRestaurant.clientMenu);
    // 服务员获得顾客点餐 》厨师煮好
    let fooded = ifeRestaurant.staffs[0].working( ifeRestaurant.staffs[1].working(food) );
    // 服务员获得厨师煮好的菜给顾客
    aClient.foods.push( ifeRestaurant.staffs[1].working(fooded) );
    aClient.eat();
    console.log('\n');
}



// 创建一个餐厅
// 初始资金1000000 座位数量20 员工0 菜单0
let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 1
});
// 添加价格表
ifeRestaurant.addMenu(foodList);
// 生成菜单
ifeRestaurant.addclientMenu(ifeRestaurant.menu);
// 雇佣单个厨师
ifeRestaurant.hireCook(1, 'Tony', 5000);
// 雇佣单例服务员
ifeRestaurant.hireWaiter(2, 'Welian', 3000);
console.log('\n');