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

    //updates gardenStr in this Garden object and in the user's object, then calls updateUserXPGardenMultiplier
    updateUser(itemCost){
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
        console.log("attempting to update xp garden mult");

        this.updateUserXPGardenMultiplier();

    }

    updateUserXPGardenMultiplier(){
        let newMultiplier = 1;

        /*this.gardenStr.forEach(char => {
            switch (char) {
                case 'a':
                    newMultiplier += .05;
                    break;
                case 'b':
                    newMultiplier += .05;
                    break;
                case 'c':
                    newMultiplier += .05;
                    break;
                case 'd':
                    newMultiplier += .05;
                    break;
                default:
                    break;
            }
        });*/

        for(let i = 0; i < this.gardenStr.length; i++){
            let char = this.gardenStr.charAt(i);

            switch (char) {
                case 'b':
                    newMultiplier += .05;
                    break;
                case 'c':
                    newMultiplier += .10;
                    break;
                case 'd':
                    newMultiplier += .15;
                    break;
                case 'e':
                    newMultiplier += .25;
                    break;
                default:
                    break;
            }
        }

        console.log("new multiplier: " + newMultiplier);
        this.user.xpGardenMultiplier = newMultiplier;
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

