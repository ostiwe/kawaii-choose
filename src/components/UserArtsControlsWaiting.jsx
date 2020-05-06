import React from 'react';
import {Card} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

function UserArtsControlsWaiting({items, imageLoaded}) {
    return items.map(item => {
        return <Card
            mode={'shadow'} key={item.post.id}
            className={'cards-grid__item cards-grid__item-moderate image-loading'}>
            <div
                className={'arts-grid arts-grid__item home-card__image profile-card'}>
                <img alt={'kawaii app image ' + item.file.filename} onClick={() => {
                    bridge.send("VKWebAppShowImages", {
                        images: [
                            `https://api.ostiwe.ru/file/${item.file.filename}`
                        ]
                    })
                }} onLoad={imageLoaded} className={'cards-grid__item-moderate-img'}
                     src={`https://api.ostiwe.ru/file/${item.file.filename}?thumb=1`}/>
            </div>
        </Card>
    })

}

// UserArtsControlsWaiting.propTypes = {
//     items: PropTypes.arrayOf(PropTypes.objectOf({
//         post: PropTypes.objectOf({
//             dislikes: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//             file_id: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//             id: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//             likes: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//             published: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//             subtitle: PropTypes.string,
//             title: PropTypes.string,
//             visible: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
//         }),
//         file: PropTypes.objectOf({
//             app: PropTypes.string,
//             file_type: PropTypes.string,
//             filename: PropTypes.string,
//             height: PropTypes.number,
//             in_vk: PropTypes.number,
//             uploaded: PropTypes.number,
//             width: PropTypes.number,
//         }),
//         categories: PropTypes.arrayOf(PropTypes.objectOf({
//             id: PropTypes.number,
//             ru_name: PropTypes.string
//         }))
//     }))
// }

export default UserArtsControlsWaiting;