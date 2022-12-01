const { createApp } = Vue;

const app = createApp({
    data () {
        return {
        listaNumeri: [],
        listaNumeriTemporanea: [],
        ajaxCounter: 0,
        listaUtenti: []
        };
    },
    methods: {
        fetchData () {
        
        // Creo la richiesta AJAX
        axios.get("https://flynn.boolean.careers/exercises/api/random/int?" + Math.random())
            .then((resp) => {
            // Questa funzione verrà invocata automaticamente SOLO quando axios 
            // riceve la risposta dal server. Questa può impiegare X tempo.

            console.log(resp);

            // resp.data -> contiene il JSON che il server ha inviato come risposta alla mia richiesta
            console.log(resp.data);

            console.log("Il numero random generato dal server è: " + resp.data.response);

            this.listaNumeriTemporanea.push(resp.data.response);

            this.ajaxCounter--;

            if (this.ajaxCounter <= 0) {
                this.listaNumeri = this.listaNumeriTemporanea;
            }
            });
        },
        startNumbersFetching () {
        this.ajaxCounter = 10;

        for (let i = 0; i < 10; i++) {
            this.fetchData();

        }
        }
    },
    mounted () {
        // recupero la lista degli utenti tramite api
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((resp) => {
            this.listaUtenti = resp.data;
        });

    }
}).mount('#app');