import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { body } = req;
    const { title, address, description, image } = body;

    const mongoDbUri =
      "mongodb+srv://gaboguzman:HiL6DcgoHS4fZ1zr@cluster0.qtrft.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(mongoDbUri);
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
