const gameBlock = document.querySelector('#game')
const gameStartBtn = document.createElement('button')
let secretWord = 'secret'
let secretHint = 'secret is a word'
let incorrectAns = 0
let correctAns = 0


/* Start game */
gameStartBtn.classList.add('btn','btn--start')
gameStartBtn.innerHTML = 'Start game'
gameBlock.append(gameStartBtn)

const gameBtn = document.querySelector('.btn--start')

gameBtn.addEventListener('click', (ev) => {
    gameBtn.style.display = 'none'
    gameBlock.innerHTML += `
    <div class="game__block game__block--gallows gallows">
    </div>
    <div class="game__block game__block--secret">
        <div id="word" class="word"></div>
        <div class="hint">${secretHint}</div>
        <div id="mistakes"></div>
        <div id="keyboard" class="keyboard"></div>
    </div>
    `;
    startGame(secretWord)
})

const keys = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109]
// document.onkeypress = (event) => {
//     keys.push(event.charCode)
//     console.log(keys)
// }




function startGame(secret) {
    initGallows()
    initKeyboard(document.querySelector('#keyboard'))
    initWord(secret)
    initMistakes()
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

function initMistakes() {
    const mistakes = document.querySelector('#mistakes')
    mistakes.innerHTML = '0/6'
}

function initGallows() {
    const gallows = document.querySelector('.game__block--gallows')
    gallows.innerHTML = '<img class="gallows__image gallows__image--main" src="assets/gallows.png">'
}

function checkLetter(letter) {
    const letters = document.querySelectorAll('.word__letter')
    const wordArr = secretWord.split('')
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
    console.log('cor', correctAns, 'incor', incorrectAns)
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
            gallows.innerHTML += '<img class="gallows__image gallows__image--head" src="assets/head.png">'
            break;
        case 2:
            gallows.innerHTML += '<img class="gallows__image gallows__image--body" src="assets/body.png">'
            break;
        case 3:
            gallows.innerHTML += '<img class="gallows__image gallows__image--leftH" src="assets/left-hand.png">'
            break;
        case 4:
            gallows.innerHTML += '<img class="gallows__image gallows__image--rightH" src="assets/right-hand.png">'
            break;
        case 5:
            gallows.innerHTML += '<img class="gallows__image gallows__image--leftL" src="assets/left-leg.png">'
            break;
        case 6:
            gallows.innerHTML += '<img class="gallows__image gallows__image--rightL" src="assets/right-leg.png">'
            break;
    }
}

function endGame(result = false) {
    document.querySelectorAll('.keyboard__letter').forEach((el) => el.classList.remove('keyboard__letter--active'))
    console.log(result)
    incorrectAns = 0
    correctAns = 0
    startGame(secretWord)
}

