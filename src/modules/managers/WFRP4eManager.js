import BaseManager from "./BaseManager.js";

export default class WFRP4eManager extends BaseManager {
  /**
   *
   * @return {[]}
   */
  static get weapons() {
    const actor = game.user.character;
    const items = actor.items;
    const weapons = items.filter(i => i.data.type === 'weapon' && i.data.data.equipped === true && i.data.data.ammunitionGroup.value !== "none");
    const ammunition = this.ammunition;

    return weapons.map(w => {
      let ammo = ammunition[w.data.data.ammunitionGroup.value];
      let selected = ammo?.find(a => a._id === w.data.data.currentAmmo.value);

      return {
        _id: w.data._id,
        img: w.data.img,
        name: w.data.name,
        selected: selected,
        ammunition: ammo
      }
    });
  }

  /**
   *
   * @return {[]}
   */
  static get ammunition() {
    const actor = game.user.character;
    const items = actor.items;
    let ammo = items.filter(i => i.data.type === 'ammunition');
    let ammunition = {};
    ammo.forEach(a => {
      let ammoType = a.data.data.ammunitionType.value;
      if (ammunition[ammoType] === undefined)
        ammunition[ammoType] = [];

      ammunition[ammoType].push({
        _id: a.data._id,
        img: a.data.img,
        name: a.data.name,
        quantity: a.data.data.quantity.value
      })
    });

    return ammunition;
  }

  /**
   *
   * @param {string} weaponId
   * @param {string} ammoId
   */
  static async setAmmunition(weaponId, ammoId) {
    const actor = game.user.character;
    const weapon = actor.items.find(i => i.id === weaponId);
    if (weapon) {
      await weapon.update({'data.currentAmmo.value': ammoId});
    }
  }
}