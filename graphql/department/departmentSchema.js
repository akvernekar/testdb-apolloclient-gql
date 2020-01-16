const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Department = require('../../models').Department
const {departmentType,departmentArgs}=require('./departmentType')

var queryType = new GraphQLObjectType({
    name:"Query",
    fields:()=>({
        getAllDepartments:{
            type:new GraphQLList(departmentType),
            resolve:()=>{
                return Department.findAll()
            }
        },
        getSingleDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async (args,params)=>{
                return Department.findByPk(params.id)
            }
        }
    })
});

var mutation =new GraphQLObjectType({
    name:'Mutation',
    fields:()=>({
        addDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async (args,params)=>{
                const department=await Department.create(params)
                return department
            }
        },
        removeDepartment:{
            type:departmentType,args:departmentArgs,
            resolve:async(arg,params)=>{
              let item=await Department.findOne({where:{id:params.id}})
              let deletedItem= await Department.destroy({where:{id:item.id}}) //it returns 1 id deleted
              if(deletedItem===1){
              return item;
              }
            }
          },
        updateDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async(args,params)=>{
                // let updatedDepartment = await Department.findOne({where:{id:params.id}})
                // updatedDepartment["departmentName"] = params.departmentName;
                // updatedDepartment["companyId"] = params.companyId;
                // console.log(updatedDepartment)
                // return updatedDepartment.save()


               let update = await Department.update(params,{where:{id:params.id},returning: true,
                plain: true})
                // console.log(update[1].dataValues)
                return update[1].dataValues
         }
        }
    })
})

module.exports=new GraphQLSchema({
    query:queryType,
    mutation:mutation
})