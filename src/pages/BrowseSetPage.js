import BrowseSet from "../components/BrowseSet";
import {useParams} from "react-router-dom";
import BrowseSetTest from "../components/BrowseSetTest";

const BrowseSetPage = ({ currentUser }) => {
    const setId = useParams();
    return (
        <BrowseSetTest setId={setId} currentUser={currentUser}/>
    );
};

export default BrowseSetPage;