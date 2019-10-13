<template>
  <div class="uno">
    <img src="./timg.jpg" class="img">
    
    <div class="all"></div>
    <div class="up_all">
      
      <div class="round_panel" >
        <div class="roundlst" v-for="round in round_lst" :key="round">{{round}}</div>
        </div>
      <transition-group name='player_name' tag="div">
              <div class="pl"
               v-for="item in name_lst" 
               :key="item">
                  <div>{{item}}</div>
                  <div class="score_full">{{player_info[item].score}}</div>
                  <div v-for="pl_score in player_info[item].scores"
                  :key="pl_score">{{pl_score}}</div>
                  </div>
                  
      </transition-group>
    </div>
     <transition name="boom">
        <div class="boom_dialog" v-show="show_boom">
          <h2>本轮结束！</h2>
          <p>{{boom_score}}分!!!{{boom_name}}超过了爆炸上限{{explo}}！</p>

          <img src="./timg.gif" class="gif">
        </div>
      </transition>
      
  </div>
</template>


<script>

export default {
  
  data() {
    return {
      name_lst:[],
      explo:100,
      player_info:{},
      b:0,
      boom_score:0,
      boom_name:'',
      show_boom:false,
      round_lst:[],
      round:0,
    };
  },
  sockets:{
      namelst(data){
        
        this.$set(this.player_info,data.name,{
          score:data.fullscore,
          scores:[]
        })
        this.name_lst.push(data.name)
        // console.log(this.player_info[data.name].score)
      },
      del(i){
        this.name_lst.splice(i,1)
      },
      set_ex(data){
        this.explo=data
      },
      upd_res(data){
        this.player_info[data.name].scores.push(data.score)
        this.player_info[data.name].score+=data.score
        if(this.player_info[data.name].scores.length==this.round+1){
            this.round+=1
            this.round_lst.push(this.round)
        }
        else{null}
        if (this.player_info[data.name].score<=this.explo*(-1)){
          this.boom_score=this.player_info[data.name].score
          this.boom_name=data.name
          this.show_boom=true
          this.$socket.emit("boom_ser", 'boom')
        }
        else{null}
        

      },
      next(){
          this.show_boom=false
          this.player_info={}
          for(let i=0;i<this.name_lst.length;i++){
            this.$set(this.player_info,this.name_lst[i],{
          score:0,
          scores:[],
        })
          }
        this.round_lst=[]
        this.round=0
      },
      clear(){
        this.player_info={}
          for(let i=0;i<this.name_lst.length;i++){
            this.$set(this.player_info,this.name_lst[i],{
          score:0,
          scores:[],
        })
          }
        this.round_lst=[]
      }
  },
  
  
  computed:{
   
        
  },
  created(){
    setInterval(() => {
             this.$socket.emit("round_ser", this.round_lst.length)
          }, 500)
  }
 
 } ;
 
</script>


<style scoped>
.uno{
  height: 100vh;
  width: 100vw;

}
.img{

  height: 100vh;
  width: 100vw;
  position: absolute;
  right: 0;
}
.all{
  background-color:white;
  opacity: 0.8;
  width: 80vw;
  height: 80vh;
  position: absolute;
  left: 10vw;
  top:10vh;
  border-radius: 30px;

}
.up_all{
  width: 80vw;
  height: 80vh;
  position: absolute;
  left: 10vw;
  top:10vh;
  padding-left: 5vw;
  
}
.round_panel{
position: absolute;
margin-left:-4vw;
margin-top:11vh;

font-size: 2.5vh;
line-height: 5vh;
background-color: rgb(10, 45, 68);
opacity: 0.4;
border-radius: 15px 0 0 15px;


}
.roundlst{
width: 4vw;
text-align:center;
color: white;


}
.pl{
    margin:1vh;
    width: 8vw;
    float: left;
    color: black;
    font-size: 2.5vh;
    line-height: 5vh;
    text-align: center;
    border-radius: 8px;
    background-color: rgb(119, 189, 247);
    opacity: 0.9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .08)
}


.pl{
  transition: all 0.5s;
}
.player_name-enter{
  opacity: 0;
  transform: translatex(10vw);
}
.player_name-leave-to{
    opacity: 0;
  transform: translatey(20vh);
}
.player_name-leave-active {
  position: absolute;
}
.score_full{
  border-radius: 8px;
  background-color: chartreuse;
  opacity: 0.8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .24), 0 0 12px rgba(0, 0, 0, .32)
}
.boom_dialog{
  width: 39vw;
  height: 38.4vh;
  background-color: white;
  position: absolute;
  top:31vh;
  left:30.5vw;
  text-align: center;
  font-size: 4vh;
  border: 5px solid red;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .08)
}
.gif{
  border-radius: 0 0 30px 30px;
}
.boom_dialog h2{
  color: red;
}
.boom-enter-active {
  animation: boom-in .5s;
}
.boom-leave-active {
  animation: boom-out .5s;
}
@keyframes boom-in {
  0% {
    transform-origin: center; 
    transform: scale(0);
  }
  60% {
    transform-origin: center; 
    transform: scale(2);
    background-color: red;
    color: white;
  }
  100% {
    transform-origin: center; 
    transform: scale(1);
  }
}
@keyframes boom-out{
  from {transform: scale(1)}
  to {transform: scale(0)}
}

</style>