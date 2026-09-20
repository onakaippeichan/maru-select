const AFFILIATE_ID = '57b9f28c.08ed6a98.57b9f28d.ce5b90c2';
function affiliateLink(url) {
  const enc = encodeURIComponent(url);
  return `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=${enc}&m=${enc}`;
}

const products=[
 {id:1,name:'テーブルライト ARCTURUS',category:'home',label:'暮らし',price:6200,desc:'16色に発光色を変えられるリモコン操作式のLEDテーブルライト。防水仕様で調光・調色ができ、充電式コードレスだから屋内外どこでも使えます。',image:'https://image.rakuten.co.jp/kinokokinoko/cabinet/led/led01/an0005_main01.jpg?10000139',url:'https://item.rakuten.co.jp/kinokokinoko/an0005/'},
 {id:2,name:'珈琲考具 ツードリップ ポット Pro',category:'home',label:'暮らし',price:6600,desc:'細口ノズルで狙った場所へ静かに注げる日本製ステンレスドリップポット。直火・ガス火・IHに対応し、朝のコーヒー時間を少しだけ丁寧にします。',image:'https://image.rakuten.co.jp/simomura-kihan/cabinet/06700296/rakuten-42343-07.jpg',url:'https://item.rakuten.co.jp/simomura-kihan/42343/'},
 {id:3,name:'SHIGETA EX オイルセラム 15ml',category:'beauty',label:'美容',price:8250,desc:'エイジングケアに向けて植物由来成分を厳選配合したオイル美容液。乾燥や敏感肌にうるおいを与え、ハリとつやのある肌へ導きます。',image:'https://shop.r10s.jp/shigetajapan/cabinet/products/imgrc0098501087.jpg',url:'https://item.rakuten.co.jp/shigetajapan/elx15/'},
 {id:4,name:'Chapon バスソルトギフト 4本セット',category:'beauty',label:'美容',price:4980,desc:'100%天然鉱物由来、6つのフリー処方でつくられた入浴剤ギフト。疲労回復や保湿など複数の効能があり、一日の終わりを心地よく整えます。',image:'https://image.rakuten.co.jp/chapon/cabinet/rp_10000001/lp/imgrc0136269483.jpg',url:'https://item.rakuten.co.jp/chapon/10000001/'},
 {id:5,name:'米麹グラノーラ 200g',category:'food',label:'食品',price:1580,desc:'国産米麹と厳選素材でつくる健康志向のグラノーラ。プレーンやチョコ、ドライフルーツなど選べる6フレーバーで、毎朝食べたくなる味わいです。',image:'https://shop.r10s.jp/oryzae-foodcosme/cabinet/products/granola/gran-shingle-6flavor.jpg',url:'https://item.rakuten.co.jp/oryzae-foodcosme/10000006/'},
 {id:6,name:'瀬戸内レモネードシロップ 720ml×2本',category:'food',label:'食品',price:5086,desc:'国産レモンとはちみつでつくる濃縮タイプのレモンシロップ。炭酸水や水で割って、ホットでもアイスでも一年中楽しめます。',image:'https://image.rakuten.co.jp/yuge-roaster/cabinet/gift/compass1749297328.jpg',url:'https://item.rakuten.co.jp/yuge-roaster/compass1716269428/'},
 {id:7,name:'帆布工房 LINEシリーズ トートバッグ',category:'fashion',label:'ファッション',price:7150,desc:'A4サイズ対応、内ポケットとスマホ用ポケットを備えた日常使いの帆布トート。丈夫な生地で通勤・通学にも頼れる一枚です。',image:'https://image.rakuten.co.jp/sactown/cabinet/lp/3j45-lp_01_v4.jpg',url:'https://item.rakuten.co.jp/sactown/3j45/'},
 {id:8,name:'TRUSS ORGABITS オーガニックコットンTシャツ',category:'fashion',label:'ファッション',price:1158,desc:'100%オーガニックコットンを使った5.3ozの軽やかなTシャツ。男女兼用のシンプルな無地で、毎日選びたくなる一枚を目指しました。',image:'https://image.rakuten.co.jp/fink-s/cabinet/truss/ogb-910_top_.jpg',url:'https://item.rakuten.co.jp/fink-s/truss-ogb-910/'}
];

let current='all';let saved=JSON.parse(localStorage.getItem('maru-saved')||'[]');
const grid=document.querySelector('#productGrid'),count=document.querySelector('#resultCount'),search=document.querySelector('#searchInput');
const yen=n=>`¥${n.toLocaleString('ja-JP')}`;

function render(){const q=search.value.trim().toLowerCase();const items=products.filter(p=>(current==='all'||p.category===current)&&p.name.toLowerCase().includes(q));grid.innerHTML=items.map(p=>`<article class="product-card"><div class="product-image" style="background-image:url('${p.image}')"><button class="save ${saved.includes(p.id)?'active':''}" data-save="${p.id}" aria-label="${p.name}をお気に入りに追加">${saved.includes(p.id)?'♥':'♡'}</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.label}</p><strong>${yen(p.price)}</strong></div><button class="card-open" data-open="${p.id}" aria-label="${p.name}の詳細を見る"></button></article>`).join('');count.textContent=`${items.length} items`;document.querySelector('#emptyState').hidden=items.length!==0;updateSaved();}

function toggleSave(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];localStorage.setItem('maru-saved',JSON.stringify(saved));render();}

function updateSaved(){document.querySelector('#savedCount').textContent=saved.length;const items=products.filter(p=>saved.includes(p.id));document.querySelector('#savedList').innerHTML=items.length?items.map(p=>`<div class="saved-item"><div class="saved-item-img" style="background-image:url('${p.image}')"></div><div><h3>${p.name}</h3><p>${yen(p.price)}</p></div><button data-remove="${p.id}" aria-label="削除">×</button></div>`).join(''):'<p style="color:var(--muted)">気になる商品を♡で保存できます。</p>';}

document.addEventListener('click',e=>{
  const saveBtn=e.target.closest('[data-save]');
  if(saveBtn){toggleSave(+saveBtn.dataset.save);return}
  const open=e.target.closest('[data-open]');
  if(open){
    const p=products.find(x=>x.id===+open.dataset.open);
    document.querySelector('#dialogContent').innerHTML=`<div class="dialog-inner"><div class="dialog-image" style="background-image:url('${p.image}')"></div><div class="dialog-copy"><p class="category">${p.label}</p><h2>${p.name}</h2><p class="price">${yen(p.price)}</p><p class="description">${p.desc}</p><a class="buy-link" href="${affiliateLink(p.url)}" target="_blank" rel="nofollow sponsored noopener">楽天市場で見る ↗</a><button data-save="${p.id}">${saved.includes(p.id)?'お気に入りから外す':'お気に入りに追加'}</button></div></div>`;
    document.querySelector('#productDialog').showModal();
    return;
  }
  const remove=e.target.closest('[data-remove]');
  if(remove)toggleSave(+remove.dataset.remove);
});

document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');current=b.dataset.filter;render()}));
search.addEventListener('input',render);
document.querySelector('#resetButton').addEventListener('click',()=>{search.value='';current='all';document.querySelector('.filter.active').classList.remove('active');document.querySelector('[data-filter="all"]').classList.add('active');render()});

const panel=document.querySelector('#savedPanel'),overlay=document.querySelector('#overlay');
function closePanel(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');overlay.hidden=true}
document.querySelector('#savedButton').onclick=()=>{panel.classList.add('open');panel.setAttribute('aria-hidden','false');overlay.hidden=false};
document.querySelector('#closeSaved').onclick=closePanel;
overlay.onclick=closePanel;
document.querySelector('.dialog-close').onclick=()=>document.querySelector('#productDialog').close();
render();
