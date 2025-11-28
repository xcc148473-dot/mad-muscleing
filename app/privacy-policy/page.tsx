
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-rose-500 hover:text-rose-400 font-bold flex items-center gap-2 mb-6 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: November 26, 2025</p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-rose-500 hover:prose-a:text-rose-400">
          <p>
            At Mad Muscleing, accessible from https://madmuscleing.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Mad Muscleing and how we use it.
          </p>

          <h2>Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>

          <h2>Information We Collect</h2>
          <p>
            The personal information that you are asked to provide (such as age, weight, height, and fitness goals), and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. This information is used solely for the purpose of generating your personalized fitness and meal plan.
          </p>

          <h2>Log Files</h2>
          <p>
            Mad Muscleing follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2>Cookies and Web Beacons</h2>
          <p>
            Like any other website, Mad Muscleing uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2>Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
          </p>

          <h2>Advertising Partners Privacy Policies (Ezoic & AdSense)</h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the advertising partners of Mad Muscleing.
          </p>
          <p>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Mad Muscleing, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            <strong>Note:</strong> Mad Muscleing has no access to or control over these cookies that are used by third-party advertisers.
          </p>
          <p>
            Specifically, this website uses <strong>Ezoic</strong> to manage third-party advertising. Ezoic may use various technologies to collect data about your usage of this site to provide relevant advertising. For more information about Ezoic's privacy practices, please visit <a href="https://g.ezoic.net/privacy/madmuscleing.com" target="_blank" rel="noopener noreferrer">Ezoic's Privacy Policy</a>.
          </p>

          <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul>
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>

          <h2>GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul>
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>

          <h2>Children's Information</h2>
          <p>
            Mad Muscleing does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@madmuscleing.com.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-center">
            <Link href="/" className="text-slate-500 hover:text-white transition-colors text-sm">
                &copy; {new Date().getFullYear()} Mad Muscleing. All Rights Reserved.
            </Link>
        </div>
      </div>
    </div>
  );
}
