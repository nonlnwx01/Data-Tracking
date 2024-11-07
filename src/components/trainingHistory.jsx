import React from 'react'
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Row, Button } from 'react-bootstrap';
import { Input, Modal, Table } from 'antd';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components'
import { DatePicker as AntDatePicker } from 'antd'
import dayjs from 'dayjs';


export default function trainingHistory() {
    const [employee, setEmployee] = useState({ training: [] });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dateValue, setDateValue] = useState(null);
    const [title, setTitle] = useState('');
    const [hourusge, setHourusge] = useState('');
    const [creater, setCreater] = useState('');
   




    useEffect(() => {
        const employeeData = localStorage.getItem('employee');
        if (employeeData) {
            setEmployee(JSON.parse(employeeData));
        }
    }, []);
    const handleOK = async () => {
        const newTraining = {
            date: dateValue ? dayjs(dateValue).format("YYYY-MM-DD") : null,  // แปลง Moment เป็น Timestamp
            title: title,
            hourusge: hourusge,
            creater: creater
        };

        if (employee) {
            // อัปเดตข้อมูลใน localStorage
            const updatedEmployee = { ...employee, training: [...(employee.training || []), newTraining] };
            localStorage.setItem('employee', JSON.stringify(updatedEmployee));
            setEmployee(updatedEmployee);

            try {
                const employeeDocRef = doc(db, "employee", employee.id);  // เปลี่ยนมาใช้ doc()
                await updateDoc(employeeDocRef, {
                    training: arrayUnion(newTraining)  // ใช้ arrayUnion สำหรับอัปเดต array
                });
                setShow(false); // ปิด Modal หลังจากบันทึกข้อมูลสำเร็จ
            } catch (error) {
                console.error("Failed to add training", error);
            }
        }
    };
    const columns = [
        {
            title: 'วันที่อบรม',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'หัวข้ออบรม',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'เวลาที่ใช้ในการอบรม',
            dataIndex: 'hourusge',
            key: 'hourusge',
        },
        {
            title: 'ผู้จัดการอบรม',
            dataIndex: 'creater',
            key: 'creater',
        },
    ];
    console.log(employee?.training);



    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/employee-data">ข้อมูลสมาชิก</Nav.Link>
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
            <Container className="mt-5">
                <h1 className="text-center mb-4"><a style={{ marginRight: '10px' }}>ประวัติการอบรมของ</a>{employee?.name}</h1>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="primary" onClick={handleShow}>เพิ่มประวัติการอบรม
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={Array.isArray(employee?.training) ? employee.training.map((item, index) => ({
                        ...item,
                        key: item.date || index, // ใช้ date เป็น key ถ้ามี หรือใช้ index
                    })) : []}
                    rowKey="key"
                />


                {/* <Table columns={columns} dataSource={employee?.training} /> */}
            </Container>
            <Modal title="Basic Modal" open={show} onOk={handleOK} onCancel={handleClose}>
                วันที่อบรม<br />
                <DatePicker style={{ zIndex: 10000 }} onChange={(value) => setDateValue(value)} /><br />
                หัวข้ออบรม
                <Input onChange={(e) => setTitle(e.target.value)} placeholder="การเพาะเลี้ยงจิ้งหรีด" />
                เวลาที่ใช้ในการอบรม
                <Input onChange={(e) => setHourusge(e.target.value)} placeholder="4ชั่วโมง30นาที" />
                ผู้จัดการอบรม
                <Input onChange={(e) => setCreater(e.target.value)} placeholder="กระทรวงเกษตรและสหกรณ์" />

            </Modal>

        </div>
    )
}
const DatePicker = styled(AntDatePicker)`.ant-picker-dropdown{
z-index: 1056;
}`