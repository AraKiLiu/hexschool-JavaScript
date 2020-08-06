import delModal from './delModal.js';
import modal from './modal.js';
import pagination from './pagination.js';


Vue.component('pagination', pagination);
Vue.component('modal', modal);
Vue.component('delModal', delModal);

new Vue({
  el: '#app',
  data: {
    modalTitle: '',
    // 產品列表
    products: [],
    // 給彈出視窗使用的產品資料
    tempProduct: {
      imageUrl: [],
    },
    pagination: {},
    user: {
      token: ''
    },
    api: {
      path: `https://course-ec-api.hexschool.io/api/`,
      uuid: '9cc644ce-dcbb-47ce-a1c2-55131daa05a0',
    },
    usNew: '',
  },

  created() {
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    //預設帶入 token
    axios.defaults.headers['Authorization'] = `Bearer ${this.user.token}`;

    // 若無法取得 token 則返回 Login 頁面
    if (this.user.token === '') {
      window.location = 'Login.html';
    }

    // 執行取得全部產品的行為
    this.getProducts();
  },
  methods: {
    // 將彈跳視窗Modal所要執行的動作都集中於此方法中
    openModal(isNew, item) {
      let url = '';
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: []
          };
          this.modalTitle = '新增產品';
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.modalTitle = '編輯產品';
          url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(url).then((response) => {
            // 取得成功後回寫到 tempProduct
            this.tempProduct = response.data.data;
            // 確保資料已經回寫後在打開 Modal
            $('#productModal').modal('show');
          }).catch((error) => {
            console.log(error);
          });
          break;
        case 'delete':
          url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
          axios.get(url).then((response) => {
            // 取得成功後回寫到 tempProduct
            this.tempProduct = response.data.data;
            // 確保資料已經回寫後在打開 Modal
            $('#delProductModal').modal('show');
          }).catch((error) => {
            console.log(error);
          });
          break;
        default:
          break;
      }
    },
    // 抓取所有產品列表
    getProducts(page = 1) {
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${page}`;

      axios.get(url).then((response) => {
        this.products = response.data.data; // 取得產品列表
        this.pagination = response.data.meta.pagination; // 取得分頁資訊

        if (this.tempProduct.id) {
          this.tempProduct = {
            imageUrl: [],
          };
          // 關閉productModal視窗
          $('#productModal').modal('hide');
          // 關閉delProductModal視窗
          $('#delProductModal').modal('hide');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  },
});