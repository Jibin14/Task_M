import { Container, Card, Form, Button } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../axios";
import "./Login.css";

const Register = () => {

    const { Formik } = formik;

    const navigate = useNavigate();

    const schema = yup.object().shape({

        fullName: yup
            .string()
            .required("Please enter your name")
            .min(3, "At least 3 characters needed"),

        email: yup
            .string()
            .required("Please enter your email")
            .email("Please enter a valid email"),

        password: yup
            .string()
            .required("Please enter your password"),
    });

    // Register Submit
    const handleRegister = async (values) => {

        try {

            const { data } = await instance.post(
                "/users/register",
                values
            );

            toast.success(data?.message);

            navigate("/");

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message
            );
        }
    };

    return (

        <div className="login-page position-relative">

            {/* Register Card */}
            <Container className="d-flex justify-content-center align-items-center login-container">

                <Card className="login-card">

                    <Card.Body>

                        {/* Title */}
                        <div className="text-center">

                            <h2 className="login-title">
                                Register
                            </h2>

                            <p className="login-subtitle">
                                Welcome! Sign up using your
                                social account or email to continue
                            </p>

                        </div>

                        {/* Social Icons */}
                        <div className="social-icons">

                            <div className="social-btn">
                                <FaFacebook />
                            </div>

                            <div className="social-btn">
                                <FcGoogle />
                            </div>

                            <div className="social-btn">
                                <SiApple />
                            </div>

                        </div>

                        {/* Formik */}
                        <Formik

                            validationSchema={schema}

                            initialValues={{
                                fullName: "",
                                email: "",
                                password: "",
                            }}

                            onSubmit={handleRegister}

                        >

                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                            }) => (

                                <Form
                                    noValidate
                                    onSubmit={handleSubmit}
                                    className="login-form"
                                >

                                    {/* Full Name */}
                                    <Form.Group className="mb-4">

                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={
                                                touched.fullName &&
                                                !!errors.fullName
                                            }
                                            className="custom-input"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.fullName}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-4">

                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={
                                                touched.email &&
                                                !!errors.email
                                            }
                                            className="custom-input"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group className="mb-4">

                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={
                                                touched.password &&
                                                !!errors.password
                                            }
                                            className="custom-input"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    {/* Submit */}
                                    <div className="text-center mt-4">

                                        <Button
                                            type="submit"
                                            className="login-btn"
                                        >
                                            Register
                                        </Button>

                                    </div>

                                </Form>
                            )}

                        </Formik>

                        {/* Login Link */}
                        <div className="text-center mt-3">

                            <p
                                style={{
                                    fontSize: 13,
                                    color: "#8a95b0",
                                }}
                            >

                                Already have an account?{" "}

                                <Link
                                    to="/"
                                    style={{
                                        color: "#3B8BD4",
                                        fontWeight: 600,
                                    }}
                                >
                                    Login
                                </Link>

                            </p>

                        </div>

                    </Card.Body>

                </Card>

            </Container>

            {/* Background */}
            <img
                src="bg1.png"
                alt="bg"
                className="bg1"
            />

        </div>
    );
};

export default Register;