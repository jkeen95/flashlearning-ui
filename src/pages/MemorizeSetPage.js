import {useParams} from "react-router-dom";
import MemorizeSet from "../components/MemorizeSet";
import MemorizeSetDataLoad from "../components/MemorizeSetDataLoad";

const MemorizeSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <MemorizeSetDataLoad setId={setId} currentUser={currentUser}/>
    );
};

export default MemorizeSetPage;