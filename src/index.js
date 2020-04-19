import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store";
import * as Sentry from '@sentry/browser'
import {ConfigProvider} from "@vkontakte/vkui";
// import {ConfigProvider} from "@vkontakte/vkui";

// Init VK  Mini App
bridge.send("VKWebAppInit");
Sentry.init({dsn: "https://68793bc3706341008cb486547c2ec117@o376479.ingest.sentry.io/5197343"});


ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById("root"));

if (process.env.NODE_ENV === "development") {
    import("./eruda").then(eruda => {
    }); //runtime download
}
