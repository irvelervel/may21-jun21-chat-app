import { Col, Container, Form, FormControl, Row, ListGroup } from 'react-bootstrap'
import { useEffect, useState, FormEvent } from 'react'
import { io } from 'socket.io-client'

// 1) I'M REFRESHING THE BROWSER, THE SOCKET.IO CONNECTION GETS ESTABLISHED
// 2) THE BACKEND GREETS ME AND SENDS ME A CONNECT EVENT
// 3) NOW THE CLIENT IS ABLE TO SEND A USERNAME
// 4) IF THE BACKEND LISTENS CORRECTLY FOR MY USERNAME AND ACCEPTS IT,
// IT WILL SEND BACK TO THE CLIENT A 'LOGGEDIN' EVENT, WHICH THE CLIENT CAN LISTEN TO
// 5) AND NOW I'M ABLE TO SEND MESSAGES

const ADDRESS = 'http://localhost:3030'
const socket = io(ADDRESS, { transports: ['websocket'] })

const Home = () => {
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // we're now going to set up some event listeners, just once
    // for the entire lifetime of this chat application

    // the first one will be for acknowledging the successfull connection with the backend
    socket.on('connect', () => {
      console.log('Connection established!')
      console.log(socket.id)
    })

    socket.on('loggedin', () => {
      console.log("Now I'm logged in!")
      setLoggedIn(!loggedIn)
    })
  }, [])

  const handleUsernameSubmit = (e: FormEvent) => {
    e.preventDefault()
    socket.emit('setUsername', { username })
  }

  return (
    <Container fluid className="px-4">
      <Row className="my-3" style={{ height: '95vh' }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN MESSAGES AREA */}
          {/* TOP SECTION: SUBMIT THE USERNAME */}
          <Form onSubmit={handleUsernameSubmit}>
            <FormControl
              placeholder="Insert your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loggedIn}
            />
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
            <FormControl placeholder="Write your message here..." disabled={!loggedIn} />
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
