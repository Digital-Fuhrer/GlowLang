 let visibleLocation = 'location1';
 let buttonActive = 1;

 const buttons = document.querySelectorAll('.button');
 const menuIcons = document.querySelectorAll('.back');
 const locations = document.querySelectorAll('.location');

    function updateMenuOnScroll() {
      const scrollTop = window.scrollY;

      let visibleLocation;
      
      locations.forEach(location => {
        const locationTop = location.offsetTop;
        const locationBottom = locationTop + location.clientHeight;

        if (scrollTop >= locationTop && scrollTop < locationBottom) {
          visibleLocation = location.id;
        }
      });

      menuIcons.forEach(back => {
        const targetLocation = back.getAttribute('data-target');
        if (targetLocation === visibleLocation) {
          back.classList.add('back-active');
        } else {
          back.classList.remove('back-active');
        }
      });
      buttonActive = parseInt(visibleLocation.replace('location', ''), 10);
    }
     window.addEventListener('scroll', updateMenuOnScroll);



     buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (buttonActive !== index + 1) {
          buttonActive = index + 1;
          document.querySelector(`.location${buttonActive}`).scrollIntoView();
        }
      });
    });

