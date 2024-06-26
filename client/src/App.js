import { useContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { lightTheme } from "./utils/theme";
import Authentication from "./components/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./StateManagement/context/AuthContext";

import Cart from "./components/cart/cart";
import Favorites from "./components/Favourites";
import FoodListing from "./components/Foods/FoodListing";
import FoodDetails from "./components/Foods/FoodDeatils";
import { logout } from "./StateManagement/reducer/userSlice";

const Container = styled.div``;
function App() {
  const { openAuth } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.user.currentUser);
  // const [openAuth, setOpenAuth] = useState(false);
  console.log("curretnUser", currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear localStorage and dispatch logout action on page load
    localStorage.clear();
    dispatch(logout());
  }, [dispatch]);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar currentUser={currentUser} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dishes" element={<FoodListing />} />
            <Route path="/dishes/:id" element={<FoodDetails />} />
          </Routes>
          {openAuth && <Authentication />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
