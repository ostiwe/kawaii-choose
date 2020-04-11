import React from 'react';
import {Div, Group, Header, Panel, PanelHeaderBack, PanelHeaderSimple} from "@vkontakte/vkui";

const faq = [
    {title: 'Как добавить свой арт?', text: 'В данный момент, этого пока нельзя сделать'},
    {
        title: 'Мне не нравится арт, что делать?',
        text: `Ничего, если в течении нескольких дней он не наберет нужно количество лайков - он удалится.
         Если необходимо немедленно удалить арт, напишите нам в сообщество, но помните, для удаления должна
          быть весомая причина.`
    }
];

export default function ({id, go}) {
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