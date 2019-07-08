"use strict";
console.log('Great now it works!');
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);
new Vue({
    el: '#app',
    data: function () {
        return {
            loading: true,
            search: '',
            pagination: {},
            selected: [],
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Image', value: 'image_url' },
                { text: 'Tag Line', value: 'tagline' },
                { text: 'Description', value: 'description' },
                { text: 'Contributed', value: 'contributed_by' },
                { text: 'First Brewed', value: 'first_brewed' }
            ],
            beers: [],
            totalBeers: 0
        }
    },
    watch: {
        pagination: {
            handler () {
                this.getDataFromApi()
                    .then(data => {
                        this.beers = data.items
                        this.totalBeers = data.total
                    })
            },
            deep: true
        }
    },
    mounted () {
        this.getDataFromApi()
            .then(data => {
                this.beers = data.items
                this.totalBeers = data.total
            })
    },
    methods: {
        getDataFromApi () {
            this.loading = true
            return fetch('https://api.punkapi.com/v2/beers').then((response) => {
                return response.json().then((json) => {
                    console.log("JSON", json)
                    const { sortBy, descending, page, rowsPerPage } = this.pagination
    
                    let items = json
                    const total = items.length
        
                    if (this.pagination.sortBy) {
                    items = items.sort((a, b) => {
                            const sortA = a[sortBy]
                            const sortB = b[sortBy]
            
                            if (descending) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                            } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                            }
                        })
                    }
        
                    if (rowsPerPage > 0) {
                        items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    }
        
                    this.loading = false
                    return {items, total}
                })
            })
        }
    }
});