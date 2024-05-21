import { FormControl, Input, InputLabel } from "@mui/material";

const FormInput = ({ label, type = "text" }) => (
  <FormControl>
    <InputLabel>{label}</InputLabel>
    <Input type={type} />
  </FormControl>
);

export default FormInput;
