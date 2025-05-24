import React, { useState } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import { useToast } from "../../component/toast/ToastProvider"; 
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/AuthSlice";
import type { AppDispatch } from "../../store/Store";
import "./login.css";
import { useNavigate } from "react-router-dom";
import RegistrationModel from "../registration/RegistrationModel";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const showDialog = () => setShow(true);
  const hideDialog = () => setShow(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !password) {
      showToast(t("Please enter both username and password!"), "danger");
      return;
    }

    if (password.length < 3) {
      showToast(t("Password must be at least 6 characters."), "danger");
      return;
    }

    try {
      setLoading(true);
      await dispatch(loginUser({ userName, password })).unwrap();
      navigate("/dashboard");
      showToast(t("Login successful!"), "success");
    } catch {
      showToast(t("Hmm, something's not right. Double-check your username and password."), "danger");
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
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t("enterPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

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
          <RegistrationModel onClose={hideDialog} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
