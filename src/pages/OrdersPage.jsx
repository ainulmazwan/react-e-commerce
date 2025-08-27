import { useState, useEffect } from "react";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import { getOrders, deleteOrder, updateOrder } from "../utils/api_orders";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { toast } from "sonner";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page loads

  const handleOrderDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        // delete product and the backend
        await deleteOrder(id);
        const updatedOrders = await getOrders();
        setOrders(updatedOrders);
        toast.success("Product has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell sx={{ minWidth: "150px" }}>Status</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell>No orders yet</TableCell>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>
                    {order.customerName}
                    <br />

                    {order.customerEmail}
                  </TableCell>
                  <TableCell>
                    {order.products.map((product) => (
                      <Typography>{product.name}</Typography>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        defaultValue={order.status}
                        disabled={order.status === "pending" ? true : false}
                        onChange={async (event) => {
                          updateOrder(order._id, event.target.value);
                          const updatedOrders = await getOrders();
                          setOrders(updatedOrders);
                          toast.success("Product has been updated");
                        }}
                      >
                        <MenuItem
                          value={"pending"}
                          disabled={order.status === "pending" ? false : true}
                        >
                          Pending
                        </MenuItem>
                        <MenuItem
                          value={"paid"}
                          disabled={order.status === "completed" ? true : false}
                        >
                          Paid
                        </MenuItem>
                        <MenuItem
                          value={"failed"}
                          disabled={order.status === "completed" ? true : false}
                        >
                          Failed
                        </MenuItem>
                        <MenuItem value={"completed"}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>{order.paid_at ? order.paid_at : ""}</TableCell>
                  <TableCell>
                    {order.status === "pending" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleOrderDelete(order._id);
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default OrdersPage;
