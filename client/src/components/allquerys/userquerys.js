import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {client} from '../../App'


const getAllUsers=gql`
{
    getAllUsers{
        userName
        email
        password
        id
        mobile
        tenantId
        companyId
        departmentId
        teamId
        role
    }
}
`;

export const getAllUsers1=(callback)=>{
    client.query({
        query:getAllUsers
    })
    .then(res=>{
        callback(res)
    })
}

const addUser=gql`
mutation($userName:String!,$email:String!,$mobile:String!,$password:String!,$role:String,$tenantId:Int,$companyId:Int,$departmentId:Int,$teamId:Int){
addUser(userName:$userName,email:$email,mobile:$mobile,password:$password,role:$role,tenantId:$tenantId,
    companyId:$companyId,departmentId:$departmentId,teamId:$teamId){
userName
email
role
mobile
}
}
`;

export const addUser1=(formData,callback)=>{
    client.mutate({
        mutation:addUser,
        variables:formData
    })
    .then(res=>{
      callback(res)
    })
    .catch(err=>{
        callback(err)
    })
}


const getSingleUser=gql`
    query($id:Int,$email:String){
        getSingleUser(id:$id,email:$email){
            userName
            email
            role
            mobile
            tenantId
            companyId
            departmentId
            teamId
            id
        }
    }
`;

export const getSingleUser1=(formData,callback)=>{
    client.query({
        query:getSingleUser,
        variables:formData
    })
    .then(res=>{
       callback(res)
    })
    
}

const removeUser=gql`
    mutation($id:Int){
        removeUser(id:$id){
            userName
        }
    }
`;

export const removeUser1=(id)=>{
    client.mutate({
        mutation:removeUser,
        variables:{id}
    })
}

const updateUser=gql`
mutation($id:Int!,$userName:String!,$email:String!,$mobile:String!,$password:String,$role:String,$tenantId:Int,$companyId:Int,$departmentId:Int,$teamId:Int){
    updateUser(id:$id,userName:$userName,email:$email,mobile:$mobile,password:$password,role:$role,tenantId:$tenantId,
        companyId:$companyId,departmentId:$departmentId,teamId:$teamId){
userName
email
mobile
password
role
tenantId
companyId
departmentId
teamId
}
}
`;

export const updateUser1=(id,formData,callback)=>{
    client.mutate({
        mutation:updateUser,
        variables:{id:id,...formData}
    })
    .then(res=>{
        callback(res)
    })
}