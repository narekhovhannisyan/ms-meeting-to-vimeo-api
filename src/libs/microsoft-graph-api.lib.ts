import Bluebird from 'bluebird'
import { ClientSecretCredential } from '@azure/identity'
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'

import CONFIG from '../config'

const { MICROSOFT } = CONFIG
const { TENANT_ID, CLIENT_ID, CLIENT_SECRET, SCOPES } = MICROSOFT

const credential = new ClientSecretCredential(
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET
)

const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: SCOPES
})

const graphClient = Client.initWithMiddleware({ authProvider })

/**
 * Grabs all user ids.
 */
const getUserIds = async () => {
  try {
    const users = await graphClient.api(`/users`).get()

    return users.value.map((user: any) => user.id)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Gets chats for given `userId`.
 */
const getUserChats = async (userId: string) => {
  try {
    const userChats = await graphClient.api(`/users/${userId}/chats`).get()

    return userChats.value
  } catch (error) {
    console.error(error)
  }
}

/**
 * Gets messages for given `chat`.
 */
const getChatMessages = async (chat: any) => {
  try {
    const messages = await graphClient.api(`/chats/${chat.id}/messages`).get()

    return messages.value
  } catch (error) {
    return []
  }
}

/**
 * Filters out messages which have call recording event.
 */
const filterChatMessagesByEvent = (chats: any) => {
  const filteredChatsByEventDetail = chats.map((messagesPerChat: any) => {
    const filteredMessages = messagesPerChat.filter((message: any) => {
      if (message.eventDetail && message.eventDetail.callRecordingUrl) {
        return message.eventDetail
      }
    })

    return filteredMessages.map((message: any) => message.eventDetail)
  })

  return filteredChatsByEventDetail.filter((filtered: any) => filtered.length > 0).flat(4)
}

/**
 * Get all call recordings URLs.
 */
export const getAllCallRecordings = async () => {
  try {
    const userIds = await getUserIds()
    const chatsForEachUser = await Bluebird.map(userIds, getUserChats, { concurrency: 2 })

    const messagesForAllUsers = await Bluebird.map(chatsForEachUser, async (chatsForSingleUser) => {
      const messagesForSingleUser = await Bluebird.map(chatsForSingleUser, getChatMessages, { concurrency: 2 })
      const calls = filterChatMessagesByEvent(messagesForSingleUser)

      return calls
    }, { concurrency: 2 })

    return messagesForAllUsers.flat(2)
  } catch (error) {
    console.error(error)
  }
}
