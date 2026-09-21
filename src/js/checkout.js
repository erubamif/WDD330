import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess(
  "so-cart",
  "#checkout-form"
);

checkout.init();

const zipInput = document.querySelector("#zip");

zipInput.addEventListener("blurS", () => {
  checkout.calculateOrderTotal();
});

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await checkout.checkout(form);

    console.log("Order submitted successfully:", response);

    alert("Order submitted successfully!");
  } catch (error) {
    console.error("There was an error submitting the order:", error);
    alert("There was a problem submitting your order.");
  }
});
