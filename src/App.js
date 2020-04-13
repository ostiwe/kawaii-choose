import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import {connect} from "react-redux";

import {Epic, ScreenSpinner, Snackbar, View,} from "@vkontakte/vkui";

import '@vkontakte/vkui/dist/vkui.css';
import './assets/css/main.css';


import Icon24Error from '@vkontakte/icons/dist/24/error';

import Profile from "./panels/Profile";
import API from "./utils/API";
import Error from "./panels/Error";
import Bugs from "./panels/ProfilePages/Bugs";
import Help from "./panels/ProfilePages/Help";
import Home from './panels/Home.jsx';
import Arts from "./panels/Arts";
import Loader from "./panels/Loader";

import {setBugSubTitle, setBugTitle, setUserInfo} from "./redux/actions";
import EpicTabbar from "./components/EpicTabbar";
import AppModalRoot from "./components/AppModalRoot";
import BugInfo from "./panels/ProfilePages/BugInfo";
import UserArtsControl from "./panels/ProfilePages/UserArtsControl";


const apiSender = new API();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 'loader',
            activeStory: 'basic',
            fetchedUser: null,
            activeProfileModal: null,
            load: <ScreenSpinner size='large'/>,
            additionalData: {
                viewedImage: null,
            },
            artsInfo: {
                id: 1,
                name: 'Арты',
            },
            snackBar: null,
        }
    }

    componentDidMount() {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                let appearance;
                if (data.appearance === 'light') appearance = 'dark'; else appearance = 'light';
                setTimeout(() => this.setAppearance(appearance), 500);

                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });

        this.fetchData();
    }

    fetchData = () => {
        apiSender.sendTest().then(response => {
            if (response.status !== 'error') {
                bridge.send('VKWebAppGetUserInfo').then(user => {
                    this.sendHello(user);
                    this.setState({fetchedUser: user},
                        () => this.setState({load: null, activePanel: 'home'}));

                    this.props.dispatch(setUserInfo(user));
                });
            } else {
                this.setState({load: null, activePanel: 'error_page'})
            }
        });
    };

    setAppearance = (appearance) => {
        bridge.send("VKWebAppSetViewSettings",
            {"status_bar_style": appearance}).catch(reason => {
        });
    };

    go = e => {
        this.setState({activePanel: e.currentTarget.dataset.to});
    };

    changePanel = (to, additionalData = {viewedImage: null}, artsInfo = {id: 1, name: 'Арты'}) => {
        this.setState({
            activePanel: to,
            additionalData: additionalData,
            artsInfo: artsInfo,
        });
    };

    onStoryChange = (e) => {
        this.setState({activeStory: e.currentTarget.dataset.story});
        if (e.currentTarget.dataset.panel) {
            this.setState({activePanel: e.currentTarget.dataset.panel});
        }
    };

    setActiveUserProfileModal = (modal) => {
        this.setState({activeProfileModal: modal});
    };

    openImage = (image_uid) => {
        bridge.send("VKWebAppShowImages", {
            images: [
                `https://api.ostiwe.ru/file/${image_uid}`
            ]
        }).catch(reason => {
            this.setState({
                snackBar:
                    <Snackbar
                        layout="vertical"
                        before={<Icon24Error style={{color: 'red'}}/>}
                        onClose={() => this.setState({snackBar: null})}>
                        Не удалось открыть изображение
                    </Snackbar>
            });
        });
    };

    changeBugTitle = (e) => {
        this.props.dispatch(setBugTitle(e.target.value));
    };

    changeBugSubTitle = (e) => {
        this.props.dispatch(setBugSubTitle(e.target.value));

    };

    sendBugReport = () => {
        return new Promise((resolve, reject) => {
            const {bug_title, bug_subtitle} = this.props.appReducer;
            let report = {
                sender: this.state.fetchedUser.id,
                bug_title: bug_title,
                bug_subtitle: bug_subtitle
            };
            apiSender.sendBugReport(report).then(response => {
                resolve(response);
            }).catch(reason => reject(reason));
        });
    };

    sendHello = (user) => {
        let xr = new XMLHttpRequest(),
            body = JSON.stringify({user_id: user.id});
        xr.open('POST', 'https://api.ostiwe.ru/kawaii/hello');
        xr.setRequestHeader('Content-type', 'application/json');
        xr.send(body);

    };

    render() {
        return <Epic activeStory={this.state.activeStory}
                     tabbar={(this.state.activePanel === 'home' || this.state.activePanel === 'user_profile') &&
                     <EpicTabbar activeStory={this.state.activeStory} onStoryChange={this.onStoryChange}/>}>

            <View header={false} id={'basic'} activePanel={this.state.activePanel} popout={this.state.load}>
                <Home id='home' s={this.setAppearance} fetchedUser={this.state.fetchedUser}
                      changePanel={this.changePanel} go={this.go} openImage={this.openImage}
                      snackBar={this.state.snackBar}/>
                <Arts id={'arts'} artsInfo={this.state.artsInfo}
                      fetchedUser={this.state.fetchedUser} changePanel={this.changePanel}
                      openImage={this.openImage}
                      snackBar={this.state.snackBar}
                      go={this.go}/>
                <Loader id={'loader'}/>
                <Error id={'error_page'}/>
            </View>
            <View header={false} id={'profile'} activePanel={this.state.activePanel}
                  modal={<AppModalRoot activeProfileModal={this.state.activeProfileModal}
                                       setActiveUserProfileModal={this.setActiveUserProfileModal}
                                       changeBugTitle={this.changeBugTitle}
                                       changeBugSubTitle={this.changeBugSubTitle}
                                       sendBugReport={this.sendBugReport}
                                       fetchedUser={this.state.fetchedUser}
                  >
                  </AppModalRoot>}>
                <Profile id={'user_profile'} setActiveModal={this.setActiveUserProfileModal}
                         fetchedUser={this.state.fetchedUser} go={this.go}/>
                <Bugs id={'bugs'} go={this.go} changePanel={this.changePanel}
                      setActiveModal={this.setActiveUserProfileModal}/>
                <Help id={'help'} go={this.go} setActiveModal={this.setActiveUserProfileModal}/>
                <BugInfo id={'bug_info'} go={this.go}
                         setActiveModal={this.setActiveUserProfileModal}/>
                <UserArtsControl id={'add_art'} go={this.go} setActiveModal={this.setActiveUserProfileModal}/>
            </View>
        </Epic>
    }
}

function stateToProps(state) {
    return state;
}

export default connect(stateToProps)(App);

