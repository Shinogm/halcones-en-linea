'use client'

import { createCalendar } from "@/services/supabase/actions/coordinators"
import { getSubjectsBySemester } from "@/services/supabase/actions/subjects"
import { v4 } from "@/utils/uuid"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
    professor: string[]
    id: number
    career: number
    groups: string[]
}

export const NewCalendarForm = ({ professor, id, career, groups }: Props) => {
    const [semester, setSemester] = useState(1)
    const [subject, setSubject] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchSubjects = async () => {
            const subjects = await getSubjectsBySemester(semester)
            const subjectNames = subjects.map(subj => subj.name)
            setSubject(subjectNames)
        }
        fetchSubjects()
    }, [semester])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSemester(Number(e.target.value))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)

        const day = form.get('dia') as string
        const hour = form.get('hora') as string
        const subject = form.get('materia') as string
        const professor = form.get('profesor') as string
        const group = form.get('grupo') as string

        const data = await createCalendar(
            day ?? 'Lunes',
            hour ?? '00:00',
            id,
            professor,
            career,
            subject,
            group
        )

        console.log(data)
    }

    return (
        <form className="mb-4 text-black" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="dia" className="block text-sm font-medium text-gray-700">Día de la semana</label>
                <select id="dia" name="dia" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semestre</label>
                <input onChange={handleChange} defaultValue={1} type="number" id="semester" name="semester" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min="1" max="8" />
            </div>

            <div className="mb-4">
                <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
                <input type="time" id="hora" name="hora" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" min="06:00" max="22:00" />
            </div>

            <div className="mb-4">
                <label htmlFor="profesor" className="block text-sm font-medium text-gray-700">Profesor</label>
                <select id="profesor" name="profesor" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {
                        professor.map(prof => (
                            <option key={v4()} value={prof}>{prof}</option>
                        ))
                    }
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="grupo" className="block text-sm font-medium text-gray-700">Grupo</label>
                <select id="grupo" name="grupo" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {
                        groups.map(group => (
                            <option key={v4()} value={group}>{group}</option>
                        ))
                    }
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="materia" className="block text-sm font-medium text-gray-700">Materia</label>
                <select id="materia" name="materia" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {
                        subject.map(subj => (
                            <option key={v4()} value={subj}>{subj}</option>
                        ))
                    }
                </select>
            </div>

            <div className="mt-6">
                <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Guardar</button>
            </div>

        </form>
    )
}
