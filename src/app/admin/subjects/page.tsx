import { Main, RedirectPlus, ShyScrollbar } from '@/components/utils'
import { getSubjects } from '@/services/supabase/actions/subjects'
import { v4 } from '@/utils/uuid'
import { DisplaySubject } from './components/section'

export default async function SubjectsPage () {
  const subjects = await getSubjects()

  return (
    <Main>

      <section className='w-full py-16 overflow-y-auto' style={ShyScrollbar}>
        <div className='relative container px-4 md:px-6'>
          <div className='space-y-4 md:space-y-6'>
            <header className='space-y-3'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center'>
                Explora Nuestras Materias
              </h2>
              <RedirectPlus
                className='absolute right-6 py-3 px-3 animate-fade-in' href='/admin/subjects/new'
              />
              <p className='mx-auto max-w-[700px] text-white/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center'>
                Descubre una amplia gama de materias que te ayudarán a alcanzar tus metas académicas.
              </p>
            </header>
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
