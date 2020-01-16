import React from 'react'
import DepartmentForm from './DepartmentForm'
// import {graphql} from 'react-apollo'

import {addDepartment1} from '../allquerys/departmentquerys'
import ApolloClient from 'apollo-boost'

const client =new ApolloClient({
    uri:'http://localhost:4010/graphql',
    onError: (e) => { console.log('hgh',e) }
  })

class DepartmentAdd extends React.Component{
constructor(){
    super()
}

componentDidMount=()=>{
    console.log('a',client)
}

submit=(formData)=>{
    console.log('sds',client)
  addDepartment1(formData)
 
this.props.history.push('/department')

}


    render(){
        return (
            <div>
                <h2>Add Department</h2>
                <DepartmentForm submit={this.submit} />
            </div>
        )
    }
}

export default DepartmentAdd