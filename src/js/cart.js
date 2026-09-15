import { getLocalStorage } from "./utils.mjs";

function getCartItems() {
  const items = getLocalStorage("so-cart");
  return items || []; // guard against null when cart is empty
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
}

function renderCartContents() {
  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      `<li class="cart-card divider">Your cart is empty.</li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

renderCartContents();b