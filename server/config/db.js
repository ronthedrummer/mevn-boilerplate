import mongoose from 'mongoose';

export function connectToDB() {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, error => {
    if (error) {
      console.log('Unable to connect to DB');
    } else {
      console.log('Connected to MongoDB');
    }
  });
}
