import React from "react";
import {
    Cell,
    Group,
    Tabs,
    List,
    Panel,
    PanelHeaderBack,
    PanelHeaderSimple,
    TabsItem, Counter, PullToRefresh
} from "@vkontakte/vkui";
import API from "../../utils/API";
import {connect} from "react-redux";
import Masonry from "react-masonry-component";
import UserArtsControlsWaiting from "../../components/UserArtsControlsWaiting";

const apiSender = new API();

class UserArtsControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userArts: {
                waiting: [],
                in_app: [],
            },
            categories: [],
            activeTab: 'moderate',
            isFetching: false,
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        apiSender.requestSender('user/posts', {user_id: this.props.appReducer.user_info.id})
            .then(response => {
                this.setState({userArts: response.data})
            })
    }

    refreshData = () => {
        this.setState({isFetching: true});
        apiSender.requestSender('user/posts', {user_id: this.props.appReducer.user_info.id})
            .then(response => {
                this.setState({userArts: response.data, isFetching: false})
            })
            .catch(reason => {
                this.setState({isFetching: false})
                console.error(reason)
            })
    }

    imageLoaded = (imageElement) => {
        let parent = imageElement.target.parentNode.parentNode.parentNode;
        setTimeout(() => {
            parent.classList.remove("image-loading")
            parent.classList.add("image-loaded")
        }, 400);
    }

    render() {
        const {id, go, setActiveModal} = this.props;
        const {userArts, activeTab, isFetching} = this.state;
        return <Panel separator={false} id={id}>
            <PanelHeaderSimple
                left={<PanelHeaderBack onClick={go} data-to={'user_profile'}/>}>Управление артами</PanelHeaderSimple>

            <PullToRefresh onRefresh={this.refreshData} isFetching={isFetching}>
                <Group>
                    <List>
                        <Cell expandable onClick={() => {
                            setActiveModal('create_post')
                        }}>Добавить арт</Cell>
                    </List>
                </Group>
                <Group>
                    <Tabs mode={'buttons'}>
                        <TabsItem selected={activeTab === 'moderate'} onClick={() => {
                            this.setState({activeTab: 'moderate'})
                        }} after={<Counter size={'s'}>{userArts.waiting.length}</Counter>}>
                            На модерации
                        </TabsItem>
                        <TabsItem selected={activeTab === 'approved'} onClick={() => {
                            this.setState({activeTab: 'approved'})
                        }} after={<Counter size={'s'}>{userArts.in_app.length}</Counter>}>
                            Одобренные
                        </TabsItem>
                    </Tabs>
                    <div className={'cards-grid'}>
                        <Masonry className={'arts-grid__wrapper_'} options={{
                            columnWidth: 170,
                            itemSelector: '.cards-grid__item',
                            percentPosition: true,
                            fitWidth: true,
                            resize: true,
                            gutter: 10,
                            transitionDuration: 0,
                            horizontalOrder: true,

                        }}>
                            {activeTab === 'approved' ?
                                <UserArtsControlsWaiting imageLoaded={this.imageLoaded} items={userArts.in_app}/> :
                                <UserArtsControlsWaiting imageLoaded={this.imageLoaded} items={userArts.waiting}/>}

                        </Masonry>
                    </div>
                </Group>
            </PullToRefresh>
        </Panel>

    }
}

function toProps(state) {
    return state
}

export default connect(toProps)(UserArtsControl);