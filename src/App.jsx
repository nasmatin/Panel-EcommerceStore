import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import DashBoard from "./dashboard/DashboardLayout";
import Home from "./dashboard/Home";
import Order from "./dashboard/Order";
import NotFound from "./dashboard/NotFound";
import Costumer from "./dashboard/Costumer";
import AddProduct from "./dashboard/ProductLayout/AddProduct";
import ProductList from "./dashboard/ProductLayout/ProductList";
import AddCategory from "./dashboard/CategoryLayout/AddCategory";
import CategoryList from "./dashboard/CategoryLayout/CategoryList";
import Login from "./Login";
import ProductDetail from "./components/ProductDetail";
import CategoryDetails from "./components/CategoryDetail";
import CostumerDetail from "./components/CostumerDetail";
import OrderDetail from "./components/OrderDetail";
//mport OrderItem from "./components/OrderItem";
import "./css/main.css";

function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Login />}/>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashBoard />} >

        <Route index element={<Home />} />
        <Route path="product/addproduct" element={<AddProduct />} />
        <Route path="product/productlist" element={<ProductList />} />
        <Route path="product/productdetail/:id" element={<ProductDetail />} />
        <Route path="category/addcategory" element={<AddCategory />} />
        <Route path="category/categorylist" element={<CategoryList />} />
                <Route path="category/categorydetail/:id" element={<CategoryDetails />} />

        <Route path="order" element={<Order />} />
                <Route path="order/orderdetail/:ordernumber" element={<OrderDetail />} />

        <Route path="costumer" element={<Costumer />} />
          <Route path="costumer/costumerdetail/:id" element={<CostumerDetail />} />
      </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
