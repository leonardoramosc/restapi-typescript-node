import express from "express";
import indexRoutes from './routes/index';

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRoutes);

app.listen(port, () => {
  console.log('server on port', port)
})