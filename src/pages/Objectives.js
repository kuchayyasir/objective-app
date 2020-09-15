import React, { Component } from 'react';
import { Row, Col, Button, List, Divider, Tabs, Form, Modal, Input, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { SERVER_URL } from '../config'
const { TabPane } = Tabs;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
class Objectives extends Component {
    addObjective = (tab) => {
        this.setState({
            visible: true,
            modalTitle: `Add ${(this.state.activeTab.charAt(0).toUpperCase() + this.state.activeTab.slice(1))} Objective`
        });
    };
    addEndPoint = () => {
        this.setState({
            visible: true,
            modalTitle: `Add ${(this.state.activeTab.charAt(0).toUpperCase() + this.state.activeTab.slice(1))} End Point`
        });
    };
    linkAssessment = () => {
        this.setState({
            visible: true,
            modalTitle: `Add ${(this.state.activeTab.charAt(0).toUpperCase() + this.state.activeTab.slice(1))} Assessment`
        });
    };
    enableEndPoint = (objective) => {
        console.log(objective);
        this.setState({ showAddEndPoint: true, objective: objective });
    };
    enableLinkAssessment = (endPoint) => {
        console.log(endPoint)
        this.setState({ showLinkAssessment: true, endPoint: endPoint });
    };
    changeTab = activeKey => {
        this.setState({
            activeTab: activeKey,
            showAddEndPoint: false,
            showLinkAssessment: false
        }, () => { this.getObjectives(this.state.activeTab) });

    }
    componentDidMount() {
        this.getObjectives(this.state.activeTab);
    }
    getObjectives(type) {
        axios.get(`${SERVER_URL}/objective`, {
            params: {
                type: type
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    formRef = React.createRef();
    onFinish = (values) => {
        if (this.state.showAddEndPoint) {
            let objectiveId = this.state.objective._id;
            console.log(values);
            axios.post(`${SERVER_URL}/endpoint/${objectiveId}`, (values))
                .then(res => {
                    this.getObjectives(this.state.activeTab);
                    this.onReset();
                    message.success('EndPoint Added Successfully!');
                })
        }
        else if (this.state.showLinkAssessment) {
            console.log(this.state.endPoint);
        }
        else {
            values.type = this.state.activeTab;
            axios.post(`${SERVER_URL}/objective`, (values))
                .then(res => {
                    this.getObjectives(this.state.activeTab);
                    this.onReset();
                    message.success('Objective Added Successfully!');
                })
        }
    };
    onReset = () => {
        this.formRef.current.resetFields();
        this.setState({
            visible: false,
            showAddEndPoint: false,
            showLinkAssessment: false
        });
    };
    onFill = () => {
        this.formRef.current.setFieldsValue({
            name: 'Hello world!'
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            showAddEndPoint: false,
            showLinkAssessment: false,
            activeTab: "primary",
            data: [],
            visible: false,
            formRef: null,
            tabKeys: ['primary', 'secondary', 'exploratory'],
            modalTitle: `Add Primary Objective`,
            objective: {},
            endPoint: {},
            assessment: {}
        };
    }
    render() {
        const { showAddEndPoint, showLinkAssessment, data, visible, tabKeys, modalTitle, objective, endPoint, assessment } = this.state;
        return (
            <div className="block mainBlock bgGray">
                <div className="container-fluid">
                    <div className="contentHolder">
                        <Row justify="center">
                            <Col span={24}>
                                <Tabs activeKey={this.state.activeTab} onChange={this.changeTab} type="card" size="large" centered>
                                    {tabKeys.map(tab => (
                                        <TabPane tab={`${(tab.charAt(0).toUpperCase() + tab.slice(1))} Objective`} key={tab}>
                                            <>
                                                <Row gutter={[16, 16]} justify="center">
                                                    <Col span={4}><Button onClick={(tab) => this.addObjective(tab)} type="secondary" block>Add Objective</Button></Col>
                                                    <Col span={4}>
                                                        {showAddEndPoint ? <Button onClick={(tab) => this.addEndPoint(tab)} type="secondary" block>Add End Point</Button> : null}
                                                    </Col>
                                                    <Col span={4}>
                                                        {showLinkAssessment ? <Button onClick={(tab) => this.linkAssessment(tab)} type="secondary" block>Link Assessment</Button> : null}

                                                    </Col>
                                                </Row>
                                                <Row gutter={[16, 16]} justify="center">
                                                    <Col span={6}>
                                                        <Divider orientation="left">Objective</Divider>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Divider orientation="right">End Point</Divider>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[16, 16]} justify="center">
                                                    <Col span={12}>
                                                        <List
                                                            header={<div></div>}
                                                            footer={<div></div>}
                                                            bordered
                                                            split
                                                            dataSource={data}
                                                            renderItem={item => <List.Item extra={
                                                                <List
                                                                    dataSource={item.endPoints}
                                                                    renderItem={item => <List.Item><Button type="link" onClick={() => this.enableLinkAssessment(item)}>{item.name}</Button></List.Item>}
                                                                />
                                                            }><Button type="link" onClick={() => this.enableEndPoint(item)}>{item.name}</Button></List.Item>}
                                                        />

                                                    </Col>

                                                </Row>
                                                <Modal
                                                    title={modalTitle}
                                                    visible={visible}
                                                    footer={null}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                >
                                                    <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}  initialValues={{ names: [""] }}>
                                                    { (showAddEndPoint) ? 
                                                     <>
                                                        <Form.List name="names">
                                                            {(fields, { add, remove }) => {
                                                                return (
                                                                    <div>
                                                                        {fields.map((field, index) => (
                                                                            <Form.Item
                                                                                name="name"
                                                                                label="Name"
                                                                                required={false}
                                                                                key={field.key}
                                                                            >
                                                                                <Form.Item
                                                                                    {...field}
                                                                                    validateTrigger={['onChange', 'onBlur']}
                                                                                    rules={[
                                                                                        {
                                                                                            required: true,
                                                                                            whitespace: true,
                                                                                            message: "Please input name or delete this field.",
                                                                                        },
                                                                                    ]}
                                                                                    noStyle
                                                                                >
                                                                                    <Input placeholder="Please enter name" style={{ width: '80%' }} />
                                                                                </Form.Item>
                                                                                {fields.length > 1 ? (
                                                                                    <MinusCircleOutlined
                                                                                        className="dynamic-delete-button"
                                                                                        style={{ margin: '0 8px' }}
                                                                                        onClick={() => {
                                                                                            remove(field.name);
                                                                                        }}
                                                                                    />
                                                                                ) : null}
                                                                            </Form.Item>
                                                                        ))}
                                                                        <Form.Item>
                                                                            <Button
                                                                                type="dashed"
                                                                                onClick={() => {
                                                                                    add();
                                                                                }}
                                                                                style={{ width: '50%' }}
                                                                            >
                                                                                <PlusOutlined /> Add End Point
                                                                            </Button>
                                                                        </Form.Item>
                                                                    </div>
                                                                );
                                                            }}
                                                        </Form.List>
                                                        <Form.Item {...tailLayout}>
                                                            <Button htmlType="button" onClick={this.onReset}>
                                                                Cancel</Button>
                                                            <Button type="primary" htmlType="submit">
                                                                Save</Button>
                                                        </Form.Item> 
                                                        </>
                                                        : (showLinkAssessment) ?
                                                         <> 
                                                       <Form.Item
                                                            name="name"
                                                            label="Name"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <Form.Item {...tailLayout}>
                                                            <Button htmlType="button" onClick={this.onReset}>
                                                                Cancel</Button>
                                                            <Button type="primary" htmlType="submit">
                                                                Save</Button>


                                                        </Form.Item>
                                                        </>: <> 
                                                       <Form.Item
                                                            name="name"
                                                            label="Name"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                        <Form.Item {...tailLayout}>
                                                            <Button htmlType="button" onClick={this.onReset}>
                                                                Cancel</Button>
                                                            <Button type="primary" htmlType="submit">
                                                                Save</Button>


                                                        </Form.Item>
                                                        </>} 
                                                    </Form>
                                                </Modal>

                                            </>
                                        </TabPane>
                                    ))}
                                </Tabs></Col>
                        </Row>
                    </div>

                </div>
            </div>
        );
    }
}

export default Objectives;
