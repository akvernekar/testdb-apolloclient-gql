import React from 'react'
import {graphql} from 'react-apollo'
import {getAllDepartments1} from '../allquerys/departmentquerys'
import {getAllCompanies1} from '../allquerys/companyquerys'
import {getAllTeams1} from '../allquerys/teamquerys'

import client from '../../App'

class TeamForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            getAllCompanies:[],
            getAllDepartments:[],
            getAllTeams:[],
            teamName:'',
            departmentId:null,
            companyId:null,
            tenantId:null
        }
    }



    submit=(e)=>{
        e.preventDefault()
        const formData={
            teamName:this.state.teamName,
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
               
                <form onSubmit={this.submit}>
            <label>Team Name<input onChange={this.handle} type='text' name="teamName" list="teamName" />
            <datalist id="teamName">{this.state.getAllTeams.map(team=>{
                return(
                    <option value={team.teamName}>{team.teamName}</option>
                )
            })}</datalist></label>
           <br/>
           <label>Department Name<select name="departmentId" onChange={this.handle}><option value="" >select department</option>
            {
           this.state.getAllDepartments.map(department=>{
                return(
                    <option value={department.id}>{department.departmentName}</option>
                )
            })}</select></label>

            <br/>
        
        <label>Company Name<select name="companyId" onChange={this.handle}><option value="" >select company</option>
            {
           this.state.getAllCompanies.map(company=>{
                return(
                    <option value={company.id}>{company.companyName}</option>
                )
            })}</select></label>
            <br/>
            <label>Tenant Name<select name="tenantId" onChange={this.handle}><option value="" >select company</option>
            {
           this.state.getAllCompanies.map(company=>{
                return(
                    <option value={company.id}>{company.companyName}</option>
                )
            })}</select></label>

            <br/>

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

export default TeamForm
