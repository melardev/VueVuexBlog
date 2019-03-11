<template>
    <div v-if="getToast.message !== ''" :class="getToast.className">
        {{getToast.message}}
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import {NotificationAction} from "@/store/types.actions";

    export default {
        name: "Notifications",
        methods: {
            ...mapMutations('notifications', {clearToast: NotificationAction.CLEAR_TOAST, clearDialog: NotificationAction.CLEAR_DIALOG}),
        },
        computed: {
            ...mapGetters('notifications', ['getToast', 'getToastMessage']),
            dialog() {
                return this.$store.getters['notifications/getDialog']
            }
        },
        watch: {
            // WARNING: if you plan using this keyword, the functions should not be implemented with () =>{} but as below:
            dialog: function () {
                if (this.$store.state.notifications.dialog.message !== "") {
                    this.$toasted.show(this.$store.getters['notifications/getDialogMessage'], {
                        duration: 5000,
                        className: this.$store.state.notifications.dialog.className
                    });
                    setTimeout(this.clearDialog, 3000);
                }
            },

            getToast: function () {
                if (this.getToastMessage !== "") {
                    setTimeout(() => this.$store.commit(NotificationAction.CLEAR_TOAST), 3000);
                }

            }
        }
    }
</script>

<style scoped>

</style>
