
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4 animate-scale-in">
        <div className="mb-8">
          <div className="gradient-primary text-white h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl font-bold">
            404
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button
          onClick={() => navigate('/')}
          size="lg"
          className="px-8 gradient-primary"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
