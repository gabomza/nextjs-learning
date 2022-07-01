import { MongoClient } from "mongodb";
import { Variables } from "../../utils/variables";
const { MONGO_DB_URI } = Variables;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body } = req;
    const { title, address, description, image } = body;

    const client = new MongoClient(MONGO_DB_URI);
    const connection = await client.connect();
    const db = connection.db("meetups");
    const collection = db.collection("meetups");

    const result = await collection.insertOne({
      title,
      image,
      address,
      description,
    });

    client.close();

    res.status(201).json({
      insertedId: result.insertedId,
    });
  }
};

export default handler;
