import { Main, ShyScrollbar } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions/subjects'
import { v4 } from '@/utils/uuid'
import { DisplaySubject } from './components/section'

export default async function SubjectsPage () {
  const subjects = await getSubjects()

  return (
    <Main>

      <section className='w-full py-12 md:py-24 lg:py-32 overflow-y-auto' style={ShyScrollbar}>
        <div className='container px-4 md:px-6'>
          <div className='space-y-4 md:space-y-6'>
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center'>
                Materias
              </h2>
              <p className='mx-auto max-w-[700px] text-white/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center'>
                Administra, edita y crea nuevas materias para los estudiantes.
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

              {subjects.length > 0
                ? (
                  <>
                    {subjects.map((subject, i) => (
                      <DisplaySubject
                        key={v4()}
                        title={subject.name}
                        description='Explora los conceptos fundamentales y avanzados de las materias.'
                        svg={i}
                      />

                    ))}
                  </>
                  )
                : (
                  <div className='text-white text-center'>
                    No hay materias disponibles.
                  </div>
                  )}
            </div>
          </div>
        </div>
      </section>
    </Main>
  )
}
