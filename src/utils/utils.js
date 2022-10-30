import {DataStore} from "aws-amplify";
import {FlashcardSet} from "../models";

export function removeEmpties(titles, defs) {
    const invalidTitleIndices = getInvalidIndices(titles)
    titles = removeIndices(titles, invalidTitleIndices)
    defs = removeIndices(defs, invalidTitleIndices)
    const invalidDefsIndices = getInvalidIndices(defs)
    defs = removeIndices(defs, invalidDefsIndices)
    titles = removeIndices(titles, invalidDefsIndices)
    return {validTitles: titles, validDefs: defs}
}

export function getInvalidIndices(array) {
    return array.reduce((tempArr, current, index) => {
        if(current === "") {
            tempArr.push(index)
        }
        return tempArr
    }, []);
}

export function removeIndices(array, indices) {
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
