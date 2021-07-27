import React, { Component, Fragment } from 'react'
import {Card, Button, Table, Tag, Modal} from 'antd'
import { getArticals } from '../../requests/index.js'

// 处理时间戳
import moment from 'moment'
import XLSX from 'xlsx';

const columsTitleFormat = {
    id: 'id',
    author: '作者',
    title: '文章标题',
    amount: '阅读量',
    createAt: '创建时间'
}
export default class ArticleList extends Component {
    constructor(){
        super();
        this.state = {
            columns : [],
            dataSource: [],
            total: 0,
            isLoading: false,
            offset: 0,
            limited: 20
        };
    }

    createColumns = (columnsKeys) => {
        let columns = columnsKeys.map(item => {
            if(item == 'amount' || item == 'createAt'){
                return {
                    title: columsTitleFormat[item],
                    key: item,
                    dataIndex: item,
                    render: (text, record) => {
                        const amount = record.amount;
                        const createAt = record.createAt;
                        if(item == 'amount'){
                            return amount < 1000 ? <Tag color="red">{record.amount}</Tag> : <Tag color="green">{record.amount}</Tag>
                        }else if(item == 'createAt'){
                            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                        }
                    }
                }
            }else{
                return {
                    title: columsTitleFormat[item],
                    dataIndex: item,
                    key: item
                }                
            }
        })
        columns.push({
            title: '操作',
            key: 'options',
            dataIndex: 'options',
            render: (text, record) => {
                return (
                    <Fragment>
                        <Button size="small" type="primary">编辑</Button>
                        <Button size="small" danger onClick={this.deleteArtical.bind(this,record)}>删除</Button>
                    </Fragment>
                )
            }
        })
        return columns;
    }

    deleteArtical = (record) => {
        console.log(record)
        Modal.confirm({
            centered: true,
            title: `确定删除${record.id}?`,
            content: '此操作不可逆，请谨慎！'
        })
    }

    getArticals = () => {
        this.setState({
            isLoading: true
        })
        const offset = this.state.offset;
        const limited = this.state.limited;
        getArticals(offset, limited).then(res => {
            const columnKeys = Object.keys(res.list[0])
            const columns = this.createColumns(columnKeys)
            this.setState({
                dataSource: res.list,
                columns: columns,
                total: res.total
            })
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    onPageChange = (page, pageSize) => {
       this.setState((prevState)=>{
            return {
                offset: prevState.limited == pageSize ? pageSize * (page -1) : 0,
                limited: pageSize 
            }
        }, ()=>{
            this.getArticals()
        })
       
    }

    toExecal = () => {

    }

    exportFile = () => {
        let dataSource = this.state.dataSource;
        let data = [];
        data.push(Object.keys(dataSource[0]));
        dataSource.forEach(element => {
            data.push(Object.values(element));
        });
		/* convert state to workbook */
       
		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx")
	}

 
    componentDidMount(){
        this.getArticals()
    }

    render() {
        return (
            <Card title="文章列表" bordered={false} extra={<Button onClick={this.exportFile}>导出execel</Button>} style={{minHeight:'100%'}}>
                <Table 
                    loading={this.state.isLoading}
                    rowKey={ record => record.id}
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns} 
                    pagination={{
                        current: this.state.offset / this.state.limited + 1,
                        total: this.state.total,
                        showQuickJumper: true,
                        size: 'small',
                        onChange: this.onPageChange
                    }}
                />
            </Card>
        )
    }
}
