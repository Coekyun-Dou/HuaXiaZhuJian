// yamen.js
// 中国古代官府衙署分布与规制大屏逻辑

(function () {
  const MAP_NAME = 'china';
  const REG_KEYS = ['大堂', '二堂', '六房', '谯楼', '监狱'];

  // 写死数据：不读取本地文件
  const YAMEN_CSV_TEXT = `名称,朝代,省份,市县,经度,纬度,机构级别,保护级别,现存核心建筑
直隶总督署,清,河北,保定市,115°29',38°52',总督府,保存完好,大堂、二堂、六房
南阳府衙,明清,河南,南阳市,112°32',33°00',府衙,保存完好,大堂、二堂、六房、监狱
淮安府衙,明清,江苏,淮安市,119°02',33°30',府衙,保存完好,大堂、二堂
潞安府衙,隋-清,山西,长治市,113°06',36°11',府衙,部分保存,大堂、二堂
霍州署衙,元-清,山西,霍州市,111°45',36°34',州衙,保存完好,大堂、二堂、六房
内乡县衙,元-清,河南,内乡县,111°51',33°03',县衙,保存完好,大堂、二堂、六房、监狱
叶县县衙,明,河南,叶县,113°21',33°37',县衙,保存完好,大堂、二堂
平遥县衙,明清,山西,平遥县,112°10',37°12',县衙,保存完好,大堂、二堂、六房、监狱
澶州署,宋,河南,濮阳县,115°02',35°42',州衙,复建,大堂
赵州署,明清,河北,赵县,114°46',37°45',州衙,遗址,大堂、二堂
定州署,明清,河北,定州市,114°59',38°31',州衙,遗址,大堂、二堂
易州署,明清,河北,易县,115°30',39°21',州衙,遗址,大堂、二堂
深州署,明清,河北,深州市,115°33',38°00',州衙,遗址,大堂
晋州署,明清,河北,晋州市,115°03',38°02',州衙,遗址,大堂
磁州署,明清,河北,磁县,114°23',36°22',州衙,遗址,大堂、二堂
绛州署,明清,山西,新绛县,111°13',35°37',州衙,部分保存,大堂、二堂
解州署,明清,山西,运城市,110°59',34°56',州衙,遗址,大堂
辽州署,明清,山西,左权县,113°22',37°05',州衙,遗址,大堂
沁州署,明清,山西,沁县,112°42',36°45',州衙,遗址,大堂
泰安州署,明清,山东,泰安市,117°05',36°12',州衙,遗址,大堂、二堂
胶州署,明清,山东,胶州市,120°02',36°16',州衙,遗址,大堂
莒州署,明清,山东,莒县,118°50',35°35',州衙,遗址,大堂
平越卫,明,贵州,福泉市,107°31',26°41',都司卫所,遗址,谯楼、城门
贵州都指挥使司,明,贵州,贵阳市,106°42',26°34',都司卫所,遗址(今公安局),大堂、谯楼
苏州府治(黄堂),唐-明,江苏,苏州市,120°37',31°18',府衙,遗址,大堂
唐长安皇城官署群,隋唐,陕西,西安市,108°56',34°15',中央官署,遗址,三省六部遗址群
八番顺元宣慰司都元帅府,元,贵州,贵阳市,106°42',26°34',宣慰司,遗址,大堂、谯楼
唐中书省遗址,唐,陕西,西安市,108°56',34°15',中央官署,遗址,中枢公廨
唐门下省遗址,唐,陕西,西安市,108°56',34°15',中央官署,遗址,政令审核机构遗址
唐尚书省遗址,唐,陕西,西安市,108°56',34°15',中央官署,遗址,行政中枢遗址
唐代六部遗址,唐,陕西,西安市,108°56',34°15',中央官署,遗址,吏户礼兵刑工遗址
宋代中书省遗址,宋,河南,开封市,114°18',34°48',中央官署,遗址,北宋中枢官署遗址
凤阳府衙遗址,明,安徽,凤阳县,117°33',32°52',府衙,遗址,大堂、二堂
开封府衙遗址,宋-清,河南,开封市,114°18',34°48',府衙,遗址,大堂、六房、监狱
广州府衙遗址,明清,广东,广州市,113°16',23°08',府衙,遗址,大堂、二堂
荆州府衙遗址,明清,湖北,荆州市,112°14',30°20',府衙,遗址,大堂、二堂、六房
大同府衙遗址,明清,山西,大同市,113°18',40°05',府衙,遗址,大堂、二堂
顺天府衙遗址,明清,北京,北京市,116°24',39°54',府衙,遗址,大堂、二堂、六房
直隶总督署,清,河北,保定市,115°29',38°52',总督府,保存完好,大堂、二堂、六房
两江总督署遗址,清,江苏,南京市,118°46',32°04',总督府,遗址(总统府),大堂、二堂、六房
湖广总督署遗址,清,湖北,武汉市,114°18',30°33',总督府,遗址,大堂、二堂、六房
四川总督署,清,四川,成都市,104°04',30°40',总督府,改建,大堂、二堂
闽浙总督署遗址,清,福建,福州市,119°18',26°05',总督府,遗址,大堂、二堂
两广总督署遗址,清,广东,广州市,113°16',23°08',总督府,遗址,大堂、二堂、六房
云贵总督署,清,云南,昆明市,102°42',25°02',总督府,改建,大堂、二堂
陕西巡抚衙署,清,陕西,西安市,108°56',34°15',巡抚衙门,遗址,大堂、二堂、六房
澧州署,明清,湖南,澧县,111°45',29°38',州衙,遗址,元澧州路，明洪武中改府后降州
郴州署,明清,湖南,郴州市,113°02',25°46',州衙,遗址,明代直隶州，领永兴、宜章等县
靖州署,明清,湖南,靖州县,109°41',26°35',州衙,遗址,明代直隶州，领绥宁、通道等县
道州署,明清,湖南,道县,111°36',25°32',州衙,遗址,明代属永州府，领宁远、江华等县
全州署,明清,广西,全州县,111°04',25°56',州衙,遗址,明代属桂林府，灌阳等县
郁林州署,明清,广西,玉林市,110°11',22°38',州衙,遗址,明代属梧州府，领博白、陆川等县
田州土州署,宋-清,广西,田阳县,106°54',23°44',土司州衙,遗址(出土文物),岑氏土司衙门，清代出土司法文告碑
归州署,明清,湖北,秭归县,110°58',30°49',州衙,遗址,明代属荆州府，领兴山、巴东等县
均州署,明清,湖北,丹江口市,111°31',32°33',州衙,遗址(淹没),明代属襄阳府，武当山门户
随州署,明清,湖北,随州市,113°23',31°42',州衙,遗址,明代属德安府，领应山等县
峡州署,明清,湖北,宜昌市,111°17',30°42',州衙,遗址,明代属荆州府，领宜都、长阳等县
剑州署,明清,四川,剑阁县,105°31',32°17',州衙,遗址,明代属保宁府，领梓潼县
绵州署,明清,四川,绵阳市,104°41',31°28',州衙,遗址,明代属成都府，领罗江、彰明等县
茂州署,明清,四川,茂县,103°51',31°41',州衙,遗址,明代属成都府，领汶川县
简州署,明清,四川,简阳市,104°33',30°24',州衙,遗址,明代属成都府，领资阳县
崇庆州署,明清,四川,崇州市,103°40',30°38',州衙,遗址,明代属成都府，领新津县
汉州署,明清,四川,广汉市,104°17',30°59',州衙,遗址,明代属成都府，领什邡、绵竹等县
泸州署,明清,四川,泸州市,105°26',28°53',州衙,遗址,明代直隶州，领江安、纳溪等县
眉州署,明清,四川,眉山市,103°50',30°03',州衙,遗址,明代直隶州，领彭山、丹棱等县
邛州署,明清,四川,邛崃市,103°28',30°25',州衙,遗址,明代直隶州，领大邑、蒲江县
嘉定州署,明清,四川,乐山市,103°46',29°35',州衙,遗址,明代直隶州，领峨眉、夹江等县
潼川州署,明清,四川,三台县,105°05',31°05',州衙,遗址,明代直隶州，领射洪、中江等县
开州署,明清,贵州,开阳县,106°58',27°04',州衙,遗址,明代属贵阳军民府
广顺州署,明清,贵州,长顺县,106°27',26°01',州衙,遗址,明代属贵阳军民府
定番州署,明清,贵州,惠水县,106°39',26°08',州衙,遗址,明代属贵阳军民府，领十六长官司
普安州署,明清,贵州,盘州市,104°28',25°42',州衙,遗址,明代属云南布政司后改隶贵州
永宁州署,明清,贵州,关岭县,105°37',25°56',州衙,遗址,明代属安顺府
镇宁州署,明清,贵州,镇宁县,105°46',26°03',州衙,遗址,明代属安顺府
罗平州署,明清,云南,罗平县,104°18',24°53',州衙,遗址,明代属曲靖府
建水州署,明清,云南,建水县,102°49',23°37',州衙,遗址,明代属临安府
赵州署（云南）,明清,云南,大理市,100°15',25°47',州衙,遗址,明代属大理府
云州署,明清,云南,云县,100°07',24°27',州衙,遗址,明代属顺宁府
四会县衙,明-民国,广东,四会市,112°42',23°20',县衙,遗址(改建),明洪武初年设，使用五百余年，今华侨新村
程乡县署,宋-清,广东,梅州市,116°07',24°17',县衙,遗址,宋梅州旧治，明洪武移建，今废为考棚
潮阳县衙,明清,广东,汕头市,116°36',23°16',县衙,遗址,明代潮州府属县
揭阳县衙,明清,广东,揭阳市,116°22',23°33',县衙,遗址,明代潮州府属县
海丰县衙,明清,广东,海丰县,115°20',22°58',县衙,遗址,明代惠州府属县
龙川县衙,明清,广东,龙川县,115°15',24°06',县衙,遗址,明代惠州府属县，南越王赵佗兴王之地
新会县衙,明清,广东,江门市,113°02',22°31',县衙,遗址,明代广州府属县
顺德县衙,明清,广东,佛山市,113°15',22°50',县衙,遗址,明代广州府属县
东莞县衙,明清,广东,东莞市,113°45',23°03',县衙,遗址,明代广州府属县
琼山县衙,明清,海南,海口市,110°21',20°01',县衙,遗址,明代琼州府附郭县
临桂县衙,明清,广西,桂林市,110°17',25°16',县衙,遗址,明代桂林府附郭县
苍梧县衙,明清,广西,梧州市,111°17',23°29',县衙,遗址,明代梧州府附郭县
宣化县衙,明清,广西,南宁市,108°19',22°49',县衙,遗址,明代南宁府附郭县
柳城县衙,明清,广西,柳城县,109°15',24°39',县衙,遗址,明代柳州府属县
藤县县衙,明清,广西,藤县,110°55',23°22',县衙,遗址,明代梧州府属县
容县县衙,明清,广西,容县,110°33',22°52',县衙,遗址,明代梧州府属县，杨贵妃故里
岑溪县衙,明清,广西,岑溪市,111°00',22°55',县衙,遗址,明代梧州府属县
怀集县衙,明清,广西,怀集县,112°11',23°55',县衙,遗址,明代梧州府属县，后划归广东
长沙县衙,明清,湖南,长沙市,112°56',28°12',县衙,遗址,明代长沙府附郭县
善化县衙,明清,湖南,长沙市,112°56',28°12',县衙,遗址,明代长沙府附郭县，民国并入长沙县
湘潭县衙,明清,湖南,湘潭市,112°56',27°50',县衙,遗址,明代长沙府属县
湘阴县衙,明清,湖南,湘阴县,112°53',28°41',县衙,遗址,明代长沙府属县
衡阳县衙,明清,湖南,衡阳市,112°37',26°54',县衙,遗址,明代衡州府附郭县
祁阳县衙,明清,湖南,祁阳市,111°51',26°35',县衙,遗址,明代永州府属县
武冈县衙,明清,湖南,武冈市,110°38',26°44',县衙,遗址,明代宝庆府属县
沅陵县衙,明清,湖南,沅陵县,110°24',28°28',县衙,遗址,明代辰州府附郭县
南昌县衙,明清,江西,南昌市,115°51',28°41',县衙,遗址,明代南昌府附郭县
新建县衙,明清,江西,南昌市,115°51',28°41',县衙,遗址,明代南昌府附郭县
庐陵县衙,明清,江西,吉安市,115°00',27°07',县衙,遗址,明代吉安府附郭县，欧阳修故里
临川县衙,明清,江西,抚州市,116°21',27°59',县衙,遗址,明代抚州府附郭县，王安石、汤显祖故里
鄱阳县衙,明清,江西,鄱阳县,116°40',29°00',县衙,遗址,明代饶州府附郭县
赣县县衙,明清,江西,赣州市,114°56',25°51',县衙,遗址,明代赣州府附郭县
南城县衙,明清,江西,南城县,116°38',27°34',县衙,遗址,明代建昌府附郭县
宜春县衙,明清,江西,宜春市,114°23',27°48',县衙,遗址,明代袁州府附郭县
漳浦旧县衙,唐-清,福建,漳浦县,117°36',24°07',县衙,部分保存,唐开元四年建，现存正堂，县博物馆
漳州府衙,唐-清,福建,漳州市,117°39',24°31',府衙,遗址(保护),唐贞元二年徙此，朱熹曾知漳州
铜陵行宫,清,福建,东山县,117°25',23°42',巡检司衙,改建,清康熙总镇衙，今图书馆使用
龙溪县衙遗址,南朝-宋,福建,龙海市,117°49',24°27',县衙,遗址(保护),南朝梁代县衙，存古县大庙，市文保
晋江县衙,明清,福建,泉州市,118°35',24°52',县衙,遗址,明代泉州府附郭县
莆田县衙,明清,福建,莆田市,119°01',25°26',县衙,遗址,明代兴化府附郭县
扬州府署,明-清,江苏,扬州市,119°26',32°24',府衙,遗址(紫藤园),明洪武三年移建，清同治十二年重建262间，今存紫藤园饭店内明代石狮、古藤
江都县署,明-清,江苏,扬州市,119°26',32°24',县衙,遗址(广陵区政府),明洪武七年建，附郭县，与扬州知府同城办公
甘泉县署,清,江苏,扬州市,119°26',32°23',县衙,遗址(门楼存),雍正九年置，分治府城西北区域，门楼为甘泉路地名来源
两淮都转盐运使司,清,江苏,扬州市,119°26',32°24',盐运司,遗址(东圈门),从三品高于知府，年征盐税600万两，东圈门为其门楼
淮安府署,明-清,江苏,淮安市,119°08',33°30',府衙,保存完好(国保),明洪武三年建，全国仅存两座府衙之一，正堂500㎡为全国之最
山阳县署,明-清,江苏,淮安市,119°08',33°30',县衙,遗址,淮安府附郭县，与知府同城办公
苏州府治,唐-清,江苏,苏州市,120°37',31°18',府衙,遗址,春申君所造，唐乾宁元年建大厅
常州府治,明-清,江苏,常州市,119°58',31°49',府衙,遗址,明代常州府，领武进、无锡等五县
镇江府治,明-清,江苏,镇江市,119°27',32°12',府衙,遗址,明代镇江府，领丹徒、丹阳等三县
松江府治,明-清,江苏,上海市,121°29',31°14',府衙,遗址,明代松江府，领华亭、上海等三县
严州府治,明-清,浙江,建德市,119°17',29°29',府衙,遗址,明洪武三年知府刘复礼重建，清军同知在府治东北
建德县治,宋-清,浙江,建德市,119°17',29°29',县衙,遗址,宋时建，元末兵毁，明洪武三年知县刘复礼重建
常山县治,明-清,浙江,常山县,118°31',28°54',县衙,遗址,县治隅倚山，嘉靖二十一年知县黄纶重修
开化县治,宋-清,浙江,开化县,118°25',29°08',县衙,遗址,宋太平兴国间设，元毁，明初即孔埠邮亭为署
新昌县治,明-清,浙江,新昌县,120°54',29°30',县衙,遗址,明洪武间知县周文祥建，含正厅、穿堂、六房等建筑
浙江布政分司,明,浙江,新昌县,120°54',29°30',布政分司,遗址,俗称“北司”，明洪武间知县周文祥建，有正厅三间
浙江按察分司,明,浙江,新昌县,120°54',29°30',按察分司,遗址,俗称“南司”，明洪武间建，与布政分司东西相对
金华府治,明-清,浙江,金华市,119°39',29°06',府衙,遗址,明代金华府，领金华、兰溪等八县
衢州府治,明-清,浙江,衢州市,118°52',28°58',府衙,遗址,明代衢州府，领西安、常山等五县`;

  const chart = {
    map: null,
    funnel: null,
    dynasty: null,
    radar: null,
    pie: null
  };

  let rows = [];
  let filteredRows = [];

  function pickField(row, keys) {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
        return String(row[k]).trim();
      }
    }
    return '';
  }

  function degreeToDecimal(raw) {
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

  function classifyLevel(level) {
    const t = String(level || '');
    if (/(总督|巡抚|都司|宣慰司|三省|六部|中央|府)/.test(t)) return '府衙及以上';
    return '州/县衙';
  }

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

  async function loadCsv() {
    const data = await parseCsvText(YAMEN_CSV_TEXT);

    rows = data.map((row) => {
      const name = pickField(row, ['名称', 'name']);
      const dynasty = pickField(row, ['朝代', '时代', 'dynasty']);
      const province = pickField(row, ['省份', 'province']);
      const city = pickField(row, ['市县', '城市', 'city']);
      const lngRaw = pickField(row, ['经度', '经度(E)', 'lng', 'longitude']);
      const latRaw = pickField(row, ['纬度', '纬度(N)', 'lat', 'latitude']);
      const level = pickField(row, ['机构级别', '行政等级', '官署类型', 'level']);
      const protection = pickField(row, ['保护级别', '保存状态', 'protection']);
      const core = pickField(row, ['现存核心建筑', '核心建筑', '建筑构件']);

      return {
        name,
        dynasty,
        province,
        city,
        lng: degreeToDecimal(lngRaw),
        lat: degreeToDecimal(latRaw),
        level,
        levelGroup: classifyLevel(level),
        protection,
        core
      };
    }).filter(r => r.name && Number.isFinite(r.lng) && Number.isFinite(r.lat));
  }

  function countBy(list, key) {
    const m = {};
    list.forEach((x) => {
      const k = String(x[key] || '未知').trim() || '未知';
      m[k] = (m[k] || 0) + 1;
    });
    return m;
  }

  function uniqueValues(list, key) {
    return [...new Set(list.map(x => String(x[key] || '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }

  function fillSelect(id, values) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">全部</option>' + values.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  function buildFilteredRows() {
    const dynasty = document.getElementById('yamenFilterDynasty')?.value || '';
    const province = document.getElementById('yamenFilterProvince')?.value || '';
    const level = document.getElementById('yamenFilterLevel')?.value || '';
    const protection = document.getElementById('yamenFilterProtection')?.value || '';

    return rows.filter(r =>
      (!dynasty || r.dynasty === dynasty) &&
      (!province || r.province === province) &&
      (!level || r.level === level) &&
      (!protection || r.protection === protection)
    );
  }

  function toCsv(list) {
    const head = ['名称', '朝代', '省份', '市县', '经度', '纬度', '机构级别', '保护级别', '现存核心建筑'];
    const lines = list.map(r => [r.name, r.dynasty, r.province, r.city, r.lng, r.lat, r.level, r.protection, r.core]);
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
    a.download = '官府筛选结果.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function applyFiltersAndRender() {
    filteredRows = buildFilteredRows();
    renderMap();
    renderFunnel();
    renderDynastyBar();
    renderRadarAll();
    renderProtectionPie();
    document.getElementById('yamenDetail').innerHTML = '点击地图散点查看官府详细信息。';
  }

  function initFilterBar() {
    fillSelect('yamenFilterDynasty', uniqueValues(rows, 'dynasty'));
    fillSelect('yamenFilterProvince', uniqueValues(rows, 'province'));
    fillSelect('yamenFilterLevel', uniqueValues(rows, 'level'));
    fillSelect('yamenFilterProtection', uniqueValues(rows, 'protection'));

    ['yamenFilterDynasty', 'yamenFilterProvince', 'yamenFilterLevel', 'yamenFilterProtection'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', applyFiltersAndRender);
    });

    document.getElementById('yamenExportCsvBtn')?.addEventListener('click', exportFilteredCsv);
    document.getElementById('yamenResetFilterBtn')?.addEventListener('click', () => {
      ['yamenFilterDynasty', 'yamenFilterProvince', 'yamenFilterLevel', 'yamenFilterProtection'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      applyFiltersAndRender();
    });
  }

  async function renderMap() {
    const el = document.getElementById('yamenChinaMap');
    chart.map = echarts.getInstanceByDom(el) || echarts.init(el);
    if (!echarts.getMap(MAP_NAME)) {
      throw new Error('本地中国地图数据未加载，请确认 ./vendor/china.js 已部署');
    }

    const baseRows = filteredRows.length ? filteredRows : rows;
    const topData = baseRows.filter(r => r.levelGroup === '府衙及以上').map((r) => ({ name: r.name, value: [r.lng, r.lat], extra: r }));
    const baseData = baseRows.filter(r => r.levelGroup !== '府衙及以上').map((r) => ({ name: r.name, value: [r.lng, r.lat], extra: r }));

    chart.map.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          const d = p.data?.extra;
          if (!d) return p.name || '';
          return `<b>${d.name}</b><br/>朝代：${d.dynasty || '-'}<br/>地点：${d.province} ${d.city}<br/>级别：${d.level || '-'}<br/>保护：${d.protection || '-'}<br/>核心建筑：${d.core || '-'}`;
        }
      },
      legend: {
        top: 10,
        textStyle: { color: '#f4e9cf' },
        data: ['府衙及以上', '州/县衙']
      },
      geo: {
        map: MAP_NAME,
        roam: true,
        zoom: 1.1,
        itemStyle: {
          areaColor: '#183a59',
          borderColor: '#d0b585',
          borderWidth: 1
        },
        emphasis: { itemStyle: { areaColor: '#6f2a24' } }
      },
      series: [
        {
          name: '府衙及以上',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: topData,
          symbolSize: 13,
          rippleEffect: { scale: 3 },
          itemStyle: { color: '#b6433f' }
        },
        {
          name: '州/县衙',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: baseData,
          symbolSize: 8,
          itemStyle: { color: '#5fa8d3' }
        }
      ]
    });

    // 地图散点点击：联动雷达图与详情
    chart.map.on('click', (params) => {
      const d = params.data?.extra;
      if (!d) return;
      renderRadarForOne(d);
      renderDetail(d);
    });
  }

  function renderFunnel() {
    const el = document.getElementById('levelFunnelChart');
    chart.funnel = echarts.getInstanceByDom(el) || echarts.init(el);

    const m = countBy(filteredRows.length ? filteredRows : rows, 'level');
    const ordered = Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));

    chart.funnel.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'funnel',
        top: 20,
        bottom: 20,
        left: '8%',
        width: '84%',
        minSize: '28%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: { color: '#f5e7c8' },
        itemStyle: { borderColor: '#111', borderWidth: 1 },
        data: ordered
      }]
    });
  }

  function renderDynastyBar() {
    const el = document.getElementById('dynastyBarChart');
    chart.dynasty = echarts.getInstanceByDom(el) || echarts.init(el);

    const m = countBy(filteredRows.length ? filteredRows : rows, 'dynasty');
    const ent = Object.entries(m).sort((a, b) => b[1] - a[1]);

    chart.dynasty.setOption({
      grid: { left: 40, right: 14, top: 20, bottom: 30 },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'category', data: ent.map(e => e[0]), axisLabel: { color: '#dbe7f2', rotate: 22 } },
      yAxis: { type: 'value', axisLabel: { color: '#dbe7f2' }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.12)' } } },
      series: [{ type: 'bar', data: ent.map(e => e[1]), barWidth: 14, itemStyle: { color: '#b5843c' } }]
    });
  }

  // 全盘规制频率雷达：统计五大构件在整体中的出现次数
  function renderRadarAll() {
    const el = document.getElementById('regulationRadarChart');
    chart.radar = echarts.getInstanceByDom(el) || echarts.init(el);

    const baseRows = filteredRows.length ? filteredRows : rows;
    const values = REG_KEYS.map((k) => baseRows.reduce((acc, r) => acc + (String(r.core || '').includes(k) ? 1 : 0), 0));
    const maxVal = Math.max(...values, 1);

    chart.radar.setOption({
      tooltip: {},
      radar: {
        center: ['50%', '55%'],
        radius: '64%',
        indicator: REG_KEYS.map(k => ({ name: k, max: maxVal })),
        axisName: { color: '#f4e9cf' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,.15)' } },
        splitArea: { areaStyle: { color: ['rgba(255,255,255,.02)', 'rgba(255,255,255,.04)'] } }
      },
      series: [{
        type: 'radar',
        data: [{
          value: values,
          name: '全局构件频率',
          areaStyle: { color: 'rgba(210,150,78,.35)' },
          lineStyle: { color: '#f0c98a', width: 2 },
          itemStyle: { color: '#ffd58e' }
        }]
      }]
    });
  }

  // 单点规制雷达：是否具备五要素
  function renderRadarForOne(item) {
    const vals = REG_KEYS.map((k) => String(item.core || '').includes(k) ? 1 : 0);

    chart.radar.setOption({
      radar: {
        indicator: REG_KEYS.map(k => ({ name: k, max: 1 }))
      },
      series: [{
        type: 'radar',
        data: [{
          value: vals,
          name: `${item.name}规制构件`,
          areaStyle: { color: 'rgba(184,67,63,.36)' },
          lineStyle: { color: '#d97b6a', width: 2 },
          itemStyle: { color: '#ffb49a' }
        }]
      }]
    });
  }

  function renderProtectionPie() {
    const el = document.getElementById('protectionPieChart');
    chart.pie = echarts.getInstanceByDom(el) || echarts.init(el);

    const m = countBy(filteredRows.length ? filteredRows : rows, 'protection');
    const data = Object.entries(m).map(([name, value]) => ({ name, value }));

    chart.pie.setOption({
      tooltip: { trigger: 'item' },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 2,
        top: 'middle',
        bottom: 8,
        itemWidth: 10,
        itemHeight: 10,
        pageIconColor: '#e9ddc5',
        pageTextStyle: { color: '#e9ddc5' },
        textStyle: { color: '#e9ddc5', fontSize: 10 }
      },
      series: [{
        type: 'pie',
        radius: ['42%', '62%'],
        center: ['34%', '50%'],
        avoidLabelOverlap: true,
        label: { show: false },
        itemStyle: { borderColor: '#0f1a2b', borderWidth: 2 },
        data
      }]
    });
  }

  function renderDetail(item) {
    const el = document.getElementById('yamenDetail');
    if (!el) return;
    el.innerHTML = `
      <div><b>${item.name}</b></div>
      <div>朝代：${item.dynasty || '-'}</div>
      <div>地点：${item.province || '-'} ${item.city || ''}</div>
      <div>机构级别：${item.level || '-'}</div>
      <div>保护级别：${item.protection || '-'}</div>
      <div>现存核心建筑：${item.core || '-'}</div>
    `;
  }

  function bindResize() {
    window.addEventListener('resize', () => {
      Object.values(chart).forEach(c => c && c.resize());
    });
  }

  async function init() {
    try {
      await loadCsv();
      if (!rows.length) throw new Error('CSV数据为空或字段无法识别');

      filteredRows = [...rows];
      initFilterBar();

      await renderMap();
      renderFunnel();
      renderDynastyBar();
      renderRadarAll();
      renderProtectionPie();
      bindResize();
    } catch (e) {
      console.error(e);
      const el = document.getElementById('yamenChinaMap');
      if (el) el.innerHTML = `<div style="padding:18px;color:#f4e9cf;">加载失败：${e.message}</div>`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
