
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const usePatientData = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: allPatient = [], refetch } = useQuery({
    queryKey: ["allPatients", user?.email], 
    enabled: !!user?.email, // This ensures the query doesn't run until user email is available
    queryFn: async () => {
      if (!user?.email) {
        console.log('No user email available');
        return []; // Return empty array if no email
      }
      const res = await axiosPublic.get(`/allPatients?email=${user.email}`);
      return res.data || []; // Ensure response is always an array
    },
  });

  return [allPatient, refetch];
};


export default usePatientData;
