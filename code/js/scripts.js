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

function getPlayerChoice(picture){
    if(picture.classList.contains("paper")){
        return "paper";
    }
    else if(picture.classList.contains("stone")){
        return "stone";
    }
    else if(picture.classList.contains("scissors")){
        return "scissors";
    }
}

function main(){
    let page = getPage();
    let isPictureChoose = false;
    let playerChoice = null;

    page.pictures.forEach((item)=>{
        item.addEventListener("click", ()=>{
            isPictureChoose = updateActivePicture(page, item);
            playerChoice = getPlayerChoice(item);
            
            // console.log(isPictureChoose, playerChoice);
        });
    });

    page.btnPlay.addEventListener("click", ()=>{

    });
}

main();