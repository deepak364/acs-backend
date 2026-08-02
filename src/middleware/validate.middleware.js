function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

const validateRegister = (req, res, next) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }
  if (name.length > 100) {
    return res.status(400).json({ message: 'Name must be under 100 characters.' });
  }
  req.body.name = sanitise(name);
  req.body.email = email.trim().toLowerCase();
  req.body.password = password; // never sanitise passwords — bcrypt handles them
  req.body.role = sanitise(role || 'user');

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid input format.' });
  }

  req.body.email = email.trim().toLowerCase();

  next();
};

const validateCampaign = (req, res, next) => {
  let { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'Title, description, and category are required.' });
  }
  if (title.length > 200) {
    return res.status(400).json({ message: 'Title must be under 200 characters.' });
  }

  req.body.title = sanitise(title);
  req.body.description = sanitise(description);
  req.body.category = sanitise(category);

  next();
};

const validateBusiness = (req, res, next) => {
  let { biz_name, description, category, contact } = req.body;

  if (!biz_name || !description || !category || !contact) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (biz_name.length > 200) {
    return res.status(400).json({ message: 'Business name must be under 200 characters.' });
  }

  req.body.biz_name = sanitise(biz_name);
  req.body.description = sanitise(description);
  req.body.category = sanitise(category);
  req.body.contact = sanitise(contact);

  next();
};

module.exports = { validateRegister, validateLogin, validateCampaign, validateBusiness };
