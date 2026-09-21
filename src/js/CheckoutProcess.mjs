import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (total, item) => total + Number(item.FinalPrice),
      0
    );

    const itemCount = document.querySelector(
      `${this.outputSelector} #item-count`
    );

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    itemCount.innerText = this.list.length;
    subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    if (this.list.length > 0) {
      this.shipping = 10 + (this.list.length - 1) * 2;
    } else {
      this.shipping = 0;
    }

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(
      `${this.outputSelector} #order-total`
    );

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: Number(item.FinalPrice),
      quantity: 1,
    }));
  }

  async checkout(form) {
    const order = formDataToJSON(form);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.items = this.packageItems(this.list);

    const externalServices = new ExternalServices();

    return externalServices.checkout(order);
  }
}
