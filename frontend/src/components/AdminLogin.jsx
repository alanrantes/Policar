import { useState } from "react";
import { Lock } from "lucide-react";

function AdminLogin({ onLogin }) {
  const [login, setLogin] = useState({
    user: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (login.user === "admin" && login.password === "123456") {
      setError("");
      onLogin();
    } else {
      setError("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <Lock size={24} />
          </div>

          <div>
            <h2>Login do Administrador</h2>
            <p>Acesse o painel para gerenciar agendamentos.</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="admin-login-form" onSubmit={handleLogin}>
          <input
            placeholder="Usuário"
            value={login.user}
            onChange={(e) => setLogin({ ...login, user: e.target.value })}
          />

          <input
            type="password"
            placeholder="Senha"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
          />

          <button className="btn btn-orange">Entrar no painel</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;