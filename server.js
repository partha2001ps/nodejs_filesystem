const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const files = await fs.readdir('./', { withFileTypes: true });

    const fileContents = [];
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.txt') && file.name !== 'text.txt') {
        const data = await fs.readFile(`./${file.name}`, 'utf-8');
        fileContents.push({ filename: file.name, content: data });
      }
    }

    console.log('All text files are read successfully');
    res.json(fileContents);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/', async (req, res) => {
  try {
    const currentTime = new Date().toISOString().replace(/:/g, '_');
    const filename = `./${currentTime}.txt`;

    await fs.writeFile(filename, currentTime, { flag: 'w+' });
    console.log('File added successfully');

    res.status(201).json({ filename, content: currentTime });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});