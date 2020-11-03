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
          {{ (openPairsCount) + ' / ' + (cards.length) }}
        </div>
      </div>
      <div class="flip-cards"
           :class="cardsFrozen ? 'frozen' : '' "
           @click="startTimerTick()">
        <div v-for="(item, index) in deckOfCards"
             :class="item.state"
             :style="'background: url(img/' + item.name + '.jpg) 0 -6px no-repeat; background-size: cover;'"
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
    
    export default {
        data() {
            return {
                cards: ['card-jh', 'card-jc', 'card-kc', 'card-kd', 'card-kh', 'card-qs', 'card-qc', 'card-td', 'card-ks', 'card-js', 'card-qh', 'card-qd' ],
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
            onClickCard(index, item) {
                if (this.previousCardName === null) {
                    this.showCard(index);
                    this.previousCardName = item.name;
                    this.previousCardIndex = index;
                }
                else if (this.previousCardName === item.name) {
                    this.showCard(index);
                    this.openPairsCount++;
                    this.previousCardName = null;
                    this.previousCardIndex = null;
                }
                else {
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


<style scoped>
  .bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.8;
    z-index: 100;
  }
  
  .popup {
    position: fixed;
    top: calc(42vh - 98px);
    left: 35%;
    right: 35%;
    padding: 40px 80px;
    background-color: #B4AD9D;
    text-align: center;
    z-index: 200;
    border-radius: 8px;
  }
  .wrapper {
    margin: 0 auto;
    width: 1300px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .flip-cards {
    
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transform: rotateY(180deg);
  
  }
  
  .flip-card-inner {
    width: 150px;
    height: 212px;
    background-color: #fff;
    margin-bottom: 12px;
    cursor: pointer;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .75);
    border-radius: 8px;
    position: relative;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .open-card {
     /*z-index: 3;*/
     pointer-events: none;
     transform: rotateY(180deg);
   }
  
  .frozen {
    pointer-events: none;
  }
  
  .flip-card-front, .flip-card-back{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-repeat: no-repeat;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  .flip-card-front {
    background: url(../img/reverse.jpg) 0 -6px no-repeat;
    background-size: cover;
  }
  
  .flip-card-back {
    padding-top: 10px;
    /*z-index: 2;*/
    background-size: contain;
    background-position-x: center;
  }
  
</style>
