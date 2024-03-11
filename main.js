import { words }  from './words.json'
const gameBlock = document.querySelector('#game')
const gameStartBtn = document.createElement('button')
let secretWord = 'secret'
let secretHint = 'secret is a word'
let currentWord = 0
let incorrectAns = 0
let correctAns = 0
console.log(words)

/* Start game */
gameStartBtn.classList.add('btn','btn--start')
gameStartBtn.innerHTML = 'Start game'
gameBlock.append(gameStartBtn)

const gameBtn = document.querySelector('.btn--start')

gameBtn.addEventListener('click', () => {
    gameBtn.style.display = 'none'
    gameBlock.innerHTML += `
    <div class="game__block game__block--gallows">
        <div class="gallows">
            <div class="gallows__block"></div>
        </div>
        <div class="boat">
            <img src="assets/boat.png">
        </div>
    </div>
    <div class="game__block game__block--secret">
        <div id="word" class="word"></div>
        <div class="hint"></div>
        <div id="mistakes"></div>
        <div id="keyboard" class="keyboard"></div>
    </div>
    `;
    startGame(currentWord)
})

const keys = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109]

function startGame(secret) {
    initGallows()
    initKeyboard(document.querySelector('#keyboard'))
    initWord(words[secret].word)
    initHint(words[secret].hint)
    initMistakes()
    initModal()
}

function initKeyboard(board) {
    board.innerHTML = ''
    keys.forEach((el) => {
        board.innerHTML += `<div class="keyboard__letter" data-key="${el}">${String.fromCharCode(el)}</div>`
    })
    document.querySelectorAll('.keyboard__letter').forEach((el) => {el.classList.remove('keyboard__letter--active')});
    board.addEventListener('click', (ev) => {
        if (ev.target.classList.contains("keyboard__letter")) {
            pressKey(+ev.target.getAttribute('data-key'))
        }
    })
    document.addEventListener('keypress', (ev) => {
        // console.log(ev.charCode)
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
    const wordContainer = document.querySelector('#word')
    wordContainer.innerHTML = ''
    word.split('').forEach((el) => {
        wordContainer.innerHTML += `<div class="word__letter">_</div>`
    })
}

function initHint(hint) {
    document.querySelector('.hint').innerHTML = hint
}

function initMistakes() {
    const mistakes = document.querySelector('#mistakes')
    mistakes.innerHTML = '0/6'
}

function initGallows() {
    const gallows = document.querySelector('.gallows__block')
    gallows.innerHTML = `<img class="gallows__image gallows__image--main" src="assets/rob.png">
    <img class="gallows__image gallows__image--head" src="assets/head.png">
    <img class="gallows__image gallows__image--body" src="assets/body.png">
    <img class="gallows__image gallows__image--leftH" src="assets/left-hand.png">
    <img class="gallows__image gallows__image--rightH" src="assets/right-hand.png">
    <img class="gallows__image gallows__image--leftL" src="assets/left-leg.png">
    <img class="gallows__image gallows__image--rightL" src="assets/right-leg.png">`
}

function initModal() {
    const mainModal = document.createElement('div')
    const overlay = document.createElement('div')
    mainModal.classList.add('modal')
    overlay.classList.add('overlay')
    mainModal.innerHTML = `<div class="modal__body"></div>`
    document.body.append(mainModal)
    document.body.append(overlay)
}

function checkLetter(letter) {
    const letters = document.querySelectorAll('.word__letter')
    const wordArr = words[currentWord].word.split('')
    const uniqueLetters = [...new Set(wordArr)]
    const mistakes = document.querySelector('#mistakes')
    if (wordArr.includes(letter)) {
        wordArr.forEach((el, i) => {
            if (el === letter) {
                letters[i].innerHTML = letter
            }
        })
        correctAns++
    }
    else {
        incorrectAns++
        gallowsChange(incorrectAns)
        mistakes.innerHTML = incorrectAns + '/6'
    }
    if(incorrectAns === 6) {
        setTimeout(endGame, 500)
    }
    if (correctAns === uniqueLetters.length) {
        setTimeout(() => {endGame(true)}, 500)
        
    }
}

function gallowsChange(mistake) {
    const gallows = document.querySelector('.game__block--gallows')
    switch(mistake) {
        case 1:
            document.querySelector('.gallows__image--head').style.opacity = "1"
            break;
        case 2:
            document.querySelector('.gallows__image--body').style.opacity = "1"
            break;
        case 3:
            document.querySelector('.gallows__image--leftH').style.opacity = "1"
            break;
        case 4:
            document.querySelector('.gallows__image--rightH').style.opacity = "1"
            break;
        case 5:
            document.querySelector('.gallows__image--leftL').style.opacity = "1"
            break;
        case 6:
            document.querySelector('.gallows__image--rightL').style.opacity = "1"
            break;
    }
}

function endGame(result = false) {
    document.querySelectorAll('.keyboard__letter').forEach((el) => el.classList.remove('keyboard__letter--active'))
    incorrectAns = 0
    correctAns = 0
    openModal(result, words[currentWord].word)
    currentWord++
    if (currentWord >= words.length - 1) {
        currentWord = 0
    }
}

function openModal(result, word) {
    const modalBody = document.querySelector('.modal__body')
    const restartBtn = document.createElement('button')

    restartBtn.classList.add('restart')
    restartBtn.innerHTML = 'Play again'
    restartBtn.addEventListener('click', restartGame)

    document.querySelector('.modal').classList.add('open')
    document.querySelector('.overlay').classList.add('open')
    if (result) {
        modalBody.innerHTML = 'You win'
    }
    else {
        modalBody.innerHTML = 'You fail'
    }
    modalBody.append(restartBtn)
}

function restartGame() {
    document.querySelector('.modal').classList.remove('open')
    document.querySelector('.overlay').classList.remove('open')
    startGame(currentWord)
}


