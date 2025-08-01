import { useEffect, useState } from "react"
import { useDarkMode } from "../context/useDarkMode.tsx"
import { useStats } from "../context/useStats"

export interface Mostrar {
    onClose: () => void
    setFinJuego: (valor: boolean) => void
    setCantLetras: (valor: []) => void
}

interface dificultadesType {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}


export const Intro = ({ onClose, setFinJuego, setCantLetras }: Mostrar) => {
    const { modoOscuro } = useDarkMode();
    const [dificultades, setDificultades] = useState<dificultadesType[]>([])
    const [idiomas, setIdiomas] = useState<dificultadesType[]>([])
    const { dificultad, setDificultad, setIdioma, intentos, idioma } = useStats()

    const fetchDificultad = async () => {
        const res = await fetch(`http://localhost:3000/difficulty`)
        const data = await res.json()
        setDificultades(data)
    }
    const fetchLenguaje = async () => {
        const res = await fetch(`http://localhost:3000/language`)
        const data = await res.json()
        setIdiomas(data)

    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDificultad(Number(e.target.value))
        setFinJuego(false)
        setCantLetras([])

    }

    const handleChangeIdioma = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIdioma(Number(e.target.value))
        setFinJuego(false)
        setCantLetras([])


    }
    useEffect(() => {
        fetchDificultad()
        fetchLenguaje()
    }, [])

    return (
        <div className={`absolute pb-4 font-press gap-5 flex flex-col border-2  rounded-md ${modoOscuro ? "border-white bg-black text-white" : "border-black"} w-1/3 z-20 items-center justify-self-center`}>
            <button
                className={`font-press absolute top-[-2px] transition-all ease-in-out delay-75 duration-250 transform right-0 text-2xl ${modoOscuro ? "bg-black text-white border-t-black hover:border-t-black hover:bg-white hover:text-black" : "bg-white text-black border-t-white hover:border-t-black  border-black hover:shadow-orange-50"} shadow:md hover:-translate-y-1 rounded-b-2xl border-2 cursor-pointer pb-2 pr-2 pl-2`}
                onClick={onClose}
            >
                x
            </button>

            <span className="text-2xl pt-2">Reglas del juego</span>

            <div className="w-[90%] border-2 p-1 rounded-md hover:shadow-red-400 shadow-md">
                <h3 className="p-1">Cuando te equivocás:</h3>
                <p>Perdés una vida ➖💔</p>
                <p>Si te quedás sin vidas, el juego termina.</p>
            </div>

            <div className="w-[90%] border-2 p-1 rounded-md hover:shadow-green-200 shadow-md">
                <h3 className="p-1">Cuando acertás:</h3>
                <p>Ganás dos vidas ➕ <span className="text-red-600 text-2xl">♥♥</span></p>
                <p>Podés seguir jugando mientras tengas vidas.</p>
            </div>

            <div className="w-[90%] flex flex-col gap-2 p-1 rounded-md border-2">
                <h3 className="p-1">Guía de colores:</h3>

                <div className="flex gap-2 items-center w-full">
                    <div className="w-[30px] h-[30px] bg-green-400 justify-center flex items-center border-2 text-xl item-center">A</div>
                    <p>Letra correcta y en la posición correcta.</p>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="w-[30px] h-[30px] bg-yellow-400 justify-center flex items-center border-2 text-xl">B</div>
                    <p>Letra correcta pero en la posición incorrecta.</p>
                </div>

                <div className="flex gap-2 items-center pb-1">
                    <div className="w-[30px] h-[30px] bg-red-400 justify-center flex items-center border-2 text-xl">C</div>
                    <p>Letra que no está en la palabra.</p>
                </div>
            </div>
            <div className="">
                <select name="dificultades" id="dificultades" onChange={handleChange} value={dificultad} >
                    {dificultades.map(d => (
                        <option key={d.id} className="bg-black" value={d.id}>{d.name}</option>
                    ))}
                    <option value="4" className="bg-black">Random</option>

                </select>
                <select name="2" id="2" onChange={handleChangeIdioma} value={idioma}>
                    {idiomas.map(i => (
                        <option key={i.id} className="bg-black" value={i.id}>{i.name}</option>
                    ))}
                </select>
            </div>

            {intentos !== 0 ? (
                ""
            ) : (
                <button
                    className={`justify-self-center border-2 p-2 mb-2 rounded-md bg-blue-500 text-white text-2xl cursor-pointer ${intentos > 0 ? "flex-none" : ""}`}
                    onClick={onClose}
                >
                    JUGAR
                </button>
            )}
        </div>
    )


}