import React,{ Component } from 'react';
import styles from './ListClick.module.css'

class ListClick extends Component{
    state = {
        activeKey: '',
        navTitle : [],
        spot:true,
    }
    componentWillReceiveProps(nextProps) {
        if ( nextProps.data.length !== this.state.navTitle.length) {
            let list = nextProps.data.filter((item,i) => {
                return i<6
            })
            this.setState({
                activeKey:this.state.activeKey?this.state.activeKey:'',
                navTitle:list
            })
        }
    }
    titleClick = (id, name) => {
        this.setState({
            activeKey: id
        })
        let that = this
        setTimeout(() => {
            that.props.getId(id, name)
        }, 0);
    }
    allList = () => {
        this.setState({
            navTitle:this.props.data,
            spot:!this.state.spot
        })
    }
    render(){
        // const navTitle1 = this.props.data || [];
        const title = this.props.title || '';
        return(
            <div style={{position:'relative',lineHeight:2,overflow:'hidden'}}>
                <span style={{ position:'absolute',top:4,left:0,fontWeight:'bold' }}>{title}</span>
                <div style={{paddingLeft:80}}>
                    {
                        this.state.navTitle.map((item, i) => {
                            return <span key={i}
                                        style={{marginRight:'13px', fontSize:'15px', float:'left', padding:'4px 6px', cursor:'pointer'}}
                                        onClick={() => { this.titleClick(item.Ids, item.Names) }}
                                        className={this.state.activeKey === item.Ids ? styles.active : ''}

                            >{item.Names}</span>
                        })
                    }
                    <span onClick={this.allList} style={{ margin:2,display:this.state.spot?'inline-block':'none'}} >···</span>
                </div>
            
            </div>
        )
    }
}
export default ListClick