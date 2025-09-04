import axios from "axios";
import { API_URL } from "./constants";

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

export async function getProduct(id) {
  const response = await axios.get(API_URL + "products/" + id);
  // GET http://localhost:5173/products/68a56c44111453c6a3e27620
  return response.data;
}

export async function addProduct(
  name,
  description,
  price,
  category,
  image,
  token
) {
  const response = await axios.post(
    API_URL + "products",
    {
      name,
      description,
      price,
      category,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
        // Bearer ajajdjaa
      },
    }
  );
  return response.data;
}

export async function updateProduct(
  id,
  name,
  description,
  price,
  category,
  image,
  token
) {
  // PUT http://localhost:5173/products/68a56c44111453c6a3e27620
  const response = await axios.put(
    API_URL + "products/" + id,
    {
      name,
      description,
      price,
      category,
      image,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
}

export async function deleteProduct(id, token) {
  // DELETE http://localhost:5173/products/68a56c44111453c6a3e27620
  const response = await axios.delete(API_URL + "products/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
}
