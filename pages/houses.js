// houses.js
// 中国古代民居建筑大屏（数据写死，不走本地文件读取）

(function () {
  // 直接内嵌：民居名录详细表.csv
  const HOUSE_CSV_TEXT = `序号,名称/代表村落,时代,省份,市县,经度(E),纬度(N),民居类型,主体材料,屋顶形制,院落格局
1,西递村,明清,安徽,黟县,117°38',30°11',徽派,砖木,硬山(马头墙),天井式三合院
2,宏村,明清,安徽,黟县,117°59',30°00',徽派,砖木,硬山(马头墙),天井式合院
3,唐模村,明清,安徽,黄山市徽州区,118°22',29°51',徽派,砖木,硬山,天井式
4,呈坎村,宋-清,安徽,黄山市徽州区,118°17',29°55',徽派,砖木,硬山,天井式
5,南屏村,明清,安徽,黟县,117°58',29°54',徽派,砖木,硬山,天井式
6,北京四合院(典型),元-清,北京,东城区,116°24',39°55',晋派/北方四合院,砖木,硬山/卷棚,四合院
7,爨底下村,明清,北京,门头沟区,115°41',39°57',山地四合院,砖石/木,硬山,山地四合院
8,乔家大院,清,山西,祁县,112°20',37°21',晋派/晋商大院,砖木,硬山,城堡式合院
9,王家大院,清,山西,灵石县,111°49',36°51',晋派/晋商大院,砖木,硬山,城堡式合院
10,皇城相府,明清,山西,阳城县,112°33',35°29',晋派/城堡式,砖木/石,硬山/歇山,城堡式聚落
11,丁村民居,明-清,山西,襄汾县,111°28',35°52',晋派,砖木,硬山,四合院
12,平遥古城民居,明清,山西,平遥县,112°11',37°12',晋派,砖木,硬山,四合院
13,福建土楼(振成楼),明-清,福建,永定区,117°03',24°40',客家/土楼,夯土/木,悬山,圆形聚落
14,福建土楼(田螺坑),明-清,福建,南靖县,117°04',24°37',客家/土楼,夯土/木,悬山,圆形/方形
15,培田古村,明清,福建,连城县,116°46',25°25',客家/九厅十八井,砖木,硬山/悬山,九厅十八井
16,五凤楼(福裕楼),清,福建,永定区,117°02',24°41',客家/五凤楼,夯土/木,悬山,府第式
17,泉州古厝(蔡氏古民居),清,福建,南安市,118°23',24°57',闽南/红砖厝,砖石/木,硬山(燕尾脊),三合院/四合院
18,番仔楼(典型),近代,福建,晋江市,118°34',24°48',闽南/中西合璧,砖石/木,硬山/西式,单体/合院
19,梅州围龙屋(仁厚温公祠),明清,广东,梅州市梅县区,116°06',24°18',客家/围龙屋,夯土/木,悬山,半圆形围合
20,韶关满堂围,清,广东,始兴县,114°09',24°57',客家/围楼,砖石/木,硬山,城堡式方围
21,开平碉楼(自力村),民国,广东,开平市,112°34',22°22',侨乡/碉楼,砖石/混凝土,平顶/西式,单体塔楼
22,广州陈家祠,清,广东,广州市荔湾区,113°15',23°08',岭南/广府,砖木,硬山(镬耳),三进三路
23,佛山祖庙民居群,明清,广东,佛山市禅城区,113°07',23°02',岭南/广府,砖木,硬山(镬耳),三间两廊
24,大旗头村,清,广东,佛山市三水区,112°53',23°21',岭南/广府,砖木,硬山(镬耳),梳式布局
25,上岳古村,明清,广东,清远市佛冈县,113°33',23°52',岭南/广府,砖木,硬山(镬耳),广府民居
26,周庄(沈厅),明清,江苏,昆山市,120°51',31°07',江南水乡,砖木,硬山,临水天井院
27,同里(退思园),清,江苏,苏州市吴江区,120°43',31°10',江南水乡,砖木,硬山,宅园合一
28,乌镇,明清,浙江,桐乡市,120°29',30°45',江南水乡,砖木,硬山,临水沿河
29,南浔(张石铭旧宅),清末民初,浙江,湖州市南浔区,120°25',30°53',江南水乡/中西合璧,砖木,硬山,多进合院
30,绍兴台门(斯盛居),清,浙江,诸暨市,120°17',29°43',浙中/台门,砖木,硬山,多进合院
31,诸葛村,明清,浙江,兰溪市,119°16',29°15',浙西/徽派融合,砖木,硬山,天井式
32,婺源理坑村,明清,江西,婺源县,117°49',29°28',徽派(赣北),砖木,硬山(马头墙),天井式
33,钓源古村,明清,江西,吉安市吉州区,115°00',27°07',赣派,砖木,硬山,太极布局聚落
34,流坑村,明清,江西,乐安县,115°47',27°22',赣派,砖木,硬山,棋盘式聚落
35,总门里建筑群,清,江西,抚州市东乡区,116°36',28°15',赣派,砖木,硬山,多进合院
36,地坑院(典型),明清-现代,河南,三门峡市陕州区,111°11',34°45',窑洞/地坑院,黄土/砖,平顶,地下四合院
37,康百万庄园,明清,河南,巩义市,112°58',34°47',中原/庄园,砖石/木,硬山,城堡式庄园
38,延安窑洞(典型),近代,陕西,延安市宝塔区,109°29',36°35',窑洞/靠崖式,黄土,拱券,依山单体
39,关中民居(典型),明清,陕西,咸阳市礼泉县,108°25',34°29',关中/窄院,砖木/夯土,硬山,窄院四合院
40,党家村,明清,陕西,韩城市,110°26',35°28',关中/北方合院,砖木/石,硬山,四合院聚落
41,丽江古城民居,明清,云南,丽江市古城区,100°14',26°52',纳西族/三坊一照壁,木/土坯,悬山,三合院+照壁
42,大理白族民居(典型),明清,云南,大理市喜洲镇,100°07',25°52',白族/三坊一照壁,砖木/石,硬山,三合院/四合院
43,和顺古镇,明清,云南,腾冲市,98°27',25°01',西南/合院式,砖木/石,硬山/悬山,三合院/四合院
44,西江千户苗寨,清-现代,贵州,雷山县,108°10',26°30',苗族/干栏式,木,歇山/悬山,依山聚落
45,肇兴侗寨,明清,贵州,黎平县,109°10',26°04',侗族/干栏式,木,悬山/歇山,聚落+鼓楼
46,桃坪羌寨,明清,四川,理县,103°26',31°32',羌族/碉楼,石/夯土,平顶,碉楼聚落
47,重庆吊脚楼(洪崖洞),近代,重庆,渝中区,106°35',29°33',巴渝/干栏式,木,悬山,依山吊脚
48,丹巴藏寨(甲居),近代,四川,丹巴县,101°54',30°55',藏族/碉房,石/木,平顶,碉楼式单体
49,蒙古包(典型),传统,内蒙古,锡林浩特市,116°04',43°57',草原/毡帐,毛毡/木,穹顶,圆形单体
50,朝鲜族民居(典型),近代,吉林,延边州安图县,128°54',42°52',朝鲜族/满屋炕,木/砖,歇山/硬山,U型/单体
51,西递、宏村,明、清,安徽,黟县,117°38',30°11',徽派,砖木,硬山 (马头墙),天井式三合院/四合院
52,北京四合院,元、明、清,北京,城区,116°23',39°54',晋派 (北方四合院),砖木,硬山/卷棚,四合院 (中轴对称)
53,福建土楼,明、清,福建,永定/南靖,117°03',24°40',闽南 (客家土楼),夯土/木,悬山 (青瓦),圆形/方形聚落
54,围龙屋,明、清,广东/福建,梅州/龙岩,116°06',24°18',客家 (围龙屋),夯土/木,悬山,半圆形围合
55,镬耳屋,清,广东,珠江三角洲,113°14',23°08',岭南 (广府),砖木,硬山 (镬耳墙),三合院/四合院
56,苗族/土家族村落,清、现代,重庆/贵州/广西,彭水县/西江,108°14',29°15',干栏式 (吊脚楼),木/竹,歇山/悬山,依山聚落 (单体)
57,下沉式地坑院,历代,河南/陕西/山西,三门峡/延安,111°11',34°45',窑洞,黄土/砖,平顶/拱券,地下四合院
58,周庄/乌镇,明、清,江苏/浙江,苏州/嘉兴,120°51',30°55',江南水乡,砖木,硬山 (观音兜),临水天井院
59,丽江古城,明、清,云南,丽江,100°14',26°52',西南合院 (三坊一照壁),木/土坯,悬山,三合院+照壁
60,藏族民居,近代,西藏/青海,拉萨/同仁,91°08',29°39',藏族碉房,石/夯土,平顶,单体/碉楼式
61,下山虎（典型）,明清-现代,广东,潮汕地区全域,116°38',23°40',潮汕/三合院,砖木,硬山,三合院（三间两伸手）
62,四点金（典型）,明清-现代,广东,潮汕地区全域,116°38',23°40',潮汕/四合院,砖木,硬山,四合院（天井式）
63,驷马拖车（典型）,明清,广东,潮汕地区全域,116°38',23°40',潮汕/大型府第,砖木/石,硬山,多进多路合院群
64,东里古寨,清乾隆,广东,汕头市潮南区,116°26',23°15',潮汕/方寨,砖木/石,硬山（五行山墙）,城堡式聚落
65,陈慈黉故居,清末-民国,广东,汕头市澄海区,116°48',23°32',潮汕/侨宅,砖木/钢筋混凝土,硬山/西式平顶,驷马拖车+中西合璧
66,龙湖古寨,宋-明清,广东,潮州市潮安区,116°39',23°33',潮汕/聚落,砖木,硬山,三街六巷聚落
67,竹竿厝（典型）,明清,广东,潮州市饶平县,117°00',23°40',潮汕/窄院,石/砖木,硬山,纵向单开间
68,小公园骑楼（近代）,1920-30年代,广东,汕头市金平区,116°40',23°21',骑楼/商住,砖混结构,平顶（山花装饰）,沿街连续柱廊
69,霍州署衙,元-清,山西,霍州市,111°45',36°34',州衙,砖木,硬山,州衙院落（尉迟敬德府邸改建）
70,澶州署,宋,河南,濮阳县,115°02',35°42',州衙,砖木,硬山,州衙院落（治理黄河水患中枢）
71,赵州署,明清,河北,赵县,114°46',37°45',州衙,砖木,硬山,州衙院落（隋代赵州桥所在）
72,定州署,明清,河北,定州市,114°59',38°31',州衙,砖木,硬山,州衙院落（中山国故地）
73,易州署,明清,河北,易县,115°30',39°21',州衙,砖木,硬山,州衙院落（清西陵所在）
74,深州署,明清,河北,深州市,115°33',38°00',州衙,砖木,硬山,州衙院落（直隶州治）
75,晋州署,明清,河北,晋州市,115°03',38°02',州衙,砖木,硬山,州衙院落（唐代始置）
76,磁州署,明清,河北,磁县,114°23',36°22',州衙,砖木,硬山,州衙院落（宋代磁州窑所在）
77,绛州署,明清,山西,新绛县,111°13',35°37',州衙,砖木,硬山,州衙院落（唐代绛州治所）
78,解州署,明清,山西,运城市,110°59',34°56',州衙,砖木,硬山,州衙院落（关羽故里）
79,辽州署,明清,山西,左权县,113°22',37°05',州衙,砖木,硬山,州衙院落（太行山要冲）
80,沁州署,明清,山西,沁县,112°42',36°45',州衙,砖木,硬山,州衙院落（唐代始置）
81,泰安州署,明清,山东,泰安市,117°05',36°12',州衙,砖木,硬山,州衙院落（泰山脚下）
82,胶州署,明清,山东,胶州市,120°02',36°16',州衙,砖木,硬山,州衙院落（胶州湾畔）
83,莒州署,明清,山东,莒县,118°50',35°35',州衙,砖木,硬山,州衙院落（春秋莒国故地）`;

  const TYPE_COLOR = {
    '徽派': '#f0c98a',
    '晋派': '#c28a4a',
    '闽南': '#e26d5a',
    '岭南': '#d6b26c',
    '客家': '#9f7aea',
    '江南水乡': '#4db6e2',
    '干栏式': '#66c2a5',
    '窑洞': '#9aa6b2',
    '州衙': '#4f8dff',
    '未知类型': '#8bd6ff'
  };

  const RADAR_SCORE = {
    '徽派': [72, 68, 55, 84, 70],
    '晋派': [58, 86, 72, 66, 74],
    '闽南': [88, 60, 62, 78, 76],
    '岭南': [85, 62, 60, 80, 72],
    '客家': [69, 73, 93, 63, 93],
    '江南水乡': [95, 52, 45, 82, 66],
    '干栏式': [82, 70, 58, 75, 78],
    '窑洞': [40, 92, 64, 48, 62],
    '州衙': [52, 78, 70, 72, 68],
    '未知类型': [60, 60, 60, 60, 60]
  };

  let allRows = [];
  let filteredRows = [];
  let mapChart, materialChart, eraChart, radarChart, layoutChart;

  function parseCsvText(text) {
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => resolve(res.data || []),
        error: reject
      });
    });
  }

  function groupCount(list, key) {
    const m = {};
    list.forEach((it) => {
      const k = (it[key] || '未知').trim();
      m[k] = (m[k] || 0) + 1;
    });
    return m;
  }

  function uniqueValues(list, key) {
    return [...new Set(list.map(x => (x[key] || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }

  function fillSelect(id, values) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">全部</option>' + values.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  function buildFilteredRows() {
    const era = document.getElementById('housesFilterEra')?.value || '';
    const province = document.getElementById('housesFilterProvince')?.value || '';
    const type = document.getElementById('housesFilterType')?.value || '';
    const material = document.getElementById('housesFilterMaterial')?.value || '';

    return allRows.filter(r =>
      (!era || r.era === era) &&
      (!province || r.province === province) &&
      (!type || r.typeRaw === type) &&
      (!material || r.material === material)
    );
  }

  function toCsv(rows) {
    const head = ['名称', '时代', '省份', '市县', '经度', '纬度', '民居类型', '主体材料', '屋顶形制', '院落格局'];
    const lines = rows.map(r => [r.name, r.era, r.province, r.city, r.lng, r.lat, r.typeRaw || r.type, r.material, r.roof, r.layout]);
    const esc = (v) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [head, ...lines].map(line => line.map(esc).join(',')).join('\n');
  }

  function exportFilteredCsv() {
    const csv = toCsv(filteredRows);
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = '民居筛选结果.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function applyFiltersAndRender() {
    filteredRows = buildFilteredRows();
    renderMap();
    renderMaterialRose();
    renderEraArea();
    renderRadarBySelectedTypes();
    renderLayoutBar();
  }

  function initFilterBar() {
    fillSelect('housesFilterEra', uniqueValues(allRows, 'era'));
    fillSelect('housesFilterProvince', uniqueValues(allRows, 'province'));
    fillSelect('housesFilterType', uniqueValues(allRows, 'typeRaw'));
    fillSelect('housesFilterMaterial', uniqueValues(allRows, 'material'));

    ['housesFilterEra', 'housesFilterProvince', 'housesFilterType', 'housesFilterMaterial'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', applyFiltersAndRender);
    });

    document.getElementById('housesExportCsvBtn')?.addEventListener('click', exportFilteredCsv);
    document.getElementById('housesResetFilterBtn')?.addEventListener('click', () => {
      ['housesFilterEra', 'housesFilterProvince', 'housesFilterType', 'housesFilterMaterial'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      applyFiltersAndRender();
    });
  }

  // 将 “117°38'” 转十进制度
  function parseDegreeToDecimal(raw) {
    const s = String(raw || '').trim();
    if (!s) return NaN;
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);

    const m = s.match(/^(-?\d+(?:\.\d+)?)\s*°\s*(\d+(?:\.\d+)?)?\s*'?/);
    if (!m) return NaN;

    const deg = Number(m[1]);
    const min = m[2] ? Number(m[2]) : 0;
    if (!Number.isFinite(deg) || !Number.isFinite(min)) return NaN;
    return deg >= 0 ? deg + min / 60 : deg - min / 60;
  }

  function normType(type) {
    const t = (type || '').trim();
    if (!t) return '未知类型';
    if (t.startsWith('徽派')) return '徽派';
    if (t.startsWith('晋派')) return '晋派';
    if (t.includes('闽南')) return '闽南';
    if (t.includes('岭南') || t.includes('侨乡')) return '岭南';
    if (t.includes('客家')) return '客家';
    if (t.includes('江南水乡')) return '江南水乡';
    if (t.includes('干栏')) return '干栏式';
    if (t.includes('窑洞')) return '窑洞';
    if (t.includes('州衙') || t.includes('署衙') || t.endsWith('州署') || t.includes('府衙')) return '州衙';
    return '未知类型';
  }

  function normRow(r) {
    const typeRaw = (r['民居类型'] || '').trim();
    return {
      name: (r['名称/代表村落'] || '').trim(),
      era: (r['时代'] || '').trim(),
      province: (r['省份'] || '').trim(),
      city: (r['市县'] || '').trim(),
      lng: parseDegreeToDecimal(r['经度(E)']),
      lat: parseDegreeToDecimal(r['纬度(N)']),
      type: normType(typeRaw),
      typeRaw,
      material: (r['主体材料'] || '').trim(),
      roof: (r['屋顶形制'] || '').trim(),
      layout: (r['院落格局'] || '').trim(),
      level: '名录数据'
    };
  }

  async function renderMap() {
    const el = document.getElementById('housesChinaMap');
    mapChart = echarts.getInstanceByDom(el) || echarts.init(el);

    // 兜底：如果 CDN 的 china.js 未加载成功，尝试动态拉取并注册地图
    if (!echarts.getMap('china')) {
      try {
        const geoJson = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then(r => r.json());
        echarts.registerMap('china', geoJson);
      } catch (e) {
        el.innerHTML = '<div style="padding:20px;color:#f4e9cf;">中国地图加载失败（网络或CDN不可用），请使用可联网环境后刷新。</div>';
        return;
      }
    }

    const baseRows = filteredRows.length ? filteredRows : allRows;
    const types = [...new Set(baseRows.map(r => r.type))];
    const series = types.map((type) => {
      const isYamen = type === '州衙';
      return {
        name: type,
        type: isYamen ? 'scatter' : 'effectScatter',
        coordinateSystem: 'geo',
        data: baseRows.filter(r => r.type === type).map((r) => ({
          name: r.name,
          value: [r.lng, r.lat],
          extra: r
        })),
        symbolSize: isYamen ? 7 : 10,
        rippleEffect: isYamen ? undefined : { scale: 2.6, brushType: 'stroke' },
        itemStyle: { color: isYamen ? '#2f7bff' : (TYPE_COLOR[type] || '#8bd6ff') },
        emphasis: { scale: true },
        z: isYamen ? 6 : 3
      };
    });

    mapChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const d = p.data?.extra;
          if (!d) return p.name || '';
          return `<b>${d.name}</b><br/>类型：${d.typeRaw || d.type}<br/>时代：${d.era}<br/>省市：${d.province} ${d.city}<br/>材料：${d.material}<br/>屋顶：${d.roof}<br/>格局：${d.layout}`;
        }
      },
      legend: {
        top: 10,
        textStyle: { color: '#f4e9cf' },
        data: types,
        selectedMode: 'multiple'
      },
      geo: {
        map: 'china',
        roam: true,
        zoom: 1.1,
        label: { show: false },
        itemStyle: { areaColor: '#1a3f5f', borderColor: '#d0b585', borderWidth: 1 },
        emphasis: { itemStyle: { areaColor: '#6f2a24' } }
      },
      series
    });

    mapChart.on('legendselectchanged', (params) => {
      renderRadarBySelectedTypes(params.selected);
    });
  }

  function renderMaterialRose() {
    const el = document.getElementById('materialRoseChart');
    materialChart = echarts.getInstanceByDom(el) || echarts.init(el);
    const m = groupCount(filteredRows.length ? filteredRows : allRows, 'material');
    const data = Object.entries(m).map(([name, value]) => ({ name, value }));

    materialChart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        name: '主体材料',
        type: 'pie',
        roseType: 'area',
        radius: [25, 95],
        center: ['50%', '55%'],
        data,
        label: { color: '#f4e9cf' },
        itemStyle: { borderColor: 'rgba(11,20,30,.9)', borderWidth: 2 }
      }]
    });
  }

  function renderEraArea() {
    const el = document.getElementById('eraAreaChart');
    eraChart = echarts.getInstanceByDom(el) || echarts.init(el);

    const m = groupCount(filteredRows.length ? filteredRows : allRows, 'era');
    const keys = Object.keys(m);
    const vals = keys.map(k => m[k]);

    eraChart.setOption({
      grid: { left: 36, right: 16, top: 20, bottom: 28 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: keys, axisLabel: { color: '#cfe2f3' } },
      yAxis: { type: 'value', axisLabel: { color: '#cfe2f3' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.12)' } } },
      series: [{
        type: 'line', smooth: true, data: vals, symbolSize: 8,
        lineStyle: { color: '#7fd1ff', width: 3 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(127,209,255,.55)' },
            { offset: 1, color: 'rgba(127,209,255,.05)' }
          ])
        }
      }]
    });
  }

  // 根据当前图例可见类型，动态计算雷达平均分
  function renderRadarBySelectedTypes(selectedMap) {
    const el = document.getElementById('adaptRadarChart');
    radarChart = echarts.getInstanceByDom(el) || echarts.init(el);

    const baseRows = filteredRows.length ? filteredRows : allRows;
    let activeTypes = [...new Set(baseRows.map(r => r.type))];
    if (selectedMap) activeTypes = activeTypes.filter(t => selectedMap[t] !== false);

    const base = [0, 0, 0, 0, 0];
    let count = 0;
    activeTypes.forEach((t) => {
      const s = RADAR_SCORE[t] || RADAR_SCORE['未知类型'];
      s.forEach((v, i) => { base[i] += v; });
      count += 1;
    });

    const avg = count ? base.map(v => Math.round(v / count)) : [0, 0, 0, 0, 0];

    radarChart.setOption({
      tooltip: {},
      radar: {
        center: ['50%', '55%'], radius: '65%',
        indicator: [
          { name: '防潮通风', max: 100 },
          { name: '防寒保温', max: 100 },
          { name: '防御安全', max: 100 },
          { name: '采光', max: 100 },
          { name: '宗族聚居', max: 100 }
        ],
        axisName: { color: '#f4e9cf' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,.15)' } },
        splitArea: { areaStyle: { color: ['rgba(255,255,255,.02)', 'rgba(255,255,255,.04)'] } }
      },
      series: [{
        type: 'radar',
        data: [{
          value: avg,
          name: '当前类型综合适应性',
          lineStyle: { color: '#f0c98a', width: 2 },
          areaStyle: { color: 'rgba(240,201,138,.35)' },
          itemStyle: { color: '#ffd58e' }
        }]
      }]
    });
  }

  function renderLayoutBar() {
    const el = document.getElementById('layoutBarChart');
    layoutChart = echarts.getInstanceByDom(el) || echarts.init(el);

    const m = groupCount(filteredRows.length ? filteredRows : allRows, 'layout');
    const entries = Object.entries(m).sort((a, b) => b[1] - a[1]);

    layoutChart.setOption({
      grid: { left: 110, right: 12, top: 16, bottom: 24 },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', axisLabel: { color: '#cfe2f3' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.12)' } } },
      yAxis: { type: 'category', data: entries.map(e => e[0]), axisLabel: { color: '#f4e9cf' } },
      series: [{ type: 'bar', data: entries.map(e => e[1]), barWidth: 12, itemStyle: { color: '#7ab6d9' } }]
    });
  }

  async function init() {
    try {
      const rows = await parseCsvText(HOUSE_CSV_TEXT);
      allRows = rows.map(normRow).filter(r => Number.isFinite(r.lng) && Number.isFinite(r.lat));

      if (!allRows.length) {
        throw new Error('CSV 解析后无有效经纬度数据');
      }

      filteredRows = [...allRows];
      initFilterBar();

      await renderMap();
      renderMaterialRose();
      renderEraArea();
      renderRadarBySelectedTypes();
      renderLayoutBar();

      window.addEventListener('resize', () => {
        [mapChart, materialChart, eraChart, radarChart, layoutChart].forEach(c => c && c.resize());
      });
    } catch (err) {
      console.error(err);
      const mapEl = document.getElementById('housesChinaMap');
      if (mapEl) {
        mapEl.innerHTML = `<div style="padding:20px;color:#f4e9cf;">渲染失败：${err.message}</div>`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
