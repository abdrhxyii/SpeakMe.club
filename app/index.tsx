import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "@/libs/supabase";
import { useUserStore } from "@/store/userStore";
import { getTokens } from "@/utils/TokenStorage";

const Index = () => {
  const { setIsSignedIn, setSession } = useUserStore();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { accessToken, refreshToken } = await getTokens();

        if (!accessToken || !refreshToken) {
          setRedirectPath("/Welcome"); 
          return;
        }

        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          console.error("Session restore failed:", error);
          setRedirectPath("/Welcome"); 
          return;
        }

        setIsSignedIn(true);
        setSession(data.session.user);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("is_onboarding_complete")
          .eq("id", data.session.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user data:", userError);
          setRedirectPath("/Welcome"); 
          return;
        }

        if (userData && userData.is_onboarding_complete === false) {
          setRedirectPath("/GoalSelection"); 
          return;
        }

        setRedirectPath("/(tabs)/"); 
      } catch (err) {
        console.error("Error retrieving auth tokens:", err);
        setRedirectPath("/Welcome");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
      setSession(session?.user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [setIsSignedIn, setSession]);

  if (redirectPath === null) return null; 

  return <Redirect href={redirectPath as any} />;
};

export default Index;
