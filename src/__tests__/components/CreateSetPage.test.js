import {render, screen} from "@testing-library/react";
import React from "react";
import CreateSetPage from "../../pages/CreateSetPage";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test113
test('Checks that the no data yet div is shown when the ready signal has not been sent for the CreateSetPage page', async () => {
    await render(<CreateSetPage currentUser={currentUser} ready={false}/>)
    //screen.debug()
    expect(document.querySelector('[class="noDataYet"]')).toBeInTheDocument()
})