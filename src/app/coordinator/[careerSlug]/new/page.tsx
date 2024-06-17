'use server'
import { getCareerBySlug } from "@/services/supabase/actions/careers"
import { getAllCoordinators } from "@/services/supabase/actions/coordinators"
import { getGroupsByCareer } from "@/services/supabase/actions/groups"
import { getProfessors } from "@/services/supabase/actions/professors"
import { NewCalendarForm } from "../../components/new-calendar-form"
import Link from "next/link"

interface Props {
    params: {
        careerSlug: string
    }
}

export default async function newCalendarPage({ params }: Props) {
    const career = await getCareerBySlug(params.careerSlug)
    const getCoordinator = await getAllCoordinators()
    const professors = await getProfessors()
    const groups = await getGroupsByCareer(career.id)
    const generateHref = (slug: string) => `/coordinator/${slug}/new`;

    return (

        <section>
            <body className="bg-gray-100 p-6">

                <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                    <h2 className=" text-centertext-xl font-bold mb-4 text-black">Formulario de Asignación para {career.name}</h2>


                    <NewCalendarForm
                        professor={professors.map((professor) => professor.first_name)}
                        career={career.id}
                        id={getCoordinator[0].id}
                        groups={groups.map((group) => group.name)}
                    />
                    <Link href={generateHref(params.careerSlug)}>
                        <button type="button" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Regresar</button>
                    </Link>

                </div>
            </body>
        </section>
    )
}