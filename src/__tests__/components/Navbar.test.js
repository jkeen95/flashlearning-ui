import {render, screen} from "@testing-library/react";
import React from "react";
import Navbar from "../../components/Navbar";

//Test Case ID: Test47
test('renders a Navbar component with data from navMenuItems.js', async () => {

    const menuItemClassName = "menu-items"
    const dropdownClasName = "dropdown"
    const menusClassName = "menus"

    await render(<Navbar />)
    //screen.debug()

    const homeA = screen.getByText("Home")
    const homeLi = homeA.parentElement
    const nav = homeLi.parentElement.parentElement
    const newSetA = screen.getByText("New Flashcard Set")
    const newSetLi = newSetA.parentElement
    const newClassA = screen.getByText("New Class")
    const newClassLi = newClassA.parentElement
    const createLi = newSetLi.parentElement.parentElement
    const signOutA = screen.getByText("Sign Out")
    const singOutLi = signOutA.parentElement

    //console.log(nav.tagName.toLowerCase())

    expect(homeA.getAttribute("href")).toMatch("/")
    expect(homeLi).toHaveClass(menuItemClassName)
    expect(homeLi.parentElement).toHaveClass(menusClassName)
    expect(newSetA.getAttribute("href")).toMatch("/create/set")
    expect(newSetLi).toHaveClass(menuItemClassName)
    expect(newSetLi.parentElement).toHaveClass(dropdownClasName)
    expect(newSetLi.parentElement.parentElement).toHaveClass(menuItemClassName)
    expect(newClassA.getAttribute("href")).toMatch("/create/class")
    expect(newClassLi).toHaveClass(menuItemClassName)
    expect(newClassLi.parentElement).toHaveClass(dropdownClasName)
    expect(createLi.parentElement).toHaveClass(menusClassName)
    expect(signOutA.getAttribute("href")).toMatch("/signout")
    expect(singOutLi).toHaveClass(menuItemClassName)
    expect(singOutLi.parentElement).toHaveClass(menusClassName)
    expect(screen.getByRole('button', { expanded: false })).toHaveTextContent("Create")
    expect(nav.tagName.toLowerCase()).toMatch("nav")
})