import mongoose, { connection } from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); // There will be no error here if we were using js but as we are using ts, we have to put an ! mark to ensure the ts that we are taking care of this part of out code and it will always resolve as ts is thinking that this part might give error sometimes while resolving.
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB connected succesfuly");
    })
    connection.on("error", (err) => {
        console.log("MongoDB connection error, Please make sure that the mongoDB is running."+err);
        process.exit();
    })
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
