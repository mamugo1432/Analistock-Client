import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Authors from "./pages/Authors/Authors";
import Layout from "./pages/Layout";
import FormAuthors from "./pages/FormAuthors/FormAuthors"
import { AuthorsProvider } from "./contexts/AuthorsContext";

function App() {
  return (<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Layout/>}>
      <Route path="/authors" element={<AuthorsProvider><Authors/></AuthorsProvider>}/>
      <Route path="/authors/edit/:id" element={<AuthorsProvider><FormAuthors mode={"edit"}/></AuthorsProvider>}/>
      <Route path="/authors/delete/:id" element={<AuthorsProvider><FormAuthors mode={"delete"}/></AuthorsProvider>}/>
      <Route path="/authors/create" element={<AuthorsProvider><FormAuthors mode={"create"}/></AuthorsProvider>}/>
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>);
}

export default App;
