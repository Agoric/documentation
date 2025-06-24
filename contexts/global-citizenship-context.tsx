import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useAuth } from "@clerk/nextjs";

interface GlobalCitizenshipContextType {
  welcomeMessage: string;
  setWelcomeMessage: (message: string) => void;
  fetchWelcomeMessage: () => Promise<void>;
}

const GlobalCitizenshipContext =
  createContext<GlobalCitizenshipContextType | null>(null);

interface GlobalCitizenshipProviderProps {
  children: ReactNode;
}

export const GlobalCitizenshipProvider: React.FC<
  GlobalCitizenshipProviderProps
> = ({ children }) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const { getToken } = useAuth();

  const fetchWelcomeMessage = async () => {
    try {
      const token = await getToken({ template: "supabase" });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL}/get-welcome-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch welcome message: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setWelcomeMessage(data.message || "");
    } catch (error: any) {
      console.error("Error fetching welcome message:", error.message);
      setWelcomeMessage(
        "Failed to load welcome message. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  return (
    <GlobalCitizenshipContext.Provider
      value={{ welcomeMessage, setWelcomeMessage, fetchWelcomeMessage }}
    >
      {children}
    </GlobalCitizenshipContext.Provider>
  );
};

export const useGlobalCitizenship = (): GlobalCitizenshipContextType => {
  const context = useContext(GlobalCitizenshipContext);
  if (!context) {
    throw new Error(
      "useGlobalCitizenship must be used within a GlobalCitizenshipProvider"
    );
  }
  return context;
};

export const parseWelcomeMessage = (rawText: string): string[] => {
  const lines = rawText.split(/\r?\n/);
  return lines;
};
