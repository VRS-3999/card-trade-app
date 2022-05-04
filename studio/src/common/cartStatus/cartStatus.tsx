import React, { Component } from "react";
import { Button, message, Icon, Modal } from 'antd';
import "./cartStatus.less";
import {carCatalog} from "../../utils/CarCatalog";
import CarCard from "../../components/CarCard/CarCard";
import { Link } from "react-router-dom";


class CartContainer extends Component<any, {}> {
  state = {
    carCatalog: [],
    loading: false,
    visible: false,
  }

  componentDidMount() {
    let cartDataIds = this.props.location.state as any;
                      
    let cartData = carCatalog.filter(
                    function(car){ 
                      let inspectionValue = car['id'] as any;
                      return cartDataIds.includes(inspectionValue);
                    });
    this.setState({carCatalog:cartData});


  }

  handleCartData = (carDataID: number) => {
    let cartData = this.state.carCatalog.filter(
      function(car){ 
        let inspectionValue = car['id'] as any;
        return inspectionValue !== carDataID;
      });
    this.setState({carCatalog:cartData});
    if(cartData.length === 0){
      message.info("Cart is now completely Empty", 1);
    }
  };

  priceCal = () => {
    let totalCost = 0;
    this.state.carCatalog.forEach(function(car : any){
      totalCost += car.price;
    })
    return totalCost;
  }

  showCheckout = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };


  render() {
    const { visible, loading } = this.state;
    return (
      <>
      <div className="manageCart filter-car-btn">
              <Link to={{
                      pathname: "/"
                    }}>
                <Button className="stickRight" type="primary" size="large">
                  <Icon type="home" /> Home
                </Button>
              </Link>

              <Button className="stickRight" type="primary" size="large" disabled={this.state.carCatalog.length<=0} onClick={this.showCheckout}>
                <Icon type="check-circle" theme="filled" /> Checkout
              </Button>

              <Modal
                visible={visible}
                title="Proceed to Checkout"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                    Checkout
                  </Button>,
                ]}
              >
                <div className="priceTag">Total Price : Rs. {this.priceCal()}</div>
              </Modal>
      </div>

      {this.state.carCatalog.length ? this.state.carCatalog.map((car) => (
        <CarCard
          parentCallback = {this.handleCartData}
          id={car['id']}
          image={car['image']}
          brand={car['brand']}
          year={car['year']}
          model={car['model']}
          name={car['name']}
          description={car['description']}
          price={car['price']}
          cartDisplay={true}
          owner={car['owner']}
          mobile={car['mobile']}
          address={car['address']}/>
      ))
    :
    <div className="emptyCart">Cart is Empty</div>}
      </>
    );
  }
}


export default CartContainer;
