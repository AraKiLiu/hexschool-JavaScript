var obj = {a: 'a', 1: 'b', '這是中文字': 'c', 'b': 'd', '--some data': 'e'};

var arr = ['a', '1', '這是中文字', 'b', '--some data'];

for (var i = 0; i < arr.length; i++) {
  console.log(obj[arr[i]]);
}