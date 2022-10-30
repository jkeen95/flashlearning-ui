import {render, screen} from '@testing-library/react';
import React from "react";
import {act} from "react-dom/test-utils";
import FlipFlashcard from "../../components/FlipFlashcard";

const front = "This is the front"
const back = "This is the back"
const mockFn = jest.fn();

//Test Case ID: Test27
test('renders Front Side of a FlapFlashcard', async () => {
    const frontSide = true


    render(<FlipFlashcard frontSide={frontSide} front={front} back={back} swapSide={mockFn}/>)
    //screen.debug()
    const cardDiv = screen.getByText(front)
    expect(cardDiv).toHaveClass("front")
    expect(cardDiv).not.toHaveClass("back")
    expect(cardDiv.parentElement).toHaveClass("card")
    expect(cardDiv.parentElement).toHaveClass("flip")
})

//Test Case ID: Test28
test('renders Back Side of a FlapFlashcard', async () => {
    const frontSide = false


    render(<FlipFlashcard frontSide={frontSide} front={front} back={back} swapSide={mockFn}/>)
    //screen.debug()
    const cardDiv = screen.getByText(back)
    expect(cardDiv).toHaveClass("back")
    expect(cardDiv).not.toHaveClass("front")
    expect(cardDiv.parentElement).toHaveClass("card")
    expect(cardDiv.parentElement).not.toHaveClass("flip")
})

//Test Case ID: Test29
test('FlipFlashcard onClick function is called when card div is clicked', async () => {
    const frontSide = true


    render(<FlipFlashcard frontSide={frontSide} front={front} back={back} swapSide={mockFn}/>)
    //screen.debug()
    const cardClickable = screen.getByText(front).parentElement
    await act(() => {
        cardClickable.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(mockFn).toHaveBeenCalledTimes(1)
})
