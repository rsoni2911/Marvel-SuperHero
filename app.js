// My Public API - b99a12fb83fb8889c06aaeaa15659fc3
// MD5 Hash -  375b9e040f658474d8bae9f01bf587b1
// private- aa38e2aa7cfdf35db49150be4136d673f02cd1fe

//  Get Id from HTML File, & Search query with HTTP Request, then parse it
document.getElementById("search-form").addEventListener('keyup' , function(){
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();    
    xhrRequest.onload = function(){
        var data = JSON.parse(xhrRequest.responseText);
        display(data);  
    }
});


// Get the URL from  API
function getUrl(){
    // From Id I'll get value.
    var searchQuery = document.getElementById('search-string').value;
    // Print the Search Query in to Console.
    console.log(searchQuery);
    //  Set the main heading for user to know what he/she searched for.
    document.getElementById('querySection').innerHTML = 'You are looking for : '+ searchQuery;
//  If search query matches the results then it will execute next function/command.
    if(!searchQuery){
        console.log('Name cannot be empty!');
        return "https://gateway.marvel.com/v1/public/characters?ts=1701687606905&apikey=b99a12fb83fb8889c06aaeaa15659fc3&hash=375b9e040f658474d8bae9f01bf587b1"
    }else{
        return `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&apikey=b99a12fb83fb8889c06aaeaa15659fc3&hash=375b9e040f658474d8bae9f01bf587b1&ts=1701687606905`
    }
}

//  Get Canvas 
let canvas = document.getElementById('canvas');
// Get Search String
let searchHero = document.getElementById('search-string').value;


// This Function will display the Data on the Screen
function display(data){
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;
//  Printing the results that are get from searched Query
    console.log(results);
    if(!results){
        //  if Search character matches the results then only it will forward to next step
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    }else{
        //  Else the process it going on
        // Creating a For Loop because there will be n number of results for same query
        for(let result of results){
            var templateCanvas = canvas.content.cloneNode(true);
//  Get all the elemets from id and then changes its Inner HTMl
            templateCanvas.getElementById("img-cont").innerHTML = `<img src=${result.thumbnail.path}/portrait_xlarge.jpg alt="marvel-img" />`
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;
            //  Set Event listenet for Learn  more button 
            templateCanvas.getElementById('learn-more').addEventListener('click', function(){
                localStorage.setItem('id', result.id);
                window.location.assign('about.html');
            });
            //  Set Event listenet for Fav  more button 
            templateCanvas.getElementById('fav').addEventListener('click', function(){
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id,data);
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};