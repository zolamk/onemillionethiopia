import toast, { useToast, POSITION } from "vue-toastification"
import "vue-toastification/dist/index.css";

export default {
    install(app, options) {
        app.use(toast, {
            position: POSITION.BOTTOM_RIGHT,
            closeButton: false
        })
        app.config.globalProperties.toast = useToast();
    }
}