const musicContainer = document.querySelector('#music-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:3000`

const musicCallBack = ({data:music})=> displayMusic(music)
const errCallback = err => console.log(err.response.data)
const getAllMusic = () => axios.get(baseURL).then(musicCallBack).catch(errCallback)

const deleteMusic = id => axios.delete(`${baseURL}/${id}`).then(musicCallBack).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()
////three properties
    let Artist = document.querySelector('#Artist')
    let Song = document.querySelector('#Song')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        Artist: Artist.value,
        Song: Song.value, 
        imageURL: imageURL.value
    }
    getAllMusic(bodyObj)

    Artist.value = ''
    Song.value =''
    imageURL.value = ''
}

  

function createMusicCard(music) {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    movieCard.innerHTML = `<img alt='music cover' src=${music.imageURL} class="music-cover"/>
    <p class="music-Artist">${music.Artist}</p>
    <button onclick="deleteMusic(${music.id})">delete</button>
    `


    moviesContainer.appendChild(musicCard)
}

function displayMusic(arr) {
    musicContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMusicCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMusic()
