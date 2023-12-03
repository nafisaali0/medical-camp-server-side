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
    const registerCampCollection = client
      .db("ameliaMedicalCampDB")
      .collection("registerCamps");
    const userCollection = client.db("ameliaMedicalCampDB").collection("users");

    // user db start
    app.post("/users", async (req, res) => {
      const user = req.body;

      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // user db end

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
    app.get("/camp/:campId", async (req, res) => {
      const id = req.params.campId;
      const query = { _id: new ObjectId(id) };

      // send data to DB
      const result = await campCollection.findOne(query);
      res.send(result);
    });
    app.delete("/camp/:campId", async (req, res) => {
      const id = req.params.campId;
      // console.log(id)
      const query = { _id: new ObjectId(id) };

      // send data to DB
      const result = await campCollection.deleteOne(query);
      res.send(result);
    });
    // update
    app.patch("/camp/:campId", async (req, res) => {
      const item = req.body;
      const id = req.params.campId;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          campName: item.campName,
          services: item.services,
          healthcareProfessionals: item.healthcareProfessionals,
          targetAudience: item.targetAudience,
          campFees: item.campFees,
          date: item.date,
          time: item.time,
          venue: item.venue,
          enroll: item.enroll,
          shortDescription: item.shortDescription,
          longDescription: item.longDescription,
          image: item.image,
        },
      };

      const result = await campCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    // camp db end

    // registerCamp db start
    app.post("/registerCamps", async (req, res) => {
      const registercampItem = req.body;
      const result = await registerCampCollection.insertOne(registercampItem);
      res.send(result);
    });
    app.get("/registerCamps", async (req, res) => {
      let query = {};
      // condition for show blogs based on current user wishlist
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await registerCampCollection.find(query).toArray();
      res.send(result);
    });
    app.delete("/registerCamps/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // send data to DB
      const result = await registerCampCollection.deleteOne(query);
      res.send(result);
    });
    // registerCamp db end

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
