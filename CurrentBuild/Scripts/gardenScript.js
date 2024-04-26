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
            console.log("validate purchase fail: NOT ENOUGH XP");
            return; //TODO: maybe make alert for bad purchase?
        }
        updateScreen(this);

    }

    validatePurchase(){
        //let userXP = user.xp;
        //let valid = false;
        let itemCost = 0;
        
        switch (this.selectedStoreItem) {
            case 'b':
            case 'c':
            case 'd':
            case 'e':
                itemCost = 500;
                break;
        
            case 'f':
                itemCost = 700;
                break;
            
            case 'g':
                itemCost = 1000;
                break;

            case 'h':
                itemCost = 1500;
                break;

            case 'a':
                itemCost = 0;
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

        this.updateUserXPGardenMultiplier();

    }

    updateUserXPGardenMultiplier(){
        let newMultiplier = 1;

        for(let i = 0; i < this.gardenStr.length; i++){
            let char = this.gardenStr.charAt(i);

            switch (char) {
                case 'b':
                    newMultiplier += .05;
                    break;
                case 'c':
                    newMultiplier += .05;
                    break;
                case 'd':
                    newMultiplier += .05;
                    break;
                case 'e':
                    newMultiplier += .05;
                    break;
                case 'f':
                    newMultiplier += .10;
                    break;
                case 'g':
                    newMultiplier += .15;
                    break;
                case 'h':
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
    //console.log("updating item " + garden.selectedStoreItem);
}

function beginPurchase(garden, tile){
    garden.selectedTile = tile;
    garden.userPurchase();
}

/*
<div class=Garden>
        <div class=GardenRow id=row1>
            <div class=item id=flower0>
                <button class="GameButton"><img src="Images/svgs/grasstile.svg"
                        onclick="beginPurchase(myGarden, 0)"></img></button>
            </div>
            <div class=item id=flower1>
                <button class="GameButton"><img src="Images/svgs/grasstile.svg"
                        onclick="beginPurchase(myGarden, 1)"></img></button>
            </div>
            <div class=item id=flower2>
                <button class="GameButton"><img src="Images/svgs/grasstile.svg"
                        onclick="beginPurchase(myGarden, 2)"></img></button>
            </div>
            <div class=item id=flower3>
                <button class="GameButton"><img src="Images/svgs/grasstile.svg"
                        onclick="beginPurchase(myGarden, 3)"></img></button>
            </div>
        </div>
*/
function updateScreen(garden){
    let string = garden.gardenStr;
    let html = "";
    var gardenDiv = document.getElementById("garden");

    for(let i = 0; i < 4; i++){
        html += "<div class=GardenRow id=row"+i+">";
        for(let j = 0; j < 4; j++){
            let tileNum = (4*i)+j;
            let tileFlower = string.charAt(tileNum);
            let tileIDString = "";

            switch (tileFlower) {
                case 'b':
                    tileIDString = "Images/svgs/flower1.svg";
                    break;
                case 'c':
                    tileIDString = "Images/svgs/flower3.svg";
                    break;
                case 'd':
                    tileIDString = "Images/svgs/flower6.svg";
                    break;
                case 'e':
                    tileIDString = "Images/svgs/flower7.svg";
                    break;
                case 'f':
                    tileIDString = "Images/svgs/flower8.svg";
                    break;
                case 'g':
                    tileIDString = "Images/svgs/flower9.svg";
                    break;
                case 'h':
                    tileIDString = "Images/svgs/sapling.svg";
                    break;
                default:
                    tileIDString = "Images/svgs/grasstile.svg";
                    break;
            }

            html += "<div class=item id=flower"+tileNum+">";
            html += "<button class=\"GameButton\"><img src=\""+tileIDString+"\"";
            html += "onclick=\"beginPurchase(myGarden, "+ tileNum +")\"></img></button>";
            html += "</div>"

        }
        html+= "</div>"
    }

    gardenDiv.innerHTML = html;
    displayXP();
}

