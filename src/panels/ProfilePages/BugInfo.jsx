import React from "react";
import {Cell, Div, Group, Header, InfoRow, IOS, List, Panel, PanelHeaderSimple, platform} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import {connect} from "react-redux";

const osName = platform();

class BugInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {id, go, bug_info} = this.props;
        return <Panel separator={false} id={id}>
            <PanelHeaderSimple left={<PanelHeaderButton onClick={go} data-to="bugs">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>}>Баг</PanelHeaderSimple>
            <Group
                header={<Header>Информация об баг-репорте #{bug_info.id}</Header>}>
                <List>
                    <Cell>
                        <InfoRow header={'Название отчета'}>{bug_info.title}</InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header={'Дата создания'}>{bug_info.created}</InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow header={'Статус'}>
                            {parseInt(bug_info.fixed) ? "Исправлено" : "Ожидает решения"}
                        </InfoRow>
                    </Cell>
                </List>
            </Group>
            <Group header={<Header>Сообщение</Header>}>
                <Div>
                    {bug_info.sub_title}
                </Div>
            </Group>
        </Panel>
    }
}

function toState(state) {
    return {
        bug_info: state.appReducer.bug_info
    }
}

export default connect(toState)(BugInfo);