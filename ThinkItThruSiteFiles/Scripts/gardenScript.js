//takes data from input and updates Garden
function parseData(dataString){ //ex string: aabacdaabbaacaab
    for(let i = 0; i < dataString.length; i++){
        switch(dataString.chatAt(i)){
            case 'a':
                 //update html here?
                 break;

            case 'b':
        }
    }
}

//returns true if a garden object can be placed at index
function validateInput(index, char, dataString, user){
    if(dataString.charAt(index) == 'a'){
        let newDataString = dataString.splice(index, 1, char);
        parseData(newDataString);
        updateUser(newDataString, user)
    }
    else{
        alert("There is already an object in this tile. Please remove it before replacing it.");
    }
}
/*
//updates garden user visuals
function updateHTML(dataString){

}*/

//updates user object with new garden datas
function updateUser(dataString, user){
    //todo update this is User object updated
    user.gardenStr = dataString;
}