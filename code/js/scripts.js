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

function main(){
    let page = getPage();
    console.log(page);
}

main();