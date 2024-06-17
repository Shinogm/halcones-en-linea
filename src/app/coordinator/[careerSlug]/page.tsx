import { getCareerBySlug } from "@/services/supabase/actions/careers"
import { getGroupsByCareer } from "@/services/supabase/actions/groups"
import { getProfessors } from "@/services/supabase/actions/professors"
import { getSubjects } from "@/services/supabase/actions/subjects"
import { SubjectsSection } from "../components/subjects-section"
import { Tr } from "@/components/utils"
import Link from "next/link"

interface Props {
    params: {
        careerSlug: string
    }
}

export default async function CoordinatorPage({ params }: Props) {
    const career = await getCareerBySlug(params.careerSlug)
    const groups = await getGroupsByCareer(career.id)
    // subjects
    const subjects = await getSubjects()
    //roles teacher
    const professors = await getProfessors()
    const generateHref = (slug: string) => `/coordinator/${slug}/new`;
    console.log(career)
    console.log(groups)
    console.log(subjects)
    console.log(professors)

    return (
        <section className="bg-[#cdcccb] w-full h-full py-12 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-[#1a63a5] mb-8 animate-fade-up">Horario de {career.name}</h1>
                <Link href={generateHref(params.careerSlug)} className="bg-[#1a63a5] text-white px-4 py-2 rounded-md animate-fade-up">
                    <span className="font-bold">Nuevo Horario</span>
                </Link>
                <table className="min-w-full bg-white border border-[#131a2e] animate-fade-up">
                    <thead>
                        <tr className="bg-[#1a63a5] text-white">
                            <th className="py-2 px-4 font-medium animate-slide-right">Lunes</th>
                            <th className="py-2 px-4 font-medium animate-slide-right">Martes</th>
                            <th className="py-2 px-4 font-medium animate-slide-right">Miercoles</th>
                            <th className="py-2 px-4 font-medium animate-slide-right">Jueves</th>
                            <th className="py-2 px-4 font-medium animate-slide-right">Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Tr>
                            <td className="p-4 border border-[#131a2e]">
                                <SubjectsSection
                                    materia="Mathematics"
                                    horario="9:00 AM - 10:30 AM"
                                    profesor="Prof. John Doe"
                                    cluster="Cluster A"
                                />
                                <SubjectsSection
                                    materia="Physics"
                                    horario="11:00 AM - 12:30 PM"
                                    profesor="Prof. Jane Smith"
                                    cluster="Cluster B"
                                />
                                <SubjectsSection
                                    materia="Computer Science"
                                    horario="1:30 PM - 3:00 PM"
                                    profesor="Prof. Michael Johnson"
                                    cluster="Cluster C"
                                />
                            </td>

                            <td className="p-4 border border-[#131a2e] animate-slide-in-right">
                                <SubjectsSection
                                    materia="Economics"
                                    horario="9:00 AM - 10:30 AM"
                                    profesor="Prof. Robert Kim"
                                    cluster="Cluster A"
                                />
                                <SubjectsSection
                                    materia="Chemistry"
                                    horario="11:00 AM - 12:30 PM"
                                    profesor="Prof. Lisa Park"
                                    cluster="Cluster B"
                                />
                            </td>
                            <td className="p-4 border border-[#131a2e] animate-slide-in-right">

                                <SubjectsSection
                                    materia="Calculus"
                                    horario="9:00 AM - 10:30 AM"
                                    profesor="Prof. Ava Patel"
                                    cluster="Cluster A"
                                />
                                <SubjectsSection
                                    materia="Astronomy"
                                    horario="11:00 AM - 12:30 PM"
                                    profesor="Prof. Ethan Cho"
                                    cluster="Cluster B"
                                />
                            </td>
                            <td className="p-4 border border-[#131a2e] animate-slide-in-right">

                                <SubjectsSection
                                    materia="Macroeconomics"
                                    horario="9:00 AM - 10:30 AM"
                                    profesor="Prof. Ava Patel"
                                    cluster="Cluster A"
                                />
                                <SubjectsSection
                                    materia="Organic Chemistry"
                                    horario="11:00 AM - 12:30 PM"
                                    profesor="Prof. Ethan Cho"
                                    cluster="Cluster B"
                                />
                            </td>
                            <td className="p-4 border border-[#131a2e] animate-slide-in-right">
                                <SubjectsSection
                                    materia="Differential Equations"
                                    horario="9:00 AM - 10:30 AM"
                                    profesor="Prof. Ava Patel"
                                    cluster="Cluster A"
                                />
                            </td>
                        </Tr>
                    </tbody>
                </table>
            </div>
        </section>

    )
}