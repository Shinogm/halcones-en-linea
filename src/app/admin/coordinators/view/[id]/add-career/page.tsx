import { H1, Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'
import { getReducedCareers } from '@/services/supabase/actions/careers'
import { getCoordinatorCareers } from '@/services/supabase/actions/coordinators'

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
    </Main>
  )
}
