var myMoney = 0;
// money 需要給予預設值 500
function getMoney(money = 500) {
  myMoney = money;
}
getMoney();

// fruits 是一個陣列
function buySomething(...fruits) {
  fruits.forEach((item) => {
    if ('lemon' === item) {
      console.log('買 3 個檸檬');
      myMoney -= 60;
    } else if ('watermelon' === item && !'賣奇異果的') {
      console.log('買 1 個西瓜');
      myMoney -= 40;
    } else if ('watermelon' === item && '賣奇異果的') {
      console.log('買 10 個西瓜');
      myMoney -= 400;
    }
  });
  console.log(`小明剩下 ${myMoney} 元`)
}

buySomething('lemon', 'watermelon', 'kiwi');