import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";

import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<ProductAdd />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
