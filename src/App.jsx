import React, { useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import './App.css'
import 'stream-chat-react/dist/css/index.css'

import {ChannelContainer, ChannelListContainer, Auth} from './components'

const cookies = new Cookies()

const apiKey = 'hgxfur2wm9hu';
const authToken = cookies.get('token')

const client = StreamChat.getInstance(apiKey)

if (authToken) {
  client.connectUser({
    id:cookies.get('userId'),
    name:cookies.get('username'),
    fullName:cookies.get('fullName'),
    image:cookies.get('avatarURL'),
    hashedPassword:cookies.get('hashedPassword'),
    phoneNumber:cookies.get('phoneNumber'),
  }, authToken)
}


const App = () => {

  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

//propsを渡す手段をcontentAPIに書き換えることが可能だから後で調べて実装してみる

export default App
