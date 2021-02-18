function getPage(){
    const pictures = document.querySelectorAll("section .pictures .pic");
    const btnPlay = document.querySelector("section button");
    const spanPlayerChoice = document.querySelector("section p span.player_choice");
    const spanCompChoice = document.querySelector("section p span.comp_choice");
    const spanGameResult = document.querySelector("section h3 span.game_result");
    const spanNGames = document.querySelector("section p span.n_games");
    const spanNWins = document.querySelector("section p span.n_wins");
    const spanNLosses = document.querySelector("section p span.n_losses");
    const spanNDraws = document.querySelector("section p span.n_draws");

    return {
        pictures,
        btnPlay,
        spanPlayerChoice,
        spanCompChoice,
        spanGameResult,
        spanNGames,
        spanNWins,
        spanNLosses,
        spanNDraws
    }
}

function updateActivePicture(page, picture){
    //clear class active
    for(let i = 0; i < page.pictures.length; i++){
        page.pictures[i].classList.remove("active");
    }
    //check which clicked
    picture.classList.add("active");

    return true;
}

function getPlayerChoice(picture, possibleChoices){
    let result = null;

    for(let i = 0; i < possibleChoices.length; i++){
        if(picture.classList.contains(possibleChoices[i])){
            result = possibleChoices[i];
            break;
        }
    }

    return result;
}

function numberRandomFrom(min, max) {
    const number = Math.random() * (max - min + 1);
    return Math.floor(number);
}

function getCompChoice(possibleChoices){
    let index = numberRandomFrom(0, possibleChoices.length-1);
    return possibleChoices[index];
}

function main(){
    let page = getPage();
    let isPictureChoose = false;
    let playerChoice = null;
    let compChoice = null;
    const possibleChoices = ["paper", "stone", "scissors"];

    page.pictures.forEach((item)=>{
        item.addEventListener("click", ()=>{
            isPictureChoose = updateActivePicture(page, item);
            playerChoice = getPlayerChoice(item, possibleChoices);
            
            // console.log(isPictureChoose, playerChoice);
        });
    });

    page.btnPlay.addEventListener("click", ()=>{
        if(isPictureChoose){
            console.log('działamy');
            compChoice = getCompChoice(possibleChoices);
            // console.log(playerChoice, compChoice);
        }
        else {
            console.log('nie wybrano obrazka');
        }
    });
}

main();