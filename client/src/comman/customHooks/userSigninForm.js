import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../../StateManagement/reducer/userSlice";

const useUserSignInForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (error[name]) {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
    }
  };

  const validation = ({ email, password }) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format!";
    }
    const passwordMinLength = 6;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < passwordMinLength) {
      errors.password = `Password must be at least ${passwordMinLength} characters long!`;
    } else if (!specialCharRegex.test(password)) {
      errors.password = "Password must contain at least one special character!";
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validation(form);

    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/signin",
        form
      );
      const { token, UserDetail } = await response.data.data;
      // console.log("data token", response.data.token["accessToken"]);
      console.log(response.data);
      dispatch(signinSuccess({ user: UserDetail.data, token }));
      setSuccess(true);
      setError({});
    } catch (err) {
      console.log("error in catch", err);
      if (err.response && err.response.data) {
        setError({ general: err.response.data.meta.message });
      } else {
        setError({ general: "Signup failed!" });
      }
      setSuccess(false);
    }
  };
  return {
    form,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};
export default useUserSignInForm;
