import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ recipeId }) => {

    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, recipeId },
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a comment to this thought..."
                    value={commentBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>

            {error && <div>Something went wrong...</div>}
        </div>
    );
};

//   return (
//     <div>
//       <p className="m-0">
//         Character Count: 0/280
//       </p>
//       <form className="flex-row justify-center justify-space-between-md align-stretch">
//         <textarea
//           placeholder="Leave a reaction to this recipe..."
//           className="form-input col-12 col-md-9"
//         ></textarea>

//         <button className="btn col-12 col-md-3" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

export default CommentForm;