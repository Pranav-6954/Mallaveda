// RUNNING TRACKER
let runTimer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let distance = 0;
let calories = 0;
const speed = 10; // Assume 10 km/h

const startRunBtn = document.getElementById('start-run');
const stopRunBtn = document.getElementById('stop-run');
const resetRunBtn = document.getElementById('reset-run');

const timeDisplay = document.getElementById('run-time');
const distanceDisplay = document.getElementById('run-distance');
const caloriesDisplay = document.getElementById('run-calories');

startRunBtn.addEventListener('click', startRun);
stopRunBtn.addEventListener('click', stopRun);
resetRunBtn.addEventListener('click', resetRun);

function startRun() {
    startRunBtn.disabled = true;
    stopRunBtn.disabled = false;
    resetRunBtn.disabled = true;

    runTimer = setInterval(() => {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        distance = ((hours * 60 + minutes + seconds / 60) * speed) / 60;
        calories = distance * 60; // Assuming 60 kcal per km

        updateRunDisplay();
    }, 1000);
}

function stopRun() {
    clearInterval(runTimer);
    startRunBtn.disabled = false;
    stopRunBtn.disabled = true;
    resetRunBtn.disabled = false;
}

function resetRun() {
    clearInterval(runTimer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    distance = 0;
    calories = 0;
    updateRunDisplay();
    startRunBtn.disabled = false;
    stopRunBtn.disabled = true;
    resetRunBtn.disabled = true;
}

function updateRunDisplay() {
    timeDisplay.textContent = `Time: ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    distanceDisplay.textContent = `Distance: ${distance.toFixed(2)} km`;
    caloriesDisplay.textContent = `Calories: ${calories.toFixed(0)} kcal`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}


// JUMPING JACKS TRACKER
let countdown;
        function startJumpingJacks() {
            let minutes = document.getElementById("setMinutes").value;
            if (minutes <= 0) {
                alert("Please enter a valid time in minutes!");
                return;
            }

            let timeLeft = minutes * 60;
            document.getElementById("jumpingJacksTimer").innerText = `⏳ Time Left: ${minutes}:00`;
            document.getElementById("videoSection").style.display = "block";
            document.getElementById("jumpingJacksVideo").play();

            countdown = setInterval(() => {
                timeLeft--;
                let mins = Math.floor(timeLeft / 60);
                let secs = timeLeft % 60;
                document.getElementById("jumpingJacksTimer").innerText = `⏳ Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    document.getElementById("jumpingJacksTimer").innerText = "✅ Workout Complete!";
                    document.getElementById("jumpingJacksVideo").pause();
                    askForJumps();
                }
            }, 1000);
        }

        function askForJumps() {
            let jumps = prompt("🏋️‍♂️ How many jumps did you complete?");
            if (jumps && !isNaN(jumps)) {
                let caloriesBurned = (jumps * 0.2).toFixed(2);
                document.getElementById("calorieResult").innerText = `🔥 You burned approximately ${caloriesBurned} calories! 🔥`;
                document.getElementById("calorieResult").style.display = "block";
            } else {
                alert("Please enter a valid number!");
            }
        }
