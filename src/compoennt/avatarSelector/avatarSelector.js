import React from 'react'
import { Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state={}
    }
    render() {
        const avaList='prince,princess,spiderman,dog,dinosaur,panda,hashiqi,jumao'.split(',')
            .map(v=>({
                icon:require(`../img/${v}.jpg`),
                text:v
            }));
        const gridHeader = this.state.icon
                            ?(<div>
                                <span>已选择头像</span>
                                <img style={{width:25,height:25}} src={this.state.icon} alt="头像图片"/>
                             </div>)
                            :(<div>请选择头像</div>);
        return (
            <div>
                <List renderHeader={gridHeader}>
                    <Grid
                        data={avaList}
                        columnNum={4}
                        renderItem={dataItem => (
                            <div style={{ padding: '12.5px' }}>
                                <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                            </div>
                        )}
                        onClick={elm=>{
                            this.setState(elm);
                            this.props.selectAvatar(elm.text)
                        }}/>
                </List>
            </div>)
    }
}

export default AvatarSelector;