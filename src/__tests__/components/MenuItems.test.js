import {render, screen} from "@testing-library/react";
import React from "react";
import MenuItems from "../../components/MenuItems";
import {act} from "react-dom/test-utils";

const items = {submenu: [{
    url: "url1",
    title: "Title1"
}, {
    url: "url2",
    title: "Title2"
}]}

const menuItemClassName = "menu-items"

//Test Case ID: Test48
test('renders a MenuItem component which has submenus', async () => {

    await render(<MenuItems items={items}/>)
    //screen.debug()

    const title1A = screen.getByText(items.submenu[0].title)
    const title2A = screen.getByText(items.submenu[1].title)
    const title1Li = title1A.parentElement
    const title2Li = title2A.parentElement
    const ul = title1Li.parentElement

    expect(title1A).toBeInTheDocument()
    expect(title1A.getAttribute("href")).toMatch(items.submenu[0].url)
    expect(title1Li).toHaveClass(menuItemClassName)
    expect(title1Li.parentElement).toHaveClass("dropdown")
    expect(title1Li.parentElement).not.toHaveClass("show")
    expect(title2A).toBeInTheDocument()
    expect(title2A.getAttribute("href")).toMatch(items.submenu[1].url)
    expect(title2Li).toHaveClass(menuItemClassName)
    expect(title2Li.parentElement).toHaveClass("dropdown")
    expect(title2Li.parentElement).not.toHaveClass("show")
    expect(ul).toHaveClass("dropdown")
    expect(screen.getByRole('button', { expanded: false }))
    expect(ul.parentElement).toHaveClass(menuItemClassName)
})

//Test Case ID: Test49
test('renders a MenuItem component which does not have submenus', async () => {

    const noSubmenuItem = {
        url: "url1",
        title: "No submenu Title"
    }

    await render(<MenuItems items={noSubmenuItem}/>)
    //screen.debug()

    const noMenuTitleA = screen.getByText(noSubmenuItem.title)

    expect(noMenuTitleA).toBeInTheDocument()
    expect(noMenuTitleA.getAttribute("href")).toMatch(items.submenu[0].url)
    expect(noMenuTitleA.parentElement).toHaveClass(menuItemClassName)
})

//Test Case ID: Test50
test('validate that the onClickButton changes the expanded', async () => {
    await render(<MenuItems items={items}/>)

    const button = screen.getByRole('button', { expanded: false })
    await act(() => {
        button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    //screen.debug()

    const ul = screen.getByText(items.submenu[0].title).parentElement.parentElement
    expect(ul).toHaveClass("dropdown")
    expect(ul).toHaveClass("show")
    expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument()
})