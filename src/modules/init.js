import constants from "./constants.js";
import registerSettings from "./settings.js";
import AmmoSwapper from "./AmmoSwapper.js";

Hooks.once('init', () => {
  registerSettings();

  Hooks.callAll(`${constants.moduleName}:afterInit`);
});

Hooks.once('setup', () => {

  Hooks.callAll(`${constants.moduleName}:afterSetup`);
});

Hooks.once("ready", () => {
  AmmoSwapper.init();

  Hooks.callAll(`${constants.moduleName}:afterReady`);
});

Hooks.on("updateUser", (user, data, options, userId) => {
  if (Object.keys(data).includes('character')) AmmoSwapper.init();
});

Hooks.on("updateActor", (actor, data, options, userId) => {
  if (actor.id === game.user.character?.id) 
	  setTimeout(()=>{ui.ammoSwapper?.render()});
  
});

Hooks.on("updateOwnedItem", (actor, item, data, options, userId) => {
  if (actor.id === game.user.character?.id) 
	  setTimeout(()=>{ui.ammoSwapper?.render()});
});