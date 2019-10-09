<template>
  <div class="back" @click="show_set=!show_set">
    <div class="player">
      <div class="count">人数:{{count}} 轮次:{{round}}</div>
      <div class="show-player"></div>
      <div class="add">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div class="input">
      <div class="name">陈毅康</div>
      <div class="in_bu">
          <el-input
      class="in"
      v-model.number="score" 
      clearable></el-input>
        <div class="p_m">
        <div class="plus"><i class="el-icon-plus"></i></div>
        <div class="minus"><i class="el-icon-minus"></i></div>
      </div>
      <div class="keybored">
          <div class="key" 
          @click="input_num"
          v-for="(item, key) in buttons" 
          :key = "key"
          :value="item">{{item}}</div>
      </div>
      </div>
      <div class="co_ne">
          <div class="confirm">确定</div>
          <div class="next">下一个</div>
      </div>
      
    

    </div>
    <div class="setting" @click.stop="show_set=!show_set"><i class="el-icon-setting"></i></div>
    <transition name="move">
        <div class="dialog" v-show="show_set" @click.stop>
            
        </div>
    </transition>
    
  </div>
</template>


<script>
export default {
  data() {
    return {
      count: 0,
      round: 1,
      score: '',
      buttons:['1','2','3','4','5','6','7','8','9','←','0'],
      show_set:false,
    };
  },

  methods: {
      input_num(event){
          let a=event.target.textContent
          if(a=='←'){
              this.score=this.score.substring(0,this.score.length-1)
          }
          else
          {
              this.score+=event.target.textContent
              }


  },
  }
};
</script>


<style scoped>
.back {
  background-color: grey;
  height: 100vh;
  width: 100vw;
  display: flex;
}
.player {
  background-color: white;
  width: 40vw;
  height: 100vh;
  border-radius: 3vh;
}
.count {
  background-color: black;
  height: 10vh;
  border-radius: 3vh 3vh 0 0;
  color: white;
  text-align: center;
  line-height: 10vh;
  font-size: 3vh;
}
.show-player {
  height: 82vh;
}
.add {
  background-color: black;
  height: 8vh;
  border-radius: 0 0 3vh 3vh;
  color: white;
  text-align: center;
  line-height: 8vh;
  font-size: 6vh;
}
.input{
    background-color: white;
    height: 82vh;
    width: 50vw;
    position: absolute;
    top:10vh;
    right:5vw;
    border-radius: 3vh;
}
.name{
    text-align: center;
    padding: 2vh;
    font-size: 4vh;
}
.p_m{
    height: 20vh;
    display: table-cell;
   vertical-align: middle;
   display: flex;
}
.plus,.minus{
   height: 10vh;
   width: 10vh; 
   background-color: rgb(252, 61, 61);
   border-radius: 50%;
   margin: 1.5vh;
   color:white;
   text-align: center;
   line-height: 10vh;
   font-size: 8vh;
   box-shadow:3px 3px 9px #333333; box-shadow:3px 3px 9px #333333; box-shadow:3px 3px 9px #333333;
}
.plus{
    background-color: rgb(49, 250, 49);
}
.in{
    width: 25vw;
    padding: 10% 25% 10% 25%;
    }
.keybored{
    height: 23vh;
}
.key{
    line-height: 5vh;
    text-align: center;
    font-size: 20px;
    width: 15vw;
    height:5vh;
    margin: 1%;
    background-color: rgb(0, 183, 255);
    float: left;
    border:solid gray 0.5px;
    border-radius: 1vh;
}
.co_ne{
    margin: 0 auto;
    margin-top:1vh;
    width: 40vw;
    height: 16vh;
}
.confirm,.next{
    height: 7vh;
    text-align: center;
    line-height: 7vh;
    background-color: rgb(35, 243, 87);
    margin: 1vh;
    font-size: 3vh;
    color: white;
    border-radius: 20%;
    border:solid gray 1px;
}
.setting{
    position: absolute;
    top:10px;
    right:10px;
    color: white;
    font-size: 30px;
}
.dialog{
    background-color: black;
    position: absolute;
    top:35px;
    right:35px;
    width: 300px;
    height: 500px;
    z-index: 1;
    opacity: 0.6;
    border-radius: 10%;
    color: white;

}
.move-enter-active,.move-leave-active{
    transition: all 0.3s;
}
.move-enter,.move-leave-to{
    opacity: 0;
    width: 0;
    height: 0;
}
</style>