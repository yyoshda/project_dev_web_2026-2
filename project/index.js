const express = require ('express')

const app = express()
app.use(express.json())

let filmes = [
    {
        titulo: "Verity",
        sinopse: "Verity é um romance e thriller psicológico da autora norte-americana Colleen Hoover, foi inicialmente publicado pela própria autora em 2018. Teve a sua 1º edição em Portugal publicada pela TopSeller em 11 de novembro de 2019, e foi publicado no Brasil pela primeira vez em 9 de março de 2020 pela editora Galera Record.",
    },
    {
        titulo: "Resident Evil",
        sinopse: "O filme Resident Evil, dirigido por Zach Cregger, segue a história de Bryan, um entregador de suprimentos médicos que, sem perceber, se envolve em uma corrida frenética pela sobrevivência enquanto uma noite fatídica desmorona ao seu redor. A trama é totalmente inédita e se passa no mesmo universo da franquia de videogames da Capcom, apresentando uma narrativa original que se destaca por sua profundidade e envolvimento.",
    }
]

// GET - http://localhost:3000/oi
app.get ("/oi", (req, res) => {
    res.send("oi")
})

// GET - http://localhost:3000/filmes
app.get ('/filmes', (req, res) => {
    res.json(filmes)
})

app.listen(3000, () => console.log("servidor na escuta"))