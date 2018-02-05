import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // allows us to send objects or data through HTTP Posts to the database or API
import routes from './src/routes/walletRoutes';

const app = express();
const PORT = 3000;


// mongosse connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/WALLETdb', {
    useMongoClient: true
});

// bodyparser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files. e.g images.
// public folder is at the root of the project
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Welcome ---- Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
