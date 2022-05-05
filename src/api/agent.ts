import axios from "axios";

interface JWTData {
    token: string;
}

export const baseURL = process.env.REACT_APP_API_URL;
export const jwt_string:string|undefined = process.env.REACT_APP_JWT_STRING;

const agent = axios.create({baseURL});

agent.interceptors.request.use(async (config) => {
    try {
        const jwt_data: string|null = await localStorage.getItem(jwt_string!)
        console.log("HERE", jwt_data);
        let header = 'Authorization'
        if (jwt_data) config.headers!.Authorization = `Bearer ${jwt_data}`;
    } catch (error) {
        console.log(error);
    }
    return config;
});

export default agent;