const Organization = require('../models/organization');
//create a new organization by getting name
async function createOrg(req,res){
    const {name} = req.body;
    try{
    const Org = await Organization.findOne({name: name});
    if(Org){
        res.status(400).json({ message: "Organization already registered" });
    } else {
      const organization = new Organization(req.body);
      await organization.save();
      res
        .status(201)
        .json({ message: "Organization added successfully." });
    }
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}
// delete the existing organization by using its id
async function deleteOrg(req,res){
    try {
        const { id } = req.params;
        const deleteOrg = await Organization.findByIdAndRemove(id);
        res.status(200).json(deleteOrg);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}
module.exports = {
  createOrg,
  deleteOrg,
}