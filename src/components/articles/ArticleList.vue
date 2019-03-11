<template>
    <div class="container row">
        <div class="col-md-8">

            <h1 class="my-4">
                All articles
            </h1>

            <template v-if="getArticles.length > 0">
                <app-article-summary v-for="(article, index) in this.getArticles" :article=article :key="index.id"
                                     :index="index">
                </app-article-summary>
            </template>
            <template v-else-if="getArticles.length === 0 && true">
                <span>Loading ...</span>
            </template>
            <app-pagination
                    :page-meta="this.getPageMeta"
                    @fetch-more="fetchMore"
            />
        </div>
        <div class="col-md-4">
            <div class="card my-4">
                <h5 class="card-header">Search</h5>
                <div class="card-body">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..."/>
                        <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
                    </div>
                </div>
            </div>

            <app-tag-or-category-card item_type="tag"></app-tag-or-category-card>
            <app-tag-or-category-card item_type="category"></app-tag-or-category-card>

            <div class="card my-4">
                <h5 class="card-header">Side Widget</h5>
                <div class="card-body">
                    You can put anything you want inside of these side widgets. They are easy to use, and
                    feature the new Bootstrap 4 card containers!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import {ArticleAction} from "@/store/types.actions";
    import ArticleSummary from "./ArticleSummary";
    import TagOrCategoryCard from "./../tags_categories/TagOrCategoryCard";
    import Pagination from "@/components/shared/Pagination";

    export default {
        data() {
            return {
                title: 'Newest articles'
            }
        },
        name: 'ArticleList',
        props: ['slug', 'username'],
        components: {
            appTagOrCategoryCard: TagOrCategoryCard,
            appArticleSummary: ArticleSummary,
            appPagination: Pagination
        },
        mounted() {
            this.fetchArticles();
        },

        computed: {
            ...mapGetters("articles", [
                'getArticles', 'isLoading', 'getPageMeta'
            ]),
        },

        methods: {
            // same as fetchAll(){this.$store.dispatch(FETCH_ALL)
            ...mapActions('articles', {
                    fetchAll: ArticleAction.remote.FETCH_ALL,
                }
            ),

            fetchArticles(pageRequest = {page: 1, page_size: 5}) {
                this.fetchAll(pageRequest);
            },

            fetchMore(pageRequest) {
                this.fetchAll(pageRequest);
            },
        },
    };
</script>

<style scoped lang="scss">
    // @import "../../styles/home.scss";
</style>

