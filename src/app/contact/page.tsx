"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, MapPin, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyCode: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-light px-3.5 py-1 rounded-full">
            <Phone className="w-4 h-4 text-brand-blue" />
            <span>Direct Land Specialists</span>
          </div>
          <h1 className="text-[1.75rem] leading-tight xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-ink tracking-tight font-sans">
            We’re Here to Help You Find Land
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions about county zoning, GPS coordinates, water wells, or our guaranteed seller-financing plans? Speak directly with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-brand-border shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-brand-ink">Contact Information</h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-sand text-brand-blue shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Phone / Text</span>
                    <a href="tel:18005555263" className="font-extrabold text-brand-ink hover:text-brand-blue text-base">
                      (800) 555-LAND
                    </a>
                    <span className="text-xs text-slate-500 block">Toll-free across the USA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-sand text-brand-forest shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Email Support</span>
                    <a href="mailto:support@onlinelandsales.com" className="font-bold text-brand-ink hover:text-brand-blue">
                      support@onlinelandsales.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-sand text-brand-clay shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">Support Hours</span>
                    <span className="font-semibold text-brand-ink">Monday – Friday: 8:00 AM – 6:00 PM MST</span>
                    <span className="text-xs text-slate-500 block">Weekend messages returned promptly</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-sand-light border border-brand-border space-y-1 text-xs">
                <span className="font-bold text-brand-ink block">Direct Land Owner & Seller</span>
                <span className="text-slate-600 leading-relaxed block">
                  Online Land Sales, LLC • In business since 2004 with 55,000+ acres sold.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 border border-brand-border shadow-card min-w-0">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-ink">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. One of our senior land specialists will contact you shortly by phone or email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-xl font-bold text-brand-ink mb-2">
                  Send a Message or Schedule a Call
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-ink uppercase tracking-wider block text-[11px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-brand-sand-light border border-brand-border rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-ink uppercase tracking-wider block text-[11px]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full bg-brand-sand-light border border-brand-border rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-ink uppercase tracking-wider block text-[11px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-brand-sand-light border border-brand-border rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-brand-ink uppercase tracking-wider block text-[11px]">
                      Property Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.propertyCode}
                      onChange={(e) => setFormData({ ...formData, propertyCode: e.target.value })}
                      placeholder="e.g. AZ-MOH-215-04"
                      className="w-full bg-brand-sand-light border border-brand-border rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-brand-ink uppercase tracking-wider block text-[11px]">
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what state you're interested in, your target monthly budget, or questions about zoning..."
                    className="w-full bg-brand-sand-light border border-brand-border rounded-xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-brand-blue outline-none leading-relaxed"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-5 h-5 mt-px shrink-0 rounded border-slate-300 text-brand-forest focus:ring-brand-forest"
                    />
                    <span className="text-[11px] text-slate-500 leading-tight">
                      I consent to receive phone calls and text messages from Online Land Sales regarding property details. Reply STOP to opt out anytime.
                    </span>
                  </label>
                </div>

                <Button
                  variant="forest"
                  size="lg"
                  type="submit"
                  className="w-full justify-center shadow-md font-bold mt-2"
                  disabled={!formData.consent}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Inquiry to Land Specialist
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
