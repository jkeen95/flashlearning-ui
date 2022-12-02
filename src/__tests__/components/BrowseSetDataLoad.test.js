import * as util from "../../utils/utils";
import {getSharedSet} from "../../utils/utils";
import {DataStore} from "aws-amplify";
import {render, screen} from "@testing-library/react";
import React from "react";
import BrowseSetDataLoad from "../../components/BrowseSetDataLoad";

let setInfo = {
    id: "2d36e43c-470b-b13e-f50ba8669d2d",
    name: "Test Set 1",
    visibility: "private",
    description: "Description",
    titles: ["A", "B", "C"],
    definitions: ["1", "2", "3"],
    owner: "testuser",
};

let setId = "8798798798"

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

afterEach(() => {
    jest.resetAllMocks()
})

async function mockQuery(model) {
    return []
}

async function mockGetSharedSet() {
    return {}
}

//Test Case ID: Test111
test('Checks that the not permitted message is shown when the data has not been found for the BrowseSetDataLoad page', async () => {

    const dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery)
    const utilGetSharedSetSpy = jest.spyOn(util, "getSharedSet").mockImplementation(mockGetSharedSet)
    await render(<BrowseSetDataLoad setId={setId} currentUser={currentUser} setInfo={setInfo}/>)
    //screen.debug()
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(1)
    expect(utilGetSharedSetSpy).toHaveBeenCalledTimes(1)
    expect(screen.getByText("You are not permitted to view this set!"))
})