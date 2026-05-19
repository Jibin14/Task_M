const mongoose = require("mongoose");

const databaseConnect = ()=>{
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`database is connected with ${data.connection.host}`);
        
    }).catch((err) => {
        console.log(err);
        
    })
}
module.exports = databaseConnect;