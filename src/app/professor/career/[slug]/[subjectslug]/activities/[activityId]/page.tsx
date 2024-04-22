import { Main } from '@/components/utils'
import { getActivityById, getMyStudents } from '@/services/supabase/actions/professors'
import { v4 } from '@/utils/uuid'

interface Props {
  params: {
    activityId: string
  }
  searchParams: {
    careerId?: string
    educationPlanId?: string
    groupId?: string
    semesterId?: string
  }
}

const ACTIVITY_TYPES = {
  work: 'Trabajo',
  trivia: 'Trivia',
  questionary: 'Cuestionario',
  exam: 'Examen'
}

export default async function ActivityPage ({ params, searchParams }: Props) {
  const activity = await getActivityById(Number(params.activityId))

  const myStudents = await getMyStudents({
    careerId: Number(searchParams.careerId),
    educationPlanId: Number(searchParams.educationPlanId),
    groupId: Number(searchParams.groupId),
    semesterId: Number(searchParams.semesterId)
  })

  console.log(myStudents)

  return (
    <Main>
      <header className='flex flex-col justify-center items-center border-b border-itesus-tertiary pb-3'>
        <div className='bg-white w-fit px-2'>
          <h1 className='text-xl text-itesus-primary font-semibold'>
            {activity.name}
          </h1>
        </div>

        {activity.desc != null && (
          <p className='
            mt-4
            text-lg
            text-white
            font-light
            text-center
            max-w-md
          '
          >
            {activity.desc}
          </p>
        )}
      </header>

      <span className='text-end text-itesus-tertiary text-xl font-semibold'>
        {ACTIVITY_TYPES[activity.type]}
      </span>

      <section
        className='flex flex-1 gap-6'
      >

        <ul className='w-[30%]'>
          {myStudents.map(student => (
            <li key={v4()} className='flex gap-2'>
              <div className='bg-white px-2 flex-1 items-center justify-center'>
                <span className='text-center'>{student?.first_name} {student?.last_name}</span>
              </div>

              <input
                className='bg-white px-2 max-w-20'
              />
            </li>
          ))}
        </ul>

        <div className='flex-1'>

          <section>
            <select>
              <option>Todos</option>
              <option>Entregados</option>
              <option>No entregados</option>
            </select>
          </section>

          <section />

        </div>

      </section>
    </Main>
  )
}
