// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  renderLastRegistered();
  function renderLastRegistered() {
    for (var i = 9; i < 18; i++){
      var currentStorage = localStorage.getItem(i.toString());
      if (currentStorage) {
        var texts = $('#' + i.toString()).children().eq(1);
        texts.val(currentStorage);
      }

    }
  }//displays all current local storage to the screen in the same time frame it was saved in

  var table = $('#root')
  table.on('click', '.btn', function (event) {
    var textAreaContent = $(this).parent().children().eq(1).val();//user input in text area
    var idParent = $(this).parent().attr('id');//corresponding id of the block the text is in

    if (textAreaContent.trim() == "") {
      alert("error, input cannot be blank");
    } else {
      localStorage.setItem(idParent, textAreaContent);
      //renderLastRegistered();
    }

  });//on click on save button it will save it to local storage if its not empty if it is it will display alert

  var time = dayjs().format('H')//gets the current hour and sets it to timw
  for (var i = 0; i < 9; i++){
    var hour = $('#root').children().eq(i);//gets each hour corresponding to i in the loop
    var ids = hour.attr('id');//gets the name id

    if(+time > +ids){
      hour.attr('class', 'row time-block past');
    }else if(+time < +ids){
      hour.attr('class', 'row time-block future');
    }else{
      hour.attr('class', 'row time-block present');
    }
  }//loops through for each different hour and checks it whether the hour currently to determine if its in the past or present or future

  var today = dayjs().format('dddd, MMMM D');//get weekday month and day
  $('#currentDay').text(today);//display date to screen
});
