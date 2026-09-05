<script setup lang="ts">
import '@style/override.css'
import '@misc/interface'
import { io,Socket } from 'socket.io-client'
import {onMounted, ref} from "vue"
import type {admin_in_post_tag, admin_out_post_update} from "@misc/interface.ts"

let socket: Socket

function popup(suc:boolean, info:string){
    window.alert(info+(suc?'成功':'失败'))
}

let cstags = ref<string[]>()
let misctags = ref<string[]>()

function setOption(type:'cs'|'misc') {
    const select = document.getElementById('select') as HTMLSelectElement
    select.options.length = 0
    const option = document.createElement('option')
    option.value = '自定义'
    option.textContent = '自定义'
    select?.appendChild(option)
    if (type === 'cs') {
        for (let item in cstags.value) {
            const option = document.createElement('option')
            option.value = item
            option.textContent = item
            select?.appendChild(option)
        }
    } else {
        for (let item in misctags.value) {
            const option = document.createElement('option')
            option.value = item
            option.textContent = item
            select?.appendChild(option)
        }
    }
}

function type_change(){
    const msic = document.getElementById('misc') as HTMLInputElement | null
    if(msic?.checked){
        setOption('misc')
    } else {
        setOption('cs')
    }
}

onMounted(()=> {
    setOption('cs')

    socket = io('https://api.xksyu.cn/blogadmiao')

    socket.on('S_tag',(tags:admin_in_post_tag) => {
        cstags.value=tags.cs
        misctags.value=tags.misc
    })
    socket.on('S_auth',(suc:boolean) => {
        popup(suc,'认证')
    })
    socket.on('S_post',(suc:boolean) => {
        popup(suc,'文章提交')
    })
    socket.on('S_esa_ip',(suc:boolean) => {
        popup(suc,'回源更新')
    })
    socket.on('S_esa_cache',(suc:boolean) => {
        popup(suc,'ESA缓存刷新')
    })
})

function auth(){
    const pwd = document.getElementById('pwd') as HTMLInputElement | null
    socket.emit('C_auth', pwd?.value ?? '')
}
function toolkit(action: 'C_esa_ip'|'C_esa_cache'){
    socket.emit(action)
}
function post(){
    const msic = document.getElementById('misc') as HTMLInputElement | null
    let type: 'cs'|'misc' = 'cs'
    if(msic?.checked){
        type = 'misc'
    }

    const titleInput = document.getElementById('title') as HTMLInputElement | null
    const absInput = document.getElementById('abs') as HTMLTextAreaElement | null
    const title = titleInput?.value.trim() ?? ''
    const abs = absInput?.value ?? ''
    if(title === '' || abs === ''){
        window.alert('请补全信息再提交')
        return
    }

    const select = document.getElementById('select') as HTMLInputElement | null
    const diy = document.getElementById('diy_tag') as HTMLInputElement | null
    let tag = '默认'
    if(select?.value === '自定义'){
        if(diy?.value === ''){
            window.alert('请补全信息再提交')
            return
        }
        tag = diy?.value ?? '默认'
    } else {
        tag = select?.value ?? '默认'
    }

    let postinfo:admin_out_post_update = {
        title,
        abs,
        type,
        tag
    }
    socket.emit('C_post',postinfo)
}

</script>

<template>
    <div class="main-layout no-select">
        <div class="sub-layout">
            <div class="lineA">
                <div class="title-home"
                     @click="$router.back()">
                    <i class="bi bi-arrow-left-circle size-title"></i>
                </div>
                <div class="auth-layout">
                    <input type="password" id="pwd"/>
                    <div class="auth-button" @click="auth()">认证</div>
                </div>
                <div class="tool-layout">
                    <div class="size-title">Toolkit</div>
                    <div class="button" @click="toolkit('C_esa_ip')">回源IP更新</div>
                    <div class="button" @click="toolkit('C_esa_cache')">刷新ESA缓存</div>
                </div>
            </div>
            <div class="lineB">
                <div class="size-subheader">
                    Article
                </div>
                <input type="file" class="file-input"/>
                <div class="info-line-layout">
                    <div>标题</div>
                    <input type="text" class="info-input title-input" id="title"/>
                    <div>标签</div>
                    <select id="select">
                    </select>
                    <input type="text" class="info-input" id="diy_tag"/>
                </div>
                <div class="info-line-layout">
                    <div>计算机</div>
                    <input type="radio" name="tag" id="cs" @change="type_change()"/>
                    <div>杂文</div>
                    <input type="radio" name="tag" id="misc" @change="type_change()"/>
                </div>
                <div class="info-line-layout">
                    <div>摘要</div>
                    <textarea rows="10" class="abs-input" id="abs"/>
                </div>
                <div class="button submit-bt" @click="post()">提交</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-layout{
    padding: 20px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sub-layout{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85vw;
    gap: 20px;
}

.lineA{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.title-home{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background-color: lavenderblush;
    padding: 20px;
    width: auto;
    height: auto;
}

.auth-layout{
    border-radius: 20px;
    background-color: peachpuff;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;
    width: 20%;
}

.tool-layout{
    border-radius: 20px;
    background-color: azure;
    padding: 20px;
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    flex: 1;
}

.auth-button{
    background-color: ghostwhite;
    padding: 10px 30px;
    border-radius: 35px;
}

.button{
    background-color: lavender;
    padding: 10px 30px;
    border-radius: 35px;
}

.lineB{
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 20px;
    flex-direction: column;
    flex: 1;
    padding: 50px 20%;
}

.info-line-layout{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.title-input{
    width: 350px !important;
}

.info-input{
    width: auto;
}

.submit-bt{
    align-self: end;
}

.abs-input{
    width: 40vw;
}

</style>