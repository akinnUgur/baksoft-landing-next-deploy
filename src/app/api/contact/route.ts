import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// .env.local içine ekleyeceğin API key ile Resend nesnesi oluşturuluyor
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body;

  // Temel validasyon
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Zorunlu alanlar boş olamaz." }, { status: 400 });
  }

  try {
    // E-posta gönderimi
    await resend.emails.send({
      from: "noreply@baksoftarge.com", // Bu alanın domaini Resend'de doğrulanmalı
      to: ["info@baksoftarge.com"],                    // Gelen mesaj nereye düşsün istiyorsan o
      subject: `İletişim Formu: ${subject || "(Konusuz)"}`,
      replyTo: email,
      html: `
        <h2>Yeni iletişim formu mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Konu:</strong> ${subject || "-"}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    return NextResponse.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
