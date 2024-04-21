
const modal = document.querySelector('.modal')
const levelTitle = document.querySelector('.titlePopup p')
const levelDescription = document.querySelector('.descriptionPopup')
const back = document.querySelector('.backGround')
const front = document.querySelector('.mainPopup')
const startBtn= document.querySelector('.buttonStart')
const check = document.querySelector('.completedIcon')
const check1 = document.querySelector('.completedIcon1')

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
        check.style.opacity = '0'
        check1.style.opacity = '0'
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
    check.style.opacity = '0'
    check1.style.opacity = '0'

    } else if (parseInt(userLevels, 10) > parseInt(levelNumber, 10)) 
    {
        modal.style.display= 'flex'
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