import { useState, useEffect } from 'react';
import { getUsers, deleteUser} from '../Service/api';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'
import Main from './Main';
import {useNavigate} from 'react-router-dom';


const AllUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");

    useEffect(() => {
        getAllUsers();
        
    }, []);


    const getAllUsers = async () => {   
         const id = localStorage.getItem("userD");
        let response = await getUsers(id);
        setUsers([response.data]);
        setPic(response.data.pic)
        
    }
    console.log(users)
    const DeleteUser = async(id) => {
        await deleteUser(id);
        localStorage.removeItem("token");
        navigate("/signup")
    }

    return (
        <>
        <Main />
        <div
        
            className="home-container container mt-4 animate__animated animate__fadeIn animate__slow"
            style={{marginBottom: '50px'}}
        >
            <div className="row">
                <h1 className="text-center">USER Profile</h1>
                <img style={{width: '200px'}} src={pic} alt="imggg" />
            </div>
            <div className="row">
                <div className="col">
                    <table
                        className="customers-table table table-dark table-striped table-bordered border-dark mt-4"
                    >
                        <thead className="text-center fs-6">
                            <tr>
                                <th>Id No.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Delete</th>
                                <th>Update</th>

                            </tr>
                        </thead>
                        <tbody className="text-center fs-6">
                            {users && users.map((user) => (
                                <tr key={user._id}>
                                    <td className="fw-bold">{user._id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>
                                        {user.email}
                                    </td>
                                   
                                    <td><Button color="primary" variant="contained" style={{marginRight:10}} onClick={() => DeleteUser(user._id)}>Delete user</Button></td>
                                    <td><Button color="primary" variant="contained" style={{marginRight:10}}  component={Link} to={`/update`}>Update User </Button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        </>
    )
}

export default AllUsers;