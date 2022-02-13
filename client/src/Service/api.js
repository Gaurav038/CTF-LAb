import axios from 'axios';

// const usersUrl = 'http://localhost:8080/data';

const usersUrl = '/data';

export const getUsers = async (id) => {
    console.log(id)
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
		return await axios.post(usersUrl, user);	
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`)
}

export const editUser = async (id, user) => {
    return await axios.patch(`${usersUrl}/${id}`, user)
}