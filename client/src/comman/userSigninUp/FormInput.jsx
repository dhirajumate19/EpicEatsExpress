import { FormControl, Input, InputLabel, TextField } from "@mui/material";

const FormInput = ({ label, type = "text", name, value, onChange }) => (
  <TextField
    label={label}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth
  />
);
export default FormInput;
