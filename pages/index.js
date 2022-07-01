import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { Variables } from "../utils/variables";
const { MONGO_DB_URI } = Variables;

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups list</title>
        <meta name="description" content="Meetups list to search mel" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = new MongoClient(MONGO_DB_URI);
  const connection = await client.connect();
  const db = connection.db("meetups");
  const collection = db.collection("meetups");

  const meetups = (await collection.find().toArray()).map((meetup) => ({
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }));

  client.close();

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 3600,
  };
};

// export const getServerSideProps = async (context) => {
//   return {
//     props: {
//       meetups: mockMeetups,
//     },
//   };
// };

export default HomePage;
