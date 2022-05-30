import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleRecipe from './pages/SingleRecipe';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              {/* allow /profile and /profile/myUsername to both render the Profile component */}
              <Route
                path="/profile/:username?"
                element={<Profile />}
              />
              <Route
                path="/recipe/:id"
                element={<SingleRecipe />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
