import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const MAX_DAILY_CAPACITY = 20;

app.use(express.json());

// Persistent JSON storage path
const DATA_DIR = path.join(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Interface for booking records
interface BookingRecord {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  dateStr: string; // YYYY-MM-DD
  createdAt: string;
}

// Ensure data directory and file exist
function ensureDataStore(): BookingRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(BOOKINGS_FILE)) {
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const content = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(content) as BookingRecord[];
  } catch (err) {
    console.error('Error reading bookings data store:', err);
    return [];
  }
}

// Persistent save helper
function saveBookings(bookings: BookingRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving bookings data store:', err);
  }
}

// Helper to get today's date string YYYY-MM-DD in local time
function getTodayDateStr(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// API Route: GET /api/slots
app.get('/api/slots', (_req, res) => {
  const bookings = ensureDataStore();
  const todayStr = getTodayDateStr();
  const todayBookings = bookings.filter((b) => b.dateStr === todayStr);
  const bookedCount = todayBookings.length;
  const remainingSlots = Math.max(0, MAX_DAILY_CAPACITY - bookedCount);
  const isSoldOut = remainingSlots <= 0;

  res.json({
    date: todayStr,
    maxCapacity: MAX_DAILY_CAPACITY,
    bookedCount,
    remainingSlots,
    isSoldOut,
  });
});

// API Route: POST /api/bookings
app.post('/api/bookings', (req, res) => {
  const { fullName, phoneNumber, emailAddress } = req.body || {};

  // Server-side validation
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required' });
  }
  if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }
  if (!emailAddress || typeof emailAddress !== 'string' || !emailAddress.trim()) {
    return res.status(400).json({ success: false, message: 'Email address is required' });
  }

  const cleanName = fullName.trim();
  const cleanPhone = phoneNumber.trim();
  const cleanEmail = emailAddress.trim().toLowerCase();

  // Atomic slot availability check
  const bookings = ensureDataStore();
  const todayStr = getTodayDateStr();
  const todayBookings = bookings.filter((b) => b.dateStr === todayStr);

  if (todayBookings.length >= MAX_DAILY_CAPACITY) {
    return res.status(409).json({
      success: false,
      message: 'Daily allocation of 20 slots is fully booked for today. Sold out!',
      remainingSlots: 0,
      isSoldOut: true,
    });
  }

  // Record new booking
  const newBooking: BookingRecord = {
    id: `hoy_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    fullName: cleanName,
    phoneNumber: cleanPhone,
    emailAddress: cleanEmail,
    dateStr: todayStr,
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  const updatedTodayBookings = bookings.filter((b) => b.dateStr === todayStr);
  const updatedBookedCount = updatedTodayBookings.length;
  const remainingSlots = Math.max(0, MAX_DAILY_CAPACITY - updatedBookedCount);

  res.json({
    success: true,
    message: 'Access pass successfully secured!',
    booking: newBooking,
    remainingSlots,
    bookedCount: updatedBookedCount,
    isSoldOut: remainingSlots <= 0,
  });
});

// Start Express and Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HOY Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
