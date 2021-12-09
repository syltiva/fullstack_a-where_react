import axios from 'axios'

export const baseURL= process.env.REACT_APP_API_URL

const apiHelper = axios.create({baseURL});

apiHelper.interceptors.request.use(
    async (config) => {
        let token;
        try {
            const jwt_data = await JSON.parse(localStorage.getItem('jwtawhere'));
            token = jwt_data.token
            if (token) config.headers.authorization = token;
        }   catch (error) {
            console.log(error);
        }
        return config;
    }
)

export default apiHelper;