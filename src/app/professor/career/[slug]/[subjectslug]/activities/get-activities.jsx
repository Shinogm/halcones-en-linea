import { getMyActivities } from '@/services/supabase/actions/professors'
import { v4 } from '@/utils/uuid'
import Link from 'next/link'

export const DisplayActivities = async ({ params, searchParams }) => {
  const activities = await getMyActivities({
    careerId: searchParams?.careerId,
    subjectId: searchParams?.subjectId,
    educationPlanId: searchParams?.educationPlanId,
    groupId: searchParams?.groupId,
    semesterId: searchParams?.semesterId
  })

  return (
    <section className='grid grid-cols-2 grid-flow-row h-full w-full gap-10 px-20 '>
      {activities?.map(activity => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('activityId', activity.id)

        return (
          <Link
            key={v4()}
            href={`/professor/career/${params?.slug}/${params?.subjectslug ?? ''}/activities/${activity.id}?${newSearchParams.toString()}`}
          >
            <article className='gap-5 flex flex-row h-[10rem] w-[30rem]'>
              <img src={activity?.type === 'trivia' ? '/trivia.png' : activity?.type === 'exam' ? '/examen.png' : activity?.type === 'questionary' ? '/cuestionario.png' : '/actividad.png'} alt='activity' className='h-[4rem]' />
              <div className='bg-[#ccccca] flex w-full h-full flex-col text-start gap-5 rounded-lg p-3'>
                <h2 className='text-[#1e244b] underline text-xl'>{activity?.name}</h2>
                <span className='text-[#1e244b] text-md'>{activity?.desc}</span>
                <span className='text-[#1e244b] underline text-end'>Entrega- {(typeof activity?.deadline === 'string' ? activity?.deadline.split('T')[0] : '')}</span>
              </div>
            </article>
          </Link>
        )
      })}
    </section>
  )
}
