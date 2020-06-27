var town = {
  name: '真心鎮',
  resident: []
};
townData = {};
var Ming = {
  name: '小明',
  age: 16
};
var Auntie = {
  name: '漂亮阿姨',
  age: 21
};

function addResident(t, res1, res2) {
  t.resident[0] = Ming;
  t.resident[1] = Ming;
  return t;
}
townData = addResident(town, Ming, Auntie);
console.log(townData === town);
console.log(townData.resident); // 包含真心鎮的居民陣列資料