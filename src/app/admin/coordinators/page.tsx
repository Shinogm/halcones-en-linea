import { H1, Main, RedirectPlus, THeadSticky, Table, TableContainer, TdWhite, ThWhite, Tr } from '@/components/utils'
import { getAllCoordinators } from '@/services/supabase/actions/coordinators'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function CoordinatorsPage () {
  const coordinators = await getAllCoordinators()

  return (
    <Main>
      <div className='flex items-center justify-between mb-4'>
        <H1 className='text-white'>Coordinadores</H1>

        <RedirectPlus href='/admin/coordinators/new' />
      </div>

      <TableContainer>
        <Table>
          <THeadSticky>
            <tr>
              <ThWhite>Nombre</ThWhite>
              <ThWhite>Correo</ThWhite>
              <ThWhite>Fecha de creacion</ThWhite>
              <ThWhite>Acciones</ThWhite>
            </tr>
          </THeadSticky>
          <tbody>
            {coordinators.map((coordinator) => (
              <Tr key={v4()}>
                <TdWhite className='capitalize'>{coordinator.first_name} {coordinator.last_name}</TdWhite>
                <TdWhite>{coordinator.email}</TdWhite>
                <TdWhite>{dateFormatter(new Date(coordinator.created_at), 'es-MX')}</TdWhite>
                <TdWhite className='py-1'>
                  <div className='flex justify-center items-center'>
                    <Link
                      href={`/admin/coordinators/view/${coordinator?.owner ?? ''}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit size={20} />
                    </Link>
                  </div>
                </TdWhite>
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

    </Main>
  )
}
