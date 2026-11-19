const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const uniqueValidator = require ('mongoose-unique-validator').default
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model('Filme', new mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = new mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)

const Usuario = mongoose.model('Usuario', usuarioSchema)

async function conectarAoMongoDB() {
    await mongoose.connect(`mongodb+srv://rafaelyoshida0_db_user:JAIje4A8fkIV5tt6@dev-web-project.mmqoxza.mongodb.net/`)
}

// let filmes = [
//     {
//         titulo: "Verity",
//         sinopse: "Verity é um romance e thriller psicológico da autora norte-americana Colleen Hoover, foi inicialmente publicado pela própria autora em 2018. Teve a sua 1º edição em Portugal publicada pela TopSeller em 11 de novembro de 2019, e foi publicado no Brasil pela primeira vez em 9 de março de 2020 pela editora Galera Record.",
//     },
//     {
//         titulo: "Resident Evil",
//         sinopse: "O filme Resident Evil, dirigido por Zach Cregger, segue a história de Bryan, um entregador de suprimentos médicos que, sem perceber, se envolve em uma corrida frenética pela sobrevivência enquanto uma noite fatídica desmorona ao seu redor. A trama é totalmente inédita e se passa no mesmo universo da franquia de videogames da Capcom, apresentando uma narrativa original que se destaca por sua profundidade e envolvimento.",
//     }
// ]

// GET - http://localhost:3000/oi
app.get ("/oi", (req, res) => {
    res.send("oi")
})

// GET - http://localhost:3000/filmes
app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

// POST - http://localhost:3000/filmes
app.post ('/filmes', async (req, res) => {
    let titulo = req.body.titulo // pega oq o usuario digita
    let sinopse = req.body.sinopse
    let filme = new Filme({titulo: titulo, sinopse: sinopse}) // cria um objeto filme com os dados do usuario
    
    await filme.save() // salva o filme no banco de dados
    const filmes = await Filme.find() // pega todos os filmes do banco
    res.json(filmes)
})

// POST - http://localhost:3000/signup
app.post('/signup', async (req, res) => {
    try {
        let login = req.body.login
        let password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)

        let usuario = new Usuario({ login: login, password: hashedPassword })

        const responseMongo = await usuario.save()

        console.log(responseMongo)
        res.status(201).end()
    } catch (error) {
        console.log(error)
        res.status(409).end()
    }
})

// POST - http://localhost:3000/login
app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuario = await Usuario.findOne({login: login})
    if (!usuario) {
        return res.status(401).json({mensagem: 'Usuário inválido'})
    }

    const senhaValida = await bcrypt.compare(password, usuario.password)
    if (!senhaValida) {
        return res.status(401).json({mensagem: 'Senha inválida'})
    }

    const token = jwt.sign(
        {login: login},
        'chave',
        {expiresIn: '1h'}
    )
    res.status(200).json({token: token})
})

app.listen(3000, async () => {
    try {
        await conectarAoMongoDB()
        console.log('Servidor na escuta e banco conectado')
    } catch (error) {
        console.log('erro: ', error)
    }
})