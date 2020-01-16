import {graphql} from 'react-apollo'
import {gql} from 'apollo-boost'
import {client} from '../../App'



export const getAllCompanies=gql`
{
    getAllCompanies{
        id
        companyName
        tenantId
    }
}
`;

export const getAllCompanies1=(callback)=>{
    client.query({
        query:getAllCompanies
    }).then(res=>{
        callback(res)
    })
}



export const removeCompanyMutation=gql`
mutation($id:Int!){
removeCompany(id:$id){
companyName
}
}
`;

export const addCompanyMutation=gql`
mutation($companyName:String!,$tenantId:Int!){
    addCompany(companyName:$companyName,tenantId:$tenantId){
        companyName
    }
}
`;

