'use server'
import { createClient } from '../actions'

export const getCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, rvoe, created_at, campus(id, name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}

export const getReducedCareers = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, campus(id, name)')

  if (error != null) {
    console.error('Error getting careers:', error)
    throw new Error('Error getting careers')
  }

  return data
}

export const getCareerById = async (id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('careers').select('id, name, rvoe, created_at, coordinator, campus(id, name)').eq('id', id).single()

  if (error != null) {
    console.error('Error getting career:', error)
    throw new Error('Error getting career')
  }

  return data
}

export const getCareerBySlug = async (slug: string) => {
  const supabase = await createClient()

  const safeSlug = decodeURIComponent(slug)

  const { data, error } = await supabase
    .from('careers')
    .select('id, name')
    .eq('slug', safeSlug)
    .single()

  if (error != null) {
    console.error('Error getting career:', error)
    throw new Error('Error getting career')
  }

  return data
}
