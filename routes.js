import express from "express"

//atribuição das rotas do 'express' para a constante 'routes'
const routes = express.Router()

routes.get('/users',(req,res) => {
    res.json({
        mensagem: 'Hello Word'
    })
})

export default routes