import { useAppStore } from './store/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import Booking from './pages/Booking';
import About from './pages/About';
import Contacts from './pages/Contacts';
import './App.css';

function App() {
  const currentPage = useAppStore((state) => state.currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'artists':
        return <Artists />;
      case 'booking':
        return <Booking />;
      case 'about':
        return <About />;
      case 'contacts':
        return <Contacts />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        {renderPage()}
      </main>
      <Footer />
    </>
  );
}

export default App;
