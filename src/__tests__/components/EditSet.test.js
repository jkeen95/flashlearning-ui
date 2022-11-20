import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {DataStore} from "aws-amplify";
import {act} from "react-dom/test-utils";
import EditSet from "../../components/EditSet";
import {FlashcardSet} from "../../models";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

let setId = {id: "8798798798"}

let result = {id: "8798798798"}

let models = [{
    id: "2d36e43c-470b-b13e-f50ba8669d2d",
    name: "Test Set 1",
    visibility: "private",
    description: "Description",
    titles: ["A"],
    definitions: ["1"],
    owner: "testuser",
}];

let dataStoreSaveSpy;
let dataStoreQuerySpy;
let copyOfSpy;

beforeEach(() =>{
    dataStoreSaveSpy = jest.spyOn(DataStore, "save").mockImplementation(mockSave);
    dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery);
    copyOfSpy = jest.spyOn(FlashcardSet, "copyOf").mockImplementation(mockCopyOf)
})

async function mockSave(model) {
    return models
}

async function mockQuery(model, predicate) {
    //console.log("inMockQuery")
    return models
}

async function mockCopyOf(original, neqOne) {
    return models
}

afterEach(() => {
    jest.resetAllMocks()
})

//Test Case ID: Test54
test('renders the EditSet component', async () => {
    await render(<EditSet setId={setId} currentUser={currentUser} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const setNameInput = screen.getByLabelText("Set Name:")
    const setDescriptionInput = screen.getByLabelText("Description:")
    const setTitleInput = screen.getByPlaceholderText("Title")
    const setDefInput = screen.getByPlaceholderText("Definition")
    const button = screen.getAllByRole("button")

    expect(setNameInput).toBeInTheDocument()
    expect(setNameInput.getAttribute("value")).toMatch(models[0].name)
    expect(setNameInput.getAttribute("type")).toMatch("text")
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setDescriptionInput).toBeInTheDocument()
    expect(setDescriptionInput).toHaveTextContent(models[0].description)
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setTitleInput).toBeInTheDocument()
    expect(setTitleInput.getAttribute("type")).toMatch("text")
    expect(setTitleInput.getAttribute("value")).toMatch(models[0].titles[0])
    expect(setTitleInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(setDefInput).toBeInTheDocument()
    expect(setDefInput.getAttribute("type")).toMatch("text")
    expect(setDefInput.getAttribute("value")).toMatch(models[0].definitions[0])
    expect(setDefInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(button[0]).toBeInTheDocument()
    expect(button[0]).toHaveTextContent("Add Flashcard")
    expect(button[1]).toBeInTheDocument()
    expect(button[1].getAttribute("value")).toMatch("Submit")
    expect(button[1].getAttribute("type")).toMatch("submit")
})

//Test Case ID: Test55
test('validates the spys are called when EditSet component is submitted', async () => {
    const { location } = window;
    delete window.location
    window.location = { assign: jest.fn()};

    await render(<EditSet setId={setId} currentUser={currentUser} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const setDefInput = screen.getByPlaceholderText("Definition")
    const button = screen.getAllByRole("button")

    await act(() => {
        fireEvent.change(setDefInput, {target: {value: "2"}})
    });
    await act(() => {
        button[1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(2)
    expect(dataStoreSaveSpy).toHaveBeenCalledTimes(1)
    expect(window.location.assign).toHaveBeenCalled()
    window.location = location;
})