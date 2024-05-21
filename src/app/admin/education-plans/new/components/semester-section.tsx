'use client'

import { BooksIcon } from '@/assets/icons'
import { MultiDragAndDrop } from '@/components/drag-and-drog/multiple'
import { H2, LabeledInput, ShyScrollbar } from '@/components/utils'
import { SearchInput } from '@/components/utils/client/inputs'
import { EducationPlan } from '@/services/supabase/types'
import { v4 } from '@/utils/uuid'
import { Tables } from 'database.types'
import { useState } from 'react'
import { z } from 'zod'

interface Props {
  subjects: Array<Tables<'subjects'>>
  defaultValue?: EducationPlan
  search?: string
}

export const SemesterSection = ({ subjects, defaultValue, search }: Props) => {
  const [semesters, setSemesters] = useState(defaultValue?.semesters.length ?? 1)

  const semesterItem = defaultValue?.semesters ?? []

  return (
    <>
      <LabeledInput
        label='Cantidad de semestres'
        name='semesters'
        type='number'
        required
        defaultValue={defaultValue?.semesters.length ?? 1}
        className='mb-2'
        onChange={(event) => {
          const { success, data } = z.number().safeParse(Number(event.target.value)) as { success: boolean, data: number }

          if (!success) return

          if (data > 15) {
            event.target.value = '15'
            setSemesters(15)
            return
          }

          setSemesters(data)
        }}
      />

      <div className='flex w-full h-96 overflow-hidden '>

        <section className='px-3 flex flex-col py-1 rounded-md bg-itesus-secondary h-full w-96'>
          <div
            className='flex border-b mb-3 py-1 justify-between gap-10'
          >
            <H2 className='flex gap-1 items-center text-white'>
              <BooksIcon /> Materias
            </H2>

            <div className='h-full flex justify-center items-center'>
              <SearchInput placeholder='Buscar...' />
            </div>
          </div>

          <MultiDragAndDrop
            search={search}
            group='subjects'
            options={subjects.map((subject) => subject.name)}
          />
        </section>

        <section
          className='grid grid-cols-2 gap-3 w-full overflow-y-auto px-2'
          style={ShyScrollbar}
        >

          {Array.from({ length: semesters }).map((_, index) => (
            <article key={v4()} className='border px-3 py-1 rounded-md min-h-72 w-full'>
              <H2
                className='border-b py-1 mb-3 text-white'
              >
                Semestre {index + 1}
              </H2>

              <MultiDragAndDrop
                group='subjects'
                options={semesterItem.find(s => s.number === index + 1)?.semester_subjects.map((ss) => ss.subjects?.name ?? '') ?? []}
                id={`${index + 1}`}
              />
            </article>
          ))}

        </section>

      </div>
    </>
  )
}
