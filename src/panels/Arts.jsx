import React from "react";
import {
    Button,
    Card,
    CardGrid,
    Group,
    IOS,
    Panel,
    PanelHeaderSimple,
    Placeholder,
    platform,
    Spinner
} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon24Fullscreen from '@vkontakte/icons/dist/24/fullscreen';
import emptyImage from "../img/empty.png";
import API from "../utils/API";
import bridge from "@vkontakte/vk-bridge";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-component";

const osName = platform();
const apiSender = new API();

class Arts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            page: 1,
            hasMoreImages: true,
        }
    }

    postAction = (postIndex) => {
        let likedArray = this.state.images;

        if (!likedArray[postIndex].liked) {
            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
            apiSender.postAction(likedArray[postIndex].post_id, this.props.fetchedUser.id, 'like');
        } else {
            apiSender.postAction(likedArray[postIndex].post_id, this.props.fetchedUser.id, 'dislike');
        }

        likedArray[postIndex].liked = !likedArray[postIndex].liked;
        this.setState({liked: likedArray})
    };

    componentDidMount() {
        this.loadImages();
    }

    componentWillUnmount() {
        this.setState({
            images: [],
            page: 1,
            hasMoreImages: true
        });
    }


    loadImages = () => {
        let postsList = this.state.images;
        apiSender.getPosts(this.props.fetchedUser.id, this.state.page, this.props.artsInfo.id).then(posts => {
                if (posts.length === 0) {
                    this.setState({
                        hasMoreImages: false
                    });
                } else {
                    postsList = postsList.concat(posts);
                    this.setState({
                        images: postsList,
                        page: this.state.page + 1
                    });
                }
            }
        );
    };

    render() {
        const {id, go, artsInfo, openImage, snackBar} = this.props;
        return (
            <Panel separator={false} id={id}>
                <PanelHeaderSimple left={<PanelHeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}>{artsInfo.name}</PanelHeaderSimple>
                <Group>
                    <InfiniteScroll
                        next={this.loadImages}
                        hasMore={this.state.hasMoreImages}
                        loader={<Placeholder header={'Загружаем арты...'} icon={<Spinner size={'large'}/>}/>}
                        endMessage={
                            <Placeholder header={'Мы показали все изображения которые у нас были'}
                                         icon={<img alt={'empty_img'} width={250} src={emptyImage}/>}/>
                        }
                        dataLength={this.state.images.length}
                        scrollThreshold={"850px"}
                    >
                        <div className={'cards-grid'}>
                            <Masonry className={'arts-grid__wrapper'} options={{
                                columnWidth: 300,
                                itemSelector: '.cards-grid__item',
                                percentPosition: true,
                                fitWidth: true,
                                // resize: true,
                                transitionDuration: 0,
                                horizontalOrder: true
                            }}>
                                {this.state.images.length > 0 ? this.state.images.map((value, index) => <Card
                                        mode={'shadow'} key={index}
                                        className={'cards-grid__item'}>
                                        <div className={'arts-grid arts-grid__item home-card__image cart-with-controls'}>
                                            <img width={'100%'}
                                                 src={`https://api.ostiwe.ru/file/${value.file_uid}?thumb=1`}/>
                                            <div className="cart-controls">
                                                {!this.state.images[index].liked ?
                                                    <Icon24LikeOutline onClick={() => this.postAction(index)}/>
                                                    :
                                                    <Icon24Like style={{color: 'red'}}
                                                                onClick={() => this.postAction(index)}/>
                                                }

                                                <Icon24Fullscreen onClick={() => openImage(value.file_uid)}/>
                                            </div>
                                        </div>
                                    </Card>) :
                                    <Placeholder header={'Тут пусто'}
                                                 icon={<img alt={'empty_img'} width={250} src={emptyImage}/>}
                                                 stretched
                                                 action={<Button onClick={go} data-to={'home'}>Назад</Button>}/>}
                            </Masonry>
                        </div>
                    </InfiniteScroll>


                </Group>
                {snackBar}
            </Panel>
        )
    }
}

export default Arts;