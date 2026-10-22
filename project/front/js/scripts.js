const protocolo = "http://"
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes"

function obterFilmes() {
    // console.log("teste")
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    console.log(filmes)    
}