const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const app = require("./app");
const dataBase = require('./config/databaseConnect');
dataBase();
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
    
})