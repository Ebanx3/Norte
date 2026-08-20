import type { ReactNode } from "react"
import { readingContext } from "./readingContext"
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const ReadingContextProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>(
        JSON.parse(localStorage.getItem("books") || "[]"),
    );
    const [activities, setActivities] = useState<ReadingActivity[]>(
        JSON.parse(localStorage.getItem("readingActivities") || "[]"),
    );

    const addBook = (book: Omit<Book, "id">) => {
        const newBook = {
            ...book,
            id: uuid(),
        };
        setBooks([...books, newBook]);
    };

    const removeBook = (bookId: string) => {
        setBooks((current) => current.filter((book) => book.id !== bookId));
        setActivities((current) => current.filter((activity) => activity.bookId !== bookId));
    };

    const updateBook = (book: Book) => {
        setBooks((current) =>
            current.map((item) => (item.id === book.id ? book : item)),
        );
    };

    const addActivity = (activity: Omit<ReadingActivity, "id">) => {
        const newActivity = {
            ...activity,
            id: uuid(),
        };
        setActivities([...activities, newActivity]);

        // Actualizar las páginas leídas del libro
        setBooks((current) =>
            current.map((book) => {
                if (book.id === activity.bookId) {
                    const newCurrentPage = Math.min(
                        book.currentPage + activity.pagesRead,
                        book.totalPages,
                    );
                    return {
                        ...book,
                        currentPage: newCurrentPage,
                        completed: newCurrentPage === book.totalPages,
                    };
                }
                return book;
            }),
        );
    };

    const removeActivity = (activityId: string) => {
        const activity = activities.find((a) => a.id === activityId);
        if (!activity) return;

        setActivities((current) => current.filter((a) => a.id !== activityId));

        // Restar las páginas del libro
        setBooks((current) =>
            current.map((book) => {
                if (book.id === activity.bookId) {
                    const newCurrentPage = Math.max(book.currentPage - activity.pagesRead, 0);
                    return {
                        ...book,
                        currentPage: newCurrentPage,
                        completed: false,
                    };
                }
                return book;
            }),
        );
    };

    const getCompletedBooks = () => {
        return books.filter((book) => book.completed);
    };

    const getReadingBooks = () => {
        return books.filter((book) => !book.completed);
    };

    const getTotalPagesRead = (items?: ReadingActivity[]) => {
        const list = items ?? activities;
        return list.reduce((acc, activity) => acc + activity.pagesRead, 0);
    };

    const getLastWeekActivities = () => {
        const now = new Date();
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        return activities.filter((activity) => {
            const actDate = new Date(activity.date);
            return actDate >= lastWeek && actDate <= now;
        });
    };

    const getLastMonthActivities = () => {
        const now = new Date();
        const lastMonth = new Date(now);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return activities.filter((activity) => {
            const actDate = new Date(activity.date);
            return actDate >= lastMonth && actDate <= now;
        });
    };

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem("readingActivities", JSON.stringify(activities));
    }, [activities]);

    return (
        <readingContext.Provider
            value={{
                books,
                addBook,
                removeBook,
                updateBook,
                activities,
                addActivity,
                removeActivity,
                getCompletedBooks,
                getReadingBooks,
                getTotalPagesRead,
                getLastWeekActivities,
                getLastMonthActivities,
            }}
        >
            {children}
        </readingContext.Provider>
    );
};