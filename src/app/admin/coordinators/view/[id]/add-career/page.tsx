import { H1, Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'
import { getReducedCareers } from '@/services/supabase/actions/careers'
import { getCoordinatorCareers } from '@/services/supabase/actions/coordinators'
import { DisplayCareer } from './components/career'
import { v4 } from '@/utils/uuid'

interface Props {
  params: {
    id: string
  }
}

export default async function AddCareerPage ({ params }: Props) {
  const coordinator = await getAccount(params.id)
  const coodinatorCareers = await getCoordinatorCareers(params.id)
  const careers = await getReducedCareers()

  console.log(coordinator)
  console.log(careers)

  return (
    <Main>
      <H1 className='text-white'>
        Añadir carreras a {coordinator.first_name} {coordinator.last_name}
      </H1>

      <section>

        {
            careers.map((career) => (
              <DisplayCareer
                key={v4()}
                career={career}
                checked={coodinatorCareers.some((coodinatorCareer) => coodinatorCareer?.id === career.id)}
                coordinatorId={params.id}
              />
            ))
        }

      </section>
    </Main>
  )
}
