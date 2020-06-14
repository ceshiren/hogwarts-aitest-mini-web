<template>
    <div style="margin:20px">
        <v-btn color="success">导入用例</v-btn>
        <v-btn color="primary">生成任务</v-btn>
        <v-data-table 
        v-model="selected" 
        :headers="headers" 
        :items="tableData"
        show-select
        hide-default-footer
        >
            <template v-slot:item.action="{item}">
                <v-btn small color="error" @click="deleteItem(item)">删除</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            selected:[],
            headers:[
                {text:'用例名称',value:'name'},
                {text:'包名',value:'package'},
                {text:'类名',value:'class'},
                {text:'方法名',value:'method'},
                {text:'操作',value:'action'}
            ],
            tableData:[
                {name:'用例1',package:'com.case'}
            ],
        }
    },
    methods:{
        deleteItem(item){

        }
    }
}
</script>