
const modal = document.querySelector('.modal')
const levelTitle = document.querySelector('.titlePopup p')
const levelDescription = document.querySelector('.descriptionPopup')
const back = document.querySelector('.backGround')
const front = document.querySelector('.mainPopup')

    window.onkeydown = function( event ) {
        if ( event.keyCode == 27 ) {

            modal.style.display= 'none'
        }
    };
    levelPopup.addEventListener('click', () => {

        modal.style.display= 'none'
    })

    
function first(levelNumber, levelDesc, colorBack, colorFront) {

    modal.style.display= 'flex'
    levelTitle.innerText = levelNumber + ' уровень';

    levelDescription.innerText = levelDesc;
    back.style.background = colorBack;
    front.style.background = colorFront;
}
function backPopup() {

    modal.style.display= 'none'
    
}