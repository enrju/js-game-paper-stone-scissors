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

function getGameResult(player, comp, possibleChoices){
    const possibleResults = ["win", "loss", "draw"];
    switch(player){
        case possibleChoices[0]:
            switch(comp){
                case possibleChoices[0]:
                    return possibleResults[2];
                    break;
                case possibleChoices[1]:
                    return possibleResults[0];
                    break;
                case possibleChoices[2]:
                    return possibleResults[1];
                    break;
            }
            break;
        case possibleChoices[1]:
            switch(comp){
                case possibleChoices[0]:
                    return possibleResults[1];
                    break;
                case possibleChoices[1]:
                    return possibleResults[2];
                    break;
                case possibleChoices[2]:
                    return possibleResults[0];
                    break;
            }
            break;
        case possibleChoices[2]:
            switch(comp){
                case possibleChoices[0]:
                    return possibleResults[0];
                    break;
                case possibleChoices[1]:
                    return possibleResults[1];
                    break;
                case possibleChoices[2]:
                    return possibleResults[2];
                    break;
            }
            break;
    }
}

function addResultToStats(result, stats){
    stats.push(result);
    return stats;
}

function getStats(stats){
    let tmp = [];
    let nGames = stats.length;
    
    tmp = stats.filter((item)=>{
        return item === "win";
    })
    let nWins = tmp.length;

    tmp = stats.filter((item)=>{
        return item === "loss";
    })
    let nLosses = tmp.length;

    tmp = stats.filter((item)=>{
        return item === "draw";
    })
    let nDraws = tmp.length;

    return {
        nGames,
        nWins,
        nLosses,
        nDraws
    }
}

function updatePage(page, playerChoice, compChoice, gameResult, statSummary){
    page.pictures.forEach((item)=>{
        item.classList.remove("active");
    });
    page.spanPlayerChoice.textContent = playerChoice;
    page.spanCompChoice.textContent = compChoice;
    page.spanGameResult.textContent = gameResult;
    page.spanNGames.textContent = statSummary.nGames;
    page.spanNWins.textContent = statSummary.nWins;
    page.spanNLosses.textContent = statSummary.nLosses;
    page.spanNDraws.textContent = statSummary.nDraws;
}

function main(){
    let page = getPage();
    let isPictureChoose = false;
    let playerChoice = null;
    let compChoice = null;
    let gameResult = null;
    const possibleChoices = ["paper", "stone", "scissors"];
    let stats = [];

    page.pictures.forEach((item)=>{
        item.addEventListener("click", ()=>{
            isPictureChoose = updateActivePicture(page, item);
            playerChoice = getPlayerChoice(item, possibleChoices);
            
            // console.log(isPictureChoose, playerChoice);
        });
    });

    page.btnPlay.addEventListener("click", ()=>{
        if(isPictureChoose){
            // console.log('działamy');
            compChoice = getCompChoice(possibleChoices);
            gameResult = getGameResult(playerChoice,compChoice, possibleChoices);
            // console.log(playerChoice, compChoice, gameResult);
            stats = addResultToStats(gameResult, stats);
            let statSummary = getStats(stats);
            // console.log(stats, statSummary);
            updatePage(page, playerChoice, compChoice, gameResult, statSummary);
            isPictureChoose = false;
            playerChoice = null;
            compChoice = null;
            gameResult = null;
        }
        else {
            // console.log('nie wybrano obrazka');
            alert("You did not choose picture! Choose picture, please.");
        }
    });
}

main();