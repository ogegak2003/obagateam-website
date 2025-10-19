import express from 'express';
import Contact from '../models/Contact.js';
import { contactValidation, validate } from '../middleware/validation.js';

const router = express.Router();

// Submit contact form
router.post('/contact', contactValidation, validate, async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;
    
    const contact = new Contact({
      name,
      email,
      company,
      service,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // In production, you would send an email notification here
    console.log(`New contact form submission from: ${name} <${email}>`);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// Get contact form submissions (protected route - for admin)
router.get('/contacts', async (req, res) => {
  try {
    // Basic authentication check (in production, use proper auth)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

export default router;