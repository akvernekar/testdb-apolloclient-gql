import React from 'react'
import {Link} from 'react-router-dom'
import {getSingleUser1} from './allquerys/userquerys'
 

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
    

    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit= async (e)=>{
        e.preventDefault()
        const formData={email:this.state.email}
       await getSingleUser1(formData,data=>{
           if(data.data.getSingleUser){
               localStorage.setItem('user3',JSON.stringify(data.data.getSingleUser))
               window.location.href='/home'
           }else{
               alert('invalid email/ password')
           }
        })
        
        
    }

    render(){
        return (<div>
            <br/>
            
                <h2>Login</h2>
                <form onSubmit={this.submit}>
                 <div className="form-group">
                <label>Email<input className="form-control" type='email' value={this.state.email} name='email' onChange={this.handle} required/></label>
                <br/>
                <label>Password<input className="form-control" type='password' value={this.state.password} onChange={this.handle} name='password' required/></label>
                <br/>
                <button type='submit' className="btn btn-primary">Login</button>
                </div>
                </form>
                <small className="form-text text-muted"><p>Not register? <Link to='/register'> signup</Link></p></small>
            </div>
           )
    }
}

export default Login