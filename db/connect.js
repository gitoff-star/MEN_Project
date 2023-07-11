
const moongoose= require('mongoose');


const connectionString =
"mongodb+srv://user:user@cluster0.0b3wjiz.mongodb.net/Databasenew?retryWrites=true&w=majority";
moongoose.set('strictQuery', 
true);
moongoose.connect(connectionString,{
    useNewUrlParser:true,    
    useUnifiedTopology:true
}).then(()=>console.log("connected...")).catch((err)=>{
    console.log(`connection failed ${err}`);
})
