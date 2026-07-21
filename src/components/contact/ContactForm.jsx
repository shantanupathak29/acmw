import React, { useState, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../../config/emailConfig';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // EmailJS configuration check
      if (emailConfig.serviceId === 'your_service_id' || 
          emailConfig.templateId === 'your_template_id' || 
          emailConfig.publicKey === 'your_public_key') {
        throw new Error('Please configure EmailJS credentials in src/config/emailConfig.js');
      }

      // Prepare email parameters
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        message: formData.message.trim(),
        to_email: emailConfig.targetEmail, // Your target email
        reply_to: formData.email.trim(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      console.log('Email sent successfully:', response);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        setFieldErrors({});
      }, 5000);

    } catch (error) {
      console.error('Failed to send email:', error);
      setIsSubmitting(false);
      setSubmitError(error.message || 'Failed to send message. Please try again.');
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setSubmitError(null);
      }, 5000);
    }
  };

  const inputFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Your Full Name',
      icon: User,
      required: true
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'your.email@example.com',
      icon: Mail,
      required: true
    }
  ];

  if (isSubmitted) {
    return (
      <div id="contact-form" className="relative group overflow-hidden bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md border border-green-500/30 rounded-3xl p-8 transform transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-3xl"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 text-lg">Your message has been sent successfully to {emailConfig.targetEmail}. We'll get back to you soon!</p>
        </div>
      </div>
    );
  }

  if (submitError) {
    return (
      <div id="contact-form" className="relative group overflow-hidden bg-gradient-to-br from-red-900/40 to-rose-900/40 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 transform transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-rose-600/10 rounded-3xl"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <AlertCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Oops!</h2>
          <p className="text-gray-300 text-lg mb-6">{submitError}</p>
          <button
            onClick={() => setSubmitError(null)}
            className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      id="contact-form"
      onSubmit={handleSubmit} 
      className={`relative group overflow-hidden bg-gradient-to-br from-violet-900/40 to-cyan-900/40 backdrop-blur-md border border-violet-500/30 rounded-3xl p-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'} hover:scale-105 hover:rotate-1`}
      style={{ fontFamily: 'Figtree, system-ui, -apple-system, sans-serif' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-cyan-600/0 group-hover:from-violet-600/10 group-hover:to-cyan-600/10 transition-all duration-500 rounded-3xl"></div>
      
      {/* Floating orb */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-3xl border border-violet-500/20 animate-pulse"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-180 transition-transform duration-500 shadow-lg">
            <Send className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
              Send Message
            </h2>
            <p className="text-sm text-gray-400 mt-1">We'd love to hear from you</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Input fields */}
          {inputFields.map(({ name, type, placeholder, icon: Icon, required }, index) => (
            <div key={name} className={`relative group/input transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${focusedField === name ? 'text-cyan-400' : fieldErrors[name] ? 'text-red-400' : 'text-violet-400'}`} />
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                onFocus={() => setFocusedField(name)}
                onBlur={() => setFocusedField(null)}
                required={required}
                className={`w-full bg-gray-800/50 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:border-transparent ${
                  fieldErrors[name] 
                    ? 'border-red-500 ring-red-500/50 bg-red-900/20' 
                    : focusedField === name 
                      ? 'border-cyan-500 ring-cyan-500/50 bg-gray-800/70' 
                      : 'border-gray-700 focus:ring-violet-500 focus:border-violet-500'
                }`}
                style={focusedField === name ? {
                  background: fieldErrors[name] 
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.2)), rgba(31, 41, 55, 0.7)'
                    : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)), rgba(31, 41, 55, 0.7)'
                } : {}}
                placeholder={placeholder}
              />
              {/* Remove the separate highlight div */}
              {/* Error message */}
              {fieldErrors[name] && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Message textarea */}
          <div className={`relative group/input transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <MessageSquare className={`absolute left-4 top-4 h-5 w-5 transition-all duration-300 ${focusedField === 'message' ? 'text-cyan-400' : fieldErrors.message ? 'text-red-400' : 'text-violet-400'}`} />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              required
              className={`w-full bg-gray-800/50 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:border-transparent resize-none ${
                fieldErrors.message 
                  ? 'border-red-500 ring-red-500/50 bg-red-900/20' 
                  : focusedField === 'message' 
                    ? 'border-cyan-500 ring-cyan-500/50 bg-gray-800/70' 
                    : 'border-gray-700 focus:ring-violet-500 focus:border-violet-500'
              }`}
              style={focusedField === 'message' ? {
                background: fieldErrors.message 
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.2)), rgba(31, 41, 55, 0.7)'
                  : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)), rgba(31, 41, 55, 0.7)'
              } : {}}
              placeholder="Tell us about your project, question, or just say hello..."
            />
            {/* Remove the separate highlight div */}
            {/* Error message */}
            {fieldErrors.message && (
              <p className="mt-2 text-sm text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full group/button relative overflow-hidden bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-600 cubic-bezier(0.4, 0, 0.2, 1) transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? 'scale-95' : 'hover:scale-105'}`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5 group-hover/button:rotate-12 transition-transform duration-500 ease-out" />
                    Send Message
                  </>
                )}
              </span>
              
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1200 ease-out"></div>
              
              {/* Pulsing border */}
              <div className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover/button:opacity-100 animate-pulse transition-opacity duration-500 ease-out"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Card hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </form>
  );
};

export default ContactForm;
