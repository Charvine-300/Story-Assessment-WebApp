import React from "react"
import Lottie from "react-lottie"

interface LoadingProps {
  message: string; 
  animationData: any;
  size?: number;
}


const Loading = ({ message, animationData, size = 200 }: LoadingProps) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-h-[500px] lg:min-h-[712px]">
    <div>
      <Lottie options={defaultOptions} height={size} width={size} />
    </div>
    <p className="text-center font-semibold text-lg">
      {message}
    </p>
  </div>
  )
}

export default Loading;