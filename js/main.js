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
        },
        moveCard: function (card, column) {
            card.column = column;
        },
        deleteCard: function (card) {
            const index = this.cards.indexOf(card);
            if (index > -1) {
                this.cards.splice(index, 1);
            }
        }
    }
});