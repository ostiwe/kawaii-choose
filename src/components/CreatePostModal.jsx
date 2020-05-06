import React from "react";
import {Button, Div, File, FormLayout, ModalPage, ModalPageHeader, Spinner} from "@vkontakte/vkui";
import API from "../utils/API";
import {connect} from "react-redux";
import {clearCreatePost, setCreatePostFile} from "../redux/actions";

const apiSender = new API();

class CreatePostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsInput: '',
            tags: [],
            file: null,
            loading: false,
            uploadProgress: 0,

        }
    }


    changeFile = (e) => {
        this.props.dispatch(setCreatePostFile(e.target.files[0]))
    }

    createPost = () => {
        this.setState({loading: true});
        apiSender.fileUploader(this.props.appReducer.create_post_file, this.props.appReducer.create_post_categories, this.props.appReducer.user_info.id)
            .catch(reason => {
                console.log(reason);
                this.setState({loading: false});
            })
            .then(response => {
                if (response.upload_status === 'success') {
                    this.props.dispatch(clearCreatePost())
                    this.props.setActiveUserProfileModal('success_create_post')
                }
                this.setState({loading: false});
            })
    }


    render() {
        const {setActiveUserProfileModal, id, appReducer} = this.props;
        const {loading} = this.state;
        return <ModalPage id={id} dynamicContentHeight={true} onClose={() => {
            setActiveUserProfileModal(null)
        }}
                          header={<ModalPageHeader>Создать пост</ModalPageHeader>}
        >
            {!loading ?
                <FormLayout>

                    <Button onClick={() => {
                        setActiveUserProfileModal('create_post_categories')
                    }}>{appReducer.create_post_categories.length === 0 ? "Выбрать категории" : "Выбрано категорий - " + appReducer.create_post_categories.length}</Button>
                    <File accept={'.jpg,.png,.jpeg'}
                          onChange={this.changeFile}>{appReducer.create_post_file === null ? 'Выбрать файл' : "Файл выбран"}</File>

                    <Button
                        disabled={appReducer.create_post_file === null ? true : appReducer.create_post_categories.length === 0}
                        onClick={this.createPost}>
                        {appReducer.create_post_categories.length !== 0 && appReducer.create_post_file !== null ? "Создать пост" : "Нужно выбрать файл и категории"}
                    </Button>
                </FormLayout>
                : <FormLayout>
                    <Div>
                        <Spinner/>
                    </Div>
                </FormLayout>}
        </ModalPage>
    }
}

function stateToProps(state) {
    return state
}

export default connect(stateToProps)(CreatePostModal);