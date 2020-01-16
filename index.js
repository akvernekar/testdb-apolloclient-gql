const express =require ('express')
const graphqlHTTP =require('express-graphql')
const schema =require('./graphql/indexSchema')
const connectDb =require('./config/database')
const cors = require ('cors')
// const Book =require('./models').Book;
// const Company =require('./models').Company;
// const Department =require('./models').Department;
const port=4010;
const app=express()
app.use(cors())

connectDb()
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}))



// Company.create({
//     companyName:"earth",
//     tenantId:1
// }).then(company=>{
//     console.log(company)
// }
// );

// Company.create({
//     companyName:"xcelpros"
// }).then(company =>{
//     company.createDepartment({
//         departmentName:"product"
//     })
//     .then(()=>{
//         console.log('sucess')
//     })
//     // console.log(company)
// });

//  Company.create({
//       companyName:'aky',
//       Department:{
//           departmentName:"testing"
//       }
//     }, {
//         include: [ Department ]
//       });



// Department.create({
//     departmentName:"product",
//     companyId:2
// })
// .then(()=>{
//     console.log('saved')
// })

app.listen(port,()=>{
    console.log('listing to port',port)
})




