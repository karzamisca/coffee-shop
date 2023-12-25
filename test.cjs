async function deleteProduct() {
  try {
    const response = await fetch(
      `http://localhost:3000/coffee/6588896e4b2fb7403d1b3a91`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.error("Product deleted successfully!");
      // Optionally, you can fetch products again after deletion to refresh the product list
    } else {
      console.error("Failed to delete product.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
deleteProduct();
