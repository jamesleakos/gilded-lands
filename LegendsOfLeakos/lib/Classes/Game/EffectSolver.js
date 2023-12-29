"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MoveCardEffect_1 = __importDefault(require("../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var Effect_1 = require("../../Enums/Effect");
var Zone_1 = require("../../Enums/Zone");
var GameProperties_1 = __importDefault(require("./GameProperties"));
var EffectSolver = /** @class */ (function () {
    function EffectSolver() {
    }
    // #region On Methods for Turns and Phases
    EffectSolver.onRecruitmentPhaseStarted = function (gameState) {
        EffectSolver.resetBlockers(gameState);
        // reset all uses of all abilities
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            for (var _b = 0, _c = player.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                for (var _d = 0, _e = zone.enchantments; _d < _e.length; _d++) {
                    var enchantment = _e[_d];
                    for (var _f = 0, _g = enchantment.abilities; _f < _g.length; _f++) {
                        var ability = _g[_f];
                        ability.usesRemaining = ability.usesPerTurn;
                    }
                }
                for (var _h = 0, _j = zone.cards; _h < _j.length; _h++) {
                    var card = _j[_h];
                    for (var _k = 0, _l = card.abilities; _k < _l.length; _k++) {
                        var ability = _l[_k];
                        ability.usesRemaining = ability.usesPerTurn;
                    }
                    for (var _m = 0, _o = card.enchantments; _m < _o.length; _m++) {
                        var enchantment = _o[_m];
                        for (var _p = 0, _q = enchantment.abilities; _p < _q.length; _p++) {
                            var ability = _q[_p];
                            ability.usesRemaining = ability.usesPerTurn;
                        }
                    }
                    console.log('card: ' + card);
                    console.log('ability: ' + card.abilities[0]);
                }
            }
        }
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onRecruitmentPhaseEnded = function (gameState) {
        EffectSolver.resetBlockers(gameState);
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onManeuverPhaseStarted = function (gameState) {
        EffectSolver.resetBlockers(gameState);
        // DoEffect StartPhaseEffect if this is functionality that we need.
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            player.setPlayerManaFromLand();
        }
    };
    EffectSolver.onManeuverPhaseEnded = function (gameState) {
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onSkirmishPhaseStarted = function (gameState) {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onSkirmishPhaseEnded = function (gameState) {
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onBattlePhaseStarted = function (gameState) {
        // DoEffect StartPhaseEffect if this is functionality that we need.
    };
    EffectSolver.onBattlePhaseEnded = function (gameState) {
        this.resetBlockers(gameState);
        // DoEffect EndPhaseEffect if this is functionality that we need.
    };
    // #endregion
    // #region Blocking
    EffectSolver.resetBlockers = function (gameState) {
        gameState.blocks = [];
    };
    // #endregion
    // #region Utilities - random numbers
    EffectSolver.getRandomNumber = function (max) {
        return Math.floor(Math.random() * max);
    };
    EffectSolver.getRandomNumberInRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    // #endregion
    // #region Main Functions - doEffect and updateStatBuffs
    EffectSolver.doEffect = function (gameState, sourceEntityInstanceId, effect, targetInfoList) {
        var sourceEntity = gameState.getEntityFromAnywhere(sourceEntityInstanceId);
        if (!sourceEntity) {
            throw new Error('doEffect called with invalid sourceEntityInstanceId: ' +
                sourceEntityInstanceId);
        }
        var success = effect.preEffect(gameState, sourceEntity, targetInfoList);
        if (!success) {
            console.log('preeffect failed for effect: ' + Effect_1.EffectType[effect.effectType]);
            return;
        }
        // order doesn't matter all that much for the other preresolves, becuase they
        // can all create new effects if they really need other thigns to respond to them
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var p = _a[_i];
            var _loop_1 = function (zone) {
                var zoneDefinition = GameProperties_1.default.gameZones.find(function (x) { return x.zoneEnum === zone.zoneEnum; });
                if (zoneDefinition.refreshType === Zone_1.ZoneRefreshType.Dynamic) {
                    zone.preResolveEffect(effect, sourceEntity, gameState, targetInfoList);
                }
            };
            for (var _b = 0, _c = p.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                _loop_1(zone);
            }
        }
        effect.resolve(gameState, sourceEntity, targetInfoList);
        for (var _d = 0, _e = gameState.players; _d < _e.length; _d++) {
            var p = _e[_d];
            var _loop_2 = function (zone) {
                var zoneDefinition = GameProperties_1.default.gameZones.find(function (x) { return x.zoneEnum === zone.zoneEnum; });
                if (zoneDefinition.refreshType === Zone_1.ZoneRefreshType.Dynamic) {
                    zone.postResolveEffect(effect, sourceEntity, gameState, targetInfoList);
                }
            };
            for (var _f = 0, _g = p.zones; _f < _g.length; _f++) {
                var zone = _g[_f];
                _loop_2(zone);
            }
        }
        EffectSolver.updateStatBuffs(gameState);
        EffectSolver.checkForDeadCards(gameState);
    };
    EffectSolver.updateStatBuffs = function (gameState) {
        // update stat buffs
        // this bit just iterates through all stats - until marker
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var statPlayer = _a[_i];
            for (var _b = 0, _c = statPlayer.zones.filter(function (z) {
                return Zone_1.ZoneEnumMethods.isBoard(z.zoneEnum);
            }); _b < _c.length; _b++) {
                var statZone = _c[_b];
                // this returns just the boards
                for (var _d = 0, _e = statZone.cards; _d < _e.length; _d++) {
                    var statCard = _e[_d];
                    for (var _f = 0, _g = statCard.getStatList(); _f < _g.length; _f++) {
                        var stat = _g[_f];
                        // marker - now we've got a stat
                        // from here, we're going to iterate through all keywords and see if they want to affect our stat
                        // first, we'll keep a record of the current effective value, because if it changes we want
                        // to call an onValueChanged for the stat
                        var oldEffectiveValue = stat.effectiveValue;
                        // have to clear them before we add
                        stat.buffs = [];
                        // now we do our big loop with everything
                        for (var _h = 0, _j = gameState.players; _h < _j.length; _h++) {
                            var player = _j[_h];
                            for (var _k = 0, _l = player.zones.filter(function (z) {
                                return Zone_1.ZoneEnumMethods.isBoard(z.zoneEnum);
                            }); _k < _l.length; _k++) {
                                var zone = _l[_k];
                                for (var _m = 0, _o = zone.enchantments; _m < _o.length; _m++) {
                                    var enchantment = _o[_m];
                                    for (var _p = 0, _q = enchantment.keywords; _p < _q.length; _p++) {
                                        var keyword = _q[_p];
                                        var outBuff = keyword.addStatBuff(stat, statCard, gameState);
                                        if (outBuff != null) {
                                            stat.addBuff(outBuff.value, outBuff.details);
                                        }
                                    }
                                }
                                for (var _r = 0, _s = zone.cards; _r < _s.length; _r++) {
                                    var card = _s[_r];
                                    for (var _t = 0, _u = card.keywords; _t < _u.length; _t++) {
                                        var keyword = _u[_t];
                                        var outBuff = keyword.addStatBuff(stat, statCard, gameState);
                                        if (outBuff != null) {
                                            stat.addBuff(outBuff.value, outBuff.details);
                                        }
                                    }
                                    for (var _v = 0, _w = card.enchantments; _v < _w.length; _v++) {
                                        var enchantment = _w[_v];
                                        for (var _x = 0, _y = enchantment.keywords; _x < _y.length; _x++) {
                                            var keyword = _y[_x];
                                            var outBuff = keyword.addStatBuff(stat, statCard, gameState);
                                            if (outBuff != null) {
                                                stat.addBuff(outBuff.value, outBuff.details);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        var outString = '';
                        for (var _z = 0, _0 = stat.buffs; _z < _0.length; _z++) {
                            var buff = _0[_z];
                            outString += buff.details;
                        }
                        // call the action - this should presumable update everything important as well
                        if (stat.effectiveValue !== oldEffectiveValue &&
                            stat.onValueChanged != null) {
                            stat.onValueChanged(oldEffectiveValue, stat.effectiveValue);
                        }
                    }
                }
            }
        }
    };
    EffectSolver.checkForDeadCards = function (gameState) {
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var playZones = player.zones.filter(function (z) {
                return Zone_1.ZoneEnumMethods.isBoard(z.zoneEnum);
            });
            for (var _b = 0, playZones_1 = playZones; _b < playZones_1.length; _b++) {
                var zone = playZones_1[_b];
                for (var _c = 0, _d = zone.cards; _c < _d.length; _c++) {
                    var card = _d[_c];
                    if (card.health.effectiveValue <= 0) {
                        EffectSolver.doEffect(gameState, card.instanceId, MoveCardEffect_1.default.createMoveCardEffect(gameState.getZoneByInstanceId(card.residingZoneInstanceId)
                            .zoneEnum, Zone_1.ZoneEnum.Graveyard), []);
                    }
                }
            }
        }
    };
    return EffectSolver;
}());
exports.default = EffectSolver;
