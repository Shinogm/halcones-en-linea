import { FormSection, H1, Main } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'
import { RegisterForm } from '../../components/register-form'
import { USER_TYPES } from '@/services/supabase/functions/types'

interface Props {
  params?: {
    id: string
  }
}

export default async function NewCoordinatorPage ({ params }: Props) {
  const editMode = params?.id != null

  const coordinator = editMode ? await getAccount(params?.id ?? '') : null

  return (
    <Main>
      <H1 className='text-white'>
        {editMode != null ? 'Editar coordinador' : 'Crear nuevo coordinador'}
      </H1>

      <FormSection>
        <RegisterForm
          defaultValues={coordinator ?? undefined}
          from='coordinators' role={USER_TYPES.COORDINATOR}
        />
      </FormSection>
    </Main>
  )
}
