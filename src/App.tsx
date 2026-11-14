import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VerticalSidebar from './components/VerticalSidebar';
import './App.css';

function App() {
  return (
    <>
      <a href="#main" className="skipLink">
        К основному содержимому
      </a>
      <Header />
      <VerticalSidebar />
      <main className="main" id="main" aria-label="Лендинг NOVA PROJECT">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
