// utils/emailService.js (in backend root directory)
const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter verification failed:', error.message);
  } else {
    console.log('✅ Email transporter is ready');
  }
});

// YOUR EXISTING EMOTIONAL TONE LOGIC (moved from client)
const getEmailToneFromEmotion = (emotionalResponse) => {
  const toneMap = {
    'overwhelmed-stressed': {
      tone: 'gentle',
      subject: 'Take it one step at a time',
      greeting: 'We understand this is a challenging time'
    },
    'hopeful-anxious': {
      tone: 'encouraging',
      subject: 'You\'re taking a great step forward',
      greeting: 'It\'s natural to feel both excited and nervous'
    },
    'exhausted-drained': {
      tone: 'supportive',
      subject: 'Rest is coming your way',
      greeting: 'You deserve support and care'
    },
    'excited-nervous': {
      tone: 'celebratory',
      subject: 'What an exciting journey ahead!',
      greeting: 'Congratulations on this new chapter'
    },
    'worried-future': {
      tone: 'reassuring',
      subject: 'One day at a time',
      greeting: 'We\'re here to help you through this'
    },
    'grateful-support': {
      tone: 'warm',
      subject: 'Your community is here for you',
      greeting: 'It\'s beautiful to see love in action'
    },
    'taking-one-day': {
      tone: 'steady',
      subject: 'Step by step support',
      greeting: 'Taking things day by day shows great wisdom'
    }
  };
  
  return toneMap[emotionalResponse] || toneMap['taking-one-day'];
};

// YOUR EXISTING EMAIL FUNCTION (enhanced with transporter and logging)
const sendPersonalizedWelcomeEmail = async (user, registry, category) => {
  console.log('Preparing personalized welcome email for:', user.email);
  console.log('Emotional response:', registry.emotionalResponse);
  
  const emailTone = getEmailToneFromEmotion(registry.emotionalResponse);
  console.log('Email tone selected:', emailTone.tone);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: `${emailTone.subject} - Your ${category.name} Registry is Ready`,
    html: `
      <h2>${emailTone.greeting}, ${user.firstName}!</h2>
      
      <p>Your "${registry.title}" registry has been created successfully.</p>
      
      <p><em>"You can now add services and share your registry with your support network."</em></p>
      
      <p><strong>Your registry link:</strong><br>
      <a href="${process.env.FRONTEND_URL}/registry/${registry.urlSlug}">
        ${process.env.FRONTEND_URL}/registry/${registry.urlSlug}
      </a></p>
      
      <h3>Next steps:</h3>
      <ol>
        <li>Add specific services that would help most</li>
        <li>Share your registry with friends and family</li>
        <li>Let the support flow in</li>
      </ol>
      
      <p>We're here if you need anything.</p>
      
      <p>With care,<br>
      The Servistry Team</p>
    `,
    text: `
Hi ${user.firstName},

${emailTone.greeting}. Your "${registry.title}" registry has been created successfully.

"You can now add services and share your registry with your support network."

Your registry link: ${process.env.FRONTEND_URL}/registry/${registry.urlSlug}

Next steps:
1. Add specific services that would help most
2. Share your registry with friends and family
3. Let the support flow in

We're here if you need anything.

With care,
The Servistry Team
    `
  };

  console.log('Sending personalized email with tone:', emailTone.tone);
  console.log('Subject:', mailOptions.subject);

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Personalized email sent successfully, Message ID:', info.messageId);
  return info;
};

module.exports = {
  sendPersonalizedWelcomeEmail,
  getEmailToneFromEmotion // Export in case other parts need it
}; 