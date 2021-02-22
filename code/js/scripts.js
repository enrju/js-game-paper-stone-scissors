// What is does: get elements from HTML
//        input: none
//       output: structure of elements from HTML  
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

// What is does: update clicked HTML element, switched actual clicked
//        input: page - structure of all elements from HTML
//                      need all pictures for deactivate previously selected picture
//               picture - clicked picture       
//       output: true/false
function updateActivePicture(page, picture){
    //clear class active
    for(let i = 0; i < page.pictures.length; i++){
        page.pictures[i].classList.remove("active");
    }
    //check which clicked
    picture.classList.add("active");

    return true;
}

// What is does: replace player choice into text
//        input: picture - clicked picture
//               possibleChioces - text equivalents of picture    
//       output: text equivalents of choosed picture
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

// What is does: calc random number from a given range
//        input: min - min number
//               max - max number    
//       output: random number from min to max (together with max)
function numberRandomFrom(min, max) {
    const number = Math.random() * (max - min + 1);
    return Math.floor(number);
}

// What is does: calc random computer choice
//        input: possibleChioces - text equivalents of picture    
//       output: text equivalents of choosed picture
function getCompChoice(possibleChoices){
    let index = numberRandomFrom(0, possibleChoices.length-1);
    return possibleChoices[index];
}

// What is does: check result of game
//        input: player - player choice
//               comp - computer choice
//               possibleChioces - text equivalents of picture  
//       output: text equivalents of result of game
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

// What is does: add last result of game into statistics
//        input: result - result of game
//               stats - table with result of game
//       output: stats - table with result of game (updated)
function addResultToStats(result, stats){
    stats.push(result);
    return stats;
}

// What is does: get/calc summary of results of game from statistics
//        input: stats - table with result of game
//       output: structure {nGames, nWins, nLosses, nDraws}
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

// What is does: update elements in HTML
//        input: page - structure of all elements from HTML
//               playerChoice - player choice
//               compChoice - computer choice
//               gameResult - last result of game
//               statSummary - summary of games from statistics
//       output: none
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

// What is does: main program includes main variables and service of events
//               "click" picture by player,
//               "click" <button> Let's play (run game)
//        input: none
//       output: none
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
        });
    });

    page.btnPlay.addEventListener("click", ()=>{
        if(isPictureChoose){
            compChoice = getCompChoice(possibleChoices);
            gameResult = getGameResult(playerChoice,compChoice, possibleChoices);
            stats = addResultToStats(gameResult, stats);
            let statSummary = getStats(stats);
            updatePage(page, playerChoice, compChoice, gameResult, statSummary);
            isPictureChoose = false;
            playerChoice = null;
            compChoice = null;
            gameResult = null;
        }
        else {
            alert("You did not choose picture! Choose picture, please.");
        }
    });
}

main();