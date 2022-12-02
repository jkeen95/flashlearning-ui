import {render, screen} from "@testing-library/react";
import React from "react";
import BrowseSetPage from "../../pages/BrowseSetPage";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test112
test('Checks that the no data yet div is shown when the ready signal has not been sent for the BrowseSetPage pagee', async () => {
    await render(<BrowseSetPage currentUser={currentUser} ready={false}/>)
    //screen.debug()
    expect(document.querySelector('[class="noDataYet"]')).toBeInTheDocument()
})