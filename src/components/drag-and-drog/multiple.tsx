'use client'

import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import {
  multiDrag,
  selections
} from '@formkit/drag-and-drop'
import { v4 } from '@/utils/uuid'

const className = 'bg-blue-500 text-white'

interface Props {
  group?: string
  options: string[]
  id?: string
  search?: string
}

export function MultiDragAndDrop ({ options = [], group = 'A', id = '', search }: Props) {
  const [parent, files] = useDragAndDrop<HTMLUListElement, string>(options, {
    group,
    plugins: [
      multiDrag({
        plugins: [
          selections({
            selectedClass: className
          })
        ]
      })
    ]
  })

  const filterFiles = (files: string[]) => {
    if (search == null) return files

    return files.filter((file) => file.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <>
      <input
        name={`${group}-${id}-${v4()}`}
        className='hidden'
        value={files.join(',')}
        readOnly
      />
      <div
        className='flex-1 w-full'
      >
        <ul
          ref={parent}
          className='flex min-h-16 w-full justify-start items-start flex-wrap'
        >
          {filterFiles(files).map((file) => (
            <li
              key={v4()}
              className='px-3 h-min mr-2 mb-2 rounded-md bg-blue-500 text-white cursor-pointer'
            >
              {file}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
