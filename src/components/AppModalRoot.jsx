import React from 'react';
import {ModalCard, ModalRoot} from "@vkontakte/vkui";

import Icon28BrainOutline from '@vkontakte/icons/dist/28/brain_outline';
import Icon28PaletteOutline from '@vkontakte/icons/dist/28/palette_outline';
import CreateReportModalPage from "./CreateReportModalPage";
import Icon28PrivacyOutline from '@vkontakte/icons/dist/28/privacy_outline';

import IconCoolEmoji from '../img/cool-emoji.png';
import CreatePostModal from "./CreatePostModal";
import * as Sentry from "@sentry/browser";
import CreatePostsCategoriesSelectModal from "./CreatePostsCategoriesSelectModal";

function goToPublicMessages() {
    let link = document.createElement('a');
    link.href = 'https://vk.cc/asiQvv';
    link.click();
    link.remove();
}

export default function ({
                             activeProfileModal, setActiveUserProfileModal,
                             changeBugTitle, changeBugSubTitle, sendBugReport, fetchedUser
                         }, props) {
    return <ModalRoot activeModal={activeProfileModal} onClose={() => setActiveUserProfileModal(null)}>
        <ModalCard id={'level_help'} onClose={() => setActiveUserProfileModal(null)}
                   header={"Уровень"} caption={`Когда ты лайкаешь арты ты по-немногу повышаешь свой уровень, 
                       чем выше твой уровень - тем круче! Так же, уровень существенно повышается если арт который тебе 
                       понравился вышел в нашем сообществе. В будущем, за высокий уровень планируется награждать всякими плюшками.
                        `}
                   icon={<Icon28BrainOutline width={100} height={100}/>}
                   actions={[{
                       title: 'Понятно', mode: 'primary',
                       action: () => {
                           setActiveUserProfileModal(null);
                       }
                   }
                   ]}/>
        <ModalCard id={'approved_posts'} onClose={() => setActiveUserProfileModal(null)}
                   header={"Арты"} caption={`Когда ты лайкаешь арты в этом приложении, это повышает его шанс на 
                       публикацию в сообществе. Поэтому, тут отображается число артов, которые были опубликованы благодаря тебе.`}
                   icon={<Icon28PaletteOutline width={100} height={100}/>}
                   actions={[{
                       title: 'Понятно', mode: 'primary',
                       action: () => {
                           setActiveUserProfileModal(null);
                       }
                   }
                   ]}/>
        <ModalCard id={'bug_sender_choose'} onClose={() => setActiveUserProfileModal(null)}
                   header={'Выбор способа'}
                   caption={`Ты можешь создать сообщение о баге прямо тут или же связаться с разработчиком "на прямую", как поступим?`}
                   actionsLayout={"vertical"}
                   actions={[{
                       title: 'Создать тут', mode: 'primary',
                       action: () => {
                           setActiveUserProfileModal("bug_sender");
                       }
                   }, {
                       title: 'К разработчику!', mode: 'secondary',
                       action: () => {
                           setActiveUserProfileModal(null);
                           goToPublicMessages();
                       }
                   }
                   ]}/>
        <ModalCard id={'bug_sender_done'} onClose={() => setActiveUserProfileModal(null)}
                   header={'Баг пойман!'}
                   icon={<img width={100} src={IconCoolEmoji}/>}
                   caption={`Спасибо, теперь мы сможем сделать приложение еще лучше!`}
                   actions={[{
                       title: 'Круто!', mode: 'primary',
                       action: () => {
                           setActiveUserProfileModal(null)
                       }
                   }
                   ]}/>
        <ModalCard id={'add_art_denied'} onClose={() => setActiveUserProfileModal(null)}
                   header={'Нет доступа'}
                   icon={<Icon28PrivacyOutline width={100} height={100}/>}
                   caption={`К данному разделу имеют доступ лишь избранные!
                    Но не огорчайся, ты можешь попробовать стать им, напиши нам в сообщество :)`}
                   actionsLayout={"vertical"}
                   actions={[{
                       title: 'Понятно', mode: 'primary',
                       action: () => {
                           setActiveUserProfileModal(null)
                       }
                   }, {
                       title: 'Попытать удачу', mode: 'secondary',
                       action: () => {
                           setActiveUserProfileModal(null)
                           goToPublicMessages()
                       }
                   }
                   ]}/>
        <CreateReportModalPage id={'bug_sender'} setActiveUserProfileModal={setActiveUserProfileModal}
                               changeBugTitle={changeBugTitle}
                               changeBugSubTitle={changeBugSubTitle}
                               sendBugReport={sendBugReport}/>
        <CreatePostModal id={'create_post'} setActiveUserProfileModal={setActiveUserProfileModal}/>
        <CreatePostsCategoriesSelectModal id={'create_post_categories'}
                                          setActiveUserProfileModal={setActiveUserProfileModal}/>
    </ModalRoot>;
}