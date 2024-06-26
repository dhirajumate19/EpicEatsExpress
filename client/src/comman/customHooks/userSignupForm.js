import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupSuccess,
} from "../../StateManagement/reducer/userSlice";
import { useNavigate } from "react-router-dom";

//pending validation at client side

const useUserSignUpForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
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

  const validation = ({ name, email, password, phoneNumber }) => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format!";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber) {
      errors.phoneNumber = "Phone Number is required!";
    } else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number must be exactly 10 digits!";
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
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validation(form);
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/signup",
        form
      );

      // Check if response has the expected structure
      if (
        response.data &&
        response.status === 201 &&
        response.data.meta.message === "New User Added"
      ) {
        console.log("User created successfully:", response.data.data.Record);
        dispatch(signupSuccess(response.data.data.Record));

        setSuccess(true);
        setError({});
      } else {
        console.log("Unexpected response format:", response);
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError({ general: err.response.data.meta.message });
        dispatch(signupFailure(err.response.data.message));
      } else {
        setError({ general: "Signup failed!" });
        dispatch(signupFailure("Signup failed!"));
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

export default useUserSignUpForm;
