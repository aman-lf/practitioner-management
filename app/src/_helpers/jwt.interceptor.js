import axios from "axios";

export default function jwtInterceptor() {
    axios.interceptors.request.use((request) => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = localStorage.getItem("token");
        const isLoggedIn = token ? true : false;
        const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

        if (isLoggedIn && isApiUrl) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    });
}