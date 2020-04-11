import React from "react";
import {
    Cell,
    Div,
    Group,
    Header,
    Link,
    List,
    Panel,
    PanelHeaderBack,
    PanelHeaderSimple,
    PullToRefresh
} from "@vkontakte/vkui";
import API from "../../utils/API";
import {connect} from "react-redux";
import {setBugInfo} from "../../redux/actions";

const apiSender = new API();

class Bugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_bugs: [],
            fetching: false
        };
        this.updateBugsTimerID = null;
    }

    componentDidMount() {
        this.getBugsList();
        this.updateBugsTimerID = setInterval(this.getBugsList, 10000);
    }

    getBugsList = () => {
        apiSender.getUserBugs(this.props.appReducer.user_info.id).then(bugs => {
            this.setState({user_bugs: bugs.data});
        });
    };

    onRefresh = () => {
        this.setState({fetching: true});
        apiSender.getUserBugs(this.props.appReducer.user_info.id).then(bugs => {
            this.setState({user_bugs: bugs.data}, () => setTimeout(() => {
                this.setState({fetching: false})
            }, 1000));
        });
    };

    componentWillUnmount() {
        clearInterval(this.updateBugsTimerID);
    }

    render() {
        const {id, go, setActiveModal, dispatch, changePanel} = this.props;
        const {user_bugs} = this.state;
        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple
                    left={<PanelHeaderBack onClick={go} data-to={'user_profile'}/>}>Баги</PanelHeaderSimple>

                <Group header={<Header mode="secondary">Информация</Header>}>
                    <Div>
                        На данной странице можно сообщить о баге данного приложения, а так же посмотреть баги, о которых
                        вы уже сообщали.
                    </Div>
                </Group>
                <Group header={<Header mode="secondary" aside={<Link onClick={() => {
                    setActiveModal('bug_sender_choose')
                }}>Добавить</Link>}>Список багов {user_bugs.length}</Header>}>
                    <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                        <List>
                            {user_bugs.map(bug => {
                                let tagClassName = parseInt(bug.fixed) ? 'bug-fixed' : 'bug-unfixed';
                                let tag = <span className={"bug-tag " + tagClassName}>
                                {parseInt(bug.fixed) ? 'Исправлено' : 'Ожидание'}
                            </span>;
                                return <Cell onClick={(e) => {
                                    dispatch(setBugInfo(bug));
                                    changePanel('bug_info');
                                }} data-to={'bug_info'} expandable size={'l'} bottomContent={tag}
                                             key={bug.id}
                                             description={bug.sub_title}>
                                    {bug.title}
                                </Cell>
                            })}
                        </List>
                    </PullToRefresh>
                </Group>
            </Panel>
        )
    }
}

function toProps(state) {
    return state;
}

export default connect(toProps)(Bugs);