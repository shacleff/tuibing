cc.Class({
    extends: cc.Component,

    properties: {   
        playerline:cc.Prefab,
        playerlist:cc.Node,
       
        fund:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        //this.node.on('touchend',function(){event.stopPropagation();},this);  
        this.node.on('touchstart',function(){event.stopPropagation();},this);  
        this.node.on('popout',this.PopOut,this);
        this.node.on('popin',this.PopIn,this);        
        this.node.on('updateplayer',this.UpdatePlayer,this);

        this.fund.string = require('Global').roominfo.fund;
    },

    PopOut:function(){
        var act = cc.moveBy(0.4,this.node.width-5,0);
        this.node.runAction(act);

    },
    PopIn:function(){
        var act = cc.moveBy(0.4,-this.node.width+5,0);
        this.node.runAction(act);
    },

    UpdatePlayer:function(event){
        
       // cc.log(event.detail);
        var data =event.detail.data;
        //clear
        if(this.playerlist.childrenCount >0){
            //var list =this.playerlist.children;
            this.playerlist.removeAllChildren();
        }
        //update
        for(let i=0;i<data.length;i++){       
           
            var line = cc.instantiate(this.playerline);
            line.parent = this.playerlist;
            line.setPosition(0,0);
            line.emit('setinfo',{nick:data[i].nick,score:data[i].score,head:data[i].headurl});           
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
