import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes, title }) => {
  if (!recipes.length) {
    return <h3>No Recipes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {recipes &&
        recipes.map(recipe => (
          <div key={recipe._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${recipe.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {recipe.username}
              </Link>{' '}
              recipe on {recipe.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/recipe/${recipe._id}`}>
                <p>{recipe.recipeText}</p>
                <p className="mb-0">
                  Comments: {recipe.commentCount} || Click to{' '}
                  {recipe.commentCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>

          </div>
        ))}
    </div>
  );
};

export default RecipeList;