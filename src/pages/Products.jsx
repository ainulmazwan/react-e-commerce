import { Link } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { getProducts } from "../utils/api_products";
import { useState, useEffect } from "react";

import Header from "../components/Header";

export default function Products() {
  // to store data from /products
  const [products, setProducts] = useState([]);
  // to track which page the user is in
  const [page, setPage] = useState(1);
  // to track which category to filter
  const [category, setCategory] = useState("all");

  // useEffect
  useEffect(() => {
    // get movies from API
    getProducts(category, page).then((data) => {
      setProducts(data);
      console.log(data);
    });
  }, [category, page]);

  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Products
        </Typography>
        <Button
          component={Link}
          to="/products/new"
          color="success"
          variant="contained"
        >
          Add New
        </Button>
      </Container>
      <Container sx={{ px: "30px", py: "10px" }}>
        <FormControl sx={{ minWidth: "250px" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{ backgroundColor: "white", paddingRight: "5px" }}
          >
            Filter By Category
          </InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(event) => {
              setCategory(event.target.value);
              // reset page back to 1
              setPage(1);
            }}
          >
            <MenuItem value={"all"}>All Categories</MenuItem>
            <MenuItem value={"Games"}>Games</MenuItem>
            <MenuItem value={"Accessories"}>Accessories</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            <MenuItem value={"Consoles"}>Consoles</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container sx={{ px: "30px" }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Card sx={{ p: "30px" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", minHeight: "64px" }}
                >
                  {product.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: "15px",
                  }}
                >
                  <Chip
                    label={`$${product.price}`}
                    color="success"
                    variant="outlined"
                  ></Chip>
                  <Chip
                    label={product.category}
                    color="warning"
                    variant="outlined"
                  ></Chip>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                >
                  Add to Cart
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: "15px",
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ borderRadius: 5 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ borderRadius: 5 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        {products.length === 0 ? (
          <Typography variant="h5" align="center" py={3}>
            No more products found
          </Typography>
        ) : null}
        <Box
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={page === 1 ? true : false} // button will disable if page is 1
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            variant="contained"
            disabled={products.length === 0 ? true : false} // button will disable if no more products
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
