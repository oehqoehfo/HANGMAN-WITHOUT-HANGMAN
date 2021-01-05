const button = document.querySelectorAll('button');
let clickedCategory;

let gameObject ={
    word:'',
    totalWrong:0,
    wrongLetters:[]
}
for(let i=0;i<button.length;i++){
    button[i].addEventListener('click',function(){
        clickedCategory = button[i].dataset.category;
        gameStart();
    });
}

function gameStart(){
    const categoryContainer = document.querySelector('#Categories');
    categoryContainer.remove();
    callJSON();
}

function pickWord(word){
    const randomNumber = Math.floor(Math.random()*(word[clickedCategory].length));
    gameObject.word = word[clickedCategory][randomNumber];
    drawGameField();
}



function drawGameField(){
    const wordContainer = document.getElementById('GuessingWordContainer');
    for(let i=0; i<gameObject.word.length;i++){
        const spanElement = document.createElement('span');
        if(gameObject.word[i]!==' '){
            spanElement.classList.add('guess');
        }else{
            spanElement.classList.add('space');
        }
        wordContainer.appendChild(spanElement);
    }
    const gameField = document.getElementById('GameField');
    gameField.style.display="block";
}

const textInput = document.querySelector('input[type="text"]');
const formElement = document.querySelector('form');
formElement.addEventListener('submit',function(e){
    e.preventDefault();
    checkLetterExistsInWord(textInput.value);
    textInput.value='';
});

function checkLetterExistsInWord(value){
    for(let i=0;i<gameObject.word.length;i++){
        if(gameObject.word[i]===value||gameObject.word[i]===value.toUpperCase()){
            const spanElement = document.querySelectorAll('#GuessingWordContainer span');
            spanElement[i].classList.remove('guess');
            if(gameObject.word[i]===value){
                spanElement[i].innerText=value;
            }else if(gameObject.word[i]===value.toUpperCase()){
                spanElement[i].innerText=value.toUpperCase();
            }
        }
    }
    if(gameObject.word.indexOf(value)<0&&gameObject.word.indexOf(value.toUpperCase())<0){
        updateTriedAlphabets(value);
    }
    checkGameOver();
}

function checkGameOver(){
    if(gameObject.totalWrong===10){
        setTimeout(function(){
            alert('10번 틀리셨습니다. 아쉽게도 게임에서 지셨습니다. 단어는 ' +gameObject.word+' 입니다.');
            location.reload();
        },1);
    }
    if(document.querySelector('.guess')==undefined){
        setTimeout(function(){
            alert('당신은 승리하였습니다');
            location.reload();
        },1);
    }
}
function updateTriedAlphabets(value){
    if(gameObject.wrongLetters.indexOf(value)<0){
        const wrongAlphabet = document.createElement('span');
        wrongAlphabet.classList.add('wrong');
        wrongAlphabet.innerText=value;
        const alphabetContainer = document.getElementById('TriedAlphabets');
        alphabetContainer.appendChild(wrongAlphabet);
        gameObject.wrongLetters.push(value);
    }
    gameObject.totalWrong++;
}