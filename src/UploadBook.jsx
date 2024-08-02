// src/UploadBook.jsx

import React, { useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { INDIAN_BOARDS, BOOK_CATEGORIES } from './constants';
import users from './users.json'; // Import the JSON file

const UploadBook = () => {
  const initialValues = {
    bookName: '',
    bookCategory: '',
    bookWriter: '',
    bookBoard: '',
    bookDescription: '',
    bookTitle: '',
    bookPage: '',
    bookSubject: '',
    bookClass: '',
    bookPageSize: '',
    file: null,
  };

  const validationSchema = Yup.object({
    bookName: Yup.string().required('Book name is required'),
    bookCategory: Yup.string().required('Book category is required'),
    bookWriter: Yup.string().required('Book writer is required'),
    bookBoard: Yup.string().required('Book board is required'),
    bookDescription: Yup.string().required('Book description is required'),
    bookTitle: Yup.string().required('Book title is required'),
    bookPage: Yup.number().required('Book page is required').positive().integer(),
    bookSubject: Yup.string().required('Book subject is required'),
    bookClass: Yup.string().required('Book class is required'),
    bookPageSize: Yup.string().required('Book page size is required'),
    file: Yup.mixed().required('Book PDF file is required')
      .test('fileType', 'Only PDF files are allowed', value => value && value.type === 'application/pdf'),
  });

  const handleUpload = (values, { setSubmitting }) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }


axios.get('http://localhost:3000').then((data)=>{
  console.log('data.data', data.data)
}).catch((err)=>{
  console.log('err', err)
})

    axios.post('https://erm-admin-server-l3x2.vercel.app/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // Handle successful upload
        alert("Book uploaded successfully")
        console.log('Book uploaded successfully', response);
        // Optionally, redirect or show a success message
      })
      .catch(error => {
        // Handle error
        console.error('Upload failed', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };


  const checkLogin = async()=>{
    const user = localStorage.getItem('user')

    const parseUser = JSON.parse(user)
    if (!user || !parseUser  )  window.location.replace('/')

    const match = users.find(
      user => user.username === parseUser.username && user.password === parseUser.password
    );

    console.log('match', match)
    
    if (!user || !parseUser || !match )  window.location.replace('/')

  }

  useEffect(()=>{
    checkLogin()
  },[])



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
            Upload Book
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpload}
          >
            {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
              <Form>
                <TextField
                  label="Book Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookName"
                  value={values.bookName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookName && Boolean(errors.bookName)}
                  helperText={touched.bookName && errors.bookName}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Book Category</InputLabel>
                  <Select
                    name="bookCategory"
                    value={values.bookCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bookCategory && Boolean(errors.bookCategory)}
                    label="Book Category"
                  >
                    {BOOK_CATEGORIES.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.bookCategory && errors.bookCategory && (
                    <div style={{ color: 'red', marginTop: 8 }}>{errors.bookCategory}</div>
                  )}
                </FormControl>
                <TextField
                  label="Book Writer"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookWriter"
                  value={values.bookWriter}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookWriter && Boolean(errors.bookWriter)}
                  helperText={touched.bookWriter && errors.bookWriter}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Book Board</InputLabel>
                  <Select
                    name="bookBoard"
                    value={values.bookBoard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.bookBoard && Boolean(errors.bookBoard)}
                    label="Book Board"
                  >
                    {INDIAN_BOARDS.map(board => (
                      <MenuItem key={board} value={board}>
                        {board}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.bookBoard && errors.bookBoard && (
                    <div style={{ color: 'red', marginTop: 8 }}>{errors.bookBoard}</div>
                  )}
                </FormControl>
                <TextField
                  label="Book Description"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookDescription"
                  value={values.bookDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookDescription && Boolean(errors.bookDescription)}
                  helperText={touched.bookDescription && errors.bookDescription}
                />
                <TextField
                  label="Book Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookTitle"
                  value={values.bookTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookTitle && Boolean(errors.bookTitle)}
                  helperText={touched.bookTitle && errors.bookTitle}
                />
                <TextField
                  label="Book Page"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookPage"
                  value={values.bookPage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookPage && Boolean(errors.bookPage)}
                  helperText={touched.bookPage && errors.bookPage}
                />
                <TextField
                  label="Book Subject"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookSubject"
                  value={values.bookSubject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookSubject && Boolean(errors.bookSubject)}
                  helperText={touched.bookSubject && errors.bookSubject}
                />
                <TextField
                  label="Book Class"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookClass"
                  value={values.bookClass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookClass && Boolean(errors.bookClass)}
                  helperText={touched.bookClass && errors.bookClass}
                />
                <TextField
                  label="Book Page Size"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="bookPageSize"
                  value={values.bookPageSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookPageSize && Boolean(errors.bookPageSize)}
                  helperText={touched.bookPageSize && errors.bookPageSize}
                />
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  style={{ marginTop: 16 }}
                />
                {touched.file && errors.file && (
                  <div style={{ color: 'red', marginTop: 8 }}>{errors.file}</div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  style={{ marginTop: 16 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Uploading...' : 'Upload Book'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadBook;
