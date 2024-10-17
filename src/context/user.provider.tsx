import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);
//The purpose of the context is to globally manage the state of the authenticated user and loading status. This is useful for accessing the current user's information across different components without prop drilling.

interface IUserProviderValues {
  //This defines the shape of the data stored in the context.
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  //user: This state holds the current user object. It starts as null because the user data hasn’t been fetched yet.
  //isLoading: This state indicates whether the app is still fetching user data. It starts as true because the data fetching process begins as soon as the component mounts.

  const handleUser = async () => {
    const user = await getCurrentUser(); // Fetches the user data from AuthService
    setUser(user); // Stores the fetched user in the state
    setIsLoading(false); // Marks loading as done once data is fetched
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);
  //When isLoading changes: The component will re-fetch user data if isLoading is set to true again.

  return (
    //This wraps the child components and provides the user, setUser, isLoading, and setIsLoading values to any component that consumes the context via useUser.
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
