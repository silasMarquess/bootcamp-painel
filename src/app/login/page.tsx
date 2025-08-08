import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Header from "../components/commom/header";
import ReguistePage from "./components/registerForm";
import SignForm from "./components/signForm";

const LoginPage = () => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 p-3">
      <Header />
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Ja tenho Conta</TabsTrigger>
          <TabsTrigger value="create_account">Quero me cadastrar</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignForm />
        </TabsContent>

        <TabsContent value="create_account">
          <ReguistePage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
