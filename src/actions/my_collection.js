import { COLLECTION_SET } from '../types';
// import _ from "lodash";

export const MyCollection = myCollection => ({
    type: COLLECTION_SET,
    myCollection
})


export const CreateCollection = collection => dispatch =>{
    console.log(collection);
    dispatch(MyCollection(collection))
}

export const AddToCollection = (collection,set) => dispatch => {
    console.log(collection,set)
    if (!collection[set]) {
        console.log("Add to collection");
    } else {
        dispatch(MyCollection(collection));
    }
}

/**
 * 
 * {

    dispatch(MyCollection(collection));

    // _.filter(collection, { setCode })
}
*/