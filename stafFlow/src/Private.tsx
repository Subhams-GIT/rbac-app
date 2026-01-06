import { Navigate} from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { Loader } from "lucide-react";

const Private = ({children}:{children:React.ReactNode}) => {
  const auth = useAuth();
  const session = auth?.session;
  const loading = auth?.loading;

  if(loading) return <Loader/>
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Private;
