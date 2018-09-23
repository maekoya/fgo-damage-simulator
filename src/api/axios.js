import axios from 'axios'

const axiosClient = {
  /**
   * get API
   *
   * @param  {String} url
   * @return {Promise Object} res
   */
  async get (url) {
    const res = await axios.get(url)
      .catch(error => { console.log(error) })
    return res
  }
}

export default axiosClient
