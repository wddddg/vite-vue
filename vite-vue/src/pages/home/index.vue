<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px" style="overflow: hidden"
          ><Menu @routeInfo="getRouteInfo"></Menu
        ></el-aside>
        <el-container>
          <el-header>
            <Header></Header>
          </el-header>
          <el-main>
            <div style="padding: 0px 20px; height: 100%">
              <Breadcrumb :info="routeInfos"></Breadcrumb>
              <router-view></router-view>
              <div
                style="width: 100%; height: calc(100% - 26px)"
                v-show="router.currentRoute.value.path === '/'"
              >
                <div class="flexEchart">
                  <div
                    id="echartMianUserAndText"
                    style="width: 50%; height: 50%"
                  ></div>
                  <div
                    id="echartMianText"
                    style="width: 50%; height: 50%"
                  ></div>
                  <div
                    id="echartMianUser"
                    style="width: 50%; height: 50%"
                  ></div>
                  <div id="echartMianbar" style="width: 50%; height: 50%"></div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "../../components/Menu.vue";
import Header from "../../components/Header.vue";
import Breadcrumb from "../../components/Breadcrumb.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { queryAllLength } from "../../request/api";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
const router = useRouter();

let routeInfos = reactive({});

const getRouteInfo = (val: Object) => {
  Object.assign(routeInfos, val);
};

const textNumber = ref("");
const userNumber = ref("");
const isadminNumber = ref("");
const delTextNumber = ref("");

const eachartShow = async () => {
  await queryAllLength().then((res: any) => {
    textNumber.value = res.textNumber;
    userNumber.value = res.userNumber;
    isadminNumber.value = res.isadminNumber;
    delTextNumber.value = res.delTextNumber;
  });
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("echartMianText")!);
  // 绘制图表
  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      left: "left",
    },
    series: [
      {
        name: "文章统计",
        type: "pie",
        radius: "40%",
        data: [
          { value: textNumber.value, name: "文章数量" },
          { value: delTextNumber.value, name: "文章删除数量" },
        ],
        center: ["40%", "70%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  // 基于准备好的dom，初始化echarts实例
  let myChart1 = echarts.init(
    document.getElementById("echartMianUserAndText")!
  );
  // 绘制图表
  myChart1.setOption({
    tooltip: {
      trigger: "item",
    },
    color: ["#9a60b4", "#ea7ccc"],
    legend: {
      left: "left",
    },
    series: [
      {
        name: "文章和用户比例",
        type: "pie",
        radius: "40%",
        data: [
          { value: userNumber.value, name: "用户人数" },
          { value: textNumber.value, name: "文章数量" },
        ],
        center: ["40%", "70%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });
  // 基于准备好的dom，初始化echarts实例
  let myChart2 = echarts.init(document.getElementById("echartMianUser")!);
  // 绘制图表
  myChart2.setOption({
    tooltip: {
      trigger: "item",
    },
    color: ["#3ba272", "#fc8452"],
    legend: {
      left: "left",
    },
    series: [
      {
        name: "用户统计",
        type: "pie",
        radius: "40%",
        data: [
          { value: userNumber.value, name: "用户人数" },
          { value: isadminNumber.value, name: "管理员数量" },
        ],
        center: ["40%", "70%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  // 基于准备好的dom，初始化echarts实例
  let myChart3 = echarts.init(document.getElementById("echartMianbar")!);
  // 绘制图表
  myChart3.setOption({
    xAxis: {
      type: "category",
      data: ["文章数量", "用户数量", "管理员数量", "删除文章数量"],
    },
    yAxis: {
      type: "value",
    },
    grid: {
      x: 30,
      y: 20,
      x2: 200,
      y2: 20,
    },
    series: [
      {
        data: [
          textNumber.value,
          userNumber.value,
          isadminNumber.value,
          delTextNumber.value,
        ],
        barWidth: "40%",
        label: { show: true, position: "top" },
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  });
};

onMounted(() => {
  watch(
    () => router.currentRoute.value,
    (nv, ol) => {
      eachartShow();
    },
    {
      immediate: true,
    }
  );
});
</script>

<style lang="less">
.el-container {
  height: 100vh;
}
.common-layout {
  height: 100vh;
}
.el-header {
  padding: 0px !important;
  background: #fff;
  height: 74px !important;
}
.el-main {
  padding: 10px 40px;
  background: #f0f2f5;
}
.flexEchart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
}
</style>
