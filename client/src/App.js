import { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { lightTheme } from "./utils/theme";
import Authentication from "./components/Authentication";
import { useSelector } from "react-redux";
import { AuthContext } from "./StateManagement/context/AuthContext";

const Container = styled.div``;
function App() {
  const { openAuth } = useContext(AuthContext);
  const currentUser = useSelector((state) => state.user.currentUser);
  // const [openAuth, setOpenAuth] = useState(false);
  console.log("curretnUser", currentUser);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar currentUser={currentUser} />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {openAuth && <Authentication />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
