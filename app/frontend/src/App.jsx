import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddProduct from "./Pages/AddProduct";
import EmotionTester from "./Pages/EmotionTester"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="test-emotion" element={<EmotionTester />} />
      </Route>
    </Routes>
  );
}

export default App;
