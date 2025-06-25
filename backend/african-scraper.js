const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/african-recipes', async (req, res) => {
  try {
    const results = [];

    // 1. allnigerianrecipes.com
    try {
      const { data } = await axios.get('https://www.allnigerianrecipes.com/');
      const $ = cheerio.load(data);
      $('.entry-title a').each((i, el) => {
        if (i < 10) {
          results.push({
            source: 'All Nigerian Recipes',
            title: $(el).text().trim(),
            url: $(el).attr('href'),
            image: null // No image on homepage
          });
        }
      });
    } catch (e) {
      console.error('Error scraping allnigerianrecipes:', e.message);
    }

    // 2. 9jafoodie.com
    try {
      const { data } = await axios.get('https://9jafoodie.com/');
      const $ = cheerio.load(data);
      $('.post').each((i, el) => {
        if (i < 10) {
          const title = $(el).find('.entry-title a').text().trim();
          const url = $(el).find('.entry-title a').attr('href');
          const image = $(el).find('img').attr('src');
          if (title && url) {
            results.push({
              source: '9jafoodie',
              title,
              url,
              image
            });
          }
        }
      });
    } catch (e) {
      console.error('Error scraping 9jafoodie:', e.message);
    }

    // 3. mydiasporakitchen.com/category/nigerian-recipes/
    try {
      const { data } = await axios.get('https://mydiasporakitchen.com/category/nigerian-recipes/');
      const $ = cheerio.load(data);
      $('.post').each((i, el) => {
        if (i < 10) {
          const title = $(el).find('.entry-title a').text().trim();
          const url = $(el).find('.entry-title a').attr('href');
          const image = $(el).find('img').attr('src');
          if (title && url) {
            results.push({
              source: 'My Diaspora Kitchen',
              title,
              url,
              image
            });
          }
        }
      });
    } catch (e) {
      console.error('Error scraping mydiasporakitchen:', e.message);
    }

    res.json({ meals: results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape African recipes.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`African recipe scraper running on port ${PORT}`));