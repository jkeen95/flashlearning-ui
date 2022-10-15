import BrowseSet from "../components/BrowseSet";
import {useParams} from "react-router-dom";

const BrowseSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <BrowseSet setId={setId} currentUser={currentUser}/>
    );
};

export default BrowseSetPage;