import {render, screen} from '@testing-library/react';
import React from "react";
import FlashcardInput from "../../components/FlashcardInput";

const titleValue = "This is the title input";
const definitionValue = "This is the definition input";
const duplicateTitleMessgae = "Duplicate Titles are not allowed"
const mockFn = jest.fn();
const mockFn2 = jest.fn();
const mockFn3 = jest.fn();
const index=6

//Test Case ID: Test5
test('renders the FlashcardInput with the input provided', async () => {
    render(<FlashcardInput title={titleValue} definition={definitionValue} handleTitleChange={mockFn} handleDefChange={mockFn2} checkForDuplicates={mockFn3} index={index} duplicateTitle={false}/>)
    expect(screen.getByPlaceholderText("Title")).toHaveAttribute("value", titleValue)
    expect(screen.getByPlaceholderText("Definition")).toHaveAttribute("value", definitionValue)
})

//Test Case ID: Test37
test('renders the FlashcardInput component without the duplicate flashcard message', async () => {

    render(<FlashcardInput title={titleValue} definition={definitionValue} handleTitleChange={mockFn} handleDefChange={mockFn2} checkForDuplicates={mockFn3} index={index} duplicateTitle={false}/>)
    //screen.debug()
    const flashcardInputDiv = screen.getByPlaceholderText("Title").parentElement
    const titleInputDiv = screen.getByPlaceholderText("Title")
    const defInputDiv = screen.getByPlaceholderText("Definition")

    expect(flashcardInputDiv).toBeInTheDocument()
    expect(flashcardInputDiv).toHaveClass("flashcardInputDiv")
    expect(titleInputDiv).toBeInTheDocument()
    expect(titleInputDiv.getAttribute("type")).toMatch("text")
    expect(titleInputDiv.getAttribute("value")).toMatch(titleValue)
    expect(titleInputDiv).not.toHaveClass("duplicate")
    expect(defInputDiv).toBeInTheDocument()
    expect(defInputDiv.getAttribute("type")).toMatch("text")
    expect(defInputDiv.getAttribute("value")).toMatch(definitionValue)
})

//Test Case ID: Test38
test('renders the FlashcardInput component with the duplicate flashcard message', async () => {

    render(<FlashcardInput title={titleValue} definition={definitionValue} handleTitleChange={mockFn} handleDefChange={mockFn2} checkForDuplicates={mockFn3} index={index} duplicateTitle={true}/>)
    //screen.debug()
    const flashcardInputDiv = screen.getByPlaceholderText("Title").parentElement
    const titleInputDiv = screen.getByPlaceholderText("Title")
    const defInputDiv = screen.getByPlaceholderText("Definition")
    const duplicateMessageDiv = screen.getByText(duplicateTitleMessgae)

    expect(flashcardInputDiv).toBeInTheDocument()
    expect(flashcardInputDiv).toHaveClass("flashcardInputDiv")
    expect(titleInputDiv).toBeInTheDocument()
    expect(titleInputDiv.getAttribute("type")).toMatch("text")
    expect(titleInputDiv.getAttribute("value")).toMatch(titleValue)
    expect(titleInputDiv).toHaveClass("duplicate")
    expect(defInputDiv).toBeInTheDocument()
    expect(defInputDiv.getAttribute("type")).toMatch("text")
    expect(defInputDiv.getAttribute("value")).toMatch(definitionValue)
    expect(duplicateMessageDiv).toHaveClass("duplicateMessage")
})

