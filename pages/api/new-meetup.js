// /api/new-meet-up
// API ROUTEs
import { MongoClient} from 'mongodb'
async function handler(req,res){
  if(req.method === 'POST'){
    const data = req.body;

    const {title,image,address,description} = data;

    const client = await MongoClient.connect('mongodb+srv://Boss2018:Boss2018@cluster0.uyyqrbx.mongodb.net/?retryWrites=true&w=majority');

    const db = client.db();

    const meetUpsCollection = db.collection('meetups');

   const result =  await meetUpsCollection.insertOne(data);

   console.log(result);

   client.close();

   res.status(201).json({message: 'Meetup inserted!'});
  }
}
export default handler