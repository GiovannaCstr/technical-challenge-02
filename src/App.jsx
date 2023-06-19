import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, useUser, RedirectToSignIn } from '@clerk/clerk-react';
import { neobrutalism } from '@clerk/themes';
import './global.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CarouselCards from './components/HomeCarousel/CarouselCards';
import PlantRegistration from './components/Registration/PlantRegistration';
import HomePage from './components/HomePage/Home';
import Details from './components/Details/Details';

function AuthWrapper() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <>
        {/* Restante do conteúdo quando o usuário estiver logado */}
        <Header />
        <HomePage />
        <CarouselCards />
        <Footer />
      </>
    );
  } else {
    return <RedirectToSignIn />;
  }
}

const Home = () => {
  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }

  return <AuthWrapper />;
};

const Product = () => {
  return (
    <>
      <Details />
    </>
  );
};

const Registration = () => {
  return (
    <>
      <h1>Aqui fica o forms</h1>
    </>
  );
};

function App() {
  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  return (
    <div>
      <ClerkProvider
        publishableKey={clerkPubKey}
        appearance={{
          baseTheme: neobrutalism,
          elements: { formButtonPrimary: 'bg-green-500 hover:bg-green-600' },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </ClerkProvider>
      {/* Restante do conteúdo do aplicativo */}
    </div>
  );
}

export default App;
