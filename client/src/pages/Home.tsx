import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  CreditCard,
  HelpCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
  Trophy,
  Users,
  X,
} from "lucide-react";

const poster = "/match-poster.png";

const tiers = [
  {
    id: "grandstand",
    name: "Grandstand",
    price: 35,
    accent: "cool",
    description: "High-energy views from the main bowl.",
    benefits: ["Reserved seat", "Stadium atmosphere", "Mobile E-ticket"],
    availability: "Selling fast",
  },
  {
    id: "premium",
    name: "Premium",
    price: 65,
    accent: "hot",
    description: "Elevated sightlines, closer to the action.",
    benefits: ["Premium reserved seat", "Dedicated entry lane", "Mobile E-ticket"],
    availability: "Best value",
  },
  {
    id: "vip",
    name: "VIP Lounge",
    price: 140,
    accent: "gold",
    description: "A matchday experience with room to breathe.",
    benefits: ["Lounge access", "Premium padded seat", "Priority entry"],
    availability: "Limited release",
  },
] as const;

type TierId = (typeof tiers)[number]["id"];
type CheckoutStep = "details" | "payment" | "success";

const formatKes = (value: number) => `KES ${value.toLocaleString("en-KE")}`;

export default function Home() {
  const [quantities, setQuantities] = useState<Record<TierId, number>>({
    grandstand: 0,
    premium: 1,
    vip: 0,
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("details");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [orderRef, setOrderRef] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedItems = useMemo(
    () => tiers.filter((tier) => quantities[tier.id] > 0),
    [quantities],
  );
  const ticketCount = useMemo(
    () => Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0),
    [quantities],
  );
  const subtotal = useMemo(
    () => selectedItems.reduce((sum, tier) => sum + tier.price * quantities[tier.id], 0),
    [quantities, selectedItems],
  );
  const serviceFee = ticketCount > 0 ? Math.round(subtotal * 0.06) : 0;
  const total = subtotal + serviceFee;

  const updateQuantity = (id: TierId, delta: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.min(8, Math.max(0, current[id] + delta)),
    }));
  };

  const openCheckout = () => {
    setError("");
    setCheckoutStep("details");
    setCheckoutOpen(true);
  };

  const continueToPayment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.phone.trim()) {
      setError("Please add your name, a valid email, and phone number to continue.");
      return;
    }
    setError("");
    setCheckoutStep("payment");
  };

  const confirmPayment = () => {
    setProcessing(true);
    setError("");
    window.setTimeout(() => {
      setProcessing(false);
      setOrderRef(`MP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 899999)}`);
      setCheckoutStep("success");
    }, 1200);
  };

  const copyReference = async () => {
    await navigator.clipboard?.writeText(orderRef);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="site-shell">
      <div className="topline">
        <div className="topline-inner">
          <span><span className="live-dot" /> Tickets are now on sale</span>
          <span className="topline-note">5 January 2027 <span className="topline-separator">/</span> Nairobi, Kenya</span>
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="MatchPass home">
          <span className="brand-mark"><Ticket size={18} strokeWidth={2.5} /></span>
          <span className="brand-word">MATCH<span>PASS</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#tickets">Tickets</a>
          <a href="#match-info">Match info</a>
          <a href="#faq">Need help?</a>
        </nav>
        <button className="header-cta" onClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}>
          Get tickets <ArrowRight size={16} />
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> The fixture of the summer</div>
          <h1>YOUR SEAT<br /><span>TO THE MOMENT.</span></h1>
          <p className="hero-intro">Bayern Munich meets Ajax under the Nairobi lights. Be in the stands when two football giants share one unforgettable night.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => document.getElementById("tickets")?.scrollIntoView({ behavior: "smooth" })}>
              Choose your seats <ArrowRight size={18} />
            </button>
            <a className="text-link" href="#match-info">Explore the match <ChevronDown size={15} /></a>
          </div>
          <div className="hero-details">
            <div><span className="detail-label">DATE</span><strong>05 JAN 2027</strong></div>
            <div><span className="detail-label">KICK-OFF</span><strong>7:00 PM EAT</strong></div>
            <div><span className="detail-label">VENUE</span><strong>RAILA ODINGA STADIUM</strong></div>
          </div>
        </div>
        <div className="hero-art-wrap">
          <div className="art-stamp">MP<br /><span>27</span></div>
          <div className="hero-art-frame">
            <img src={poster} alt="Bayern Munich vs Ajax match poster" className="hero-art" />
            <div className="art-overlay" />
          </div>
          <div className="art-caption"><span>01</span><span>RAILA ODINGA INTERNATIONAL STADIUM</span></div>
        </div>
      </section>

      <section className="match-strip" id="match-info">
        <div className="strip-item"><div className="strip-icon"><MapPin size={18} /></div><div><span>WHERE</span><strong>Talanta Sports City<br />Nairobi, Kenya</strong></div></div>
        <div className="strip-item"><div className="strip-icon"><Clock3 size={18} /></div><div><span>WHEN</span><strong>Wednesday<br />5 January 2027</strong></div></div>
        <div className="strip-item"><div className="strip-icon"><Users size={18} /></div><div><span>GOOD TO KNOW</span><strong>Gates open<br />from 4:00 PM EAT</strong></div></div>
        <div className="strip-item trust-item"><div className="strip-icon"><ShieldCheck size={18} /></div><div><span>WHY MATCHPASS</span><strong>Verified tickets.<br />Secure checkout.</strong></div></div>
      </section>

      <section className="tickets-section" id="tickets">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> Pick your view</div><h2>ONE NIGHT.<br /><em>THREE WAYS IN.</em></h2></div>
          <p>Every ticket is a reserved seat with a mobile E-ticket delivered to your inbox after payment confirmation.</p>
        </div>

        <div className="tickets-layout">
          <div className="tier-list">
            {tiers.map((tier, index) => (
              <article className={`tier-card ${quantities[tier.id] > 0 ? "selected" : ""} tier-${tier.accent}`} key={tier.id}>
                <div className="tier-number">0{index + 1}</div>
                <div className="tier-main"><div className="tier-topline"><h3>{tier.name}</h3><span className="availability">{tier.availability}</span></div><p>{tier.description}</p><ul>{tier.benefits.map((benefit) => <li key={benefit}><Check size={14} />{benefit}</li>)}</ul></div>
                <div className="tier-buy"><strong>{formatKes(tier.price)}</strong><span>per ticket</span><div className="quantity-control"><button aria-label={`Remove one ${tier.name} ticket`} onClick={() => updateQuantity(tier.id, -1)}><Minus size={15} /></button><span>{quantities[tier.id]}</span><button aria-label={`Add one ${tier.name} ticket`} onClick={() => updateQuantity(tier.id, 1)}><Plus size={15} /></button></div></div>
              </article>
            ))}
            <div className="ticket-note"><LockKeyhole size={16} /><span>All prices include VAT. A 6% secure processing fee is added at checkout.</span></div>
          </div>

          <aside className="summary-card" aria-label="Your ticket summary">
            <div className="summary-top"><span className="summary-kicker">YOUR MATCHDAY</span><span className="summary-status"><span className="status-dot" /> LIVE</span></div>
            <div className="summary-match"><div className="summary-team"><div className="team-crest bayern">FCB</div><span>BAYERN</span></div><span className="summary-vs">VS</span><div className="summary-team"><div className="team-crest ajax">AFC</div><span>AJAX</span></div></div>
            <div className="summary-date"><strong>05</strong><span><b>JANUARY 2027</b><small>Raila Odinga Stadium</small></span></div>
            <div className="summary-lines">{selectedItems.length === 0 ? <div className="empty-summary">Choose a ticket tier to get started.</div> : selectedItems.map((tier) => <div className="summary-line" key={tier.id}><span>{tier.name} × {quantities[tier.id]}</span><strong>{formatKes(tier.price * quantities[tier.id])}</strong></div>)}{ticketCount > 0 && <><div className="summary-line muted"><span>Secure processing fee</span><strong>{formatKes(serviceFee)}</strong></div><div className="summary-total"><span>TOTAL</span><strong>{formatKes(total)}</strong></div></>}</div>
            <button className="button button-summary" disabled={ticketCount === 0} onClick={openCheckout}>{ticketCount === 0 ? "Select tickets" : `Continue · ${ticketCount} ${ticketCount === 1 ? "ticket" : "tickets"}`}<ArrowRight size={17} /></button>
            <div className="summary-foot"><ShieldCheck size={15} /><span>Your payment is protected. E-tickets are emailed after confirmation.</span></div>
          </aside>
        </div>
      </section>

      <section className="confidence-section">
        <div className="confidence-copy"><div className="eyebrow"><span className="eyebrow-line" /> The MatchPass promise</div><h2>MORE THAN<br /><em>A TICKET.</em></h2><p>We keep your matchday simple: real tickets, a secure checkout, and a clear delivery promise. No queues, no guesswork — just show up ready for kick-off.</p><a className="text-link" href="#faq">Read the FAQs <ArrowRight size={15} /></a></div>
        <div className="confidence-grid"><div><Trophy size={22} /><h3>Officially verified</h3><p>Your ticket is issued for this fixture and checked before delivery.</p></div><div><CreditCard size={22} /><h3>Secure by design</h3><p>Your payment details stay protected throughout checkout.</p></div><div><Mail size={22} /><h3>Inbox, not inboxed</h3><p>Your E-ticket lands in your email once payment is confirmed.</p></div></div>
      </section>

      <section className="faq-section" id="faq"><div className="faq-heading"><div className="eyebrow"><span className="eyebrow-line" /> Need the details?</div><h2>GOOD TO<br /><em>KNOW.</em></h2></div><div className="faq-list"><details open><summary>When will I receive my E-ticket? <Plus size={17} /></summary><p>Your E-ticket is sent to the email address entered at checkout as soon as your payment is confirmed. Please check your spam or promotions folder if you do not see it within a few minutes.</p></details><details><summary>Can I buy more than one ticket? <Plus size={17} /></summary><p>Yes. You can purchase up to eight tickets per tier in a single order. Each ticket is delivered digitally and can be shown from your phone at the gate.</p></details><details><summary>What time should I arrive? <Plus size={17} /></summary><p>Gates open at 4:00 PM EAT. We recommend arriving early so you can clear security and find your seat before the 7:00 PM kick-off.</p></details></div></section>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark"><Ticket size={18} strokeWidth={2.5} /></span><span className="brand-word">MATCH<span>PASS</span></span><p>Your seat to the moment.</p></div><div className="footer-right"><span>© 2027 MatchPass</span><span>Raila Odinga Stadium · Nairobi</span><a href="mailto:hello@matchpass.ke">hello@matchpass.ke</a></div></footer>

      {checkoutOpen && <div className="checkout-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && checkoutStep !== "success") setCheckoutOpen(false); }}><section className="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div className="checkout-header"><div><span className="summary-kicker">MATCHPASS CHECKOUT</span><h2 id="checkout-title">{checkoutStep === "success" ? "YOU'RE IN." : checkoutStep === "payment" ? "SECURE PAYMENT." : "MAKE IT OFFICIAL."}</h2></div>{checkoutStep !== "success" && <button className="close-button" aria-label="Close checkout" onClick={() => setCheckoutOpen(false)}><X size={20} /></button>}</div>{checkoutStep !== "success" && <div className="checkout-progress"><span className={checkoutStep === "details" ? "active" : "complete"}>01 <b>Details</b></span><i /><span className={checkoutStep === "payment" ? "active" : ""}>02 <b>Payment</b></span></div>}{checkoutStep === "details" && <form className="checkout-form" onSubmit={continueToPayment}><p className="checkout-intro">Tell us where to send your tickets. We'll only use these details for this order.</p><label>Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Amina Otieno" /></label><label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><div className="form-row"><label>Phone number<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+254 7XX XXX XXX" /></label><label>City <span className="optional">optional</span><input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="Nairobi" /></label></div>{error && <div className="form-error">{error}</div>}<button className="button button-primary full-button" type="submit">Continue to payment <ArrowRight size={17} /></button><p className="privacy-note"><LockKeyhole size={14} /> Your information is encrypted and never sold.</p></form>}{checkoutStep === "payment" && <div className="payment-view"><div className="payable-card"><span>PAYABLE NOW</span><strong>{formatKes(total)}</strong><small>{ticketCount} {ticketCount === 1 ? "ticket" : "tickets"} · {form.email}</small></div><div className="demo-payment"><div className="demo-payment-icon"><CreditCard size={20} /></div><div><strong>Demo secure checkout</strong><p>Live payment is not connected in preview. This simulates a successful card authorization.</p></div><span className="demo-badge">PREVIEW</span></div>{error && <div className="form-error">{error}</div>}<button className="button button-primary full-button" disabled={processing} onClick={confirmPayment}>{processing ? <>Processing payment… <span className="button-spinner" /></> : <>Pay {formatKes(total)} <ArrowRight size={17} /></>}</button><button className="back-link" onClick={() => setCheckoutStep("details")}>← Back to details</button><p className="privacy-note"><LockKeyhole size={14} /> Secure payment simulation for this preview experience.</p></div>}{checkoutStep === "success" && <div className="success-view"><div className="success-icon"><Check size={30} /></div><p className="success-kicker">PAYMENT CONFIRMED</p><h3>Your matchday is locked in.</h3><p className="success-copy">We’ll send your E-ticket to <strong>{form.email}</strong> as soon as the payment confirmation is processed.</p><div className="order-ref"><span>ORDER REFERENCE</span><strong>{orderRef}</strong><button onClick={copyReference} aria-label="Copy order reference">{copied ? <Check size={16} /> : <Copy size={16} />}</button></div><div className="success-tickets">{selectedItems.map((tier) => <div key={tier.id}><span>{tier.name} × {quantities[tier.id]}</span><strong>{formatKes(tier.price * quantities[tier.id])}</strong></div>)}<div className="success-total"><span>Paid total</span><strong>{formatKes(total)}</strong></div></div><button className="button button-primary full-button" onClick={() => setCheckoutOpen(false)}>Back to matchday <ArrowRight size={17} /></button><p className="privacy-note"><Mail size={14} /> Check your inbox, including spam and promotions.</p></div>}</section></div>}
    </main>
  );
}
