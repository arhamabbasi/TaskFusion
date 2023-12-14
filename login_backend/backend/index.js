const express = require("express");
require("./util/db");
const cors = require("cors");
const bodyparser = require("body-parser");

const userRouter = require("./routes/userRoute");
const teamRouter = require("./routes/teamRoute");
const todoRouter = require("./routes/todoRoute");
const orgRouter = require("./routes/orgRoute");
const taskRouter = require("./routes/taskRoute");
const sprintRouter = require("./routes/sprintRoute");
const projectRouter = require("./routes/projectRoute");

const app = express();
app.use(cors());

const PORT = 3005;
app.use(bodyparser.json());
//calling apis
app.use("/api", userRouter);
app.use("/api", teamRouter);
app.use("/api", todoRouter);
app.use("/api", orgRouter);
app.use("/api", taskRouter);
app.use("/api", sprintRouter);
app.use("/api", projectRouter);

app.get("/api", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
