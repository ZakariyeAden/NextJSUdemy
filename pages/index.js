import MeetupList from "../Components/meetups/MeetupList";
import { MongoClient } from "mongodb";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];
function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   // fetch data from api
//   return{
//     props: {
//       DUMMY_MEETUPS
//     },
//   };
// }
// Faster
export async function getStaticProps() {
  // fetch data from an api

  const client = await MongoClient.connect(
    "mongodb+srv://Boss2018:Boss2018@cluster0.uyyqrbx.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpsCollection = db.collection("meetups");

  const meetups = await meetUpsCollection.find().toArray();

  client.close();
  // fetch("/api/meetups");
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1,
  };
}
export default HomePage;
