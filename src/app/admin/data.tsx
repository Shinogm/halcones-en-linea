import { SideBarOptions } from '@/components/sidebar/types'

export const staticRoutes: SideBarOptions = [
  {
    title: 'Carreras',
    sub: [
      {
        href: '/admin/careers',
        title: 'Lista de carreras'
      },
      {
        href: '/admin/careers/new',
        title: 'Nueva carrera'
      }
    ]
  },
  {
    title: 'Materias',
    sub: [
      {
        href: '/admin/subjects',
        title: 'Lista de materias'
      },
      {
        href: '/admin/subjects/new',
        title: 'Nueva materia'
      }
    ]
  },
  {
    title: 'Planes de estudio',
    sub: [
      {
        href: '/admin/education-plans',
        title: 'Lista de planes de estudio'
      },
      {
        href: '/admin/education-plans/new',
        title: 'Nuevo plan de estudio'
      }
    ]
  },
  {
    title: 'Grupos',
    sub: [
      {
        href: '/admin/groups',
        title: 'Lista de grupos'
      },
      {
        href: '/admin/groups/new',
        title: 'Nuevo grupo'
      }
    ]
  },
  {
    title: 'Alumnos',
    sub: [
      {
        href: '/admin/students',
        title: 'Lista de alumnos'
      },
      {
        href: '/admin/students/new',
        title: 'Nuevo alumno'
      }
    ]
  },
  {
    title: 'Profesores',
    sub: [
      {
        href: '/admin/professor',
        title: 'Lista de profesores'
      },
      {
        href: '/admin/professor/new',
        title: 'Nuevo profesor'
      }
    ]
  }
]
