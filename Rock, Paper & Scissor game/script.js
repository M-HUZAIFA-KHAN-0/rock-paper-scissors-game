let userScore = localStorage.getItem("User Score") || 0;
let compScore = localStorage.getItem("Computer Score") || 0;


(() => {
    document.getElementById("userScore").innerText = userScore;
    document.getElementById("compScore").innerText = compScore;
})();


const playAgain = () => {
    document.querySelector('.game-container').style = 'display:flex;';
    document.querySelector('.result-container').style = 'display:none;';

    document.querySelector('.userChoice').style.removeProperty('display');
    document.querySelector('.compChoice').style.removeProperty('display');
    document.querySelector('.result').style.removeProperty('display');
};

document.querySelector('.playAgain-btn').addEventListener('click', playAgain)


const compChoices = () => {
    let options = ["scissors", "paper", "rock"];
    let rand = Math.floor(Math.random() * 3)
    return options[rand]
};


const showWin = () => {
    if (userWin) {
        userScore++;
        localStorage.setItem("User Score", userScore);
        document.getElementById("userScore").innerText = userScore;
        console.log("you win");
        document.querySelector('#resultText').innerText = "You win!";
        console.log("userScore", userScore);
    } else {
        compScore++;
        localStorage.setItem("Computer Score", compScore);
        document.getElementById("compScore").innerText = compScore;
        console.log("you lose");
        document.querySelector('#resultText').innerText = "You lose!";
        console.log("compScore", compScore);
    }
};

let choice = document.querySelectorAll('.choice')
choice.forEach((choice) => {
    choice.addEventListener('click', () => {
        document.querySelector('.game-container').style = 'display:none'
        document.querySelector('.result-container').style = 'display:flex'


        userChoice = choice.getAttribute('id')

        let compChoice = compChoices()

        const play = (userChoice) => {
            console.log('user', userChoice)
            console.log('comp', compChoice)

            if (compChoice === userChoice) {
                document.querySelector('#resultText').innerText = "Draw"
                console.log('tie')
            } else {
                userWin = true
                if (userChoice === "rock") {
                    // paper , scissors
                    userWin = compChoice === "paper" ? false : true
                } else if (userChoice === "paper") {
                    // rock , scissors
                    userWin = compChoice === "scissors" ? false : true
                }
                else {
                    // rock , paper
                    userWin = compChoice === "rock" ? false : true
                }
                showWin()
            }

        }

        function first() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    document.querySelector('.user').innerHTML = `<div class="userChoice zoom-out1" id="result-${userChoice}">
                    <img src="icon-${userChoice}.svg" alt=""> </div>`
                    document.querySelector('.userChoice').style = 'display:flex'
                    resolve()

                }, 100)
            })
        }

        function second() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    document.querySelector('.comp').innerHTML = `<div class="compChoice zoom-out2" id="result-${compChoice}">
                    <img src="icon-${compChoice}.svg" alt=""> </div>`
                    document.querySelector('.compChoice').style = 'display:flex'
                    resolve()
                }, 500)
            })
        }

        function third() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    document.querySelector('.result').style = 'display:flex'
                    document.querySelector('.result').classList.add('zoom-out3')
                    play(userChoice)
                    resolve()
                }, 520)
            })
        }


        first().then(second).then(third).catch(error => console.error(error))

    })
});


const add = () => {
    document.querySelector(".scoreBoard").classList.add("blur")
    document.querySelector(".game-container").classList.add("blur")
    document.querySelector(".btn-container").classList.add("blur")
    document.querySelector(".result-container").classList.add("blur")
}

const remove = () => {
    document.querySelector(".scoreBoard").classList.remove("blur")
    document.querySelector(".game-container").classList.remove("blur")
    document.querySelector(".btn-container").classList.remove("blur")
    document.querySelector(".result-container").classList.remove("blur")
}


document.querySelector('#reset').addEventListener('click', () => {
    add()
    document.querySelector(".div").style = "display: flex"
})

document.querySelector(".cancel-btn").addEventListener("click", () => {
    remove()
    document.querySelector(".div").style = "none"
})

document.querySelector("#cross").addEventListener("click", () => {
    remove()
    document.querySelector(".div").style = "none"
})

document.querySelector('#rules').addEventListener('click', () => {
    add()
    document.querySelector("#rulesCross").style = "display: flex"
})

document.querySelector("#cross2").addEventListener("click", () => {
    remove()
    document.querySelector("#rulesCross").style = "none"
})


let confirmBTN = document.querySelector(".confirm-btn")


confirmBTN.addEventListener('click', () => {
    remove()
    document.querySelector(".div").style = "flex"
    localStorage.removeItem("User Score")
    localStorage.removeItem("Computer Score")
    document.getElementById("userScore").innerText = '0';
    document.getElementById("compScore").innerText = '0';
    userScore = 0;
    compScore = 0;
})




















