import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/options"; // ✅ options.ts からインポート
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized: No Access Token" }, { status: 401 });
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      timeMax: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });

    return NextResponse.json(response.data.items);
  } catch (error) {
    console.error("Google Calendar API Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
