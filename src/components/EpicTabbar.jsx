import React from 'react';
import {Tabbar, TabbarItem} from "@vkontakte/vkui";

import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline';
import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline';
import Icon28RefreshOutline from '@vkontakte/icons/dist/28/refresh_outline';

export default function ({onStoryChange, activeStory}, props) {
    return <Tabbar>
        <TabbarItem data-story={'basic'} data-panel={'home'} text={'Арты'} onClick={onStoryChange}
                    selected={activeStory === 'basic'}>
            <Icon28NewsfeedOutline/>
        </TabbarItem>
        <TabbarItem data-story={'profile'} data-panel={'user_profile'} text={'Профиль'} onClick={onStoryChange}
                    selected={activeStory === 'profile'}>
            <Icon28UserCircleOutline/>
        </TabbarItem>
        {process.env.NODE_ENV === "development" &&
        <TabbarItem onClick={() => window.location.reload()}>
            <Icon28RefreshOutline/>
        </TabbarItem>}
    </Tabbar>;
}