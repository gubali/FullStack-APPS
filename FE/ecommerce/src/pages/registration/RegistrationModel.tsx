import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL_U } from "../../component/constant/Constant";
import { useToast } from "../../component/toast/ToastProvider";

interface RegistrationModelProps {
  onClose: () => void;
}

const RegistrationModel: React.FC<RegistrationModelProps> = ({ onClose }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Track errors for validation
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validateFields = () => {
    const newErrors: { [key: string]: boolean } = {};

    if (!firstName.trim()) {
      showToast("First name is required.", "danger");
      newErrors.firstName = true;
    }

    if (!lastName.trim()) {
      showToast("Last name is required.", "danger");
      newErrors.lastName = true;
    }

    if (!emailId.trim()) {
      showToast("Email is required.", "danger");
      newErrors.emailId = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) {
      showToast("Please enter a valid email address.", "danger");
      newErrors.emailId = true;
    }

    if (!userName.trim()) {
      showToast("Username is required.", "danger");
      newErrors.userName = true;
    }

    if (!password) {
      showToast("Password is required.", "danger");
      newErrors.password = true;
    } else if (password.length < 6) {
      showToast("Password must be at least 6 characters.", "warning");
      newErrors.password = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFields()) return;

    const newUser = {
      firstName,
      lastName,
      emailId,
      userName,
      password,
      role: "user",
    };

    setLoading(true);

    try {
      await axios.post(BASE_URL_U + "addUser", newUser);
      showToast("User successfully registered!", "success");

      // Reset fields
      setFirstName("");
      setLastName("");
      setEmailId("");
      setUserName("");
      setPassword("");
      setErrors({});
      onClose();

      // Redirect to login after short delay
      setTimeout(() => navigate("/"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showToast(
          error.response?.data?.message || "Error registering user",
          "danger"
        );
      } else {
        showToast("Error registering user", "danger");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                isInvalid={errors.firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: false }));
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                isInvalid={errors.lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: false }));
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={emailId}
            isInvalid={errors.emailId}
            onChange={(e) => {
              setEmailId(e.target.value);
              setErrors((prev) => ({ ...prev, emailId: false }));
            }}
          />
        </Form.Group>

        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            isInvalid={errors.userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setErrors((prev) => ({ ...prev, userName: false }));
            }}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            autoComplete="off"
            value={password}
            isInvalid={errors.password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: false }));
            }}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2 w-100"
          disabled={loading}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrationModel;
