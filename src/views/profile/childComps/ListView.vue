<template>
    <div id="list-view">
        <div class="list-item"><slot name="top"></slot></div>
        <div class="list-item"><slot name="center"></slot></div>
        <div class="list-item"><slot name="bottom"></slot></div>
    </div>
</template>

<script>

export default {
  components: { 
    },
        name: 'ListView'
    }
</script>

<style scoped>
    #list-view {
        margin-top: 10px;
        background-color: #f2f2f2;
    }
    .list-item {
        height: 44px;
        line-height: 44px;
        text-align: left;
        margin-top: 1px;
        background-color: #fff;
    }
</style>