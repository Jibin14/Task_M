import "./ListUser.css"
import { Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdAutoDelete } from "react-icons/md";
import { deleteProduct } from "../../redux/productSlice";
import { toast } from "react-toastify";
import { userRoleChange, userStatusChange } from "../../redux/userSlice";


const ListUser = () => {
    const { users } = useSelector((state) => state.userState);


    // console.log("fmvmv",products);
    const dispatch = useDispatch();
    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId))
        toast.success("product deleted successfuly")

    }
    const handleRoleChange = (id, role) =>{
        dispatch(userRoleChange({id,role}))
        toast.success("user role updated successfuly")

    }
    const handleStatus = (userId)=>{
        dispatch(userStatusChange(userId))
        toast.success("status updated succesfully")
        console.log("user---",userId);
        

    }

    return (
        <>
            <Container className="lll">
                <Row>
                    {users.length !== 0 ? (<Col>
                        <h2 className="fw-bold text-center text-light">List User</h2>
                        <Table className="product-table" striped variant="dark" bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>User Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={user?.id}>
                                        <td>{i + 1}</td>

                                        <td>{user?.firstName ?? ""}</td>
                                        <td>{user?.email ?? 0}</td>
                                        <td>
                                            <Form.Select className="formm nnn"  value={user?.role} onChange={(event)=>handleRoleChange(user.id,event.target.value)}>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            <option value="seller">Seller</option>
                                        </Form.Select>
                                        </td>

                                        <td><Form.Check // prettier-ignore
                                        onChange={()=>handleStatus(user?.id)}
                                        checked={user?.status}
                                            type="switch"
                                            id={user?.id}
                                            label={user?.status == true ? "Active" : "Inactive"}
                                        /></td>
                                        <td><Button className="text-danger bg-black vvv"><MdAutoDelete size={25} /></Button></td>
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
export default ListUser;