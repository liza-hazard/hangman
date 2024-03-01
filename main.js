const gameBlock = document.querySelector('#game')
const gameStartBtn = document.createElement('button')
let secretWord = 'secret'
let secretHint = 'secret is a word'
let incorrectAns = 0


/* Start game */
gameStartBtn.classList.add('btn','btn--start')
gameStartBtn.innerHTML = 'Start game'
gameBlock.append(gameStartBtn)

const gameBtn = document.querySelector('.btn--start')

gameBtn.addEventListener('click', startGame)

const keys = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109]
// document.onkeypress = (event) => {
//     keys.push(event.charCode)
//     console.log(keys)
// }




function startGame() {
    gameBtn.style.display = 'none'
    gameBlock.innerHTML += `
    <div class="game__block game__block--gallows">
        <img src="/assets/gallows.png">
    </div>
    <div class="game__block game__block--secret">
        <div id="word" class="word"></div>
        <div class="hint">${secretHint}</div>
        <div id="mistakes">0/6</div>
        <div id="keyboard" class="keyboard"></div>
    </div>
    `;
    initKeyboard(document.querySelector('#keyboard'))
    // initWord(secretWord)
}

function initKeyboard(board) {
    keys.forEach((el) => {
        board.innerHTML += `<div class="keyboard__letter" data-key="${el}">${String.fromCharCode(el)}</div>`
    })
    board.addEventListener('click', (ev) => {
        if (ev.target.classList.contains("keyboard__letter")) {
            pressKey(+ev.target.getAttribute('data-key'))
        }
    })
    document.addEventListener('keypress', (ev) => {
        if (keys.includes(+ev.charCode)) {
            pressKey(+ev.charCode)
        }
    })
    function pressKey(code) {
        const letter = document.querySelector('.keyboard__letter[data-key="' + code + '"]')
        if (letter.classList.contains('keyboard__letter--active')) {
            return
        }
        letter.classList.add('keyboard__letter--active')
        checkLetter(String.fromCharCode(code))
    }
}

function initWord(word) {
    console.log(word)
}

function initMistakes() {
    const mistakes = document.querySelector('#mistakes')
    mistakes.innerHTML = '0/6'
}

function initGallows() {
    const gallows = document.querySelector('.game__block--gallows')
    gallows.innerHTML = '<img class="gallows__image gallows__image--main" src="/assets/gallows.png">'
}

function checkLetter(letter) {
    incorrectAns++
    console.log(letter, incorrectAns)
    if(incorrectAns === 6) {
        endGame(false)
        incorrectAns = 0
    }
}