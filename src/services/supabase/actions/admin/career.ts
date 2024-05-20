'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../actions'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createCareer = async (data: FormData) => {
  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  console.log(entries)

  await supabase.from('careers').insert({
    name: z.coerce.string().parse(entries.name),
    rvoe: z.coerce.string().parse(entries.rvoe),
    campus: z.coerce.number().parse(entries.campus),
    coordinator: entries.coordinator === 'null' ? null : z.coerce.string().parse(entries.coordinator)
  })

  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}

export const updateCareer = async (data: FormData) => {
  const supabase = await createClient()

  const entries = Object.fromEntries(data.entries())

  console.log(entries)

  await supabase.from('careers').update({
    name: z.coerce.string().parse(entries.name),
    rvoe: z.coerce.string().parse(entries.rvoe),
    campus: z.coerce.number().parse(entries.campus),
    coordinator: entries.coordinator === 'null' ? null : z.coerce.string().parse(entries.coordinator)
  }).eq('id', entries.id)

  revalidatePath('/admin/careers')
  redirect('/admin/careers')
}
