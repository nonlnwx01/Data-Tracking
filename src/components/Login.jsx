import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';  // นำเข้าองค์ประกอบจาก react-bootstrap
import Alert from 'react-bootstrap/Alert';

const Login = (props) => {
  const { setIsLogin } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();  // ป้องกันหน้ารีเฟรช
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful", userCredential);
      setIsLogin(true);
      localStorage.setItem('loginState', 'true');
      navigate("/employee-data");  // เปลี่ยน path ไปที่หน้าข้อมูลสมาชิก
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);

      console.error("Login failed", error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">Login failed. Please try again.</Alert>}

            <Button variant="primary" type="submit" className="w-100">
              ยืนยันเข้าสู่ระบบ
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
