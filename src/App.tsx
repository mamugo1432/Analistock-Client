import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Authors from "./pages/Authors/Authors";
import Layout from "./pages/Layout";

function App() {
  return (<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Layout/>}>
      <Route path="/authors" element={<Authors/>}/>
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>);
}

export default App;
