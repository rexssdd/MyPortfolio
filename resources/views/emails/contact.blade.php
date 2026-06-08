<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Portfolio Contact</title></head>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#2563EB;">New Portfolio Message</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:8px 0;font-weight:600;width:80px;">Name:</td>
      <td style="padding:8px 0;">{{ $data['name'] }}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;font-weight:600;">Email:</td>
      <td style="padding:8px 0;"><a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a></td>
    </tr>
  </table>
  <hr style="margin:16px 0;border:1px solid #eee;">
  <p style="white-space:pre-wrap;line-height:1.7;">{{ $data['message'] }}</p>
  <hr style="margin:16px 0;border:1px solid #eee;">
  <p style="font-size:12px;color:#888;">Sent from portfolio contact form · rexceljaylusica.dev</p>
</body>
</html>
