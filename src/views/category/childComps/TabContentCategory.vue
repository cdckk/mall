<template>
    <div>
        <goods-list :goods="TabContentCategory"/>
    </div>
</template>

<script>
import GoodsList from '../../../components/content/goods/GoodsList.vue'
	export default {
		name: "TabContentCategory",
    components: {
        GoodsList
    },
    props: {
      TabContentCategory: {
          type: Array,
          default() {
              return []
          }
      }
    }
	}
</script>

<style scoped>
</style>
