<!-- ThemeToggle.vue -->
<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, defineOptions } from 'vue'

defineOptions({ name: 'ThemeToggle' })

// UI-only theme switch button. You wire up the logic.
// Props
interface Props {
  /** Current theme label you want to display (purely visual). */
  mode?: 'light' | 'dark' | 'system'
  /** Visual style of the button */
  variant?: 'icon' | 'icon-label'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Disable interactions visually */
  disabled?: boolean
  /** Optional aria-label override */
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dark',
  variant: 'icon',
  size: 'md',
  disabled: false,
  ariaLabel: 'Toggle theme'
})

// Emits a simple click so parent can handle switching
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

function onClick(ev: MouseEvent) {
  if (props.disabled) return
  emit('click', ev)
}
</script>

<template>
  <button
      class="theme-toggle"
      :class="[
      `variant-${props.variant}`,
      `size-${props.size}`,
      { disabled: props.disabled }
    ]"
      type="button"
      :aria-label="props.ariaLabel"
      :title="props.ariaLabel"
      :disabled="props.disabled"
      @click="onClick"
  >
    <!-- Icon wrapper -->
    <span class="icon" aria-hidden="true">
      <!-- Sun icon (shown when mode is light) -->
      <svg v-show="props.mode === 'light'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9.83-18.16l-1.79-1.79-1.8 1.79 1.8 1.79 1.79-1.79zM20 13h3v-2h-3v2zM12 7a5 5 0 100 10 5 5 0 000-10zm7.24 12.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM4.84 17.24l-1.8 1.79 1.8 1.79 1.79-1.79-1.79-1.79zM12 1h2v3h-2V1z"/>
      </svg>

      <!-- Moon icon (shown when mode is dark) -->
      <svg v-show="props.mode === 'dark'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12.76 3c-1.1 0-2.16.21-3.13.59A9 9 0 1021 14.37 8.99 8.99 0 0112.76 3z"/>
      </svg>

      <!-- System icon (default) -->
      <svg v-show="props.mode === 'system'" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M3 4h18v12H3z"/>
        <path d="M2 18h20v2H2z"/>
      </svg>
    </span>

    <span v-if="props.variant === 'icon-label'" class="label">
      <span v-if="props.mode === 'light'">Light</span>
      <span v-else-if="props.mode === 'dark'">Dark</span>
      <span v-else>System</span>
    </span>
  </button>
</template>

<style scoped>


.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: var(--bs-tertiary-bg);
  color: var(--bs-body-color);
  border-radius: 999px;
  cursor: pointer;
  transition: background 160ms ease, box-shadow 160ms ease, transform 80ms ease;
  user-select: none;
}
.theme-toggle:hover { background: var(--tt-bg-hover); }
.theme-toggle:active { background: var(--tt-bg-active); transform: translateY(1px); }
.theme-toggle:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--tt-ring); }
.theme-toggle.disabled { opacity: 0.6; cursor: not-allowed; }

/* Sizes */
.size-sm { padding: 0.25rem 0.5rem; font-size: 0.85rem; }
.size-md { padding: 0.5rem 0.75rem; font-size: 0.95rem; }
.size-lg { padding: 0.75rem 1rem; font-size: 1rem; }

.icon { line-height: 0; display: inline-flex; }
.label { font-weight: 600; letter-spacing: 0.2px; }

/* Variant adjustments */
.variant-icon { padding: 0.5rem; }
.variant-icon.size-sm { padding: 0.375rem; }
.variant-icon.size-lg { padding: 0.75rem; }
</style>
