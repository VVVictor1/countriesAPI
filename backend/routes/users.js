const express = require('express');
const axios = require('axios');
const cors = require('cors');
const router = express.Router();
router.use(cors());

router.get('/:country', async function (req, res) {
  const { country } = req.params;
  const apiUrl = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

  try {
    const response = await axios.get(apiUrl);
  
    if (!response.data.length) {
      res.status(404).json({ error: 'Country not found' });
      return;
    }
  
    const data = response.data[0];
      
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Internal Server Error.' });
  }
});

module.exports = router;