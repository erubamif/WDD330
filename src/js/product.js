import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// plays a short "bump" animation on the header cart icon
function animateCartIcon() {
  const cartIcon = document.querySelector(".cart");
  if (!cartIcon) return;

  // remove the class first in case the animation is still running,
  // then force a reflow so re-adding the class restarts the animation
  cartIcon.classList.remove("bump");
  void cartIcon.offsetWidth;
  cartIcon.classList.add("bump");

  // clean up the class once the animation finishes
  cartIcon.addEventListener(
    "animationend",
    () => cartIcon.classList.remove("bump"),
    { once: true }
  );
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
  animateCartIcon();
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);