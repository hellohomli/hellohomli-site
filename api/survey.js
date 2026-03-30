export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, q1, q2, q3 } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  try {
    const response = await fetch(
      'https://api.beehiiv.com/v2/publications/pub_e4aee7fc-cb0f-4e3d-946c-23118a781596/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: false,
          custom_fields: [
            { name: 'ownership_status', value: q1 ?? '' },
            { name: 'maintenance_guidance', value: q2 ?? '' },
            { name: 'weekly_motivation', value: q3 ?? '' },
          ],
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Survey error:', err);
    return res.status(500).json({ error: 'Survey save failed' });
  }
}
