const User = require("../models/User");


//create user
exports.saveuser = async (req, res) => {
  const { firstName, lastName, userName, role, branch , phone} = req.body;

  if (!firstName || !lastName || !userName || !role || !branch || !phone) {
    return res.status(400).json({ error: "Please fill all the details" });
  }

  try {
    const preuser = await User.findOne({ userName: userName });

    if (preuser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const adduser = new User({
      firstName,
      lastName,
      userName,
      role,
      branch,
      phone
    });
    await adduser.save();
    return res.status(200).json(adduser);

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};



//get all user

exports.getuser = async(req, res) => {
  try{
     const  userdata = await User.find()
     res.status(201).json(userdata)
  }catch(error){
    return res.status(500).json({ error: "Internal server error" });
  } 
}



//update user

exports.update = async(req, res)=>{
  try{
   const userId = req.params.id;
   const userDataToUpdate = req.body

   const updateUser = await User.findByIdAndUpdate(userId , userDataToUpdate, {
    new:true,
    runValidators: true,
   });
   if (!updateUser) {
    return res.status(404).json({ error: 'User not found' });
  }
   // Send the updated user data in the response
   res.json(updateUser);

  }catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


//delete user
exports.deleteuser = async(req, res)=>{
  try{
    const {id} = req.params;
    const deleteUser = await User.findByIdAndDelete({_id:id})
    if (!deleteUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({message:'User deleted successfully'});
  }catch(error){
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
  
}