import React from "react";
import {Checkbox, FormLayout, Input, ModalPage, ModalPageHeader, Select} from "@vkontakte/vkui";

class CreatePostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsInput: '',
            tags: [],
        }
    }

    changeInput = (e) => {
        let tagsInput = e.target.value.replace(/\s/g, '');
        let tagsList = tagsInput.split(',');
        this.setState({tags: tagsList, tagsInput: tagsInput});
        console.log(tagsList);
    }
    changeSelect = (e) => {
        console.log(e.target.value);
    }

    render() {
        const {setActiveUserProfileModal, id} = this.props;
        const {tagsInput} = this.state;
        return <ModalPage id={id} dynamicContentHeight={true} onClose={() => {
            setActiveUserProfileModal(null)
        }}
                          header={<ModalPageHeader>Создать пост</ModalPageHeader>}
        >
            <FormLayout>
                <Input type={'text'} top={'Введите теги которые вы хотите добавить к своему арту'} value={tagsInput}
                       onChange={this.changeInput}/>
                       <Checkbox>dsls</Checkbox>
                       <Checkbox>d22</Checkbox>
                       <Checkbox>xx</Checkbox>
            </FormLayout>
        </ModalPage>
    }
}

export default CreatePostModal;