import React from "react";
import {Group, Header, Panel, PanelHeaderSimple, List, Cell, InfoRow, Progress, Footer} from "@vkontakte/vkui";
import Icon28HelpOutline from '@vkontakte/icons/dist/28/help_outline';
import Icon28BugOutline from '@vkontakte/icons/dist/28/bug_outline';
import Icon28PaletteOutline from '@vkontakte/icons/dist/28/palette_outline';
import API from "../utils/API";

const apiSender = new API();

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            user_info: null
        }
    }

    componentDidMount() {
        apiSender.getUserStats(this.props.fetchedUser.id).then(value => {
            this.setState({likes: value.likes, user_info: value.user_info});
        })
    }

    render() {
        const {id, fetchedUser, setActiveModal, go} = this.props;
        const {user_info} = this.state;
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
                                {this.state.likes ? this.state.likes : 0}
                            </InfoRow>
                        </Cell>
                        <Cell asideContent={<Icon28HelpOutline onClick={() => setActiveModal("approved_posts")}/>}>
                            <InfoRow header="Артов, которые будут/уже опубликованы">
                                0
                            </InfoRow>
                        </Cell>
                    </List>
                </Group>
                <Group header={<Header mode="secondary">Остальное</Header>}>
                    <List>
                        <Cell expandable onClick={go} data-to={'bugs'} before={<Icon28BugOutline/>}>Сообщить о
                            баге</Cell>
                        <Cell expandable onClick={go} data-to={'help'} before={<Icon28HelpOutline/>}>Помощь</Cell>
                        <Cell expandable onClick={user_info && parseInt(user_info.creator) === 0 ? () => {
                            setActiveModal('add_art_denied')
                        } : go}
                              data-to={'add_art'}
                              before={<Icon28PaletteOutline/>}>Управление артами</Cell>
                    </List>
                </Group>
                <Footer>134.2130v</Footer>
            </Panel>
        )
    }
}

export default Profile;