import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';  // ใช้ Firebase ของคุณเอง
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap'; // นำเข้าองค์ประกอบจาก React Bootstrap

const EmployeeData = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const querySnapshot = await getDocs(collection(db, "employee"));
                setEmployees(querySnapshot.docs.map(doc => doc.data()));
                console.log("employee pull database success", employees);
            }catch(error){
                console.error("employee pull database fail", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Brand href="/employee-data">ข้อมูลสมาชิก</Navbar.Brand>
                            <Nav.Link href="/production-data">ข้อมูลผลผลิต</Nav.Link>
                            <Nav.Link href="/medication-data">ข้อมูลการใช้ยารักษา</Nav.Link>
                        </Nav>
                        <Button variant="danger" onClick={() => window.location.href = '/'}>ออกจากระบบ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Content */}
            <Container className="mt-5">
                <h1 className="text-center mb-4">ข้อมูลสมาชิก</h1>
                <Row>
                    {employees.map((employee, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={employee.photo} alt={employee.name} />
                                <Card.Body>
                                    <Card.Title><strong>ชื่อ: {employee.name}</strong></Card.Title>
                                    <Card.Text>
                                        <strong>อายุ:</strong> {employee.age} <br />
                                        <strong>เลขบัตรประชาชน:</strong> {employee.CitizenID} <br />
                                        <strong>เกิดวันที่:</strong> {employee.Birthday} <br />
                                        <strong>เบอร์มือถือ:</strong> {employee.phone} <br />
                                        <strong>Email:</strong> {employee.email} <br />
                                        <strong>จบการศึกษา:</strong> {employee.education}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default EmployeeData;
