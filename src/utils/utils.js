import {Auth, DataStore} from "aws-amplify";
import {FlashcardSet, SharedSet} from "../models";

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
    const toDelete = await DataStore.query(SharedSet, (set) => set.setId("eq", setId));
    //console.log(toDelete)
    if(toDelete.length !== 0) {
        await DataStore.delete(toDelete[0])
    }
}

export function generateRandomNumber(min, max) {
    return Math.floor(Math.random() *(max - min + 1)) + min;
}

export async function userExists(username) {
    return Auth.signIn(username, "123").then(res => {
        return false;
    }).catch(error => {
        const code = error.code;
        //console.log(error)
        switch (code) {
            case 'NotAuthorizedException':
                return true;
            default:
                return false;
        }
    })

}

export async function getSharedSet(setId, username) {
    let set = {}
    const temp =  await DataStore.query(SharedSet, (set) =>
        set.setId('eq', setId).username('eq', username)
    ).then(async result => {
        //console.log(result)
        if (result.length !== 0) {
            await DataStore.query(FlashcardSet, (set) =>
                set.id('eq', result[0].setId)
            ).then(result => {
                //console.log(result)
                set = result[0]
                return result[0]
            })
        } else {
            return {}
        }
    })
    //console.log("set " + set)
    return set
}