import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';

const ProductionData = () => {
    const [productions, setProductions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productions"));
                setProductions(querySnapshot.docs.map(doc => doc.data()));
                console.log("productions pull database success", productions);  // ใช้ productions แทน production
            } catch (error) {
                console.error("productions pull database fail", error);  // พิมพ์ error เมื่อดึงข้อมูลไม่สำเร็จ
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
                            <Navbar.Brand href="/production-data">ข้อมูลผลผลิต</Navbar.Brand>    
                            <Nav.Link href="/medication-data">ข้อมูลการใช้ยารักษา</Nav.Link>
                        </Nav>
                        <Button variant="danger" onClick={() => window.location.href = '/'}>ออกจากระบบ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* Content */}
            <Container className="mt-5">
                <h1 className="text-center mb-4">ข้อมูลผลผลิต</h1>
                <Row>
                    {productions.map((production, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title><strong> วันที่เก็บเกี่ยว: {production.date}</strong></Card.Title>
                                    <Card.Text>
                                        <strong>บ่อเลี้ยง:</strong> {production.pond} <br />
                                        <strong>รุ่นการเพาะเลี้ยง:</strong> {production.generation} <br />
                                        <strong>สายพันธุ์:</strong> {production.species} <br />
                                        <strong>อาหาร:</strong> {production.food} <br/>
                                        <strong>อัตราการตาย:</strong> {production.mortalityRate} <br/>
                                        <strong>จำนวนผลผลิตที่ได้ต่อรุ่น:</strong> {production.yield}
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

export default ProductionData;
