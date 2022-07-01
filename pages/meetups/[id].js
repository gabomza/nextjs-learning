import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupCard from "../../components/meetups/MeetupCard";
import { Variables } from "../../utils/variables";
const { MONGO_DB_URI } = Variables;

const MeetupDetailsPage = (props) => {
  const title = `Meetup detail for: ${props.meetupData.title}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Meetups description and extra information"
        />
      </Head>
      <MeetupCard meetupData={props.meetupData} />
    </>
  );
};

const getDbCollection = async () => {
  const client = new MongoClient(MONGO_DB_URI);
  const connection = await client.connect();
  const db = connection.db("meetups");
  const collection = db.collection("meetups");
  return collection;
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.id;

  const collection = await getDbCollection();

  const meetupData = await collection.findOne({ _id: ObjectId(meetupId) });

  const { title, address, image, description } = meetupData;

  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title,
        image,
        address,
        description,
      },
    },
    revalidate: 3600,
  };
};

export const getStaticPaths = async () => {
  const collection = await getDbCollection();
  const meetups = (await collection.find({}, { _id: 1 }).toArray()).map(
    (meetup) => ({
      params: {
        id: meetup._id.toString(),
      },
    })
  );

  return {
    paths: meetups,
    fallback: false,
  };
};

export default MeetupDetailsPage;
