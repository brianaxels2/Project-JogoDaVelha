// initial data 
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}
let player = 'O'
let warning = ''
let playing = false

// events 
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick)
})

// functions 
function itemClick(event){
    let item = event.target.getAttribute('data-item')
    
    if(playing && square[item] === ''){
        square[item] = player
        renderSquar()
        togglePlayer()
    }
}

function reset(){
    warning = ''

    let random = Math.floor(Math.random() * 2)

    if (random === 0){
        player = 'X'
    } else {
        player = 'O'
    }

    for(let i in square){
        square[i] = '';
    }

    playing = true

    renderSquar()
    renderInfo()
}

function renderSquar(){
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]
    }
    checkGame()
}

function renderInfo(){
    document.querySelector('.vez').innerHTML = player
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer(){
    if(player === 'X'){
        player = 'O'
    } else {
        player = 'X'
    }
    renderInfo()
}

function checkGame(){
    if(checkwinnerfor('X')){
        warning = 'O "X" venceu!'
        playing = false
    } else if(checkwinnerfor('O')){
        warning = 'O "O" venceu!'
        playing = false
    } else if(isFull()){
        warning = 'Deu empate!'
        playing = false
    }
}

function checkwinnerfor(player){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]
    for(let w in pos){
        let pArray = pos[w].split(',')
        let hasWon = pArray.every(option => square[option] === player)
        if(hasWon){
            return true
        }
    }
    return false
}

function isFull(){
    for(let i in square){
        if(square[i] === ''){
            return false
        }
    }
    return true
}