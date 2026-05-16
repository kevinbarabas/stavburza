import { useState, useMemo } from "react";

const SITE = { name:"StavBurza", color:"#1e4fa0", accent:"#f0a500" };

const CATS = [
  {id:"zaklady",label:"Základy",icon:"⛏️",color:"#7D5A3C"},
  {id:"murivo",label:"Murivo",icon:"🧱",color:"#C0392B"},
  {id:"strechy",label:"Strechy",icon:"🏠",color:"#1A252F"},
  {id:"izolacie",label:"Izolácie",icon:"🧶",color:"#117A65"},
  {id:"podlahy",label:"Podlahy",icon:"🟫",color:"#1E8449"},
  {id:"elektro",label:"Elektroinšt.",icon:"⚡",color:"#B7950B"},
  {id:"voda",label:"Vodoinšt.",icon:"🚿",color:"#1F618D"},
  {id:"fasady",label:"Fasády",icon:"🏘️",color:"#884EA0"},
  {id:"dvere",label:"Dvere & Okná",icon:"🚪",color:"#5D6D7E"},
  {id:"chemia",label:"Stav. chémia",icon:"🧪",color:"#7D3C98"},
  {id:"zahrada",label:"Záhrada",icon:"🌿",color:"#27AE60"},
  {id:"naradie",label:"Náradie",icon:"🔨",color:"#6E2F1A"},
];

const PRODUCTS = [
  {id:1,name:"Portland Cement CEM I 42.5 R",cat:"zaklady",unit:"25 kg",price1:8.70,price2:9.50,sellers:4,desc:"Rýchlotuhnúci portland cement pre betónové zmesi a omietky. EN 197-1, CE, STN.",icon:"🏗️",stock:"Skladom"},
  {id:2,name:"Tehla plná NF 290×140×65 mm",cat:"murivo",unit:"1 ks",price1:0.26,price2:0.32,sellers:3,desc:"Klasická plná páľená tehla P15 pre nosné murivo, piliere a pivnice.",icon:"🧱",stock:"Skladom"},
  {id:3,name:"Tvárnica Ytong P2-400 | 300 mm",cat:"murivo",unit:"1 ks",price1:4.10,price2:4.50,sellers:3,desc:"Pórobetónová tvárnica pre obvodové murivo. Lambda 0,11 W/mK. CE, ETA.",icon:"🏗️",stock:"Skladom"},
  {id:4,name:"Strešná škridľa Bramac Alpská",cat:"strechy",unit:"1 ks",price1:1.05,price2:1.25,sellers:3,desc:"Betónová strešná škridľa. 9,8 ks/m², min. sklon 17°. Záruka 30 rokov.",icon:"🏠",stock:"Skladom"},
  {id:5,name:"Rockwool Fasrock 100mm",cat:"izolacie",unit:"m²",price1:8.40,price2:8.90,sellers:3,desc:"Kamenná vata pre ETICS zateplenie fasád. Trieda reakcie na oheň A1.",icon:"🧶",stock:"Skladom"},
  {id:6,name:"Keramická dlažba RAKO Taurus 30×30",cat:"podlahy",unit:"m²",price1:11.90,price2:13.80,sellers:3,desc:"Matná keramická dlažba R10. Mrazuvzdorná. Vhodná do interiéru aj exteriéru.",icon:"🟫",stock:"Posledné kusy"},
  {id:7,name:"Vinylová podlaha Afirmax SPC 4mm",cat:"podlahy",unit:"m²",price1:9.80,price2:10.40,sellers:2,desc:"Vodonepriepustná SPC vinyl s IXPE tlmením. Kliková inštalácia. AC4.",icon:"🪵",stock:"Skladom"},
  {id:8,name:"Fasádna farba Baumit Nano Pore 15L",cat:"fasady",unit:"15 L",price1:65.90,price2:72.00,sellers:3,desc:"Silikátová fasádna farba. Hydrofóbna, priedušná. 3000+ odtieňov. VOC A/a.",icon:"🧪",stock:"Posledné kusy"},
  {id:9,name:"Armovacie pruty R10 B500B / 6m",cat:"zaklady",unit:"1 ks",price1:4.60,price2:5.20,sellers:2,desc:"Rebrované armovacie pruty Ø10 mm, dĺžka 6m. Oceľ B500B. EN 10080, CE.",icon:"🔩",stock:"Skladom"},
  {id:10,name:"Rúrka PPR PN20 Ø25 mm / 4m",cat:"voda",unit:"1 ks",price1:3.40,price2:3.80,sellers:2,desc:"Polypropylénová rúrka pre rozvod teplej a studenej vody. PN20. EN ISO 15874.",icon:"🚿",stock:"Skladom"},
  {id:11,name:"Sadrokartón GKB 12,5 mm",cat:"fasady",unit:"1 doska",price1:6.60,price2:7.20,sellers:3,desc:"Štandardná sadrokartónová doska 1250×2000 mm pre priečky a podhľady. EN 520.",icon:"📋",stock:"Skladom"},
  {id:12,name:"Elektroinšt. rúrka Koruflex Ø25 / 50m",cat:"elektro",unit:"rola",price1:18.90,price2:21.00,sellers:2,desc:"Ohybná vlnitá rúrka pre ochranu káblov v murive. IP43, trieda B2. EN 61386.",icon:"⚡",stock:"Skladom"},
];

const SERVICES = [
  {id:1,name:"Ján Horváth",trade:"Elektrikár",city:"Košice",rating:4.9,reviews:47,price:"od 25 €/hod",badge:true,available:true,desc:"Elektroinštalácie, rekonštrukcie, revízie. 15 rokov praxe."},
  {id:2,name:"Peter Kováč",trade:"Vodár / Kúrenár",city:"Prešov",rating:4.7,reviews:31,price:"od 22 €/hod",badge:true,available:true,desc:"Rozvody vody, kúrenie, podlahové vykurovanie, kotly."},
  {id:3,name:"Martin Novák",trade:"Murár",city:"Bratislava",rating:4.8,reviews:62,price:"od 18 €/hod",badge:false,available:false,desc:"Murárske práce, omietky, obklady, dlažby."},
  {id:4,name:"Rastislav Šimko",trade:"Tesár / Strecha",city:"Žilina",rating:4.6,reviews:28,price:"od 20 €/hod",badge:true,available:true,desc:"Drevené konštrukcie, krovy, zateplenie strechy."},
  {id:5,name:"Lukáš Baláž",trade:"Maliar",city:"Nitra",rating:4.5,reviews:19,price:"od 15 €/hod",badge:false,available:true,desc:"Maľovanie, štukátor, dekoratívne omietky, fasády."},
  {id:6,name:"Michal Varga",trade:"Inštalatér",city:"Košice",rating:5.0,reviews:14,price:"od 28 €/hod",badge:true,available:true,desc:"Plynofikácia, plynové spotrebiče, servisy. Certifikovaný."},
  {id:7,name:"Igor Mináč",trade:"Stolár",city:"Martin",rating:4.9,reviews:55,price:"od 20 €/hod",badge:true,available:true,desc:"Nábytok na mieru, dvere, okná, schody."},
  {id:8,name:"Marek Sloboda",trade:"Obkladač",city:"Banská Bystrica",rating:4.9,reviews:41,price:"od 22 €/hod",badge:true,available:true,desc:"Keramické obklady, dlažby, kúpeľne a kuchyne."},
];

const FAQ = [
  {q:"Je vyhľadávanie zdarma?",a:"Áno, pre zákazníkov je porovnávanie cien úplne zdarma. Predajcovia platia malú províziu alebo mesačný paušál."},
  {q:"Ako funguje overenie remeselníkov?",a:"Každý remeselník prechádza manuálnym overením — kontrolujeme IČO cez Finstat, referencie a kontaktné údaje."},
  {q:"Sú ceny aktuálne?",a:"Predajcovia s API napojením aktualizujú ceny automaticky každých 24 hodín. Manuálni predajcovia aktualizujú ceny sami."},
  {q:"Ako pridám svoju predajňu?",a:"Klikni na 'Predávaj tu'. Môžeš sa napojiť cez API (WooCommerce, Shoptet, XML) alebo zadávať ceny manuálne."},
  {q:"Čo je projektová kalkulačka?",a:"Nástroj kde zadáš plochu a typ projektu — dostaneš odhadovaný zoznam materiálu s množstvami a cenami."},
  {q:"Môžem požiadať o cenovú ponuku?",a:"Áno — pri každom produkte je možnosť poslať dopyt viacerým predajcom naraz a porovnať ich ponuky."},
];

const TRADE_CATS = ["Všetky","Elektrikár","Vodár / Kúrenár","Murár","Tesár / Strecha","Maliar","Inštalatér","Stolár","Obkladač"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const f = {fontFamily:"'Sora','Segoe UI',sans-serif"};
const card = {background:"#fff",borderRadius:12,border:"1px solid #e8edfa",padding:"13px 14px"};

function Stars({r}) {
  return <span style={{color:"#e67e22",fontSize:"0.74rem"}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))} <span style={{color:"#aaa"}}>{r}</span></span>;
}

function Btn({children,onClick,bg,color,style={}}) {
  return <button onClick={onClick} style={{padding:"8px 14px",borderRadius:9,border:"none",background:bg||SITE.color,color:color||"#fff",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",...f,...style}}>{children}</button>;
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetail({p,onClose,wishlist,toggleWish,compareList,toggleCompare}) {
  const [tab,setTab] = useState("ceny");
  const [alertP,setAlertP] = useState("");
  const [alerted,setAlerted] = useState(false);
  const [chatMsg,setChatMsg] = useState("");
  const [chatLog,setChatLog] = useState([]);
  const [quoteSent,setQuoteSent] = useState(false);
  const [quoteOpen,setQuoteOpen] = useState(false);
  const inW = wishlist.includes(p.id);
  const inC = compareList.includes(p.id);

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChatLog(l => [...l, {from:"ja",text:chatMsg}, {from:"predajca",text:"Ďakujeme! Odpovieme do 24 hodín."}]);
    setChatMsg("");
  };

  const tabs = [["ceny","💰 Ceny"],["parametre","📋 Parametre"],["recenzie","⭐ Recenzie"]];

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(10,10,30,0.7)",zIndex:1000,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"12px",overflowY:"auto"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:18,maxWidth:620,width:"100%",boxShadow:"0 24px 60px rgba(30,79,160,0.25)",overflow:"hidden",margin:"auto"}} onClick={e=>e.stopPropagation()}>

        {/* Header */}
        <div style={{background:"linear-gradient(135deg,#f0f4ff,#e8f0ff)",padding:"16px 18px 12px",borderBottom:"1px solid #e8edfa"}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{fontSize:"2.2rem"}}>{p.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:"1rem",color:"#1a1a2e",lineHeight:1.3}}>{p.name}</div>
              <div style={{fontSize:"0.75rem",color:"#777",marginTop:3,lineHeight:1.5}}>{p.desc}</div>
              <div style={{marginTop:6,display:"flex",alignItems:"center",gap:8}}>
                <span><span style={{fontSize:"0.68rem",color:"#bbb"}}>od </span><span style={{fontWeight:800,fontSize:"1.2rem",color:"#1a1a2e"}}>{p.price1.toFixed(2)} €</span><span style={{fontSize:"0.72rem",color:"#aaa",marginLeft:3}}>/ {p.unit}</span></span>
                <span style={{fontSize:"0.72rem",color:"#1e4fa0",background:"#e8f0ff",padding:"2px 8px",borderRadius:999}}>{p.sellers} predajcov</span>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              <button onClick={onClose} style={{background:"#f0f4ff",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#888",fontSize:"0.9rem"}}>✕</button>
              <button onClick={()=>toggleWish(p.id)} style={{background:inW?"#fff0e6":"#f0f4ff",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:"0.9rem"}}>{inW?"❤️":"🤍"}</button>
              <button onClick={()=>toggleCompare(p.id)} style={{background:inC?"#e8f0ff":"#f0f4ff",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:"0.75rem",fontWeight:700,color:inC?"#1e4fa0":"#aaa"}}>{inC?"✓":"⚖"}</button>
            </div>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",marginTop:12,borderBottom:"2px solid #e8edfa"}}>
            {tabs.map(([id,label]) => <button key={id} onClick={()=>setTab(id)} style={{padding:"6px 12px",border:"none",background:"transparent",cursor:"pointer",fontSize:"0.78rem",fontWeight:700,color:tab===id?"#1e4fa0":"#aaa",borderBottom:tab===id?"2px solid #1e4fa0":"2px solid transparent",marginBottom:-2,...f}}>{label}</button>)}
          </div>
        </div>

        <div style={{padding:"16px 18px",overflowY:"auto",maxHeight:"62vh"}}>

          {/* CENY TAB */}
          {tab==="ceny"&&<>
            {/* Action buttons */}
            <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
              <button onClick={()=>setQuoteOpen(o=>!o)} style={{flex:1,padding:"9px 0",borderRadius:9,border:"none",background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",color:"#fff",fontWeight:800,fontSize:"0.82rem",cursor:"pointer",...f,minWidth:120}}>📋 Dopyt na cenu</button>
              <button onClick={()=>navigator.clipboard?.writeText(`${p.name} od ${p.price1}€ na ${SITE.name}.sk`)||alert("Link skopírovaný!")} style={{padding:"9px 14px",borderRadius:9,border:"1.5px solid #e0e6f5",background:"#fff",color:"#1e4fa0",fontWeight:700,fontSize:"0.8rem",cursor:"pointer",...f}}>🔗 Zdieľať</button>
            </div>

            {/* Quote form */}
            {quoteOpen&&!quoteSent&&<div style={{...card,marginBottom:12,border:"1px solid #dde3f5"}}>
              <div style={{fontWeight:700,fontSize:"0.8rem",color:"#1a1a2e",marginBottom:8}}>📋 Dopyt na cenu — odošleme všetkým predajcom</div>
              {[["Meno *","text","Ján Novák"],["E-mail *","email","jan@email.sk"],["Množstvo","text",`napr. 50 ${p.unit}`]].map(([l,t,ph],i)=><div key={i} style={{marginBottom:8}}><div style={{fontSize:"0.7rem",fontWeight:700,color:"#666",marginBottom:3}}>{l}</div><input type={t} placeholder={ph} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.84rem",...f,boxSizing:"border-box",outline:"none"}}/></div>)}
              <div style={{display:"flex",gap:7}}><Btn onClick={()=>setQuoteOpen(false)} bg="#f0f4ff" color="#888">Zavrieť</Btn><Btn onClick={()=>{setQuoteSent(true);setQuoteOpen(false);}}>Odoslať dopyt →</Btn></div>
            </div>}
            {quoteSent&&<div style={{...card,marginBottom:12,background:"#e8f8ef",border:"1px solid #b8e0c8",textAlign:"center",padding:"10px"}}>✅ <b>Dopyt odoslaný!</b> Predajcovia ti odpovedia do 24 hodín.</div>}

            {/* Price alert */}
            <div style={{background:"#fff8e6",borderRadius:11,padding:"10px 13px",marginBottom:12,border:"1px solid #f0d080"}}>
              <span style={{fontSize:"0.76rem",fontWeight:700,color:"#b8860b"}}>🔔 Cenový alert — upozorni ma keď cena klesne pod:</span>
              {!alerted?<div style={{display:"flex",gap:7,marginTop:7}}>
                <input value={alertP} onChange={e=>setAlertP(e.target.value)} type="number" placeholder={`napr. ${(p.price1*0.9).toFixed(2)}`} style={{flex:1,padding:"7px 10px",borderRadius:8,border:"1.5px solid #f0d080",fontSize:"0.82rem",...f,outline:"none"}}/>
                <Btn onClick={()=>{if(alertP)setAlerted(true);}} bg="#e6a800">Nastaviť</Btn>
              </div>:<div style={{color:"#1a7a4a",fontWeight:700,fontSize:"0.8rem",marginTop:5}}>✓ Alert nastavený na {parseFloat(alertP).toFixed(2)} €!</div>}
            </div>

            {/* Sellers */}
            <div style={{fontWeight:700,fontSize:"0.74rem",color:"#888",textTransform:"uppercase",letterSpacing:0.7,marginBottom:8}}>Porovnanie predajcov</div>
            {[{name:"Hornbach SK",price:p.price1,rating:4.7,city:"Žilina",stock:p.stock,type:"api"},{name:"StavMat SK",price:(p.price1+p.price2)/2,rating:4.8,city:"Košice",stock:"Skladom",type:"api"},{name:"Lokálny predajca",price:p.price2,rating:4.4,city:"Prešov",stock:"Skladom",type:"manual"}].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 0",borderBottom:i<2?"1px solid #f4f6ff":"none"}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:i===0?"#1a7a4a":"#dde3f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.63rem",fontWeight:700,color:i===0?"#fff":"#888",flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:"0.84rem",color:"#1a1a2e",display:"flex",gap:5,alignItems:"center"}}>{s.name} <span style={{fontSize:"0.6rem",padding:"1px 5px",borderRadius:999,background:s.type==="api"?"#e8f0ff":"#fff5e6",color:s.type==="api"?"#1e4fa0":"#e67e22",fontWeight:700}}>{s.type==="api"?"⚡ API":"✏️"}</span></div>
                <div style={{fontSize:"0.69rem",color:"#bbb",marginTop:1}}>⭐{s.rating} · 📍{s.city}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,color:i===0?"#1a7a4a":"#1a1a2e",fontSize:"0.98rem"}}>{s.price.toFixed(2)} €</div>
                <div style={{fontSize:"0.63rem",fontWeight:700,color:s.stock==="Skladom"?"#1a7a4a":"#e67e22"}}>● {s.stock}</div>
              </div>
              <Btn style={{fontSize:"0.72rem",padding:"6px 10px"}}>Kúpiť</Btn>
            </div>)}

            {/* Chat */}
            <div style={{marginTop:12,...card,border:"1px solid #e0e6f5"}}>
              <div style={{fontWeight:700,fontSize:"0.78rem",color:"#1a1a2e",marginBottom:7}}>💬 Napíš predajcovi</div>
              <div style={{maxHeight:100,overflowY:"auto",marginBottom:7}}>
                {chatLog.map((m,i)=><div key={i} style={{marginBottom:5,textAlign:m.from==="ja"?"right":"left"}}><span style={{display:"inline-block",background:m.from==="ja"?"#1e4fa0":"#e8edfa",color:m.from==="ja"?"#fff":"#1a1a2e",borderRadius:9,padding:"4px 9px",fontSize:"0.76rem",maxWidth:"80%"}}>{m.text}</span></div>)}
              </div>
              <div style={{display:"flex",gap:6}}>
                <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Správa..." style={{flex:1,padding:"7px 10px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.83rem",...f,outline:"none"}}/>
                <Btn onClick={sendChat} style={{padding:"7px 12px"}}>→</Btn>
              </div>
            </div>
          </>}

          {/* PARAMETRE TAB */}
          {tab==="parametre"&&<>
            <div style={{marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:"0.74rem",color:"#888",textTransform:"uppercase",letterSpacing:0.7,marginBottom:9}}>Technické parametre</div>
              {[["Kategória",CATS.find(c=>c.id===p.cat)?.label||p.cat],["Jednotka",p.unit],["Stav skladu",p.stock],["Počet predajcov",`${p.sellers} predajcov`],["Rozsah cien",`${p.price1.toFixed(2)} € – ${p.price2.toFixed(2)} €`]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 12px",background:i%2===0?"#f7f9ff":"#fff",borderRadius:8,marginBottom:1}}>
                <span style={{fontSize:"0.76rem",color:"#888"}}>{k}</span>
                <span style={{fontSize:"0.76rem",color:"#1a1a2e",fontWeight:700}}>{v}</span>
              </div>)}
            </div>
            {/* Calculator */}
            <div style={{background:"#f0f4ff",borderRadius:12,padding:"13px 14px"}}>
              <div style={{fontWeight:700,fontSize:"0.78rem",color:"#1e4fa0",marginBottom:8}}>🧮 Kalkulačka množstva</div>
              <CalcWidget product={p}/>
            </div>
          </>}

          {/* RECENZIE TAB */}
          {tab==="recenzie"&&<>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14,...card,background:"#f7f9ff"}}>
              <div style={{textAlign:"center"}}><div style={{fontWeight:800,fontSize:"1.8rem",color:"#1a1a2e",lineHeight:1}}>4.7</div><Stars r={4.7}/><div style={{fontSize:"0.68rem",color:"#aaa",marginTop:2}}>312 recenzií</div></div>
              <div style={{flex:1}}>{[5,4,3,2,1].map(s=>{const c=s===5?60:s===4?25:s===3?10:s===2?3:2;return <div key={s} style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><span style={{fontSize:"0.65rem",color:"#e67e22",width:12}}>{"★".repeat(s)}</span><div style={{flex:1,height:5,background:"#e8edfa",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",background:"#e67e22",borderRadius:3,width:`${c}%`}}/></div><span style={{fontSize:"0.65rem",color:"#aaa",width:18,textAlign:"right"}}>{c}%</span></div>;})} </div>
            </div>
            {[{a:"Marek S.",r:5,t:"Výborná kvalita, dodávka na čas. Cement mal presne deklarované parametre.",d:"12.4.2025"},{a:"Jana K.",r:4,t:"Dobrá cena, dodacia lehota sa o deň predĺžila. Inak spokojná.",d:"3.3.2025"},{a:"Peter V.",r:5,t:"Opakovaný nákup, vždy kvalita. Odporúčam StavMat SK.",d:"18.2.2025"}].map((r,i)=><div key={i} style={{borderBottom:i<2?"1px solid #f0f4ff":"none",paddingBottom:10,marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}><div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#1e4fa0,#3a7bd5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"0.76rem"}}>{r.a[0]}</div><div><div style={{fontWeight:700,fontSize:"0.82rem",color:"#1a1a2e"}}>{r.a}</div><Stars r={r.r}/></div><span style={{marginLeft:"auto",fontSize:"0.66rem",color:"#bbb"}}>{r.d}</span></div>
              <div style={{fontSize:"0.79rem",color:"#555",lineHeight:1.5,paddingLeft:33}}>{r.t}</div>
            </div>)}
            <Btn onClick={()=>{}} bg="#f0f4ff" color="#1e4fa0" style={{width:"100%",marginTop:4}}>+ Napísať recenziu</Btn>
          </>}
        </div>
      </div>
    </div>
  );
}

function CalcWidget({product:p}) {
  const [val,setVal] = useState("");
  const [qty,setQty] = useState(null);
  const label = p.cat==="zaklady"?"Plocha / objem":p.cat==="strechy"?"Plocha strechy (m²)":"Plocha (m²)";
  const factor = p.cat==="murivo"?66:p.cat==="strechy"?9.8:1;
  const calc = () => { const n=parseFloat(val); if(isNaN(n)||n<=0){setQty(null);return;} setQty(Math.ceil(n*factor)); };
  return <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"flex-end"}}>
    <div style={{flex:"1 1 120px"}}><div style={{fontSize:"0.68rem",color:"#888",marginBottom:3}}>{label}</div><input value={val} onChange={e=>setVal(e.target.value)} type="number" placeholder="napr. 25" style={{width:"100%",padding:"7px 10px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.84rem",...f,boxSizing:"border-box",outline:"none"}}/></div>
    <Btn onClick={calc}>Vypočítať</Btn>
    {qty!==null&&<div style={{background:"#1a7a4a",color:"#fff",borderRadius:8,padding:"7px 12px",fontWeight:800,fontSize:"0.84rem"}}>≈ {qty} {p.unit}{qty>1?"":""}</div>}
    {qty!==null&&<div style={{width:"100%",fontSize:"0.73rem",color:"#1e4fa0",fontWeight:600}}>Odhad: {(qty*p.price1).toFixed(2)} €</div>}
  </div>;
}

// ─── PROJECT CALC ─────────────────────────────────────────────────────────────
function ProjectCalc({onClose}) {
  const [area,setArea] = useState("");
  const [type,setType] = useState("nova");
  const [result,setResult] = useState(null);
  const calc = () => {
    const a = parseFloat(area); if(isNaN(a)||a<=0) return;
    const h = 2.6, walls = 2*(Math.sqrt(a)*4)*h;
    setResult([
      {name:"Cement CEM I 42.5 R",qty:Math.ceil(a/5),unit:"vreciek",price:8.70,icon:"🏗️"},
      {name:"Tehla plná NF",qty:Math.ceil(walls*66/15),unit:"kusov",price:0.26,icon:"🧱"},
      {name:"Omietková zmes",qty:Math.ceil(walls*1.5/25),unit:"vreciek",price:9.80,icon:"🪣"},
      {name:"Sadrokartón",qty:Math.ceil(walls/2),unit:"dosiek",price:6.60,icon:"📋"},
      {name:"Keramická dlažba",qty:Math.ceil(a*1.1),unit:"m²",price:11.90,icon:"🟫"},
      {name:"Keramický obklad",qty:Math.ceil(walls*0.2),unit:"m²",price:18.90,icon:"🏛️"},
      {name:"Minerálna vata",qty:Math.ceil(a),unit:"m²",price:8.40,icon:"🧶"},
      {name:"Fasádna farba",qty:Math.ceil(walls/50),unit:"vedier",price:65.90,icon:"🧪"},
    ]);
  };
  const total = result ? result.reduce((s,i)=>s+i.qty*i.price,0) : 0;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(10,10,30,0.7)",zIndex:1500,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"12px",overflowY:"auto"}} onClick={onClose}>
      <div style={{background:"#fff",borderRadius:18,maxWidth:560,width:"100%",boxShadow:"0 24px 60px rgba(30,79,160,0.28)",overflow:"hidden",margin:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{color:"#fff",fontWeight:800,fontSize:"0.98rem"}}>🏗️ Projektová kalkulačka</div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",color:"#fff"}}>✕</button>
        </div>
        <div style={{padding:"16px 18px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            <div><div style={{fontSize:"0.72rem",fontWeight:700,color:"#555",marginBottom:3}}>Plocha podlažia (m²)</div><input value={area} onChange={e=>setArea(e.target.value)} type="number" placeholder="napr. 80" style={{width:"100%",padding:"8px 11px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.88rem",...f,boxSizing:"border-box",outline:"none"}}/></div>
            <div><div style={{fontSize:"0.72rem",fontWeight:700,color:"#555",marginBottom:3}}>Typ projektu</div><select value={type} onChange={e=>setType(e.target.value)} style={{width:"100%",padding:"8px 11px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.88rem",...f,boxSizing:"border-box",outline:"none",background:"#fff"}}><option value="nova">Nová stavba</option><option value="rekonstrukcia">Rekonštrukcia</option><option value="pristavba">Prístavba</option></select></div>
          </div>
          <Btn onClick={calc} style={{width:"100%",padding:"11px 0",fontSize:"0.9rem",marginBottom:result?14:0}}>Vypočítať zoznam materiálu →</Btn>
          {result&&<>
            {result.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:i<result.length-1?"1px solid #f0f4ff":"none"}}>
              <span style={{fontSize:"0.95rem",width:22,textAlign:"center"}}>{item.icon}</span>
              <div style={{flex:1}}><div style={{fontSize:"0.81rem",fontWeight:700,color:"#1a1a2e"}}>{item.name}</div><div style={{fontSize:"0.68rem",color:"#aaa"}}>od {item.price} € / {item.unit.replace(/iek|ov|á/,"")}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontWeight:800,color:"#1e4fa0",fontSize:"0.9rem"}}>{item.qty.toLocaleString("sk-SK")} {item.unit}</div><div style={{fontSize:"0.68rem",color:"#888"}}>≈ {(item.qty*item.price).toFixed(0)} €</div></div>
            </div>)}
            <div style={{marginTop:12,background:"linear-gradient(135deg,#f0f4ff,#e8f0ff)",borderRadius:11,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontWeight:700,fontSize:"0.82rem",color:"#1e4fa0"}}>Celkový odhad</div><div style={{fontSize:"0.69rem",color:"#aaa",marginTop:2}}>Pri najnižších cenách · orientačne</div></div>
              <div style={{fontWeight:800,fontSize:"1.35rem",color:"#1a1a2e"}}>{total.toFixed(0)} €</div>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,setTab] = useState("uvod");
  const [prodSearch,setProdSearch] = useState("");
  const [heroSearch,setHeroSearch] = useState("");
  const [activeCat,setActiveCat] = useState(null);
  const [tradeCat,setTradeCat] = useState("Všetky");
  const [tradeSearch,setTradeSearch] = useState("");
  const [modal,setModal] = useState(null);
  const [showCalc,setShowCalc] = useState(false);
  const [wishlist,setWishlist] = useState([]);
  const [compareList,setCompareList] = useState([]);
  const [showWish,setShowWish] = useState(false);
  const [faqOpen,setFaqOpen] = useState(null);
  const [showSvcForm,setShowSvcForm] = useState(false);
  const [svcSent,setSvcSent] = useState(false);

  const toggleWish = id => setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const toggleCompare = id => setCompareList(c=>c.includes(id)?c.filter(x=>x!==id):c.length<4?[...c,id]:c);

  const q = prodSearch || heroSearch;
  const filteredProds = useMemo(()=>PRODUCTS.filter(p=>{
    if(activeCat && p.cat!==activeCat) return false;
    if(q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.desc.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }),[activeCat,q]);

  const filteredSvc = useMemo(()=>SERVICES.filter(t=>{
    if(tradeCat!=="Všetky" && t.trade!==tradeCat) return false;
    if(tradeSearch && !t.name.toLowerCase().includes(tradeSearch.toLowerCase()) && !t.trade.toLowerCase().includes(tradeSearch.toLowerCase())) return false;
    return true;
  }),[tradeCat,tradeSearch]);

  const S = {fontFamily:"'Sora','Segoe UI',sans-serif",fontSize:"0.82rem"};

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#f0f4ff 0%,#fafbff 50%,#f5f0ff 100%)",fontFamily:"'Sora','Segoe UI',sans-serif",fontSize:"0.82rem",color:"#1a1a2e",paddingBottom:20}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Mono:wght@500;700&display=swap" rel="stylesheet"/>

      {modal && <ProductDetail p={modal} onClose={()=>setModal(null)} wishlist={wishlist} toggleWish={toggleWish} compareList={compareList} toggleCompare={toggleCompare}/>}
      {showCalc && <ProjectCalc onClose={()=>setShowCalc(false)}/>}

      {/* Wishlist overlay */}
      {showWish && <div style={{position:"fixed",inset:0,background:"rgba(10,10,30,0.7)",zIndex:1500,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowWish(false)}>
        <div style={{background:"#fff",borderRadius:18,maxWidth:480,width:"100%",padding:"18px 18px",boxShadow:"0 24px 60px rgba(30,79,160,0.25)"}} onClick={e=>e.stopPropagation()}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><div style={{fontWeight:800,fontSize:"1rem"}}>❤️ Obľúbené ({wishlist.length})</div><button onClick={()=>setShowWish(false)} style={{background:"#f0f4ff",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer"}}>✕</button></div>
          {wishlist.length===0?<div style={{textAlign:"center",padding:"24px 0",color:"#ccc"}}><div style={{fontSize:"2rem",marginBottom:6}}>🤍</div><div>Žiadne obľúbené produkty</div></div>:
            PRODUCTS.filter(p=>wishlist.includes(p.id)).map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i>0?"none":"1px solid #f0f4ff"}}>
              <span style={{fontSize:"1.3rem"}}>{p.icon}</span>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:"0.86rem"}}>{p.name}</div><div style={{fontSize:"0.7rem",color:"#aaa"}}>{p.price1.toFixed(2)} € / {p.unit}</div></div>
              <Btn onClick={()=>{setShowWish(false);setModal(p);}} style={{fontSize:"0.74rem",padding:"6px 11px"}}>Detail</Btn>
              <button onClick={()=>toggleWish(p.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.85rem",color:"#e74c3c"}}>🗑</button>
            </div>)}
        </div>
      </div>}

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1a1a2e 0%,#1e4fa0 100%)",padding:"0 14px",boxShadow:"0 4px 22px rgba(30,79,160,0.25)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"11px 0 7px",flexWrap:"wrap"}}>
            <div onClick={()=>setTab("uvod")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:"1.35rem"}}>🏗️</span>
              <div>
                <div style={{color:"#fff",fontWeight:800,fontSize:"1.1rem",letterSpacing:-0.5}}>{SITE.name}<span style={{color:SITE.accent}}>.sk</span></div>
                <div style={{color:"#a0b8e8",fontSize:"0.6rem",fontWeight:600}}>Porovnaj ceny stavebného materiálu</div>
              </div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
              <button onClick={()=>setShowCalc(true)} style={{padding:"6px 10px",borderRadius:7,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.12)",color:"#fff",fontWeight:700,fontSize:"0.7rem",cursor:"pointer",fontFamily:"'Sora','Segoe UI',sans-serif"}}>🏗️ Kalkulačka</button>
              <button onClick={()=>setShowWish(true)} style={{padding:"6px 10px",borderRadius:7,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.12)",color:"#fff",fontWeight:700,fontSize:"0.7rem",cursor:"pointer",fontFamily:"'Sora','Segoe UI',sans-serif",position:"relative"}}>
                ❤️ {wishlist.length>0&&<span style={{position:"absolute",top:-5,right:-5,background:"#e74c3c",color:"#fff",borderRadius:"50%",width:15,height:15,fontSize:"0.58rem",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{wishlist.length}</span>}
              </button>
              {compareList.length>=2&&<button onClick={()=>alert(`Porovnávaš: ${PRODUCTS.filter(p=>compareList.includes(p.id)).map(p=>p.name).join(" vs ")}`)} style={{padding:"6px 10px",borderRadius:7,border:"1.5px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.15)",color:"#fff",fontWeight:800,fontSize:"0.7rem",cursor:"pointer",fontFamily:"'Sora','Segoe UI',sans-serif"}}>⚖️ ({compareList.length})</button>}
              <button onClick={()=>setTab("predaj")} style={{padding:"6px 9px",borderRadius:7,border:"none",background:SITE.accent,color:"#1a1a2e",fontWeight:800,fontSize:"0.7rem",cursor:"pointer",fontFamily:"'Sora','Segoe UI',sans-serif"}}>🏪 Predávaj tu</button>
            </div>
          </div>
          <div style={{display:"flex"}}>
            {[["uvod","🏠 Domov"],["material","🔩 Materiál"],["sluzby","🔧 Služby"]].map(([id,label])=><button key={id} onClick={()=>setTab(id)} style={{padding:"8px 15px",border:"none",background:"transparent",cursor:"pointer",color:tab===id?"#fff":"#7090c8",fontWeight:800,fontSize:"0.82rem",fontFamily:"'Sora','Segoe UI',sans-serif",borderBottom:tab===id?`3px solid ${SITE.accent}`:"3px solid transparent"}}>{label}</button>)}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"16px 12px"}}>

        {/* ── DOMOV ── */}
        {tab==="uvod"&&<>
          {/* Hero */}
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",borderRadius:18,padding:"30px 22px",marginBottom:16,textAlign:"center"}}>
            <div style={{fontSize:"2rem",marginBottom:8}}>🏗️</div>
            <div style={{fontWeight:800,fontSize:"1.5rem",color:"#fff",lineHeight:1.25,marginBottom:8}}>{SITE.name} — porovnaj ceny<br/><span style={{color:SITE.accent}}>stavebného materiálu</span></div>
            <div style={{fontSize:"0.85rem",color:"#a0b8e8",marginBottom:18}}>34 overených predajcov · 89 remeselníkov · 1 247 produktov</div>
            <div style={{display:"flex",gap:8,maxWidth:500,margin:"0 auto",flexWrap:"wrap"}}>
              <div style={{position:"relative",flex:1,minWidth:180}}>
                <input value={heroSearch} onChange={e=>setHeroSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(setTab("material"))} placeholder="Hľadaj cement, tehly, izoláciu..." style={{width:"100%",padding:"12px 44px 12px 16px",borderRadius:12,border:"none",fontSize:"0.9rem",...S,boxSizing:"border-box",outline:"none"}}/>
                <span style={{position:"absolute",right:13,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
              </div>
              <button onClick={()=>setTab("material")} style={{padding:"12px 18px",borderRadius:12,border:"none",background:SITE.accent,color:"#1a1a2e",fontWeight:800,fontSize:"0.88rem",cursor:"pointer",...S}}>Hľadaj</button>
            </div>
            <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12,flexWrap:"wrap"}}>
              {["Cement","Tehly","Ytong","Izolácia","Dlažba"].map(q=><button key={q} onClick={()=>{setHeroSearch(q);setTab("material");}} style={{padding:"5px 12px",borderRadius:999,border:"1.5px solid rgba(255,255,255,0.25)",background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:"0.74rem",fontWeight:600,cursor:"pointer",...S}}>{q}</button>)}
            </div>
          </div>

          {/* Trust bar */}
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",gap:6,flexWrap:"wrap",justifyContent:"space-around"}}>
            {[["🏪","34 predajcov","overených"],["🔧","89 remeselníkov","po celom SR"],["📦","1 247 produktov","17 kategórií"],["⭐","4.8 / 5","hodnotenie"],["🔒","HTTPS","zabezpečené"]].map(([icon,val,sub])=><div key={sub} style={{textAlign:"center",flex:"1 1 80px"}}><div style={{fontSize:"1rem",marginBottom:2}}>{icon}</div><div style={{fontWeight:800,fontSize:"0.84rem",color:"#fff"}}>{val}</div><div style={{fontSize:"0.62rem",color:"#a0b8e8"}}>{sub}</div></div>)}
          </div>

          {/* How it works */}
          <div style={{...card,marginBottom:16}}>
            <div style={{textAlign:"center",marginBottom:16}}><div style={{fontWeight:800,fontSize:"1.05rem",color:"#1a1a2e"}}>Ako to funguje?</div><div style={{fontSize:"0.78rem",color:"#888",marginTop:3}}>V 4 jednoduchých krokoch k najlepšej cene</div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12}}>
              {[["🔍","Vyhľadaj materiál","Napíš čo potrebuješ alebo vyber z 17 kategórií."],["📊","Porovnaj ceny","Vidíš ceny od všetkých predajcov vedľa seba."],["🛒","Kúp najlacnejšieho","Klikni na predajcu a objednaj priamo."],["🔧","Nájdi remeselníka","Overení odborníci v sekcii Služby."]].map(([icon,title,desc])=><div key={title} style={{textAlign:"center"}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:"#f0f4ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem",margin:"0 auto 8px"}}>{icon}</div>
                <div style={{fontWeight:700,fontSize:"0.8rem",color:"#1a1a2e",marginBottom:3}}>{title}</div>
                <div style={{fontSize:"0.72rem",color:"#888",lineHeight:1.5}}>{desc}</div>
              </div>)}
            </div>
          </div>

          {/* Popular categories */}
          <div style={{marginBottom:16}}>
            <div style={{fontWeight:800,fontSize:"0.97rem",color:"#1a1a2e",marginBottom:10}}>📂 Kategórie</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:7}}>
              {CATS.map(cat=><div key={cat.id} onClick={()=>{setActiveCat(cat.id);setTab("material");}} style={{...card,textAlign:"center",cursor:"pointer",padding:"10px 8px",transition:"all 0.12s",border:`1.5px solid #e8edfa`}} onMouseEnter={e=>e.currentTarget.style.borderColor=cat.color} onMouseLeave={e=>e.currentTarget.style.borderColor="#e8edfa"}>
                <div style={{fontSize:"1.3rem",marginBottom:4}}>{cat.icon}</div>
                <div style={{fontSize:"0.71rem",fontWeight:700,color:"#1a1a2e",lineHeight:1.3}}>{cat.label}</div>
              </div>)}
            </div>
          </div>

          {/* Featured products */}
          <div style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontWeight:800,fontSize:"0.97rem",color:"#1a1a2e"}}>🔥 Populárne produkty</div>
              <button onClick={()=>setTab("material")} style={{fontSize:"0.76rem",color:SITE.color,fontWeight:700,background:"none",border:"none",cursor:"pointer",...S}}>Zobraziť všetky →</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:9}}>
              {PRODUCTS.slice(0,6).map(p=><ProdCard key={p.id} p={p} onOpen={setModal} wishlist={wishlist} toggleWish={toggleWish} compareList={compareList} toggleCompare={toggleCompare}/>)}
            </div>
          </div>

          {/* CTA boxes */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
            <div onClick={()=>setTab("sluzby")} style={{background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",borderRadius:13,padding:"16px",cursor:"pointer"}}>
              <div style={{fontSize:"1.4rem",marginBottom:5}}>🔧</div>
              <div style={{color:"#fff",fontWeight:800,fontSize:"0.92rem",marginBottom:4}}>Nájdi remeselníka</div>
              <div style={{color:"#a0b8e8",fontSize:"0.73rem",lineHeight:1.5,marginBottom:8}}>89 overených odborníkov vo vašom okolí.</div>
              <div style={{color:SITE.accent,fontWeight:700,fontSize:"0.75rem"}}>Zobraziť →</div>
            </div>
            <div onClick={()=>setShowCalc(true)} style={{background:"linear-gradient(135deg,#1E8449,#27AE60)",borderRadius:13,padding:"16px",cursor:"pointer"}}>
              <div style={{fontSize:"1.4rem",marginBottom:5}}>🏗️</div>
              <div style={{color:"#fff",fontWeight:800,fontSize:"0.92rem",marginBottom:4}}>Projektová kalkulačka</div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:"0.73rem",lineHeight:1.5,marginBottom:8}}>Odhadni množstvo a cenu materiálu.</div>
              <div style={{color:"#fff",fontWeight:700,fontSize:"0.75rem"}}>Vyskúšať →</div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{...card,marginBottom:16}}>
            <div style={{fontWeight:800,fontSize:"0.97rem",color:"#1a1a2e",marginBottom:12}}>❓ Časté otázky</div>
            {FAQ.map((item,i)=><div key={i} style={{borderBottom:i<FAQ.length-1?"1px solid #f0f4ff":"none"}}>
              <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",background:"none",border:"none",cursor:"pointer",...S,textAlign:"left"}}>
                <span style={{fontWeight:700,fontSize:"0.83rem",color:"#1a1a2e",flex:1,paddingRight:10}}>{item.q}</span>
                <span style={{color:"#1e4fa0",fontSize:"0.85rem",transform:faqOpen===i?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",flexShrink:0}}>▼</span>
              </button>
              {faqOpen===i&&<div style={{fontSize:"0.79rem",color:"#555",lineHeight:1.65,paddingBottom:10,paddingRight:20}}>{item.a}</div>}
            </div>)}
          </div>

          {/* Seller CTA */}
          <div style={{background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",borderRadius:13,padding:"16px 18px",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1}}><div style={{color:"#fff",fontWeight:800,fontSize:"0.92rem",marginBottom:3}}>🏪 Predávaš stavebný materiál?</div><div style={{color:"#a0b8e8",fontSize:"0.73rem"}}>API, CSV alebo manuálne. Prvé 3 mesiace zdarma.</div></div>
            <button onClick={()=>setTab("predaj")} style={{padding:"9px 16px",borderRadius:9,border:"none",background:SITE.accent,color:"#1a1a2e",fontWeight:800,fontSize:"0.82rem",cursor:"pointer",...S,whiteSpace:"nowrap"}}>Začni predávať →</button>
          </div>
        </>}

        {/* ── MATERIÁL ── */}
        {tab==="material"&&<>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{position:"relative",flex:1,minWidth:180}}>
              <input value={prodSearch} onChange={e=>setProdSearch(e.target.value)} placeholder="Hľadaj produkt..." style={{width:"100%",padding:"9px 36px 9px 12px",borderRadius:10,border:"2px solid #e0e6f5",fontSize:"0.86rem",...S,boxSizing:"border-box",background:"#fff",outline:"none"}}/>
              <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
            </div>
            <button onClick={()=>setShowCalc(true)} style={{padding:"8px 12px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#1a1a2e,#1e4fa0)",color:"#fff",fontWeight:700,fontSize:"0.75rem",cursor:"pointer",...S,whiteSpace:"nowrap"}}>🏗️ Kalkulačka</button>
          </div>

          {/* Category pills */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            <button onClick={()=>setActiveCat(null)} style={{padding:"6px 12px",borderRadius:999,border:"2px solid",borderColor:!activeCat?"#1e4fa0":"#dde3f5",background:!activeCat?"#1e4fa0":"#fff",color:!activeCat?"#fff":"#1e4fa0",fontWeight:700,fontSize:"0.75rem",cursor:"pointer",...S}}>Všetky</button>
            {CATS.map(c=><button key={c.id} onClick={()=>setActiveCat(activeCat===c.id?null:c.id)} style={{padding:"6px 12px",borderRadius:999,border:"2px solid",borderColor:activeCat===c.id?c.color:"#dde3f5",background:activeCat===c.id?c.color:"#fff",color:activeCat===c.id?"#fff":c.color,fontWeight:700,fontSize:"0.75rem",cursor:"pointer",...S}}>{c.icon} {c.label}</button>)}
          </div>

          {compareList.length>0&&<div style={{display:"flex",gap:7,marginBottom:10,padding:"7px 10px",background:"#fff",borderRadius:9,border:"1px solid #e8edfa",flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:"0.72rem",color:"#888",fontWeight:600}}>⚖️ Porovnanie:</span>
            {compareList.map(id=>{const p=PRODUCTS.find(x=>x.id===id);return p?<span key={id} style={{display:"flex",alignItems:"center",gap:4,background:"#e8f0ff",borderRadius:6,padding:"2px 7px",fontSize:"0.7rem",fontWeight:700,color:"#1e4fa0"}}>{p.name.split(" ").slice(0,2).join(" ")}<button onClick={()=>toggleCompare(id)} style={{background:"none",border:"none",cursor:"pointer",color:"#aaa",fontSize:"0.7rem",padding:"0 0 0 2px"}}>✕</button></span>:null;})}
            {compareList.length>=2&&<button onClick={()=>alert(`Porovnávaš: ${PRODUCTS.filter(p=>compareList.includes(p.id)).map(p=>p.name).join(" vs ")}`)} style={{padding:"3px 9px",borderRadius:6,border:"none",background:"#1e4fa0",color:"#fff",fontWeight:700,fontSize:"0.7rem",cursor:"pointer",...S}}>Porovnať</button>}
          </div>}

          <div style={{fontSize:"0.72rem",color:"#ccc",fontWeight:600,marginBottom:9}}>{filteredProds.length} produktov</div>
          {filteredProds.length===0?<div style={{textAlign:"center",padding:"40px 0",color:"#ccc"}}><div style={{fontSize:"2rem",marginBottom:8}}>😕</div><div style={{fontWeight:700}}>Žiadne produkty</div></div>:
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:9}}>
              {filteredProds.map(p=><ProdCard key={p.id} p={p} onOpen={setModal} wishlist={wishlist} toggleWish={toggleWish} compareList={compareList} toggleCompare={toggleCompare}/>)}
            </div>}
        </>}

        {/* ── SLUŽBY ── */}
        {tab==="sluzby"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10}}>
            <div><div style={{fontWeight:800,fontSize:"1rem",color:"#1a1a2e"}}>🔧 Služby & Remeselníci</div><div style={{fontSize:"0.74rem",color:"#aaa",marginTop:1}}>{filteredSvc.length} overených odborníkov</div></div>
            <button onClick={()=>setShowSvcForm(true)} style={{padding:"7px 13px",borderRadius:9,border:"none",background:"linear-gradient(135deg,#f0a500,#e67e22)",color:"#fff",fontWeight:800,fontSize:"0.78rem",cursor:"pointer",...S}}>+ Registrovať sa zdarma</button>
          </div>
          <div style={{position:"relative",marginBottom:9}}>
            <input value={tradeSearch} onChange={e=>setTradeSearch(e.target.value)} placeholder="Hľadaj elektrikára, murára..." style={{width:"100%",padding:"9px 36px 9px 12px",borderRadius:10,border:"2px solid #e0e6f5",fontSize:"0.86rem",...S,boxSizing:"border-box",background:"#fff",outline:"none"}}/>
            <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
            {TRADE_CATS.map(c=><button key={c} onClick={()=>setTradeCat(c)} style={{padding:"5px 10px",borderRadius:999,border:"2px solid",fontFamily:"inherit",borderColor:tradeCat===c?"#e67e22":"#dde3f5",background:tradeCat===c?"#e67e22":"#fff",color:tradeCat===c?"#fff":"#e67e22",fontWeight:700,fontSize:"0.72rem",cursor:"pointer"}}>{c}</button>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:9}}>
            {filteredSvc.map(t=><div key={t.id} style={{...card}}>
              <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#1e4fa0,#3a7bd5)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"0.88rem",flexShrink:0}}>{t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}><span style={{fontWeight:800,fontSize:"0.88rem",color:"#1a1a2e"}}>{t.name}</span>{t.badge&&<span style={{fontSize:"0.58rem",background:"#e8f8ef",color:"#1a7a4a",fontWeight:700,padding:"2px 6px",borderRadius:999}}>✓</span>}</div>
                  <div style={{fontSize:"0.75rem",color:"#e67e22",fontWeight:700}}>{t.trade}</div>
                  <div style={{fontSize:"0.68rem",color:"#aaa"}}>📍 {t.city} <span style={{fontWeight:700,color:t.available?"#1a7a4a":"#e67e22",marginLeft:5}}>{t.available?"● Dostupný":"○ Zaneprázdnený"}</span></div>
                </div>
                <div style={{fontSize:"0.7rem",color:"#1e4fa0",fontWeight:700,flexShrink:0}}>{t.price}</div>
              </div>
              <div style={{margin:"8px 0",fontSize:"0.77rem",color:"#555",lineHeight:1.5}}>{t.desc}</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><span><Stars r={t.rating}/><span style={{fontSize:"0.67rem",color:"#bbb",marginLeft:3}}>({t.reviews})</span></span><Btn style={{fontSize:"0.72rem",padding:"6px 11px"}}>📞 Kontakt</Btn></div>
            </div>)}
          </div>

          {/* Service registration form */}
          {showSvcForm&&<div style={{position:"fixed",inset:0,background:"rgba(10,10,30,0.7)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={()=>setShowSvcForm(false)}>
            <div style={{background:"#fff",borderRadius:18,maxWidth:400,width:"100%",padding:"22px 20px",boxShadow:"0 24px 60px rgba(230,126,34,0.2)"}} onClick={e=>e.stopPropagation()}>
              {svcSent?<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:"2.5rem",marginBottom:10}}>✅</div><div style={{fontWeight:800,fontSize:"1.05rem",color:"#1a1a2e",marginBottom:5}}>Registrácia odoslaná!</div><div style={{color:"#777",fontSize:"0.82rem",marginBottom:14}}>Overíme ťa do 24 hodín.</div><Btn onClick={()=>{setShowSvcForm(false);setSvcSent(false);}}>Zavrieť</Btn></div>:
              <><div style={{fontWeight:800,fontSize:"1rem",color:"#1a1a2e",marginBottom:3}}>🔧 Registrácia — Služby</div>
                <div style={{color:"#aaa",fontSize:"0.76rem",marginBottom:14}}>Zdarma · Viditeľnosť vo vašom okolí</div>
                {[["Meno / Firma *","text","Ján Novák"],["Remeslo *","text","Elektrikár"],["Mesto *","text","Košice"],["Telefón","tel","09XX XXX XXX"],["Hodinová sadzba","text","napr. od 25 €/hod"]].map(([l,t,ph],i)=><div key={i} style={{marginBottom:9}}><div style={{fontSize:"0.7rem",fontWeight:700,color:"#666",marginBottom:3}}>{l}</div><input type={t} placeholder={ph} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.84rem",...S,boxSizing:"border-box",outline:"none"}}/></div>)}
                <div style={{marginBottom:12}}><div style={{fontSize:"0.7rem",fontWeight:700,color:"#666",marginBottom:3}}>Popis a skúsenosti</div><textarea placeholder="Čo robíš, roky praxe..." rows={2} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1.5px solid #dde3f5",fontSize:"0.84rem",...S,resize:"none",boxSizing:"border-box",outline:"none"}}/></div>
                <div style={{display:"flex",gap:7}}><Btn onClick={()=>setShowSvcForm(false)} bg="#f0f4ff" color="#bbb" style={{flex:1}}>Zrušiť</Btn><Btn onClick={()=>setSvcSent(true)} bg="#e67e22" style={{flex:2}}>Registrovať sa zdarma</Btn></div>
              </>}
            </div>
          </div>}
        </>}

        {/* ── PREDAJ ── */}
        {tab==="predaj"&&<>
          <div style={{...card,marginBottom:14}}>
            <div style={{fontWeight:800,fontSize:"1.05rem",color:"#1a1a2e",marginBottom:4}}>🏪 Registrácia predajcu</div>
            <div style={{fontSize:"0.78rem",color:"#aaa",marginBottom:16}}>Vyber spôsob napojenia tvojho e-shopu</div>
            {[{icon:"⚡",title:"API napojenie",sub:"WooCommerce, Shoptet, Upgates, XML/CSV — automatická aktualizácia cien.",color:"#e8f0ff",ac:"#1e4fa0"},{icon:"📄",title:"CSV / XML export",sub:"Nahráš cenník raz za čas. Pošleme šablónu.",color:"#f0fff4",ac:"#1a7a4a"},{icon:"✏️",title:"Manuálne zadávanie",sub:"Produkty a ceny zadávaš sám cez admin panel. Pre menšie predajne.",color:"#fff5e6",ac:"#e67e22"}].map(o=><div key={o.icon} style={{background:o.color,borderRadius:12,padding:"13px 14px",marginBottom:8,cursor:"pointer",border:"2px solid transparent",transition:"all 0.12s"}} onMouseEnter={e=>e.currentTarget.style.border=`2px solid ${o.ac}`} onMouseLeave={e=>e.currentTarget.style.border="2px solid transparent"}>
              <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:"1.4rem"}}>{o.icon}</span><div style={{flex:1}}><div style={{fontWeight:800,fontSize:"0.9rem",color:"#1a1a2e"}}>{o.title}</div><div style={{fontSize:"0.73rem",color:"#666",marginTop:2}}>{o.sub}</div></div><span style={{color:o.ac,fontSize:"1.1rem"}}>→</span></div>
            </div>)}
            <div style={{background:"#f0f4ff",borderRadius:10,padding:"10px 13px",fontSize:"0.75rem",color:"#555",lineHeight:1.6}}>📞 Pre viac informácií nás kontaktuj: <b>info@{SITE.name.toLowerCase()}.sk</b> · Prvé 3 mesiace zdarma.</div>
          </div>
        </>}

        <div style={{textAlign:"center",color:"#ccc",fontSize:"0.66rem",marginTop:20,paddingBottom:6}}>
          {SITE.name}.sk · Prototyp v7 · <span style={{cursor:"pointer",color:"#aaa"}}>Podmienky</span> · <span style={{cursor:"pointer",color:"#aaa"}}>GDPR</span> · <span style={{cursor:"pointer",color:"#aaa"}}>Kontakt</span>
        </div>
      </div>


    </div>
  );
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProdCard({p,onOpen,wishlist,toggleWish,compareList,toggleCompare}) {
  const inW = wishlist.includes(p.id);
  const inC = compareList.includes(p.id);
  return (
    <div style={{background:"#fff",borderRadius:12,padding:"12px 13px",boxShadow:"0 2px 8px rgba(30,60,120,0.06)",border:inC?"2px solid #1e4fa0":"2px solid transparent",transition:"all 0.13s",position:"relative"}} onMouseEnter={e=>{if(!inC)e.currentTarget.style.boxShadow="0 8px 24px rgba(30,60,120,0.12)";}} onMouseLeave={e=>{if(!inC)e.currentTarget.style.boxShadow="0 2px 8px rgba(30,60,120,0.06)";}}>
      <div style={{position:"absolute",top:7,right:7,display:"flex",gap:3}}>
        <button onClick={e=>{e.stopPropagation();toggleWish(p.id);}} style={{background:inW?"#fff0e6":"#f0f4ff",border:"none",borderRadius:6,width:23,height:23,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.68rem"}}>{inW?"❤️":"🤍"}</button>
        <button onClick={e=>{e.stopPropagation();toggleCompare(p.id);}} style={{background:inC?"#e8f0ff":"#f0f4ff",border:"none",borderRadius:6,width:23,height:23,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",fontWeight:700,color:inC?"#1e4fa0":"#aaa"}}>{inC?"✓":"⚖"}</button>
      </div>
      <div onClick={()=>onOpen(p)} style={{cursor:"pointer"}}>
        <div style={{display:"flex",gap:9,alignItems:"flex-start",paddingRight:50}}>
          <span style={{fontSize:"1.8rem"}}>{p.icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:"0.86rem",color:"#1a1a2e",lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.name}</div>
            <div style={{fontSize:"0.66rem",color:"#888",marginTop:2,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{p.desc}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:7,marginTop:9}}>
          <div style={{flex:1}}>
            <span style={{fontSize:"0.64rem",color:"#ccc"}}>od </span>
            <span style={{fontWeight:800,color:"#1a1a2e",fontSize:"0.98rem"}}>{p.price1.toFixed(2)} €</span>
            <span style={{fontSize:"0.67rem",color:"#ccc",marginLeft:2}}>/{p.unit}</span>
          </div>
          <span style={{fontSize:"0.67rem",color:p.stock==="Skladom"?"#1a7a4a":"#e67e22",fontWeight:700}}>● {p.stock}</span>
          <span style={{fontSize:"0.67rem",color:"#1e4fa0",fontWeight:700,background:"#f0f4ff",padding:"2px 6px",borderRadius:999}}>{p.sellers} predajc{p.sellers===1?"a":"ov"}</span>
        </div>
      </div>
    </div>
  );
}
