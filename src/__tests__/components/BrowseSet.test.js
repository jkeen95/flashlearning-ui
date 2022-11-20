import {render, screen} from "@testing-library/react";
import React from "react";
import BrowseSet from "../../components/BrowseSet";
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

//Test Case ID: Test70
test('renders the BrowseSet component', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()

    const radioButtons = screen.getAllByRole("radio")
    const switchInput = screen.getByRole("switch")
    const randomizeSpan = screen.getByText("Randomize")
    const frontCard = screen.getAllByText("A")[0]
    const prevButton = screen.getByText("Previous")
    const nextButton = screen.getByText("Next")

    expect(screen.getByText("Current Flashcard Set Information")).toBeInTheDocument()
    expect(screen.getByText("ID: " + setInfo.id))
    expect(screen.getByText("Name: " + setInfo.name))
    expect(screen.getByText("Description: " + setInfo.description))
    expect(screen.getByText("Edit").getAttribute("href")).toMatch(`/set/${setInfo.id}/edit`)
    expect(screen.getByText("Memorize").getAttribute("href")).toMatch(`/set/${setInfo.id}/memorize`)
    expect(radioButtons[0].getAttribute("name")).toEqual("Title")
    expect(radioButtons[0].getAttribute("value")).toEqual("Title")
    expect(radioButtons[0]).toHaveAttribute("checked")
    expect(radioButtons[1].getAttribute("name")).toEqual("Definition")
    expect(radioButtons[1].getAttribute("value")).toEqual("Definition")
    expect(switchInput.getAttribute("type")).toEqual("checkbox")
    expect(randomizeSpan).toHaveClass("amplify-switch-label")
    expect(randomizeSpan.parentElement).toHaveClass("amplify-label")
    expect(randomizeSpan.parentElement.parentElement).toHaveClass("amplify-switchfield")
    expect(screen.getByText("Showing the Title side")).toHaveClass("showingSide")
    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(frontCard).toHaveClass("front")
    expect(frontCard.parentElement).toHaveClass("card")
    expect(frontCard.parentElement).toHaveClass("flip")
    expect(prevButton).toHaveClass("prev_button")
    expect(prevButton.parentElement).toHaveClass("card_buttons")
    expect(nextButton).toHaveClass("next_button")
    expect(nextButton.parentElement).toHaveClass("card_buttons")
})

//Test Case ID: Test71
test('validates the Next Button displays the next Flashcard', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 2000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()

    const nextButton = screen.getByText("Next")

    await act(() => {
        nextButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    //screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
})

//Test Case ID: Test72
test('validates the Previous Button loops to the back of the flashcard set when clicking the previous button from first card', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 2000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()

    const prevButton = screen.getByText("Previous")

    await act(() => {
        prevButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    screen.debug()
    expect(screen.getByText("3 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("C")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
})

//Test Case ID: Test73
test('validates the Previous Button displays the previous flashcard in the set ', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 1000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()

    const prevButton = screen.getByText("Previous")

    await act(() => {
        prevButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 1000))
    // screen.debug()
    expect(screen.getByText("3 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("C")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    await act(() => {
        prevButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 2000))
    // screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    expect(screen.queryByText("C")).not.toBeInTheDocument()
})

//Test Case ID: Test74
test('validates the Next Button loops to the front of the flashcard set when clicking the previous button from the last card', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 1000))

    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()

    const nextButton = screen.getByText("Next")

    await act(() => {
        nextButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 1000))
    //screen.debug()
    expect(screen.getByText("2 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("B")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    await act(() => {
        nextButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 1000))
    //screen.debug()
    expect(screen.getByText("3 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("C")[0]).toBeInTheDocument()
    expect(screen.queryByText("A")).not.toBeInTheDocument()
    expect(screen.queryByText("B")).not.toBeInTheDocument()
    await act(() => {
        nextButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    await new Promise((r) => setTimeout(r, 1000))
    //screen.debug()
    expect(screen.getByText("1 / 3")).toHaveClass("cardIndex")
    expect(screen.queryAllByText("A")[0]).toBeInTheDocument()
    expect(screen.queryByText("B")).not.toBeInTheDocument()
    expect(screen.queryByText("C")).not.toBeInTheDocument()
})

//Test Case ID: Test75
test('validates clicking the flashcard element swaps the showing side of the flashcard', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 1000))
    const frontCard = screen.getAllByText("A")[0]
    expect(frontCard).toHaveClass("front")
    expect(frontCard.parentElement).toHaveClass("card")
    expect(frontCard.parentElement).toHaveClass("flip")
    expect(screen.queryByText("Showing the Title side")).toBeInTheDocument()
    expect(screen.getByText("Showing the Title side")).toHaveClass("showingSide")
    await act(() => {
        frontCard.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    //screen.debug()

    expect(screen.getAllByText("1")[0]).toBeInTheDocument()
    expect(screen.getAllByText("1")[0]).toHaveClass("back")
    expect(screen.getAllByText("1")[0].parentElement).toHaveClass("card")
    expect(screen.getAllByText("1")[0].parentElement).not.toHaveClass("flip")
    expect(screen.queryByText("Showing the Definition side")).toBeInTheDocument()
    expect(screen.getByText("Showing the Definition side")).toHaveClass("showingSide")
})

//Test Case ID: Test76
test('renders the BrowseSet swap side', async () => {
    await render(<BrowseSet setId={setId} currentUser={currentUser} setInfo={setInfo} />)
    await new Promise((r) => setTimeout(r, 1000))
    const randomizeSpan = screen.getByText("Randomize")
    const nextButton = screen.getByText("Next")
    // console.log(randomizeSpan.nextSibling)
    const switchTrackSpan = randomizeSpan.nextSibling
    expect(switchTrackSpan).toHaveClass("amplify-switch-track")
    expect(switchTrackSpan).not.toHaveClass("amplify-switch-track--checked")
    expect(switchTrackSpan).toHaveAttribute("data-focused", "false")
    expect(switchTrackSpan).not.toHaveAttribute("data-checked")
    expect(switchTrackSpan.firstChild).toHaveClass("amplify-switch-thumb")
    expect(switchTrackSpan.firstChild).not.toHaveAttribute("data-checked")

    await act(() => {
        randomizeSpan.nextSibling.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(switchTrackSpan).toHaveClass("amplify-switch-track")
    expect(switchTrackSpan).toHaveClass("amplify-switch-track--checked")
    expect(switchTrackSpan).toHaveAttribute("data-focused", "false")
    expect(switchTrackSpan).toHaveAttribute("data-checked", "true")
    expect(switchTrackSpan.firstChild).toHaveClass("amplify-switch-thumb")
    expect(switchTrackSpan.firstChild).toHaveClass("amplify-switch-thumb--checked")
    expect(switchTrackSpan.firstChild).toHaveAttribute("data-checked", "true")
})