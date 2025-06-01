const cart = [];
const cartElement = document.getElementById("cart");
const totalElement = document.getElementById("total");

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  cartElement.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} грн`;
    cartElement.appendChild(li);
    total += item.price;
  });
  totalElement.textContent = total;
}

