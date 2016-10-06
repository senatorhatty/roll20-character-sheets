/* global getTranslationByKey:false */

import { getSetItems, isUndefinedOrEmpty, getIntValue } from './utilities';
import { CLASSES, ABILITIES, TOGGLE_VARS } from './constants';
import { Traits } from './Traits';
const traits = new Traits();

export class ClassFeatures {
  extraAttack(v) {
    if (v.fighter_level >= 5) {
      let extraAttackTimes;
      if (v.fighter_level >= 20) {
        extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_FOUR');
      } else if (v.fighter_level >= 11) {
        extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_THREE');
      } else {
        extraAttackTimes = getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TWICE');
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', extraAttackTimes),
        name: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK'),
        storageName: 'Extra Attack',
      });
    } else if (v.barbarian_level >= 5 || v.monk_level >= 5 || v.paladin_level >= 5 || v.ranger_level >= 5) {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TEXT').replace('NUMBER_OF_TIMES', getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK_TWICE')),
        name: getTranslationByKey('CLASS_FEATURE_EXTRA_ATTACK'),
        storageName: 'Extra Attack',
      });
    }
  }
  barbarian(v, finalSetAttrs) {
    if (v.barbarian_level) {
      let rageUses;
      if (v.barbarian_level >= 20) {
        rageUses = 999999;
      } else if (v.barbarian_level >= 17) {
        rageUses = 6;
      } else if (v.barbarian_level >= 12) {
        rageUses = 5;
      } else if (v.barbarian_level >= 6) {
        rageUses = 4;
      } else if (v.barbarian_level >= 3) {
        rageUses = 3;
      } else {
        rageUses = 2;
      }

      let rageDamage;
      if (v.barbarian_level >= 16) {
        rageDamage = 4;
      } else if (v.barbarian_level >= 9) {
        rageDamage = 3;
      } else {
        rageDamage = 2;
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_RAGE_TEXT').replace('RAGE_DAMAGE', rageDamage),
        name: getTranslationByKey('CLASS_FEATURE_RAGE'),
        recharge: 'Long Rest',
        storageName: 'Rage',
        type: 'Other',
        uses_max: rageUses,
      });

      if (isUndefinedOrEmpty(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = 'constitution';
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE_BARBARIAN_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE'),
        storageName: 'Unarmored Defense Barbarian',
      });

      if (v.barbarian_level >= 2) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_RECKLESS_ATTACK_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_RECKLESS_ATTACK'),
          storageName: 'Reckless Attack',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_DANGER_SENSE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DANGER_SENSE'),
          storageName: 'Danger Sense',
        });
      }
      if (v.barbarian_level >= 5) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FAST_MOVEMENT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FAST_MOVEMENT'),
          storageName: 'Fast Movement',
        });
      }
      if (v.barbarian_level >= 7) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FERAL_INSTINCT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FERAL_INSTINCT'),
          storageName: 'Feral Instinct',
        });
      }
      if (v.barbarian_level >= 9) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_BRUTAL_CRITICAL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_BRUTAL_CRITICAL'),
          storageName: 'Brutal Critical',
        });
      }
      if (v.barbarian_level >= 11) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_RELENTLESS_RAGE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_RELENTLESS_RAGE'),
          storageName: 'Relentless Rage',
        });
      }
      if (v.barbarian_level >= 15) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PERSISTENT_RAGE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PERSISTENT_RAGE'),
          storageName: 'Persistent Rage',
        });
      }
      if (v.barbarian_level >= 18) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_MIGHT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_MIGHT'),
          storageName: 'Indomitable Might',
        });
      }
      if (v.barbarian_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PRIMAL_CHAMPION_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PRIMAL_CHAMPION'),
          storageName: 'Primal Champion',
        });
      }
    }
  }
  bard(v, finalSetAttrs) {
    if (v.bard_level) {
      let die;
      if (v.bard_level >= 15) {
        die = 'd12';
      } else if (v.bard_level >= 10) {
        die = 'd10';
      } else if (v.bard_level >= 5) {
        die = 'd8';
      } else {
        die = 'd6';
      }
      let recharge = 'Long Rest';
      if (v.bard_level >= 5) {
        recharge = 'Short Rest';
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_BARDIC_INSPIRATION_TEXT').replace('d6', die),
        name: getTranslationByKey('CLASS_FEATURE_BARDIC_INSPIRATION'),
        recharge,
        storageName: 'Bardic Inspiration',
        uses_max: Math.max(getIntValue(v.charisma_mod), 1),
      });

      if (v.bard_level >= 2) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_JACK_OF_ALL_TRADES_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_JACK_OF_ALL_TRADES'),
          storageName: 'Jack of All Trades',
        });
        finalSetAttrs.jack_of_all_trades_toggle = '@{jack_of_all_trades}';

        let heal;
        if (v.bard_level >= 17) {
          heal = 'd12';
        } else if (v.bard_level >= 13) {
          heal = 'd10';
        } else if (v.bard_level >= 9) {
          heal = 'd8';
        } else {
          heal = 'd6';
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SONG_OF_REST_TEXT'),
          heal,
          name: getTranslationByKey('CLASS_FEATURE_SONG_OF_REST'),
          storageName: 'Song of Rest',
        });
      }
      if (v.bard_level >= 3) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_EXPERTISE_BARD_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_EXPERTISE'),
          storageName: 'Expertise Bard',
        });
      }
      if (v.bard_level >= 6) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_COUNTERCHARM_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_COUNTERCHARM'),
          storageName: 'Countercharm',
        });
      }
      if (v.bard_level >= 10) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_MAGICAL_SECRETS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_MAGICAL_SECRETS'),
          storageName: 'Magical Secrets',
        });
      }
      if (v.bard_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SUPERIOR_INSPIRATION_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SUPERIOR_INSPIRATION'),
          storageName: 'Superior Inspiration',
        });
      }
    }
  }
  cleric(v) {
    if (v.cleric_level) {
      if (v.cleric_level >= 2) {
        let channelDivinityUses;
        if (v.cleric_level >= 18) {
          channelDivinityUses = 3;
        } else if (v.cleric_level >= 6) {
          channelDivinityUses = 2;
        } else {
          channelDivinityUses = 1;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_CLERIC_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY'),
          recharge: 'Short Rest',
          storageName: 'Channel Divinity Cleric',
          uses_max: channelDivinityUses,
        });

        let turnUndeadText = getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD_TEXT');
        if (v.cleric_level >= 5) {
          let turnUndeadDestroyCR;
          if (v.cleric_level >= 17) {
            turnUndeadDestroyCR = '4';
          } else if (v.cleric_level >= 14) {
            turnUndeadDestroyCR = '3';
          } else if (v.cleric_level >= 11) {
            turnUndeadDestroyCR = '2';
          } else if (v.cleric_level >= 8) {
            turnUndeadDestroyCR = '1';
          } else {
            turnUndeadDestroyCR = '1/2';
          }
          turnUndeadText += `\n${getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD_TEXT_PART_2').replace('CHALLENGE_RATING', turnUndeadDestroyCR)}`;
        }
        traits.set({
          freetext: turnUndeadText,
          name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_TURN_UNDEAD'),
          saving_throw_ability: 'wisdom',
          saving_throw_vs_ability: 'WISDOM',
          storageName: 'Turn Undead',
        });
        if (v.cleric_level >= 10) {
          traits.set({
            freeform: '{{text_top=[[d100]] > [[@{cleric_level}]]}}',
            freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_INTERVENTION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_DIVINE_INTERVENTION'),
            storageName: 'Divine Intervention',
            uses_max: 1,
          });
        }
      }
    }
  }
  druid(v) {
    if (v.druid_level) {
      if (v.druid_level >= 2) {
        const wildShapeHours = Math.floor(v.druid_level / 2);
        let wildShapeUses;
        let wildShapeCR;
        let wildShapeLimitations;

        if (v.druid_level >= 4) {
          wildShapeCR = '1/2';
          wildShapeLimitations = getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_NO_FLYING');
        } else if (v.druid_level >= 8) {
          wildShapeCR = 1;
          wildShapeLimitations = '';
        } else {
          wildShapeCR = '1/4';
          wildShapeLimitations = getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_NO_FLYING_OR_SWIMMING');
        }
        if (v.druid_level >= 20) {
          wildShapeUses = 999999;
        } else {
          wildShapeUses = 2;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_WILD_SHAPE_TEXT')
            .replace('WILD_SHAPE_HOURS', wildShapeHours)
            .replace('CHALLENGE_RATING', wildShapeCR)
            .replace('LIMITATIONS', ` ${wildShapeLimitations}`),
          name: getTranslationByKey('CLASS_FEATURE_WILD_SHAPE'),
          recharge: 'Short Rest',
          storageName: 'Wild Shape',
          uses_max: wildShapeUses,
        });
      }
      if (v.druid_level >= 18) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY_DRUID_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY'),
          storageName: 'Timeless Body',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_BEAST_SPELLS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_BEAST_SPELLS'),
          storageName: 'Beast Spells',
        });
      }
      if (v.druid_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_ARCHDRUID_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_ARCHDRUID'),
          storageName: 'Archdruid',
        });
      }
    }
  }
  fighter(v) {
    if (v.fighter_level) {
      traits.set({
        freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_FIGHTER_OPTIONS')}`,
        name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
        storageName: 'Fighting Style',
      });
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_SECOND_WIND_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_SECOND_WIND'),
        heal: 'd10 + @{fighter_level}',
        recharge: 'Short Rest',
        storageName: 'Second Wind',
        uses_max: 1,
      });

      if (v.fighter_level >= 2) {
        let actionSurgeUses;
        if (v.fighter_level >= 17) {
          actionSurgeUses = 2;
        } else {
          actionSurgeUses = 1;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_ACTION_SURGE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_ACTION_SURGE'),
          recharge: 'Short Rest',
          storageName: 'Action Surge',
          uses_max: actionSurgeUses,
        });
      }
      if (v.fighter_level >= 9) {
        let indomitableUses;
        if (v.fighter_level >= 17) {
          indomitableUses = 3;
        } else if (v.fighter_level >= 13) {
          indomitableUses = 2;
        } else {
          indomitableUses = 1;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_INDOMITABLE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_INDOMITABLE'),
          recharge: 'Long Rest',
          storageName: 'Indomitable',
          uses_max: indomitableUses,
        });
      }
    }
  }
  monk(v, finalSetAttrs) {
    if (v.monk_level) {
      if (isUndefinedOrEmpty(v.ac_unarmored_ability)) {
        finalSetAttrs.ac_unarmored_ability = 'wisdom';
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE_MONK_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_UNARMORED_DEFENSE'),
        storageName: 'Unarmored Defense Monk',
      });
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_MARTIAL_ARTS_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_MARTIAL_ARTS'),
        storageName: 'Martial Arts',
      });
      if (v.monk_level >= 2) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_KI_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_KI'),
          recharge: 'Short Rest',
          storageName: 'Ki',
          uses_max: v.monk_level,
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FLURRY_OF_BLOWS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FLURRY_OF_BLOWS'),
          storageName: 'Flurry of Blows',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PATIENT_DEFENSE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PATIENT_DEFENSE'),
          storageName: 'Patient Defense',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_STEP_OF_THE_WIND_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_STEP_OF_THE_WIND'),
          storageName: 'Step of the Wind',
        });

        let unarmoredMovementFeet;
        if (v.monk_level >= 18) {
          unarmoredMovementFeet = 30;
        } else if (v.monk_level >= 14) {
          unarmoredMovementFeet = 25;
        } else if (v.monk_level >= 10) {
          unarmoredMovementFeet = 20;
        } else if (v.monk_level >= 6) {
          unarmoredMovementFeet = 15;
        } else {
          unarmoredMovementFeet = 10;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_UNARMORED_MOVEMENT_TEXT').replace('UNARMORED_MOVEMENT_FEET', unarmoredMovementFeet),
          name: getTranslationByKey('CLASS_FEATURE_UNARMORED_MOVEMENT'),
          storageName: 'Unarmored Movement',
        });
      }
      if (v.monk_level >= 3) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_DEFLECT_MISSILES_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DEFLECT_MISSILES'),
          storageName: 'Deflect Missiles',
        });
      }
      if (v.monk_level >= 4) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SLOW_FALL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SLOW_FALL'),
          storageName: 'Slow Fall',
        });
      }
      if (v.monk_level >= 5) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE'),
          saving_throw_ability: 'wisdom',
          saving_throw_failure: getTranslationByKey('CLASS_FEATURE_STUNNING_STRIKE_SAVING_THROW_FAILURE'),
          saving_throw_vs_ability: 'CONSTITUTION',
          storageName: 'Stunning Strike',
        });
      }
      if (v.monk_level >= 6) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_KI_EMPOWERED_STRIKES_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_KI_EMPOWERED_STRIKES'),
          storageName: 'Ki-Empowered Strikes',
        });
      }
      if (v.monk_level >= 7) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_EVASION_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_EVASION'),
          storageName: 'Evasion',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_STILLNESS_OF_MIND_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_STILLNESS_OF_MIND'),
          storageName: 'Stillness of Mind',
        });
      }
      if (v.monk_level >= 10) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PURITY_OF_BODY_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PURITY_OF_BODY'),
          storageName: 'Purity of Body',
        });
      }
      if (v.monk_level >= 13) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_TONGUE_OF_THE_SUN_AND_MOON_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_TONGUE_OF_THE_SUN_AND_MOON'),
          storageName: 'Tongue of the Sun and Moon',
        });
      }
      if (v.monk_level >= 14) {
        finalSetAttrs.death_saving_throw_prof = '@{pb}';
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_DIAMOND_SOUL_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DIAMOND_SOUL'),
          storageName: 'Diamond Soul',
        });
      }
      if (v.monk_level >= 15) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY_MONK_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_TIMELESS_BODY'),
          storageName: 'Timeless Body',
        });
      }
      if (v.monk_level >= 15) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_EMPTY_BODY_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_EMPTY_BODY'),
          storageName: 'Empty Body',
        });
      }
      if (v.monk_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PERFECT_SELF_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PERFECT_SELF'),
          storageName: 'Perfect Self',
        });
      }
    }
  }
  paladin(v) {
    if (v.paladin_level) {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_SENSE_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_DIVINE_SENSE'),
        recharge: 'Long Rest',
        storageName: 'Divine Sense',
        uses_max: Math.max(1 + v.charisma_mod, 1),
      });
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_LAY_ON_HANDS_TEXT'),
        heal_query_toggle: TOGGLE_VARS.heal_query,
        name: getTranslationByKey('CLASS_FEATURE_LAY_ON_HANDS'),
        recharge: 'Long Rest',
        storageName: 'Lay on Hands',
        uses_max: 5 * v.paladin_level,
      });

      if (v.paladin_level >= 2) {
        traits.set({
          freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_PALADIN_OPTIONS')}`,
          name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
          storageName: 'Fighting Style',
        });
        traits.set({
          damage: '(?{Spell Level|1|2|3|4+, 4} + 1)d8',
          damage_type: getTranslationByKey('RADIANT'),
          freeform: '{{subheader=(as ?{Spell Level|1|2|3|4+})}}',
          freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_SMITE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DIVINE_SMITE'),
          second_damage: 'd8',
          second_damage_type: getTranslationByKey('VS_FIEND_OR_UNDEAD'),
          storageName: 'Divine Smite',
          type: 'Other',
        });
      }
      if (v.paladin_level >= 3) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_DIVINE_HEALTH_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_DIVINE_HEALTH'),
          storageName: 'Divine Health',
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY_PALADIN_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_CHANNEL_DIVINITY'),
          recharge: 'Short Rest',
          storageName: 'Channel Divinity Paladin',
          uses_max: 1,
        });
      }
      if (v.paladin_level >= 6) {
        let auraRange;
        if (v.paladin_level >= 18) {
          auraRange = 30;
        } else {
          auraRange = 10;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_AURA_OF_PROTECTION_TEXT').replace('AURA_RANGE', auraRange),
          name: getTranslationByKey('CLASS_FEATURE_AURA_OF_PROTECTION'),
          storageName: 'Aura of Protection',
        });

        if (v.paladin_level >= 10) {
          traits.set({
            freetext: getTranslationByKey('CLASS_FEATURE_AURA_OF_COURAGE_TEXT').replace('AURA_RANGE', auraRange),
            name: getTranslationByKey('CLASS_FEATURE_AURA_OF_COURAGE'),
            storageName: 'Aura of Courage',
          });
        }
      }
      if (v.paladin_level >= 11) {
        traits.set({
          damage: '1d8',
          damage_type: 'radiant',
          freetext: getTranslationByKey('CLASS_FEATURE_IMPROVED_DIVINE_SMITE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_IMPROVED_DIVINE_SMITE'),
          storageName: 'Improved Divine Smite',
          type: 'Other',
        });
      }
      if (v.paladin_level >= 14) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_CLEANSING_TOUCH_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_CLEANSING_TOUCH'),
          recharge: 'Long Rest',
          storageName: 'Cleaning Touch',
          uses_max: Math.max(getIntValue(v.charisma_mod), 1),
        });
      }
    }
  }
  ranger(v) {
    if (v.ranger_level) {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_FAVORED_ENEMY_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_FAVORED_ENEMY'),
        storageName: 'Favored Enemy',
      });
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_NATURAL_EXPLORER_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_NATURAL_EXPLORER'),
        storageName: 'Natural Explorer',
      });
      if (v.ranger_level >= 2) {
        traits.set({
          freetext: `${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_TEXT')} ${getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE_RANGER_OPTIONS')}`,
          name: getTranslationByKey('CLASS_FEATURE_FIGHTING_STYLE'),
          storageName: 'Fighting Style',
        });
      }
      if (v.ranger_level >= 3) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PRIMEVAL_AWARENESS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PRIMEVAL_AWARENESS'),
          storageName: 'Primeval Awareness',
        });
      }
      if (v.ranger_level >= 8) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_LANDS_STRIDE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_LANDS_STRIDE'),
          storageName: 'Land\'s Stride',
        });
      }
      if (v.ranger_level >= 10) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_HIDE_IN_PLAIN_SIGHT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_HIDE_IN_PLAIN_SIGHT'),
          storageName: 'Hide in Plain Sight',
        });
      }
      if (v.ranger_level >= 14) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_VANISH_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_VANISH'),
          storageName: 'Vanish',
        });
      }
      if (v.ranger_level >= 18) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FERAL_SENSES_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FERAL_SENSES'),
          storageName: 'Feral Senses',
        });
      }
      if (v.ranger_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FOE_SLAYER_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FOE_SLAYER'),
          storageName: 'Foe Slayer',
        });
      }
    }
  }
  rogue(v) {
    if (v.rogue_level) {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_EXPERTISE_ROGUE_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_EXPERTISE'),
        storageName: 'Expertise Rogue',
      });
      traits.set({
        damage: `${Math.ceil(getIntValue(v.rogue_level) / 2)}d6`,
        freetext: getTranslationByKey('CLASS_FEATURE_SNEAK_ATTACK_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_SNEAK_ATTACK'),
        storageName: 'Sneak Attack',
      });
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_THIEVES_CANT_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_THIEVES_CANT'),
        storageName: 'Thieves\' Cant',
      });
      if (v.rogue_level >= 2) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_CUNNING_ACTION_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_CUNNING_ACTION'),
          storageName: 'Cunning Action',
        });
      }
      if (v.rogue_level >= 5) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_UNCANNY_DODGE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_UNCANNY_DODGE'),
          storageName: 'Uncanny Dodge',
        });
      }
      if (v.rogue_level >= 7) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_EVASION_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_EVASION'),
          storageName: 'Evasion',
        });
      }
      if (v.rogue_level >= 11) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_RELIABLE_TALENT_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_RELIABLE_TALENT'),
          storageName: 'Reliable Talent',
        });
      }
      if (v.rogue_level >= 14) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_BLINDSENSE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_BLINDSENSE'),
          storageName: 'Blindsense',
        });
      }
      if (v.rogue_level >= 15) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SLIPPERY_MIND_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SLIPPERY_MIND'),
          storageName: 'Slippery Mind',
        });
      }
      if (v.rogue_level >= 18) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_ELUSIVE_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_ELUSIVE'),
          storageName: 'Elusive',
        });
      }
      if (v.rogue_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_STROKE_OF_LUCK_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_STROKE_OF_LUCK'),
          recharge: 'Short Rest',
          storageName: 'Stroke of Luck',
          uses_max: 1,
        });
      }
    }
  }
  sorcerer(v) {
    if (v.sorcerer_level) {
      if (v.sorcerer_level >= 2) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SORCERY_POINTS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SORCERY_POINTS'),
          recharge: 'Long Rest',
          storageName: 'Sorcery Points',
          uses_max: v.sorcerer_level,
        });
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_FLEXIBLE_CASTING_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_FLEXIBLE_CASTING'),
          storageName: 'Flexible Casting',
        });
        if (v.sorcerer_level >= 3) {
          traits.set({
            freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_METAMAGIC'),
            storageName: 'Metamagic',
          });
        }
        if (v.sorcerer_level >= 20) {
          traits.set({
            freetext: getTranslationByKey('CLASS_FEATURE_SORCEROUS_RESTORATION_TEXT'),
            name: getTranslationByKey('CLASS_FEATURE_SORCEROUS_RESTORATION'),
            storageName: 'Sorcerous Restoration',
          });
        }
      }
    }
  }
  warlock(v) {
    if (v.warlock_level) {
      let warlockSpellSlots;
      if (v.warlock_level >= 17) {
        warlockSpellSlots = 4;
      } else if (v.warlock_level >= 11) {
        warlockSpellSlots = 3;
      } else if (v.warlock_level >= 2) {
        warlockSpellSlots = 2;
      } else {
        warlockSpellSlots = 1;
      }
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_WARLOCK_SPELL_SLOTS_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_WARLOCK_SPELL_SLOTS'),
        recharge: 'Short Rest',
        storageName: 'Warlock Spell Slots',
        uses_max: warlockSpellSlots,
      });

      if (v.warlock_level >= 2) {
        let eldritchInvocations;
        if (v.warlock_level >= 17) {
          eldritchInvocations = 8;
        } else if (v.warlock_level >= 15) {
          eldritchInvocations = 7;
        } else if (v.warlock_level >= 12) {
          eldritchInvocations = 6;
        } else if (v.warlock_level >= 9) {
          eldritchInvocations = 5;
        } else if (v.warlock_level >= 7) {
          eldritchInvocations = 4;
        } else if (v.warlock_level >= 5) {
          eldritchInvocations = 3;
        } else {
          eldritchInvocations = 2;
        }
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_ELDRITCH_INVOCATIONS_TEXT').replace('NUMBER_OF_INVOCATIONS_KNOWN', eldritchInvocations),
          name: getTranslationByKey('CLASS_FEATURE_ELDRITCH_INVOCATIONS'),
          storageName: 'Eldritch Invocations',
        });
      }
      if (v.warlock_level >= 3) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_PACT_BOON_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_PACT_BOON'),
          storageName: 'Pact Boon',
        });
      }
      if (v.warlock_level >= 11) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_MYSTIC_ARCANUM_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_MYSTIC_ARCANUM'),
          storageName: 'Mystic Arcanum',
        });
      }
      if (v.warlock_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_ELDRITCH_MASTER_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_ELDRITCH_MASTER'),
          recharge: 'Long Rest',
          storageName: 'Eldritch Master',
        });
      }
    }
  }
  wizard(v) {
    if (v.wizard_level) {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_ARCANE_RECOVERY_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_ARCANE_RECOVERY'),
        recharge: 'Long Rest',
        storageName: 'Arcane Recovery',
        uses_max: 1,
      });
      if (v.wizard_level >= 18) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SPELL_MASTERY_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SPELL_MASTERY'),
          storageName: 'Spell Mastery',
        });
      }
      if (v.wizard_level >= 20) {
        traits.set({
          freetext: getTranslationByKey('CLASS_FEATURE_SIGNATURE_SPELLS_TEXT'),
          name: getTranslationByKey('CLASS_FEATURE_SIGNATURE_SPELLS'),
          storageName: 'Signature Spells',
        });
      }
    }
  }
  metamagic(v) {
    if (v.careful_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_CAREFUL_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_CAREFUL_SPELL'),
        storageName: 'Careful Spell',
      });
    }
    if (v.distant_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_DISTANT_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_DISTANT_SPELL'),
        storageName: 'Distant Spell',
      });
    }
    if (v.empowered_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EMPOWERED_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EMPOWERED_SPELL'),
        storageName: 'Empowered Spell',
      });
    }
    if (v.extended_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EXTENDED_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_EXTENDED_SPELL'),
        storageName: 'Extended Spell',
      });
    }
    if (v.heightened_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_HEIGHTENED_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_HEIGHTENED_SPELL'),
        storageName: 'Heightened Spell',
      });
    }
    if (v.quickened_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_QUICKENED_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_QUICKENED_SPELL'),
        storageName: 'Quickened Spell',
      });
    }
    if (v.subtle_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_SUBTLE_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_SUBTLE_SPELL'),
        storageName: 'Subtle Spell',
      });
    }
    if (v.twinned_spell_toggle === '1') {
      traits.set({
        freetext: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TWINNED_SPELL_TEXT'),
        name: getTranslationByKey('CLASS_FEATURE_METAMAGIC_TWINNED_SPELL'),
        storageName: 'Twinned Spell',
      });
    }
  }

  set() {
    const collectionArray = ['ac_unarmored_ability', 'jack_of_all_trades_toggle', 'careful_spell_toggle', 'distant_spell_toggle', 'empowered_spell_toggle', 'extended_spell_toggle', 'heightened_spell_toggle', 'quickened_spell_toggle', 'subtle_spell_toggle', 'twinned_spell_toggle'];
    for (const ability of ABILITIES) {
      collectionArray.push(`${ability}_mod`);
    }
    for (const className of CLASSES) {
      collectionArray.push(`${className}_level`);
    }

    getSetItems('classFeatures.set', {
      collectionArray,
      callback: (v, finalSetAttrs) => {
        this.extraAttack(v);
        this.barbarian(v, finalSetAttrs);
        this.bard(v, finalSetAttrs);
        this.cleric(v);
        this.druid(v);
        this.fighter(v);
        this.monk(v, finalSetAttrs);
        this.paladin(v);
        this.ranger(v);
        this.rogue(v);
        this.sorcerer(v);
        this.warlock(v);
        this.wizard(v);
        this.metamagic(v);
      },
    });
  }
}
