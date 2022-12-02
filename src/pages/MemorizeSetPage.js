import {useParams} from "react-router-dom";
import MemorizeSetDataLoad from "../components/MemorizeSetDataLoad";
import React from "react";

const MemorizeSetPage = ({ currentUser, ready }) => {
    const setId = useParams();
    if(ready)
        return <MemorizeSetDataLoad setId={setId} currentUser={currentUser}/>
    else
        return <div className="noDataYet"/>
};

export default MemorizeSetPage;