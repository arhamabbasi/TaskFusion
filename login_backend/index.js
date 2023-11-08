const express = require('express');
require('./util/db');
const bodyparser = require('body-parser');

const userRouter = require('./routes/userRoute');
const teamRouter = require('./routes/teamRoute');
const todoRouter = require('./routes/todoRoute');
const app = express();
const PORT = 3005;
app.use(bodyparser.json());
app.use('/api',userRouter);
app.use('/api',teamRouter);
app.use('/api',todoRouter);
app.get('/api',(req,res)=>{
    res.send("Hello");
})



app.listen(PORT,() => {
    console.log("server started on port",PORT)
})