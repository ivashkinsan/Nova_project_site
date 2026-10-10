import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VerticalSidebar from './components/VerticalSidebar';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <VerticalSidebar />
      <main className="main">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
