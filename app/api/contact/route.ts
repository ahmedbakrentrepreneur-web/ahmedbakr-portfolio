export async function POST(request: Request) {
  try {
    const { email, message, name } = await request.json()

    if (!email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.log("[v0] Resend API key not found. Email functionality requires setup.")
      return Response.json(
        {
          error: "Email service not configured. Please add RESEND_API_KEY to environment variables.",
          message: "Your message was received but could not be sent via email. Please contact directly.",
        },
        { status: 503 },
      )
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@resend.dev",
        to: "ahmedbakrofficiall@gmail.com",
        replyTo: email,
        subject: `New Message from ${name || email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name || email}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;" />
            <p style="color: #666; font-size: 12px;">Reply directly to this email to respond.</p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Resend API error:", errorData)
      return Response.json({ error: "Failed to send email" }, { status: 500 })
    }

    return Response.json(
      {
        success: true,
        message: "Email sent successfully!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return Response.json(
      {
        error: "Failed to process your request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
