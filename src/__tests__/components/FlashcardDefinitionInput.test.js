import {fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import FlashcardDefinitionInput from "../../components/FlashcardDefinitionInput";
import {act} from "react-dom/test-utils";

const definitionValue = "This is the definition input";
const mockFn = jest.fn();
const index=6

async function mockOnChange(event, eventIndex) {
    return eventIndex === index
}

//Test Case ID: Test35
test('renders the FlashcardDefinitionInput component', async () => {

    render(<FlashcardDefinitionInput definition={definitionValue} handleDefChange={mockFn} index={index}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Definition")
    expect(inputDiv).toBeInTheDocument()
    expect(inputDiv.getAttribute("type")).toMatch("text")
    expect(inputDiv.getAttribute("value")).toMatch(definitionValue)
})

//Test Case ID: Test36
test('validates that the handleDefChange function prop is called when the input is changed', async () => {

    render(<FlashcardDefinitionInput definition={""} handleDefChange={mockFn} index={index}/>)
    //screen.debug()
    const inputDiv = screen.getByPlaceholderText("Definition")
    await act(() => {
       fireEvent.change(inputDiv, {target: {value: definitionValue}})
    });
    //await screen.debug()
    // console.log("input " + inputDiv.value)
    expect(mockFn).toHaveBeenCalledTimes(1)
})