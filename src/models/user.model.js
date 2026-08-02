
const db = require('../config/db');

const UserModel = {

  // Find a user by their email address
  findByEmail: async (email) => {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },

  // Find a user by their ID (used for /me endpoint)
  findById: async (id) => {
    const result = await db.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  // Create a new user and return their record (without password)
  create: async ({ name, email, hashedPassword, role }) => {
    const result = await db.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );
    return result.rows[0];
  },

};

module.exports = UserModel;
