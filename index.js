const result = require('./data/results.json').map((res) => {
  const detail = res.data.vsHistoryDetail;
  const mySelf = detail.myTeam.players.find((player) => {
    return player.isMyself;
  });
  const weapon = {
    id: mySelf.weapon.id,
    name: mySelf.weapon.name,
    paint: mySelf.paint,
    ...mySelf.result
  };
  const map = {
    id: detail.vsStage.id,
    name: detail.vsStage.name,
  }
  return {
    id: detail.id,
    rule: detail.vsRule.rule,
    judgement: detail.judgement,
    weapon,
    map,
  }
});
console.log(result)