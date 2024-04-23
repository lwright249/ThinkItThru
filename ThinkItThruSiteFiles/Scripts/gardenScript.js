/*//takes data from input and updates Garden
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

}

//updates user object with new garden datas
function updateUser(dataString, user){
    //todo update this is User object updated
    user.gardenStr = dataString;
}

*/

//################################################### NEW GOOD STUFF HERE



class Garden{

    constructor(gardenStr, user){
        this.gardenStr = gardenStr;
        this.selectedStoreItem = 'z';
        this.selectedTile = -1;
        this.user = user;
    }

    userPurchase(){
        console.log("selected item: " + this.selectedStoreItem + " selected tile: " + this.selectedTile);
        //do nothing if no tile or item selected
        if(this.selectedTile == -1 || this.selectedStoreItem == 'z'){
            console.log("not initialized");
            return;
        }
        //do nothing is purchase invalid
        if(!this.validatePurchase()){
            console.log("validate purchase fail");
            return; //TODO: maybe make alert for bad purchase?
        }
        this.updateScreen();

    }

    validatePurchase(){
        //let userXP = user.xp;
        //let valid = false;
        let itemCost = 0;
        
        switch (this.selectedStoreItem) {
            case 'b':
                itemCost = 500;
                break;
        
            case 'c':
                itemCost = 700;
                break;
            
            case 'd':
                itemCost = 1000;
                break;

            case 'e':
                itemCost = 1500;
                break;
        
            default:
                console.log("ERROR IN GARDEN PURCHASE");
                return false;
        }

        if(this.user.xp >= itemCost){
            this.updateUser(itemCost);
            return true;
        }
        else{
            return false;
        }
    }

    updateUser(itemCost){
        //console.log(this.selectedTile);
        if(this.selectedTile == -1){
            console.log("ERROR UPDATING USER");
            return;
        }
        this.user.xp = this.user.xp - itemCost;
        console.log("new xp amt: " + this.user.xp);
        //TODO CHANGE USER STRING
        let oldString = this.user.gardenStr;

        let index = this.selectedTile
        //let newString = oldString.splice(index, 1, this.selectedStoreItem);
        let newString = oldString.slice(0, index) + this.selectedStoreItem + oldString.slice(index+1, oldString.length);

        this.gardenStr = newString;
        this.user.gardenStr = newString;

        console.log(this.user.gardenStr);

    }

    updateScreen(){
        //TODO IMPLEMENT HTML
    }
}

function updateStoreItem(garden, item){
    garden.selectedStoreItem = item;
    console.log("updating item" + garden.selectedStoreItem);
}

function beginPurchase(garden, tile){
    garden.selectedTile = tile;
    console.log("updating tile" + garden.selectedTile);
    garden.userPurchase();
}

