"use client"

import Link from "next/link";
import {BookIcon} from "lucide-react";
import { AppDispatch, RootState } from "@/lib/state/store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/lib/state/features/userSlice";
import { useEffect, useState } from "react";
import { getAuthorInitials } from "@/lib/utils";
import UserAccountModal from "./user-account-modal";
import { User } from "@/lib/types";


export default function Header(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch user details
    dispatch(fetchUserDetails());
  }, []);


    return (
      <>
        <header className="flex flex-row justify-between items-center">
            <div className="flex items-center gap-1">
                <Link href="/" className="contents w-fit">
                    <BookIcon className="size-9"/>
                    <h1 className="text-3xl font-bold tracking-tighter">Story</h1>
                </Link>
            </div>
            {/* User account profile pic */}
            {status === "succeeded" && <Avatar className="w-10 h-10 cursor-pointer">
    <AvatarImage src={user?.profilePic} alt={`${user?.firstName} ${user?.lastName}`} onClick={() => setIsModalOpen(true)} />
    <AvatarFallback>{getAuthorInitials(`${user?.firstName} ${user?.lastName}`)}</AvatarFallback>
            </Avatar>}
        </header>

{/* User detials modal */}
        <UserAccountModal user={user as User}          isOpen={isModalOpen && status === "succeeded"}
        onClose={() => setIsModalOpen(false)} />
      </>

    )
}