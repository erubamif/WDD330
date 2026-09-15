function getCartItems() {
  const items = JSON.parse(localStorage.getItem("so-cart"));
  return items || []; // guard against null when cart is empty
}

function renderCartContents() {
  const cartItems = getCartItems();

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `<li class="cart-card">Your cart is empty.</li>`;
    // also make sure any total/summary calculation is skipped or shows 0
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}