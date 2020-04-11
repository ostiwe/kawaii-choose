import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardScroll, Header, Link, Spinner, Group} from "@vkontakte/vkui";

import Icon28ChevronRightCircleOutline from '@vkontakte/icons/dist/28/chevron_right_circle_outline';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon24Fullscreen from '@vkontakte/icons/dist/24/fullscreen';

const CategoriesGroupCardScrolls = ({
                                        categories,
                                        artsList,
                                        postAction,
                                        openImage,
                                        changePanel
                                    }, props) => {
    return (
        categories.map(category => {
            if (artsList[category.id] !== undefined && artsList[category.id].length > 0) {
                return <Group key={category.id} header={<Header mode={'secondary'} aside={<Link onClick={() => {
                    changePanel('arts', {}, {
                        id: category.id,
                        name: category.ru_name
                    });
                }}>Больше</Link>}>{category.ru_name}</Header>}>
                    <CardScroll key={category.id + "_s"} className={'cardScroll-home'}>
                        {artsList[category.id] !== undefined && artsList[category.id].map((item, index) => {
                            return artsList[category.id].length === 0 ?
                                <Card key={index} mode={'shadow'}>
                                    <div className={'home-card home-card__show-more Link'}>
                                        <div>
                                            <Spinner size={'large'}/>
                                        </div>
                                        <div>
                                            <span>Идет загруза...</span>
                                        </div>
                                    </div>
                                </Card> :
                                <Card data-postid={item.postid} key={item.local_filename} mode={'shadow'}>
                                    <div className={'home-card home-card__image cart-with-controls'} style={{
                                        backgroundImage: `url(https://api.ostiwe.ru/file/${item.local_filename}?thumb=1)`,
                                    }}/>
                                    <div className="cart-controls">
                                        {!item.liked ?
                                            <Icon24LikeOutline
                                                onClick={() => postAction(index, category.id)}/>
                                            :
                                            <Icon24Like style={{color: 'red'}}
                                                        onClick={() => postAction(index, category.id)}/>
                                        }
                                        <Icon24Fullscreen onClick={() => openImage(item.local_filename)}/>
                                    </div>
                                </Card>
                        })}
                        <Card mode={'shadow'} onClick={() => {
                            changePanel('arts', {}, {
                                id: category.id,
                                name: category.ru_name
                            });
                        }} data-to={'arts'}>
                            <div className={'home-card home-card__show-more Link'}>
                                <div>
                                    <Icon28ChevronRightCircleOutline/>
                                </div>
                                <div>
                                    <span>Больше артов</span>
                                </div>
                            </div>
                        </Card>
                    </CardScroll>
                </Group>
            }
        })
    );
};

CategoriesGroupCardScrolls.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        ru_name: PropTypes.string
    })).isRequired,
    artsList: PropTypes.object.isRequired,
    postAction: PropTypes.func.isRequired,
    openImage: PropTypes.func.isRequired,
    changePanel: PropTypes.func.isRequired

};

// artsList
// PropTypes.shape({
//     category_id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//     category_name: PropTypes.string,
//     postid: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//     title: PropTypes.string,
//     subtitle: PropTypes.string,
//     likes: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//     dislikes: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//     local_filename: PropTypes.string,
//     uploaded: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
//     liked: PropTypes.bool
// })

export default CategoriesGroupCardScrolls;
