(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,touch=matchMedia('(hover:none)').matches;
var $=function(i){return document.getElementById(i)};
var W=innerWidth,H=innerHeight,mx=W/2,my=H/2,moved=false,started=false,startT=0;
/* cursor: collaborator-style arrow with a live label */
var fc=$('fc'),tg=$('tg'),tx=0,ty=0;
document.querySelectorAll('.pj').forEach(function(r){r.dataset.c='View'});
document.querySelectorAll('.mail,.btn.p').forEach(function(r){r.dataset.c='Say hi'});
document.querySelectorAll('.btn.g,nav a').forEach(function(r){r.dataset.c='Go'});
document.querySelectorAll('.badge').forEach(function(r){r.dataset.c='Hire me'});$('pw').dataset.c='Swap';document.querySelectorAll('.lk a').forEach(function(r){r.dataset.c='Visit'});
addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!moved){moved=true;fc.style.opacity=1;tg.style.opacity=1;tx=mx;ty=my}fc.style.transform='translate('+mx+'px,'+my+'px)'});
addEventListener('pointerover',function(e){var el=e.target.closest&&e.target.closest('[data-c]');tg.textContent=el?el.dataset.c:'you';tg.classList.toggle('hot',!!el)});
addEventListener('pointerdown',function(e){if(rm)return;var d=document.createElement('div');d.className='rip';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';document.body.appendChild(d);setTimeout(function(){d.remove()},750);
var r=$('top').getBoundingClientRect();if(e.clientY<r.bottom)rips.push({x:e.clientX-r.left,y:e.clientY-r.top,r:0})});
/* marquee */
var sk=['React.js','Node.js','Python','Flask','MongoDB','Firebase','LangChain','LLaMA-3','RAG','JavaScript','Java','OpenCV','Scikit-learn','REST APIs','Git'],h='';
for(var k=0;k<2;k++)sk.forEach(function(s){h+='<span>'+s+'</span>'});$('mq').innerHTML=h;
/* dot grid that bends around the pointer */
var cvs=$('grid'),gx=cvs.getContext('2d'),hero=$('top'),GW=0,GH=0,dots=[],rips=[],gt=0,dpr=Math.min(devicePixelRatio||1,2),SP=30;
function sizeGrid(){var r=hero.getBoundingClientRect();GW=r.width;GH=r.height;cvs.width=GW*dpr;cvs.height=GH*dpr;gx.setTransform(dpr,0,0,dpr,0,0);dots=[];for(var y=SP/2;y<GH;y+=SP)for(var x=SP/2;x<GW;x+=SP)dots.push([x,y])}
function grid(){var r=hero.getBoundingClientRect();if(r.bottom<0)return;gt+=.012;var px,py;
if(moved&&!touch){px=mx-r.left;py=my-r.top}else{px=GW*(.5+Math.cos(gt*.8)*.38);py=GH*(.5+Math.sin(gt*1.2)*.3)}
gx.clearRect(0,0,GW,GH);
for(var i=rips.length-1;i>=0;i--){rips[i].r+=7;if(rips[i].r>700)rips.splice(i,1)}
for(var i=0;i<dots.length;i++){var d=dots[i],dx=d[0]-px,dy=d[1]-py,dist=Math.sqrt(dx*dx+dy*dy)||1,f=Math.max(0,1-dist/190),ox=0,oy=0;
if(f>0){ox=dx/dist*f*f*26;oy=dy/dist*f*f*26}
for(var k=0;k<rips.length;k++){var rp=rips[k],rx=d[0]-rp.x,ry=d[1]-rp.y,rd=Math.sqrt(rx*rx+ry*ry)||1,w=Math.abs(rd-rp.r);
if(w<60){var q=(1-w/60)*(1-rp.r/700)*22;ox+=rx/rd*q;oy+=ry/rd*q;f=Math.max(f,(1-w/60)*.8)}}
if(f>.02){gx.fillStyle=i%5==0?'rgba(91,60,255,'+(.25+f*.75)+')':'rgba('+Math.round(20+235*f)+','+Math.round(22+68*f)+',59,'+(.2+f*.8)+')'}else gx.fillStyle='rgba(20,22,59,.15)';
gx.beginPath();gx.arc(d[0]+ox,d[1]+oy,1.3+f*3.6,0,6.283);gx.fill()}}
/* name letters that push away from the pointer */
var nm=$('nm'),chs=[],code=$('code'),ht=0;
function split(el){Array.prototype.slice.call(el.childNodes).forEach(function(n){if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split('').forEach(function(c){var s=document.createElement('span');s.className='ch';s.textContent=c===' '?'\u00a0':c;f.appendChild(s);chs.push({el:s,x:0,y:0,r:0,sc:1,col:0,ent:rm?0:170+Math.random()*50,cx:0,cy:0})});n.parentNode.replaceChild(f,n)}else if(n.nodeType===1)split(n)})}
split(nm);
function measure(){sizeGrid();chs.forEach(function(c){c.el.style.transform='none';var b=c.el.getBoundingClientRect();c.cx=b.left+b.width/2+scrollX;c.cy=b.top+b.height/2+scrollY})}
measure();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
addEventListener('resize',function(){W=innerWidth;H=innerHeight;measure()});
function heroFx(){ht+=.02;var px=mx+scrollX,py=my+SY,now=performance.now();
chs.forEach(function(c,i){var tx2=0,ty2=Math.sin(ht*1.4+i*.55)*5,tr=0,ts=1,f=0;
if(moved&&!touch){var dx=c.cx-px,dy=c.cy-py,d=Math.sqrt(dx*dx+dy*dy)||1;f=Math.max(0,1-d/280);if(f>0){tx2=dx/d*f*f*70;ty2+=dy/d*f*f*70;tr=dx/280*14*f;ts=1+f*.16}}
c.x+=(tx2-c.x)*.14;c.y+=(ty2-c.y)*.14;c.r+=(tr-c.r)*.14;c.sc+=(ts-c.sc)*.14;c.col+=(f-c.col)*.15;
if(started&&now-startT>i*55)c.ent*=.9;
c.el.style.transform='translate('+c.x+'px,'+(c.y+c.ent)+'px) rotate('+c.r+'deg) scale('+c.sc+')';
c.el.style.opacity=Math.max(0,Math.min(1,1-c.ent/90));
c.el.style.color='rgb('+Math.round(20+235*c.col)+','+Math.round(22+68*c.col)+','+Math.round(59+c.col)+')'});
var a=(mx-W/2)/W,b=(my-H/2)/H,ss=Math.min(SY/H,1.3);code.style.opacity=Math.max(0,1-ss*1.1).toFixed(3);
var transY=(W<=900)?Math.sin(ht)*4:(Math.sin(ht)*6-ss*170);
var sc=(W<=900)?1:(1-ss*.25);
var ro=(W<=900)?0:(ss*9);
code.style.transform='perspective(900px) rotateY('+(-a*16)+'deg) rotateX('+(b*12)+'deg) translateY('+transY+'px) scale('+sc+') rotate('+ro+'deg)'}
/* project preview */
var pk=$('peek'),px0=0,py0=0,pv=0,pa=false;
document.querySelectorAll('.pj').forEach(function(r){
r.addEventListener('pointerenter',function(){pk.style.background=r.dataset.bg;pk.innerHTML='<b>'+r.dataset.t+'</b><small>'+r.dataset.k+'</small>';pk.style.opacity=1;pa=true});
r.addEventListener('pointerleave',function(){pk.style.opacity=0;pa=false});
r.addEventListener('click',function(){r.classList.toggle('open')});r.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(e){e.stopPropagation()})});
r.addEventListener('keydown',function(e){if(e.key==='Enter')r.classList.toggle('open')})});
var chars=[],sfx=false,ifx=false,SY=0,smooth=false,mags=document.querySelectorAll('.mag'),bar=$('bar'),mq=document.querySelector('.mq'),ls=scrollY,sv=0;
function magnet(){mags.forEach(function(el){var b=el.getBoundingClientRect(),dx=mx-(b.left+b.width/2),dy=my-(b.top+b.height/2),d=Math.sqrt(dx*dx+dy*dy);
var k=d<130&&moved?(1-d/130)*.35:0;el.style.transform='translate('+dx*k+'px,'+dy*k+'px)'})}
function loop(){tx+=(mx-tx)*.2;ty+=(my-ty)*.2;tg.style.transform='translate('+(tx+18)+'px,'+(ty+24)+'px)';
if(!rm){grid();heroFx();magnet()}chars.forEach(function(c){c.upd(rm?0:performance.now()/1000)});if(smooth){SY+=(scrollY-SY)*.085;if(Math.abs(scrollY-SY)<.05)SY=scrollY;$('sm').style.transform='translate3d(0,'+(-SY).toFixed(2)+'px,0)'}else SY=scrollY;if(sfx)scrollFx();if(ifx){introFx();realFx(rm?0:performance.now()/1000);ringFx();workFx()}
var dx=mx-px0;px0+=dx*.12;py0+=(my-py0)*.12;pv+=((dx*.4)-pv)*.15;
pk.style.transform='translate('+(px0+30)+'px,'+(py0-100)+'px) rotate('+Math.max(-12,Math.min(12,pv))+'deg) scale('+(pa?1:.8)+')';
sv+=((SY-ls)-sv)*.15;ls=SY;mq.style.transform='rotate(-2.2deg) skewX('+Math.max(-14,Math.min(14,-sv*.6))+'deg)';
bar.style.transform='scaleX('+(scrollY/Math.max(1,document.body.scrollHeight-H))+')';
requestAnimationFrame(loop)}
loop();
/* scramble, reveal, count */
var ch='abcdefghijklmnopqrstuvwxyz';
function scr(el){var s=el.textContent,f=0;if(rm)return;var iv=setInterval(function(){f++;var o='';for(var i=0;i<s.length;i++)o+=s[i]===' '||i<f/2?s[i]:ch[Math.floor(Math.random()*26)];el.textContent=o;if(f>=s.length*2+2){el.textContent=s;clearInterval(iv)}},30)}
function count(el){var n=parseFloat(el.dataset.n),d=n%1?2:0,s=performance.now();(function u(now){var p=Math.min((now-s)/1400,1),e=1-Math.pow(1-p,3);el.textContent=(n*e).toFixed(d);if(p<1)requestAnimationFrame(u)})(s)}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');
if(el.hasAttribute('data-s'))scr(el);el.querySelectorAll('[data-n]').forEach(count);io.unobserve(el)})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
var th={top:'',about:'th-paper',skills:'th-night',work:'th-night',exp:'th-paper',edu:'',contact:'th-sun'};
var tio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){document.body.classList.remove('th-paper','th-night','th-sun');var c=th[e.target.id];if(c)document.body.classList.add(c);setNav(e.target.id)}})},{rootMargin:'-45% 0px -50% 0px'});
Object.keys(th).forEach(function(id){tio.observe($(id))});
var sy=$('sayt'),sg=['Namaste','ನಮಸ್ಕಾರ','नमस्ते','నమస్కారం','Welcome'],si=0,rl=$('rl'),rr=['full-stack developer','React builder','AI tinkerer','problem solver'],ri=0;
function swap(el,t,c){el.textContent=t;el.classList.remove(c);void el.offsetWidth;el.classList.add(c)}

setInterval(function(){ri=(ri+1)%rr.length;swap(rl,rr[ri],'sw4')},2600);
var SUITP='M176 156C156 160 128 168 124 190L130 236L150 338C175 346 225 346 250 338L270 236L276 190C272 168 244 160 224 156C216 168 184 168 176 156Z';
var GL='#ff6a4a',GD='#d9452a';
var HAND='<path d="M-10 -1H10" stroke="#ffcf4a" stroke-width="5" stroke-linecap="round"/><g class="v0"><path d="M-9 0C-11 10-11 18-9 24L9 24C11 18 11 10 9 0Z" fill="'+GL+'"/><g stroke="'+GL+'" stroke-width="5.2" stroke-linecap="round" fill="none"><path d="M-6.5 22L-8 42M-2 23L-2.5 46M2.5 23L3.5 44M7 22L9.5 38"/><path d="M9 8L17 22L19 31" stroke-width="6"/></g><path d="M-6 14Q0 18 7 12" stroke="'+GD+'" stroke-width="1" fill="none" opacity=".7"/></g>'
+'<g class="v1" opacity="0"><path d="M-9 0C-11 8-10 14-8 18L8 18C10 14 11 8 9 0Z" fill="'+GL+'"/><path d="M-5 16L-6 44" stroke="'+GL+'" stroke-width="5.2" stroke-linecap="round"/><ellipse cx="2" cy="21" rx="8" ry="6" fill="'+GL+'"/><path d="M-2 19Q2 24 7 19" stroke="'+GD+'" stroke-width="1" fill="none" opacity=".7"/><path d="M9 8L14 18" stroke="'+GL+'" stroke-width="6" stroke-linecap="round"/></g>'
+'<g class="v2" opacity="0"><path d="M-9 0C-11 10-11 18-9 24L9 24C11 18 11 10 9 0Z" fill="'+GL+'"/><g stroke="'+GL+'" stroke-width="5.2" stroke-linecap="round" fill="none"><path d="M-6 22Q-8 32-5 38M-2 23Q-3 34 0 42M3 23Q3 34 5 40M7 22Q9 31 8 36"/><path d="M9 8L15 20L14 28" stroke-width="6"/></g></g>';
var BOOT='<path d="M152 556L190 556L192 594C196 606 202 614 200 624C198 631 150 631 140 624C136 618 146 606 150 592Z" fill="url(#bt__ID__)"/><path d="M151 556L190 556L191 570L150 570Z" fill="#ff9a7a"/><path d="M140 626C150 634 198 634 200 626" stroke="#8a2a14" stroke-width="3" fill="none"/><path d="M171 580L164 594H170L165 608L177 590H171Z" fill="#ffd23f"/>';
function eye(x){return '<ellipse cx="'+x+'" cy="86" rx="7.8" ry="5.4" fill="#f6efe6"/><g class="pl"><circle cx="'+x+'" cy="86" r="4.3" fill="#5a3a24"/><circle cx="'+x+'" cy="86" r="2.2" fill="#120c0a"/><circle cx="'+(x+1.4)+'" cy="84.6" r="1.1" fill="#fff"/></g>'}
var SVGT='<svg viewBox="0 0 400 640" xmlns="http://www.w3.org/2000/svg"><defs>'
+'<radialGradient id="sk__ID__" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#d99a80"/><stop offset=".6" stop-color="#c4856a"/><stop offset="1" stop-color="#9c6451"/></radialGradient>'
+'<linearGradient id="su__ID__" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a56ea"/><stop offset=".6" stop-color="#3a3ec2"/><stop offset="1" stop-color="#262a86"/></linearGradient>'
+'<linearGradient id="jn__ID__" x1="0" x2="1"><stop offset="0" stop-color="#4f52e0"/><stop offset=".6" stop-color="#3a3db8"/><stop offset="1" stop-color="#282b88"/></linearGradient>'
+'<linearGradient id="cg__ID__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a3c"/><stop offset=".55" stop-color="#d93a7a"/><stop offset="1" stop-color="#7a2cff"/></linearGradient>'
+'<linearGradient id="bt__ID__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a59"/><stop offset="1" stop-color="#d9452a"/></linearGradient>'
+'<linearGradient id="bg__ID__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#322828"/><stop offset="1" stop-color="#181213"/></linearGradient>'
+'<radialGradient id="gl__ID__"><stop offset="0" stop-color="#ff5a3c" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a3c" stop-opacity="0"/></radialGradient></defs>'
+'<ellipse class="fg" cx="200" cy="630" rx="96" ry="11" fill="rgba(20,22,59,.22)"/><ellipse class="gl" cx="200" cy="628" rx="60" ry="9" fill="url(#gl__ID__)"/>'
+'<g transform="translate(60 120)"><path class="tw" d="M0-9L2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z" fill="#ffb84d"/></g><g transform="translate(345 190)"><path class="tw d2" d="M0-7L2-2 7 0 2 2 0 7-2 2-7 0-2-2Z" fill="#ff7a59"/></g><g transform="translate(55 330)"><path class="tw d3" d="M0-7L2-2 7 0 2 2 0 7-2 2-7 0-2-2Z" fill="#5b3cff"/></g>'
+'<g class="au" opacity="0"><circle class="ac" cx="200" cy="252" r="30"/><circle class="ac" cx="200" cy="252" r="30"/></g>'
+'<g class="all"><path class="cape" fill="url(#cg__ID__)" d="M160 164C148 230 112 330 104 520Q150 548 200 524T296 520C290 330 252 230 240 164Z"/>'
+'<g class="lg"><path d="M146 322C140 420 146 520 154 598L188 598C192 520 196 430 200 344L200 322Z" fill="url(#jn__ID__)"/><path d="M254 322C260 420 254 520 246 598L212 598C208 520 204 430 200 344L200 322Z" fill="url(#jn__ID__)"/><path d="M146 330C141 420 147 520 154 560M254 330C259 420 253 520 246 560" stroke="#ff5a3c" stroke-width="3" fill="none"/><path d="M200 344C199 430 196 520 190 596M200 344C201 430 204 520 210 596" stroke="#1f2262" stroke-width="1.4" fill="none" opacity=".6"/>'+BOOT+'<g transform="translate(400 0) scale(-1 1)">'+BOOT+'</g></g>'
+'<g class="ub"><path d="'+SUITP+'" fill="url(#su__ID__)"/><path d="M176 160C170 200 168 260 170 330M224 160C230 200 232 260 230 330" stroke="rgba(255,255,255,.16)" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M176 156L200 196L224 156" fill="none" stroke="#ff5a3c" stroke-width="3"/>'
+'<path d="M200 192L223 200V222C223 237 212 247 200 253C188 247 177 237 177 222V200Z" fill="#ffd23f" stroke="#e0a82a" stroke-width="2"/><path d="M192 213L186 221L192 229M208 213L214 221L208 229M203 210L197 232" stroke="#262a86" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
+'<rect x="150" y="322" width="100" height="13" rx="5" fill="#ffcf4a"/><rect x="189" y="320" width="22" height="17" rx="3" fill="#fff3b0" stroke="#e0a82a" stroke-width="1.5"/>'
+'<path d="M182 130C182 152 180 158 178 162C192 172 208 172 222 162C220 158 218 152 218 130Z" fill="url(#sk__ID__)"/><path d="M182 148C192 156 208 156 218 148V158C208 164 192 164 182 158Z" fill="rgba(70,35,18,.25)"/>'
+'<g class="hh"><g transform="translate(32 23.4) scale(.84)"><ellipse cx="158" cy="90" rx="7" ry="13" fill="#b0725c"/><ellipse cx="242" cy="90" rx="7" ry="13" fill="#a86c57"/><path d="M160 82C160 54 178 42 200 42C222 42 240 54 240 82C240 108 232 128 216 140C208 146 192 146 184 140C168 128 160 108 160 82Z" fill="url(#sk__ID__)"/><path d="M240 82C240 108 232 128 216 140C228 120 234 98 232 70Z" fill="rgba(70,35,18,.22)"/>'
+'<path d="M155 84C148 44 174 22 207 24C240 24 254 50 245 84C241 64 231 54 208 52C186 52 166 62 155 84Z" fill="#1c1618"/><path d="M158 62C170 26 216 12 246 40C226 32 190 32 164 72Z" fill="#3a3235"/><path d="M166 50C186 24 232 20 250 48C234 36 194 36 170 60Z" fill="#2a2326"/>'
+'<path d="M160 96C160 140 184 150 200 150C216 150 240 140 240 96C236 120 226 130 216 132C208 128 192 128 184 132C174 130 164 120 160 96Z" fill="url(#bg__ID__)"/><path d="M176 119C186 110 196 116 200 117C204 116 214 110 224 119C216 125 208 123 200 125C192 123 184 125 176 119Z" fill="#1c1618"/>'
+'<path d="M200 88C196 100 192 108 196 112C199 114 201 114 204 112C208 108 204 100 200 88Z" fill="rgba(100,55,30,.28)"/><ellipse cx="194.5" cy="111" rx="2.4" ry="1.5" fill="rgba(55,28,14,.55)"/><ellipse cx="205.5" cy="111" rx="2.4" ry="1.5" fill="rgba(55,28,14,.55)"/>'
+'<g class="sm"><path d="M186 126Q200 135 214 126Q200 131 186 126Z" fill="#fff"/><path d="M185 125Q200 136 215 125" stroke="#7a3a2c" stroke-width="2" fill="none" stroke-linecap="round"/></g><g class="mw" opacity="0"><ellipse class="mo" cx="200" cy="127" rx="11" ry="0" fill="#4d1519"/><path class="mt" d="M190 122Q200 120 210 122L210 125Q200 124 190 125Z" fill="#fff" opacity="0"/><path class="ml" d="M187 131Q200 136 213 131" stroke="#8a4636" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>'
+'<path d="M166 80C174 73 192 75 200 84C208 75 226 73 234 80C238 92 230 102 218 100C210 99 204 94 200 93C196 94 190 99 182 100C170 102 162 92 166 80Z" fill="#1d2070" stroke="#5a60e8" stroke-width="1"/><path d="M166 82L155 90M234 82L245 90" stroke="#1d2070" stroke-width="3" stroke-linecap="round"/>'
+'<g class="eo">'+eye(182)+eye(218)+'</g><g class="ec" fill="none" stroke="#ffd9cc" stroke-width="2.4" stroke-linecap="round" opacity="0"><path d="M174 87Q182 93 190 87"/><path d="M210 87Q218 93 226 87"/></g>'
+'<g class="br" fill="none" stroke="#1c1618" stroke-width="3.6" stroke-linecap="round"><path d="M170 72Q182 65 194 70"/><path d="M206 70Q218 65 230 72"/></g></g></g>'
+[0,1].map(function(i){return '<g class="a'+(i+1)+'"><path class="ak" fill="none" stroke="#3b3fc4" stroke-width="19" stroke-linecap="round" stroke-linejoin="round"/><path class="ak2" fill="none" stroke="#3b3fc4" stroke-width="15" stroke-linecap="round"/><path class="ao" fill="none" stroke="#b53a1f" stroke-width="33" stroke-linecap="round"/><path class="av" fill="none" stroke="#ff5a3c" stroke-width="29" stroke-linecap="round"/><g class="hd">'+HAND+'</g></g>'}).join('')
+'<g class="ns" opacity="0" transform="translate(200 252)"><path d="M0-42C15-30 17 6 0 24C-17 6-15-30 0-42Z" fill="#ff6a4a"/><path d="M0-40C-13-26-15 4-2 24L0 24Z" fill="#e2512f"/><path d="M-6-28V-6M6-28V-6M0-34V-8" stroke="#d9452a" stroke-width="1" opacity=".8"/><path d="M-5 6C-9 16-7 24 0 27" stroke="#ff6a4a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M5 6C9 16 7 24 0 27" stroke="#ff8466" stroke-width="6" fill="none" stroke-linecap="round"/></g></g></g></svg>';
function ik(S,T,l1,l2,side){var dx=T[0]-S[0],dy=T[1]-S[1],L=Math.sqrt(dx*dx+dy*dy)||1,d=Math.min(L,l1+l2-1),ux=dx/L,uy=dy/L,a=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-a*a)),px=S[0]+ux*a,py=S[1]+uy*a,e1=[px-uy*h,py+ux*h],e2=[px+uy*h,py-ux*h];
return [(side<0?e1[0]<e2[0]:e1[0]>e2[0])?e1:e2,[S[0]+ux*d,S[1]+uy*d]]}
var VAR={wave:0,heart:0,explain:0,count:1,idea:1,present:0,rest:2,namaste:2};
function mkChar(box){
var id='k'+Math.random().toString(36).slice(2,7);box.innerHTML=SVGT.replace(/__ID__/g,id);
var q=function(c){return box.querySelector('.'+c)},qa=function(c){return box.querySelectorAll('.'+c)};
var A=[{g:q('a1'),S:[140,186],o:-1,c:[128,322]},{g:q('a2'),S:[260,186],o:1,c:[272,322]}],hh=q('hh'),cape=q('cape'),all=q('all'),fg=q('fg'),gl=q('gl'),ub=q('ub'),mo=q('mo'),mt=q('mt'),ml=q('ml'),mw=q('mw'),sm=q('sm'),eo=q('eo'),ec=q('ec'),br=q('br'),au=q('au'),ns=q('ns'),pls=qa('pl'),
o={pose:'rest',speaking:false},eoW=1,lfW=0,auW=0,sgW=0,mv=0,blink=0,nb=2,bow=0,bru=0;
function targets(t){var s=o.speaking?1:.4,p=o.pose;
if(p==='namaste')return[[194,268],[206,268]];
if(p==='wave')return[[128,322],[318+Math.sin(t*9)*14,128+Math.sin(t*4.5)*6]];
if(p==='heart')return[[140,306],[228,238+Math.sin(t*2)*2]];
if(p==='explain')return[[112+Math.sin(t*3)*10*s,272+Math.cos(t*2.3)*9*s],[288+Math.sin(t*3+1.3)*10*s,272+Math.cos(t*2.7)*9*s]];
if(p==='count')return[[128,322],[292,252+Math.abs(Math.sin(t*4))*14]];
if(p==='idea')return[[140,306],[300,152+Math.sin(t*3)*4]];
if(p==='present')return[[72,252+Math.sin(t*2)*6],[328,252+Math.sin(t*2+1)*6]];
return[[168,312],[232,312]]}
o.upd=function(t){var k=t===0?1:.12,T=targets(t),closed=o.pose==='namaste',sp=o.speaking?1:0;
A.forEach(function(a,i){a.c[0]+=(T[i][0]-a.c[0])*k;a.c[1]+=(T[i][1]-a.c[1])*k;
var r=ik(a.S,a.c,78,72,a.o),E=r[0],H=r[1],g=a.g,f=.4,sx=a.S[0]+(E[0]-a.S[0])*f,sy=a.S[1]+(E[1]-a.S[1])*f,d='M'+a.S+' L'+sx+' '+sy,hd=g.querySelector('.hd'),
rot=Math.atan2(H[1]-E[1],H[0]-E[0])*180/Math.PI-90+(o.pose==='wave'&&i===1?Math.sin(t*9)*12:0),v=i===1?VAR[o.pose]:(o.pose==='explain'||o.pose==='present'?0:2);
g.querySelector('.ak').setAttribute('d','M'+a.S+' L'+E);g.querySelector('.ak2').setAttribute('d','M'+E+' L'+H);g.querySelector('.ao').setAttribute('d',d);g.querySelector('.av').setAttribute('d',d);
hd.setAttribute('transform','translate('+H[0].toFixed(1)+' '+H[1].toFixed(1)+') rotate('+rot.toFixed(1)+') scale('+(i===1?-1:1)+' 1)');hd.setAttribute('opacity',1-lfW);
for(var j=0;j<3;j++)hd.querySelector('.v'+j).setAttribute('opacity',j===v?1:0)});
eoW+=((closed?0:1)-eoW)*k;lfW+=((closed?1:0)-lfW)*k;auW+=((closed?1:0)-auW)*k;
eo.setAttribute('opacity',eoW);ec.setAttribute('opacity',1-eoW);au.setAttribute('opacity',auW);ns.setAttribute('opacity',lfW);
var fl=14+Math.sin(t*1.8)*5+sp*Math.abs(Math.sin(t*3))*1.5;all.setAttribute('transform','translate(0 '+(-fl).toFixed(2)+')');fg.setAttribute('rx',(96-fl*1.4).toFixed(1));fg.setAttribute('opacity',(.95-fl*.015).toFixed(2));gl.setAttribute('opacity',(.55+Math.sin(t*3)*.2).toFixed(2));gl.setAttribute('rx',(60+Math.sin(t*3)*8).toFixed(1));var w1=Math.sin(t*2.2),w2=Math.sin(t*2.2+1.7),w3=Math.sin(t*3.1+.6);cape.setAttribute('d','M160 164C148 230 '+(112+w1*14)+' 330 '+(104+w1*22+w3*6)+' 520Q'+(150+w2*10)+' '+(548+w2*14)+' 200 524T'+(296+w2*22)+' 520C'+(290+w2*10)+' 330 '+(252-w1*14)+' 230 240 164Z');
if(t>nb){blink=t+.14;nb=t+2.5+Math.random()*3}
eo.setAttribute('transform','translate(0 86) scale(1 '+(t<blink?.1:1)+') translate(0 -86)');
var tv=sp?(Math.abs(Math.sin(t*13))*.7+.3)*(.55+.45*Math.sin(t*4.7))*7.5:0;mv+=(tv-mv)*.45;
mo.setAttribute('ry',Math.max(0,mv).toFixed(2));mw.setAttribute('opacity',mv>1.1?1:0);sm.setAttribute('opacity',mv>1.1?0:1);mt.setAttribute('opacity',mv>2.4?1:0);ml.setAttribute('transform','translate(0 '+(mv*.9).toFixed(2)+')');
bow+=((closed?Math.max(0,Math.sin(t*1.1-.5)):0)-bow)*.15;
ub.setAttribute('transform','translate(0 '+(Math.sin(t*1.6)*1.4+sp*Math.abs(Math.sin(t*3))*1.2+bow*5).toFixed(2)+') rotate('+(-bow*2.2).toFixed(2)+' 200 330)');
hh.setAttribute('transform','rotate('+(Math.sin(t*1.3)*1.4+sp*Math.sin(t*5.5)*1.2+bow*7+(o.pose==='idea'?-3:o.pose==='heart'?3:0)).toFixed(2)+' 200 140)');
bru+=(((o.pose==='idea'||o.pose==='wave')?-5:0)+sp*Math.sin(t*3)*2-bru)*.15;br.setAttribute('transform','translate(0 '+bru.toFixed(2)+')');
var b=box.getBoundingClientRect(),dx=mx-(b.left+b.width/2),dy=my-(b.top+b.height*.2),dd=Math.sqrt(dx*dx+dy*dy)||1,m=Math.min(2.2,dd/80);
pls.forEach(function(p){p.setAttribute('transform','translate('+(dx/dd*m).toFixed(2)+' '+(dy/dd*m).toFixed(2)+')')})};
chars.push(o);return o}
var hc=mkChar($('wf'));
var scn=[['namaste','Namaste, I’m Basavaraj, a full-stack developer who turns ideas into fast, thoughtful web apps and AI features.'],
['explain','I’m finishing my MCA at REVA University with a 9.05 CGPA, and I’ve already shipped real products with React, Node.js and LangChain.'],
['present','Explore my work below, and if you’d like to build something great together, I’d love to hear from you.','namaste']];
var syn=window.speechSynthesis,voiceOn=false,vo=null;
function pick(){if(!syn)return;var v=syn.getVoices(),f=function(r){return v.filter(function(x){return r.test(x.lang)})[0]};vo=f(/en[-_]IN/i)||f(/en[-_]GB/i)||f(/^en/i)||null}
if(syn){pick();syn.onvoiceschanged=pick}
var btx=$('bt'),bdd=$('bd'),bpp=$('bp'),bnn=$('bn'),bub=$('bub'),bv=$('bv'),idx=-1,full='',shown=0,state='type',waitT=0,dbs=[],lt=performance.now();
function speak(txt,onEnd){syn.cancel();var u=new SpeechSynthesisUtterance(txt),st=false,dn=false;function fin(){if(dn)return;dn=true;onEnd(st)}
if(vo){u.voice=vo;u.lang=vo.lang}else u.lang='en-IN';u.rate=.95;u.pitch=1;
u.onstart=function(){st=true};u.onend=fin;u.onerror=fin;
u.onboundary=function(e){if(e.charIndex>shown)shown=Math.min(full.length,e.charIndex+(e.charLength||4))};
syn.speak(u);setTimeout(function(){if(!st&&!dn){syn.cancel();fin()}},1800)}
function setVoice(on){voiceOn=on;bv.setAttribute('aria-pressed',on?'true':'false');if(!on&&syn)syn.cancel()}
if(!syn)bv.style.display='none';
bv.addEventListener('click',function(){setVoice(!voiceOn);if(idx>=0)go(idx)});
addEventListener('pagehide',function(){if(syn)syn.cancel()});
scn.forEach(function(s,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Step '+(i+1));b.addEventListener('click',function(){go(i)});bdd.appendChild(b);dbs.push(b)});
function go(i){idx=i;full=scn[i][1];hc.pose=scn[i][0];shown=rm?full.length:0;waitT=0;btx.textContent=rm?full:'';bub.setAttribute('aria-label',full);
dbs.forEach(function(b,j){b.classList.toggle('on',j===i)});bnn.textContent=i===scn.length-1?'Replay':'Next';
if(voiceOn&&!rm&&syn){state='speak';speak(full,function(ok){if(idx!==i)return;if(ok){state='wait';shown=full.length;btx.textContent=full;waitT=0}else{state='type';shown=0}})}else state='type'}
bnn.addEventListener('click',function(){go((idx+1)%scn.length)});
function story(now){var dt=(now-lt)/1000;lt=now;code.classList.toggle('sp',hc.speaking);
if(started&&idx<0&&now-startT>1700)go(0);
if(idx>=0){var tot=full.length,hold=voiceOn?1.1:2.2+tot*.012;
if(state==='type'){shown+=dt*34;if(shown>=tot){shown=tot;state='wait';waitT=0}btx.textContent=full.slice(0,Math.floor(shown));hc.speaking=state==='type'}
else if(state==='speak'){shown=Math.min(tot,shown+dt*12);btx.textContent=full.slice(0,Math.floor(shown));hc.speaking=true}
else{hc.speaking=false;waitT+=dt;if(scn[idx][2])hc.pose=scn[idx][2];if(waitT>hold&&!rm&&idx<scn.length-1)go(idx+1)}
bpp.style.setProperty('--p',state==='wait'?.7+Math.min(waitT/hold,1)*.3:shown/tot*.7)}
requestAnimationFrame(story)}
requestAnimationFrame(story);
var gate=$('gate'),gv=$('gv');if(!syn)gv.style.display='none';
function showGate(){gate.classList.add('show');var b=gate.querySelector('button');if(b)b.focus({preventScroll:true})}
gv.addEventListener('click',function(){setVoice(true);open()});
$('gq').addEventListener('click',function(){setVoice(false);open()});
var nlk={about:'#about',work:'#work',exp:'#exp',edu:'#exp',contact:'#contact'};
function setNav(id){var h=nlk[id],a=h&&document.querySelector('.nl a[href="'+h+'"]'),n=$('nb');if(a){n.style.opacity=1;n.style.width=a.offsetWidth+'px';n.style.transform='translateX('+a.offsetLeft+'px)'}else n.style.opacity=0}
var navEl=document.querySelector('.nv');function navVis(){navEl.classList.toggle('off',scrollY<H*.7);$('nvi').classList.toggle('sm',scrollY>40)}addEventListener('scroll',navVis,{passive:true});navVis();
var rvs=document.querySelectorAll('.rv'),bgws=document.querySelectorAll('.bgw'),stg=document.querySelector('.stage'),rail=$('rail'),rh=$('rh'),rfl=$('rf'),rsec=['top','about','work','exp','edu','contact'].map($),rdots=[];
rsec.forEach(function(s){var d=document.createElement('i');d.className='rd';rail.appendChild(d);rdots.push(d)});
function scrollFx(){var maxS=Math.max(1,document.body.scrollHeight-H),p=Math.min(1,SY/maxS),rH=rail.clientHeight;
rh.style.transform='translate(-50%,'+(p*rH)+'px)';rfl.style.transform='scaleY('+p+')';rh.style.opacity=Math.min(1,Math.max(0,(SY-H*.35)/(H*.35)));
rsec.forEach(function(s,i){var top=s.getBoundingClientRect().top+SY;rdots[i].style.top=Math.min(100,top/maxS*100)+'%';rdots[i].classList.toggle('on',SY+H*.45>=top)});
if(rm)return;
var ss=Math.min(SY/H,1.3);stg.style.transform=(W<=768)?('translateY('+(-ss*16)+'px)'):('translateX('+(-ss*90)+'px)');stg.style.opacity=Math.max(0,1-ss*.9);
rvs.forEach(function(el){var r=el.getBoundingClientRect(),q=Math.min(1,Math.max(0,(H*.94-r.top)/(H*.5))),e=1-Math.pow(1-q,3);el.style.opacity=e.toFixed(3);el.style.transform='perspective(1100px) translateY('+((1-e)*70).toFixed(1)+'px) rotateX('+((1-e)*9).toFixed(2)+'deg) skewY('+Math.max(-3,Math.min(3,-sv*.04)).toFixed(2)+'deg) scale('+(.95+.05*e).toFixed(3)+')'});
bgws.forEach(function(w){var r=w.parentElement.getBoundingClientRect(),pos=r.top+r.height/2-H/2;w.style.transform='translate3d('+(pos*parseFloat(w.dataset.sp)).toFixed(1)+'px,0,0)'})}
sfx=true;
var curt=$('cur'),lensw=$('lensw'),lens=$('lens'),lring=$('lring'),trail=$('trail'),tx3=trail.getContext('2d'),lx=W/2,ly=H/2,lr=150,lrT=150,tp=[],ltt=0;
function sizeTrail(){trail.width=W*dpr;trail.height=H*dpr;tx3.setTransform(dpr,0,0,dpr,0,0)}
sizeTrail();addEventListener('resize',sizeTrail);
var gateEl=$('gate');gateEl.addEventListener('pointerover',function(e){if(e.target.closest('button'))lrT=62});gateEl.addEventListener('pointerout',function(){lrT=150});
addEventListener('pointerdown',function(e){if(!document.body.classList.contains('lock'))return;lr=330;for(var i=0;i<28;i++){var a=Math.random()*6.28,s2=2+Math.random()*4;tp.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s2,vy:Math.sin(a)*s2,l:1,h:Math.random()<.5?12:255})}});
function introFx(){if(curt.classList.contains('gone'))return;ltt+=.012;var X=mx,Y=my;if(!moved||touch){X=W*(.5+Math.cos(ltt*.9)*.3);Y=H*(.45+Math.sin(ltt*1.3)*.25)}
lx+=(X-lx)*.16;ly+=(Y-ly)*.16;lr+=(lrT-lr)*.12;
['--lx',lx+'px','--ly',ly+'px','--lr',lr+'px'].forEach(function(v,i,a){if(i%2===0){lensw.style.setProperty(v,a[i+1]);lens.style.setProperty(v,a[i+1])}});
lring.style.width=lring.style.height=(lr*1.9)+'px';lring.style.transform='translate('+lx+'px,'+ly+'px) translate(-50%,-50%)';
if(moved&&!touch&&Math.random()<.9)tp.push({x:mx+(Math.random()-.5)*10,y:my+(Math.random()-.5)*10,vx:(Math.random()-.5)*.8,vy:(Math.random()-.5)*.8-.2,l:1,h:Math.random()<.5?12:255});
tx3.clearRect(0,0,W,H);tx3.globalCompositeOperation='lighter';
for(var i=tp.length-1;i>=0;i--){var p=tp[i];p.x+=p.vx;p.y+=p.vy;p.vx*=.98;p.vy*=.98;p.l-=.022;if(p.l<=0){tp.splice(i,1);continue}var r2=10*p.l+2,g=tx3.createRadialGradient(p.x,p.y,0,p.x,p.y,r2);g.addColorStop(0,'hsla('+p.h+',100%,66%,'+p.l+')');g.addColorStop(1,'hsla('+p.h+',100%,60%,0)');tx3.fillStyle=g;tx3.beginPath();tx3.arc(p.x,p.y,r2,0,6.283);tx3.fill()}}
var wel=$('code'),cap=$('cap'),cfo=[].slice.call(document.querySelectorAll('.fo')),orb2=$('orb2'),gys=[];
['</>','{ }','AI','React','Node','RAG'].forEach(function(g){var e=document.createElement('span');e.className='gy';e.textContent=g;orb2.appendChild(e);gys.push(e)});
$('bmd').addEventListener('click',function(){var real=wel.dataset.m==='real';wel.dataset.m=real?'toon':'real';this.textContent=real?'Toon':'Real';this.setAttribute('aria-pressed',real?'false':'true')});
function realFx(t){if(wel.dataset.m!=='real')return;var f=hc.speaking?1.7:1,w1=Math.sin(t*2.2*f),w2=Math.sin(t*2.2*f+1.7),w3=Math.sin(t*3.1*f+.6),bw=wel.offsetWidth;
var wx=Math.sin(t*1.3*f)*10+6,N=6,x0=4,x1=396,P=[],i;for(i=0;i<=N;i++)P.push([x0+(x1-x0)*i/N+wx*(.3+i/N*.7),612+Math.sin(t*2.4*f+i*1.4)*10]);
var d='M146 290C100 296 34 318 '+(x0-6+wx*.3).toFixed(1)+' 520L'+P[0][0].toFixed(1)+' '+P[0][1].toFixed(1);
for(i=1;i<=N;i++){d+='Q'+((P[i-1][0]+P[i][0])/2).toFixed(1)+' '+((i%2?642:588)+Math.sin(t*2.4*f+i)*16).toFixed(1)+' '+P[i][0].toFixed(1)+' '+P[i][1].toFixed(1)}
cap.setAttribute('d',d+'L'+(x1+6+wx).toFixed(1)+' 520C'+(x1-8)+' 360 318 300 256 290Z');
cfo.forEach(function(e,k){var j=[1,2,4,5][k];e.setAttribute('d','M'+(176+k*16)+' 300Q'+(120+k*60+wx*.4).toFixed(1)+' 470 '+P[j][0].toFixed(1)+' '+(P[j][1]-34).toFixed(1))});
gys.forEach(function(e,i){var a=t*.9+i*6.283/gys.length,x=Math.cos(a),z=Math.sin(a);e.style.transform='translate(-50%,-50%) translate('+(x*bw*.44).toFixed(1)+'px,'+(z*bw*.08).toFixed(1)+'px) scale('+(.85+.25*z).toFixed(2)+')';e.style.opacity=(.55+.45*(z+1)/2).toFixed(2);e.style.zIndex=z>0?3:0})}
var skIco={"React.js":"<svg viewBox=\"0 0 128 128\"><g fill=\"#00D8FF\"><circle cx=\"64\" cy=\"64\" r=\"11.4\"/><path d=\"M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z\"/></g></svg>","Node.js":"<svg viewBox=\"0 0 128 128\"><path fill=\"url(#ng-a)\" d=\"M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z\"/><path fill=\"url(#ng-b)\" d=\"M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z\"/><path fill=\"url(#ng-c)\" d=\"M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z\"/><defs><linearGradient id=\"ng-a\" x1=\"34.513\" x2=\"27.157\" y1=\"15.535\" y2=\"30.448\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#3F873F\"/><stop offset=\".33\" stop-color=\"#3F8B3D\"/><stop offset=\".637\" stop-color=\"#3E9638\"/><stop offset=\".934\" stop-color=\"#3DA92E\"/><stop offset=\"1\" stop-color=\"#3DAE2B\"/></linearGradient><linearGradient id=\"ng-b\" x1=\"30.009\" x2=\"50.533\" y1=\"23.359\" y2=\"8.288\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".138\" stop-color=\"#3F873F\"/><stop offset=\".402\" stop-color=\"#52A044\"/><stop offset=\".713\" stop-color=\"#64B749\"/><stop offset=\".908\" stop-color=\"#6ABF4B\"/></linearGradient><linearGradient id=\"ng-c\" x1=\"21.917\" x2=\"40.555\" y1=\"22.261\" y2=\"22.261\" gradientTransform=\"translate(-129.242 -73.715) scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".092\" stop-color=\"#6ABF4B\"/><stop offset=\".287\" stop-color=\"#64B749\"/><stop offset=\".598\" stop-color=\"#52A044\"/><stop offset=\".862\" stop-color=\"#3F873F\"/></linearGradient></defs></svg>","Python":"<svg viewBox=\"0 0 128 128\"><linearGradient id=\"py-a\" gradientUnits=\"userSpaceOnUse\" x1=\"70.252\" y1=\"1237.476\" x2=\"170.659\" y2=\"1151.089\" gradientTransform=\"matrix(.563 0 0 -.568 -29.215 707.817)\"><stop offset=\"0\" stop-color=\"#5A9FD4\"/><stop offset=\"1\" stop-color=\"#306998\"/></linearGradient><linearGradient id=\"py-b\" gradientUnits=\"userSpaceOnUse\" x1=\"209.474\" y1=\"1098.811\" x2=\"173.62\" y2=\"1149.537\" gradientTransform=\"matrix(.563 0 0 -.568 -29.215 707.817)\"><stop offset=\"0\" stop-color=\"#FFD43B\"/><stop offset=\"1\" stop-color=\"#FFE873\"/></linearGradient><path fill=\"url(#py-a)\" d=\"M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z\" transform=\"translate(0 10.26)\"/><path fill=\"url(#py-b)\" d=\"M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z\" transform=\"translate(0 10.26)\"/></svg>","Flask":"<svg viewBox=\"0 0 24 24\" fill=\"#14163b\"><path d=\"M10.773 2.878c-.013 1.434.322 4.624.445 5.734l-8.558 3.83c-.56-.959-.98-2.304-1.237-3.38l-.06.027c-.205.09-.406.053-.494-.088l-.011-.018-.82-1.506c-.058-.105-.05-.252.024-.392a.78.78 0 0 1 .358-.331l9.824-4.207c.146-.064.299-.063.4.004.106.062.127.128.13.327Zm.68 7c.523 1.97.675 2.412.832 2.818l-7.263 3.7a19.35 19.35 0 0 1-1.81-2.83l8.24-3.689Zm12.432 8.786h.003c.283.402-.047.657-.153.698l-.947.37c.037.125.035.319-.217.414l-.736.287c-.229.09-.398-.059-.42-.2l-.025-.125c-4.427 1.784-7.94 1.685-10.696.647-1.981-.745-3.576-1.983-4.846-3.379l6.948-3.54c.721 1.431 1.586 2.454 2.509 3.178 2.086 1.638 4.415 1.712 5.793 1.563l-.047-.233c-.015-.077.007-.135.086-.165l.734-.288a.302.302 0 0 1 .342.086l.748-.288a.306.306 0 0 1 .341.086l.583.89Z\"/></svg>","MongoDB":"<svg viewBox=\"0 0 24 24\" fill=\"#47A248\"><path d=\"M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z\"/></svg>","Firebase":"<svg viewBox=\"0 0 128 128\"><path fill=\"#ffa000\" d=\"M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z\"/><path fill=\"#f57c00\" d=\"M71.903 64.005 54.955 31.913l-37.481 71.363Z\"/><path fill=\"#ffca28\" d=\"M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z\"/></svg>","LangChain":"<svg viewBox=\"0 0 24 24\" fill=\"#1C3C3C\"><path d=\"M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z\"/></svg>","LLaMA-3":"<svg viewBox=\"0 0 24 24\" fill=\"#0468FF\"><path d=\"M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z\"/></svg>","RAG":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#5b3cff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"/><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"/><circle cx=\"10\" cy=\"14\" r=\"3\" stroke=\"#ff5a3c\"/><line x1=\"12.1\" y1=\"16.1\" x2=\"15\" y2=\"19\" stroke=\"#ff5a3c\"/><path d=\"M18.5 7l.8-1.6 1.7-.8-1.7-.8-.8-1.6-.8 1.6-1.7.8 1.7.8.8 1.6z\" fill=\"#ff5a3c\" stroke=\"none\"/></svg>","JavaScript":"<svg viewBox=\"0 0 128 128\"><path fill=\"#F7DF1E\" d=\"M1.4 1.4h125.2v125.2H1.4z\"/><path fill=\"#000\" d=\"M116.3 96.7c-.9-5.7-4.6-10.5-15.7-15-3.8-1.8-8.1-3-9.4-5.9-.5-1.7-.5-2.6-.2-3.7.8-3.3 4.8-4.4 7.9-3.4 2 .7 3.9 2.2 5.1 4.7l9.2-5.9c-1.4-2.1-2.1-3.1-3-4-3.2-3.6-7.7-5.5-14.8-5.4l-3.7.5c-3.5.9-6.9 2.7-8.9 5.2-5.9 6.7-4.2 18.5 3 23.3 7.1 5.3 17.5 6.5 18.9 11.5 1.3 6.1-4.5 8.1-10.2 7.4-4.2-.9-6.6-3-9.1-6.9l-9.5 5.5c1.1 2.5 2.3 3.6 4.3 5.8 9.1 9.2 31.8 8.7 35.8-5.2.2-.4 1.3-3.6.4-8.5zm-46.9-37.8H57.7v30.3c0 6.4.3 12.3-.7 14.1-1.7 3.6-6.2 3.1-8.2 2.4-2.1-1-3.1-2.5-4.3-4.5-.3-.6-.6-1-.7-1.1l-9.5 5.8c1.6 3.2 3.9 6.1 6.9 7.9 4.5 2.7 10.5 3.5 16.7 2.1 4.1-1.2 7.6-3.7 9.4-7.4 2.7-4.9 2.1-10.9 2.1-17.4V58.9z\"/></svg>","Java":"<svg viewBox=\"0 0 128 128\"><path fill=\"#0074BD\" d=\"M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z\"/><path fill=\"#EA2D2E\" d=\"M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z\"/><path fill=\"#0074BD\" d=\"M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z\"/><path fill=\"#EA2D2E\" d=\"M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z\"/><path fill=\"#0074BD\" d=\"M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z\"/></svg>","OpenCV":"<svg viewBox=\"0 0 128 128\"><path d=\"M112.871 66.602c9.004 5.277 15.055 15.027 15.074 26.191.032 16.805-13.617 30.453-30.48 30.48-16.863.032-30.559-13.57-30.59-30.375-.02-11.164 5.996-20.933 14.984-26.246l8.774 14.778c.219.37.094.847-.262 1.09-3.32 2.25-5.496 6.046-5.488 10.347.012 6.895 5.633 12.477 12.55 12.461 6.919-.012 12.516-5.61 12.504-12.504-.007-4.3-2.195-8.09-5.523-10.328-.355-.242-.484-.719-.266-1.09z\" fill=\"#128dff\"/><path d=\"M45.477 66.422a30.495 30.495 0 00-14.907-3.867C13.703 62.555.035 76.18.035 92.985c0 16.804 13.668 30.43 30.535 30.43 16.946 0 30.95-14.337 30.524-31.212H43.906c-.453 0-.808.383-.812.832-.043 6.723-5.672 12.434-12.524 12.434-6.922 0-12.527-5.59-12.527-12.485 0-6.894 5.605-12.484 12.527-12.484 1.809 0 3.532.383 5.086 1.074.383.168.836.04 1.047-.316z\" fill=\"#8bda67\"/><path d=\"M47.945 61.648c-8.992-5.293-15.027-15.054-15.027-26.218C32.918 18.625 46.59 5 63.453 5s30.535 13.625 30.535 30.43c0 11.164-6.035 20.925-15.027 26.218L70.21 46.86c-.219-.37-.094-.847.266-1.09 3.32-2.246 5.503-6.039 5.503-10.34 0-6.894-5.609-12.484-12.527-12.484-6.918 0-12.527 5.59-12.527 12.485 0 4.3 2.183 8.093 5.504 10.34.36.242.484.718.265 1.09z\" fill=\"#ff2a44\"/></svg>","Scikit-learn":"<svg viewBox=\"0 0 128 128\"><path fill=\"#f89939\" d=\"M98.18 88.13c15.63-15.62 18.23-38.36 5.8-50.78-12.43-12.42-35.17-9.82-50.8 5.8-15.63 15.62-11.11 45.48-5.8 50.78 4.29 4.29 35.17 9.82 50.8-5.8Z\"/><path fill=\"#3499cd\" d=\"M34.04 65.56c-9.07-9.06-22.27-10.57-29.48-3.37-7.21 7.21-5.7 20.4 3.37 29.46 9.07 9.07 26.4 6.44 29.48 3.37 2.49-2.49 5.71-20.4-3.37-29.46Z\"/></svg>","REST APIs":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2\" y=\"3\" width=\"20\" height=\"18\" rx=\"5\" stroke=\"#5b3cff\"/><path d=\"M5.5 13.5h3.5\" stroke=\"#ff5a3c\" stroke-width=\"1.8\"/><path d=\"M9 15.5v-4.5a1.8 1.8 0 0 0-3.5 0v4.5\" stroke=\"#ff5a3c\" stroke-width=\"1.8\"/><path d=\"M12 15.5v-6h2.2a1.8 1.8 0 0 1 1.8 1.8v.4a1.8 1.8 0 0 1-1.8 1.8H12\" stroke=\"#ff5a3c\" stroke-width=\"1.8\"/><path d=\"M18.5 9.5v6\" stroke=\"#ff5a3c\" stroke-width=\"1.8\"/></svg>","Git":"<svg viewBox=\"0 0 128 128\"><path fill=\"#F05032\" d=\"M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z\"/></svg>"};
var ringEl=$('r3i'),pst=$('pst'),skS=$('skills'),skf=$('skf'),sk=['React.js','Node.js','Python','Flask','MongoDB','Firebase','LangChain','LLaMA-3','RAG','JavaScript','Java','OpenCV','Scikit-learn','REST APIs','Git'],pns=[],PW=210,NN=sk.length,RR=PW/2/Math.tan(Math.PI/NN);
sk.forEach(function(s2,i){var d=document.createElement('div');d.className='pn';d.innerHTML='<small>'+String(i+1).padStart(2,'0')+'</small><div class="pn-ico">'+(skIco[s2]||'')+'</div><b>'+s2+'</b>';ringEl.appendChild(d);pns.push(d)});
function sizeRing(){
  var w=innerWidth;
  if(w<=480)PW=142;
  else if(w<=768)PW=168;
  else if(w<=1024)PW=188;
  else PW=210;
  RR=PW/2/Math.tan(Math.PI/NN);
  ringEl.style.width=PW+'px';
  ringEl.style.height=(w<=480?188:w<=768?216:w<=1024?234:250)+'px';
  pns.forEach(function(d,i){d.style.transform='rotateY('+(i*360/NN)+'deg) translateZ('+RR+'px)'});
}
sizeRing();
addEventListener('resize',sizeRing);
function ringFx(){var r=skS.getBoundingClientRect(),h=r.height;if(r.bottom<-300||r.top>H+300)return;var p=Math.min(1,Math.max(0,-r.top/(h-H))),off=Math.min(h-H,Math.max(0,-r.top));
pst.style.transform='translateY('+off.toFixed(1)+'px)';var ang=-p*360,best=0,bd=999;
ringEl.style.transform='translateZ('+(-RR)+'px) rotateX(-7deg) rotateY('+ang.toFixed(2)+'deg)';
pns.forEach(function(d,i){var a=((i*360/NN+ang)%360+540)%360-180;d.style.opacity=Math.max(.12,1-Math.abs(a)/105).toFixed(2);if(Math.abs(a)<bd){bd=Math.abs(a);best=i}});
if(skf.dataset.i!=best){skf.dataset.i=best;skf.textContent=sk[best]}}
function enableSmooth(){if(rm||touch)return;var w=$('sm');w.classList.add('on');smooth=true;var u=function(){document.body.style.height=w.offsetHeight+'px'};new ResizeObserver(u).observe(w);u()}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href');if(id.length<2)return;var t=document.querySelector(id);if(!t)return;e.preventDefault();var y=t.getBoundingClientRect().top+SY;scrollTo({top:Math.max(0,y-(id==='#top'?0:10)),behavior:smooth?'auto':'smooth'})});
enableSmooth();ifx=true;
var pw=$('pw'),snl=$('snl');function swapPh(){pw.classList.toggle('sw');snl.textContent=pw.classList.contains('sw')?'Professional':'Off duty'}
pw.addEventListener('click',swapPh);pw.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();swapPh()}});
var wk=$('work'),wst=$('wst'),wtr=$('wtr'),wcn=$('wcn'),wpb=$('wpb'),pjs=[].slice.call(document.querySelectorAll('.pj')),trackW=0;
function sizeWork(){W=innerWidth;H=innerHeight;trackW=wtr.scrollWidth;wk.style.height=(H+Math.max(0,trackW-W)+H*.2)+'px'}
sizeWork();addEventListener('resize',sizeWork);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sizeWork);
function workFx(){var r=wk.getBoundingClientRect(),h=r.height;if(r.bottom<-200||r.top>H+200)return;var span=Math.max(1,h-H),off=Math.min(span,Math.max(0,-r.top)),p=off/span,dist=Math.max(0,trackW-W),best=0,bd=1e9;
wst.style.transform='translateY('+off.toFixed(1)+'px)';wtr.style.transform='translateX('+(-p*dist).toFixed(1)+'px)';
pjs.forEach(function(c,i){var b=c.getBoundingClientRect(),cx=b.left+b.width/2-W/2,d=Math.min(1,Math.abs(cx)/(W*.55));c.style.transform='scale('+(1-.1*d).toFixed(3)+')';c.style.opacity=(1-.5*d).toFixed(2);c.querySelector('.art em').style.transform='translateX('+(cx*-.05).toFixed(1)+'px)';if(Math.abs(cx)<bd){bd=Math.abs(cx);best=i}});
wcn.textContent=String(best+1).padStart(2,'0');wpb.style.setProperty('--p',p.toFixed(3))}
/* intro */
var cur=$('cur'),nn=$('n'),gg=$('g'),pb=$('pb'),gl=['Namaste','ನಮಸ್ಕಾರ','नमस्ते','నమస్కారం','I’m Basavaraj'],gi=-1;
function open(){cur.classList.add('open');document.body.classList.remove('lock');document.body.classList.add('ready');started=true;startT=performance.now();setTimeout(function(){cur.classList.add('gone')},1300)}
if(rm){open()}else{var s0=performance.now();(function c(now){var p=Math.min((now-s0)/2800,1),e=1-Math.pow(1-p,2);nn.textContent=Math.round(e*100)+'%';pb.style.setProperty('--p',e);var i=Math.min(4,Math.floor(p*5));if(i!==gi){gi=i;gg.textContent=gl[i];gg.classList.remove('sw');void gg.offsetWidth;gg.classList.add('sw')}if(p<1)requestAnimationFrame(c);else showGate()})(s0)}
})();
