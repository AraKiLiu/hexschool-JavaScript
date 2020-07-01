var Auntie = {
  name: '漂亮阿姨',
  age: 21,
  deposit: 10000,
  depositRecord: [{
    title: '小明匯款紀錄',
    amounts: 77777
  }]
};


var MingMoneyTransferRecord = Object.assign({}, Auntie.depositRecord);

console.log(MingMoneyTransferRecord);
console.log(MingMoneyTransferRecord === Auntie.depositRecord);