import { Container, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginComponent = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Form submission handler
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Container maxWidth="sm" className="magic-login-container">
      <h2>Welcome to the ONLY-HE Dashboard!</h2>
      <p>Enter your credentials to continue your journey</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="login-form">
            <Field
              as={TextField}
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.email && !!errors.email}
              helperText={<ErrorMessage name="email" />}
            />
            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
            />
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginComponent;
