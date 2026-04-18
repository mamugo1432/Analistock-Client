import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Authors from "./pages/Authors/Authors";
import Layout from "./pages/Layout";
import FormAuthors from "./pages/FormAuthors/FormAuthors"
import { AuthorsProvider } from "./contexts/AuthorsContext";
import { RequireAuthAdmin } from "./guards/RequireAuthAdmin";

function App() {
  return (<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Layout/>}>

    {/**  ------ Rutas de Authors ------*/}

      <Route path="/authors" element={
        <RequireAuthAdmin>
          <AuthorsProvider>
            <Authors/>
          </AuthorsProvider>
        </RequireAuthAdmin>}/>

      <Route path="/authors/edit/:id" element={
        <RequireAuthAdmin>
          <AuthorsProvider>
            <FormAuthors mode={"edit"}/>
          </AuthorsProvider>
        </RequireAuthAdmin>}/>
      
      <Route path="/authors/delete/:id" element={
        <RequireAuthAdmin>
          <AuthorsProvider>
            <FormAuthors mode={"delete"}/>
          </AuthorsProvider>
        </RequireAuthAdmin>}/>

      <Route path="/authors/create" element={
        <RequireAuthAdmin>
          <AuthorsProvider>
            <FormAuthors mode={"create"}/>
          </AuthorsProvider>
        </RequireAuthAdmin>}/>
        
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>);
}

export default App;
