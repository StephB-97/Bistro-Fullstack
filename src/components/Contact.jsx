import { useState } from 'react';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setSubmitted(true);
      setForm(INITIAL);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const field = (name, label, type = 'text', isTextarea = false) => {
    const Tag = isTextarea ? 'textarea' : 'input';
    return (
      <div className="flex flex-col gap-1">
        <label className="text-[0.82rem] font-bold text-bistro-ink">{label}</label>
        <Tag
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          rows={isTextarea ? 5 : undefined}
          className={`w-full px-4 py-3 rounded-xl border-2 font-body text-[0.9rem]
                      bg-white text-bistro-ink outline-none transition-colors
                      ${errors[name] ? 'border-bistro-danger' : 'border-bistro-blueLite focus:border-bistro-blue'}`}
        />
        {errors[name] && (
          <span className="text-[0.75rem] text-bistro-danger font-semibold">{errors[name]}</span>
        )}
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="py-[100px] px-[5%] bg-gradient-to-b from-[#EBF4FD] to-bistro-bg"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            <p className="section-tag">📬 Get In Touch</p>
            <h2 className="section-title">
              We&apos;d Love to <em>Hear</em> from You
            </h2>
            <div className="divider" />

            {submitted && (
              <div className="mb-6 p-4 bg-bistro-greenLite border-2 border-bistro-green rounded-xl
                              text-bistro-green font-bold text-[0.9rem] text-center">
                ✅ Message sent — we&apos;ll be in touch!
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              {field('name', 'Your Name')}
              {field('email', 'Email Address', 'email')}
              {field('subject', 'Subject')}
              {field('message', 'Your Message', 'text', true)}
              <button type="submit" className="btn-gold self-start mt-2">
                Send Message 🐾
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-6">
            <div className="bg-white rounded-2xl border-2 border-bistro-blueLite p-8 shadow-card">
              <h3 className="font-display text-xl text-bistro-ink mb-4">📍 Visit Us</h3>
              <p className="text-bistro-subtle leading-[1.8] text-[0.93rem]">
                742 Evergreen Terrace, Springfield<br />
                Open Daily · Dog-Friendly Patio Available
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: '📞', text: '(555) 867-5309' },
                { icon: '✉️', text: 'hello@whiskeysbistro.com' },
                { icon: '🕐', text: 'Mon–Sat 8am–10pm · Sun 8am–8pm' },
              ].map((info) => (
                <div
                  key={info.text}
                  className="flex items-center gap-3 bg-bistro-bg border-2 border-bistro-blueLite
                             rounded-xl px-4 py-3"
                >
                  <span className="w-10 h-10 bg-bistro-blueLite rounded-full
                                   flex items-center justify-center text-xl flex-shrink-0">
                    {info.icon}
                  </span>
                  <span className="text-[0.93rem] text-bistro-subtle font-semibold">
                    {info.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
