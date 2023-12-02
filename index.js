const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); //hide DBpass
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlu12w4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const campCollection = client.db("ameliaMedicalCampDB").collection("camp");

    // camp db start
    app.post("/camp", async (req, res) => {
      const item = req.body;
      const result = await campCollection.insertOne(item);
      res.send(result);
    });
    app.get("/camp", async (req, res) => {
      const result = await campCollection.find().toArray();
      res.send(result);
    });
    app.get("/camp/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // send data to DB
      const result = await campCollection.findOne(query);
      res.send(result);
    });
    app.delete("/camp/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id)
      const query = { _id: new ObjectId(id) };

      // send data to DB
      const result = await campCollection.deleteOne(query);
      res.send(result);
    });
    
    // camp db end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//testing server running or not
app.get("/", (req, res) => {
  res.send("Amelia medical comp server is running");
});
app.listen(port, () => {
  console.log(`Amelia medical comp Server is running on port ${port}`);
});
