import BrowseSet from "../components/BrowseSet";
import {useParams} from "react-router-dom";
import BrowseSetDataLoad from "../components/BrowseSetDataLoad";

const BrowseSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <BrowseSetDataLoad setId={setId} currentUser={currentUser}/>
    );
};

export default BrowseSetPage;