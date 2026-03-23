'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactMessage } from '../lib/api';

const initialForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '',
};

export default function ContactCollaboration() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ type: '', message: '' });

    if (!form.first_name || !form.email || !form.service || !form.message) {
      setSubmitState({ type: 'error', message: 'Please fill all required fields.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await submitContactMessage(form);
      setForm(initialForm);
      if (result && result.email_sent === false) {
        setSubmitState({
          type: 'error',
          message: 'Your message was saved, but email delivery failed. Please use "Send Email Directly" below.',
        });
      } else {
        setSubmitState({
          type: 'success',
          message: 'Message sent successfully. I will get back to you soon.',
        });
      }
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Could not send right now. If this is a retry limit, please wait and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const directSubject = encodeURIComponent(`Collaboration Request: ${form.service || 'General Inquiry'}`);
  const directBody = encodeURIComponent(
    `Hi Manoj,\n\n` +
      `Name: ${form.first_name} ${form.last_name}`.trim() +
      `\nEmail: ${form.email}` +
      `\nPhone: ${form.phone || '-'}\n` +
      `Service: ${form.service || '-'}\n\n` +
      `${form.message || 'I would like to discuss a project collaboration.'}\n`
  );
  const directMailHref = `mailto:manojagrahari7521@gmail.com?subject=${directSubject}&body=${directBody}`;

  return (
    <section className="bg-[#0a0a0a] pb-24 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl border border-slate-700/40 bg-[#232430] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <h3 className="text-[#11f7ac] text-4xl sm:text-5xl font-bold font-mono tracking-wide mb-6">
          Let&apos;s Work together
        </h3>

        <p className="text-slate-300/90 text-lg leading-10 max-w-3xl mb-8 sm:mb-10">
          I&apos;m always open to collaborating on innovative projects,
          internships, and opportunities to build impactful digital
          solutions.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Firstname"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full h-14 rounded-lg border border-slate-800 bg-[#171924] px-5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#11f7ac]/60"
              aria-label="Firstname"
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full h-14 rounded-lg border border-slate-800 bg-[#171924] px-5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#11f7ac]/60"
              aria-label="Lastname"
            />
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-14 rounded-lg border border-slate-800 bg-[#171924] px-5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#11f7ac]/60"
              aria-label="Email address"
              required
            />
            <input
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full h-14 rounded-lg border border-slate-800 bg-[#171924] px-5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#11f7ac]/60"
              aria-label="Phone number"
            />
          </div>

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full h-14 rounded-lg border border-slate-600 bg-[#171924] px-5 text-slate-100 focus:outline-none focus:border-[#11f7ac]/60"
            aria-label="Select a service"
            required
          >
            <option value="" disabled className="bg-[#171924] text-slate-100">
              Select a service
            </option>
            <option value="web-development" className="bg-[#171924] text-slate-100">Web Development</option>
            <option value="data-science" className="bg-[#171924] text-slate-100">Data Science</option>
            <option value="android-development" className="bg-[#171924] text-slate-100">Android Development</option>
            <option value="other" className="bg-[#171924] text-slate-100">Other Collaboration</option>
          </select>

          <textarea
            rows={7}
            placeholder="Type your message here..."
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-600 bg-[#171924] px-5 py-4 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#11f7ac]/60 resize-y"
            aria-label="Message"
            required
          />

          {submitState.message ? (
            <p className={submitState.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}>
              {submitState.message}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#11f7ac] px-9 text-lg font-semibold text-[#0d1a13] transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={directMailHref}
              className="inline-flex items-center justify-center rounded-lg border border-slate-500/60 px-4 py-2 text-sm text-slate-200 hover:border-[#11f7ac]/60 hover:text-[#11f7ac] transition-colors"
            >
              Send Email Directly
            </a>
            <a
              href="tel:+917307683053"
              className="inline-flex items-center justify-center rounded-lg border border-slate-500/60 px-4 py-2 text-sm text-slate-200 hover:border-[#11f7ac]/60 hover:text-[#11f7ac] transition-colors"
            >
              Call Now
            </a>
          </div>
        </form>
      </motion.div>
    </section>
  );
}