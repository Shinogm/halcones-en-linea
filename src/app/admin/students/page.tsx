import { H1, Main, RedirectPlus, HeaderBetween, TableContainer, Table, THeadSticky, Tr, ThWhite, TdWhite, Tr2, TBody } from '@/components/utils'
import { getStudents } from '@/services/supabase/actions/students'
import { v4 } from '@/utils/uuid'
import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'

export default async function StudentsPage () {
  const students = await getStudents()

  return (
    <Main>

      <HeaderBetween>
        <H1
          className='text-white'
        >
          Estudiantes
        </H1>

        <RedirectPlus href='/admin/students/new' />
      </HeaderBetween>

      <TableContainer>
        <Table>
          <THeadSticky>
            <Tr2>
              <ThWhite>Nombre</ThWhite>
              <ThWhite>Correo</ThWhite>
              <ThWhite>Telefono</ThWhite>
              <ThWhite>Acciones</ThWhite>
            </Tr2>
          </THeadSticky>
          <TBody>
            {students.map((student) => (
              <Tr
                key={v4()}
              >
                <TdWhite
                  className='capitalize'
                >
                  {student.first_name} {student.last_name}
                </TdWhite>
                <TdWhite>{student.email}</TdWhite>
                <TdWhite>{student.phone}</TdWhite>
                <TdWhite>
                  <div className='flex justify-center items-center py-1'>
                    <Link
                      href={`/admin/students/view/${student.owner ?? ''}`}
                      className='p-1 bg-itesus-primary rounded-md cursor-pointer hover:bg-itesus-secondary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-itesus-secondary focus:border-transparent'
                    >
                      <IconEdit
                        size={20}
                        strokeWidth={1.5}
                        color='#fff'
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
