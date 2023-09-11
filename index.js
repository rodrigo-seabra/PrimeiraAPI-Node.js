//Configurações iniciais
const express = require('express'); /**No node.js há essa maneira de
importar arquivos, usando o require, onde o node vai procurar o arquivo */
const app = express();/**Inicialização da variável app - padrão bem utilizado.
E, esse app vai executar o express como uma função, ou seja, inicializando
o express de fato */
const { default: mongoose } = require('mongoose');
require('dotenv').config() //IMPORT DA VARIAVEL DE AMBIENTE



//FORMAS DE LER JSON- MIDDLEWARES

/**Para configurar essa forma usa-se middlewares, ou seja, recurso que são 
 * executados entre as requisições e respostas
 */
app.use(
  express.urlencoded({
      extended:true
  })
)
app.use(express.json())



//ROTA INICIAL / ENDPOINT

/**Pega-se o app e coloca na sua frente . + algum verbo http que eu queira disponibilizar essa rota  */
app.get('/' /** Determinação de um ponto de acesso (endpoint) 
A rota "/" é a home de qualquer site */, 
(req, res /** por mais que um dos dois argumentos não seja utilizado, é um padrão sempre coloca-los juntos */) => {
  res.json({message: 'Oi express'})
  /**em res.json, esta sendo dito que a resposta para a rota "/" será um JSON */
})
// esse código é uma maneira de ler requisições


//ROTAS DA API SIMPLIFICADA
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)


//ENTREGAR UMA PORTA E CONECTAR-SE COM O MONGODB

// as informações dbuser e dbpassword devem estar em um arquivo dotenv
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-1hqtbwu-shard-00-00.r6bfifi.mongodb.net:27017,ac-1hqtbwu-shard-00-01.r6bfifi.mongodb.net:27017,ac-1hqtbwu-shard-00-02.r6bfifi.mongodb.net:27017/?ssl=true&replicaSet=atlas-mllo75-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url) // - esse conect é promise base, ou seja, junto com ele tem o then e  o catch
.then /**o que eu quero fazer quando der certo */ ( () => {
    console.log("Conectamos ao mongo db")
    app.listen(3000) // é crucial disponibilizar a rota que foi especificada no script do nodemon
})
.catch/**o que eu quero fazer quando der errado */ ((err) => {
    console.log(err)
})


//OBS FAZER DOWNLOAD = npm install express nodemon mongoose dotenv
//baixar essa versao do mongoDB = npm install mongodb@2.2.12







