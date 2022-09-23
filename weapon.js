const result = require('./index');
const XLSX = require('xlsx');
const weapons = {};
result.forEach(item => {
  const {id, ...other} = item.weapon;
  if (['WIN', 'LOSE'].includes(item.judgement)) {
    if (!weapons[id]) {
      weapons[id] = {
        name: item.weapon.name,
        ...other,
        win: item.judgement === "WIN" ? 1 : 0,
        lose: item.judgement === "WIN" ? 0 : 1,
      };
    } else {
      weapons[id].paint += other.paint;
      weapons[id].kill += other.kill;
      weapons[id].death += other.death;
      weapons[id].assist += other.assist;
      weapons[id].special += other.special;
      weapons[id][item.judgement.toLocaleLowerCase()]++;
    }
  }
});
const title = ["名称", "涂墨点数", "击杀", "阵亡", "助攻", "大招", "胜", "败", "击杀阵亡比", "总场数"];
const weaponDetail = Object.values(weapons).map((item, index) => {
  return [
    item.name,
    item.paint,
    item.kill,
    item.death,
    item.assist,
    item.special,
    item.win,
    item.lose,
    {t: "n", f: `C${index + 2}/D${index + 2}`},
    {t: "n", f: `G${index + 2}+H${index + 2}`},
  ]
});
const ws = XLSX.utils.aoa_to_sheet([title].concat(weaponDetail));
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "武器");
const buf = XLSX.write(wb, {type: "buffer",bookType: "xlsx"});
require('fs').writeFile('weapon.xlsx', buf, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('文件创建成功')
  }
});