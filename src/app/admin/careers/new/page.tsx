import { Form, FormSection, H1, LabeledInput, Main, LabeledSelect, SubmitButton } from '@/components/utils'
import { createCareer, updateCareer } from '@/services/supabase/actions/admin/career'
import { getCampuses } from '@/services/supabase/actions/campuses'
import { getCareerById } from '@/services/supabase/actions/careers'
import { getAllCoordinators } from '@/services/supabase/actions/coordinators'
import { v4 } from '@/utils/uuid'

interface Props {
  params: {
    id?: string
  }
}

export default async function NewCareerPage ({ params }: Props) {
  const campus = await getCampuses()

  const editMode = params?.id != null

  const career = editMode ? await getCareerById(params?.id ?? '') : null

  console.log(career)

  const action = editMode ? updateCareer : createCareer

  const coordinators = await getAllCoordinators()

  console.log(coordinators)

  return (
    <Main>
      <H1 className='text-white'>
        {editMode ? 'Editar carrera' : 'Crear carrera'}
      </H1>

      <FormSection>
        <Form action={action}>
          <input type='hidden' name='id' value={career?.id} />

          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            required
            placeholder='Ingeniería en Sistemas Computacionales'
            defaultValue={career?.name}
          />

          <LabeledInput
            label='RVOE'
            name='rvoe'
            type='text'
            required
            placeholder='RVOE-123456'
            defaultValue={career?.rvoe}
          />

          <LabeledSelect name='campus' label='Campus' defaultValue={career?.campus?.id}>
            {campus.map((campus) => (
              <option
                key={v4()}
                value={campus.id}
              >
                {campus.name}
              </option>
            ))}
          </LabeledSelect>

          <LabeledSelect name='coordinator' label='Coordinador' defaultValue={career?.coordinator ?? ''}>
            <option value='null'>No seleccionado</option>
            {coordinators.map((coordinator) => (
              <option
                key={v4()}
                value={coordinator.owner ?? ''}
              >
                {coordinator.first_name} {coordinator.last_name}
              </option>
            ))}
          </LabeledSelect>

          <SubmitButton>
            {editMode ? 'Actualizar carrera' : 'Crear carrera'}
          </SubmitButton>

        </Form>

      </FormSection>
    </Main>
  )
}
