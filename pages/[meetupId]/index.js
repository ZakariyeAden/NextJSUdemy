import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../Components/meetups/MeetupDetail";

function MeetupDetails(props) {
  // useRouter;
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Boss2018:Boss2018@cluster0.uyyqrbx.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpsCollection = db.collection("meetups");

  const meetups = await meetUpsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Boss2018:Boss2018@cluster0.uyyqrbx.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpsCollection = db.collection("meetups");

  const selectedMeetUp = await meetUpsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetUp._id.toString(),
        title: selectedMeetUp.title,
        address: selectedMeetUp.address,
        image: selectedMeetUp.image,
        description: selectedMeetUp.description,
      },
    },
  };
}

export default MeetupDetails;
