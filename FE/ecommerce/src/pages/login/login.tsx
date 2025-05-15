import { Form, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from '../../redux/AuthSlice';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistrationModel from "../registration/RegistrationModel";

const Login = () => {
    const { t } = useTranslation();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showDialog = () => setShow(true);
    const hideDialog = () => setShow(false);

    const handleSubmit = () => {
        if (!userName || !password) {
            setError("Please enter both username and password!");
            return;
        }

        const user = { userName, role: 'user' };
        dispatch(login(user));
        navigate('/dashboard');
    };

    return (
        <>
            <div className="login-wrapper">
                <Form className="login-form">
                    <h3 className="text-center">{t('ecommerce', 'tulipCart')} {t('tulipCart')}</h3>

                    <Form.Group controlId="username">
                        <Form.Label>{t('Username')}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={t('Enter your username')}
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>{t('Password')}</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder={t('Enter your password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Button className="w-100 mt-3" variant="primary" onClick={handleSubmit}>
                        {t('Login')}
                    </Button>

                    <Button variant="success" className="mt-2 w-100 text-center" style={{marginTop:"5px"}} onClick={showDialog}>
                        {t('register')}
                    </Button>
                </Form>
            </div>

            <Modal show={show} onHide={hideDialog} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Register New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegistrationModel />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;
