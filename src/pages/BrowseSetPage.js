import {useParams} from "react-router-dom";
import BrowseSetDataLoad from "../components/BrowseSetDataLoad";
import CreateSet from "../components/CreateSet";
import React from "react";

const BrowseSetPage = ({ currentUser, ready }) => {
    const setId = useParams();
    if(ready)
        return <BrowseSetDataLoad setId={setId} currentUser={currentUser}/>
    else
        return <div className="noDataYet"/>
};

export default BrowseSetPage;