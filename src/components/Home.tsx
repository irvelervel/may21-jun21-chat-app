import { Col, Container, Form, FormControl, Row, ListGroup } from 'react-bootstrap'
import { io } from 'socket.io-client'

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, { transports: ['websocket'] })

const Home = () => {
  return (
    <Container fluid className="px-4">
      <Row className="my-3" style={{ height: '95vh' }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN MESSAGES AREA */}
          {/* TOP SECTION: SUBMIT THE USERNAME */}
          <Form>
            <FormControl placeholder="Insert your nickname" />
          </Form>
          {/* MIDDLE SECTION: ALL THE MESSAGES */}
          <ListGroup>
            <ListGroup.Item>Message</ListGroup.Item>
            <ListGroup.Item>Message</ListGroup.Item>
            <ListGroup.Item>Message</ListGroup.Item>
            <ListGroup.Item>Message</ListGroup.Item>
          </ListGroup>
          {/* BOTTOM SECTION: NEW MESSAGES SENDING */}
          <Form>
            <FormControl placeholder="Write your message here..." />
          </Form>
        </Col>
        <Col md={2} style={{ borderLeft: '2px solid black' }}>
          {/* CONNECTED USERS SECTION */}
          <div className="mb-3">Connected users:</div>
          <ListGroup>
            <ListGroup.Item>User1</ListGroup.Item>
            <ListGroup.Item>User2</ListGroup.Item>
            <ListGroup.Item>User3</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
