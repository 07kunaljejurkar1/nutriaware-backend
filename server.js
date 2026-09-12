// ==========================================
// NutriAware - Complete Backend
// Node.js + Express
// ==========================================

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------------------------------
// Middleware
// ------------------------------------------

app.use(cors({
    origin: "*"
}));

app.use(express.json({ limit: "10mb" }));

// ------------------------------------------
// Demo Database
// ------------------------------------------

const users = [
    {
        id: "U001",
        email: "student@college.edu",
        password: "123456",
        name: "Student",
        xp: 180,
        streak: 3
    }
];

const meals = [];

const hydration = {};

const quizQuestions = [
    {
        id: 1,
        question: "Which nutrient is mainly responsible for body repair?",
        options: ["Protein", "Sugar", "Water", "Fiber"],
        answer: "Protein"
    },
    {
        id: 2,
        question: "Which is a healthy source of carbohydrates?",
        options: ["Whole wheat roti", "Cola", "Candy", "Chips"],
        answer: "Whole wheat roti"
    },
    {
        id: 3,
        question: "How much water is commonly recommended as a basic daily target?",
        options: ["0.5 L", "1 L", "2-3 L", "10 L"],
        answer: "2-3 L"
    },
    {
        id: 4,
        question: "Which food is a good protein source?",
        options: ["Paneer", "Soda", "Candy", "Sugar"],
        answer: "Paneer"
    },
    {
        id: 5,
        question: "Which is generally healthier?",
        options: [
            "Vegetable poha",
            "Deep fried chips",
            "Sugary soda",
            "Cream biscuits"
        ],
        answer: "Vegetable poha"
    }
];

// ------------------------------------------
// Recipes
// ------------------------------------------

const recipes = [
    {
        id: 1,
        name: "Poha",
        category: "Breakfast",
        calories: 180,
        protein: 5,
        ingredients: [
            "Poha",
            "Onion",
            "Peanuts",
            "Coriander",
            "Lemon"
        ],
        steps: [
            "Wash the poha.",
            "Heat a pan.",
            "Add onion and peanuts.",
            "Add poha and mix.",
            "Add lemon and coriander.",
            "Serve hot."
        ]
    },

    {
        id: 2,
        name: "Besan Chilla",
        category: "Breakfast",
        calories: 220,
        protein: 10,
        ingredients: [
            "Besan",
            "Onion",
            "Tomato",
            "Spices",
            "Water"
        ],
        steps: [
            "Prepare besan batter.",
            "Add vegetables and spices.",
            "Heat a pan.",
            "Pour batter.",
            "Cook both sides.",
            "Serve."
        ]
    },

    {
        id: 3,
        name: "Dal Khichdi",
        category: "Lunch",
        calories: 320,
        protein: 12,
        ingredients: [
            "Rice",
            "Moong dal",
            "Vegetables",
            "Turmeric",
            "Salt"
        ],
        steps: [
            "Wash rice and dal.",
            "Add vegetables.",
            "Cook everything together.",
            "Add spices.",
            "Cook until soft.",
            "Serve warm."
        ]
    },

    {
        id: 4,
        name: "Sprouts Bhel",
        category: "Snacks",
        calories: 160,
        protein: 8,
        ingredients: [
            "Sprouts",
            "Onion",
            "Tomato",
            "Coriander",
            "Lemon"
        ],
        steps: [
            "Take boiled sprouts.",
            "Add chopped vegetables.",
            "Add lemon.",
            "Mix everything.",
            "Serve fresh."
        ]
    },

    {
        id: 5,
        name: "Sattu Cooler",
        category: "Drinks",
        calories: 140,
        protein: 7,
        ingredients: [
            "Sattu",
            "Water",
            "Lemon",
            "Salt",
            "Cumin"
        ],
        steps: [
            "Mix sattu with water.",
            "Add lemon.",
            "Add salt and cumin.",
            "Mix well.",
            "Serve chilled."
        ]
    },

    {
        id: 6,
        name: "Egg Bhurji",
        category: "Dinner",
        calories: 240,
        protein: 15,
        ingredients: [
            "Eggs",
            "Onion",
            "Tomato",
            "Spices"
        ],
        steps: [
            "Heat a pan.",
            "Cook onion and tomato.",
            "Add eggs.",
            "Add spices.",
            "Scramble well.",
            "Serve hot."
        ]
    }
];

// ------------------------------------------
// Craving Swaps
// ------------------------------------------

const cravingSwaps = [
    {
        unhealthy: "Instant Maggi",
        unhealthyCalories: 400,
        healthy: "Vegetable Poha",
        healthyCalories: 180,
        saving: 220
    },

    {
        unhealthy: "Cold Soda / Cola",
        unhealthyCalories: 150,
        healthy: "Fresh Mint Chaas",
        healthyCalories: 45,
        saving: 105
    },

    {
        unhealthy: "Canteen Samosa",
        unhealthyCalories: 260,
        healthy: "Roasted Makhana / Chana",
        healthyCalories: 110,
        saving: 150
    },

    {
        unhealthy: "Cream Biscuits / Chips",
        unhealthyCalories: 220,
        healthy: "Banana + Peanut Butter",
        healthyCalories: 160,
        saving: 60
    }
];

// ------------------------------------------
// HOME
// ------------------------------------------

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "NutriAware Backend is running!",
        version: "1.0",
        status: "online"
    });

});

// ------------------------------------------
// HEALTH CHECK
// ------------------------------------------

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "NutriAware API is healthy"
    });

});

// ------------------------------------------
// LOGIN
// ------------------------------------------

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const token = crypto.randomBytes(24).toString("hex");

    res.json({
        success: true,
        message: "Login successful",
        token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            xp: user.xp,
            streak: user.streak
        }
    });

});

// ------------------------------------------
// USER PROFILE
// ------------------------------------------

app.get("/api/user/:id", (req, res) => {

    const user = users.find(
        u => u.id === req.params.id
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.json({
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            xp: user.xp,
            streak: user.streak
        }
    });

});

// ------------------------------------------
// MEAL LOGGER
// ------------------------------------------

app.post("/api/meals", (req, res) => {

    const {
        userId,
        meal,
        mealType,
        calories,
        protein,
        carbs,
        fats
    } = req.body;

    if (!meal) {
        return res.status(400).json({
            success: false,
            message: "Meal name is required"
        });
    }

    const newMeal = {
        id: meals.length + 1,
        userId: userId || "U001",
        meal,
        mealType: mealType || "Other",
        calories: Number(calories) || 0,
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fats: Number(fats) || 0,
        date: new Date().toISOString()
    };

    meals.push(newMeal);

    res.json({
        success: true,
        message: "Meal added successfully",
        meal: newMeal
    });

});

// ------------------------------------------
// GET MEALS
// ------------------------------------------

app.get("/api/meals/:userId", (req, res) => {

    const userMeals = meals.filter(
        meal => meal.userId === req.params.userId
    );

    res.json({
        success: true,
        meals: userMeals
    });

});

// ------------------------------------------
// HYDRATION
// ------------------------------------------

app.get("/api/hydration/:userId", (req, res) => {

    const userId = req.params.userId;

    const amount = hydration[userId] || 0;

    res.json({
        success: true,
        userId: userId,
        waterMl: amount,
        waterLiters: amount / 1000,
        targetLiters: 2.5
    });

});

// ------------------------------------------
// ADD WATER
// ------------------------------------------

app.post("/api/hydration", (req, res) => {

    const {
        userId,
        amount
    } = req.body;

    const id = userId || "U001";

    if (!hydration[id]) {
        hydration[id] = 0;
    }

    hydration[id] += Number(amount) || 250;

    res.json({
        success: true,
        message: "Water added",
        waterMl: hydration[id],
        waterLiters: hydration[id] / 1000,
        targetLiters: 2.5
    });

});

// ------------------------------------------
// RESET WATER
// ------------------------------------------

app.delete("/api/hydration/:userId", (req, res) => {

    hydration[req.params.userId] = 0;

    res.json({
        success: true,
        message: "Hydration reset"
    });

});

// ------------------------------------------
// RECIPES
// ------------------------------------------

app.get("/api/recipes", (req, res) => {

    const category = req.query.category;

    if (!category || category === "All") {

        return res.json({
            success: true,
            recipes: recipes
        });

    }

    const filtered = recipes.filter(
        r => r.category.toLowerCase() === category.toLowerCase()
    );

    res.json({
        success: true,
        recipes: filtered
    });

});

// ------------------------------------------
// SINGLE RECIPE
// ------------------------------------------

app.get("/api/recipes/:id", (req, res) => {

    const recipe = recipes.find(
        r => r.id === Number(req.params.id)
    );

    if (!recipe) {
        return res.status(404).json({
            success: false,
            message: "Recipe not found"
        });
    }

    res.json({
        success: true,
        recipe: recipe
    });

});

// ------------------------------------------
// SEARCH RECIPES
// ------------------------------------------

app.get("/api/search", (req, res) => {

    const query = (req.query.q || "").toLowerCase();

    const results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(
            ingredient =>
                ingredient.toLowerCase().includes(query)
        )
    );

    res.json({
        success: true,
        results: results
    });

});

// ------------------------------------------
// CRAVING SWAPS
// ------------------------------------------

app.get("/api/craving-swaps", (req, res) => {

    res.json({
        success: true,
        swaps: cravingSwaps
    });

});

// ------------------------------------------
// THALI ANALYZER
// ------------------------------------------

app.post("/api/thali/analyze", (req, res) => {

    const {
        carbs,
        protein,
        vegetables
    } = req.body;

    let score = 0;

    if (carbs) score += 25;
    if (protein) score += 25;
    if (vegetables) score += 50;

    let grade = "Needs Improvement";

    if (score >= 90) {
        grade = "A";
    } else if (score >= 75) {
        grade = "B";
    } else if (score >= 50) {
        grade = "C";
    }

    res.json({
        success: true,
        score: score,
        grade: grade,
        message:
            score >= 75
                ? "Good balanced thali!"
                : "Try adding more protein and vegetables."
    });

});

// ------------------------------------------
// NUTRIBOT
// ------------------------------------------

app.post("/api/chat", (req, res) => {

    const message = (req.body.message || "").toLowerCase();

    if (!message) {
        return res.status(400).json({
            success: false,
            message: "Please enter a message"
        });
    }

    let reply =
        "I can help you find healthy student-friendly recipes. Try asking about poha, paneer, oats, eggs, chana or dal.";

    const recipe = recipes.find(r =>
        message.includes(r.name.toLowerCase())
    );

    if (recipe) {

        reply =
            `${recipe.name} contains approximately ${recipe.calories} kcal and ${recipe.protein}g protein. ` +
            `Ingredients: ${recipe.ingredients.join(", ")}. ` +
            `Steps: ${recipe.steps.join(" ")}`;

    } else if (message.includes("protein")) {

        reply =
            "Good student-friendly protein sources include dal, paneer, eggs, sprouts, curd, chana and milk.";

    } else if (message.includes("water")) {

        reply =
            "Stay hydrated throughout the day. Your NutriAware demo target is 2.5 liters per day.";

    } else if (message.includes("breakfast")) {

        reply =
            "Healthy breakfast options include vegetable poha, besan chilla, oats, idli and boiled eggs.";

    } else if (message.includes("weight")) {

        reply =
            "For healthy weight management, focus on balanced meals containing protein, vegetables, whole grains and appropriate portions.";

    }

    res.json({
        success: true,
        reply: reply
    });

});

// ------------------------------------------
// NUTRITION QUIZ
// ------------------------------------------

app.get("/api/quiz", (req, res) => {

    res.json({
        success: true,
        totalQuestions: quizQuestions.length,
        questions: quizQuestions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }))
    });

});

// ------------------------------------------
// SUBMIT QUIZ ANSWER
// ------------------------------------------

app.post("/api/quiz/answer", (req, res) => {

    const {
        questionId,
        answer
    } = req.body;

    const question = quizQuestions.find(
        q => q.id === Number(questionId)
    );

    if (!question) {
        return res.status(404).json({
            success: false,
            message: "Question not found"
        });
    }

    const correct =
        question.answer.toLowerCase() ===
        String(answer).toLowerCase();

    res.json({
        success: true,
        correct: correct,
        xp: correct ? 10 : 0,
        message: correct
            ? "Correct! +10 XP 🎉"
            : "Incorrect. Try the next question!"
    });

});

// ------------------------------------------
// ANALYTICS
// ------------------------------------------

app.get("/api/analytics/:userId", (req, res) => {

    const userMeals = meals.filter(
        m => m.userId === req.params.userId
    );

    const totalCalories = userMeals.reduce(
        (sum, m) => sum + m.calories,
        0
    );

    const totalProtein = userMeals.reduce(
        (sum, m) => sum + m.protein,
        0
    );

    const totalCarbs = userMeals.reduce(
        (sum, m) => sum + m.carbs,
        0
    );

    const totalFats = userMeals.reduce(
        (sum, m) => sum + m.fats,
        0
    );

    res.json({
        success: true,
        analytics: {
            totalMeals: userMeals.length,
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fats: totalFats
        }
    });

});

// ------------------------------------------
// FOOD SCANNER
// ------------------------------------------

// Demo endpoint.
// Real AI image recognition requires an AI/vision model.

app.post("/api/scanner", (req, res) => {

    const {
        foodName
    } = req.body;

    const food = foodName || "Indian Vegetable Thali";

    const nutritionDatabase = {

        "indian vegetable thali": {
            calories: 420,
            protein: 14,
            carbs: 62,
            fats: 11
        },

        "poha": {
            calories: 180,
            protein: 5,
            carbs: 30,
            fats: 5
        },

        "samosa": {
            calories: 260,
            protein: 5,
            carbs: 32,
            fats: 13
        },

        "banana": {
            calories: 105,
            protein: 1,
            carbs: 27,
            fats: 0
        }

    };

    const key = food.toLowerCase();

    const result =
        nutritionDatabase[key] ||
        nutritionDatabase["indian vegetable thali"];

    res.json({
        success: true,
        detectedFood: food,
        confidence: "94%",
        nutrition: result,
        note: "This is a demo nutrition estimate, not medical advice."
    });

});

// ------------------------------------------
// DASHBOARD
// ------------------------------------------

app.get("/api/dashboard/:userId", (req, res) => {

    const userId = req.params.userId;

    const user = users.find(
        u => u.id === userId
    );

    const userMeals = meals.filter(
        m => m.userId === userId
    );

    const water = hydration[userId] || 0;

    const calories = userMeals.reduce(
        (sum, m) => sum + m.calories,
        0
    );

    res.json({

        success: true,

        dashboard: {

            user: user
                ? {
                    name: user.name,
                    xp: user.xp,
                    streak: user.streak
                }
                : null,

            hydration: {
                current: water / 1000,
                target: 2.5
            },

            calories: calories,

            mealsLogged: userMeals.length,

            dietQuality:
                calories > 0
                    ? "B+"
                    : "Not enough data"

        }

    });

});

// ------------------------------------------
// 404
// ------------------------------------------

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });

});

// ------------------------------------------
// ERROR HANDLER
// ------------------------------------------

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });

});

// ------------------------------------------
// START SERVER
// ------------------------------------------

app.listen(PORT, () => {

    console.log(
        `🥗 NutriAware Backend running on port ${PORT}`
    );

});
