// 請將此段 var 宣告改為 let, const
const Ming = '小明';
let MingAge = 16;
let MingLocation = '真心鎮';
const person = {
  name: '小明',
  location: '真心鎮',
};
let wallet = {
  money: 1000,
};
// 需修改程式碼的結尾

// 後續程式碼，請藉此判斷使用 Let or Const
MingLocation = '真心鎮郊外';
person.location = '真心鎮郊外';
wallet = {};

console.log(MingLocation);
console.log(person);
console.log(wallet);