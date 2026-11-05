type RequestLike = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
};

type ReceiptPayload = {
  orderId?: string;
  buyerName?: string;
  email?: string;
  phone?: string;
  ticketLabel?: string;
  quantity?: number;
  total?: number;
  sendReceipt?: boolean;
  sendTicket?: boolean;
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] ?? char);

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const adminKey = process.env.ADMIN_PANEL_KEY;
  const suppliedKey = req.headers?.["x-admin-key"];
  if (adminKey && suppliedKey !== adminKey) return res.status(401).json({ ok: false, error: "Unauthorized" });

  const payload = (req.body ?? {}) as ReceiptPayload;
  if (!payload.email || !payload.orderId) return res.status(400).json({ ok: false, error: "Buyer email and order ID are required" });
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return res.status(503).json({ ok: false, preview: true, error: "Resend is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL in Vercel environment variables." });
  }

  const buyer = escapeHtml(payload.buyerName ?? "MatchPass supporter");
  const orderId = escapeHtml(payload.orderId);
  const ticketLabel = escapeHtml(payload.ticketLabel ?? "Match ticket");
  const quantity = payload.quantity ?? 1;
  const total = `KES ${(payload.total ?? 0).toLocaleString("en-KE")}`;
  const subject = payload.sendTicket && payload.sendReceipt ? `Your MatchPass E-ticket and receipt · ${payload.orderId}` : payload.sendTicket ? `Your MatchPass E-ticket · ${payload.orderId}` : `Your MatchPass payment receipt · ${payload.orderId}`;
  const sections = [
    payload.sendTicket ? `<div style="padding:18px 20px;background:#171d29;color:#f3f0e9;margin:20px 0"><div style="font-size:11px;letter-spacing:2px;color:#ce9b55">E-TICKET CONFIRMED</div><div style="font-size:28px;font-weight:800;margin-top:8px">${ticketLabel} × ${quantity}</div><div style="color:#b4b4b8;margin-top:8px">Bayern Munich vs Ajax · 5 January 2027</div></div>` : "",
    payload.sendReceipt ? `<div style="border-top:1px solid #ddd;padding-top:18px"><div style="font-size:11px;letter-spacing:2px;color:#777">PAYMENT RECEIPT</div><p><strong>Order</strong> ${orderId}</p><p><strong>Paid total</strong> ${total}</p></div>` : "",
  ].join("");
  const html = `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#121620"><div style="background:#0d1018;color:#f3f0e9;padding:26px 28px"><div style="font-weight:900;letter-spacing:2px">MATCH<span style="color:#e1262f">PASS</span></div><h1 style="font-size:30px;margin:28px 0 6px">Your matchday is locked in.</h1><p style="color:#b4b4b8">Hi ${buyer}, here is your delivery from MatchPass.</p></div><div style="padding:24px 28px">${sections}<p style="color:#666;line-height:1.6">Keep this email handy for matchday. If you need help, reply to this email or contact hello@matchpass.ke.</p></div></div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [payload.email], subject, html, reply_to: process.env.RESEND_REPLY_TO || "hello@matchpass.ke" }),
  });
  if (!response.ok) return res.status(502).json({ ok: false, error: "Resend rejected the email request", details: await response.text() });
  const result = (await response.json()) as { id?: string };
  return res.status(200).json({ ok: true, emailId: result.id, sms: payload.phone ? "Phone captured; connect an SMS provider for delivery." : "No phone number supplied." });
}
