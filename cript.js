const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart");
const totalElement = document.getElementById("total");

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  if (cartList && totalElement) renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} грн`;
    cartList.appendChild(li);
    total += item.price;
  });
  totalElement.textContent = total;
}
