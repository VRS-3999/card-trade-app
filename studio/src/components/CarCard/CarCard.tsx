import React, { Component } from "react";
import { Card, Row, Col, Divider, message, Button, Icon, Tooltip, Modal } from 'antd';

import "./CarCard.less";

import { PropsModel } from "./Type";

const { Meta } = Card;

export default class CounterCard extends Component<PropsModel> {
  
  state = {
    addToFav : false,
    addToCart : false,
    visible: false,
  }

  showOwner = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = () => {
    this.setState({ visible: false });
  };

  addToFavourite = () => {
    this.setState({addToFav:true});
    message.success("Successfully added in your Favourite List", 1);
  }

  addToCart = (id: number) => {
    this.setState({addToCart:true});
    this.props.parentCallback(id);
    message.success("Successfully added in your Cart", 1);
  }

  removeFromCart = (id: number) => {
    this.props.parentCallback(id);
    message.success("Successfully removed from your Cart", 1);
  }


  render() {
    const { visible } = this.state;
    const {
      id,
      image,
      brand,
      year,
      model,
      name,
      description,
      price,
      cartDisplay,
      owner,
      mobile,
      address
    } = this.props;

    return (
      <div className="container">
        <div className="counter-container">
            <>
            <Divider orientation="left">{name}</Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <Card
                  hoverable
                  cover={<img alt={name} src={image} />}
                >
                  <Meta title={model} description={brand +" : "+ year} />
                </Card>
              </Col>
              <Col className="gutter-row" span={18}>
                <div className="priceTag">
                  Price : {price}
                </div>
                <div className="descriptionInfo">
                  {description}
                </div>
                <div>
                {!cartDisplay && 
                  <Tooltip placement="top" title="Add to Favourite">
                    <Button className="stickRight" style={{backgroundColor: this.state.addToFav?"green":""}} type="primary" shape="circle" size="large" onClick={()=>this.addToFavourite()}>
                      {this.state.addToFav ? <Icon type="check-circle" theme="filled" /> : <Icon type="like" />}
                    </Button>
                  </Tooltip>
                }
                </div>
                <div className="manageCart filter-car-btn">

                    <Tooltip placement="top" title="View Owner">
                      <Button className="stickRight" type="primary" size="large" onClick={this.showOwner}>
                      <Icon type="user" /> Owner 
                      </Button>
                    </Tooltip>

                    <Modal
                      visible={visible}
                      title="Owner Info"
                      onCancel={this.handleCancel}
                      footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Return
                        </Button>
                      ]}
                    >
                      <div className="priceTag">Owner : {owner} </div>
                      <div className="priceTag">Mobile : {mobile} </div>
                      <div className="priceTag">Address : {address} </div>
                    </Modal>
                
                  {cartDisplay ? 
                    <Tooltip placement="top" title="Remove from Cart">
                      <Button className="stickRight" type="danger" size="large" onClick={()=>this.removeFromCart(id)}>
                        <Icon type="shopping-cart" /> Remove
                      </Button>
                    </Tooltip>
                    :
                    <Tooltip placement="top" title="Add to Cart">
                      <Button className="stickRight" style={{backgroundColor: this.state.addToCart?"green":""}} type="primary" size="large" onClick={()=>this.addToCart(id)}>
                        <Icon type="shopping-cart" /> Add to Cart
                      </Button>
                    </Tooltip>}
                </div>
              </Col>
            </Row>
              
            </>
        </div>
      </div>
    );
  }
}
