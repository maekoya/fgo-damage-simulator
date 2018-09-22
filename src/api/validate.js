import _ from 'lodash'

const Validate = {
  /**
   * Format damage resources to safety range
   *
   * @param  {Object} dmgResources that is binded to v-model
   * @return {Boolean} isVaild
   */
  resourcesToSafetyRange (dmgResources) {
    let isVaild = true

    _.forEach(dmgResources, (item) => {
      if (item.num >= 0) return true
      item.num = 0
      isVaild = false
    })
    return isVaild
  }
}

export default Validate
