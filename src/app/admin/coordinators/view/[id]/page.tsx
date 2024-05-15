import { H1, Main, RedirectPlus } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'
import Link from 'next/link'

interface Props {
  params: {
    id: string
  }
}

export default async function ViewCoordinatorPage ({ params }: Props) {
  const coordinator = await getAccount(params.id)

  return (
    <Main>
      <header className='flex w-full justify-between'>
        <Link href={`/admin/coordinators/edit/${params.id}`}>
          <H1 className='text-white capitalize transition-colors hover:text-itesus-primary'>
            {coordinator.first_name} {coordinator.last_name}
          </H1>
        </Link>

        <RedirectPlus href={`/admin/coordinator/edit/${coordinator.id}/add-career`} />
      </header>
    </Main>
  )
}
