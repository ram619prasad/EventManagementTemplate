import './scss/main.scss';
var events = document.getElementsByClassName('event');

window.addEventListener('load', function() {
  // document.body.transition = "all 2s";
  // document.body.style.animation = "fadeIn 1s ease-out";
  document.body.classList.add('active')
})



for(var i = 0; i < events.length; i++) {
  var eventInfo = events[i];
  eventInfo.addEventListener('click', handleClick)
}

function handleClick(e) {
  var event = e.target.querySelector('.event__details');
  // var icon = e.target.querySelector('.event__artist').querySelector('.fa');
  if (event.style.maxHeight){
    event.style.maxHeight = null;
    event.style.margin = null;
  } else {
    event.style.maxHeight = event.scrollHeight + "px";
    event.style.margin = 5 + "rem"; 
  }

  var upIcon =  e.target.querySelector('.fa-angle-up');
  var downIcon =  e.target.querySelector('.fa-angle-down');
  
  if(upIcon) {
    upIcon.classList.remove('fa-angle-up');
    upIcon.classList.add('fa-angle-down')
  }
  
  if(downIcon) {
    downIcon.classList.remove('fa-angle-down');
    downIcon.classList.add('fa-angle-up')
  }
}

var selectInputs = document.querySelectorAll('.select');
for(var i = 0; i < selectInputs.length; i++) {
  var selectInput = selectInputs[i];
  selectInput.addEventListener('click', showOptions)
}

function showOptions(e) {
  var options = e.target.nextElementSibling;
  if (options.style.maxHeight){
    options.style.maxHeight = null;
  } else {
    options.style.maxHeight = 30 + "vh";
    options.style.overflow = "auto";
  }
}

var selectOptions = document.querySelectorAll('.select-options');
console.log('selectOptions', selectOptions.length);
for(var j = 0; j < selectOptions.length; j++) {
  console.log('selectOption');
  console.log('j', j);
  var selectOption = selectOptions[j];
  console.log(selectOption);
  var spans = selectOption.children;
  console.log('spans', spans);
  for(var k = 0; k < spans.length; k++) {
    var span = spans[k];
    span.addEventListener('click', selectedOption)
  }
}

function selectedOption(e) {
  console.log('clicked');
  var value = e.target.innerText;
  var parent = e.target.parentNode.previousElementSibling;
  
  console.log('val', value);
  console.log('parent', parent.value);
  parent.value = value;
  
  console.log('parent', parent.value);
}


