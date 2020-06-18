<template>
    <v-row>
        <v-col cols="6">
            <div id="myChart" style="width: 100%; height: 300px"></div>
        </v-col>
        <v-col cols="6">
            <div id="pie" style="width: 100%; height: 300px"></div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return {
            countX:[],
            coutnData:[],
            statusX:[],
            statusData:[],
        }
    },
    created() {
        this.$api.report.getCaseCount().then(res=>{
            var listData = []
            listData = res.data.data
            for(let i=0;i<listData.length;i++){
                this.countX.push("任务id:"+listData[i].id)
                this.coutnData.push(listData[i].caseConut)
            }
            this.drawChart()
        })
        this.$api.report.getStatus().then(res=>{
            console.log("状态")
            console.log(res)
            var listData = res.data.data.taskDataDtoList
            console.log(listData)
            
            for(let i=0;i<listData.length;i++){
                this.statusX.push(listData[i].desc)
                this.statusData.push({value:listData[i].taskCount,name:listData[i].desc})
            }
            this.drawPie()
        })
    },

    methods: {
        drawPie(){

            var myEcharts = require('echarts');
            var myChart = myEcharts.init(document.getElementById("pie"));
            myChart.setOption({

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: this.statusData
                },
                series: [
                    {
                        name: '任务类型统计',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.statusData
                    }
                ]
            })
        },
        drawChart(){
            var myEcharts = require('echarts');
            var myChart = myEcharts.init(document.getElementById("myChart"));
            myChart.setOption({
                title:{
                    text:'测试任务用例数量统计'
                },
                xAxis: {
                    type: 'category',
                    data: this.countX
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.coutnData,
                    type: 'line'
                }]
            });
        }
    },
}
</script>