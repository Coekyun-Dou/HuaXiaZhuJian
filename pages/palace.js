// palace.js
// 中国古代皇宫建筑可视化（硬编码数据 + 图表联动）

(function () {
  const DYNASTY_ORDER = ['唐', '宋', '元', '明', '清', '其他'];
  const DYNASTY_COLOR = {
    '唐': '#d45a4f',
    '宋': '#4fa3d4',
    '元': '#8d6bd1',
    '明': '#d8a64b',
    '清': '#66b58b',
    '其他': '#8da0b3'
  };

  const PALACE_DATA = [
    { name: '章华台', dynastyRaw: '春秋·楚灵王六年（前535年）', dynasty: '其他', province: '湖北省', city: '潜江市', lng: 112.89, lat: 30.42, type: '离宫别苑', event: '楚灵王六年建，又称章华宫。' },
    { name: '姑苏台', dynastyRaw: '春秋·吴王阖闾时期', dynasty: '其他', province: '江苏省', city: '苏州市', lng: 120.62, lat: 31.32, type: '离宫别苑', event: '吴王夫差扩建，与西施故事相关。' },
    { name: '咸阳宫', dynastyRaw: '战国秦·孝公十二年（前350年）', dynasty: '其他', province: '陕西省', city: '咸阳市', lng: 108.70, lat: 34.33, type: '宫殿建筑群', event: '秦孝公迁都后兴建，统一后延续使用。' },
    { name: '阿房宫', dynastyRaw: '秦·秦始皇三十五年（前212年）', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.86, lat: 34.26, type: '宫殿建筑群', event: '秦始皇拟建巨型宫殿，后遭战火。' },
    { name: '长乐宫', dynastyRaw: '西汉·高祖七年（前200年）', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.95, lat: 34.28, type: '宫殿建筑群', event: '由秦兴乐宫改建，西汉太后居所。' },
    { name: '未央宫', dynastyRaw: '西汉·高祖七年（前200年）', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.90, lat: 34.30, type: '宫殿建筑群', event: '西汉皇帝朝会中心，存续时间极长。' },
    { name: '建章宫', dynastyRaw: '西汉·武帝太初元年（前104年）', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.88, lat: 34.33, type: '宫殿建筑群', event: '汉武帝扩建，规模宏大。' },
    { name: '甘泉宫', dynastyRaw: '西汉·武帝时期', dynasty: '其他', province: '陕西省', city: '淳化县', lng: 108.46, lat: 34.79, type: '离宫别苑', event: '长安以北离宫，兼具避暑与政务。' },
    { name: '桂宫', dynastyRaw: '西汉·武帝时期', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.93, lat: 34.31, type: '宫殿建筑群', event: '位于未央宫北侧，后妃居住宫室。' },
    { name: '北宫（西汉）', dynastyRaw: '西汉·武帝时期', dynasty: '其他', province: '陕西省', city: '西安市', lng: 108.94, lat: 34.32, type: '宫殿建筑群', event: '西汉后妃宫室之一。' },
    { name: '南宫（东汉）', dynastyRaw: '东汉·光武帝建武年间（25-56年）', dynasty: '其他', province: '河南省', city: '洛阳市', lng: 112.46, lat: 34.62, type: '宫殿建筑群', event: '东汉洛阳城主要朝会宫殿。' },
    { name: '北宫（东汉）', dynastyRaw: '东汉·明帝永平年间（58-75年）', dynasty: '其他', province: '河南省', city: '洛阳市', lng: 112.47, lat: 34.63, type: '宫殿建筑群', event: '与南宫并立，构成东汉宫城体系。' },
    { name: '建康宫', dynastyRaw: '东晋·元帝建武元年（317年）', dynasty: '其他', province: '江苏省', city: '南京市', lng: 118.79, lat: 32.04, type: '宫殿建筑群', event: '六朝建康都城核心宫殿区。' },
    { name: '太极宫', dynastyRaw: '隋·开皇二年（582年）', dynasty: '唐', province: '陕西省', city: '西安市', lng: 108.95, lat: 34.27, type: '宫殿建筑群', event: '隋称大兴宫，唐改太极宫。' },
    { name: '大明宫', dynastyRaw: '唐·贞观八年（634年）始建', dynasty: '唐', province: '陕西省', city: '西安市', lng: 108.96, lat: 34.31, type: '宫殿建筑群', event: '唐代中后期国家中枢。' },
    { name: '兴庆宫', dynastyRaw: '唐·开元二年（714年）', dynasty: '唐', province: '陕西省', city: '西安市', lng: 109.00, lat: 34.26, type: '行宫', event: '玄宗旧邸扩建，开元时期政治中心。' },
    { name: '上阳宫', dynastyRaw: '唐·上元二年（675年）', dynasty: '唐', province: '河南省', city: '洛阳市', lng: 112.44, lat: 34.67, type: '行宫', event: '东都洛阳重要皇宫。' },
    { name: '万象神宫（明堂）', dynastyRaw: '武周·垂拱四年（688年）', dynasty: '唐', province: '河南省', city: '洛阳市', lng: 112.44, lat: 34.68, type: '礼制建筑', event: '武周王朝政治礼仪中心。' },
    { name: '北宋皇宫', dynastyRaw: '北宋·建隆元年（960年）', dynasty: '宋', province: '河南省', city: '开封市', lng: 114.35, lat: 34.80, type: '宫殿建筑群', event: '北宋东京宫城。' },
    { name: '南宋皇宫', dynastyRaw: '南宋·绍兴二年（1132年）', dynasty: '宋', province: '浙江省', city: '杭州市', lng: 120.16, lat: 30.25, type: '宫殿建筑群', event: '临安宫城，又称德寿宫。' },
    { name: '元大都宫城', dynastyRaw: '元·至元四年（1267年）', dynasty: '元', province: '北京市', city: '北京市', lng: 116.39, lat: 39.93, type: '宫殿建筑群', event: '元朝大内，奠定后世都城格局。' },
    { name: '南京故宫', dynastyRaw: '明·洪武元年（1368年）', dynasty: '明', province: '江苏省', city: '南京市', lng: 118.79, lat: 32.05, type: '宫殿建筑群', event: '明初皇宫，后为陪都。' },
    { name: '北京故宫（紫禁城）', dynastyRaw: '明·永乐四年（1406年）始建', dynasty: '明', province: '北京市', city: '北京市', lng: 116.397, lat: 39.916, type: '宫殿建筑群', event: '明清两代皇宫，世界文化遗产。' },
    { name: '沈阳故宫', dynastyRaw: '清·天命十年（1625年）', dynasty: '清', province: '辽宁省', city: '沈阳市', lng: 123.45, lat: 41.80, type: '宫殿建筑群', event: '清入关前皇宫，后为陪都宫殿。' },
    { name: '北宋东京皇宫遗址', dynastyRaw: '北宋', dynasty: '宋', province: '河南省', city: '开封市', lng: 114.3, lat: 34.8, type: '宫殿建筑群', event: '州衙改建，丁字形宫前广场为北宋创造，大庆殿为朝会正殿。' },
    { name: '南宋临安皇宫遗址', dynastyRaw: '南宋', dynasty: '宋', province: '浙江省', city: '杭州市', lng: 120.15, lat: 30.25, type: '宫殿建筑群', event: '州衙改建，凤凰山麓，大内规模较小，工字殿形制。' },
    { name: '金中都宫殿遗址', dynastyRaw: '金', dynasty: '其他', province: '北京市', city: '丰台区', lng: 116.333, lat: 39.867, type: '宫殿建筑群', event: '仿北宋汴梁宫殿，前朝后寝格局，后为元大都宫殿沿用。' },
    { name: '元大都宫殿遗址', dynastyRaw: '元', dynasty: '元', province: '北京市', city: '西城区', lng: 116.383, lat: 39.917, type: '宫殿建筑群', event: '前朝后寝，宫后建御花园，丁字形广场移至皇城外，明故宫继承其格局。' },
    { name: '元上都宫殿遗址', dynastyRaw: '元', dynasty: '元', province: '内蒙古自治区', city: '正蓝旗', lng: 115.967, lat: 42.367, type: '宫殿建筑群', event: '元世祖忽必烈即位之地，包含大安阁、穆清阁等建筑，夏季理政之所。' },
    { name: '南京明故宫遗址', dynastyRaw: '明', dynasty: '明', province: '江苏省', city: '南京市', lng: 118.817, lat: 32.033, type: '宫殿建筑群', event: '明太祖朱元璋皇宫，北京故宫蓝本，洪武、建文、永乐三朝使用。' },
    { name: '北京故宫', dynastyRaw: '明清', dynasty: '明', province: '北京市', city: '东城区', lng: 116.383, lat: 39.917, type: '宫殿建筑群', event: '现存最大最完整木结构宫殿群，24位皇帝居住，前朝后寝，中轴对称。' },
    { name: '承德避暑山庄宫殿区', dynastyRaw: '清', dynasty: '清', province: '河北省', city: '承德市', lng: 117.933, lat: 40.983, type: '离宫别苑', event: '清代皇帝夏宫，正宫、松鹤斋、东宫等宫殿群，兼具园林与理政功能。' },
    { name: '颐和园宫殿群', dynastyRaw: '清', dynasty: '清', province: '北京市', city: '海淀区', lng: 116.267, lat: 39.983, type: '离宫别苑', event: '慈禧太后长期居所，仁寿殿、乐寿堂、排云殿等宫殿建筑。' },
    { name: '圆明园宫殿群', dynastyRaw: '清', dynasty: '清', province: '北京市', city: '海淀区', lng: 116.3, lat: 40.0, type: '离宫别苑', event: '万园之园，含正大光明殿、勤政亲贤殿等宫殿建筑，1860年被毁。' },
    { name: '雍和宫', dynastyRaw: '清', dynasty: '清', province: '北京市', city: '东城区', lng: 116.417, lat: 39.95, type: '宫殿建筑群', event: '雍正皇帝即位前王府，乾隆出生地，后改建藏传佛寺。' },
    { name: '布达拉宫', dynastyRaw: '清', dynasty: '清', province: '西藏自治区', city: '拉萨市', lng: 91.117, lat: 29.65, type: '宫殿建筑群', event: '藏式宫殿代表，达赖喇嘛冬宫，集宫殿、佛寺、城堡于一体。' },
    { name: '伪满皇宫', dynastyRaw: '民国', dynasty: '其他', province: '吉林省', city: '长春市', lng: 125.35, lat: 43.9, type: '宫殿建筑群', event: '末代皇帝溥仪傀儡政权宫殿，中国最后一座皇宫。' },
    { name: '华清宫遗址', dynastyRaw: '唐-清', dynasty: '唐', province: '陕西省', city: '西安市临潼区', lng: 109.217, lat: 34.367, type: '离宫别苑', event: '唐玄宗与杨贵妃故事发生地，现存温泉遗址及复建建筑。' }
  ];

  const state = {
    raw: [...PALACE_DATA],
    list: [...PALACE_DATA],
    selected: null,
    charts: { map: null, heat: null, bar: null, pie: null, sankey: null }
  };

  function uniq(arr) { return [...new Set(arr)].filter(Boolean); }
  function countBy(list, key) {
    const m = {};
    list.forEach((x) => { const k = x[key] || '未知'; m[k] = (m[k] || 0) + 1; });
    return m;
  }

  function fillSelect(id, values) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">全部</option>' + values.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  function initFilters() {
    fillSelect('palaceDynastyFilter', DYNASTY_ORDER.filter(d => state.raw.some(x => x.dynasty === d)));
    fillSelect('palaceTypeFilter', uniq(state.raw.map(x => x.type)));
    document.getElementById('palaceDynastyFilter')?.addEventListener('change', applyFilters);
    document.getElementById('palaceTypeFilter')?.addEventListener('change', applyFilters);
    document.getElementById('palaceResetBtn')?.addEventListener('click', () => {
      document.getElementById('palaceDynastyFilter').value = '';
      document.getElementById('palaceTypeFilter').value = '';
      applyFilters();
    });
    document.getElementById('palaceExportBtn')?.addEventListener('click', exportCsv);
  }

  function applyFilters() {
    const dynasty = document.getElementById('palaceDynastyFilter')?.value || '';
    const type = document.getElementById('palaceTypeFilter')?.value || '';
    state.list = state.raw.filter(x => (!dynasty || x.dynasty === dynasty) && (!type || x.type === type));
    state.selected = null;
    renderAll();
  }

  function toCsv(rows) {
    const head = ['名称', '时代', '省份', '市县', '经度', '纬度', '类型', '历史事件'];
    const lines = rows.map(r => [r.name, r.dynastyRaw, r.province, r.city, r.lng, r.lat, r.type, r.event]);
    const esc = (v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    return [head, ...lines].map(line => line.map(esc).join(',')).join('\n');
  }

  function exportCsv() {
    const blob = new Blob(['\ufeff' + toCsv(state.list)], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '皇宫筛选结果.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function renderMapScatter() {
    const el = document.getElementById('palaceMapScatter');
    state.charts.map = echarts.getInstanceByDom(el) || echarts.init(el);

    const groups = {};
    DYNASTY_ORDER.forEach(d => { groups[d] = []; });
    state.list.forEach((p) => {
      groups[p.dynasty] = groups[p.dynasty] || [];
      groups[p.dynasty].push({ name: p.name, value: [p.lng, p.lat], extra: p });
    });

    const series = DYNASTY_ORDER.map((d) => ({
      name: d,
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: 11,
      rippleEffect: { scale: 2.5, brushType: 'stroke' },
      itemStyle: { color: DYNASTY_COLOR[d] || DYNASTY_COLOR['其他'] },
      data: groups[d] || []
    }));

    state.charts.map.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const d = p.data?.extra;
          if (!d) return p.name || '';
          return `<b>${d.name}</b><br/>时代：${d.dynastyRaw}<br/>类型：${d.type}<br/>位置：${d.province} ${d.city}<br/>历史事件：${d.event}`;
        }
      },
      legend: { top: 8, textStyle: { color: '#f4e9cf' }, data: DYNASTY_ORDER.filter(d => (groups[d] || []).length) },
      geo: {
        map: 'china', roam: true, zoom: 1.1, label: { show: false },
        itemStyle: { areaColor: '#1a3f5f', borderColor: '#d0b585', borderWidth: 1 },
        emphasis: { itemStyle: { areaColor: '#6f2a24' } }
      },
      series
    });

    state.charts.map.off('click');
    state.charts.map.on('click', (params) => {
      const d = params.data?.extra;
      if (!d) return;
      state.selected = d;
      renderDetail();
      highlightBySelection();
    });
  }

  function renderHeatMap() {
    const el = document.getElementById('palaceHeatMap');
    state.charts.heat = echarts.getInstanceByDom(el) || echarts.init(el);

    state.charts.heat.setOption({
      tooltip: { formatter: (p) => p.data?.extra ? `<b>${p.data.extra.name}</b><br/>热度：${p.data.value[2]}` : '' },
      geo: {
        map: 'china', roam: true, zoom: 1.1, label: { show: false },
        itemStyle: { areaColor: '#163955', borderColor: '#cba96b' }, emphasis: { itemStyle: { areaColor: '#784036' } }
      },
      visualMap: {
        min: 0, max: 12, calculable: true, orient: 'horizontal', left: 'center', bottom: 8,
        textStyle: { color: '#f4e9cf' }, inRange: { color: ['#244b68', '#3c79a2', '#66b1d8', '#d7a44b', '#c1493f'] }
      },
      series: [{
        type: 'heatmap', coordinateSystem: 'geo', pointSize: 11, blurSize: 16,
        data: state.list.map((p) => ({ value: [p.lng, p.lat, 6], extra: p }))
      }]
    });
  }

  function renderDynastyBar() {
    const el = document.getElementById('palaceDynastyBar');
    state.charts.bar = echarts.getInstanceByDom(el) || echarts.init(el);

    const c = countBy(state.list, 'dynasty');
    const keys = DYNASTY_ORDER.filter(k => c[k]);

    state.charts.bar.setOption({
      grid: { left: 38, right: 14, top: 24, bottom: 28 },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'category', data: keys, axisLabel: { color: '#dbe7f2' } },
      yAxis: { type: 'value', axisLabel: { color: '#dbe7f2' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.12)' } } },
      series: [{ type: 'bar', data: keys.map(k => c[k]), barWidth: 20, itemStyle: { color: (p) => DYNASTY_COLOR[keys[p.dataIndex]] || '#8da0b3' } }]
    });
  }

  function renderTypePie() {
    const el = document.getElementById('palaceTypePie');
    state.charts.pie = echarts.getInstanceByDom(el) || echarts.init(el);

    const c = countBy(state.list, 'type');
    const data = Object.entries(c).map(([name, value]) => ({ name, value }));

    state.charts.pie.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color: '#f4e9cf', fontSize: 11 } },
      series: [{ type: 'pie', radius: ['45%', '70%'], center: ['50%', '45%'], label: { color: '#f4e9cf' }, itemStyle: { borderColor: '#0f1a2b', borderWidth: 2 }, data }]
    });
  }

  function renderSankey() {
    const el = document.getElementById('palaceSankey');
    state.charts.sankey = echarts.getInstanceByDom(el) || echarts.init(el);

    const dynCount = countBy(state.list, 'dynasty');
    const typeCountByDyn = {};
    state.list.forEach((p) => {
      const key = `${p.dynasty}→${p.type}`;
      typeCountByDyn[key] = (typeCountByDyn[key] || 0) + 1;
    });

    const typeNodes = uniq(state.list.map(p => p.type));
    const nodes = [...DYNASTY_ORDER.filter(d => dynCount[d]).map(d => ({ name: d })), ...typeNodes.map(t => ({ name: t }))];

    const links = [];
    Object.entries(typeCountByDyn).forEach(([k, v]) => {
      const [d, t] = k.split('→');
      links.push({ source: d, target: t, value: v });
    });
    for (let i = 0; i < DYNASTY_ORDER.length - 1; i++) {
      const a = DYNASTY_ORDER[i];
      const b = DYNASTY_ORDER[i + 1];
      if (dynCount[a] && dynCount[b]) links.push({ source: a, target: b, value: Math.max(1, Math.min(dynCount[a], dynCount[b])) });
    }

    state.charts.sankey.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'sankey', top: 4, bottom: 4, nodeWidth: 6, nodeGap: 6,
        emphasis: { focus: 'adjacency' }, label: { color: '#f4e9cf', fontSize: 9 },
        lineStyle: { color: 'source', opacity: 0.36, curveness: 0.4 },
        data: nodes, links
      }]
    });
  }

  function renderDetail() {
    const el = document.getElementById('palaceDetail');
    if (!el) return;
    const d = state.selected;
    if (!d) {
      el.innerHTML = '点击地图散点查看皇宫详情，并联动高亮其时代与类型数据。';
      return;
    }
    el.innerHTML = `<div><b>${d.name}</b></div><div>时代：${d.dynastyRaw}</div><div>类型：${d.type}</div><div>地点：${d.province} ${d.city}</div><div>历史事件：${d.event}</div>`;
  }

  function highlightBySelection() {
    if (!state.selected) return;
    const dyn = state.selected.dynasty;
    const typ = state.selected.type;

    const barOpt = state.charts.bar?.getOption();
    if (barOpt?.xAxis?.[0]?.data) {
      const idx = barOpt.xAxis[0].data.indexOf(dyn);
      if (idx >= 0) {
        state.charts.bar.dispatchAction({ type: 'downplay', seriesIndex: 0 });
        state.charts.bar.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx });
      }
    }

    const pieOpt = state.charts.pie?.getOption();
    if (pieOpt?.series?.[0]?.data) {
      const pidx = pieOpt.series[0].data.findIndex(d => d.name === typ);
      if (pidx >= 0) {
        state.charts.pie.dispatchAction({ type: 'downplay', seriesIndex: 0 });
        state.charts.pie.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: pidx });
      }
    }

    state.charts.sankey?.dispatchAction({ type: 'highlight', name: dyn });
    state.charts.sankey?.dispatchAction({ type: 'highlight', name: typ });
  }

  function renderAll() {
    renderMapScatter();
    renderHeatMap();
    renderDynastyBar();
    renderTypePie();
    renderSankey();
    renderDetail();
  }

  function init() {
    initFilters();
    renderAll();
    window.addEventListener('resize', () => {
      Object.values(state.charts).forEach(c => c && c.resize());
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
