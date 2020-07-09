// 請使用解構組合使 arr2 變成為 [1, 2, 3, 4, 5, 6] 的結果
var arr = [1, 2, 3];
var arr2 = [...arr, 4, 5, 6]; // [1, 2, 3, 4, 5, 6]
console.log(arr2);

// 請使用解構組合以下兩個陣列為 [1, 2, 3, 4, 5, 6] 的結果
var nums1 = [1, 2, 3];
var nums2 = [4, 5, 6];
var nums3 = [...nums1, ...nums2]
console.log(nums3);

// 請使用解構，取出 name 及 age 的變數
const person = {
  name: '小明',
  age: 16
}
const {
  name,
  age
} = person
console.log('name:', name);
console.log('age:', age);



// 請使用解構，將以下陣列分別取出為獨立變數 Ming, Auntie, Jay, Mei
var people = ['小明', '漂亮阿姨', '杰倫', '小美'];
let [Ming, Auntie, Jay, Mei] = people
console.log('Ming:', Ming);
console.log('Auntie:', Auntie);
console.log('Jay:', Jay);
console.log('Mei:', Mei);