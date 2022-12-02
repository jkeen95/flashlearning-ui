import {render, screen} from "@testing-library/react";
import React from "react";
import Navbar from "../../components/Navbar";

//Test Case ID: Test47
test('renders a Navbar component with data from navMenuItems.js', async () => {

    const menuItemClassName = "menu-items"
    const menusClassName = "menus"

    await render(<Navbar />)
    //screen.debug()

    const homeA = screen.getByText("Home")
    const homeLi = homeA.parentElement
    const nav = homeLi.parentElement.parentElement
    const newSetA = screen.getByText("Create New Set")
    const newSetLi = newSetA.parentElement
    const signOutButton = screen.getByText("Sign Out")
    const singOutLi = signOutButton.parentElement

    expect(homeA.getAttribute("href")).toMatch("/")
    expect(homeLi).toHaveClass(menuItemClassName)
    expect(homeLi.parentElement).toHaveClass(menusClassName)
    expect(newSetA.getAttribute("href")).toMatch("/create/set")
    expect(newSetLi).toHaveClass(menuItemClassName)
    expect(newSetLi.parentElement).toHaveClass(menusClassName)
    expect(signOutButton).toBeInTheDocument()
    expect(singOutLi).toHaveClass(menuItemClassName)
    expect(singOutLi.parentElement).toHaveClass(menusClassName)
    expect(nav.tagName.toLowerCase()).toMatch("nav")
})