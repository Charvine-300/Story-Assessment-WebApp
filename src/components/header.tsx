import Link from "next/link";
import {BookIcon} from "lucide-react";

export default function Header(){
    return (
        <header className="flex items-center justify-center gap-1">
            <Link href="/" className="contents">
                <BookIcon className="size-9"/>
                <h1 className="text-3xl font-bold tracking-tighter">Story</h1>
            </Link>
        </header>
    )
}