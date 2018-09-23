<template>

  <section class="section">
    <div class="container">

      <div class="field is-grouped">
        <div class="control">
          <div class="select is-rounded">
            <select v-model="sortServantsKeys.class">
              <option value="saber">剣</option>
              <option value="archer">弓</option>
              <option value="lancer">槍</option>
              <option value="rider">騎</option>
              <option value="caster">術</option>
              <option value="assassin">殺</option>
              <option value="berserker">狂</option>
              <option value="ruler">裁</option>
              <option value="avenger">讐</option>
              <option value="moonCancer">月</option>
              <option value="alterEgo">分</option>
              <option value="shielder">盾</option>
              <option value="foreigner">降</option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select is-rounded">
            <select v-model.number="sortServantsKeys.rarity">
              <option value="5">☆5</option>
              <option value="4">☆4</option>
              <option value="3">☆3</option>
              <option value="2">☆2</option>
              <option value="1">☆1</option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select is-rounded">
            <select v-model="servant">
              <option value="" selected>サーヴァントを選択</option>
              <option v-for="servant in servants" :value="servant.key" :key="servant.key">{{ servant.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <table class="table is-fullwidth">
            <tr>
              <th>
                <span class="tag is-danger">A</span>ATK
              </th>
              <td>
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input type="number" class="input" v-model.number="resources.atk.num">
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-danger">A</span>宝具倍率</th>
              <td>
                <div class="field is-expanded">
                  <div class="field has-addons is-marginless">
                    <div class="control is-expanded">
                      <input type="number" class="input" step="50" v-model.number="resources.npDmgRate.num">
                    </div>
                    <div class="control"><a class="button is-static">%</a></div>
                    <div class="control"><a class="button" @click="resetValue('npDmgRate')">R</a></div>
                  </div>
                  <p class="help">※初期値100</p>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-danger">A2</span>コマンドカードバフ
                <span class="icon has-text-dark" v-tooltip.top="'Buster性能20%アップ、クラススキル騎乗など'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field has-addons">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" min="0" v-model.number="resources.cardTypeBuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('cardTypeBuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-danger">A2</span>コマンドカード耐性デバフ</th>
              <td>
                <div class="field has-addons is-marginless">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" v-model.number="resources.enemyCardTypeDefDebuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('enemyCardTypeDefDebuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-success">B</span>攻撃力バフ
                <span class="icon has-text-dark" v-tooltip.top="'攻撃力20%アップなど'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field has-addons is-marginless">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" v-model.number="resources.atkBuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('atkBuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-success">B</span>敵防御力デバフ</th>
              <td>
                <div class="field has-addons is-marginless">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" v-model.number="resources.enemyDefDebuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('enemyDefDebuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-warning">C</span>特攻威力バフ
                <span class="icon has-text-dark" v-tooltip.top="'特性一致時。イベント礼装の威力アップもここ'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field has-addons is-marginless">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" v-model.number="resources.spAtkBuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('spAtkBuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-warning">C</span>敵特防デバフ</th>
              <td>
                <div class="field has-addons is-marginless">
                  <div class="control is-expanded">
                    <input type="number" class="input" step="10" v-model.number="resources.spDefDebuff.num">
                  </div>
                  <div class="control"><a class="button is-static">%</a></div>
                  <div class="control"><a class="button" @click="resetValue('spDefDebuff')">R</a></div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-warning">C</span>宝具威力バフ
                <span class="icon has-text-dark" v-tooltip.top="'宝具威力20%アップなど'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field is-expanded">
                  <div class="field has-addons is-marginless">
                    <div class="control is-expanded">
                      <input type="number" class="input" step="10" v-model.number="resources.spNpDmgBuff.num">
                    </div>
                    <div class="control"><a class="button is-static">%</a></div>
                    <div class="control"><a class="button" @click="resetValue('spNpDmgBuff')">R</a></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-info">D</span>宝具特攻倍率
                <span class="icon has-text-dark" v-tooltip.top="'ギル（弓）、北斎（降）の宝具など'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field is-expanded">
                  <div class="field has-addons is-marginless">
                    <div class="control is-expanded">
                      <input type="number" class="input" step="10" v-model.number="resources.spNpDmgRate.num">
                    </div>
                    <div class="control"><a class="button is-static">%</a></div>
                    <div class="control"><a class="button" @click="resetValue('spNpDmgRate')">R</a></div>
                  </div>
                  <p class="help">※初期値100</p>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-dark">E</span>固定ダメージバフ
                <span class="icon has-text-dark" v-tooltip.top="'月霊髄液、クラススキル神性など'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <div class="control"><a class="button is-static">+</a></div>
                    <div class="control is-expanded">
                      <input type="number" class="input" step="100" min="0" v-model.number="resources.staticDmgBuff.num">
                    </div>
                    <div class="control"><a class="button" @click="resetValue('staticDmgBuff')">R</a></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-dark">E</span>敵固定ダメージデバフ
                <span class="icon has-text-dark" v-tooltip.top="'ランスロット（剣）の宝具など'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <div class="control"><a class="button is-static">-</a></div>
                    <div class="control is-expanded">
                      <input type="number" class="input" step="100" min="0" v-model.number="resources.enemyStaticDmgDebuff.num">
                    </div>
                    <div class="control"><a class="button" @click="resetValue('enemyStaticDmgDebuff')">R</a></div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div class="column">
          <table class="table is-fullwidth">
            <tr>
              <th><span class="tag is-danger">A</span>Class補正</th>
              <td>
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-rounded">
                      <select v-model.number="resources.classAbility.num">
                        <option value="1">剣・騎・盾・分・月・降</option>
                        <option value="0.95">弓</option>
                        <option value="1.05">槍</option>
                        <option value="0.9">術・殺</option>
                        <option value="1.1">狂・裁・讐</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-danger">A</span>Class相性補正</th>
              <td>
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-rounded">
                      <select v-model.number="resources.classChemistry.num">
                        <option value="1">等倍</option>
                        <option value="2">有利</option>
                        <option value="0.5">不利</option>
                        <option value="1.5">狂・分 有利</option>
                        <option value="1.2">月・分 → 獣Ⅲ</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>
                <span class="tag is-danger">A</span>Servant相性補正
                <span class="icon has-text-dark" v-tooltip.top="'天、地、人の3属性相性'">
                  <i class="fas fa-info-circle"></i>
                </span>
              </th>
              <td>
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-rounded">
                      <select v-model.number="resources.servantChemistry.num">
                        <option value="1">等倍</option>
                        <option value="1.1">有利</option>
                        <option value="0.9">不利</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th><span class="tag is-danger">A</span>コマンドカード種類</th>
              <td>
                <div class="field">
                  <div class="control is-expanded">
                    <div class="select is-rounded">
                      <select v-model.number="resources.cardTypeAbility.num">
                        <option value="1.5">Buster</option>
                        <option value="1">Arts</option>
                        <option value="0.8">Quick</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>

          <div class="content">
            <div class="buttons">
              <button class="button" @click="resetResources">Reset All</button>
            </div>
          </div>

          <div class="notification">
            <h3 class="title is-5">Results</h3>
            <div class="columns has-text-centered">
              <div class="column">
                <p>Avarage</p>
                <p><strong class="is-size-5"><Countup :number="damages.basic" /></strong></p>
              </div>
              <div class="column">
                <p>Min.</p>
                <p><strong class="is-size-5"><Countup :number="damages.min" /></strong></p>
              </div>
              <div class="column">
                <p>Max</p>
                <p><strong class="is-size-5"><Countup :number="damages.max" /></strong></p>
              </div>
            </div>
          </div>

          <div class="notification">
            <div class="content is-size-7">
              <h3 class="title is-5">Notes</h3>
              <p class="has-text-centered">Damage = （<span class="tag is-danger">A</span> * 乱数補正 [0.9 - 1.1] * 攻撃補正 [0.23]） * <span class="tag is-danger">A2</span> * <span class="tag is-success">B</span> * <span class="tag is-warning">C</span> * <span class="tag is-info">D</span> + <span class="tag is-dark">E</span></p>
              <ul>
                <li>本当はもう少し計算式が複雑ですが、同一カテゴリは加算傾向、異なるカテゴリは乗算傾向にあります。よって、複数カテゴリのバフが多いほど高ダメージが期待できます。
                  <ul>
                    <li>例えば、マスター礼装は、パーティーのスキル構成と異なるカテゴリバフがあるものを選択すると、高ダメージへと繋がります。</li>
                  </ul>
                </li>
                <li>計算式は、次のwikiを参考にしています。via. <a href="https://www9.atwiki.jp/f_go/pages/304.html" target="_blank" rel="nofollow">Fate/Grand Order @wiki 【FGO】</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import Settings from '@/api/settings'
import axios from '@/api/axios'
import Calc from '@/api/calculate'
import Validate from '@/api/validate'
import { npResourcesSchema } from '@/api/data/schema'
import Countup from '@/components/Countup'

export default {
  name: 'NoblePhantasm',
  data () {
    return {
      isValid: true,
      damages: {
        basic: 0,
        min: 0,
        max: 0
      },
      resources: _.cloneDeep(npResourcesSchema),
      sortServantsKeys: {
        class: 'saber',
        rarity: 5
      },
      servant: '',
      ServantsData: []
    }
  },
  mounted () {
    this.fetchServants()
  },
  watch: {
    resources: {
      handler: function () {
        this.validateResources()
        this.caluclateDamages()
      },
      immediate: true,
      deep: true
    },
    servant () {
      this.setServantData()
    }
  },
  computed: {
    servants () {
      let servants = _.filter(this.ServantsData, servant => {
        if (servant.class !== this.sortServantsKeys.class) return false
        if (servant.rarity !== this.sortServantsKeys.rarity) return false
        return true
      })
      return servants
    }
  },
  methods: {
    async fetchServants () {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbw0av1BWExdrtR8fehzo-3P_CQ5V-SF9v6f_UGwurkawE90zA/exec')
      this.ServantsData = response.data
    },
    setServantData () {
      const r = this.resources
      const data = _.find(this.ServantsData, item => item.key === this.servant)
      if (!data) return false

      r.atk.num = data.atk
      r.npDmgRate.num = data.npDmgRate
      r.cardTypeAbility.num = Settings.cardTypeRates[data.npCardType]
      r.classAbility.num = Settings.classAbilityRates[data.class]
    },
    validateResources () {
      this.isValid = Validate.resourcesToSafetyRange(this.resources)
    },
    caluclateDamages () {
      if (!this.isValid) return false
      this.damages = Calc.damages(this.resources)
    },
    resetResources () {
      this.resources = _.cloneDeep(npResourcesSchema)
      this.servant = ''
    },
    resetValue (key) {
      if (!npResourcesSchema.hasOwnProperty(key)) return false
      this.resources[key].num = _.cloneDeep(npResourcesSchema[key].num)
    }
  },
  components: {
    Countup
  }
}
</script>

<style lang="scss">
.table {
  th {
    padding-left: 0;
  }
  td {
    padding-right: 0;
  }
  .tag {
    margin-right: 5px;
  }
}
.tooltip-custom {
  font-size: 13px;
}
.tags {
  .tag {
    font-size: 11px;
  }
}
</style>
