import { Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/AuthSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistrationModel from "../registration/RegistrationModel";
import "./login.css";

const Login = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDialog = () => setShow(true);
  const hideDialog = () => setShow(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Basic validation for form inputs
    if (!userName || !password) {
      setError(t("Please enter both username and password!"));
      return;
    }

    if (password.length < 6) {
      // Example: password validation
      setError(t("Password must be at least 6 characters."));
      return;
    }

    try {
      // setLoading(true);
      const user = { userName, role: "user" }; // Pass password as well
      console.log("test dta" + user.userName);
      // Simulate async dispatch for login
      dispatch(login(user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(t("Login failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <Form className="login-form" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">{t("tulipCart")}</h3>

          <Form.Group controlId="username" className="mb-3">
            <Form.Label>{t("UserName")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t("enterUserName")}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!userName && !!error}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!password && !!error}
            />
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            className="w-100 mt-3"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" animation="border" /> : t("login")}
          </Button>

          <Button variant="success" className="w-100 mt-2" onClick={showDialog}>
            {t("register")}
          </Button>
        </Form>
      </div>

      <Modal show={show} onHide={hideDialog} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("registerNewAccount")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationModel />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
