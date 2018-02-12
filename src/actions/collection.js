import { CARD_QUANTITY_VALUE } from '../types';
import api from '../api';

export const CardQuantValue = collection => ({
    type: CARD_QUANTITY_VALUE,
    collection
})

export const GetCollectionQuantity = cardId => dispatch =>
    api.collection.GetCollectionQuantity(cardId)
        .then(CollectionObject =>
            dispatch(CardQuantValue(CollectionObject))
        )

export const SetValueToCardCollection = collectionObj => dispatch =>
    api.collection.setValueToCard(collectionObj)
        .then(cardVal =>
            dispatch(CardQuantValue(cardVal))
        );
        
export const CreateCollection = collectionObj => dispatch =>
    api.collection.CreateCollection(collectionObj)
        .then(col => 
            dispatch(CardQuantValue(col))  
        );