<template>
  <div>
    <!-- loading 套件 -->
    <loading :active.sync="isLoading"></loading>
    <div id="app" class="container-fluid">
      <!-- 卡片元件 -->
      <!-- https://bootstrap.hexschool.com/docs/4.2/components/card/-->
      <div class="row mt-4">
        <!-- 迴圈放置處 -->
        <div v-for="(item, index) in products" :key="index" class="col-md-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark">{{ item.title }}</a>
              </h5>
              <!-- v-html:把html結構放進來 -->
              <p class="card-text text-truncate" v-html="item.content">
                {{ item.content }}
              </p>
              <!-- 標價 -->
              <div class="d-flex justify-content-between align-items-baseline">
                <div v-if="!item.price" class="h5">
                  {{ item.origin_price }} 元
                </div>
                <div v-else>
                  <del class="h6">原價 {{ item.origin_price }} 元</del>
                  <div class="h5">
                    現在只要 {{ item.price }} 元
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button type="button" class="btn btn-outline-secondary btn-sm"
               :disabled="status.loadingItem === item.id"
                @click="getProduct(item.id)">
                查看更多
                <span v-if="status.loadingItem === item.id"
                 class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
                :disabled="status.loadingItem === item.id" @click="addToCart(item.id)">
                加到購物車
                <span v-if="status.loadingItem === item.id"
                 class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看更多的彈出表單 -->
      <div id="productModal" class="modal fade" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title">
                {{ tempProduct.title }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="tempProduct.image" class="img-fluid" alt>
              <blockquote class="blockquote mt-3">
                <p class="mb-0" v-html="tempProduct.content"></p>
                <footer class="blockquote-footer text-right">
                  {{ tempProduct.description }}
                </footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div v-if="!tempProduct.price" class="h4">
                  {{ tempProduct.origin_price }} 元
                </div>
                <del v-if="tempProduct.price" class="h6">原價 {{ tempProduct.origin_price }} 元</del>
                <div v-if="tempProduct.price" class="h4">
                  現在只要 {{ tempProduct.price }} 元
                </div>
              </div>
              <select v-model="tempProduct.num" name class="form-control mt-3">
                <option value="0" disabled selected>
                  請選擇數量
                </option>
                <option v-for="num in 10" :key="num" :value="num">
                  選購 {{ num }} {{ tempProduct.unit }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
                小計
                <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
              </div>
              <button type="button" class="btn btn-primary"
               @click="addToCart(tempProduct.id, tempProduct.num)">
                <i v-if="tempProduct.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 購物車 -->
      <div class="my-5 row justify-content-center">
        <div class="col-md-6">
          <div class="text-right mb-3">
            <button type="button" class="btn btn-outline-danger btn-sm"
             @click="removeAllCartItem()">
              <i class="far fa-trash-alt"> 刪除所有品項</i>
            </button>
          </div>
          <table class="table">
            <thead>
              <th>刪除</th>
              <th>品名</th>
              <th width="150px">
                數量
              </th>
              <th>單位</th>
              <th>單價</th>
            </thead>
            <tbody v-if="carts.length">
              <tr v-for="item in carts" :key="item.product.id">
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm"
                   @click="removeCartItem(item.product.id)">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div
                    v-if="item.coupon"
                    class="text-success"
                  >
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-primary"
                        @click="quantityUpdata(item.product.id, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="text"
                      class="form-control text-center"
                      :value="item.quantity"
                      @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                    >
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-primary"
                        :disabled="item.quantity === 1"
                        @click="quantityUpdata(item.product.id, item.quantity - 1)"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </td>
                <td class="align-middle">
                  {{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.product.price }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-right">
                  總計
                </td>
                <td class="text-right">
                  {{ cartTotal }}
                </td>
              </tr>
              <tr v-if="coupon.enabled">
                <td
                  colspan="4"
                  class="text-right text-success"
                >
                  折扣價
                </td>
                <td class="text-right text-success">
                  {{ cartTotal * (coupon.percent / 100) }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              v-model="coupon_code"
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
            >
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCoupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 訂單 -->
      <div class="my-5 row justify-content-center">
        <!-- 建立 validation-observer 元件：v-slot 帶上預計回傳的回饋內容，驗證整體表單。 -->
        <validation-observer v-slot="{ invalid }" class="col-md-6">
          <!-- 表單送出改為使用 form submit 的方法 -->
          <form @submit.prevent="createOrder">
            <!-- 姓名 -->
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="username">姓名</label>
                <input id="username" v-model="form.name" type="text" class="form-control"
                 :class="classes">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- Email -->
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" class="form-control"
                 :class="classes">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- 電話 -->
            <div class="form-group">
              <validation-provider  v-slot="{ errors, classes }" rules="required|min:8">
                <label for="tel">電話</label>
                <input id="tel" v-model="form.tel" type="tel" class="form-control" :class="classes">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- 地址 -->
            <div class="form-group">
              <validation-provider v-slot="{ errors, classes }" rules="required">
                <label for="address">地址</label>
                <input id="address" v-model="form.address" type="text" class="form-control"
                 :class="classes">
                <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <!-- 購買方式 -->
            <div class="form-group">
              <label for="message">購買方式</label>
              <select v-model="form.payment" class="form-control" required>
                <option value="" disabled>
                  請選擇付款方式
                </option>
                <option value="WebATM">
                  WebATM
                </option>
                <option value="ATM">
                  ATM
                </option>
                <option value="CVS">
                  CVS
                </option>
                <option value="Barcode">
                  Barcode
                </option>
                <option value="Credit">
                  Credit
                </option>
                <option value="ApplePay">
                  ApplePay
                </option>
                <option value="GooglePay">
                  GooglePay
                </option>
              </select>
            </div>
            <!-- 留言 -->
            <div class="form-group">
              <label for="message">留言</label>
              <textarea id="message" v-model="form.message" class="form-control" cols="30" rows="3">
            </textarea>
            </div>
            <div class="text-right">
              <!-- 送出表單使用 submit 的方法，如果驗證未通過則 disabled 該按鈕 -->
              <button type="submit" class="btn btn-primary" :disabled="invalid">
                送出表單
              </button>
            </div>
          </form>
        </validation-observer>
      </div>

      <!-- 訂購完成視窗 -->
      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">完成訂單</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>恭喜你已完成訂單。</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  data() {
    return {
      products: [],
      tempProduct: {
        num: 0,
        imageUrl: [],
      },
      status: {
        loadingItem: '',
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      carts: {},
      cartTotal: 0,
      coupon: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(url).then((response) => {
        this.products = response.data.data;
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.isLoading = true;
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(url).then((response) => {
        this.tempProduct = response.data.data;
        this.$set(this.tempProduct, 'num', 0);
        this.status.loadingItem = '';
        // 打開productModal
        $('#productModal').modal('show');
        this.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http.post(url, cart).then(() => {
        this.status.loadingItem = '';
        this.$bus.$emit('message:push',
          '加入購物車成功 ',
          'success');
        // 關閉productModal
        $('#productModal').modal('hide');
        this.getCart();
      }).catch((error) => {
        this.status.loadingItem = '';
        const errorList = error.response.data.errors;
        errorList.forEach((err) => {
          this.$bus.$emit('message:push',
            `加入失敗 ${err}`,
            'danger');
        });
        // 關閉productModal
        $('#productModal').modal('hide');
      });
    },
    // 抓取購物車內容
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(url).then((response) => {
        this.carts = response.data.data;
        this.cartTotal = 0;
        this.carts.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity);
        });
        this.isLoading = false;
      });
    },
    // 增減商品數量
    quantityUpdata(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http.patch(url, data).then(() => {
        this.status.LoadingUpdateCart = '';
        this.isLoading = false;
        this.getCart();
      });
    },
    // 刪除購物車全部項目
    removeAllCartItem() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('message:push',
            '刪除成功',
            'success');
          this.getCart();
        });
    },
    // 刪除購物車項目
    removeCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(url).then(() => {
        this.isLoading = false;
        this.$bus.$emit('message:push',
          '刪除成功',
          'success');
        this.getCart();
      }).catch((error) => {
        console.log(error);
      });
    },
    // 新增訂單
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;

      this.$http.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 跳出訂購完成視窗
          $('#orderModal').modal('show');
          this.getCart();
        }
      });
    },
    // 使用優惠卷
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http.post(url, { code: this.coupon_code }).then((response) => {
        this.coupon = response.data.data;
        this.isLoading = false;
      }).catch((error) => {
        const errorData = error.response.data.errors;
        if (errorData) {
          errorData.code.forEach((err) => {
            this.$bus.$emit('message:push',
              `加入失敗 ${err}`,
              'danger');
          });
          this.isLoading = false;
        } else {
          const { message } = error.response.data;
          this.$bus.$emit('message:push',
            `加入失敗 ${message}`,
            'danger');
          this.isLoading = false;
        }
      });
    },
  },
};
</script>
