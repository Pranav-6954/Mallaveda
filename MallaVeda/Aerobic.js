// RUNNING TRACKER
let runStartTime, runInterval;
let runDistance = 0;
let runCalories = 0;
let isRunning = false;

const runTimeDisplay = document.getElementById('run-time');
const runDistanceDisplay = document.getElementById('run-distance');
const runCaloriesDisplay = document.getElementById('run-calories');
const runStartBtn = document.getElementById('run-start');
const runStopBtn = document.getElementById('run-stop');
const runResetBtn = document.getElementById('run-reset');

runStartBtn.addEventListener('click', startRunning);
runStopBtn.addEventListener('click', stopRunning);
runResetBtn.addEventListener('click', resetRunning);

function startRunning() {
    isRunning = true;
    runStartBtn.disabled = true;
    runStopBtn.disabled = false;
    runResetBtn.disabled = false;
    runStartTime = new Date();
    runInterval = setInterval(updateRunTracker, 1000);
}

function stopRunning() {
    isRunning = false;
    runStartBtn.disabled = false;
    runStopBtn.disabled = true;
    clearInterval(runInterval);
}

function resetRunning() {
    isRunning = false;
    clearInterval(runInterval);
    runStartBtn.disabled = false;
    runStopBtn.disabled = true;
    runResetBtn.disabled = true;
    runDistance = 0;
    runCalories = 0;
    runTimeDisplay.textContent = '00:00:00';
    runDistanceDisplay.textContent = '0';
    runCaloriesDisplay.textContent = '0';
}

function updateRunTracker() {
    const elapsedTime = (new Date() - runStartTime) / 1000;
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = Math.floor(elapsedTime % 60);
    
    runTimeDisplay.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    runDistance = (elapsedTime / 60) * 0.12; // Assuming speed of 12 km/h
    runCalories = runDistance * 60;

    runDistanceDisplay.textContent = runDistance.toFixed(2);
    runCaloriesDisplay.textContent = runCalories.toFixed(0);
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
