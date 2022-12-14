<script lang="ts">
	export let component: string;
</script>

<template>
	<div class="preview">
		<iframe src="/examples/{component}" frameborder="0" title="" />
	</div>
</template>

<style lang="scss">
	.preview {
		background: #222;
		border-radius: 4px;
		height: 300px;
		border: 2px dashed #333;
		iframe {
			width: 100%;
			height: 100%;
		}
	}
</style>
