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
    console.error(error)
  }
}

/**
 * Filters out messages which have call recording event.
 */
const filterChatMessagesByEvent = (chats: any) => {
  return chats.map((messagesPerChat: any) => {
    const filteredMessages = messagesPerChat.filter((message: any) => {
      if (message.eventDetail && message.eventDetail.callRecordingUrl) {
        return message
      }
    })

    return filteredMessages.map((message: any) => message)
  }).filter((filtered: any) => filtered.length > 0).flat(3)
}

/**
 * Get all call recordings URLs.
 */
const getAllCallRecordings = async () => {
  try {
    const userIds = await getUserIds()
    const chatsForEachUser = await Bluebird.map(userIds, getUserChats, { concurrency: 3 })
    // currently done for single user, should be iterated through all users
    const messagesForSingleUser = await Bluebird.map(chatsForEachUser[0], getChatMessages, { concurrency: 3 })
    const calls = filterChatMessagesByEvent(messagesForSingleUser)
    console.log(calls.map((call: any) => call.eventDetail))
  } catch (error) {
    console.error(error)
  }
}

getAllCallRecordings()
