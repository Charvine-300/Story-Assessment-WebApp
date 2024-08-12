import React from "react"
import Image from "next/image";

const ErrorPage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-[500px] lg:min-h-[712px]">
    <div>
      <Image src={"/assets/error.svg"} width={200} height={200} alt="error icon" />
    </div>
    {message && (
    <p className="py-5 text-center font-semibold text-lg">
      {message}
    </p>
    )}
  </div>
  )
}

export default ErrorPage;