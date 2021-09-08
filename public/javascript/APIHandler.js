class APIHandler {
  constructor (baseUrl) {

    this.app = axios.create({
        baseURL: 'https://minions-api.herokuapp.com'
      })
    
  }
  getFullList = () => this.app.get('/characters')

  getOneRegister = id => this.app.get(`/characters/${id}`)

  createOneRegister = dataCharacter => this.app.post('/characters', dataCharacter)

  updateOneRegister = (id, dataCharacter) => this.app.put(`characters/${id}`, dataCharacter)

  deleteOneRegister = id => this.app.delete(`/characters/${id}`)

}
