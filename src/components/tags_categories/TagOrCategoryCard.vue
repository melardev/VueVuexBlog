<template>
    <div class="card my-4">
        <h5 class="card-header">{{this.item_type === 'tag' ? 'Tags' : 'Categories'}}</h5>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <ul class="list-unstyled mb-0">
                        <li v-for="(item,index) in (this.item_type === 'tag' ? getTags: getCategories)" :key="index.id"
                            :index="index">
                            <router-link :to="`/articles/${prefixUrl}/${item.slug}`">{{item.name}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from "vuex"
    import {TagAction} from "@/store/types.actions";
    import {CategoryAction} from "@/store/types.actions";


    export default {
        name: "TagOrCategoryCard",
        props: {item_type: {type: String, required: true}},
        mounted() {
            console.log(`TagOrCategoryCard__${this.item_type}::mounted`);
            if (this.item_type === 'tag' && this.getTags.length === 0)
                this.fetchAllTags();
            else if (this.item_type === 'category' && this.getCategories.length === 0)
                this.fetchAllCategories();
        },

        computed: {
            ...mapGetters("tags", [
                'getTags', 'isLoading'
            ]),
            ...mapGetters("categories", [
                'getCategories', 'isLoading'
            ]),
            prefixUrl() {
                if (this.item_type === 'tag')
                    return 'by_tag';
                else if (this.item_type === 'category')
                    return 'by_category';
                else throw Error('Invalid item type')
            }
        },

        methods: {
            // same as fetchAll(){this.$store.dispatch(FETCH_ALL)
            ...mapActions('tags', {
                    fetchAllTags: TagAction.remote.FETCH_ALL,
                }
            ),
            ...mapActions('categories', {
                fetchAllCategories: CategoryAction.remote.FETCH_ALL
            }),
        }
    }
</script>

<style scoped>

</style>