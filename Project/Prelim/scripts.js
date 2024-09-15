let cart = [];
let editingIndex = -1;
let shippingFee = 0;

function addToCart() {
    const itemName = document.getElementById("itemName").value;
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const itemQuantity = parseInt(document.getElementById("itemQuantity").value);

    if (itemName && !isNaN(itemPrice) && !isNaN(itemQuantity)) {
        if (editingIndex === -1) {
           
            cart.push({ name: itemName, price: itemPrice, quantity: itemQuantity });
        } else {
           
            cart[editingIndex] = { name: itemName, price: itemPrice, quantity: itemQuantity };
            editingIndex = -1; 
        }

        updateCart();
        clearInputs();
    } else {
        alert("Please fill in all fields with valid data.");
    }
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = ""; 

    
    cart.forEach((item, index) => {
        const itemId = `item-${index}`;
        cartItems.innerHTML += `
           <div class="cart-item">
               <input type="checkbox" id="${itemId}" class="cart-checkbox" onclick="updateTotal()">
               <label for="${itemId}">
                   ${item.name} - ₱${item.price.toFixed(2)} x ${item.quantity}
               </label>
               <button class="edit-btn" onclick="editItem(${index})">Edit</button>
               <button onclick="removeFromCart(${index})">Delete</button>
           </div>`;
    });

    updateTotal();
}

function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-checkbox");
    let subtotal = 0;

   
    cartItems.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const item = cart[index];
            subtotal += item.price * item.quantity;
        }
    });

   
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("shippingFeeDisplay").innerText = shippingFee.toFixed(2);
    document.getElementById("totalPrice").innerText = (subtotal + shippingFee).toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCart();
}

function editItem(index) {
    const item = cart[index];

    
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("itemQuantity").value = item.quantity;

    editingIndex = index;
}

function clearInputs() {
  
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemQuantity").value = "";
}

document.getElementById("shippingFee").addEventListener("input", function() {
    shippingFee = parseFloat(this.value) || 0; 
    updateTotal(); 
});

function checkout() {
    const paymentMethod = document.getElementById("payment").value;
    const cartItems = document.querySelectorAll(".cart-checkbox");
    let subtotal = 0;

    cartItems.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const item = cart[index];
            subtotal += item.price * item.quantity;
        }
    });

   
    alert(`Checked out with payment method: ${paymentMethod}\nTotal amount: ₱${(subtotal + shippingFee).toFixed(2)}`);
}
