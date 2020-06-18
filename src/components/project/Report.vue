<template>
    <v-row>
        <v-col cols="6">
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
                color: ['#FF3300','#FFCC33','#66CC00','#707070','#CC0099'],
                title: {
                    text: '状态'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    data: ['failed', 'broken', 'passed', 'skipped', 'unknow']
                },
                series: [
                    {
                        name: '执行状态',
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
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value:'5',name:'failed'},
                            {value:'6',name:'broken'},
                            {value:'9',name:'passed'},
                            {value:'0',name:'skipped'},
                            {value:'0',name:'unknow'},
                        ]
                    }
                ]
            });
        }
    },
}
</script>