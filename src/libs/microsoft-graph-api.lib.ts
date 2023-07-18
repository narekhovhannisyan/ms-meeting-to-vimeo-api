import 'isomorphic-fetch'
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
 * Gets chats for given `userId` and filters meeting ones.
 */
const getUserChats = async (userId: string) => {
  try {
    const userChats = await graphClient.api(`/users/${userId}/chats`).get()

    return userChats.value.filter((chat) => chat.chatType === 'meeting').map((chat) => {
      chat.userId = userId

      return chat
    })
  } catch (error) {
    console.error(error)
  }
}

/**
 * Builds `meetingId` from `joinWebUrl` string.
 */
const convertMessageIdToMeetingId = (joinWebUrl: string) => {
  const decodedJoinWebURL = decodeURIComponent(joinWebUrl)
  const meetingId = decodedJoinWebURL.split('/')[5]
  const organizerId = JSON.parse(decodedJoinWebURL.split(`context=`)[1].replaceAll('”', '"').replaceAll(`'`, '').replaceAll('″', '"').replaceAll('“', '"')).Oid
  const meetindId = `1*${organizerId}*0**${meetingId}`

  return Buffer.from(meetindId).toString('base64')
}

/**
 * Gets messages for given `chat`.
 */
const getChatMessages = async (chat: any) => {
  try {
    const messages = await graphClient.api(`/chats/${chat.id}/messages`).get()

    return messages.value.map((message) => {
      message.meetingId = convertMessageIdToMeetingId(chat.onlineMeetingInfo.joinWebUrl)
      message.userId = chat.userId

      return message
    })
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
        message.eventDetail.meetingId = message.meetingId
        message.eventDetail.userId = message.userId

        return message.eventDetail
      }
    })

    return filteredMessages.map((message: any) => message.eventDetail)
  })

  return filteredChatsByEventDetail.filter((filtered: any) => filtered.length > 0).flat(4)
}

/**
 * Gets meeting code by `userId` and `meetingId` in base 64 encoding.
 */
const getMeetingCodeByMeetingId = async (userId: string, meetingIdBase64: string) => {
  try {
    const meetingData = await graphClient.api(`/users/${userId}/onlineMeetings/${meetingIdBase64}`).get()

    return meetingData.value.meetingCode
  } catch (error) {
    console.error(error)
  }
}

/**
 * Appends meeting code to given call recording object.
 */
const appendMeetingCode = async (callRecording: any) => {
  const { userId, meetingId } = callRecording

  callRecording.meetingCode = await getMeetingCodeByMeetingId(userId, meetingId)

  return callRecording
}

/**
 * Builds call recording link based on call recording url.
 */
const buildCallRecordingLink = (callRecordingURL: string) => {
  const base64URL = Buffer.from(callRecordingURL)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=+$/, '')
  const uBase64URL = `u!${base64URL}`

  return uBase64URL
}

/**
 * Gets file ReadableStream from Graph API.
 */
export const getFileFromGraphAPI = (resourceURL: string) => {
  try {
    const base64encoded = buildCallRecordingLink(resourceURL)

    return graphClient.api(`/shares/${base64encoded}/driveItem/content`).get()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 1. Gets all user ids from organization.
 * 2. Fetches chats for all users.
 * 3. Fetches messages for all chats.
 * 4. Gathers call recording objects and flattens array to be one dimensional.
 * 5. Appends meeting code to each object.
 */
export const getAllCallRecordings = async () => {
  const concurrency = { concurrency: 2 }
  try {
    const userIds = await getUserIds()

    const chatsForEachUser = await Bluebird.map(userIds, getUserChats, concurrency)
    const messagesForAllUsers = await Bluebird.map(chatsForEachUser, async (chatsForSingleUser) => {
      const messagesForSingleUser = await Bluebird.map(chatsForSingleUser, getChatMessages, concurrency)
      const calls = filterChatMessagesByEvent(messagesForSingleUser)

      return calls
    }, concurrency)

    const allCallRecordings = messagesForAllUsers.flat(2) // flatten array to be one dimensional

    return Bluebird.map(allCallRecordings, appendMeetingCode, concurrency)
  } catch (error) {
    console.error(error)
  }
}
