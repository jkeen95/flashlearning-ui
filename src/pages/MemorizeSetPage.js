import {useParams} from "react-router-dom";
import MemorizeSet from "../components/MemorizeSet";

const MemorizeSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <MemorizeSet setId={setId} currentUser={currentUser}/>
    );
};

export default MemorizeSetPage;