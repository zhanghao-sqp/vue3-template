<template>
	<el-container class="main-container">
		<el-header>
			<Header></Header>
		</el-header>
		<el-container direction="horizontal">
			<el-aside width="30%">
				<Sider></Sider>
			</el-aside>
			<el-main>
				<Breadcrumb></Breadcrumb>
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
		<el-footer><Footer></Footer></el-footer>
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
