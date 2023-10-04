const randomSearch = document.querySelector('.randomSearch')
const btnMoreCats = document.querySelector('.moreCats')
const apiKey = 'live_RRgMGeTrEhKxYOcTwv35Ihu8ZJI5m0Kg3tZNF90xBgxLd9CaLf6LIy3nhjgJmxAH'
const urlAPI = 'https://api.thecatapi.com/v1/images/search?limit=2'
const urlFavourite = 'https://api.thecatapi.com/v1/favourites'
const urlupload = 'https://api.thecatapi.com/v1/images/upload'
btnMoreCats.onclick = () => randomCats ()
const FavouriteCats = document.querySelector('.loadFavouriteCats')
const urlFavouriteDelete = (id) => `${urlFavourite}/${id}`
const btnUpload = document.querySelector('.upload')
btnUpload.onclick = () => addCat()
const randomCats = async () => {
    const response = await fetch (urlAPI,{
        method: 'GET',
        headers: {
            'x-api-key' : apiKey
        }
    })
    if(response.status !== 200) {
        console.log('hubo un error '+response.status);
    }else {
        const data = await response.json()
        randomSearch.innerHTML = " "
        data.forEach(element => {
          const article = document.createElement('article')
          const img = document.createElement('img')
          img.src = element.url
          const btn = document.createElement('button')
          btn.onclick = () => favoriteCat(element.id)
          const btnText = document.createTextNode('Add to Favourites')
          btn.appendChild(btnText)
          article.append(img,btn)
          randomSearch.append(article)
        })
    }
}

const loadFavouriteCats = async () => {
    const response = await fetch(urlFavourite,{
        method: 'GET',
        headers: {
            'x-api-key': apiKey
        }
    })
    if(response.status !== 200){
        console.log('ocurrio un error: '+response.status)
    }else {
        const data = await response.json()
        FavouriteCats.innerHTML=''
        console.log(data);
        data.forEach(element => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            img.src = element.image.url
            const btn = document.createElement('button')
            btn.onclick = () => removefavoriteCat(element.id)
            const btnText = document.createTextNode('Remove from Favourites')
            btn.appendChild(btnText)
            article.append(img,btn)
            FavouriteCats.append(article)
          })
    }
}

const favoriteCat = async (id) => {
    const response = await fetch(urlFavourite,{
        method: 'POST',
        headers: {
            'x-api-key' : apiKey,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            'image_id' : id
        })
    })
    if (response.status !== 200) {
        console.log('hubo un error: '+response.status);
    }else {
        console.log('Save!');
        loadFavouriteCats()
    }
}

const removefavoriteCat = async (id) => {
    const response = await fetch (urlFavouriteDelete(id),{
        method: 'DELETE',
        headers: {
            'x-api-key' : apiKey
        }
    })
    if (response.status !== 200) {
        console.log('ocurrio un error: '+response.status);
    }else{
        console.log('Successfully Delete');
        loadFavouriteCats()
    }
}

const addCat = async () => {
    const form = document.querySelector('.form')
    const formData = new FormData (form)
    const response = await fetch(urlupload,{
        method:'POST',
        headers: {
            'x-api-key': apiKey
        },
        body: formData
    })
    if (response.status!=201) {
        console.log('ocurrio un error:'+response.status);
    }else{
        const data = await response.json()
        favoriteCat(data.id)
        loadFavouriteCats()
        console.log('Successfully upload');
    }
}
randomCats()
loadFavouriteCats()
