
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove }   from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-2dee9-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const MovieList = ref(database, "Watch List")
const movies = document.getElementById('movieList')
const inputF = document.getElementById('input-field');
const addButton = document.getElementById('add-button');

function clearInputField()
{
    inputF.value = ""
}

onValue(MovieList, function(snapshot){ // runs everytime theres is an edit
    
    if(snapshot.exists())
    {
        let watchListArray = Object.entries(snapshot.val()) // return array of arrays 
    clearMovieList()

    for(let i =0;i< watchListArray.length;i++)
{
     let currentMovie = watchListArray[i]
     let currentMovieId = currentMovie[0]
     let currentMovieName = currentMovie[1]

     addMovieItems(currentMovie)
}
    }
    else{
        movies.innerHTML = "Watch list is currently Empty.."
    }

})


function addMovieItems(item)
{
    let itemId = item[0]
    let itemName = item[1]
    // movies.innerHTML +=`<li>${moviename}</li>`
    let newEl = document.createElement("li")

    newEl.textContent = itemName
    movies.append(newEl)

    newEl.addEventListener('dblclick',function(){
        let exactMovieName = ref(database,`Watch List/${itemId}`)
        remove(exactMovieName)
    })
    
}

function clearMovieList()
{
    movies.innerHTML=""
}

addButton.addEventListener('click',function(){

    const inputVal = inputF.value
    if(inputVal == "")
    {

    }
    else
    {
        push(MovieList, inputVal)
        clearInputField()
        console.log( `${inputVal} added to DataBase`);
    }


})

