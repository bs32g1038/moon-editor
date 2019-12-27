<template>
    <Icon name="hr">
        <svg viewBox="0 0 24 24">
            <path
                d="M4 7c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1zm0 5a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2H5.01C4.451 13 4 12.556 4 12zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zm6 0a1 1 0 0 1 1.01-1h1.98a1 1 0 1 1 0 2h-1.98c-.558 0-1.01-.444-1.01-1zM4 17c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H5c-.552 0-1-.444-1-1z"
                fill-rule="evenodd"
            ></path>
        </svg>
    </Icon>
</template>

<script>
import Icon from "./icon";
export default {
    components: {
        Icon
    }
};
</script>

<style lang="scss" scoped>
.icon--hr {
    svg {
        padding: 0;
    }
}
</style>