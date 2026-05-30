import { Car, Moon, Sun } from "lucide-react";

function Header({ setCurrentPage, isDarkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <div className="logo-icon">
            <Car size={22} />
          </div>

          <div>
            <h1>PoliCar</h1>
            <p>Oficina de estética automotiva</p>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="header-actions">
          <button className="btn btn-outline" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage("home")}
          >
            Site
          </button>

          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage("admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;