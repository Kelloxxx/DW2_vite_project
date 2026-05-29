import { useState } from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f4f0",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
  },
  title: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "26px",
    fontWeight: 400,
    margin: "0 0 6px",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 2rem",
  },
  field: {
    marginBottom: "1.25rem",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#666",
    marginBottom: "6px",
  },
  input: (state) => ({
    width: "100%",
    boxSizing: "border-box",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    padding: "10px 12px",
    borderRadius: "8px",
    border: `1.5px solid ${
      state === "error" ? "#e24b4a" : state === "valid" ? "#1d9e75" : "#ddd"
    }`,
    outline: "none",
    background: "#fafafa",
    color: "#1a1a1a",
    transition: "border-color 0.15s",
  }),
  errorMsg: {
    fontSize: "12px",
    color: "#a32d2d",
    marginTop: "4px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "0.5rem",
    fontSize: "15px",
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "opacity 0.15s",
  },
  success: {
    marginTop: "1rem",
    padding: "12px 14px",
    borderRadius: "8px",
    background: "#e1f5ee",
    color: "#0f6e56",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

function Field({ label, id, type = "text", value, onChange, onBlur, error, touched }) {
  const state = touched ? (error ? "error" : "valid") : "idle";

  return (
    <div style={styles.field}>
      <label htmlFor={id} style={styles.label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={styles.input(state)}
        autoComplete={type === "email" ? "email" : "name"}
      />
      {touched && error && <p style={styles.errorMsg}>{error}</p>}
    </div>
  );
}

function validate(name, email) {
  const errors = {};
  if (!name.trim()) errors.name = "Nome é obrigatório.";
  else if (name.trim().length < 2) errors.name = "Mínimo 2 caracteres.";

  if (!email.trim()) errors.email = "E-mail é obrigatório.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Formato de e-mail inválido.";

  return errors;
}

export default function MiniForm() {
  const [values, setValues] = useState({ name: "", email: "" });
  const [touched, setTouched] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values.name, values.email);

  function handleChange(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleBlur(field) {
    return () => setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleSubmit() {
    setTouched({ name: true, email: true });
    if (!errors.name && !errors.email) {
      setSubmitted(true);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Fique por dentro</h1>
        <p style={styles.subtitle}>Preencha seus dados para continuar.</p>

        <Field
          label="Nome"
          id="name"
          value={values.name}
          onChange={handleChange("name")}
          onBlur={handleBlur("name")}
          error={errors.name}
          touched={touched.name}
        />

        <Field
          label="E-mail"
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
        />

        <button
          style={styles.button}
          onClick={handleSubmit}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Enviar
        </button>

        {submitted && (
          <div style={styles.success}>
            Tudo certo! Seus dados foram recebidos.
          </div>
        )}
      </div>
    </div>
  );
}
