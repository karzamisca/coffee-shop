// orderStatus.js

document.addEventListener("DOMContentLoaded", function () {
  // Function to load and display order status
  async function loadOrderStatus() {
    try {
      const storedUsername = localStorage.getItem("username");

      if (!storedUsername) {
        alert("Please log in to view your order status.");
        return;
      }

      // Make a fetch request to the server endpoint for fetching order status
      const response = await fetch(
        `http://localhost:3000/purchase/${storedUsername}`
      );
      const orderStatus = await response.json();

      if (orderStatus.length === 0) {
        document.getElementById("orderStatusContainer").innerHTML =
          "No orders found.";
        return;
      }

      const orderStatusContainer = document.getElementById(
        "orderStatusContainer"
      );
      orderStatusContainer.innerHTML = "";

      orderStatus.forEach((order) => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
        orderItem.innerHTML = `
        <hr/>
            <strong>Purchase Code:</strong> ${order.purchaseCode}<br>
            <strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}<br>
            <strong>Purchase Date:</strong>${order.purchaseDate}<br>
            <strong>Items:</strong>
          `;

        order.items.forEach((item) => {
          orderItem.innerHTML += `${item.quantity}x ${
            item.title
          } - $${item.price.toFixed(2)}<br>`;
        });

        orderStatusContainer.appendChild(orderItem);
      });
    } catch (error) {
      console.error("Error fetching order status:", error);
      alert("There was an error fetching your order status. Please try again.");
    }
  }

  loadOrderStatus();
});
