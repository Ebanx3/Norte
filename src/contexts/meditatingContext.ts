import { createContext } from "react";

interface MeditatingContext {
    sessions: MeditationSession[];
    links:MeditationLink[];
    addSession: (session: Omit<MeditationSession, "id" | "date" | "completed">) => void;
    removeSession: (sessionId: string) => void;
    updateSession: (session: MeditationSession) => void;
    addLink: (link: MeditationLink) => void;
    removeLink: (linkUrl: string) => void;
    getTotalDuration: () => number;
    getLastWeekSessions: () => MeditationSession[];
    getLastMonthSessions: () => MeditationSession[];
    getMoodSummary: () => Record<MeditationMood, number>;
    getCompletedSessions: () => MeditationSession[];
}

export const meditatingContext = createContext({} as MeditatingContext);