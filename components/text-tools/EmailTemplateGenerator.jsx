'use client';

import { useState, useMemo } from 'react';

const EMAIL_TEMPLATES = {
  complaint: {
    formal: `Dear {recipient},

I am writing to formally lodge a complaint regarding {details}.

{specifics}

I expect this matter to be resolved promptly. Please contact me within 5 business days to discuss how this will be addressed.

Thank you for your immediate attention to this matter.

Best regards`,
    professional: `Hi {recipient},

I wanted to bring to your attention an issue that occurred {details}.

{specifics}

Could we schedule a time to discuss this? I'm confident we can find a solution together.

Thanks for looking into this.

Best`,
    friendly: `Hey {recipient},

I wanted to let you know about something that happened {details}.

{specifics}

Let me know what you think and how we can fix this. Thanks for your help!

Cheers`
  },
  request: {
    formal: `Dear {recipient},

I hope this email finds you well. I am writing to request {details}.

{specifics}

I would greatly appreciate your assistance with this matter. Please let me know if you need any additional information.

Thank you for your consideration.

Best regards`,
    professional: `Hi {recipient},

I wanted to reach out and see if you could help with {details}.

{specifics}

Would this be possible? Let me know if you have any questions.

Thanks`,
    friendly: `Hey {recipient},

Hope you're doing well! I was wondering if you could help me with {details}?

{specifics}

Let me know if this works for you. Thanks so much!

Cheers`
  },
  thankYou: {
    formal: `Dear {recipient},

I wanted to take a moment to express my sincere gratitude for {details}.

{specifics}

Your contribution has been invaluable. I truly appreciate your time and effort.

Thank you again.

Best regards`,
    professional: `Hi {recipient},

A quick note to say thank you for {details}.

{specifics}

I really appreciate your support on this.

Thanks`,
    friendly: `Hey {recipient},

Just wanted to say thanks for {details}!

{specifics}

You're awesome. Cheers!`
  },
  followUp: {
    formal: `Dear {recipient},

I hope this email finds you well. I am following up on my previous message regarding {details}.

{specifics}

I would appreciate your response at your earliest convenience. Please let me know if you require any clarification.

Thank you.

Best regards`,
    professional: `Hi {recipient},

Quick follow-up on {details}.

{specifics}

Let me know if you need anything else from me.

Thanks`,
    friendly: `Hey {recipient},

Just checking in on {details}.

{specifics}

Let me know when you get a chance!

Cheers`
  },
  introduction: {
    formal: `Dear {recipient},

Allow me to introduce myself. My name is {specifics} and I am reaching out regarding {details}.

I believe there may be an opportunity for us to work together. I would welcome the chance to discuss this further at your convenience.

Thank you for considering this introduction.

Best regards`,
    professional: `Hi {recipient},

I wanted to reach out and introduce myself. I'm {specifics} and I'm interested in {details}.

I think there could be a great fit here. Would you be open to a quick chat?

Looking forward to hearing from you`,
    friendly: `Hey {recipient},

Wanted to say hi! I'm {specifics} and I'm all about {details}.

I think we could do some cool stuff together. Would love to chat sometime!

Cheers`
  },
  apology: {
    formal: `Dear {recipient},

I sincerely apologize for {details}.

{specifics}

I take full responsibility for this matter and am committed to ensuring it does not happen again. Thank you for your understanding and patience.

Best regards`,
    professional: `Hi {recipient},

I wanted to apologize for {details}.

{specifics}

I've already taken steps to prevent this from happening again. Thanks for understanding.

Best`,
    friendly: `Hey {recipient},

I'm really sorry about {details}.

{specifics}

I'm going to make sure this doesn't happen again. Thanks for being cool about it!

Cheers`
  },
  resignation: {
    formal: `Dear {recipient},

Please accept this letter as formal notice of my resignation from my position, effective {details}.

{specifics}

I have valued the opportunity to work with you and the team. I am committed to ensuring a smooth transition.

Thank you for the experience and support.

Best regards`,
    professional: `Hi {recipient},

I wanted to let you know that I've decided to move on from my role here, effective {details}.

{specifics}

I've really appreciated working with you. Let me know how I can help with the transition.

Best`,
    friendly: `Hey {recipient},

Just giving you a heads up that I'm moving on, effective {details}.

{specifics}

It's been great working with you. Let me know what I can do to help wrap things up!

Cheers`
  }
};

export default function EmailTemplateGenerator() {
  const [type, setType] = useState('thankYou');
  const [tone, setTone] = useState('professional');
  const [recipient, setRecipient] = useState('');
  const [details, setDetails] = useState('');
  const [specifics, setSpecifics] = useState('');

  const email = useMemo(() => {
    if (!EMAIL_TEMPLATES[type] || !EMAIL_TEMPLATES[type][tone]) return '';

    let template = EMAIL_TEMPLATES[type][tone];
    template = template.replace('{recipient}', recipient || '[Recipient Name]');
    template = template.replace('{details}', details || '[details]');
    template = template.replace('{specifics}', specifics || '[Add more details here]');

    return template;
  }, [type, tone, recipient, details, specifics]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Configuration */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Type */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Email Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="thankYou">Thank You</option>
            <option value="complaint">Complaint</option>
            <option value="request">Request</option>
            <option value="followUp">Follow Up</option>
            <option value="introduction">Introduction</option>
            <option value="apology">Apology</option>
            <option value="resignation">Resignation</option>
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="formal">Formal</option>
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="e.g., John, Ms. Smith"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="text-text-secondary text-sm font-medium">
            Main Details
          </label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Brief main topic"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="text-text-secondary text-sm font-medium">
            Additional Details
          </label>
          <textarea
            value={specifics}
            onChange={(e) => setSpecifics(e.target.value)}
            placeholder="Add more context or specifics..."
            className="w-full mt-2 min-h-[100px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-sans text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <p className="text-text-secondary text-sm font-medium mb-3">
          Email Preview
        </p>
        <div className="bg-white rounded-[var(--radius-input)] border border-border p-4 max-h-[300px] overflow-y-auto">
          <p className="font-sans text-text-primary whitespace-pre-wrap text-sm leading-relaxed">
            {email}
          </p>
        </div>
        <button
          onClick={handleCopyEmail}
          className="w-full mt-3 rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          Copy Email
        </button>
      </div>
    </div>
  );
}
