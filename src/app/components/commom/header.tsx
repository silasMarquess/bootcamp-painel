"use client";

import { LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { size } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex flex-row items-center justify-between gap-2.5 border p-5">
      <Link href={"/"}>
        {" "}
        <Image
          src={"/BEWEAR.svg"}
          alt="bewear"
          width={100}
          height={25.14}
        ></Image>
      </Link>
      <div className="flex-rol flex items-center gap-2.5">
        <Sheet>
          <SheetTrigger asChild>
            <Button size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Informações de Sessão</SheetDescription>
            </SheetHeader>
            {session?.user ? (
              <div className="flex w-full flex-row items-center justify-between space-x-2 p-2">
                {" "}
                <Avatar>
                  <AvatarImage src={session.user.image as string | undefined} />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                    {session.user.name?.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 flex flex-col space-y-1">
                  <span className="text-sm font-semibold">
                    bem vindo,{session.user.name}
                  </span>
                  <span className="text-xs font-light text-gray-600">
                    {session.user.email}
                  </span>
                </div>
                <div>
                  <Button
                    asChild
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-row items-center justify-between p-2">
                <p>Olá, seja bem vindo ! faça seu login ou cadastra-se</p>
                <Button asChild variant={"outline"} size={"icon"}>
                  <Link href={"/login"}>
                    <LogOutIcon />
                  </Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
