import React from 'react';
import {ANDROID, Checkbox, IOS, ModalPage, ModalPageHeader, withPlatform} from "@vkontakte/vkui";
import {connect} from "react-redux";
import {setPostCategories} from "../redux/actions";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

function createPostsCategoriesSelectModal({id, setActiveUserProfileModal, appReducer, dispatch, platform}) {

    function checkboxHandle(e) {

        let oldCategories = appReducer.create_post_categories,
            selectCheckbox = e.target.value;
        if (oldCategories.indexOf(selectCheckbox) < 0) {
            oldCategories.push(selectCheckbox)
        } else {
            oldCategories.splice(oldCategories.indexOf(selectCheckbox), 1)
        }
        dispatch(setPostCategories(oldCategories));
    }

    return (
        <ModalPage id={id} dynamicContentHeight onClose={() => {
            setActiveUserProfileModal('create_post')
        }} header={<ModalPageHeader left={(
            platform === ANDROID &&
            <PanelHeaderButton
                onClick={() => setActiveUserProfileModal('create_post')}><Icon24Cancel/></PanelHeaderButton>
        )} right={(<>
                {platform === ANDROID &&
                <PanelHeaderButton
                    onClick={() => setActiveUserProfileModal('create_post')}><Icon24Done/></PanelHeaderButton>}
                {platform === IOS &&
                <PanelHeaderButton
                    onClick={() => setActiveUserProfileModal('create_post')}>Готово</PanelHeaderButton>}
            </>
        )}>Выбор категории</ModalPageHeader>}>


            {appReducer.categories.map(value => {
                let selected = appReducer.create_post_categories.indexOf(value.id) !== -1;
                return <Checkbox key={value.id} onChange={checkboxHandle} checked={selected}
                                 value={value.id}>{value.ru_name}</Checkbox>
            })}
        </ModalPage>)
}

function stateToProps(state) {
    return state
}

export default withPlatform(connect(stateToProps)(createPostsCategoriesSelectModal));