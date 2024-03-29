import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import RecipeForm from '../components/RecipeForm';
import RecipeList from '../components/RecipeList';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <RecipeList
            recipes={user.recipes}
            title={`${user.username}'s recipes...`}
          />
        </div>

    
      </div>
      <div className="mb-3">{!userParam && <RecipeForm />}</div>
    </div>
  );
};

export default Profile;



// import React from "react";
// import { Navigate, useParams } from 'react-router-dom';

// import RecipeList from "../components/RecipeList";
// import RecipeForm from '../components/RecipeForm';

// import { useQuery } from "@apollo/client";
// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

// const Profile = (props) => {
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam }
//   });

//   const user = data?.me || data?.user || {};
//   console.log(user);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // navigate to personal profile page if username is the logged-in user's
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/profile" />;
//   }

//   if (!user?.username) {
//     return (
//       <h4>
//         You need to be logged in to see this page. Use the navigation links above to sign up or log in!
//       </h4>
//     );
//   }

//   return (
//     <div>
//       <div className="flex-row mb-3">
//         <h2 className="bg-dark text-secondary p-3 display-inline-block">
//           Viewing {user.username}'s profile.
//         </h2>
//       </div>

//       <div className="flex-row justify-space-between mb-3">
//         <div className="col-12 mb-3 col-lg-8">
//           {/* <RecipeList
//             recipes={user.recipes}
//             title={`${user.username}'s recipes...`}
//           /> */}
//         </div>
//       </div>
//       <div className="mb-3">{!userParam && <RecipeForm />}
//       </div>
//     </div>
//   );
// };

// export default Profile;
