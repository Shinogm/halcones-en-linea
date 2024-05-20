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

  const { data: careers, error } = await supabase.from('careers').select('id name').eq('coordinator', id)

  if (error != null) {
    console.error('Error getting coordinator careers:', error)
    throw new Error('Error getting coordinator careers')
  }

  return careers
}
