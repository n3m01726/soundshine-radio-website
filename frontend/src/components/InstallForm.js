import React, { useState } from "react";

const initialState = {
  hostname: "",
  username: "",
  password: "",
  database: "",
  prefix: "",
  addFakeData: false,
  deleteFakeData: false,
  siteUsername: "",
  sitePassword: "",
  userEmail: "",
  site_name: "",
};

function InstallForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("http://localhost:4000/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setResult(data.message);
      else setError(data.error || "Erreur inconnue");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Hôte MySQL :{" "}
        <input
          name="hostname"
          value={form.hostname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Utilisateur MySQL :{" "}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Mot de passe MySQL :{" "}
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Nom de la base :{" "}
        <input
          name="database"
          value={form.database}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Préfixe des tables :{" "}
        <input name="prefix" value={form.prefix} onChange={handleChange} />
      </label>
      <br />
      <label>
        Ajouter des fausses données ?{" "}
        <input
          name="addFakeData"
          type="checkbox"
          checked={form.addFakeData}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Supprimer les fausses données ?{" "}
        <input
          name="deleteFakeData"
          type="checkbox"
          checked={form.deleteFakeData}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Premier utilisateur (admin) :{" "}
        <input
          name="siteUsername"
          value={form.siteUsername}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Mot de passe admin :{" "}
        <input
          name="sitePassword"
          type="password"
          value={form.sitePassword}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email admin :{" "}
        <input
          name="userEmail"
          type="email"
          value={form.userEmail}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Nom du site :{" "}
        <input
          name="site_name"
          value={form.site_name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Installation..." : "Installer"}
      </button>
      {result && <div style={{ color: "green", marginTop: 10 }}>{result}</div>}
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </form>
  );
}

export default InstallForm;
