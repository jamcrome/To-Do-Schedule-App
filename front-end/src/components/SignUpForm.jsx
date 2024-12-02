import Form from "react-bootstrap/Form";
import { userRegistration } from "../utilities";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";


function SignUpForm() {

  // const { setUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  // const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      email: email,
      display_name: display_name,
      password: password,
      // registered: True
    };
    setUser(await userRegistration(formData))
  }

  return (
    <>
      <Form onSubmit={(e)=> handleSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDisplayName">
        <Form.Label>Display Name</Form.Label>
        <Form.Control
          value={display_name}
          onChange={(e) => setDisplayName(e.target.value)}
          type="name"
          placeholder="Display Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      </Form>
    </>
  )

}

export default SignUpForm