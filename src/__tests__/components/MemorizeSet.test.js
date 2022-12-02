import {getDefaultNormalizer, render, screen} from "@testing-library/react";
import React from "react";
import MemorizeSet from "../../components/MemorizeSet";
import {act} from "react-dom/test-utils";

let setInfo = {
    id: "2d36e43c-470b-b13e-f50ba8669d2d",
    name: "Test Set 1",
    visibility: "private",
    description: "Description",
    titles: ["A", "B", "C"],
    definitions: ["1", "2", "3"],
    owner: "testuser",
};

let setId = "8798798798"

let currentUser = {
    username: "testuser",
    attributes: {
        name: "Test User"
    }
}

//Test Case ID: Test81
test('validate that the memorization session shows the correct message with the Title Side prop set to “Title”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Title side of the Flashcard Set, Test Set 1, in Original order without Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test82
test('validate that the memorization session shows the correct message with the Title Side prop set to “Definition”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={false} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Definition side of the Flashcard Set, Test Set 1, in Original order without Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test83
test('validate that the memorization session shows the correct message with the Original order prop set to “Original”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Title side of the Flashcard Set, Test Set 1, in Original order without Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test84
test('validate that the memorization session shows the correct message with the Original order prop set to “Random”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={false} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Title side of the Flashcard Set, Test Set 1, in Randomized order without Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test85
test('validate that the memorization session shows the correct message with the with Repetition prop set to “false”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Title side of the Flashcard Set, Test Set 1, in Original order without Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test86
test('validate that the memorization session shows the correct message with the with Repetition prop set to “true”', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={true}/>)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("Studying the Title side of the Flashcard Set, Test Set 1, in Original order with Repetition!")).toBeInTheDocument()
})

//Test Case ID: Test117
test('renders the MemorizeSet component', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    const progress = screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })
    const showingSide = screen.getByText("Showing the Title side")
    const cardIndex = screen.getByText("1 / 3")
    const frontSide = screen.getAllByText("A")
    const backSide = screen.getByText("1")
    const correct = screen.getByText("Correct")
    const incorrect = screen.getByText("Incorrect")

    expect(progress).toBeInTheDocument()
    expect(showingSide).toBeInTheDocument()
    expect(showingSide).toHaveClass("showingSide")
    expect(showingSide.parentElement).toHaveClass("showingSideDiv")
    expect(cardIndex).toBeInTheDocument()
    expect(cardIndex).toHaveClass("cardIndex")
    expect(cardIndex.parentElement).toHaveClass("showingSideDiv")
    expect(frontSide[0]).toHaveClass("front")
    expect(frontSide[0].parentElement).toHaveClass("card", "flip")
    expect(frontSide[0].parentElement.parentElement).toHaveClass("card-grid")
    expect(frontSide[0].parentElement.parentElement.parentElement).toHaveClass("contaainer")
    expect(frontSide[0].parentElement.parentElement.parentElement.parentElement).toHaveClass("browseControlDiv")
    expect(frontSide[1]).toHaveClass("heightDiv")
    expect(backSide).toHaveClass("heightDiv")
    expect(correct).toBeInTheDocument()
    expect(correct).toHaveClass("next_button")
    expect(correct.parentElement).toHaveClass("card_buttons")
    expect(incorrect).toBeInTheDocument()
    expect(incorrect).toHaveClass("prev_button")
    expect(incorrect.parentElement).toHaveClass("card_buttons")
})

//Test Case ID: Test118
test('validates the Correct Button displays the next Flashcard and increments the correct counter for studying without repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    const correctButton = screen.getByText("Correct")

    await act(() => {
        correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 1  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()
})

//Test Case ID: Test119
test('validates the Incorrect Button displays the next Flashcard and increments the incorrect counter for studying without repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 2000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    const incorrectButton = screen.getByText("Incorrect")

    await act(() => {
        incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 1", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()
})

//Test Case ID: Test120
test('validates the Correct Button displays the next Flashcard and increments the correct counter for studying with repetition when the card is guessed correctly the first time', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={true}/>)
    await new Promise((r) => setTimeout(r, 2000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    const correctButton = screen.getByText("Correct")

    await act(() => {
        correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 1  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()
})

//Test Case ID: Test121
test('validates the 2 Correct Guess Remaining message is displayed after guessing a card incorrectly the first time for studying with repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={true}/>)
    await new Promise((r) => setTimeout(r, 500))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    const incorrectButton = screen.getByText("Incorrect")

    await act(() => {
        incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 500))
    expect(screen.getByText("2 / 4")).toHaveClass("cardIndex")
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 1", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()
    console.log(screen.queryAllByText("A"))

    while(screen.queryAllByText("A").length === 0) {
        await act(() => {
            incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        await new Promise((r) => setTimeout(r, 500))
    }

    // screen.debug()
    expect(screen.getByText("2 Correct Guesses Remaining"))
})

//Test Case ID: Test122
test('validates the correct counter is incremented after guessing the card correctly 2 times after the first incorrect guess for studying with repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={true}/>)
    await new Promise((r) => setTimeout(r, 100))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 0", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    const incorrectButton = screen.getByText("Incorrect")
    const correctButton = screen.getByText("Correct")

    await act(() => {
        incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 100))
    expect(screen.getByText("2 / 4")).toHaveClass("cardIndex")
    expect(screen.getByText("Progress:  Correct: 0  |  Incorrect: 1", { normalizer: getDefaultNormalizer({collapseWhitespace: false}) })).toBeInTheDocument()

    while(screen.queryAllByText("A").length === 0) {
        await act(() => {
            incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        await new Promise((r) => setTimeout(r, 100))
    }

    await act(() => {
        correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 100))
    while(screen.queryAllByText("A").length === 0) {
        await act(() => {
            incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        await new Promise((r) => setTimeout(r, 100))
    }
    await act(() => {
        correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 100))

    expect(screen.getByText("Progress:  Correct: 1", { exact: false, normalizer: getDefaultNormalizer({collapseWhitespace: false})}))
})

///Test Case ID: Test123
test('Prints Correct Results for All Correct Answers for studying without repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 500))

    const correctButton = screen.getByText("Correct")

    for(let i = 0; i<3; i++) {
        await act(() => {
            correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        await new Promise((r) => setTimeout(r, 500))
    }
    //screen.debug()
    const finishedMessage = screen.getByText("Finished Studying the Title side of the Flashcard Set, Test Set 1, in Original order without Repetition!")
    const correctPer = screen.getByText("Correct Percentage: 100%")
    const incorrectGuesses = screen.getByText("Incorrect Guesses: 0")
    const newButton = screen.getByText("Run New Session")
    const exitButton = screen.getByText("Exit Session")

    expect(finishedMessage).toBeInTheDocument()
    expect(finishedMessage.parentElement).toHaveClass("memorizeFinished")
    expect(screen.getByText("Results")).toBeInTheDocument()
    expect(screen.getByText("Results")).toHaveClass("resultsHeader")
    expect(correctPer).toBeInTheDocument()
    expect(correctPer.parentElement).toHaveClass("memorizeResults")
    expect(incorrectGuesses).toBeInTheDocument()
    expect(incorrectGuesses.parentElement).toHaveClass("memorizeResults")
    expect(newButton).toBeInTheDocument()
    expect(newButton.parentElement).toHaveClass("finishedButtons")
    expect(exitButton).toBeInTheDocument()
    expect(exitButton.parentElement).toHaveClass("finishedButtons")
})

//Test Case ID: Test124
test('Prints Correct Results for Some Incorrect Answers for studying without repetition', async () => {
    await render(<MemorizeSet setId={setId} currentUser={currentUser} setInfo={setInfo} titleSide={true} originalOrder={true} withRepetition={false}/>)
    await new Promise((r) => setTimeout(r, 500))

    const correctButton = screen.getByText("Correct")
    const incorrectButton = screen.getByText("Incorrect")

    await act(() => {
        incorrectButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 500))

    for(let i = 0; i<2; i++) {
        await act(() => {
            correctButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        await new Promise((r) => setTimeout(r, 500))
    }
    //screen.debug()
    const finishedMessage = screen.getByText("Finished Studying the Title side of the Flashcard Set, Test Set 1, in Original order without Repetition!")
    const correctPer = screen.getByText("Correct Percentage: 66.66666666666666%")
    const incorrectGuesses = screen.getByText("Incorrect Guesses: 1")
    const incorrectCards = screen.getByText("Incorrectly Guessed Cards:")
    const card1 = screen.getByText("- Card #1 = 1 time")
    const newButton = screen.getByText("Run New Session")
    const exitButton = screen.getByText("Exit Session")

    expect(finishedMessage).toBeInTheDocument()
    expect(finishedMessage.parentElement).toHaveClass("memorizeFinished")
    expect(screen.getByText("Results")).toBeInTheDocument()
    expect(screen.getByText("Results")).toHaveClass("resultsHeader")
    expect(correctPer).toBeInTheDocument()
    expect(correctPer.parentElement).toHaveClass("memorizeResults")
    expect(incorrectGuesses).toBeInTheDocument()
    expect(incorrectGuesses.parentElement).toHaveClass("memorizeResults")
    expect(incorrectCards).toBeInTheDocument()
    expect(card1).toBeInTheDocument()
    expect(newButton).toBeInTheDocument()
    expect(newButton.parentElement).toHaveClass("finishedButtons")
    expect(exitButton).toBeInTheDocument()
    expect(exitButton.parentElement).toHaveClass("finishedButtons")
})