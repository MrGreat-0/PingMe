import { Loader as LucideLoader } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LucideLoader className="size-10 animate-spin" />
    </div>
  );
};

export default Loader;
