import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'
import {client} from '../../App'

 const getAllDepartments=gql`
{
    getAllDepartments{
             id
             departmentName
             tenantId
             companyId
    }
}
`;

export const getAllDepartments1 = (callback)=>{
    console.log("client==",client)
client.query({
    query:getAllDepartments,
}).then(res=>{
    callback(res)
}
    )
}

const addDepartment=gql`
mutation($departmentName:String!,$companyId:Int!,$tenantId:Int!){
    addDepartment(departmentName:$departmentName,companyId:$companyId,tenantId:$tenantId){
        departmentName
    }
}
`;

export const addDepartment1=(formData)=>{
client.mutate({
    mutation:addDepartment,
    variables:formData,
}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
}
