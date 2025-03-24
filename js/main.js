const MAX_CARDS_COLUMN_1 = 3;
const MAX_CARDS_COLUMN_2 = 5;

new Vue({
    el: '.wrapper',
    data: {
        cards: [
            { title: 'Задача 1', column: 1 },
            { title: 'Задача 2', column: 2 },
            { title: 'Задача 3', column: 3 }
        ]
    },
    computed: {
        column1CardCount() {
          return this.cards.filter(card => card.column === 1).length;
        },
        column2CardCount() {
          return this.cards.filter(card => card.column === 2).length;
        }
      },
    methods: {
        addCard: function(column) {
            if (column === 1 && this.column1CardCount >= MAX_CARDS_COLUMN_1) {
              alert('В первом столбце находится максимальное количество карточек!');
              return;
            }
            if (column === 2 && this.column2CardCount >= MAX_CARDS_COLUMN_2) {
              alert('Во втором столбце находится максимальное количество карточек!');
              return;
            }
            this.cards.push({ title: 'Новая задача', column: column });
          },
          moveCard: function(card, column) {
            if (column === 1 && this.column1CardCount >= MAX_CARDS_COLUMN_1) {
                alert('В первом столбце находится максимальное количество карточек!');
                return;
            }
            if (column === 2 && this.column2CardCount >= MAX_CARDS_COLUMN_2) {
                alert('Во втором столбце находится максимальное количество карточек!');
                return;
            }
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