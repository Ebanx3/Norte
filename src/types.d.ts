type Category = "actividad fisica" | "economía" | "meditación" | "lectura" | "alimentación"

type Currency = "pesos" | "dolares" | "euros"

type Goal = {
    category: Category
    objective: string
    id: string
}

type MovementType = "expense" | "income" | "saving" | "withdrawal" | "debt" | "payDebt"

type Movement = {
    id: string
    amount: number
    tag: string
    date: string
    type: MovementType
}

type DebtAction = "payment" | "increase";

type TypeExercise =
    | "caminar"
    | "correr"
    | "bicicleta"
    | "gimnasio"
    | "yoga"
    | "natacion"
    | "deporte_equipo"
    | "ejercicio_casa"
    | "elongacion"
    | "crossfit"
    | "funcional"
    | "otro"


interface Exercise {
    id: string;
    type: TypeExercise;
    duration: number; // minutos
    intensity?: "baja" | "media" | "alta";
    date: string;
    calories: number;
}

interface Book {
    id: string;
    name: string;
    author: string;
    totalPages: number;
    currentPage: number;
    completed: boolean;
    startDate: string;
}

interface ReadingActivity {
    id: string;
    bookId: string;
    duration: number; // minutos
    pagesRead: number;
    date: string;
}

type MeditationType = "mindfulness" | "respiración" | "guiada" | "mantra" | "visualización" | "otro";

type MeditationMood = "relajado" | "enfocado" | "estresado" | "contento" | "calmado" | "cansado" | "tranquilo";

type MeditationSite = "youtube" | "spotify" | "soundcloud" | "insight_timer" | "otro";

interface MeditationLink {
    url: string;
    site: MeditationSite;
    label?: string;
}

interface MeditationSession {
    id: string;
    duration: number; // minutos
    mood: MeditationMood;
    notes?: string;
    type: MeditationType;
    date: string;
    completed: boolean;
}

type ActionType = "expense" | "income" | "saving" | "withdrawal" | "debt" | "payDebt";