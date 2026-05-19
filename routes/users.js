const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/pool');
const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email',
      [username, email, passwordHash]
    );

    res.json({
      message: 'Account created successfully',
      user: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// LOGIN
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// UPDATE EMAIL
router.put('/users/:id/email', async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE users SET email = $1 WHERE user_id = $2 RETURNING user_id, username, email',
      [email, id]
    );

    res.json({
      message: 'Email updated successfully',
      user: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// UPDATE PASSWORD
router.put('/users/:id/password', async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE user_id = $2',
      [passwordHash, id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

// ADD FAVORITE ROUTE
router.post('/favorite-routes', async (req, res, next) => {
  const { user_id, start_station, end_station } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO favorite_routes (user_id, start_station, end_station) VALUES ($1, $2, $3) RETURNING *',
      [user_id, start_station, end_station]
    );

    res.json({
      message: 'Favorite route added',
      route: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// GET FAVORITE ROUTES
router.get('/favorite-routes/:user_id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM favorite_routes WHERE user_id = $1 ORDER BY route_id DESC',
      [req.params.user_id]
    );

    res.json({ routes: result.rows });
  } catch (err) {
    next(err);
  }
});

// ADD FAVORITE STATION
router.post('/favorite-stations', async (req, res, next) => {
  const { user_id, station_name } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO favorite_stations (user_id, station_name) VALUES ($1, $2) RETURNING *',
      [user_id, station_name]
    );

    res.json({
      message: 'Favorite station added',
      station: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

// GET FAVORITE STATIONS
router.get('/favorite-stations/:user_id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM favorite_stations WHERE user_id = $1 ORDER BY station_id DESC',
      [req.params.user_id]
    );

    res.json({ stations: result.rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;