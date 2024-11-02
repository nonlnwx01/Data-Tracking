import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const ProductionData = (props) => {
    const { setIsLogin } = props;
    const [productions, setProductions] = useState([]);
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productions"));
                setProductions(querySnapshot.docs.map(doc => doc.data()));
                setTransactions(querySnapshot.docs.map(doc => doc.data()));
                console.log("productions pull database success", productions);  // ใช้ productions แทน production
            } catch (error) {
                console.error("productions pull database fail", error);  // พิมพ์ error เมื่อดึงข้อมูลไม่สำเร็จ
            }
        };
        fetchData();
    }, []);

    // 
    const handleChange = (DatePicker) => {
        console.log(productions);
        if (DatePicker?.length === 2) {
            console.log(DatePicker)
            ก
            const filterDate = productions.filter(production => {
                return production.date >= DatePicker[0].format('YYYY-MM-DD') && production.date <= DatePicker[1].format('YYYY-MM-DD')
            })
            setTransactions(filterDate)
        }
        console.log(DatePicker);
        if (DatePicker === null) {
            setTransactions(productions)
        }
    }


    const formatDateFromISO = (isoString) => {
        const date = new Date(isoString);  // แปลงจาก ISO string เป็น Date object
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };


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
                <h1 className="text-center mb-4">ข้อมูลผลผลิต</h1>

                <RangePicker
                    defaultValue={[dayjs(), dayjs()]}
                    format={dateFormat}
                    onChange={handleChange}
                    style={{ display: 'flex', width: '50%', marginBottom: 10 }}
                />
                <Row>
                    {transactions.map((production, index) => (
                        <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title><strong> วันที่เก็บเกี่ยว: {formatDateFromISO(production.date)}</strong></Card.Title>
                                    <Card.Text>
                                        <strong>บ่อเลี้ยง:</strong> {production.pond} <br />
                                        <strong>รุ่นการเพาะเลี้ยง:</strong> {production.generation} <br />
                                        <strong>สายพันธุ์:</strong> {production.species} <br />
                                        <strong>อาหาร:</strong> {production.food} <br />
                                        <strong>อัตราการตาย:</strong> {production.mortalityRate} <br />
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
