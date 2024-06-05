import { useState } from "react";
import axios from "axios";
//pending validation at client side

const useUserSignUpForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/signup",
        form
      );
      setSuccess(true);

      console.log(response.data);
    } catch (err) {
      setError(err.response.data.error || "Signup failed!");
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
