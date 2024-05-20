import { Form, H1, LabeledInput, LabeledSelect, Main, SubmitButton } from '@/components/utils'
import { SemesterSection } from './components/semester-section'
import { Tables } from 'database.types'
import { createEducationPlan, getEducationPlan, updateEducationPlan } from '@/services/supabase/actions/admin/education-plan'
import { getReducedCareers } from '@/services/supabase/actions/careers'
import { getSubjects } from '@/services/supabase/actions/subjects'
import { v4 } from '@/utils/uuid'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    q?: string
  }
  isEditMode?: boolean
}

export default async function NewEducationPlan ({ params, isEditMode = false, searchParams }: Props) {
  const planEdu = isEditMode ? await getEducationPlan(params.id) : null
  const careers = !isEditMode && await getReducedCareers()
  console.log(searchParams.q)

  const subjectsInPlan = (planEdu?.semesters ?? []).reduce<Array<Tables<'subjects'>>>((acc, semester) => {
    const subjects = (semester.semester_subjects ?? []).map((ss) => ss?.subjects).filter((s) => s != null) as Array<Tables<'subjects'>>

    return acc.concat(subjects)
  }, [])

  const subjects = isEditMode
    ? (await getSubjects()).filter((subject) => {
        return !(subjectsInPlan ?? []).some((materia) => materia.id === subject.id)
      })
    : await getSubjects()

  const action = async (data: FormData) => {
    'use server'

    const func = isEditMode && planEdu != null
      ? async () => await updateEducationPlan(planEdu, data)
      : async () => await createEducationPlan(data)

    await func()
  }

  return (
    <Main>
      <H1 className='mb-4 text-white'>Nuevo plan educativo</H1>

      <section className='flex-1'>
        <Form
          action={action}
          className='h-full flex flex-col'
        >
          <LabeledInput
            label='Nombre'
            name='name'
            type='text'
            placeholder='Plan edu 2024'
            required
            defaultValue={planEdu?.name}
          />

          {/* <LabeledSelect /> */}

          {careers !== false && (
            <LabeledSelect
              label='Carrera'
              name='career'
              required
            >
              {careers.map((career) => (
                <option
                  key={v4()}
                  value={career.id}
                >
                  {career.name}
                </option>
              ))}
            </LabeledSelect>
          )}

          <SemesterSection
            defaultValue={planEdu ?? undefined}
            subjects={subjects}
            search={searchParams.q}
          />

          <SubmitButton>
            Crear plan educativo
          </SubmitButton>
        </Form>
      </section>
    </Main>
  )
}
