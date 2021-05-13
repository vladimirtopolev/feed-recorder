import express from 'express';
import path from 'path';
import {recordRouter} from './routes/records.route'
const app = express();
const PORT = process.env.PORT || 5000;


// API ROUTES
app.use('/api/records', recordRouter);

app.use('/static', express.static(path.resolve(__dirname, '../static/static')));

app.get('*', (req, res) => {
    const pathFile = path.resolve(__dirname, '../static/index.html');
    res.sendFile(pathFile)
});

app.listen(PORT, () => {
     console.log(`server is listening on ${PORT}`);
});
