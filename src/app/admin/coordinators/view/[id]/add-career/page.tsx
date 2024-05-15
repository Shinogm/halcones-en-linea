import { Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'

interface Props {
  params: {
    id: string
  }
}

export default async function AddCareerPage ({ params }: Props) {
  const coordinator = await getAccount(params.id)

  console.log(coordinator)

  return (
    <Main>
      a
    </Main>
  )
}
