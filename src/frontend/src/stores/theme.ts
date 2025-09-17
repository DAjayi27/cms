// src/stores/theme.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

function applyTheme(mode: Theme) {
    const el = document.documentElement
    debugger;
    if (mode === 'system') {
        const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
        el.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light')
    } else {
        el.setAttribute('data-bs-theme', mode)
    }
}

export const useThemeStore = defineStore('theme', () => {
    const mode = ref<Theme>((localStorage.getItem('theme') as Theme) || 'system')

    function setTheme(m: Theme) {
        mode.value = m
        localStorage.setItem('theme', m)
        applyTheme(m)
    }

    function cycle() {
        setTheme(mode.value === 'light' ? 'dark' : mode.value === 'dark' ? 'system' : 'light')
    }

    // init + respond to system changes when in "system"
    function init() {
        applyTheme(mode.value)
        matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (mode.value === 'system') applyTheme('system')
        })
    }

    return { mode, setTheme, cycle, init }
})
