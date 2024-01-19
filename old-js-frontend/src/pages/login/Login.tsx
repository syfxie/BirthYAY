import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {Button, TextField, Typography, Alert} from "@mui/material";

export default function Login() {

    const navigate = useNavigate();
    const {login} = useAuth();

    const validate = (values) => {
        const errors = {};
        if (!values.username) { errors.username = 'Required' }
        if (!values.password) { errors.password = 'Required' }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        validateOnChange: false,
        onSubmit: values => {
            console.log('Sophie log in: ', values);
            login(values.username, values.password);
        }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20', width:'80%' }}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />

                {formik.errors.username ? <Alert severity="error">{formik.errors.username}</Alert> : null}


                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                {formik.errors.password ? <Alert severity="error">{formik.errors.password}</Alert> : null}

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                >
                    Login
                </Button>

                <Button variant="contained"
                        color="primary"
                        style={{ marginTop: '1em', width: '40%' }}
                        onClick={() => navigate('/register')}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    );
}
