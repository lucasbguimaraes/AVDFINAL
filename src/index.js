const { json, request, response } = require('express')
const express = require ('express')
const uuid= require ('uuid')
const app = express()
app.use(express.json())
let funcionarios=[
    {
        id:uuid.v4(),nome:'lucas batalha',funcao:'tecnico de som',salario:1500,inss:150,irf:105,fgts:120,salarioliquido:1245
    
    },
    {
        id:uuid.v4(),nome:'leo batalha',funcao:'engenheiro',salario:1000,inss:100,irf:70,fgts:80,salarioliquido:830
    }

]

const checarid =(request, response, next) => {
    const {id} = request.params
    const existeid = funcionarios.find(check => check.id === id)
    if (!existeid){
        return response
             .status(400)
             .json({erro: 'ID inexistente!!!'})
    }
    return next()
}

const verificacadastro =(request, response, next) =>{
    const{nome,funcao,salario}= request.body
    if(!nome ||  !funcao || !salario ){
        return response
        .status(400)
        .json({ Error: 'verificar se esta sobrando algum campo sem preencimento'})
    }
        return next()

}

        
       app.post('/funcionarios' ,verificacadastro,(request,response) => {
           const{nome,funcao,inss,irf,fgts,salario} = request.body
           const avaliacao = {
             id:uuid.v4(),
             nome,
             funcao,
             inss,
             irf,
             fgts,
             salario,            
           }
           funcionarios = [...funcionarios,avaliacao]
           return response
           .status (200)
           .json (avaliacao)
       })

       app.get('/funcionarios' , (request,response) => {
          return response
          .status (200)
          .json (funcionarios)
       })

       app.get('/funcionarios/:id',checarid, (request,response) => {
           const{id} = request.params
           const listarid = funcionarios.filter (idzinho => idzinho.id === id)
           return response
           .status(200)
           .json (listarid)
       })
        app.delete('/funcionarios/:id',checarid, (request, response) => {
           const {id} = request.params
           let deletarfuncionario = funcionarios.findIndex(indice => indice.id === id)
           funcionarios.splice(deletarfuncionario, 1)
           return response
                .status(200)
                .json({concluido:'O funcionario foi excluido'})
        })
            
        app.put('/funcionarios/:id',checarid,(request, response) => {
           const {nome,funcao,salario} = request.body
           const {id} = request.params
           let alterarfuncionarios = funcionarios.findIndex(funcionario => funcionario.id === id)
           const dadosfuncionarios = {
               id,
               nome,
               funcao,
               salario,
           }
           funcionarios.splice(alterarfuncionarios, 1, dadosfuncionarios)
           return response
                .status(200)
                .json(dadosfuncionarios)


        })
        
        app.get('/funcionario/gastototal',(request,response) => {
            const sominha = funcionarios.reduce((soma,valor) => {
                return soma + valor.salarioliquido
        },0)
        console.log(sominha)
        return response
        .status(200)
        .json({"Gasto Geral":sominha})
    })


       app.get('/funcionario/folhaindividual',(request,response) => {
           const{nome} = request.query
           const nomeprocura = funcionarios.filter (pr => pr.nome === nome )
           return response
           .status(200)
           .json(nomeprocura)
       })



app.listen(3333,() => {
    console.log('servidor rodando!!!')
})
