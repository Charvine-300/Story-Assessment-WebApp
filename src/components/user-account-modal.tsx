import { User } from "@/lib/types";
import { getAuthorInitials } from "@/lib/utils";
import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";
import React from "react"

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
  }

const UserAccountModal = ({ isOpen, onClose, user }: AccountModalProps) => {
  if (!isOpen) return null;  

  return (
    <>
       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg  max-w-lg min-w-[300px] relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="py-2 flex flex-col gap-3 items-center">
        <Avatar className="w-[200px] h-[200px] cursor-pointer block">
        <AvatarImage src={user?.profilePic} alt={`${user?.firstName} ${user?.lastName}`} />
    <AvatarFallback>{getAuthorInitials(`${user?.firstName} ${user?.lastName}`)}</AvatarFallback>
            </Avatar>
        
        {/* Title */}
        <h2 className="text-lg font-semibold mb-4 text-center">{`${user?.firstName} ${user?.lastName}`}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-6">{}</p>
        </div>

        </div>
        </div>
    </>
  )
}

export default UserAccountModal