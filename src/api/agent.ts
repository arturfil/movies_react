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
        if (jwt_data) config.headers!.Authorization = `Bearer ${jwt_data}`;
    } catch (error:any) {
        console.log("Here", error.data.message);
    }
    return config;
});

export default agent;