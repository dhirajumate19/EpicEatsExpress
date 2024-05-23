import { Box, styled } from "@mui/material";
import SIgninUpButton from "../../comman/userSigninUp/Button";
import FormInput from "../../comman/userSigninUp/FormInput";
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
    >
      <Box sx={{ alignContent: "center" }}>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </Box>
      <FormInput label="Full Name"></FormInput>
      <FormInput label="Email Address" type="email" />
      <FormInput label="Phone Number" type="number" />
      <FormInput label="Password" type="password" />
      <FormInput label="Address" />
      <FormInput label="Pin Code" type="Number" />
      <SIgninUpButton>Sign UP</SIgninUpButton>
    </Box>
  );
};
export default UserSignUp;
