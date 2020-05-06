import React from "react";
import {
    Group,
    Header,
    Panel,
    Banner,
    PanelHeaderSimple,
    List,
    Cell,
    InfoRow,
    Progress,
    Footer,
    Button
} from "@vkontakte/vkui";
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';
import Icon28BugOutline from '@vkontakte/icons/dist/28/bug_outline';
import Icon28PaletteOutline from '@vkontakte/icons/dist/28/palette_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';

import API from "../utils/API";

const apiSender = new API();

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            user_info: null,
            user_posts: 0,
        }
    }

    componentDidMount() {
        apiSender.getUserStats(this.props.fetchedUser.id).then(value => {
            this.setState({likes: value.likes, user_posts: value.user_posts, user_info: value.user_info});
        })
    }

    render() {
        const {id, fetchedUser, setActiveModal, go} = this.props;
        const {user_info, likes, user_posts} = this.state;
        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple>Профиль</PanelHeaderSimple>
                <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
                    <List>
                        <Cell>
                            <InfoRow header="Пользователь">
                                {fetchedUser.first_name} {fetchedUser.last_name}
                            </InfoRow>
                        </Cell>
                        <Cell asideContent={<Icon28HelpOutline onClick={() => setActiveModal("level_help")}/>}>

                            <InfoRow header={`Уровень - ${user_info ? user_info.level : 1}`}>
                                <div className="progressWrapper">
                                    <div className="progressItem">0</div>
                                    <div className="progressItem progressItem-progress">
                                        <Progress
                                            value={user_info ? parseInt((user_info.exp * 100) / user_info.max_level_exp) : 0}/>
                                    </div>
                                    <div className="progressItem">{user_info ? user_info.max_level_exp : 0}</div>
                                </div>
                            </InfoRow>
                        </Cell>
                    </List>
                </Group>
                <Group header={<Header mode="secondary">Статистика</Header>}>
                    <List>
                        <Cell>
                            <InfoRow header="Поставлено лайков">
                                {likes ? likes : 0}
                            </InfoRow>
                        </Cell>
                        <Cell>
                            <InfoRow header="Добавлено артов">
                                {user_posts ? user_posts : 0}
                            </InfoRow>
                        </Cell>
                        {/*<Cell asideContent={<Icon28HelpOutline onClick={() => setActiveModal("approved_posts")}/>}>*/}
                        {/*    <InfoRow header="Артов, которые будут/уже опубликованы">*/}
                        {/*        0*/}
                        {/*    </InfoRow>*/}
                        {/*</Cell>*/}
                    </List>
                </Group>
                <Group header={<Header mode="secondary">Остальное</Header>}>
                    <List>
                        <Cell expandable onClick={go} data-to={'bugs'} before={<Icon28BugOutline/>}>Сообщить о
                            баге</Cell>
                        <Cell expandable onClick={go} data-to={'help'} before={<Icon28HelpOutline/>}>Помощь</Cell>
                        <Cell expandable onClick={go}
                              data-to={'add_art'}
                              before={<Icon28PaletteOutline/>}>Управление артами</Cell>
                        <Cell expandable onClick={go}
                              data-to={'settings'}
                              before={<Icon28SettingsOutline/>}>Настройки</Cell>
                    </List>
                </Group>
                <Banner mode={'image'}
                        background={<div className={'gradient-block__1'}/>}
                        header={"Обсуждение приложения"}
                        subheader={"Делитесь впечатлениями, идеями"}
                        actions={<Button onClick={() => {
                            let link = document.createElement('a');
                            link.href = "https://vk.cc/atdPGZ";
                            link.target = "_blank";
                            link.click();
                            link.remove();
                        }}>Перейти</Button>}
                />
                <Footer>65.1059v</Footer>
            </Panel>
        )
    }
}

export default Profile;