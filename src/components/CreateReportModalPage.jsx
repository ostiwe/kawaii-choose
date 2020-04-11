import React from 'react';
import {
    Button,
    Div,
    FormLayout,
    FormLayoutGroup,
    Group,
    Input,
    ModalPage,
    ModalPageHeader,
    Placeholder,
    Spinner,
    Textarea
} from "@vkontakte/vkui";
import {clearBugReport} from "../redux/actions";
import {connect} from "react-redux";
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

class CreateReportModalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            status: null,
        };
    }

    sendReport = () => {
        this.setState({loading: true});
        this.props.sendBugReport()
            .then(response => {
                if (response.status === 'success') {
                    this.setState({loading: false, status: 'ok'});
                    this.props.setActiveUserProfileModal('bug_sender_done');
                    this.props.dispatch(clearBugReport());
                }
                if (!response || response.status !== 'success') {
                    this.setState({loading: false, status: 'err'});
                }
            })
            .catch(reason => {
                this.setState({loading: false, status: 'err'});
            });
    };

    render() {
        const {
            setActiveUserProfileModal, changeBugTitle,
            changeBugSubTitle, id,
            appReducer
        } = this.props;
        const {bug_title, bug_subtitle} = appReducer;
        const {loading, status} = this.state;
        return <ModalPage id={id} dynamicContentHeight={true}
                          header={<ModalPageHeader>Сообщить о баге</ModalPageHeader>}
        >
            <Group>
                <Div>
                    {(!loading && status === null) && (
                        <FormLayout>
                            <Input top={'Название'} bottom={'Придумайте короткое, но описывающую проблему название'}
                                   name={'bug_title'} value={bug_title} onChange={changeBugTitle}/>
                            <Textarea grow={false} top={'Сообщение'}
                                      bottom={'Опишите проблему, чем подробнее - тем лучше'}
                                      name={'bug_text'} value={bug_subtitle} onChange={changeBugSubTitle}/>

                            <FormLayoutGroup>
                                <Button mode={'secondary'} onClick={() => {
                                    this.props.dispatch(clearBugReport())
                                }}>Очистить</Button>
                                <Button mode={'primary'} onClick={this.sendReport}>Отправить</Button>
                            </FormLayoutGroup>
                        </FormLayout>
                    )}

                    {loading && <Placeholder icon={<Spinner size={"large"}/>}
                                             header={'Отправляем информацию о баге'}
                    />}

                    {status === 'err' ? <Placeholder icon={<Icon28ErrorOutline width={100} height={100}/>}
                                                     header={'Произошла какая-то ошибка, повторите позже.'}
                                                     action={<Button
                                                         onClick={() => setActiveUserProfileModal(null)}>Окей</Button>}
                    /> : null}
                </Div>
            </Group>
        </ModalPage>
    }
}

function toProps(state) {
    return state;
}

export default connect(toProps)(CreateReportModalPage)