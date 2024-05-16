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

      <FormSection>
        <div className='flex flex-col items-center justify-center'>
          <H1 className='text-white'>
            {editMode ? 'Editar coordinador' : 'Crear nuevo coordinador'}
          </H1>
          <a className='text-white'>Ingresa los datos del nuevo coordinador</a>
        </div>
        <RegisterForm
          defaultValues={coordinator ?? undefined}
          from='coordinators' role={USER_TYPES.COORDINATOR}
        />
      </FormSection>
    </Main>
  )
}
