function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  if (!cartList || !totalElement) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} — ${item.price} грн × ${item.quantity}
      <button onclick="removeFromCart(${index})">❌</button>`;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalElement.textContent = total;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function toggleCart() {
  const box = document.getElementById("cart-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
}


document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const form = document.getElementById("order-form");
  const addressField = document.getElementById("address-field");
  const addressInput = document.getElementById("address");
  const result = document.getElementById("order-result");

  document.querySelectorAll('input[name="deliveryType"]').forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "pickup" && radio.checked) {
        addressField.style.display = "none";
        addressInput.required = false;
      } else {
        addressField.style.display = "block";
        addressInput.required = true;
      }
    });
  });

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) return alert("Кошик порожній!");

      const type = document.querySelector('input[name="deliveryType"]:checked').value;
      const address = addressInput.value;
      let message = `Замовлення: ${cart.map(i => `${i.name} x${i.quantity}`).join(", ")}`;
      message += `\nТип: ${type === "pickup" ? "Самовивіз" : "Доставка"}`;
      if (type === "delivery") message += `\nАдреса: ${address}`;
      result.textContent = "✅ Замовлення прийнято!";
      console.log(message);
      localStorage.removeItem("cart");
      renderCart();
    });
  }
});
