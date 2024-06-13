import { Box, Button, Snackbar, styled } from "@mui/material";
import FormInput from "../../comman/userSigninUp/FormInput";
import SIgninUpButton from "../../comman/userSigninUp/Button";

import { useState } from "react";
import useUserSignInForm from "../../comman/customHooks/userSigninForm";
import { useNavigate } from "react-router-dom";

const Title = styled(Box)`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;
const Span = styled(Box)`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;
const UserSignin = ({ setOpenAuth }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { form, error, success, handleChange, handleSubmit } =
    useUserSignInForm({
      email: "",
      password: "",
    });
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(true);
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignContent: "center",
        maxWidth: "400px",
        margin: "auto",
        padding: 2,
        border: 1,
      }}
      onSubmit={(e) => {
        handleSubmit(e);
        if (success) {
          setIsSnackbarOpen(true);
          setOpenAuth(false);
          navigate("/");
        }
      }}
    >
      <Box>
        <Title>Welcome to EpicEatsExpress 👋</Title>
        <Span>Please login with your details here</Span>
      </Box>
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {error.email && <Box sx={{ color: "red" }}>{error.email}</Box>}
      {error.password && <Box sx={{ color: "red" }}>{error.password}</Box>}
      {error.general && <Box sx={{ color: "red" }}>{error.general}</Box>}
      <Box
        sx={{
          textAlign: "end",
          cursor: "pointer",
          color: "blue",
          fontSize: "14px",
          transition: "all 0.03s ease",
        }}
      >
        <p>Forget Password?</p>
      </Box>
      <SIgninUpButton type="submit">Sign In</SIgninUpButton>
      <Snackbar
        open={!isSnackbarOpen && success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Signin successful!"
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Box>
  );
};
export default UserSignin;
