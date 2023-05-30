import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
//importação das rotas
import routes from "./routes.js"

//configuração do 'dotenv' para variáveis de ambiente
dotenv.config()
//criação do servidor 'express'
const app = express()

//configuração do 'middleware morgan' para rodar as requisições
app.use(morgan('dev'))
//configuração do 'express' para receber dados em 'json' nas requisições
app.use(express.json())
//configuração das rotas do arquivo 'routes.js'
app.use(routes) 
//configuração da porta do servidor 'express'
const port = process.env.PORT || 3000
//inicialização do servidor express na porta configurada
app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})