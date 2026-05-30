/* =========================
   通用配置与工具函数
========================= */

const echarts = window.echarts;

const CHINA_GEOJSON_URLS = [
  'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  'https://geo.datav.aliyun.com/areas_v3/bound/100000.json',
  './data/geo/100000_full.json'
];
const PROVINCE_GEOJSON_URLS = (adcode, provinceName) => [
  `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
  `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`,
  `./data/geo/${adcode}_full.json`
].filter(Boolean);

const PROVINCE_ADCODE_MAP = {
  '北京市': '110000',
  '天津市': '120000',
  '河北省': '130000',
  '山西省': '140000',
  '内蒙古自治区': '150000',
  '辽宁省': '210000',
  '吉林省': '220000',
  '黑龙江省': '230000',
  '上海市': '310000',
  '江苏省': '320000',
  '浙江省': '330000',
  '安徽省': '340000',
  '福建省': '350000',
  '江西省': '360000',
  '山东省': '370000',
  '河南省': '410000',
  '湖北省': '420000',
  '湖南省': '430000',
  '广东省': '440000',
  '广西壮族自治区': '450000',
  '海南省': '460000',
  '重庆市': '500000',
  '四川省': '510000',
  '贵州省': '520000',
  '云南省': '530000',
  '西藏自治区': '540000',
  '陕西省': '610000',
  '甘肃省': '620000',
  '青海省': '630000',
  '宁夏回族自治区': '640000',
  '新疆维吾尔自治区': '650000',
  '台湾省': '710000',
  '香港特别行政区': '810000',
  '澳门特别行政区': '820000'
};

const PROVINCE_ALIAS_MAP = {
  '北京': '北京市',
  '天津': '天津市',
  '河北': '河北省',
  '山西': '山西省',
  '内蒙古': '内蒙古自治区',
  '辽宁': '辽宁省',
  '吉林': '吉林省',
  '黑龙江': '黑龙江省',
  '上海': '上海市',
  '江苏': '江苏省',
  '浙江': '浙江省',
  '安徽': '安徽省',
  '福建': '福建省',
  '江西': '江西省',
  '山东': '山东省',
  '河南': '河南省',
  '湖北': '湖北省',
  '湖南': '湖南省',
  '广东': '广东省',
  '广西': '广西壮族自治区',
  '海南': '海南省',
  '重庆': '重庆市',
  '四川': '四川省',
  '贵州': '贵州省',
  '云南': '云南省',
  '西藏': '西藏自治区',
  '陕西': '陕西省',
  '甘肃': '甘肃省',
  '青海': '青海省',
  '宁夏': '宁夏回族自治区',
  '新疆': '新疆维吾尔自治区',
  '台湾': '台湾省',
  '香港': '香港特别行政区',
  '澳门': '澳门特别行政区'
};

const PROVINCE_CENTER_COORDS = {
  '北京市': [116.405285, 39.904989],
  '天津市': [117.190182, 39.125596],
  '河北省': [114.502461, 38.045474],
  '山西省': [112.549248, 37.857014],
  '内蒙古自治区': [111.670801, 40.818311],
  '辽宁省': [123.429096, 41.796767],
  '吉林省': [125.3245, 43.886841],
  '黑龙江省': [126.642464, 45.756967],
  '上海市': [121.472644, 31.231706],
  '江苏省': [118.767413, 32.041544],
  '浙江省': [120.153576, 30.287459],
  '安徽省': [117.283042, 31.86119],
  '福建省': [119.306239, 26.075302],
  '江西省': [115.892151, 28.676493],
  '山东省': [117.000923, 36.675807],
  '河南省': [113.665412, 34.757975],
  '湖北省': [114.298572, 30.584355],
  '湖南省': [112.982279, 28.19409],
  '广东省': [113.280637, 23.125178],
  '广西壮族自治区': [108.320004, 22.82402],
  '海南省': [110.33119, 20.031971],
  '重庆市': [106.504962, 29.533155],
  '四川省': [104.065735, 30.659462],
  '贵州省': [106.713478, 26.578343],
  '云南省': [102.712251, 25.040609],
  '西藏自治区': [91.132212, 29.660361],
  '陕西省': [108.948024, 34.263161],
  '甘肃省': [103.823557, 36.058039],
  '青海省': [101.778916, 36.623178],
  '宁夏回族自治区': [106.278179, 38.46637],
  '新疆维吾尔自治区': [87.617733, 43.792818],
  '台湾省': [121.509062, 25.044332],
  '香港特别行政区': [114.173355, 22.320048],
  '澳门特别行政区': [113.54909, 22.198951]
};

const PROVINCE_FALLBACK_BOUNDS = {
  '北京市': { name: '北京市', bounds: [[115.4, 39.4], [117.5, 41.1]] },
  '天津市': { name: '天津市', bounds: [[116.7, 38.5], [118.1, 40.3]] },
  '河北省': { name: '河北省', bounds: [[113.4, 36.0], [119.9, 42.6]] },
  '山西省': { name: '山西省', bounds: [[110.2, 34.5], [114.6, 40.7]] },
  '内蒙古自治区': { name: '内蒙古自治区', bounds: [[97.2, 37.4], [126.1, 53.4]] },
  '辽宁省': { name: '辽宁省', bounds: [[118.8, 38.7], [125.8, 43.5]] },
  '吉林省': { name: '吉林省', bounds: [[121.6, 40.8], [131.3, 46.3]] },
  '黑龙江省': { name: '黑龙江省', bounds: [[121.2, 43.4], [135.1, 53.6]] },
  '上海市': { name: '上海市', bounds: [[120.8, 30.7], [122.1, 31.9]] },
  '江苏省': { name: '江苏省', bounds: [[116.3, 30.8], [121.9, 35.2]] },
  '浙江省': { name: '浙江省', bounds: [[118.0, 27.0], [123.0, 31.3]] },
  '安徽省': { name: '安徽省', bounds: [[114.9, 29.4], [119.6, 34.7]] },
  '福建省': { name: '福建省', bounds: [[115.8, 23.5], [120.7, 28.4]] },
  '江西省': { name: '江西省', bounds: [[113.6, 24.5], [118.5, 30.1]] },
  '山东省': { name: '山东省', bounds: [[114.8, 34.4], [122.7, 38.4]] },
  '河南省': { name: '河南省', bounds: [[110.2, 31.4], [116.7, 36.4]] },
  '湖北省': { name: '湖北省', bounds: [[108.3, 29.0], [116.1, 33.3]] },
  '湖南省': { name: '湖南省', bounds: [[108.6, 24.4], [114.4, 30.3]] },
  '广东省': { name: '广东省', bounds: [[109.6, 20.1], [117.3, 25.5]] },
  '广西壮族自治区': { name: '广西壮族自治区', bounds: [[104.5, 20.9], [112.1, 26.4]] },
  '海南省': { name: '海南省', bounds: [[108.6, 18.0], [111.2, 20.2]] },
  '重庆市': { name: '重庆市', bounds: [[105.3, 28.1], [110.2, 32.2]] },
  '四川省': { name: '四川省', bounds: [[97.3, 26.0], [108.6, 34.3]] },
  '贵州省': { name: '贵州省', bounds: [[103.6, 24.6], [109.6, 29.2]] },
  '云南省': { name: '云南省', bounds: [[97.5, 21.1], [106.2, 29.3]] },
  '西藏自治区': { name: '西藏自治区', bounds: [[78.4, 26.8], [99.1, 36.5]] },
  '陕西省': { name: '陕西省', bounds: [[105.5, 31.7], [111.3, 39.6]] },
  '甘肃省': { name: '甘肃省', bounds: [[92.3, 32.6], [108.7, 42.8]] },
  '青海省': { name: '青海省', bounds: [[89.4, 31.6], [103.1, 39.2]] },
  '宁夏回族自治区': { name: '宁夏回族自治区', bounds: [[104.3, 35.2], [107.6, 39.4]] },
  '新疆维吾尔自治区': { name: '新疆维吾尔自治区', bounds: [[73.4, 34.3], [96.4, 49.2]] },
  '台湾省': { name: '台湾省', bounds: [[119.9, 21.8], [122.1, 25.4]] },
  '香港特别行政区': { name: '香港特别行政区', bounds: [[113.8, 22.1], [114.4, 22.6]] },
  '澳门特别行政区': { name: '澳门特别行政区', bounds: [[113.5, 22.1], [113.7, 22.3]] }
};

const HUNAN_LOCAL_COORDS = {
  '长沙': [112.9388, 28.2282],
  '浏阳': [113.6433, 28.1638],
  '宁乡': [112.5518, 28.2774],
  '怀化': [109.9985, 27.554],
  '通道': [109.7833, 26.158],
  '芷江': [109.6849, 27.4439],
  '永州': [111.6134, 26.4196],
  '东安': [111.3165, 26.392],
  '江永': [111.3435, 25.2745],
  '江华': [111.5795, 25.1857],
  '祁阳': [111.8573, 26.5857],
  '益阳': [112.3552, 28.5539],
  '安化': [111.2128, 28.3742],
  '湘西': [109.7397, 28.3143],
  '凤凰': [109.5996, 27.9482],
  '娄底': [112.0085, 27.7281],
  '岳阳': [113.1292, 29.3571],
  '汨罗': [113.0671, 28.8068],
  '湘潭': [112.9441, 27.8297],
  '湘乡': [112.5351, 27.7341],
  '常德': [111.699, 29.0316],
  '临澧': [111.6473, 29.4409],
  '衡阳': [112.572, 26.8934],
  '祁东': [112.0904, 26.7996],
  '郴州': [113.0321, 25.7936],
  '汝城': [113.6847, 25.533],
  '嘉禾': [112.369, 25.5878]
};

function buildRectangleGeoJson(name, bounds) {
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  return {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: { name },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [minLng, minLat],
          [maxLng, minLat],
          [maxLng, maxLat],
          [minLng, maxLat],
          [minLng, minLat]
        ]]
      }
    }]
  };
}

function buildProvinceFallbackGeoJson(provinceName) {
  const fallback = PROVINCE_FALLBACK_BOUNDS[provinceName];
  if (!fallback) return null;
  return buildRectangleGeoJson(fallback.name, fallback.bounds);
}

async function loadProvinceGeoJson(adcode, provinceName) {
  try {
    return await fetchGeoJsonWithFallback(PROVINCE_GEOJSON_URLS(adcode, provinceName));
  } catch (error) {
    console.warn('省份 GeoJSON 外部加载失败，使用本地兜底轮廓：', error);
    const localFallback = buildProvinceFallbackGeoJson(provinceName);
    if (localFallback) return localFallback;
    throw error;
  }
}

function getDeterministicOffset(seedText) {
  const seed = Array.from(String(seedText || '')).reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const lngOffset = ((seed % 11) - 5) * 0.08;
  const latOffset = (((Math.floor(seed / 11)) % 11) - 5) * 0.07;
  return [lngOffset, latOffset];
}

function getFeatureCenter(feature) {
  const props = feature?.properties || {};
  const center = props.center || props.centroid || props.cp;
  return Array.isArray(center) && center.length >= 2 ? center : null;
}

function getGeoJsonNameCenterPairs(geoJson) {
  if (!geoJson || !Array.isArray(geoJson.features)) return [];
  return geoJson.features
    .map((feature) => ({
      name: feature?.properties?.name || '',
      center: getFeatureCenter(feature)
    }))
    .filter(item => item.name && Array.isArray(item.center))
    .sort((a, b) => b.name.length - a.name.length);
}

function inferLocalBridgeCoordinate(row, provinceName, provinceGeoJSON) {
  const text = `${row.name || ''}${row.city || ''}${row.address || ''}`.trim();
  const geoHit = getGeoJsonNameCenterPairs(provinceGeoJSON).find(item => text.includes(item.name));
  if (geoHit) {
    const [lng, lat] = geoHit.center;
    const [lngOffset, latOffset] = getDeterministicOffset(row.name || text);
    return [lng + lngOffset, lat + latOffset];
  }

  const cityHit = provinceName === '湖南省'
    ? Object.keys(HUNAN_LOCAL_COORDS).find(key => text.includes(key))
    : '';

  const [lng, lat] = cityHit
    ? HUNAN_LOCAL_COORDS[cityHit]
    : (PROVINCE_CENTER_COORDS[provinceName] || []);
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  const [lngOffset, latOffset] = getDeterministicOffset(row.name || text);
  return [lng + lngOffset, lat + latOffset];
}

// 在线地理编码缓存键
const GEOCODE_CACHE_KEY = 'bridge_geocode_cache_v1';
const AMAP_KEY_STORAGE = 'bridge_amap_key';

// index 页图表联动状态
const INDEX_LINK_STATE = {
  dynastyFilter: null,
  highlightProvince: null,
  filterDynasty: '',
  filterProvince: '',
  filterBatch: '',
  filterMaterial: '',
  mapMode: 'scatter',
  timelineYear: null,
  timelinePlaying: false,
  timelineIndex: 0,
  timelineTimer: null
};

const CHINA_MAP_CACHE = {
  loaded: false,
  mapName: 'china'
};

const LOCAL_PROVINCE_GEOJSON_CACHE = {};

const INDEX_FILTER_OPTIONS = {
  dynasties: [],
  provinces: [],
  batches: [],
  materials: []
};

const INDEX_COMPARE_STATE = {
  provinceA: '',
  provinceB: ''
};

const INDEX_RUNTIME = {
  chinaChart: null
};
function pickField(row, candidates) {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
      return String(row[key]).trim();
    }
  }
  return '';
}

// 依次尝试多个 GeoJSON 地址，提升地图加载稳定性
async function fetchGeoJsonWithFallback(urls) {
  let lastError = null;

  for (const url of urls) {
    try {
      const resp = await fetch(url, { referrerPolicy: 'no-referrer' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error('GeoJSON 加载失败');
}

async function ensureChinaMapRegistered() {
  if (CHINA_MAP_CACHE.loaded) return CHINA_MAP_CACHE.mapName;

  let mapName = 'china-full';
  try {
    const geo = await fetchGeoJsonWithFallback(CHINA_GEOJSON_URLS);
    echarts.registerMap(mapName, geo);
  } catch (e) {
    if (!echarts.getMap('china')) throw e;
    mapName = 'china';
    console.warn('中国 full GeoJSON 加载失败，已退回内置 china 地图：', e);
  }

  CHINA_MAP_CACHE.loaded = true;
  CHINA_MAP_CACHE.mapName = mapName;
  return mapName;
}

async function getLocalProvinceGeoJson(provinceName) {
  const adcode = PROVINCE_ADCODE_MAP[provinceName];
  if (!adcode) return null;
  if (!LOCAL_PROVINCE_GEOJSON_CACHE[provinceName]) {
    LOCAL_PROVINCE_GEOJSON_CACHE[provinceName] = fetchGeoJsonWithFallback([`./data/geo/${adcode}_full.json`])
      .catch((error) => {
        console.warn(`本地省份 GeoJSON 加载失败：${provinceName}`, error);
        return null;
      });
  }
  return LOCAL_PROVINCE_GEOJSON_CACHE[provinceName];
}

async function enrichRowsWithLocalCityCoordinates(rows) {
  const provinces = Array.from(new Set(
    rows.map(row => normalizeProvinceName(row.province || '')).filter(Boolean)
  ));

  const geoEntries = await Promise.all(
    provinces.map(async province => [province, await getLocalProvinceGeoJson(province)])
  );
  const geoMap = Object.fromEntries(geoEntries);

  return rows.map((row) => {
    const province = normalizeProvinceName(row.province || '');
    const inferred = inferLocalBridgeCoordinate(row, province, geoMap[province]);
    if (!inferred) return row;
    return {
      ...row,
      lng: inferred[0],
      lat: inferred[1],
      coordinateSource: row.coordinateSource === '原始坐标' ? row.coordinateSource : '本地地市坐标估算'
    };
  });
}

// 将 CSV 文本直接内嵌到代码中，避免每次运行都读取本地文件
const BRIDGE_CSV_TEXT = `桥梁名称,建造时代/时间,所属省份,所属市区/具体地址,批次,分类
安济桥 （大石桥）,隋,,河北省宁晋县,第一批,
安平桥 （五里桥）,南宋,,福建省晋江县,第一批,
永通桥 （小石桥）,金,,河北省宁晋县,第一批,
观音桥,宋,,江西省星子县,第三批,
洛阳桥,宋至明,,福建省泉州市,第三批,
广济桥,宋至明,,广东省潮州市,第三批,
灞桥遗址,隋－元,,陕西省西安市,第四批,
十二桥遗址,商至西周,,四川省成都市,第五批,
东渭桥遗址,唐,,陕西省高陵县,第五批,
跨湖桥遗址,新石器时代,,浙江省杭州市,第六批,
小双桥遗址,商,,河南省郑州市,第六批,
上海马桥遗址,新石器时代至商,,上海市闵行区,第七批,
庄桥坟遗址,新石器时代,,浙江省嘉兴市平湖市,第七批,
板桥镇遗址,宋至清,,山东省青岛市胶州市,第七批,
土桥闸遗址,明,,山东省聊城市东昌府区,第七批,
桥北村遗址,新石器时代,,河南省洛阳市嵩县,第七批,
董桥遗址,新石器时代,,河南省驻马店市西平县,第七批,
八里桥遗址,夏,,河南省南阳市方城县,第七批,
桥镇遗址,新石器时代、西周,,陕西省宝鸡市陈仓区,第七批,
沙河古桥遗址,秦、汉,,陕西省咸阳市秦都区,第七批,
桥村遗址,新石器时代、西周、汉,,甘肃省平凉市灵台县,第七批,
桥陵,唐,,陕西省蒲城县,第三批,
藤桥墓群,唐至明,,海南省三亚市,第六批,
惠水仙人桥洞葬,明至清,,贵州省黔南布依族苗族自治州惠水县,第七批,
杨桥畔汉代城址与墓地,汉,,陕西省榆林市靖边县,第七批,
龙脑桥,明,,四川省泸县,第四批,
宝带桥,明,,江苏省苏州市,第五批,
古月桥,宋,,浙江省义乌市,第五批,
如龙桥,明,,浙江省庆元县,第五批,
八字桥,宋,,浙江省绍兴市,第五批,
江东桥,宋,,福建省漳州市,第五批,
小商桥,宋,,河南省临颍县,第五批,
岜团桥,清,,广西壮族自治区三江侗族自治县,第五批,
地坪风雨桥,清,,贵州省黎平县,第五批,
涿州永济桥,明至清,,河北省涿州市,第六批,
单桥,明,,河北省献县,第六批,
弘济桥,明,,河北省永年县,第六批,
伍仁桥,明,,河北省安国市,第六批,
太仓石拱桥,元,,江苏省太仓市,第六批,
莲花桥和白塔,清,,江苏省扬州市,第六批,
新河闸桥群,宋至清,,浙江省温岭市,第六批,
寿昌桥,宋,,浙江省德清县,第六批,
赤溪五洞桥,宋,,浙江省苍南县,第六批,
泰顺廊桥,清,,浙江省泰顺县,第六批,
闽东北廊桥,清,,福建省屏南县、寿宁县、柘荣县、古田县、武夷山市,第六批,
鸣水桥,宋,,江西省樟树市,第六批,
清华彩虹桥,宋至清,,江西省婺源县,第六批,
卞桥,唐至金,,山东省泗水县,第六批,
坪坦风雨桥,清,,湖南省通道侗族自治县,第六批,
波日桥,清,,四川省新龙县,第六批,
葛镜桥,明,,贵州省福泉市,第六批,
金龙桥,清,,云南省丽江市,第六批,
双龙桥,清,,云南省建水县,第六批,
琉璃河大桥,明,,北京市房山区,第七批,
下胡良桥,明,,河北省保定市涿州市,第七批,
方顺桥,明至清,,河北省保定市满城县,第七批,
登瀛桥,明至清,,河北省沧州市沧县,第七批,
衡水安济桥,清,,河北省衡水市桃城区,第七批,
襄垣永惠桥,金,,山西省长治市襄垣县,第七批,
平遥惠济桥,清,,山西省晋中市平遥县,第七批,
思本桥,宋,,江苏省苏州市吴江区,第七批,
东庙桥,宋,,江苏省苏州市吴江区,第七批,
七桥瓮,明,,江苏省南京市秦淮区,第七批,
蒲塘桥,明,,江苏省南京市溧水区,第七批,
护法寺桥 和 塔,宋,,浙江省温州市苍南县,第七批,
八卦桥 和 河西桥,宋,,浙江省温州市瑞安市,第七批,
西山桥,南宋,,浙江省杭州市建德市,第七批,
潘公桥 及 潘孝墓,明至清,,浙江省湖州市吴兴区,第七批,
双林三桥,清,,浙江省湖州市南浔区,第七批,
马上桥花厅,清,,浙江省金华市东阳市,第七批,
北岸廊桥,清,,安徽省黄山市歙县,第七批,
龙江桥,宋,,福建省福州市福清市,第七批,
宁海桥,元,,福建省莆田市涵江区,第七批,
逢渠桥,宋,,江西省宜春市宜丰县,第七批,
万年桥 和 聚星塔,明至清,,江西省抚州市南城县,第七批,
太平桥,清,,江西省赣州市龙南县,第七批,
永镇桥,清,,江西省赣州市安远县,第七批,
玉带桥,清,,江西省赣州市信丰县,第七批,
平阴永济桥,明,,山东省济南市平阴县,第七批,
大汶口古石桥,明至清,,山东省泰安市岱岳区,第七批,
光山永济桥,明至清,,河南省信阳市光山县,第七批,
兵书阁与文星桥,清,,湖南省怀化市通道侗族自治县,第七批,
广利桥,清,,湖南省永州市东安县,第七批,
安化风雨桥,清、民国,,湖南省益阳市安化县,第七批,
富川瑶族风雨桥群,明至清,,广西壮族自治区贺州市富川瑶族自治县,第七批,
惠爱桥,清,,广西壮族自治区北海市合浦县,第七批,
泸县龙桥群,明至清,,四川省泸县,第七批,
金勾风雨桥,清,,贵州省黔东南苗族侗族自治州从江县,第七批,
沘江古桥梁群,明至民国,,云南省大理白族自治州云龙县,第七批,
星宿桥和丰裕桥,清,,云南省楚雄彝族自治州禄丰县,第七批,
桥上桥,清,,陕西省渭南市华县,第七批,
毓秀桥,清,,陕西省渭南市韩城市,第七批,
五家寨铁路桥,清,,云南省屏边苗族自治县,第六批,
兰州黄河铁桥,清,,甘肃省兰州市,第六批,
滦河铁桥,清,,河北省唐山市滦县,第七批,
提篮桥监狱早期建筑,1903年,,上海市虹口区,第七批,
平安桥天主教堂,1904年,,四川省成都市,第七批,
德清古桥群,宋、元、明,,浙江省湖州市德清县,第七批,
绍兴古桥群,元至民国,,浙江省绍兴市绍兴县,第七批,
处州廊桥,明至民国,,浙江省丽水市庆元县、龙泉市、景宁畲族自治县、青田县、松阳县,第七批,
赵州桥（安济桥）,隋,,河北省石家庄市赵县,文物名录外数据库,
卢沟桥,金,,北京市丰台区,文物名录外数据库,
玉带桥（颐和园）,清,,北京市海淀区,文物名录外数据库,
十七孔桥,清,,北京市海淀区,文物名录外数据库,
程阳永济桥（风雨桥）,清,,广西壮族自治区柳州市三江侗族自治县,文物名录外数据库,
放生桥,明,,上海市青浦区朱家角镇,文物名录外数据库,
泸定桥,清,,四川省甘孜藏族自治州泸定县,文物名录外数据库,
五亭桥,清,,江苏省扬州市邗江区,文物名录外数据库,
文峰桥,清,,浙江省温州市泰顺县,文物名录外数据库,
北涧桥,清,,浙江省温州市泰顺县,文物名录外数据库,
溪东桥,明,,浙江省温州市泰顺县,文物名录外数据库,
廊桥（万安桥）,北宋,,福建省宁德市屏南县长桥镇,文物名录外数据库,
万年桥,明,,江西省上饶市婺源县,文物名录外数据库,
彩虹桥,宋,,江西省上饶市婺源县清华镇,文物名录外数据库,
广润桥,明,,浙江省嘉兴市桐乡市乌镇,文物名录外数据库,
逢源双桥,明清,,浙江省绍兴市柯桥区,文物名录外数据库,
平桥（古镇桥）,明清,,江苏省苏州市昆山市周庄镇,文物名录外数据库,
双桥（世德桥与永安桥）,明清,,江苏省苏州市昆山市周庄镇,文物名录外数据库,
廿八都文昌桥,清,,浙江省衢州市江山市廿八都镇,文物名录外数据库,
风雨桥（肇兴侗寨）,清,,贵州省黔东南苗族侗族自治州黎平县肇兴镇,文物名录外数据库,
回龙桥,清,,云南省丽江市古城区,文物名录外数据库,
禹门口黄河浮桥旧址,清,,山西省运城市河津市,文物名录外数据库,
永通桥（赵州小石桥）,金,,河北省石家庄市赵县,文物名录外数据库,
八一桥旧址（万寿宫浮桥遗存）,清,,江西省南昌市西湖区,文物名录外数据库,
双寿桥,清,,湖南省湘西土家族苗族自治州凤凰县,文物名录外数据库,
南浔广惠桥,明清,,浙江省湖州市南浔区,文物名录外数据库,
普济桥,宋,,浙江省绍兴市诸暨市枫桥镇,文物名录外数据库,
古纤道桥群,明清,,浙江省绍兴市越城区,文物名录外数据库,
花桥（古桥）,清,,贵州省安顺市平坝区,文物名录外数据库,
广福桥（安澜桥）,南宋,,四川省成都市都江堰市,文物名录外数据库,
南桥（都江堰）,清,,四川省成都市都江堰市,文物名录外数据库,
带河桥,明,,安徽省黄山市徽州区,文物名录外数据库,
太平桥（乌镇）,明,,浙江省嘉兴市桐乡市乌镇,文物名录外数据库,
安澜桥（峨眉河）,清,,四川省乐山市峨眉山市,文物名录外数据库,
双溪桥,清,,福建省福州市永泰县,文物名录外数据库,
广利桥（平遥）,清,,山西省晋中市平遥县,文物名录外数据库,
迎仙桥,明,,安徽省黄山市歙县,文物名录外数据库,
万岁桥（丽江）,明,,云南省丽江市古城区,文物名录外数据库,
锁江桥,清,,四川省宜宾市翠屏区,文物名录外数据库,
永安桥（同里）,明清,,江苏省苏州市吴江区同里古镇,文物名录外数据库,
思本桥（同里）,南宋,,江苏省苏州市吴江区同里古镇,文物名录外数据库,
泰安桥（周庄）,明,,江苏省苏州市昆山市周庄镇,文物名录外数据库,
富安桥（周庄）,元,,江苏省苏州市昆山市周庄镇,文物名录外数据库,
永济桥（山海关）,明,,河北省秦皇岛市山海关区,文物名录外数据库,
玉津桥,清,,云南省大理白族自治州巍山彝族回族自治县,文物名录外数据库,
南宋御街古桥群,南宋,,浙江省杭州市上城区,文物名录外数据库,
福庆桥,清,,福建省南平市政和县,文物名录外数据库,
泗洲桥,明,,广东省梅州市梅县区,文物名录外数据库,
盘龙桥,清,,贵州省黔西南布依族苗族自治州安龙县,文物名录外数据库,
文昌桥（婺源）,清,,江西省上饶市婺源县,文物名录外数据库,
广安桥,清,,湖南省长沙市望城区,文物名录外数据库,
龙津桥（婺源）,明清,,江西省上饶市婺源县,文物名录外数据库,
普安桥,明,,福建省泉州市安溪县,文物名录外数据库,
云桂桥,明清,,广东省肇庆市广宁县,文物名录外数据库,
通济桥,明,,广东省佛山市禅城区,文物名录外数据库,
明远桥,清,,广东省佛山市南海区,文物名录外数据库,
石井桥,清,,广东省广州市白云区,文物名录外数据库,
那乌古桥,清,,广东省云浮市郁南县,文物名录外数据库,
济川桥,明清,,广东省江门市新会区,文物名录外数据库,
流花桥,清,,广东省广州市越秀区,文物名录外数据库,
永丰古桥,明清,,广东省清远市清新区,文物名录外数据库,
化龙桥,清,,广东省揭阳市榕城区,文物名录外数据库,
大汾古桥,明清,,广东省东莞市石排镇大汾村,文物名录外数据库,
石龙南桥,清,,广东省东莞市石龙镇,文物名录外数据库,
接龙桥,清,,广东省东莞市茶山镇,文物名录外数据库,
平津桥,清,,广东省东莞市石碣镇,文物名录外数据库,
孙杜古桥,清,,广东省东莞市石排镇,文物名录外数据库,
九眼桥,清,,四川省成都市锦江区,文物名录外数据库,
安顺廊桥,清,,四川省成都市武侯区安顺廊桥,文物名录外数据库,
都江堰南桥,清,,四川省成都市都江堰市南桥街,文物名录外数据库,
安澜索桥（都江堰）,清,,四川省成都市都江堰市鱼嘴景区,文物名录外数据库,
望仙桥,清,,四川省成都市都江堰市灌县古城,文物名录外数据库,
万里桥,明清,,四川省成都市武侯区,文物名录外数据库,
达县彩虹桥,清,,四川省达州市通川区,文物名录外数据库,
四川太平桥,清,,四川省成都市郫都区唐昌镇,文物名录外数据库,
五音桥,明清,,河北省保定市定州市,文物名录外数据库,
滏阳桥,明清,,河北省邯郸市邯山区,文物名录外数据库,
苍岩山桥,明,,河北省石家庄市井陉县苍岩山景区,文物名录外数据库,
灵桥,宋,,浙江省宁波市海曙区三江口,文物名录外数据库,
宁波广济桥,宋,,浙江省宁波市海曙区,文物名录外数据库,
百梁桥,宋,,浙江省宁波市海曙区,文物名录外数据库,
余姚通济桥,清,,浙江省宁波市余姚市,文物名录外数据库,
惠明桥,清,,浙江省宁波市宁海县,文物名录外数据库,
宁波高桥,宋清,,浙江省宁波市海曙区高桥镇,文物名录外数据库,
宁波万年桥,明清,,浙江省宁波市江北区,文物名录外数据库,
戊己桥,清,,浙江省宁波市鄞州区,文物名录外数据库,
碧沚桥,清,,浙江省宁波市奉化区,文物名录外数据库,
兴星桥,清,,浙江省宁波市镇海区,文物名录外数据库,
金莲桥,清,,江苏省无锡市梁溪区,文物名录外数据库,
跨塘桥,清,,江苏省无锡市梁溪区,文物名录外数据库,
清名桥,明,,江苏省无锡市梁溪区清名桥古运河景区,文物名录外数据库,
西门桥,明清,,江苏省无锡市梁溪区,文物名录外数据库,
扬名大桥,清,,江苏省无锡市梁溪区扬名街道,文物名录外数据库,
兴隆桥,清,,江苏省无锡市梁溪区,文物名录外数据库,
定胜桥,清,,江苏省无锡市梁溪区,文物名录外数据库,
陆墟桥,清,,江苏省无锡市新吴区,文物名录外数据库,
伯渎桥,清,,江苏省无锡市新吴区梅村街道,文物名录外数据库,
三拱桥,明代·永乐三年（1405年）,,湖南省湘西土家族苗族自治州凤凰县,文物名录外数据库,石拱桥
西门江桥,明代·万历四十四年（1616年）,,湖南省湘西土家族苗族自治州凤凰县吉信镇,文物名录外数据库,石拱桥
大埠桥,明代·万历四十四年（1616年）,,湖南省娄底市娄星区,文物名录外数据库,石拱桥（原名永济桥）
女子桥,明代·万历三十七年（1609年）,,湖南省岳阳市汨罗市,文物名录外数据库,石拱桥
新安桥,明代·成化十年（1474年）,,湖南省长沙市浏阳市社港镇新安村,文物名录外数据库,廊桥
步瀛桥,宋代·靖康元年（1126年）,,湖南省永州市江永县上甘棠村,文物名录外数据库,石拱桥（又名渡仙桥）
佘市桥,元代·至顺二年（1331年）,,湖南省常德市临澧县,文物名录外数据库,连拱石桥
枫林铺桥,清代·嘉靖年间（1522-1566年）,,湖南省永州市祁阳市下马渡镇,文物名录外数据库,石拱桥
万福桥,清代·雍正四年（1726年）,,湖南省湘潭市湘乡市洙津渡,文物名录外数据库,石拱桥
惠同桥,清代·道光十四年（1834年）,,湖南省长沙市宁乡市沙田村,文物名录外数据库,廊桥
西佛桥,清代·光绪二十三年（1897年）,,湖南省永州市江华瑶族自治县沱江镇,文物名录外数据库,石拱桥
龙津桥,明代·万历十九年（1591年）,,湖南省怀化市芷江侗族自治县,文物名录外数据库,风雨桥
廻龙桥,清代·乾隆年间（待考）,,湖南省怀化市通道侗族自治县,文物名录外数据库,廊桥
永锡桥,清代,,湖南省益阳市安化县,文物名录外数据库,木构风雨廊桥
状元桥,清代·同治年间,,湖南省衡阳市祁东县归阳镇,文物名录外数据库,石拱桥（又名万福桥）
四拱桥,明代·弘治年间（1488-1505年）,,湖南省郴州市汝城县,文物名录外数据库,石拱桥
桐梁桥,明代·嘉靖三十年（1551年）,,湖南省郴州市嘉禾县行廊镇沙坪村,文物名录外数据库,石拱桥
贵屿大桥,北宋·大观二年（1108年）,,广东省汕头市潮阳区贵屿镇,文物名录外数据库,石梁桥
和平桥,北宋·宣和二年（1120年）,,广东省汕头市潮阳区和平镇,文物名录外数据库,石桥
泰新桥,明·嘉靖十二年（1533年）,,广东省肇庆市封开县,文物名录外数据库,廊式梁桥
通福桥（五眼桥）,明·万历四十四年（1616年）,,广东省广州市荔湾区,文物名录外数据库,五孔石拱桥
琴溪桥,明·万历年间（1573-1620年）,,广东省江门市台山市,文物名录外数据库,双孔石拱桥
应山石桥,清·乾隆三十二年（1767年）,,广东省韶关市乐昌市,文物名录外数据库,三孔石拱桥
三眼桥,明·崇祯年间（1628-1644年）,,广东省佛山市南海区,文物名录外数据库,三孔石拱桥
万岁桥（英德）,清·重建（具体年份不详）,,广东省清远市英德市,文物名录外数据库,单拱石桥
花桥（广州古桥）,北宋·景德年间（1004-1007年）,,广东省广州市,文物名录外数据库,石桥
伏波桥,明·成化二十一年（1485年）,,广东省佛山市顺德区,文物名录外数据库,石桥
何公桥,北宋·熙宁年间（1068-1077年）,,广东省韶关市浈江区,文物名录外数据库,古桥
东新桥,北宋·绍圣三年（1096年）,,广东省惠州市惠城区,文物名录外数据库,古桥
西新桥,北宋·绍圣三年（1096年）,,广东省惠州市惠城区,文物名录外数据库,古桥
龙泉桥,唐·景云元年（710年）,,福建省福州市闽侯县,文物名录外数据库,石拱桥
迥龙桥,唐·天复元年（901年）,,福建省福州市马尾区,文物名录外数据库,石构平梁桥（又名飞盖桥）
万寿桥,元·大德七年（1303年）,,福建省福州市台江区,文物名录外数据库,石梁桥
延寿桥,南宋·建炎元年（1127年）,,福建省莆田市荔城区,文物名录外数据库,伸臂式石梁桥
鸾峰桥,明代,,福建省宁德市寿宁县,文物名录外数据库,木拱廊桥
午桥,北宋·元祐四年（1089年）,,福建省福州市仓山区,文物名录外数据库,石构平梁桥（俗称五门桥）
蹑云桥,北宋·元丰三年（1080年）,,福建省福州市福清市,文物名录外数据库,石梁桥
十四门桥,北宋·元丰八年（1085年）,,福建省福州市闽侯县,文物名录外数据库,石板桥
利桥,北宋·天圣五年（1027年）,,福建省福州市福清市,文物名录外数据库,石梁桥
远济桥,清·光绪年间（1875-1908年）,,福建省福州市闽侯县,文物名录外数据库,木构廊桥
水尾亭桥,明·天启七年（1627年）,,福建省福州市罗源县,文物名录外数据库,木亭桥
承安廊桥,明·万历三十二年（1604年）,,福建省南平市光泽县,文物名录外数据库,木构廊桥
余庆桥,清·光绪年间（1875-1908年）,,福建省南平市武夷山市,文物名录外数据库,双曲木石拱桥
合龙桥,清·康熙三十八年（1699年）,,福建省福州市闽清县,文物名录外数据库,石墩木桥亭
洪山桥,明·万历六年（1578年）,,福建省福州市鼓楼区,文物名录外数据库,石板桥
高陞桥,清·康熙四十八年（1709年）,,福建省福州市鼓楼区,文物名录外数据库,阶梯式石拱桥
渤海国石墩木梁桥,唐代·渤海国时期（698-926年）,,黑龙江省牡丹江市宁安市,文物名录外数据库,石墩木梁桥遗址群
七孔桥（上官地古桥址）,唐代·渤海国时期,,黑龙江省牡丹江市宁安市,文物名录外数据库,石墩桥遗址
宁安大石桥,后金时期（1616-1636年）始建,,黑龙江省牡丹江市宁安市,文物名录外数据库,石拱桥
永安桥（沈阳于洪）,清·崇德六年（1641年）,,辽宁省沈阳市于洪区,文物名录外数据库,石拱桥
辽海桥,清代（具体年份不详）,,辽宁省铁岭市铁岭县,文物名录外数据库,石桥
柴河桥,清代（具体年份不详）,,辽宁省铁岭市铁岭县,文物名录外数据库,石桥
和阳桥,清代（具体年份不详）,,辽宁省铁岭市开原市,文物名录外数据库,石桥
广顺桥,清代（具体年份不详）,,辽宁省铁岭市开原市,文物名录外数据库,石桥
鸭绿江断桥,清·宣统三年（1911年）,,辽宁省丹东市振兴区,文物名录外数据库,铁路桥遗存
滨洲铁路桥（老江桥）,清·光绪二十六年（1900年）,,黑龙江省哈尔滨市道里区,文物名录外数据库,铁路桥
南桥,元·至正九年（1349年）,,湖北省武汉市江夏区,文物名录外数据库,石拱桥
汀泗桥,南宋·淳佑七年（1247年）,,湖北省咸宁市咸安区,文物名录外数据库,三孔石拱廊桥
灵官桥,南宋·景定年间（1260-1264年）,,湖北省咸宁市通城县,文物名录外数据库,石拱桥
白沙桥,明·正德十二年（1517年）,,湖北省咸宁市咸安区,文物名录外数据库,三孔石拱桥
高桥（咸宁）,清·乾隆三十八年（1773年）始建,,湖北省咸宁市咸安区,文物名录外数据库,五孔石拱廊桥
刘家桥,明·崇祯年间（1628-1644年）,,湖北省咸宁市咸安区,文物名录外数据库,单孔石拱廊桥
万寿桥（咸宁）,清·（具体年份不详）,,湖北省咸宁市咸安区,文物名录外数据库,三孔石拱廊桥
功德桥,宋末（1279年前）始建,,湖北省黄冈市武穴市,文物名录外数据库,石拱驿桥
绿杨桥,宋代,,湖北省黄冈市浠水县,文物名录外数据库,石桥
通会桥,明·弘治十八年（1505年）重修,,湖北省荆州市荆州区,文物名录外数据库,石桥
白鳝桥,元代,,湖北省荆州市荆州区,文物名录外数据库,石桥
清风桥,明代,,湖北省黄冈市黄州区,文物名录外数据库,石桥
孔叹桥,明·万历三十五年（1607年）,,湖北省黄冈市团风县,文物名录外数据库,石桥
施济桥,北宋·皇佑二年（1050年）,,重庆市荣昌区,文物名录外数据库,石拱桥
碑记桥,南宋·绍熙五年（1194年）,,重庆市涪陵区马武镇,文物名录外数据库,石拱桥
岩溪桥,南宋·庆元元年（1195年）,,重庆市合川区,文物名录外数据库,石拱桥
利济桥,清·道光六年（1826年）,,重庆市江津区朱杨镇,文物名录外数据库,五孔石拱桥
陡溪桥,清·道光三十年（1850年）,,重庆市万盛经开区与南川区交界,文物名录外数据库,三孔风雨廊桥
陆安桥,清·同治十年（1871年）,,重庆市万州区,文物名录外数据库,单孔石拱桥
普济桥（万州罗田）,清·道光十七年（1837年）,,重庆市万州区罗田镇,文物名录外数据库,单孔石拱桥
龙门桥（涪陵）,清·光绪年间（1875-1908年）,,重庆市涪陵区蔺市镇,文物名录外数据库,石拱桥
天生桥（秀山）,清·光绪二十九年（1903年）,,重庆市秀山土家族苗族自治县溪口乡,文物名录外数据库,石墩木梁长亭平桥
奈何桥（丰都）,明代,,重庆市丰都县,文物名录外数据库,石拱桥
述先桥,清代（具体年份不详）,,重庆市云阳县南溪镇,文物名录外数据库,古桥
普济桥（遵义）,南宋·嘉定年间（1208-1224年）,,贵州省遵义市红花岗区,文物名录外数据库,单孔石拱桥
浮玉桥,明·万历二十六年（1598年）,,贵州省贵阳市南明区,文物名录外数据库,九孔石桥（现七孔）
祝圣桥,明·万历三十七年（1609年）始建,,贵州省黔东南苗族侗族自治州镇远县,文物名录外数据库,七孔石拱桥
北盘江铁索桥,明·崇祯元年（1628年）,,贵州省安顺市与黔西南州交界,文物名录外数据库,铁索桥
小七孔桥,清·道光十五年（1835年）,,贵州省黔南布依族苗族自治州荔波县,文物名录外数据库,七孔石拱桥
百子桥,清·乾隆五十一年（1786年）,,贵州省黔南布依族苗族自治州都匀市,文物名录外数据库,七孔石拱桥
乌当桥,明·成化年间（1465-1487年）,,贵州省贵阳市乌当区,文物名录外数据库,九孔石拱桥
太慈桥,明代（弘治前已存）,,贵州省贵阳市南明区,文物名录外数据库,石拱桥
霁虹桥（贵阳）,明·永乐二年（1404年）,,贵州省贵阳市南明区,文物名录外数据库,石桥
姬昌桥,清·道光十七年（1837年）,,贵州省贵阳市清镇市,文物名录外数据库,石拱桥
蜈蚣桥,明代（水西安氏建）,,贵州省贵阳市修文县,文物名录外数据库,石拱桥
纳灰桥,清·嘉庆二十五年（1820年）,,贵州省黔西南布依族苗族自治州兴义市,文物名录外数据库,单孔石拱桥
马别桥,清·道光二十六年（1846年）,,贵州省黔西南布依族苗族自治州兴义市,文物名录外数据库,单孔石拱桥
抹角桥,清·康熙五十三年（1714年）始建,,贵州省黔西南布依族苗族自治州兴义市,文物名录外数据库,单拱敞肩石桥
那白木桥,清·康熙年间始建,,贵州省黔西南布依族苗族自治州兴义市,文物名录外数据库,石墩木梁桥
三朝桥,清代（桥址历史久远）,,贵州省黔东南苗族侗族自治州黄平县,文物名录外数据库,三桥并列人文景观
盘江桥,明·崇祯年间始建,,贵州省安顺市关岭县,文物名录外数据库,铁索桥
玉带桥（贵阳）,明·永乐年间建,,贵州省贵阳市云岩区,文物名录外数据库,石拱桥
狮子桥（贵阳）,明·永乐年间建,,贵州省贵阳市云岩区,文物名录外数据库,石拱桥（原名遵德桥）
海口洗马桥,宋代（始建）,,海南省海口市琼山区,文物名录外数据库,石桥（又名驭仙桥）
文昌便民桥,宋代（始建）,,海南省文昌市,文物名录外数据库,古桥（又名记耻桥/攻关桥）
三亚藤桥,唐·贞观年间（627-649年）,,海南省三亚市海棠区,文物名录外数据库,藤制桥梁（传说）
三亚广济桥,明·景泰年间（1450-1456年）始建,,海南省三亚市崖州区,文物名录外数据库,单孔砖石拱桥
文昌信用桥,明·弘治二年（1489年）,,海南省文昌市,文物名录外数据库,古桥（原名太平桥）
海口仁南石桥,清·乾隆年间（1736-1795年）,,海南省海口市琼山区,文物名录外数据库,五孔玄武岩石桥
海口吴太史公桥,清·乾隆年间（1736-1795年）,,海南省海口市龙华区,文物名录外数据库,古桥
海口绩龙石桥,清·嘉庆二年（1797年）,,海南省海口市龙华区,文物名录外数据库,三孔石桥（已不存）
儋州登东桥,明·嘉靖四十年（1561年）,,海南省儋州市,文物名录外数据库,古桥
儋州迎恩桥,明·成化年间（1465-1487年）,,海南省儋州市,文物名录外数据库,石桥
儋州新小江桥,明·万历二十九年（1601年）,,海南省儋州市,文物名录外数据库,古桥
文昌承先桥,清·康熙四十五年（1706年）,,海南省文昌市,文物名录外数据库,古桥（已不存）
澄迈沙地桥,明·成化年间（1465-1487年）,,海南省澄迈县,文物名录外数据库,石桥
澄迈西峰桥,明·成化年间,,海南省澄迈县,文物名录外数据库,石桥
文昌长岐桥,明·正统年间（1436-1449年）,,海南省文昌市,文物名录外数据库,古桥
崖州多零桥,元代（始建）,,海南省三亚市崖州区,文物名录外数据库,木桥
崖州多银桥,元代（始建）,,海南省三亚市崖州区,文物名录外数据库,木桥
兴安万里桥,唐·宝历元年（825年）,,广西壮族自治区桂林市兴安县,文物名录外数据库,单孔石拱桥
全州飞鸾桥,宋代（始建）,,广西壮族自治区桂林市全州县,文物名录外数据库,石墩台木梁桥
桂林花桥,宋代（始建）,,广西壮族自治区桂林市七星区,文物名录外数据库,石拱桥
藤县登俊桥,唐代（始建）,,广西壮族自治区梧州市藤县,文物名录外数据库,石桥
永安桥（藤县）,明·洪武年间（1368-1398年）,,广西壮族自治区梧州市藤县,文物名录外数据库,石桥
阳朔遇龙桥,明·永乐十年（1412年）,,广西壮族自治区桂林市阳朔县,文物名录外数据库,单孔石拱桥
灵山环秀桥,明·弘治年间（1488-1505年）,,广西壮族自治区钦州市灵山县,文物名录外数据库,七孔石桥
南宁镇北桥,明·天启五年（1625年）,,广西壮族自治区南宁市西乡塘区,文物名录外数据库,石桥
南宁东平桥,明·洪武年间（1368-1398年）,,广西壮族自治区南宁市兴宁区,文物名录外数据库,石桥
全州龙水虹饮桥,清·乾隆十年（1745年）,,广西壮族自治区桂林市全州县,文物名录外数据库,木梁桥
阳朔金宝桥,清·同治九年（1870年）,,广西壮族自治区桂林市阳朔县,文物名录外数据库,悬臂木梁桥
贵港万固桥,清·同治十二年（1873年）,,广西壮族自治区贵港市港南区,文物名录外数据库,单孔石拱桥
南宁新江桥,清·道光十七年（1837年）,,广西壮族自治区南宁市邕宁区,文物名录外数据库,五拱石桥
南宁大坑桥,清·康熙五十年（1720年）,,广西壮族自治区南宁市江南区,文物名录外数据库,石桥
南宁五龙桥,清·乾隆年间（1736-1795年）,,广西壮族自治区南宁市西乡塘区,文物名录外数据库,石桥
南宁金牛桥,清代（创建时间不详）,,广西壮族自治区南宁市兴宁区,文物名录外数据库,石桥
藤县山云桥,明·洪武六年（1373年）,,广西壮族自治区梧州市藤县,文物名录外数据库,石桥
藤县太和桥,明·洪武年间,,广西壮族自治区梧州市藤县,文物名录外数据库,石桥
藤县攀桂桥,明·正统年间（1436-1449年）,,广西壮族自治区梧州市藤县,文物名录外数据库,石桥
庐江捧檄桥,明·宣德九年（1434年）重修,,安徽省合肥市庐江县,文物名录外数据库,五孔石拱桥
五川桥,唐宋之际,,安徽省滁州市琅琊区,文物名录外数据库,五孔石拱桥
飞骑桥（合肥逍遥津）,三国时期,,安徽省合肥市,文物名录外数据库,古桥（已不存）
廻龙桥（合肥）,三国时期,,安徽省合肥市,文物名录外数据库,古桥
县桥（合肥）,五代·杨吴时期（913-915年）,,安徽省合肥市庐阳区,文物名录外数据库,三孔石拱桥（已不存）
国公桥（三河古镇）,南宋初年,,安徽省合肥市肥西县,文物名录外数据库,古桥
无蚊桥（三河古镇）,南宋,,安徽省合肥市肥西县,文物名录外数据库,古桥
马氏桥（肥西）,南宋,,安徽省合肥市肥西县,文物名录外数据库,古桥遗址
赤阑桥,南宋,,安徽省合肥市包河区,文物名录外数据库,木桥旧址
庐江通济桥,宋代,,安徽省合肥市庐江县,文物名录外数据库,古桥
绣溪浮桥,宋代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,浮桥
瀛州浮桥,宋代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,浮桥
中书桥（李坑）,宋代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
徙戎桥（江湾）,宋代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
镇海桥（屯溪老大桥）,明·嘉靖十五年（1536年）,,安徽省黄山市屯溪区,文物名录外数据库,六墩七孔石拱桥
水南桥（休宁）,明·万历十年（1582年）,,安徽省黄山市休宁县,文物名录外数据库,十墩十一孔石拱桥
永锡堂桥,明·洪武年间（1368-1398年）,,安徽省黄山市祁门县,文物名录外数据库,古桥
流芳桥（婺源）,明·成化年间（1465-1487年）,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
衍庆桥（婺源）,明·弘治年间（1488-1505年）,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
樟木桥（婺源）,明·成化年间（1465-1487年）,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
曹公桥（婺源）,明代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
花桥（婺源）,明代,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
惠政桥（县桥）,明代,,安徽省合肥市庐阳区,文物名录外数据库,古桥
镇淮桥（合肥）,明代,,安徽省合肥市,文物名录外数据库,古桥
回龙桥（合肥明代）,明代,,安徽省合肥市,文物名录外数据库,古桥
通济桥（庐江）,明代,,安徽省合肥市庐江县,文物名录外数据库,古桥
登俊桥（庐江）,唐代始建,,安徽省合肥市庐江县,文物名录外数据库,古桥
挹秀桥,清·顺治十年（1653年）,,安徽省黄山市黟县,文物名录外数据库,四孔石拱桥
富来桥,清代,,安徽省黄山市休宁县,文物名录外数据库,单孔石拱桥
钟秀桥,清代,,安徽省黄山市祁门县,文物名录外数据库,三孔石拱桥
万安桥（婺源县西）,明末清初,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
昇平桥,明末清初,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
敦义桥,明末清初,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
北关桥（婺源）,明末清初,,安徽省黄山市婺源县（旧属徽州）,文物名录外数据库,古桥
永济桥（西递）,清代,,安徽省黄山市黟县,文物名录外数据库,古桥
环秀桥（呈坎）,清代,,安徽省黄山市徽州区,文物名录外数据库,古桥
高阳廊桥,清代,,安徽省黄山市歙县,文物名录外数据库,廊桥
桃源廊桥,清代,,安徽省黄山市祁门县,文物名录外数据库,廊桥
拱北廊桥,清代,,安徽省黄山市休宁县,文物名录外数据库,廊桥
漾潭桥,清代,,安徽省黄山市休宁县,文物名录外数据库,古桥
`;

function normalizeProvinceName(name) {
  if (!name) return '';
  const n = String(name).trim();

  if (PROVINCE_ADCODE_MAP[n]) return n;
  if (PROVINCE_ALIAS_MAP[n]) return PROVINCE_ALIAS_MAP[n];

  const full = Object.keys(PROVINCE_ADCODE_MAP).find(k => k.startsWith(n));
  return full || n;
}

function parseCsvTextSync(csvText) {
  const results = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });
  return results.data || [];
}

// 坐标值安全转换：空字符串/非法值一律视为 null，避免 Number('') 变成 0
function toNumberOrNull(value) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

// 将“宋至清/唐、宋/明至民国”等时代文本规范为基础朝代标签
const BASE_DYNASTIES = ['先秦', '秦', '汉', '魏', '晋', '隋', '唐', '宋', '元', '明', '清', '民国'];

function getDynastyTags(text) {
  const s = String(text || '').trim();
  if (!s) return ['未知'];

  const tags = BASE_DYNASTIES.filter((d) => s.includes(d));
  return tags.length ? tags : ['其他'];
}

// 从“所属市区/具体地址”中提取省份/直辖市/自治区
function extractProvinceFromAddress(address) {
  const text = String(address || '').trim();
  if (!text) return '';

  const provinceKeywords = [
    '北京市', '天津市', '上海市', '重庆市',
    '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
    '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
    '河南省', '湖北省', '湖南省', '广东省', '海南省',
    '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾省',
    '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区',
    '香港特别行政区', '澳门特别行政区'
  ];

  const hit = provinceKeywords.find((p) => text.includes(p));
  if (hit) return hit;

  const aliasKeywords = Object.keys(PROVINCE_ALIAS_MAP);
  const aliasHit = aliasKeywords.find((k) => text.includes(k));
  return aliasHit ? PROVINCE_ALIAS_MAP[aliasHit] : '';
}

// 先将“写死的 CSV 文本”转换为结构化数组（不再做省中心伪坐标）
function buildStructuredBridgeData() {
  const rows = parseCsvTextSync(BRIDGE_CSV_TEXT);

  return rows.map((row) => {
    const name = pickField(row, ['桥梁名称', '名称', '文物名称', 'name']);
    const dynasty = pickField(row, ['建造时代', '建造时代/时间', '时代', '朝代', 'dynasty']);
    const batch = pickField(row, ['批次', 'batch']);
    const category = pickField(row, ['分类', 'category']);
    const address = pickField(row, ['所属市区/具体地址', '所属市区', '具体地址', '地址', 'location']);

    const rawProvince = pickField(row, ['所属省份', '省份', '省', 'province']);
    const provinceFromAddress = extractProvinceFromAddress(address);
    const province = normalizeProvinceName(rawProvince || provinceFromAddress);

    const lng = toNumberOrNull(pickField(row, ['经度', 'lng', 'longitude']));
    const lat = toNumberOrNull(pickField(row, ['纬度', 'lat', 'latitude']));

    return {
      name,
      dynasty,
      province,
      city: address,
      address,
      batch,
      category,
      lng: Number.isFinite(lng) ? lng : null,
      lat: Number.isFinite(lat) ? lat : null,
      coordinateSource: Number.isFinite(lng) && Number.isFinite(lat) ? '原始坐标' : '待在线编码'
    };
  }).filter((item) => item.name);
}

const BRIDGE_DATA = buildStructuredBridgeData();

function getLocalCache() {
  try {
    return JSON.parse(localStorage.getItem(GEOCODE_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function setLocalCache(cache) {
  localStorage.setItem(GEOCODE_CACHE_KEY, JSON.stringify(cache));
}

function getAmapKey() {
  // 用户已提供高德 Web 服务 Key
  const fixedKey = '8f0a0be4a2ae0d81714c11867a45c456';
  localStorage.setItem(AMAP_KEY_STORAGE, fixedKey);
  return fixedKey;
}

async function geocodeByAmap(address, cityHint, key) {
  const params = new URLSearchParams({
    key,
    address,
    city: cityHint || '',
    output: 'json'
  });

  const url = `https://restapi.amap.com/v3/geocode/geo?${params.toString()}`;
  const resp = await fetch(url, { referrerPolicy: 'no-referrer' });
  const data = await resp.json();

  if (data.status === '1' && Array.isArray(data.geocodes) && data.geocodes.length > 0) {
    const loc = String(data.geocodes[0].location || '');
    const [lngStr, latStr] = loc.split(',');
    const lng = Number(lngStr);
    const lat = Number(latStr);
    if (Number.isFinite(lng) && Number.isFinite(lat)) {
      return [lng, lat];
    }
  }

  return null;
}

async function loadCsvData(targetProvince = '') {
  const key = getAmapKey();
  if (!key) {
    alert('未配置高德 Key，暂时无法生成精准桥梁坐标。');
    return BRIDGE_DATA;
  }

  const cache = getLocalCache();
  const data = BRIDGE_DATA.map(item => ({ ...item }));

  for (const item of data) {
    if (targetProvince && normalizeProvinceName(item.province || '') !== targetProvince) continue;
    if (Number.isFinite(item.lng) && Number.isFinite(item.lat)) continue;

    const cacheKey = `${item.province}|${item.address}|${item.name}`;
    const cached = cache[cacheKey];

    if (cached && Number.isFinite(cached.lng) && Number.isFinite(cached.lat)) {
      item.lng = cached.lng;
      item.lat = cached.lat;
      item.coordinateSource = '在线编码缓存';
      continue;
    }

    // 组合地址：省份 + 详细地址 + 桥梁名，尽量提升在线编码准确度
    const queryAddress = `${item.province || ''}${item.address || ''}${item.name || ''}`.trim();
    if (!queryAddress) continue;

    try {
      const point = await geocodeByAmap(queryAddress, item.province, key);
      if (point) {
        item.lng = point[0];
        item.lat = point[1];
        item.coordinateSource = '在线编码';
        cache[cacheKey] = { lng: item.lng, lat: item.lat };
      }
    } catch (e) {
      // 单条失败不影响整体
      console.warn('地理编码失败:', item.name, e);
    }

    // 限流，避免触发接口 QPS 限制
    await new Promise(r => setTimeout(r, 220));
  }

  setLocalCache(cache);
  return data;
}

function getYearFromDynastyText(text) {
  if (!text) return null;
  const s = String(text).trim();

  // 1) 优先提取阿拉伯数字年份（如 1405 / 1875-1908）
  const range = s.match(/(\d{3,4})\D+(\d{3,4})/);
  if (range) {
    const y1 = Number(range[1]);
    const y2 = Number(range[2]);
    return Number.isFinite(y1) && Number.isFinite(y2) ? Math.min(y1, y2) : null;
  }

  const single = s.match(/(\d{3,4})/);
  if (single) {
    const y = Number(single[1]);
    return Number.isFinite(y) ? y : null;
  }

  // 2) 无数字时，按朝代关键词映射“近似起始年”，保证时间轴不过度漏数
  const eraYearMap = [
    ['新石器', -5000],
    ['夏', -2070],
    ['商', -1600],
    ['西周', -1046],
    ['东周', -770],
    ['春秋', -770],
    ['战国', -475],
    ['秦', -221],
    ['汉', -206],
    ['三国', 220],
    ['魏', 220],
    ['晋', 266],
    ['南北朝', 420],
    ['隋', 581],
    ['唐', 618],
    ['五代', 907],
    ['宋', 960],
    ['元', 1271],
    ['明', 1368],
    ['清', 1644],
    ['民国', 1912]
  ];

  for (const [k, y] of eraYearMap) {
    if (s.includes(k)) return y;
  }

  return null;
}

function getTimelineYearList() {
  const years = Array.from(new Set(
    BRIDGE_DATA
      .map(item => getYearFromDynastyText(item.dynasty))
      .filter(y => Number.isFinite(y) && y <= 1911)
  )).sort((a, b) => a - b);

  // 强制把 1911 作为时间轴终点，确保终点可展示全量古桥数据
  if (!years.includes(1911)) years.push(1911);
  return years.sort((a, b) => a - b);
}

function getFilteredRowsForIndex() {
  let rows = BRIDGE_DATA.filter(d => d.name);

  if (INDEX_LINK_STATE.filterDynasty) {
    rows = rows.filter(d => getDynastyTags(d.dynasty).includes(INDEX_LINK_STATE.filterDynasty));
  }
  if (INDEX_LINK_STATE.filterProvince) {
    rows = rows.filter(d => normalizeProvinceName(d.province || '') === INDEX_LINK_STATE.filterProvince);
  }
  if (INDEX_LINK_STATE.filterBatch) {
    rows = rows.filter(d => (d.batch || '未知批次').trim() === INDEX_LINK_STATE.filterBatch);
  }
  if (INDEX_LINK_STATE.filterMaterial) {
    rows = rows.filter(d => getBridgeMaterial(d) === INDEX_LINK_STATE.filterMaterial);
  }

  // 图表点击的朝代联动作为附加过滤
  if (INDEX_LINK_STATE.dynastyFilter) {
    rows = rows.filter(d => getDynastyTags(d.dynasty).includes(INDEX_LINK_STATE.dynastyFilter));
  }

  // 时间轴过滤：保留“建造年份 <= 当前时间轴年份”的桥梁，形成历史累积动画
  if (Number.isFinite(INDEX_LINK_STATE.timelineYear)) {
    rows = rows.filter((d) => {
      const year = getYearFromDynastyText(d.dynasty);
      // 若年代文本无法解析，在时间轴终点（1911）时仍纳入，避免漏计
      if (!Number.isFinite(year)) return INDEX_LINK_STATE.timelineYear >= 1911;
      return year <= INDEX_LINK_STATE.timelineYear;
    });
  }

  return rows;
}

function animateNumber(el, target, duration = 900) {
  if (!el) return;
  const start = Number(el.dataset.value || 0);
  const end = Number(target || 0);
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const current = Math.round(start + (end - start) * p);
    el.textContent = String(current);
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.dataset.value = String(end);
    }
  }

  requestAnimationFrame(tick);
}

function fillSelectOptions(selectEl, options, selectedValue) {
  if (!selectEl) return;
  const current = selectedValue ?? selectEl.value ?? '';
  const base = '<option value="">全部</option>';
  const html = options
    .map(v => `<option value="${v}" ${current === v ? 'selected' : ''}>${v}</option>`)
    .join('');
  selectEl.innerHTML = base + html;
}

function ensureIndexFilterOptions() {
  if (INDEX_FILTER_OPTIONS.dynasties.length && INDEX_FILTER_OPTIONS.provinces.length && INDEX_FILTER_OPTIONS.batches.length && INDEX_FILTER_OPTIONS.materials.length) {
    return;
  }

  INDEX_FILTER_OPTIONS.dynasties = BASE_DYNASTIES.filter((d) =>
    BRIDGE_DATA.some(item => getDynastyTags(item.dynasty).includes(d))
  );

  INDEX_FILTER_OPTIONS.provinces = Array.from(
    new Set(BRIDGE_DATA.map(d => normalizeProvinceName(d.province || '')).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));

  INDEX_FILTER_OPTIONS.batches = Array.from(
    new Set(BRIDGE_DATA.map(d => (d.batch || '未知批次').trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));

  INDEX_FILTER_OPTIONS.materials = Array.from(
    new Set(BRIDGE_DATA.map(d => getBridgeMaterial(d)).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
}

function stopTimelinePlayback() {
  if (INDEX_LINK_STATE.timelineTimer) {
    clearInterval(INDEX_LINK_STATE.timelineTimer);
    INDEX_LINK_STATE.timelineTimer = null;
  }
  INDEX_LINK_STATE.timelinePlaying = false;
  const playBtn = document.getElementById('timelinePlayBtn');
  if (playBtn) playBtn.textContent = '播放';
}

function updateTimelineUI() {
  const labelEl = document.getElementById('timelineCurrentLabel');
  const rangeEl = document.getElementById('timelineRange');
  if (!labelEl || !rangeEl) return;

  const years = getTimelineYearList();
  if (!years.length) {
    labelEl.textContent = '全部';
    return;
  }

  const idx = Number(rangeEl.value || 0);
  const y = years[idx];
  labelEl.textContent = Number.isFinite(INDEX_LINK_STATE.timelineYear) ? `${y}年及以前` : '全部';
}

function initIndexTimeline() {
  const rangeEl = document.getElementById('timelineRange');
  const ticksEl = document.getElementById('timelineTicks');
  const playBtn = document.getElementById('timelinePlayBtn');
  const labelEl = document.getElementById('timelineCurrentLabel');
  if (!rangeEl || !ticksEl || !playBtn || !labelEl) return;

  const years = getTimelineYearList();
  if (!years.length) {
    rangeEl.disabled = true;
    playBtn.disabled = true;
    labelEl.textContent = '全部';
    return;
  }

  rangeEl.min = '0';
  rangeEl.max = String(years.length - 1);
  rangeEl.step = '1';
  rangeEl.value = String(Math.max(0, years.length - 1));
  INDEX_LINK_STATE.timelineIndex = Number(rangeEl.value);
  INDEX_LINK_STATE.timelineYear = years[INDEX_LINK_STATE.timelineIndex];

  const step = Math.max(1, Math.floor(years.length / 6));
  const tickYears = [];
  for (let i = 0; i < years.length; i += step) tickYears.push(years[i]);
  if (tickYears[tickYears.length - 1] !== years[years.length - 1]) tickYears.push(years[years.length - 1]);
  ticksEl.innerHTML = tickYears.map(y => `<span>${y}</span>`).join('');

  rangeEl.oninput = () => {
    stopTimelinePlayback();
    INDEX_LINK_STATE.timelineIndex = Number(rangeEl.value);
    INDEX_LINK_STATE.timelineYear = years[INDEX_LINK_STATE.timelineIndex];
    updateTimelineUI();
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  };

  playBtn.onclick = () => {
    if (INDEX_LINK_STATE.timelinePlaying) {
      stopTimelinePlayback();
      return;
    }

    INDEX_LINK_STATE.timelinePlaying = true;
    playBtn.textContent = '暂停';

    // 从当前年份继续播放到1911年前末端
    INDEX_LINK_STATE.timelineTimer = setInterval(() => {
      let next = Number(rangeEl.value) + 1;
      if (next > years.length - 1) {
        stopTimelinePlayback();
        return;
      }
      rangeEl.value = String(next);
      INDEX_LINK_STATE.timelineIndex = next;
      INDEX_LINK_STATE.timelineYear = years[next];
      updateTimelineUI();
      initIndexSideCharts();
      initChinaMapPage();
    }, 500);
  };

  updateTimelineUI();
}

function fillSimpleSelect(selectEl, options, selected = '') {
  if (!selectEl) return;
  selectEl.innerHTML = options.map(v => `<option value="${v}" ${v === selected ? 'selected' : ''}>${v}</option>`).join('');
}

function initProvinceCompareControls() {
  const aSel = document.getElementById('compareProvinceA');
  const bSel = document.getElementById('compareProvinceB');
  if (!aSel || !bSel) return;

  ensureIndexFilterOptions();
  const ps = INDEX_FILTER_OPTIONS.provinces;
  if (!ps.length) return;

  if (!INDEX_COMPARE_STATE.provinceA) INDEX_COMPARE_STATE.provinceA = ps[0];
  if (!INDEX_COMPARE_STATE.provinceB) INDEX_COMPARE_STATE.provinceB = ps[Math.min(1, ps.length - 1)];
  if (INDEX_COMPARE_STATE.provinceA === INDEX_COMPARE_STATE.provinceB && ps.length > 1) {
    INDEX_COMPARE_STATE.provinceB = ps[1];
  }

  fillSimpleSelect(aSel, ps, INDEX_COMPARE_STATE.provinceA);
  fillSimpleSelect(bSel, ps, INDEX_COMPARE_STATE.provinceB);

  aSel.onchange = () => {
    INDEX_COMPARE_STATE.provinceA = aSel.value;
    if (INDEX_COMPARE_STATE.provinceA === INDEX_COMPARE_STATE.provinceB && ps.length > 1) {
      INDEX_COMPARE_STATE.provinceB = ps.find(p => p !== INDEX_COMPARE_STATE.provinceA) || INDEX_COMPARE_STATE.provinceB;
      bSel.value = INDEX_COMPARE_STATE.provinceB;
    }
    initProvinceCompareChart();
  };

  bSel.onchange = () => {
    INDEX_COMPARE_STATE.provinceB = bSel.value;
    if (INDEX_COMPARE_STATE.provinceA === INDEX_COMPARE_STATE.provinceB && ps.length > 1) {
      INDEX_COMPARE_STATE.provinceA = ps.find(p => p !== INDEX_COMPARE_STATE.provinceB) || INDEX_COMPARE_STATE.provinceA;
      aSel.value = INDEX_COMPARE_STATE.provinceA;
    }
    initProvinceCompareChart();
  };
}

function initProvinceCompareChart() {
  const el = document.getElementById('provinceCompareChart');
  if (!el) return;

  const a = INDEX_COMPARE_STATE.provinceA;
  const b = INDEX_COMPARE_STATE.provinceB;
  if (!a || !b) return;

  const source = getFilteredRowsForIndex();
  const rowsA = source.filter(r => normalizeProvinceName(r.province || '') === a);
  const rowsB = source.filter(r => normalizeProvinceName(r.province || '') === b);

  const uniqueDynA = new Set(rowsA.flatMap(r => getDynastyTags(r.dynasty))).size;
  const uniqueDynB = new Set(rowsB.flatMap(r => getDynastyTags(r.dynasty))).size;
  const uniqueBatchA = new Set(rowsA.map(r => (r.batch || '未知批次').trim())).size;
  const uniqueBatchB = new Set(rowsB.map(r => (r.batch || '未知批次').trim())).size;

  const chart = echarts.getInstanceByDom(el) || echarts.init(el);
  chart.setOption({
    grid: { left: 40, right: 12, top: 20, bottom: 26 },
    tooltip: { trigger: 'axis' },
    legend: { top: 0, textStyle: { color: '#f2ddae', fontSize: 10 } },
    xAxis: {
      type: 'category',
      data: ['桥梁总数', '朝代覆盖', '批次覆盖'],
      axisLabel: { color: '#f2ddae', fontSize: 10 },
      axisLine: { lineStyle: { color: '#d9c08a' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#f2ddae', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    series: [
      {
        name: a,
        type: 'bar',
        barWidth: 10,
        data: [rowsA.length, uniqueDynA, uniqueBatchA],
        itemStyle: { color: '#6fd6ff', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: b,
        type: 'bar',
        barWidth: 10,
        data: [rowsB.length, uniqueDynB, uniqueBatchB],
        itemStyle: { color: '#f6c56f', borderRadius: [4, 4, 0, 0] }
      }
    ]
  });
}

function toCsvCell(v) {
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function exportCurrentFilteredCsv() {
  const rows = getFilteredRowsForIndex();
  const header = ['桥梁名称', '建造时代/时间', '所属省份', '所属市区/具体地址', '批次', '分类', '材质', '经度', '纬度'];
  const lines = [header.join(',')];

  rows.forEach((r) => {
    lines.push([
      toCsvCell(r.name),
      toCsvCell(r.dynasty),
      toCsvCell(r.province),
      toCsvCell(r.address || r.city),
      toCsvCell(r.batch),
      toCsvCell(r.category),
      toCsvCell(getBridgeMaterial(r)),
      toCsvCell(Number.isFinite(r.lng) ? r.lng : ''),
      toCsvCell(Number.isFinite(r.lat) ? r.lat : '')
    ].join(','));
  });

  const csv = '\ufeff' + lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-');
  a.href = url;
  a.download = `桥梁筛选结果_${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function locateBridgeOnChinaMap(keyword) {
  const q = String(keyword || '').trim();
  if (!q) return;

  const target = BRIDGE_DATA.find(item => item.name && item.name.includes(q));
  if (!target) {
    alert('未找到匹配桥梁，请尝试更完整名称。');
    return;
  }

  // 搜索后直接进入桥梁详情页，并携带省份参数，便于从详情页逐级回退
  const params = new URLSearchParams({
    name: target.name,
    province: target.province || ''
  });
  window.location.href = `./bridge.html?${params.toString()}`;
}

function buildSearchSuggestions(keyword) {
  const q = String(keyword || '').trim();
  if (!q) return [];

  return BRIDGE_DATA
    .filter(item => item.name && item.name.includes(q))
    .slice(0, 12)
    .map(item => item.name);
}

function updateSearchSuggestList(keyword) {
  const datalist = document.getElementById('bridgeSearchSuggest');
  if (!datalist) return;

  const arr = buildSearchSuggestions(keyword);
  datalist.innerHTML = arr.map(name => `<option value="${name}"></option>`).join('');
}

function initIndexSearchAndExport() {
  const inputEl = document.getElementById('bridgeSearchInput');
  const btnEl = document.getElementById('bridgeSearchBtn');
  const exportBtn = document.getElementById('exportFilteredBtn');
  const openDataMethodBtn = document.getElementById('openDataMethodBtn');
  const modalEl = document.getElementById('dataMethodModal');
  const closeDataMethodBtn = document.getElementById('dataMethodCloseBtn');
  const drawerBtn = document.getElementById('drawerToggleBtn');

  if (btnEl && inputEl) {
    updateSearchSuggestList('桥');

    inputEl.addEventListener('input', () => {
      updateSearchSuggestList(inputEl.value);
    });

    btnEl.onclick = () => locateBridgeOnChinaMap(inputEl.value);
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') locateBridgeOnChinaMap(inputEl.value);
    });
  }

  if (exportBtn) {
    exportBtn.onclick = () => exportCurrentFilteredCsv();
  }

  if (openDataMethodBtn && modalEl) {
    openDataMethodBtn.onclick = () => modalEl.classList.remove('hidden');
  }
  if (closeDataMethodBtn && modalEl) {
    closeDataMethodBtn.onclick = () => modalEl.classList.add('hidden');
  }

  if (drawerBtn) {
    drawerBtn.onclick = () => {
      document.body.classList.toggle('drawer-open');
    };
  }
}

function initIndexFilters() {
  const dynastySel = document.getElementById('filterDynasty');
  const provinceSel = document.getElementById('filterProvince');
  const batchSel = document.getElementById('filterBatch');
  const materialSel = document.getElementById('filterMaterial');
  const mapModeSel = document.getElementById('mapModeSelect');
  const resetBtn = document.getElementById('filterResetBtn');

  if (!dynastySel || !provinceSel || !batchSel || !resetBtn) return;

  ensureIndexFilterOptions();

  fillSelectOptions(dynastySel, INDEX_FILTER_OPTIONS.dynasties, INDEX_LINK_STATE.filterDynasty);
  fillSelectOptions(provinceSel, INDEX_FILTER_OPTIONS.provinces, INDEX_LINK_STATE.filterProvince);
  fillSelectOptions(batchSel, INDEX_FILTER_OPTIONS.batches, INDEX_LINK_STATE.filterBatch);
  if (materialSel) fillSelectOptions(materialSel, INDEX_FILTER_OPTIONS.materials, INDEX_LINK_STATE.filterMaterial);

  dynastySel.onchange = () => {
    INDEX_LINK_STATE.filterDynasty = dynastySel.value;
    INDEX_LINK_STATE.dynastyFilter = null;
    INDEX_LINK_STATE.highlightProvince = null;
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  };
  provinceSel.onchange = () => {
    INDEX_LINK_STATE.filterProvince = provinceSel.value;
    INDEX_LINK_STATE.highlightProvince = INDEX_LINK_STATE.filterProvince || null;
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  };
  batchSel.onchange = () => {
    INDEX_LINK_STATE.filterBatch = batchSel.value;
    INDEX_LINK_STATE.highlightProvince = null;
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  };

  if (materialSel) {
    materialSel.onchange = () => {
      INDEX_LINK_STATE.filterMaterial = materialSel.value;
      INDEX_LINK_STATE.highlightProvince = null;
      initIndexSideCharts();
      initProvinceCompareChart();
      initChinaMapPage();
    };
  }

  if (mapModeSel) {
    mapModeSel.value = INDEX_LINK_STATE.mapMode;
    mapModeSel.onchange = () => {
      INDEX_LINK_STATE.mapMode = mapModeSel.value || 'scatter';
      initChinaMapPage();
    };
  }
  resetBtn.onclick = () => {
    INDEX_LINK_STATE.filterDynasty = '';
    INDEX_LINK_STATE.filterProvince = '';
    INDEX_LINK_STATE.filterBatch = '';
    INDEX_LINK_STATE.filterMaterial = '';
    INDEX_LINK_STATE.dynastyFilter = null;
    INDEX_LINK_STATE.highlightProvince = null;

    stopTimelinePlayback();
    const years = getTimelineYearList();
    const rangeEl = document.getElementById('timelineRange');
    if (rangeEl && years.length) {
      rangeEl.value = String(years.length - 1);
      INDEX_LINK_STATE.timelineIndex = years.length - 1;
      INDEX_LINK_STATE.timelineYear = years[years.length - 1];
    } else {
      INDEX_LINK_STATE.timelineYear = null;
    }

    dynastySel.value = '';
    provinceSel.value = '';
    batchSel.value = '';
    if (materialSel) materialSel.value = '';
    updateTimelineUI();
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  };
}


function initIndexSideCharts() {
  const dynastyEl = document.getElementById('dynastyChart');
  const batchEl = document.getElementById('batchChart');
  const provinceTopEl = document.getElementById('provinceTopChart');
  const chaoshanEl = document.getElementById('chaoshanFeature');

  // 仅在 index 页面初始化侧边图表
  if (!dynastyEl || !batchEl || !provinceTopEl) return;

  const rows = getFilteredRowsForIndex();

  // 1）朝代分布
  const dynastyMap = {};
  rows.forEach((item) => {
    const tags = getDynastyTags(item.dynasty);
    tags.forEach((key) => {
      dynastyMap[key] = (dynastyMap[key] || 0) + 1;
    });
  });
  const dynastyData = Object.entries(dynastyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // 2）文物等级统计（按批次）
  const batchMap = {};
  rows.forEach((item) => {
    const key = (item.batch || '未知批次').trim();
    batchMap[key] = (batchMap[key] || 0) + 1;
  });
  const batchData = Object.entries(batchMap)
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'));

  // 3）省份 TOP 排行
  const provinceMap = {};
  rows.forEach((item) => {
    const key = normalizeProvinceName(item.province || '未知');
    provinceMap[key] = (provinceMap[key] || 0) + 1;
  });
  const provinceTopData = Object.entries(provinceMap)
    .filter(([k]) => k && k !== '未知')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .reverse();

  // 4）中国古代桥梁建筑特写与介绍统计
  const knownRows = rows.filter((item) => item.name && item.dynasty);
  const ancientRows = rows.filter((item) => {
    const y = getYearFromDynastyText(item.dynasty);
    return Number.isFinite(y) && y <= 1911;
  });
  const dynastyCoverage = new Set(knownRows.flatMap(r => getDynastyTags(r.dynasty))).size;
  const categoryCoverage = new Set(knownRows.map(r => (r.category || '未知').trim())).size;

  const statTotalEl = document.getElementById('statTotal');
  const statFilteredEl = document.getElementById('statFiltered');
  const statProvinceEl = document.getElementById('statProvince');

  // 数据总览：总数 / 筛选后 / 覆盖省份数
  const allRows = BRIDGE_DATA.filter(d => d.name);
  const coveredProvinceCount = new Set(
    rows
      .map(d => normalizeProvinceName(d.province || ''))
      .filter(p => p && p !== '未知')
  ).size;

  animateNumber(statTotalEl, allRows.length);
  animateNumber(statFilteredEl, rows.length);
  animateNumber(statProvinceEl, coveredProvinceCount);

  const textStyle = { color: '#f6e6be' };
  const axisStyle = { color: 'rgba(247, 226, 179, 0.8)' };
  const splitLineStyle = { color: 'rgba(255,255,255,0.12)' };

  const dynastyChart = echarts.getInstanceByDom(dynastyEl) || echarts.init(dynastyEl);
  dynastyChart.setOption({
    grid: { left: 44, right: 16, top: 26, bottom: 32 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: dynastyData.map(d => d[0]),
      axisLabel: { color: axisStyle.color, rotate: 30, fontSize: 11 },
      axisLine: { lineStyle: { color: axisStyle.color } }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: axisStyle.color },
      axisLine: { lineStyle: { color: axisStyle.color } },
      splitLine: { lineStyle: splitLineStyle }
    },
    series: [{
      type: 'bar',
      data: dynastyData.map(d => d[1]),
      barWidth: '55%',
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#f4d28a' },
          { offset: 1, color: '#b47b2a' }
        ])
      }
    }],
    textStyle
  });

  const batchChart = echarts.getInstanceByDom(batchEl) || echarts.init(batchEl);
  batchChart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}<br/>数量：{c}<br/>占比：{d}%' },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 6,
      top: 24,
      bottom: 16,
      itemWidth: 11,
      itemHeight: 11,
      itemGap: 8,
      pageIconColor: '#d9c08a',
      pageTextStyle: { color: axisStyle.color },
      textStyle: { color: axisStyle.color, fontSize: 10, width: 92, overflow: 'truncate' },
      formatter: (name) => String(name).length > 6 ? `${String(name).slice(0, 6)}…` : name
    },
    series: [{
      type: 'pie',
      radius: ['34%', '58%'],
      center: ['30%', '52%'],
      avoidLabelOverlap: true,
      label: { show: false },
      labelLine: { show: false },
      data: batchData.map(([name, value]) => ({ name, value }))
    }],
    textStyle
  });

  const provinceTopChart = echarts.getInstanceByDom(provinceTopEl) || echarts.init(provinceTopEl);
  provinceTopChart.setOption({
    grid: { left: 74, right: 24, top: 20, bottom: 20 },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'value',
      axisLabel: { color: axisStyle.color },
      axisLine: { lineStyle: { color: axisStyle.color } },
      splitLine: { lineStyle: splitLineStyle }
    },
    yAxis: {
      type: 'category',
      data: provinceTopData.map(d => d[0]),
      axisLabel: { color: axisStyle.color, fontSize: 11 },
      axisLine: { lineStyle: { color: axisStyle.color } }
    },
    series: [{
      type: 'bar',
      data: provinceTopData.map(d => d[1]),
      barWidth: 12,
      itemStyle: {
        borderRadius: [0, 8, 8, 0],
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          { offset: 0, color: '#6fd6ff' },
          { offset: 1, color: '#2f7ea2' }
        ])
      }
    }],
    textStyle
  });

  if (chaoshanEl) {
    chaoshanEl.innerHTML = `
      <p>中国古代桥梁建筑以“因地制宜、结构精巧、功能复合”为核心特征。当前筛选中可用于分析的古桥约 <b>${ancientRows.length}</b> 座，覆盖 <b>${dynastyCoverage}</b> 个朝代标签、<b>${categoryCoverage}</b> 类桥型。</p>
      <p>从技术谱系看，石拱桥强调受力稳定与耐久性，木构廊桥体现构架与公共空间结合，梁桥与浮桥则更适应水网地区商贸通行需求，呈现出地域环境与工程逻辑的深度耦合。</p>
      <p>从文化层面看，古桥不仅是交通设施，更是地方社会的公共节点，承载祭祀、商贸、集会与记忆传承等功能，体现了中国传统营造智慧与在地文化的长期互动。</p>
    `;
  }

  // 图表联动：点击朝代柱，按朝代过滤全国地图与右侧排行
  dynastyChart.on('click', (params) => {
    const clicked = params.name;
    INDEX_LINK_STATE.dynastyFilter = INDEX_LINK_STATE.dynastyFilter === clicked ? null : clicked;
    initIndexSideCharts();
    initProvinceCompareChart();
    initChinaMapPage();
  });

  // 图表联动：点击右侧省份排行条，高亮全国地图该省
  provinceTopChart.on('click', (params) => {
    INDEX_LINK_STATE.highlightProvince = params.name || null;
    initChinaMapPage();
  });

  window.addEventListener('resize', () => {
    dynastyChart.resize();
    batchChart.resize();
    provinceTopChart.resize();
  });
}

async function initChinaMapPage() {
  const mapEl = document.getElementById('chinaMap');
  if (!mapEl) return;

  const chart = echarts.getInstanceByDom(mapEl) || echarts.init(mapEl);
  INDEX_RUNTIME.chinaChart = chart;

  try {
    // 1）确保全国底图已加载（仅首次加载远程 GeoJSON）
    const mapName = await ensureChinaMapRegistered();

    // 2）根据左侧朝代筛选，形成地图高亮数据
    const filteredRows = getFilteredRowsForIndex();
    const provinceCount = {};
    filteredRows.forEach((item) => {
      const p = normalizeProvinceName(item.province || '');
      if (!p) return;
      provinceCount[p] = (provinceCount[p] || 0) + 1;
    });

    const mapSeriesData = Object.entries(provinceCount).map(([name, value]) => ({ name, value }));
    const provinceScatterData = Object.entries(provinceCount)
      .map(([name, count]) => {
        const center = PROVINCE_CENTER_COORDS[name];
        if (!center) return null;
        return {
          name,
          province: name,
          count,
          value: [center[0], center[1], count]
        };
      })
      .filter(Boolean);

    // 2）配置全国地图
    const isColorHeatmap = INDEX_LINK_STATE.mapMode === 'heatmap';
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.seriesType === 'map') {
            const value = Number.isFinite(params.value) ? params.value : 0;
            return `${params.name}<br/>桥梁数量：${value}`;
          }
          const d = params.data || {};
          const count = Number.isFinite(d.count) ? d.count : (Array.isArray(d.value) ? d.value[2] : 0);
          return `${d.province || d.name || params.name || '桥梁点位'}<br/>桥梁数量：${count || 0}`;
        }
      },
      visualMap: {
        min: 0,
        max: Math.max(...mapSeriesData.map(d => d.value), 1),
        seriesIndex: 0,
        show: isColorHeatmap,
        left: 18,
        bottom: 18,
        text: ['高', '低'],
        textStyle: { color: '#f2e8cf' },
        inRange: {
          color: ['#1f4d6e', '#2e7898', '#66b5d6', '#f0bd5a']
        }
      },
      geo: {
        map: mapName,
        roam: true,
        zoom: 1.1,
        label: {
          show: true,
          color: '#f2e8cf',
          fontSize: 11
        },
        itemStyle: {
          areaColor: '#1d4a6b',
          borderColor: '#d0b585',
          borderWidth: 1
        },
        regions: INDEX_LINK_STATE.highlightProvince
          ? [{
              name: INDEX_LINK_STATE.highlightProvince,
              itemStyle: {
                areaColor: '#f0bd5a',
                borderColor: '#fff3d0',
                borderWidth: 2
              },
              label: {
                color: '#1a1208',
                fontWeight: 'bold'
              }
            }]
          : [],
        emphasis: {
          label: { color: '#fff' },
          itemStyle: {
            areaColor: '#8b2e2a'
          }
        }
      },
      series: [
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          data: mapSeriesData,
          emphasis: { focus: 'self' }
        }
      ]
    };

    if (!isColorHeatmap) {
      option.series.push({
          name: '省份桥梁数量',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: provinceScatterData,
          symbolSize: (value) => {
            const count = Array.isArray(value) ? value[2] : 0;
            return Math.max(7, Math.min(24, Math.sqrt(count || 1) * 3.2));
          },
          showEffectOn: 'render',
          rippleEffect: { scale: 2.2, brushType: 'stroke' },
          itemStyle: { color: '#ffd074', opacity: 0.85 },
          zlevel: 2
      });
    }

    chart.off('click');
    chart.setOption(option, true);

    // 3）监听省份点击事件：把省名作为 URL 参数跳转到 province.html
    chart.on('click', function (params) {
      const provinceName = normalizeProvinceName(params.name);
      const encoded = encodeURIComponent(provinceName);
      window.location.href = `./province.html?name=${encoded}`;
    });

    window.addEventListener('resize', () => chart.resize());
  } catch (error) {
    console.error(error);
    alert('全国地图加载失败：地图 GeoJSON 请求被拦截或网络不可达。\n建议：\n1）请使用 Live Server 打开项目（不要直接 file:// 双击）；\n2）检查网络是否可访问 geo.datav.aliyun.com；\n3）若校园网限制外网，请切换网络后重试。');
  }
}

async function initProvinceMapPage() {
  const mapEl = document.getElementById('provinceMap');
  if (!mapEl) return;

  const chart = echarts.init(mapEl);
  INDEX_RUNTIME.chinaChart = chart;
  const tipsEl = document.getElementById('provinceTips');
  const titleEl = document.getElementById('provinceTitle');
  const backBtn = document.getElementById('backBtn');

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = './bridge-index.html';
    });
  }

  // 1）获取 URL 省份参数
  const params = new URLSearchParams(window.location.search);
  const rawProvinceName = params.get('name') || '';
  const provinceName = normalizeProvinceName(rawProvinceName);

  if (titleEl) {
    titleEl.textContent = `梁影万象 · ${provinceName || '未指定省份'}桥梁文物微观分布`;
  }

  const adcode = PROVINCE_ADCODE_MAP[provinceName];
  if (!adcode) {
    if (tipsEl) tipsEl.textContent = '无法识别省份名称，请从全国地图重新点击进入。';
    return;
  }

  try {
    // 2）加载省份 GeoJSON；静态部署时外链不可用会自动使用本地轮廓兜底
    const [provinceGeoJSON, csvRows] = await Promise.all([
      loadProvinceGeoJson(adcode, provinceName),
      loadCsvData(provinceName)
    ]);

    echarts.registerMap('current-province', provinceGeoJSON);

    // 3）从 CSV 提取本省桥梁并转为散点坐标
    //    关键逻辑：散点 value = [经度, 纬度, 其它维度字段]
    const scatterData = csvRows
      .map((row) => {
        // 兼容结构化数据（优先）与旧 CSV 行对象（兜底）
        const bridgeName = row.name || pickField(row, ['桥梁名称', '名称', '文物名称', 'name']);
        const dynasty = row.dynasty || pickField(row, ['建造时代', '建造时代/时间', '时代', '朝代', 'dynasty']);
        const province = normalizeProvinceName(row.province || pickField(row, ['所属省份', '省份', '省', 'province']));
        const city = row.city || pickField(row, ['所属市区', '所属市区/具体地址', '市区', '城市', '地市', 'city']);
        const address = row.address || pickField(row, ['具体地址', '地址', '位置', 'location', '所在地点', '所属市区/具体地址']);

        let lng = toNumberOrNull(row.lng ?? pickField(row, ['经度', 'lng', 'longitude']));
        let lat = toNumberOrNull(row.lat ?? pickField(row, ['纬度', 'lat', 'latitude']));
        let coordinateSource = row.coordinateSource || '原始坐标';

        if (!Number.isFinite(lng) || !Number.isFinite(lat)) {
          const inferred = inferLocalBridgeCoordinate(row, provinceName, provinceGeoJSON);
          if (inferred) {
            [lng, lat] = inferred;
            coordinateSource = '本地兜底估算';
          }
        }

        if (!bridgeName || !Number.isFinite(lng) || !Number.isFinite(lat)) return null;
        if (province !== provinceName) return null;

        return {
          name: bridgeName,
          value: [lng, lat],
          dynasty,
          province,
          city,
          address,
          batch: row.batch || pickField(row, ['批次', 'batch']) || '未知批次',
          coordinateSource
        };
      })
      .filter(Boolean);

    // 4）渲染省份侧边信息模块（概况卡、朝代图、批次图、桥梁列表、文化文案）
    renderProvinceSidePanels(provinceName, scatterData, chart);

    const onlineCount = scatterData.filter(d => String(d.coordinateSource).includes('在线编码')).length;
    const localCount = scatterData.filter(d => String(d.coordinateSource).includes('本地')).length;
    const rawCount = scatterData.filter(d => d.coordinateSource === '原始坐标').length;

    // 若省内仅 1 个点，把地图自动聚焦到该点附近，避免点太小或在边缘不易观察
    const isSinglePoint = scatterData.length === 1;
    const centerAndZoom = isSinglePoint
      ? {
          center: scatterData[0].value,
          zoom: 8
        }
      : {
          center: null,
          zoom: 1.1
        };

    // 4）省份地图 + 散点图
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          if (params.seriesType === 'effectScatter' || params.seriesType === 'scatter') {
            const d = params.data || {};
            return `
              <div style="line-height:1.7;">
                <div><b>${d.name || '未知桥梁'}</b></div>
                <div>时代：${d.dynasty || '未知'}</div>
                <div>省份：${d.province || '-'}</div>
                <div>市区：${d.city || '-'}</div>
                <div>地址：${d.address || '-'}</div>
                <div>坐标：${(d.value && d.value[0]) || '-'}, ${(d.value && d.value[1]) || '-'}</div>
                <div>坐标来源：${d.coordinateSource || '原始坐标'}</div>
              </div>
            `;
          }
          return params.name || '';
        }
      },
      geo: {
        map: 'current-province',
        roam: true,
        center: centerAndZoom.center,
        zoom: centerAndZoom.zoom,
        label: {
          show: true,
          color: '#f4e8d2'
        },
        itemStyle: {
          areaColor: '#21526f',
          borderColor: '#e3caa1',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: '#7a2724'
          }
        }
      },
      series: [
        {
          name: provinceName,
          type: 'map',
          map: 'current-province',
          geoIndex: 0,
          data: []
        },
        {
          name: '桥梁文物点位',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: scatterData,
          symbolSize: function (_val, params) {
            if (isSinglePoint) return 22;
            return String(params.data.coordinateSource).includes('在线编码') ? 13 : 14;
          },
          showEffectOn: 'render',
          rippleEffect: {
            period: 4,
            scale: 3.6,
            brushType: 'stroke'
          },
          itemStyle: {
            color: function (params) {
              return String(params.data.coordinateSource).includes('在线编码') ? '#7ad3ff' : '#ffd166';
            },
            shadowBlur: 14,
            shadowColor: 'rgba(255, 183, 77, 0.75)'
          },
          emphasis: {
            scale: true
          }
        }
      ]
    };

    chart.setOption(option);

    if (tipsEl) {
      tipsEl.textContent = `已加载 ${provinceName}，桥梁点位数：${scatterData.length}（原始坐标 ${rawCount} 条，本地估算 ${localCount} 条，在线编码 ${onlineCount} 条）${isSinglePoint ? '，已自动聚焦到该点' : ''}`;
    }

    // 5）点击散点进入桥梁详情页
    chart.off('click');
    chart.on('click', function (params) {
      if (params.seriesType !== 'effectScatter' && params.seriesType !== 'scatter') return;
      const d = params.data || {};
      const bridgeName = d.name || '';
      if (!bridgeName) return;
      const q = new URLSearchParams({
        name: bridgeName,
        province: d.province || provinceName
      });
      window.location.href = `./bridge.html?${q.toString()}`;
    });

    window.addEventListener('resize', () => chart.resize());
  } catch (error) {
    console.error(error);
    if (tipsEl) tipsEl.textContent = '省份地图或 CSV 数据加载失败，请检查文件与网络。';
  }
}

const BRIDGE_DETAIL_KB = {
  '广济桥': {
    intro: '广济桥又名湘子桥，位于广东潮州韩江之上，始建于南宋乾道年间，后历经元、明、清持续增修，逐步形成“东梁西拱、中段浮桥”的复合结构。它最大的特色是中段可启闭的浮梁体系，既满足日常通行，也便于舟楫往来，被认为是中国古代桥梁对“交通—航运”矛盾处理的经典方案。桥上曾建有亭台楼阁，与韩江水系、潮州古城共同构成独特的滨水文化景观。作为中国四大古桥之一，广济桥不仅展示了高超的工程智慧，也承载了潮州商贸、民俗与地域记忆，是研究岭南水运史和城市发展史的重要实物遗产。',
    highlights: ['中国四大古桥之一', '梁桥+拱桥+浮桥复合体系', '潮州古城与韩江文化的重要地标'],
    image: './img/广济桥.jpg',
    sources: [{ title: '百度百科：广济桥', url: 'https://baike.baidu.com/item/%E5%B9%BF%E6%B5%8E%E6%A1%A5' }]
  },
  '西新桥': {
    intro: '西新桥又称苏公桥，位于广东省惠州市惠城区西湖景区苏堤之上，是连接平湖与丰湖的重要通道，也是惠州西湖六大名桥之一。该桥始建于北宋绍圣三年（1096年），相传由时任惠州知州苏轼资助并推动修筑，初期为石盐木（柚木）结构，后历经南宋、明清及近现代多次修缮。现存桥体主体格局形成于明嘉靖三十五年（1556年）重建阶段，为五孔石拱桥，通体古朴稳健。西新桥不仅承载了惠州古城水陆交通功能，也见证了地方治水、城市景观营造与文脉延续，是苏东坡文化与惠州城市记忆的重要物质载体。',
    highlights: ['惠州西湖六大名桥之一', '北宋始建，后经多朝代修缮重建', '五孔石拱形制，兼具交通与景观价值'],
    image: './img/西新桥.png',
    sources: [{ title: '西新桥相关史料（地方文保与公开资料）', url: 'https://baike.baidu.com/item/%E8%A5%BF%E6%96%B0%E6%A1%A5' }]
  },
  '大汾古桥': {
    intro: '大汾古桥位于广东省东莞市石排镇大汾村，是珠三角水乡聚落中保存至今的重要古桥遗存。该桥整体为单孔石拱桥，桥体以红砂岩等石材砌筑，拱券饱满、桥面微拱，两侧设台阶与护栏，兼顾通行效率与结构稳定。作为村落内部跨水通道，它长期服务于居民出行、农产运输与圩市往来，是地方生活网络的关键节点。大汾古桥不仅反映了岭南地区因水而建、依桥成市的空间格局，也承载着东莞基层社会的乡土记忆，对研究珠三角传统聚落交通体系与民间营造技艺具有较高价值。',
    highlights: ['东莞石排镇大汾村重要古桥遗存', '单孔石拱桥，岭南水乡桥梁形制代表', '兼具交通功能与地方历史文化记忆'],
    image: '../img/大汾古桥.png',
    sources: [{ title: '百度百科：东莞大汾古桥', url: 'https://baike.baidu.com/item/%E4%B8%9C%E8%8E%9E%E5%A4%A7%E6%B1%BE%E5%8F%A4%E6%A1%A5/9581631' }]
  },
  '洛阳桥': {
    intro: '洛阳桥位于福建泉州洛阳江入海口，始建于北宋皇祐年间，是中国古代著名的大型跨海梁式石桥。桥梁建设因潮汐、软基和海浪冲刷而难度极高，古代工匠在长期实践中形成了“筏形基础”“种蛎固基”等关键技术：前者有助于分散荷载、增强整体稳定，后者利用牡蛎附着与壳体堆积加固桥基，被视作中国古代海工智慧的典型案例。洛阳桥不仅承担了泉州沿海交通功能，也深度嵌入宋元海上贸易网络，是海丝文化空间的重要节点。其桥碑、祠庙与周边历史环境共同构成复合型文化遗产，对研究宋代工程技术、区域经济和海洋文明交流具有重要价值。',
    highlights: ['宋代大型跨海梁式石桥代表', '筏形基础与“种蛎固基”技术典型', '海上丝绸之路重要交通遗产'],
    image: './img/洛阳古桥.webp',
    sources: [{ title: '百度百科：洛阳桥', url: 'https://baike.baidu.com/item/%E6%B4%9B%E9%98%B3%E6%A1%A5' }]
  },
  '安平桥': {
    intro: '安平桥（五里桥）位于福建晋江，始建于南宋，是中国现存古代最长的梁式石桥之一。',
    highlights: ['古代超长石梁桥代表', '宋代沿海交通工程典型', '泉州海丝文化圈重要遗产点'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Anping_Bridge.jpg/1280px-Anping_Bridge.jpg',
    sources: [{ title: '百度百科：安平桥', url: 'https://baike.baidu.com/item/%E5%AE%89%E5%B9%B3%E6%A1%A5' }]
  },
  '宝带桥': {
    intro: '宝带桥位于江苏苏州，是京杭大运河支流上的著名古桥，因长桥连拱形似宝带得名。',
    highlights: ['苏州水乡古桥代表', '多孔联拱形制优美', '运河文化遗产重要节点'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Baodai_Bridge_Suzhou.jpg/1280px-Baodai_Bridge_Suzhou.jpg',
    sources: [{ title: '百度百科：宝带桥', url: 'https://baike.baidu.com/item/%E5%AE%9D%E5%B8%A6%E6%A1%A5' }]
  },
  '赵州桥': {
    intro: '赵州桥又称安济桥，位于河北赵县洨河之上，建于隋代，是中国现存年代最早、保存较完整的单孔敞肩石拱桥之一。其核心价值在于结构创新：主拱两侧设置敞肩小拱，在减轻桥体自重的同时提升泄洪能力，并有助于分散受力、降低水毁风险。该桥以薄拱、大跨、低拱高比著称，体现出古代工匠对材料性能与力学规律的深刻把握。千余年来，赵州桥历经洪水、地震与交通环境变化仍保持整体形制，被视为中国古代桥梁工程技术的里程碑。它不仅具有极高的科学与建筑史价值，也成为中华工匠精神与传统营造智慧的象征。',
    highlights: ['中国古代石拱桥里程碑', '单孔敞肩拱结构开创性强', '兼具科学价值与文化象征意义'],
    image: './img/赵州桥.jpg',
    sources: [{ title: '百度百科：赵州桥', url: 'https://baike.baidu.com/item/%E8%B5%B5%E5%B7%9E%E6%A1%A5' }]
  },
  '安济桥': {
    intro: '安济桥即赵州桥，是隋代工匠李春设计建造的单孔敞肩石拱桥。',
    highlights: ['隋代桥梁工程高峰', '受力体系科学', '桥梁美学与结构统一'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Zhaozhou_Bridge.jpg/1280px-Zhaozhou_Bridge.jpg',
    sources: [{ title: '百度百科：安济桥', url: 'https://baike.baidu.com/item/%E5%AE%89%E6%B5%8E%E6%A1%A5' }]
  },
  '卢沟桥': {
    intro: '卢沟桥位于北京西南永定河上，始建于金代，后经元、明、清多次修葺扩建，形成今天所见的多孔联拱石桥格局。桥体采用石拱连续跨越河道，兼顾通行与防洪需求，是华北地区古代交通体系中的关键节点。卢沟桥最具辨识度的文化符号是桥栏望柱上的石狮群像，数量众多、形态各异，体现了高超的石刻工艺与审美传统。近现代以来，卢沟桥又因重大历史事件而成为民族记忆的重要场所，工程遗产价值与历史纪念价值叠加，使其在中国桥梁史、城市史和近现代史叙事中都占据独特地位。',
    highlights: ['华北多孔联拱石桥代表', '石狮群像具有高艺术价值', '兼具工程遗产与历史纪念双重意义'],
    image: './img/卢沟桥.jpg',
    sources: [{ title: '百度百科：卢沟桥', url: 'https://baike.baidu.com/item/%E5%8D%A2%E6%B2%9F%E6%A1%A5' }]
  },
  '五亭桥': {
    intro: '五亭桥位于江苏扬州瘦西湖，清代桥亭合一的园林桥梁代表。',
    highlights: ['桥亭合一景观经典', '扬州园林文化地标', '兼具交通与观景功能'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Wuting_Bridge_Yangzhou.jpg/1280px-Wuting_Bridge_Yangzhou.jpg',
    sources: [{ title: '百度百科：五亭桥', url: 'https://baike.baidu.com/item/%E4%BA%94%E4%BA%AD%E6%A1%A5' }]
  },
  '八字桥': {
    intro: '八字桥位于浙江绍兴，宋代古桥，桥位布局呈“八”字，是绍兴水城桥梁风貌代表。',
    highlights: ['绍兴水城古桥名片', '空间组织独特', '保留传统街巷-河道关系'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bazi_Bridge_Shaoxing.jpg/1280px-Bazi_Bridge_Shaoxing.jpg',
    sources: [{ title: '百度百科：八字桥', url: 'https://baike.baidu.com/item/%E5%85%AB%E5%AD%97%E6%A1%A5' }]
  },
  '小商桥': {
    intro: '小商桥位于河南临颍，宋代石桥，桥畔岳飞部将杨再兴墓使其兼具纪念意义。',
    highlights: ['中原地区宋代古桥代表', '桥与墓并存的历史景观', '地方文化认同度高'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Xiaoshang_Bridge.jpg/1280px-Xiaoshang_Bridge.jpg',
    sources: [{ title: '百度百科：小商桥', url: 'https://baike.baidu.com/item/%E5%B0%8F%E5%95%86%E6%A1%A5' }]
  },
  '龙脑桥': {
    intro: '龙脑桥位于四川泸县，是川南石桥代表，雕刻与桥体构造兼具地方审美。',
    highlights: ['川南古桥代表', '石雕艺术特色鲜明', '地方交通与聚落发展见证'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Longnao_Bridge.jpg/1280px-Longnao_Bridge.jpg',
    sources: [{ title: '百度百科：龙脑桥', url: 'https://baike.baidu.com/item/%E9%BE%99%E8%84%91%E6%A1%A5' }]
  },
  '双龙桥': {
    intro: '双龙桥位于云南建水，清代多孔石拱桥，连接古城与周边交通要道。',
    highlights: ['滇南古桥经典', '多孔联拱形态优美', '与建水古城景观协调统一'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Shuanglong_Bridge_Jianshui.jpg/1280px-Shuanglong_Bridge_Jianshui.jpg',
    sources: [{ title: '百度百科：双龙桥', url: 'https://baike.baidu.com/item/%E5%8F%8C%E9%BE%99%E6%A1%A5' }]
  },
  '金龙桥': {
    intro: '金龙桥位于云南丽江，是丽江古桥体系的重要组成，体现滇西北民族地区桥梁风格。',
    highlights: ['丽江古桥群组成部分', '地方石桥工艺典型', '文化景观价值突出'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jinlong_Bridge_Lijiang.jpg/1280px-Jinlong_Bridge_Lijiang.jpg',
    sources: [{ title: '百度百科：金龙桥', url: 'https://baike.baidu.com/item/%E9%87%91%E9%BE%99%E6%A1%A5' }]
  },
  '兰州黄河铁桥': {
    intro: '兰州黄河铁桥（中山桥）建成于清末，是黄河上著名近代钢桁梁桥。',
    highlights: ['近代工业桥梁遗产', '黄河桥梁史里程碑', '城市历史地标性极强'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Zhongshan_Bridge_Lanzhou.jpg/1280px-Zhongshan_Bridge_Lanzhou.jpg',
    sources: [{ title: '百度百科：中山桥', url: 'https://baike.baidu.com/item/%E4%B8%AD%E5%B1%B1%E6%A1%A5' }]
  },
  '滦河铁桥': {
    intro: '滦河铁桥位于河北唐山地区，是近代铁路桥梁工程的重要实例。',
    highlights: ['近代铁路桥梁代表', '工业遗产价值高', '反映近代交通体系演进'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Luanhe_Railway_Bridge.jpg/1280px-Luanhe_Railway_Bridge.jpg',
    sources: [{ title: '百度百科：滦河铁桥', url: 'https://baike.baidu.com/item/%E6%BB%A6%E6%B2%B3%E9%93%81%E6%A1%A5' }]
  },
  '泰顺廊桥': {
    intro: '泰顺廊桥群位于浙江温州泰顺，木拱廊桥体系完整，是中国木构桥梁的重要遗产。',
    highlights: ['中国木拱廊桥代表', '结构与民俗空间结合紧密', '山区交通文化遗产典型'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Taishun_Corridor_Bridge.jpg/1280px-Taishun_Corridor_Bridge.jpg',
    sources: [{ title: '百度百科：泰顺廊桥', url: 'https://baike.baidu.com/item/%E6%B3%B0%E9%A1%BA%E5%BB%8A%E6%A1%A5' }]
  },
  '闽东北廊桥': {
    intro: '闽东北廊桥分布于福建北部山区，是木拱廊桥传统营造技艺的重要承载体。',
    highlights: ['闽浙木拱廊桥文化圈核心', '桥梁兼具通行与公共活动功能', '非遗营造技艺依托空间'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Fujian_Corridor_Bridge.jpg/1280px-Fujian_Corridor_Bridge.jpg',
    sources: [{ title: '百度百科：木拱廊桥', url: 'https://baike.baidu.com/item/%E6%9C%A8%E6%8B%B1%E5%BB%8A%E6%A1%A5' }]
  },
  '坪坦风雨桥': {
    intro: '坪坦风雨桥位于湖南通道，侗族风雨桥文化代表，桥体与民族村寨空间密切相连。',
    highlights: ['侗族风雨桥代表', '桥亭空间兼具交通与社交功能', '民族建筑工艺特色明显'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dong_Wind_Rain_Bridge.jpg/1280px-Dong_Wind_Rain_Bridge.jpg',
    sources: [{ title: '百度百科：风雨桥', url: 'https://baike.baidu.com/item/%E9%A3%8E%E9%9B%A8%E6%A1%A5' }]
  },
  '地坪风雨桥': {
    intro: '地坪风雨桥位于贵州侗族地区，是西南民族地区廊桥建筑的典型代表。',
    highlights: ['西南民族桥梁文化样本', '木构工艺与村寨生活融合', '桥梁兼具景观与公共性'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dong_Wind_Rain_Bridge.jpg/1280px-Dong_Wind_Rain_Bridge.jpg',
    sources: [{ title: '百度百科：风雨桥', url: 'https://baike.baidu.com/item/%E9%A3%8E%E9%9B%A8%E6%A1%A5' }]
  },
  '泸县龙桥群': {
    intro: '泸县龙桥群分布于四川泸县，是西南地区保存较好的明清古桥群。',
    highlights: ['古桥群整体保护价值高', '地方交通网络历史见证', '石桥与乡土景观融合'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Longnao_Bridge.jpg/1280px-Longnao_Bridge.jpg',
    sources: [{ title: '百度百科：泸县龙桥群', url: 'https://baike.baidu.com/item/%E6%B3%B8%E5%8E%BF%E9%BE%99%E6%A1%A5%E7%BE%A4' }]
  },
  '琉璃河大桥': {
    intro: '琉璃河大桥位于北京房山地区，是华北古道交通节点上的历史桥梁。',
    highlights: ['京西古道交通遗存', '区域历史地理研究价值高', '古桥与古道体系关联紧密'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Liulihe_Bridge.jpg/1280px-Liulihe_Bridge.jpg',
    sources: [{ title: '百度百科：琉璃河大桥', url: 'https://baike.baidu.com/item/%E7%90%89%E7%92%83%E6%B2%B3%E5%A4%A7%E6%A1%A5' }]
  },
  '如龙桥': {
    intro: '如龙桥位于浙江庆元，是浙南山区古桥代表，体现地方桥梁营造传统。',
    highlights: ['浙南古桥风貌典型', '山区通行体系历史遗存', '桥体与自然环境协调'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Rulong_Bridge.jpg/1280px-Rulong_Bridge.jpg',
    sources: [{ title: '百度百科：如龙桥', url: 'https://baike.baidu.com/item/%E5%A6%82%E9%BE%99%E6%A1%A5' }]
  },
  '古月桥': {
    intro: '古月桥位于浙江义乌，是江南古桥中形制精美、保存较好的代表之一。',
    highlights: ['江南石桥代表', '地方水网交通遗产', '桥梁景观与聚落空间一体化'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Guyue_Bridge.jpg/1280px-Guyue_Bridge.jpg',
    sources: [{ title: '百度百科：古月桥', url: 'https://baike.baidu.com/item/%E5%8F%A4%E6%9C%88%E6%A1%A5' }]
  }
};

function getBridgeByName(name) {
  return BRIDGE_DATA.find(item => item.name === name) || null;
}

function getBridgeDetail(name) {
  const key = Object.keys(BRIDGE_DETAIL_KB).find(k => name && name.includes(k));
  return key ? BRIDGE_DETAIL_KB[key] : null;
}

function getBridgeImageFallback(name) {
  const q = encodeURIComponent(`${name} 古桥`);
  return `https://image.baidu.com/search/index?tn=baiduimage&word=${q}`;
}

function getBridgeSourceFallback(name) {
  const q = encodeURIComponent(`${name} 桥梁 文物 介绍`);
  return `https://www.baidu.com/s?wd=${q}`;
}

function buildProvinceCultureText(provinceName, rows) {
  const total = rows.length;
  const dynasties = Array.from(new Set(rows.flatMap(r => getDynastyTags(r.dynasty))));
  const batches = Array.from(new Set(rows.map(r => r.batch || '未知批次')));
  const topBridge = rows[0]?.name || '代表桥梁';
  return `${provinceName}现统计桥梁文物${total}处，跨越${dynasties.length}个朝代阶段、分布于${batches.length}个文物批次。以“${topBridge}”等桥梁为代表，折射出该区域古代交通组织、河网利用与地方营建技艺的长期演进。`;
}

function inferBridgeMaterial(item) {
  const text = `${item.category || ''} ${item.name || ''} ${item.address || ''} ${item.city || ''}`;
  if (/铁索|钢|铁路|铁桥/.test(text)) return '金属（铁/钢）';
  if (/木拱|木构|木梁|木桥|风雨桥|廊桥/.test(text)) return '木';
  if (/砖/.test(text)) return '砖石';
  if (/石拱|石梁|石板|石桥|玄武岩|岩/.test(text)) return '石';
  if (/浮桥|桥船/.test(text)) return '浮桥/舟桥';
  return '复合/其他';
}

const BRIDGE_MATERIAL_OVERRIDES = {
  '广济桥': '复合/其他',
  '洛阳桥': '石',
  '赵州桥': '石',
  '卢沟桥': '石'
};

function getBridgeMaterial(item) {
  const name = (item?.name || '').trim();
  if (name && BRIDGE_MATERIAL_OVERRIDES[name]) return BRIDGE_MATERIAL_OVERRIDES[name];
  return inferBridgeMaterial(item || {});
}

function renderInteractiveProvinceMindmap(mindmapChartEl, provinceName, scatterData, batchData) {
  if (!mindmapChartEl) return;

  const mindmapChart = echarts.getInstanceByDom(mindmapChartEl) || echarts.init(mindmapChartEl);
  const topBridges = scatterData.slice(0, 12);
  const topBatches = batchData.slice(0, 6).map(([name]) => name);
  const expandedBridges = new Set();
  const expandedBatches = new Set();

  const buildMindmap = () => {
    const nodes = [
      { id: provinceName, name: provinceName, symbolSize: 56, category: 0, nodeType: 'province' }
    ];
    const links = [];

    topBridges.forEach((b, i) => {
      const bid = `bridge-${i}`;
      nodes.push({ id: bid, name: b.name, symbolSize: 24, category: 1, nodeType: 'bridge', rawName: b.name });
      links.push({ source: provinceName, target: bid });

      if (expandedBridges.has(bid)) {
        const meta = [
          { id: `${bid}-dynasty`, label: `朝代：${b.dynasty || '未知'}` },
          { id: `${bid}-material`, label: `材质：${getBridgeMaterial(b)}` },
          { id: `${bid}-batch`, label: `批次：${b.batch || '未知批次'}` }
        ];
        meta.forEach((m) => {
          nodes.push({ id: m.id, name: m.label, symbolSize: 18, category: 3, nodeType: 'meta' });
          links.push({ source: bid, target: m.id });
        });
      }
    });

    topBatches.forEach((batchName, i) => {
      const batchId = `batch-${i}`;
      nodes.push({ id: batchId, name: batchName, symbolSize: 21, category: 2, nodeType: 'batch', rawBatch: batchName });
      links.push({ source: provinceName, target: batchId });

      if (expandedBatches.has(batchId)) {
        scatterData
          .filter(item => (item.batch || '未知批次') === batchName)
          .slice(0, 6)
          .forEach((item, j) => {
            const cid = `${batchId}-bridge-${j}`;
            nodes.push({ id: cid, name: item.name, symbolSize: 16, category: 1, nodeType: 'bridge', rawName: item.name });
            links.push({ source: batchId, target: cid });
          });
      }
    });

    return { nodes, links };
  };

  const renderMindmap = () => {
    const { nodes, links } = buildMindmap();
    mindmapChart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        draggable: true,
        label: { show: true, color: '#f5e3b8', fontSize: 10 },
        force: { repulsion: 220, edgeLength: [42, 96] },
        data: nodes,
        links,
        categories: [{ name: '省份' }, { name: '桥梁' }, { name: '批次' }, { name: '属性' }],
        lineStyle: { color: 'source', curveness: 0.08, opacity: 0.72 }
      }]
    });
  };

  mindmapChart.off('click');
  mindmapChart.on('click', (params) => {
    const d = params.data || {};
    const id = d.id || '';
    if (!id) return;

    if (d.nodeType === 'bridge') {
      const bridgeName = d.rawName || d.name;
      const now = Date.now();
      if (mindmapChart.__lastBridgeName === bridgeName && (now - (mindmapChart.__lastBridgeTime || 0)) < 900) {
        const q = new URLSearchParams({ name: bridgeName, province: provinceName });
        window.location.href = `./bridge.html?${q.toString()}`;
        return;
      }
      mindmapChart.__lastBridgeName = bridgeName;
      mindmapChart.__lastBridgeTime = now;

      if (expandedBridges.has(id)) expandedBridges.delete(id);
      else expandedBridges.add(id);
      renderMindmap();
      return;
    }

    if (d.nodeType === 'batch') {
      if (expandedBatches.has(id)) expandedBatches.delete(id);
      else expandedBatches.add(id);
      renderMindmap();
    }
  });

  renderMindmap();
}

function renderProvinceSidePanels(provinceName, scatterData, chart) {
  const totalEl = document.getElementById('pvTotal');
  const dynCountEl = document.getElementById('pvDynastyCount');
  const batchCountEl = document.getElementById('pvBatchCount');
  const coordCountEl = document.getElementById('pvCoordCount');
  const cultureEl = document.getElementById('pvCultureText');
  const listEl = document.getElementById('pvBridgeList');
  const dynastyChartEl = document.getElementById('pvDynastyChart');
  const batchChartEl = document.getElementById('pvBatchChart');
  const materialChartEl = document.getElementById('pvMaterialChart');
  const mindmapChartEl = document.getElementById('pvMindmapChart');

  if (!dynastyChartEl || !batchChartEl) return;

  const dynMap = {};
  const batchMap = {};
  const materialMap = {};
  scatterData.forEach((item) => {
    getDynastyTags(item.dynasty).forEach(d => { dynMap[d] = (dynMap[d] || 0) + 1; });
    const b = item.batch || '未知批次';
    batchMap[b] = (batchMap[b] || 0) + 1;
    const m = getBridgeMaterial(item);
    materialMap[m] = (materialMap[m] || 0) + 1;
  });

  const dynData = Object.entries(dynMap).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const batchData = Object.entries(batchMap).sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'));
  const materialData = Object.entries(materialMap).sort((a, b) => b[1] - a[1]);

  if (totalEl) totalEl.textContent = String(scatterData.length);
  if (dynCountEl) dynCountEl.textContent = String(Object.keys(dynMap).length);
  if (batchCountEl) batchCountEl.textContent = String(Object.keys(batchMap).length);
  if (coordCountEl) coordCountEl.textContent = String(scatterData.filter(d => Number.isFinite(d.value?.[0]) && Number.isFinite(d.value?.[1])).length);
  if (cultureEl) {
    cultureEl.textContent = `${buildProvinceCultureText(provinceName, scatterData)} 当前基于桥名与分类文本进行材质推断（石/木/金属/砖石/浮桥/复合），可用于结构类型对比分析。`;
  }

  if (listEl) {
    listEl.innerHTML = scatterData
      .slice(0, 30)
      .map((d, idx) => `<div class="bridge-item" data-name="${d.name}"><span>${idx + 1}. ${d.name}</span><em>${d.dynasty || '未知时代'}</em></div>`)
      .join('');

    const highlightByName = (name) => {
      if (!chart || !name) return;
      const idx = scatterData.findIndex(item => item.name === name);
      if (idx < 0) return;
      chart.dispatchAction({ type: 'downplay', seriesIndex: 1 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: idx });
      chart.dispatchAction({ type: 'showTip', seriesIndex: 1, dataIndex: idx });
    };

    const clearHighlight = () => {
      if (!chart) return;
      chart.dispatchAction({ type: 'downplay', seriesIndex: 1 });
      chart.dispatchAction({ type: 'hideTip' });
    };

    listEl.querySelectorAll('.bridge-item').forEach((el) => {
      const name = el.getAttribute('data-name') || '';

      el.addEventListener('mouseenter', () => {
        el.classList.add('active');
        highlightByName(name);
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('active');
        clearHighlight();
      });

      let lastClickName = '';
      let lastClickTime = 0;

      el.addEventListener('click', () => {
        const now = Date.now();
        const isSecondClickSameItem = lastClickName === name && (now - lastClickTime) < 1500;

        // 第二次点击同一桥梁：进入详情页
        if (isSecondClickSameItem) {
          const q = new URLSearchParams({ name, province: provinceName });
          window.location.href = `./bridge.html?${q.toString()}`;
          return;
        }

        // 第一次点击：地图居中并轻微放大
        lastClickName = name;
        lastClickTime = now;
        highlightByName(name);

        if (chart) {
          const hit = scatterData.find(item => item.name === name);
          if (hit && Array.isArray(hit.value)) {
            const option = chart.getOption() || {};
            const currentGeo = (option.geo && option.geo[0]) || {};
            const currentZoom = Number(currentGeo.zoom) || 1.1;
            const nextZoom = Math.min(Math.max(currentZoom + 0.35, 1.8), 7);

            chart.setOption({
              geo: {
                center: hit.value,
                zoom: nextZoom
              }
            });
          }
        }
      });
    });

    if (chart) {
      chart.off('mouseover');
      chart.on('mouseover', (params) => {
        if (params.seriesType !== 'effectScatter' && params.seriesType !== 'scatter') return;
        const name = params.data?.name;
        listEl.querySelectorAll('.bridge-item').forEach((el) => {
          el.classList.toggle('active', el.getAttribute('data-name') === name);
        });
      });

      chart.off('mouseout');
      chart.on('mouseout', () => {
        listEl.querySelectorAll('.bridge-item').forEach((el) => el.classList.remove('active'));
      });
    }
  }

  const dynChart = echarts.getInstanceByDom(dynastyChartEl) || echarts.init(dynastyChartEl);
  dynChart.setOption({
    grid: { left: 34, right: 8, top: 20, bottom: 26 },
    xAxis: { type: 'category', data: dynData.map(d => d[0]), axisLabel: { color: '#f5e3b8', fontSize: 10 }, axisLine: { lineStyle: { color: '#d7bf8f' } } },
    yAxis: { type: 'value', axisLabel: { color: '#f5e3b8', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } } },
    series: [{ type: 'bar', data: dynData.map(d => d[1]), barWidth: '56%', itemStyle: { color: '#d8a75f', borderRadius: [4, 4, 0, 0] } }],
    tooltip: { trigger: 'axis' }
  });

  const batChart = echarts.getInstanceByDom(batchChartEl) || echarts.init(batchChartEl);
  batChart.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#f5e3b8', fontSize: 10 } },
    series: [{ type: 'pie', radius: ['34%', '62%'], center: ['50%', '44%'], label: { color: '#f8edd2', fontSize: 10 }, data: batchData.map(([name, value]) => ({ name, value })) }]
  });

  if (materialChartEl) {
    const materialChart = echarts.getInstanceByDom(materialChartEl) || echarts.init(materialChartEl);
    materialChart.setOption({
      grid: { left: 52, right: 10, top: 18, bottom: 18 },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'value', axisLabel: { color: '#f5e3b8', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } } },
      yAxis: { type: 'category', data: materialData.map(d => d[0]).reverse(), axisLabel: { color: '#f5e3b8', fontSize: 10 } },
      series: [{ type: 'bar', data: materialData.map(d => d[1]).reverse(), barWidth: 10, itemStyle: { color: '#7ad3a8', borderRadius: [0, 6, 6, 0] } }]
    });
  }

  if (mindmapChartEl) {
    const mindmapChart = echarts.getInstanceByDom(mindmapChartEl) || echarts.init(mindmapChartEl);
    const topBridges = scatterData.slice(0, 12);
    const topBatches = batchData.slice(0, 6).map(([name]) => name);
    const expandedBridges = new Set();
    const expandedBatches = new Set();

    const buildMindmap = () => {
      const nodes = [
        { id: provinceName, name: provinceName, symbolSize: 56, category: 0, nodeType: 'province' }
      ];
      const links = [];

      topBridges.forEach((b, i) => {
        const bid = `bridge-${i}`;
        nodes.push({ id: bid, name: b.name, symbolSize: 24, category: 1, nodeType: 'bridge', rawName: b.name });
        links.push({ source: provinceName, target: bid });

        if (expandedBridges.has(bid)) {
          const meta = [
            { id: `${bid}-dynasty`, label: `朝代：${b.dynasty || '未知'}` },
            { id: `${bid}-material`, label: `材质：${getBridgeMaterial(b)}` },
            { id: `${bid}-batch`, label: `批次：${b.batch || '未知批次'}` }
          ];
          meta.forEach((m) => {
            nodes.push({ id: m.id, name: m.label, symbolSize: 18, category: 3, nodeType: 'meta' });
            links.push({ source: bid, target: m.id });
          });
        }
      });

      topBatches.forEach((batchName, i) => {
        const batchId = `batch-${i}`;
        nodes.push({ id: batchId, name: batchName, symbolSize: 21, category: 2, nodeType: 'batch', rawBatch: batchName });
        links.push({ source: provinceName, target: batchId });

        if (expandedBatches.has(batchId)) {
          scatterData
            .filter(item => (item.batch || '未知批次') === batchName)
            .slice(0, 6)
            .forEach((item, j) => {
              const cid = `${batchId}-bridge-${j}`;
              nodes.push({ id: cid, name: item.name, symbolSize: 16, category: 1, nodeType: 'bridge', rawName: item.name });
              links.push({ source: batchId, target: cid });
            });
        }
      });

      return { nodes, links };
    };

    const renderMindmap = () => {
      const { nodes, links } = buildMindmap();
      mindmapChart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          type: 'graph',
          layout: 'force',
          roam: true,
          draggable: true,
          label: { show: true, color: '#f5e3b8', fontSize: 10 },
          force: { repulsion: 220, edgeLength: [42, 96] },
          data: nodes,
          links,
          categories: [{ name: '省份' }, { name: '桥梁' }, { name: '批次' }, { name: '属性' }],
          lineStyle: { color: 'source', curveness: 0.08, opacity: 0.72 }
        }]
      });
    };

    mindmapChart.off('click');
    mindmapChart.on('click', (params) => {
      const d = params.data || {};
      const id = d.id || '';
      if (!id) return;

      // 点击桥梁节点：二次点击进入详情，单击展开/收起属性
      if (d.nodeType === 'bridge') {
        const bridgeName = d.rawName || d.name;
        const now = Date.now();
        if (mindmapChart.__lastBridgeName === bridgeName && (now - (mindmapChart.__lastBridgeTime || 0)) < 900) {
          const q = new URLSearchParams({ name: bridgeName, province: provinceName });
          window.location.href = `./bridge.html?${q.toString()}`;
          return;
        }
        mindmapChart.__lastBridgeName = bridgeName;
        mindmapChart.__lastBridgeTime = now;

        if (expandedBridges.has(id)) expandedBridges.delete(id);
        else expandedBridges.add(id);
        renderMindmap();
        return;
      }

      // 点击批次节点：展开/收起该批次下桥梁
      if (d.nodeType === 'batch') {
        if (expandedBatches.has(id)) expandedBatches.delete(id);
        else expandedBatches.add(id);
        renderMindmap();
      }
    });

    renderMindmap();
  }
}

function initBridgeDetailPage() {
  const titleEl = document.getElementById('bridgeDetailTitle');
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  const bridgeName = params.get('name') || '';
  const province = normalizeProvinceName(params.get('province') || '');

  const nameEl = document.getElementById('bridgeName');
  const introEl = document.getElementById('bridgeIntro');
  const dynastyEl = document.getElementById('bridgeDynasty');
  const provinceEl = document.getElementById('bridgeProvince');
  const addrEl = document.getElementById('bridgeAddress');
  const batchEl = document.getElementById('bridgeBatch');
  const catEl = document.getElementById('bridgeCategory');
  const coordEl = document.getElementById('bridgeCoord');
  const imgEl = document.getElementById('bridgeImage');
  const listEl = document.getElementById('bridgeHighlights');
  const srcEl = document.getElementById('bridgeSources');
  const graphEl = document.getElementById('bridgeGraph');
  const graphBtn = document.getElementById('bridgeGraphBtn');
  const backBtn = document.getElementById('bridgeBackBtn');

  const bridge = getBridgeByName(bridgeName) || {};
  const detail = getBridgeDetail(bridgeName) || {};

  if (backBtn) {
    backBtn.onclick = () => {
      const p = province || bridge.province || '';
      if (p) {
        window.location.href = `./province.html?name=${encodeURIComponent(p)}`;
      } else {
        window.location.href = './bridge-index.html';
      }
    };
  }

  if (graphBtn) {
    graphBtn.onclick = () => {
      const q = new URLSearchParams({
        province: (province || bridge.province || '').trim(),
        name: (bridgeName || '').trim()
      });
      window.location.href = `./graph.html?${q.toString()}`;
    };
  }

  if (titleEl) titleEl.textContent = `梁影万象 · ${bridgeName || '桥梁'}文物详情`;
  if (nameEl) nameEl.textContent = bridgeName || '未知桥梁';
  if (introEl) introEl.textContent = detail.intro || '该桥梁暂无本地详解，你可通过下方参考资料进一步查阅。';
  if (dynastyEl) dynastyEl.textContent = bridge.dynasty || '-';
  if (provinceEl) provinceEl.textContent = bridge.province || province || '-';
  if (addrEl) addrEl.textContent = bridge.address || bridge.city || '-';
  if (batchEl) batchEl.textContent = bridge.batch || '-';
  if (catEl) catEl.textContent = bridge.category || '-';
  if (coordEl) coordEl.textContent = Number.isFinite(bridge.lng) && Number.isFinite(bridge.lat) ? `${bridge.lng}, ${bridge.lat}` : '暂无坐标';

  const imageUrl = detail.image || getBridgeImageFallback(bridgeName || '古桥');
  if (imgEl) {
    imgEl.src = imageUrl;
    imgEl.onerror = () => {
      imgEl.src = 'https://dummyimage.com/1200x700/1b2f45/f5e7c2.png&text=%E6%A2%81%E5%BD%B1%E4%B8%87%E8%B1%A1';
    };
  }

  const highlights = detail.highlights || [
    `桥名：${bridgeName || '未知'}`,
    `时代：${bridge.dynasty || '未知'}`,
    `省份：${bridge.province || province || '未知'}`,
    '建议结合地方文旅官网或文物部门公开资料进行复核。'
  ];
  if (listEl) {
    listEl.innerHTML = highlights.map(t => `<li>${t}</li>`).join('');
  }

  const sources = detail.sources || [
    { title: '百度搜索（桥梁介绍）', url: getBridgeSourceFallback(bridgeName || '古桥') },
    { title: '百度图片（桥梁图片）', url: getBridgeImageFallback(bridgeName || '古桥') }
  ];
  if (srcEl) {
    srcEl.innerHTML = sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>`).join('');
  }

  // 关系图谱：桥梁-朝代-省份-分类-批次
  if (graphEl && typeof echarts !== 'undefined') {
    const chart = echarts.getInstanceByDom(graphEl) || echarts.init(graphEl);
    const center = bridgeName || '桥梁';
    const nodes = [
      { id: center, name: center, value: 40, symbolSize: 52, category: 0 },
      { id: `朝代:${bridge.dynasty || '未知'}`, name: `朝代：${bridge.dynasty || '未知'}`, symbolSize: 32, category: 1 },
      { id: `省份:${bridge.province || province || '未知'}`, name: `省份：${bridge.province || province || '未知'}`, symbolSize: 32, category: 2 },
      { id: `分类:${bridge.category || '未知'}`, name: `分类：${bridge.category || '未知'}`, symbolSize: 30, category: 3 },
      { id: `批次:${bridge.batch || '未知'}`, name: `批次：${bridge.batch || '未知'}`, symbolSize: 30, category: 4 }
    ];
    const links = nodes.slice(1).map(n => ({ source: center, target: n.id }));

    chart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        label: { show: true, color: '#f5e8c7', fontSize: 11 },
        force: { repulsion: 260, edgeLength: [70, 120] },
        data: nodes,
        links,
        categories: [
          { name: '桥梁' },
          { name: '朝代' },
          { name: '省份' },
          { name: '分类' },
          { name: '批次' }
        ],
        lineStyle: { color: 'source', curveness: 0.1, opacity: 0.75 }
      }]
    });
  }
}

function initGraphPage() {
  const graphEl = document.getElementById('provinceGraph');
  if (!graphEl || typeof echarts === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const province = normalizeProvinceName(params.get('province') || '广东省') || '广东省';
  const focusBridge = params.get('name') || '';

  const titleEl = document.getElementById('graphTitle');
  if (titleEl) {
    titleEl.textContent = `梁影万象 · ${province}关系导图`;
  }

  const backEl = document.getElementById('graphBackBtn');
  if (backEl) {
    backEl.href = `./province.html?name=${encodeURIComponent(province)}`;
  }

  const rows = BRIDGE_DATA.filter(r => normalizeProvinceName(r.province || '') === province);
  const batchMap = {};
  rows.forEach(r => {
    const b = (r.batch || '未知批次').trim();
    if (!batchMap[b]) batchMap[b] = [];
    batchMap[b].push(r);
  });

  const nodes = [{ id: `p-${province}`, name: province, symbolSize: 58, category: 0, nodeType: 'province' }];
  const links = [];

  Object.entries(batchMap).forEach(([batchName, list], i) => {
    const bid = `b-${i}`;
    nodes.push({ id: bid, name: batchName, symbolSize: 30, category: 1, nodeType: 'batch' });
    links.push({ source: `p-${province}`, target: bid });

    list.slice(0, 16).forEach((item, j) => {
      const nid = `${bid}-n-${j}`;
      const mat = getBridgeMaterial(item);
      nodes.push({ id: nid, name: item.name, symbolSize: focusBridge && item.name.includes(focusBridge) ? 30 : 20, category: 2, nodeType: 'bridge', rawName: item.name });
      links.push({ source: bid, target: nid });

      const mid = `${nid}-m`;
      nodes.push({ id: mid, name: `材质：${mat}`, symbolSize: 16, category: 3, nodeType: 'material' });
      links.push({ source: nid, target: mid });
    });
  });

  const chart = echarts.getInstanceByDom(graphEl) || echarts.init(graphEl);
  chart.setOption({
    tooltip: { trigger: 'item' },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      draggable: true,
      label: { show: true, color: '#f5e3b8', fontSize: 10 },
      force: { repulsion: 260, edgeLength: [46, 100] },
      data: nodes,
      links,
      categories: [{ name: '省份' }, { name: '批次' }, { name: '桥梁' }, { name: '材质' }],
      lineStyle: { color: 'source', curveness: 0.08, opacity: 0.75 }
    }]
  });

  chart.off('click');
  chart.on('click', (params) => {
    const d = params.data || {};
    if (d.nodeType === 'bridge' && d.rawName) {
      const q = new URLSearchParams({ name: d.rawName, province });
      window.location.href = `./bridge.html?${q.toString()}`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initIndexFilters();
  initIndexTimeline();
  initProvinceCompareControls();
  initIndexSearchAndExport();
  initIndexSideCharts();
  initProvinceCompareChart();
  initChinaMapPage();
  initProvinceMapPage();
  initBridgeDetailPage();
  initGraphPage();
});
