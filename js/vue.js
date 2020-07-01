//實體化 Vue 物件，並傳入特定屬性及方法
new Vue({

  // 將 Vue 綁定我們所自訂的元素上
  el: '#app',

  // Vue 有雙向綁定的特性，在此需要先定義基本的資料才能進行綁定
  data: {
    message: '我是訊息',
    text: '這裡有一段話',
    number: 0,
    selectData: ['小美', '可愛小妞', '漂亮阿姨'],
    selected: '',
    checkbox1: false,
    checkboxArray: [],
    singleRadio: '',
    counter: 0,
    imgUrl: 'https://images.unsplash.com/photo-1589606331063-52b1afca1b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    isTransform: false,
    objectClass: {
      'rotate': false,
      'bg-danger': false,
    },
    arrayClass: [],
    isSuccess: true,
    link: 'a',
    arrayData: [{
        name: '卡斯伯',
        age: 35
      },
      {
        name: 'Ray',
        age: 28
      },
      {
        name: '洧杰',
        age: 33
      }
    ],
    objectData: {
      casper: {
        name: '卡斯伯',
        age: 35
      },
      ray: {
        name: 'Ray',
        age: 32
      },
      gonsakon: {
        name: '洧杰',
        age: 33
      }
    },
  },
  methods: {
    say: function (message) {
      alert(message);
    },
    clickfu: function () {
      window.alert('漂亮姊姊變漂亮阿姨');
    },
    onEnter(e) {
      console.log()
      window.alert(`你按下了按鈕 ${e.keyCode} 號碼，所以漂亮阿姨出乃玩`);
    },
  }
});