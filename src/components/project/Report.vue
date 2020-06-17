<template>
    <v-row>
        <v-col cols="6">
            <h1>aaa</h1>
            <div id="myChart" style="width: 100%; height: 300px"></div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return {
            
            chartData:{
                xAxis:["构建号1","构建号2","构建号3","构建号4","构建号5","构建号6","构建号7"],
                success:[5,15,18,20,17,20,16],
                fail:[2,3,1,1,5,6,7,],
                broken:[6,4,10,13,6,8,11]
            },
            
            myChartData:{
                xAxis:["构建号1","构建号2","构建号3","构建号4","构建号5","构建号6","构建号7"],
                success:[5,15,18,20,17,20,16],
                fail:[2,3,1,1,5,6,7,],
                broken:[6,4,10,13,6,8,11]
            },
        }
    },
    created() {
        this.$api.project.getTaskList().then(res=>{

            this.drawChart()  
        })
    },

    methods: {
        drawChart(){
            var myEcharts = require('echarts');
            var myChart = myEcharts.init(document.getElementById("myChart"));
            myChart.setOption({
                title:{
                    text:"测试趋势图"
                },
                tooltip:{
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985"
                        }
                    }
                },
                legend:{
                    
                },
                xAxis: {
                    data: this.chartData.xAxis
                },
                yAxis: {
                    type:'value'
                },
                series:[
                    {
                        name:"失败",
                        type:"line",
                        data:this.chartData.fail,
                        areaStyle:{},
                        stack:"总量",
                        itemStyle:{
                            color:"#FD735C"
                        }
                    },
                    {
                        name:"broken",
                        type:"line",
                        data:this.chartData.broken,
                        areaStyle:{},
                        stack:"总量",
                        itemStyle:{
                            color:"#FFD76B"
                        }
                    },
                    {
                        name:"成功",
                        type:"line",
                        data:this.chartData.success,
                        areaStyle:{},
                        stack:"总量",
                        itemStyle:{
                            color:"#9DD167"
                        }
                    },

                ]
            });
        }
    },
}
</script>