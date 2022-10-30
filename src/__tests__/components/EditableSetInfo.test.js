import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {act} from "react-dom/test-utils";
import EditableSetInfo from "../../components/EditableSetInfo";

const setInfo = {
    flashSetName: "Set Name",
    flashSetVisibility: "private",
    flashSetDescription: "Description",
    titles: ["A"],
    definitions: ["1"]
}

const mockFn = jest.fn();

//Test Case ID: Test56
test("renders a EditableSetInfo component", async () => {
    await render(<EditableSetInfo setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const setNameInput = screen.getByLabelText("Set Name:")
    const publicOption = screen.getByText("Public")
    const privateOption = screen.getByText("Private")
    const setDescriptionInput = screen.getByLabelText("Description:")
    const setTitleInput = screen.getByPlaceholderText("Title")
    const setDefInput = screen.getByPlaceholderText("Definition")
    const button = screen.getAllByRole("button")
    //const submit = screen.getByRole("submit")
    //console.log(button)

    expect(setNameInput).toBeInTheDocument()
    expect(setNameInput.getAttribute("value")).toMatch("Set Name")
    expect(setNameInput.getAttribute("type")).toMatch("text")
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(publicOption).toBeInTheDocument()
    expect(publicOption.getAttribute("value")).toMatch("public")
    expect(publicOption.parentElement.parentElement).toHaveTextContent("Visibility:")
    expect(publicOption.parentElement.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(privateOption).toBeInTheDocument()
    expect(privateOption.getAttribute("value")).toMatch("private")
    expect(privateOption.parentElement.parentElement).toHaveTextContent("Visibility:")
    expect(privateOption.parentElement.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setDescriptionInput).toBeInTheDocument()
    expect(setDescriptionInput).toHaveTextContent("Description")
    expect(setNameInput.parentElement.parentElement.parentElement.tagName.toLowerCase()).toMatch("form")
    expect(setTitleInput).toBeInTheDocument()
    expect(setTitleInput.getAttribute("type")).toMatch("text")
    expect(setTitleInput.getAttribute("value")).toMatch("A")
    expect(setTitleInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(setDefInput).toBeInTheDocument()
    expect(setDefInput.getAttribute("type")).toMatch("text")
    expect(setDefInput.getAttribute("value")).toMatch("1")
    expect(setDefInput.parentElement).toHaveClass("flashcardInputDiv")
    expect(button[0]).toBeInTheDocument()
    expect(button[0]).toHaveTextContent("Add Flashcard")
    expect(button[1]).toBeInTheDocument()
    expect(button[1].getAttribute("value")).toMatch("Submit")
    expect(button[1].getAttribute("type")).toMatch("submit")
})

//Test Case ID: Test57
test("validates the EditableSetInfo Set Name input field can have its value changed", async () => {
    await render(<EditableSetInfo setInfo={setInfo} />)
    const setNameInput = screen.getByLabelText("Set Name:")
    const changedNameValue = "Changed Name Value"
    expect(setNameInput).toBeInTheDocument()
    expect(setNameInput.getAttribute("value")).toMatch("Set Name")
    expect(setNameInput.getAttribute("type")).toMatch("text")
    await act(() => {
        fireEvent.change(setNameInput, {target: {value: changedNameValue}})
    });
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    expect(setNameInput.getAttribute("value")).toMatch(changedNameValue)
})

//Test Case ID: Test58
test("validates the EditableSetInfo Set Description input field can have its value changed", async () => {
    await render(<EditableSetInfo setInfo={setInfo} />)
    const setDescriptionTextArea = screen.getByText("Description")
    const changedDescriptionValue = "Changed Description Value"
    //screen.debug()
    expect(setDescriptionTextArea).toBeInTheDocument()
    await act(() => {
        fireEvent.change(setDescriptionTextArea, {target: {value: changedDescriptionValue}})
    });
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    expect(screen.getByText(changedDescriptionValue)).toBeInTheDocument()
})

//Test Case ID: Test59
test("validates the EditableSetInfo Title input field can have its value changed", async () => {
    setInfo.titles = ["A", "B"]
    setInfo.definitions = ["1", "2"]
    await render(<EditableSetInfo setInfo={setInfo} />)
    const setTitleInput = screen.getAllByPlaceholderText("Title")[0]
    const changedTitleValue = "Changed Title Value"
    //screen.debug()
    expect(setTitleInput).toBeInTheDocument()
    expect(setTitleInput.getAttribute("type")).toMatch("text")
    expect(setTitleInput.getAttribute("value")).toMatch("A")
    expect(setTitleInput.parentElement).toHaveClass("flashcardInputDiv")
    await act(() => {
        fireEvent.change(setTitleInput, {target: {value: changedTitleValue}})
    });
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    expect(setTitleInput.getAttribute("value")).toMatch(changedTitleValue)
    setInfo.titles = ["A"]
    setInfo.definitions = ["1"]
})

//Test Case ID: Test60
test("validates the EditableSetInfo Definition input field can have its value changed", async () => {
    setInfo.titles = ["A", "B"]
    setInfo.definitions = ["1", "2"]
    await render(<EditableSetInfo setInfo={setInfo} />)
    const setDefInput = screen.getAllByPlaceholderText("Definition")[0]
    const changedDefValue = "Changed Def Value"
    //screen.debug()
    expect(setDefInput).toBeInTheDocument()
    expect(setDefInput.getAttribute("type")).toMatch("text")
    expect(setDefInput.getAttribute("value")).toMatch("1")
    expect(setDefInput.parentElement).toHaveClass("flashcardInputDiv")
    await act(() => {
        fireEvent.change(setDefInput, {target: {value: changedDefValue}})
    });
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    expect(setDefInput.getAttribute("value")).toMatch(changedDefValue)
    setInfo.titles = ["A"]
    setInfo.definitions = ["1"]
})

//Test Case ID: Test61
test("validates that the duplicate title error message appears when there are duplicate titles detected after a blur", async () => {
    setInfo.titles = ["A", "A"]
    setInfo.definitions = ["1", "2"]
    await render(<EditableSetInfo setInfo={setInfo} />)
    const setTitles = screen.getAllByPlaceholderText("Title")
    // const changedDefValue = "Changed Def Value"
    //screen.debug()
    expect(setTitles[0]).toBeInTheDocument()
    expect(setTitles[0].getAttribute("type")).toMatch("text")
    expect(setTitles[0].getAttribute("value")).toMatch("A")
    expect(setTitles[0]).not.toHaveClass("duplicate")
    expect(setTitles[0].parentElement).toHaveClass("flashcardInputDiv")
    expect(setTitles[1]).toBeInTheDocument()
    expect(setTitles[1].getAttribute("type")).toMatch("text")
    expect(setTitles[1].getAttribute("value")).toMatch("A")
    expect(setTitles[1]).not.toHaveClass("duplicate")
    expect(setTitles[1].parentElement).toHaveClass("flashcardInputDiv")
    await act(() => {
        fireEvent.blur(setTitles[0])
    });
    await new Promise((r) => setTimeout(r, 2000))
    const duplicatesMessages = screen.getAllByText("Duplicate Titles are not allowed")
    expect(setTitles[0].getAttribute("value")).toMatch("A")
    expect(setTitles[0]).toHaveClass("duplicate")
    expect(setTitles[1].getAttribute("value")).toMatch("A")
    expect(setTitles[1]).toHaveClass("duplicate")
    expect(setTitles[1]).toHaveClass("duplicate")
    expect(duplicatesMessages[0]).toBeInTheDocument()
    expect(duplicatesMessages[0]).toHaveClass("duplicateMessage")
    expect(duplicatesMessages[1]).toBeInTheDocument()
    expect(duplicatesMessages[1]).toHaveClass("duplicateMessage")
    expect(screen.getByText("Submit")).toHaveAttribute("disabled")
    setInfo.titles = ["A"]
    setInfo.definitions = ["1"]
    //screen.debug()
    // expect(setDefInput.getAttribute("value")).toMatch(changedDefValue)
})

//Test Case ID: Test62
test("validates new flashcard input fields are added when the Add Flashcard button is clicked", async () => {
    await render(<EditableSetInfo setInfo={setInfo} />)
    const addFlashcardButton = screen.getAllByRole("button")[0]
    expect(addFlashcardButton).toBeInTheDocument()
    expect(addFlashcardButton).toHaveTextContent("Add Flashcard")
    expect(screen.queryByText("1.")).toBeInTheDocument()
    expect(screen.queryByText("2.")).not.toBeInTheDocument()
    //console.log(screen.getByText("1."))
    await act(() => {
        addFlashcardButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.queryByText("2.")).toBeInTheDocument()
    const newTitle = screen.getAllByPlaceholderText("Title")[1]
    const newDef = screen.getAllByPlaceholderText("Definition")[1]
    expect(newTitle.getAttribute("value")).toMatch("")
    expect(newDef.getAttribute("value")).toMatch("")

})

//Test Case ID: Test63
test("validates the passed function is called when the Submit button is clicked", async () => {
    await render(<EditableSetInfo setInfo={setInfo} handleSubmit={mockFn}/>)
    const submitButton = screen.getAllByRole("button")[1]
    expect(submitButton).toBeInTheDocument()
    expect(submitButton.getAttribute("value")).toMatch("Submit")
    await act(() => {
        submitButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(mockFn).toHaveBeenCalledTimes(1)
})

//Test Case ID: Test64
test("validates the blank title error message is shown when the user tries to submit with a empty title", async () => {
    await render(<EditableSetInfo setInfo={setInfo} handleSubmit={mockFn}/>)
    const setNameInput = screen.getByLabelText("Set Name:")
    const submitButton = screen.getAllByRole("button")[1]
    expect(submitButton).toBeInTheDocument()
    expect(submitButton.getAttribute("value")).toMatch("Submit")
    await act(() => {
        fireEvent.change(setNameInput, {target: {value: ''}})
    });
    await new Promise((r) => setTimeout(r, 2000))
    await act(() => {
        submitButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("The set must have a name")).toHaveClass("errorMessage")
})

//Test Case ID: Test65
test("validates the complete flashcard error message is shown when the user tries to submit with no complete flashcard title-definition pairs", async () => {
    setInfo.titles = ["A", "A"]
    setInfo.definitions = ["", ""]
    await render(<EditableSetInfo setInfo={setInfo} handleSubmit={mockFn}/>)
    const submitButton = screen.getAllByRole("button")[1]
    expect(submitButton).toBeInTheDocument()
    expect(submitButton.getAttribute("value")).toMatch("Submit")
    await act(() => {
        submitButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("At Least One Complete Flashcard is Required")).toHaveClass("errorMessage")
})



