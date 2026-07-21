// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create a free account
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create a new email template
// 5. Get your Service ID, Template ID, and Public Key
// 6. Replace the values below with your actual credentials
// 7. For production, use environment variables (see .env.example)

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_rksv8u9',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ze3tqr6',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'WcM_DNLn9_1eJx_Si',
  targetEmail: import.meta.env.VITE_TARGET_EMAIL || 'upesacmpr@gmail.com',

  // Email template should include these variables:
  // {{from_name}} - sender's name
  // {{from_email}} - sender's email
  // {{message}} - message content
  // {{to_email}} - recipient email (info.upesacm@gmail.com)
  // {{reply_to}} - reply-to email
};