import { H1, Main, RedirectPlus, TBody, THeadSticky, Table, TableContainer, TdWhite, ThWhite, Tr, Tr2 } from '@/components/utils'
import { getCareers } from '@/services/supabase/actions/careers'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function CareersPage () {
  const careers = await getCareers()

  return (
    <Main>
      <div
        className='flex items-center justify-between mb-10'
      >
        <H1
          className='text-white'
        >
          Carreras
        </H1>

        <RedirectPlus href='/admin/careers/new' />
      </div>

      <TableContainer>
        <Table>
          <THeadSticky>
            <Tr2>
              <ThWhite>Nombre</ThWhite>
              <ThWhite>RVOE</ThWhite>
              <ThWhite>Campus</ThWhite>
              <ThWhite>Fecha de creacion</ThWhite>
              <ThWhite>Acciones</ThWhite>
            </Tr2>
          </THeadSticky>

          <TBody>
            {careers.map((career) => (
              <Tr
                key={v4()}
              >
                <TdWhite
                  className='capitalize'
                >
                  {career.name}
                </TdWhite>
                <TdWhite>
                  {career.rvoe}
                </TdWhite>
                <TdWhite>
                  {career.campus?.name}
                </TdWhite>
                <TdWhite>
                  {dateFormatter(new Date(career.created_at), 'es-MX')}
                </TdWhite>
                <TdWhite
                  className='py-1'
                >
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/careers/edit/${career.id}`}
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
