const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()


//middleware
app.use(express.json())
app.use(cors())

// replace username(${process.env.DB_USER}) and password(${process.env.DB_PASS}) here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@connectx-cluster.1bebn.mongodb.net/?retryWrites=true&w=majority&appName=ConnectX-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    //create db
    const db = client.db("mernConnectX");
    const jobsCollections = db.collection("demoJobs");
    

    // extra ...........................//

    // Creating index for job sorting last job posted will show first
    const indexKeys = { title: 1, category: 1 }; 
    const indexOptions = { name: "titleCategory" }; 
    const result = await jobsCollections.createIndex(indexKeys, indexOptions);
    // console.log(result);

    //..................................//

    //post a job
    app.post("/post-job",async(req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body)

      const result = await jobsCollections.insertOne(body);
      if(result?.insertedId){               //................... extra: ?
        return res.status(200).send(result);
      }else{
        return res.status(404).send({
          message: "can not insert! try again later",
          status: false
        })
      }

    })


    //get all jobs
    app.get("/all-jobs", async(req, res) => {
      const jobs = await jobsCollections.find({}).sort({ createAt: -1}).toArray() //................ extra: .sort({ createAt: -1})
      res.send(jobs);
    })


    //get single job using id
    app.get("/all-jobs/:id", async(req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job)
    })
    
    //get jobs by email
    app.get("/myJobs/:email", async(req, res) => {
      //console.log(req.params.email)
      const jobs = await jobsCollections.find({postedBy : req.params.email}).toArray();
      res.send(jobs)
    })


    //delete a job
    app.delete("/job/:id", async(req, res) => {
     
      const id =req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await jobsCollections.deleteOne(filter);
      res.send(result) 
    })

    //update a job
    app.patch ("/update-job/:id", async(req, res) => {
      const id= req.params.id;
      const jobData = req.body;
      const filter = {_id: new ObjectId(id)};
     // was here options
      const updateDoc = {
        $set: {
          ...jobData
        },
      };
      const options = {upsert: true}; // was above.......................................
      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello Developer!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})