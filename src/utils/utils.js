import {DataStore} from "aws-amplify";
import {FlashcardSet} from "../models";

export function removeEmpties(titles, defs) {
    const invalidTitleIndices = getInvalidIndices(titles)
    // console.log(invalidTitleIndices)
    titles = removeIndices(titles, invalidTitleIndices)
    defs = removeIndices(defs, invalidTitleIndices)
    // console.log(titles)
    // console.log(defs)
    const invalidDefsIndices = getInvalidIndices(defs)
    // console.log(invalidDefsIndices)
    defs = removeIndices(defs, invalidDefsIndices)
    titles = removeIndices(titles, invalidDefsIndices)
    console.log(defs)
    console.log(titles)
    return {validTitles: titles, validDefs: defs}
}

function getInvalidIndices(array) {
    return array.reduce((tempArr, current, index) => {
        if(current === "") {
            tempArr.push(index)
        }
        return tempArr
    }, []);
}

function removeIndices(array, indices) {
    const reducedArray = array.reduce((tempArr, current, index) => {
        if(!indices.includes(index)) {
            tempArr.push(current)
        }
        return tempArr
    }, []);
    return reducedArray
}

export async function deleteSet(setId) {
    await DataStore.delete(FlashcardSet, setId)
}
