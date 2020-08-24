<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="container-fluid">
      <div class="text-right mt-4">
        <!-- 綁定openModal方法，並傳入'new'字串作為行為判斷 -->
        <button class="btn btn-primary"
                @click="openModal('new')">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- 使用'v-for'將products陣列逐一輸出 -->
          <!-- 使用雙大括號中間可直接插入元件資料 -->
          <tr v-for="item in products"
              :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
              {{ item.origin_price }}
            </td>
            <td class="text-right">
              {{ item.price }}
            </td>
            <td>
              <!-- 使用v-if以'item.enabled'作為判斷，決定文字顯示狀態 -->
              <span v-if="item.enabled"
                    class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <!-- 綁定openModal方法，傳入'edit'字串作為行為判斷，'item'當下點選之項目物件 -->
                <button class="btn btn-outline-primary btn-sm"
                        @click="openModal('edit', item)">
                  編輯
                </button>
                <!-- 綁定openModal方法，傳入'delete'字串作為行為判斷，'item'當下點選之項目物件 -->
                <button class="btn btn-outline-danger btn-sm"
                        @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination :pages="pagination" @emitPages="getProducts" />

      <!-- 產品彈出視窗 -->
      <!-- Modal -->
      <div id="productModal"
            class="modal fade"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                  <h5 id="exampleModalLabel"
                      class="modal-title">
                  <span v-if="isNew">新增產品</span>
                  <span v-else>編輯 {{ tempProduct.title }} 產品</span>
                  </h5>
                  <button type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <div class="row">
                      <div class="col-sm-4">
                        <div v-for="i in 5" :key="i + 'img'" class="form-group">
                          <label :for="'img' + i">輸入圖片網址</label>
                          <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]"
                           type="text" class="form-control"
                            placeholder="請輸入圖片連結">
                        </div>
                        <div class="form-group">
                          <label for="customFile">
                            或 上傳圖片
                            <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                          </label>
                          <input id="customFile" ref="file" type="file"
                           class="form-control" @change="uploadFile">
                        </div>
                        <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
                      </div>
                      <div class="col-sm-8">
                          <div class="form-group">
                              <label for="title">標題</label>
                              <!-- 用v-model與tempProduct.title -->
                              <input id="title"
                                      v-model="tempProduct.title"
                                      type="text"
                                      class="form-control"
                                      placeholder="請輸入標題">
                          </div>

                          <div class="form-row">
                              <div class="form-group col-md-6">
                                  <label for="category">分類</label>
                                  <!-- 用v-model與tempProduct.category -->
                                  <input id="category"
                                          v-model="tempProduct.category"
                                          type="text"
                                          class="form-control"
                                          placeholder="請輸入分類">
                              </div>
                              <div class="form-group col-md-6">
                                  <label for="price">單位</label>
                                  <!-- 用v-model與tempProduct.unit -->
                                  <input id="unit"
                                          v-model="tempProduct.unit"
                                          type="unit"
                                          class="form-control"
                                          placeholder="請輸入單位">
                              </div>
                          </div>

                          <div class="form-row">
                              <div class="form-group col-md-6">
                                  <label for="origin_price">原價</label>
                                  <!-- 用v-model與tempProduct.origin_price -->
                                  <input id="origin_price"
                                          v-model="tempProduct.origin_price"
                                          type="number"
                                          class="form-control"
                                          placeholder="請輸入原價">
                              </div>
                              <div class="form-group col-md-6">
                                  <label for="price">售價</label>
                                  <!-- 用v-model與tempProduct.price -->
                                  <input id="price"
                                          v-model="tempProduct.price"
                                          type="number"
                                          class="form-control"
                                          placeholder="請輸入售價">
                              </div>
                          </div>
                          <hr>

                          <div class="form-group">
                              <label for="description">產品描述</label>
                              <!-- 用v-model與tempProduct.description -->
                              <textarea id="description"
                                      v-model="tempProduct.description"
                                      type="text"
                                      class="form-control"
                                      placeholder="請輸入產品描述">
                              </textarea>
                          </div>
                          <div class="form-group">
                              <label for="content">說明內容</label>
                              <!-- 用v-model與tempProduct.content -->
                              <textarea id="description"
                                      v-model="tempProduct.content"
                                      type="text"
                                      class="form-control"
                                      placeholder="請輸入說明內容">
                              </textarea>
                          </div>
                          <div class="form-group">
                              <div class="form-check">
                                  <!-- 用v-model與tempProduct.enabled -->
                                  <input id="is_enabled"
                                          v-model="tempProduct.enabled"
                                          class="form-check-input"
                                          type="checkbox">
                                  <label class="form-check-label"
                                          for="is_enabled">是否啟用</label>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button"
                          class="btn btn-outline-secondary"
                          data-dismiss="modal">
                  取消
                  </button>
                  <button type="button"
                          class="btn btn-primary"
                          @click="updateProduct">
                  確認
                  </button>
              </div>
          </div>
        </div>
      </div>

      <div id="delProductModal"
            class="modal fade"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                  <h5 id="exampleModalLabel" class="modal-title">
                      <span>刪除產品</span>
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  是否刪除
                  <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                  取消
                  </button>
                  <button type="button" class="btn btn-danger" @click="delProduct">
                  確認刪除
                  </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      // 產品列表
      products: [],
      isLoading: false,
      // 給彈出視窗使用的產品資料
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      pagination: {},
      user: {
        token: '',
      },
      status: {
        fileUploading: false,
      },
    };
  },
  components: {
    Pagination,
  },
  props: ['token'],
  created() {
    this.getProducts();
  },
  methods: {
    // 將彈跳視窗Modal所要執行的動作都集中於此方法中
    openModal(isNew, item) {
      let url = '';
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http.get(url).then((response) => {
            // 取得成功後回寫到 tempProduct
            this.tempProduct = response.data.data;
            // 確保資料已經回寫後在打開 Modal
            $('#productModal').modal('show');
          });
          break;
        case 'delete':
          url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          this.$http.get(url).then((response) => {
            // 取得成功後回寫到 tempProduct
            this.tempProduct = response.data.data;
            // 確保資料已經回寫後在打開 Modal
            $('#delProductModal').modal('show');
          });
          break;
        default:
          break;
      }
    },
    // 抓取所有產品列表
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.$http.get(url).then((response) => {
        this.products = response.data.data; // 取得產品列表
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
        this.isLoading = false;

        if (this.tempProduct.id) {
          this.tempProduct = {
            imageUrl: [],
          };
          // 關閉productModal視窗
          $('#productModal').modal('hide');
          // 關閉delProductModal視窗
          $('#delProductModal').modal('hide');
        }
      });
    },
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
      this.$http.delete(url).then(() => {
        $('#delProductModal').modal('hide');
        this.isLoading = false;
        // ===== Toasts =====
        this.$bus.$emit('message:push',
          '產品刪除成功',
          'success');
        // ==================
        this.getProducts();
      }).catch(() => {
        // ===== Toasts =====
        this.$bus.$emit('message:push',
          '產品刪除失敗',
          'danger');
        // ==================
      });
    },
    updateProduct() {
      // 要是有id，表示他為本來就已經有資料，只是要做更新，用forEach對原本的products中的id做比對，找出是哪一筆資料後做更新。
      if (this.tempProduct.id) {
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
        this.$http.patch(url, this.tempProduct).then(() => {
          // ===== Toasts =====
          this.$bus.$emit('message:push',
            '產品更新成功',
            'success');
          // ==================
          this.getProducts();
        }).catch(() => {
          // ===== Toasts =====
          this.$bus.$emit('message:push',
            '產品更新失敗',
            'danger');
          // ==================
        });
      } else {
        // 要是沒有id表示，這筆資料是要新加入的，使用Date().getTime()所摻生的數字作為id，再將tempProduct的資料新增至products中
        this.tempProduct.id = new Date().getTime();
        const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
        this.$http.post(url, this.tempProduct).then(() => {
          this.getProducts();
          // ===== Toasts =====
          this.$bus.$emit('message:push',
            '產品新增成功',
            'success');
          // ==================
        }).catch(() => {
          // ===== Toasts =====
          this.$bus.$emit('message:push',
            '產品新增失敗',
            'danger');
          // ==================
        });
      }
    },
    // 圖片上傳
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path);
          // ===== Toasts =====
          this.$bus.$emit('message:push',
            '圖片上傳成功',
            'success');
          // ==================
        }
      }).catch(() => {
        // ===== Toasts =====
        this.$bus.$emit('message:push',
          '圖片上傳失敗，上傳不可超過 2 MB',
          'danger');
        // ==================
        this.status.fileUploading = false;
      });
    },
  },
};
</script>
