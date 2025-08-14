import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <AlertTriangle size={36} className="text-error mb-4" />

      <h1 className="text-5xl font-bold text-error mb-2">404</h1>
      <p className="text-lg text-base-content font-medium mb-2">
        Page not found
      </p>
      <p className="text-sm text-base-content/70 max-w-sm mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Link to="/" className="btn btn-neutral rounded-lg text-sm px-6">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
