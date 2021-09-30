$(document).ready(function(){
  const genBtns = $('.btns');
  const textAreas = $('.textAreas');
  const allBoxes = $('.boxes');
  let savedCodes = ['', '', '', '',];
  
  $(function loadSave(){
    var pulledSave = JSON.parse(localStorage.getItem('userSaveColorCodes'));
    for (let i = 0; i < allBoxes.length; i++){
      allBoxes[i].style.background = pulledSave[i];
      textAreas[i].value = pulledSave[i];
    }
  });

  genBtns.on('click', function (event) {
    let btnClicked = $(event.target);
    let textBox = btnClicked.siblings('textarea')
    let colorBox = btnClicked.parent().parent();
    let genCode = '#';
    const chars = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9',];
    for (let i = 0; i < 6; i++){
      genCode = genCode + chars[Math.floor(Math.random() * chars.length)]
    }
    textBox.val(genCode);
    colorBox.css('background', genCode);
  });
  
  function saveAll(event){
    theBtn = event.target;
    for (let i = 0; i < genBtns.length; i++){
      savedCodes[i] = textAreas[i].value;
    }
    localStorage.setItem('userSaveColorCodes', JSON.stringify(savedCodes));
    $('.saveBtn').attr('id', 'saveBtnAfter').text('Saved Successfully');
    setTimeout(function(){
      $('.saveBtn').removeAttr('id').text('Save');
    }, 1000);
  }

  $('.saveBtn').on('click', saveAll);

  function copyValue(event){
    clickedArea = event.target;
    clickedArea.select();
    document.execCommand('copy');
    let saveInit = clickedArea.value
    clickedArea.value = 'Copied!'
    setTimeout(function(){
      clickedArea.value = saveInit;
    }, 1000);
  }

  textAreas.on('click', copyValue)
});