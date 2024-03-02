const Role = require("../models/Role");


//create role
exports.saverole = async (req, res) => {
    const { roleName, description} = req.body;
  
    if (!roleName || !description ) {
      return res.status(400).json({ error: "Please fill all the details" });
    }
  
    try {
      const addrole = new Role({
        roleName,
        description
      });
      await addrole.save();
      return res.status(200).json(addrole);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  //get role
  exports.getrole = async(req, res) => {
    try{
       const userRole = await Role.find()
       res.status(201).json(userRole)
    }catch(error){
      return res.status(500).json({ error: "Internal server error" });
    } 
  }


  //update role
  exports.updaterole = async(req, res) => {
    try{
      const roleId = req.params.id;
      const  roleDataToUpdate = req.body;
      const updateRole = await Role.findByIdAndUpdate( roleId,  roleDataToUpdate, {
        new:true,
        runValidators: true,
      });
      if (!updateRole) {
        return res.status(404).json({ error: 'User not found' });
      }
       // Send the updated user data in the response
       res.json(updateRole);
    }catch(error){
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  //delete role

  exports.deleterole = async(req, res) => {
    try{
     const {id} = req.params;
     const deleteRole = await Role.findByIdAndDelete({_id:id});
     if(!deleteRole){
      return res.status(404).json({ error: 'Roles not found' });
     }
     res.json({message:"Role delted successfully"})
    }catch(err){
      console.error(err);
      return res.status(500).json({error:"Internal server error"});
    }
  }