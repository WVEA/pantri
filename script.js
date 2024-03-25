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
        hammer.on('swiperight', function(e) {
            e.target.classList.add('selected');
            promptIngredientAmount(e.target);
        });
        
        ingredientCard.appendChild(card);
    });
    
    findRecipesBtn.classList.remove('hidden');
}

function promptIngredientAmount(ingredientElement) {
    const ingredientName = ingredientElement.querySelector('h3').textContent;
    const amount = prompt(`Enter the amount of ${ingredientName} you have:`);
    
    if (amount !== null) {
        ingredientElement.dataset.amount = amount;
    }
}

function findRecipes() {
    const selectedIngredients = Array.from(document.querySelectorAll('.card.selected'));
    const ingredientAmounts = selectedIngredients.map(ingredient => ({
        name: ingredient.querySelector('h3').textContent,
        amount: ingredient.dataset.amount
    }));
    
    const matchingRecipes = recipes.filter(recipe => {
        return recipe.ingredients.every(ingredient => {
            const selectedIngredient = ingredientAmounts.find(item => item.name === ingredient);
            return selectedIngredient && parseFloat(selectedIngredient.amount) > 0;
        });
    });
    
    renderRecipes(matchingRecipes);
}

function renderRecipes(recipes) {
    recipeList.innerHTML = '';
    
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
        `;
        recipeList.appendChild(card);
    });
    
    recipesSection.classList.remove('hidden');
}
