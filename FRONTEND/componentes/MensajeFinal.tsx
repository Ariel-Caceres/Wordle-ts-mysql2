import { useEffect, useState } from "react";
import { useDarkMode } from "../context/useDarkMode.tsx"

export const MensajeFinal = ({ mensajeFinal }: { mensajeFinal: string }) => {
    const { modoOscuro } = useDarkMode();
    const [animar, setAnimar] = useState<boolean>()

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimar(true)
        }, 10)
        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            {mensajeFinal?.split("").map((l, i) =>
                <div
                    key={i}
                    className={`transition-all ease-in-out delay-75 duration-750 transform ${animar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} w-[40px] h-[40px] cursor-pointer delay-300 text-white 
            ${mensajeFinal === "perdiste"
                            ? modoOscuro
                                ? "bg-orange-600 animate-girar hover:animate-none"
                                : "bg-orange-400 animate-girar hover:animate-none"
                            : "bg-blue-400 animate-girar hover:animate-none"
                        } border-2 border-white flex items-center justify-center text-2xl font-bold uppercase rounded-sm transition-all ease-in-out duration-300 hover:translate-y-1`}
                >
                    {l}
                </div>
            )}
        </>
    );
}
