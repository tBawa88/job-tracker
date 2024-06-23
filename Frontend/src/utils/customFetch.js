import axios from "axios";
import { QueryClient } from "@tanstack/react-query";


/**A custom fuction made using axios.create() ,with base URL set to /api. */
const customFetch = axios.create({
    baseURL: '/api'
})

export const queryClient = new QueryClient();
export default customFetch;