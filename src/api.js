import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data),
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
        .then(res => res.data),
    userAcount: () => 
      axios
        .get("/api/users/")
        .then(res => res.data.user),
    UploadUserImage: (image,UserId) =>
      axios
        .post(`/api/users/userImage?UserId=${UserId}`,  image )
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
  pokemonType: {
    getAllTypes: () => axios
      .get('/api/types/all')
      .then(res => res.data.types)
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
        .then(res => res.data.deck),
    GetAllDecks: ()  => 
      axios
        .get('/api/decks/getAll')
        .then(res => res.data.decks),
    GetAllDecksByType: (type) =>
      axios
        .get(`/api/decks/getAllByType?pokemonType=${type}`)
        .then(res => res.data.decks),
    GetAllTypesByLimit: (limit) =>
      limit ? 
        axios
          .get(`/api/decks/getAllTypesByLimit?limit=${limit}`)
          .then(res => res.data.Decks) :
        axios
          .get('api/decks/getAllTypesByLimit')
          .then(res => res.data.Decks)
  },
  voting: {
    LookVote: (deckId) =>
      axios
        .get(`/api/voting/lookVote?deckId=${deckId}`)
        .then(res => res.data.vote),
    SetVote: (deckId, vote) =>
      axios
        .post(`/api/voting/vote?deckId=${deckId}&value=${vote}`)
        .then(res => res.data.vote),
    VoteCount: (deckId) =>
      axios
        .get(`/api/voting/voteCount?deckId=${deckId}`)
        .then(res => res.data.count)
  }
};
