import axios from "axios";

import { API_URL } from "./constants";

export const getOrders = async () => {
  const response = await axios.get(API_URL + "orders");
  return response.data;
};

export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  const response = await axios.post(API_URL + "orders", {
    customerName,
    customerEmail,
    products,
    totalPrice,
  });

  return response.data;
};

export async function updateOrder(id, status) {
  // PUT http://localhost:5173/products/68a56c44111453c6a3e27620
  const response = await axios.put(API_URL + "orders/" + id, {
    status,
  });
  return response.data;
}

export async function deleteOrder(id) {
  // DELETE http://localhost:5173/products/68a56c44111453c6a3e27620
  const response = await axios.delete(API_URL + "orders/" + id);
  return response.data;
}
