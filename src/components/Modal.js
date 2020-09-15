import React, { Component } from 'react';
import { Button, Form, Modal, Input, message } from 'antd';
import axios from 'axios';
import { SERVER_URL } from '../config'
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
class ModalForm extends Component {
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
        const { visible, modalTitle } = this.props;
        return (
            <Modal
                title={modalTitle}
                visible={visible}
                footer={null}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
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
                </Form>
            </Modal>
        );
    }
}

export default ModalForm;
