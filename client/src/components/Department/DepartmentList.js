import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {client} from '../../App'
import {getAllDepartments1} from '../allquerys/departmentquerys'
import {getAllCompanies1} from '../allquerys/companyquerys'
import {Link} from 'react-router-dom'


class DepartmentList extends React.Component{
constructor(props){
    super(props)
    this.state= {
        getAllDepartments:[],
        getAllCompanies:[]
    }
}
componentDidMount= async ()=>{
   await getAllDepartments1(data=>{
        this.setState({getAllDepartments:data.data.getAllDepartments})
    })
   await getAllCompanies1(data=>{
        this.setState({getAllCompanies:data.data.getAllCompanies})
    })
    
    
}


    render(){
        console.log(this.state)
        // const companyData= this.props.data.loading && this.state.getAllCompanies
        // console.log('d',companyData)

        // console.log(this.props.data.loading?"loading":this.props.data.getAllDepartments)
        const usr = JSON.parse(localStorage.getItem('user3'))
        return(
            <div>
                <br/>
                {(usr.role=="superAdmin" || usr.role=="admin")  &&<Link to='/department/add'><button>Add department</button></Link>}
                <br/>
                <br/>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Department Name</th>
                            <th>Company Name</th>
                            <th>Tenant Name</th>
                            {(usr.role=="superAdmin" || usr.role=="admin") && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading?"loading":this.state.getAllDepartments.map(department=>{
                            return(
                                <tr>
                        <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                        {/* <td>{this.state.companyData.find(item=>item.id==department.companyId)!=undefined?this.state.companyData.find(item=>item.id==department.companyId).companyName:""}</td> */}
                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==department.companyId).companyName}</td>
                            <td>{this.state.getAllCompanies.length && this.state.getAllCompanies.find(item=>item.id==department.tenantId).companyName}</td>
                            {(usr.role=="superAdmin" || usr.role=="admin" && (usr.companyId==department.companyId)) && <td><button>Edit</button> <button>Remove</button></td>}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default DepartmentList

