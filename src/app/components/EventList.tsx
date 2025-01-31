"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { formatDateWithoutYear, formatYear, formatTime } from "../utils/formatDate";

type Event = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
};

// 安全に日付を取得する関数
const getEventDate = (event: Event): Date => {
  return new Date(event.start.dateTime ?? event.start.date ?? new Date().toISOString());
};

// 同じ日付のイベントをグループ化する関数（年ごとに整理）
const groupEventsByYearAndDate = (events: Event[]) => {
  const grouped: { [year: string]: { [date: string]: Event[] } } = {};

  events.forEach((event) => {
    const eventDate = getEventDate(event);
    const year = formatYear(eventDate.toISOString());
    const date = formatDateWithoutYear(eventDate.toISOString());

    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][date]) {
      grouped[year][date] = [];
    }
    grouped[year][date].push(event);
  });

  return grouped;
};

export default function EventList() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!session) return;

    async function fetchEvents() {
      const res = await fetch("/api/google-calendar");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    }

    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, [session]);

  const groupedEvents = groupEventsByYearAndDate(events);

  return (
    <div className="events-inner">

      {status === "loading" ? (
        <p className="loading">ローディング中...</p>
      ) : session ? (
        <>
          <div className="event-list">
            {Object.entries(groupedEvents).map(([year, dates]) => (
              <div key={year} className="year-group">
                <h1>{year}</h1>
                {Object.entries(dates).map(([date, events]) => (
                  <div key={date} className="event-item">
                    <h2>{date}</h2>
                    <ul>
                      {events.map((event) => (
                        <li key={event.id}>
                          <p className="time">{formatTime(event.start.dateTime ?? event.start.date ?? new Date().toISOString())}</p>
                          <p className="detail">{event.summary || "No Title"}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={() => signOut()} className="logout">
            ログアウト
          </button>
        </>
      ) : (
        <div className="login">
          <button onClick={() => signIn("google")}>
            Googleでサインイン
          </button>
        </div>
      )}
    </div>
  );
}
