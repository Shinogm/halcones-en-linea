import { USER_TYPES } from '@/services/supabase/functions/types'
import { RegisterForm } from '@/app/admin/components/register-form'
import { Main, H1, FormSection } from '@/components/utils'
import { getAccount } from '@/services/supabase/actions/auth'

interface Props {
  params?: {
    id: string
  }
}

export default async function NewStudentsPage ({ params }: Props) {
  const editMode = params?.id != null

  const student = editMode ? await getAccount(params?.id ?? '') : null

  return (
    <Main>
      <FormSection>
        <div className='flex flex-col items-center justify-center'>
          <H1 className='text-white'>{editMode ? 'Editar Alumno' : 'Crear Alumno'}</H1>
          <a className='text-white'>Ingresa los datos del nuevo alumno</a>
        </div>
        <RegisterForm from='students' defaultValues={student ?? undefined} role={USER_TYPES.STUDENT} />
      </FormSection>

    </Main>
  )
}
