import {render, screen} from '@testing-library/react';
import React from "react";
import App from '../App';
import {act} from "react-dom/test-utils";

//Test Case ID: Test18
test('renders App', async () => {
    let appComponent ;
    await act(() => {
        appComponent = render(<App/>).container
    })
    //screen.debug()
    expect(appComponent.firstChild).toHaveClass("App")
    expect(screen.getByAltText("FlashLearning logo")).toBeInTheDocument()
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent("Sign In")
    expect(screen.getByRole('tab', { selected: false })).toHaveTextContent("Create Account")
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Sign In/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Forgot your password?/i})).toBeInTheDocument()
})
