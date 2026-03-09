import React from 'react';
import { Helmet } from 'react-helmet-async';

export function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>About Us - DevConvert</title>
        <meta name="description" content="Learn more about DevConvert, the ultimate privacy-focused developer utility belt." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">About DevConvert</h1>
      <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-400 max-w-none space-y-6">
        <p className="text-lg">
          DevConvert is a free, open-source collection of developer utilities designed to be fast, minimal, and private.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Privacy First</h2>
        <p>
          Unlike many other online tools, DevConvert processes all your data locally in your browser. We don't have a backend that stores your JSON, CSV, or Base64 data. Your secrets stay on your machine.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Our Mission</h2>
        <p>
          To provide developers with a clean, ad-light, and highly functional workspace for everyday conversion tasks. We believe that simple tools should be free, fast, and secure.
        </p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Privacy Policy - DevConvert</title>
        <meta name="description" content="DevConvert Privacy Policy. We value your privacy and process all data client-side." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">Privacy Policy</h1>
      <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-400 max-w-none space-y-6">
        <p>Last updated: March 6, 2026</p>
        <p>
          Your privacy is important to us. DevConvert is designed to be a "client-side only" application. This policy explains how we handle your data and our use of third-party services.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Data Collection and Processing</h2>
        <p>
          We do not collect, store, or transmit any personal data or the information you input into our tools. All data processing (such as JSON formatting, Base64 encoding, or JWT decoding) happens entirely within your browser's memory using JavaScript. No data is sent to our servers for processing.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Cookies and Local Storage</h2>
        <p>
          We use browser local storage to save your theme preference (dark or light mode). This data remains on your device and is not shared with us.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Third-Party Advertising</h2>
        <p>
          We use Google AdSense to serve advertisements on our website. Google may use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
        </p>
        <p>
          Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.aboutads.info</a>.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Analytics</h2>
        <p>
          We may use basic analytics to understand general traffic patterns. This data is anonymized and does not include any personal information or tool input data.
        </p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Terms of Service - DevConvert</title>
        <meta name="description" content="Terms of Service for using DevConvert developer tools." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">Terms of Service</h1>
      <div className="prose dark:prose-invert text-zinc-600 dark:text-zinc-400 max-w-none space-y-6">
        <p>
          By using DevConvert, you agree to these terms.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Disclaimer</h2>
        <p>
          The tools are provided "as is" without warranty of any kind. While we strive for accuracy, we are not responsible for any data loss, errors, or security issues resulting from the use of these tools.
        </p>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Usage</h2>
        <p>
          You are free to use these tools for personal or commercial purposes. You may not use this site for any illegal activities or to transmit malicious code.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Contact Us - DevConvert</title>
        <meta name="description" content="Get in touch with the DevConvert team for suggestions or bug reports." />
      </Helmet>
      <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">Contact Us</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
        Have a suggestion for a new tool or found a bug? We'd love to hear from you.
      </p>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Email Address</label>
            <input type="email" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 outline-none focus:border-indigo-500 transition-all dark:text-white" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">Message</label>
            <textarea className="w-full p-4 h-40 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 outline-none focus:border-indigo-500 transition-all dark:text-white" placeholder="How can we help?"></textarea>
          </div>
          <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
