import {render, screen} from "@testing-library/react";
import React from "react";
import Dropdown from "../../components/Dropdown";
import dropdown from "../../components/Dropdown";

const subMenus = [{
    url: "url1",
    title: "Title1"
}, {
    url: "url2",
    title: "Title2"
}]

const menuItemClassName = "menu-items"

//Test Case ID: Test66
test('renders a Dropdown with the show className and its sub menus', async () => {

    render(<Dropdown submenus={subMenus} dropdown={true}/>)
    //screen.debug()

    const title1A = screen.getByText(subMenus[0].title)
    const title2A = screen.getByText(subMenus[1].title)
    const title1Li = title1A.parentElement
    const title2Li = title2A.parentElement

    expect(title1A).toBeInTheDocument()
    expect(title1A.getAttribute("href")).toMatch(subMenus[0].url)
    expect(title1Li).toHaveClass(menuItemClassName)
    expect(title1Li.parentElement).toHaveClass("dropdown")
    expect(title1Li.parentElement).toHaveClass("show")
    expect(title2A).toBeInTheDocument()
    expect(title2A.getAttribute("href")).toMatch(subMenus[1].url)
    expect(title2Li).toHaveClass(menuItemClassName)
    expect(title2Li.parentElement).toHaveClass("dropdown")
    expect(title2Li.parentElement).toHaveClass("show")
})

//Test Case ID: Test67
test('renders a Dropdown without the show className but with its sub menus', async () => {

    render(<Dropdown submenus={subMenus} dropdown={false}/>)
    //screen.debug()

    const title1A = screen.getByText(subMenus[0].title)
    const title2A = screen.getByText(subMenus[1].title)
    const title1Li = title1A.parentElement
    const title2Li = title2A.parentElement

    expect(title1A).toBeInTheDocument()
    expect(title1A.getAttribute("href")).toMatch(subMenus[0].url)
    expect(title1Li).toHaveClass(menuItemClassName)
    expect(title1Li.parentElement).toHaveClass("dropdown")
    expect(title1Li.parentElement).not.toHaveClass("show")
    expect(title2A).toBeInTheDocument()
    expect(title2A.getAttribute("href")).toMatch(subMenus[1].url)
    expect(title2Li).toHaveClass(menuItemClassName)
    expect(title2Li.parentElement).toHaveClass("dropdown")
    expect(title2Li.parentElement).not.toHaveClass("show")
})