$( document ).ready(function() {

let currentSlide = 0;
let playing = true;
let timerInterval = 5000;
let timerID;
let length = $('.slide').length;

const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_SPACE = ' ';

function goToSlide(n) {
  $('.slide').eq(currentSlide).toggleClass('active');
  $('.indicator').eq(currentSlide).toggleClass('active');
  currentSlide = (length + n) % length;
  $('.slide').eq(currentSlide).toggleClass('active');
  $('.indicator').eq(currentSlide).toggleClass('active');
}

let pause = () => {
    playing = false;
    clearInterval(timerID);
    $('#pause').html(FA_PLAY);
};

let prev = () => {
    goToSlide(currentSlide - 1);
}

let next = () => {
    goToSlide(currentSlide + 1);
}

function startTimer() {
    timerID = setInterval(next, timerInterval);
}

let play = () => {
    playing = true;
    startTimer();
    $('#pause').html(FA_PAUSE);
}

let clickPause = () => {
    if (playing) {
        pause ();
    } else {
        play();
    }
}

let clickPrev = () => {
    pause();
    prev();
}

let clickNext = () => {
    pause();
    next();
}

let clickIndicator = function () {
  pause();
  goToSlide(+$(this).attr('data-slide-to'));
};


let controlKeys = (e) => {
    if (e.key === KEY_SPACE) clickPause();
    if (e.key === KEY_LEFT) clickPrev();
    if (e.key === KEY_RIGHT) clickNext();
}

$('#pause').on('click', clickPause);
$('#prev').on('click', clickPrev);
$('#next').on('click', clickNext);

$('.indicators').on('click', 'li', clickIndicator);
$(document).on('keydown', controlKeys);

startTimer();

});