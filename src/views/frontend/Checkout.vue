<template>
  <div class="bg-light pt-5 pb-7">
    å
    <div class="container">
      <div class="row justify-content-center flex-md-row flex-column-reverse">
        <div class="col-md-6">
          <div class="bg-white p-4">
            <h4 class="font-weight-bold">1. Contact Form</h4>
            <p class="mt-4">Contact information</p>
            <form>
              <div class="form-group mb-0">
                <label for="ContactMail" class="text-muted mb-0">Email</label>
                <input
                  type="email"
                  class="form-control rounded-0"
                  id="ContactMail"
                  aria-describedby="emailHelp"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input rounded-0" id="ContactLorem" />
                <label
                  class="form-check-label"
                  for="ContactLorem"
                >Lorem ipsum dolor sit amet, consetetur</label>
              </div>
              <div class="form-group mb-2">
                <label for="ContactName" class="text-muted mb-0">Name</label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="ContactName"
                  placeholder="Carmen A. Rose"
                />
              </div>
              <div class="form-group">
                <label for="ContactPhone" class="text-muted mb-0">Phone</label>
                <input
                  type="text"
                  class="form-control rounded-0"
                  id="ContactPhone"
                  placeholder="0933-123-123"
                />
              </div>
            </form>
          </div>
          <div class="bg-white p-4 mt-3">
            <h4 class="font-weight-bold">2. Shipping Form</h4>
            <form>
              <p class="mt-4 mb-3">Shipping address</p>
              <div class="form-row">
                <div class="col">
                  <select id="inputState" class="form-control rounded-0">
                    <option selected>Country/Region</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="col">
                  <select id="inputState" class="form-control rounded-0">
                    <option selected>City</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                class="form-control rounded-0 mt-1"
                id="inputCity"
                placeholder="Address"
              />
              <p class="mt-4 mb-2">Payment</p>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  checked
                />
                <label class="form-check-label text-muted" for="gridRadios1">
                  <span>WebATM</span>
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                />
                <label class="form-check-label text-muted" for="gridRadios2">
                  <span>ATM</span>
                </label>
              </div>
              <div class="form-check mb-2">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                  value="option3"
                />
                <label class="form-check-label text-muted" for="gridRadios3">
                  <span>ApplePay</span>
                </label>
              </div>
            </form>
          </div>
          <div class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between
             align-items-md-center align-items-end w-100">
            <a href="./product.html" class="text-dark mt-md-0 mt-3">
              <i class="fas fa-chevron-left mr-2"></i> Lorem ipsum
            </a>
            <a href="./checkout-success.html" class="btn btn-dark py-3 px-7 rounded-0">
              Lorem ipsum
            </a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="border p-4 mb-4">
            <h4 class="mb-4">Order Detail</h4>
            <div class="d-flex">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                alt
                class="mr-2"
                style="width: 48px; height: 48px; object-fit: cover"
              />
              <div class="w-100">
                <div class="d-flex justify-content-between font-weight-bold">
                  <p class="mb-0">Lorem ipsum</p>
                  <p class="mb-0">x10</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted mb-0">
                    <small>NT$12,000</small>
                  </p>
                  <p class="mb-0">NT$12,000</p>
                </div>
              </div>
            </div>
            <div class="d-flex mt-2">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                alt
                class="mr-2"
                style="width: 48px; height: 48px; object-fit: cover"
              />
              <div class="w-100">
                <div class="d-flex justify-content-between font-weight-bold">
                  <p class="mb-0">Lorem ipsum</p>
                  <p class="mb-0">x10</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted mb-0">
                    <small>NT$12,000</small>
                  </p>
                  <p class="mb-0">NT$12,000</p>
                </div>
              </div>
            </div>
            <table class="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                  <td class="text-right border-0 px-0 pt-4">NT$24,000</td>
                </tr>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                  <td class="text-right border-0 px-0 pt-0 pb-4">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4">
              <p class="mb-0 h4 font-weight-bold">Total</p>
              <p class="mb-0 h4 font-weight-bold">NT$24,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
