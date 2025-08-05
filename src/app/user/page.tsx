import { User } from "lucide-react";

import { Button } from "@/components/ui/button";

const UserPage = () => {
  return (
    <div className="mf-10 mt-10 font-extrabold text-blue-600">
      <Button className="rounded-full bg-blue-500 font-light text-white">
        <User></User>
        Meu Button
      </Button>
    </div>
  );
};

export default UserPage;
