import {useParams} from "react-router-dom";
import EditSet from "../components/EditSet";
import CreateSet from "../components/CreateSet";
import React from "react";

const EditSetPage = ({ currentUser, ready }) => {
    const setId = useParams();
    if(ready)
        return <EditSet setId={setId} currentUser={currentUser}/>
    else
        return <div className="noDataYet"/>
};

export default EditSetPage;