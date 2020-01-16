import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {client} from '../../App'
import {getAllTeams1, removeTeam1} from '../allquerys/teamquerys'
import {getAllDepartments1} from '../allquerys/departmentquerys'
import {getAllCompanies1} from '../allquerys/companyquerys'
import {Link} from 'react-router-dom'


class TeamList extends React.Component{
constructor(props){
    super(props)
    this.state= {
        getAllDepartments:[],
        getAllCompanies:[],
        getAllTeams:[]
    }
}
componentDidMount= async ()=>{
this.refreshFun();
}

refreshFun= async()=>{
    await getAllDepartments1(data=>{
        this.setState({getAllDepartments:data.data.getAllDepartments})
    })
   await getAllCompanies1(data=>{
        this.setState({getAllCompanies:data.data.getAllCompanies})
    })
     getAllTeams1(async data=>{
        await this.setState({getAllTeams:data.data.getAllTeams})
    })
}

remove=async (id)=>{
var data1 = await removeTeam1(id,data=>{
  
})
getAllTeams1(async data=>{
    // alert(JSON.stringify(data.data.getAllTeams))
    await this.setState({getAllTeams:data.data.getAllTeams})
})
// this.refreshFun()
// alert("hi2")
}

    render(){
        console.log(this.state)
        // const companyData= this.props.data.loading && this.state.getAllCompanies
        // console.log('d',companyData)
        const usr = JSON.parse(localStorage.getItem('user3'))
        // console.log(this.props.data.loading?"loading":this.props.data.getAllDepartments)
        return(
            <div>
                <br/>
                {(usr.role=="superAdmin" || usr.role=="admin") && <Link to='/team/add'><button>Add Team</button></Link>}
                <br/>
                <br/>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Team Name</th>
                            <th>Department Name</th>
                            <th>Company Name</th>
                            <th>Tenant Name</th>
                            {(usr.role=="superAdmin" || usr.role=="admin")&& <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading?"loading":this.state.getAllTeams.map(team=>{
                            return(
                                <tr>
                        <td>{team.id}</td>
                            <td>{team.teamName}</td>
                        {/* <td>{this.state.companyData.find(item=>item.id==department.companyId)!=undefined?this.state.companyData.find(item=>item.id==department.companyId).companyName:""}</td> */}
                        <td>{this.state.getAllDepartments.length && this.state.getAllDepartments.find(item=>item.id==team.departmentId)!=undefined && this.state.getAllDepartments.find(item=>item.id==team.departmentId).departmentName}</td>

                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==team.companyId)!=undefined && this.state.getAllCompanies.find(item=>item.id==team.companyId).companyName}</td>
                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==team.tenantId)!=undefined && this.state.getAllCompanies.find(item=>item.id==team.tenantId).companyName}</td>
                            {(usr.role=="superAdmin" || (usr.role=="admin" && team.companyId==usr.companyId)) &&  <td><button>Edit</button> <button onClick={()=>{this.remove(team.id)}}>Remove</button></td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default TeamList


