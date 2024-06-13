import { Box, Button, Snackbar, styled } from "@mui/material";
import SigninUpButton from "../../comman/userSigninUp/Button";
import FormInput from "../../comman/userSigninUp/FormInput";
import useUserSignUpForm from "../../comman/customHooks/userSignupForm";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../StateManagement/context/AuthContext";
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

const UserSignUp = () => {
  const navigate = useNavigate();
  const { openAuth, setOpenAuth } = useContext(AuthContext);
  const { form, error, success, handleChange, handleSubmit } =
    useUserSignUpForm({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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
        maxWidth: "400px",
        margin: "auto",
        padding: 2,
        border: 1,
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        handleSubmit(e);
        if (success) {
          setIsSnackbarOpen(true);
          setOpenAuth(false);
        }
      }}
    >
      <Box sx={{ alignContent: "center" }}>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </Box>
      <FormInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormInput
        label="Phone Number"
        name="phoneNumber"
        type="number"
        value={form.phoneNumber}
        onChange={handleChange}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {error.name && <Box sx={{ color: "red" }}>{error.name}</Box>}
      {error.email && <Box sx={{ color: "red" }}>{error.email}</Box>}
      {error.password && <Box sx={{ color: "red" }}>{error.password}</Box>}
      {error.phoneNumber && (
        <Box sx={{ color: "red" }}>{error.phoneNumber}</Box>
      )}
      {error.general && <Box sx={{ color: "red" }}>{error.general}</Box>}

      <SigninUpButton type="submit">Sign Up</SigninUpButton>
      <Snackbar
        open={!isSnackbarOpen && success}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Signup successful!"
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default UserSignUp;
