import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    publicData: userId => 
      axios
        .get(`/api/users/public?id=${userId}`)
        .then(res => res.data)
  },
  cards: {
    getCardsFromSet: set => 
      axios
        .get(`/api/cards/findSetByCode?setCode=${set}`)
        .then(res => res.data.cards)      
  },
  collection: {
    setValueToCard: collectionObj =>
      axios
        .post('/api/collection/setValueToCard', collectionObj)
        .then(res => res.data.collection),
    GetCollectionQuantity: cardId =>
      axios
        .get(`/api/collection/getQuantity?id=${cardId}`)
        .then(res => res.data.collection),
    CreateCollection: collectionObj =>
      axios
        .post('/api/collection/createCollection/', collectionObj)
        .then(res => res.data.collection),
    getCollection: () =>
      axios
        .get('/api/collection/getCollection')
        .then(res => res.data.collection)
  },
  deck: {
    CreateDeck: deckObject =>
      axios
        .post('/api/decks/', deckObject)
        .then(res => res.data.deck),
    GetLoginDeck: () =>
      axios
        .get('/api/decks/getAllDecks')
        .then(res => res.data.decks),
    GetUsersDecks: (UserId) => 
      axios
        .get(`/api/decks/getUserDecks?userId=${UserId}`)
        .then(res => res.data.decks),
    GetDeckById: (DeckId) =>
      axios
        .get(`/api/decks/findById?id=${DeckId}`)
        .then(res => res.data.deck)
  }
};
