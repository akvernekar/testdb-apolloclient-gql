const {Client} =require('pg')
const connectionString = 'postgressql://postgres:akshay@localhost:5432/testdb';
const client = new Client({connectionString})

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres', 'postgres', 'akshay', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 9,
//     min: 0,
//     idle: 10000
//   }
// });

// const connectDb=()=>{sequelize.authenticate()
// .then(() => {
//   console.log("Success!");
// }).catch((err) => {
//   console.log(err);
// })};




const connectDb=()=>{

     client.connect()
    .then(()=>{
        console.log('connected to db')
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports=connectDb  