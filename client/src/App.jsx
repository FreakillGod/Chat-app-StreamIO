import React from 'react';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import './App.css'

import {ChannelContainer,ChannelListContainer, Auth} from './components'

const apikey='4cp7vz28qrkb';

//instance of the stream inorder for our chat to work
const client=StreamChat.getInstance(apikey);

const authToken=false;

const App = () => {

  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper '>
        <Chat client={client} theme="team dark">
            <ChannelListContainer />
            <ChannelContainer />
        </Chat>
    </div>
  )
}

export default App;