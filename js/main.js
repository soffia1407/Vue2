new Vue({
    el: '.wrapper',
    data: {
        cards: [
            { title: 'Задача 1', column: 1 },
            { title: 'Задача 2', column: 2 },
            { title: 'Задача 3', column: 3 }
        ]
    },
    methods: {
        addCard: function (column) {
            this.cards.push({ title: 'Новая задача', column: column });
        }
    }
});