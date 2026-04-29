const express = require('express');
const router = express.Router();

// make sure you import your DB pool too
const pool = require('../db/pool'); // adjust path if different

router.post('/contact', async (req, res, next) => {
  const {
    firstName,
    lastName,
    company,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    email,
    phone,
    message
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO contact_messages
      (first_name, last_name, company, address1, address2, city, state, zip, country, email, phone, message)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING message_id, first_name, last_name, email`,
      [firstName, lastName, company, address1, address2, city, state, zip, country, email, phone, message]
    );

    res.json({
      message: 'Contact form submitted successfully',
      submission: result.rows[0]
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;