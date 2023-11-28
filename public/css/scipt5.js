// Initialize variables
let email_id = null;
let grand_total = 0;
// Import the array from the exporting.js file


// Function to update quantity in the cart
function updateQuantity(productID, quantity) {
   // Implement AJAX request for updating quantity
   fetch('update_cart.php', {
      method: 'POST',
      body: JSON.stringify({ productID, quantity }),
      headers: {
         'Content-Type': 'application/json',
      },
   })
   .then(response => response.json())
   .then(data => {
      console.log(data.success_message);
      // Update the UI if necessary
   })
   .catch(error => {
      console.error('Error:', error);
   });
}

// Function to remove an item from the cart
function removeItem(productID) {
   // Implement AJAX request for removing an item
   fetch('remove_item.php', {
      method: 'POST',
      body: JSON.stringify({ cart_id: productID }),
      headers: {
         'Content-Type': 'application/json',
      },
   })
   .then(response => response.json())
   .then(data => {
      console.log(data.success_message);
      // Update the UI if necessary
   })
   .catch(error => {
      console.error('Error:', error);
   });
}

// Function to delete all items from the cart
function deleteAll() {
   // Implement AJAX request for deleting all items
   fetch('delete_all.php', {
      method: 'POST',
      body: JSON.stringify({ email_id }),
      headers: {
         'Content-Type': 'application/json',
      },
   })
   .then(response => response.json())
   .then(data => {
      console.log(data.success_message);
      // Update the UI if necessary
   })
   .catch(error => {
      console.error('Error:', error);
   });
}

// Function to continue shopping
function continueShopping() {
   // Redirect to the products page or perform any other action
   window.location.href = '/cart';
}

// Function to proceed to checkout
function checkout() {
   // Redirect to the payment page or perform any other action
   window.location.href = '/payment';
}

// Event listeners for buttons
document.getElementById('continueShoppingButton').addEventListener('click', continueShopping);
document.getElementById('checkoutButton').addEventListener('click', checkout);
