import React from 'react'
import {Avatar, useChat, useChatContext} from 'stream-chat-react'

const TeamChannelPreview = ({ channel, type }) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID)

    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    )


    //Object.valuesは指定されたオブジェクトが持つ列挙可能なプロパティの値を
    //for...inループと同じ順序で配列にして返す
    //ChannelListでの表示が配列だからそれに合わせている可能性大　未解
  }

  return (
    <div className={
      channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
      onClick={() => {
      console.log(channel)
    }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}

    </div>
  )
}

export default TeamChannelPreview
