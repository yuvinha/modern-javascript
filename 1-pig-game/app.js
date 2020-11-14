/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Generate random number
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        // console.log(lastDice, dice);
        console.log(lastDice);
        console.log(dice);

        // 2. Display the result
        var diceDOM = document.querySelectorAll('.dice');

        for (var i = 0; i < diceDOM.length; i++) {
            diceDOM[i].style.display = 'block';
            diceDOM[i].src = 'dice-' + dice[i] + '.png';
        }
    
        // 4. Update the ENTIRE score if he rolled two 6 in a row
        if (dice.indexOf(6) !== -1 && lastDice.indexOf(6) !== -1) {
            // Entire score to 0
            scores[activePlayer] = 0;
            // Update the UI
            document.getElementById('score-' + activePlayer).textContent = '0';

            nextPlayer(); 
        } 
        // 3. Update the ROUND score if he rolled number was NOT a 1
        else if (dice.indexOf(1) === -1) {
            // Add score
            roundScore += dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 
        else {
            // Next player
            nextPlayer(); 
        }

        // Keep the current rolled number
        for (var i = 0; i < lastDice.length; i++) {
            lastDice[i] = dice[i];
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
    
        // Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    init();
});

function nextPlayer() {
    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-0').style.display = 'none'; 
    document.getElementById('dice-1').style.display = 'none'; 
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    lastDice = [0, 0];

    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}