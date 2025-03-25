const MAX_CARDS_COLUMN_1 = 4;
const MAX_CARDS_COLUMN_2 = 6;
const STORAGE_KEY = 'vue-kanban-data'; // Ключ, под которым хранятся данные в localStorage

Vue.component('task-component', {
    props: ['item', 'card'], //с  tasks переименовала на item
    template: `
        <li>
            <input type="checkbox" v-model="item.checked" @change="checkAndMoveCard">
            {{ item.text }}
        </li>
    `,
    methods: {
        checkAndMoveCard() {
            this.$emit('check-and-move-card', this.card);
        }
    }
});

Vue.component('card-component', {
    props: ['card', 'column'],
    template: `
        <div v-for="card in cards" v-if="card.column === 1" :key="card.id">
            {{ card.title }}
            <div v-if="card.title">
                <ul>
                    <task-component
                        v-for="(item, index) in card.items"
                        :key="index"
                        :item="item"
                        :card="card"
                    ></task-component>
                </ul>
                <input type="text" v-model="card.newItemText" placeholder="Новый пункт списка">
                <button @click="addItem(card)">Добавить пункт</button>
            </div>
            <button @click="moveCard(card, 2)">В процессе</button>
            <button @click="moveCard(card, 3)">Завершено</button>
            <button @click="deleteCard(card)">Удалить</button>
        </div>
    `,
    methods: {
        addItem() {
            if (this.card.newItemText.trim() !== '') {
                this.card.items.push({ text: this.card.newItemText, checked: false });
                this.card.newItemText = '';
                this.checkAndMoveCard(this.card);
            }
        },
        moveCard(column) {
            this.$emit('move-card', this.card, column);
        },
        deleteCard() {
            this.$emit('delete-card', this.card);
        },
        checkAndMoveCard(card) {
            const totalItems = card.items.length;
            const checkedItems = card.items.filter(item => item.checked).length;
            const percentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

            if (percentage > 50 && percentage < 100) {
                this.moveCard(2);
            } else if (percentage === 100) {
                this.moveCard(3);
            }
        }
    }
});

Vue.component('column-component', {
    props: ['column', 'columnIndex'],
    template: `
        
    `,
    computed: {
        
    },
    methods: {
         
    }
});







new Vue({
    el: '.wrapper',
    data: {
        cards: [
            { column: 1, items: [], newItemText: '' },
            { column: 2, items: [], newItemText: '' },
            { column: 3, items: [], newItemText: '' }
        ],
        newItemText: '',
        newTaskTitle1: '',
        newTaskTitle2: '',
        newTaskTitle3: ''
    },
    created() { 
        this.loadData(); 
    },
    watch: {
        cards: {
            handler: 'saveData',
            deep: true
        }
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
            let newTaskTitle;
            if (column === 1) {
              newTaskTitle = this.newTaskTitle1;
            } else if (column === 2) {
              newTaskTitle = this.newTaskTitle2;
            } else {
              newTaskTitle = this.newTaskTitle3;
            }
          
            if (newTaskTitle.trim() === '') {
              alert('Введите название задачи!');
              return;
            }
            if (column === 1 && this.column1CardCount >= MAX_CARDS_COLUMN_1) {
              alert('В первом столбце находится максимальное количество карточек!');
              return;
            }
            if (column === 2 && this.column2CardCount >= MAX_CARDS_COLUMN_2) {
              alert('Во втором столбце находится максимальное количество карточек!');
              return;
            }
            this.cards.push({ title: newTaskTitle, column: column, items: [], newItemText: '' });
            if (column === 1) {
              this.newTaskTitle1 = '';
            } else if (column === 2) {
              this.newTaskTitle2 = '';
            } else {
              this.newTaskTitle3 = '';
            }
          },
        saveData() {
            const serializedData = JSON.stringify(this.cards); 
            localStorage.setItem(STORAGE_KEY, serializedData); 
        },
        loadData() {
            const serializedData = localStorage.getItem(STORAGE_KEY); 
            if (serializedData) {
                try {
                    this.cards = JSON.parse(serializedData); 
                } catch (error) {
                    console.error('Ошибка при парсинге данных из localStorage:', error);
                }
            }
        }
    }
});