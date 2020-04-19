import React from "react";
import {Cell, Div, Group, Header, List, Panel, PanelHeaderBack, PanelHeaderSimple} from "@vkontakte/vkui";

class UserArtsControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArts: [],
            categories: [],
        }
    }

    render() {
        const {id, go, setActiveModal} = this.props;
        return <Panel separator={false} id={id}>
            <PanelHeaderSimple
                left={<PanelHeaderBack onClick={go} data-to={'user_profile'}/>}>Управление артами</PanelHeaderSimple>
            <Group>
                <List>
                    <Cell expandable onClick={() => {
                        setActiveModal('create_post')
                    }}>Добавить арт</Cell>
                </List>
            </Group>
            <Group>
                <List>

                </List>
            </Group>
        </Panel>

    }
}

export default UserArtsControl;