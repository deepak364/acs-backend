-- ================================================
-- ACS Social Awareness Web Application
-- Database Schema v1.0
-- ================================================

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS business_promotions CASCADE;
DROP TABLE IF EXISTS campaign_participants CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ── USERS TABLE ──────────────────────────────────
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)        NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255)        NOT NULL,
  role       VARCHAR(20)         NOT NULL DEFAULT 'user',
  -- role can be: 'user', 'admin', 'business_owner'
  created_at TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- ── CAMPAIGNS TABLE ──────────────────────────────
CREATE TABLE campaigns (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200)  NOT NULL,
  description TEXT          NOT NULL,
  category    VARCHAR(100)  NOT NULL,
  status      VARCHAR(20)   NOT NULL DEFAULT 'pending',
  -- status can be: 'pending', 'approved', 'rejected'
  created_by  INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ── CAMPAIGN PARTICIPANTS TABLE ───────────────────
CREATE TABLE campaign_participants (
  id          SERIAL PRIMARY KEY,
  campaign_id INTEGER   REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id     INTEGER   REFERENCES users(id)     ON DELETE CASCADE,
  joined_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(campaign_id, user_id)
);

-- ── BUSINESS PROMOTIONS TABLE ─────────────────────
CREATE TABLE business_promotions (
  id          SERIAL PRIMARY KEY,
  owner_id    INTEGER       REFERENCES users(id) ON DELETE CASCADE,
  biz_name    VARCHAR(200)  NOT NULL,
  description TEXT          NOT NULL,
  category    VARCHAR(100)  NOT NULL,
  contact     VARCHAR(200)  NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ── SEED: Default Admin User ──────────────────────
-- Password: admin123 (bcrypt hashed — change in production!)
INSERT INTO users (name, email, password, role) VALUES
  ('Admin',  'admin@acs.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
