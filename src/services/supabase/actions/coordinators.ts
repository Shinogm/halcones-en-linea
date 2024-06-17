import { createClient } from '../actions'
import { USER_TYPES } from '../functions/types'

export const getAllCoordinators = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('user_data').select('*').eq('role', USER_TYPES.COORDINATOR)

  if (error != null) {
    console.error('Error getting professors:', error)
    throw new Error('Error getting professors')
  }

  return data
}

export const getCoordinatorCareers = async (id: string) => {
  const supabase = await createClient()

  const { data: careers, error } = await supabase.from('careers').select('id, name, slug').eq('coordinator', id)

  if (error != null) {
    console.log('Error getting coordinator careers:', error)
    throw new Error('Error getting coordinator careers')
  }

  return careers
}

export const createCalendar = async (day: string, hour: string, coordinator: number, professor: string, career: number, subject: string, group: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('calendar')
    .insert(
      {
        hour,
        day,
        coordinator,
        professor,
        career,
        subject,
        group
      }
    )

  if (error != null) {
    console.log('Error creating calendar:', error)
    throw new Error('Error creating calendar')
  }

  return data
}
