import React from 'react'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';



export default function pages401() {
  const [status, setStatus] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setStatus(true);
    }, 1000);
  })
  if (!status) {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <br />
        <Container>
          <Row>
            <Col xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Image src="https://www.elegantthemes.com/blog/wp-content/uploads/2019/12/401-error-wordpress-featured-image.jpg" rounded />
            </Col>
            <Col xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
              <Button variant="dark" onClick={() => {
                localStorage.removeItem('loginState');
                window.location.href = '/';
              }}>กลับไปหน้าหลัก </Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
