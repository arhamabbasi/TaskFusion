const Organization = require('../models/organization');
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
async function deleteOrg(req,res){
    try {
        const { id } = req.params;
        const deleteOrg = await Organization.findByIdAndRemove(id);
        res.status(200).json(deleteOrg);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}