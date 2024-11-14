import axios from "axios";


const axiosPublic = axios.create({
    baseURL:'https://pediatric-oncology-server.vercel.app'
})
const useAxiosPublic = () => {

   return axiosPublic ;
};

export default useAxiosPublic;