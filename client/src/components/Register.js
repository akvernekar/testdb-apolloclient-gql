import React from 'react'
import UserForm from './User/UserForm'
import {addUser1} from './allquerys/userquerys' 
import {Link} from 'react-router-dom'


class Register extends React.Component{
constructor(){
    super()
    this.state={
       userName:'',
       email:'',
       mobile:'',
       password:'',
       
    }
}

submit=async (e)=>{
   e.preventDefault()
 await addUser1(this.state,callback=>{
     if(callback.data.addUser){
         this.props.history.push('/login')
     }
 })
 
   
}
handle=(e)=>{
this.setState({
    [e.target.name]:e.target.value
})
}


    render(){
        console.log(this.state)
        return(
            <div>
                <h2>Register</h2>
                <form onSubmit={this.submit}>
           <label>UserName<input type="text" value={this.state.userName} name="userName" onChange={this.handle} required/></label>
           <br/>
           <label>Email<input type="email" value={this.state.email} name="email" onChange={this.handle} required /></label>
           <br/>
           <label>Mobile<input type="text" value={this.state.mobile} name="mobile" minlength='10' maxlength='10' onChange={this.handle} pattern="[0-9]{10}" required/></label>
           <br/>
        <label>Password<input type="text" value={this.state.password} name="password" onChange={this.handle} required/></label>
        <br/>
        <input type='submit'/>
        </form>
        <small className="form-text text-muted"> <p>have an account?<Link to='/'> sign in</Link></p></small>
            </div>
        )
    }
}

export default Register