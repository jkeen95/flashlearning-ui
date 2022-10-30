import {fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import {act} from "react-dom/test-utils";
import FlashcardTitleInput from "../../components/FlashcardTitleInput";

const titleValue = "This is the title input";
const mockFn = jest.fn();
const mockFn2 = jest.fn();
const index=6

//Test Case ID: Test31
test('renders the FlashcardTitleInput component with the duplicate className', async () => {

    render(<FlashcardTitleInput title={titleValue} handleTitleChange={mockFn} checkForDuplicates={mockFn2} index={index} duplicateTitle={true}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Title")
    expect(inputDiv).toBeInTheDocument()
    expect(inputDiv.getAttribute("type")).toMatch("text")
    expect(inputDiv.getAttribute("value")).toMatch(titleValue)
    expect(inputDiv).toHaveClass("duplicate")
})

//Test Case ID: Test32
test('renders the FlashcardTitleInput component without the duplicate className', async () => {

    render(<FlashcardTitleInput title={titleValue} handleTitleChange={mockFn} checkForDuplicates={mockFn2} index={index} duplicateTitle={false}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Title")
    expect(inputDiv).toBeInTheDocument()
    expect(inputDiv.getAttribute("type")).toMatch("text")
    expect(inputDiv.getAttribute("value")).toMatch(titleValue)
    expect(inputDiv).not.toHaveClass("duplicate")
})

//Test Case ID: Test33
test('validates that the handleTitleChange function prop is called when the input is changed', async () => {

    render(<FlashcardTitleInput title={""} handleTitleChange={mockFn} checkForDuplicates={mockFn2} index={index} duplicateTitle={true}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Title")
    await act(() => {
        fireEvent.change(inputDiv, {target: {value: titleValue}})
    });
    //await screen.debug()
    //console.log("input " + inputDiv.value)
    expect(mockFn).toHaveBeenCalledTimes(1)
})

//Test Case ID: Test34
test('validates that the checkForDuplicates function prop is called when the input is blurred', async () => {

    render(<FlashcardTitleInput title={""} handleTitleChange={mockFn} checkForDuplicates={mockFn2} index={index} duplicateTitle={true}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Title")
    await act(() => {
        fireEvent.blur(inputDiv, {target: {value: titleValue}})
    });
    //await screen.debug()
    expect(mockFn2).toHaveBeenCalledTimes(1)
})