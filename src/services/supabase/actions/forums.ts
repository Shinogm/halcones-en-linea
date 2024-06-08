'use server'

import { Source_Serif_4 } from "next/font/google"
import { createClient } from "../actions"
import { v4 } from "@/utils/uuid"


type PSendMessage = {
    message: string
    subjectId: number
    groupId: number
    educationPlanId: number
    careerId: number
}

export const sendMessage = async ({ careerId, educationPlanId, groupId, subjectId, message }: PSendMessage) => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getSession()

    if (error != null || data == null) {
        console.error('Error getting session:', error)
        throw new Error('Error getting session')
    }

    await supabase.from('forum_messages').insert({
        career: careerId,
        education_plan: educationPlanId,
        group: groupId,
        subject: subjectId,
        message: message,
        owner: data.session?.user.id ?? ''
    })

    const { data: userData } = await supabase
        .from('user_data')
        .select('first_name, last_name')
        .eq('owner', data.session?.user.id ?? '')
        .single()

    await supabase.channel(`forum-messages-${careerId}-${educationPlanId}-${groupId}-${subjectId}`).send({
        event: 'message',
        payload: {
            id: v4(),
            message,
            senderName: `${userData?.first_name} ${userData?.last_name}`,
            isMyMessage: true,
            owner: data.session?.user.id ?? ''
        },
        type: 'broadcast'
    })
}


type PListMessages = Omit<PSendMessage, 'message'>
export const getMessages = async ({ careerId, educationPlanId, groupId, subjectId }: PListMessages) => {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getSession()

    if (error != null || data == null) {
        console.error('Error getting session:', error)
        throw new Error('Error getting session')
    }

    const { data: messages, error: errorMessages } = await supabase.from('forum_messages').select('id, message, owner').eq('subject', subjectId).eq('group', groupId).eq('education_plan', educationPlanId).eq('career', careerId).order('created_at', { ascending: false })

    if (errorMessages != null) {
        console.error('Error getting messages:', errorMessages)
        throw new Error('Error getting messages')
    }

    const messageWithSender = await Promise.all(
        messages.map(async (m) => {
            const { data: userData } = await supabase
                .from('user_data')
                .select('first_name, last_name')
                .eq('owner', m.owner)
                .single()

            const itsMyMessage = m.owner === data.session?.user.id

            return {
                ...m,
                senderName: `${userData?.first_name} ${userData?.last_name}`,
                isMyMessage: itsMyMessage,
            }
        }),
    )

    return messageWithSender
}

export const listenMessages = async ({ careerId, educationPlanId, groupId, subjectId }: PListMessages) => {
    const supabase = await createClient()

    return new Promise((resolve) => {
        supabase.channel(`forum-messages-${careerId}-${educationPlanId}-${groupId}-${subjectId}`).on('broadcast', {
            event: 'message'
        }, (payload) => {
            console.log('payload', payload)
            resolve(payload)
        })
    })
}