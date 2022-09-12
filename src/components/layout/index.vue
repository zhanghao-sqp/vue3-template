<template>
	<el-container class="main-container">
		<el-header>
			<LayoutComponentsHeader></LayoutComponentsHeader>
		</el-header>
		<el-container direction="horizontal">
			<el-aside width="30%">
				<LayoutComponentsSider></LayoutComponentsSider>
			</el-aside>
			<el-main>
				<LayoutComponentsBreadcrumb></LayoutComponentsBreadcrumb>
				<RouterView v-slot="{ Component }">
					<template v-if="Component">
						<!-- <Transition mode="out-in"> -->
							<KeepAlive>
								<Suspense>
									<component :is="Component"></component>
									<!-- 加载中状态 -->
									<template #fallback>正在加载...</template>
								</Suspense>
							</KeepAlive>
						<!-- </Transition> -->
					</template>
				</RouterView>
			</el-main>
		</el-container>
		<el-footer>
			<LayoutComponentsFooter></LayoutComponentsFooter>
		</el-footer>
	</el-container>
</template>

<script setup lang="ts">
import {} from 'vue'
</script>

<style scoped lang="scss">
.main-container {
	min-height: 100vh;
}
</style>
