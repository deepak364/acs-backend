

const db = require('../config/db');

const BusinessModel = {


  findAll: async () => {
    const result = await db.query(`
      SELECT
        bp.id, bp.biz_name, bp.description,
        bp.category, bp.contact, bp.created_at,
        u.name AS owner_name
      FROM business_promotions bp
      JOIN users u ON bp.owner_id = u.id
      ORDER BY bp.created_at DESC
    `);
    return result.rows;
  },


  create: async ({ ownerId, biz_name, description, category, contact }) => {
    const result = await db.query(
      `INSERT INTO business_promotions (owner_id, biz_name, description, category, contact)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [ownerId, biz_name, description, category, contact]
    );
    return result.rows[0];
  },

};

module.exports = BusinessModel;
