import { createContext } from "react";

interface ReadingContext {
    books: Book[];
    addBook: (book: Omit<Book, "id">) => void;
    removeBook: (bookId: string) => void;
    updateBook: (book: Book) => void;
    
    activities: ReadingActivity[];
    addActivity: (activity: Omit<ReadingActivity, "id">) => void;
    removeActivity: (activityId: string) => void;
    
    getCompletedBooks: () => Book[];
    getReadingBooks: () => Book[];
    getTotalPagesRead: (items?: ReadingActivity[]) => number;
    getLastWeekActivities: () => ReadingActivity[];
    getLastMonthActivities: () => ReadingActivity[];
}

export const readingContext = createContext({} as ReadingContext)