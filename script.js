let records = [];
let editIdx = -1;
let charts = {};
let currentMachine = '';

const COLORS = {
  green:'#15803d', green2:'#4ade80', green3:'#86efac',
  gray:'#6b7280', gray2:'#d1d5db',
  red:'#dc2626', yellow:'#d97706', blue:'#2563eb'
};

const VALID_EMAIL = 'supervisor@conbloc.com';
const VALID_PASS = '12345678';

const rawMasterData = [
  ['Batching Plant', 'Listrik', [0,0,150,0,0,0,20,16,28,0,0,0]],
  ['Batching Plant', 'Collecting Belt', [0,190,0,0,0,0,0,165,152,0,0,40]],
  ['Batching Plant', 'Hoper timbangan', [0,0,0,0,0,60,0,0,21,0,0,46]],
  ['Batching Plant', 'Vibrator hoper', [235,0,0,0,0,0,0,0,0,0,0,0]],
  
  ['Mixing Plant', 'Sendok mixer', [0,0,0,0,0,0,0,0,0,0,0,35]],
  ['Mixing Plant', 'Pintu mixer', [0,20,80,45,0,0,0,0,0,0,0,0]],
  ['Mixing Plant', 'Pompa air', [417,264,0,0,0,35,0,90,0,50,100,0]],
  ['Mixing Plant', 'Seling skif hoish', [0,0,0,0,0,0,0,0,30,0,0,0]],
  ['Mixing Plant', 'Skif Hois', [261,0,0,0,0,0,0,0,390,0,0,0]],
  ['Mixing Plant', 'Listrik', [172,0,146,0,0,0,0,90,140,127,292,293]],
  ['Mixing Plant', 'Timbangan Semen', [60,54,70,0,0,0,33,66,0,20,116,94]],
  ['Mixing Plant', 'Screw Semen-1', [72,0,0,0,0,0,0,0,0,0,34,0]],
  
  ['Traveling Bucket', 'Hoper', [0,0,0,15,0,25,0,65,0,0,0,17]],
  ['Traveling Bucket', 'Roda/as/bearing', [0,45,0,0,0,66,0,0,0,0,0,0]],
  ['Traveling Bucket', 'Pompa oil/palve', [0,0,0,0,0,0,390,0,0,0,0,0]],
  ['Traveling Bucket', 'Listrik', [0,0,0,0,105,0,0,0,0,0,0,0]],
  
  ['Machine Plant', 'Hydrolic System', [77,0,60,0,0,0,0,0,0,60,30,0]],
  ['Machine Plant', 'Feed Drawer I', [156,25,20,150,0,45,12,0,0,30,230,132]],
  ['Machine Plant', 'Feed Drawer II', [16,48,132,334,0,0,0,0,46,88,25,60]],
  ['Machine Plant', 'Cakar / Agitator', [40,0,34,0,10,0,25,30,30,20,120,0]],
  ['Machine Plant', 'Unloader pallet', [101,68,90,0,0,195,20,155,0,22,46,493]],
  ['Machine Plant', 'Vibrator Atas', [251,345,0,0,0,50,28,0,0,0,84,381]],
  ['Machine Plant', 'Listrik', [622,320,283,687,0,125,188,182,82,278,209,16]],
  ['Machine Plant', 'Vibrator Bawah', [0,250,0,0,0,180,0,0,335,181,0,794]],
  ['Machine Plant', 'Cetakan', [230,75,73,39,15,0,34,79,125,128,544,204]],
  ['Machine Plant', 'Temper Head', [109,343,0,15,0,0,261,380,0,404,477,24]],
  ['Machine Plant', 'Conpayor ( Belakang )', [0,0,0,0,0,55,0,0,0,0,0,0]],
  ['Machine Plant', 'Conpayor ( Depan )', [0,0,0,0,0,0,0,20,0,0,60,0]],
  ['Machine Plant', 'Fallet Feeder', [0,0,53,0,0,0,0,0,0,0,84,0]],
  ['Machine Plant', 'Elevator', [82,109,0,0,0,0,0,0,0,50,124,0]],
  
  ['Curing / Finger Cart', 'Listrik', [80,0,145,0,0,15,0,0,44,30,70,237]],
  ['Curing / Finger Cart', 'Finger Cart', [34,123,259,15,0,0,0,0,141,83,83,157]],
  
  ['Cubing / Robo Amica', 'Lowerator', [102,30,261,50,0,0,0,190,0,0,203,240]],
  ['Cubing / Robo Amica', 'Conpayor', [122,0,0,0,0,0,0,0,0,0,0,0]],
  ['Cubing / Robo Amica', 'Listrik', [196,20,0,0,0,50,58,0,1592,150,176,1080]],
  ['Cubing / Robo Amica', 'Cubing', [976,285,248,161,10,150,501,56,41,131,114,221]],
  ['Cubing / Robo Amica', 'Stoking Conpayor', [0,65,0,0,0,0,0,0,0,0,0,0]],
  ['Cubing / Robo Amica', 'Pallet Transfer Car', [0,0,0,0,0,0,180,0,0,0,77,0]],
  
  ['Lain-Lain', 'Pallet Macet', [197,586,28,31,0,43,37,109,52,218,451,478]],
  ['Lain-Lain', 'Air (material basah)', [204,121,112,40,0,33,75,0,51,94,207,257]],
  ['Lain-Lain', 'Hujan', [0,0,0,0,0,0,0,22,0,0,0,0]],
  ['Lain-Lain', 'Tunggu adukan', [621,622,414,180,30,375,300,446,348,398,728,596]],
  ['Lain-Lain', 'Material', [90,215,50,0,0,0,0,178,20,108,38,211]],
  ['Lain-Lain', 'Cement', [300,108,248,0,0,270,0,0,0,46,0,0]],
  ['Lain-Lain', 'Ganti cetak', [420,665,630,195,0,374,510,465,80,525,665,390]],
  ['Lain-Lain', 'Kali brasi timbangan', [0,0,0,0,0,0,0,0,0,0,0,40]],
  ['Lain-Lain', 'Forklif', [665,540,40,0,0,0,220,0,22,112,0,257]],
  ['Lain-Lain', 'Tunggu Sparepath', [0,0,0,0,0,120,100,0,0,0,0,0]],
  ['Lain-Lain', 'Pallet tertinggal dicuring', [575,436,397,49,0,76,57,212,89,287,850,670]],
  ['Lain-Lain', 'Cubing teter', [23,0,256,10,0,11,0,27,14,0,0,25]],
  ['Lain-Lain', 'Stell cetak', [100,191,0,0,0,25,35,114,48,82,244,71]],
  ['Lain-Lain', 'Buang Adukan', [197,86,18,34,0,20,73,89,37,152,359,152]],
  ['Lain-Lain', 'Ganti warna', [105,179,0,0,0,98,22,90,0,138,109,188]],
  ['Lain-Lain', 'Re stok Pallet', [421,415,680,85,0,170,140,120,30,0,156,372]],
  ['Lain-Lain', 'Semen Luber di atas mixer', [0,270,0,0,0,0,0,0,0,0,0,0]],
  ['Lain-Lain', 'Corong Hoper material terganjal batu', [0,152,0,0,0,0,0,0,0,0,0,0]],
  ['Lain-Lain', 'SPV/Operator Mesin tidak masuk', [0,450,0,0,0,0,0,0,0,0,0,0]],
  ['Lain-Lain', 'Menunggu adukan pagar panel', [0,180,0,0,0,0,0,0,0,0,0,0]],
  ['Lain-Lain', 'Mesin stop (Buka puasa)', [0,16,0,0,0,0,0,0,0,0,0,0]],
  ['Lain-Lain', 'Semen tidak mau keluar', [0,84,0,0,0,0,0,0,0,0,0,0]]
];

function generateRealData() {
  let idCounter = 1;
  const resultData = [];
  const normalProblems = ['tunggu','hujan','re stok','stok yard','buka puasa','material','semen'];
  
  rawMasterData.forEach(item => {
    const mesin = item[0], problem = item[1], arrBulan = item[2];
    arrBulan.forEach((lamaMonth, idx) => {
      if(lamaMonth > 0) {
        let incidentCount = Math.ceil(lamaMonth / 45);
        if(incidentCount > 12) incidentCount = 12; 
        if(lamaMonth < 15) incidentCount = 1;
        const baseLama = Math.floor(lamaMonth / incidentCount);
        let remainder = lamaMonth % incidentCount;
        for(let i=0; i<incidentCount; i++) {
          let currentLama = baseLama + (i === 0 ? remainder : 0);
          if(currentLama === 0) continue;
          const monthStr = (idx + 1).toString().padStart(2, '0');
          const baseDay = (5 + (i * 2));
          const validDay = (baseDay > 28 ? 28 : baseDay).toString().padStart(2, '0');
          const tgl = `2025-${monthStr}-${validDay}`;
          const shiftNum = (idCounter % 3) + 1;
          const shiftStr = shiftNum === 1 ? 'Shift 1 (06:00-14:00)' : (shiftNum === 2 ? 'Shift 2 (14:00-22:00)' : 'Shift 3 (22:00-06:00)');
          const probLower = problem.toLowerCase();
          const isNormal = normalProblems.some(p => probLower.includes(p));
          const statusStr = isNormal ? 'normal' : (currentLama >= 60 ? 'breakdown' : 'maintenance');
          let durasi = currentLama + Math.floor(currentLama * 0.12);
          resultData.push({id:idCounter++,tanggal:tgl,shift:shiftStr,mesin,line:'VB-5',problem,lama:currentLama,durasi,desc:`Kejadian tercatat pada data bulan ke-${idx+1}`,action:isNormal?'Menunggu kondisi operasional berjalan normal':'Pengecekan dan perbaikan teknis standar',status:statusStr});
        }
      }
    });
  });
  return resultData;
}

records = generateRealData();

function populateProblems() {
  const select = document.getElementById('f-problem');
  const uniqueProblems = [...new Set(rawMasterData.map(r => r[1]))].sort();
  select.innerHTML = '<option value="">Pilih Problem Spesifik</option>' + uniqueProblems.map(p => `<option value="${p}">${p}</option>`).join('');
}

function doLogin(){
  const u = document.getElementById('l-user').value.trim();
  const p = document.getElementById('l-pass').value.trim();
  const errEl = document.getElementById('login-error');
  const errMsg = document.getElementById('login-error-msg');
  if(!u||!p){
    errMsg.textContent = 'Email dan password wajib diisi.';
    errEl.style.display = 'flex'; return;
  }
  if(u !== VALID_EMAIL || p !== VALID_PASS){
    errMsg.textContent = 'Email atau password salah. Silakan coba lagi.';
    errEl.style.display = 'flex'; return;
  }
  errEl.style.display = 'none';
  document.getElementById('login-screen').style.display='none';
  document.getElementById('app').style.display='block';
  populateProblems();
  initAll();
}

function logout(){
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('app').style.display='none';
  document.getElementById('l-user').value='';
  document.getElementById('l-pass').value='';
}

document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.getElementById('login-screen').style.display!=='none')doLogin()});

function nav(page, el){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  const titles={dashboard:'Dashboard',input:'Input Data Downtime Baru',laporan:'Laporan Keseluruhan Rekapitulasi',history:'Histori Analisis Kategori Mesin',analytics:'Analytics Sistem Terpadu',estimasi:'Estimasi Jadwal Service',pengaturan:'Pengaturan'};
  document.getElementById('page-title').textContent=titles[page]||page;
  document.getElementById('page-date').textContent='';
  if(page==='laporan')renderLaporan();
  if(page==='history')renderHistory();
  if(page==='analytics')renderAnalytics();
  if(page==='estimasi')renderEstimasi();
}

function showToast(msg,icon='check-circle-fill'){
  const t=document.getElementById('toast');
  document.getElementById('toast-msg').textContent=msg;
  document.getElementById('toast-icon').className='bi bi-'+icon;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

function fmtDate(d){
  const dt=new Date(d+'T00:00:00');
  return dt.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
}
function fmtDateShort(d){
  const dt=new Date(d);
  return dt.toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'});
}

function today(){return new Date().toISOString().split('T')[0]}

function badge(s){
  if(s==='breakdown')return'<span class="badge badge-red"><i class="bi bi-x-octagon" style="margin-right:4px"></i>Breakdown</span>';
  if(s==='maintenance')return'<span class="badge badge-yellow"><i class="bi bi-wrench" style="margin-right:4px"></i>Maintenance</span>';
  return'<span class="badge badge-green"><i class="bi bi-exclamation-circle" style="margin-right:4px"></i>Normal</span>';
}

function updateStats(){
  const totalMin=records.reduce((a,r)=>a+r.lama,0);
  const breakdowns=records.filter(r=>r.status==='breakdown').length;
  const uniqueMonths=new Set(records.map(r=>r.tanggal.substring(0,7))).size||1;
  const avgMonthHour=(totalMin/uniqueMonths/60).toFixed(1);
  document.getElementById('s-today').innerHTML=`${totalMin.toLocaleString('id-ID')} <span style="font-size:14px;color:var(--gray-400);font-weight:500">mnt</span>`;
  document.getElementById('s-breakdown').textContent=breakdowns.toLocaleString('id-ID');
  document.getElementById('s-service').textContent=records.length.toLocaleString('id-ID');
  document.getElementById('s-month').innerHTML=`${avgMonthHour} <span style="font-size:14px;color:var(--gray-400);font-weight:500">jam</span>`;
}

function updateDashTable(){
  const tbody=document.getElementById('dash-tbody');
  const sorted=[...records].sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal)).slice(0,6);
  document.getElementById('table-count').textContent=`${records.length} data laporan`;
  tbody.innerHTML=sorted.map(r=>`<tr>
    <td>${fmtDate(r.tanggal)}</td>
    <td><strong>${r.mesin}</strong></td>
    <td>${r.problem}</td>
    <td><span style="font-weight:600">${r.lama}</span> mnt</td>
    <td>${badge(r.status)}</td>
  </tr>`).join('');
}

function destroyChart(key){if(charts[key]){charts[key].destroy();delete charts[key];}}

function buildLineChart(){
  destroyChart('line');
  const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const byMonth=Array(12).fill(0);
  records.forEach(r=>{const dt=new Date(r.tanggal);if(!isNaN(dt))byMonth[dt.getMonth()]+=r.lama;});
  const ctx=document.getElementById('lineChart').getContext('2d');
  charts['line']=new Chart(ctx,{type:'line',data:{labels:months,datasets:[{label:'Total Menit',data:byMonth,borderColor:COLORS.green,backgroundColor:'rgba(21,128,61,0.08)',borderWidth:2,tension:0.4,pointBackgroundColor:COLORS.green,pointRadius:4,fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw.toLocaleString('id-ID')} mnt`}}},scales:{x:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:11}}},y:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:11}}}}}});
}

function buildPieChart(){
  destroyChart('pie');
  const cnt={};records.forEach(r=>{cnt[r.mesin]=(cnt[r.mesin]||0)+r.lama});
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const ctx=document.getElementById('pieChart').getContext('2d');
  const palette=['#14532d','#166534','#15803d','#16a34a','#4ade80','#86efac'];
  charts['pie']=new Chart(ctx,{type:'doughnut',data:{labels:top.map(e=>e[0]),datasets:[{data:top.map(e=>e[1]),backgroundColor:palette,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{family:'Poppins',size:10},padding:8}}}}});
}

function buildBarChart(){
  destroyChart('bar');
  const cnt={};records.forEach(r=>{cnt[r.problem]=(cnt[r.problem]||0)+r.lama});
  const sorted=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const ctx=document.getElementById('barChart').getContext('2d');
  charts['bar']=new Chart(ctx,{type:'bar',data:{labels:sorted.map(e=>e[0]),datasets:[{label:'Total Menit Downtime',data:sorted.map(e=>e[1]),backgroundColor:'rgba(21,128,61,0.75)',borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{family:'Poppins',size:11}}},y:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:11}}}}}});
}

function renderLaporan(){
  const q=(document.getElementById('search-input').value||'').toLowerCase();
  const from=document.getElementById('filter-from').value;
  const to=document.getElementById('filter-to').value;
  const st=document.getElementById('filter-status').value;
  let data=[...records].sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));
  if(q)data=data.filter(r=>r.mesin.toLowerCase().includes(q)||r.problem.toLowerCase().includes(q));
  if(from)data=data.filter(r=>r.tanggal>=from);
  if(to)data=data.filter(r=>r.tanggal<=to);
  if(st)data=data.filter(r=>r.status===st);
  const tbody=document.getElementById('laporan-tbody');
  const empty=document.getElementById('laporan-empty');
  if(!data.length){tbody.innerHTML='';empty.style.display='block';return}
  empty.style.display='none';
  tbody.innerHTML=data.map(r=>`<tr>
    <td>${fmtDate(r.tanggal)}</td>
    <td><strong>${r.mesin}</strong><br><span style="font-size:11px;color:var(--gray-400)">${r.shift||''}</span></td>
    <td>${r.line}</td>
    <td>${r.problem}</td>
    <td>${r.lama} mnt</td>
    <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.action||'-'}</td>
    <td>${badge(r.status)}</td>
    <td>
      <div style="display:flex;gap:6px">
        <button class="btn btn-secondary btn-sm" onclick="openEdit(${r.id})"><i class="bi bi-pencil"></i> Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRecord(${r.id})"><i class="bi bi-trash"></i></button>
      </div>
    </td>
  </tr>`).join('');
}

function filterLaporan(){renderLaporan()}

function openEdit(id){
  editIdx=id;
  const r=records.find(x=>x.id===id);
  if(!r)return;
  document.getElementById('edit-mesin').value=r.mesin;
  document.getElementById('edit-problem').value=r.problem;
  document.getElementById('edit-lama').value=r.lama;
  document.getElementById('edit-status').value=r.status;
  document.getElementById('edit-action').value=r.action||'';
  document.getElementById('edit-modal').classList.add('open');
}

function closeModal(){document.getElementById('edit-modal').classList.remove('open')}

function saveEdit(){
  const r=records.find(x=>x.id===editIdx);
  if(!r)return;
  r.problem=document.getElementById('edit-problem').value;
  r.lama=parseInt(document.getElementById('edit-lama').value)||0;
  r.status=document.getElementById('edit-status').value;
  r.action=document.getElementById('edit-action').value;
  closeModal();
  refreshAll();
  showToast('Data berhasil diperbarui','check2-circle');
}

function deleteRecord(id){
  if(!confirm('Hapus insiden ini dari data laporan?'))return;
  records=records.filter(x=>x.id!==id);
  refreshAll();
  showToast('Data berhasil dihapus','trash');
}

function renderHistory(){
  const machines=["Batching Plant","Mixing Plant","Traveling Bucket","Machine Plant","Curing / Finger Cart","Cubing / Robo Amica","Lain-Lain"];
  if(!currentMachine||!machines.includes(currentMachine))currentMachine='Machine Plant';
  const tabs=document.getElementById('machine-tabs');
  tabs.innerHTML=machines.map(m=>`<div class="machine-tab${m===currentMachine?' active':''}" onclick="selectMachine('${m}',this)">${m}</div>`).join('');
  renderMachineDetail();
}

function selectMachine(m,el){
  currentMachine=m;
  document.querySelectorAll('.machine-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  renderMachineDetail();
}

function renderMachineDetail(){
  const recs=records.filter(r=>r.mesin===currentMachine).sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));
  const totalDT=recs.reduce((a,r)=>a+r.lama,0);
  const avgDT=recs.length?Math.round(totalDT/recs.length):0;
  const breakdowns=recs.filter(r=>r.status==='breakdown').length;
  const grid=document.getElementById('machine-stats-grid');
  grid.innerHTML=`
    <div class="mini-stat"><div class="mini-stat-label">Total Menit Area Ini</div><div class="mini-stat-value">${totalDT.toLocaleString('id-ID')} <span style="font-size:13px;font-weight:500;color:var(--gray-400)">mnt</span></div></div>
    <div class="mini-stat"><div class="mini-stat-label">Jumlah Kejadian (Insiden)</div><div class="mini-stat-value">${recs.length.toLocaleString('id-ID')}</div></div>
    <div class="mini-stat"><div class="mini-stat-label">Rata-rata Durasi Masalah</div><div class="mini-stat-value">${avgDT} <span style="font-size:13px;font-weight:500;color:var(--gray-400)">mnt</span></div></div>
    <div class="mini-stat"><div class="mini-stat-label">Total Insiden Breakdown</div><div class="mini-stat-value" style="color:var(--red)">${breakdowns}</div></div>`;
  const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const byMonth=Array(12).fill(0);
  recs.forEach(r=>{const dt=new Date(r.tanggal);if(!isNaN(dt))byMonth[dt.getMonth()]+=r.lama;});
  destroyChart('hLine');
  const ctx1=document.getElementById('histLineChart').getContext('2d');
  charts['hLine']=new Chart(ctx1,{type:'line',data:{labels:months,datasets:[{label:'Menit',data:byMonth,borderColor:COLORS.green,backgroundColor:'rgba(21,128,61,0.08)',borderWidth:2,tension:0.4,fill:true,pointBackgroundColor:COLORS.green,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:10}}},y:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:10}}}}}});
  const cnt={};recs.forEach(r=>{cnt[r.problem]=(cnt[r.problem]||0)+r.lama});
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,5);
  destroyChart('hBar');
  const ctx2=document.getElementById('histBarChart').getContext('2d');
  charts['hBar']=new Chart(ctx2,{type:'bar',data:{labels:top.map(e=>e[0]),datasets:[{data:top.map(e=>e[1]),backgroundColor:'rgba(21,128,61,0.75)',borderRadius:5,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:10}}},y:{grid:{display:false},ticks:{font:{family:'Poppins',size:10}}}}}});
  const tl=document.getElementById('history-timeline');
  if(!recs.length){tl.innerHTML='<div style="text-align:center;padding:30px;color:var(--gray-400)"><i class="bi bi-inbox" style="font-size:28px;display:block;margin-bottom:8px"></i>Belum ada histori detail di kategori ini</div>';return}
  tl.innerHTML='<div class="timeline">'+recs.slice(0,10).map((r,i)=>{
    const cls=r.status==='breakdown'?'red':r.status==='maintenance'?'yellow':'green';
    const ic=r.status==='breakdown'?'x-octagon':r.status==='maintenance'?'wrench':'exclamation-circle';
    return`<div class="timeline-item">
      <div class="timeline-dot">
        <div class="tl-circle ${cls}"><i class="bi bi-${ic}"></i></div>
        ${i<Math.min(recs.length,10)-1?'<div class="tl-line"></div>':''}
      </div>
      <div class="timeline-content">
        <div class="tl-title">${r.mesin} — ${r.problem}</div>
        <div class="tl-meta">${fmtDate(r.tanggal)} · ${r.shift||''} · <strong style="color:var(--gray-800)">${r.lama} menit</strong> downtime</div>
        <div style="font-size:12px;color:var(--gray-600);margin-top:5px">${r.action||'—'}</div>
      </div>
    </div>`;
  }).join('')+'</div>';
}

function renderAnalytics(){
  const machines=["Batching Plant","Mixing Plant","Traveling Bucket","Machine Plant","Curing / Finger Cart","Cubing / Robo Amica","Lain-Lain"];
  const uniqueMonths=new Set(records.map(r=>r.tanggal.substring(0,7))).size||1;
  const totalAvailableHours=uniqueMonths*400;
  destroyChart('mtbf');
  const mtbfData=machines.map(m=>{
    const r=records.filter(x=>x.mesin===m);
    if(!r.length)return totalAvailableHours;
    const totalDowntimeJam=r.reduce((a,x)=>a+x.lama,0)/60;
    return Math.round((totalAvailableHours-totalDowntimeJam)/r.length);
  });
  const ctx1=document.getElementById('mtbfChart').getContext('2d');
  charts['mtbf']=new Chart(ctx1,{type:'bar',data:{labels:['Batching','Mixing','Travel.B','Machine P.','Curing','Cubing','Lain-lain'],datasets:[{label:'MTBF (Jam)',data:mtbfData,backgroundColor:'rgba(21,128,61,0.75)',borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{family:'Poppins',size:10}}},y:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:10}}}}}});
  destroyChart('mttr');
  const mttrData=machines.map(m=>{const r=records.filter(x=>x.mesin===m);return r.length?Math.round(r.reduce((a,x)=>a+x.durasi,0)/r.length):0});
  const ctx2=document.getElementById('mttrChart').getContext('2d');
  charts['mttr']=new Chart(ctx2,{type:'bar',data:{labels:['Batching','Mixing','Travel.B','Machine P.','Curing','Cubing','Lain-lain'],datasets:[{label:'MTTR (mnt)',data:mttrData,backgroundColor:'rgba(217,119,6,0.65)',borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{family:'Poppins',size:10}}},y:{grid:{color:'rgba(156,163,175,0.15)'},ticks:{font:{family:'Poppins',size:10}}}}}});
  destroyChart('shift');
  const shifts=['Shift 1 (06:00-14:00)','Shift 2 (14:00-22:00)','Shift 3 (22:00-06:00)'];
  const shiftData=shifts.map(s=>records.filter(r=>r.shift===s).reduce((a,r)=>a+r.lama,0));
  const ctx3=document.getElementById('shiftChart').getContext('2d');
  charts['shift']=new Chart(ctx3,{type:'doughnut',data:{labels:['Shift 1','Shift 2','Shift 3'],datasets:[{data:shiftData,backgroundColor:['#14532d','#166534','#4ade80'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{font:{family:'Poppins',size:11},padding:8}}}}});
  destroyChart('eff');
  const effData=machines.map(m=>{
    const r=records.filter(x=>x.mesin===m);
    if(!r.length)return 100.0;
    const dtLamaJam=r.reduce((a,x)=>a+x.lama,0)/60;
    return Number(Math.max(0,Math.min(100,((totalAvailableHours-dtLamaJam)/totalAvailableHours)*100)).toFixed(1));
  });
  const ctx4=document.getElementById('effChart').getContext('2d');
  charts['eff']=new Chart(ctx4,{type:'radar',data:{labels:['Batching','Mixing','Travel.B','Machine P.','Curing','Cubing','Lain-lain'],datasets:[{label:'Availability (%)',data:effData,borderColor:COLORS.green,backgroundColor:'rgba(21,128,61,0.12)',borderWidth:2,pointBackgroundColor:COLORS.green}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{min:85,max:100,grid:{color:'rgba(156,163,175,0.2)'},ticks:{font:{family:'Poppins',size:9},backdropColor:'transparent'}}}}});
}

// ============ ESTIMASI SERVICE ============
function computeEstimasi(){
  const machines=["Batching Plant","Mixing Plant","Traveling Bucket","Machine Plant","Curing / Finger Cart","Cubing / Robo Amica","Lain-Lain"];
  const uniqueMonths=new Set(records.map(r=>r.tanggal.substring(0,7))).size||1;
  const totalAvailableHours=uniqueMonths*400; // jam
  const today_dt = new Date();

  return machines.map(m=>{
    const recs = records.filter(r=>r.mesin===m);
    const breakdownRecs = recs.filter(r=>r.status==='breakdown');
    const totalDowntimeMnt = recs.reduce((a,r)=>a+r.lama,0);
    const totalDowntimeJam = totalDowntimeMnt/60;
    const nBreakdown = breakdownRecs.length||1;

    // MTBF (jam) = (Total Available Hours - Total Downtime Hours) / Jumlah Breakdown
    const mtbfJam = (totalAvailableHours - totalDowntimeJam) / nBreakdown;
    const mtbfHari = mtbfJam / 24;

    // Tanggal service terakhir = tanggal insiden terbaru (breakdown/maintenance)
    const servicedRecs = recs.filter(r=>r.status==='breakdown'||r.status==='maintenance')
                            .sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));
    const lastServiceDate = servicedRecs.length ? new Date(servicedRecs[0].tanggal+'T00:00:00') : new Date('2025-01-01');
    const lastProblem = servicedRecs.length ? servicedRecs[0].problem : '-';

    // Estimasi service berikutnya = lastServiceDate + MTBF (hari)
    const nextServiceDate = new Date(lastServiceDate.getTime() + mtbfHari*24*60*60*1000);
    const daysUntil = Math.round((nextServiceDate - today_dt) / (1000*60*60*24));

    let urgency='ok';
    if(daysUntil < 0 || daysUntil <= 7) urgency='urgent';
    else if(daysUntil <= 30) urgency='soon';

    return {machine:m, mtbfHari:Math.round(mtbfHari), lastServiceDate, lastProblem, nextServiceDate, daysUntil, urgency, nBreakdown, totalDowntimeMnt};
  });
}

function renderEstimasi(){
  const data = computeEstimasi();
  const urgentItems = data.filter(d=>d.urgency==='urgent');
  const soonItems = data.filter(d=>d.urgency==='soon');
  const okItems = data.filter(d=>d.urgency==='ok');

  function cardHTML(d){
    const dateStr = d.nextServiceDate.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'});
    const daysTxt = d.daysUntil < 0 ? `Sudah lewat ${Math.abs(d.daysUntil)} hari` : (d.daysUntil === 0 ? 'Hari ini!' : `${d.daysUntil} hari lagi`);
    const urgLabel = d.urgency==='urgent' ? '<i class="bi bi-exclamation-triangle-fill"></i> Segera' : (d.urgency==='soon' ? '<i class="bi bi-clock"></i> Perhatian' : '<i class="bi bi-check-circle"></i> Normal');
    return `<div class="est-card ${d.urgency}">
      <div class="est-card-label">Estimasi Service Berikutnya</div>
      <div class="est-card-machine">${d.machine}</div>
      <div class="est-card-problem">Problem terakhir: ${d.lastProblem}</div>
      <div class="est-card-date ${d.urgency}">${dateStr}</div>
      <div class="est-card-days">${daysTxt} · MTBF: ${d.mtbfHari} hari · ${d.nBreakdown} breakdown</div>
      <div class="est-badge ${d.urgency}">${urgLabel}</div>
    </div>`;
  }

  let html = '';
  if(urgentItems.length){
    html += `<div class="est-divider"><i class="bi bi-exclamation-triangle-fill" style="color:var(--red)"></i>Perlu Tindakan Segera</div>`;
    html += `<div class="estimation-grid">${urgentItems.map(cardHTML).join('')}</div>`;
  }
  if(soonItems.length){
    html += `<div class="est-divider"><i class="bi bi-clock" style="color:var(--yellow)"></i>Perlu Perhatian (7–30 Hari)</div>`;
    html += `<div class="estimation-grid">${soonItems.map(cardHTML).join('')}</div>`;
  }
  if(okItems.length){
    html += `<div class="est-divider"><i class="bi bi-check-circle" style="color:var(--green-700)"></i>Kondisi Normal (&gt;30 Hari)</div>`;
    html += `<div class="estimation-grid">${okItems.map(cardHTML).join('')}</div>`;
  }
  document.getElementById('est-container').innerHTML = html;
}

function saveDowntime(){
  const tgl=document.getElementById('f-tanggal').value;
  const shift=document.getElementById('f-shift').value;
  const mesin=document.getElementById('f-mesin').value;
  const line=document.getElementById('f-line').value;
  const problem=document.getElementById('f-problem').value;
  const status=document.getElementById('f-status').value;
  const lama=parseInt(document.getElementById('f-lama').value)||0;
  const durasi=parseInt(document.getElementById('f-durasi').value)||0;
  const desc=document.getElementById('f-desc').value;
  const action=document.getElementById('f-action').value;
  if(!tgl||!mesin||!problem||!status){showToast('Lengkapi field wajib','exclamation-circle');return}
  records.unshift({id:records.length+1,tanggal:tgl,shift,mesin,line,problem,lama,durasi,desc,action,status});
  refreshAll();
  resetForm();
  showToast('Data downtime berhasil disimpan!','check2-circle');
}

function resetForm(){
  ['f-shift','f-mesin','f-problem','f-status','f-lama','f-durasi','f-desc','f-action'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value='';
  });
}

function refreshAll(){
  updateStats();
  updateDashTable();
  buildLineChart();
  buildPieChart();
  buildBarChart();
  const lap=document.getElementById('page-laporan');
  if(lap.classList.contains('active'))renderLaporan();
  const hist=document.getElementById('page-history');
  if(hist.classList.contains('active'))renderHistory();
  const ana=document.getElementById('page-analytics');
  if(ana.classList.contains('active'))renderAnalytics();
  const est=document.getElementById('page-estimasi');
  if(est.classList.contains('active'))renderEstimasi();
}

function initAll(){
  document.getElementById('f-tanggal').value=today();
  document.getElementById('page-date').textContent='';
  updateStats();
  updateDashTable();
  setTimeout(()=>{buildLineChart();buildPieChart();buildBarChart();},100);
}