import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../public/Global_CSS/App.css";
import { getVenue } from "../redux/Slices/VenueSlice";
import CategoryListing from "./components/Admin/Categories/CategoryListing";
import CreateCategory from "./components/Admin/Categories/CreateCategory";
import CreateProduct from "./components/Admin/Products/CreateProduct";
import CreateVenue from "./components/Admin/Venues/CreateVenue";
import VenueListing from "./components/Admin/Venues/VenueListing";
import AdminLayout from "./layouts/AdminLayout";
import SignUp from "./pages/SignUp/SignUp";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getVenue("66ddbe1230eb38789ff94e22")).unwrap().then(res => {
      console.log(res)
      const root = document.documentElement;
      root.style.setProperty('--primary', `#${res?.venue?.color}`); // Example new color value
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Routes>
      <Route path="/signup" element={<AdminLayout children={<SignUp />} />} />

        <Route path="/manage/venues" element={<AdminLayout children={<VenueListing />} />} />
        <Route path="/manage/venues/add" element={<AdminLayout children={<CreateVenue />} />} />
        <Route path="/manage/venues/edit/:slug" element={<AdminLayout children={<CreateVenue />} />} />
        <Route path="/manage/venues/:slug/items" element={<AdminLayout children={<CategoryListing />} />} />
        <Route path="/manage/venues/:slug/category/add" element={<AdminLayout children={<CreateCategory />} />} />
        <Route path="/manage/venues/:slug/category/edit/:id" element={<AdminLayout children={<CreateCategory />} />} />
        <Route path="/manage/venues/:slug/category/product/add" element={<AdminLayout children={<CreateProduct />} />} />
        {/* <Route path="/categories" element={<AdminLayout><Category /></AdminLayout>} /> */}
      </Routes>
      {/* </BrowserRouter> */}
      {/* <Header />
      <PagesHeader />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div> */}

      <ToastContainer />
    </div>
  );
}

export default App;