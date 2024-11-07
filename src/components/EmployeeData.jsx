import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';  // ใช้ Firebase ของคุณเอง
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap'; // นำเข้าองค์ประกอบจาก React Bootstrap
import { json } from 'react-router-dom';

const EmployeeData = (props) => {
    const { setIsLogin } = props;
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "employee"));
            setEmployees(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            console.log(querySnapshot);
            console.log("employee pull database success", employees);
        } catch (error) {
            console.error("employee pull database fail", error);
        }
    };
    console.log(employees);

    const formatDateFromISO = (isoString) => {
        const date = new Date(isoString);  // แปลงจาก ISO string เป็น Date object
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    console.log(employees);
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
                            <Nav.Link href="https://48e5-2405-9800-b910-1baf-b8df-c5ac-ecb7-808.ngrok-free.app/ui/#!/0?socketid=2wLVgTVxLL072xiAAAAD" target="_blank">ข้อมูลอุณหภูมิและความชื้น</Nav.Link>
                        </Nav>
                        <Button variant="danger" onClick={() => {
                            setIsLogin(false);
                            localStorage.removeItem('loginState');
                            window.location.href = '/'
                        }}>ออกจากระบบ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Content */}
            <Container className="mt-5">
                <h1 className="text-center mb-4">ข้อมูลบุคคลากร</h1>
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
                                        <strong>เกิดวันที่:</strong> {formatDateFromISO(employee.Birthday)} <br />
                                        <strong>เบอร์มือถือ:</strong> {employee.phone} <br />
                                        <strong>Email:</strong> {employee.email} <br />
                                        <strong>จบการศึกษา:</strong> {employee.education}
                                    </Card.Text>
                                    <Button onClick={() => localStorage.setItem('employee',JSON.stringify(employee))} variant="primary" href='/trainingHistory'>ประวัติการอบรม</Button>
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
