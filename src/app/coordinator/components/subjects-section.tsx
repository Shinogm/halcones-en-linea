'use client'

interface Props {
    materia: string
    horario: string
    profesor: string
    cluster: string
}

export const SubjectsSection = ({ materia, horario, profesor, cluster }: Props) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in-left">
            <h3 className="text-lg font-medium text-black">{materia}</h3>
            <p className="text-sm text-gray-600">{horario}</p>
            <p className="text-sm text-gray-600">{profesor}</p>
            <p className="text-sm text-gray-600">{cluster}</p>
        </div>
    )
}