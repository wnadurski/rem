import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, ((err: any) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening  witam2 on ${port}`);
}) as any);