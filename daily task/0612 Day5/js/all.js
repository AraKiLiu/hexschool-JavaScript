var arr = [{
    using: true,
    number: 5,
  },
  {
    using: false,
    number: 4,
  },
  {
    using: false,
    number: 3,
  },
  {
    using: true,
    number: 2,
  },
  {
    using: false,
    number: 1,
  },
  {
    using: true,
    number: 0,
  },
];

function saySomething(cb, a) {
  return cb(a);
}
var result = saySomething(function () {
  var str = '';
  arr.forEach(function (item) {
    if (item.using) {
      str = str + item.number.toString();
    }
  });
  return str;
}, arr);
console.log(result); // 結果必須為 520