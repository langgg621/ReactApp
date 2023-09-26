import axios from "axios";
import { User } from "./interfaces/UserService";

const BASE_URL = 'https://6511039f3ce5d181df5d9e3e.mockapi.io/api/test/user'
export const addUserApi = ({ name, mssv, lop, email, address }: User) => {
    return axios({
        method: "POST",
        url: BASE_URL,
        data: {
            name, 
            mssv,
            address,
            email,
            lop
        }
    })
}


export const getByIdApi = (id: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/").concat(id)
    })
}


export const deleteApi = (id: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/").concat(id)
    })
}

export const listUserApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL
    })
}

export const updateApi = ({ id, name, mssv, lop, email, address }: User) => {
    return axios({
        method: "PUT",
        url: BASE_URL.concat("/").concat(id),
        data: {
            name, 
            mssv,
            address,
            email,
            lop
    }
})
}