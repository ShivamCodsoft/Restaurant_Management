let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let checkout = document.querySelector(".onclick-checkout");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let cart = []; // Initialize an empty cart array to store selected items
let email = null

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
async function postcheckout() {
  console.log("In frontend : ", cart);

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Add more headers if needed
      },
      body: JSON.stringify({ products: cart })
  };

  try {
      const response = await fetch('/checkoutPost', options);

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Post request done");
      // Handle the response data here
  } catch (error) {
      console.error('Error:', error);
      // Handle errors here
  }
}

checkout.addEventListener("click", () => {
  postcheckout()
});

closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});
function initializeCart() {
  cart = []; // Empty the cart
  updateCartOnHomePage();
}
let userCart = [];

// Add a function to retrieve the user's cart data when the page loads
async function fetchUserCart() {
  try {
    const response = await fetch('/user-cart'); // Create a server route to fetch the user's cart
    if (response.ok) {
      userCart = await response.json();
      updateCartOnHomePage();
    }
  } catch (error) {
    console.error('Error fetching user cart:', error);
  }
}

async function addToCart(key) {
  const productId = products[key].id;

  try {
    const response = await fetch('/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (response.ok) {
      const updatedCart = await response.json();
      userCart = updatedCart;
      updateCartOnHomePage();
    } else {
      console.error('Failed to add product to cart');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}
function updateCartOnHomePage() {
  listCard.innerHTML = ''; // Clear the cart list
  let totalPrice = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    // Create an element for each cart item
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <div><img src="images/${item.image}" alt="${item.name}" /></div>
      <div>${item.name}</div>
      <div>$${(item.price * item.quantity).toLocaleString()}</div>
      <div>
        <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <div class="count">${item.quantity}</div>
        <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
    `;
    console.log(cartItem);
    listCard.appendChild(cartItem);
    console.log(listCard);

    totalPrice += item.price * item.quantity;
    itemCount += item.quantity;
  });

  total.innerText = `$${totalPrice.toLocaleString()}`;
  quantity.innerText = itemCount;
}
function changeQuantity(id, newQuantity) {
  const cartItem = cart.find((item) => item.id === id);

  if (!cartItem) return;

  if (newQuantity <= 0) {
    // Remove item from cart if quantity is 0 or less
    cart = cart.filter((item) => item.id !== id);
  } else {
    cartItem.quantity = newQuantity;
  }

  updateCartOnHomePage();
}

// Initialize the cart
initializeCart();
let products = [
  {
    id: 1,
    name: "Fresh Salad",
    image: "1.PNG",
    price: 120,
  },
  {
    id: 2,
    name: "Chicken Special",
    image: "2.PNG",
    price: 240,
  },
  {
    id: 3,
    name: "PRODUCT NAME 3",
    image: "3.PNG",
    price: 200,
  },
  {
    id: 4,
    name: "PRODUCT NAME 4",
    image: "4.PNG",
    price: 280,
  },
  {
    id: 5,
    name: "PRODUCT NAME 5",
    image: "5.PNG",
    price: 320,
  },
  {
    id: 6,
    name: "PRODUCT NAME 6",
    image: "6.PNG",
    price: 350,
  },
  {
    id: 7,
    name: "PRODUCT NAME 7",
    image: "7.PNG",
    price: 250,
  },
  {
    id: 8,
    name: "PRODUCT NAME 8",
    image: "8.jpg",
    price: 300,
  },
  {
    id: 9,
    name: "PRODUCT NAME 9",
    image: "9.jpg",
    price: 200,
  },
  {
    id: 10,
    name: "PRODUCT NAME 10",
    image: "10.jpg",
    price: 120,
  },
  {
    id: 11,
    name: "PRODUCT NAME 11",
    image: "11.jpg",
    price: 350,
  },
  {
    id: 12,
    name: "PRODUCT NAME 12",
    image: "12.PNG",
    price: 230,
  },
];

let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
    
  });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
    let pro = {
      productID : key,
      name : products[key].name,
      price : products[key].price
    }
    cart.push(pro)
    
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

document.getElementById("total").addEventListener("click", function () {
  // Redirect to the login page
  window.location.href = "/login";
});
