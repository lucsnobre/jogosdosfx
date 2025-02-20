'use strict'

async function pesquisarJogo(categoria) {
    const url = `https://api.allorigins.win/get?url=https://www.freetogame.com/api/games?category=${categoria}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Erro ao buscar jogos.")
        }

        const data = await response.json();

        
        const jogos = JSON.parse(data.contents)

        
        const fotoimg = jogos.map(jogo => jogo.thumbnail).filter(Boolean)

        return fotoimg;
    } catch (error) {
        console.error("Erro na requisição:", error)
        return []
    }
}


function criarImagem(link) {
    const img = document.createElement('img')
    img.src = link
    img.alt = "Imagem do jogo"
    document.getElementById('galeria').appendChild(img)
}

async function preencherFotos() {
    const categoria = document.getElementById('jogo').value.trim()
    if (!categoria) {
        alert("Digite uma categoria para pesquisar.")
        return
    }

    const fotos = await pesquisarJogo(categoria)
    const galeria = document.getElementById('galeria')

    galeria.innerHTML = ""

    if (fotos.length === 0) {
        galeria.innerHTML = "Nenhum jogo encontrado."
    } else {
        fotos.forEach(criarImagem)
    }
}

document.getElementById('pesquisar').addEventListener('click', preencherFotos)
