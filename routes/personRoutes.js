// melhorar a api deixando o arquivo index mais limpo, a partir da criação dessa pasta


const router = require('express').Router()
const Person = require('../models/Person') /**para acessar um arquivo com o require, basta dar um "./" e navegar pelos arquivos */




// ROTAS DA API

 // rota de criação
router.post('/', async (req, res) => { /**Como tem q se fazer uma comunicação com o banco 
 e essa comunicação pode demorar um certo tempo, portanto para garantir que esse tempo seja 
 respeitado, cria - se uma função async (funcao assincrona)  */
 
 //req.body
   const { name, salary, approved } = req.body 
 
 
   if(!name){
     res.status(422).json( {error: 'O nome é obrigatório' })
     return //esse return aqui serve para finalizar a execução da requisição aqui
   }
   //objeto com os atributos vindos da requisação.body para enviar pro banco de dados
   const person = {
     name,
     salary,
     approved,
   }
 
 
   // metodo create do mongoose que vai criar dados no sistema
   try /** como essa criação pode falhar, usa-se o try / catch para captar os erros que podem ocorrer */ {
     
     //criando dados
     await Person.create(person) 
     res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
   } catch (error) {
     res.status(500).json({ erro: error }) //erro atribuido a um problema no servidor - nem sempre a melhor alternativa
   }
 })


//rota de coleta de dados
//read - leitura de dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()

        res.status(200).json(people)
    } catch(error){
        res.status(500).json({ erro: error }) //erro atribuido a um problema no servidor - nem sempre a melhor alternativa
    }
})


// rota dinâmica
router.get("/:id", async (req, res) => {
//extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id}) //metodo de encontrar um registro único
        
        if(!person){
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return //esse return aqui serve para finalizar a execução da requisição aqui
        }
        
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ erro: error }) //erro atribuido a um problema no servidor - nem sempre a melhor alternativa

    }

})

//Update (PUT, PATCH) 
/**O put espera o objeto completo para fazer o registro no sistema, porem geralmente so fazemos
 * atulizaçao parciais de algumas partes do código por isso o PATCH acaba sendo melhor
 */
 
router.patch('/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

//Delete - deletar dados


router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

 module.exports = router