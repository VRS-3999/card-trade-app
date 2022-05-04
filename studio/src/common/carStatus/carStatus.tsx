import React, { Component } from "react";
import { Button, Select, Input, Row, Col, message, Icon } from 'antd';
import "./carStatus.less";
import {carCatalog} from "../../utils/CarCatalog";
import CarCard from "../../components/CarCard/CarCard";
import {carCatalogFilter} from "../../utils/CarCatalogFilter";
import { Link } from "react-router-dom";


const { Option } = Select;

class CarContainer extends Component<any, {}> {
  state = {
    carCatalog: [],
    carFilter: [],
    carType: "" as any,
    carValue: "" as any,
    cartDataId: [] as any
  }

  componentDidMount() {
    this.setState({carCatalog:carCatalog});
    this.setState({carFilter:carCatalogFilter});
    this.carTypeSelection.bind(this);
  }

  handleCartData = (carDataID: number) => {
    let refreshedCartData = this.state.cartDataId;
    refreshedCartData.push(carDataID); 
    this.setState({cartDataId:refreshedCartData});
  }

  manageCartData = () => {
    console.log(this.state.cartDataId);
  }

  handleCarFilter = async () => {
    await this.clearCarFilter();
    let { carCatalog, carType, carValue} = this.state;
    if(carValue && carType) {
      let filterCars = carCatalog.filter(
        function(car){ 
          let inspectionValue = car[carType] as any;
          return inspectionValue.toLowerCase().includes(carValue.toLowerCase());
        });
      this.setState({carCatalog: filterCars});
      message.success("Filter Applied", 1);
    } else {
      message.error("Select Proper Filter", 1);
    }
  }

  clearCarFilter = async () => {
    await this.setState({carCatalog:carCatalog});
    // message.success("Filter Removed", 1);
  }

  carTypeSelection = (value: string) => {
    this.setState({carType:value});
  }

  carSelectionValue = (e: any) => {
    console.log(e.target.value);
    this.setState({carValue:e.target.value});
  }

  render() {
    const {carCatalog, cartDataId} = this.state;
    return (
      <>
      <div className="filters-car-box">
              <div className="filters-car-flex">
                  <div className="filter-car-input">
                    <Row gutter={16}>
                      <Col className="gutter-row bold" span={12}>
                        <div>Select Filter Type : </div>  
                      </Col>
                      <Col className="gutter-row balancedRow" span={12}>
                        <div>
                          <Select
                              className="car-inputFilter"
                              showSearch
                              allowClear
                              style={{ width: '300px' }}
                              placeholder=""
                              autoFocus={false}
                              onChange={this.carTypeSelection}
                            >
                              {
                                this.state.carFilter.map((key) => (
                                  <Option key={key}>{key}</Option>
                                ))
                              }
                          </Select>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="filter-car-input">
                    <Row gutter={16}>
                      <Col className="gutter-row bold" span={8}>
                        <div>Enter Value :</div> 
                      </Col>
                      <Col className="gutter-row balancedRow" span={16}>
                        <div><Input placeholder="Enter Input" onChange={this.carSelectionValue} /></div>
                      </Col>
                    </Row>
                  </div>
             
              </div>
              <div className="filter-car-btn">
                <Button type="primary" style={{ backgroundColor:'#2174f6', marginRight:10 }} onClick={() => this.handleCarFilter()}>Apply Filters</Button>
                <Button type="primary" style={{ backgroundColor:'#9E5E01',marginRight:10, borderColor: '#9E5E01' }}  onClick={() => this.clearCarFilter()}>Clear Filters</Button>
              </div>
            </div>

            <div className="manageCart">
              <Link to={{
                      pathname: "/cart",
                      state: cartDataId
                    }}>
                <Button className="stickRight" type="primary" size="large">
                  <Icon type="shopping-cart" /> Manage Cart
                </Button>
              </Link>
            </div>

      {carCatalog.map((car) => (
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
          cartDisplay={false}
          owner={car['owner']}
          mobile={car['mobile']}
          address={car['address']}/>
      ))}
      </>
    );
  }
}


export default CarContainer;
