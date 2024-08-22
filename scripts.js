document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const orderForm = document.getElementById('order-form');

    // Menu item "Add to Cart" event handler
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.parentElement.parentElement;
            const name = menuItem.getAttribute('data-name');
            const price = parseFloat(menuItem.getAttribute('data-price'));
            
            cart.push({ name, price });
            updateCart();
        });
    });

    // Remove item from cart
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="images/dish${index + 1}.jpg" alt="${item.name}">
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                </div>
            `;
        });

        // Update total
        cartItemsContainer.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;

        // Attach event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Handle form submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order submitted! Thank you.');
            cart.length = 0; // Clear the cart
            updateCart();
            orderForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const orderForm = document.getElementById('order-form');
    const orderHistoryContainer = document.getElementById('order-history');
    const menuToggle = document.getElementById('menu-toggle');

    // Menu Item Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.menu-item');
            const name = item.getAttribute('data-name');
            const price = parseFloat(item.getAttribute('data-price'));
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${name} has been added to your cart.`);
        });
    });

    // Update Cart
    function updateCart() {
        if (cartItemsContainer) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItemsContainer.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;
                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="images/dish${index + 1}.jpg" alt="${item.name}">
                        <p>${item.name} - $${item.price.toFixed(2)}</p>
                        <button class="remove-from-cart" data-index="${index}">Remove</button>
                    </div>
                `;
            });

            // Update total
            cartItemsContainer.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;

            // Attach event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });
            });
        }
    }

    // Handle Order Form Submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('customer-name').value;
            const address = document.getElementById('customer-address').value;
            const phone = document.getElementById('customer-phone').value;

            if (!name || !address || !phone) {
                alert('Please fill out all fields.');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            // Save order to history
            let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            orderHistory.push({ name, address, phone, items: cart, total });
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

            alert('Order submitted successfully!');
            localStorage.removeItem('cart'); // Clear cart
            updateCart();
            orderForm.reset();
        });
    }

    // Load Order History
    function loadOrderHistory() {
        if (orderHistoryContainer) {
            let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
            orderHistoryContainer.innerHTML = '';

            orders.forEach((order, index) => {
                orderHistoryContainer.innerHTML += `
                    <div class="order-item">
                        <h3>Order #${index + 1}</h3>
                        <p>Name: ${order.name}</p>
                        <p>Address: ${order.address}</p>
                        <p>Phone: ${order.phone}</p>
                        <ul>
                            ${order.items.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
                        </ul>
                        <p>Total: $${order.total.toFixed(2)}</p>
                    </div>
                `;
            });
        }
    }

    // Update cart on page load
    updateCart();

    // Load order history on page load
    loadOrderHistory();

    // Menu Toggle for Responsive Design
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('header').classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
});
