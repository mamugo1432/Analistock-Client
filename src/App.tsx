import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Authors from "./pages/Authors/Authors";
import Layout from "./pages/Layout";
import FormAuthors from "./pages/FormAuthors/FormAuthors"
import { AuthorsProvider } from "./contexts/AuthorsContext";
import { RequireAuthAdmin } from "./guards/RequireAuthAdmin";
import { RequireAuth } from './guards/RequireAuth';
import { AdvicesProvider } from "./contexts/AdvicesContext";
import Advices from './pages/Advices/Advices';
import FormAdvices from "./pages/FormAdvices/FormAdvices"
import { StocksProvider } from "./contexts/StocksContext";
import FormStocks from "./pages/FormStocks/FormStocks";
import Stocks from "./pages/Stocks/Stocks";
import StockSeeMore from "./pages/StockSeeMore/StockSeeMore";
import { FavoritesStocksProvider } from "./contexts/FavoriteStocksContext";
import StockFavorite from "./pages/StockFavorite/StockFavorite";
import Error from "./pages/Error/Error";
import Users from "./pages/Users/Users";
import { UsersProvider } from "./contexts/UsersContext";
import FormUsers from "./pages/FormUsers/FormUsers";


function App() {
  return (<BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Navigate to="/stocks" replace/>} />

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


            {/**  ------ Rutas de Advices ------*/}

      <Route path="/advices" element={
        <RequireAuth>
          <AdvicesProvider>
            <Advices/>
          </AdvicesProvider>
        </RequireAuth>}/>

        <Route path="/advices/create" element={
          <RequireAuthAdmin>
            <AdvicesProvider>
                <FormAdvices mode="create"/>
            </AdvicesProvider>
        </RequireAuthAdmin>}/>

        <Route path="/advices/edit/:id" element={
          <RequireAuthAdmin>
            <AdvicesProvider>
              <FormAdvices mode="edit"/>
            </AdvicesProvider>
        </RequireAuthAdmin>}/>

        <Route path="/advices/delete/:id" element={
          <RequireAuthAdmin>
            <AdvicesProvider>
              <FormAdvices mode="delete"/>
            </AdvicesProvider>
        </RequireAuthAdmin>}/>

         {/**  ------ Rutas de Stocks ------*/}

      <Route path="/stocks" element={
          <StocksProvider>
            <Stocks/>
          </StocksProvider>
      }/> 

        <Route path="/stocks/create" element={
          <RequireAuthAdmin>
            <StocksProvider>
                <FormStocks mode="create"/>
            </StocksProvider>
        </RequireAuthAdmin>}/>

        <Route path="/stocks/edit/:id" element={
          <RequireAuthAdmin>
            <StocksProvider>
              <FormStocks mode="edit"/>
            </StocksProvider>
        </RequireAuthAdmin>}/>

        <Route path="/stocks/delete/:id" element={
          <RequireAuthAdmin>
            <StocksProvider>
              <FormStocks mode="delete"/>
            </StocksProvider>
        </RequireAuthAdmin>}/>

        <Route path="/stock/:id" element={
          <RequireAuth>
            <FavoritesStocksProvider>
            <StocksProvider>
              <StockSeeMore/>
            </StocksProvider>
            </FavoritesStocksProvider>
        </RequireAuth>}/>
        
{/** --------- Rutas de Acciones Favoritas ----------- */}

        <Route path="/favorites-stocks" element={
          <RequireAuth>
            <FavoritesStocksProvider>
              <StockFavorite/>
            </FavoritesStocksProvider>
        </RequireAuth>}/>

{/** --------- Rutas de Usuarios ----------- */}

          <Route path="/users" element={
          <RequireAuthAdmin>
              <Users/>
        </RequireAuthAdmin>}/>
          
          <Route path="/users/details/:id" element={
          <RequireAuth>
            <UsersProvider>
              <FormUsers mode="see"/>
            </UsersProvider>
        </RequireAuth>}/>

          <Route path="/users/delete/:id" element={
          <RequireAuth>
            <UsersProvider>
              <FormUsers mode="delete"/>
            </UsersProvider>
        </RequireAuth>}/>

          <Route path="/users/edit/:id" element={
          <RequireAuth>
            <UsersProvider>
              <FormUsers mode="edit"/>
            </UsersProvider>
        </RequireAuth>}/>
        
{/** --------- Rutas de Errores ----------- */}
          <Route path="/error" element={
              <Error/>
        }/>

        <Route path="/*" element={
              <Error/>
        }/>
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>);
}

export default App;
