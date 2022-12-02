import {render, screen} from "@testing-library/react";
import React from "react";
import MemorizeSetPage from "../../pages/MemorizeSetPage";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test116
test('Checks that the no data yet div is shown when the ready signal has not been sent for the MemorizeSetPage page', async () => {
    await render(<MemorizeSetPage currentUser={currentUser} ready={false}/>)
    //screen.debug()
    expect(document.querySelector('[class="noDataYet"]')).toBeInTheDocument()
})