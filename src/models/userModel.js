  import mongoose from 'mongoose';
  const userSchema=new mongoose.Schema({
      username: {
          type: String,
          required: [true, "Please provide a username"],
          unique: true,
        },
        email: {
          type: String,
          required: [true, "Please provide an email"],
          unique: true,
        },
        password: {
          type: String,
          required: [true, "Please provide a password"],
        },
      isVerified: {
          type: Boolean,
          default: false,
      },
      isAdmin:{
          type:Boolean,
          default:false,
      },
      forgotPasswordToken: String,
      forgotPasswordTokenExpiry: Date,
      verifyToken: String,
      verifyTokenExpiry: Date,
  },{timestamps: true})
  // in MDB, Eervything is lowercase and pluralised
  /// There was a bug here in the below line, which was that the name of the schema I was giving in the 2 conditions were not same
  const User=mongoose.models.User || mongoose.model("User",userSchema); // User==users are not same.
// ! changing setting here in the User model for the user collection
  export default User;