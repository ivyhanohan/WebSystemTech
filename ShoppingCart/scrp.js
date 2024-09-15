let cartItems = [];  // Declare cartItems as let to allow reassignment
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

document.getElementById('add-to-cart').addEventListener('click', () => {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemName && itemPrice > 0 && itemQuantity > 0) {
        addItemToCart(itemName, itemPrice, itemQuantity);
        updateCart();
    } else {
        alert('Please enter valid item details');
    }
});

function addItemToCart(name, price, quantity) {
    const existingItemIndex = cartItems.findIndex(item => item.name === name);
    if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({ name, price, quantity, checked: false });
    }
}

function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += item.checked ? itemTotal : 0;  // Only count the total of checked items

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - P${item.price.toFixed(2)} x ${item.quantity}
            <div class="cart-item-buttons">
                <input type="checkbox" class="cart-item-checkbox" ${item.checked ? 'checked' : ''} onchange="toggleItemCheck(${index})">
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;

        cartItemsList.appendChild(listItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

function deleteItem(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function editItem(index) {
    const item = cartItems[index];
    const newName = prompt("Enter new name:", item.name);
    const newPrice = parseFloat(prompt("Enter new price:", item.price));
    const newQuantity = parseInt(prompt("Enter new quantity:", item.quantity));

    if (newName && newPrice > 0 && newQuantity > 0) {
        item.name = newName;
        item.price = newPrice;
        item.quantity = newQuantity;
        updateCart();
    } else {
        alert("Invalid input for editing item.");
    }
}

function toggleItemCheck(index) {
    cartItems[index].checked = !cartItems[index].checked;
    updateCart();
}

document.getElementById('checkout').addEventListener('click', () => {
    // Filter out the items that are checked
    const checkedItems = cartItems.filter(item => item.checked);

    if (checkedItems.length > 0) {
        let totalCheckout = 0;

        // Calculate the total of the checked items
        checkedItems.forEach(item => {
            totalCheckout += item.price * item.quantity;
        });

        alert(`Checked out successfully! Total: P${totalCheckout.toFixed(2)}`);

        // Remove the checked items from the cart
        cartItems = cartItems.filter(item => !item.checked);
        updateCart();
    } else {
        alert("No items selected for checkout.");
    }
});
