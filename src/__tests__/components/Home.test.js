import {render, screen} from "@testing-library/react";
import React from "react";
import {DataStore} from "aws-amplify";
import Home from "../../components/Home";
import {act} from "react-dom/test-utils";
import * as util from "../../utils/utils"


let dataStoreQuerySpy;
let deleteSetSpy;

beforeEach(() =>{
    dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery);
    deleteSetSpy = jest.spyOn(util, "deleteSet").mockImplementation(mockDeleteSet);
})

afterEach(() => {
    jest.resetAllMocks()
})

let models;

async function mockQuery(model, predicate) {
    //console.log("inMockQuery")
    return models
}

async function mockDeleteSet(model, predicate) {
    //console.log("inDeleteSet")
}

const currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test51
test("renders a Home component with user's sets links displayed", async () => {
    models = [{
        id: "2d36e43c-470b-b13e-f50ba8669d2d",
        name: "Test Set 1",
        owner: "testuser",
    }, {
        id: "2d36e43c-470b-b13d-f50ba8669d2c",
        name: "Test Set 2",
        owner: "testuser",
    }]
    await act(() => {
        render(<Home currentUser={currentUser}/>)
    })
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()

    const set1BrowseA = screen.getByText("Test Set 1")
    const set2BrowseA = screen.getByText("Test Set 2")
    const editButtons = screen.getAllByText("Edit")
    const deleteButtons = screen.getAllByText("Delete")
    // console.log(deleteButtons)

    expect(screen.getByText("Welcome Test User").getAttribute("id")).toMatch("welcomeMessage")
    expect(set1BrowseA.getAttribute("href")).toMatch(`/set/${models[0].id}/browse`)
    expect(editButtons[0].getAttribute("href")).toMatch(`/set/${models[0].id}/edit`)
    expect(deleteButtons[0]).toHaveClass("deleteButton")
    expect(set2BrowseA.getAttribute("href")).toMatch(`/set/${models[1].id}/browse`)
    expect(editButtons[1].getAttribute("href")).toMatch(`/set/${models[1].id}/edit`)
    expect(deleteButtons[1]).toHaveClass("deleteButton")
})

//Test Case ID: Test52
test("renders a Home component when the user has no sets", async () => {
    models = []
    await act(() => {
        render(<Home currentUser={currentUser}/>)
    })
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    expect(screen.getByText("Welcome Test User").getAttribute("id")).toMatch("welcomeMessage")
    expect(screen.getByText("You have no flashcard sets.")).toBeInTheDocument()
})

//Test Case ID: Test53
test("validates the deleteSpy is called when a Delete button on the Home component is clicked", async () => {
    models = [{
        id: "2d36e43c-470b-b13e-f50ba8669d2d",
        name: "Test Set 1",
        owner: "testuser",
    }]
    await act(() => {
        render(<Home currentUser={currentUser}/>)
    })
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    const deleteButton = screen.getByText("Delete")
    await act(() => {
        deleteButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

     expect(deleteSetSpy).toHaveBeenCalledTimes(1)
    // expect(screen.getByText("You have no flashcard sets.")).toBeInTheDocument()
})

