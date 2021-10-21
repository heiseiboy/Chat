import React from "react";

import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

const SideBar = () => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width={30} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner">
        <img src={LogoutIcon} alt="Logout" width={30} />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewPros) => (
            <TeamChannelPreview {...previewPros} type="team" />
          )}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewPros) => (
            <TeamChannelPreview {...previewPros} type="messaging" />
          )}
        />
      </div>
    </>
  );
};

//ChannelListについて　こいつはStream Chat APIからチャネルオブジェクトの配列をクエリし、
//UIにカスタマイズ可能なリストとして表示する
//List={(listProps)}がいまだにわからない
//https://getstream.io/chat/docs/sdk/reactnative/core-components/channel-list/

//channelRenderFilterFnについて
//https://getstream.io/chat/docs/sdk/react/custom-code-examples/multiple_channel_lists/
export default ChannelListContainer;
