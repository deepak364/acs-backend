const db = require('../config/db');

const CampaignModel = {
  findAllApproved: async () => {
    const result = await db.query(`
      SELECT
        c.id, c.title, c.description, c.category,
        c.status, c.created_at,
        u.name AS author,
        COUNT(cp.user_id)::int AS participant_count
      FROM campaigns c
      JOIN users u ON c.created_by = u.id
      LEFT JOIN campaign_participants cp ON c.id = cp.campaign_id
      WHERE c.status = 'approved'
      GROUP BY c.id, u.name
      ORDER BY c.created_at DESC
    `);
    return result.rows;
  },
  findAllPending: async () => {
    const result = await db.query(`
      SELECT
        c.id, c.title, c.description, c.category,
        c.status, c.created_at,
        u.name AS author, u.email AS author_email
      FROM campaigns c
      JOIN users u ON c.created_by = u.id
      WHERE c.status = 'pending'
      ORDER BY c.created_at ASC
    `);
    return result.rows;
  },
  findByUserId: async (userId) => {
    const result = await db.query(`
      SELECT
        c.id, c.title, c.description, c.category,
        c.status, c.created_at,
        COUNT(cp.user_id)::int AS participant_count
      FROM campaigns c
      LEFT JOIN campaign_participants cp ON c.id = cp.campaign_id
      WHERE c.created_by = $1
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `, [userId]);
    return result.rows;
  },
  create: async ({ title, description, category, userId }) => {
    const result = await db.query(
      `INSERT INTO campaigns (title, description, category, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, category, userId]
    );
    return result.rows[0];
  },
  updateStatus: async (id, status) => {
    const result = await db.query(
      `UPDATE campaigns SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0] || null;
  },
  addParticipant: async (campaignId, userId) => {
    await db.query(
      `INSERT INTO campaign_participants (campaign_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [campaignId, userId]
    );
  },

};

module.exports = CampaignModel;
