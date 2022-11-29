import CreateSet from "../components/CreateSet";
import Home from "../components/Home";
import React from "react";

const CreateSetPage = ({ currentUser, ready }) => {
    if(ready)
        return <CreateSet currentUser={currentUser}/>
    else
        return <div className="noDataYet"/>
};

export default CreateSetPage;