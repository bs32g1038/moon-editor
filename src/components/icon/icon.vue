<template>
    <div class="icon" :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: {},
        size: {
            default: 'normal',
        },
        modifier: {
            default: null,
        },
        fixAlign: {
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin: 0 0.3rem;
    top: -0.05rem;
    fill: currentColor;

    > svg {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        padding: 5px;
    }

    &:first-child {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }
}

// svg sprite
body > svg,
.icon use > svg,
symbol {
    path,
    rect,
    circle,
    g {
        fill: currentColor;
        stroke: none;
    }

    *[d='M0 0h24v24H0z'] {
        display: none;
    }
}
</style>
