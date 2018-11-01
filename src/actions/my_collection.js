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

    if(filter.length === 0)
        col[code] = [{}];
    else 
        col[code] = filter;
    return col;
}

export const AddToCollection = (collection,setCode) => dispatch => {
    // Adding to Collection
    if (!collection[setCode]) {
        let col = _.filter(collection.all, { set_code: setCode });
        
        if (col.length === 0)
            col = [{}];
        dispatch(CollectionDB(addCollection(collection, col, setCode)));
        dispatch(MyCollection(col));
    } 
    // Setting Current Collection.
    else {
        dispatch(MyCollection(collection[setCode]));
    }
}