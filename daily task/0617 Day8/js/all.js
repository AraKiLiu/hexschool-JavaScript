var Auntie = {
  name: '漂亮阿姨',
  age: 21,
  deposit: 10000,
  depositRecord: [{
    title: '開戶',
    amounts: 10000
  }]
};

var MingMoneyTransfer = [{
    title: '漂亮姨姨',
    amounts: 777
  },
  {
    title: '我是',
    amounts: 7000
  },
  {
    title: '真心的',
    amounts: 70000
  }
];

MingMoneyTransfer.forEach(function (item, index) {
  Auntie.depositRecord.push(item);
});

var total = 0;
Auntie.depositRecord.forEach(function (item, index) {
  total = total + item.amounts;
  Auntie.deposit = total;
});

console.log(Auntie.deposit);