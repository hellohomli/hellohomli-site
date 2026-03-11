exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  const response = await fetch('https://api.beehiiv.com/v2/publications/pub_e4aee7fc-cb0f-4e3d-946c-23118a781596/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 5k7doOLBjZnyaXfuOoO9BxXvkNaMpSdTqdWAfFH6hmQiz0yHKJrETpeXTqfsHqed'
    },
    body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true })
  });

  const data = await response.json();
  return {
    statusCode: response.ok ? 200 : 400,
    body: JSON.stringify(data)
  };
};
