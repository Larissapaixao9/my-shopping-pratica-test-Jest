import app from '../src/app'
import supertest from 'supertest'

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async()=>{
    const body={
      title: 'relogio8',
      url: 'https://www.youtube.com.br/',
      description: 'relogio dourado',
      amount: 250
    }

    const result = await supertest(app).post('/items').send(body)
    const status = result.status

    expect(status).toEqual(201)

  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async()=>{
    const body={
      title: 'relogio',
      url: 'https://www.youtube.com.br/',
      description: 'relogio dourado',
      amount: 250
    }

    const result = await supertest(app).post('/items').send(body)
    const status = result.status

    expect(status).toEqual(409)
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async()=>{

    const result = await supertest(app).get('/items').send({})

    const status = result.status

    expect(status).toEqual(200)
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async()=>{

    let id=1;

    const result = await supertest(app).get(`/items/${id}`).send({})

    const status = result.status

    expect(status).toEqual(200)

  });
  it('Deve retornar status 404 caso não exista um item com esse id', async()=>{

    let id=100

    const result = await supertest(app).get(`/items/${id}`).send({})

    const status = result.status

    expect(status).toEqual(404)
  });
});
