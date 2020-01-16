import React from 'react'
import CompanyForm from './CompanyForm'
import {graphql} from 'react-apollo'
import {addCompanyMutation,getAllCompanies} from '../allquerys/companyquerys'
import ApolloClient from 'apollo-boost'

const client =new ApolloClient({
    uri:'http://localhost:4010/graphql',
    onError: (e) => { console.log('hgh',e) }
  })

class CompanyAdd extends React.Component{
constructor(){
    super()
}

componentDidMount=()=>{
    console.log('a',client)
}

submit=(formData)=>{
    console.log('sds',client)
 client.mutate({
     mutation:addCompanyMutation,
     variables:formData,
 }
 
 )
this.props.history.push('/company')

}


    render(){
        return (
            <div>
                <h2>Add Company</h2>
                <CompanyForm submit={this.submit} />
            </div>
        )
    }
}

export default graphql(addCompanyMutation,getAllCompanies)(CompanyAdd)