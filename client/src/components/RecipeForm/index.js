import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';


const RecipeForm = () => {

    const [recipeText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    // const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    //     update(cache, { data: { addRecipe } }) {
    //       // read what's currently in the cache
    //       const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
      
    //       // prepend the newest recipe to the front of the array
    //       cache.writeQuery({
    //         query: QUERY_RECIPES,
    //         data: { recipes: [addRecipe, ...recipes] }
    //       });
    //     }
    //   });

    const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
        update(cache, { data: { addRecipe } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, recipes: [...me.recipes, addRecipe] } },
            });
          } catch (e) {
            console.warn("First recipe insertion by user!")
          }
      
          // update recipe array's cache
          const { recipes } = cache.readQuery({ query: QUERY_RECIPES });
          cache.writeQuery({
            query: QUERY_RECIPES,
            data: { recipes: [addRecipe, ...recipes] },
          });
        }
      });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add recipe to database
          await addRecipe({
            variables: { recipeText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new recipe..."
                    value={recipeText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}

                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RecipeForm;