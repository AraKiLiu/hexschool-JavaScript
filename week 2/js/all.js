document.querySelector('#get').addEventListener('click', getData);
document.querySelector('#post').addEventListener('click', postData);
document.querySelector('#patch').addEventListener('click', patchData);
document.querySelector('#delete').addEventListener('click', deleteData);



var obj = {
  data: {
    uuid: '9cc644ce-dcbb-47ce-a1c2-55131daa05a0',
    token: '',
    products: [],
    creatProducts: {
      title: '監控警長',
      category: '攝影',
      content: '監視小物',
      description: '看著你發慌',
      imageUrl: ['https://images.unsplash.com/photo-1592499960460-0daf95abd5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'],
      enabled: true,
      origin_price: 500,
      price: 700,
      unit: '組',
    }
  },
  init: function () {
    axios.defaults.headers['Authorization'] = `Bearer ${this.data.token}`;
  },
  getData: function () {
    var vm = this;
    var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/ec/products`;

    axios.get(url)
      .then(function (response) {
        vm.data.products = response.data.data;
        vm.data.products.forEach(function (item, index) {
          console.log('Products: ', index);
          console.log('Title: ', item.title);
          console.log('Content: ', item.content);
          console.log('ImageUrl: ', item.imageUrl[0]);
          console.log('');
        });
      });
  },
  postData: function () {
    var vm = this;
    var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product`;

    axios.post(url, vm.data.creatProducts)
      .then(function (response) {
        console.log('postData');
      });
  },
  patchata: function () {
    var vm = this;
    var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product/FcK3QunDiHHu08NSZmzGZueuo3P2h9eRjFY3yujsJc98Dxd8KUdE1Hw0bvMrLuO5`;
    vm.data.creatProducts.title = '看得你發慌';
    axios.patch(url, vm.data.creatProducts)
      .then(function (response) {
        console.log('patchData');
      });
  },
  deleteData: function () {
    var vm = this;
    var url = `https://course-ec-api.hexschool.io/api/${this.data.uuid}/admin/ec/product/FcK3QunDiHHu08NSZmzGZueuo3P2h9eRjFY3yujsJc98Dxd8KUdE1Hw0bvMrLuO5`;
    axios.delete(url)
      .then(function (response) {
        console.log('deleteData');
      });
  },
};

function getData() {
  obj.getData();
}

function postData() {
  obj.postData();
}

function patchData() {
  obj.patchata();
}

function deleteData() {
  obj.deleteData();
}

obj.init();