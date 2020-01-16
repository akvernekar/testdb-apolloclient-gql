import React from 'react'
import {graphql} from 'react-apollo'
import {getAllDepartments1} from '../allquerys/departmentquerys'
import {getAllCompanies1} from '../allquerys/companyquerys'
import {getAllTeams1} from '../allquerys/teamquerys'

import client from '../../App'

class UserForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            getAllCompanies:[],
            getAllDepartments:[],
            getAllTeams:[],
            getAllUsers:[],
            userName:props.getSingleUser ? props.getSingleUser.userName :'',
            email:props.getSingleUser ? props.getSingleUser.email :'',
            mobile:props.getSingleUser ? props.getSingleUser.mobile :'',
            password:props.getSingleUser ? props.getSingleUser.password :'',
            role:props.getSingleUser ? props.getSingleUser.role :'user',
            teamId:props.getSingleUser ? props.getSingleUser.teamId :null,
            departmentId:props.getSingleUser ? props.getSingleUser.departmentId :null,
            companyId:props.getSingleUser ? props.getSingleUser.companyId :null,
            tenantId:props.getSingleUser ? props.getSingleUser.tenantId :null
        }
    }



    submit=(e)=>{
        e.preventDefault()
       
        const formData={
          
            userName:this.state.userName,
            email:this.state.email,
            mobile:this.state.mobile,
            role:this.state.role,
            password:this.state.password,
            teamId:Number(this.state.teamId),
            departmentId:Number(this.state.departmentId),
            companyId:Number(this.state.companyId),
            tenantId:Number(this.state.tenantId)
        }
        
        console.log(formData)
        this.props.submit(formData)
        
    }

    componentDidMount= async ()=>{
        await getAllDepartments1(data=>{
             this.setState({getAllDepartments:data.data.getAllDepartments})
         })
        await getAllCompanies1(data=>{
             this.setState({getAllCompanies:data.data.getAllCompanies})
         })
         await getAllTeams1(data=>{
             this.setState({getAllTeams:data.data.getAllTeams})
         })
        //  await getAllUsers1(data=>{
        //      this.setState({getAllUsers:data.data.getAllUsers})
        //  })
     
    }

    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        // console.log(this.props.getSingleUser.userName)
        // console.log('hello',this.props.props.match.url)
        const usr = JSON.parse(localStorage.getItem('user3'))
        return(
            <div>
               
                <form onSubmit={this.submit}>
                    <label>User Name <input type="text" value={this.state.userName} name="userName" onChange={this.handle} required/> </label>
                    <br/>
                    <label>Email <input type="email" value={this.state.email} name="email" onChange={this.handle} required/> </label> 
                    <br/>
                    <label>Mobile <input type="text" value={this.state.mobile} name="mobile" onChange={this.handle} required/></label> 
                    <br/>
        {this.props.props.match.url!='/user/add'&& this.props.props.match.params.id==usr.id &&<label>Password <input type="text" value={this.state.password} name="password" onChange={this.handle} required/></label> }
        {this.props.props.match.url!='/user/add' && this.props.props.match.params.id==usr.id &&<br/> }
                    {(usr.role=='superAdmin' || usr.role=='admin' ) &&<>Role -<input type="radio" value="user" name="role" onChange={this.handle} checked={this.state.role=='user' }/> User
                    <input type="radio" value="admin" name="role" onChange={this.handle} checked={this.state.role=='admin' }/> Admin
                    <input type="radio" value="superAdmin" name="role" onChange={this.handle} checked={this.state.role=='superAdmin' }/> Super Admin</>}
                    <br/>
                   {(usr.role=='superAdmin' || usr.role=='admin' ) && <label>Team Name<select name="teamId" onChange={this.handle} required><option value="" >select Team</option>
            {
           this.state.getAllTeams.map(team=>{
                return(
                    <option value={team.id} selected={this.state.teamId==team.id}>{team.teamName}</option>
                )
            })}</select> <br/></label>}




            {/* <label>Team Name<input onChange={this.handle} type='text' name="teamName" list="teamName" />
            <datalist id="teamName">{this.state.getAllTeams.map(team=>{
                return(
                    <option value={team.teamName}>{team.teamName}</option>
                )
            })}</datalist></label> */}
          
           {(usr.role=='superAdmin' || usr.role=='admin' ) && <label>Department Name<select name="departmentId" onChange={this.handle} required><option value="" >select department</option>
            {
           this.state.getAllDepartments.map(department=>{
                return(
                    <option value={department.id} selected={this.state.departmentId==department.id}>{department.departmentName}</option>
                )
            })}</select> <br/></label>}

           
        
        {(usr.role=='superAdmin' || usr.role=='admin' ) && <label>Company Name<select name="companyId" onChange={this.handle} required><option value="" >select company</option>
            {
           this.state.getAllCompanies.map(company=>{
                return(
                    <option value={company.id} selected={this.state.companyId==company.id}>{company.companyName}</option>
                )
            })}</select><br/></label>}
            
           {(usr.role=='superAdmin' || usr.role=='admin' ) && <label>Tenant Name<select name="tenantId" onChange={this.handle} required><option value="" >select company</option>
            {
           this.state.getAllCompanies.map(company=>{
                return(
                    <option value={company.id} selected={this.state.tenantId==company.id}>{company.companyName}</option>
                )
            })}</select><br/></label>}

            

            <input type='submit'/>
            </form>
            {/* <input type="text" name="product" list="productName"/> */}


{/* <datalist id="productName">
    <option value="Pen">Pen</option>
    <option value="Pencil">Pencil</option>
    <option value="Paper">Paper</option>
</datalist> */}

            </div>
        )
    }
}

export default UserForm
