import { Container, Card, Form, Button } from 'react-bootstrap'
import { FaFacebook } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SiApple } from "react-icons/si"
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { userLoginData } from '../redux/userSlice'
import instance from '../axios'
import './Login.css'

const Login = () => {

    const emailRef = useRef(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [validated, setValidated] = useState(false)

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    // Auto focus email
    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    // Handle Input Change
    const handleChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    // Submit Form
    const handleSubmit = async (e) => {

        e.preventDefault()

        const form = e.currentTarget

        // Bootstrap Validation
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
            return
        }

        try {

            const { data } = await instance.post(
                "/users/login",
                loginData
            )

            console.log(data)

            toast.success("Login successful")

            dispatch(userLoginData(data.user))

            navigate('/home')

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message || "Login failed"
            )
        }
    }

    return (

        <div className="login-page position-relative">

            {/* Login Card */}
            <Container className="d-flex justify-content-center align-items-center login-container">

                <Card className="login-card">

                    <Card.Body>

                        {/* Title */}
                        <div className="text-center">

                            <h2 className="login-title">
                                Login
                            </h2>

                            <p className="login-subtitle">
                                Welcome back! Sign in using your
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

                        {/* Form */}
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="login-form"
                        >

                            {/* Email */}
                            <Form.Group className="mb-4">

                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    ref={emailRef}
                                    onChange={handleChange}
                                    className="custom-input"
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email!
                                </Form.Control.Feedback>

                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-4">

                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    onChange={handleChange}
                                    className="custom-input"
                                />

                                <Form.Control.Feedback type="invalid">
                                    Please enter your password!
                                </Form.Control.Feedback>

                            </Form.Group>

                            {/* Submit Button */}
                            <div className="text-center mt-4">

                                <Button
                                    type="submit"
                                    className="login-btn"
                                >
                                    Login
                                </Button>

                            </div>

                        </Form>

                        {/* Links */}
                        <div className="text-center mt-3">

                            <p
                                className="mb-1"
                                style={{
                                    fontSize: 13,
                                    color: '#8a95b0'
                                }}
                            >

                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    style={{
                                        color: '#3B8BD4',
                                        fontWeight: 600
                                    }}
                                >
                                    Register
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
    )
}

export default Login