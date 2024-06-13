import { Box, Button, Modal, Typography } from "@mui/material";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import AuthImage from "../assets/AuthImage.jpg";
import { Close } from "@mui/icons-material";
import { useContext, useState } from "react";
import UserSignUp from "./User/userSignup";
import UserSignin from "./User/userSignin";
import { AuthContext } from "../StateManagement/context/AuthContext";

const StyledContainer = styled(Box)`
  display: flex;
  background: ${({ theme }) => theme.bg};
  height: 100%;
`;
const StyeledLeft = styled(Box)`
  flex: 1;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledRight = styled(Box)`
  position: relative;
  flex: 0.9;
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    flex: 1;
  }
`;
const Logo = styled.img`
  position: absolute;
  top: 40px;
  left: 60px;
  z-index: 10;
`;
const Image = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
const CloseButton = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;
const Text = styled(Typography)`
display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
}`;
const TextButton = styled(Typography)`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;
const Authentication = () => {
  const { openAuth, setOpenAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(false);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <StyledContainer>
        <StyeledLeft>
          <Logo src={logo} />
          <Image src={AuthImage} />
        </StyeledLeft>
        <StyledRight>
          <CloseButton>
            <Close
              onClick={() => {
                setOpenAuth(false);
              }}
            />
          </CloseButton>
          {login ? (
            <>
              <UserSignin setOpenAuth={setOpenAuth} />
              <Text>
                {" "}
                Don't Have an Account?{" "}
                <TextButton onClick={() => setLogin(false)}>Sign Up</TextButton>
              </Text>
            </>
          ) : (
            <>
              <UserSignUp setOpenAuth={setOpenAuth} />
              <Text>
                Already have an account?{" "}
                <TextButton onClick={() => setLogin(true)}>Sign In</TextButton>
              </Text>
            </>
          )}
        </StyledRight>
      </StyledContainer>
    </Modal>
  );
};
export default Authentication;
