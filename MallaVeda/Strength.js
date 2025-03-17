let countdownPU;
        function startPushUps() {
            let minutes = document.getElementById("setMinutesPU").value;
            if (minutes <= 0) {
                alert("Please enter a valid time in minutes!");
                return;
            }

            let timeLeftPU = minutes * 60;
            document.getElementById("pushUpsTimer").innerText = `⏳ Time Left: ${minutes}:00`;
            document.getElementById("videoSectionPU").style.display = "block";
            document.getElementById("pushUpsVideo").play();

            countdownPU = setInterval(() => {
                timeLeftPU--;
                let mins = Math.floor(timeLeftPU / 60);
                let secs = timeLeftPU % 60;
                document.getElementById("pushUpsTimer").innerText = `⏳ Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;

                if (timeLeftPU <= 0) {
                    clearInterval(countdownPU);
                    document.getElementById("pushUpsTimer").innerText = "✅ Workout Complete!";
                    document.getElementById("pushUpsVideo").pause();
                    askForPushUps();
                }
            }, 1000);
        }

        function askForPushUps() {
            let pushUps = prompt("💥 How many push-ups did you complete?");
            if (pushUps && !isNaN(pushUps)) {
                let caloriesBurnedPU = (pushUps * 0.29).toFixed(2); // Approx 0.29 cal per push-up
                document.getElementById("calorieResultPU").innerText = `🔥 You burned approximately ${caloriesBurnedPU} calories! 🔥`;
                document.getElementById("calorieResultPU").style.display = "block";
            } else {
                alert("Please enter a valid number!");
            }
        }















        let countdownSQ;
        function startSquats() {
            let minutes = document.getElementById("setMinutesSQ").value;
            if (minutes <= 0) {
                alert("Please enter a valid time in minutes!");
                return;
            }

            let timeLeft = minutes * 60;
            document.getElementById("squatsTimer").innerText = `⏳ Time Left: ${minutes}:00`;
            document.getElementById("videoSectionSQ").style.display = "block";
            document.getElementById("squatsVideo").play();

            countdownSQ = setInterval(() => {
                timeLeft--;
                let mins = Math.floor(timeLeft / 60);
                let secs = timeLeft % 60;
                document.getElementById("squatsTimer").innerText = `⏳ Time Left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;

                if (timeLeft <= 0) {
                    clearInterval(countdownSQ);
                    document.getElementById("squatsTimer").innerText = "✅ Workout Complete!";
                    document.getElementById("squatsVideo").pause();
                    askForSquats();
                }
            }, 1000);
        }

        function askForSquats() {
            let squats = prompt("🏋️‍♂️ How many squats did you complete?");
            if (squats && !isNaN(squats)) {
                let caloriesBurned = (squats * 0.4).toFixed(2);
                document.getElementById("calorieResultSQ").innerText = `🔥 You burned approximately ${caloriesBurned} calories! 🔥`;
                document.getElementById("calorieResultSQ").style.display = "block";
            } else {
                alert("Please enter a valid number!");
            }
        }