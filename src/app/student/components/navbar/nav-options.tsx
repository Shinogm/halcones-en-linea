'use client'

import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import Link from 'next/link'
import { v4 } from '@/utils/uuid'
import { queryParamsSections, subjectRefs } from '../../layout'

export const NavOptios = () => {
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  const options = [
    {
      startWith: '/student/subject',
      getRoutes: ({ params }) => {
        const slug = z.coerce.string().parse(params.slug)

        const queryParam = queryParamsSections.subjectSection

        return [
          {
            name: 'Temas',
            href: `/student/subject/${slug}/topics`,
            ref: subjectRefs.topics,
            queryParam
          },
          {
            name: 'Documentación',
            href: `/student/subject/${slug}/documents`,
            ref: subjectRefs.documents,
            queryParam
          },
          {
            name: 'Actividades',
            href: `/student/subject/${slug}/activities`,
            ref: subjectRefs.activities,
            queryParam
          },
          {
            name: 'Examen',
            href: `/student/subject/${slug}/exam`,
            ref: subjectRefs.exam,
            queryParam
          },
          {
            name: 'Clases grabadas',
            href: `/student/subject/${slug}/recordedclasses`,
            ref: subjectRefs.recordedclasses,
            queryParam
          }
        ]
      }
    }
  ]

  const routes = options.find(({ startWith }) => pathname.startsWith(startWith))?.getRoutes({ params })

  if (routes == null) return null

  return (
    <section className='flex flex-row text-xl h-full justify-center flex-1 items-center'>
      {/* <div className='flex flex-row text-xl h-full justify-center items-center'> */}
      {routes.map(({ name, href, ref, queryParam }, i) => {
        const newSearch = new URLSearchParams(searchParams)
        newSearch.set(queryParam, ref)

        return (
          <Link
            key={v4()}
            className={`
            flex border-r-[#27316e] px-2 py-1
            ${i === (routes.length - 1) ? '' : 'border-r-2'} 
            `}
            href={`${href}?${newSearch.toString()}`}
          >
            <span
              className={`
              px-2 hover:text-[#fff] hover:bg-gradient-to-tr from-[#1f5186] to-[#131a2d] hover:rounded-lg
            ${
              pathname === href
              ? 'text-[#fff] bg-gradient-to-tr from-[#1f5186] to-[#131a2d] rounded-lg'
              : 'text-[#27316e]'
            }
          `}
            >
              {name}
            </span>
          </Link>
        )
      })}
      {/* </div> */}
    </section>

  )
}
