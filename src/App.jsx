import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";

import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
