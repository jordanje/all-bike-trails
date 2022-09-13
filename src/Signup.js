import { useState } from "react";
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


function Signup({handleCloseSignup, showSignup}) {
    const [ signUpData, setSignUpData ] = useState({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        password: "" 
    });
    
    function handleFormChange(event){
        setSignUpData({...signUpData, [event.target.name]: event.target.value})
    }

    function handleSubmitForm(event){
        event.preventDefault()
        console.log(signUpData)
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            },
            body: JSON.stringify(signUpData)
        })
        .then(res => res.json())
        .then(user => console.log(user))

        setSignUpData({ 
            firstName: "", 
            lastName: "", 
            email: "", 
            password: "" 
        })
    }

    return (
        <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmitForm} onChange={handleFormChange}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Last name" name="lastName" value={signUpData.lastName} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="First name" name="firstName" value={signUpData.firstName} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={signUpData.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Password" name="password" value={signUpData.password} />
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" onClick={handleCloseSignup}>
                        Sign up
                    </Button>
                    <Button variant="secondary" onClick={handleCloseSignup}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
    )
}

export default Signup;