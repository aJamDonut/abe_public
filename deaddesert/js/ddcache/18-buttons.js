var tool=function(){game.ui.largeLabel=function(a,b,c){return labelKV=game.render.text(c,"smallish-bold"),labelKV.x=a,labelKV.y=b,labelKV},game.ui.labelValue=function(a,b,c,d){return labelKV=game.render.text(c+": "+d,"smallish"),labelKV.x=a,labelKV.y=b,labelKV},game.ui.closeButton=function(a,b,c,d){var e=64;sx=1344,sy=320;var f=new WorldSprite(a,b,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,e));return void 0!==c&&(f.closeFunction=c),f.width=64,f.height=e,f.isInteractive(),f.displayGroup=game.render.uiLayer,void 0===d?game.render.baseStage.addChild(f):d.addChild(f),game.attachCursorEvents(f),f.on("pointerdown",function(){game.ui.clicked=!0,void 0!==this.closeFunction&&this.closeFunction(),this.destroy()}),f},game.ui.greenButton=function(a,b,c,d,e,f){sw=100,sh=64,sx=1088,sy=384;var g=!1;return g=new WorldSprite(b,c,game.render.newTexture(game.render.tilesets.gui,sx,sy,sw,sh)),g.isInteractive(),void 0!==d&&(g.clickFunction=d,d=!1),g.width=sw,g.height=sh,game.attachCursorEvents(g),g.on("pointerdown",function(){void 0!==this.clickFunction&&this.clickFunction(e)}),g.on("pointerover",function(){this.filters=[new PIXI.filters.OutlineFilter(2,13421772)]}),g.on("pointerout",function(){this.filters=null}),g.displayGroup=game.render.uiLayer,null==f?game.render.baseStage.addChild(g):f.addChild(g),unlockText=game.render.text(a,"button-text-green"),unlockText.x=g.x+g.width/2+2.5,unlockText.y=g.y+unlockText.height/2+5,unlockText.anchor.set(.5),unlockText.displayGroup=game.render.uiLayer,null==f?game.render.baseStage.addChild(unlockText):f.addChild(unlockText),[g,unlockText]},game.ui.bigArrow=function(a,b,c){var d=Math.PI;return sx=23*game.tileSize,sy=4*game.tileSize,staticImage=new WorldSprite(a,b,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,64)),staticImage.x=a,staticImage.y=b,staticImage.width=64,staticImage.anchor.set(.5),staticImage.height=64,staticImage.rotation=c*(d/180),game.attachCursorEvents(staticImage),staticImage},game.ui.staticIcon=function(a,b){return sx=(a-1)*game.tileSize,sy=(b-1)*game.tileSize,staticImage=new WorldSprite(x,y,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,64)),staticImage.x=x,staticImage.y=y,staticImage.width=64,staticImage.height=64,staticImage},game.ui.uiIcon=function(a,b){return sx=(a-1)*game.tileSize,sy=(b-1)*game.tileSize,staticImage=new WorldSprite(x,y,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,64)),staticImage.x=x,staticImage.y=y,staticImage.width=64,staticImage.height=64,staticImage.interactive=!0,game.attachCursorEvents(staticImage),staticImage},game.ui.upArrow=function(){return sx=19*game.tileSize,sy=5*game.tileSize,arrow=new WorldSprite(-10,-10,game.render.newTexture(game.render.tilesets.gui,sx,sy,32,32)),arrow.width=32,arrow.height=32,arrow.interactive=!0,game.attachCursorEvents(arrow),arrow},game.ui.downArrow=function(){return sx=20*game.tileSize,sy=5*game.tileSize,arrow=new WorldSprite(-10,-10,game.render.newTexture(game.render.tilesets.gui,sx,sy,32,32)),arrow.width=32,arrow.height=32,arrow.interactive=!0,game.attachCursorEvents(arrow),arrow},game.ui.smallLeftArrow=function(){return sx=20*game.tileSize,sy=6*game.tileSize,arrow=new WorldSprite(-10,-10,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,64)),arrow.interactive=!0,game.attachCursorEvents(arrow),arrow},game.ui.smallRightArrow=function(){return sx=21*game.tileSize,sy=6*game.tileSize,arrow=new WorldSprite(-10,-10,game.render.newTexture(game.render.tilesets.gui,sx,sy,64,64)),arrow.interactive=!0,game.attachCursorEvents(arrow),arrow}};bootStrap.push(tool);