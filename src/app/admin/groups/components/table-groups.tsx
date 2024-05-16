import { TableContainer, Table, THeadSticky, TdWhite, ThWhite, Tr2, TBody, Tr } from '@/components/utils'
import { getGroupsByCareer } from '@/services/supabase/actions/groups'
import { dateFormatter } from '@/utils/formatters'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

interface Props {
  careerId: number
}

export async function TableGroups ({ careerId }: Props) {
  const groups = await getGroupsByCareer(careerId)

  return (
    <TableContainer>
      <Table>
        <THeadSticky>
          <Tr2>
            <ThWhite>Grupo</ThWhite>
            <ThWhite>Fecha de creacion</ThWhite>
            <ThWhite>Acciones</ThWhite>
          </Tr2>
        </THeadSticky>

        <TBody>
          {groups.map(group => (
            <Tr key={v4()}>
              <TdWhite>{group.name}</TdWhite>
              <TdWhite>{dateFormatter(new Date(group.created_at), 'es-MX')}</TdWhite>
              <TdWhite>
                <div className='flex justify-center items-center'>
                  <Link
                    href={`/admin/groups/edit/${group.id}`}
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
  )
}
