'use client';

import { useRef } from 'react';
import { Mail } from 'lucide-react';
import { WhatsAppIcon } from './icons';

type Labels = {
  title: string;
  name: string;
  phone: string;
  type: string;
  types: string[];
  message: string;
  sendWhatsapp: string;
  sendEmail: string;
  note: string;
  greeting: string;
  subject: string;
};

const field =
  'mt-2 w-full border-0 bg-concrete px-4 py-3.5 text-graphite ring-1 ring-line outline-none transition placeholder:text-muted/60 focus:bg-white focus:ring-2 focus:ring-brand';

export default function ContactForm({ phone, email, labels }: { phone: string; email: string; labels: Labels }) {
  const form = useRef<HTMLFormElement>(null);

  const compose = () => {
    const data = new FormData(form.current!);
    return [
      labels.greeting,
      '',
      `${labels.name}: ${data.get('name') || '-'}`,
      `${labels.phone}: ${data.get('phone') || '-'}`,
      `${labels.type}: ${data.get('type') || '-'}`,
      '',
      String(data.get('message') || ''),
    ].join('\n');
  };

  const send = (via: 'whatsapp' | 'email') => {
    if (!form.current?.reportValidity()) return;
    const text = compose();
    if (via === 'whatsapp') {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(labels.subject)}&body=${encodeURIComponent(text)}`;
    }
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();
        send('whatsapp');
      }}
      className="relative bg-white p-6 text-graphite shadow-2xl sm:p-10"
    >
      <span className="absolute top-0 left-0 h-1.5 w-full bg-brand" aria-hidden="true" />
      <h3 className="font-display text-2xl font-extrabold">{labels.title}</h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          {labels.name}
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-semibold">
          {labels.phone}
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold">
        {labels.type}
        <select name="type" className={field} defaultValue={labels.types[0]}>
          {labels.types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-sm font-semibold">
        {labels.message}
        <textarea name="message" rows={4} className={`${field} resize-y`} />
      </label>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn bg-[#25D366] text-ink hover:brightness-95">
          <WhatsAppIcon className="h-5 w-5" /> {labels.sendWhatsapp}
        </button>
        <button type="button" onClick={() => send('email')} className="btn-dark">
          <Mail className="h-5 w-5" /> {labels.sendEmail}
        </button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{labels.note}</p>
    </form>
  );
}
