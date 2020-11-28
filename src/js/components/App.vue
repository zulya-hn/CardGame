<template>
    <div>
        <div v-if="openPairsCount === 12">
            <div class="bg"></div>
            <div class="popup">
                <h2>Congratulations! <br> Your time is {{ parseInt(timer / 60) }}:{{ timer % 60 }}</h2>
                <button class="btn btn-primary"
                        @click="playAgain">
                    Play again!
                </button>
            </div>
        </div>
        <div class="wrapper">
            <h1 class="title">
                The Pairs
            </h1>
            <div class="progress">
                <div class="progress-bar"
                     :style="progressWidth">
                    {{ getProgressCount() }}
                </div>
            </div>
            <div class="flip-cards"
                 :class="cardsFrozen ? 'frozen' : '' "
                 @click="startTimerTick()">
                <div v-for="(item, index) in deckOfCards"
                     :class="getClass(item)"
                     class="flip-card-inner"
                     @click="onClickCard(index, item)"
                >
                    <div class="flip-card-front">
                    </div>
                    <div class="flip-card-back">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getCards} from '../helpers.js';

export default {
    data() {
        return {
            cards: getCards(),
            deckOfCards: [],
            previousCardName: null,
            previousCardIndex: null,
            openPairsCount: 0,
            cardsFrozen: false,
            timerAlreadyStart: false,
            timer: 0
        };
    },
    created() {
        this.createAndSortDeckOfCards();
    },
    computed: {
        progressWidth() {
            return {
                width: (this.openPairsCount / this.cards.length * 100) + '%'
            };
        }
    },
    methods: {
        getProgressCount() {
            if(this.openPairsCount === 0) {
                return '';
            }

            return (this.openPairsCount) + ' / ' + (this.cards.length);
        },
        getClass(item) {
            if (item.state === 'open-card') {
                return item.state + ' ' + item.name;
            }
            return item.state;
        },
        onClickCard(index, item) {
            if (this.previousCardName === null) {
                this.showCard(index);
                this.previousCardName = item.name;
                this.previousCardIndex = index;
            } else if (this.previousCardName === item.name) {
                this.showCard(index);
                this.openPairsCount++;
                this.previousCardName = null;
                this.previousCardIndex = null;
            } else {
                this.showCard(index);

                this.cardsFrozen = true;
                setTimeout(() => {
                    this.closeCard(index);
                    this.closePrevCard();
                    this.previousCardName = null;
                    this.previousCardIndex = null;

                    this.cardsFrozen = false;
                }, 1250);
            }
        },

        showCard(index) {
            this.deckOfCards[index].state = 'open-card';
        },
        closeCard(index) {
            this.deckOfCards[index].state = 'close-card';
        },
        closePrevCard() {
            this.deckOfCards[this.previousCardIndex].state = 'close-card';
        },

        createAndSortDeckOfCards() {
            for (let cardName of this.cards) {
                for (let i = 1; i <= 2; i++) {
                    this.deckOfCards.push({'state': 'close-card', 'name': cardName});
                }
            }

            this.sortDeckOfCards();

        },
        sortDeckOfCards() {
            this.deckOfCards.sort(() => Math.random() - 0.5);
        },
        startTimerTick() {
            if (!this.timerAlreadyStart) {
                this.timerAlreadyStart = true;
                this.timerTick();
            }
        },
        timerTick() {
            if (this.openPairsCount < 12) {
                setTimeout(() => {
                    this.timer++;
                    this.timerTick();
                }, 1000);
            }
        },
        playAgain() {
            this.timerAlreadyStart = false;
            this.timer = 0;
            this.openPairsCount = 0;
            this.deckOfCards = [];
            this.createAndSortDeckOfCards();
        }
    },

};
</script>
