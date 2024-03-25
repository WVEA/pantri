// Get DOM elements
const startBtn = document.getElementById('startBtn');
const preferencesSection = document.getElementById('preferences');
const ingredientsSection = document.getElementById('ingredients');
const ingredientCard = document.getElementById('ingredientCard');
const findRecipesBtn = document.getElementById('findRecipesBtn');
const recipesSection = document.getElementById('recipes');
const recipeList = document.getElementById('recipeList');

// Sample ingredient data (replace with actual data from the database)
const ingredients = [
    { name: 'Oats', image: 'oats.jpg' },
    { name: 'Eggs', image: 'eggs.jpg' },
    { name: 'Flour', image: 'flour.jpg' },
    // Add more ingredients...
];

// Sample recipe data (replace with actual data from the database)
const recipes = [
    { name: 'Oatmeal Cookies', ingredients: ['Oats', 'Flour', 'Eggs'] },
    { name: 'Pancakes', ingredients: ['Flour', 'Eggs'] },
    // Add more recipes...
];

// Event listeners
startBtn.addEventListener('click', showPreferences);
preferencesSection.querySelector('form').addEventListener('submit', showIngredients);
findRecipesBtn.addEventListener('click', findRecipes);

// Functions
function showPreferences() {
    preferencesSection.classList.remove('hidden');
}

function showIngredients(event) {
    event.preventDefault();
    preferencesSection.classList.add('hidden');
    ingredientsSection.classList.remove('hidden');
    renderIngredientCards();
}

function renderIngredientCards() {
    ingredientCard.innerHTML = ''; // Clear previous ingredient cards

    ingredients.forEach(ingredient => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${ingredient.image}" alt="${ingredient.name}">
            <h3>${ingredient.name}</h3>
        `;

        // Create a Hammer instance for each ingredient card
        let hammer = new Hammer(card);

        // Add swipe event listener
