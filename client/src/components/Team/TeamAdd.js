import React from 'react'
import TeamForm from './TeamForm'
// import {graphql} from 'react-apollo'

import {addTeam1} from '../allquerys/teamquerys'
import ApolloClient from 'apollo-boost'

const client =new ApolloClient({
    uri:'http://localhost:4010/graphql',
    onError: (e) => { console.log('hgh',e) }
  })

class TeamAdd extends React.Component{
constructor(){
    super()
}

componentDidMount=()=>{
    console.log('a',client)
}

submit=async (formData)=>{
    console.log('sds',client)
  await addTeam1(formData)
 
this.props.history.push('/team')

}


    render(){
        return (
            <div>
                <h2>Add Team</h2>
                <TeamForm submit={this.submit} />
            </div>
        )
    }
}

export default TeamAdd