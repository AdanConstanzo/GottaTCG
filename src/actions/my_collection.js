import _ from "lodash";
 
import { COLLECTION_SET, COLLECTION_DB_ADD } from '../types';

export const MyCollection = myCollection => ({
    type: COLLECTION_SET,
    myCollection
});

export const CollectionDB = collectionDB => ({
    type: COLLECTION_DB_ADD,
    collectionDB 
})

export const SetCollections = collection => dispatch =>{
    dispatch(MyCollection(collection.all))
    dispatch(CollectionDB(collection))
}

function addCollection(collection,filter,code){
    const col = collection;
    col[code] = filter;
    return col;
}

export const AddToCollection = (collection,setCode) => dispatch => {
    // Adding to Collection
    if (!collection[setCode]) {
        dispatch(CollectionDB(addCollection(collection,_.filter(collection.all, { setCode }),setCode)))
        dispatch(MyCollection(_.filter(collection.all, { setCode })));
    } 
    // Setting Current Collection.
    else {
        dispatch(MyCollection(collection[setCode]));
    }
}