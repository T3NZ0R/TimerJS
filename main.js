
let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

let audio = document.getElementById('audio');
let label = document.getElementById('label');
let customTime = document.getElementById('user__time');
let start = document.getElementById('start');
let clear = document.getElementById('clear');


start.onclick = () => {
    let end;
    let minute;

    if (start.innerText === 'Start') {
        customTime.classList.toggle("displayNone");
        label.classList.toggle("displayNone");

        minute = document.customForm.minutes.value * 60;
        end = timer(minute);
        end = end / 1000;

        localStorage.setItem('end', JSON.stringify(end));
        start.innerText = 'Pause';
        return;
    }


    if (start.innerText === 'Pause') {
        end = JSON.parse(localStorage.getItem('end'));
        end = parseInt(end);
        minute = (end - (Date.now() / 1000));
        minute = Math.ceil(minute);

        localStorage.setItem('minute', JSON.stringify(minute));

        timerStop(minute);

        start.innerText = 'Resume';
        return;
    }

    if (start.innerText === 'Resume') {
        minute = JSON.parse(localStorage.getItem('minute'));

        let end = timer(minute);
        end = end / 1000;

        localStorage.setItem('end', JSON.stringify(end));
        start.innerText = 'Pause';

    }
}


clear.onclick = () => {
    timerStop(0)
};

timerDisplay.textContent = '0:00';

function timer(seconds) {

    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000)
    return then;
}

function timerStop(seconds) {

    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeftStop(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= secondsLeft) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeftStop(secondsLeft);
    }, 1000)
    return then;
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;

    if (seconds === 0) {
        audio.innerHTML = "  <audio autoplay>\n" +
            "            <source src=\"audio/signal-elektronnogo-budilnika-33304.mp3\" type=\"audio/ogg\"/>\n" +
            "        </audio>";

        displayEndTime(0);

        customTime.classList.toggle("displayNone");
        label.classList.toggle("displayNone");
        start.innerText = 'Start';
    }
}

function displayTimeLeftStop(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;

    if (seconds === 0) {
        displayEndTime(0);
        customTime.classList.toggle("displayNone");
        start.innerText = 'Start';
    }
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    endTime.textContent = `Час закінчиться в  ${hour}:${minutes < 10 ? '0' + minutes : minutes}`;

    if (timestamp === 0) {
        endTime.textContent = 'Час вичерпано';
    }
}

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.reset();
});


