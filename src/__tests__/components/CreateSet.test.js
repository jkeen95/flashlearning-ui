import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import CreateSet from "../../components/CreateSet";
import {DataStore} from "aws-amplify";
import {act} from "react-dom/test-utils";

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

let result = {id: "8798798798"}

let dataStoreSaveSpy;

beforeEach(() =>{
    dataStoreSaveSpy = jest.spyOn(DataStore, "save").mockImplementation(mockSave);
})

async function mockSave(model) {
    return result
}

async function mockLocationAssign(url) {

}

afterEach(() => {
    jest.resetAllMocks()
})

//Test Case ID: Test68
test('renders the CreateSet component', async () => {
    await render(<CreateSet currentUser={currentUser} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const setNameInput = screen.getByLabelText("Set Name:")
    const setDescriptionInput = screen.getByLabelText("Description:")
    const setTitleInput = screen.getByPlaceholderText("Title")
    const setDefInput = screen.getByPlaceholderText("Definition")
    const button = screen.getAllByRole("button")

    expect(setNameInput).toBeInTheDocument()
    expect(setNameInput.getAttribute("value")).toMatch("")
    expect(setNameInput.getAttribute("type")).toMatch("text")
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setDescriptionInput).toBeInTheDocument()
    expect(setDescriptionInput).toHaveTextContent("")
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setTitleInput).toBeInTheDocument()
    expect(setTitleInput.getAttribute("type")).toMatch("text")
    expect(setTitleInput.getAttribute("value")).toMatch("")
    expect(setTitleInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(setDefInput).toBeInTheDocument()
    expect(setDefInput.getAttribute("type")).toMatch("text")
    expect(setDefInput.getAttribute("value")).toMatch("")
    expect(setDefInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(button[0]).toBeInTheDocument()
    expect(button[0]).toHaveTextContent("Add Flashcard")
    expect(button[1]).toBeInTheDocument()
    expect(button[1].getAttribute("value")).toMatch("Submit")
    expect(button[1].getAttribute("type")).toMatch("submit")
})

//Test Case ID: Test69
test('validates that spys are called when CreateSet component is submitted', async () => {
    const { location } = window;
    delete window.location
    window.location = { replace: jest.fn()};

    await render(<CreateSet currentUser={currentUser} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const setNameInput = screen.getByLabelText("Set Name:")
    const setDescriptionInput = screen.getByLabelText("Description:")
    const setTitleInput = screen.getByPlaceholderText("Title")
    const setDefInput = screen.getByPlaceholderText("Definition")
    const button = screen.getAllByRole("button")

    await act(() => {
        fireEvent.change(setNameInput, {target: {value: "Create Set"}})
    });
    await act(() => {
        fireEvent.change(setDescriptionInput, {target: {value: "Create Set Description"}})
    });
    await act(() => {
        fireEvent.change(setTitleInput, {target: {value: "A"}})
    });
    await act(() => {
        fireEvent.change(setDefInput, {target: {value: "1"}})
    });
    await act(() => {
        button[1].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(window.location.replace).toHaveBeenCalled()
    window.location = location;
})