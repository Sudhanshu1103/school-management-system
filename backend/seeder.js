const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env vars
dotenv.config({ path: path.join(__dirname, 'config', '.env') });
dotenv.config();

const Contact = require('./models/Contact');
const Event = require('./models/Event');
const Gallery = require('./models/Gallery');
const Notice = require('./models/Notice');
const Teacher = require('./models/Teacher');
const User = require('./models/User');

const dataDir = path.join(__dirname, '..', '_data');

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/school_db');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing
    await Contact.deleteMany();
    await Event.deleteMany();
    await Gallery.deleteMany();
    await Notice.deleteMany();
    await Teacher.deleteMany();
    await User.deleteMany();

    console.log('Existing collections cleared.');

    // Contacts
    if (fs.existsSync(path.join(dataDir, 'contact.json'))) {
      const contacts = JSON.parse(fs.readFileSync(path.join(dataDir, 'contact.json'), 'utf-8'));
      await Contact.insertMany(contacts);
      console.log(`Seeded ${contacts.length} Contacts`);
    }

    // Events
    if (fs.existsSync(path.join(dataDir, 'event.json'))) {
      const events = JSON.parse(fs.readFileSync(path.join(dataDir, 'event.json'), 'utf-8'));
      await Event.insertMany(events);
      console.log(`Seeded ${events.length} Events`);
    }

    // Gallery
    if (fs.existsSync(path.join(dataDir, 'gallery.json'))) {
      const galleries = JSON.parse(fs.readFileSync(path.join(dataDir, 'gallery.json'), 'utf-8'));
      await Gallery.insertMany(galleries);
      console.log(`Seeded ${galleries.length} Gallery items`);
    }

    // Notice
    if (fs.existsSync(path.join(dataDir, 'notice.json'))) {
      const notices = JSON.parse(fs.readFileSync(path.join(dataDir, 'notice.json'), 'utf-8'));
      await Notice.insertMany(notices);
      console.log(`Seeded ${notices.length} Notices`);
    }

    // Teacher
    if (fs.existsSync(path.join(dataDir, 'teacher.json'))) {
      const teachers = JSON.parse(fs.readFileSync(path.join(dataDir, 'teacher.json'), 'utf-8'));
      await Teacher.insertMany(teachers);
      console.log(`Seeded ${teachers.length} Teachers`);
    }

    // Additional users from the local seed data. Passwords are hashed by the model hook.
    if (fs.existsSync(path.join(dataDir, 'user.json'))) {
      const users = JSON.parse(fs.readFileSync(path.join(dataDir, 'user.json'), 'utf-8'));
      await User.insertMany(users);
      console.log(`Seeded ${users.length} Users`);
    }

    // Admin User
    const adminUser = new User({
      name: 'School Administrator',
      email: 'admin@school.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Seeded Admin User (admin@school.com / admin123)');

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

importData();
