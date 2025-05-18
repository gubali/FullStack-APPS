import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL_U } from "../../component/constant/Constant";

const RegistrationModel = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //const [showModal, setShowModal] = useState(false); // Controls modal visibility

  // Fetching users (if necessary for later use)
  const fetchUsers = () => {
    axios
      .get(BASE_URL_U + "addUser")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form submission logic
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      emailId,
      userName,
      password,
      role,
    };

    axios
      .post(BASE_URL_U + "addUser", newUser)
      .then(() => {
        setSuccessMessage("User successfully registered!");
        setFirstName("");
        setLastName("");
        setEmailId("");
        setUserName("");
        setPassword("");
        setRole("");
        fetchUsers();
      })
      .catch((error) => {
        setError(error.message || "Error registering user");
      });
  };

  return (
    <Container className="mt-5">
      {/* Success and error messages */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Form inside Modal */}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6} sm={12} className="mb-3">
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6} sm={12} className="mb-3">
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUserName" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </Form.Control>
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3 w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrationModel;
