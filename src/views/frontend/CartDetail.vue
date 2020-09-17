<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 bg-white py-5" style="min-height: calc(100vh - 56px - 76px);">
        <div class="d-flex justify-content-between">
          <h2 class="mt-2">Cart Detail</h2>
        </div>
        <div class="d-flex mt-4 bg-light">
          <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" style="width: 120px; height: 120px; object-fit: cover;">
          <div class="w-100 p-3 position-relative">
            <a href="#" class="position-absolute" style="top: 16px; right: 16px;">
              <i class="fas fa-times"></i>
            </a>
            <p class="mb-0 font-weight-bold">Lorem ipsum</p>
            <p class="mb-1 text-muted" style="font-size: 14px;">Lorem ipsum dolor sit amet</p>
            <div class="d-flex justify-content-between align-items-center w-100">
              <div class="input-group w-50 align-items-center">
                <div class="input-group-prepend pr-1">
                  <a href="#"> <i class="fas fa-minus"></i></a>
                </div>
                <input type="text" class="form-control border-0 text-center my-auto
                 shadow-none bg-light px-0" placeholder=""
                  aria-label="Example text with button addon"
                   aria-describedby="button-addon1" value="1">
                <div class="input-group-append pl-1">
                  <a href="#"><i class="fas fa-plus"></i></a>
                </div>
              </div>
              <p class="mb-0 ml-auto">NT$12,000</p>
            </div>
          </div>
        </div>
        <div class="d-flex mt-4 bg-light">
          <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" alt="" style="width: 120px; height: 120px; object-fit: cover;">
          <div class="w-100 p-3 position-relative">
            <a href="#" class="position-absolute" style="top: 16px; right: 16px;">
              <i class="fas fa-times"></i>
              </a>
            <p class="mb-0 font-weight-bold">Lorem ipsum</p>
            <p class="mb-1 text-muted" style="font-size: 14px;">Lorem ipsum dolor sit amet</p>
            <div class="d-flex justify-content-between align-items-center w-100">
              <div class="input-group w-50 align-items-center">
                <div class="input-group-prepend pr-1">
                  <a href="#"> <i class="fas fa-minus"></i></a>
                </div>
                <input type="text" class="form-control border-0 text-center
                 my-auto shadow-none bg-light px-0" placeholder=""
                  aria-label="Example text with button addon"
                   aria-describedby="button-addon1" value="1">
                <div class="input-group-append pl-1">
                  <a href="#"><i class="fas fa-plus"></i></a>
                </div>
              </div>
              <p class="mb-0 ml-auto">NT$12,000</p>
            </div>
          </div>
        </div>
        <table class="table mt-4 text-muted">
          <tbody>
            <tr>
              <th scope="row" class="border-0 px-0 font-weight-normal">Lorem ipsum</th>
              <td class="text-right border-0 px-0">NT$24,000</td>
            </tr>
            <tr>
              <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">Lorem ipsum</th>
              <td class="text-right border-0 px-0 pt-0">NT$500</td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-between mt-4">
          <p class="mb-0 h4 font-weight-bold">Lorem ipsum</p>
          <p class="mb-0 h4 font-weight-bold">NT$24,500</p>
        </div>
        <router-link class="btn btn-dark btn-block mt-4 rounded-0 py-3"
         to="/checkout">
          寄送表單
        </router-link>
      </div>
    </div>
  </div>
</template>
