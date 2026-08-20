import { useEffect, useState, type ReactNode } from "react";
import { meditatingContext } from "./meditatingContext";
import { v4 as uuid } from "uuid";

const readSessionsFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("meditationSessions") || "[]") as MeditationSession[];
  } catch {
    return [];
  }
};

const readLinksFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("meditationLinks") || "[]") as MeditationLink[];
  } catch {
    return [];
  }
};

export const MeditatingCtxProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<MeditationSession[]>(() => readSessionsFromStorage());
  const [links, setLinks] = useState<MeditationLink[]>(() => readLinksFromStorage());

  const addSession = (session: Omit<MeditationSession, "id" | "date" | "completed">) => {
    const newSession: MeditationSession = {
      ...session,
      id: uuid(),
      date: new Date().toISOString(),
      completed: true,
    };
    setSessions((current) => [...current, newSession]);
  };

  const removeSession = (sessionId: string) => {
    setSessions((current) => current.filter((session) => session.id !== sessionId));
  };

  const updateSession = (session: MeditationSession) => {
    setSessions((current) =>
      current.map((item) => (item.id === session.id ? session : item)),
    );
  };

  const getTotalDuration = () => {
    return sessions.reduce((acc, session) => acc + session.duration, 0);
  };

  const getLastWeekSessions = () => {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    return sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= lastWeek && sessionDate <= now;
    });
  };

  const getLastMonthSessions = () => {
    const now = new Date();
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= lastMonth && sessionDate <= now;
    });
  };

  const addLink = (link: MeditationLink) => {
    setLinks((current) => {
      if (current.some((item) => item.url === link.url)) return current;
      return [...current, link];
    });
  };

  const removeLink = (linkUrl: string) => {
    setLinks((current) => current.filter((link) => link.url !== linkUrl));
  };

  const getMoodSummary = () => {
    return sessions.reduce((summary, session) => {
      summary[session.mood] = (summary[session.mood] ?? 0) + 1;
      return summary;
    }, {} as Record<MeditationMood, number>);
  };

  const getCompletedSessions = () => sessions.filter((session) => session.completed);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("meditationSessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("meditationLinks", JSON.stringify(links));
  }, [links]);

  return (
    <meditatingContext.Provider
      value={{
        sessions,
        addSession,
        removeSession,
        updateSession,
        getTotalDuration,
        getLastWeekSessions,
        getLastMonthSessions,
        getMoodSummary,
        getCompletedSessions,
        addLink,
        removeLink,
        links
      }}
    >
      {children}
    </meditatingContext.Provider>
  );
};
