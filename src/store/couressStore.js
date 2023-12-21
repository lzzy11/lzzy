import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
const couressStore = defineStore('couress', () => {
    var couress = ref([])
    const getCouress = async() => {
        var storedObj = JSON.parse(localStorage.getItem("user"));
        var res = await axios({
            url: `/admin/course/getlist?DT=1&GClass=${storedObj.studentClass}`
        })
        couress.value = res.data.result

    }

    return {
        couress,
        getCouress
    }
}, {
    persist: {
        enabled: true,
    }

    // 如果需要，可以指定其他选项
})
export default couressStore