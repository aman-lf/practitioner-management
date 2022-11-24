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

    axios.interceptors.response.use(
        (res) => {
            console.log("pass", res);
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            console.log(err, typeof err);
            if (err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await refreshToken();
                        const { accessToken } = rs.data.data;
                        console.log(accessToken);
                        localStorage.setItem("token", accessToken);
                        originalConfig.headers.Authorization = `Bearer ${accessToken}`;

                        return axios(originalConfig);
                    } catch (_error) {
                        console.log("errr");
                        if (_error.response && _error.response.data) {
                            return Promise.reject(_error.response.data);
                        }

                        return Promise.reject(_error);
                    }
                }

                if (err.response.status === 403 && err.response.data) {
                    return Promise.reject(err.response.data);
                }
            }

            return Promise.reject(err);
        }
    );
    function refreshToken() {
        return axios.post(process.env.REACT_APP_API_URL + "/api/refresh", {
            refreshToken: localStorage.getItem("refreshToken"),
        });
    }
}
