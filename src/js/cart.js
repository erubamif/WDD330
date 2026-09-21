import { getLocalStorage } from "./utils.mjs";

function getCartItems() {
  const items = getLocalStorage("so-cart");
  return items || [];
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
    <p class="cart-card__price">$${Number(item.FinalPrice).toFixed(2)}</p>
  </li>`;
}

function renderCartContents() {
  const cartItems = getCartItems();
  const productList = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML =
      `<li class="cart-card divider">Your cart is empty.</li>`;
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0
  );

  const totalElement = document.createElement("p");
  totalElement.classList.add("cart-total");
  totalElement.innerHTML = `<strong>Cart Total: $${total.toFixed(2)}</strong>`;

  productList.insertAdjacentElement("afterend", totalElement);
}

renderCartContents();