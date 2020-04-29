const express = require('express'); //Install ExpressJS first
const router = express.Router();
const Song = require('../models/song');
const Artist = require('../models/artist');

// All songs
router.get('/', async (req, res) => {
  let query = Song.find();
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('releaseDate', req.query.publishedBefore);
  }
  try {
    const songs = await query.exec()
    res.render('songs/index', {
      songs: songs,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/');
  }
})

// New song
router.get('/new', async (req, res) => {
  renderNewPage(res, new Song());
})

// Submitting a song
router.post('/', async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    releaseDate: new Date(req.body.releaseDate),
    genre: req.body.genre
  });

  try {
    const newSong = await song.save();
    res.redirect(`songs`);
  } catch {
    renderNewPage(res, song, true);
  }
});

async function renderNewPage(res, song, hasError = false) {
  try {
    const artists = await Artist.find({});
    const params = {
      artists: artists,
      song: song
    }
    if (hasError) params.errorMessage = 'There is an error with your submission. Please try again.'
    res.render('songs/new', params)
  } catch {
    res.redirect('/songs');
  }
}

module.exports = router;