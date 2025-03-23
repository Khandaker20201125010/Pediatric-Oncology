import React from 'react';
import usePatientView from '../Hooks/usePatientView';
import ViewPatientsCards from '../ViewPatientsCards/ViewPatientsCards';







const ViewAllPatients = () => {
    const [allPatients, refetch ] =usePatientView();
    return (
        <div>
            {
                allPatients.map(patient => <ViewPatientsCards key={patient._id} patient={patient}></ViewPatientsCards>)
            }
            
        </div>
    );
};

export default ViewAllPatients;