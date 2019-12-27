<template>
    <transition name="fade">
        <div class="Modal-wrapper undefined Modal-enter-done">
            <div class="Modal-backdrop"></div>
            <div class="Modal Modal--default" tabindex="0">
                <div class="Modal-inner">
                    <h3 class="Modal-title">{{ title }}</h3>
                    <div class="Modal-content">
                        <slot></slot>
                    </div>
                </div>
                <button
                    aria-label="关闭"
                    type="button"
                    class="Button Modal-closeButton Button--plain"
                    @click="cancel"
                >
                    <svg
                        class="Zi Zi--Close Modal-closeIcon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path
                            d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: String
    },
    methods: {
        cancel() {
            this.$emit("cancel", false);
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0;
}
.Modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1003;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: opacity 0.3s ease-out;
    font-size: 14px;
    text-align: left;
}

.Modal {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 300px;
    max-height: calc(100vh - 48px);
    box-shadow: 0 5px 20px rgba(26, 26, 26, 0.1);
    box-sizing: border-box;
    transition: max-height 0.8s ease;
    margin: 0 auto;
}

.Modal-inner {
    overflow: auto;
    background: #fff;
    border-radius: 2px;
}

.Modal-title {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    margin-left: 15px;
}

.Modal-content {
    flex: 1 1;
    padding: 0 15px 15px;
    margin-top: 24px;
    line-height: 1.7;
    opacity: 1;
}

.Modal-closeButton {
    position: absolute;
    top: 8px;
    right: -60px;
    padding: 12px;
    height: auto;
    padding: 0;
    line-height: inherit;
    background-color: transparent;
    border: none;
    border-radius: 0;
}

.Modal-backdrop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(120, 120, 120, 0.65);
    -webkit-transition: background-color 0.3s ease-out;
    transition: background-color 0.3s ease-out;
}

.Modal-closeButton {
    position: absolute;
    top: 2px;
    right: 1px;
    padding: 12px;
}
</style>