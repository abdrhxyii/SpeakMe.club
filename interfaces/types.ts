export interface LoadingButtonProps {
    loading?: boolean;
    onPress: () => void;
    disabled?: boolean;
    children: string; 
}

export interface UserState {
    isSignedIn: boolean | null;
    setIsSignedIn: (status: boolean | null) => void;
}

export interface UserSelectionState {
    email: string;
    goalOfLearning: string | null;
    nativeLanguage: string | null;
    languageFluencyLevel: string | null;
    gender: string | null;

    setEmail: (email: string) => void;
    setGoalOfLearning: (goal: string) => void;
    setNativeLanguage: (language: string) => void;
    setLanguageFluencyLevel: (level: string) => void;
    setGender: (gender: string) => void;
    reset: () => void;

    resetEmail: () => void;
    resetGoalOfLearning: () => void;
    resetNativeLanguage: () => void;
    resetLanguageFluencyLevel: () => void;
    resetGender: () => void;
}