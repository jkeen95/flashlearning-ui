import React from "react";
import {
    deleteSet,
    generateRandomNumber,
    getInvalidIndices,
    getSharedSet,
    removeEmpties,
    removeIndices,
    userExists
} from "../../utils/utils";
import {Auth, DataStore} from "aws-amplify";

const arrayToPass = ["A", "B", "C", "D", "E"]

afterEach(() => {
    jest.resetAllMocks()
})

//Test Case ID: Test39
test('Validates that removeEmpties returns an object with the empty title or  empty definition pairs removed', async () => {
    const titles = ["A", "", "C", "", "E"]
    const defs = ["", "1", "2", "3" ,""]
    const expectedValidTitles = ["C"]
    const expectedValidDefs = ["2"]
    const returnedObject = removeEmpties(titles, defs)
    expect(returnedObject.validTitles).toEqual(expectedValidTitles)
    expect(returnedObject.validDefs).toEqual(expectedValidDefs)
})

//Test Case ID: Test40
test('Validates that getInvalidIndices returns an empty array when there are no empty elements in the passed array', async () => {
    const noEmptyElements = ["A", "B", "C", "D", "E"]
    expect(getInvalidIndices(noEmptyElements)).toHaveLength(0)
})

//Test Case ID: Test41
test('Validates that getInvalidIndices returns an all element indices in an array when there are all empty elements in the passed array', async () => {
    const allEmptyElements = ["", "", "", "", ""]
    const expected = [0, 1, 2, 3, 4]
    expect(getInvalidIndices(allEmptyElements)).toEqual(expected)
})

//Test Case ID: Test42
test('Validates that getInvalidIndices returns the indices of the empty elements in the passed array', async () => {
    const someEmptyElements = ["", "B", "", "D", ""]
    const expected = [0, 2, 4]
    expect(getInvalidIndices(someEmptyElements)).toEqual(expected)
})

//Test Case ID: Test43
test('Validates that removeIndices returns an empty array when all indices are removed from the passed array', async () => {
    const indicesToRemove = [0, 1, 2, 3, 4]
    expect(removeIndices(arrayToPass, indicesToRemove)).toHaveLength(0)
})

//Test Case ID: Test44
test('Validates that removeIndices returns the original passed array when no indices to remove are passed to the function', async () => {
    const indicesToRemove = []
    expect(removeIndices(arrayToPass, indicesToRemove)).toEqual(arrayToPass)
})

//Test Case ID: Test45
test('Validates that removeIndices returns the expected array when some of the available indices are passed to the function', async () => {
    const indicesToRemove = [0, 2, 4]
    const expectedArray = ["B", "D"]
    expect(removeIndices(arrayToPass, indicesToRemove)).toEqual(expectedArray)
})

//Test Case ID: Test46
test('Validates that removeIndices will not remove invalid indices', async () => {
    const indicesToRemove = [5, 6, 27]
    expect(removeIndices(arrayToPass, indicesToRemove)).toEqual(arrayToPass)
})


async function mockDelete() {
    return []
}

async function mockQuery1() {
    return []
}

async function mockQuery2() {
    return ["item"]
}

async function mockQuery3(model) {
    //console.log(model)
    return [{"title": "Query3"}]
}

async function mockSignIn(username, password) {
    if(username === "test1") {
        throw {"code": "NotAuthorizedException"}
    }
    else if(username === "test2") {
        throw {"code": "SomethingElse"}
    }
}

//Test Case ID: Test126
test('Validates the spys are called once when the delete set method is called and no set is found', async () => {
    const dataStoreDeleteSpy = jest.spyOn(DataStore, "delete").mockImplementation(mockDelete)
    const dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery1)
    await deleteSet("111")
    expect(dataStoreDeleteSpy).toHaveBeenCalledTimes(1)
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(1)
})

//Test Case ID: Test127
test('Validates the delete spy is called twice when the delete set method is called and a set is found', async () => {
    const dataStoreDeleteSpy = jest.spyOn(DataStore, "delete").mockImplementation(mockDelete)
    const dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery2)
    await deleteSet("111")
    expect(dataStoreDeleteSpy).toHaveBeenCalledTimes(2)
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(1)
})

//Test Case ID: Test128
test('Validates that the number generated are between and including the provided min and max values', async () => {
    const returned = generateRandomNumber(2, 10)
    expect(returned).toBeGreaterThanOrEqual(2)
    expect(returned).toBeLessThanOrEqual(10)
})

//Test Case ID: Test129
test('Validates that userExists method returns true when the username entered is valid', async () => {
    const authSigninSpy = jest.spyOn(Auth, "signIn").mockImplementation(mockSignIn)
    const returned = await userExists("test1")
    expect(authSigninSpy).toHaveBeenCalledTimes(1)
    expect(returned).toBe(true)
})

//Test Case ID: Test130
test('Validates that userExists method returns false when the username entered is invalid', async () => {
    const authSigninSpy = jest.spyOn(Auth, "signIn").mockImplementation(mockSignIn)
    const returned = await userExists("test2")
    expect(authSigninSpy).toHaveBeenCalledTimes(1)
    expect(returned).toBe(false)
})

//Test Case ID: Test131
test('Validates that datastore query is run once when no set is found', async () => {
    const dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery1)
    const returned = await getSharedSet("id", "username")
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(1)
})

//Test Case ID: Test132
test('Validates that datastore query is run twice when a set is found', async () => {
    const dataStoreQuerySpy = jest.spyOn(DataStore, "query").mockImplementation(mockQuery1).mockImplementation(mockQuery3)
    await getSharedSet("id", "username")
    expect(dataStoreQuerySpy).toHaveBeenCalledTimes(2)
})

