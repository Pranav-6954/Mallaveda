// RUNING TRACKER
let watchId = null;
let prevPosition = null;
let totalDistance = 0;
let startTime = null;
let timerInterval = null;
let elapsedSeconds = 0;
const metValue = 7.5; // MET value for moderate running

// Function to calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radius of Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
}

// Function to update position and track speed, distance, calories
function updatePosition(position) {
    const { latitude, longitude } = position.coords;
    const currentTime = Date.now();

    if (prevPosition) {
        const distance = calculateDistance(
            prevPosition.latitude, prevPosition.longitude,
            latitude, longitude
        );

        totalDistance += distance;

        // Calculate speed (distance/time) and convert to km/h
        const timeDiff = (currentTime - startTime) / 1000; // in seconds
        const speedKmh = (distance / timeDiff) * 3.6; // Convert m/s to km/h

        // Calculate calories burned
        const weight = parseFloat(document.getElementById("weight").value) || 70; // Default 70kg
        const timeInHours = elapsedSeconds / 3600; // Convert seconds to hours
        const caloriesBurned = metValue * weight * timeInHours;

        // Update UI
        document.getElementById("distance").innerText = totalDistance.toFixed(2);
        document.getElementById("speed").innerText = isNaN(speedKmh) ? "0" : speedKmh.toFixed(2);
        document.getElementById("calories").innerText = caloriesBurned.toFixed(2);
    }

    prevPosition = { latitude, longitude };
    startTime = currentTime;
}

// Function to update timer
function updateTimer() {
    elapsedSeconds++;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    document.getElementById("time").innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Function to start tracking
document.getElementById("startBtn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        totalDistance = 0;
        elapsedSeconds = 0;
        startTime = Date.now();

        // Start GPS tracking
        watchId = navigator.geolocation.watchPosition(updatePosition, (error) => {
            alert("Error getting location. Make sure GPS is enabled.");
        }, { enableHighAccuracy: true, maximumAge: 1000 });

        // Start Timer
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Function to stop tracking
document.getElementById("stopBtn").addEventListener("click", () => {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
    clearInterval(timerInterval);
});






// JUMPING JACKS 
let videoContainer = document.getElementById("videoContainer");
let video = document.getElementById("workoutVideo");
let startButton = document.getElementById("startWorkoutBtn");
let minutesInput = document.getElementById("minutesInput");
let secondsInput = document.getElementById("secondsInput");
let timerDisplay = document.getElementById("timerDisplay");
let selectedTimeDisplay = document.getElementById("selectedTime");
let jumpCountDisplay = document.getElementById("jumpCountDisplay");
let caloriesDisplay = document.getElementById("caloriesDisplay");

let timer;
let timeLeft;

// Update Selected Time Display
function updateSelectedTime() {
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;
    selectedTimeDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Attach event listeners for real-time update
minutesInput.addEventListener("input", updateSelectedTime);
secondsInput.addEventListener("input", updateSelectedTime);

// Start Workout Function
function startWorkout() {
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;
    timeLeft = minutes * 60 + seconds; // Convert to total seconds

    if (timeLeft <= 0) {
        alert("Please enter a valid workout time!");
        return;
    }

    videoContainer.classList.remove("hidden"); // Show video
    video.play();
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            video.pause();
            video.currentTime = 0;
            askForJumpCount();
        }
    }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Ask for Jump Count & Calculate Calories
function askForJumpCount() {
    let jumpCount = parseInt(prompt("Enter the number of Jumping Jacks you completed:"));
    if (!isNaN(jumpCount) && jumpCount > 0) {
        let weight = 70; // Default weight in kg
        let metValue = 8; // MET value for jumping jacks
        let caloriesBurned = (metValue * weight * (jumpCount / 100));
        jumpCountDisplay.innerText = jumpCount;
        caloriesDisplay.innerText = caloriesBurned.toFixed(2);
    } else {
        alert("Invalid count. Try again!");
    }
}

// Event Listener
startButton.addEventListener("click", startWorkout);
