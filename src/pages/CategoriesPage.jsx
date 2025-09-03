import Header from "../components/Header";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../utils/api_categories";
import Swal from "sweetalert2";
import { toast } from "sonner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleAddCategory = async () => {
    // 2. trigger the API to create new product
    await addCategory(label);
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    toast.success(`Category ${label} has been added`);
    setLabel("");
  };

  const handleOpenModal = async (id) => {
    const category = await getCategory(id);
    Swal.fire({
      title: "Enter new label:",
      input: "text",
      inputValue: category.label,
      inputPlaceholder: "New category label",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a label!";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newLabel = result.value; // get value directly
        console.log(newLabel);

        await updateCategory(id, newLabel);
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        toast.success("Category has been updated");
      }
    });
  };

  const handleCategoryDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this Category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(id);
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);

        toast.success("Category has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="categories" title="Manage Categories" />
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight="bold">
          Categories
        </Typography>
        <Paper sx={{ p: 3, my: 2 }} variant="outlined">
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Category Name"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
            >
              Add
            </Button>
          </Box>
        </Paper>

        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "400px" }}>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow
                    key={category._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{category.label}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleOpenModal(category._id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleCategoryDelete(category._id);
                            console.log(category._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No category found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CategoriesPage;
