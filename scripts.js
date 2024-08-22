document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <p><strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    function handleRemoveItem(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            cart.splice(index, 1); // Remove item from the cart array
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            updateCart(); // Refresh the cart display
        }
    }

    updateCart(); // Initial cart display

    cartItemsContainer.addEventListener('click', handleRemoveItem);

    document.querySelector('.order-form').addEventListener('submit', event => {
        event.preventDefault();

        const name = event.target.querySelector('input[name="name"]').value;
        const email = event.target.querySelector('input[name="email"]').value;
        const address = event.target.querySelector('input[name="address"]').value;

        if (name && email && address) {
            // Save order details
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            const order = {
                date: new Date().toISOString(),
                name,
                email,
                address,
                items: cart
            };
            orderHistory.push(order);
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

            // Clear cart and notify user
            localStorage.removeItem('cart'); // Clear the cart
            cart = []; // Clear the cart array
            updateCart(); // Refresh the cart display
            alert('Order placed successfully!');
            event.target.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
