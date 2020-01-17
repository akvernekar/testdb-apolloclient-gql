const {GraphQLSchema,GraphQLObjectType,GraphQLList,GraphQLString,GraphQLInt} = require("graphql");

const Department = require("../../models").Department;
const {departmentType,departmentArgs}=require("./departmentType");

var queryType = new GraphQLObjectType({
    name:"Query",
    fields:()=>({
/*
        moduleName : Department,
        API For : get All Departments,
        objective : getting all departments by API
        ###########################
        Request Params :
        #########################
        
        ###########################
        Response : 
        ###########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
*/
        getAllDepartments:{
            type:new GraphQLList(departmentType),
            resolve:async()=>{
                const allDepartments=await Department.findAll();
               if(!allDepartments){throw new Error("department not found")}
               return allDepartments
            }
        },
/*
        moduleName : Department,
        API For : get Single Department,
        objective : getting single department by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
*/


        getSingleDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async (args,params)=>{
                const singleDepartment=await Department.findByPk(params.id);
                if(!singleDepartment){throw new Error("Invalid Department Id (provide valid id)");}
                return singleDepartment;
            }
        }
    })
});

var mutation =new GraphQLObjectType({
    name:"Mutation",
    fields:()=>({

/*
        moduleName : Department,
        API For : Add Department,
        objective : Add department by API
        ###########################
        Request Params :
        #########################
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
*/

        addDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async (args,params)=>{
                const department=await Department.create(params);
                return department;
            }
        },
/*
        moduleName : Department,
        API For : Remove Department,
        objective : Remove department by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
*/


        removeDepartment:{
            type:departmentType,args:departmentArgs,
            resolve:async(arg,params)=>{
              let item=await Department.findOne({where:{id:params.id}});
              if(!item){throw new Error("Department ID not found");}
              let deletedItem= await Department.destroy({where:{id:item.id}}) //it returns 1 id deleted
              if(deletedItem){
              return item;
              }
            }
          },
          /*
        moduleName : Department,
        API For : Update Department,
        objective : Update department by API
        ###########################
        Request Params :
        #########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
        ###########################
        Response : 
        ###########################
        id :: Integer
        departmentName :: String
        tenantId :: Integer
        companyId::Integer
*/

        updateDepartment:{
            type:departmentType,
            args:departmentArgs,
            resolve:async(args,params)=>{
                // let updatedDepartment = await Department.findOne({where:{id:params.id}})
                // updatedDepartment["departmentName"] = params.departmentName;
                // updatedDepartment["companyId"] = params.companyId;
                // console.log(updatedDepartment)
                // return updatedDepartment.save()
                const updatingDepartment= await Department.findByPk(params.id);
                if(!updatingDepartment){throw new Error("Department ID not Found");}
               let update = await Department.update(params,{where:{id:params.id},returning: true,
                plain: true})
                // console.log(update[1].dataValues)
                return update[1].dataValues
         }
        }
    })
});

module.exports=new GraphQLSchema({
    query:queryType,
    mutation:mutation
});