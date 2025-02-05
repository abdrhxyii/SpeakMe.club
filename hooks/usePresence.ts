
import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { supabase } from "@/libs/supabase";
import { useUserStore } from "@/store/userStore";

const usePresence = () => {
  const { session } = useUserStore();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    const userId = session.user.id;
    const channel = supabase.channel(`presence:${userId}`, {
      config: { presence: { key: userId } },
    });
    // console.log(channel, "channel")

    const updateStatus = async (online: boolean) => {
      setIsOnline(online);
      await supabase.from("users").update({
        is_online: online,
        last_seen: online ? new Date().toISOString() : null,
      }).eq("id", userId);
    };

    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        updateStatus(true);
        channel.track({ online: true });
      } else {
        updateStatus(false);
        channel.untrack();
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Presence synced");
      })
      .on("presence", { event: "join" }, ({ key }) => {
        console.log(`${key} joined`);
      })
      .on("presence", { event: "leave" }, ({ key }) => {
        console.log(`${key} left`);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          updateStatus(true);
          channel.track({ online: true });
        }
      });

    return () => {
      subscription.remove();
      channel.unsubscribe();
    };
  }, [session]);

  return { isOnline };
};

export default usePresence;
