import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

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
  const mongoDbUri =
    "mongodb+srv://gaboguzman:HiL6DcgoHS4fZ1zr@cluster0.qtrft.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(mongoDbUri);
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
