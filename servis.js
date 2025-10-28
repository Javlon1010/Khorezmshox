const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Middleware
app.use(express.json());
app.use(express.static('public')); // Agar frontend fayllaringiz 'public' papkasida bo'lsa

// SMS yuborish endpointi
app.post('/api/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Forma ma'lumotlarini qabul qilish va saqlash
app.post('/api/applications', async (req, res) => {
  const { name, phone, course, message } = req.body;

  // Ma'lumotlarni saqlash (masalan, ma'lumotlar bazasiga)
  // Bu yerda faqat konsolga chiqaryapmiz
  console.log('Yangi ariza:', { name, phone, course, message });

  // SMS yuborish
  const smsMessage = `Hurmatli ${name}, Bilim Markazga arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz. +998901234567`;

  try {
    const smsResult = await client.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, applicationId: Date.now(), smsId: smsResult.sid });
  } catch (error) {
    console.error('SMS yuborishda xatolik:', error);
    res.status(500).json({ success: false, error: 'SMS yuborishda xatolik' });
  }
});

app.listen(port, () => {
  console.log(`Server ${port} portda ishlamoqda`);
});