let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
}

function showCart() {
  const cartSection = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("total");

  cartItems.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price} грн`;
    cartItems.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum;
  cartSection.classList.remove("hidden");
}

function checkout() {
  alert("Замовлення з доставкою оформлено!");
  cart = [];
  updateCart();
  document.getElementById("cart").classList.add("hidden");
}

function pickup() {
  alert("Замовлення з самовивозом оформлено!");
  cart = [];
  updateCart();
  document.getElementById("cart").classList.add("hidden");
}
