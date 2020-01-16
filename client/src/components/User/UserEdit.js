import React from 'react'
import UserForm from './UserForm'
// import {graphql} from 'react-apollo'
import {getSingleUser1,updateUser1} from '../allquerys/userquerys'



class UserEdit extends React.Component{
constructor(){
    super()
    this.state={
        getSingleUser:{}
    }
}

componentDidMount=async ()=>{
    const id = Number(this.props.match.params.id)
 await getSingleUser1({id:id},data=>{
    this.setState({getSingleUser:data.data.getSingleUser})
  })
}

submit=(formData)=>{
    const id=Number(this.props.match.params.id)
    updateUser1(id,formData,data=>{
        if(data.data.updateUser){
            this.props.history.push('/user')
        }
    })
 
}


    render(){
        console.log(this.state)
        return (
            <div>
                <h2>Edit User</h2>
               {Object.keys(this.state.getSingleUser).length!=0 && <UserForm props={this.props} getSingleUser={this.state.getSingleUser} submit={this.submit} />}
            </div>
        )
    }
}

export default UserEdit