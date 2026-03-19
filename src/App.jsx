import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCustomer from "./pages/AddCustomer";
import Customers from "./pages/Customers";

function App() {
  return (<>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;