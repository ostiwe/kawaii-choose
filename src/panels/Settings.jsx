import React from "react";
import {connect} from "react-redux";
import {Cell, Group, Header, IOS, List, Panel, PanelHeaderSimple, platform, SimpleCell, Switch} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import bridge from '@vkontakte/vk-bridge';
import {changeThumbsSettings} from "../redux/actions";

const osName = platform();

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    changeThumbs = () => {
        let status = this.props.thumbsNeed;

        if (Number.parseInt(status) === 1) status = 0; else status = 1;

        bridge.send("VKWebAppStorageSet", {"key": "thumbs", "value": `${status}`});
        this.props.dispatch(changeThumbsSettings(Number.parseInt(status)));
    };

    render() {
        const {id, go, thumbsNeed} = this.props;
        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple left={<PanelHeaderButton onClick={go} data-to="user_profile">
                    {osName === IOS ? <Icon28ChevronBack/> :
                        <Icon24Back/>} </PanelHeaderButton>}>Настройки</PanelHeaderSimple>
                <Group header={<Header mode="secondary">Контент</Header>}>
                    <List>
                        <SimpleCell description={<div>
                            Для миниатюр артов будут
                            использоваться {thumbsNeed ? "сжатые изображения" : "изображения с полным размером"}
                        </div>} disabled after={<Switch checked={thumbsNeed} onChange={this.changeThumbs}/>}>Экономия
                            трафика</SimpleCell>
                    </List>
                </Group>
            </Panel>
        )
    }
}

function stateToProps(state) {
    return state
}

export default connect(stateToProps)(Settings);