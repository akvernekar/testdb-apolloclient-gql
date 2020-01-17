import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {client} from '../../App'
import {getAllUsers1,removeUser1} from '../allquerys/userquerys'
import {getAllTeams1} from '../allquerys/teamquerys'
import {getAllDepartments1} from '../allquerys/departmentquerys'
import {getAllCompanies1} from '../allquerys/companyquerys'
import {Link} from 'react-router-dom'


class UserList extends React.Component{
constructor(props){
    super(props)
    this.state= {
        getAllDepartments:[],
        getAllCompanies:[],
        getAllTeams:[],
        getAllUsers:[]
    }
}

componentDidMount= async ()=>{
    console.log("cdm")
   await getAllDepartments1(data=>{
        this.setState({getAllDepartments:data.data.getAllDepartments})
    })
   await getAllCompanies1(data=>{
        this.setState({getAllCompanies:data.data.getAllCompanies})
    })
    await getAllTeams1(data=>{
        this.setState({getAllTeams:data.data.getAllTeams})
    })
    await getAllUsers1(data=>{
            this.setState({getAllUsers:data.data.getAllUsers})
            
        })
    
}

// componentWillUnmount=()=>{
//     this.state.getAllUsers=[]
// }


remove=(id)=>{
removeUser1(id)

}



    render(){
      console.log('z',this.props)
        console.log("render")
        console.log(this.state)
        // const companyData= this.props.data.loading && this.state.getAllCompanies
        // console.log('d',companyData)
        const usr = JSON.parse(localStorage.getItem('user3'))
        // console.log(this.props.data.loading?"loading":this.props.data.getAllDepartments)
        return(
            <div>
                <br/>
               {(usr.role=="superAdmin" || usr.role=="admin") && <Link to='/user/add'><button>Add User</button></Link>}
                <br/>
                <br/>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Team Name</th>
                            <th>Department Name</th>
                            <th>Company Name</th>
                            <th>Tenant Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading?"loading":this.state.getAllUsers.map(user=>{
                            return(
                                <tr>
                        <td>{user.id}</td>
                            <td>{user.userName}</td>
                        <td>{user.email}</td>
                            <td>{user.mobile}</td>
                        {/* <td>{this.state.companyData.find(item=>item.id==department.companyId)!=undefined?this.state.companyData.find(item=>item.id==department.companyId).companyName:""}</td> */}
                        <td>{this.state.getAllTeams.length && this.state.getAllTeams.find(item=>item.id==user.teamId)!==undefined &&  this.state.getAllTeams.find(item=>item.id==user.teamId).teamName}</td>

                        <td>{this.state.getAllDepartments.length && this.state.getAllDepartments.find(item=>item.id==user.departmentId)!==undefined && this.state.getAllDepartments.find(item=>item.id==user.departmentId).departmentName}</td>

                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==user.companyId)!==undefined && this.state.getAllCompanies.find(item=>item.id==user.companyId).companyName}</td>

                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==user.tenantId)!==undefined && this.state.getAllCompanies.find(item=>item.id==user.tenantId).companyName}</td>
                            <td>{user.role}</td>
                            {(usr.role=="superAdmin" ||(usr.role=='admin' &&usr.companyId==user.companyId &&usr.role=='superAdmin' )  || usr.id==user.id )&& <td><Link to={`/user/edit/${user.id}`}><button>Edit</button></Link>{(usr.role=="superAdmin" ||usr.role=="admin" )&& <button onClick={()=>{this.remove(user.id)}}>Remove</button>}</td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default UserList


