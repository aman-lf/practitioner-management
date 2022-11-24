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

export const addPractitioner = (practitioner, image) => {
    // Create an object of formData
    const formData = new FormData();
    for (const [key, value] of Object.entries(practitioner)) {
        if (value) {
            if (key === "specialization") formData.append(key, JSON.stringify(value));
            else formData.append(key, value);
        }
    }

    if (image) {
        // Update the formData object
        formData.append("file", image, image.name);
    }
    console.log();

    return axios.post(process.env.REACT_APP_API_URL + "/api/practitioner", formData);
};

export const updateSpecialist = (id, is_specialist) => {
    return axios.put(process.env.REACT_APP_API_URL + `/api/practitioner/${id}`, { is_specialist });
};

export const updatePractitioner = (id, practitioner, image) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(practitioner)) {
        if (value) {
            if (key === "specialization") formData.append(key, JSON.stringify(value));
            else formData.append(key, value);
        }
    }
    if (image) {
        // Update the formData object
        formData.append("file", image, image.name);
    }

    return axios.put(process.env.REACT_APP_API_URL + `/api/practitioner/${id}`, practitioner);
};

export const deletePractitioner = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL + `/api/practitioner/${id}`);
};
