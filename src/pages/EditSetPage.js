import {useParams} from "react-router-dom";
import EditSet from "../components/EditSet";

const EditSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <EditSet setId={setId} currentUser={currentUser}/>
    );
};

export default EditSetPage;