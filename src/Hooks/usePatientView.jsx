import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePatientView = (email = null) => {  // Accept email as an optional parameter
  const axiosPublic = useAxiosPublic();

  const { data: allPatients = [], refetch } = useQuery({
    queryKey: email ? ["filteredPatients", email] : ["allPatients"],  // Use different cache keys
    queryFn: async () => {
      const url = email ? `/filteredPatients?email=${email}` : "/allPatients";  // Choose endpoint
      const res = await axiosPublic.get(url);
      console.log("Fetched Patients:", res.data); // Debugging
      return res.data;
    },
  });

  return [allPatients, refetch];
};

export default usePatientView;
