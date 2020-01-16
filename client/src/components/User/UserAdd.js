import React from 'react'
import UserForm from './UserForm'
// import {graphql} from 'react-apollo'

import {addUser1} from '../allquerys/userquerys'
import ApolloClient from 'apollo-boost'

const client =new ApolloClient({
    uri:'http://localhost:4010/graphql',
    onError: (e) => { console.log('hgh',e) }
  })

class UserAdd extends React.Component{
constructor(){
    super()
}

componentDidMount=()=>{
    console.log('a',client)
}

submit=(formData)=>{
    console.log('sds',client)
  addUser1(formData,data=>{
      console.log(data.data.addUser)
      if(data.data.addUser){
        this.props.history.push('/user')
      }
  })
 


}


    render(){
        return (
            <div>
                <h2>Add User</h2>
                <UserForm props={this.props} submit={this.submit} />
            </div>
        )
    }
}

export default UserAdd