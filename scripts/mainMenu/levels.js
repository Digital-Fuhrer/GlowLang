
const modal = document.querySelector('.modal')
const levelTitle = document.querySelector('.titlePopup p')
const levelDescription = document.querySelector('.descriptionPopup')
const back = document.querySelector('.backGround')
const front = document.querySelector('.mainPopup')
const startBtn= document.querySelector('.buttonStart')

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
    } 
    else 
    {
    modal.style.display= 'flex'
    levelTitle.innerText = levelNumber + ' уровень';

    levelDescription.innerText = levelDesc;
    back.style.background = colorBack;
    front.style.background = colorFront;
    startBtn.style.display = 'inline-block'
    }
}
function backPopup() {

    modal.style.display= 'none'
    
}