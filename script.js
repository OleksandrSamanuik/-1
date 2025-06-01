const cartList = document.getElementById("cart");
const totalElement = document.getElementById("total");

// Функція додавання товару в кошик
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Шукаємо товар у кошику
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // Якщо є — збільшуємо кількість
    existingItem.quantity += 1;
  } else {
    // Якщо нема — додаємо новий
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Функція відображення кошика
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} грн × ${item.quantity}`;

    // Кнопка для зменшення кількості
    const btnDecrease = document.createElement("button");
    btnDecrease.textContent = "-";
    btnDecrease.style.marginLeft = "10px";
    btnDecrease.onclick = () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Якщо кількість 1, видаляємо товар з кошика
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    };

    // Кнопка для повного видалення товару
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "×";
    btnRemove.style.marginLeft = "5px";
    btnRemove.onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    };

    li.appendChild(btnDecrease);
    li.appendChild(btnRemove);

    cartList.appendChild(li);

    total += item.price * item.quantity;
  });

  totalElement.textContent = total.toFixed(2) + " грн";
}

// Викликаємо рендер при завантаженні сторінки
document.addEventListener("DOMContentLoaded", renderCart);
