import _ from 'lodash'
import { Decimal } from 'decimal.js'
import Settings from '@/api/settings'

const Calculate = {
  /**
   * Caluclate damages from resources
   *
   * @param  {Object} dmgResources
   * @return {Object} damages
   */
  damages (dmgResources) {
    const r = this.formatDmgResources(dmgResources)
    const category = {}
    const damages = {
      basic: 0,
      min: 0,
      max: 0
    }

    // calclate A
    category.a = new Decimal(1)
      .times(r.atk)
      .times(r.npDmgRate)
      .times(r.cardTypeAbility)
      .times(r.classAbility)
      .times(r.classChemistry)
      .times(r.servantChemistry)
      .times(Settings.dmgBaseRate)
      .times(
        Decimal.min(5, Decimal.max(0.001, 1 + r.cardTypeBuff + r.enemyCardTypeDefDebuff)))

    // calclate B
    category.b = new Decimal(1)
      .times(1 + r.atkBuff + r.enemyDefDebuff)

    // calclate C
    category.c = new Decimal(1)
      .plus(Decimal.min(5, r.spAtkBuff))
      .plus(Decimal.min(5, r.spDefDebuff))
      .plus(Decimal.min(5, r.spNpDmgBuff))

    // calclate D
    category.d = new Decimal(1)
      .times(r.spNpDmgRate)

    // calclate E
    category.e = new Decimal(0)
      .plus(r.staticDmgBuff)
      .plus(r.enemyStaticDmgDebuff)

    // calclate basic damage without E
    damages.basic = category.a
      .times(category.b)
      .times(Decimal.max(0.001, category.c))
      .times(category.d)
      .ceil()
    damages.basic = Decimal.max(0, damages.basic)

    /**
     * calclate each damage
     */
    damages.min = damages.basic
      .times(Settings.dmgMinRange)
      .plus(category.e)
      .ceil()
      .toNumber()

    damages.max = damages.basic
      .times(Settings.dmgMaxRange)
      .plus(category.e)
      .ceil()
      .toNumber()

    damages.basic = damages.basic
      .plus(category.e)
      .ceil()
      .toNumber()

    return damages
  },

  /**
   * Format damage resources to each type
   *
   * @param  {Object} dmgResources
   * @return {Object} dmgRates
   */
  formatDmgResources (dmgResources) {
    const dmgRates = {}
    const format = {
      basic (num) {
        return num
      },
      rate (num) {
        let result = num || 100
        result /= 100
        return result
      },
      sumRate (num) {
        let result = (num <= 0) ? 100 : num + 100
        result /= 100
        result -= 1.0
        return result
      }
    }

    _.forEach(dmgResources, (item, key) => {
      if (!item.numType) item.numType = 'basic'
      dmgRates[key] = format[item.format](item.num)
    })

    return dmgRates
  }
}

export default Calculate
