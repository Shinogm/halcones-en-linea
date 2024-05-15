'use server'

import { z } from 'zod'
import { createClient } from '../../actions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateAccountInfo = async (data: FormData, from: 'students' | 'professor' | 'coordinators') => {
  const supabase = await createClient()

  const convertToString = (val: any) => z.string({
    coerce: true
  }).parse(val)

  const { error } = await supabase.from('user_data').update({
    email: convertToString(data.get('email')),
    first_name: convertToString(data.get('first_name')),
    last_name: convertToString(data.get('last_name')),
    phone: convertToString(data.get('phone'))
  }).eq('owner', convertToString(data.get('owner')))

  if (error != null) {
    throw new Error(error.message)
  }

  revalidatePath(`/admin/${from}/view/${convertToString(data.get('owner'))}`)
  redirect(`/admin/${from}/view/${convertToString(data.get('owner'))}`)
}
