import {render, screen} from "@testing-library/react";
import React from "react";
import EditSetPage from "../../pages/EditSetPage";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test114
test('Checks that the no data yet div is shown when the ready signal has not been sent for the EditSetPage page', async () => {
    await render(<EditSetPage currentUser={currentUser} ready={false}/>)
    //screen.debug()
    expect(document.querySelector('[class="noDataYet"]')).toBeInTheDocument()
})