import React,{useState,useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import {useFirebase} from '../context/Firebase.jsx';
import {useNavigate } from 'react-router-dom'

function Register() {

    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
      console.log(firebase);
      
        useEffect(()=>{
          
          if(firebase.isLoggedIn){
            // setUser(firebase.user)
            Navigate ('/');
          }
          
        },[firebase,Navigate])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await firebase.signupUserWithEmailAndPassword(email, password)
    }

  return (
    <div className="min-h-screen py-8">
      <div className="container-center">
        <div className="form-card">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
            <p className="text-slate-600">Join Bookify and start exploring books</p>
          </div>
          
          <Form className="space-y-4">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="text-slate-700 font-medium mb-2">Email address</Form.Label>
              <Form.Control 
                onChange={e=> setEmail(e.target.value)} 
                value={email} 
                type="email" 
                placeholder="Enter email" 
                className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <Form.Text className="text-slate-500 text-sm">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-slate-700 font-medium mb-2">Password</Form.Label>
              <Form.Control 
                onChange={e=> setPassword(e.target.value)} 
                value={password} 
                type="password" 
                placeholder="Password" 
                className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </Form.Group>
            
            <div className="pt-4">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary w-full">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
