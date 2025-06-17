// Ключ для localStorage
const cartKey = 'cart';

// Масив товарів у кошику
const cart = [];

// Завантаження кошика з localStorage
function loadCart() {
  const saved = localStorage.getItem(cartKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    cart.length = 0;
    parsed.forEach(item => cart.push(item));
  }
}

// Збереження кошика у localStorage
function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Додавання товару у кошик
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  renderCart();
  
}

// Видалення товару з кошика
function removeFromCart(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
}

// Відображення кошика
function renderCart() {
  const cartList = document.getElementById('cart');
  const totalEl = document.getElementById('total');

  if (!cartList || !totalEl) return;

  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} грн × ${item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.style.marginLeft = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.onclick = () => removeFromCart(item.name);

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

// Показ або приховування кошика
function toggleCart() {
  const cartBox = document.getElementById('cart-box');
  if (cartBox) {
    cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
  }
}

// Завантаження кошика при завантаженні сторінки
window.onload = () => {
  loadCart();
  renderCart();

  const cartBox = document.getElementById('cart-box');
  if (cartBox) cartBox.style.display = 'none';
};

