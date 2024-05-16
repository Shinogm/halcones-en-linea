import { H1, Main, RedirectPlus, TBody, THeadSticky, Table, TableContainer, TdWhite, ThWhite, Tr, Tr2 } from '@/components/utils'
import { getEducationPlans } from '@/services/supabase/actions/admin/education-plan'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function EducationPlansPage () {
  const plans = await getEducationPlans()

  return (
    <Main>

      <div
        className='flex items-center justify-between mb-4'
      >
        <H1
          className='mb-0 text-white'
        >
          Planes de educación
        </H1>

        <RedirectPlus href='/admin/education-plans/new' />
      </div>

      <TableContainer>
        <Table>
          <THeadSticky>
            <Tr2>
              <ThWhite>Nombre</ThWhite>
              <ThWhite>Carrera</ThWhite>
              <ThWhite>Semestres</ThWhite>
              <ThWhite>Fecha de creacion</ThWhite>
              <ThWhite>Acciones</ThWhite>
            </Tr2>
          </THeadSticky>
          <TBody>
            {plans.map((plan, i) => (
              <Tr key={v4()}>
                <TdWhite
                  className='capitalize'
                >
                  {plan.name}
                </TdWhite>
                <TdWhite>
                  {plan.careers?.name ?? 'Sin carrera'}
                </TdWhite>
                <TdWhite>
                  {plan.semesters.length}
                </TdWhite>
                <TdWhite>
                  {dateFormatter(new Date(plan.created_at), 'es-MX')}
                </TdWhite>
                <TdWhite
                  className='py-1'
                >
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/education-plans/edit/${plan.id}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit
                        size={20}
                      />
                    </Link>
                  </div>
                </TdWhite>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>
    </Main>
  )
}
