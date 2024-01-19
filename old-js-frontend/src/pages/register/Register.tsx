import React from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik';
import { Button, TextField, Typography, InputAdornment, Alert } from "@mui/material";

import { useAuth } from "../../contexts/AuthContext";


export default function Register() {

    const navigate = useNavigate();
    const {register} = useAuth();

    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Required';
        } else if (values.username.length > 20) {
            errors.username = 'Must be 20 characters or less';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 8 || values.password.length > 20) {
            errors.password = 'Must be between 8 and 20 characters';
        }

        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (values.firstName.length > 20) {
            errors.firstName = 'Must be 20 characters or less';
        }

        if (!values.lastName) {
            errors.lastName = 'Required';
        } else if (values.lastName.length > 20) {
            errors.lastName = 'Must be 20 characters or less';
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.birthday) {
            errors.birthday = 'Required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthday)) {
            errors.birthday = 'Invalid date';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            birthday: '',
        },
        validate,
        validateOnChange: false,
        onSubmit: values => {
            register(values);
        }
    })

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%'}}>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>

            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width:'70%'}} onSubmit={formik.handleSubmit}>
                <TextField variant="outlined"
                           margin="normal"
                           size="small"
                           fullWidth
                           label="Email Address"
                           name="email"
                           type="email"
                           value={formik.values.email}
                           onChange={formik.handleChange}
                />
                {formik.errors.email ? <Alert severity="error">{formik.errors.email}</Alert> : null}

                <TextField variant="outlined"
                           margin="normal"
                           size="small"
                           fullWidth
                           label="Password"
                           name="password"
                           type="password"
                           value={formik.values.password}
                           onChange={formik.handleChange}
                />
                {formik.errors.password ? <Alert severity="error">{formik.errors.password}</Alert> : null}


                <TextField variant="outlined"
                           margin="normal"
                           size="small"
                           fullWidth
                           label="Username"
                           name="username"
                           value={formik.values.username}
                           onChange={formik.handleChange}
                />
                {formik.errors.username ? <Alert severity="error">{formik.errors.username}</Alert> : null}

                <TextField variant="outlined"
                           margin="normal"
                           name="firstName"
                           size="small"
                           fullWidth

                           label="First Name"
                           value={formik.values.firstName}
                           onChange={formik.handleChange}
                />
                {formik.errors.firstName ? <Alert severity="error">{formik.errors.firstName}</Alert> : null}

                <TextField variant="outlined"
                           margin="normal"
                           size="small"
                           name="lastName"
                           fullWidth

                           label="Last Name"
                           value={formik.values.lastName}
                           onChange={formik.handleChange}
                />
                {formik.errors.lastName ? <Alert severity="error">{formik.errors.lastName}</Alert> : null}

                <TextField variant="outlined"
                           margin="normal"
                           fullWidth
                           size="small"
                           hiddenLabel
                           name="birthday"
                           label="Birthday"
                           type="date"
                           value={formik.values.birthday}
                           onChange={formik.handleChange}
                           InputProps={{
                               startAdornment: <InputAdornment position="start"></InputAdornment>,
                           }}
                />
                {formik.errors.birthday ? <Alert severity="error">{formik.errors.birthday}</Alert> : null}


                <Button type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1em', width: '40%' }}
                >
                    Sign Up
                </Button>

                <Button variant="contained"
                        color="primary"
                        style={{ marginTop: '1em', width: '40%' }}
                        onClick={() => navigate('/login')}
                >
                    Log In
                </Button>
            </form>
        </div>
    );
}
