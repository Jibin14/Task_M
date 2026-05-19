import { Button, Col, Container, Form, Row } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/productSlice";


const AddProduct = () => {
    const { Formik } = formik;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        productname: yup.string().required("please enter your productname"),
        productprice: yup.number().required("pls enter your productprice"),
        productdecription: yup.string().required('pls enter your productdecription'),
    });
    const handleAddProduct = (values)=>{
        values.id = Date.now();
        dispatch(addProduct(values))
        toast.success("product added succesfully");
        navigate('/admin/list-product')

        

    }
    return (
        <>

            <h2 className="text-center text-light">Add Product</h2>
            <Container className="mt-3 justify-content-center sisi">
                <Row>
                    <Col>
                        <Formik validationSchema={schema} onSubmit={handleAddProduct} initialValues={
                            {
                                productname:'',
                                productprice:'',
                                productdecription:'',
                                productphoto:'',
                            }
                            
                        }
                        validateOnMount={false}
                        validateOnBlur={true}
                        >
                            
                            {({handleSubmit,handleChange,handleBlur,values,errors,touched}) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control onChange={handleChange} name="productname" type="text" placeholder="productname" required value={values.productname} isValid={touched.productname && !errors.productname} onBlur={handleBlur} isInvalid={touched.productname && !!errors.productname}/>
                                        <Form.Control.Feedback type="invalid">{errors.productname}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Product Price</Form.Label>
                                        <Form.Control onChange={handleChange} name="productprice" type="number" placeholder="productprice" required value={values.productprice} isValid={touched.productprice && !errors.productprice} isInvalid={touched.productprice && !!errors.productprice} onBlur={handleBlur}/>
                                        <Form.Control.Feedback type="invalid">{errors.productprice}</Form.Control.Feedback>
                                        
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Product Decription</Form.Label>
                                        <Form.Control onChange={handleChange} name="productdecription" as={"textarea"} placeholder="productdecription" required value={values.productdecription} isValid={touched.productdecription && !errors.productdecription} isInvalid={touched.productdecription && !!errors.productdecription} onBlur={handleBlur}/>
                                        <Form.Control.Feedback type="invalid">{errors.productdecription}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Product Photo</Form.Label>
                                        <Form.Control onChange={handleChange} name="productphoto" type="text" placeholder="productphoto" required value={values.productphoto} isValid={touched.productphoto && !errors.productphoto} isInvalid={touched.productphoto && !!errors.productphoto} onBlur={handleBlur}/>
                                        <Form.Control.Feedback type="invalid">{errors.productphoto}</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )}</Formik>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
export default AddProduct;