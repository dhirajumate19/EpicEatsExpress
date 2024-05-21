import { Box, styled } from "@mui/material";
import FormInput from "../../comman/userSigninUp/FormInput";
import SIgninUpButton from "../../comman/userSigninUp/Button";

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
const UserSignin = () => {
  return (
    <Box
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
    >
      <Box>
        <Title>Welcome to EpicEatsExpress 👋</Title>
        <Span>Please login with your details here</Span>
      </Box>
      <FormInput label="Email Address" type="email" />
      <FormInput label="Password" type="password" />
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
      <SIgninUpButton>Sign IN</SIgninUpButton>
    </Box>
  );
};
export default UserSignin;
