let squatCount = 0;
        let isSquatting = false;
        let detector;
        let trackingActive = false;
        let videoStream = null;

        // Audio files
        const startSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Start beep
        const squatBeep = new Audio('https://www.soundjay.com/button/beep-08b.wav'); // Squat counted beep

        async function setupCamera() {
            const video = document.getElementById('video');
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            videoStream = stream;
            video.style.display = "block"; // Show camera when starting
        }

        function stopCamera() {
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
                videoStream = null;
                document.getElementById('video').style.display = "none"; // Hide camera when stopping
            }
        }

        async function loadPoseModel() {
            detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
        }

        function drawSkeleton(ctx, keypoints) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "red";

            keypoints.forEach(point => {
                if (point.score > 0.5) {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            });
        }

        function calculateCalories(squats) {
            return (squats * 0.32).toFixed(2); // Rough estimate: 0.32 kcal per squat
        }

        function saveWorkoutHistory() {
            localStorage.setItem('lastSquatCount', squatCount);
            localStorage.setItem('lastCalories', calculateCalories(squatCount));
        }

        async function startSquatTracking() {
            if (!trackingActive) {
                trackingActive = true;
                squatCount = 0;
                document.getElementById('squatCount').innerText = 0;
                document.getElementById('calories').innerText = 0;

                // Fix sound autoplay issues by playing on user interaction
                startSound.play().catch(error => console.log("Start sound blocked by browser:", error));

                await setupCamera();
                detectSquats();
            }
        }

        function stopSquatTracking() {
            trackingActive = false;
            stopCamera();
        }

        async function detectSquats() {
            const video = document.getElementById('video');
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            setInterval(async () => {
                if (!trackingActive) return;

                const poses = await detector.estimatePoses(video);
                if (poses.length > 0) {
                    const keypoints = poses[0].keypoints;
                    drawSkeleton(ctx, keypoints);

                    // Get keypoints
                    const leftHip = keypoints.find(p => p.name === 'left_hip');
                    const leftKnee = keypoints.find(p => p.name === 'left_knee');
                    const leftAnkle = keypoints.find(p => p.name === 'left_ankle');

                    const rightHip = keypoints.find(p => p.name === 'right_hip');
                    const rightKnee = keypoints.find(p => p.name === 'right_knee');
                    const rightAnkle = keypoints.find(p => p.name === 'right_ankle');

                    if (leftHip && leftKnee && leftAnkle && rightHip && rightKnee && rightAnkle) {
                        const avgKneeY = (leftKnee.y + rightKnee.y) / 2;
                        const avgHipY = (leftHip.y + rightHip.y) / 2;
                        const avgAnkleY = (leftAnkle.y + rightAnkle.y) / 2;

                        // Squat detection: Knees should drop significantly below hips
                        if (avgKneeY > avgHipY + 60 && avgKneeY < avgAnkleY) {
                            isSquatting = true;
                        } 
                        // Stand-up detection: Knees should rise above hip level again
                        else if (isSquatting && avgKneeY < avgHipY - 10) {
                            squatCount++;
                            document.getElementById('squatCount').innerText = squatCount;
                            document.getElementById('calories').innerText = calculateCalories(squatCount);
                            saveWorkoutHistory();

                            // Play squat beep with error handling
                            squatBeep.play().catch(error => console.log("Squat beep blocked by browser:", error));

                            isSquatting = false;
                        }
                    }
                }
            }, 100);
        }

        async function main() {
            await loadPoseModel();
        }

        main();


















        