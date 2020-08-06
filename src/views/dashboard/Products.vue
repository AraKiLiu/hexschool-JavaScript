<template>
  <div class="container mt-3">
    <div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 產品列表
      products: [],
    };
  },
  props: ['token'],
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.$http.get(url).then((response) => {
        console.log(response);
        this.products = response.data.data; // 取得產品列表
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
