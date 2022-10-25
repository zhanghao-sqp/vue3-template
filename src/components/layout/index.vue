<template>
	<el-container class="main-container">
		<el-header>
			<LayoutComponentsHeader />
		</el-header>
		<el-container direction="horizontal">
			<el-aside>
				<LayoutComponentsSider />
			</el-aside>
			<el-main>
				<LayoutComponentsBreadcrumb />
				<RouterView v-slot="{ Component }">
					<template v-if="Component">
						<!-- <Transition mode="out-in"> -->
							<!-- <KeepAlive :include="keepAliveList"> -->
							<KeepAlive :max="max">
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
			<LayoutComponentsFooter />
		</el-footer>
	</el-container>
</template>

<script setup lang="ts">
import { useRouteStore } from '@/store'
import { storeToRefs } from 'pinia'

const routeStore = useRouteStore()
const { keepAliveList, max } = storeToRefs(routeStore)
</script>

<style scoped lang="scss">
.main-container {
	min-height: 100vh;
 .el-header, .el-footer {
		padding: 0;
		width: 100%;
		height: 100%;
		background-color: $main-color;
	}
	.el-header {
		@extend %flex-center;
	}
	.el-aside {
		width: 30%;
		max-width: 15rem;
		min-width: 1.5rem;
	}
}
</style>
