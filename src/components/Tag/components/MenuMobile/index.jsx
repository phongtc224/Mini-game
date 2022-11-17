import React, { useState } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Space, Row, Col } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";

import "./MenuMobile.scss";
import MenuItemMobile from "./MenuItem";

MenuMobile.propTypes = {
    listTag: PropTypes.array,
};

MenuMobile.defaultProps = {
    listTag: [],
};

function MenuMobile(props) {
    const { listTag } = props;
    const [visible, setVisible] = useState(false);

    const showLargeDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return (
        <div>
            <Space>
                <Button className="menu-mobile__btn" onClick={showLargeDrawer}>
                    <MenuUnfoldOutlined />
                </Button>
            </Space>
            <Drawer
                className="menu-mobile__content"
                placement="left"
                onClose={onClose}
                visible={visible}
            >
                <Row justify="center" align="middle">
                    {listTag.map((element, index) => {
                        return (
                            <Col span={24} key={index}>
                                <MenuItemMobile item={element} onClose={onClose}/>
                            </Col>
                        );
                    })}
                </Row>
            </Drawer>
        </div>
    );
}

export default MenuMobile;
