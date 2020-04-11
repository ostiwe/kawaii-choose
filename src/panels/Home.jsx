import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import {Card, CardScroll, Header, PanelHeaderSimple} from "@vkontakte/vkui";

import API from "../utils/API";
import bridge from "@vkontakte/vk-bridge";
import CategoriesGroupCardScrolls from "../components/CategoriesGroupsCardScrolls";
import {connect} from "react-redux";
import {setCategories, setPosts} from "../redux/actions";

const apiSender = new API();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artsList: {},
            categories: [],
            load: false
        };
        this.timerId = null;
    }

    postAction = (postIndex, category) => {
        let likedArray = this.state.artsList;

        if (!likedArray[category][postIndex].liked) {
            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            apiSender.postAction(likedArray[category][postIndex].postid, this.props.fetchedUser.id, 'like');
        } else {
            apiSender.postAction(likedArray[category][postIndex].postid, this.props.fetchedUser.id, 'unlike');
        }

        likedArray[category][postIndex].liked = !likedArray[category][postIndex].liked;
        this.setState({liked: likedArray})
    };

    componentDidMount() {
        const appReducer = this.props.appReducer;


        if (appReducer.categories.length === 0 && Object.keys(appReducer.artsList).length === 0) {
            apiSender.getCategories().then(categories => {
                this.setState({categories: categories});
                this.props.dispatch(setCategories(categories));
                this.loadData();
            });
        } else {
            this.setState({categories: appReducer.categories, artsList: appReducer.artsList});
        }

        this.timerId = setInterval(this.loadData, 20000);
    }


    loadData = () => {
        let userID = this.props.fetchedUser && this.props.fetchedUser.id,
            categoryList = this.state.categories;

        categoryList.map(category => {
            apiSender.getRecentPosts(userID, parseInt(category.id)).then(posts => {
                let artsList = this.state.artsList;
                artsList[category.id] = posts;

                this.setState({artsList: artsList});
                this.props.dispatch(setPosts(artsList));
            });
        });

        this.setState({load: true});

    };

    componentWillUnmount() {
        clearInterval(this.timerId);
        this.timerId = null;
    }

    render() {
        const {fetchedUser, id, changePanel, openImage, snackBar} = this.props;
        const {artsList, categories} = this.state;

        return <Panel separator={false} id={id}>
            <PanelHeaderSimple>Главная</PanelHeaderSimple>
            {fetchedUser &&
            <Group>
                <Cell>
				<span>
                {`Привет, ${fetchedUser.first_name}!`}
                </span><br/>
                    <span className={'normalize-text'}>
					Благодаря данному приложению ты можешь повлиять на то, какие посты
					выйдут в свет.
                </span>
                </Cell>
            </Group>}

            <CategoriesGroupCardScrolls postAction={this.postAction} openImage={openImage}
                                        changePanel={changePanel} artsList={artsList} categories={categories}/>

            <Group header={<Header mode={'secondary'}>
                Скоро</Header>}>
                <Div>
                    <CardScroll>
                        <Card size={'l'}>
                            <div className="promote-card">
                                В будущем вас ждут
                            </div>
                        </Card>
                        <Card size={'l'}>
                            <div className="promote-card">
                                Арты по разным категориям
                            </div>
                        </Card>
                        <Card size={'l'}>
                            <div className="promote-card">
                                Арты по тайтлам
                            </div>
                        </Card>
                        <Card size={'l'}>
                            <div className="promote-card">
                                Арты по персонажам
                            </div>
                        </Card>
                    </CardScroll>
                </Div>
            </Group>
            {snackBar}
        </Panel>
    }
}

Home.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    fetchedUser: PropTypes.shape({
        photo_200: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,

    }),
};

function stateToProps(state) {
    return state;
}

export default connect(stateToProps)(Home);
