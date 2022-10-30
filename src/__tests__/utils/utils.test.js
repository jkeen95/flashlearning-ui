import React from "react";
import {getInvalidIndices, removeEmpties, removeIndices} from "../../utils/utils";

const arrayToPass = ["A", "B", "C", "D", "E"]

//Test Case ID: Test39
test('Validates that removeEmpties returns an object with the empty title or  empty definition pairs removed', async () => {
    const titles = ["A", "", "C", "", "E"]
    const defs = ["", "1", "2", "3" ,""]
    const expectedValidTitles = ["C"]
    const expectedValidDefs = ["2"]
    const returnedObject = removeEmpties(titles, defs)
    //console.log(JSON.stringify(returnedObject))
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
    //console.log(getInvalidIndices(someEmptyElements))
    // expect(getInvalidIndices(someEmptyElements).every(element => expected.includes(element)))
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