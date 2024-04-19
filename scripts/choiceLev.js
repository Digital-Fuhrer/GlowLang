document.addEventListener("DOMContentLoaded", function() {
    var firstButton = document.getElementById("FirstLev");
    var secondButton = document.getElementById("SecondLev");
    var thirdButton = document.getElementById("ThirdLev");
    var nextButton = document.getElementById("next");
    var selectedLevel = "";
  
    function toggleButton(clickedButton) {
      // Проверяем, активна ли кнопка
      var isActive = clickedButton.classList.contains("active");
      if (isActive) {
        clickedButton.classList.remove("active");
        selectedLevel = "";
      } else {
        firstButton.classList.remove("activef");
        secondButton.classList.remove("actives");
        thirdButton.classList.remove("activet");
  
        if (clickedButton === firstButton) {
          clickedButton.classList.add("activef");
          selectedLevel = "Низкий";
        } else if (clickedButton === secondButton) {
          clickedButton.classList.add("actives");
          selectedLevel = "Средний";
        } else if (clickedButton === thirdButton) {
          clickedButton.classList.add("activet");
          selectedLevel = "Высокий";
        }
      }
      var anyButtonActive = firstButton.classList.contains("activef") ||
                            secondButton.classList.contains("actives") ||
                            thirdButton.classList.contains("activet");
      if (anyButtonActive) {
        nextButton.classList.add("activen");
      } else {
            nextButton.classList.remove("activen");
            }                           

      console.log("Selected level:", selectedLevel);
    }
  
    firstButton.addEventListener("click", function() {
      toggleButton(firstButton);
      
    });
  
    secondButton.addEventListener("click", function() {
      toggleButton(secondButton);
    });
  
    thirdButton.addEventListener("click", function() {
      toggleButton(thirdButton);
    });
  
    // Добавляем обработчик клика 
    firstButton.addEventListener("click", function() {
      if (firstButton.classList.contains("activef")) {
        toggleButton(firstButton);
      }
    });
  
    secondButton.addEventListener("click", function() {
      if (secondButton.classList.contains("actives")) {
        toggleButton(secondButton);
      }
    });
  
    thirdButton.addEventListener("click", function() {
      if (thirdButton.classList.contains("activet")) {
        toggleButton(thirdButton);
      }
    });

    document.getElementById('next').addEventListener('click', function() {
      var choiceText = selectedLevel; 

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/choice');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  console.log('Text sent successfully');
              } else {
                  console.error('Failed to send text');
              }
          }
      };
      xhr.send('choice=' + encodeURIComponent(choiceText));
  });
  });