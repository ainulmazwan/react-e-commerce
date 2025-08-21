import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CartPage = () => {
  const cartInLocalStorage = localStorage.getItem("cart");
  const [cart, setCart] = useState(
    cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
  );

  const handleProductRemove = (id) => {
    Swal.fire({
      title: "Are you sure you want to remove this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        const updatedCart = cart.filter((p) => p._id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    });
  };

  let total = 0;
  cart.forEach((product) => {
    total += product.quantity * product.price;
    console.log(total);
  });

  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          pt: 5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Cart
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            py: 3,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Button sx={{ px: 3 }} variant="outlined" component={Link} to="/">
            Home
          </Button>
          <Button sx={{ px: 3 }} variant="contained">
            Cart
          </Button>
        </Box>
      </Container>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((product) => (
              <TableRow key={product._id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">${product.price}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                  ${product.price * product.quantity}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleProductRemove(product._id);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                ${total}
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained">Checkout</Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
