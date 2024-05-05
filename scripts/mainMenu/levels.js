
const modal = document.querySelector('.modal')
const levelTitle = document.querySelector('.titlePopup p')
const levelDescription = document.querySelector('.descriptionPopup')
const back = document.querySelector('.backGround')
const front = document.querySelector('.mainPopup')
const startBtn= document.querySelector('.buttonStart')
const startBtnText = document.querySelector('.buttonStart p')
const check = document.querySelector('.completedIcon')
const check1 = document.querySelector('.completedIcon1')
const completedStars = document.querySelector('.completedLevelStars')
const buttonsPopup = document.querySelectorAll('.buttonPopup')
const levelPopupStars = document.querySelectorAll('.star')

const sessionLevel = parseInt(document.getElementById('session').value, 10)
const userStarsArray = document.getElementById('user').value

let num = Array.from(userStarsArray)

let levelStars = num.filter((n) => {
    if (n == ',') return false
    if (n !== ',') return true
}) 


    window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {

            modal.style.display= 'none'
        }
    };

    let bossStatus = false;

    
function first( userLevels ,levelNumber, levelDesc, colorBack, colorFront) {

    if (parseInt(userLevels, 10) < parseInt(levelNumber, 10)) 
    {
        modal.style.display= 'flex'
        levelTitle.innerText = levelNumber + ' уровень';

        levelDescription.innerText = 'Этот уровень пока что не доступен...';
        back.style.background = '#32313D';
        front.style.background = '#47525B';
        startBtn.style.display = 'none'
        check.style.display = 'none'
        check1.style.display = 'none'
        levelDescription.style.display = 'block'
        completedStars.style.display = 'none'

        buttonsPopup.forEach((btn) => {
            btn.style.marginTop = '67px'
        })

    } 
    else if (parseInt(userLevels, 10) === parseInt(levelNumber, 10)) 
    {
    modal.style.display= 'flex'
    levelTitle.innerText = levelNumber + ' уровень';

    levelDescription.innerText = levelDesc;
    back.style.background = colorBack;
    front.style.background = colorFront;
    startBtn.style.display = 'inline-block'
    check.style.display = 'none'
    check1.style.display = 'none'
    levelDescription.style.display = 'block'
    completedStars.style.display = 'none'
    startBtnText.innerText = 'Начать'

    buttonsPopup.forEach((btn) => {
        btn.style.marginTop = '67px'
    })

    startBtn.addEventListener('click', () => {
        window.location.href='/level?level=' + levelNumber;
    })


    } else if (parseInt(userLevels, 10) > parseInt(levelNumber, 10)) 
    {
        modal.style.display = 'flex'
        levelTitle.innerText = levelNumber + ' уровень - пройден';

        levelDescription.innerText = 'Этот уровень уже пройден. Вы можете перепройти его, чтобы получить больше звезд.';
        levelDescription.style.textAlign = 'center'
        completedStars.style.display = 'flex'

        buttonsPopup.forEach((btn) => {
            btn.style.marginTop = '-10px'
        })
        back.style.background = '#3DCF85';
        front.style.background = colorFront;

        startBtnText.innerText = 'Перепройти'
        
        if (levelStars[parseInt(levelNumber, 10) - 1] == 3) {

            levelPopupStars[2].style.background = 'url(/smallStar.png)'
            levelPopupStars[1].style.background = 'url(/smallStar.png)'
            levelPopupStars[0].style.background = 'url(/smallStar.png)'

            levelDescription.innerText = 'Этот уровень уже пройден на максимальное количество звезд.';
            startBtn.style.display = 'none'

    
          } else if (levelStars[parseInt(levelNumber, 10) - 1] == 2) {

        levelPopupStars[2].style.background = 'url(/lockSmallStar.png)'
        levelPopupStars[1].style.background = 'url(/smallStar.png)'
        levelPopupStars[0].style.background = 'url(/smallStar.png)'
        startBtn.style.display = 'inline-block'
        console.log('2 stars')

      } else if (levelStars[parseInt(levelNumber, 10) - 1] == 1) {

        levelPopupStars[2].style.background = 'url(/lockSmallStar.png)'
        levelPopupStars[1].style.background = 'url(/lockSmallStar.png)'
        levelPopupStars[0].style.background = 'url(/smallStar.png)'
        startBtn.style.display = 'inline-block'
        console.log('1 stars')
      }

      startBtn.addEventListener('click', () => {
        window.location.href='/level?level=' + levelNumber + '&stars=' + levelStars[parseInt(levelNumber, 10) - 1];
    })

    }
}



function backPopup() {

    modal.style.display= 'none'
    
}
const allLevels = document.querySelectorAll('.level')

    allLevels.forEach((all) => {
        let numberUnder = all.childNodes[1];
        lvl = parseInt(all.id, 10);
        if (lvl > sessionLevel) 
        {

           numberUnder.classList.add('numberUnderLock')
           numberUnder.classList.remove('numberUnder')

           numberUnder.childNodes[1].style.background = 'none'
        } else 
        if (lvl == sessionLevel) 
        {
            numberUnder.classList.add('selectedLevel')
        } else 
        if (lvl < sessionLevel) 
        {
            numberUnder.classList.add('numberUnderDone')
            numberUnder.classList.remove('numberUnder')
        } 
    })

const asideLevels = document.querySelectorAll('.loc')

        if (sessionLevel >= 5) {
            asideLevels[0].src = "/2loka.png"
        }
        if (sessionLevel >= 10) {
            asideLevels[1].src = "/3loka.png"
        }
        if (sessionLevel >= 15) {
            asideLevels[2].src = "/4loka.png"
        }
        if (sessionLevel >= 20) {
            asideLevels[3].src = "/5loka.png"
        }
        if (sessionLevel >= 25) {
            asideLevels[4].src = "/6loka.png"
        }

    


// const btn = document.querySelector('.toLevelPointer')

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(sessionLevel).scrollIntoView( 
        {behavior: "smooth", block: "center", inline: "start"}
    );
})



// const levelPointerTip = document.querySelector('.levelPointerTip');

// // btn.addEventListener('mouseover', () => {
// //     levelPointerTip.style.opacity = 1;
// //   });
  
// //   btn.addEventListener('mouseout', () => {
// //     levelPointerTip.style.opacity = 0;
// //   });
