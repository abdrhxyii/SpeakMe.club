import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { supabase } from "@/libs/supabase";
import { useUserStore } from "@/store/userStore";

const Index = () => {
  const { isSignedIn, setIsSignedIn, setSession } = useUserStore();
  const [redirectPath, setRedirectPath] = useState<string | null>(null); 

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select("is_onboarding_complete")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        if (data && data.is_onboarding_complete === false) {
          setRedirectPath("/GoalSelection"); 
          return;
        }
      }

      setRedirectPath(isSignedIn ? "/(tabs)/" : "/Welcome");
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isSignedIn, setIsSignedIn, setSession]);

  if (redirectPath === null) return null; 

  return <Redirect href={redirectPath as any} />;
};

export default Index;
