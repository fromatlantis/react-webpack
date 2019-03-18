/**
 * 图片轮播
 */
import React, { PureComponent } from 'react'
import { Carousel,Icon } from 'antd';
import styles from './CarouselM.module.css'

export default class CarouselM extends PureComponent {
    show = 7;
    state = {
        //轮播图
        selected: 0,
        left: 20,
    }
    //轮播图方法
    onChange= (b, a, c) => {
        
        let len = this.props.CarouselMDetail && this.props.CarouselMDetail.length || 0 , middle = Math.ceil(this.show/2);
        // let left = b + 1 > middle ? dong : 20;
        // let dong = b + 1 < middle +  len-this.show ? (middle - 1 -b) * 80 : (this.show - len) * 80;
        
        // let left = b + 1 > middle ? dong : 20;

        let left = (b + 1 > middle && b + 1 < len - this.show + middle) ? (middle - 1 -b) * 80 + 20 : (b + 1 <= middle ? 20 :(this.show - len) * 80 + 20);
        
        this.setState({
            selected: b,
            left: left
        })
    }
    prev = () => {
        let current = this.state.selected;
        let len = this.props.CarouselMDetail.length;
        this.carousel.goTo(current - 1 < 0 ? len - 1 : current - 1);
    }
    next = () => {
        let current = this.state.selected;
        let len = this.props.CarouselMDetail.length;
        this.carousel.goTo(current + 1 > len - 1 ?  0 : current + 1);
    }

    render() {

        return (
                <div>
                    <Carousel autoplay className={styles.carousel} afterChange={this.onChange} ref={carousel => this.carousel = carousel }>
                        {
                            this.props.CarouselMDetail && this.props.CarouselMDetail.map((item, index) => {
                                return <img src={item} key={index} alt=''/>
                            })
                        }
                    </Carousel>
                    <div style={{marginTop: 10, display: 'flex', alignItems: 'center', position: 'relative', maxWidth: '600px', overflow: 'hidden', height: 82}} >
                        <ul className={styles.littleThumb} style={{left: this.state.left}}>
                            {
                                this.props.CarouselMDetail && this.props.CarouselMDetail.map((item, index) => {
                                    
                                    return (
                                        <li className={index === this.state.selected ? styles.selected: ''} key={index} >
                                            <img className={styles.carImg} src={item} alt=''/>
                                        </li>
                                    )
                                    
                                })
                            }
                        </ul>
                        <div className={styles.guideBox} onClick={this.prev} style={{position: 'absolute', left: 0}}>
                            <Icon type="left" />
                        </div>
                        <div className={styles.guideBox} style={{position: 'absolute', right: 0}} onClick={this.next}>
                            <Icon type="right" />
                        </div>
                    </div>
                </div>
        )
    }
}
