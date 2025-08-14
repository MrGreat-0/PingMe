import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100/80 py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base-content">PingMe</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline hover:text-base-content">
            Home
          </Link>
          <Link
            to="/settings"
            className="hover:underline hover:text-base-content"
          >
            Settings
          </Link>
          <a
            href="https://github.com/MrGreat-0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-base-content"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
