const express = require('express');
const connectDB = require('./db');
const users = require('./Routes/users');

const app= express();

connectDB();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('About');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  
 
    
app.listen(3001, () => console.log(`Server is running on port 3001`));
