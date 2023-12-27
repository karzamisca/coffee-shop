document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  fetchDeleteProducts();
});
// Function to authenticate admin credentials
function authenticateAdmin(username, password) {
  return fetch("http://localhost:3000/adminCredential")
    .then((response) => response.json())
    .then((credentials) => {
      const foundAdmin = credentials.find(
        (cred) => cred.username === username && cred.password === password
      );
      return foundAdmin ? true : false;
    })
    .catch((error) => {
      console.error("Error fetching admin credentials:", error);
      return false;
    });
}

// Function to handle admin login form submission
function adminLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  authenticateAdmin(username, password).then((isAuthenticated) => {
    if (isAuthenticated) {
      // Store authentication status in localStorage
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", username);
      window.location.href = "adminPage.html"; // Redirect to admin page on successful login
    } else {
      alert("Invalid admin credentials. Please try again.");
    }
  });
}

// Function to log out admin (clears authentication status and redirects to admin login page)
function adminLogout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "adminLogin.html";
}

// Function to check if admin is logged in
function checkAdminLogin() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "adminLogin.html"; // Redirect to admin login page if not logged in
  } else {
    loadProducts(); // Load products if admin is logged in
  }
}

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/coffee");
    const products = await response.json();
    populateProductSelect(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Populate the product select dropdown with fetched products
function populateProductSelect(products) {
  const productSelect = document.getElementById("productSelect");

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product._id;
    option.textContent = product.title;
    productSelect.appendChild(option);
  });
}

// Function to update the title of selected product
async function updateTitle() {
  const selectedProductId = document.getElementById("productSelect").value;
  const title = document.getElementById("titleInput").value;

  if (title) {
    try {
      const response = await fetch(
        `http://localhost:3000/coffee/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: title }),
        }
      );

      if (response.ok) {
        alert("Title updated successfully!");
      } else {
        alert("Title updated.");
      }
    } catch (error) {
      console.error("Error updating title:", error);
      alert("Error updating title.");
    }
    window.location.reload();
  } else {
    alert("Please enter a valid title!");
  }
}

// Function to update the price of selected product
async function updatePrice() {
  const selectedProductId = document.getElementById("productSelect").value;
  const price = parseFLoat(document.getElementById("priceInput").value);

  if (!isNaN(price)) {
    try {
      const response = await fetch(
        `http://localhost:3000/coffee/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: price }),
        }
      );

      if (response.ok) {
        alert("Price updated successfully!");
      } else {
        alert("Price updated.");
      }
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Error updating price.");
    }
    window.location.reload();
  } else {
    alert("Please enter a valid price!");
  }
}

// Function to update the quantity of selected product
async function updateQuantity() {
  const selectedProductId = document.getElementById("productSelect").value;
  const quantity = parseInt(document.getElementById("quantityInput").value);

  if (!isNaN(quantity)) {
    try {
      const response = await fetch(
        `http://localhost:3000/coffee/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantityInStorage: quantity }),
        }
      );

      if (response.ok) {
        alert("Quantity updated successfully!");
      } else {
        alert("Quantity updated.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Error updating quantity.");
    }
    window.location.reload();
  } else {
    alert("Please enter a valid quantity!");
  }
}

// Function to update the title of selected product
async function updateImage() {
  const selectedProductId = document.getElementById("productSelect").value;
  const image = document.getElementById("imageInput").value;

  if (image) {
    try {
      const response = await fetch(
        `http://localhost:3000/coffee/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        }
      );

      if (response.ok) {
        alert("Image updated successfully!");
      } else {
        alert("Image updated.");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Error updating image.");
    }
    window.location.reload();
  } else {
    alert("Please enter a valid image url!");
  }
}

//Funtion to switch to customer login
function switchToCustomer() {
  window.location.href = "../login.html";
}
// Check if admin is logged in and load products on page load
window.onload = function () {
  checkAdminLogin();
};

// Function to add a new product
async function addNewProduct() {
  const title = document.getElementById("newTitleInput").value;
  const price = parseFloat(document.getElementById("newPriceInput").value);
  const quantity = parseInt(document.getElementById("newQuantityInput").value);
  const image = document.getElementById("newImageInput").value; // New image field

  if (title && !isNaN(price) && !isNaN(quantity) && image) {
    try {
      const response = await fetch("http://localhost:3000/coffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          price: price,
          quantityInStorage: quantity,
          image: image, // Include image in the request payload
        }),
      });

      if (response.ok) {
        alert("New product added successfully!");
      } else {
        alert("Failed to add new product.");
      }
    } catch (error) {
      console.error("Error adding new product:", error);
      alert("Error adding new product.");
    }
  } else {
    alert(
      "Please enter valid details for the new product, including an image URL!"
    );
  }
  window.location.reload();
}

// Function to fetch products for delete dropdown
async function fetchDeleteProducts() {
  try {
    const response = await fetch("http://localhost:3000/coffee");
    const products = await response.json();
    populateDeleteProductSelect(products);
  } catch (error) {
    console.error("Error fetching products for delete:", error);
  }
}

// Populate the delete product select dropdown with fetched products
function populateDeleteProductSelect(products) {
  const deleteProductSelect = document.getElementById("deleteProductSelect");

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product._id;
    option.textContent = product.title;
    deleteProductSelect.appendChild(option);
  });
}

// Function to delete a product
async function deleteProduct() {
  const selectedProductId = document.getElementById(
    "deleteProductSelect"
  ).value;
  try {
    const response = await fetch(
      `http://localhost:3000/coffee/${selectedProductId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Product deleted successfully!");
    } else {
      alert("Failed to delete product.");
    }
    window.location.reload();
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Error deleting product.");
  }
}
