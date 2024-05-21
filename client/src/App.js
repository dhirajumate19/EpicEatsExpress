import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { lightTheme } from "./utils/theme";
import Authentication from "./components/Authentication";
import { useSelector } from "react-redux";
const Container = styled.div``;
function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [openAuth, setOpenAuth] = useState(false);
  console.log("oauth", openAuth);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
