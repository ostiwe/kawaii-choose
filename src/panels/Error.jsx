import React from "react";
import {Div, Link, Panel, Placeholder, PromoBanner} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';


class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {id} = this.props;
        const promoBannerProps = {
            title: '/Anime/Kawaii',
            domain: 'vk.com',
            trackingLink: 'https://vk.cc/asgrf5',
            ctaText: 'Перейти',
            advertisingLabel: 'Реклама',
            iconLink: 'https://sun1-17.userapi.com/Yqwfall-5ZszkQBfTVisBAP2KnOYjaGIPAAn_A/t7rXXHJu9Ic.jpg',
            description: '/Anime/Kawaii - Постим красивые пикчи',
            ageRestriction: 10,
        };


        return (
            <Panel id={id}>
                <Placeholder icon={<Icon56ErrorOutline/>} header={'Ошибка'}>
                    <Div className={'normalize-text'}>
                        Простите, но при проверке возникла ошибка. Это может произойти из-за того что кто-то пытается
                        подменить ваши данные.
                    </Div>
                    <Div className={'normalize-text'}>
                        Попробуйте зайти через некоторое время, если ошибка не исчезает, <Link
                        href={'https://vk.com/write-153626005'}>напишите нам</Link>

                    </Div>
                </Placeholder>
                <PromoBanner className={'banner'} bannerData={promoBannerProps} isCloseButtonHidden={true}/>
            </Panel>
        )
    }
}

export default Error;