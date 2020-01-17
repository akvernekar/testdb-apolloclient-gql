import React from 'react'
import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {Link} from 'react-router-dom'
import {getAllCompanies,removeCompanyMutation} from '../allquerys/companyquerys'
import {client} from '../../App'


// const getAllCompanies=gql`
// {
//     getAllCompanies{
//         id
//         companyName
//         tenantId
//     }
// }
// `
class CompanyList extends React.Component{


removeCompany=(id)=>{
console.log(client,id)
client.mutate({
    mutation:removeCompanyMutation,
    variables:{
        id:id
    },
    refetchQueries:[{query:getAllCompanies}]
})
}

componentDidMount=()=>{
    this.props.data.refetch()
    console.log(client)

}

    render(){
        // console.log('ewre',this.props.data.loading?"loading":(this.props.data.getAllCompanies.find(item=>55==item.id))?<p>akshay</p>:"dfd")
        const usr = JSON.parse(localStorage.getItem('user3'))
        return(
           
            <div>
                <br/>
        {usr.role=="superAdmin" && <Link to='/company/add'><button>Add Company</button></Link> }
                <br/>
                 <br/>
        <table border='1'>
            <thead>
            <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Tenant Name</th>
                {usr.role=="superAdmin" && <th>Action</th>}
            </tr>
            </thead>
            <tbody>
                {this.props.data.loading?"loading":this.props.data.getAllCompanies.map(company=>{
                  return (
                      <tr>
                <td>{company.id}</td>

                <td>{company.companyName}</td>

                <td>{this.props.data.getAllCompanies.find(item=>company.tenantId==item.id)!==undefined ?this.props.data.getAllCompanies.find(item=>company.tenantId==item.id).companyName:""}</td>

               {usr.role=="superAdmin" && <td><button>Edit</button> <button onClick={()=>{this.removeCompany(company.id)}}>remove</button></td>}
                      </tr>
                  )  
                })}
            </tbody>
            </table>        

            </div>
        )
    }
}

export default graphql(getAllCompanies,removeCompanyMutation)(CompanyList)
