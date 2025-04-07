let step = 0;
    let userData = {};

    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    function addMessage(text, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.innerText = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function nextStep() {
        if (step === 0) {
            addMessage("👋 Hi there! I’m your fitness assistant. Let's create your personalized workout and diet plan! First, can you tell me your weight (in kg)? ⚖️", "bot");
        } else if (step === 1) {
            addMessage("📏 Great! Now, what’s your height (in cm)?", "bot");
        } else if (step === 2) {
            addMessage("🎂 Thanks! What's your age?", "bot");
        } else if (step === 3) {
            addMessage("🍽️ Almost there! Do you follow a Vegetarian or Non-Vegetarian diet?", "bot");
        } else {
            generatePlan();
        }
        step++;
    }

    function sendMessage() {
        let userText = userInput.value.trim();
        if (!userText) return;
        
        addMessage(userText, "user");
        userInput.value = "";

        if (step === 1) userData.weight = parseInt(userText);
        else if (step === 2) userData.height = parseInt(userText);
        else if (step === 3) userData.age = parseInt(userText);
        else if (step === 4) userData.diet = userText.toLowerCase();

        setTimeout(nextStep, 1000);
    }

    function generatePlan() {
        let bmi = userData.weight / ((userData.height / 100) ** 2);
        let category = bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal" : "Overweight";

        let workoutPlan, dietPlan;
        
        if (category === "Underweight") {
            workoutPlan = `🏋️ Since your BMI suggests you're underweight, it's important to focus on strength training to build muscle.  
💪 Workout Plan:  
🏋️ Beginner Level
📅 Workout Schedule: 4-5 days per week

Push-ups – 3 sets of 10-12 reps (30 sec rest)

Squats – 4 sets of 10-12 reps (30 sec rest)

Dumbbell Shoulder Press – 3 sets of 8-10 reps (45 sec rest)

Lunges (each leg) – 3 sets of 10 reps (30 sec rest)

Bent-over Rows – 4 sets of 8-12 reps (45 sec rest)

🔥 Core Workout (2-3 sets, 10-15 reps each)

Plank – 30-45 seconds

Leg Raises – 12 reps

Russian Twists – 15 reps per side

🛑 Rest Days: 2 days per week (active recovery - light yoga or walking)

💪 Expert Level (Heavy Strength Training)
📅 Workout Schedule: 5-6 days per week

Deadlifts – 5 sets of 6-8 reps (1 min rest)

Bench Press – 4 sets of 8-10 reps (45 sec rest)

Barbell Squats – 5 sets of 6-10 reps (1 min rest)

Overhead Press – 4 sets of 8-10 reps (45 sec rest)

Pull-ups – 4 sets of 8-12 reps (45 sec rest)

🔥 Core Workout (3-4 sets, 12-15 reps each)

Hanging Leg Raises – 12 reps

Weighted Russian Twists – 15 reps per side

Bicycle Crunches – 20 reps

🛑 Rest Days: 1-2 days per week


`;

            dietPlan = userData.diet === "vegetarian" 
                ? `🥗 Vegetarian Diet Plan:  
🌅 Breakfast: Oats with nuts & honey, Peanut butter toast, Fruit smoothie\n
🥗 Lunch: Brown rice with lentils, Mixed vegetable curry, Greek yogurt\n
🍽️ Dinner: Quinoa with chickpeas, Paneer stir-fry, Almond milk\n
⚡ Pre-Workout: Banana with peanut butter, Almonds & walnuts\n
💪 Post-Workout: Homemade shake (milk, almonds, banana, dates), Greek yogurt

⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥
`
                : `🍗 Non-Vegetarian Diet Plan:  
🍳 Breakfast
✅ Egg & Paneer Scramble (Eggs, paneer, spinach, butter, whole wheat toast)
✅ Banana Shake with Nuts (Banana, almonds, walnuts, whole milk, honey)

🍛 Lunch
✅ Chicken & Lentil Rice Bowl (Chicken breast, brown rice, lentils, ghee)
✅ Salad with Avocado & Nuts

🍽️ Dinner
✅ Grilled Salmon with Quinoa & Veggies
✅ Sweet Potato & Curd on the Side

🍎 Pre-Workout
✅ Peanut Butter Toast with Banana

🥤 Post-Workout
✅ Homemade Protein Shake (Milk, banana, oats, almonds, honey, peanut butter)

⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥
`;
        } 
        else if (category === "Normal") {
            workoutPlan = `💪 Your BMI is in the normal range, so maintaining balance is key.  
🏃 Workout Plan:  🏋️ Beginner Level
📅 Workout Schedule: 4-5 days per week

Squats – 3 sets of 12-15 reps (30 sec rest)

Push-ups – 3 sets of 12-15 reps (30 sec rest)

Dumbbell Shoulder Press – 3 sets of 10-12 reps (30 sec rest)

Deadlifts – 3 sets of 8-10 reps (45 sec rest)

Lunges (each leg) – 3 sets of 12 reps (30 sec rest)

🔥 Cardio (3-4 times per week, 15-20 mins)

Running or Cycling – 15-20 mins

Skipping – 10 mins

🔥 Core Workout (3 sets, 10-15 reps each)

Plank – 45 seconds

Hanging Knee Raises – 12 reps

Side Planks – 30 seconds per side

🛑 Rest Days: 2 days per week

💪 Expert Level (Advanced Training & HIIT)
📅 Workout Schedule: 5-6 days per week

Bench Press – 4 sets of 8-12 reps (45 sec rest)

Weighted Squats – 4 sets of 8-12 reps (45 sec rest)

Pull-ups – 4 sets of 8-12 reps (45 sec rest)

Overhead Dumbbell Press – 4 sets of 8-12 reps (45 sec rest)

Romanian Deadlifts – 4 sets of 8-10 reps (45 sec rest)

🔥 Cardio (4 times per week, 20-25 mins per session)

HIIT (High-Intensity Interval Training)

⏳ HIIT Routine (20-25 mins, for Normal Weight Users)
📌 30 seconds work + 15 seconds rest per exercise. Repeat for 3-4 rounds.

1️⃣ Jump Squats
2️⃣ Push-ups
3️⃣ Mountain Climbers
4️⃣ Burpees
5️⃣ Plank to Shoulder Taps
6️⃣ Jumping Lunges

🔥 Core Workout (3-4 sets, 15-20 reps each)

Hanging Leg Raises – 12 reps

Medicine Ball Slams – 15 reps

Ab Rollouts – 12 reps

🛑 Rest Days: 1 day per week


`;

            dietPlan = userData.diet === "vegetarian" 
                ? `🥦 Vegetarian Diet Plan:  
🌅 Breakfast: Whole wheat toast with avocado, Nuts & yogurt, Banana smoothie
🥗 Lunch: Chickpea salad, Brown rice & lentils, Spinach stir-fry
🍽️ Dinner: Grilled tofu, Steamed vegetables, Quinoa
⚡ Pre-Workout: Handful of walnuts & almonds, Peanut butter on toast
💪 Post-Workout: Greek yogurt with flaxseeds, Protein-rich dal

⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥

`
                : `🥩 Non-Vegetarian Diet Plan:  
🍳 Breakfast
✅ Omelet with Cheese & Whole Wheat Toast
✅ Greek Yogurt with Fruits & Nuts

🍛 Lunch
✅ Grilled Chicken with Quinoa & Veggies
✅ Dal Tadka with Multigrain Roti

🍽️ Dinner
✅ Fish Curry with Brown Rice & Stir-Fried Veggies
✅ Cucumber Raita (Curd + Cucumber + Mint)

🍎 Pre-Workout
✅ Boiled Eggs with Nuts

🥤 Post-Workout
✅ Milkshake with Dates, Almonds, and Honey

⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥
`;
        } 
        else {
            workoutPlan = `🔥 Since your BMI is on the higher side, focus on fat-burning workouts.  
🏋️ Workout Plan:  
🏋️ Beginner Level
📅 Workout Schedule: 5 days per week

Bodyweight Squats – 3 sets of 12-15 reps (30 sec rest)

Incline Push-ups – 3 sets of 12-15 reps (30 sec rest)

Dumbbell Deadlifts – 3 sets of 8-12 reps (45 sec rest)

Step-ups – 3 sets of 12 reps per leg (30 sec rest)

Seated Rows – 3 sets of 10 reps (45 sec rest)

🔥 Cardio (5 times per week, 20-30 mins)

Brisk Walking or Cycling – 30 mins

Jump Rope – 10 mins

🔥 Core Workout (3 sets, 10-15 reps each)

Standing Side Crunches – 15 reps per side

Knee Tucks – 12 reps

Plank – 30-45 seconds

🛑 Rest Days: 2 days per week

💪 Expert Level (HIIT & Strength Training for Fat Loss)
📅 Workout Schedule: 6 days per week

Barbell Squats – 4 sets of 8-12 reps (45 sec rest)

Deadlifts – 4 sets of 8-12 reps (1 min rest)

Pull-ups – 4 sets of 8-12 reps (45 sec rest)

Kettlebell Swings – 4 sets of 15 reps (30 sec rest)

Plank-to-Push-ups – 3 sets of 12 reps (30 sec rest)

🔥 Fat-Burning HIIT (4-5 times per week, 20-25 mins per session)
⏳ HIIT Routine for Overweight Users
📌 40 seconds work + 20 seconds rest per exercise. Repeat for 3-4 rounds.

1️⃣ Jump Squats
2️⃣ Mountain Climbers
3️⃣ Burpees
4️⃣ High Knees
5️⃣ Bicycle Crunches
6️⃣ Plank Holds

🔥 Core Workout (3-4 sets, 15-20 reps each)

Hanging Knee Raises – 12 reps

Medicine Ball Slams – 15 reps

Bicycle Crunches – 20 reps

🛑 Rest Days: 1 day per week`;

            dietPlan = userData.diet === "vegetarian" 
                ? `🥗 Vegetarian Diet Plan:  
🌅 Breakfast: Oats with chia seeds, Mixed nuts, Fruit smoothie
🥗 Lunch: Lentil soup, Quinoa & veggie stir-fry
🍽️ Dinner: Grilled paneer with mixed greens, Cucumber & avocado salad
⚡ Pre-Workout: Greek yogurt with flaxseeds, Almonds
💪 Post-Workout: Cottage cheese, Handful of nuts

⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥`
                : `🐟 Non-Vegetarian Diet Plan:  
🍳 Breakfast
✅ Scrambled Egg Whites with Spinach & Avocado
✅ Black Coffee/Green Tea + Cottage Cheese (Paneer) with Chia Seeds

🍛 Lunch
✅ Grilled Fish with Sauteed Broccoli & Cauliflower Rice
✅ Mixed Lentil Soup with Green Salad

🍽️ Dinner
✅ Grilled Chicken with Stir-Fried Vegetables (No Rice/Minimal Carbs)
✅ Curd with Flax Seeds

🍎 Pre-Workout
✅ Handful of Almonds & Walnuts + Black Coffee

🥤 Post-Workout
✅ Protein-Rich Shake (Greek Yogurt, Berries, Flaxseeds, Water)


⚠️ Avoid These Dangerous Powders ⚠️
1️⃣ Steroid-Laced Supplements – Can harm liver, kidneys, and hormones.
2️⃣ High Sugar & Artificial Additives – Leads to weight gain and gut issues.
3️⃣ Fake or Unregulated Powders – May contain heavy metals or harmful chemicals.
4️⃣ Excessive Creatine & Pre-Workouts – Can cause heart issues and anxiety.
5️⃣ Unverified Herbal Powders – May disrupt hormones and digestion.

✅ Safer Choice: Stick to whole foods, trusted protein brands, and homemade shakes. 💪🔥`;
        }

        addMessage(`📊 Your BMI is ${bmi.toFixed(2)} - Category: ${category}. Here’s your plan:`, "bot");
        setTimeout(() => addMessage(workoutPlan, "bot"), 1500);
        setTimeout(() => addMessage(dietPlan, "bot"), 3000);
    }

    nextStep();