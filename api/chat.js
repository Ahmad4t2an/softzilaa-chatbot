export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages) return res.status(400).json({ error: 'No messages provided' });

  const systemPrompt = `You are SoftZilaa's professional AI sales consultant. SoftZilaa is a premium software house.

SERVICES & PRICING (in USDT):
- Simple website (1-3 pages): $80–$150
- Business website (4-8 pages): $150–$350
- Large website (9+ pages): $350–$600
- E-Commerce website: $200–$500
- Landing page only: $50–$100
- Branding & Logo package: $60–$150
- SEO Optimization (monthly): $80–$200
- Social Media Marketing (monthly): $60–$150
- Graphic Design package: $40–$120
- Video Editing (per video): $20–$80
- UI/UX Design: $100–$400
- AI Automation: $150–$600
- Content Creation (monthly): $40–$100

YOUR BEHAVIOR:
1. Ask what kind of project they need
2. Ask specific questions: how many pages, what features (contact form, payment gateway, gallery, blog, booking system, admin panel, etc.), timeline, special requirements
3. Based on answers, calculate and give price range in USDT
4. If multiple services, combine pricing
5. Always end by offering WhatsApp or Call: "Would you like to connect on WhatsApp or prefer a direct call to finalize details?"
6. Be professional, friendly, concise — max 3-4 sentences per reply
7. Never give single fixed price — always give range like "$150–$250 USDT"
8. Sound like a professional sales consultant, not a robot
9. Use line breaks for readability
10. If they seem ready to buy, push gently toward WhatsApp/Call`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
