import React, { useEffect, useState } from "react";
import bgImg from "./temple.png";
import coupleImg from "./couple.png";
import musicSrc from "./music.mp3";

const templeImg = bgImg;

const styles = `
:root{
  --bg:#0d0b12;
  --ink:#f5efe6;
  --muted:#b8afa3;
  --gold:#e8c07a;
  --rose:#e8a3a3;
  --accent:#c084fc;
  --line:rgba(232,192,122,.25);
}
*{box-sizing:border-box}
html,body,#root,.wedding-root{margin:0;padding:0}
html,body{overflow-x:hidden}
.splash{position:fixed;inset:0;z-index:10001;background:rgba(13,11,18,.35);backdrop-filter:blur(18px) saturate(1.1);-webkit-backdrop-filter:blur(18px) saturate(1.1);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;cursor:pointer;animation:splashIn .5s ease;gap:20px}
.envelope{position:relative;width:min(440px,90vw);aspect-ratio:1.5/1;perspective:1400px;cursor:pointer;filter:drop-shadow(0 30px 60px rgba(0,0,0,.6)) drop-shadow(0 0 40px rgba(232,192,122,.35))}
.env-body{position:absolute;inset:0;background:linear-gradient(160deg,#fff8e8 0%,#f3e0b8 55%,#e5c98a 100%);border-radius:10px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(120,80,20,.2),inset 0 0 80px rgba(180,130,50,.15);z-index:1}
.env-body:before{content:"";position:absolute;inset:10px;border:1px dashed rgba(164,19,60,.35);border-radius:6px;pointer-events:none}
.env-address{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:22px;z-index:1}
.env-orn{letter-spacing:12px;color:#a4133c;font-size:11px;opacity:.8;margin-bottom:10px}
.env-to{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#6b3d10;letter-spacing:3px;text-transform:uppercase}
.env-names{font-family:'Great Vibes',cursive;font-size:clamp(2.4rem,8vw,3.8rem);line-height:1.05;margin-top:8px;color:#7a1029;text-shadow:0 2px 6px rgba(120,20,40,.15)}
.env-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:13px;color:#6b3d10;margin-top:8px;letter-spacing:1px;max-width:80%}
/* Side flaps folded in when closed, open outward on hover */
.env-side{position:absolute;top:0;bottom:0;width:52%;background:linear-gradient(160deg,#f3d99a,#c9a35a);z-index:3;transition:transform .9s cubic-bezier(.5,-.1,.4,1.2);box-shadow:inset 0 0 40px rgba(120,80,20,.15)}
.env-left{left:0;clip-path:polygon(0 0,100% 50%,0 100%);transform-origin:left center;transform:rotateY(0deg)}
.env-right{right:0;clip-path:polygon(100% 0,0 50%,100% 100%);transform-origin:right center;transform:rotateY(0deg)}
/* Top flap folds down over side flaps when closed */
.env-flap{position:absolute;left:0;right:0;top:0;height:58%;background:linear-gradient(180deg,#f3d99a 0%,#c9a35a 100%);clip-path:polygon(0 0,100% 0,50% 100%);transform-origin:top center;transform:rotateX(0deg);transition:transform .9s cubic-bezier(.5,-.15,.4,1.25);z-index:4;filter:drop-shadow(0 6px 8px rgba(0,0,0,.2))}
.env-seal{position:absolute;left:50%;top:calc(58% - 30px);transform:translateX(-50%);width:78px;height:78px;border-radius:50%;background:radial-gradient(circle at 32% 30%,#f07a8f 0%,#c9184a 45%,#7a1029 80%,#4a0616 100%);display:flex;align-items:center;justify-content:center;color:#ffe9b8;font-family:'Great Vibes',cursive;font-weight:400;font-size:26px;box-shadow:0 10px 22px rgba(120,20,40,.6),inset 0 -5px 10px rgba(0,0,0,.5),inset 0 4px 8px rgba(255,220,180,.35),0 0 0 3px rgba(255,217,122,.25);z-index:5;cursor:pointer;animation:sealPulse 2.4s ease-in-out infinite;border:2.5px solid #ffd97a;transition:transform .5s ease,opacity .5s ease;text-shadow:0 1px 2px rgba(0,0,0,.4)}
.env-seal:before{content:"";position:absolute;inset:5px;border-radius:50%;border:1px dashed rgba(255,217,122,.5);pointer-events:none}
.seal-inner{display:inline-flex;align-items:center;line-height:1}
.seal-amp{font-size:14px;margin:0 2px;opacity:.85}
.envelope.opening .env-flap{transform:rotateX(-170deg)}
.envelope.opening .env-left{transform:rotateY(-170deg)}
.envelope.opening .env-right{transform:rotateY(170deg)}
.envelope.opening .env-seal{transform:translateX(-50%) scale(.6);opacity:0}
@keyframes sealPulse{50%{box-shadow:0 8px 24px rgba(232,80,110,.75),0 0 34px rgba(232,192,122,.55),inset 0 -4px 8px rgba(0,0,0,.4)}}
.splash-btn{margin-top:8px;padding:14px 34px;border-radius:100px;border:1.5px solid #e8c07a;background:linear-gradient(90deg,rgba(246,168,37,.15),rgba(255,111,168,.15),rgba(197,139,255,.15));color:#fff;font-family:'Cinzel',serif;letter-spacing:3px;font-weight:700;font-size:13px;cursor:pointer;box-shadow:0 10px 40px rgba(232,192,122,.35);transition:transform .3s ease,box-shadow .3s ease}
.splash-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 14px 50px rgba(232,192,122,.55)}
.splash-hint{color:#b8afa3;font-size:12px;letter-spacing:2px;text-transform:uppercase;animation:pulse 2s ease-in-out infinite}
@keyframes splashIn{from{opacity:0}to{opacity:1}}
.wedding-root{font-family:'Cormorant Garamond','Playfair Display',Georgia,serif;color:var(--ink);background:var(--bg);position:relative}
.sky-day{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,#89c7ff 0%,#b8dcff 40%,#ffd9a8 80%,#ffb98a 100%)}
.sky-night{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,#05060f 0%,#0d0b24 45%,#1a0d2e 100%)}
.bg-fixed{position:fixed;left:0;right:0;top:0;bottom:0;z-index:4;background-image:url(${templeImg});background-repeat:no-repeat;background-position:center bottom;background-size:auto 115vh;background-attachment:fixed;transition:filter .3s linear}
.bg-fixed-glow{position:fixed;left:0;right:0;top:0;bottom:0;z-index:4;background-image:url(${templeImg});background-repeat:no-repeat;background-position:center bottom;background-size:auto 115vh;background-attachment:fixed;mix-blend-mode:screen;pointer-events:none;filter:blur(14px);transition:opacity .4s linear}
.couple-photo{position:fixed;left:50%;bottom:-5vh;z-index:5;width:min(260px,60vw);aspect-ratio:1/1;transform:translate(-50%,120vh);background-image:url(${coupleImg});background-size:contain;background-repeat:no-repeat;background-position:center;filter:drop-shadow(0 20px 40px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(232,192,122,.4));pointer-events:none;will-change:transform}
.clouds{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden;transition:opacity .3s linear}
.cloud{position:absolute;background:radial-gradient(ellipse at center,rgba(255,255,255,.95),rgba(255,255,255,.7) 50%,transparent 75%);border-radius:50%;filter:blur(6px);animation:cloudDrift linear infinite}
@keyframes cloudDrift{0%{transform:translateX(-50vw)}100%{transform:translateX(120vw)}}
.night-stars{position:fixed;inset:0;z-index:2;pointer-events:none;transition:opacity .3s linear}
.night-stars .star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:0 0 6px #fff;animation:twinkle 3s ease-in-out infinite}
.moon{position:fixed;top:8vh;right:10vw;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff 0%,#f5efd0 50%,#e8c07a 100%);box-shadow:0 0 60px rgba(255,240,200,.6),0 0 120px rgba(232,192,122,.35);z-index:2;pointer-events:none;transition:opacity .3s linear}
.sun{position:fixed;top:12vh;right:12vw;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff8d6 0%,#ffd97a 60%,#ffb14a 100%);box-shadow:0 0 80px rgba(255,220,120,.85),0 0 160px rgba(255,190,90,.55);z-index:2;pointer-events:none;animation:sunGlow 4s ease-in-out infinite;transition:opacity .3s linear}
@keyframes sunGlow{50%{box-shadow:0 0 100px rgba(255,220,120,1),0 0 200px rgba(255,190,90,.7)}}
.bg-vignette{position:fixed;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse at center,transparent 0%,rgba(13,11,18,.35) 55%,rgba(13,11,18,.85) 100%);transition:opacity .3s linear}
.bg-aurora{position:fixed;inset:-20%;z-index:3;pointer-events:none;mix-blend-mode:soft-light;background:conic-gradient(from 0deg at 50% 50%,rgba(232,192,122,.35),rgba(192,132,252,.25),rgba(232,163,163,.3),rgba(232,192,122,.35));filter:blur(80px);opacity:.55;animation:auroraSpin 40s linear infinite;transition:opacity .3s linear}
@keyframes auroraSpin{to{transform:rotate(360deg)}}
.wedding-root > section,.wedding-root > .progress-bar,.wedding-root > .petals{position:relative;z-index:5}
.wedding-root > section,.wedding-root > .progress-bar,.wedding-root > .petals{position:relative;z-index:2}
.wedding-root h1,.wedding-root h2,.wedding-root h3{margin:0;font-weight:500;letter-spacing:1px}
.mono{font-family:'Inter','Helvetica Neue',Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;font-size:12px;font-weight:600}
.progress-bar{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--rose),var(--accent));z-index:9999;transition:width .1s linear;box-shadow:0 0 12px rgba(232,192,122,.6)}
.music-toggle{position:fixed;top:18px;right:18px;z-index:10000;width:46px;height:46px;border-radius:50%;border:1.5px solid var(--gold);background:rgba(13,11,18,.55);backdrop-filter:blur(10px);color:var(--gold);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.4),0 0 20px rgba(232,192,122,.25);transition:transform .3s ease,box-shadow .3s ease}
.music-toggle:hover{transform:scale(1.08);box-shadow:0 4px 24px rgba(0,0,0,.5),0 0 28px rgba(232,192,122,.5)}
.music-toggle .note{font-size:22px;line-height:1}
.music-toggle .eq{display:inline-flex;align-items:flex-end;gap:2px;height:16px}
.music-toggle .eq i{display:block;width:3px;background:var(--gold);border-radius:2px;animation:eqBar .9s ease-in-out infinite}
.music-toggle .eq i:nth-child(1){height:40%;animation-delay:-.2s}
.music-toggle .eq i:nth-child(2){height:80%;animation-delay:-.5s}
.music-toggle .eq i:nth-child(3){height:60%;animation-delay:-.1s}
.music-toggle .eq i:nth-child(4){height:90%;animation-delay:-.35s}
@keyframes eqBar{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
.music-toggle.playing{border-color:var(--rose);box-shadow:0 4px 20px rgba(0,0,0,.4),0 0 24px rgba(232,163,163,.5)}
.petals{position:fixed;inset:0;pointer-events:none;z-index:5;overflow:hidden}
.burst-petals{position:fixed;inset:0;pointer-events:none;z-index:6;overflow:hidden;opacity:0;transition:opacity .4s ease}
.burst-petals.active{opacity:1}
.burst{position:absolute;top:-8vh;width:16px;height:22px;border-radius:150% 0 150% 0 / 100% 0 100% 0;opacity:.95;filter:drop-shadow(0 3px 5px rgba(120,20,40,.35));animation:roseFall linear infinite}
.burst.b1{background:linear-gradient(135deg,#ffb3c1,#ff4d6d)}
.burst.b2{background:linear-gradient(135deg,#ff8fa3,#c9184a)}
.burst.b3{background:linear-gradient(135deg,#ffccd5,#ff758f)}
.burst.b4{background:linear-gradient(135deg,#e8536b,#a4133c)}
.burst.b5{background:linear-gradient(135deg,#ffe0e6,#ff8fa3)}
@keyframes roseFall{0%{transform:translate(0,-10vh) rotate(0deg);opacity:0}10%{opacity:1}50%{transform:translate(var(--dx,40px),50vh) rotate(360deg)}100%{transform:translate(calc(var(--dx,40px) * -.6),115vh) rotate(720deg);opacity:.9}}
.petal{position:absolute;top:-40px;width:18px;height:26px;border-radius:150% 0 150% 0 / 100% 0 100% 0;animation:fall linear infinite;opacity:.85;filter:drop-shadow(0 2px 4px rgba(0,0,0,.25))}
.petal.p1{background:linear-gradient(135deg,#ffb3c1,#ff6b8a)}
.petal.p2{background:linear-gradient(135deg,#ffd6a5,#ff9a76)}
.petal.p3{background:linear-gradient(135deg,#ffe29a,#e8b04a)}
.petal.p4{background:linear-gradient(135deg,#f4b7e1,#c084fc)}
.petal.p5{background:linear-gradient(135deg,#fff,#ffc7c7)}
@keyframes fall{0%{transform:translate3d(0,-10vh,0) rotate(0deg)}50%{transform:translate3d(40px,50vh,0) rotate(360deg)}100%{transform:translate3d(-30px,110vh,0) rotate(720deg)}}
.section{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;padding:80px 24px;text-align:center}
.fade-up{opacity:0;transform:translateY(60px);transition:all 1s cubic-bezier(.2,.7,.2,1)}
.fade-up.visible{opacity:1;transform:translateY(0)}
.fade-left{opacity:0;transform:translateX(-80px);transition:all 1s cubic-bezier(.2,.7,.2,1)}
.fade-left.visible{opacity:1;transform:translateX(0)}
.fade-right{opacity:0;transform:translateX(80px);transition:all 1s cubic-bezier(.2,.7,.2,1)}
.fade-right.visible{opacity:1;transform:translateX(0)}
.fade-scale{opacity:0;transform:scale(.9);transition:all 1s cubic-bezier(.2,.7,.2,1)}
.fade-scale.visible{opacity:1;transform:scale(1)}
.hero{background:transparent;overflow:visible;min-height:105vh;display:block;padding:0}
.hero-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;padding:80px 24px;text-align:center}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(232,192,122,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(232,192,122,.06) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse at center,#000 40%,transparent 80%);mask-image:radial-gradient(ellipse at center,#000 40%,transparent 80%)}
.hero-inner{position:relative;z-index:2;max-width:1100px}
.hero .kicker{color:#ff8ac7;margin-bottom:24px;font-weight:700;letter-spacing:5px}
.hero .names{font-family:'Great Vibes',cursive;font-size:clamp(3.5rem,10vw,7rem);font-weight:400;line-height:1.05;letter-spacing:0;background:linear-gradient(180deg,#fff5a8 0%,#ffd24d 35%,#ff8ac7 70%,#c58bff 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero .amp{display:block;font-family:'Cormorant Garamond',serif;color:#ff6fa8;font-style:italic;font-size:.42em;margin:4px 0;-webkit-text-fill-color:currentColor}
.hero .sub{margin-top:32px;color:#30302db5;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:800;font-size:clamp(1.2rem,2.2vw,1.65rem);letter-spacing:.5px}
.hashtag{margin-top:36px;display:inline-flex;align-items:center;gap:10px;padding:14px 30px;border:2px solid #ffd24d;border-radius:100px;color:#ffffff;background:linear-gradient(90deg,#f6a825,#ff6fa8,#c58bff);font-family:'Cinzel',serif;font-weight:800;letter-spacing:4px;font-size:14px}
.hashtag .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);box-shadow:0 0 12px var(--gold);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{50%{opacity:.4;transform:scale(1.4)}}
.scroll-hint{position:absolute;bottom:120px;left:50%;transform:translateX(-50%);color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6);animation:bounce 1.8s infinite;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:20;font-weight:600}
.scroll-hint .line{width:2px;height:48px;background:linear-gradient(180deg,transparent,#ffd97a);box-shadow:0 0 8px rgba(0,0,0,.6);position:relative}
.scroll-hint .line:after{content:"";position:absolute;left:50%;bottom:-3px;width:10px;height:10px;border-right:2px solid #ffd97a;border-bottom:2px solid #ffd97a;transform:translateX(-50%) rotate(45deg);filter:drop-shadow(0 0 6px rgba(255,217,122,.8))}
@keyframes bounce{0%,100%{transform:translate(-50%,0);opacity:.6}50%{transform:translate(-50%,8px);opacity:1}}
.orb{position:absolute;border-radius:50%;filter:blur(60px);opacity:.5}
.orb.o1{width:320px;height:320px;background:#c084fc;top:-80px;left:-80px;animation:drift 18s ease-in-out infinite}
.orb.o2{width:260px;height:260px;background:#e8a3a3;bottom:-60px;right:-60px;animation:drift 22s ease-in-out infinite reverse}
@keyframes drift{50%{transform:translate(40px,60px)}}
.cinema{position:relative;height:300vh;background:linear-gradient(180deg,#0d0b12 0%,#1a1428 50%,#0d0b12 100%)}
.cinema-sticky{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:flex-start;justify-content:center}
.cinema-sky{position:absolute;inset:0;background:radial-gradient(1000px 600px at 20% 20%,rgba(232,192,122,.15),transparent 60%),radial-gradient(800px 500px at 80% 80%,rgba(192,132,252,.18),transparent 60%),linear-gradient(180deg,#0d0b12,#141020)}
.cinema-halo{position:absolute;top:50%;left:50%;width:800px;height:800px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(232,192,122,.28),transparent 60%);filter:blur(30px);animation:haloGlow 5s ease-in-out infinite;pointer-events:none}
@keyframes haloGlow{50%{transform:translate(-50%,-50%) scale(1.1);opacity:.7}}
.cinema-temple{position:absolute;left:50%;bottom:0;width:min(680px,88vw);transform:translate(-50%,110%);will-change:transform;pointer-events:none;z-index:1}
.cinema-temple img{width:100%;height:auto;display:block;filter:drop-shadow(0 40px 80px rgba(232,192,122,.35)) drop-shadow(0 0 60px rgba(192,132,252,.2))}
.cinema-content{position:relative;z-index:3;text-align:center;padding:80px 24px 0;max-width:1100px;width:100%}
.cinema-caption{position:absolute;left:0;right:0;bottom:8vh;text-align:center;z-index:3;color:var(--muted);font-style:italic;font-size:clamp(1rem,1.6vw,1.2rem);padding:0 24px;opacity:0;transition:opacity .6s ease}
.cinema-caption.show{opacity:1}
.temple-scene{background:radial-gradient(ellipse at 50% 20%,rgba(232,192,122,.2),transparent 50%),radial-gradient(ellipse at 50% 100%,rgba(192,132,252,.15),transparent 60%),linear-gradient(180deg,#141020 0%,#1a1428 50%,#0d0b12 100%);overflow:hidden;flex-direction:column}
.stars{position:absolute;inset:0;pointer-events:none}
.star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;animation:twinkle 3s ease-in-out infinite}
@keyframes twinkle{50%{opacity:.2;transform:scale(.5)}}
.temple-halo{position:absolute;top:50%;left:50%;width:600px;height:600px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(232,192,122,.35),transparent 60%);filter:blur(20px);animation:haloGlow 4s ease-in-out infinite}
@keyframes haloGlow{50%{transform:translate(-50%,-50%) scale(1.1);opacity:.7}}
.temple-wrap{position:relative;z-index:2;width:min(460px,78vw);margin:40px auto 0;transition:transform .25s ease-out;will-change:transform}
.temple-img{width:100%;height:auto;display:block;filter:drop-shadow(0 30px 60px rgba(232,192,122,.4)) drop-shadow(0 0 40px rgba(192,132,252,.2))}
.temple-kicker{position:relative;z-index:3;color:var(--gold);margin-bottom:16px}
.temple-title{position:relative;z-index:3;font-size:clamp(1.8rem,4vw,3rem);font-weight:400;letter-spacing:2px;background:linear-gradient(180deg,#fff,#e8c07a);-webkit-background-clip:text;background-clip:text;color:transparent}
.temple-caption{position:relative;z-index:3;color:var(--muted);margin-top:28px;max-width:520px;line-height:1.7;font-size:1.1rem;font-style:italic}
.invite{background:transparent}
.invite-card{max-width:720px;padding:60px 40px;border:1px solid var(--line);border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01));backdrop-filter:blur(20px);position:relative;box-shadow:0 40px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05)}
.invite-card .corner{position:absolute;width:40px;height:40px;border:1px solid var(--gold)}
.invite-card .corner.tl{top:20px;left:20px;border-right:none;border-bottom:none;border-top-left-radius:12px}
.invite-card .corner.tr{top:20px;right:20px;border-left:none;border-bottom:none;border-top-right-radius:12px}
.invite-card .corner.bl{bottom:20px;left:20px;border-right:none;border-top:none;border-bottom-left-radius:12px}
.invite-card .corner.br{bottom:20px;right:20px;border-left:none;border-top:none;border-bottom-right-radius:12px}
.invite-card .kicker{color:var(--gold);margin-bottom:20px}
.invite-card h2{font-size:clamp(2rem,4vw,3rem);font-weight:400;background:linear-gradient(180deg,#fff,#e8c07a);-webkit-background-clip:text;background-clip:text;color:transparent}
.invite-card p{font-size:1.15rem;line-height:1.9;margin:16px 0 0;color:var(--muted)}
.invite-card .couple{font-size:1.8rem;font-style:italic;margin:24px 0;background:linear-gradient(180deg,#fff,#e8a3a3);-webkit-background-clip:text;background-clip:text;color:transparent}
.divider{display:flex;align-items:center;justify-content:center;gap:16px;margin:24px 0;color:var(--gold)}
.divider .l{flex:1;max-width:80px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.events{background:transparent;flex-direction:column}
.events .kicker{color:var(--gold);margin-bottom:16px}
.events h2{font-size:clamp(2rem,4.5vw,3.2rem);font-weight:400;margin-bottom:60px;background:linear-gradient(180deg,#fff,#e8c07a);-webkit-background-clip:text;background-clip:text;color:transparent}
.event-grid{display:grid;gap:24px;width:min(1200px,95vw);grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.event-card{position:relative;padding:40px 28px;text-align:left;border:1px solid var(--line);border-radius:20px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01));backdrop-filter:blur(20px);overflow:hidden;transition:transform .5s cubic-bezier(.2,.7,.2,1),border-color .5s}
.event-card:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(400px 200px at 50% 0%,var(--glow,rgba(232,192,122,.15)),transparent 70%);opacity:0;transition:opacity .5s}
.event-card:hover{transform:translateY(-8px);border-color:var(--gold)}
.event-card:hover:before{opacity:1}
.event-card .num{font-family:'Inter',sans-serif;font-size:11px;font-weight:600;letter-spacing:3px;color:var(--muted)}
.event-card h3{font-size:2rem;margin:12px 0 20px;font-weight:400;color:var(--ink)}
.event-card .date{display:flex;align-items:baseline;gap:12px;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--line)}
.event-card .date .day{font-size:3rem;color:var(--gold);line-height:1;font-weight:300}
.event-card .date .my{color:var(--muted);font-family:'Inter',sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;line-height:1.3}
.event-card .venue{color:var(--muted);line-height:1.7;font-size:1rem}
.event-card .venue strong{color:var(--ink);font-weight:500;display:block;margin-bottom:4px;font-size:1.1rem}
.event-card .tag{display:inline-block;margin-top:20px;padding:6px 14px;border:1px solid var(--line);border-radius:100px;font-family:'Inter',sans-serif;font-size:11px;letter-spacing:2px;color:var(--gold);background:rgba(232,192,122,.06);text-transform:uppercase;font-weight:600}
.event-card .map-link{display:inline-flex;align-items:center;gap:6px;margin-top:18px;padding:8px 16px;border:1px solid var(--gold);border-radius:100px;font-family:'Inter',sans-serif;font-size:12px;letter-spacing:1.5px;color:var(--gold);background:rgba(232,192,122,.08);text-decoration:none;font-weight:600;transition:all .3s ease}
.event-card .map-link:hover{background:var(--gold);color:#0d0b12;transform:translateY(-2px);box-shadow:0 8px 20px rgba(232,192,122,.35)}
.card-haldi{--glow:rgba(246,214,122,.2)}
.card-wedding{--glow:rgba(232,163,163,.2)}
.card-reception{--glow:rgba(192,132,252,.2)}
.footer{min-height:70vh;background:transparent;flex-direction:column}
.footer .big-hash{font-size:clamp(2.5rem,8vw,6rem);font-weight:400;letter-spacing:-1px;background:linear-gradient(180deg,#fff,#e8c07a,#e8a3a3);-webkit-background-clip:text;background-clip:text;color:transparent}
.footer .thanks{margin-top:24px;color:var(--muted)}
.footer .love{margin-top:32px;color:var(--muted);max-width:500px;font-style:italic;font-size:1.15rem;line-height:1.7}
@media (max-width:640px){.invite-card{padding:50px 24px}.event-card{padding:32px 22px}}
`;

function useInView() {
  const ref = React.useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const Reveal = ({ as: Tag = "div", variant = "fade-up", children, className = "", style }) => {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`${variant} ${inView ? "visible" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
};

export default function WeddingInvitation() {
  const [scrollPct, setScrollPct] = useState(0);
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const audioRef = React.useRef(null);

  const enter = () => {
    setEntered(true);
    document.body.style.overflow = "";
    const a = audioRef.current;
    if (a) {
      a.volume = 0.4;
      a.muted = false;
      const p = a.play();
      if (p && p.then) p.catch(() => {});
    }
  };

  useEffect(() => {
    if (!entered) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [entered]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setScrollPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const petals = Array.from({ length: 26 }).map((_, i) => {
    const left = Math.random() * 100;
    const dur = 10 + Math.random() * 12;
    const delay = Math.random() * 12;
    const size = 0.7 + Math.random() * 0.9;
    const kind = `p${(i % 5) + 1}`;
    return (
      <span key={i} className={`petal ${kind}`} style={{ left: `${left}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s`, transform: `scale(${size})` }} />
    );
  });

  const stars = Array.from({ length: 160 }).map((_, i) => (
    <span key={i} className="star" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`, animationDelay: `${Math.random() * 3}s`, opacity: 0.3 + Math.random() * 0.7 }} />
  ));

  const burstPetals = Array.from({ length: 60 }).map((_, i) => {
    const left = 15 + Math.random() * 70;                 // concentrated over couple
    const dx = (Math.random() - 0.5) * 200;               // side sway
    const dur = 4 + Math.random() * 3.5;                  // slower, graceful fall
    const delay = Math.random() * 4;
    const kind = `b${(i % 5) + 1}`;
    const scale = 0.7 + Math.random() * 0.9;
    return (
      <span key={i} className={`burst ${kind}`} style={{ left: `${left}%`, "--dx": `${dx}px`, animationDuration: `${dur}s`, animationDelay: `${delay}s`, transform: `scale(${scale})` }} />
    );
  });

  const night = Math.min(1, Math.max(0, scrollPct / 70));
  const day = 1 - night;
  const starsOpacity = Math.min(1, Math.max(0, (scrollPct - 25) / 50));
  const cloudsOpacity = Math.max(0, 1 - scrollPct / 45);
  const templeBrightness = 0.95 - night * 0.55;
  // Timeline (percent of total page scroll).
  let templeY;
  if (scrollPct < 1) templeY = 55;
  else if (scrollPct < 8) templeY = 55 - ((scrollPct - 1) / 7) * 55;    // rise
  else if (scrollPct < 14) templeY = 0;                                  // hold
  else if (scrollPct < 22) templeY = -((scrollPct - 14) / 8) * 120;    // exit
  else templeY = -120;

  let coupleY;
  if (scrollPct < 9) coupleY = 60;                                      // hidden below viewport
  else if (scrollPct < 13) coupleY = 60 - ((scrollPct - 9) / 4) * 60;  // rise to rest at temple base
  else coupleY = templeY * 1.15;                                        // now locked to temple; rises & exits with it

  return (
    <div className="wedding-root" style={{ "--temple-url": `url("${templeImg}")` }}>
      <style>{styles}</style>
      {!entered && (
        <div className="splash">
          <div className={`envelope${opening ? " opening" : ""}`} onClick={(e) => {
            e.stopPropagation();
            if (opening) return;
            setOpening(true);
            const a = audioRef.current;
            if (a) { a.volume = 0.4; a.muted = false; const p = a.play(); if (p && p.then) p.catch(() => {}); }
            setTimeout(() => enter(), 1200);
          }}>
            <div className="env-body">
              <div className="env-address">
                <div className="env-orn">✦ ⋆ ✦</div>
                <div className="env-to">Wedding Invitation</div>
                <div className="env-names">Jaswanth &amp; Harika</div>
                <div className="env-sub">request the pleasure of your company</div>
              </div>
            </div>
            <div className="env-side env-left" />
            <div className="env-side env-right" />
            <div className="env-flap" />
            <div className="env-seal">
              <span className="seal-inner">Open</span>
            </div>
          </div>
        </div>
      )}
      <div className="sky-day" style={{ opacity: day }} />
      <div className="sky-night" style={{ opacity: night }} />
      <div className="bg-fixed" style={{ transform: `translateY(${templeY}%)`, filter: `brightness(${templeBrightness}) saturate(${1 + night * 0.15})` }} />
      <div className="bg-fixed-glow" style={{ transform: `translateY(${templeY}%)`, opacity: 0.25 + night * 0.55 }} />
      <div className="couple-photo" style={{ transform: `translate(-50%, ${coupleY}vh)` }} />
      <div className="sun" style={{ opacity: day, transform: `translateY(${scrollPct * 1.5}px)` }} />
      <div className="moon" style={{ opacity: night, transform: `translateY(${(100 - scrollPct) * -1.2}px)` }} />
      <div className="clouds" style={{ opacity: cloudsOpacity }}>
        <span className="cloud" style={{ width: 260, height: 80, top: "8%", animationDuration: "22s", animationDelay: "-1s" }} />
        <span className="cloud" style={{ width: 180, height: 60, top: "18%", animationDuration: "28s", animationDelay: "-24s" }} />
        <span className="cloud" style={{ width: 340, height: 100, top: "30%", animationDuration: "34s", animationDelay: "-5s" }} />
        <span className="cloud" style={{ width: 200, height: 70, top: "42%", animationDuration: "26s", animationDelay: "-19s" }} />
        <span className="cloud" style={{ width: 300, height: 90, top: "4%", animationDuration: "38s", animationDelay: "-33s" }} />
        <span className="cloud" style={{ width: 220, height: 75, top: "24%", animationDuration: "30s", animationDelay: "-11s" }} />
        <span className="cloud" style={{ width: 280, height: 85, top: "14%", animationDuration: "32s", animationDelay: "-28s" }} />
        <span className="cloud" style={{ width: 160, height: 55, top: "36%", animationDuration: "24s", animationDelay: "-3s" }} />
        <span className="cloud" style={{ width: 380, height: 110, top: "52%", animationDuration: "40s", animationDelay: "-15s" }} />
        <span className="cloud" style={{ width: 240, height: 78, top: "2%", animationDuration: "29s", animationDelay: "-26s" }} />
        <span className="cloud" style={{ width: 320, height: 95, top: "20%", animationDuration: "35s", animationDelay: "-7s" }} />
        <span className="cloud" style={{ width: 190, height: 65, top: "46%", animationDuration: "27s", animationDelay: "-23s" }} />
        <span className="cloud" style={{ width: 270, height: 82, top: "32%", animationDuration: "31s", animationDelay: "-2s" }} />
        <span className="cloud" style={{ width: 210, height: 72, top: "56%", animationDuration: "33s", animationDelay: "-17s" }} />
      </div>
      <div className="night-stars" style={{ opacity: starsOpacity }}>{stars}</div>
      <div className="bg-aurora" style={{ opacity: night * 0.6 }} />
      <div className="bg-vignette" style={{ opacity: 0.4 + night * 0.6 }} />
      <div className="progress-bar" style={{ width: `${scrollPct}%` }} />
      <audio ref={audioRef} src={musicSrc} loop preload="auto" playsInline />
      <div className="petals" style={{ opacity: scrollPct > 0.1 ? 0 : 1, transition: "opacity .3s linear" }}>{scrollPct > 0.5 ? null : petals}</div>
      <div className={`burst-petals${scrollPct >= 13 && scrollPct <= 22 ? " active" : ""}`}>{burstPetals}</div>

      <section className="section hero">
        <div className="hero-sticky">
          <div className="hero-inner">
            <h1 className="names">
              Jaswanth
              <span className="amp">&amp;</span>
              Harika
            </h1>
            <div className="sub">Two souls, one journey — beginning September 4, 2026</div>
           
          </div>
          <div className="scroll-hint">
            <span className="mono">Scroll</span>
            <span className="line" />
          </div>
        </div>
      </section>

      <section className="section invite">
        <Reveal variant="fade-scale" className="invite-card">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <div className="mono kicker">✦ The Invitation ✦</div>
          <h2>Together with our families</h2>
          <p>
            With hearts full of joy, we invite you to celebrate <br />
            the beginning of a beautiful journey as
          </p>
          <div className="couple">Jaswanth &amp; Harika</div>
          <div className="divider"><span className="l" />✦<span className="l" /></div>
          <p>
            exchange vows and step into forever together. <br />
            Your presence is the greatest blessing we could ask for.
          </p>
        </Reveal>
      </section>

      <section className="section events">
        <Reveal variant="fade-up"><div className="mono kicker">✦ The Celebrations ✦</div></Reveal>
        <Reveal variant="fade-up"><h2>Three days of love</h2></Reveal>
        <div className="event-grid">
          <Reveal variant="fade-left" className="event-card card-haldi">
            <div className="num">01 / HALDI</div>
            <h3>Haldi Ceremony</h3>
            <div className="date">
              <span className="day">03</span>
              <span className="my">Sep<br />2026</span>
            </div>
            <div className="venue">
              <strong>Bride's Residence</strong>
              Manuguru
            </div>
            <div className="tag">Dress Code · Yellow</div>
          </Reveal>

          <Reveal variant="fade-up" className="event-card card-wedding">
            <div className="num">02 / WEDDING</div>
            <h3>The Big Day</h3>
            <div className="date">
              <span className="day">04</span>
              <span className="my">Sep<br />2026</span>
              <span className="my">10:00 AM</span>
            </div>
            <div className="venue">
              <strong>Community Hall</strong>
              Manuguru
            </div>
            <a className="map-link" href="https://www.google.com/maps/place/COMMUNITY+HALL/@17.9088119,80.7997859,17z/data=!3m1!4b1!4m6!3m5!1s0x3a33fe1a6e1582ff:0x79419ba47e9ae6d5!8m2!3d17.9088119!4d80.7997859!16s%2Fg%2F11gcxz0_d3" target="_blank" rel="noopener noreferrer">📍 View on Map</a>
          </Reveal>

          <Reveal variant="fade-right" className="event-card card-reception">
            <div className="num">03 / RECEPTION</div>
            <h3>Reception</h3>
            <div className="date">
              <span className="day">06</span>
              <span className="my">Sep<br />2026</span>
              <span className="my">07:00 PM</span>
            </div>
            <div className="venue">
              <strong>Gowtham Grand</strong>
              Tenali
            </div>
            <a className="map-link" href="https://maps.app.goo.gl/e5RMAyrKEgwF3HqJ9" target="_blank" rel="noopener noreferrer">📍 View on Map</a>
          </Reveal>
        </div>
      </section>

      <section className="section footer">
        <Reveal variant="fade-up"><div className="mono" style={{ color: "var(--gold)" }}>✦ Join us in celebrating ✦</div></Reveal>
        <Reveal variant="fade-scale"><div className="big-hash" style={{ marginTop: 20 }}>#JasWonHarika</div></Reveal>
        <Reveal variant="fade-up"><div className="thanks mono">With love · Jaswanth &amp; Harika</div></Reveal>
      </section>
    </div>
  );
}
