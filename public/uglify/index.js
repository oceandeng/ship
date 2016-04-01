function Star(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.cycle=d,this.color=e,this.fontObj=f,this.time=0,this.draw=function(a){a.ctx.save(),a.ctx.translate(a.width/2,a.width/2),a.ctx.rotate(this.time*(360/this.cycle)*Math.PI/180),a.ctx.beginPath(),a.ctx.arc(this.x,this.y,this.radius,0,360,!1),a.ctx.closePath(),a.ctx.fillStyle=this.color,a.ctx.fill(),this.fontObj&&this.drawTxt(a,0,this.y),a.ctx.restore(),this.time+=1},this.drawTxt=function(a,b,c){a.ctx.font=this.fontObj.size+"px Microsoft Yahei",a.ctx.textAlign="center",a.ctx.textBaseline="middle",a.ctx.fillStyle=this.fontObj.color,a.ctx.fillText(this.fontObj.txt,b,c)}}function Sun(a,b,c,d,e,f){Star.call(this,a,b,c,d,e,f)}function Earth(a,b,c,d,e,f){Star.call(this,a,b,c,d,e,f)}function Mercury(a,b,c,d,e,f){Star.call(this,a,b,c,d,e,f)}function Venus(a,b,c,d,e,f){Star.call(this,a,b,c,d,e,f)}!function(){for(var a=0,b=["webkit","moz"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16.7-(d-a)),f=window.setTimeout(function(){b(d+e)},e);return a=d+e,f}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();var Galaxy=new function(){function a(a){a._this.ctx.save(),a._this.ctx.beginPath(),a._this.ctx.arc(a.x,a.y,a.radius,a.s,a.e,a.direction),a._this.ctx.closePath(),a._this.ctx.strokeStyle=a.color,a._this.ctx.stroke(),a._this.ctx.restore()}this.init=function(){var a=document.documentElement.clientWidth,b=document.documentElement.clientHeight,c=!!("ontouchstart"in window);a>b?this.width=parseInt(.8*b):this.width=parseInt(.9*a),this.canvas=document.createElement("canvas"),this.canvas.id="galaxy",this.canvas.height=this.width,this.canvas.width=this.width,this.canvas.style.position="absolute",this.canvas.style.top="50%",this.canvas.style.left="50%",this.canvas.style.marginLeft=-(this.width/2)+"px",this.canvas.style.marginTop=-(this.width/2)+"px",document.body.insertBefore(this.canvas,document.body.firstChild),document.addEventListener("touchmove",function(a){a.preventDefault},!1),document.addEventListener("touchstart",function(a){a.preventDefault},!1),this.ctx=document.getElementById("galaxy").getContext("2d"),this.sun=new Sun(0,0,parseInt(this.width/8-20),0,"#108dad",{size:c?12:30,txt:"博客",color:"#fff"}),this.mercury=new Mercury(0,-(2*this.width/8-20),c?15:parseInt(this.width/8-40),-500,"#5719f6"),this.venus=new Venus(0,-(3*this.width/8),c?25:parseInt(this.width/8-30),1e3,"#19c9f6",{size:c?10:20,txt:"打飞机",color:"#fff"}),this.earth=new Earth(0,-parseInt(this.width/8),10,800,"#999999"),this.setupInput(),this.loop()},this.drawTrack=function(){this.ctx.lineWidth=1,a({_this:this,x:this.width/2,y:this.width/2,radius:this.width/8,s:0,e:360,direction:!1,color:"#108dad"}),a({_this:this,x:this.width/2,y:this.width/2,radius:parseInt(2*(this.width/8)-20),s:0,e:360,direction:!1,color:"#19c9f6"}),a({_this:this,x:this.width/2,y:this.width/2,radius:parseInt(3*(this.width/8)),s:0,e:360,direction:!1,color:"#19c9f6"})},this.loop=function(){Galaxy.ctx.clearRect(0,0,Galaxy.width,Galaxy.width),Galaxy.drawTrack(),Galaxy.sun.draw(Galaxy),Galaxy.mercury.draw(Galaxy),Galaxy.venus.draw(Galaxy),Galaxy.earth.draw(Galaxy),requestAnimationFrame(Galaxy.loop)},this.setupInput=function(){var a=this,b={x:this.width/2,y:this.width/2};this.canvas.addEventListener("click",function(c){var d={x:c.offsetX,y:c.offsetY},e=a.sun.x+b.x-a.sun.radius,f=e+2*a.sun.radius,g=a.sun.y+b.y-a.sun.radius,h=g+2*a.sun.radius;d.x>e&&d.x<f&&d.y>g&&d.y<h&&(window.location.href="/blog/");var i={x:a.width/2+Math.sin(a.venus.time*(360/a.venus.cycle)*Math.PI/180)*Math.abs(a.venus.y),y:a.width/2-Math.cos(a.venus.time*(360/a.venus.cycle)*Math.PI/180)*Math.abs(a.venus.y)},j=i.x-a.venus.radius,k=j+2*a.venus.radius,l=i.y-a.venus.radius,m=l+2*a.venus.radius;d.x>j&&d.x<k&&d.y>l&&d.y<m&&(window.location.href="/game")},!1)}};window.addEventListener("load",function(){Galaxy.init()},!1);