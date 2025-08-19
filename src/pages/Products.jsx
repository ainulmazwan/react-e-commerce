import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  // useEffect
  useEffect(() => {
    // get movies from API
    getProducts(category).then((data) => {
      setProducts(data);
      console.log(data);
    });
  }, [category]);

  return (
    <>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Welcome to My Store
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Products
        </Typography>
        <Button color="success" variant="contained">
          Add New
        </Button>
      </Box>
      <Box sx={{ px: "30px", py: "10px" }}>
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
            }}
          >
            <MenuItem value={"all"}>All Categories</MenuItem>
            <MenuItem value={"Games"}>Games</MenuItem>
            <MenuItem value={"Accessories"}>Accessories</MenuItem>
            <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            <MenuItem value={"Consoles"}>Consoles</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ px: "30px" }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Card sx={{ p: "30px" }}>
                <Typography sx={{ fontWeight: "bold" }}>
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
      </Box>
    </>
  );
}
