const express = require('express')
const router = require('./router/employeesRouter');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect("mongodb://localhost:27017/hrms", {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => console.log('connection estalblished')).catch(err => {
    console.error(err);
    process.exit();
});

app.use(bodyParser.json());
app.use(cors());
router(app);
app.listen(3500, () => console.log('Express server started'));