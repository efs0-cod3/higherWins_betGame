let btn = document.querySelector('#cards')
let p1C = document.querySelector('.img1')
let p2C = document.querySelector('.img2')
let winner = document.querySelector('.pointer')
let remCards = document.querySelector('.rem')
let scoreP1 = 0
let scoreP2 = 0
let score1text = document.querySelector('.score')
let score2text = document.querySelector('.score2')
let reset = document.getElementById('reset').addEventListener('click', restartGame)


if(!localStorage.getItem('playerName')){
  let playerName = prompt('Instert Your name')
  if(playerName){
    localStorage.setItem('playerName',playerName)
  }else {
    localStorage.setItem('playerName', 'Player 1')
  }

let pN =localStorage.getItem('playerName')
if(!pN){
 localStorage.setItem('playerName', 'Player 1')
  document.querySelector('#player').innerText =  pN

} else{
  document.querySelector('#player').innerText = pN
}

}

btn.addEventListener('click', drawCards)

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // console.log(data)
    if (!localStorage.getItem('deckId')) {
      localStorage.setItem('deckId', data.deck_id)
      localStorage.setItem('score1', scoreP1)
      localStorage.setItem('score2', scoreP2)
    }
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

function drawCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=2`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let getSc = Number(localStorage.getItem('score1'))
      let getSc2 = Number(localStorage.getItem('score2'))
      let rem = remCards.innerText = `Remaining cards: ${Number(data.remaining)}`
      localStorage.setItem('remaining', rem)

      let card1 = p1C.src = data.cards[0].image
      let card2 = p2C.src = data.cards[1].image
      localStorage.setItem('card1', card1)
      localStorage.setItem('card2', card2)

      let p1Val = Number(getVal(data.cards[0].value))
      let p2Val = Number(getVal(data.cards[1].value))

      if (p1Val > p2Val) {
        winner.innerText = `<-- Point for ${localStorage.getItem('playerName')}`
        getSc++
        localStorage.setItem('score1', getSc)
      } else if (p1Val < p2Val) {
        winner.innerText = 'Point for computer -->'
        getSc2++
        localStorage.setItem('score2', getSc2)

      } else {
        winner.innerText = 'Draw'
      }

      score1text.innerHTML = `Score: ${localStorage.getItem('score1')}`
      score2text.innerHTML = `Score: ${localStorage.getItem('score2')}`

    })
    .catch(err => {
      console.log(`error ${err}`)
      if(err = "Not enough cards remaining to draw 2 additional"){
        endGame()
      }
    });
}

remCards.innerText = localStorage.getItem('remaining')
score1text.innerHTML = `Score: ${localStorage.getItem('score1')}`
score2text.innerHTML = `Score: ${localStorage.getItem('score2')}`
p1C.src = localStorage.getItem('card1')
p2C.src = localStorage.getItem('card2')

function endGame(){
    if(Number(localStorage.getItem('score1')) > Number(localStorage.getItem('score2'))){
      winner.innerText = `${localStorage.getItem('playerName')} IS THE MATCH WINNER`
    }else{
      winner.innerText = `Beat by the odds!`
    }
}

let getVal = (val) => {
  if (val === 'ACE') {
    return 14
  } else if (val === 'KING') {
    return 13
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return val
  }
}

function restartGame() {
  location.reload()
  localStorage.clear()
  if (!localStorage.getItem('score1') && !localStorage.getItem('score2')) {
    localStorage.setItem('score1', scoreP1)
    localStorage.setItem('score2', scoreP2)
  }
}




// function solution(str){
//   return str.split('').reverse().join('');  
// }