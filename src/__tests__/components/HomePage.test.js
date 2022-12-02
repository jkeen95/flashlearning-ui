import {render, screen} from "@testing-library/react";
import React from "react";
import HomePage from "../../pages/HomePage";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test115
test('Checks that the no data yet div is shown when the ready signal has not been sent for the HomePage page', async () => {
    await render(<HomePage currentUser={currentUser} ready={false}/>)
    //screen.debug()
    expect(document.querySelector('[class="noDataYet"]')).toBeInTheDocument()
})