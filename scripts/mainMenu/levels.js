

const modal = document.querySelector('.modal')
const levelTitle = document.querySelector('.titlePopup p')
const levelDescription = document.querySelector('.descriptionPopup')
const back = document.querySelector('.backGround')
const front = document.querySelector('.mainPopup')
const startBtn= document.querySelector('.buttonStart')
const check = document.querySelector('.completedIcon')
const check1 = document.querySelector('.completedIcon1')

const sessionLevel = parseInt(document.getElementById('session').value, 10)

    window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {

            modal.style.display= 'none'
        }
    };

    
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

    } else if (parseInt(userLevels, 10) > parseInt(levelNumber, 10)) 
    {
        modal.style.display = 'flex'
        levelTitle.innerText = levelNumber + ' уровень - пройден';
        levelDescription.innerText = 'Этот уровень уже пройден!';
        back.style.background = '#3DCF85';
        front.style.background = colorFront;

        startBtn.style.display = 'none'

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
        console.log(asideLevels)


const btn = document.querySelector('.toLevelPointer')
btn.addEventListener('mousedown' , () => {
    document.getElementById(sessionLevel).scrollIntoView(
        {behavior: "smooth", block: "center", inline: "start"}
    );
})


