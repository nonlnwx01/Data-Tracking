import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';

const MedicationData = () => {
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "medications"));
                setMedications(querySnapshot.docs.map(doc => doc.data()));
                console.log("medications pull database success", medications);  // ใช้ productions แทน production
            } catch (error) {
                console.error("medications pull database fail", error);  // พิมพ์ error เมื่อดึงข้อมูลไม่สำเร็จ
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
                            <Nav.Link href="/employee-data">ข้อมูลสมาชิก</Nav.Link>
                            <Nav.Link href="/production-data">ข้อมูลผลผลิต</Nav.Link>    
                            <Navbar.Brand href="/medication-data">ข้อมูลการใช้ยารักษา</Navbar.Brand>
                        </Nav>
                        <Button variant="danger" onClick={() => window.location.href = '/'}>ออกจากระบบ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Content */}
            <Container className="mt-5">
                <h1 className="text-center mb-4">ข้อมูลการใช้ยารักษา</h1>
                <Row>
                    {medications.map((medication, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title><strong> วันที่: {medication.date}</strong></Card.Title>
                                    <Card.Text>
                                        <strong>บ่อเลี้ยง:</strong> {medication.pond} <br />
                                        <strong>รุ่นการเพาะเลี้ยง:</strong> {medication.generation} <br />
                                        <strong>ชื่อยา:</strong> {medication.medicine} <br />
                                        <strong>ปริมาณการใช้:</strong> {medication.dosage}
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

export default MedicationData;
