import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import App from './App.vue'
import router from './router'


import "@/assets/css/custom.css";
import "@/assets/css/style.blue.css";
import "@/assets/css/style.default.css";
import "@/assets/css/style.gold.css";
import "@/assets/css/style.green.css";
import "@/assets/css/style.pink.css";
import "@/assets/css/style.red.css";
import "@/assets/css/style.sea.css";
import "@/assets/css/style.violet.css";

// import { useMemberStore } from './stores/memberStore'

const API_URL = 'http://localhost:8080/mall'

//予許axios每次請求,都自動附帶跨域cookie
axios.defaults.withCredentials = true;

// //刷新頁面時,如果我的sessionStorage有登入資料,則還原我的pinia
// axios.get(`${API_URL}/check`).then((rs) => {
//     if(rs.data){
//         // console.log(sessionStorage)
        
//         const loggedInMember = JSON.parse(sessionStorage.getItem("loggedInMember"));
//         useMemberStore().loginSuccess(loggedInMember);
//     }
// });

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.globalProperties.API_URL = API_URL;
app.mount('#app')
