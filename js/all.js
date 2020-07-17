new Vue({
  el: '#app',
  data: {
    // 產品列表
    products: [
      // {
      //   id: 1122334455,
      //   title: 'MacBook Pro13',
      //   category: 'APPLE',
      //   content:
      //     '動森太MacBook Pro 配備第 10 代 4 核心 Intel 處理器，Turbo Boost 最高可達 3.8GHz。',
      //   description: 'MacBook Pro13 銀色 512GB / 4核心第10代i5 / 16GB / 2.0GHz',
      //   imageUrl: 'https://d.ecimg.tw/items/DYAJCSA900AN358/000001_1589257659.jpg',
      //   enabled: 0,
      //   origin_price: 57900,
      //   price: 50000,
      //   unit: '台',
      // },
      // {
      //   id: 66778899,
      //   title: 'MacBook Pro16',
      //   category: 'APPLE',
      //   content:
      //     '配備改寫遊戲規則的效能、更寬廣的 16 吋 Retina 顯示器，以及滿足一天的電池續航力，全新 MacBook Pro 以強大為優先，讓想做的事，可以隨時隨地想到就做。',
      //   description: 'MacBook Pro 16 銀色 6核心第九代 i7 / 512GB / 2.6GHz / 16GB',
      //   imageUrl: 'https://c.ecimg.tw/items/DYAJBG1900AQJO6/000001_1593412632.jpg',
      //   enabled: 1,
      //   origin_price: 71668,
      //   price: 70000,
      //   unit: '台',
      // },
    ],
    // 給彈出視窗使用的產品資料
    tempProduct: {},
    modalTitle: '',
    pagination: {},
    user: {
      token: '',
      uuid: '9cc644ce-dcbb-47ce-a1c2-55131daa05a0',
    },
  },

  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    // 若無法取得 token 則返回 Login 頁面
    if (this.user.token === '') {
      window.location = 'Login.html';
    }
    // 執行取得全部產品的行為
    this.getProducts();
  },
  methods: {
    // 抓取所有產品列表
    getProducts(page = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      //預設帶入 token
      axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;
      // axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((response) => {
        this.products = response.data.data; // 取得產品列表
        console.log(this.products);
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
      });
    },
    // 更新產品資料
    updateProduct() {
      //預設帶入 token
      axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;

      // 要是有id，表示他為本來就已經有資料，只是要做更新，用forEach對原本的products中的id做比對，找出是哪一筆資料後做更新。
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
        axios.patch(api, this.tempProduct).then((response) => {
          this.getProducts();
        });
      } else {
        // 要是沒有id表示，這筆資料是要新加入的，使用Date().getTime()所摻生的數字作為id，再將tempProduct的資料新增至products中
        this.tempProduct.id = new Date().getTime();
        console.log(this.tempProduct);
        const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
        axios.post(api, this.tempProduct).then((response) => {
          this.getProducts();
        });
      }
      // 將tempProduct清空
      this.tempProduct = {};
      // https://bootstrap.hexschool.com/docs/4.2/components/modal/
      // 關閉productModal視窗
      $('#productModal').modal('hide');
    },
    // 將彈跳視窗Modal所要執行的動作都集中於此方法中
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.modalTitle = '新增產品';
          this.tempProduct = {};
          // 關閉productModal視窗
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.modalTitle = '編輯產品';
          // 將item做一個淺層複製到tempProduct
          this.tempProduct = Object.assign({}, item);
          $('#productModal').modal('show');
          break;
        case 'delete':
          // 開啟delProductModal視窗
          $('#delProductModal').modal('show');
          // 將item做一個淺層複製到tempProduct
          this.tempProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    // 刪除產品
    delProduct() {
      //預設帶入 token
      axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
            axios.delete(api).then((response) => {
              this.getProducts();
            });
          }
        });
      }
      // 關閉delProductModal視窗
      $('#delProductModal').modal('hide');
    },
  },
});