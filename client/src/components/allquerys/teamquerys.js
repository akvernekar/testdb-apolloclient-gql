import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {client} from '../../App'

const getAllTeams=gql`
{
    getAllTeams{
        id
        teamName
        companyId
        tenantId
        departmentId
    }
}
`

export const getAllTeams1=(callback)=>{
    // alert("get")
    client.query({
        query:getAllTeams
    })
    .then(res=>{
        callback(res)
    })
}

const addTeam=gql`
mutation($teamName:String!,$tenantId:Int!,$companyId:Int!,$departmentId:Int!){
    addTeam(teamName:$teamName,tenantId:$tenantId,companyId:$companyId,departmentId:$departmentId){
        id
        teamName
        companyId
        tenantId
        departmentId
    }
}
`;

export const addTeam1=(formData)=>{
    client.mutate({
        mutation:addTeam,
        variables:formData
    }).then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })
}

const removeTeam=gql`
mutation($id:Int!){
    removeTeam(id:$id){
        teamName
        id
    }
}
`;

export const removeTeam1=(id,callback)=>{
    client.mutate({
        mutation:removeTeam,
        variables:{id:id},
    }).then(res=>{
        // alert("res=="+JSON.stringify(res.data.removeTeam))
        callback(res.data.removeTeam)
    }
        )
    
}