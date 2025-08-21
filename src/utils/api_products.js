import axios from "axios";

const API_URL = "http://localhost:5123/";

export async function getProducts(category, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (category === "all" ? "" : "&category=" + category)
  );
  // http://localhost:5123/products?page=1&category=Consoles
  return response.data;
}

export function getProduct() {}

export async function addProduct(name, description, price, category) {
  const response = await axios.post(API_URL + "products", {
    name,
    description,
    price,
    category,
  });
  return response.data;
}

export function updateProduct() {}

export function deleteProduct() {}
