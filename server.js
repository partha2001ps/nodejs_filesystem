// to install express js and require path ,fs and express
  
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// to local port with Port number
const PORT = 3000;

// to current data and time and replace : to _ because file created

const currentTimeStamp = new Date().toISOString().replace(/:/g, '_');
const fileName = `${currentTimeStamp}.txt`;

// to write file create current data and time

fs.writeFile(`./${fileName}`, currentTimeStamp, { flag: 'w+' }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('File added successfully');
  }
});

// to read the data fileName 
// to end point is '/' to create is the read data
app.get('/', (req, res) => {
  fs.readFile(`./${fileName}`,'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
    res.send(data);
  });
});
//  to local host server running in console 
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
