document.addEventListener('DOMContentLoaded', function() {
  // ... (previous JavaScript code remains the same) ...

  // Functions
  function showPreferences() {
    preferencesSection.classList.remove('hidden');
    document.getElementById('home').classList.add('hidden');
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
        <div class="amount"></div>
        <div class="selected-overlay">Selected</div>
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
      ingredientElement.querySelector('.amount').textContent = amount;
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
    ingredientsSection.classList.add('hidden');
    recipesSection.classList.remove('hidden');
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
  }
});
