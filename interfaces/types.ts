export interface LoadingButtonProps {
    loading?: boolean;
    onPress: () => void;
    disabled?: boolean;
    children: string; 
}

export interface UserState {
    isSignedIn: boolean | null;
    setIsSignedIn: (status: boolean | null) => void;
    session: any;  
    setSession: (session: any) => void;
}

export interface ProfileState {
    profileImage: string | null;
    refreshImage: boolean;
    setProfileImage: (imageUri: string | null) => void;
    setRefreshImage: (refresh: boolean) => void;
    resetProfileImage: () => void;
}

export interface UserData {
    display_name: string;
    email: string;
    gender: string;
    goal_of_learning: string;
    language_fluency_level: string;
    native_language: string
    about_me: string;
    interest_list: string[];
}

export interface RefreshState {
    hasUserUpdated: Boolean;
    markUpdated: () => void;
    resetUpdated: () => void;
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