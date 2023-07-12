require('./db/connect');
const { MongoClient } = require("mongodb");


async function main() {
  const uri =
    // "mongodb+srv://user:use@cluster0.0b3wjiz.mongodb.net/?retryWrites=true&w=majority";
    "mongodb://localhost:27017";
    

  const client = new MongoClient(uri);

  try {
    await client.connect(); // promise

    const singleList = {
      age:"30",
      name: "new1",
      data: "newtest1",
    };

    const multipleList = [
      {
        age:"30",
        name: "new1",
        data: "newtest1",
      },
      {
        age:"30",
      name: "new2",
      data: "newtest2",
      },
      {
        age:"30",
      name: "new3",
      data: "newtest3",
      },
    ];
    // const result = await client
    // .db("abc")
    // .collection("test").find()

    // await findOne(client,"abc 3");
    
    // await updateOne(client,"30",{
      
    //   name: "new2-updated",
    //   data: "newtest2-updated",
    // });

    // await deleteOne(client,"30");
  // await deleteMany(client,"30");

    // await findMany(client, "30");
    // createList(client, singleList);
    // await createMultipleList(client, multipleList);
    // await dbList(client);
  } catch (e) {
    console.log('here');
    console.error(e);
  } finally {
    await client.close();
  }
}

async function dbList(client) {
  const db = await client.db().admin().listDatabases();

  db.databases.forEach((list) => {
    console.log(`- ${list.name}`);
  });
}
const createList = async (client, data) => {
  const result = await client.db("abc").collection("test").insertOne(data);

  console.log(`data inserted id: ${result.insertedId}`);

  const count = await client.db("abc").collection("test").count();
  console.log(`total documents : ${count}`);
};

const createMultipleList = async (client, data) => {
  const result = await client.db("abc").collection("test").insertMany(data);

  console.log(`total documen inserted ${result.insertedCount} id(s) are `);
  console.log(` id : ${JSON.stringify(result.insertedIds)}`);
};

const findOne = async (client, search) => {
  const result = await client
    .db("abc")
    .collection("test")
    .findOne({ name: search });

  if (result) {
    console.log(`found : ${JSON.stringify(result)}`);
  } else {
    console.log("nothing matched");
  }
};

const findMany = async (client,search) => {
  const cursor = await client
    .db("abc")
    .collection("test")
    .find({
      age: {
        $in: [search]
      },
    });

const result =await  cursor.toArray();



  if (result.length> 0) {
result.forEach(data=>{
  console.log(` data: ${JSON.stringify(data)} `);
});

  } else {
    console.log("nothing matched");
  }
};



const updateOne=async (client,filterKey,updateList)=>{
const result = await client.db("abc").collection('test').updateOne({age:filterKey},{$set:updateList});

console.log(`matteched documents : ${result.matchedCount}`);
console.log(`matteched documents : ${result.modifiedCount}`);

}


const upsertUpdate=async (client,filterKey,updateList)=>{
  const result = await client.db("abc").collection('test').updateOne({age:filterKey},{$set:updateList},
    {
      upsert:true
    });
  if(result.upsertedCount>0){
    console.log(`one documents is inserted: ${result.upsertedId}`);  
  }else
  {
    console.log(`matched documents : ${result.modifiedCount}`);
  }
  
  }

  const UpdateMany=async (client,filterKey,updateList)=>{
    const result = await client.db("abc").collection('test').updateMany({age:filterKey},{$set:updateList},
      {
        upsert:true
      });
    if(result.upsertedCount>0){
      console.log(`one documents is inserted: ${result.upsertedId}`);  
    }else
    {
      console.log(`matched documents : ${result.modifiedCount}`);
    }
    
    }


    const deleteOne=async (client,filterKey)=>{
      const result = await client.db("abc").collection('test').deleteOne({age:filterKey});
      if(result.deletedCount>0){
        console.log(`one documents is deleted: ${result.deletedCount}`);  
      }else
      {
        console.log(`nothing matched documents : ${result.deletedCount}`);
      }
      
      }


      const deleteMany=async (client,filterKey)=>{
        const result = await client.db("abc").collection('test').deleteMany({age:filterKey});
        if(result.deletedCount>0){
          console.log(` documents is deleted: ${result.deletedCount}`);  
        }else
        {
          console.log(`nothing matched documents : ${result.deletedCount}`);
        }
        
        }

main().catch(console.error);
