import React from "react";
import {Button, Div, File, FormLayout, ModalPage, ModalPageHeader, Progress} from "@vkontakte/vkui";
import API from "../utils/API";
import {connect} from "react-redux";
import {setCreatePostFile} from "../redux/actions";

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
        apiSender.fileUploader(this.props.appReducer.create_post_file, this.props.appReducer.create_post_categories, this.props.appReducer.user_info.id)
            .catch(reason => {
                console.log(reason);
            })
            .then(response => {
                console.log(response);
            })
    }


    render() {
        const {setActiveUserProfileModal, id, appReducer} = this.props;
        const {loading, uploadProgress, file} = this.state;
        return <ModalPage id={id} dynamicContentHeight={true} onClose={() => {
            setActiveUserProfileModal(null)
        }}
                          header={<ModalPageHeader>Создать пост</ModalPageHeader>}
        >
            <Button onClick={() => {
                this.setState({loading: !loading})
                console.log(appReducer);
            }}>change load</Button>
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
                        <p>Создаем пост...</p>
                        <Progress value={30}/>
                    </Div>
                </FormLayout>}
        </ModalPage>
    }
}

function stateToProps(state) {
    return state
}

export default connect(stateToProps)(CreatePostModal);