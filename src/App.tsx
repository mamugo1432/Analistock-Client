import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </AuthProvider>
  </BrowserRouter>);
}

export default App;
