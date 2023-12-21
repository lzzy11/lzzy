import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    //启动代理服务器
    server: {
        host: '0.0.0.0',
        open: true, //启动项目自动弹出浏览器
        port: 4000, //启动端口
        proxy: {
            '/admin': {
                target: 'http://localhost:3000', //实际请求地址
                changeOrigin: true,
            },
            '/socket.io': {
                target: 'http://localhost:3000', // target host
                changeOrigin: true, // needed for virtual hosted sites
                logLevel: 'debug'
            },
        }
    }

})