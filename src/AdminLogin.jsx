// src/AdminLogin.js

import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import users from './users.json'; // Import the JSON file

const AdminLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values, { setSubmitting, setErrors }) => {
    const user = users.find(
      user => user.username === values.username && user.password === values.password
    );

    if (user) {
        localStorage.setItem("user",JSON.stringify(user))
      // Handle successful login
      navigate('/upload-book');

    } else {
      // Handle login failure
      setErrors({ username: 'Invalid username or password' });
    }

    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  margin="normal"
                  fullWidth
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  style={{ marginTop: 16 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
