'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const redirectAndRevalidate = async (url: string) => {
  revalidatePath(url)
  redirect(url)
}
