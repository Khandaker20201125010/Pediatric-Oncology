import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const usePatientData = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: allPatient = [], refetch } = useQuery({
    queryKey: ["allPatients", user?.email], // Include email in the query key
    queryFn: async () => {
      if (!user?.email) {
        return []; // Return empty array if no email
      }
      const res = await axiosPublic.get(`/allPatients?email=${user.email}`); // Pass email as query
      return res.data || []; // Ensure response is always an array
    },
  });

  return [allPatient, refetch];
};

export default usePatientData;
