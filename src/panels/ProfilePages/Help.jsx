import React from 'react';
import {Div, Group, Header, Panel, PanelHeaderBack, PanelHeaderSimple, Link} from "@vkontakte/vkui";


export default function ({id, go}) {
    const faq = [
        {
            title: 'Как добавить свой арт?',
            text: <span>Для создания арта перейдите <Link data-to={'add_art'} onClick={go}>сюда</Link></span>
        },
        {
            title: 'Мне не нравится арт, что делать?',
            text: `Ничего, если в течении нескольких дней он не наберет нужно количество лайков - он удалится.
         Если необходимо немедленно удалить арт, напишите нам в сообщество, но помните, для удаления должна
          быть весомая причина.`
        },
        {
            title: 'Что-то не так отображается',
            text: `Не стоит паниковать или превращать это в катастрофу, попробуйте для начала нажать на троеточие
         в верхней части приложения, далее выбираем "Очистить кэш", после чего снова открываем приложение.
         Все починилось - Отлично. Нет - сообщите об найденой вами проблеме администрации, для этого перейдите
         в приложении по пути: Профиль -> Сообщить о баге и нажмите на кнопку Добавить.`,
        }
    ];

    return (
        <Panel separator={false} id={id}>
            <PanelHeaderSimple
                left={<PanelHeaderBack onClick={go} data-to={'user_profile'}/>}>База знаний</PanelHeaderSimple>
            <Group>
                {faq.map((value, index) => {
                    return <Group separator={'show'} header={<Header>{value.title}</Header>} key={index}>
                        <Div>{value.text}</Div>
                    </Group>
                })}
            </Group>
        </Panel>
    );
}