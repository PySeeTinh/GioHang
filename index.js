document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-container");
    const totalElement = document.querySelector(".total");
    const deleteSelectedButton = document.querySelector(".delete-selected");
    const checkoutButton = document.querySelector(".checkout-button");

    // Lấy dữ liệu giỏ hàng từ LocalStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Hiển thị giỏ hàng
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='cart-empty'>Giỏ hàng trống.</p>";
    } else {
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="item-left">
                    <input type="checkbox" class="select-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="item-info">
                        <span class="item-name">${product.name}</span>
                        <span class="item-price" data-price="${product.price}">${parseFloat(product.price).toLocaleString()} VND</span>
                    </div>
                </div>
                <div class="item-right">
                    <div class="quantity">
                        <button class="decrease">-</button>
                        <span class="quantity-value">1</span>
                        <button class="increase">+</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Hàm cập nhật tổng tiền
    function updateTotal() {
        let total = 0;
        const items = document.querySelectorAll(".cart-item");
        items.forEach((item) => {
            const checkbox = item.querySelector(".select-item");
            if (checkbox.checked) {
                const price = parseInt(item.querySelector(".item-price").dataset.price, 10);
                const quantity = parseInt(item.querySelector(".quantity-value").textContent, 10);
                total += price * quantity;
            }
        });
        totalElement.textContent = `Tổng tiền: ${total.toLocaleString()} VND`;
    }

    // Hiển thị hoặc ẩn nút xóa
    function toggleDeleteButton() {
        const selectedItems = document.querySelectorAll(".select-item:checked");
        deleteSelectedButton.style.display = selectedItems.length > 0 ? "block" : "none";
    }

    // Xóa các sản phẩm được chọn
    deleteSelectedButton.addEventListener("click", () => {
        const items = document.querySelectorAll(".cart-item");
        items.forEach((item, index) => {
            const checkbox = item.querySelector(".select-item");
            if (checkbox.checked) {
                item.remove();
                cart.splice(index, 1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotal();
        toggleDeleteButton();
    });

    // Thêm sự kiện tăng/giảm số lượng
    cartContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("increase")) {
            const quantityElement = e.target.previousElementSibling;
            quantityElement.textContent = parseInt(quantityElement.textContent, 10) + 1;
        } else if (e.target.classList.contains("decrease")) {
            const quantityElement = e.target.nextElementSibling;
            const currentQuantity = parseInt(quantityElement.textContent, 10);
            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
            }
        }
        updateTotal();
    });

    // Sự kiện checkbox
    cartContainer.addEventListener("change", (e) => {
        if (e.target.classList.contains("select-item")) {
            updateTotal();
            toggleDeleteButton();
        }
    });

    // Nút thanh toán
// Nút thanh toán
checkoutButton.addEventListener("click", () => {
// Xác nhận thanh toán
alert("Thanh toán thành công!");

// Lọc các sản phẩm chưa được chọn và cập nhật lại giỏ hàng
const items = document.querySelectorAll(".cart-item");
items.forEach((item, index) => {
    const checkbox = item.querySelector(".select-item");
    if (checkbox.checked) {
        // Xóa sản phẩm đã thanh toán
        item.remove();
        cart.splice(index, 1);
    }
});

// Cập nhật lại giỏ hàng trong localStorage
localStorage.setItem("cart", JSON.stringify(cart));

// Cập nhật lại tổng tiền và ẩn nút xóa
updateTotal();
toggleDeleteButton();
});

    });