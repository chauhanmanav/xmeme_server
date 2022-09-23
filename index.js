import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

// app.use('/posts',postRoutes);
app.use('/memes',postRoutes);

app.get('/',(req,res) => {
    res.send('Hello!! welcome to xmeme');
});

const CONNECTION_URL = 'mongodb+srv://root:root1234@cluster0.0vvhppw.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8081;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server running on ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
