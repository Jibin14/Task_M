import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Listproduct.css"
import { RiImageEditFill } from "react-icons/ri";
import { MdAutoDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/productSlice";
import { toast } from "react-toastify";

const ListProduct = () => {
    const { products } = useSelector((state) => state.productState);
    // console.log("fmvmv",products);
    const dispatch = useDispatch();
    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId))
        toast.success("product deleted successfuly")

    }

    return (
        <>
            <Container className="suii">
                <Row>
                    {products.length !== 0 ? (<Col>
                        <h2 className="fw-bold text-center text-light">List Products</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Photo</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Image className="photo-1" src={product?.productphoto ?? null} alt={product?.productname}></Image>
                                        </td>
                                        <td>{product?.productname ?? ""}</td>
                                        <td>{product?.productprice ?? 0}</td>
                                        <td><Link to={`/admin/edit-product/${product.id}`}><Button className="text-danger bg-black"><RiImageEditFill size={25} /></Button></Link></td>
                                        <td><Button className="text-danger bg-black"><MdAutoDelete size={25} onClick={() => handleDelete(product.id)} /></Button></td>
                                    </tr>

                                ))}

                            </tbody>
                        </Table>
                    </Col>) : (
                        <h2 className="text-danger text-center">There is Nothying</h2>
                    )}
                </Row>
            </Container>
        </>
    )
}
export default ListProduct;