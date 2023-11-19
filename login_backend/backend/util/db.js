const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/SE_Project',{
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error',err=>{
    console.log('failed');
});
db.once('open',()=>{
    console.log("connected");
});