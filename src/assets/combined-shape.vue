<template>
	<svg :viewBox="`0 0 ${vw} 12`"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1 0h13a1 1 0 1 1 0 2H1a1 1 0 0 1 0-2zm0 5h13a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 5h13a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"
			fill="#A6B7D4"
			fill-rule="evenodd" />
	</svg>
</template> 

<script setup lang="ts">
defineProps({
	vw: {
		type: Number,
		default: 15,
	}
})
</script>

 