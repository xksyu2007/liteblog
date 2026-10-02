<script setup lang="ts">
import '@style/override.css'
import '@misc/interface'
import { onMounted, ref } from "vue"
import type {admin_res, article} from "@misc/interface.ts"

let cstags = ref<string[]>([])
let misctags = ref<string[]>([])

function setOption(type:'cs'|'misc') {
    const select = document.getElementById('select') as HTMLSelectElement
    select.options.length = 0
    const option = document.createElement('option')
    option.value = '自定义'
    option.textContent = '自定义'
    select?.appendChild(option)
    if (type === 'cs') {
        for (let item of cstags.value) {
            const option = document.createElement('option')
            option.value = item
            option.textContent = item
            select?.appendChild(option)
        }
    } else {
        for (let item of misctags.value) {
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

const whole = ref<article>()
onMounted(async ()=> {
    const response1 = await fetch('/config/article.json')
    whole.value = await response1.json()
    console.log(whole.value?.cs.tag)
    cstags.value = whole.value?.cs.tag ?? []
    console.log(cstags.value)
    misctags.value = whole.value?.misc.tag ?? []
    setOption('cs')
})

async function auth() {
    const pwd = document.getElementById('pwd')?.textContent ?? ''
    const res = await fetch('http://api.xksyu.cn/admiao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pwd }),
        credentials: 'include'
    });
    const data: admin_res = await res.json();
    window.alert(data.message);
}

async function esa_ip_flush() {
    const res = await fetch('http://api.xksyu.cn/admiao/esa_ip_flush', {
        method: 'POST',
        credentials: 'include'
    });
    const data: admin_res = await res.json();
    window.alert(data.message);
}

async function esa_cache_flush() {
    const res = await fetch('http://api.xksyu.cn/admiao/esa_cache_flush', {
        method: 'POST',
        credentials: 'include'
    });
    const data: admin_res = await res.json();
    console.log(data.message);
}

async function post(){
    const msic = document.getElementById('misc') as HTMLInputElement | null
    let part: 'cs'|'misc' = 'cs'
    if(msic?.checked){
        part = 'misc'
    }

    const titleInput = document.getElementById('title') as HTMLInputElement | null
    const absInput = document.getElementById('abs') as HTMLTextAreaElement | null
    const title = titleInput?.value.trim() ?? ''
    const abstract = absInput?.value ?? ''
    if(title === '' || abstract === ''){
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

    const res = await fetch('http://api.xksyu.cn/admiao/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, abstract, part, tag }),
        credentials: 'include'
    });
    const data: admin_res = await res.json();
    console.log(data.message);
}

</script>

<template>
    <div class="main-layout tk-noselect">
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
                    <div class="button" @click="esa_ip_flush()">回源IP更新</div>
                    <div class="button" @click="esa_cache_flush()">刷新ESA缓存</div>
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