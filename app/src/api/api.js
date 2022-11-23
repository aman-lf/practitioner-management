import axios from "axios";

export const signin = (email, password) => {
    return axios.post(process.env.REACT_APP_API_URL + "/api/signin", { email, password });
};

export const signup = (email, password) => {
    return axios.post(process.env.REACT_APP_API_URL + "/api/signup", { email, password });
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getPractitioners = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/api/practitioner");
};

export const getPractitioner = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `/api/practitioner/${id}`);
};


export const updateSpecialist = (id, is_specialist) => {
    return axios.put(process.env.REACT_APP_API_URL + `/api/practitioner/${id}`, { is_specialist });
};

export const updatePractitioner = (id, practitioner) => {
    return axios.put(process.env.REACT_APP_API_URL + `/api/practitioners/${id}`, practitioner);
};

