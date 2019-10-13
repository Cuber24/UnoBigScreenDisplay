<template>
  <div class="back" @click.stop="show_set=false">
    <div class="player">
      <div class="count">
          <i class="el-icon-user"></i>{{count}}
           <i class="el-icon-trophy"></i>{{round}}
           </div>
      <div class="show-player">
          <transition-group name='playerlst' tag="div">
              <div :class="{pl:true,show_pl:posi==i&&!change_mod}"
               v-for="(item,i) in playerlst" 
               :key="item">
                  <div class="pl_name" @click.stop="posi=i">{{item}}</div>
                  <div class="del" @click.stop="del(i)" ><i class="el-icon-delete"></i></div>
              </div>
          </transition-group>
      </div>
      <div class="add" @click.stop="change_in_add">
        <i class="el-icon-plus"></i>
      </div>
    </div>


    <transition name="change">
        <div class="input" v-show="!change_mod">
      <div class="name">{{score_name}}</div>
      <div class="in_bu">
          <el-input
      class="in"
      v-model.number="score" 
      ></el-input>
        <div class="p_m">
        <div class="plus" @click.stop="input_plus"><i class="el-icon-plus"></i></div>
      </div>
      <div class="keybored">
          <div class="key" 
          @click.stop="input_num(item)"
          v-for="(item, key) in buttons" 
          :key = "key"
          :value="item">{{item}}</div>
      </div>
      </div>
      <div class="co_ne">
          <div class="confirm" @click="confirm">确定</div>
      </div>
      </div>
    </transition>
    <div :class="{'setting':true,'op':isActive,'cl':!isActive}" 
    @click.stop="set_ani"><i class="el-icon-setting"></i></div>
    <transition name="move">
        <div class="dialog" v-show="show_set" @click.stop>
            
        </div>
    </transition>
    <transition name="move">
        <div class="in_setting" v-show="show_set" @click.stop>
            <div class="no1">
                <p>设置轮次结束上限</p>
                <el-input-number 
                class="change_num"
                size="mini" 
                v-model="expl"
                :step='50'></el-input-number>
            </div>
            <div class="no2">
                <p>清空当前所有回合的成绩</p>
                <div @click.stop="clear_all">清空</div>
            </div>
            <div class="no1">
                <p>点击"+"增加的分数</p>
                <el-input-number 
                class="change_num2"
                size="mini" 
                v-model="plus"
                :step='20'></el-input-number>
            </div>
        </div>
    </transition>

    <transition name="change">
        <div class="input_name" v-show="change_mod">
        <el-input v-model.trim="name" 
        placeholder="请输入姓名"
        style="width:40vw;margin:10vh 5vw 5vw 5vw">
            <el-button slot="append" 
            icon="el-icon-plus"
            @click="add_player"></el-button>
        </el-input>
        <div class="finish" @click.stop="change_in_finish"><i class="el-icon-check"></i></div>
    </div>
    </transition>
    <div class="nextRound" @click.stop="excu_boom" v-show="show_next_round">NEXT</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      round: 1,
      score: '-',
      buttons:['1','2','3','4','5','6','7','8','9','←','0'],
      show_set:false,
      expl:100,
      plus:20,
      name:'',
      change_mod:true,
      isActive:false,
      playerlst:[],
      playerlst_obj:{},
      posi:0,
      show_next_round:false,
    };
  },
  sockets:{
      boom(){
          this.show_next_round=true
          console.log(this.show_next_round)
      },
      roundinfo(data){
          this.round=data+1
      }
     
  },

  methods: {
      set_ani(){
          this.show_set=!this.show_set
          this.isActive=!this.isActive

      },
      input_plus(){
            this.score=this.plus_bu
      },
      input_num(item){
          if(item=='←'){
              this.score=this.score.substring(0,this.score.length-1)
          }
          else
          {
              this.score+=item
              }
    },
    confirm(){
        // 提交成绩数据给选手
        let a=this.playerlst[this.posi]
        this.playerlst_obj[a]=Number(this.score)
        this.$socket.emit("res_ser", {name:a, score:Number(this.score)})

        if(this.posi==this.playerlst.length-1){
            this.posi=0
        }
        else{
            this.posi+=1
        }
        this.score='-'
    },

    change_in_add(){
        if(this.change_mod==false){
            this.change_mod=true
        }
        else{null}
    } ,
    change_in_finish(){
        if(this.change_mod==true){
            this.change_mod=false
        }
        else{null}
    },
    add_player(){
        if(this.name!=''){
            let a=this.name
            this.playerlst.splice(this.playerlst.length,0,this.name)
            localStorage.player_lst=this.playerlst
            this.$socket.emit("up_name", {name:a,fullscore:0})
            this.$set(this.playerlst_obj,a,0)
        }
        else(null)    
        this.name=''

    },
    del(i){
        delete this.playerlst_obj[this.playerlst[i]]
        this.playerlst.splice(i,1)
        localStorage.player_lst=this.playerlst
        this.$socket.emit("del_ser", i)

    },
    excu_boom(){
        this.show_next_round=false
        this.$socket.emit("next_ser", 'next')
    },
    clear_all(){
        this.$socket.emit("clear_ser", 'clear')
    }


    },
    
    computed:{
        count: function(){
            return this.playerlst.length
        },
        score_name: function(){
            return this.playerlst[this.posi]
        },
        plus_bu:function(){
            return '+'+this.plus
        },
        
    },
    created(){
        setInterval(() => {
            this.$socket.emit("ex_to_ser", this.expl)
          }, 1000)


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
  background-color: rgb(0, 0, 0);
  height: 10vh;
  border-radius: 3vh 3vh 0 0;
  color: white;
  text-align: center;
  line-height: 10vh;
  font-size: 3vh;
}
.show-player {
  height: 82vh;
  overflow: auto;
  overflow-x: hidden;
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
.add:active{
    background-color:rgb(46, 46, 46);
}
.input{
    background-color: white;
    height: 82vh;
    width: 50vw;
    position: absolute;
    top:10vh;
    right:5vw;
    border-radius: 3vh;
    overflow: auto;
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
.plus{
   height: 15vh;
   width: 15vh; 
   background-color: black;
   border-radius: 50%;
   margin:4vh;
   margin: 0 auto;
   color:white;
   text-align: center;
   line-height: 15vh;
   font-size: 10vh;
}
.plus{
    background-color: black;
}
.plus:active{
    background-color: rgb(65, 247, 65);
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
    background-color:darkgrey;
    float: left;
    border:solid gray 0.5px;
    border-radius: 1vh;
}
.key:active{
    background-color: white;
}
.co_ne{
    margin: 0 auto;
    margin-top:1vh;
    width: 40vw;
    height: 16vh;
}
.confirm{
    height: 10vh;
    text-align: center;
    line-height: 10vh;
    background-color: rgb(48, 41, 41);
    margin: 2vh;
    margin-top: 5vh;
    font-size: 3vh;
    color: white;
    border-radius: 20%;
    border:solid black 1px;
}
.confirm:active{
    background-color:rgb(90, 82, 82);
}
.setting{
    position: absolute;
    top:10px;
    right:10px;
    color: white;
    font-size: 30px;
}

.op{
    transform: rotate(60deg);
    transition: 0.3s;

}
.cl{
     transform: rotate(-60deg);
    transition: 0.3s;
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
.in_setting{
    position: absolute;
    
    top:35px;
    right:35px;
    width: 300px;
    height: 500px;
    z-index: 1;
    border-radius: 10%;

}
.no1,.no2{
    color: white;
    font-size: 20px;
    padding: 20px;
    height:70px;
    border-bottom: solid rgb(250, 242, 242) 1px;
}
.change_num{
    position: absolute;
    right:25px;
    top:60px;
}
.change_num2{
    position: absolute;
    right:25px;
    top:285px;
}
.no2 div{
    position: absolute;
    right:25px;
    top:170px;
    background-color: white;
    height: 30px;
    width: 130px;
    text-align: center;
    color: black;
    line-height: 30px;
    border-radius: 5px;
    font-size: 13px;
}
.no2 div:active{
    background-color: rgb(147, 210, 252);
}
.input_name{
    background-color: white;
    height: 40vh;
    width: 50vw;
    position: absolute;
    top:30vh;
    right:5vw;
    border-radius: 2vh;
}
.finish{
    background-color:rgb(153, 230, 250) ;
    color:#909399;
    width: 20vw;
    height: 6vh;
    line-height: 6vh;
    text-align: center;
    border-radius: 1vh;
    border: solid 1px #DCDFE6;
    margin: 0 auto;
    margin-top: 5vh;
}
.change-enter-active,.change-leave-active{
    transition: all 1s;
}
.change-enter{
    opacity: 0;
    transform: translatey(20vh)
}
.change-leave-to{
    opacity: 0;
    transform: translatey(-20vh)
}
.pl{
    margin:0 auto;
    margin-top: 2vh;
    width: 35vw;
    height: 6vh;
    display: flex;
    color: white;
    font-size: 2.5vh;
    line-height: 6vh;
    text-align: center;
    border-radius: 8px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 12px rgba(0, 0, 0, .08)
}


.pl_name{
    background-color: #06adfa;
    width: 25vw;
    border-radius: 8px 0 0 8px;

}
.del{
    background-color: rgb(250, 54, 54);
    width: 10vw;
    border-radius: 0 8px 8px 0 ;
}
.pl{
  transition: all 0.5s;
}
.playerlst-enter{
  opacity: 0;
  transform: translatey(10vh);
}
.playerlst-leave-to{
    opacity: 0;
  transform: translatex(20vw);
}
.playerlst-leave-active {
  position: absolute;
}
.show_pl{
    margin-left: 14vw;
    box-shadow: none; 
}
.show_pl .pl_name{
    border-radius: 8px;

}
.show_pl .del{
    width: 0;
}
.nextRound{
    width: 50vw;
    height: 20vh;
    position: absolute;
    top:40vh;
    left:25vw;
    background-color: red;
    color:white;
    border-radius: 3vh;
    font-size: 10vh;
    line-height: 20vh;
    text-align: center;
}


</style>