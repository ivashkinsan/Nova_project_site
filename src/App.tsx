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
      {/* tabIndex={-1}: skip-link реально переносит фокус в main — сам по себе
          <main> не фокусируется, и клавиатурный обход оставался бы на ссылке */}
      <main className="main" id="main" tabIndex={-1} aria-label="Лендинг NOVA PROJECT">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
